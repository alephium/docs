---
sidebar_position: 1
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium offers a powerful [Typescript
SDK](https://github.com/alephium/alephium-web3) that makes it easy to
connect to and interact with the blockchain. Some of the
functionalities it provides are:

* Query on-chain states
* Build and submit transactions
* A CLI tool for compiling, testing and deploying smart contracts
* Libraries for building React/Nextjs web interfaces

## Install

The [@alephium/web3](https://www.npmjs.com/package/@alephium/web3)
is the core package that offers dev-friendly APIs to interact
with the Alephium blockchain and develop dApps on it.

```
npm install --save @alephium/web3
```

## Connect to Alephium

To begin developing your dApp, the first step is to establish a connection to the
Alephium network. `NodeProvider` is an abstraction of a connection to the Alephium
network, it exposes all the full node
[APIs](https://node.mainnet.alephium.org/docs) in Typescript.

You can get a `NodeProvider` instance by:

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeProvider = new NodeProvider('http://localhost:22973')
```

If the full node you are connecting to requires [API
Key](/full-node/full-node-more#api-key), you can specify it like this:

```typescript
const API_KEY = // alephium.api.api-key from your full node config
const nodeProvider = new NodeProvider('http://localhost:22973', API_KEY)
```

Some utility functions in the SDK rely on the global provider. You
need to set it like this to ensure these functions work correctly:

```typescript
import { web3 } from '@alephium/web3'

web3.setCurrentNodeProvider(<nodeURL>)
```

## Learn More

Blocks and transactions are the core concepts of any blockchains. We
will learn how to use the Typescript SDK to [build and
query](./transaction.md) transactions as well as [sign and
submit](./signer-provider.md) them. We will also learn how to [query
and subscribe to](./block.md) the blocks information.

Smart contract support is one of Typescript SDK's main focuses. We
will learn how to use the CLI tool to [compile and deploy](./cli.md)
contracts. We will also learn how to use the libraries and frameworks
to [test and debug](./testing-and-debugging.md) contracts during
development as well as [interacting
with](./interact-with-contracts.md) them after they are deployed.

To ease the web interface integration, [Web3 React](./web3-react.md)
package is included in the Typescript SDK to provide a set of react
components and hooks to help with wallet connection and blockchain
interaction.

Typescript SDK also provides utilities to [work with](./events.md)
contract and system events, [encode & decode](./codec.md) transactions
and contracts and [more](./utils.md). Dive in to explore the powerful
features offered by the Typescript SDK!
