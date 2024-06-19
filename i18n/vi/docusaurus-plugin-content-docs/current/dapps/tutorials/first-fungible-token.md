---
sidebar_position: 20
title: First Fungible Token
sidebar_label: First fungible token
---

In Alephium, when deploying a new contract, you can issue a specified
amount of tokens and optionally send them to a recipient. The id of
the newly issued token is the same as the id of the contract that
issues it.

In this guide, you will learn how to issue a token that complies with
the Fungible Token
Standard
using the [Typescript SDK](/sdk/getting-started).

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Understand how to [compile](/dapps/tutorials/quick-start#compile-your-contract)
  and [deploy](/dapps/tutorials/quick-start#deploy-your-contract)
  contracts in a project using [Typescript SDK](/sdk/getting-started)

You can clone the example in this guide and run it like this:

```shell
git clone git@github.com:alephium/ralph-example.git
cd ralph-example/your-firsts
npm install
npm compile
npx ts-node src/fungible-token.ts
```

## Create token contract

A contract that complies with the Fungible Token
Standard
needs to implement the `IFungibleToken` interface, which
defines methods to get the `name`, `symbol`, `decimals` as well as the
`totalSupply` of the token. The `IFungibleToken` interface is available
automatically from the SDK:

```rust
import "std/fungible_token_interface"

Contract ShinyToken() {
  pub fn getTotalSupply() -> U256 {
      return 10000
  }

  pub fn getSymbol() -> ByteVec {
      return b`Stk`
  }

  pub fn getName() -> ByteVec {
      return b`ShinyToken`
  }

  pub fn getDecimals() -> U256 {
      return 18
  }
}
```

## Issue token

Once the token contract is created and compiled, it can be deployed
using Typescript SDK:

```typescript
import { web3 } from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import { ShinyToken } from '../artifacts/ts'

async function fungibleToken() {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  const signer = await testNodeWallet()
  const issueTokenAmount = 10000n
  // Deoloy `ShinyToken` contract and issue `10000` shiny tokens to `issueTokenTo` address.
  const shinyToken = await ShinyToken.deploy(signer, {
    initialFields: {},
    issueTokenAmount,
    issueTokenTo: signer.address
  })

  const tokenId = shinyToken.contractInstance.contractId

  const signerBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(signer.address)
  const signerShinyTokenBalance = signerBalance.tokenBalances!.find((token) => token.id === tokenId)
  console.log(`token issued to ${signer.address}`, signerShinyTokenBalance)
}

fungibleToken()
```

In this example, the `ShinyToken` token contract will be deployed along
with `10000` tokens, all of which are immediately sent to
`signer.address`. Note that if `signer.address` is not specified, the
newly issued tokens will be owned by the `ShinyToken` contract.

## Interact with the token

Congratulations! You have issued your first fungible token. Since
the newly issued token adheres to the Fungible Token
Standard,
it is compatible with wallets, explorer and other services. It
also enables SDK to get its information in a standard way:

```typescript
// Use SDK to call methods individually
const getDecimalResult = await shinyToken.methods.getDecimals()
const getTotalSupplyResult = await shinyToken.methods.getTotalSupply()
const getNameResult = await shinyToken.methods.getName()
console.log("TokenFaucet name, decimals, totalSupply", getNameResult.returns, getDecimalResult.returns, getTotalSupplyResult.returns)

// Use SDK to call all multiple methods at the same time
const multicallResult = await shinyToken.multicall({
  getDecimals: {},
  getTotalSupply: {},
  getName: {},
})
console.log("TokenFaucet name, decimals, totalSupply", multicallResult.getName.returns, multicallResult.getDecimal.returns, multicallResult.getTotalSupply.returns)
```

In fact, SDK provides a canonical way to fetch all metadata for a fungible token.

```typescript
const metadata = await web3.getCurrentNodeProvider().fetchFungibleTokenMetaData(shinyToken.contractId)
console.log("TokenFaucet name, decimals, totalSupply", metadata.name, metadata.decimals, metadata.totalSupply)
```

[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
also enables SDK to guess the type of a token, so that dApps and
wallets can handle them respectively:

```typescript
// Guess token type
const tokenType = await web3.getCurrentNodeProvider().guessStdTokenType(shinyToken.contractId)
expect(tokenType).toEqual('fungible')

// Guess token interface id
const tokenInterfaceId = await web3.getCurrentNodeProvider().guessStdInterfaceId(shinyToken.contractId)
expect(tokenInterfaceId).toEqual('0001')
```

## What's Next

To make the token display properly in wallets and explorer, you can
also make a [PR](https://github.com/alephium/token-list/pulls) to add
it to the [token list](/dapps/standards/fungible-tokens#token-list).
