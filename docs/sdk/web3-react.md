---
sidebar_position: 90
title: Web3 React
sidebar_label: Web3 React
---

The `@alephium/web3-react` package provides several hooks to facilitate the development of frontend user interfaces. You need to install `@alephium/web3-react` first:

```shell
npm install --save @alephium/web3-react
```

## AlephiumWalletProvider

The `AlephiumWalletProvider` component offers a user-friendly approach to integrating Alephium wallets with your dApps, simplifying wallet connection and interaction with the Alephium blockchain.

```typescript
import { AlephiumWalletProvider } from '@alephium/web3-react'

function App() {
  <AlephiumWalletProvider theme='retro' mode='auto' network='devnet' addressGroup=0>
    <YourComponent />
  </AlephiumWalletProvider>
}
```

* `theme`: The theme parameter allows you to customize the visual appearance of the wallet provider, you can view all available themes [here](https://github.com/alephium/alephium-web3/blob/3640e46892c7d2f52942447f300d4b21c7166a0c/packages/web3-react/src/types.ts#L31)
* `network`: The network parameter specifies the blockchain network to which the wallet provider should connect. It must be one of the following values: `devnet`, `testnet`, or `mainnet`
* `addressGroup`: The `addressGroup` parameter is optional. If not specified, the wallet provider allows connection to addresses from any group

## AlephiumConnectButton

The `AlephiumConnectButton` component allows users to easily connect various types of wallets to the dApp with a single click.

```typescript
import { AlephiumConnectButton } from '@alephium/web3-react'
import { Account } from '@alephium/web3'

function Component() {
  const displayAccount = (account: Account) => {
    const address = account.address
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return <AlephiumConnectButton displayAccount={displayAccount} />
}
```

The `displayAccount` is used to specify the content displayed after the wallet is connected. If not specified, the connected address will be displayed.

## Hooks

### useConnect

```typescript
import { useConnect } from '@alephium/web3-react'

function Component() {
  const { connect, disconnect } = useConnect()
}
```

The `useConnect` is used by `AlephiumConnectButton` under the hood. Typically, this hook is used for customizing your own component.

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

### useBalance

```typescript
import { useBalance } from '@alephium/web3-react'

function Component() {
  const { balance, updateBalanceForTx } = useBalance()

  const submit = useCallback(() => {
    const txId = // submit tx
    updateBalanceForTx(txId)
  }, [])
}
```

After the wallet is connected, you can use the `useBalance` hook to query the balance of the connected address.

When users submit a transaction, the dApp may need to update the balance. You can use the `updateBalanceForTx` to accomplish this. `updateBalanceForTx` listens to the transaction status and updates the balance once the transaction is confirmed.

### useTxStatus

```typescript
import { useTxStatus } from '@alephium/web3-react'

function Component() {
  const { txStatus } = useTxStatus(txId)
  const confirmed = useMemo(() => {
    return txStatus?.type === 'Confirmed'
  }, [txStatus])
}
```

The `useTxStatus` hook also accepts an optional callback parameter of type `(txStatus: node.TxStatus) => Promise<any>`, it will be called after each transaction status query.

## Customization

When the default component cannot meet your requirements, you can customize your own component.

### Custom Connect Button

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

### Custom Connect Provider

You can refer to the code [here](https://github.com/alephium/ralph-example/tree/master/custom-connect-provider) to customize the connect provider.
