---
sidebar_position: 30
title: First NFT
sidebar_label: First NFT
---

In this guide, we will learn how to create an NFT collection that
complies with the [Non-fungible Token
Standard](/dapps/standards/non-fungible-tokens).

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Understand how to [compile](/dapps/tutorials/quick-start#compile-your-contract)
  and [deploy](/dapps/tutorials/quick-start#deploy-your-contract)
  contracts in a project using [Web3 SDK](/sdk/getting-started)

## Create the NFT contract

An NFT contract that complies with the [Non-fungible Token
Standard](/dapps/standards/non-fungible-tokens) needs to implement
the `INFT` interface, which defines the following two methods:

- `getTokenUri`, which returns the URI to NFT's metadata
- `getCollectionIndex`, which returns the contract ID of the NFT
  collection to which this NFT belongs, as well as the index of this
  specific NFT within the collection

Here is an example of the AwesomeNFT contract:

```rust
import "std/nft_interface"

Contract AwesomeNFT(
  collectionId: ByteVec,
  nftIndex: U256,
  uri: ByteVec
) implements INFT {
  pub fn getTokenUri() -> ByteVec {
    return uri
  }

  pub fn getCollectionIndex() -> (ByteVec, U256) {
    return collectionId, nftIndex
  }
}
```

The NFT metadata pointed to by the token URI should return a json file
with the following schema:

```json
{
    "title": "NFT Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the NFT"
        },
        "description": {
            "type": "string",
            "description": "General description of the NFT"
        },
        "image": {
            "type": "string",
            "description": "A URI to the image that represents the NFT"
        }
    }
}
```

After the NFT contract is created, we should
[deploy](/dapps/tutorials/quick-start#deploy-your-contract)
a dummy version of it as a template contract. This template can be used to create an NFT collection contract more efficiently. A concrete example of
deploying a NFT template contract can be found
[here](https://github.com/alephium/alephium-nft/blob/master/scripts/02_deploy_nft_template.ts).

## Create NFT collection contract

An NFT Collection is also represented as a contract. It needs to
implement the `INFTCollection` interface to comply with the
[Non-fungible Token
Standard](/dapps/standards/non-fungible-tokens). NFTs within an NFT
collection are created as
[sub-contracts](/dapps/concepts/programming-model#sub-contract) from
the NFT collection contract. Following is an example of an NFT
collection contract for the `AwesomeNFT` contract that we created in
the previous section:

```rust
import "std/nft_collection_interface"

Contract AwesomeNFTCollection(
  nftTemplateId: ByteVec,
  collectionUri: ByteVec,
  mut totalSupply: U256
) implements INFTCollection {
  enum ErrorCodes {
    IncorrectTokenIndex = 0
    NFTNotFound = 1
    NFTNotPartOfCollection = 2
  }

  pub fn getCollectionUri() -> ByteVec {
    return collectionUri
  }

  pub fn totalSupply() -> U256 {
    return totalSupply
  }

  pub fn nftByIndex(index: U256) -> INFT {
    checkCaller!(index < totalSupply(), ErrorCodes.IncorrectTokenIndex)

    let nftTokenId = subContractId!(toByteVec!(index))
    assert!(contractExists!(nftTokenId), ErrorCodes.NFTNotFound)

    return INFT(nftTokenId)
  }

  pub fn validateNFT(nftId: ByteVec, nftIndex: U256) -> () {
      let expectedTokenContract =  nftByIndex(nftIndex)
      assert!(nftId == contractId!(expectedTokenContract), ErrorCodes.NFTNotPartOfCollection)
  }

  @using(preapprovedAssets = true, updateFields = true)
  pub fn mint(nftUri: ByteVec) -> (ByteVec) {
    let minter = callerAddress!()

    let (initialImmState, initialMutState) = AwesomeNFT.encodeFields!(selfContractId!(), totalSupply, nftUri)

    let contractId = copyCreateSubContractWithToken!{minter -> ALPH: 1 alph}(
        toByteVec!(totalSupply),
        nftTemplateId,
        initialImmState,
        initialMutState,
        1,
        minter
    )

    totalSupply = totalSupply + 1
    return contractId
  }
}
```

The `INFTCollection` interface defines four methods:

- `getCollectionUri`, which returns the URI to NFT collection's
  metadata
- `totalSupply`, which defines the total supply of NFTs for this
  collection
- `nftByIndex`, which returns the NFT given its index in the collection
- `validateNFT`, which checks if an NFT is part of this NFT collection

The metadata of the NFT collection pointed to by collection URI should
return a json file with the following schema:

```json
{
    "title": "NFT Collection Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the NFT collection"
        },
        "description": {
            "type": "string",
            "description": "General description of the NFT collection"
        },
        "image": {
            "type": "string",
            "description": "A URI to the image that represents the NFT collection"
        }
    }
}
```

The `mint` function is responsible for minting an NFT in this
collection. It takes the metadata URI for the new NFT as parameter and
creates a
[sub-contract](/dapps/concepts/programming-model#sub-contract) using
the `AwesomeNFT` template and issued exactly `1` token for it. It also
increments the total supply of the collection by one.

That's all for creating a NFT collection contract! You can
now [deploy](/dapps/tutorials/quick-start#deploy-your-contract)
this contract and get its contract id back.

## Mint NFT

If we have prepared the metadata URI for the NFT, we can mint it by
calling the `mint` function in `AwesomeNFTCollection` contract using
[TxScript](/sdk/interact-with-contracts#txscript-transactions).

```rust
TxScript MintAwesomeNFT(
    awesomeNFTCollection: AwesomeNFTCollection,
    nftUri: ByteVec
) {
  awesomeNFTCollection.mint{callerAddress!() -> ALPH: 1 alph}(nftUri)
}
```

## Interact with the NFT

For contracts that implement `INFTCollection` and `INFT` interfaces,
[Web3 SDK](/sdk/getting-started) offers a canonical way to fetch their respective metadata:

```typescript
// NFT Collection Metadata
const collectionMetadata = await web3.getCurrentNodeProvider().fetchNFTCollectionMetaData(nftCollection.contractId)
console.log("NFT Collection URI, totalSupply", collectionMetadata.collectionUri, collectionMetadata.totalSupply)

// NFT Metadata
const nftMetadata = await web3.getCurrentNodeProvider().fetchNFTMetadata(nft.contractId)
console.log("NFT Token URI, collection address", nftMetadata.tokenUri, nftMetadata.collectionAddress)
```

These interfaces also enable SDK to guess their types, so that dApps
and wallets can handle them respectively:


```typescript
// Guess NFT token type
const nftTokenType = await web3.getCurrentNodeProvider().guessStdTokenType(nft.contractId)
expect(nftTokenType).toEqual('non-fungible')

// Check if a contract is a NFT collection
const isNFTCollection = await web3.getCurrentNodeProvider().guessFollowsNFTCollectionStd(nftCollection.contractId)
console.log("Is NFT collection", isNFTCollection)
```

## What's Next

Congratulations, now you know how to mint your first NFT! If you are
interested in understanding more about how to create NFT collections
and trade them in a marketplace, you can find an example NFT
marketplace [here](https://github.com/alephium/alephium-nft).
