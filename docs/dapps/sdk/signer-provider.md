---
sidebar_position: 30
title: SignerProvider
sidebar_label: SignerProvider
---

The `SignerProvider` is an abstraction of an Alephium account. It can be used to sign messages and transactions, as well as send signed transactions to the Alephium blockchain.

## Create SignerProvider

The SDK offers four types of signer providers, each designed for specific use cases. Below is a guide on how to create each type of `SignerProvider`.

### PrivateKeyWallet

You need to install `@alephium/web3-wallet` first:

```shell
npm install --save @alephium/web3-wallet
```

You can create a `SignerProvider` using a private key:

```typescript
import { NodeProvider } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { testPrivateKey } from '@alephium/web3-test'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
const wallet = new PrivateKeyWallet({ privateKey: testPrivateKey })
```

### Extension Wallet

You need to install `@alephium/get-extension-wallet` first:

```shell
npm install --save @alephium/get-extension-wallet
```

The `@alephium/get-extension-wallet` package helps to detect and interact with browser extension wallet:

```typescript
import { getDefaultAlephiumWallet } from '@alephium/get-extension-wallet'
const wallet = await getDefaultAlephiumWallet()
if (wallet !== undefined) {
  const account = await wallet.enable({
    networkId: 'mainnet', // the optional network id, it allows to connect to any network if it is undefined
    addressGroup: 0, // the optional address group, it allows to connect to any group if it is undefined
    onDisconnected: () => {} // the optional disconnect callback, it will be called when the wallet disconnects
  })
}

// disconnect
await wallet?.disconnect()
```

### WalletConnect

You need to install `@alephium/walletconnect-provider` first:

```shell
npm install --save @alephium/walletconnect-provider
```

The `@alephium/walletconnect-provider` package provides a bridge to connect dApps with wallets using the `WalletConnect` protocol:

```typescript
import QRCodeModal from '@alephium/walletconnect-qrcode-modal'
import { WalletConnectProvider } from '@alephium/walletconnect-provider'

const provider = await WalletConnectProvider.init({
  projectId: 'your-wallet-connect-project-id', // please refer to the WalletConnect documentation to create your project id
  networkId: 'mainnet', // the optional network id, it allows to connect to any network if it is undefined
  addressGroup: 0, // the optional address group, it allows to connect to any group if it is undefined
  onDisconnected: () => {} // the optional disconnect callback, it will be called when the wallet disconnects
})
provider.on('displayUri', QRCodeModal.open(uri, () => console.log('qr closed')))
await provider.connect()
const account = provider.account

// disconnect
await provider.disconnect()
```

For the convenience of dApp development, we offer `React` wrappers for extension wallet and `WalletConnect`. You can refer to the documentation [here](./web3-react.md) for more details.

### NodeWallet

You can follow this [guide](/wallet/node-wallet-guide) to create a full node wallet, and then use the full node wallet to sign and submit transactions:

```typescript
import { NodeProvider } from '@alephium/web3'
import { NodeWallet } from '@alephium/web3-wallet'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
const wallet = new NodeWallet('alephium-web3-test-only-wallet', nodeProvider)
// wallet must be unlocked before it can sign and send transactions
await wallet.unlock('alph')
```

:::note
Both `PrivateKeyWallet` and `NodeWallet` are used for contract development and deployment, please don't use them to store large amount of tokens.
:::

## Usage of SignerProvider

### Sign and Submit Transaction

When sending transactions, it's typical to perform the steps of building, signing, and submitting the transaction. The `SignerProvider` provides several `signAndSubmit` methods that combine these three steps into a single call to simplify the entire process.

* `signAndSubmitTransferTx`: build, sign, and submit transfer transactions
* `signAndSubmitDeployContractTx`: build, sign, and submit deploy contract transactions
* `signAndSubmitExecuteScriptTx`: build, sign, and submit execute script transactions

You can also first build unsigned transactions, and then sign and submit the transactions. You can refer to the documentation [here](./transaction.md#transaction-builder) for building transactions.

```typescript
import { NodeProvider, TransactionBuilder } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
const signer = new PrivateKeyWallet({ privateKey: testPrivateKey, nodeProvider })
const account = await signer.getSelectedAccount()
const buildTxResult = await TransactionBuilder(nodeProvider).buildTransferTx(...)
const result = await signer.signAndSubmitUnsignedTx({
  signerAddress: account.address,
  unsignedTx: buildTxResult.unsignedTx
})
const txId = result.txId
```

### Sign Messages

```typescript
const signer = new PrivateKeyWallet({ privateKey: testPrivateKey })
const account = await signer.getSelectedAccount()
const result = await signer.signMessage({
  signerAddress: account.address,
  message: 'The message that need to be signed',
  messageHasher: 'alephium', // message is prefixed with 'Alephium signed message: ' before hashed with blake2b
})
const signature = result.signature
```
