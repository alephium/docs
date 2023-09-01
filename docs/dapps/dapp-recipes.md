---
sidebar_position: 30
title: Dapp Recipes
sidebar_label: Dapp Recipes
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

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

### useWallet

```typescript
import { useWallet, Wallet } from '@alephium/web3-react'

function Component() {
  const { account, connectionStatus } = useWallet()

  if (connectionStatus === 'connecting') return <div>Connecting</div>
  if (connectionStatus === 'disconnected') return <div>Connecting</div>

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
import { AlephiumConnectButton } from '@alephium/web3'

function CustomWalletConnectButton = () => {
  return (
    <AlephiumConnectButton.Custom>
      {({ isConnected, disconnect, show, address }) => {
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
