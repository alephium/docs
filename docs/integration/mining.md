---
sidebar_position: 50
title: Mining
sidebar_label: Mining
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

This document aims to simplify the integration of Alephium for mining pools and miners. It covers:

- The communication protocol between the mining pool and the full node
- How miners calculate and validate the block hash based on mining jobs

For the implementation of the communication protocol between mining pools and miners, refer to the Stratum protocol [here](/mining/alephium-stratum.md). Note that mining pools do not follow this protocol exactly.

This document references the code from the [mining-pool](https://github.com/alephium/mining-pool) and [gpu-miner](https://github.com/alephium/gpu-miner) repositories.

## Connect to Full Node

The mining pool needs to connect to the Alephium full node to get mining jobs. The default mining API server is `localhost:10973`.

The mining pool communicates with the full node through a binary TCP protocol, formatted as follows:

```
MessageSize(4 bytes) + Message(1 byte MessageType + Payload)
```

### Get Jobs From Full Node

The mining API protocol is a push-based model designed to provide the lowest latency for pools and miners. Every time the full node receives a new block, it sends a `Jobs` message to the mining pool. You can set the time interval in the [mining configuration](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/system_prod.conf.tmpl#L6) of the full node to send `Jobs` messages when there are no new blocks.

If your pool uses a pull-based model, you can cache the jobs received from the full node and regularly pull the latest jobs from the cache.

Currently, Alephium has 16 chains, so there will be 16 block templates in each `Jobs` message. Each block template includes:

- `fromGroup` and `toGroup`: the chain index of the block template.
- `headerBlob`: serialized binary data of the [BlockHeader](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/BlockHeader.scala#L28), excluding the first 24 bytes (nonce).
- `txsBlob`: serialized binary data of the transactions, usually empty and encoded as `#00`.
- `targetBlob`: serialized binary data of the [Target](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/Target.scala#L32).

Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js) to learn more about the format and parsing of the `Jobs` message.

Once the mining pool receives the `Jobs` message from the full node, it can distribute the mining jobs to miners based on their hashrate. For each chain, calculating the nonce only requires the `targetBlob` and `headerBlob` fields. Therefore, the mining pool can save bandwidth by excluding the `txsBlob` field when sending mining jobs to miners. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/blockTemplate.js#L51).

### Job Distribution

Some miner software works on a single job, while others support exactly 16 jobs received from the pool. To maximize compatibility, the pool can send a single job to each miner.

The simplest approach is to send a random job from the 16 available jobs to each miner. The ideal approach is to distribute the 16 jobs evenly to miners based on their hashrate, ensuring each chain receives the same amount of hashrate. While this method is more efficient, it will take more time to implement.

### Submitting Blocks to Full Node

Once the mining pool receives a valid `nonce` from the miner, it can send the block to the full node. The block is composed of `nonce`, `headerBlob`, and `txsBlob`. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/pool.js#L119).

Then, refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/daemon.js#L49) to construct a valid `SubmitBlock` message and send it to the full node.

After the full node verifies the block, it will send a `SubmitBlockResult` message to inform the mining pool whether the block is valid. Refer to the code [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js#L72) to parse the `SubmitBlockResult` message.

### Rhone Upgrade

The Rhone upgrade introduces the ghost algorithm similar to ETH. A mainchain block may reference uncle blocks, and both the miner of the mainchain block and the miner of the uncle block will receive rewards. Therefore, the mining pool needs to distribute rewards to the miners of the uncle blocks.

Refer to the implementation [here](https://github.com/alephium/mining-pool/pull/63/commits/5e0a9ea25616bba986883940c73aef34d547f35f), which uses the `getMainChainBlockByGhostUncle` endpoint introduced in full node version v2.14.6. You need to upgrade your full node to newer than v2.14.6.

You may need to wait for a while to confirm whether an orphan block is an uncle block. If the height of the orphan block is `h`, it can be referenced by a mainchain block with a height in the range of `[h+1, h+7]`. Therefore, you need to wait about `7 * 16s`. However, due to variability in block time, you may need to wait longer to ensure that the uncle block miners receive their rewards.

## Miner

### Calculating the Block Hash

In Alephium, the `nonce` is 24 bytes, and the block hash is `blake3(blake3(serialize(blockHeader)))`. The `blockBlob` in each job is the serialized binary data of `BlockHeader`, excluding the `nonce` field. Therefore, when calculating the block hash, the miner needs to prepend the `nonce` to the `headerBlob`. Refer to the code [here](https://github.com/alephium/gpu-miner/blob/master/src/worker.h#L135) and [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#L314).

### Checking the Chain Index

In addition to checking the target, the miner also needs to check the chain index of the block, as Alephium encodes the chain index into the block hash. Refer to the code [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#LL303C2-L303C2) to verify whether the chain index of the block hash is correct.

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
