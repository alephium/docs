---
sidebar_position: 20
title: Fungible Tokens
sidebar_label: Fungible Tokens
---

### Fungible Token Standard

In Alephium, new tokens can be issued when deploying new
contracts. The id of the newly issued token is the same as the id of
the contract that issues it.

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
@using(methodSelector = false)
Interface IFungibleToken {
  pub fn getSymbol() -> ByteVec
  pub fn getName() -> ByteVec
  pub fn getDecimals() -> U256
  pub fn getTotalSupply() -> U256
}
```

### Token List

Other than the basic information such as `name`, `symbol` and
`decimals`, etc. Fungible tokens usually contain other metadata such
as `description` and `logoURI` so that dApps and wallets can properly
display them.

The goal of the [token list](https://github.com/alephium/token-list)
is to serve as a platform for token issuers to submit token metadata
for proper display in wallets, explorers, and other ecosystem
interfaces. Here is how extension wallet displays a token before and
after it is added into the token list.

<img src={require("/img/unknown-token.png").default} alt="Unknown" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("/img/verified-token.png").default} alt="Verified" width="250"/>

Currently, a pull request is needed to add the token metadata to token
list.

:::caution
The token list serves as a platform for token issuers to submit token
metadata for proper display in wallets, explorers, and other ecosystem
interfaces. Entries are verified solely against required metadata
formats. No due diligence or verification is performed on token
issuers or associated projects. It is imperative to conduct your own
research before engaging with any token. Inclusion on this list does
not imply an endorsement, audit or any form of verification from
Alephium's core contributors.
:::

### Wallet Support

Official [wallets](/wallet) and explorer have native support for
fungible tokens.

Following is an example of displaying and transfering the `PACA` token
using extesion wallet:

<img src={require("/img/transfer-alphpaca-1.png").default} alt="Token Overview" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("/img/transfer-alphpaca-2.png").default} alt="Send Token" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("/img/transfer-alphpaca-3.png").default} alt="Sign Tx" width="250" />
