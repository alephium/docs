---
sidebar_position: 50
title: Mining
sidebar_label: Mining
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

This document aims to make it easier for mining pools and miners to integrate alephium. This document mainly includes:

* the communication protocol between the mining pool and the full node
* how the miner calculates the block hash based on the mining jobs

Regarding the implementation of the communication protocol between mining pool and miners, you can refer to the stratum protocol [here](/mining/alephium-stratum.md). Note that mining pools does not follow exactly the protocol.

In this document I will use the code of [mining-pool](https://github.com/alephium/mining-pool) and [gpu-miner](https://github.com/alephium/gpu-miner) as a reference.


## Mining Pool

The mining pool needs to connect to the alephium full node to get mining jobs, and the default mining api server is `localhost:10973`.

The mining pool communicates with the full node through a binary protocol, the format of the message is as follows:

```
MessageSize(4 bytes) + Message(1 byte MessageType + Payload)
```

### Getting Jobs From Full Node

Every time the full node receives a new block, it sends a `Jobs` message to the mining pool. You can also set the time interval in the [mining configuration](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/system_prod.conf.tmpl#L6) of the full node to send `Jobs` messages when there are no new blocks.

Because there are 16 chains in alephium now, there will be 16 block templates in each `Jobs` message. And the block template consists of the following fields:

* `fromGroup` and `toGroup`: the chain index of the block template.
* `headerBlob`: the serialized binary data of the [BlockHeader](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/BlockHeader.scala#L28), excluding the first 24 bytes(nonce).
* `txsBlob`: the serialized binary data of the transactions.
* `targetBlob`: the serialized binary data of the [Target](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/Target.scala#L32).

You can refer to the code provided [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js) to learn more about the format of the `Jobs` message and how to parse the `Jobs` message.

Once the mining pool receives the `Jobs` message from the full node, it can send the mining jobs to miners based on their hashrate. For each chain, calculating the nonce only requires the `targetBlob` and `headerBlob` fields. Therefore, the mining pool can save bandwidth by excluding the `txsBlob` field when sending mining jobs to miners. You can refer to the code provided [here](https://github.com/alephium/mining-pool/blob/master/lib/blockTemplate.js#L51).

### Submitting Blocks To Full Node

Once the mining pool receives a valid `nonce` from the miner, it can send the block to the full node, where the block is composed of `nonce`, `headerBlob` and `txsBlob`, you can refer to the code provided [here](https://github.com/alephium/mining-pool/blob/master/lib/pool.js#L119).

Then you can refer to the code provided [here](https://github.com/alephium/mining-pool/blob/master/lib/daemon.js#L49) to construct a valid `SubmitBlock` message and send this message to the full node.

After the full node verifies the block, it will send a `SubmitBlockResult` message to tell the mining pool whether the block is valid, you can refer to the code provided [here](https://github.com/alephium/mining-pool/blob/master/lib/messages.js#L72) to parse the `SubmitBlockResult` message.

## Miner

### Calculating the BlockHash

In alephium, the size of the `nonce` is 24 bytes, and the hash of the block is: `blake3(blake3(serialize(blockHeader))`. As mentioned before, `blockBlob` in each job is the serialized binary data of `BlockHeader` excluding the `nonce` field. Therefore, when the miner calculates the block hash, it needs to preappend the `nonce` to the front of the `headerBlob`, you can refer to the code provided [here](https://github.com/alephium/gpu-miner/blob/master/src/worker.h#L135) and [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#L314).

### Checking the ChainIndex

In addition to checking the target, the miner also needs to check the chain index of the block as alephium encodes the chain index into the block hash. You can refer to the code provided [here](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#LL303C2-L303C2) to check whether the chain index of the block hash is correct.

## UTXO Management

Due to the limited number of inputs that can be included in each transaction, withdrawals may fail if miner's wallet is filled with small UTXOs. In practice, some miners tend to send mining rewards directly to exchange addresses. If that is the case please follow the guide [here](/integration/exchange#utxo-management).

If node wallet is used for mining, here are the simpler and more efficient ways to consolidate the UTXOs.

### Consolidate UTXOs for the active address

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

Note that this will only consolidate the UTXOs for the active address. To consolidate UTXOs for other addresses, we need to update each of them as active address and run the same command above. 

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

### Consolidate UTXOs for the all addresses

The simplest way to consolidate UTXOs for all the addresses in the node wallet is to use the `sweep-all-addresses` endpoint:

```shell
# Consolidate UTXOs for all addresses
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/sweep-all-addresses \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "toAddress": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3"
}'
```
