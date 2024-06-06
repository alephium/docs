---
sidebar_position: 1
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium offers a powerful [Web3
SDK](https://github.com/alephium/alephium-web3) that makes it easy to
connect to and interact with the blockchain. It provides the following functionalities:

* querying on-chain states
* buiding and sending transactions
* tools for compiling, testing, and deploying contracts
* libraries for developing frontend user interfaces

## Install

The `@alephium/web3` library serves as the foundational library for Alephium blockchain interaction, providing developers with an easy-to-use API for dApp development.

```
npm install --save @alephium/web3
```

## Connect to Alephium

To begin developing your dApp, the first step is to establish a connection to the
Alephium network. `NodeProvider` is an abstraction of a connection to the Alephium
network, you can get a `NodeProvider` instance by:

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

Some utility functions in the SDK rely on the global provider. You need to set the
global provider using `setCurrentNodeProvider` from `@alephium/web3` to ensure these functions
work correctly.

```typescript
import { web3 } from '@alephium/web3'

web3.setCurrentNodeProvider(<nodeURL>)
```

## What's Next

* [Learn how to build transactions, query transaction statuses, and transaction details](./transaction.md)
* [Learn how to query the latest blockchain height, block information, and subscribe to blocks](./block.md)
* [Learn how to sign and submit transactions](./signer-provider.md)
* [Learn how to write contracts and interact with contracts](./interact-with-contracts.md)
* [Learn how to test and debug your contract](./testing-and-debugging.md)
* [Learn how to work with contract events](./events.md)
* [Learn how to use the `CLI` to compile and deploy contracts](./cli.md)
* [Learn how to use the `codec` to encode and decode transactions, contracts, and scripts](./codec.md)
* [Explore commonly used utility functions](./utils.md)
* [Learn how to develop user interfaces](./web3-react.md)
