---
sidebar_position: 10
title: Solo Mining Guide
sidebar_label: Solo mining guide
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Prerequisites

- Follow the [get started](full-node/getting-started.md) guide to run a full node.

## Miner wallet

First, we need to create a dedicated wallet for mining. Compared to a regular wallet, a miner wallet has one address per address group to collect mining rewards for each of them.

### Create miner wallet

<img src={require("./media/miner-wallet-create-query.png").default}/>

The server will return the new wallet mnemonic. Please backup and store it securely.

<img src={require("./media/miner-wallet-create-response.png").default}/>

### List miner addresses

<img src={require("./media/miner-wallet-list-addresses-query.png").default}/>

The server will return `4` addresses which are required in later steps:

<img src={require("./media/miner-wallet-list-addresses-response.png").default}/>

## Configure miner addresses

Now that we have gotten the `4` miner addresses, they should be set up in the full node so we can earn rewards when it starts mining. This can be done by adding the following content in the file `${ALEPHIUM_HOME}/user.conf`[^1]:

    alephium.network.external-address = "x.x.x.x:9973" // put your public IP here; otherwise remove this line
    alephium.mining.miner-addresses = [
      "1HiYeRbypJQK4nc6EFYWiRVdsdYukQKq8SvKQsfJ3wiR8",
      "1HD3q1G7qVoeyNA4U6HbBhFvv1FLUWNGwNavPamScpVLa",
      "1CQiD2RQ58ymszcgPEszRomyMZxEjH1Rtp4tB84JY2qgL",
      "19vvD3QbfEYbJexk6yCtnDNpRrfr3xQv2Pzc6x265MRhD"
    ]

Please replace with your own mining addresses and restart the full
node to make these changes take effect. Note that the mining
addresses should be added in the same order as they were returned by the
endpoint because they are sorted according to their corresponding groups.


## Start mining

### Make sure your full node is synced

You could verify that by executing this endpoint:

<img src={require("./media/full-node-synced-query.png").default}/>

If you see `"synced": true` in the response, then you are ready to go.

### Nvidia GPU

Please follow the instructions on [GPU
miner](https://github.com/alephium/gpu-miner#readme) to run the gpu
miner for Nvidia GPUs. Alternatively, you could run the gpu-miner with
docker by following the documents
[here](https://github.com/alephium/alephium/tree/master/docker#gpu-miner-optional).

### AMD GPU

Please follow the instructions on [AMD
miner](https://github.com/alephium/amd-miner#readme) to run the gpu
miner for AMD GPUs. Note that the performance of AMD miner is not in
par with Nvidia miner.

## Security Consideration

By default, the API interface of the Alephium full node is bound to
`localhost`. However, if we set
`alephium.api.network-interface` to a public IP, all endpoints might
be exposed to public network. In order to protect unauthorized access
to the full node endpoints, please consider to set up [API
key](/full-node/full-node-more#api-key).

[^1]: By default it is under `C:\Users\<your-username>` in Windows, `/Users/<your-username>` in macOS, and `/home/<your-username>` in Linux.
