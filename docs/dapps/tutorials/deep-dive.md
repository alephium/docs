---
sidebar_position: 6
title: Deep Dive
sidebar_label: Deep dive
---


In the [Quick Start](/dapps/tutorials/quick-start) guide, we set up a
sample project and walked through common development tasks without
diving into much details. In this guide, we will build the same dApp
from scratch to explore the basics of creating a dApp on Alephium.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Operate in a [terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [nodejs](https://nodejs.org/en/) version >= 16 installed
- `npm` version >= 8 installed

## Create a new project

Let's create a token faucet dApp. The smart contract code is taken
from our [getting started](/dapps/tutorials/quick-start) guide. 

First, create a new project folder and navigate into it:

```sh
mkdir alephium-faucet-tutorial
cd alephium-faucet-tutorial
```

Let's now create a `contracts` folder where we'll store all our contracts:

```sh
mkdir contracts
```

Our first contract is `token.ral` which can be found [here](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral). You can copy the whole file into your `contracts` folder.

Let's inspect it, piece by piece:

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

The first four fields are immutable values required to serve the [IFungibleToken interface](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral).
`balance` is a mutable value that keeps track of how many tokens are left in this faucet.

You can see that our contract emits an `event` and defines an `error`
code. For more information please read [events](https://wiki.alephium.org/ralph#events) and [error handling](https://wiki.alephium.org/ralph#error-handling).

This is followed by 5 access methods for each of the contract's fields.

The last method is where the magic happens:

```rust
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
```

With the `assert` we make sure no one takes more than 2 tokens at a
time. `transferTokenFromSelf` does the actual transferring of the
tokens from the token faucet contract to the caller. The `balance` field
is updated with the new value, and in case of underflow, an error will be
raised and the transaction won't be performed. `callerAddress` and
`selfTokenId` are built-in functions, you can read more about them in
our [built-in functions page](/ralph/built-in-functions).

## Compile your contract

The compiler needs to contact the [local devnet](/full-node/getting-started#devnet) in
order to compile the contract. If you haven't started it, now it's the
time.  We define the node URL using the `alephium.config.ts` config
file. Create this file in the root directory of your project and paste
the following code:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      //Make sure the two values match what's in your devnet configuration
      nodeUrl: 'http://localhost:22973',
      networkId: 2
    }
  }
}

export default configuration
```

Now, let's compile:

```sh
npx @alephium/cli@latest compile
```

It may ask you for some confirmation to install the latest `@alephium/cli` package. Select yes to proceed.

Once the above command succeeds, you will notice that a new folder called `artifacts` was created. It contains several files related to your contract. For example, `artifacts/ts/TokenFaucet.ts` produces lots of helper functions like `at`, `fetchState`, `call*`, etc, as well as many test functions.

## Test your contract
The SDK provides a unit test framework, which allows the test case to
interact with the contract without changing the blockchain
state. Instead, it returns the new contract state, transaction
outputs, and events for verification.

Install the test framework:

```sh
npm install ts-jest @types/jest
```

You'll also need the `@alephium/web3` and `@alephium/web3-test` packages:

```sh
npm install @alephium/web3 @alephium/web3-test
```

Create a `test` folder:

```sh
mkdir test
```

and create the `test/token.test.ts` minimalistic test file with the following contents:

```typescript
import { web3, addressFromContractId } from '@alephium/web3'
import { randomContractId, testAddress } from '@alephium/web3-test'
import { TokenFaucet } from '../artifacts/ts'

describe('unit tests', () => {
  it('Withdraws 1 token from TokenFaucet', async () => {

    // Use the correct host and port
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')

    const testContractId = randomContractId()
    const testParams = {
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

    const testResult = await TokenFaucet.tests.withdraw(testParams)
    console.log(testResult)
  })
})
```

Without entering too much into details, TypeScript needs some configuration to run the test so just create a file called `tsconfig.json` in the root directory of your project and paste the following code:

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

You should be able to see on your terminal the output of calling the withdraw method.

🎉 Congratulations! Have created your first contract and written a test to call it and test it locally! It's time to deploy your contract.

## Deploy your contract

Now things are getting serious, we will deploy the contract on `devnet` :rocket:

The `deploy` command will execute all deployment scripts it finds inside the `scripts` folder. Create the `scripts` folder in the root folder of the project:

```sh
mkdir scripts
```

Let's create a deployment script file called `0_deploy_faucet.ts` into the `scripts` folder and paste the following code.  
Note that deployment scripts should always be prefixed with numbers (starting from `0`).

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
  console.log('Token faucet contract id: ' + result.contractInstance.contractId)
  console.log('Token faucet contract address: ' + result.contractInstance.address)
}

export default deployFaucet
```

The
[deployContract](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L133-L137)
of the `Deployer` takes the contract and deploys it with the correct
arguments. You can also add a `taskTag` argument to tag your
deployment with a specific name. By default, it will use the contract
name, but if you deploy the same contract multiple times with
different initial fields, your `.deployment` file will get
overridden. Using a specific `taskTag` solves this issue.

From the
[DeployContractParams](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/web3/src/contract/contract.ts#L1286-L1293)
interface, we can see that `initialFields` is mandatory as it contains
the arguments for our `TokenFaucet` contract.

With `issueTokenAmount` you can define how many tokens you want to
issue, this is required if you want to create a token, otherwise no
tokens will be created. You can also use `issueTokenTo` to send the
issued token to a recipient.


Now, let's deploy!

```sh
npx @alephium/cli@latest deploy
```

...OOPS... It doesn't work???

If you got the error `The node chain id x is different from configured chain id y`, go check your `networkId` in the devnet configuration and the `alephium.config.ts` file.

`No UTXO found` ??? Of course, we didn't provide [private keys](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L39-L46) for deployment.

You'll need to export the private keys from the [wallets](/wallet), make sure to use a wallet with funds, like the one from the genesis allocation of your devnet. 
If you used the docker way to launch your devnet, it might have work as we are defining [a default private key in our cli package](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L75) based on the genesis allocation.

Let's update our `alephium.config.ts`

```typescript
const configuration: Configuration<void> = {
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

:::caution
For production, we should use environment variables or similar techniques for sensitive information like `privateKeys`.
Do not commit your private keys to source control.
:::

And try to re-deploy:

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

Congratulations! Your contract is deployed. We can check the balance of the contract. Use `curl` and change the contract address based on your deployment result:

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/balance'
```

The response should look like this:

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

We can see our token id, with the 100 tokens we decided to issue.

Let's check the contract state by first getting the group of our address: 

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/group'
curl 'http://localhost:22973/contracts/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/state?group=1'
```


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

In the `immFields` we can see our initial `TokenFaucet` arguments (`symbol`, `name`, `decimals`, `supply`). We can also see that `mutFields` contains the current token balance. We'll check that field later after calling the faucet.

The `deploy` command also created a `.deployments.devnet.json` file, with the deployment result. It's important to keep that file to easily interact with the contract, even though all information can be found on the blockchain.

# Interact with the deployed contract

Having a token faucet is nice, getting tokens from it is even
better. We can now write some code to interact with the faucet
contract.

We'll need to install our `cli` package and the `typescript`
dependency if it's not yet the case:

```
npm install -D @alephium/cli typescript
```

We will now see a different option to interact with the blockchain. Previously, we were using the `DeployFunction` with our `scripts/<number>_*` files which are automatically deployed with the CLI tool.

Another way is to use a simple typescript application. Create a `src` folder in the root folder of the project and a file called `tokens.ts` in it with the following contents.

```typescript
import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, NodeProvider } from '@alephium/web3'
import { PrivateKeyWallet} from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {

  //Select our network defined in alephium.config.ts
  const network = configuration.networks.devnet

  //NodeProvider is an abstraction of a connection to the Alephium network
  const nodeProvider = new NodeProvider(network.nodeUrl)

  //Sometimes, it's convenient to setup a global NodeProvider for your project:
  web3.setCurrentNodeProvider(nodeProvider)

  //Connect our wallet, typically in a real application you would connect your web-extension or desktop wallet
  const wallet = new PrivateKeyWallet({privateKey: '672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559' })

  //.deployments contains the info of our `TokenFaucet` deployment, as we need to know the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.load(configuration, 'devnet')

  //Make sure it match your address group
  const accountGroup = 1

  const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')

  if(deployed !== undefined) {
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Submit a transaction to use the transaction script
    // It uses our `wallet` to sign the transaction.
    await Withdraw.execute(wallet, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
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

For the attentive people, you'll see something new coming from our `artifacts`: [`Withdraw`](https://github.com/alephium/nextjs-template/blob/main/contracts/withdraw.ral) which is a [`TxScript`](https://wiki.alephium.org/ralph#txscript) required to interact with the `TokenFaucet` contract. Its code is quite simple. Create a file called `withdraw.ral` in the `contracts` folder and paste the following code:

```rust
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    token.withdraw(amount)
}
```

We now need to recompile our contracts to get the artifact for `Withdraw`:

```sh
npx @alephium/cli@latest compile
```

You can now compile the TypeScript code to JavaScript with:

```sh
npx tsc --build .
```

OOPS, you should get an error coming from the `alephium.config.ts`, until now the config was used as a simple JSON, but now `TypeScript` want it to respect its [interface](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L48-L62). Especially the `networks` is a record that need to contain the 3 `NetworkType`. You can try to fix it by yourself or update your `alephium.config.ts` file with:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2, //Use the same as in your devnet configuration
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


## Learn more

If you want to learn more about how to interact with the token faucet
with a web interface, please take a look at the guide to [Build dApp
with Nextjs](/dapps/tutorials/first-dapp-with-nextjs).

- [Ecosystem](/dapps/ecosystem)
- [Typescript SDK](/sdk/getting-started)
- [Ralph](/ralph)

