---
sidebar_position: 30
title: CPU Miner Guide
sidebar_label: CPU miner guide
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

:::info

CPU mining is only for testing purpose. To use the testnet please visit [Testnet Guide](network/testnet-guide.md).

For mining in production please visit [Solo Mining Guide](mining/solo-mining-guide.md) or [Pool Mining Guide](mining/pool-mining-guide.md).

:::

You must first follow the steps in the [Full-node Guide](full-node/getting-started.md), in order to download, configure, start your node and use Swagger (or any other OpenAPI clients).

## Start mining

Please make sure that your local node is fully synced before mining. We will add validation for this in our next major release.

You can **start** mining on your local node by doing a POST on `/miners/cpu-mining?action=start-mining`.

The server should answer simply with `true` to confirm that the mining process has now started.

Please note that you will need first to configure your miner's addresses as explain the [Create a new miner wallet](mining/solo-mining-guide.md#create-a-new-miner-wallet) section of the GPU Miner Guide.

## Stop mining

Similarly, you can **stop** mining on your local node by doing a POST on `/miners/cpu-mining?action=stop-mining`.

## CPU Usage

You could tune how much CPU resources for mining by using the following two configs:

    akka.actor.mining-dispatcher.fork-join-executor.parallelism-min = 1 // the minimal number of threads for mining
    akka.actor.mining-dispatcher.fork-join-executor.parallelism-max = 4 // the maximal number of threads for mining
