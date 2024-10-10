---
sidebar_position: 20
title: Work with Block
sidebar_label: Work with block
---

Block is a data structure that aggregates
[transactions](./transaction.md) and includes them into a
blockchain. Other than the common attributes that we might see
in blocks on other blockchains, block data structure on Alephium has a
few special attributes used by the [Blockflow](/misc/content/#)
algorithm to implement [sharding](/misc/glossary.md#sharding).


Alephium currently runs 4 groups and 16 chains, each chain is
responsible for processing transactions from one group to another
group, for example, `0->0`, `1->2`, `2->1`, `3->0`, etc. Each block on
Alephium is part of a chain, the last two bytes of the block `hash`
encodes the chain where it belongs to.

A block on Alephium references a list of blocks from different chains
in the attribute `blockDeps`, as opposed to other blockchains where
only the parent block is referenced. [Blockflow](/misc/content/#)
algorithm leverages this information to maintain the integrity of the
sharded ledger while increasing throughput. For a more detailed
description of the Blockflow algorithm and the `blockDeps` attribute,
please read [An introduction to Blockflow: Alephium’s sharding
algorithm](https://medium.com/@alephium/an-introduction-to-blockflow-alephiums-sharding-algorithm-bbbf318c3402).

The block data structure consists of the following attributes:

```
timestamp    : The time at which the block was created
hash         : Unique identifier for the block, last two bytes identifies the chain it belongs to.
height       : Block height, there may be multiple blocks at the same height
target       : Current network difficulty level
nonce        : A number that miners brute force to satisfy the difficulty target
blockDeps    : Lists block hashes from different chains that this block depends on
txsHash      : The merkle root of all transactions in the block
depStateHash : Hash of the state that this block depends on
transactions : List of transactions included in this block
```

In the following sections, we will learn how to query and subscribe to
the blocks information. First, let's get hold of an instance of
`NodeProvider`:

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
```

## Query Blocks

Blocks can be queried by hash, height and between timestamps.

### By Hash

We can query block and block [events](./events.md) by block hash:

```typescript
const blockHash = 'f2d45672bd3876a1b4d8e87dba8764675906c0eaa2bb62945154f9783e0395c0'
const block = await nodeProvider.blockflow.getBlockflowBlocksBlockHash(blockHash)
console.log("block", block)

const blockWithEvents = await nodeProvider.blockflow.getBlockflowBlocksWithEventsBlockHash(blockHash)
console.log("block", blockWithEvents.block)
console.log("block events", blockWithEvents.events)
```

### By Height

We can also query blocks at a specific height. Note that each of the
16 chains has its own height, at each height there might be
multiple blocks and the first one is the canonical block.

```typescript
const hashes = await nodeProvider.blockflow.getBlockflowHashes({ fromGroup: 0, toGroup: 0, height })
const block = await nodeProvider.blockflow.getBlockflowBlocksBlockHash(hashes[0])
console.log('canonical block', block)
```

If we want to get the blocks between heights, we need to query them per
chain:

```typescript
const fromHeight = 1000
const toHeight = 2000
const blocks: node.BlockEntry[] = []
for (let height = fromHeight; height <= toHeight; fromHeight += 1) {
  const hashes = await nodeProvider.blockflow.getBlockflowHashes({ fromGroup: 0, toGroup: 0, height })
  const block = await nodeProvider.blockflow.getBlockflowBlocksBlockHash(hashes[0])
  blocks.push(block)
}
console.log(`canonical blocks between ${fromHeight} and ${toHeight}`, blocks)
```

Here is what we can do to get the latest height for a chain:

```typescript
const chainInfo = await nodeProvider.blockflow.getBlockflowChainInfo({ fromGroup: 0, toGroup: 0 })
console.log("latest height", chainInfo.currentHeight)
```

### Between TimeStamps

We can query blocks across all chains between two timestamps:

```typescript
import { TOTAL_NUMBER_OF_GROUPS } from '@alephium/web3'

const fromTs = 1685791240000 // the unit is milliseconds
const toTs = 1688383240000
const result = await nodeProvider.blockflow.getBlockflowBlocks({ fromTs, toTs })
for (let fromGroup = 0; fromGroup < TOTAL_NUMBER_OF_GROUPS; fromGroup += 1) {
  for (let toGroup = 0; toGroup < TOTAL_NUMBER_OF_GROUPS; toGroup += 1) {
    const chainIndex = fromGroup * TOTAL_NUMBER_OF_GROUPS + toGroup
    console.log(`blocks for chain index ${fromGroup} -> ${toGroup} is `, result.blocks[chainIndex])
  }
}
```

Replace the `getBlockflowBlocks` function with
`getBlockflowBlocksWithEvents` function to get the blocks along side
with the events emitted from the blocks.

## Block Subscription

To handle new blocks in real time, the [Typescript
SDK](/sdk/getting-started) provides blocks subscription functionality
for a specific chain. It offers callback functions to handle new
blocks, errors as well as chain re-orgs:

```typescript
import { node, BlockSubscribeOptions, BlockSubscription } from '@alephium/web3'

const options: BlockSubscribeOptions = {
  // the unit is milliseconds
  pollingInterval: 1000,
  // the `messageCallback` will be called when a new block is received
  messageCallback: (block: node.BlockEntry) => {
    console.log(`received block: ${block}`)
  },
  // the `errorCallback` will be called when an error occurs
  errorCallback: (err: any) => {
    console.error(err)
  },
  // the `reorgCallback` will be called when reorg occurs 
  reorgCallback: (orphanBlocks: node.BlockEntry[], newBlocks: node.BlockEntry[]) => {
    console.log(`reorg occur, orphan blocks: ${orphanBlocks}, new blocks: ${newBlocks}`)
  }
}

const fromGroup = 0
const toGroup = 0

// it will subscribe to blocks starting from height `fromBlockHeight`
const fromBlockHeight = 670100
const subscription = new BlockSubscription(options, fromGroup, toGroup, fromBlockHeight)
subscription.subscribe()

// unsubscribe
subscription.unsubscribe()
```

### WebSocket Support

Alephium full node also supports streaming blocks using
WebSocket. Here is an example using
[wscat](https://github.com/websockets/wscat) from terminal:

```bash
$ wscat -c wss://node.mainnet.alephium.org/events
Connected (press CTRL+C to quit)
< {"method":"block_notify","params":{"hash":"0000000000002bc06aac6acb3bf983bd6d97d3c85e22ede07d55d59d108ef165","timestamp":1728544859844,"chainFrom":1,"chainTo":1,"height":1826597,"deps":["0000000000001de862d80529c1f539c96f8b9dcb42482edf68da5e3e42f7e480","00000000000011f838f9bd5e5be68b865c5c6b5acffd0af0d38f710ad69097aa","0000000000001f88535dda19bf72dcaf94f29c9067e5fa822c736c7c2731901f","000000000000168caff24e31a69817cd795d42b0b07fbb334957bc0cae0c61b4","00000000000032dafa8539cc52740a26c310a5fc6b9d1700242ffb3671936df5","0000000000003376aed6f7183c6abae082040b0e2a535685c03fc78b00776926","00000000000031bdaae0b4b9847f37a104a46b5de87b42f6a8f53ae7c3fe0857"],"transactions":[{"unsigned":{"txId":"11552292f3738a7e5f6decb31ac6ef688942828cf5688093050722779b4e9a87","version":0,"networkId":0,"gasAmount":20000,"gasPrice":"1000000000","inputs":[],"fixedOutputs":[{"hint":11663143,"key":"34f1fa6533b03f2ca8c4bb59d4dc0694277d2c8093cffb42d63d969d363c1072","attoAlphAmount":"485591478228368529","address":"1ANu47GYWwprmQJUgPpBsYb1mDoqxTDyVkCSg2C4NbtDp","tokens":[],"lockTime":1728574859844,"message":"010100000192754d66c400"}]},"scriptExecutionOk":true,"contractInputs":[],"generatedOutputs":[],"inputSignatures":[],"scriptSignatures":[]}],"nonce":"17a50000000000000000000000000000000602f633e2f5e4","version":0,"depStateHash":"a9f5ae1e71270952df22595efd0d43030f311a2c044006ef98af10bfb310402c","txsHash":"2171272f353e30871ffe87808798c2de38aa2d21b82cd938a4695084a7e4c6ca","target":"1a3bca56","ghostUncles":[]},"jsonrpc":"2.0"}
< {"method":"block_notify","params":{"hash":"000000000000014f3963fc99219e35dfaf2fb78f38c40c9610e21a65cb2e6885","timestamp":1728544861236,"chainFrom":1,"chainTo":1,"height":1826598,"deps":["0000000000001de862d80529c1f539c96f8b9dcb42482edf68da5e3e42f7e480","00000000000011f838f9bd5e5be68b865c5c6b5acffd0af0d38f710ad69097aa","0000000000001f88535dda19bf72dcaf94f29c9067e5fa822c736c7c2731901f","000000000000247e2264fd2118df85c574193b00e2ad664acc9474b8748187d4","0000000000002bc06aac6acb3bf983bd6d97d3c85e22ede07d55d59d108ef165","0000000000003376aed6f7183c6abae082040b0e2a535685c03fc78b00776926","00000000000031bdaae0b4b9847f37a104a46b5de87b42f6a8f53ae7c3fe0857"],"transactions":[{"unsigned":{"txId":"428fff327e8903ada7da54b691d66bab9d4efdaba206b4b88ce52658e0618115","version":0,"networkId":0,"gasAmount":20000,"gasPrice":"1000000000","inputs":[],"fixedOutputs":[{"hint":11663143,"key":"5cd06a6c145038abc461af62b3e7a7aa8d5e2b086a3a9d4741e708a9f519367c","attoAlphAmount":"485591478228368529","address":"1ANu47GYWwprmQJUgPpBsYb1mDoqxTDyVkCSg2C4NbtDp","tokens":[],"lockTime":1728574861236,"message":"010100000192754d6c3400"}]},"scriptExecutionOk":true,"contractInputs":[],"generatedOutputs":[],"inputSignatures":[],"scriptSignatures":[]}],"nonce":"afd0d72cd25dd99c00000000000000000000000000000000","version":0,"depStateHash":"a8b7c9509288c35cc9b4a7aa839196742c025428d763346d51ac264846b9b492","txsHash":"8a649a2e51f327dd61430d8ad3d2d7028178019566fc362c872a5286057d6ac9","target":"1a3bca56","ghostUncles":[]},"jsonrpc":"2.0"}
```

Here is an example of how to interact with it using the
[ws](https://www.npmjs.com/package/ws) package in Typescript:


```typescript
import WebSocket from 'ws';

const ws = new WebSocket('wss://node.mainnet.alephium.org/events');

ws.on('error', console.error);
ws.on('open', function open() {
  console.log('Websocket opened for streaming blocks')
});
ws.on('message', function message(data) {
  const blockNotify = JSON.parse(data)
  console.log('received block: %s', blockNotify.params);
});
```

Upon execution, the output should look like:

```bash
Websocket opened for streaming blocks
received block: {
  hash: '000000000000062812eecd7bf1d35735f41a126775dc1357ea9404103f3eadd2',
  timestamp: 1728546104068,
  chainFrom: 0,
  chainTo: 2,
  height: 1840666,
  deps: [Array],
  transactions: [Array],
  nonce: '43c700000b4ff096c36100003d5e00000000000000000000',
  version: 0,
  depStateHash: '164ba3910631ba7fa6654aa71ec37b499cf2cc768afb0e6c7be55314d2b0c5b2',
  txsHash: '4bd7b86ba04a981c2d8c5a0b0a29032e2573410d39da5e9dab72eb60f20f4559',
  target: '1a459e17',
  ghostUncles: []
}
received block: {
  hash: '00000000000020cc8f37709c18b0d3f565916b9297be6525047761045d2844da',
  timestamp: 1728546100153,
  chainFrom: 2,
  chainTo: 2,
  height: 1802518,
  deps: [Array],
  transactions: [Array],
  nonce: 'e0f100000000000000000000000000000090003bad09095b',
  version: 0,
  depStateHash: '27fa549989b486cd705fb5cd0315859848cb3ae59f4d47174217452b7c25c2c8',
  txsHash: '8c22a37fd4bf967344abf40acdd29c00e2705c7b5730fcda835c93894e00ea54',
  target: '1a439700',
  ghostUncles: []
}
...
```