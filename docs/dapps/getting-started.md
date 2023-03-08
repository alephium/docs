---
sidebar_position: 5
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

#Dapps Getting started

This guide will explore the basics of creating an Alephium dApp project.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Operate in a [terminal](https://en.wikipedia.org/wiki/Terminal_emulator)

## Create a new dApp project: Token Faucet

In this tutorial we will write our first dApp: A token faucet.

Create a directory for tuto.

```sh
mkdir alephium-faucet-tuto
cd alephium-faucet-tuto
```

Let's now create a `contracts` folder where we'll store all our contracts

```sh
mkdir contracts
```

Our first contract we'll be `token.ral` which can be found [here](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral), you can copy it into your `contracts` folder.
Let's dive into it.

```
import "std/token_interface"

Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IToken {
```

The first four fields will be immutable values that store the data required to served our [IToken interface](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/token_interface.ral).
`mut balance` is a mutable value that keep track on how many tokens are left in this faucet.

You can see that our contract is emitting some `event` and define an `error` code. Read the following for more info on the [events](https://wiki.alephium.org/ralph/getting-started#events) and the [error handling](https://wiki.alephium.org/ralph/getting-started#error-handling).

This is followed by five access method for the different contract's arguments.

The latest function is where the magic happen:

```rust
@using(assetsInContract = true, updateFields = true)
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
```

With the `assert!` We make sure no one take more than 2 tokens at the same time.
`transferTokenFromSelf` will actually perform the transfer of token.
We update the `mut balance` field with the new balance, if it goes underflow and error will be raised and the transaction won't be perform.

## Compile your contract

The compiler needs to contact the full node in order to compile, we define the node url using with the following config file: `alephium.config.ts`

```typescript
import { Configuration } from '@alephium/cli'

const configuration: Configuration<void> = {
  defaultNetwork: 'devnet',
  networks: {
    devnet: {
      //Make sure the two values match what's in your `~/.alephium/user.conf
      nodeUrl: 'http://localhost:22973',
      networkId: 2
    }
  }
}

export default configuration
```

Make sure to use the correct host and port.

Now let's compile:

```sh
npx @alephium/cli@latest compile
```

It may ask you some confirmation to install the latest `@alephium/cli` package.

You can check the produced result into `artifacts`. For example `artifacts/ts/TokenFaucet.ts` produce lots of helper functions: `at, fetchState, call*, etc`, as well as test functions.

## Test your contract
The SDK provides unit test functionalities, which calls the contract like a normal transaction, but instead of changing the blockchain state, it returns the new contract state, transaction outputs, and events.

Install the test framework:

```sh
npm install ts-jest @types/jest
```

You'll also need our `web3` package

```sh
npm install @alephium/web3 @alephium/web3-test
```

Create a `test` folder:

```sh
mkdir test
```

and add this minimal test: `test/token.test.ts`

```typescript
import { web3, Project, addressFromContractId } from '@alephium/web3'
import { randomContractId, testAddress } from '@alephium/web3-test'
import { TokenFaucet } from '../artifacts/ts'

describe('unit tests', () => {
  it('test withdraw', async () => {

    // Use the correct host and port
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()

    let testContractId = randomContractId()
    let testParams = {
      // a random address that the test contract resides in the tests
      address: addressFromContractId(testContractId),
      // assets owned by the test contract before a test
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testContractId, amount: 10n }] },
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

    const testResult = await TokenFaucet.testWithdrawMethod(testParams)
    console.log(testResult)
  })
})
```

A more complex test can be found [here](https://github.com/alephium/nextjs-template/blob/main/test/token.test.ts)

Without entering to much into details, `Typescript` needs some configuration to run the test, just copy the following into `tsconfig.json`

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

You can now run the test:

```sh
npx @alephium/cli@latest test
```

Congratulations, you should see what result would produce a withdraw.

## Deploy your contract

Now things are getting serious, we will deploy our contract on our `devnet` :rocket:

The `deploy` command will deploy everything which is inside the `scripts` folder.

```sh
mkdir scripts
```

Let's create this file into this folder: `scripts/0_deploy_faucet.ts`
Note that deployment scripts should prefixed with numbers (starting from 0)

```typescript
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenFaucet } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
  const issueTokenAmount = 100n
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
  console.log('Token faucet contract id: ' + result.contractId)
  console.log('Token faucet contract address: ' + result.contractAddress)
}

export default deployFaucet
```

[deployContract](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L133-L137) takes our contract and deploy it with the correct arguments, you can also add a `taskTag` arguments, to tag your deployment with a specific name. By default it will use the contract name, but if you deploy multiple time the same contract with different initial fields, your `.deployement` file will get override, using a specific `taskTag` solve this issue.

From the [DeployContractParams](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/web3/src/contract/contract.ts#L1286-L1293) interface, we can see that `initialFields` is mandatory as it contains the arguments for our `TokenFaucet` contract.

With `issueTokenAmount` you can define how many tokens you want to issue, this is required if you want to create a token, otherwise no token-id will be created.

Now let's deploy!!!

```sh
npx @alephium/cli@latest deploy
```

...OOPS... It doesn't work???

`NO UTXO found` ???

Of course we didn't provide the `how-to-use-my-utxos`, we need to define our [privateKeys](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L39-L46).


You'll need to export the private keys from our wallet extension (might do it from our other wallets latter), make sure to use a wallet with funds, like the one from the genesis allocation of your devnet.

Let's update our `alephium.config.ts`

```typescript
const configuration: Configuration<void> = {
  defaultNetwork: 'devnet',
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2,
      //The private key of my genesis address 132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh
      privateKeys: ['672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559']
    }
  }
}
```

and retry to deploy:

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

Congratulations! Your contract is deployed. We can check the balance of the contract:
Change the contract address base on your deployment result

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/balance'
```

Response:

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

We can see our token id, with the 100 token we decided to issue.

Let's check the contract state:

```sh
curl 'http://localhost:22973/contracts/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/state?group=1'
```

The `group` value may vary depending of your deploying address. You can always get your group number with the `curl 'http://localhost:22973/addresses/<your-address>/group'`  endpoint.

Contract state response:
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

In the `immFields` we can find back our `TokenFaucet` initial arguments, `symbol/name/decimals/supply` and the `mutFields` contains the current token balance, we'll check latter that field after calling the faucet.

The `deploy` command also create a `.deployments.devnet.json` file, with the deployment result. It's important to keep that file to easily interact latter with the contract, even tho all informations can be found back on the blockchain.

# Interact with the deployed contract

Having a token faucet is nice, getting tokens from it is even better.

We can now write some code to interact with the faucet contract.

We'll need to install our `cli` package and the `typescript` dependency if it's not yet the case:

```
npm install @alephium/cli typescript
```

We will now see another way to interact with the blockchain, previously we were using the `DeployFunction` with our `scripts/x_*` files. Which are automatically deploy with the cli tool.

The next way is a skeleton of what you could do for a web-application.
This will be a `TypeScript` application and code goes into the `src` folder.

```sh
mkdir src
```

Let's create the following file, `src/token.ts`:

```typescript
import { Deployments } from '@alephium/cli'
import { web3, Project, NodeProvider } from '@alephium/web3'
import { PrivateKeyWallet} from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {

  //Select our network defined in alephium.config.ts
  const network = configuration.networks[configuration.defaultNetwork]

  //NodeProvider is an abstraction of a connection to the Alephium network
  const nodeProvider = new NodeProvider(network.nodeUrl)

  //Sometimes, it's convenient to setup a global NodeProvider for your project:
  web3.setCurrentNodeProvider(nodeProvider)

  //Connect our wallet, typically in a real application you would connect your web-extension or desktop wallet
  const wallet = new PrivateKeyWallet({privateKey: '672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559' })

  // Compile the contracts of the project if they are not compiled
  Project.build()

  //.deployments contains the info of our `TokenFaucet` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.from('.deployments.devnet.json')

  //Make sure it match your address group
  const accountGroup = 1

  const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')

  if(deployed !== undefined) {
    const tokenId = deployed.contractId
    const tokenAddress = deployed.contractAddress

    // Submit a transaction to use the transaction script
    // It uses our `wallet` to sing the transaction.
    await Withdraw.execute(wallet, {
      initialFields: { token: tokenId, amount: 1n }
    })

    // Fetch the latest state of the token contract, `mut balance` should have change
    const faucet = TokenFaucet.at(tokenAddress)
    const state = await faucet.fetchState()
    console.log(state.fields)

    // Fetch wallet balance see if token is there
    const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
    console.log(balance)
  } else {
    console.log('`deployed` is undefined')
  }
}

// Let's perform one withdraw
withdraw()
```

For the attentive people, you'll see something new coming from our `artifacts`: [Withdraw](https://github.com/alephium/nextjs-template/blob/main/contracts/withdraw.ral) which is a [TxScript](https://wiki.alephium.org/ralph/getting-started#txscript) required to interact with the `TokenFaucet` contract. Its code is quite simple, you can add this to you `contracts/withdraw.ral`

```rust
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    token.withdraw(amount)
}
```

We now need to recompile our contracts to get the artifact for `Withdraw`

```sh
npx @alephium/cli@latest compile
```

The code of `token.ts` should be self-explanatory, you can read more on our [web3-sdk here](https://wiki.alephium.org/dapps/alephium-web3)

You can now try to compile.

```sh
npx tsc --build .
```

OOPS, you should get an error coming from the `alephium.config.ts`, until now the config was used as a simple JSON, but now `TypeScript` want it to respect its [interface](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L48-L62). Especially the `networks` is a record that need to contain the 3 `NetworkType`. You can try to fix it by yourself or update your `alephium.config.ts` file with:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  defaultNetwork: 'devnet',
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2, //Use the same as in your `~/.alephium/user.conf
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

Now recompile

```
npx tsc --build .
```

A `dist` folder should have been created, go ahead and interact with the deployed token faucet:

```
node dist/src/token.js
```

You should now be a proud owner of the token you created.


## What's next?

You can find a more complex example of the token faucet tutorial [here](https://github.com/alephium/nextjs-template)

## Connect to the wallets

dApp requires wallet integration for users of the dApp to authenticate and interact with the Alephium blockchain,
such as transactions signing. Currently dApps can be integrated with both [Extension Wallet](../wallet/extension-wallet/dapp)
and [WalletConnect](../wallet/walletconnect). Please refer to the respective pages for more details.

## Learn more

- To learn more about the ecosystem, please visit the [overview of ecosystem](/dapps/ecosystem).
- To learn more about the web3 SDK, please visit the [guide of web3 SDK](/dapps/alephium-web3).
- To learn more about Ralph language, please visit the [guide of Ralph](/ralph/getting-started).
- To learn how to build a Nextjs dApp, please visit [Build dApp with Nextjs](/dapps/build-dapp-with-nextjs.md)
