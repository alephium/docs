---
sidebar_position: 15
title: DApp von Grund auf erstellen
sidebar_label: DApp von Grund auf erstellen
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

In diesem Leitfaden werden wir die Grundlagen für die Erstellung eines Alephium DApp-Projekts erkunden.

Voraussetzungen:

- Code schreiben in [Typescript](https://www.typescriptlang.org/)
- Arbeiten in einem [Terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [NodeJS](https://nodejs.org/en/) Version >= 16 installiert
- `npm` Version >= 8 installiert

## Erstellen Sie ein neues DApp-Projekt: Token Faucet

In diesem Tutorial werden wir unsere erste DApp schreiben: einen Token-Faucet (Token-Wasserhahn).

Der Code hier stammt von unserer [Einführungsseite](/dapps/getting-started), aber wir werden Schritt für Schritt durchgehen, wie wir diesen anhand des Leitfadens erstellen.

Erstellen Sie einen neuen Projektordner und wechseln Sie in diesen:

```sh
mkdir alephium-faucet-tuto
cd alephium-faucet-tuto
```

Erstellen Sie nun einen Ordner `contracts`, in dem wir alle unsere Verträge speichern werden:

```sh
mkdir contracts
```

Unser erster Smart Contract wird `token.ral` sein, den Sie [hier](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) finden können. Sie können die gesamte Datei in Ihren `contracts`-Ordner kopieren.

Lassen Sie uns das ganze Stück für Stück untersuchen:

```rust
import "std/fungible_token_interface"

Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {
```

Die ersten vier Felder werden unveränderliche Werte sein, welche die für unser [IFungibleToken Interface](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral) erforderlichen Daten speichern.
`mut balance` ist ein veränderlicher Wert, der verfolgt, wie viele Token sich noch in diesem Faucet befinden.

Sie können sehen, dass unser Smart Contract ein `Event` emittiert und einen `Error`-Code definiert. Lesen Sie folgendes für weitere Informationen zu [Ereignissen](https://wiki.alephium.org/ralph/getting-started#events) und [Fehlerbehandlung](https://wiki.alephium.org/ralph/getting-started#error-handling).

Dies wird von fünf Zugriffsmethoden für die verschiedenen Argumente des Smart Contracts begleitet.

Die letzte Methode ist der Ort, wo die Magie geschieht:

```rust
@using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
pub fn withdraw(amount: U256) -> () {
    // Debug-Ereignisse können bei der Fehleranalyse hilfreich sein.
    emit Debug(`The current balance is ${balance}`)

    // Stellen Sie sicher, dass der Betrag gültig ist.
    assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
    // Funktionen, die mit ! enden, sind integrierte Funktionen.
    transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
    // Ralph erlaubt keine Unterdeckung (underflow).
    balance = balance - amount

    // Emitiere das zuvor definierte Ereignis.
    emit Withdraw(callerAddress!(), amount)
}
```

Mit `assert!` stellen wir sicher, dass niemand mehr als zwei Token gleichzeitig entnehmen kann.  
`transferTokenFromSelf` wird den tatsächlichen Transfer der Token durchführen.
Wir aktualisieren das `mut balance`-Feld mit dem neue erstellten Guthaben. Im Falle eines Unterlaufs wird ein Fehler ausgelöst, und die Transaktion wird nicht durchgeführt.
`callerAddress!()` und `selfTokenId!()` sind integrierte Funktionen (build-in Functions). Mehr dazu finden Sie auf unserer Seite zu [Build-In Functions](/ralph/built-in-functions).

## Kompilieren Sie Ihren Smart Contract

Der Compiler muss den Full Node kontaktieren, um den Smart Contract zu kompilieren. Sie müssen die richtigen Informationen verwenden, die beim [erstellen Ihres Devnets ](/full-node/devnet)definiert wurden. Wenn Sie es noch nicht gestartet haben, dann ist jetzt der richtige Zeitpunkt dafür. Wir definieren die Node-URL mit der folgenden Konfigurationsdatei: `alephium.config.ts`. Erstellen Sie diese Datei im Stammverzeichnis Ihres Projekts und fügen Sie folgenden Code ein:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      // Stellen Sie sicher, dass die beiden Werte mit dem in Ihrer DevNet-Konfiguration übereinstimmen.
      nodeUrl: 'http://localhost:22973',
      networkId: 2
    }
  }
}

export default configuration
```

Nun, lassen Sie uns kompilieren:

```sh
npx @alephium/cli@latest compile
```

Sie werden gebeten das neueste Paket `@alephium/cli` zu installieren. Bestätigen Sie dies mit Ja, um fortzufahren.

Sobald der oben genannte Befehl erfolgreich ausgeführt wurde, werden Sie feststellen, dass ein neuer Ordner mit der Bezeichnung `artifacts` erstellt wurde. Dieser enthält mehrere Dateien, die sich auf Ihren Smart Contract beziehen. Beispielsweise generiert `artifacts/ts/TokenFaucet.ts` einige Hilfsfunktionen wie `at`, `fetchState`, `call*`, usw., sowie auch zusätzliche Testfunktionen.

## Testen Sie Ihren Smart Contract
Das SDK bietet Funktionen für Unittests, die den Smart Contract aufrufen, indem Sie eine Transaktion senden. Anstatt den Blockchain-Zustand zu ändern, gibt es den neuen Vertragszustand, Transaktionsausgaben und Ereignisse zurück.

Installieren Sie das Testframework:

```sh
npm install ts-jest @types/jest
```

Sie benötigen auch unser `@alephium/web3` Paket:

```sh
npm install @alephium/web3 @alephium/web3-test
```

Erstellen Sie einen `Test`-Ordner:

```sh
mkdir test
```

und erstellen Sie eine minimale Testdatei `test/token.test.ts` mit folgendem Inhalt:

```typescript
import { web3, Project, addressFromContractId } from '@alephium/web3'
import { randomContractId, testAddress } from '@alephium/web3-test'
import { TokenFaucet } from '../artifacts/ts'

describe('unit tests', () => {
  it('Withdraws 1 token from TokenFaucet', async () => {

    // Verwenden Sie den richtigen Host und Port.
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()

    const testContractId = randomContractId()
    const testParams = {
      // Eine zufällige Adresse, an der der Testvertrag in den Tests vorhanden ist.
      address: addressFromContractId(testContractId),
      // Vermögenswerte, die dem Testvertrag vor einem Test gehören.
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testContractId, amount: 10n }] },
      // Anfangszustand des Testvertrags.
      initialFields: {
        symbol: Buffer.from('TF', 'utf8').toString('hex'),
        name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 10n ** 18n,
        balance: 10n
      },
      // Argumente, um die Ziel-Funktion des Testvertrags zu testen.
      testArgs: { amount: 1n },
      // Vermögenswerte, die dem Aufrufer der Funktion gehören.
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }

    const testResult = await TokenFaucet.tests.withdraw(testParams)
    console.log(testResult)
  })
})
```

Ein komplexerer Test ist in unserem [Template](https://github.com/alephium/nextjs-template/blob/main/test/unit/token.test.ts) zu finden.

Ohne zu sehr ins Detail zu gehen, benötigt TypeScript einige Konfigurationen, um den Test auszuführen. Erstellen Sie daher einfach eine Datei namens `tsconfig.json` im Stammverzeichnis Ihres Projekts und fügen Sie den folgenden Code ein:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "target": "es2020",
    "esModuleInterop": true,
    "module": "commonjs",
    "resolveJsonModule": true
  },
  "exclude": ["node_modules"],
  "include": ["src/**/*.ts", "test/**/*.ts", "scripts/**/*.ts", "alephium.config.ts", "artifacts/**/*.ts"]
}
```

Sie können den Test nun ausführen:

```sh
npx @alephium/cli@latest test
```

Sie sollten in Ihrem Terminal die Ausgabe des Aufrufs der Abhebungsmethode sehen.

🎉 Herzlichen Glückwunsch! Sie haben Ihren ersten Smart Contract erstellt und einen Test geschrieben, um ihn lokal aufzurufen und zu überprüfen! Jetzt ist es an der Zeit, Ihren Smart Contract bereitzustellen.
## Bereitstellen des Smart Contracts

Jetzt wird es ernst, denn wir werden unseren Smart Contract in unserem `devnet` bereitstellen. :rocket:

Der `deploy`-Befehl führt alle Bereitstellungsskripte aus, die er im Ordner `scripts` findet. Erstellen Sie den Ordner `scripts` im Stammverzeichnis des Projekts:

```sh
mkdir scripts
```

Lassen Sie uns eine Bereitstellungsskriptdatei namens `0_deploy_faucet.ts` im Ordner `scripts` erstellen und fügen folgenden Code hinzu.  
Beachten Sie, dass Bereitstellungsskripte immer mit Zahlen (beginnend ab `0`) vorangestellt sein sollten.

```typescript
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenFaucet } from '../artifacts/ts'

// Diese Bereitstellungsfunktion wird automatisch vom CLI-Bereitstellungstool aufgerufen.
// Beachten Sie, dass Bereitstellungsskripte mit Zahlen (beginnend bei 0) vorangestellt sein sollten.
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
  const issueTokenAmount = 100n
  const result = await deployer.deployContract(TokenFaucet, {
    // Die Menge der auszugebenden Token.
    issueTokenAmount: issueTokenAmount,
    // Die Anfangszustände des Faucet-Vertrags.
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

Das [deployContract](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L133-L137) des `Deployer` nimmt unseren Smart Contract und bereitet ihn mit den richtigen Argumenten vor. Sie können auch ein `taskTag`-Argument hinzufügen, um Ihre Bereitstellung mit einem bestimmten Namen zu kennzeichnen. Standardmäßig wird der Vertragsname verwendet, aber wenn Sie denselben Smart Contract mehrmals mit unterschiedlichen Anfangswerten bereitstellen, wird Ihre `.deployment`-Datei diesen überschrieben. Die Verwendung eines spezifischen `taskTag` löst dieses Problem.

Aus der [DeployContractParams](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/web3/src/contract/contract.ts#L1286-L1293)-Schnittstelle können wir sehen, dass `initialFields` obligatorisch ist, da es die Argumente für unseren Smart Contract `TokenFaucet` enthält.

Mit `issueTokenAmount` können Sie definieren, wie viele Token Sie ausgeben möchten. Dies ist erforderlich, wenn Sie ein Token erstellen möchten, sonst wird keine Token-ID erstellt.

Lassen Sie uns den Smart Contract nun bereitstellen!

```sh
npx @alephium/cli@latest deploy
```

...OOPS... Hat es nicht funktioniert???

Wenn Sie den Fehler `The node chain id x is different from configured chain id y` erhalten haben, überprüfen Sie Ihre `networkId` in der Devnet-Konfiguration und der Datei `alephium.config.ts`.

`No UTXO found` ???

Klar, wir haben die `how-to-use-my-utxos` nicht bereitgestellt. Sie müssen ihre [privateKeys](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L39-L46) definieren.

Sie müssen die privaten Schlüssel aus ihrer Extension Wallet exportieren (möglicherweise später auch aus ihren anderen Wallets). Stellen Sie sicher, dass Sie eine Wallet mit Guthaben verwenden, wie diejenige aus der Genesis-Zuteilung Ihres Devnet.
Wenn Sie die Docker-Methode zum Starten Ihres Devnets verwendet haben, hat es möglicherweise funktioniert, da wir [einen Standard-Private Key in unserem CLI-Paket definieren](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L75) basierend auf der Genesis-Zuteilung.

Aktualisieren wir nun unsere `alephium.config.ts`

```typescript
const configuration: Configuration<void> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2,
      // Der private Schlüssel meiner Genesis-Adresse lautet: 132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh
      privateKeys: ['672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559']
    }
  }
}
```

:::caution
Echte Anwendungen sollten Umgebungsvariablen oder ähnliche Techniken für sensible Einstellungen wie `privateKeys` verwenden. Geben Sie Ihre privaten Schlüssel nicht in die Quellcodeverwaltung ein.
:::

und versuchen Sie die Bereitstellung erneut:

```sh
npx @alephium/cli@latest deploy
```

```sh
Contracts are compiled already. Loading them from folder "artifacts"
Deploying contract TokenFaucet
Deployer - group 1 - 132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh
Token faucet contract id: d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301
Token faucet contract address: 28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA
✅ Deployment scripts executed!
```

Herzlichen Glückwunsch! Ihr Smart Contract ist bereitgestellt. Wir können nun das Guthaben des Smart Contract überprüfen. Verwenden Sie `curl` und ändern Sie die Vertragsadresse basierend auf dem Ergebnis ihrer Bereitstellung:

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/balance'
```

Die Antwort sollte so aussehen:

```json
{
  "balance": "1000000000000000000",
  "balanceHint": "1 ALPH",
  "lockedBalance": "0",
  "lockedBalanceHint": "0 ALPH",
  "tokenBalances": [
    {
      "id": "d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301",
      "amount": "100"
    }
  ],
  "utxoNum": 1
}
```

Wir können unsere Token-ID mit den 100 Tokens sehen die wir ausgeben wollten.

Lassen Sie uns den Vertragszustand überprüfen, indem Sie zuerst die Gruppe unserer Adresse abrufen:

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/group'
curl 'http://localhost:22973/contracts/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/state?group=1'
```


Rückmeldung des Vertragszustands:
```json
{
  "address": "28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA",
  "bytecode": "050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f",
  "codeHash": "641343b4f1c08b03969b127b452acc7535cad20231bc32af6c0b5f218dd8ff0c",
  "initialStateHash": "06595afa695949e915dfc1220dfb47125b01751d9e193f4c5fa1c7fc3566673d",
  "immFields": [
    {
      "type": "ByteVec",
      "value": "5446"
    },
    {
      "type": "ByteVec",
      "value": "546f6b656e466175636574"
    },
    {
      "type": "U256",
      "value": "18"
    },
    {
      "type": "U256",
      "value": "100"
    }
  ],
  "mutFields": [
    {
      "type": "U256",
      "value": "100"
    }
  ],
  "asset": {
    "attoAlphAmount": "1000000000000000000",
    "tokens": [
      {
        "id": "d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301",
        "amount": "100"
      }
    ]
  }
}
```

In den `immFields` sehen wir unsere anfänglichen `TokenFaucet`-Argumente (`symbol`, `name`, `decimals`, `supply`). Wir sehen auch, dass `mutFields` das aktuelle Token-Guthaben enthält. Wir werden dieses Feld später überprüfen, nachdem wir den Faucet aufgerufen haben.

Der `deploy`-Befehl hat auch die Datei `.deployments.devnet.json` mit dem Bereitstellungsergebnis erstellt. Es ist wichtig, diese Datei aufzubewahren, um einfacher mit dem Smart Contract zu interagieren, obwohl alle Informationen auch auf der Blockchain gefunden werden können.

# Interagieren Sie mit dem bereitgestellten Smart Contract

Einen Token-Wasserhahn zu haben, ist schön, von ihm Token zu erhalten, ist noch besser.

Jetzt können wir etwas Code schreiben, um mit dem Faucet-Contract zu interagieren.

Wir müssen unser `cli`-Paket und die `typescript`-Abhängigkeiten installieren, falls dies noch nicht der Fall war:

```
npm install @alephium/cli typescript
```

Wir werden nun eine andere Option sehen, um mit der Blockchain zu interagieren. Zuvor haben wir die `DeployFunction` mit unseren `scripts/<number>_*`-Dateien verwendet, die automatisch mit dem CLI-Tool bereitgestellt wurden.

Eine andere Möglichkeit besteht darin, ein Grundgerüst einer Webanwendung mit TypeScript zu erstellen. Erstellen Sie einen Ordner mit der Bezeichnung `src` im Stammverzeichnis des Projekts und darin eine Datei namens `tokens.ts` mit folgendem Inhalt:

```typescript
import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, Project, NodeProvider } from '@alephium/web3'
import { PrivateKeyWallet} from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {

  // Wählen Sie unser im alephium.config.ts definiertes Netzwerk aus.
  const network = configuration.networks.devnet

  // Der NodeProvider ist eine Abstraktion einer Verbindung zum Alephium-Netzwerk.
  const nodeProvider = new NodeProvider(network.nodeUrl)

  // Manchmal ist es bequem, einen globalen NodeProvider für Ihr Projekt einzurichten:
  web3.setCurrentNodeProvider(nodeProvider)

  // Verbinden Sie unsere Brieftasche, in einer echten Anwendung würden Sie in der Regel Ihre Web-Erweiterung oder Desktop-Wallet verbinden.
  const wallet = new PrivateKeyWallet({privateKey: '672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559' })

  // Kompilieren Sie die Verträge des Projekts, wenn sie nicht kompiliert sind.
  Project.build()

  // Bereitstellungen enthalten Informationen zu unserer TokenFaucet-Bereitstellung, da wir die Contract-ID und Adresse benötigen.
  // Dies wurde automatisch mit dem cli deploy unseres scripts/0_deploy_faucet.ts generiert.
  const deployments = await Deployments.from('.deployments.devnet.json')

  // Stellen Sie sicher, dass es mit Ihrer Adressgruppe übereinstimmt.
  const accountGroup = 1

  const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')

  if(deployed !== undefined) {
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Senden Sie eine Transaktion ab, um das Transaktionsskript zu verwenden.
    // Es verwendet unsere Brieftasche, um die Transaktion zu signieren.
    await Withdraw.execute(wallet, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
    })

    // Holen Sie sich den neuesten Stand des Token-Vertrags, mut balance sollte sich geändert haben.
    const faucet = TokenFaucet.at(tokenAddress)
    const state = await faucet.fetchState()
    console.log(state.fields)

    // Holen Sie sich das Brieftaschenguthaben, um zu sehen, ob das Token vorhanden ist.
    const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
    console.log(balance)
  } else {
    console.log('`deployed` is undefined')
  }
}

// Führen wir eine Abhebung durch.
withdraw()
```

Für aufmerksame Beobachter gibt es Neuerungen in unseren Artefakten: `artifacts`: [`Withdraw`](https://github.com/alephium/nextjs-template/blob/main/contracts/withdraw.ral) ist ein [`TxScript`](https://wiki.alephium.org/ralph/getting-started#txscript),  das notwendig ist, um mit dem `TokenFaucet`-Smart Contract zu interagieren. Der zugehörige Code ist recht simpel. Legen Sie eine Datei mit dem Namen `withdraw.ral` im Ordner `contracts` an und fügen Sie den folgenden Code ein:

```rust
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    token.withdraw(amount)
}
```

Wir müssen jetzt unsere Verträge neu kompilieren, um das Artefakt für `Withdraw` zu erhalten:

```sh
npx @alephium/cli@latest compile
```

Sie können den TypeScript-Code jetzt mit folgendem Befehl in JavaScript kompilieren:

```sh
npx tsc --build .
```

OOPS, sie werden einen Fehler aus der `alephium.config.ts`, erhalten. Bisher wurde die Konfiguration einfach als JSON verwendet, aber jetzt verlangt `TypeScript` dass es sein [Interface](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L48-L62) respektiert. Insbesondere ist `networks` ein Record, der die drei `Netzwerk-Typen` enthalten muss. Sie können versuchen, dies selbst zu beheben, oder Sie können Ihre `alephium.config.ts`-Datei mit folgendem Inhalt aktualisieren:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  defaultNetwork: 'devnet',
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2, // Verwenden Sie dasselbe wie in Ihrer DevNet-Konfiguration.
      privateKeys: ['672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559'],
      settings: {}
    },
    testnet: {
      nodeUrl: '',
      privateKeys: [],
      settings: {}
    },
    mainnet: {
      nodeUrl: '',
      privateKeys: [],
      settings: {}
    }
  }
}

export default configuration
```

Kompilieren Sie nun erneut:

```
npx tsc --build .
```

Ein `dist`-Ordner sollte erstellt worden sein, gehen Sie weiter und interagieren Sie mit dem bereitgestellten Token-Faucet:

```
node dist/src/token.js
```

Sie sollten jetzt stolzer Besitzer des von Ihnen erstellten Tokens sein.


## Was kommt als nächstes?

Ein komplexeres Beispiel für das Token-Faucet-Tutorial finden Sie im [Alephium/Nextjs-Template](https://github.com/alephium/nextjs-template)-Projekt.

## Mit den Wallets verbinden

DApps erfordern eine Wallet-Integration für Benutzer der DApp, um sich zu authentifizieren und mit der Alephium-Blockchain zu interagieren, wie zum Beispiel das Signieren von Transaktionen. Derzeit können DApps sowohl mit der [Extension Wallet](../wallet/extension-wallet/dapp) als auch mit [WalletConnect](../wallet/walletconnect) integriert werden. Bitte lesen Sie die entsprechenden Seiten für weitere Details.

## Weitere Informationen

- Um mehr über das Ökosystem zu erfahren, besuchen Sie bitte die [Übersicht des Ökosystems](/dapps/ecosystem).
- Um mehr über das Web3 SDK zu erfahren, besuchen Sie bitte die [Anleitung zum Web3 SDK](/dapps/alephium-web3).
- Um mehr über die Ralph-Sprache zu erfahren, besuchen Sie bitte die [Anleitung zu Ralph](/ralph/getting-started).
- Um zu erfahren, wie man eine Nextjs DApp erstellt, besuchen Sie [Entwicklen Sie eine DApp mit Nextjs](/dapps/build-dapp-with-nextjs.md)
