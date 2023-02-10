---
sidebar_position: 10
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

This guide will explore the basics of creating an Alephium dApp project.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Operate in a [terminal](https://en.wikipedia.org/wiki/Terminal_emulator)

## Creating a new dApp project

To create the tutorial project, open a new terminal and run:

```
npx @alephium/cli@latest init alephium-tutorial
```

This will create a new directory `alephium-tutorial` and initialize a sample project inside that directory.

## Launching a local development network

To compile and test your contracts, it's necessary to launch a local development network by running:

```
npx @alephium/cli@latest devnet start
```

The Typescript SDK is then able to interact with the network through REST endpoints.

Alternatively, if you want to create a local development network with explorer support, please use `docker-compose` and follow the instructions in [alphium-stack](https://github.com/alephium/alephium-stack#devnet).

## Compiling your contract

Next, change the workspace to the tutorial project:

```
cd alephium-tutorial
```

and compile your contracts:

```
npx @alephium/cli@latest compile
```

If you take a look at `contracts/`, you should be able to find `token.ral`. The compiled artifacts are in the directory `artifacts`.

## Testing your contract

The sample project comes with tests `test/token.test.ts` for your contract. You can run your tests with:

```
npm run test
```

or

```
npx @alephium/cli@latest test
```

## Deploying your contract

Next, to deploy the contract we will use Alephium CLI and a deployment script `scripts/0_deploy_faucet.ts`. You can run it using:

```
npx @alephium/cli@latest deploy
```

This will deploy the token faucet to all of the 4 groups of Devnet. You could configure `alephium.config.ts` to deploy the contract to different networks.

## Interacting with the deployed contract

Now, you can build the source code `src/token.ts` with:

```
npm run build
```

and interact with the deployed token faucet:

```
node dist/src/token.js
```

## Connect to the wallets

dApp requires wallet integration for users of the dApp to authenticate and interact with the Alephium blockchain,
such as transactions signing. Currently dApps can be integrated with both [Extension Wallet](../wallet/extension-wallet/dapp)
and [WalletConnect](../wallet/walletconnect). Please refer to the respective pages for more details.

## Learn more

To learn more about the web3 SDK, please visit the [guide of web3 SDK](/dapps/alephium-web3).

To learn more about Ralph language, please visit the [guide of Ralph](/ralph/getting-started).


### Prototypes

Here are some well-maintained dApps that can be a great source of inspiration for building new dApps.

* NFT: https://github.com/alephium/alephium-nft/pull/1
* DEX: https://github.com/Lbqds/alephium-dex/tree/master/contracts
* Wormhole Bridge Integration: https://github.com/alephium/wormhole-fork/tree/add-alephium-to-wormhole/alephium
