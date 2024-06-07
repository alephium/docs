---
sidebar_position: 20
title: Work with Block
sidebar_label: Work with block
---

## Block Structure

A block contains the following elements:

* `timestamp`: The `timestamp` field records the time at which the block was created
* `chainFrom` and `chainTo`: The chain index of the block
* `hash`: The `hash` of the block, it is a unique identifier for the block
* `height`: The `height` of the block, there may be multiple blocks at the same height
* `target`: The `target` represents the current network difficulty level
* `nonce`: The `nonce` is a number that miners find to satisfy the difficulty target
* `deps`: The `deps` field lists blocks that this block depends on in the blockflow algorithm
* `txsHash`: The `txsHash` field is the merkle root of all transactions in the block
* `depStateHash`: The `depStateHash` field is the hash of the state that this block depends on
* `transactions`: The `transactions` field is a list of transactions included in this block

## Get Block by Hash

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
const blockHash = 'f2d45672bd3876a1b4d8e87dba8764675906c0eaa2bb62945154f9783e0395c0'
// the returned result will contain the block header and a list of transactions within the block
const block = await nodeProvider.blockflow.getBlockflowBlocksBlockHash(blockHash)
```

You can also get all event logs in this block:

```typescript
const blockWithEvents = await nodeProvider.blockflow.getBlockflowBlocksWithEventsBlockHash(blockHash)
const block = blockWithEvents.block
const events = blockWithEvents.events
```

## Get Blocks by TimeStampe Range

```typescript
import { NodeProvider, TOTAL_NUMBER_OF_GROUPS } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://127.0.0.1:12973')
const fromTs = 1685791240000 // the unit is milliseconds
const toTs = 1688383240000
// the returned result contains the main chain blocks of all shards within the timestamp range
const result = await nodeProvider.blockflow.getBlockflowBlocks({ fromTs, toTs })
for (let fromGroup = 0; fromGroup < TOTAL_NUMBER_OF_GROUPS; fromGroup += 1) {
  for (let toGroup = 0; toGroup < TOTAL_NUMBER_OF_GROUPS; toGroup += 1) {
    const chainIndex = fromGroup * TOTAL_NUMBER_OF_GROUPS + toGroup
    console.log(`blocks for chain index ${fromGroup} -> ${toGroup} is `, result.blocks[chainIndex])
  }
}
```

You can also get all event logs of each block:

```typescript
const result = await nodeProvider.blockflow.getBlockflowBlocksWithEvents({ fromTs, toTs })
for (let fromGroup = 0; fromGroup < TOTAL_NUMBER_OF_GROUPS; fromGroup += 1) {
  for (let toGroup = 0; toGroup < TOTAL_NUMBER_OF_GROUPS; toGroup += 1) {
    const chainIndex = fromGroup * TOTAL_NUMBER_OF_GROUPS + toGroup
    console.log(`blocks and events for chain index ${fromGroup} -> ${toGroup} is `, result.blocksAndEvents[chainIndex])
  }
}
```

## Get the Latest Height

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://127.0.0.1:12973')
const chainInfo = await nodeProvider.blockflow.getBlockflowChainInfo({
  fromGroup: 0, // the from group of chain index
  toGroup: 0 // the to group of chain index
})
const latestHeight = chainInfo.currentHeight
```

## Get Blocks Between Heights

Currently, Alephium has 16 chains, and each has a different height. If you need to get blocks between specific heights, you'll need to fetch them separately from each chain.

```typescript
import { NodeProvider, node } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')

async function getBlocksBetweenHeight(fromGroup: number, toGroup: number, fromHeight: number, toHeight: number): Promise<node.BlockEntry[]> {
  const blocks: node.BlockEntry[] = []
  for (let height = fromHeight; height <= toHeight; fromHeight += 1) {
    const hashes = await nodeProvider.blockflow.getBlockflowHashes({ fromGroup, toGroup, height })
    const block = await nodeProvider.blockflow.getBlockflowBlocksBlockHash(hashes[0])
    blocks.push(block)
  }
  return blocks
}
```

## Block Subscription

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