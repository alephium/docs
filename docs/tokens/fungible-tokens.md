---
sidebar_position: 20
title: Fungible Tokens
sidebar_label: Fungible Tokens
---

### Fungible Token Standard

In Alephium, new tokens can be issued when deploying new
contracts. The id of the newly issued token is the same as the id of
the contract that issues it. You can refer to this
[guide](/dapps/build-dapp-from-scratch) for details about how to issue
tokens on Alephium from scratch.

Tokens are usually associated with information such as
`name`, `decimals`, `totalSupply`, etc. The goal of the token standard is
to put constraints on token-issuing contract so it becomes easier for
dApps and wallets to infer token types and fetch token information.

The standard [fungible token
interface](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
defines methods to get the `name`, `symbol`, `decimals` as well as the
`totalSupply` of the token. It is also annotated with the `@std`
annotation with the id `#0001`:

```rust
// Standard interface for fungible tokens
@std(id = #0001)
Interface IFungibleToken {
  pub fn getSymbol() -> ByteVec
  pub fn getName() -> ByteVec
  pub fn getDecimals() -> U256
  pub fn getTotalSupply() -> U256
}

// A `TokenFaucet` contract that implements the `IFungibleToken` interface
Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256
) implements IFungibleToken {
    pub fn getTotalSupply() -> U256 {
        return supply
    }

    pub fn getSymbol() -> ByteVec {
        return symbol
    }

    pub fn getName() -> ByteVec {
        return name
    }

    pub fn getDecimals() -> U256 {
        return decimals
    }
}
```

Once a token contract implements
[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
interface, like the `TokenFaucet` contract shown above, it enables SDK
to get information in a standard way:

```typescript
// Use SDK to call methods individually
const getDecimalResult = await tokenFaucet.methods.getDecimals()
const getTotalSupplyResult = await tokenFaucet.methods.getTotalSupply()
const getNameResult = await tokenFaucet.methods.getName()
console.log("TokenFaucet name, decimals, totalSupply", getNameResult.returns, getDecimalResult.returns, getTotalSupplyResult.returns)

// Use SDK to call all multiple methods at the same time
const multicallResult = await tokenFaucet.multicall({
  getDecimals: {},
  getTotalSupply: {},
  getName: {},
})
console.log("TokenFaucet name, decimals, totalSupply", multicallResult.getName.returns, multicallResult.getDecimal.returns, multicallResult.getTotalSupply.returns)
```

In fact, SDK provides a canonical way to fetch all metadata for a fungible token.

```typescript
const metadata = await web3.getCurrentNodeProvider().fetchFungibleTokenMetaData(tokenFaucet.contractId)
console.log("TokenFaucet name, decimals, totalSupply", metadata.name, metadata.decimals, metadata.totalSupply)
```

[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
also enables SDK to guess the type of a token, so that dApps and
wallets can handle them respectively:

```typescript
// Guess token type
const tokenType = await web3.getCurrentNodeProvider().guessStdTokenType(tokenFaucet.contractId)
expect(tokenType).toEqual('fungible')

// Guess token interface id
const tokenInterfaceId = await web3.getCurrentNodeProvider().guessStdInterfaceId(tokenFaucet.contractId)
expect(tokenInterfaceId).toEqual('0001')
```

For a working and more complete example, please take a look at the
[nextjs-template](https://github.com/alephium/nextjs-template) repository.

### Wallet Support

Both [Desktop Wallet](/wallet/desktop-wallet/overview) and [Extension
Wallet](/wallet/extension-wallet/overview) have native support for
fungible tokens.

Following is an example of displaying and transfering the `PACA` token
using extesion wallet:

<img src={require("./media/transfer-alphpaca-1.png").default} alt="Token Overview" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-2.png").default} alt="Send Token" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-3.png").default} alt="Sign Tx" width="250" />

### Token List

Other than the basic information such as `name`, `symbol` and
`decimals`, etc. Fungible tokens usually contain other metadata such
as `description` and `logoURI` so that dApps and wallets can properly
display them.

The goal of the [token list](https://github.com/alephium/token-list)
is to be a source of trust for token id and metadata of the well known
tokens in the Alephium ecosystem, so wallets and dApps can warn users
for the unverified tokens. Here is how extension wallet displays a
token before and after it is added into the token list.

<img src={require("./media/unverified-token.png").default} alt="Unverified" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/verified-token.png").default} alt="Verified" width="250"/>

Currently, a pull request is needed to add the token metadata to token
list.
