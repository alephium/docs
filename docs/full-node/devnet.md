---
sidebar_position: 40
title: Devnet
sidebar_label: Devnet
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Local devnet is essential to develop and test your dApps. It can be
launched using similar steps outlined in the [get started](full-node/getting-started.md) guide using Java directly or with
Docker.

## Using Docker

### Prerequisites

- Ensure that [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) are installed.
- Clone the [alephium-stack](https://github.com/alephium/alephium-stack/tree/master/mainnet) repository.

### Start your node

1. Open search and type in `Terminal` (for Mac or Linux) or `Command Prompt` (for Windows).
2. In the Terminal/Command Prompt program, run the following command:

```shell
> cd $path-to-alephium-stack/devnet
> docker-compose up -d
```

## Using Java

### Full Node

Please follow the same steps as described in full node's [get
started](/full-node/getting-started#using-java) guide, with the
extra step of overriding the default
[user.conf](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf)
file under your `ALEPHIUM_HOME` directory, by default it is `~/.alephium/user.conf`.

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

### Explorer-backend

#### Prerequisites

- Install [PostgreSQL](https://www.postgresql.org/)
- Download `explorer-backend-x.x.x.jar` from [Github release](https://github.com/alephium/explorer-backend/releases/latest)

#### Create database

Connect to PostgreSQL and create a database for your devnet

```sql
CREATE DATABASE devnet;
```

#### Launch explorer backend

You can check the [configuration file](https://github.com/alephium/explorer-backend/blob/master/app/src/main/resources/application.conf) to see what settings can be override. You can then configure and launch your `explorer-backend` with:

```shell
export BLOCKFLOW_NETWORK_ID=2
export BLOCKFLOW_PORT=22973
export DB_NAME=devnet
java -jar explorer-backend-x.x.x.jar
```

For more details please use explorer backend's [get
started](/explorer-backend/getting-started) guide as reference.
