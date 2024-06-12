---
sidebar_position: 20
title: First Fungible Token
sidebar_label: First fungible token
---

In Alephium, when deploying a new contract, you can issue a specified
amount of tokens and optionally send them to a recipient. The ID of
the newly issued token is the same as the ID of the contract that
issues it.

In this guide, you will learn how to issue a token that complies with
the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard)
using the [Typescript SDK](/sdk/getting-started).

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Understand how to [compile](/dapps/tutorials/quick-start#compile-your-contract)
  and [deploy](/dapps/tutorials/quick-start#deploy-your-contract)
  contracts in a project using [Typescript SDK](/sdk/getting-started)

## Create token contract

A contract that complies with the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard)
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

  fn getName() -> ByteVec {
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
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { getSigner } from '@alephium/web3-test'
import { ShinyToken } from '../artifacts/ts'

const signer: PrivateKeyWallet = await getSigner()

// Deoloy `ShinyToken` contract and issue `10000` shiny tokens to `signer.address`.
const shinyToken = await ShinyToken.deploy(signer, { 
  initialFields: {}, 
  issueTokenAmount: 10000n, 
  issueTokenTo: signer.address
})

// Verify that `signer.address` received correct amount of shiny tokens.
const shinyTokenId = shinyToken.contractId
const signerBalance = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(signer.address)
const signerShinyTokenBalance = signerBalance.tokenBalances!.find((token) => token.id === shinyTokenId)
expect(BigInt(signerShinyTokenBalance!.amount)).toEqual(issueTokenAmount)
```
In this example, the `ShinyToken` token contract will be deployed along
with `10000` tokens, all of which are immediately sent to
`signer.address`. Note that if `signer.address` is not specified, the
newly issued tokens will be owned by the `ShinyToken` contract.

## Interact with the token

Congratulations! You have issued your first fungible token. Since
the newly issued token adheres to the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard),
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
