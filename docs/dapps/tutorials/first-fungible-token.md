---
sidebar_position: 20
title: First Fungible Token
sidebar_label: First fungible token
---

In Alephium, when deploying a new contract, we can issue a specified
amount of tokens and optionally send them to a recipient. The id of
the newly issued token is the same as the id of the contract that
issues it.

In this guide, we will learn how to issue a token that complies with
the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard)
using the [Web3 SDK](/dapps/sdk/getting-started).

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- Understand how to [compile](/dapps/sdk/work-with-project/getting-started#compile-your-contract)
  and [deploy](/dapps/sdk/work-with-project/getting-started#deploy-your-contract)
  contracts in a project using [Web3 SDK](/dapps/sdk/getting-started)

## Create token contract

A contract that complies with the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard)
simply needs to implement the `IFungibleToken` interface, which
defines methods to get the `name`, `symbol`, `decimals` as well as the
`totalSupply` of the token. `IFungibleToken` interface is available
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
using Web3 SDK:

```typescript
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { getSigner } from '@alephium/web3-test'

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
In this case the `ShinyToken` token contract will be deployed along
with `10000` tokens, all of which are immediately sent to
`signer.address`. Note that if `signer.address` is not specified, the
newly issued tokens will be owned by the `ShinyToken` contract.

## What's Next

Congratulations! You now have issued your first token. Since the newly
issued token adheres to the [Fungible Token
Standard](/dapps/standards/fungible-tokens#fungible-token-standard),
it is also compatible with wallets, explorer and other services.

To make the token display properly in wallets and explorer, you can
also make a PR to add it to the [token
list](/dapps/standards/fungible-tokens#token-list).
