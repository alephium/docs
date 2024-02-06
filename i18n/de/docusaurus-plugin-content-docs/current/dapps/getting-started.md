---
sidebar_position: 5
title: Erste Schritte
sidebar_label: Erste Schritte
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Übersicht

Alephium stellt mehrere Tools und Pakete bereit, um Ihnen beim Erstellen Ihrer DApps zu helfen.

Dieser Leitfaden wird Ihnen helfen, unsere empfohlene Einrichtung zu installieren.

Voraussetzungen:

- Schreiben Sie Code in [Typescript](https://www.typescriptlang.org/)
- Arbeiten Sie in einem [Terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [NodeJS](https://nodejs.org/en/) Version >= 16 installiert
- `npm` Version >= 8 installiert

## Ein neues Projekt für eine neue DApp erstellen

Um das Tutorial-Projekt zu erstellen, öffnen Sie ein neues Terminal und führen Sie den folgenden Befehl aus:

```
npx @alephium/cli@latest init alephium-tutorial
```

Dies erstellt ein neues Verzeichnis mit dem Namen  `alephium-tutorial` und initialisiert darin ein Beispielsprojekt.

## Starten des lokalen Entwicklungsnetzwerks

Um Ihre Contracts zu kompilieren und zu testen, ist es erforderlich, ein lokales Entwicklungsnetzwerk zu starten. Sie können [diese Anleitung](/full-node/devnet) verwenden, um ein Devnet zu starten.

Ihr neues Netzwerk ist jetzt mit [dieser Konfiguration](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf) und den generierten Adressen in 4 Gruppen und ausreichend ALPHs für Testzwecke gestartet.

Durch REST-Endpunkte kann das TypeScript SDK dann mit dem Netzwerk interagieren.

## Kompilieren Sie ihren Smart Contract

Ändern Sie als nächstes den Arbeitsbereich zum Tutorial-Projekt:

```
cd alephium-tutorial
```

Werfen Sie einen Blick in den Ordner `contracts/` dort finden Sie `token.ral`:

```rust
import "std/fungible_token_interface"

// Definiert einen Vertrag namens `TokenFaucet`.
// Ein Vertrag ist eine Sammlung von Feldern (seinem Zustand) und Funktionen.
// Nach der Bereitstellung befindet sich ein Vertrag an einer bestimmten Adresse in der Alephium-Blockchain.
// Vertragsfelder werden dauerhaft im Vertragsspeicher gespeichert.
// Ein Vertrag kann bei seiner Bereitstellung eine anfängliche Menge an Token ausgeben.
Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {

    // Ereignisse ermöglichen das Protokollieren von Aktivitäten auf der Blockchain.
    // Alephium-Clients können Ereignissen lauschen, um auf Änderungen im Vertragszustand zu reagieren.
    event Withdraw(to: Address, amount: U256)

    enum ErrorCodes {
        InvalidWithdrawAmount = 0
    }

    // Eine öffentliche Funktion, die die anfängliche Versorgung mit Token des Vertrags zurückgibt.
    // Beachten Sie, dass das Feld als die Menge der ausgegebenen Token initialisiert werden muss.
    pub fn getTotalSupply() -> U256 {
        return supply
    }

    // Eine öffentliche Funktion, die das Symbol des Tokens zurückgibt.
    pub fn getSymbol() -> ByteVec {
        return symbol
    }

    // Eine öffentliche Funktion, die den Namen des Tokens zurückgibt.
    pub fn getName() -> ByteVec {
        return name
    }

    // Eine öffentliche Funktion, die die Dezimalstellen des Tokens zurückgibt.
    pub fn getDecimals() -> U256 {
        return decimals
    }

    // Eine öffentliche Funktion, die den aktuellen Kontostand des Vertrags zurückgibt.
    pub fn balance() -> U256 {
        return balance
    }

    // Eine öffentliche Funktion, die Token an jeden überträgt, der sie aufruft.
    // Die Funktion ist mit `updateFields = true annotiert`, da sie die Vertragsfelder ändert.
    // Die Funktion ist als Verwendung von Vertragsvermögenswerten annotiert.
    @using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn withdraw(amount: U256) -> () {
        // Debug-Ereignisse können bei der Fehleranalyse hilfreich sein.
        emit Debug(`The current balance is ${balance}`)

        // Stellen Sie sicher, dass der Betrag gültig ist.
        assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
        // Funktionen, die mit ! enden, sind integrierte Funktionen.
        transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
        // Ralph erlaubt keine Unterdeckung.
        balance = balance - amount

        // Lösen Sie das zuvor definierte Ereignis aus.
        emit Withdraw(callerAddress!(), amount)
    }
}
```

und `withdraw.ral` :

```rust
// Definiert ein Transaktionsskript.
// Ein Transaktionsskript ist ein Code-Stück, um mit Verträgen auf der Blockchain zu interagieren.
// Transaktionsskripte können im Allgemeinen die Eingangsvermögenswerte von Transaktionen verwenden.
// Ein Skript ist verbrauchbar und wird nur einmal zusammen mit der Transaktion des Inhabers ausgeführt.
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    // Rufen Sie die Abhebungsfunktion des Token-Vertrags auf.
    token.withdraw(amount)
}
```

 Um Ihre Verträge zu kompilieren, führen Sie den folgenden Befehl aus:

```
npx @alephium/cli@latest compile
```

Die kompilierten Artefakte befinden sich nun im Verzeichnis `artifacts`.

Dieser Befehl generiert auch TypeScript-Code basierend auf den kompilierten Artefakten. Der generierte TypeScript-Code befindet sich im Verzeichnis  `artifacts/ts`. Sie können mit dem generierten TypeScript-Code einfacher mit der Alephium-Blockchain interagieren.

## Testen Sie ihren Smart Contract

Das Beispielprojekt wird mit Tests `test/unit/token.test.ts` für Ihren Smart Contract geliefert:

```typescript
import { web3, Project, TestContractParams, addressFromContractId, AssetOutput, DUST_AMOUNT } from '@alephium/web3'
import { expectAssertionError, randomContractId, testAddress, testNodeWallet } from '@alephium/web3-test'
import { deployToDevnet } from '@alephium/cli'
import { TokenFaucet, TokenFaucetTypes, Withdraw } from '../artifacts/ts'

describe('unit tests', () => {
  let testContractId: string
  let testTokenId: string
  let testContractAddress: string
  let testParamsFixture: TestContractParams<TokenFaucetTypes.Fields, { amount: bigint }>

  // Wir initialisieren die Fixture-Variablen vor allen Tests
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()
    testContractId = randomContractId()
    testTokenId = testContractId
    testContractAddress = addressFromContractId(testContractId)
    testParamsFixture = {
      // Eine zufällige Adresse, an der der Testvertrag in den Tests vorhanden ist.
      address: testContractAddress,
      // Vermögenswerte, die dem Testvertrag vor einem Test gehören.
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testTokenId, amount: 10n }] },
      // Anfangszustand des Testvertrags.
      initialFields: {
        symbol: Buffer.from('TF', 'utf8').toString('hex'),
        name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 10n ** 18n,
        balance: 10n
      },
      // Argumente zum Testen der Ziel-Funktion des Testvertrags.
      testArgs: { amount: 1n },
      // assets owned by the caller of the function
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }
  })
  // Weitere Tests finden Sie in `test/unit/token.test.ts`
})
```

Sie können die Tests ausführen mit:

```
npm run test
```

oder

```
npx @alephium/cli@latest test
```

## Ihren Smart Contract bereitstellen

Als nächstes verwenden wir das Alephium CLI und ein Bereitstellungsskript `scripts/0_deploy_faucet.ts`:

```typescript
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenFaucet } from '../artifacts/ts'

// Diese Bereitstellungsfunktion wird automatisch vom CLI-Bereitstellungstool aufgerufen.
// Beachten Sie, dass Bereitstellungsskripte mit Zahlen (beginnend ab 0) vorangestellt sein sollten.
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Einstellungen abrufen
  const issueTokenAmount = network.settings.issueTokenAmount
  const result = await deployer.deployContract(TokenFaucet, {
    // Die Menge der auszugebenden Token
    issueTokenAmount: issueTokenAmount,
    // Die Anfangszustände des Faucet-Vertrags
    initialFields: {
      symbol: Buffer.from('TF', 'utf8').toString('hex'),
      name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token faucet contract id: ' + result.contractInstance.contractId)
  console.log('Token faucet contract address: ' + result.contractInstance.address)
}

export default deployFaucet
```

Führen Sie die Bereitstellung aus mit:

```
npx @alephium/cli@latest deploy
```

Dies wird den Token-Faucet in Gruppe 0 des Devnet bereitstellen. Um den Smart Contract auf dem Testnet (oder einem anderen Netzwerk) bereitzustellen, aktualisieren Sie Ihre  `alephium.config.ts` und verwenden Sie anschließend folgende Option `--network`:

```
npx @alephium/cli@latest deploy --network testnet
```

## Mit dem bereitgestellten Smart Contract interagieren

Nun können Sie den Quellcode `src/token.ts` mit folgendem Inhalt erstellen:

```typescript
import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, Project } from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')
  // Kompilieren Sie die Verträge des Projekts, wenn sie nicht kompiliert sind.
  Project.build()

  // Achtung: Test-Wallet wird zu Demonstrationszwecken verwendet.
  const signer = await testNodeWallet()

  const deployments = await Deployments.load(configuration, 'devnet')

  // Die Test-Wallet hat vier Konten, eins in jeder Adressengruppe.
  // Die Brieftasche ruft die Abhebungsfunktion für alle Adressengruppen auf.
  for (const account of await signer.getAccounts()) {
    // Setzen Sie ein aktives Konto, um Transaktionen vorzubereiten und zu signieren.
    await signer.setSelectedAccount(account.address)
    const accountGroup = account.group

    // Laden Sie die Metadaten des bereitgestellten Vertrags in der richtigen Gruppe.
    const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')
    if (deployed === undefined) {
      console.log(`The contract is not deployed on group ${account.group}`)
      continue
    }
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Übermitteln Sie eine Transaktion, um das Transaktionsskript zu verwenden.
    await Withdraw.execute(signer, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
    })

    const faucet = TokenFaucet.at(tokenAddress)
    // Holen Sie sich den neuesten Stand des Token-Vertrags.
    const state = await faucet.fetchState()
    console.log(JSON.stringify(state.fields, null, '  '))
  }
}

withdraw()

```

Führen Sie einfach folgendes aus:


```
npm run build
```

und interagieren Sie mit dem bereitgestellten Token-Faucet.

```
node dist/src/token.js
```

## Verbindung zu den Wallets

DApps erfordern eine Wallet-Integration für Benutzer der DApp, um sich zu authentifizieren und mit der Alephium-Blockchain zu interagieren, z. B. das Signieren von Transaktionen. Derzeit können DApps sowohl mit der [Extension Wallet](../wallet/extension-wallet/dapp)
als auch mit [WalletConnect](../wallet/walletconnect) integriert werden. Bitte beachten Sie die jeweiligen Seiten für weitere Details.

## Weitere Informationen

- Um mehr über das Ökosystem zu erfahren, besuchen Sie bitte die [Übersicht des Ökosystems](/dapps/ecosystem).
- Um mehr über das Web3 SDK zu erfahren, besuchen Sie bitte die [Anleitung zum Web3 SDK](/dapps/alephium-web3).
- Um mehr über die Ralph-Sprache zu erfahren, besuchen Sie bitte die [Anleitung zu Ralph](/ralph/getting-started).
- Um zu lernen, wie man eine Nextjs DApp erstellt, besuchen Sie bitte [Erstellen Sie eine DApp mit Nextjs](/dapps/build-dapp-with-nextjs.md)
