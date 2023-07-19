---
sidebar_position: 30
title: Web3 SDK
sidebar_label: Web3 SDK
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Installing

```
npm install --save @alephium/web3
```

## Connecting to Alephium

`NodeProvider` is an abstraction of a connection to the Alephium network, you can get a `NodeProvider` by:

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
```

Or specify the `API_KEY` if you have `alephium.api.api-key` in your full node configuration file:

```typescript
const API_KEY = // alephium.api.api-key from your full node config
const nodeProvider = new NodeProvider('http://localhost:22973', API_KEY)
```

Sometimes, it's convenient to setup a global `NodeProvider` for your project:

```typescript
web3.setCurrentNodeProvider(<nodeURL>)
```

## Querying the Blockchain

Once you have a `NodeProvider`, you have a connection to the blockchain, which you can use to query the current contract state, fetch historic contract events, look up deployed contracts and so on.

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

:::note
Both wallets are used for contract development and deployment, please don't use them to store large amount of tokens.
:::

### NodeWallet

Please follow the [guide](/wallet/node-wallet-guide) to create a full node wallet.

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

```typescript
// Create a PrivateKeyWallet from private key
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5', undefined, nodeProvider)

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

Similar to Ethereum, a contract is an abstraction of program code which lives on the Alephium blockchain. Let's use the following example to illustrate how to test, deploy and call a contract, please follow the [guide](/dapps/getting-started) to create a project.

### Test the contract

The SDK provides unit testing functionality, which calls the contract like a normal transaction, but instead of changing the blockchain state, it returns the new contract state, transaction outputs, and events.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
// Build the project first
await Project.build()

// Test the `withdraw` method of the `TokenFaucet` contract, it will NOT change the blockchain state
const testContractAddress = randomContractAddress()
// The `TokenFaucet` is generated in the getting-started guide
const result = await TokenFaucet.tests.withdraw({
  address: testContractAddress,
  // Initial state of the test contract
  initialFields: {
    symbol: Buffer.from('TF', 'utf8').toString('hex'),
    name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
    decimals: 18n,
    supply: 10n ** 18n,
    balance: 10n
  },
  // Assets owned by the test contract before a test
  initialAsset: {
    alphAmount: 10n ** 18n,
    tokens: [{
      id: binToHex(contractIdFromAddress(testContractAddress)),
      amount: 10n
    }]
  },
  // Arguments to test the target function of the test contract
  testArgs: { amount: 1n },
  // Assets owned by the caller of the function
  inputAssets: [{
    address: wallet.account.address,
    asset: { alphAmount: 10n ** 18n }
  }]
})
console.log(JSON.stringify(result, null, 2))
// {
//   "contractId": "edcc67cc1187540b189e0c4b1cb8d881c6c7dc58bfc4a1ccc0f8cf0a07315a4e",
//   "contractAddress": "2AhDWnKjdYULdEimnH5iKYkKKfcSDAA8gcHPd1FUNxRWM",
//   "returns": null,
//   "gasUsed": 21848,
//   "contracts": [
//     {
//       "address": "2AhDWnKjdYULdEimnH5iKYkKKfcSDAA8gcHPd1FUNxRWM",
//       "contractId": "edcc67cc1187540b189e0c4b1cb8d881c6c7dc58bfc4a1ccc0f8cf0a07315a4e",
//       "bytecode": "050609121b4024402d4067010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a00002010201010013a0007e02175468652063757272656e742062616c616e6365206973200016000e320c7bb4b11600aba00016002ba10005b416005f",
//       "initialStateHash": "e511c1a7e9560bd8edec9cf53e0d77653daa6f968c9b7caf825dc01dd7fd4c5f",
//       "codeHash": "142f8d7201aa0279723529eb7b15f247c0e41a71d1f58d7bdbefa5264d16a7a8",
//       "fields": {
//         "symbol": "5446",
//         "name": "546f6b656e466175636574",
//         "decimals": "18",
//         "supply": "1000000000000000000",
//         "balance": "9"
//       },
//       "fieldsSig": {
//         "names": [
//           "symbol",
//           "name",
//           "decimals",
//           "supply",
//           "balance"
//         ],
//         "types": [
//           "ByteVec",
//           "ByteVec",
//           "U256",
//           "U256",
//           "U256"
//         ],
//         "isMutable": [
//           false,
//           false,
//           false,
//           false,
//           true
//         ]
//       },
//       "asset": {
//         "alphAmount": "1000000000000000000",
//         "tokens": [
//           {
//             "id": "edcc67cc1187540b189e0c4b1cb8d881c6c7dc58bfc4a1ccc0f8cf0a07315a4e",
//             "amount": "9"
//           }
//         ]
//       }
//     }
//   ],
//   "txOutputs": [
//     {
//       "type": "AssetOutput",
//       "address": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//       "alphAmount": "1000000000000000",
//       "tokens": [
//         {
//           "id": "edcc67cc1187540b189e0c4b1cb8d881c6c7dc58bfc4a1ccc0f8cf0a07315a4e",
//           "amount": "1"
//         }
//       ],
//       "lockTime": 0,
//       "message": ""
//     },
//     {
//       "type": "AssetOutput",
//       "address": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//       "alphAmount": "936500000000000000",
//       "tokens": [],
//       "lockTime": 0,
//       "message": ""
//     },
//     {
//       "type": "ContractOutput",
//       "address": "2AhDWnKjdYULdEimnH5iKYkKKfcSDAA8gcHPd1FUNxRWM",
//       "alphAmount": "1000000000000000000",
//       "tokens": [
//         {
//           "id": "edcc67cc1187540b189e0c4b1cb8d881c6c7dc58bfc4a1ccc0f8cf0a07315a4e",
//           "amount": "9"
//         }
//       ]
//     }
//   ],
//   "events": [
//     {
//       "txId": "92a392b116cbb3247849887152230d02771d3edc79b4884a0c332f354cd60f3d",
//       "blockHash": "2a7128f25167357ab202b08065ed9d7e3880c5a8c8b95867054ddd34ff53994b",
//       "contractAddress": "2AhDWnKjdYULdEimnH5iKYkKKfcSDAA8gcHPd1FUNxRWM",
//       "name": "Withdraw",
//       "eventIndex": 0,
//       "fields": {
//         "to": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//         "amount": "1"
//       }
//     }
//   ],
//   "debugMessages": [
//     {
//       "contractAddress": "2AhDWnKjdYULdEimnH5iKYkKKfcSDAA8gcHPd1FUNxRWM",
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

// Create a transaction to deploy the contract and submit the transaction to the Alephium network:
// `initialFields` is required if the contract has fields
// `initialAttoAlphAmount` must be greater than or equal to 1 ALPH, assets will be sent to the contract from the transaction sender account
// `issueTokenAmount` specifies the amount of tokens to issue
const issueTokenAmount = 10n
const deployResult = await TokenFaucet.deploy(wallet, {
  initialFields: {
    symbol: Buffer.from('TF', 'utf8').toString('hex'),
    name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
    decimals: 18n,
    supply: issueTokenAmount,
    balance: issueTokenAmount
  },
  initialAttoAlphAmount: 10n ** 18n,
  issueTokenAmount: issueTokenAmount
})
console.log(JSON.stringify(deployResult, null, 2))
// {
//   "signature": "ea95754bae7935311acf15d3323293f03bce89bb6c82939427da5e3074f0ada93b0cda24138dcec1de4e21a1a66dc1f0c8e99297e6ff8fe10587d1821cbae23f",
//   "fromGroup": 0,
//   "toGroup": 0,
//   "unsignedTx": "000401010103000000091500bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a13c40de0b6b3a7640000a2144055050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f14160403025446030b546f6b656e4661756365740212020a140301020a130aae188000dfdfc1174876e8000137a444479fa782e8b88d4f95e28b3b2417e5bc30d33a5ae8486d4a8885b82b224259c1e6000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b000",
//   "gasAmount": 57311,
//   "gasPrice": "100000000000",
//   "txId": "c9adbbc02f34d2b3f2db8790354bca9f3d6f7a1fde9b9269a393d6693663c084",
//   "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//   "groupIndex": 0,
//   "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//   "instance": {
//     "address": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//     "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//     "groupIndex": 0
//   }
// }

// Get the contract state
const tokenFaucet = deployResult.instance
const contractState = await tokenFaucet.fetchState()
console.log(JSON.stringify(contractState, null, 2))
// {
//   "address": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//   "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//   "bytecode": "050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f",
//   "initialStateHash": "236a82352f5e34f813ecf274385912ed0ba67f1c305c24f7a6934c18d32213b1",
//   "codeHash": "641343b4f1c08b03969b127b452acc7535cad20231bc32af6c0b5f218dd8ff0c",
//   "fields": {
//     "symbol": "5446",
//     "name": "546f6b656e466175636574",
//     "decimals": "18",
//     "supply": "10",
//     "balance": "10"
//   },
//   "fieldsSig": {
//     "names": [
//       "symbol",
//       "name",
//       "decimals",
//       "supply",
//       "balance"
//     ],
//     "types": [
//       "ByteVec",
//       "ByteVec",
//       "U256",
//       "U256",
//       "U256"
//     ],
//     "isMutable": [
//       false,
//       false,
//       false,
//       false,
//       true
//     ]
//   },
//   "asset": {
//     "alphAmount": "1000000000000000000",
//     "tokens": [
//       {
//         "id": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//         "amount": "10"
//       }
//     ]
//   }
// }
```

From the output we can see that we have successfully deployed the contract, and there are 10 tokens in the contract asset.

### Call the contract

You can use scripts to call contracts on the Alephium blockchain, the script code will be executed when the transaction is submitted to the Alephium network, but the script code will not be stored in the blockchain's state.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
await Project.build()

// Contract address from the deploy result
const contractAddress = deployResult.instance.address

// Contract id from the deploy result
const contractId = deployResult.instance.contractId

// Create a call contract transaction, `initialFields` is required if the script has fields
// The `Withdraw` is generated in the getting-started guide
const executeResult = await Withdraw.execute(wallet, {
  initialFields: {
    token: contractId,
    amount: 1n
  }
})
console.log(JSON.stringify(executeResult, null, 2))
// {
//   "signature": "16ec5eed788bfe7a803ec89f47d8ef7c1ac5f626ad88e4b46ecdde8be9fdef5719db49b09ef4e11a94901082e34c52629aafad4b9753483bf853ff695b19b9a4",
//   "fromGroup": 0,
//   "toGroup": 0,
//   "unsignedTx": "0004010101030000000513010d0c1440201581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c0001058000a447c1174876e8000137a44447f11525fe8e58af5a02b2f81bbbf35ea3c1bdf319ffe76794709c9e9d4e80c599000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b000",
//   "gasAmount": 42055,
//   "gasPrice": "100000000000",
//   "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
//   "groupIndex": 0
// }

// Get the account balance
const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
console.log(JSON.stringify(balance, null, 2))
// {
//   "balance": "999998990063400000000000",
//   "balanceHint": "999998.9900634 ALPH",
//   "lockedBalance": "0",
//   "lockedBalanceHint": "0 ALPH",
//   "tokenBalances": [
//     {
//       "id": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//       "amount": "1"
//     }
//   ],
//   "utxoNum": 2
// }
```

### Query historic contract events

Contract events are indexed by contract address with offsets, and you can query historic events of a contract address by specifying the offset and limit (optional).

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
// Contract address from the contract deploy result
const contractAddress = deployResult.instance.address

// Query contract events from index 0, and the `limit` cannot be greater than 100
const result = await nodeProvider.events.getEventsContractContractaddress(
  contractAddress, {start: 0, limit: 100}
)

// In the next query you can start with `result.nextStart`
console.log(JSON.stringify(result, null, 2))
// {
//   "events": [
//     {
//       "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//       "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
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

// Sometimes, events might be emitted from non-canonical blocks because of block reorg, you can check if the block in the main chain
await nodeProvider.blockflow.getBlockflowIsBlockInMainChain({blockHash: events[0].blockHash})
// true

// Get the current contract event counter
await nodeProvider.events.getEventsContractContractaddressCurrentCount(contractAddress)
// 1

// You can also get events by transaction id if `alephium.node.event-log.index-by-tx-id` is enabled in your full node configuration file
await nodeProvider.events.getEventsTxIdTxid('c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617')
// {
//   "events": [
//     {
//       "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//       "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
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

In addition to querying events one by one, you can also get events by event subscription. It will periodically query and get new events.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
// The `TokenFaucet` contract instance from deploy result
const tokenFaucet = deployResult.instance
// The `TokenFaucetTypes.WithdrawEvent` is generated in the getting-started guide
const events: TokenFaucetTypes.WithdrawEvent[] = []
const subscribeOptions = {
  // It will check for new events from the full node every `pollingInterval`
  pollingInterval: 500,
  // The callback function will be called for each event
  messageCallback: (event: TokenFaucetTypes.WithdrawEvent): Promise<void> => {
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
const subscription = tokenFaucet.subscribeWithdrawEvent(subscribeOptions, 0)
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log(JSON.stringify(events, null, 2))
// [
//   {
//     "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//     "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//     "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
//     "eventIndex": 0,
//     "name": "Withdraw",
//     "fields": {
//       "to": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//       "amount": "1"
//     }
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
