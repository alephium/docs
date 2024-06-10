---
sidebar_position: 90
title: Web3 React
sidebar_label: Web3 React
---

The [Typescript SDK](/sdk/getting-started) includes the
[@alephium/web3-react](https://www.npmjs.com/package/@alephium/web3-react)
package that provides several react components and hooks to help with
wallet connection and blockchain interaction in the React/Nextjs web
interface.

First, we need to install the
[@alephium/web3-react](https://www.npmjs.com/package/@alephium/web3-react)
package:

```shell
npm install --save @alephium/web3-react
```

## Wallet Connection

To add a wallet connection button to our React/Nextjs app, simply wrap
the app with the `AlephiumWalletProvider` component and add the
`AlephiumConnectButton` component inside of it:

```typescript
const App = () => {
  const displayAccount = (account: Account) => {
    const address = account.address
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <AlephiumWalletProvider theme="retro" network='devnet' addressGroup=0>
      /* Our App */
      <AlephiumConnectButton displayAccount={displayAccount} />
    </AlephiumWalletProvider>
  );
}
```

The `theme` parameter for the `AlephiumWalletProvider` allows us to
customize the look-and-feel of the wallet provider, you can view all
available themes
[here](https://github.com/alephium/alephium-web3/blob/3640e46892c7d2f52942447f300d4b21c7166a0c/packages/web3-react/src/types.ts#L31). The
`network` parameter specifies the blockchain network to which the
wallet provider should connect. It must be one of the following
values: `devnet`, `testnet`, or `mainnet`. The `addressGroup`
parameter is optional. If specified, the wallet provider will connect
to an address in the specified group, otherwise the wallet provider
will connect to address from any group.

The `displayAccount` parameter in the `AlephiumConnectButton`
component is used to specify the content displayed after the wallet is
connected. By default, the connected address will be displayed.

### Custom Connect Button

If the default `AlephiumConnectButton` component with its built-in
customization cannot meet the requirements, we can customize our own
component using `AlephiumConnectButton.Custom`:

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

For even more customization, we can use the `useConnect` hook, which is the
used by `AlephiumConnectButton` under the hood:

```typescript
import { useConnect } from 'alephium-web3'

function CustomConnectButton() {
  const { connect, disconnect } = useConnect()

  return (
    <button onClick={() => connect()}>Connect to Wallet</button>
  )
}
```

### Custom Connect Provider

We have provided a detailed
[example](https://github.com/alephium/ralph-example/tree/master/custom-connect-provider)
to customize the connect provider.

## Blockchain Interaction

[Web3 React](https://www.npmjs.com/package/@alephium/web3-react)
package offers a set of React
[hooks](https://legacy.reactjs.org/docs/hooks-intro.html) to help with
the blockchain interaction.

### useWallet

The `useWallet` hook returns the wallet account information and the
connection status to the wallet:

```typescript
import { useWallet, Wallet } from '@alephium/web3-react'

function Component() {
  const { account, connectionStatus, signer, nodeProvider, explorerProvider } = useWallet()

  if (connectionStatus === 'connecting') return <div>Connecting</div>
  if (connectionStatus === 'disconnected') return <div>Disconnected</div>

  // connected
  return <div>{account}</div>
}
```

If the return value is `undefined`, it indicates that the wallet is not connected. The returned wallet has the following fields:

* `signer`: we can use the signer to sign transactions
* `account`: this is the currently connected account
* `nodeProvider`: we can use it to communicate with the full node, note that this value may be `undefined`
* `explorerProvider`: we can use it to communicate with the explorer backend, note that this value may be `undefined`

### useWalletConfig

The `useWalletConfig` hook returns the configurations of the connect
button and utility functions to update those configurations:

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
In the example above, it will set the current network to `Testnet` and
address group to `3` after these buttons are clicked.

### useBalance

After the wallet is connected, we can use the `useBalance` hook to
query the balance of the connected address:

```typescript
import { useBalance } from '@alephium/web3-react'

function Component() {
  const { balance, updateBalance, updateBalanceForTx } = useBalance()

  const submit = useCallback(() => {
    const txId = // submit tx
    updateBalanceForTx(txId)
  }, [])

  return <div>{balance.balanceHint}</div>
}
```
When users submit a transaction, the dApp may need to update the
balance. We can use the `updateBalanceForTx` to accomplish
this. `updateBalanceForTx` listens to the transaction status and
updates the balance once the transaction is confirmed.


### useTxStatus

we can use the `useTxStatus` hook to track the status of a
transaction:

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

