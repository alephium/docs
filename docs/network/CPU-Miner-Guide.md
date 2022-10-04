---
sidebar_position: 30
title: CPU miner guide
---

> Note: CPU mining is only for testing purpose. To use the testnet please visit [Testnet Guide](network/Testnet-Guide.md).

> For mining in production please visit [Solo Mining Guide](mining/Solo-Mining-Guide.md) or [Pool Mining Guide](mining/Pool-Mining-Guide.md).

You must first follow the steps in the [Full-node Guide](full-node/Full-Node-Starter-Guide.md), in order to download, configure, start your node and use Swagger (or any other OpenAPI clients).

Please note that the default address and port for the REST API is [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

## Start mining

Please make sure that your local node is fully synced before mining. We will add validation for this in our next major release.

You can **start** mining on your local node by doing a POST on `/miners/cpu-mining?action=start-mining`.

The server should answer simply with `true` to confirm that the mining process has now started.

Please note that you will need first to configure your miner's addresses as explain the [Create a new miner wallet](mining/Solo-Mining-Guide.md#create-a-new-miner-wallet) section of the GPU Miner Guide.

## Stop mining

Similarly, you can **stop** mining on your local node by doing a POST on `/miners/cpu-mining?action=stop-mining`.

## CPU Usage

You could tune how much CPU resources for mining by using the following two configs:

    akka.actor.mining-dispatcher.fork-join-executor.parallelism-min = 1 // the minimal number of threads for mining
    akka.actor.mining-dispatcher.fork-join-executor.parallelism-max = 4 // the maximal number of threads for mining
