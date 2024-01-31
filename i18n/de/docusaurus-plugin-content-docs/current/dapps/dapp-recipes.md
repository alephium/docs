---
sidebar_position: 30
title: Dapp-Rezepte
sidebar_label: Dapp-Rezepte
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Smart Contract

### Zustand des Smart Contracts abrufen

Wenn sie den Befehl `npx @alephium/cli compile` verwenden, um einen Smart Contract zu kompilieren, wird TypeScript-Code basierend auf dem Smart Contract generiert. Nehmen wir den [Token Faucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral)-Smart Contract als Beispiel,
[hier](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/TokenFaucet.ts) ist der generierte TypeScript-Code. Wir können den generierten TypeScript-Code verwenden, um den Zustand des Smart Contracts abzurufen:

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

### Methode des Smart Contracts aufrufen

Sie können den generierten TypeScript-Code verwenden, um die Methoden des Smart Contracts aufzurufen. Dies ähnelt dem `eth_call` in Ethereum:

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

### Ereignisse des Smart Contract abonnieren

Im [Token Faucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral)-Smart Contract haben wir ein [Withdraw](https://github.com/alephium/nextjs-template/blob/c846a675235198045cdf91ba0304aa287f2fc68d/contracts/token.ral#L18)-Ereignis definiert.
Jedes Mal, wenn die `Withdraw`-Funktion aufgerufen wird, gibt der Smart Contract ein `Withdraw`-Ereignis aus. 
Wir können die Abhebungsereignisse mit dem folgenden Ansatz abonnieren:

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

## Transaktion

### Transaktionsstatus abfragen

Sie können den Transaktionsstatus wie folgt abfragen:

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)

const txId = '919d4e4b1080d74beb56a1f78ea7c0569a358e3ea3988058987cc1addf4b93cc'
const txStatus = await nodeProvider.transactions.getTransactionsStatus({ txId })
```

Sie können den Transaktionsstatus anhand von `txStatus.type` unterscheiden:

1. `MemPooled`: Dies bedeutet, dass die Transaktion im Mempool ist
2. `Confirmed`: Die Transaktion wurde bestätigt, und sie können die Bestätigungen mit `txStatus.chainConfirmations` abrufen
3. `TxNotFound`:  Die Transaktion existiert nicht

## Hooks

Das Paket `@alephium/web3-react` stellt mehrere Hooks zur Verfügung, um die Entwicklung von Frontend-Benutzeroberflächen zu erleichtern.

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

Das `useWalletConfig`-Hook gibt die Konfigurationen des Verbindungsbuttons und Hilfsfunktionen zurück, um diese Konfigurationen zu aktualisieren.

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

Wenn der Rückgabewert `undefined` ist, deutet dies darauf hin, dass die Wallet nicht verbunden ist. Die zurückgegebene Wallet hat die folgenden Felder:

* `wallet.signer`: Sie können den Signer verwenden, um Transaktionen zu signieren.
* `wallet.account`: Dies ist das aktuell verbundene Konto.
* `wallet.nodeProvider`: Sie können den Node-Provider verwenden, um mit dem Full Node zu kommunizieren. Beachten sie, dass dieser Wert `undefined` sein kann.

### useBalance

```typescript
import { useBalance } from '@alephium/web3-react'

const { balance, updateBalanceForTx } = useBalance()
```

Das `useBalance`-Hook gibt zwei Werte zurück:

1. `balance`: Das aktuelle Guthaben des verbundenen Kontos.
2. `updateBalanceForTx`: Dies wird verwendet, um das Guthaben zu aktualisieren, wenn der Benutzer eine Transaktion durchführt. Es nimmt eine Transaktions-ID als Parameter entgegen und aktualisiert das Guthaben, sobald diese Transaktion bestätigt wurde.

### useTxStatus

```typescript
import { useState } from 'react'
import { useTxStatus } from '@alephium/web3-react'

const { txStatus } = useTxStatus(txId)
const confirmed = useMemo(() => {
  return txStatus?.type === 'Confirmed'
}, [txStatus])
```

Das `useTxStatus`-Hook akzeptiert auch einen optionalen Rückrufparameter vom Typ `(txStatus: node.TxStatus) => Promise<any>`. Dieser wird nach jeder Abfrage des Transaktionsstatus aufgerufen.

## Hilfsfunktionen

### Rate limit

Der `NodeProvider` wird verwendet, um beim Entwickeln einer dApp mit dem Full Node zu kommunizieren, und sie können die von Alephium öffentlich bereitgestellten  [API services](./public-services.md) verwenden. Aber alle APIs unterliegen einer Ratenbegrenzung, um Spam zu verhindern. Wenn der Client also in einer bestimmten Zeitspanne zu viele Anfragen sendet, erhält er den HTTP-429-Fehler.

Sie können [fetch-retry](https://github.com/jonbern/fetch-retry) verwenden, um dieses Problem zu lösen:

```typescript
import * as fetchRetry from 'fetch-retry'

// We specify up to 10 retries, with 1 second retry delay
const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider('node-url', undefined, retryFetch)
```

### Benutzerdefinierter Wallet-Verbindungsbutton

`@alephium/web3-react` bietet die `AlephiumConnectButton`-Komponente zur Erleichterung der Entwicklung von Benutzeroberflächen an. Sie können auch `AlephiumConnectButton.Custom` verwenden, um den Stil des Verbindungsbuttons anzupassen:

```typescript
import { AlephiumConnectButton } from '@alephium/web3'

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
