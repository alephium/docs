---
sidebar_position: 60
title: Dapp Recipes
sidebar_label: Dapp recipes
---


## Token

### Fetch fungible token metadata

```typescript
nodeProvider.fetchFungibleTokenMetaData(tokenId)
```

### Fetch the circulating supply/total supply of a token

The following code retrieves the total supply programmed by the token developer.
Note that actual contract verification is necessary for trustworthiness.
```typescript
(await nodeProvider.fetchFungibleTokenMetaData(tokenId)).totalSupply
```

There's no direct function for circulating supply following the ERC20 standard.

TODO: query token issuance amount in the explorer backend to provide more trustworthy information.

### Fetch NFT metadata

```typescript
nodeProvider.fetchNFTMetaData(nftTokenId)
```

### Fetch Collection metadata

```typescript
nodeProvider.fetchNFTCollectionMetaData(nftCollectionId)
```

## Contract

### Fetch contract state

When using the `npx @alephium/cli compile` command to compile a contract, it will generate TypeScript code based on the contract code.
Taking the [TokenFaucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) contract as an example,
[here](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/TokenFaucet.ts) is the generated TypeScript code.
We can use the generated TypeScript code to fetch the contract state:

```typescript
import { TokenFaucet } from 'artifacts/ts' // Note that you may need to change the import path according to your project directory structure
import { web3, NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)
web3.setCurrentNodeProvider(nodeProvider)

const tokenFaucetAddress = 'y1btMZHTvMvHEqLTdx1JHvEXq3tmVfqsY2rwM669upiT'
const tokenFaucet = TokenFaucet.at(tokenFaucetAddress)
const contractState = await tokenFaucet.fetchState()

// The names in `contractState.fields` are the same as the field names in the TokeFaucet contract
const { symbol, name, decimals, supply, balance  } = contractState.fields

// You can also get the assets owned by the contract
const { alphAmount, tokens } = contractState.asset
```

### Call contract method

You can use the generated TypeScript code to call the contract methods, it is similar to the `eth_call` in Ethereum:

```typescript
import { TokenFaucet } from 'artifacts/ts'
import { web3, NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)
web3.setCurrentNodeProvider(nodeProvider)

const tokenFaucetAddress = 'y1btMZHTvMvHEqLTdx1JHvEXq3tmVfqsY2rwM669upiT'
const tokenFaucet = TokenFaucet.at(tokenFaucetAddress)
const totalSupply = await tokenFaucet.methods.getTotalSupply()
```

### Subscribe to contract events

In the [TokenFaucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral) contract,
we have defined a [Withdraw](https://github.com/alephium/nextjs-template/blob/c846a675235198045cdf91ba0304aa287f2fc68d/contracts/token.ral#L18) event.
Every time the `withdraw` function is called, the contract will emit a `Withdraw` event.
We can subscribe to the withdraw events using the following approach:

```typescript
import { TokenFaucet, TokenFaucetTypes } from 'artifacts/ts'
import { EventSubscribeOptions } from '@alephium/web3'

// `TokenFaucetTypes.WithdrawEvent` is a generated TypeScript type
const options: EventSubscribeOptions<TokenFaucetTypes.WithdrawEvent> = {
  // We specify the pollingInterval as 4 seconds, which will query the contract for new events every 4 seconds
  pollingInterval: 4000,
  // The `messageCallback` will be called every time we recive a new event
  messageCallback: (event: TokenFaucetTypes.WithdrawEvent): Promise<void> => {
    console.log(`Withdraw(${event.fields.to}, ${event.fields.amount})`)
    return Promise.resolve()
  },
  // The `errorCallback` will be called when an error occurs, here we unsubscribe the subscription and log the error
  errorCallback: (error, subscription): Promise<void> => {
    console.error(error)
    subscription.unsubscribe()
    return Promise.resolve()
  },
  // The `onEventCountChanged` callback is an optional parameter that will be called when the contract event count changes
  onEventCountChanged: (eventCount): Promise<void> => {
  },
}

// We subscribe to contract events starting from event count 0.
// We can also persist the current event count within the `onEventCountChanged` callback,
// allowing us to subscribe from the last event count for the next subscription.
const fromEventCount = 0
const subscription = tokenFaucet.subscribeWithdrawEvent(options, fromEventCount)

// Unsubscribe the subscription
subscription.unsubscribe()
```

### Test functions with simulated block time

It's possible to test functions with simulated block time in unit tests. For integration tests based on testnet or devnet, there is no way to change the block time though.

Here is a simple example:

```typescript
import { TokenFaucet } from 'artifacts/ts'

const result = await TokenFaucet.tests.withdraw({
  blockTimeStamp: 1706284941000, // the unit is millisecond
  address: ...,
  initialFields: ...,
  ...
})
```

### Log debug messages

Ralph supports debug messages by emitting the built-in event `Debug`. Note that such events are ignored on mainnet.

```typescript
// Simple Ralph contract
Contract Debug() {
    pub fn debug() -> () {
        emit Debug(`Hello, ${nullContractAddress!()}!`)
    }
}

// Unit test in Typescript
const result = await Debug.tests.debug()

// The following line will appear in the console output and the full node's logs:
//   Debug - tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq - Hello, tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq!

// Retrieve all debug messages
console.log(result.debugMessages)
```

## Load contract/script from artifacts

If you only have compiled artifacts and no contract/script source code, you can load contracts from artifacts.

Here's an example of loading a contract from artifacts and deploying it:

```typescript
import { ContractFactory, ContractInstance, Fields } from '@alephium/web3'
import { testPrivateKey } from '@alephium/web3-test'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { default as tokenFaucetJson } from '../artifacts/TokenFaucet.ral.json'

class TokenFaucetInstance extends ContractInstance {}
class TokenFaucetFactory extends ContractFactory<TokenFaucetInstance, Fields> {
  override at(address: string): TokenFaucetInstance {
    return new TokenFaucetInstance(address)
  }
}

const signer = new PrivateKeyWallet({ privateKey: testPrivateKey })
const tokenFaucetContract = Contract.fromJson(tokenFaucetJson)
const contractFactory = new TokenFaucetFactory(tokenFaucetContract)
const result = await contractFactory.deploy(signer, {
  initialFields: {
    symbol: Buffer.from('TF', 'utf8').toString('hex'),
    name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
    decimals: 0n,
    supply: 100n,
    balance: 100n,
    __stdInterfaceId: '0001' // the id for fungible token standard
  },
  issueTokenAmount: 100n
})
console.log(`TokenFaucet contract id: ${result.contractInstance.contractId}`)
// TokenFaucet contract id: d6b3667c6eb5fdab1856ce7bbe75406ce9543bcbc57deaabd4c521ba4fce3b00
```

You can call contract method:

```typescript
import { addressFromContractId, callMethod } from '@alephium/web3'

const tokenFaucetContractId = 'd6b3667c6eb5fdab1856ce7bbe75406ce9543bcbc57deaabd4c521ba4fce3b00'
const contractInstance = contractFactory.at(addressFromContractId(tokenFaucetContractId))
const result = await callMethod(contractFactory, contractInstance, 'getName', {}, () => tokenFaucetContract)
console.log(`Token name: ${Buffer.from(result.returns as string, 'hex').toString('utf8')}`)
// Token name: TokenFaucet
```

Similarly, you can also load a `TxScript` from artifacts and send transactions:

```typescript
import { Script, ExecutableScript } from '@alephium/web3'
import { default as withdrawJson } from '../artifacts/Withdraw.ral.json'

const tokenFaucetContractId = 'd6b3667c6eb5fdab1856ce7bbe75406ce9543bcbc57deaabd4c521ba4fce3b00'
const withdrawScript = Script.fromJson(withdrawJson)
const script = new ExecutableScript(withdrawScript)
const result = await script.execute(signer, {
  initialFields: {
    token: tokenFaucetContractId,
    amount: 1n
  },
  attoAlphAmount: DUST_AMOUNT
})
console.log(`Tx id: ${result.txId}`)
// Tx id: 27528a56ecf4993248ec9467ee1dbb6122124c677d9e0e7cc12158dec8f5b4e9
```

## Unit Testing

The web3 SDK generates TS utility functions for testing contracts. You can unit test a single function with `ContractName.tests.functionName(params)`.
Each test takes the current contract state as input and returns the updated contract state.

### Test the same contract twice in a row

One could reuse the returned contract state as input to re-test the same contract.

```typescript
const testResult0 = await TokenFaucet.tests.withdraw(testParams0)

// the balance of the test token is: 10 - 1 = 9
const contractState0 = testResult0.contracts[0] as TokenFaucetTypes.State
expect(contractState0.fields.balance).toEqual(9n)

// reuse the contract state from the previous test
const testResult1 = await TokenFaucet.tests.withdraw({
  ...testParams0,
  initialFields: contractState0.fields,
  initialAsset: contractState0.asset,
})

// the balance of the test token is: 9 - 1 = 8
const contractState1 = testResult1.contracts[0] as TokenFaucetTypes.State
expect(contractState1.fields.balance).toEqual(8n)
```

## Call TxScript

Call `TxScript` is a feature that allows interaction with smart contracts on Alephium without consuming gas and modifying the on-chain state. Instead, it executes scripts and returns updated contract states.

### Call contract functions

```rust
Contract Foo(mut value: U256) {
  @using(updateFields = true, checkExternalCaller = false)
  pub fn foo() -> () {
    value = value + 1
  }
}

@using(preapprovedAssets = false)
TxScript Main(foo: Foo) {
  foo.foo()
}
```

You can use the generated `TypeScript` code to call `TxScript`:

```typescript
import { getSigner } from '@alephium/web3-test'

const signer = await getSigner()
const deployFooResult = await Foo.deploy(signer, { initialFields: { value: 0n } })
const fooInstance = deployFooResult.contractInstance
const callResult = await Main.call({
  initialFields: { foo: fooInstance.contractId },
  interestedContracts: [fooInstance.address]
})
expect(callResult.contracts[0].fields.value).toEqual(1n)
```

### Query and return contract states

`TxScript` also allows you to query and return the states of multiple contracts in a single request:

```rust
Contract Foo(value: U256) {
  pub fn foo() -> U256 {
    return value
  }
}

Contract Bar(value: ByteVec) {
  pub fn bar() -> ByteVec {
    return value
  }
}

TxScript Main(foo: Foo, bar: Bar) {
  pub fn main() -> (U256, ByteVec) {
    return foo.foo(), bar.bar()
  }
}
```

Implicit definition of the `main` function does not allow for return values, so an explicit definition of the `main` function is required here.

You can use the generated `TypeScript` code to call `TxScript`:

```typescript
import { getSigner } from '@alephium/web3-test'

const signer = await getSigner()
const deployFooResult = await Foo.deploy(signer, { initialFields: { value: 0n } })
const deployBarResult = await Bar.deploy(signer, { initialFields: { value: '0011' } })
const fooInstance = deployFooResult.contractInstance
const barInstance = deployBarResult.contractInstance
const callResult = await MainForCall.call({
  initialFields: { foo: fooInstance.contractId, bar: barInstance.contractId }
})
expect(callResult.returns).toEqual([0n, '0011'])
```