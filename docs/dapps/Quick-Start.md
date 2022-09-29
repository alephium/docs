---
sidebar_position: 5
title: Quick Start
---

## Quick Start

This guide will explore the basics of creating an Alephium dApp project.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- Operate in a [terminal](https://en.wikipedia.org/wiki/Terminal_emulator)

### Creating a new dApp project

To create the tutorial project, open a new terminal and run:

```
npx @alephium/cli@latest init alephium-tutorial
```

This will create a new directory `alephium-tutorial` and initialize a sample project inside that directory.

### Launching a local development network

To compile and test your contracts, it's necessary to launch a local network by running:

```
npx @alephium/cli@latest devnet start
```

The Typescript SDK then is able to interact with the network through REST endpoints.

### Compiling your contracts

Next, change the workspace to the tutorial project:

```
cd alephium-tutorial
```

and compile your contracts:

```
npx @alephium/cli@latest compile
```

If you take a look at `contracts/`, you should be able to find `token.ral`. The compiled artifacts are in the directory `artifacts`.

You could read the comments of `contracts/token.ral` to learn more about Ralph language and contracts on Alephium.


### Testing your contract

The sample project comes with tests `test/token.test.ts` for your contract. You can run your tests with:

```
npm run test
```

or

```
npx @alephium/cli@latest test
```

You could read the comments of `test/token.test.ts` to learn more about testing and debugging.

### Deploying your contracts to Devnet/Testnet/Mainnet

Next, to deploy the contract we will use Alephium CLI and a deployment script `scripts/0_deploy_faucet.ts`. You can run it using:

```
npx @alephium/cli@latest deploy
```

This will deploy the token faucet to all of the 4 groups of Alephium blockchain.

You could read the comments of `scripts/0_deploy_faucet` to learn more about deployment.

### Interacting with the deployed contract

Now, you could build the source code `src/token.ts`:

```
npm run build
```

and interact with the deployed token faucet:

```
node dist/src/token.js
```

You could read the comments of `src/token.ts` to learn more about the web3 SDK.

### Connect to the wallets

TODO
