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