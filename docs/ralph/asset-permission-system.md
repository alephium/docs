---
sidebar_position: 60
title: Asset Permission System (APS)
sidebar_label: Asset permission system (APS)
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

The Asset Permission System (APS) is one of Ralph's unique
features. It explicitly stipulates the flow of assets in the code of
the smart contract, giving developers and users the confidence that
all value transfers happen as intended. It also offers better user
experience by eliminating the token approval risks in systems such as
EVM.

Alephium uses the
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
model where assets, including the native ALPH and all other tokens are
managed by UTXOs while smart contracts and their states are managed
using the account-based model.

This has a few implications:

1. Simple ALPH/token transfers between users only requires UTXOs,
   which is battle tested for its security for managing assets. Here
   no smart contracts are involved.
2. Smart contracts do not require seperate approval transactions to
   transfer tokens on behalf of the owners. The approval is implicit
   in the UTXO model: if the UTXO that contains a particular token is
   authorized to be spent in the transaction, then the owner has
   already given consent to the usage of that token in the context of
   this transaction, meaning that the smart contracts that get invoked
   in the same transaction could potentially transfer the token.

Now the question is: in the second situation, how can we make sure
that the assets implicitly approved in the transaction using the UTXO
model can be transferred securely by the smart contracts? The answer
is Ralph's Asset Permission System (APS).

## Flow of Assets

To interact with the smart contracts, a transaction needs to execute the
`TxScript`. In the following transaction, there are two inputs and one
fixed outputs with a `TxScript`:

```
                  ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 ALPH (fixed output)
================> |              | ========================>
   6.1 ALPHs      |  <TxScript>  |   ??? (generated output)
================> |              | ========================>
                  |              | 
                  |              | 
                  |              |
                  ----------------
```

Two things are worth noting:

1. Even though there are currently one fixed outputs, there will be
   more outputs generated for this transaction. The generated outputs
   depend on the result of the `TxScript` execution.
2. The total assets available for `TxScript` (including the smart
   contracts it invokes) are `1` Token A and `5.1` ALPHs.

Let's say the `TxScript` looks something like this:

```rust
TxScript ListNFT(
    tokenAId: ByteVec,
    price: U256,
    marketPlaceContractId: ByteVec
) {
    let marketPlace = NFTMarketPlace(marketPlaceContractId)
    let listingFee = marketPlace.getListingFee()
    let minimalAlphInContract = 1 alph
    let approvedAlphAmount = listingFee + minimalAlphInContract

    marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
}
```

As you may have guessed, Token A is an NFT token and the purpose of
the above `TxScript` is to list it through a market place smart contract.

The following line of code is of particular interest:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

The code inside of the curly braces explicitly approves that
`approvedAlphAmount` of ALPH and `1` token A are allowed to be
spent in the `marketPlace.listNFT` function, even though the total
amount of assets available are `5.1` ALPHs and `1` token
respectively. The following scenarios could happen:

1. If `approvedAlphAmount` turns out to be more than `5.1` ALPH, then
   the transaction fails with `NotEnoughBalance` error.
2. Assume `listingFee` is `0.1` ALPH and `approvedAlphAmount` is
   therefore `1.1` ALPH, then maximum amount of assets that
   `marketPlace.listNFT` can spend are `1.1` ALPHs and `1` token
   A. `marketPlace.listNFT` does not have access to the rest of the
   `4` ALPHs.
3. If `marketPlace.listNFT` has not spent the entirety of the approved
   assets, the remaining assets will be returned back to their owner
   when `marketPlace.listNFT` returns.

Let's look a bit closer to the `marketPlace.listNFT` function:

```rust
Contract NFTMarketPlace(
    nftListingTemplateId: ByteVec
) {
    // Other code are omitted for brevity

    pub fn getListingFee() -> U256 {
        return 0.1 ALPH
    }

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
    pub fn listNFT(
        tokenId: ByteVec,
        price: U256
    ) -> (Address) {
        assert!(price > 0, ErrorCodes.NFTPriceIsZero)

        // Only owner can list the NFT
        let tokenOwner = callerAddress!()

        let (encodeImmutableFields, encodeMutableFields) = NFTListing.encodeFields!(tokenId, tokenOwner, selfAddress!(), commissionRate, price)
        // Create the listing contract
        let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
            tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
        )

        // Charge the listing fee
        transferTokenToSelf!(tokenOwner, ALPH, listingFee)

        return contractIdToAddress!(nftListingContractId)
    }
}
```

First thing to notice is the annotation for the function

```rust
@using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
```

`preapprovedAssets = true` indicates to the VM that the `listNFT`
method intends to use the assets of the caller and the caller is
supposed to approve a set of neccessary assets when calling the
`listNFT` method or else a compilation error will be
reported. Compilation will also fail if the caller tries to approve
assets for a method where `preapprovedAssets = false`.

`assetsInContract = true` indicates to the VM that the `listNFT`
method wants to update the asset of the `NFTMarketPlace`
contract. Compiler will make sure that the `listNFT` method does
actually do that or else an compilation error will be reported. In
this case, `listNFT` does update the asset of the `NFTMarketPlace`
contract by transferring the `listingFee` to it:

```rust
// Charge the listing fee
transferTokenToSelf!(tokenOwner, ALPH, listingFee)
```

`updateFields` annotation is out of scope for this documentation.

When `marketPlace.listNFT` method is invoked by `TxScript ListNFT` and
executed by the VM, as shown below:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

`marketPlace.listNFT` is authorized to spend `1.1` ALPH and `1` token
from the caller of the script. If `marketPlace.listNFT` in turm calls
other methods, it can approve a subset of these approved assets to
that method to use as well. For example, in `marketPlace.listNFT` we
have the following code to create a NFT listing:

```rust
let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
    tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
)
```

As we can see, `marketPlace.listNFT` method approves `1` ALPH and `1` Token A to
the `copyCreateSubContract!` built-in function from its total approved
assets (`1.1` ALPH and `1` Token A), before it sends the `listingFee`
to the `NFTMarketPlace` contract itself. The flow of assets can be
illustrated as this:

```
  Caller of the TxScript
  (6.1 ALPH; 1 Token A)
           ||
           ||
           || Substract assets in
           || Fixed outputs
           ||
           ||                    Approves                         Approves
           \/               (1.1 ALPH; 1 TokenA)              (1 ALPH; 1 TokenA)
  (5.1 ALPH; 1 Token A)  ========================> listNFT ========================> copyCreateSubContract!
                                                     ||
                                                     ||
                                                     || To self
                                                     ||
                                                     \/
                                                  (0.1 ALPH)
```

As we can imagine, if we have a bigger tree of method calls, approved
fund will cascade from the root of the tree all the way to the leaves
like water. Asset Permission System makes this flow of the fund
explicit and enforce constrains to each of the method as to what tokens
and how much of them can be spent.

Going back to the transaction, after the execution of the `TxScript`
the generated outputs should look something like this:

```
                        ----------------
                        |              |
                        |              |   1 ALPH (fixed output)
  1 Token A             |              | =====================================>
======================> |              |   1 ALPH (NFTListing contract)
  6.1 ALPHs             |  <TxScript>  | =====================================>
======================> |              |   0.1 ALPH (NFTMarketPlace contract)
                        |              | =====================================>
                        |              |   4 ALPH - gas (change output)
                        |              | =====================================>
                        |              |
                        ----------------
```
