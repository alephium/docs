---
sidebar_position: 40
title: Extension-Wallet für DApps
sidebar_label: Integration von DApps
---

Die Alephium Extension Wallet fügt ein globales Objekt 
`window.alephiumProviders.alephium` in die dApps ein, mit 
denen der Benutzer interagiert. DApps können dieses Objekt 
verwenden, um den Benutzer zu authentifizieren, Benutzerkonten 
anzufordern und mit der Alephium-Blockchain zu kommunizieren, 
um beispielsweise das Benutzerkonto abzurufen, den Vertragsstatus 
zu überprüfen und Transaktionen zu übermitteln.

### Grundlegende Einrichtung

Um das Objekt `window.alephiumProviders.alephium` zu erkennen, empfehlen wir die Verwendung des Pakets
[@alephium/get-extension-wallet](https://www.npmjs.com/package/@alephium/get-extension-wallet).
```
npm install --save @alephium/get-extension-wallet
```

Der folgende Code zeigt, wie man sich mit dem Erweiterungswallet über reinen TypeScript verbindet:

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

Benutzer werden aufgefordert, sich mit der aktuellen dApp zu verbinden, wenn die Methode
`windowAlephium?.enable()` aufgerufen wird.

<img src={require("./media/connect-dapp.png").default} alt="Connect dApp" width="250" />

Nachdem der Benutzer auf die Schaltfläche `Connect` geklickt hat, ist die dApp mit dem 
Extension Wallet des Benutzers verbunden.

### Web3 React

Für mit React erstellte dApps bietet 
[@alephium/web3-react](https://www.npmjs.com/package/@alephium/web3-react)
eine einfachere Möglichkeit zur Authentifizierung von dApps mit Wallets, 
einschließlich der Extension Wallet.

```
npm install --save @alephium/web3-react
```

Ein minimales Beispiel sieht wie folgt aus:

```typescript
const App = () => {
  return (
    <AlephiumWalletProvider useTheme="retro">
      /* Your App */
      <AlephiumConnectButton />
    </AlephiumWalletProvider>
  );
```

Dieser Code platziert eine Schaltfläche in Ihrer dApp mit dem integrierten `Retro`-Design. 
Nachdem der Benutzer auf die Schaltfläche geklickt hat, wird ein Popup-Fenster angezeigt, 
um den Benutzer zur Auswahl einer Wallet aufzufordern.

<img src={require("./media/connect-dapp-2.png").default} alt="Connect dApp Web3 React" />

Wenn der Benutzer die `Extension Wallet` auswählt, wird er erneut aufgefordert, sich mit der 
aktuellen dApp zu verbinden. Nachdem der Benutzer auf die Schaltfläche `Connect` geklickt 
hat, ist die dApp mit der Extension Wallet des Benutzers verbunden.

Bitte werfen Sie einen Blick auf das
[NextJS-Template](https://github.com/alephium/nextjs-template) Repository 
für ein funktionierendes und umfassenderes Beispiel.

### Transaktionen signieren

Das Objekt `windowAlephium` implementiert den
[InteractiveSignerProvider](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/signer/signer.ts#L80),
 der die folgenden Methoden für die Signatur von Transaktionen bereitstellt:

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

Wenn eine dieser Methoden ausgeführt wird, stellt das Erweiterungswallet die erforderlichen Informationen abhängig vom Typ der Transaktion bereit und fordert den Benutzer zur Signatur auf.

Hier ein Beispiel für eine Transaktion zum Übertragen von Token: Der Benutzer überträgt
 `2` `Token Faucet`-Token vom Konto `Gehalt` auf das Konto
`Sparen`.

<img src={require("./media/transaction-signing-transfer.png").default} alt="Transaction Signing Transfer" width="250" />

Nachdem der Benutzer auf die Schaltfläche `Sign` (Signieren) geklickt hat, wird die Transaktion von der 
Extension Wallet signiert und an die Alephium-Blockchain übermittelt.