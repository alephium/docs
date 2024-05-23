---
sidebar_position: 10
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

You can run your Alephium full node in two ways: using
[Docker](#using-docker) or directly with [Java](#using-java). This
guide begins by demonstrating how to run the Alephium full node on the
`Mainnet`, followed by a discussion on the differences for `Testnet` and
`Devnet` setups.

## Using Docker

### Prerequisites

- Ensure that [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) are installed.
- Clone the [alephium-stack](https://github.com/alephium/alephium-stack/tree/master/mainnet) repository.

### Start your node

1. Open search and type in `Terminal` (for Mac or Linux) or `Command Prompt` (for Windows).
2. In the Terminal/Command Prompt program, run the following command:

```shell
> cd $path-to-alephium-stack/mainnet
> docker-compose up -d
```

## Using Java

### Prerequisites

- Ensure that Java (11 or 17 is recommended) is
[installed](https://docs.oracle.com/en/java/javase/17/install/overview-jdk-installation.html)
on your computer.
- Download file `alephium-x.x.x.jar` from [Github
  release](https://github.com/alephium/alephium/releases/latest) (do
  not double click on it, it can not be launched this way).

### Start your node

1. Open search and type in `Terminal` (for Mac or Linux) or `Command Prompt` (for Windows).
2. In the Terminal/Command Prompt program, run the following command:

```shell
> cd $your-jar-file-path
> java -jar alephium-x.x.x.jar
```

🎉 _**Tada, your node is running**_

- Your node will start to sync with the network. It might take long the first time. Your node has been fully synced once the block height in the terminal logs is equal to the one found in the latest blocks of the [explorer](https://explorer.alephium.org).
- If you close the terminal the node will be turned off.
- All of the blockchain data is stored in `.alephium` under your home folder[^1].

## Testnet

Full node on `Testnet` can be launched using the same steps as
`Mainnet`. Compared to `Mainnet`, the following configurations needs
to be updated in the `${ALEPHIUM_HOME}/user.conf` file:

```conf
alephium.network.network-id = 1
```

You can use [extension wallet](/wallet/Basic%20functions#request-testnet-alph-using-extension-wallet)
or [desktop wallet](/wallet/Basic%20functions#request-testnet-alph-using-desktop-wallet)
to get some `ALPH` from the testnet faucet.

## Devnet

Local devnet is essential to develop and test your dApps. It can be
launched using similar steps as `Mainnet` using Docker or with Java
directly.

### Using Docker

Follow the same
[steps](/full-node/getting-started#using-docker) for `Mainnet`,
except that under `$path-to-alephium-stack` there is a `devnet`
directory:

```shell
> cd $path-to-alephium-stack/devnet
> docker-compose up -d
```

### Using Java

Follow the same [steps](/full-node/getting-started#using-java) for
`Mainnet`, with the extra step of overriding the default
[user.conf](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf)
file under your `ALEPHIUM_HOME` directory, by default it is
`~/.alephium/user.conf`.

<details>
<summary>user.conf</summary>
<p>

```conf
# Import this mnemonic to have 4'000'000 token allocated for your addresses
#
# vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava

alephium.genesis.allocations = [
  {
    address = "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "14UAjZ3qcmEVKdTo84Kwf4RprTQi86w2TefnnGFjov9xF",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "15jjExDyS8q3Wqk9v29PCQ21jDqubDrD8WQdgn6VW2oi4",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "17cBiTcWhung3WDLuc9ja5Y7BMus5Q7CD9wYBxS1r1P2R",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  }
]

alephium.consensus.num-zeros-at-least-in-hash = 0
alephium.consensus.uncle-dependency-gap-time = 0 seconds
alephium.network.leman-hard-fork-timestamp = 1643500800000 # GMT: 30 January 2022 00:00:00

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true
alephium.node.event-log.enabled=true
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true

alephium.network.rest-port = 22973
alephium.network.ws-port = 21973
alephium.network.miner-api-port = 20973
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key-enabled = false
alephium.mining.api-interface = "0.0.0.0"
alephium.network.bind-address  = "0.0.0.0:19973"
alephium.network.internal-address  = "alephium:19973"
alephium.network.coordinator-address  = "alephium:19973"

# arbitrary mining addresses
alephium.mining.miner-addresses = [
  "1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
  "1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
  "193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
  "16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```
</p>
</details>

## What's Next

### Load from snapshot

The initial run of a `Mainnet` full node could takes up to ~20 hours
to fully sync with the other nodes in the network. To speed up this
process, snapshots are made available. Please refer to the [Load from
snapshot](/full-node/loading-snapshot) guide for more information.

### Swagger UI

Alephium full node exposes the [Swagger
UI](https://wallet.mainnet.alephium.org/docs/) which can be used to
interact with it. For your local full node, Swagger UI is available at
[http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

Alternatively, you can use any OpenAPI clients to
import the latest
[openapi.json](https://raw.githubusercontent.com/alephium/alephium/master/api/src/main/resources/openapi.json)
or use `curl` command directly.

### Wallets

Alephium's full node also comes with a built-in [node
wallet](/wallet/node-wallet-guide). You are also encouraged to use
[other wallets](/wallet/overview) to manage your assets and interact
with the dApps.

[^1]: The home folder depends on your system: `C:\Users\<your-username>` in Windows, `/Users/<your-username>` in macOS, `/home/<your-username>` in Linux.
