---
sidebar_position: 1
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium offers a powerful [Web3
SDK](https://github.com/alephium/alephium-web3) that makes it easy to
connect to and interact with the blockchain. It also provides tools
and framework for compiling, testing and deploying contracts, among
other features.

This guide provides a brief overview of some common use cases for the
[Web3 SDK](https://github.com/alephium/alephium-web3).

## Install

```
npm install --save @alephium/web3
```

## Connect to Alephium

`NodeProvider` is an abstraction of a connection to the Alephium
network, you can get a `NodeProvider` instance by:

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
```

If the full node you are connecting to requires [API
Key](/full-node/full-node-more#api-key), you can specify it like this:

```typescript
const API_KEY = // alephium.api.api-key from your full node config
const nodeProvider = new NodeProvider('http://localhost:22973', API_KEY)
```

Sometimes, it's convenient to setup a global `NodeProvider` for your project:

```typescript
web3.setCurrentNodeProvider(<nodeURL>)
```

## Query the Blockchain

Once you have a `NodeProvider`, you have a connection to the
blockchain, which you can use to query blocks, transactions, contract
states, balances and other general information about the blockchain.

Here are a few examples:

```typescript
// Get the blockchain height from the given chain index
await nodeProvider.blockflow.getBlockflowChainInfo({
  fromGroup: 0,
  toGroup: 0
})
// { currentHeight: 315 }

// Get the block from the given block hash
await nodeProvider.blockflow.getBlockflowBlocksBlockHash('1ccfe845988ebf878384dd2dc9e55920261566c2ad9143963180222059ffd3b0')
// {
//   hash: '1ccfe845988ebf878384dd2dc9e55920261566c2ad9143963180222059ffd3b0',
//   timestamp: 1665207807876,
//   chainFrom: 0,
//   chainTo: 0,
//   height: 315,
//   deps: [
//     '5e9209fbf2b4c656b136933684b8606382575f16795ddc7a6317c5d4b7e378c5',
//     'b5d69f03d4d0eea5a4c7e0bc0e2e8c5a8f99306050d641b599991b441ea0f9ea',
//     'f344b3dd45f39d62cfd200cfa3312c080018102908787c5565b8c8af3647368f',
//     'fa359ce0b5accb1584cd280ae3c32f210424a9fd32cb736b6cdfe64882651010',
//     '8bc7d94ddfc66129049862e501ff5d5042e1e978b1a51d28e238321444a91071',
//     '5896ee3cbc8c4f4432a0b221039113061b6cf7eeb794b25758d247120d0df712',
//     'fc312b0c04a0eeb0767ec98137b740047d7c5e8f64463531828b7015cbeaeaa3'
//   ],
//   transactions: [
//     {
//       unsigned: [Object],
//       scriptExecutionOk: true,
//       contractInputs: [],
//       generatedOutputs: [],
//       inputSignatures: [],
//       scriptSignatures: []
//     }
//   ],
//   nonce: '5da513de7183d7eb1a90b46c4ffe6f7ae4fdf012f0018f41',
//   version: 0,
//   depStateHash: '2edccc3e717d38a6564fb970f6714f0c00c074226b2cb1ee6272781d3c9bc870',
//   txsHash: '738e879791e0c164a5a12b658e2b37e65ed9c415c2e152656c8469273f775f5a',
//   target: '20ffffff'
// }

// Get the transaction status
await nodeProvider.transactions.getTransactionsStatus({
  txId: 'f33da0d8f4c00d68e2d5818cb9617219a1108b801f387fc8d1595287e4dbf2aa'
})
// {
//   type: 'Confirmed',
//   blockHash: '47c95e02a7d7ca442ee1849d76a5987c7b72ddcad0b05e9f01df4bc4878f5980',
//   txIndex: 0,
//   chainConfirmations: 295,
//   fromGroupConfirmations: 295,
//   toGroupConfirmations: 295
// }

// Get the account balance
await nodeProvider.addresses.getAddressesAddressBalance('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
// {
//   balance: '999972904436900000000000',
//   balanceHint: '999972.9044369 ALPH',
//   lockedBalance: '0',
//   lockedBalanceHint: '0 ALPH',
//   tokenBalances: [
//     {
//       id: 'ee682f8182f56b55a36a7f916a901685752e00d0e4b90de073e6658156ae82a9',
//       amount: '10000000000000000000'
//     }
//   ],
//   utxoNum: 1
// }
```

## Write to the blockchain

Transactions are used to change the state of the blockchain. Every transaction needs to be signed with a private key, which can be done through the `SignerProvider`. And there are two `SignerProvider` in `alephium/web3-wallet`.

### Install Web3 Wallet

```
npm install --save @alephium/web3-wallet
```

:::note
Both wallets are used for contract development and deployment, please don't use them to store large amount of tokens.
:::

### NodeWallet

Please follow this [guide](/wallet/node-wallet-guide) to create a full
node wallet. Here are a few examples of how to use Web3 Wallet SDK to
interact with the node wallet:

```typescript
// Create a node wallet by wallet name
const nodeWallet = new NodeWallet('alephium-web3-test-only-wallet', nodeProvider)

// Unlock the wallet with password
await nodeWallet.unlock('alph')

// Get accounts
await nodeWallet.getAccounts()
// [
//   {
//     publicKey: '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0',
//     address: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
//     group: 0
//   }
// ]

// Transfer 1 ALPH to 15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT
await nodeWallet.signAndSubmitTransferTx({
  signerAddress: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
  destinations: [{
    address: '15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT',
    attoAlphAmount: 10n ** 18n,
  }]
})
// {
//   txId: '7d11b0e88f0158cdd94fcf4e7af04a76be1101293a50050523f72422a9269f36',
//   fromGroup: 0,
//   toGroup: 0
// }

// Lock the wallet
await nodeWallet.lock()
```

### PrivateKeyWallet

If you have mnemonic or private key, you can also use the Web3 Wallet
SDK to create an instance of `PrivateKeyWallet`, which can then be
used to sign transactions.

```typescript
// Create a PrivateKeyWallet from private key
const wallet =  new PrivateKeyWallet({privateKey: 'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5', keyType: undefined, nodeProvider: web3.getCurrentNodeProvider()})

// Create a PrivateKeyWallet from mnemonic and group, here it will create an account on group 0
const wallet = PrivateKeyWallet.FromMnemonicWithGroup(
  'vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava',
  0,
  undefined,
  undefined,
  undefined,
  nodeProvider
)
console.log(wallet.account)
// {
//   address: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
//   publicKey: '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0',
//   group: 0
// }

// Transfer 1 ALPH to 15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT
await wallet.signAndSubmitTransferTx({
  signerAddress: wallet.account.address,
  destinations: [{
    address: '15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT',
    attoAlphAmount: 10n ** 18n
  }]
})
// {
//   txId: '9a23eab3796a56f538a4574d617b667fb9187721c8df9f39ac89d878cb9755a0',
//   fromGroup: 0,
//   toGroup: 0
// }
```

## Contracts

Similar to Ethereum, a contract is an abstraction of program code
which lives on the Alephium blockchain.

Work with contracts using full node's API can be tedious, but [Web3
SDK](https://github.com/alephium/alephium-web3) simplifies the process
by abstracting away many details. For more detailed information on
deploying and interacting with contracts using Web3 SDK, please refer
to the [Interact with contracts](/dapps/sdk/interact-with-contracts)
guide. The [Testing and debugging](/dapps/sdk/testing-and-debugging) guide
provides an overview of how to perform unit and integration testing on
your contracts, as well as how to diagnose issues using debug
statement. If you want to query or subscribe to the contract or system
events, the [Events](/dapps/sdk/events) guide will be helpful.

## Utility functions

The Web3 SDK also provides many utility functions to simplify
developers' tasks. Here are a few examples:

### Conversion between contract id and contract address

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
const contractAddress = addressFromContractId(contractId)
console.log(binToHex(contractIdFromAddress(contractAddress)) === contractId)
// true
```

### Get the group of an address

```typescript
const group = groupOfAddress('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
console.log(group)
// 0
```

### Get the sub-contract id

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
console.log(subContractId(contractId, '00'))
// 303483cfe0eaead281879233f884e8b64c2ecf26e368ccd4b05b2b5bda87ec3d
```
