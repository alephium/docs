---
sidebar_position: 60
title: WalletConnect
sidebar_label: WalletConnect
---

WalletConnect is a protocol that enables dApps to connect with various wallets. This document describes how to integrate WalletConnect into your dApp and wallet within the Alephium ecosystem.

## Integrate WalletConnect into dApp

### Establishing a Connection

In WalletConnect, a dApp sends messages to the wallet via the WalletConnect protocol and receives responses from the wallet. Therefore, the first step is to establish a WalletConnect connection.

To make it easier for dApps to integrate WalletConnect, `@alephium/walletconnect-provider` significantly simplifies the process of establishing and managing the connection. You can initialize the `WalletConnectProvider` and connect to the wallet as follows:

```typescript
import QRCodeModal from '@alephium/walletconnect-qrcode-modal'
import { WalletConnectProvider } from '@alephium/walletconnect-provider'

const provider = await WalletConnectProvider.init({
  projectId: 'walletconnect-project-id',
  metadata: {
    name: 'dapp-name',
    description: 'dapp-description',
    url: 'dapp-url'
  },
  networkId: 'mainnet',
  addressGroup: 0,
  onDisconnected: () => {}
})
provider.on('displayUri', QRCodeModal.open(uri, () => console.log('qr closed')))
await provider.connect()
```

The `init` method takes the following parameters:

* `projectId`: the WalletConnect project id, you can get one from [WalletConnect Cloud](https://cloud.walletconnect.com/)
* `metadata`: your dapp metadata
* `networkId`: the optional network id, it allows to connect to any network if it is `undefined`
* `addressGroup`: the optional address group, it allows to connect to any group if it is `undefined`
* `onDisconnected`: the optional disconnect callback, it will be called when the wallet disconnects

Once the connection is established, you can use the `WalletConnectProvider` to send requests to the wallet. `WalletConnectProvider` is a subclass of `SignerProvider`, and you can check the supported request methods of `SignerProvider` [here](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/signer/signer.ts#L68-L77).

### Connecting via Deep Link

The code above will display a QR code modal, and you can scan the QR code with the wallet to complete the connection. However, sometimes it's more convenient to directly redirect to the wallet app for connection confirmation. You can achieve this using a deep link:

```typescript
provider.on('displayUri', () => window.open('deep-link-url'))
await provider.connect()
```

### Disconnecting

You can call the `disconnect` method to disconnect from the dApp:

```typescript
await provider.disconnect()
```

For WalletConnect connections, the dApp also needs to handle disconnection requests initiated by the wallet:

```typescript
provider.on('session_delete', () => { /* disconnect handler */ })
```

### Auto Reconnect

WalletConnect stores connection information in local storage, allowing you to reuse previous connections when the page is refreshed. You can call the `isPreauthorized` method to check if the previous connection can be reused:

```typescript
if (provider.isPreauthorized()) {
  await provider.connect()
}
```

## Integrate WalletConnect into Wallet

### Approving Connection

Initiate the WalletConnect client:

```typescript
import SignClient from '@walletconnect/sign-client'

const signClient = await SignClient.init({
  projectId: 'walletconnect-project-id',
  metadata: {
    name: 'wallet-name',
    description: 'wallet description',
    url: 'wallet-url'
  }
})
```

Accept a connection uri passed from a dApp when a user scans the dApp's WalletConnect QR code modal:

```typescript
const onConnect = async (uri: string) => {
  await signClient.core.pairing.pair({ uri })
}
```

Handle the `session_proposal` event on the `SignClient`. This event is triggered when the `pair` method is called to create a pairing session:

```typescript
import { SignClientTypes } from '@walletconnect/types';
import { formatChain, parseChain, PROVIDER_NAMESPACE } from '@alephium/walletconnect-provider'

signClient.on('session_proposal', onSessionProposal)

const onSessionProposal = async (proposalEvent: SignClientTypes.EventArguments['session_proposal']) => {
  const requiredNamespace = proposalEvent.params.requiredNamespaces[PROVIDER_NAMESPACE]
  const requiredChains = requiredNamespace ? requiredNamespace.chains : undefined
  const requiredChainInfo = requiredChains ? parseChain(requiredChains[0]) : undefined

  // the wallet should verify that the proposal includes the required namespaces
  if (!requiredChains || requiredChains.length !== 1 || !requiredChainInfo) {
    throw new Error('Invalid WalletConnect proposal')
  }

  const chain = formatChain(requiredChainInfo.networkId, requiredChainInfo.addressGroup)
  const signerPublicKey = selectAccount(requiredChainInfo).publicKey

  // the wallet should send an approval response containing the approved accounts within the alephium namespace
  const namespaces: SessionTypes.Namespaces = {
    alephium: {
      methods: requiredNamespace.methods,
      events: requiredNamespace.events,
      accounts: [`${chain}:${signerPublicKey}/default`]
    }
  }

  const { acknowledged } = await signClient.approve({
    id: proposalEvent.id,
    relayProtocol: proposalEvent.params.relays[0].protocol,
    namespaces
  })
  await acknowledged()
}
```

When the user rejects a session proposal, the wallet should call `reject` to send the reject response:

```typescript
import { getSdkError } from '@walletconnect/utils';

const rejectProposal = async (proposalEventId: number) => {
  await signClient.reject({ id: proposalEventId, reason: getSdkError('USER_REJECTED') })
}
```

### Handling Requests from dApp

The dApp sends a request when it needs the wallet to perform an action, such as signing a transaction. Different request types are distinguished by the request method. You can view the request types that the Alephium wallet needs to implement [here](https://github.com/alephium/alephium-web3/blob/c77c3f391f77a0d93ced1670f994c4ac260c0b60/packages/walletconnect/src/constants.ts#L23). Here is an example of implementing the `alph_signAndSubmitTransferTx` request:

```typescript
import { SignTransferTxParams, TransactionBuilder } from '@alephium/web3'

signClient.on('session_request', onSessionRequest)

const onSessionRequest = async (event: SignClientTypes.EventArguments['session_request']) => {
  const request = event.params.request
  switch (request.method) {
    case 'alph_signAndSubmitTransferTx':
      const params = request.params as SignTransferTxParams
      const signer = getSignerByAddress(params.signerAddress)
      const result = await TransactionBuilder.from(nodeProvider).buildTransferTx(params, signer.publicKey)
      const signature = signer.sign(result.txId)
      await nodeProvider.transactions.postTransactionsSubmit({ unsignedTx: result.unsignedTx, signature })
  }
}
```

You can refer to the code [here](https://github.com/alephium/alephium-frontend/blob/1de048a91b4b85261cf67c54c9c19be0b15188fc/apps/desktop-wallet/src/features/walletConnect/WalletConnectSessionRequestEventHandler.tsx#L98) for the implementation of other requests.

### Managing Multiple dApp Sessions

WalletConnect allows a wallet to manage multiple sessions with various dApps. This is useful for users who interact with several dApps simultaneously and want to manage different sessions within a single wallet. The wallet should update the sessions after the proposal is approved:

```typescript
const { topic, acknowledged } = await signClient.approve(...)
await acknowledged()
const dAppUrl = proposalEvent.params.proposer.metadata.url
updateSessions(dAppUrl, topic)
```

You can refer to the code [here](https://github.com/alephium/alephium-frontend/blob/1de048a91b4b85261cf67c54c9c19be0b15188fc/apps/desktop-wallet/src/features/walletConnect/WalletConnectSessionProposalModal.tsx#L201) for more information.

### Disconnecting

You can call the `disconnect` method to disconnect from the wallet:

```typescript
await signClient.disconnect({ topic })
```

The wallet also needs to handle disconnection requests initiated by the dApp:

```typescript
signClient.on('session_delete', () => { /* disconnect handler */ })
```
