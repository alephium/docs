---
sidebar_position: 30
title: Non-fungible Tokens (NFTs)
sidebar_label: Non-fungible Tokens
---

### Non-fungible Token Standard

On Alephium, an NFT collection is represented by an NFT collection
contract. Individual NFTs within the NFT collections are represented
by the NFT contract.

### NFT

An NFT has its own metadata such as `name`, `description` and
`image`. It's also part of an NFT collection. The standard
[INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral)
interface defines methods that return the URI for the NFT metadata, as
well as the NFT collection it belongs to and its index within the
collection.

```rust
@std(id = #0003)
@using(methodSelector = false)
Interface INFT {
   // Token Uri points to a json file containing metadata for the NFT.
   //
   // The schema of the json file is:
   // {
   //     "title": "NFT Metadata",
   //     "type": "object",
   //     "properties": {
   //         "name": {
   //             "type": "string",
   //             "description": "Name of the NFT"
   //         },
   //         "description": {
   //             "type": "string",
   //             "description": "General description of the NFT",
   //             "nullable": true
   //         },
   //         "image": {
   //             "type": "string",
   //             "description": "A URI to the image that represents the NFT"
   //         },
   //         "attributes": {
   //           "type": "array",
   //           "description": "An array of attributes for the NFT",
   //           "items": {
   //             "type": "object",
   //             "properties": {
   //               "trait_type": {
   //                 "type": "string",
   //                 "description": "The type of trait"
   //               },
   //               "value": {
   //                 "type": ["string", "number", "boolean"],
   //                 "description": "The value of the trait"
   //               }
   //             }
   //           },
   //           "nullable": true
   //         }
   //     }
   // }
   pub fn getTokenUri() -> ByteVec

   // Returns collection id and index of the NFT in the collection.
   pub fn getCollectionIndex() -> (ByteVec, U256)
}
```

### NFT Collection

An NFT collection has its own metadata such as `name`, `description`
and `image`. It also contains a set of NFTs. The
[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral)
interface defines methods to return URI for the NFT collection
metadata and the total supply of the collection. It also defines
methods to validate or return an NFT given its index.

```rust
import "std/nft_interface"

@std(id = #0002)
@using(methodSelector = false)
Interface INFTCollection {
   // Collection Uri points to a json file containing metadata for the NFT collection.
   //
   // The schema of the json file is:
   // {
   //     "title": "NFT Collection Metadata",
   //     "type": "object",
   //     "properties": {
   //         "name": {
   //             "type": "string",
   //             "description": "Name of the NFT collection"
   //         },
   //         "description": {
   //             "type": "string",
   //             "description": "General description of the NFT collection"
   //         },
   //         "image": {
   //             "type": "string",
   //             "description": "A URI to the image that represents the NFT collection"
   //         }
   //     }
   // }
   pub fn getCollectionUri() -> ByteVec

   pub fn totalSupply() -> U256

   pub fn nftByIndex(index: U256) -> INFT

   // Validates that the NFT is part of the collection, otherwise throws exception.
   pub fn validateNFT(nftId: ByteVec, nftIndex: U256) -> ()
}
```

To support NFT royalties,
[INFTCollectionWithRoyalty](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_with_royalty_interface.ral)
is defined with methods to calculate, pay and withdraw royalty:

```rust
import "std/nft_collection_interface"

@std(id = #000201)
@using(methodSelector = false)
Interface INFTCollectionWithRoyalty extends INFTCollection {
    pub fn royaltyAmount(tokenId: ByteVec, salePrice: U256) -> (U256)

    @using(preapprovedAssets = true)
    pub fn payRoyalty(payer: Address, amount: U256) -> ()

    pub fn withdrawRoyalty(to: Address, amount: U256) -> ()
}
```

### Wallet Support

Official [wallets](/wallet) and explorer have native support for
non-fungible tokens.

Following is an example of displaying and transferring a NFT in the
`Imagine Collection` in the extension wallet:

<img
src={require("/img/show-nft-collection-extension-wallet.png").default} alt="Show collection" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("/img/transfer-nft-collection-extension-wallet.png").default} alt="Transfer NFT" width="250" />

