---
sidebar_position: 40
title: Extension Wallet for dApps
sidebar_label: dApp integration
---

The Alephium extension wallet injects a global object
`window.alephiumProviders.alephium` into the web apps that the user
interacts with. dApps can use this object to authenticate the user,
request user accounts and communicate with the Alephium blockchain
such as signing and submitting transactions. To detect the
`window.alephiumProviders.alephium` object, we recommand to use the
[@alephium/get-extension-wallet](https://www.npmjs.com/package/@alephium/get-extension-wallet)
package.

### Basic Setup

```
npm install --save @alephium/get-extension-wallet
```

The following code shows how to connect to the extension wallet using
pure typescript:

```ts
import { getDefaultAlephiumWallet } from "@alephium/get-extension-wallet"

async function tryConnect() {
  // Returns the `window.alephiumProviders.alephium` object after user selects
  // the extension wallet.
  const windowAlephium = await getDefaultAlephiumWallet()
  // Authenticate user to the current dApp, return the selected account
  const selectedAccount = await windowAlephium?.enable()

  if (windowAlephium && selectedAccount) {
    // From here, you can execute various transactions:
    //
    // windowAlephium.signAndSubmitTransferTx(...)
    // windowAlephium.signAndSubmitDeployContractTx(...)
    // windowAlephium.signAndSubmitExecuteScriptTx(...)
    // ...
  }
}
```

Users will be prompted to connect to the current dApp when
`windowAlephium?.enable()` method is called:

<img src={require("./media/connect-dapp.png").default} alt="Connect dApp" width="250" />

After user clicks the `Connect` button, dApp is connected with users
extension wallet.

### Web3 React

For dApps built with react,
[@alephium/web3-react](https://www.npmjs.com/package/@alephium/web3-react)
offers an easier way to authenticate with dApps using wallets,
including extension wallet.

A minimal example is shown below:

```typescript
const App = () => {
  return (
    <AlephiumConnectProvider useTheme="retro">
      /* Your App */
      <AlephiumConnectButton />
    </AlephiumConnectProvider>
  );
```

This will place a button in your dApp with the `retro` built-in
theme. Once users click the button, a pop-up window will show up to
ask users to select wallets to connect:

<img src={require("./media/connect-dapp-2.png").default} alt="Connect dApp Web3 React" />

If user selects `Extension Wallet`, user will again be prompted to
connect to the current dApp. After user clicks the `Connect` button,
dApp is connected with users extension wallet.

### Sign Transactions

`windowAlephium` object implements the
[InteractiveSignerProvider](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/signer/signer.ts#L80),
which exposes the following methods for transaction signing:

```ts
abstract signAndSubmitTransferTx(params: SignTransferTxParams): Promise<SignTransferTxResult>
abstract signAndSubmitDeployContractTx(params: SignDeployContractTxParams): Promise<SignDeployContractTxResult>
abstract signAndSubmitExecuteScriptTx(params: SignExecuteScriptTxParams): Promise<SignExecuteScriptTxResult>
abstract signAndSubmitUnsignedTx(params: SignUnsignedTxParams): Promise<SignUnsignedTxResult>
abstract signUnsignedTx(params: SignUnsignedTxParams): Promise<SignUnsignedTxResult>
// The message will be prefixed with 'Alephium Signed Message: ' before signing
// so that the resulted signature cannot be reused for building transactions.
abstract signMessage(params: SignMessageParams): Promise<SignMessageResult>
```

When any of these method is executed, extension wallet will provide
neccessary information depending on the type of the transaction and
prompt user for signature. 

The following is an example of a transaction for token transfer: user
is transferring 2 `TokenFaucet` token from `Salary` account to
`Saving` account.

<img src={require("./media/transaction-signing-transfer.png").default} alt="Transaction Signing Transfer" width="250" />

After user clicks the `Sign` button, the transction will be signed and
submitted to the Alephium blockchain by the extension wallet.