---
sidebar_position: 20
title: Asset Permission System
sidebar_label: Asset permission system
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

The Asset Permission System (APS) is one of Ralph's unique
features. It explicitly stipulates the flow of assets at code level,
giving confidence to developers and users of the smart contracts that
all asset transfers happen as intended. Together with the UTXOs model,
it also offers a simpler and more secure user experience by
eliminating the token approval risks in systems such as EVM.

Alephium uses the
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
model where assets, including the native ALPH and other tokens are
managed by UTXOs while smart contracts and their states are managed
using account-based model.

This has a few implications:

1. Simple asset transfers among users only require UTXOs, which is
   battle tested for its security in managing assets. Here no smart
   contracts are involved.
2. When smart contracts need to transfer assets on behalf of the
   owners, no separate approval transactions are required. The
   approval is implicit in the UTXO model: if the input that contains
   a particular token is authorized to be spent in the transaction,
   then the owner has already given consent to the usage of that token
   in the context of this transaction, meaning that the smart
   contracts that get invoked in the same transaction can
   potentially transfer the token.

Now the question is: in the second situation, how can we make sure
that the assets implicitly approved in the transaction using the UTXO
model can be handled securely by the smart contracts? The answer is
Ralph's Asset Permission System (APS).

## Flow of Assets

To interact with the smart contracts in Alephium, a transaction needs
to execute a `TxScript`. In the following example transaction, there
are two inputs, one fixed outputs and a `TxScript`:

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

Two things are worth noting here:

1. Even though there is only one fixed output, there will be more
   outputs generated for this transaction. The generated outputs
   depend on the result of the `TxScript` execution.
2. The total assets available for `TxScript` (including the smart
   contracts it invokes) are `5.1` ALPHs and `1` Token A, because we
   need to subtract the `1` ALPH in fixed output.

Let's say the `TxScript` looks something like this:

```rust
TxScript ListNFT(
    tokenAId: ByteVec,
    price: U256,
    marketPlace: NFTMarketPlace
) {
    let listingFee = marketPlace.getListingFee()
    let minimalAlphInContract = 1 alph
    let approvedAlphAmount = listingFee + minimalAlphInContract

    marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
}
```

As you may have guessed, Token A is an NFT token and the purpose of
the above `TxScript` is to list it through a marketplace smart contract.

The following line of code is of particular interest:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

The code inside of the curly braces explicitly approves that
`approvedAlphAmount` ALPH and `1` token A are allowed to be spent in
the `marketPlace.listNFT` function, even though the total amount of
assets available for `TxScript` are `5.1` and `1` for ALPH and token A
respectively.

The following scenarios could happen:

1. If `approvedAlphAmount` turns out to be more than `5.1` ALPH, then
   the transaction fails with `NotEnoughBalance` error.
2. If `approvedAlphAmount` is less than `5.1` ALPH, say `1.1` ALPH,
   then maximum amount of assets that `marketPlace.listNFT` can handle
   are `1.1` ALPHs and `1` token A. `marketPlace.listNFT` does not
   have access to the rest of the `4` ALPHs.
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

First thing to notice is the annotation for the `listNFT` method:

```rust
@using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
```

`preapprovedAssets = true` tells VM that the `listNFT` method intends
to use some assets and the caller is supposed to approve a set of
necessary assets or else a compilation error will be
reported. Compilation will also fail if the caller tries to approve
assets for a method where `preapprovedAssets = false`.

`assetsInContract = true` indicates to the VM that the `listNFT`
method wants to update the asset of the `NFTMarketPlace`
contract. Compiler will make sure that the `listNFT` method indeed
does that or else an compilation error will be reported. In this case,
`listNFT` updates the asset of the `NFTMarketPlace` contract by
transferring the `listingFee` to it:

```rust
// Charge the listing fee
transferTokenToSelf!(tokenOwner, ALPH, listingFee)
```

`updateFields` annotation is out of scope for this documentation.

`marketPlace.listNFT` method is invoked by `TxScript` `ListNFT`, as
shown below:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

When `marketPlace.listNFT` is executed by the VM, it is authorized to
spend `1.1` ALPH and `1` token from the caller of the script. If
`marketPlace.listNFT` in turn calls other methods, it can approve a
subset of these approved assets to that method as well. For example,
in `marketPlace.listNFT` we have the following code to create a NFT
listing:

```rust
let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
    tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
)
```

As we can see, `marketPlace.listNFT` method approves `1` ALPH and `1`
Token A to the `copyCreateSubContract!` built-in function from its own
pool of approved assets (`1.1` ALPH and `1` Token A), before it sends
the `listingFee` to the `NFTMarketPlace` contract itself. The flow of
assets is illustrated below:

```
  Caller of the TxScript
  (6.1 ALPH; 1 Token A)
           ||
           ||
           || Subtract assets in
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

As we can imagine, if we have a bigger tree of method calls, the
approved fund will cascade from the root of the tree all the way to
the leaves like water. Asset Permission System makes this flow of the
fund throughout the method calls explicit and enforce constraints to
each of the methods as to what tokens and how much of them can be
spent.

Going back to the transaction, after the execution of the `TxScript`
the generated outputs should look something like this:

```
                        ----------------
                        |              |
                        |              |   1 ALPH (fixed output)
  1 Token A             |              | =========================================>
======================> |              |   1 ALPH, 1 Token A (NFTListing contract)
  6.1 ALPHs             |  <TxScript>  | =========================================>
======================> |              |   0.1 ALPH (NFTMarketPlace contract)
                        |              | =========================================>
                        |              |   4 ALPH - gas (change output)
                        |              | =========================================>
                        |              |
                        ----------------
```

## Summary

Asset Permission System (APS) dictates the flow of assets in smart
contracts. The explicit approval of the assets for each method
invocation ensures that the methods can never spend more than what
they are authorized for. Together with the UTXO model, it offers an
asset management solution that is simpler, more reliable and more
secure.