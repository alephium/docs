---
sidebar_position: 30
title: Programming Model
sidebar_label: Programming model
---

Compared to other blockchains, Alephium's programming model is heavily
influenced by its [sUTXO](/Content/#stateful-utxo) model, its sharding
architecture, as well as numerous innovations and design decisions
made in the [Ralph language](/ralph/getting-started) and [Alphred
VM](/Content/#alphred-virtual-machine).

Under [sUTXO](/Content/#stateful-utxo) model, assets are managed by
UTXOs while contract states are managed using account-based
model. This brings a few interesting properties when it comes to
programming:

- Alephium supports Bitcoin-like stateless programming purely done
  within the scope of UTXOs. It supports its own version of
  [P2SH](https://learnmeabitcoin.com/technical/script/p2sh/) using
  Ralph language, which is much more powerful and dev friendly than
  Bitcoin script.
- Alephium also supports EVM-style stateful programming that allows
  the manipulation of global contract state. However the fact that
  assets are managed separately using UTXOs not only removes a class
  of security and UX issues such as token approvals, but also makes
  many features possible at both the language and VM level, such as
  [Asset Permission System](/ralph/asset-permission-system).
- The separation of the assets and contract states, and the
  combination of both stateless and stateful programming open up new
  possibilities for building dApps.
  
Alephium's sharding architecture means that dApps, in some cases, need
to be aware of the fact that Alephium currently runs 4 groups and 16
chains. With continuous improvements of the core infrastructure as well as
clever design from the dApps side, it is possible to achieve great
balance between scalability and user experience.

The goal of this guide is to explain some of Alephium's unique
programming features.

## TxScript

[sUTXO](/Content/#stateful-utxo) model enables two types of
transactions on Alephium: 

- Asset transfer from senders to the recipients where only UTXOs are
  involved.
- Smart contract interactions

Transaction with smart contract interactions needs to be initiated by
transaction script (i.e `TxScript`), which is a unique feature on
Alephium. It allows developers to write one-off or re-usable logic
that can compose multiple contract calls into a single transaction,
without the overhead and cost of deploying new aggregation
contracts. `TxScript` is also flexible and secure because it takes
advantage of the full power of Ralph language and Alphred VM.

As an example, following is the pseudo code of a `TxScript` that uses
two DEXes to (naively) figure out the average exchange rate of USD to
ALPH, and then donate $100 worth of ALPH to a charity:

```rust
TxScript Donate(dex1: Dex, dex2: Dex, charity: Charity) {
  let rate1  = dex1.exchangeRateOfUSDToALPH()
  let rate2  = dex2.exchangeRateOfUSDToALPH()
  let amount = 100 / ((rate1 + rate2) / 2)
  charity.donate{donor -> ALPH: amount}(amount)
}
```

Please see
[here](/dapps/interact-with-contracts#txscript-transactions) for a
more concrete example of how to interact with smart contract using
`TxScript`. To better understand how assets flow from the inputs
through `Txscript` into the (fixed/generated) outputs, please read
[Flow of Assets](/ralph/asset-permission-system#flow-of-assets).

## Asset Permission System

Asset permission system is one of Alephium's unique features. It makes
the flow of assets explicit at the code level, giving both developers
and users the confidence that all asset transfers in the smart
contract happen as intended. 

Please read [Asset Permission System](/ralph/asset-permission-system)
for a more elaborate discussion.

## Contracts and UTXOs

Under [sUTXO](/Content/#stateful-utxo) model, assets owned by regular
addresses and contract addresses are both managed by UTXOs. The
difference is that there is exactly one UTXO per contract address
whereas regular addresses can have multiple UTXOs.

A transaction under the UTXO model has inputs and outputs. One important
property of these transactions is that after assets are transferred to
an output, the output can not be spent immediately within the same
transaction.

```
               ----------------
               |              |
   input       |              |   output
=============> | Transaction  | ===========>
               |              | 
               |              | 
               ----------------
```

This is fairly obvious for simple asset transfer. But this is also
true when programming smart contracts. Here are a few examples:

- If Alice receives a loan from a lending platform, she can not use
  the loan to buy an NFT in the same transaction
- If Bob withdraws asset from a HODL contract, Eve can not withdraw
  asset from the same HODL contract within the same transaction
- If Alice transfers assets to Bob, Bob can not transfer the asset back
  to Alice in the same transaction.

This property is the reason why double dip issue and reentrancy
attacks are not possible on Alephium. It also makes risk-free
arbitrage more difficult.

## Sub-contract

Sub-contract on Alephium is a simple and powerful idea. It allows for
constructing tree-like structures across a group of related contracts
and traverse across them in a manner analogous to navigating through
domain names. Compared to regular maps or tree data structures,
Sub-contracts enable more expressivity since each node is a fully
functional contract that is capable of issuing tokens, executing
sophisticated business logic, having fine-grained access control to
its state as well as permission control to its assets, etc.

Sub-contracts also contribute to the long-term health of the Alephium
blockchain by incentivizing users to recycle them when not needed. It
also keeps things simple at the VM level since everything is a
contract.

The following example shows the `mint_` function of a NFT collection
contract:

```rust
@using(preapprovedAssets = true)
fn mint_(minter: Address, index: U256) -> ByteVec {
  let (encodeImmutableFields, encodeMutableFields) = NFT.encodeFields!(getNFTUri(index), selfContractId!(), index)
  return copyCreateSubContractWithToken!{minter -> ALPH: 1 alph}(
      toByteVec!(index),
      nftTemplateId,
      encodeImmutableFields,
      encodeMutableFields,
      1,
      minter
  )
}
```

As we can see, NFT collection contract creates a NFT sub-contract
using the
[copyCreateSubContractWithToken](/ralph/built-in-functions#copycreatesubcontractwithtoken)
built-in function. The NFT sub-contract is created with one issued
token to represent the NFT, and the NFT sub-contract can be referenced
from the NFT collection contract using the
[subContractId](/ralph/built-in-functions#subcontractid) function.

## AssetScript

`AssetScript` allows Alephium to implement the equivalent of Bitcoin's
[P2SH](https://learnmeabitcoin.com/technical/script/p2sh/)
feature. In a nutshell, a `P2SH` UTXO stores the hash of a script that
specifies the spending condition of this UTXO. When it comes time to
spend such UTXOs, the script needs to be provided together with the
required arguments to successfully execute the script.

For example, Alephium's [Schnorr
signature](https://en.wikipedia.org/wiki/Schnorr_signature) support is
implemented using the following `AssetScript`:

```rust
AssetScript Schnorr(publicKey: ByteVec) {
  pub fn unlock() -> () {
    verifyBIP340Schnorr!(txId!(), publicKey, getSegregatedSignature!())
  }
}
```
As you can see, the script takes in a public key as parameter,
verifies if the transaction signature is a valid Schnorr signature
using the built-in function
[verifyBIP340Schnorr](/ralph/built-in-functions#verifybip340schnorr). In
order to spend a UTXO constructed using the hash of the script
bytecode, a public key needs to be provided and the transaction
needs to be signed with a valid Schnorr signature by its corresponding
private key.

`AssetScript` is stateless in the sense that it can not access
anything outside of a given UTXO, including any contracts.
