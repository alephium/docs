---
sidebar_position: 5
title: Getting Started
sidebar_label: Getting started
---

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

## Compiling your contracts

Next, change the workspace to the tutorial project:

```
cd alephium-tutorial
```

and compile your contracts:

```
npx @alephium/cli@latest compile
```

If you take a look at `contracts/`, you should be able to find `token.ral`. The compiled artifacts are in the directory `artifacts`.

To learn more about Ralph language and contracts on Alephium, read the comments of `contracts/token.ral`.

## Testing your contract

The sample project comes with tests `test/token.test.ts` for your contract. You can run your tests with:

```
npm run test
```

or

```
npx @alephium/cli@latest test
```

To learn more about testing and debugging, read the comments of `test/token.test.ts`.

## Deploying your contracts to Devnet/Testnet/Mainnet

Next, to deploy the contract we will use Alephium CLI and a deployment script `scripts/0_deploy_faucet.ts`. You can run it using:

```
npx @alephium/cli@latest deploy
```

This will deploy the token faucet to all of the 4 groups of Alephium blockchain.

To learn more about deployment, read the comments of `scripts/0_deploy_faucet.ts`.

## Interacting with the deployed contract

Now, you can build the source code `src/token.ts` with:

```
npm run build
```

and interact with the deployed token faucet:

```
node dist/src/token.js
```

To learn more about the web3 SDK, read the comments of `src/token.ts`.

## Connect to the wallets

TODO
