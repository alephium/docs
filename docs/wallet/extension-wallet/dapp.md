---
sidebar_position: 20
title: Extension Wallet for dApps
sidebar_label: dApp integration
---

Extension wallet can be used in a web browser to interact with the Alephium blockchain.
It enables dApps to interact with user wallets securely right in the browser.

### Installation

### User Guide

### dApp

The Alephium extension wallet injects a global object `window.alephium` into the websites
that the user interacts with. dApps can use this object to authenticate the user, request
user accounts and communicate with the Alephium blockchain such as signing and submitting
various transactions. To detect the `window.alephium` object, we recommand to use the
[@alephium/get-extension-wallet](https://www.npmjs.com/package/@alephium/get-extension-wallet)
package.

#### 1. Basic Setup

```
npm install --save @alephium/get-extension-wallet
```

The following code shows how to connect to the extension wallet, get accounts as well as
listen to events to detect account and network updates:

```ts
import { connect } from "@alephium/get-extension-wallet"

async function tryConnect() {
  // Show the available extension wallets for users to select. Returns the
  // `window.alephium` object after user selects the extension wallet.
  const windowAlephium = await connect({ showList: false })

  if (windowAlephium) {
    // Authenticate user to the current dApp
    await windowAlephium.enable()
    
    // Get all the available accounts in the extension wallet
    const accounts = await windowAlephium.getAccounts()
    
    // Get the selected account in the extension wallet
    const selectedAccount = windowAlephium.selectedAccount

    // Listen to the event where anther account is selected
    windowAlephium.on("addressesChanged", (address) => { 
      assert(address === windowAlephium.selectedAccount.address)
      console.log(`Address ${address} is selected`)
    })

    // Listen to the event where network is changed. e.g. from `testnet` to `mainnet`
    windowAlephium.on("networkChanged", (network) => { 
      console.log(`Network ${network} is selected`)
    })
  }
}
```

User will be prompted to connect to the current web page when `windowAlephium.enable()` method is called:
<img src={require("./media/connect-dapp.png").default} alt="Connect dApp" width="300" />

After user clicks the `Connect` button, the extension wallet will be returned all the available accounts
to the dApp.

#### 2. Sign Transactions

`windowAlephium` object [implements](https://github.com/alephium/extension-wallet/blob/4f29c8f10843b737cda87ddc689b71c298a42e57/packages/get-extension-wallet/src/types.ts#L138)
the [SignerProvider](https://github.com/alephium/alephium-web3/blob/ad4401d9ef87eced37d03762324297aeba07e03d/packages/web3/src/signer/signer.ts#L154), which exposes the following
interfaces:

```ts
export interface SignerProvider {
  // Get all the available accounts from the wallet
  getAccounts(): Promise<Account[]>

  // Sign and optionally submit the transaction that transfers assets
  signTransferTx(params: SignTransferTxParams): Promise<SignTransferTxResult>

  // Sign and optionally submit the transaction that deploys a contract
  signDeployContractTx(params: SignDeployContractTxParams): Promise<SignDeployContractTxResult>

  // Sign and optionally submit the transaction that executes a transaction script
  signExecuteScriptTx(params: SignExecuteScriptTxParams): Promise<SignExecuteScriptTxResult>

  // Sign an unsigned transaction
  signUnsignedTx(params: SignUnsignedTxParams): Promise<SignUnsignedTxResult>

  // Sign a hex string
  signHexString(params: SignHexStringParams): Promise<SignHexStringResult>

  // Sign a message
  signMessage(params: SignMessageParams): Promise<SignMessageResult>
}
```

For example, together with the [@alephium/web3](https://www.npmjs.com/package/@alephium/web3) package, here is
how we can execute a transaction script called `HelloWorld` using the `windowAlephium` object created from the
previous section.

```ts
TxScript HelloWorld() {
  emit Debug(`Hello World`)
}
```

Please refer to the [Getting Started](../dapps/getting-started#compiling-your-contracts) page
for more details about how to compile smart contracts into artifacts that can be used in your
dApp. In this case, we assume that the compiled artifact for `HelloWorld` is located at
`../artifacts/hello_world.ral.json`

```ts
import { Script } from "@alephium/web3"
import helloWorldArtifact from '../artifacts/hello_world.ral.json'

async function callScript() {
  // Load the transaction script
  const helloWorld = Script.fromJson(helloWorldArtifact)
  
  // Constract the execution parameters 
  const deployParams = helloWorld.paramsForDeployment({
    signerAddress: windowAlephium.selectedAccount.address,
  })
  
  // Sign and execute the script, return the result
  return await windowAlephium.signExecuteScriptTx(deployParams)
}
```

That is it! When signature is needed, user will be prompted to approve the transaction as follows:

<img src={require("./media/execute-txscript.png").default} alt="Execute Transction Script" width="300" />


After user clicks the `Approve` button, the transction will be signed and submitted to the Alephium blockchain
by the extension wallet. Other methods can be executed in a similiar way.