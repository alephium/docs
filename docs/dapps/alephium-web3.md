---
sidebar_position: 20
title: Alephium Web3
sidebar_label: Alephium Web3
---

## Installing

```
npm install --save @alephium/web3
```

## Connecting to Alephium

`NodeProvider` is an abstraction of a connection to the Alephium network, you can get a `NodeProvider` by:

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
```

Or specify the `API_KEY` if you have `alephium.api.api-key` in your full node config:

```typescript
const API_KEY = // alephium.api.api-key from your full node config
const nodeProvider = new NodeProvider('http://localhost:22973', API_KEY)
```

## Querying the Blockchain

Once you have a `NodeProvider`, you have a connection to the blockchain, which you can use to query the current state, fetch historic logs, look up deployed contracts and so on.

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

## Writing to the blockchain

Transactions are used to change the state of the blockchain. Every transaction needs to be signed with a private key, which can be done through the `SignerProvider`. And there are two `SignerProvider` in `alephium/web3-wallet`.

### Installing Web3 Wallet

```
npm install --save @alephium/web3-wallet
```

### NodeWallet

Please follow the [guide](https://wiki.alephium.org/wallet/wallet-guide) to create the full node wallet.

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
    attoAlphAmount: 1e18,
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

```typescript
// Create a PrivateKeyWallet from private key
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5', nodeProvider)

// Create a PrivateKeyWallet from mnemonic and group, here it will create an account on group 0
const wallet = PrivateKeyWallet.FromMnemonicWithGroup(
  'vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava',
  0,
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
    attoAlphAmount: 1e18
  }]
})
// {
//   txId: '9a23eab3796a56f538a4574d617b667fb9187721c8df9f39ac89d878cb9755a0',
//   fromGroup: 0,
//   toGroup: 0
// }
```

## Contracts

Similar to Ethereum, a contract is an abstraction of program code which lives on the Alephium blockchain. Let's use the following example to illustrate how to test, deploy and call the contract, please follow the [guide](https://wiki.alephium.org/dapps/getting-started) to create the project.

### Test the contract

The SDK provides unit testing functionality, which calls the contract like a normal transaction, but instead of changing the blockchain state, it returns the new contract state, transaction outputs, and events.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
// Build the project first
await Project.build()

// Get the contract by contract name
const contract = Project.contract('TokenFaucet')

// Test the `withdraw` method of the `TokenFaucet` contract, it will NOT change the blockchain state
const testContractAddress = randomContractAddress()
const result = await contract.testPublicMethod('withdraw', {
  address: testContractAddress,
  // Initial state of the test contract
  initialFields: {
    'supply': 10,
    'balance': 10
  },
  // Assets owned by the test contract before a test
  initialAsset: {
    alphAmount: 1e18,
    tokens: [{
      id: binToHex(contractIdFromAddress(testContractAddress)),
      amount: 10
    }]
  },
  // Arguments to test the target function of the test contract
  testArgs: {'amount': 1},
  // Assets owned by the caller of the function
  inputAssets: [{
    address: wallet.account.address,
    asset: {alphAmount: 1e18}
  }]
})
console.log(JSON.stringify(result, null, 2))
// {
//   "contractId": "926eb0290592170dd5a8340bb1290a5fd1eee9ffb117f3b3298153a776c49541",
//   "contractAddress": "24YZXgCU16frnhRWvZUhdXmA8BhiQvWkDwCwFDtFbdVmS",
//   "returns": [],
//   "gasUsed": 17371,
//   "contracts": [
//     {
//       "address": "24YZXgCU16frnhRWvZUhdXmA8BhiQvWkDwCwFDtFbdVmS",
//       "contractId": "926eb0290592170dd5a8340bb1290a5fd1eee9ffb117f3b3298153a776c49541",
//       "bytecode": "02030912404c010000000102a00002010000000102a00102010201010013a0017e02175468652063757272656e742062616c616e6365206973200016000e320c7bb4b11600aba00116002ba10105b416005f",
//       "initialStateHash": "646e5b0a3d62af6a3ad5db45afc958e36461d07ede614e067e7158483ba361f9",
//       "codeHash": "ccdaa53664ee38bb65c230426e4cf04f8d8d3bc4a9b7fcac384404c998a02cfa",
//       "fields": {
//         "supply": 10,
//         "balance": 9
//       },
//       "fieldsSig": {
//         "names": [
//           "supply",
//           "balance"
//         ],
//         "types": [
//           "U256",
//           "U256"
//         ],
//         "isMutable": [
//           false,
//           true
//         ]
//       },
//       "asset": {
//         "alphAmount": "1000000000000000000",
//         "tokens": [
//           {
//             "id": "926eb0290592170dd5a8340bb1290a5fd1eee9ffb117f3b3298153a776c49541",
//             "amount": 9
//           }
//         ]
//       }
//     }
//   ],
//   "txOutputs": [
//     {
//       "type": "AssetOutput",
//       "address": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//       "alphAmount": "937500000000000000",
//       "tokens": [
//         {
//           "id": "926eb0290592170dd5a8340bb1290a5fd1eee9ffb117f3b3298153a776c49541",
//           "amount": 1
//         }
//       ],
//       "lockTime": 0,
//       "message": ""
//     },
//     {
//       "type": "ContractOutput",
//       "address": "24YZXgCU16frnhRWvZUhdXmA8BhiQvWkDwCwFDtFbdVmS",
//       "alphAmount": "1000000000000000000",
//       "tokens": [
//         {
//           "id": "926eb0290592170dd5a8340bb1290a5fd1eee9ffb117f3b3298153a776c49541",
//           "amount": 9
//         }
//       ]
//     }
//   ],
//   "events": [
//     {
//       "blockHash": "a7905d0d7a70418d013c700507eadaee4ca5bef0a514ef60d406b76e4fccf039",
//       "contractAddress": "24YZXgCU16frnhRWvZUhdXmA8BhiQvWkDwCwFDtFbdVmS",
//       "name": "Withdraw",
//       "fields": {
//         "to": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//         "amount": 1
//       }
//     }
//   ],
//   "debugMessages": [
//     {
//       "contractAddress": "24YZXgCU16frnhRWvZUhdXmA8BhiQvWkDwCwFDtFbdVmS",
//       "message": "The current balance is 10"
//     }
//   ]
// }
```

### Deploy the contract

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
await Project.build()
const contract = Project.contract('TokenFaucet')

// Create a deploy contract transaction:
// `initialFields` is required if the contract has fields
// `initialAttoAlphAmount` must be greater than or equal to 1 ALPH, assets will be sent to the contract from the transaction sender account
// `issueTokenAmount` specifies the amount of tokens to issue
const deployTx = await contract.transactionForDeployment(wallet, {
  initialFields: {
    'supply': 10,
    'balance': 10
  },
  initialAttoAlphAmount: 1e18.toString(),
  issueTokenAmount: 10
})

// The wallet will sign the transaction and submit the signed transaction to the Alephium network
await wallet.signAndSubmitUnsignedTx({
  signerAddress: wallet.account.address,
  unsignedTx: deployTx.unsignedTx
})

// Get the contract state
const contractState = await contract.fetchState(deployTx.contractAddress, deployTx.fromGroup)
console.log(JSON.stringify(contractState, null, 2))
// {
//   "address": "27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L",
//   "contractId": "bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165",
//   "bytecode": "02030912402f010000000102a00002010000000102a0010201020101001116000e320c7bb4b11600aba00116002ba10105b416005f",
//   "initialStateHash": "60bc4f3efc3b6666012912b72f225ea195f975997798e9430d1e31c22ef9b1f9",
//   "codeHash": "2fc7b82e947f4dbb0f44d16fd60ff022ed7f34de120b4c1fea2926231c8d3595",
//   "fields": {
//     "supply": 10,
//     "balance": 10
//   },
//   "fieldsSig": {
//     "names": [
//       "supply",
//       "balance"
//     ],
//     "types": [
//       "U256",
//       "U256"
//     ],
//     "isMutable": [
//       false,
//       true
//     ]
//   },
//   "asset": {
//     "alphAmount": "1000000000000000000",
//     "tokens": [
//       {
//         "id": "bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165",
//         "amount": 10
//       }
//     ]
//   }
// }
```

From the output we can see that we have successfully deployed the contract, and there are 10 tokens in the contract asset.

### Call the contract

You can use scripts to call contracts in Alephium blockchain, the script code will be executed when the transaction is submitted to the Alephium network, but the script code will not be saved to the blockchain.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
await Project.build()

// Contract address from the deploy output
const contractAddress = '27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L'

// Contract id from the deploy output
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'

// Get the script by script name
const script = Project.script('Withdraw')

// Create a call contract transaction, `initialFields` is required if the script has fields
const callTx = await script.transactionForDeployment(wallet, {
  initialFields: {
    'token': contractId,
    'amount': 1
  }
})

// The wallet will sign the transaction and submit the signed transaction to the Alephium network
await wallet.signAndSubmitUnsignedTx({
  signerAddress: wallet.account.address,
  unsignedTx: callTx.unsignedTx
})

// Get the account balance
const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
console.log(balance)
// {
//   balance: '999997984806600000000000',
//   balanceHint: '999997.9848066 ALPH',
//   lockedBalance: '0',
//   lockedBalanceHint: '0 ALPH',
//   tokenBalances: [
//     {
//       id: 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165',
//       amount: '1'
//     }
//   ],
//   utxoNum: 1
// }

// Get the contract state
const contract = Project.contract('TokenFaucet')
const contractState = await contract.fetchState(contractAddress, wallet.account.group)
console.log(JSON.stringify(contractState, null, 2))
// {
//   "address": "27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L",
//   "contractId": "bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165",
//   "bytecode": "02030912402f010000000102a00002010000000102a0010201020101001116000e320c7bb4b11600aba00116002ba10105b416005f",
//   "initialStateHash": "60bc4f3efc3b6666012912b72f225ea195f975997798e9430d1e31c22ef9b1f9",
//   "codeHash": "2fc7b82e947f4dbb0f44d16fd60ff022ed7f34de120b4c1fea2926231c8d3595",
//   "fields": {
//     "supply": 10,
//     "balance": 9
//   },
//   "fieldsSig": {
//     "names": [
//       "supply",
//       "balance"
//     ],
//     "types": [
//       "U256",
//       "U256"
//     ],
//     "isMutable": [
//       false,
//       true
//     ]
//   },
//   "asset": {
//     "alphAmount": "1000000000000000000",
//     "tokens": [
//       {
//         "id": "bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165",
//         "amount": 9
//       }
//     ]
//   }
// }
```

### Query historic events

Contract events are indexed by counters, and you can query historic events by specifying the offset and limit.

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
// Contract address from deploy output
const contractAddress = '27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L'

// Query events from index 0, and the `limit` cannot be greater than 100
const result = await nodeProvider.events.getEventsContractContractaddress(
  contractAddress, {start: 0, limit: 100}
)

// In the next query you can start with `result.nextStart`
console.log(JSON.stringify(result, null, 2))
// {
//   "events": [
//     {
//       "blockHash": "0cb24e242082ca2cc9520ef371bd846e9c29af5b25857fd88bea78da2f05d540",
//       "txId": "e4a255c1915d5e5cff28a95e7b8d04d02f43a3167957c7712f5191bcdd24d75f",
//       "eventIndex": 0,
//       "fields": [
//         {
//           "type": "Address",
//           "value": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"
//         },
//         {
//           "type": "U256",
//           "value": "1"
//         }
//       ]
//     }
//   ],
//   "nextStart": 1
// }

// Sometimes events might come from non-canonical blocks because of reorg, you can check if the block in the main chain
await nodeProvider.blockflow.getBlockflowIsBlockInMainChain({blockHash: events[0].blockHash})
// true

// Get current contract events counter
await nodeProvider.events.getEventsContractContractaddressCurrentCount(contractAddress)
// 1

// You can also get events by transaction id if `alephium.node.event-log.index-by-tx-id` is enabled in your full node configs
await nodeProvider.events.getEventsTxIdTxid('e4a255c1915d5e5cff28a95e7b8d04d02f43a3167957c7712f5191bcdd24d75f')
// {
//   "events": [
//     {
//       "blockHash": "0cb24e242082ca2cc9520ef371bd846e9c29af5b25857fd88bea78da2f05d540",
//       "contractAddress": "27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L",
//       "eventIndex": 0,
//       "fields": [
//         {
//           "type": "Address",
//           "value": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"
//         },
//         {
//           "type": "U256",
//           "value": "1"
//         }
//       ]
//     }
//   ]
// }
```

### Listening to events

In addition to querying events one by one, you can also get events by subscribing. It will periodically query and get new events.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const contractAddress = '27bbNJrvKCMXEtLk6kJ9LGjEb8raRzou48r2hfR3mdG8L'
const events: node.ContractEvent[] = []
const subscriptOptions = {
  // It will check for new events from the full node every `pollingInterval`
  pollingInterval: 500,
  // The callback function will be called for each event
  messageCallback: (event: node.ContractEvent): Promise<void> => {
    events.push(event)
    return Promise.resolve()
  },
  // This callback function will be called when an error occurs
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
}

// Subscribe the contract events from index 0
const subscription = subscribeToEvents(subscriptOptions, contractAddress, 0)
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log(JSON.stringify(events, null, 2))
// [
//   {
//     "blockHash": "0cb24e242082ca2cc9520ef371bd846e9c29af5b25857fd88bea78da2f05d540",
//     "txId": "e4a255c1915d5e5cff28a95e7b8d04d02f43a3167957c7712f5191bcdd24d75f",
//     "eventIndex": 0,
//     "fields": [
//       {
//         "type": "Address",
//         "value": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"
//       },
//       {
//         "type": "U256",
//         "value": "1"
//       }
//     ]
//   }
// ]

// Unsubscribe
subscription.unsubscribe()
```

## Utils

### Conversion between contract id and contract address

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
const contractAddress = addressFromContractId(contractId)
console(binToHex(contractIdFromAddress(contractAddress)) === contractId)
// true
```

### Get group of address

```typescript
const group = groupOfAddress('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
console.log(group)
// 0
```

### Get sub contract id

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
console.log(subContractId(contractId, '00'))
// 303483cfe0eaead281879233f884e8b64c2ecf26e368ccd4b05b2b5bda87ec3d
```
