---
sidebar_position: 10
title: Eine DApp mit Next.js erstellen
sidebar_label: Eine DApp mit Next.js erstellen
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Dies ist eine Fortsetzung des [Einstiegs](/dapps/getting-started.md)-Leitfadens. Am Ende dieses Leitfadens sollten Sie in der Lage sein, eine einfache 
[Nextjs](https://nextjs.org/)-DApp zu erstellen, die mit den im [Einstiegs](/dapps/getting-started.md)-Leitfaden behandelten Smart Contracts des Token-Faucet interagiert.

Voraussetzungen:

- Grundlegendes Verständnis von [Typescript](https://www.typescriptlang.org/)
  und [Nextjs](https://nextjs.org/)
- [npm](https://www.npmjs.com/) und
  [npx](https://www.npmjs.com/package/npx) auf Ihrem Rechner installiert
- Vertrautheit mit dem Tutorial-Projekt des Token Faucet im [Einstiegs](/dapps/getting-started.md)-Leitfaden.
- Installation der [Extension Wallet](/wallet/extension-wallet/overview)
- Installation von Docker und Docker-Compose

## Erstellen Sie ein DApp-Projekt mit dem Nextjs-Template

```sh
npx @alephium/cli@latest init alephium-nextjs-tutorial --template nextjs
```

Dies erstellt ein neues Verzeichnis `alephium-nextjs-tutorial` und
initialisiert ein Beispielprojekt mit NextJS in diesem Verzeichnis.


## Starten Sie ein lokales Entwicklungssnetzwerk

Wechseln Sie in das Verzeichnis `alephium-nextjs-tutorial/docker` und führen Sie folgendes aus:

```sh
cd alephium-nextjs-tutorial/docker
docker-compose up -d
```

Dies startet sowohl den Alephium Full Node als auch das [Explorer-Backend ](https://github.com/alephium/explorer-backend) im
`devnet`. Das Explorer-Backend wird für die Funktion der Extension Wallet benötigt.

Jetzt können Sie Ihre Token-Faucet-Contracts [kompilieren](/dapps/getting-started.md/#kompilieren-sie-ihren-contract),
[testen](/dapps/getting-started/#testen-sie-ihren-contract) und
[bereitstellen](/dapps/getting-started/#ihren-contract-bereitstellen)
 genau wie im [Einstiegs](/dapps/getting-started.md)-Leitfaden beschrieben.

Stellen Sie sicher, dass der Smart Contract bereitgestellt ist, bevor Sie mit dem nächsten Schritt fortfahren.

```sh
npx @alephium/cli@latest deploy
```

## Interagieren Sie mit dem Token-Faucet über die Nextjs-DApp

Gehen Sie zum Stammverzeichnis des Projekts und führen Sie folgendes aus:

```sh
npm install
npm run dev
```

Öffnen Sie nun [http://localhost:3000](http://localhost:3000) mit Ihrem Browser, um die Token-Faucet-Anwendung zu sehen.

<img src={require("./media/nextjs-template-connect.png").default}
alt="Connect button" width="300"/>

Wie oben dargestellt, zeigt die Token-Faucet-DApp einen `Connect Alephium`
Button, bevor sie mit einer Wallet verbunden ist. Klicken Sie auf die Schaltfläche und wählen Sie die Option `Extension Wallet` , um die Extension Wallet zu öffnen. `WalletConnect` wird bald unterstützt.

<img src={require("./media/nextjs-template-open-connect.png").default} alt="Landing page" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/nextjs-template-connect-click-extensonwallet.png").default} alt="Create wallet" width="250" />

Überprüfen Sie den Zustimmungsbildschirm der Extension Wallet und klicken Sie auf
`Connect`. Die Token-Faucet-DApp wird mit der Extension Wallet verbunden.

<img src={require("./media/nextjs-template-connected.png").default} alt="Landing page" width="520"/>

Geben Sie die Anzahl der abzuhebenden Token ein (maximal 2) und klicken Sie auf die Schaltfläche `Send Me Token`. Überprüfen Sie die Transaktionsdetails und klicken Sie auf `Confirm`.

<img src={require("./media/nextjs-template-send-token.png").default} alt="Landing page" width="520"/>

Herzlichen Glückwunsch, Sie haben gerade einige Token von dem Token-Faucet auf Ihr Konto übertragen!

## Implementierung

Das Ziel des [ Nextjs-Vorlagen](https://github.com/alephium/nextjs-template)-Projekts besteht darin zu zeigen, wie mit der Alephium-Blockchain von einer NextJS-Anwendung aus interagiert werden kann.

Die Authentifizierung kann in wenigen Zeilen mithilfe des 
[@alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react) Komponenten erfolgen:

```tsx
<AlephiumWalletProvider>
  <AlephiumConnectButton />
  // Your logic
</AlephiumWalletProvider>
```

`<AlephiumWalletProvider>` erstellt ein React
[Kontext](https://reactjs.org/docs/context.html)-Objekt und gibt es durch den Komponentenbaum der Anwendung weiter. Der Kontext enthält den
[SignerProvider](https://github.com/alephium/alephium-web3/blob/8cf20fee4c16091cf581518e9f411e31ec37955e/packages/web3-react/src/contexts/alephiumConnect.tsx#L56), der eine wesentliche Informationsquelle ist, um mit der Alephium-Blockchain zu interagieren, wie z.B. das Signieren von Transaktionen, usw.

Nachdem der Benutzer mit der Wallet verbunden ist, können wir mit der Alephium-Blockchain interagieren, indem wir eine Reihe von React-Hooks verwenden, die von [@alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react) bereitgestellt werden. Zum Beispiel können wir Informationen wie die [aktuelle verbundene Wallet](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useWallet.tsx), das [Guthaben](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useBalance.tsx)
und den [Transaktionsstatus](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useTxStatus.tsx) abrufen.

Wenn ein Benutzer eine Transaktion durchführt, können Sie das Guthaben des Benutzers mit `updateBalanceForTx` aktualisieren.
Hier ist ein einfaches Beispiel:

```typescript
// The useBalance hook returns two values:
// 1. balance: the current balance
// 2. updateBalanceForTx: used to update the balance when the user makes a transaction.
const { balance, updateBalanceForTx } = useBalance()

const withdrawCallback = useCallback(async () => {
  const result = await withdraw(...)
  updateBalanceForTx(result.txId)
}, [updateBalanceForTx])
```

Für weitere Implementierungsdetails werfen Sie bitte einen Blick auf den [Code](https://github.com/alephium/nextjs-template). 

## Erfahren Sie mehr

- Das NextJS-Template ist auf dem Testnetz bereitgestellt und verfügbar unter [https://alephium.github.io/nextjs-template](https://alephium.github.io/nextjs-template/)
- Um mehr über das Ökosystem zu erfahren, besuchen Sie bitte die [Übersicht des Ökosystems](/DApps/ecosystem).
- Um mehr über das Web3 SDK zu erfahren, besuchen Sie bitte die [Anleitung des Web3 SDK](/DApps/alephium-web3).
- Um mehr über die Ralph-Sprache zu erfahren, besuchen Sie bitte die [Anleitung von Ralph](/ralph/getting-started).
