---
sidebar_position: 5
title: Quick Start
sidebar_label: Quick start
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium's Web3 SDK offers a comprehensive suite of developer tools
and libraries designed to assist in building your dApps. This guide
will help you get started with an example dApp project, walking you
through essential development tasks such as smart contract
compilation, testing, and deployment.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Operate in a [terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [nodejs](https://nodejs.org/en/) version >= 16 installed
- `npm` version >= 8 installed

:::info
If you experience slowness with `npm` and `npx`, consider give
[bun](https://bun.sh) and [bunx](https://bun.sh/docs/cli/bunx) a try.

:::

## Create a new dApp project

To create the tutorial project, open a new terminal and run:

```shell
npx @alephium/cli@latest init alephium-tutorial
```

This will create a new directory `alephium-tutorial` and initialize a sample project inside that directory.

## Launch the local development network

To compile and test your contracts, it's necessary to [launch](/full-node/getting-started#devnet) a local
development network. Your local devnet will be launched using [this
configuration](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf)
and generated addresses in 4 groups with enough ALPHs for testing
purposes.

The [Typescript SDK](https://github.com/alephium/alephium-web3) used
in the sample project is then able to interact with the local devnet
through REST endpoints.

## Compile your contract

Next, change the workspace to the tutorial project:

```
cd alephium-tutorial
```

In the `contracts/` folder, you will find `token.ral` and `withdraw.ral`:

<details>
<summary>token.ral</summary>
<p>

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

</p></details>

<details>
<summary>withdraw.ral</summary>
<p>

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

</p></details>

To compile your contracts, run:

```
npx @alephium/cli@latest compile
```

The compiled artifacts are in the `artifacts` directory. This command also generates Typescript code based on the compiled artifacts, which is in the `artifacts/ts` directory. You can use the generated Typescript code to interact with the alephium blockchain more conveniently.

## Test your contract

The sample project comes with tests in `test/unit/token.test.ts` for your contract:

<details>
<summary>token.test.ts</summary>
<p>

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

</p></details>

You can run the tests with:

```
npm run test
```

or

```
npx @alephium/cli@latest test
```

## Deploy your contract

To deploy the contract, use Alephium CLI and a deployment script `scripts/0_deploy_faucet.ts`:

<details>
<summary>0_deploy_faucet.ts</summary>
<p>

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

</p></details>

You can run the deployment script with:

```
npx @alephium/cli@latest deploy
```

This will deploy the token faucet to group 0 of devnet. To deploy on testnet (or any other network), update your `alephium.config.ts` and use the `--network` option:

```
npx @alephium/cli@latest deploy --network testnet
```

## Interact with the deployed contract

Now, build the source code `src/token.ts` :

<details>
<summary>token.ts</summary>
<p>

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

</p></details>

Simply run:

```
npm run build
```

and interact with the deployed token faucet:

```
node dist/src/token.js
```

## Connect to the wallets

dApps require wallet integration to allow users to authenticate and interact with the Alephium blockchain,
such as transactions signing. Currently dApps can be integrated with
all [official wallets](/wallet). For a more concrete example,
please look at the example in [Build dApp with
Nextjs](/dapps/sdk/work-with-project/build-dapp-from-scratch).

## Learn more

If you want to learn more about how the sample project is set up,
please take a look at the step-by-step guide to [Build dApp from
scratch](/dapps/tutorials/deep-dive).

- [Ecosystem](/dapps/ecosystem)
- [Web3 SDK](/dapps/sdk/getting-started)
- [Ralph](/dapps/ralph/getting-started)
- [Build dApp with Nextjs](/dapps/tutorials/first-dapp-with-nextjs)
