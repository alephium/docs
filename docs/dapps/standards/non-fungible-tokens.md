---
sidebar_position: 30
title: Non-fungible Tokens (NFTs)
sidebar_label: Non-fungible Tokens
---

### Overview

Non-fungible tokens (NFTs) on Alephium have several unique characteristics
compared to NFTs on other blockchains:

- True ownership based on the UTXO model: Like other types of tokens on Alephium, NFTs are securely managed by UTXOs, which are directly owned by addresses. Since UTXOs are protected by users' private keys, even if there are bugs in the NFT contract, users' assets remain safe.

- First-class support for NFTs: Tokens are native assets on Alephium. As a result, users’ NFTs can be easily discovered and displayed by wallets, explorers, and dApps without relying on third-party services.

- Higher security thanks to Alephium’s VM and contract language: Alephium's virtual machine (VM) and contract language eliminate the need for a separate approval transaction during NFT trading, reducing associated risks. This simplifies the process of writing secure NFT contracts for developers with the help of tools such as the [Asset
  Permission System](/dapps/concepts/asset-permission-system).

- Sub-contract system: In Alephium, there is no [mapping](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types) data structure. Collections are created with a parent contract (the collection) and [sub-contracts](http://localhost:3000/ralph/built-in-functions#subcontract-functions) (the items). Each sub-contract represents an NFT in this collection, and all metadata is tied to it. This is a native feature of the Alephium Blockchain that allows Alephium’s NFTs to be unique (one token per sub-contract) or semi-fungible, as the same minting contract can create more than one token.

- Efficient transaction batching: Multiple NFTs and users can be involved in a single transaction.

- Cheaper transaction fees and higher throughput: NFT transactions will benefit from Alephium's sharding algorithm.

- NFT scarcity: The supply of NFTs on Alephium is finite, as each NFT necessitates the deployment of its own individual sub-contract, which in turn requires a deposit of ALPH - currently set at 1 `ALPH`. This unique structure inherently imposes a limit on the production of NFTs on the platform, reinforcing the scarcity of NFTs on Alephium.
  
### Non-fungible Token Standard

Both NFT collections and individual NFTs have metadata associated with
them, such as `collectionUri`, `totalSupply` and `tokenUri`, etc. The
[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral)
and
[INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral)
interfaces standardize the methods to fetch these metadata.

```rust
// Standard interface for NFT collection
@std(id = #0002)
Interface INFTCollection {
   pub fn getCollectionUri() -> ByteVec
   pub fn totalSupply() -> U256
   pub fn nftByIndex(index: U256) -> INFT
   pub fn validateNFT(nftId: ByteVec, nftIndex: U256) -> () // Validates that the NFT is part of the collection, otherwise throws exception.
}

// Standard interface for NFT
@std(id = #0003)
Interface INFT {
   pub fn getTokenUri() -> ByteVec
   pub fn getCollectionIndex() -> (ByteVec, U256) // Returns collection id and index of the NFT in the collection.
}
```

They are also annotated with the `@std` annotations to facilitate
dApps and wallets to infer their contract/token types.

```typescript
// Guess NFT token type
const nftTokenType = await web3.getCurrentNodeProvider().guessStdTokenType(nft.contractId)
expect(nftTokenType).toEqual('non-fungible')

// Check if a contract is a NFT collection
const isNFTCollection = await web3.getCurrentNodeProvider().guessFollowsNFTCollectionStd(nftCollection.contractId)
console.log("Is NFT collection", isNFTCollection)
```

For contracts that implement
[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral)
and
[INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral),
SDK offers a canonical way to fetch their respective metadata:

```typescript
// NFT Collection Metadata
const collectionMetadata = await web3.getCurrentNodeProvider().fetchNFTCollectionMetaData(nftCollection.contractId)
console.log("NFT Collection URI, totalSupply", collectionMetadata.collectionUri, collectionMetadata.totalSupply)

// NFT Metadata
const nftMetadata = await web3.getCurrentNodeProvider().fetchNFTMetadata(nft.contractId)
console.log("NFT Token URI, collection address", nftMetadata.tokenUri, nftMetadata.collectionAddress)
```

For NFT collection, one of the metadata is `collectionUri`, which is
an URI that points to an JSON document with the following schema:

```typescript
interface NFTCollectionUriMetaData {
  name: string            // Name of the NFT collection
  description: string     // General description of the NFT collection
  image: string           // A URI to the image that represents the NFT collection
}
```

For individual NFT, one of the metadata is `tokenUri`, which is an URI
that points to an JSON document with the following schema:

```typescript
interface NFTTokenUriMetaData {
  name: string                           // Name of the NFT
  description?: string                   // General description of the NFT
  image: string                          // A URI to the image that represents the NFT
  attributes?: [                         // Attributes of the NFT
    {
      trait_type: string
      value: string | number | boolean
    }
  ]
}
```

### Wallet Support

Both [Desktop Wallet](/wallet/desktop-wallet/overview) and [Extension
Wallet](/wallet/extension-wallet/overview) have native support for
non-fungible tokens.

Following is an example of displaying and transfering a NFT in the
`Imagine Collection` in the extension wallet:

<img
src={require("./media/show-nft-collection-extension-wallet.png").default} alt="Show collection" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-nft-collection-extension-wallet.png").default} alt="Transfer NFT" width="250" />

