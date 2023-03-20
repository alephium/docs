---
sidebar_position: 50
title: Devnet
sidebar_label: Devnet
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Create a local Devnet

## Automatically with our development tool

```sh
npx @alephium/cli@latest devnet start
```

This launch a devnet with [this configuration](https://github.com/alephium/alephium-web3/blob/master/packages/cli/devnet-user.conf)

The Typescript SDK is then able to interact with the network through REST endpoints.

## Manually using jar files

### Full node

Download file `alephium-x.x.x.jar` from [Github release](https://github.com/alephium/alephium/releases/latest) (do not double click on it, it can not be launched this way).

Write a configuration file at `~/.alephium/user.conf`, the one below is taken from our [alephium-stack repo](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf)

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

Note: The mnemonic (24 words) and the corresponding addresses were created for development purposes, you can use it or create your own, but never use it on `mainnet`.
      You can also add more addresses if you want. If you want change the addresses afterward, you'll need to erase and restart your devnet.


You can now start your `devnet`:

```sh
java -jar alephium-x.x.x.jar
```

You can now access the full node's API at: `http://localhost:22973/docs`

### Explorer-backend

Requirement: https://www.postgresql.org/

Download file `explorer-backend-x.x.x.jar` from [Github release](https://github.com/alephium/explorer-backend/releases/latest)

Connect to PostgreSQL and create a database for your devnet

```sql
CREATE DATABASE devnet;
```

You can check [the configuration file](https://github.com/alephium/explorer-backend/blob/feature/contract-subcontract/app/src/main/resources/application.conf) to see what settings can be override. You can then configure and launch your `explorer-backend` with:

```sh
export BLOCKFLOW_NETWORK_ID=2
export BLOCKFLOW_PORT=22973
export DB_NAME=devnet
java -jar explorer-backend-x.x.x.jar
```

## Using Docker

If you want to create a local development network with explorer support, please use `docker-compose` and follow the instructions in [alphium-stack](https://github.com/alephium/alephium-stack#devnet).
