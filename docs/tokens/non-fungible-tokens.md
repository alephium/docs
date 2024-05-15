---
sidebar_position: 30
title: Non-fungible Tokens (NFTs)
sidebar_label: Non-fungible Tokens
---

Non-fungible tokens (NFTs) on Alephium have several unique characteristics
compared to NFTs on other blockchains:

- True ownership based on the UTXO model: Like other types of tokens on Alephium, NFTs are securely managed by UTXOs, which are directly owned by addresses. Since UTXOs are protected by users' private keys, even if there are bugs in the NFT contract, users' assets remain safe.

- First-class support for NFTs: Tokens are native assets on Alephium. As a result, users’ NFTs can be easily discovered and displayed by wallets, explorers, and dApps without relying on third-party services.

- Higher security thanks to Alephium’s VM and contract language: Alephium's virtual machine (VM) and contract language eliminate the need for a separate approval transaction during NFT trading, reducing associated risks. This simplifies the process of writing secure NFT contracts for developers with the help of tools such as the [Asset
  Permission System](/ralph/asset-permission-system).

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

### AlephiumNFT Marketplace

[AlephiumNFT](https://github.com/alephium/alephium-nft) marketplace is
a proof-of-concept NFT marketplace to show case the capabilities of
NFTs on Alephium. Here you can create NFT collections, discovery, mint
and trade NFTs. You can also launch [Opensea
Drop](https://docs.opensea.io/docs/drops-on-opensea) style public sale
campaigns for your NFT collections. These campaigns are called `Flows`
on `AlephiumNFT` marketplace.

Create your own NFT collections should be pretty
straightforward. Follow this [Twitter
thread](https://twitter.com/alephium/status/1674397159947649030) for
more details. If you want to create a `Flow` on `AlephiumNFT`
marketplace,
[@alephium/cli](https://www.npmjs.com/package/@alephium/cli) has a
`nft` subcommand that can help with that.

#### Create Flows

Let's say you want to launch a public sale for your NFT collection
that has `5` individual NFTs. Before you create a `Flow` for it, you
should have `5` images ready first. If not, `@alephium/cli` offers a
command for you to generate images using OpenAI's
[DALL.E](https://openai.com/research/dall-e) models:

```bash
export OPENAI_API_KEY=xxxx-xxxx-xxxx-xxxx
npx @alephium/cli@latest nft generate-images-with-openai --number 5 -d /tmp/imagine "imagine all the people, living life in peace"
```

This will create `5` images with the prompt `imagine all the
people, living life in peace` and store them under the `/tmp/imagine`
directory. Please skip this step if you have designed the images for
your collection already.

Assuming that the images are ready under the `/tmp/imagine`
directory. Next step is to create a metadata file in YAML format for
your collection. Here is an example of an YAML file called `imagine.yaml`:

```bash
> ls /tmp/imagine
0.jpg  1.jpg  2.jpg  3.jpg  4.jpg

> cat imagine.yaml
0.jpg:                              # File name of the image
  attributes:                       # Attributes of the NFT, optional
    - color: blue                   # Value of the attributes can be `number`, `boolean` or `string`
    - is_outdoor: true
1.jpg:
  description: Imagine is too naive # Description of the NFT, optional
2.jpg:
  name: Imagine in Asia             # Name of the NFT, optional
  attributes:
    - color: blue
    - is_outdoor: false
3.jpg:                              # Name is auto-generated as #${index} if not specified, e.g. #04
4.jpg:
```

When you are happy about the images and metadata of your collection,
run the following command to upload the images and metadata to IPFS:

```bash
> export IPFS_INFURA_PROJECT_ID=xxxx-xxxx-xxxx-xxxx
> export IPFS_INFURA_PROJECT_SECRET=xxxx-xxxx-xxxx-xxxx
> npx @alephium/cli@latest nft upload-images-and-metadata-to-ipfs -m imagine.yaml -d /tmp/imagine -i imagine
NFTBaseUri:
https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/
```

The `NFTBaseUri` points to an IPFS directory where `5` documents are
named and stored based on their sequence in the `imagine.yaml` file:

<img src={require("./media/ipfs-imagine-directory.png").default} alt="IPFS Imagine Directory"/>

Each of the document points to the metadata of an NFT and can be
referenced by their
indexes. E.g. `https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/2`
points to the metadata of the 3rd NFT:

```bash
> curl https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/2 | jq
{
  "name": "Imagine in Asia",
  "image": "https://ipfs.io/ipfs/QmbLevU4kVnQCCoYt23mKhdowJ7TnNNT9dRyVw9AyQDJty/2.jpg",
  "attributes": [
    {
      "trait_type": "color",
      "value": "blue"
    },
    {
      "trait_type": "is_outdoor",
      "value": false
    }
  ]
}
```

You can validate if a `NFTBaseUri` is valid using the following
command:

```bash
> npx @alephium/cli@latest nft validate-enumerable-nft-base-uri --nftBaseUri https://ipfs.io/ipfs/QmbLevU4kVnQCCoYt23mKhdowJ7TnNNT9dRyVw9AyQDJty/ --maxSupply 5
Token Metadataz:
[
  {
    name: '#0',
    ....
  },
  ....
]
```

After `NFTBaseUri` is created, we are ready to launch the `Flow` on `AlephiumNFT` Marketplace:

<img src={require("./media/create-flow-page.png").default} alt="Create FLow Page"/>

As illustrated above, you can put in the collection image, the max
batch mint size, the mint price, the name and description of the
collection, and most importantly the NFT base URI that we created in
the last step. After you click the `Create NFT Collection` button and
sign the transaction, you will successfully create your first `Flow`,
share the link and start to launch the public sale of your NFT
collection!

<img src={require("./media/flow-page.png").default} alt="FLow Page"/>

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

