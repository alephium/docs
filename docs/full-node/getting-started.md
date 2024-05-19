---
sidebar_position: 10
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

You can run your Alephium full node in two ways: directly using [Java](#using-java)
or with [Docker](#using-docker).

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

## What's Next

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
