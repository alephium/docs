---
sidebar_position: 50
title: Devnet
sidebar_label: Devnet
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Create a local Devnet

## Using Docker

```sh
npx @alephium/cli@latest devnet start
```

This launch a devnet with [this configuration](https://github.com/alephium/alephium-web3/blob/master/packages/cli/devnet-user.conf)

The Typescript SDK is then able to interact with the network through REST endpoints.

Alternatively, if you want to create a local development network with explorer support, please use `docker-compose` and follow the instructions in [alphium-stack](https://github.com/alephium/alephium-stack#devnet).

## Using jar files

### Full node

Download file `alephium-1.x.x.jar` from [Github release](https://github.com/alephium/alephium/releases/latest) (do not double click on it, it can not be launched this way).

Write the minimum config file `~/.alephium/user.conf`

```conf
alephium {

  network = {
    network-id = 2
    rest-port = 22973
  }

  discovery.bootstrap = []

  broker {
    groups = 4
    broker-num = 1
    broker-id = 0
  }

  genesis.allocations = [
    {
      # wife tone decline assault address repair identify paper color taxi miss crucial resist rebuild man enforce ocean swim nuclear gallery clay hold armed green
      address = "132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh",
      amount = "1000000 ALPH",
      lock-duration = 0 days
    }
  ]

  mempool {
    auto-mine-for-dev = true
  }
}
```

Note: The mnemonic (24 words) and the corresponding address were created for this tutorial, you can use it or create your own, but never use it on `mainnet`.
      You can also add more addresses if you want. If you want change the addresses afterward, you'll need to erase and restart your devnet.


You can now start your `devnet`:

```sh
java -jar alephium-x.x.x.jar
```

You can now access the full node's API at: `http://localhost:22973/docs`

### Explorer-backend

Requirement: https://www.postgresql.org/

Download file `explorer-backend-1.x.x.jar` from [Github release](https://github.com/alephium/explorer-backend/releases/latest)

Connect to PostgreSQL and create a database for your devnet

```sql
CREATE DATABASE devnet;
```

You can check [the configuration file](https://github.com/alephium/explorer-backend/blob/feature/contract-subcontract/app/src/main/resources/application.conf) to see what settings can be override. You can then configure and launch your `explorer-backend` with:

```sh
export BLOCKFLOW_NETWORK_ID=2
export BLOCKFLOW_PORT=22973
export DB_NAME=devnet
java -jar explorer-backend-1.13.0.jar
