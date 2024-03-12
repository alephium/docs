---
sidebar_position: 30
title: Dapp Recipes
sidebar_label: Dapp Recipes
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Wallet

### Connect Wallet to dapp 

The `@alephium/web3-react` provides powerful React components and hooks for connecting a wallet to your dApp.

```typescript
// Alephium Context Provider
<AlephiumWalletProvider theme='retro' network='devnet'>
  <YourComponent />
</AlephiumWalletProvider>

// Connect button
<AlephiumConnectButton />

// Wallet hook
const { connectionStatus, signer, account } = useWallet()

// Balance hook
const { balance } = useBalance()

// Connect hook which is used by `<AlephiumConnectButton />` under the hood
const { connect, disconnect } = useConnect()
```

### Web3 SDK wallets

The SDK provides a few basic wallets for developers.

```typescript
// HD wallet
const mnemonic = bip39.generateMnemonic(128)
const hdWallet = new HDWallet({ mnemonic })

// Private key wallet
const wallet0 = new PrivateKeyWallet({ privateKey })
const wallet1 = PrivateKeyWallet.Random()
const wallet2 = PrivateKeyWallet.FromMnemonic({ mnemonic })
```

### Testing wallet

The `@alephium/web3-test` library provides convenient wallets for testing purpose.

```typescript
// Devnet test wallet, which has 1 million ALPH by default
const wallet = testNodeWallet()

// Generate random signer wallet for testing
const signer = getSigner()

// Generate a list of random wallets for testing
const signers = getSigners()
```

## Token

### Fetch fungible token metadata

```typescript
nodeProvider.fetchFungibleTokenMetaData(tokenId)
```

### Fetch the circulating supply/total supply of a token

The following code retrieves the total supply programmed by the token developer.
Note that actual contract verification is necessary for trustworthiness.
```typescript
(await nodeProvider.fetchFungibleTokenMetaData(tokenId)).totalSupply
```

There's no direct function for circulating supply following the ERC20 standard.

TODO: query token issuance amount in the explorer backend to provide more trustworthy information.

### Fetch NFT metadata

```typescript
nodeProvider.fetchNFTMetaData(nftTokenId)
```

### Fetch Collection metadata

```typescript
nodeProvider.fetchNFTCollectionMetaData(nftCollectionId)
```

## Contract

### Fetch contract state

When using the `npx @alephium/cli compile` command to compile a contract, it will generate TypeScript code based on the contract code.
Taking the [TokenFaucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) contract as an example,
[here](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/TokenFaucet.ts) is the generated TypeScript code.
We can use the generated TypeScript code to fetch the contract state:

```typescript
import { TokenFaucet } from 'artifacts/ts' // Note that you may need to change the import path according to your project directory structure
import { web3, NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)
web3.setCurrentNodeProvider(nodeProvider)

const tokenFaucetAddress = 'y1btMZHTvMvHEqLTdx1JHvEXq3tmVfqsY2rwM669upiT'
const tokenFaucet = TokenFaucet.at(tokenFaucetAddress)
const contractState = await tokenFaucet.fetchState()

// The names in `contractState.fields` are the same as the field names in the TokeFaucet contract
const { symbol, name, decimals, supply, balance  } = contractState.fields

// You can also get the assets owned by the contract
const { alphAmount, tokens } = contractState.asset
```

### Call contract method

You can use the generated TypeScript code to call the contract methods, it is similar to the `eth_call` in Ethereum:

```typescript
import { TokenFaucet } from 'artifacts/ts'
import { web3, NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)
web3.setCurrentNodeProvider(nodeProvider)

const tokenFaucetAddress = 'y1btMZHTvMvHEqLTdx1JHvEXq3tmVfqsY2rwM669upiT'
const tokenFaucet = TokenFaucet.at(tokenFaucetAddress)
const totalSupply = await tokenFaucet.methods.getTotalSupply()
```

### Subscribe to contract events

In the [TokenFaucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) contract,
we have defined a [Withdraw](https://github.com/alephium/nextjs-template/blob/c846a675235198045cdf91ba0304aa287f2fc68d/contracts/token.ral#L18) event.
Every time the `withdraw` function is called, the contract will emit a `Withdraw` event.
We can subscribe to the withdraw events using the following approach:

```typescript
import { TokenFaucet, TokenFaucetTypes } from 'artifacts/ts'
import { EventSubscribeOptions } from '@alephium/web3'

// `TokenFaucetTypes.WithdrawEvent` is a generated TypeScript type
const options: EventSubscribeOptions<TokenFaucetTypes.WithdrawEvent> = {
  // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
  pollingInterval: 4000,
  // The `messageCallback` will be called every time we recive a new event
  messageCallback: (event: TokenFaucetTypes.WithdrawEvent): Promise<void> => {
    console.log(`Withdraw(${event.fields.to}, ${event.fields.amount})`)
    return Promise.resolve()
  },
  // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
  errorCallback: (error, subscription): Promise<void> => {
    console.error(error)
    subscription.unsubscribe()
    return Promise.resolve()
  },
  // The `onEventCountChanged` callback is an optional parameter that will be called when the contract event count changes
  onEventCountChanged: (eventCount): Promise<void> => {
  },
}

// We subscribe to contract events starting from event count 0.
// We can also persist the current event count within the `onEventCountChanged` callback,
// allowing us to subscribe from the last event count for the next subscription.
const fromEventCount = 0
const subscription = tokenFaucet.subscribeWithdrawEvent(options, fromEventCount)

// Unsubscribe the subscription
subscription.unsubscribe()
```

### Test functions with simulated block time

It's possible to test functions with simulated block time in unit tests. For integration tests based on testnet or devnet, there is no way to change the block time though.

Here is a simple example:

```typescript
import { TokenFaucet } from 'artifacts/ts'

const result = await TokenFaucet.tests.withdraw({
  blockTimeStamp: 1706284941000, // the unit is millisecond
  address: ...,
  initialFields: ...,
  ...
})
```

### Log debug messages

Ralph supports debug messages by emitting the built-in event `Debug`. Note that such events are ignored on mainnet.

```typescript
// Simple Ralph contract
Contract Debug() {
    pub fn debug() -> () {
        emit Debug(`Hello, ${nullContractAddress!()}!`)
    }
}

// Unit test in Typescript
const result = await Debug.tests.debug()

// The following line will appear in the console output and the full node's logs:
//   Debug - tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq - Hello, tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq!

// Retrieve all debug messages
console.log(result.debugMessages)
```

## Transaction

### Query transaction status

You can query the transaction status using the following approach:

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)

const txId = '919d4e4b1080d74beb56a1f78ea7c0569a358e3ea3988058987cc1addf4b93cc'
const txStatus = await nodeProvider.transactions.getTransactionsStatus({ txId })
```

You can differentiate the transaction status using the `txStatus.type`:

1. `MemPooled`: this means the transaction is in the mempool
2. `Confirmed`: the transaction has been confirmed, and you can get the confirmations using `txStatus.chainConfirmations`
3. `TxNotFound`: the transaction does not exist

## Hooks

The `@alephium/web3-react` package provides several hooks to facilitate the development of frontend user interfaces.

### useWalletConfig

```typescript
import { useWalletConfig } from '@alephium/web3-react'

export function Component() {
  const { network, setNetwork, addressGroup, setAddressGroup } = useWalletConfig()

  return <div>
    <button onClick={() => setNetwork('testnet')}>Network: {network}</button>
    <button onClick={() => setAddressGroup(3)}>Address group: {addressGroup}</button>
  </div>
}
```

The `useWalletConfig` hook returns the configurations of the connect button and utility functions to update those configurations.

### useWallet

```typescript
import { useWallet, Wallet } from '@alephium/web3-react'

function Component() {
  const { account, connectionStatus } = useWallet()

  if (connectionStatus === 'connecting') return <div>Connecting</div>
  if (connectionStatus === 'disconnected') return <div>Disconnected</div>

  // connected
  return <div>{account}</div>
}
```

If the return value is `undefined`, it indicates that the wallet is not connected. The returned wallet has the following fields:

* `wallet.signer`: you can use the signer to sign transactions
* `wallet.account`: this is the currently connected account
* `wallet.nodeProvider`: you can use the node provider to communicate with the full node, note that this value may be `undefined`

### useBalance

```typescript
import { useBalance } from '@alephium/web3-react'

const { balance, updateBalanceForTx } = useBalance()
```

The `useBalance` hook returns two values:

1. `balance`: the current balance of the connected account
2. `updateBalanceForTx`: this is used to update the balance when the user makes a transaction. It takes a transaction id as a parameter, and it will update the balance once this transaction is confirmed.

### useTxStatus

```typescript
import { useState } from 'react'
import { useTxStatus } from '@alephium/web3-react'

const { txStatus } = useTxStatus(txId)
const confirmed = useMemo(() => {
  return txStatus?.type === 'Confirmed'
}, [txStatus])
```

The `useTxStatus` hook also accepts an optional callback parameter of type `(txStatus: node.TxStatus) => Promise<any>`, it will be called after each transaction status query.

## Utils

### Prettify token amounts

The web3 SDK provides a few utility functions to convert between currency and numbers

```Typescript
convertToAttoAlph(1.23) // 1230000000000000000
convertToAlph(1230000000000000000) // 1.23
number256ToNumber(1230000000000000000, 18) // 1.23
```

### Rate limit

`NodeProvider` is used to communicate with the full node when developing a dApp,
and you can use the public [API services](./public-services.md) provided by Alephium. 
But all APIs are rate limited to prevent spam. So if the client sends too many requests in a given amount of time, it will receive the HTTP 429 error.

You can use the [fetch-retry](https://github.com/jonbern/fetch-retry) to solve this issue:

```typescript
import * as fetchRetry from 'fetch-retry'

// We specify up to 10 retries, with 1 second retry delay
const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider('node-url', undefined, retryFetch)
```

### Custom wallet connect button

`@alephium/web3-react` provides the `AlephiumConnectButton` component to facilitate the development of user interfaces,
you can also use the `AlephiumConnectButton.Custom` to customize the style of the connect button:

```typescript
import { AlephiumConnectButton } from '@alephium/web3-react'

function CustomWalletConnectButton = () => {
  return (
    <AlephiumConnectButton.Custom>
      {({ isConnected, disconnect, show, account }) => {
        return isConnected ? (
          <button onClick={disconnect}>
            Disconnect
          </button>
        ) : (
          <button onClick={show}>
            Connect
          </button>
        )
      }}
    </AlephiumConnectButton.Custom>
  )
}
```
