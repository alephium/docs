---
sidebar_position: 30
title: Dapp Tarifleri
sidebar_label: Dapp Tarifleri
---

## Sözleşme

### Sözleşme durumunu alın

Bir sözleşmeyi derlemek için `npx @alephium/cli compile` komutunu kullandığınızda, sözleşme koduna dayalı olarak TypeScript kodu üretecektir.
TokenFaucet sözleşmesini ([burada](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) bir örnek olarak alalım),
üretilen TypeScript koduna [buradan](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/TokenFaucet.ts) erişebiliriz.
Oluşturulan TypeScript kodunu kullanarak sözleşme durumunu alabiliriz:

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

### Sözleşme yöntemini çağırma

Üretilen TypeScript kodunu sözleşme yöntemlerini çağırmak için kullanabilirsiniz, bu Ethereum'daki `eth_call` ile benzerdir:

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

### Sözleşme etkinliklerine abone olma

TokenFaucet sözleşmesinde ([burada](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) bir örnek olarak),
[Withdraw](https://github.com/alephium/nextjs-template/blob/c846a675235198045cdf91ba0304aa287f2fc68d/contracts/token.ral#L18) adında bir etkinlik tanımladık.
`withdraw` işlevi çağrıldığında her zaman, sözleşme bir `Withdraw` etkinliği yayınlar.
Bu çekilme etkinliklerine şu yaklaşımı kullanarak abone olabiliriz:

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

### Simüle Edilmiş Blok Zamanıyla İşlevleri Test Etme

Blok zamanı simüle edilmiş işlevleri test etmek mümkündür. Testnet veya devnet'e dayalı entegrasyon testleri için blok zamanını değiştirme yolu yoktur.

İşte basit bir örnek:

```typescript
import { TokenFaucet } from 'artifacts/ts'

const result = await TokenFaucet.tests.withdraw({
  blockTimeStamp: 1706284941000, // the unit is millisecond
  address: ...,
  initialFields: ...,
  ...
})
```

### Hata Ayıklama İletilerini Kaydetme

Ralph, yerleşik `Debug` etkinliğini yayınlayarak hata ayıklama iletilerini destekler. Bu tür etkinlikler ana ağda görmezden gelinir.

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

## İşlem

### İşlem durumunu sorgulama

İşlem durumunu aşağıdaki yaklaşımı kullanarak sorgulayabilirsiniz:

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)

const txId = '919d4e4b1080d74beb56a1f78ea7c0569a358e3ea3988058987cc1addf4b93cc'
const txStatus = await nodeProvider.transactions.getTransactionsStatus({ txId })
```

`txStatus.type` kullanarak işlem durumunu ayırt edebilirsiniz:

1. `MemPooled`: bu, işlemin mempool'da olduğu anlamına gelir
2. `Confirmed`: işlem onaylandı ve `txStatus.chainConfirmations` kullanarak onayları alabilirsiniz
3. `TxNotFound`: işlem mevcut değil

## Hooks

`@alephium/web3-react` paketi, ön uç kullanıcı arayüzlerinin geliştirilmesini kolaylaştırmak için birkaç kancaya sahiptir.

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

`useWalletConfig` kancası, bağlantı düğmesi yapılandırmalarını ve bu yapılandırmaları güncellemek için yardımcı işlevleri döndürür.

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

Dönüş değeri `undefined` ise, cüzdanın bağlı olmadığını belirtir. Dönen cüzdanın aşağıdaki alanları vardır:

* `wallet.signer`: işlemleri imzalamak için işaretçiyi kullanabilirsiniz
* `wallet.account`: bu, şu anda bağlı olan hesaptır
* `wallet.nodeProvider`: tam düğümle iletişim kurmak için düğüm sağlayıcıyı kullanabilirsiniz, bu değer belirsiz olabilir

### useBalance

```typescript
import { useBalance } from '@alephium/web3-react'

const { balance, updateBalanceForTx } = useBalance()
```

`useBalance` kancası iki değer döndürür:

1. `balance`: bağlı hesabın mevcut bakiyesi
2. `updateBalanceForTx`: kullanıcı bir işlem yaptığında bakiyeyi güncellemek için kullanılır. Bir işlem kimliğini parametre olarak alır ve bu işlem onaylandığında bakiyeyi günceller.

### useTxStatus

```typescript
import { useState } from 'react'
import { useTxStatus } from '@alephium/web3-react'

const { txStatus } = useTxStatus(txId)
const confirmed = useMemo(() => {
  return txStatus?.type === 'Confirmed'
}, [txStatus])
```

`useTxStatus` kancası ayrıca isteğe bağlı bir geri çağrı parametresi kabul eder, türü `(txStatus: node.TxStatus) => Promise<any>`, bu her işlem durumu sorgusu sonrasında çağrılacaktır.

## Araçlar

### Hız sınırlaması

Bir dApp geliştirirken tam düğümle iletişim kurmak için `NodeProvider` kullanılır ve Alephium tarafından sağlanan [API hizmetleri](./public-services.md) kullanılabilir. Ancak, tüm API'lar spamı önlemek için hız sınırlamasına tabidir. Bu nedenle, istemcinin belirli bir süre içinde çok sayıda istek göndermesi durumunda, HTTP 429 hatası alacaktır.

Bu sorunu çözmek için [fetch-retry](https://github.com/jonbern/fetch-retry)'yi kullanabilirsiniz:

```typescript
import * as fetchRetry from 'fetch-retry'

// We specify up to 10 retries, with 1 second retry delay
const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider('node-url', undefined, retryFetch)
```

### Özel cüzdan bağlantı düğmesi

`@alephium/web3-react`, kullanıcı arayüzlerinin geliştirilmesini kolaylaştırmak için `AlephiumConnectButton` bileşenini sağlar, bağlantı düğmesinin stiline özelleştirmek için `AlephiumConnectButton.Custom`'ı da kullanabilirsiniz:

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
