---
sidebar_position: 50
title: Mining
sidebar_label: Mining
---


This document aims to simplify the integration of Alephium for mining pools and miners. It covers:

- The communication protocol between the mining pool and the full node
- How miners calculate and validate the block hash based on mining jobs

For the implementation of the communication protocol between mining pools and miners, refer to the Stratum protocol [here](/mining/alephium-stratum.md). Note that mining pools do not follow this protocol exactly.

This document references the code from the [mining-pool](https://github.com/alephium/mining-pool) and [gpu-miner](https://github.com/alephium/gpu-miner) repositories.

:::tip Test Environment

Due to difficulty instability on the testnet, mining has become permissioned. To assist with pool and miner testing, we have prepared a local testnet environment. You can check it out here: [Local Testnet Environment for Mining Pools](https://github.com/alephium/alephium-stack/tree/master/mining-pool-local-testnet).

:::

## Connect to Full Node

The mining pool needs to connect to the Alephium full node to get mining jobs. The default mining API server is `localhost:10973`.

The mining pool communicates with the full node through a binary TCP protocol, formatted as follows:

```
MessageSize(4 bytes) + Message(1 byte ProtocolVersion + 1 byte MessageType + Payload)
```

### Get Jobs From Full Node

The mining API protocol is a push-based model designed to provide the lowest latency for pools and miners. Every time the full node receives a new block, it sends a `Jobs` message to the mining pool. You can set the time interval in the [mining configuration](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/system_prod.conf.tmpl#L6) of the full node to send `Jobs` messages when there are no new blocks.

If your pool uses a pull-based model, you can cache the jobs received from the full node and regularly pull the latest jobs from the cache.

Currently, Alephium has 16 chains, so there will be 16 block templates in each `Jobs` message. Each block template includes:

- `fromGroup` and `toGroup`: the chain index of the block template.
- `headerBlob`: serialized binary data of the [BlockHeader](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/BlockHeader.scala#L28), excluding the first 24 bytes (nonce).
- `txsBlob`: serialized binary data of the transactions, usually empty and encoded as `#00`.
- `targetBlob`: serialized binary data of the [Target](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/Target.scala#L32).
- `height`: the height of the block template.

Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js) to learn more about the format and parsing of the `Jobs` message.

Once the mining pool receives the `Jobs` message from the full node, it can distribute the mining jobs to miners based on their hashrate. For each chain, calculating the nonce only requires the `targetBlob` and `headerBlob` fields. Therefore, the mining pool can save bandwidth by excluding the `txsBlob` field when sending mining jobs to miners. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/blockTemplate.js#L51).

### Job Distribution

Since full node `v4.0.2`, we have introduced a `min-task-broadcast-interval` config to allow mining pools to customize the broadcast interval of mining tasks, which defaults to 250 millis. You can configure this by adding `alephium.mining.min-task-broadcast-interval = xxx milli` to the `user.conf` file.

Some miner software works on a single job, while others support exactly 16 jobs received from the pool. To maximize compatibility, the pool can send a single job to each miner.

The simplest approach is to send a random job from the 16 available jobs to each miner. The ideal approach is to distribute the 16 jobs evenly to miners based on their hashrate, ensuring each chain receives the same amount of hashrate. While this method is more efficient, it will take more time to implement.

### Submitting Blocks to Full Node

Once the mining pool receives a valid `nonce` from the miner, it can send the block to the full node. The block is composed of `nonce`, `headerBlob`, and `txsBlob`. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/pool.js#L119).

Then, refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/daemon.js#L49) to construct a valid `SubmitBlock` message and send it to the full node.

After the full node verifies the block, it will send a `SubmitBlockResult` message to inform the mining pool whether the block is valid. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js#L77) to parse the `SubmitBlockResult` message.

### Migrate to the Latest Mining Protocol

Since full node `v3.6.0`, the mining protocol introduces some breaking changes:

1. Each message type includes a version number. The current mining protocol version is `1`.
2. The `Job` message includes a block height field.
3. The `SubmitResult` message includes a block hash field.

To migrate to the latest full node, please refer to the changes in [this commit](https://github.com/alephium/mining-pool/pull/66/commits/eacc46188b2f34245d510e59d1bf1e9f256ec611).

### Uncle Block Reward

:::info Node Version
You need to upgrade your full node to newer than v4.0.0.
:::

Alephium uses the ghost algorithm similar to ETH. A mainchain block may reference uncle blocks, and both the miner of the mainchain block and the miner of the uncle block will receive rewards. Therefore, the mining pool needs to distribute rewards to the miners of the uncle blocks.

You can use the `/blockflow/main-chain-block-by-ghost-uncle/{ghost_uncle_hash}` endpoint to check if an uncle block is referenced by a mainchain block. For example, for an uncle block on the testnet: `000000a564aee62ac46855b0a6a0736ec259e95c1252272de4fe202c371c1a20`, this endpoint will return the following mainchain block:

<details>
<summary>Block Response Example</summary>
<p>
```javascript
{
  "hash":"00000076f4adf5ee7ff91e0fda7088e12c8bdd1553b3c95288c37d04ad1ee3d0",
  "timestamp":1716261007992,
  "chainFrom":0,
  "chainTo":0,
  "height":632961,
  "deps":[
    "00000033dad20af73f09c29f7e6333854fb44b1c8a82c0cf448fffe5eec4a1a5",
    "00000054404bfb8fc397d95203e9d09732a284c666ff508d0f90fd96fccd067a",
    "0000007739e8c65d39a03cb73ab1f6ae17f9de4b67e97a8b43f7e0ab8c0819ff",
    "0000004d45095dd2114fdbda7cc20575f547e508e5599aa388d4dcee4e01be30",
    "000000162f5f3463e8ac4a27cb7a63abafd234a234e2f956f63f5f7744f0a581",
    "0000002151846d02557e6008cdc314a946d29216ed2930c04ecac978bd600472",
    "00000075dcf3ed177ce0d161cc93c5f747d5f3688ba962dd928120119c4bc383"
  ],
  "transactions":[ ... ],
  "nonce":"c04744ecf7889f3de49a1cef5fa994931dc7b95b607893be",
  "version":0,
  "depStateHash":"3bbd325821f969797b5284d47dfca956feced089aa69420027601c1817a77573",
  "txsHash":"015be6536b6e97da140151cbadd75f6c2768ed7854c3632b86f88ec0a473218e",
  "target":"1de4161a",
  "ghostUncles":[
    {
      "blockHash":"000000a564aee62ac46855b0a6a0736ec259e95c1252272de4fe202c371c1a20",
      "miner":"1AuWeE5Cwt2ES3473qnpKFV96z57CYL6mbTY7hva9Xz3h"
    }
  ]
}
```
</p>
</details>

In the `ghostUncles` field, we can see that this mainchain block references the uncle block. And there are two outputs in the coinbase tx: the first output is the reward for the mainchain block, and the second is the reward for the uncle block.

A mainchain block can reference up to two uncle blocks. The first output of the coinbase transaction is the reward for the mainchain block, and the subsequent outputs are the uncle rewards. The order of uncle rewards in `fixedOutputs` is the same as the order of uncles in `ghostUncles`. You can refer to the implementation [here](https://github.com/alephium/mining-pool/blob/9b87dc4eceaab90911998a2ac36165bdfa30572f/lib/shareProcessor.js#L149).

You may need to wait for a while to confirm whether an orphan block is an uncle block. If the height of the orphan block is `h`, it can be referenced by a mainchain block with a height in the range of `[h+1, h+7]`. Therefore, you need to wait about `7 * 16s`. However, due to variability in block time, you may need to wait longer to ensure that the uncle block miners receive their rewards.

If an uncle block is not referenced by any mainchain block, it means that the uncle block is an orphan block and will not receive any rewards. In this case, the `/blockflow/main-chain-block-by-ghost-uncle/{ghost_uncle_hash}` endpoint will return a 404 error with the following error message:

```json
{
  "detail": "The mainchain block that references the ghost uncle block {ghost_uncle_hash} not found"
}
```

## Miner

### Calculate the Block Hash

In Alephium, the `nonce` is 24 bytes, and the block hash is `blake3(blake3(serialize(blockHeader)))`. The `blockBlob` in each job is the serialized binary data of `BlockHeader`, excluding the `nonce` field. Therefore, when calculating the block hash, the miner needs to prepend the `nonce` to the `headerBlob`. Refer to the code [here](https://github.com/alephium/gpu-miner/blob/master/src/worker.h#L135) and [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#L314).

### Check the Chain Index

In addition to checking the target, the miner also needs to check the chain index of the block, as Alephium encodes the chain index into the block hash. Refer to the code [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#LL303C2-L303C2) to verify whether the chain index of the block hash is correct.

### Modify the TimeStamp of Jobs

If you need to adjust the timestamp of your jobs to create variants for different miners, you could use this [utility function](https://github.com/alephium/mining-pool/blob/80d252e6fcb5b1182a69b5fb4f06f9f5806f1144/lib/messages.js#L91-L99). Please note that the timestamp of mined blocks should not be too far ahead of the network timestamp. It's recommended to keep the delta under 4 seconds to avoid issues.

## UTXO Management

Due to the limited number of inputs that can be included in each transaction, withdrawals may fail if a miner's wallet is filled with small UTXOs. Some miners tend to send mining rewards directly to exchange addresses. If that's the case, please follow the guide [here](/integration/exchange#utxo-management).

If the node wallet is used for mining, here are simpler and more efficient ways to consolidate the UTXOs.

### Consolidate UTXOs for the Active Address

```shell
# Consolidate UTXOs for the active address
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/sweep-active-address' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "toAddress": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3"
}'
```

Note that this will only consolidate the UTXOs for the active address. To consolidate UTXOs for other addresses, update each address to active and run the same command.

```shell
# Change active address
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/change-active-address' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y"
}'
```

### Consolidate UTXOs for All Addresses

The simplest way to consolidate UTXOs for all addresses in the node wallet is to use the `sweep-all-addresses` endpoint:

```shell
# Consolidate UTXOs for all addresses
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/sweep-all-addresses' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "toAddress": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3"
}'
```
