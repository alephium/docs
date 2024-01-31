---
sidebar_position: 5
title: Einführung
sidebar_label: Einführung
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Übersicht

Alephium stellt mehrere Tools und Pakete bereit, um Ihnen beim Erstellen Ihrer DApps zu helfen.

Dieser Leitfaden wird Ihnen helfen, unsere empfohlene Einrichtung zu installieren.

Voraussetzungen:

- Schreiben sie Code in [Typescript](https://www.typescriptlang.org/)
- Arbeiten sie in einem [Terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [NodeJS](https://nodejs.org/en/) Version >= 16 installiert
- `npm` Version >= 8 installiert

## Ein neues Projekt für eine neue DApp erstellen

Um das Tutorial-Projekt zu erstellen, öffnen sie ein neues Terminal und führen sie den folgenden Befehl aus:

```
npx @alephium/cli@latest init alephium-tutorial
```

Dies erstellt ein neues Verzeichnis mit dem Namen  `alephium-tutorial` und initialisiert darin ein Beispielsprojekt.

## Starten des lokalen Entwicklungsnetzwerks

Um Ihre Contracts zu kompilieren und zu testen, ist es erforderlich, ein lokales Entwicklungsnetzwerk zu starten. Sie können [diese Anleitung](/full-node/devnet) verwenden, um ein Devnet zu starten.

Ihr neues Netzwerk ist jetzt mit [dieser Konfiguration](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf) und den generierten Adressen in 4 Gruppen und ausreichend ALPHs für Testzwecke gestartet.

Durch REST-Endpunkte kann das TypeScript SDK dann mit dem Netzwerk interagieren.

## Kompilieren sie ihren Smart Contract

Ändern sie als nächstes den Arbeitsbereich zum Tutorial-Projekt:

```
cd alephium-tutorial
```

Werfen sie einen Blick in den Ordner `contracts/` dort finden sie `token.ral`:

```rust
import "std/fungible_token_interface"

// Defines a contract named `TokenFaucet`.
// A contract is a collection of fields (its state) and functions.
// Once deployed, a contract resides at a specific address on the Alephium blockchain.
// Contract fields are permanently stored in contract storage.
// A contract can issue an initial amount of token at its deployment.
Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {

    // Events allow for logging of activities on the blockchain.
    // Alephium clients can listen to events in order to react to contract state changes.
    event Withdraw(to: Address, amount: U256)

    enum ErrorCodes {
        InvalidWithdrawAmount = 0
    }

    // A public function that returns the initial supply of the contract's token.
    // Note that the field must be initialized as the amount of the issued token.
    pub fn getTotalSupply() -> U256 {
        return supply
    }

    // A public function that returns the symbol of the token.
    pub fn getSymbol() -> ByteVec {
        return symbol
    }

    // A public function that returns the name of the token.
    pub fn getName() -> ByteVec {
        return name
    }

    // A public function that returns the decimals of the token.
    pub fn getDecimals() -> U256 {
        return decimals
    }

    // A public function that returns the current balance of the contract.
    pub fn balance() -> U256 {
        return balance
    }

    // A public function that transfers tokens to anyone who calls it.
    // The function is annotated with `updateFields = true` as it changes the contract fields.
    // The function is annotated as using contract assets as it does.
    @using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn withdraw(amount: U256) -> () {
        // Debug events can be helpful for error analysis
        emit Debug(`The current balance is ${balance}`)

        // Make sure the amount is valid
        assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
        // Functions postfixed with `!` are built-in functions.
        transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
        // Ralph does not allow underflow.
        balance = balance - amount

        // Emit the event defined earlier.
        emit Withdraw(callerAddress!(), amount)
    }
}
```

und `withdraw.ral` :

```rust
// Defines a transaction script.
// A transaction script is a piece of code to interact with contracts on the blockchain.
// Transaction scripts can use the input assets of transactions in general.
// A script is disposable and will only be executed once along with the holder transaction.
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    // Call token contract's withdraw function.
    token.withdraw(amount)
}
```

 Um Ihre Verträge zu kompilieren, führen sie den folgenden Befehl aus:

```
npx @alephium/cli@latest compile
```

Die kompilierten Artefakte befinden sich nun im Verzeichnis `artifacts`.

Dieser Befehl generiert auch TypeScript-Code basierend auf den kompilierten Artefakten. Der generierte TypeScript-Code befindet sich im Verzeichnis  `artifacts/ts`. Sie können mit dem generierten TypeScript-Code einfacher mit der Alephium-Blockchain interagieren.

## Testen sie ihren Smart Contract

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

  // We initialize the fixture variables before all tests
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()
    testContractId = randomContractId()
    testTokenId = testContractId
    testContractAddress = addressFromContractId(testContractId)
    testParamsFixture = {
      // a random address that the test contract resides in the tests
      address: testContractAddress,
      // assets owned by the test contract before a test
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testTokenId, amount: 10n }] },
      // initial state of the test contract
      initialFields: {
        symbol: Buffer.from('TF', 'utf8').toString('hex'),
        name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 10n ** 18n,
        balance: 10n
      },
      // arguments to test the target function of the test contract
      testArgs: { amount: 1n },
      // assets owned by the caller of the function
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }
  })
  //See more test in `test/unit/token.test.ts`
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

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings
  const issueTokenAmount = network.settings.issueTokenAmount
  const result = await deployer.deployContract(TokenFaucet, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
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

Führen sie die Bereitstellung aus mit:

```
npx @alephium/cli@latest deploy
```

Dies wird den Token-Faucet in Gruppe 0 des Devnet bereitstellen. Um den Smart Contract auf dem Testnet (oder einem anderen Netzwerk) bereitzustellen, aktualisieren sie Ihre  `alephium.config.ts` und verwenden sie anschließend folgende Option `--network`:

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
  // Compile the contracts of the project if they are not compiled
  Project.build()

  // Attention: test wallet is used for demonstration purpose
  const signer = await testNodeWallet()

  const deployments = await Deployments.load(configuration, 'devnet')

  // The test wallet has four accounts with one in each address group
  // The wallet calls withdraw function for all of the address groups
  for (const account of await signer.getAccounts()) {
    // Set an active account to prepare and sign transactions
    await signer.setSelectedAccount(account.address)
    const accountGroup = account.group

    // Load the metadata of the deployed contract in the right group
    const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')
    if (deployed === undefined) {
      console.log(`The contract is not deployed on group ${account.group}`)
      continue
    }
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Submit a transaction to use the transaction script
    await Withdraw.execute(signer, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
    })

    const faucet = TokenFaucet.at(tokenAddress)
    // Fetch the latest state of the token contract
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

DApps erfordern eine Wallet-Integration für Benutzer der DApp, um sich zu authentifizieren und mit der Alephium-Blockchain zu interagieren, z. B. das Signieren von Transaktionen. Derzeit können DApps sowohl mit der [Extension Wallet](../wallet/extension-wallet/DApp)
als auch mit [WalletConnect](../wallet/walletconnect) integriert werden. Bitte beachten Sie die jeweiligen Seiten für weitere Details.

## Weitere Informationen

- Um mehr über das Ökosystem zu erfahren, besuchen Sie bitte die [Übersicht des Ökosystems](/DApps/ecosystem).
- Um mehr über das Web3 SDK zu erfahren, besuchen Sie bitte die [Anleitung zum Web3 SDK](/DApps/alephium-web3).
- Um mehr über die Ralph-Sprache zu erfahren, besuchen Sie bitte die [Anleitung zu Ralph](/ralph/getting-started).
- Um zu lernen, wie man eine Nextjs DApp erstellt, besuchen Sie bitte [Erstellen Sie eine DApp mit Nextjs](/DApps/build-DApp-with-nextjs.md)
