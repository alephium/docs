---
sidebar_position: 20
title: Fungible Tokens
sidebar_label: Fungible Tokens
---

### 
Fungible Token Standard

In Alephium können neue Tokens ausgegeben werden, wenn neue Verträge 
bereitgestellt werden. Die ID des neu ausgegebenen Tokens ist dieselbe 
wie die ID des Contracts, der es ausgibt. Sie können sich an diese
[Anleitung](/dapps/build-dapp-from-scratch) wenden, um Details darüber 
zu erfahren, wie Sie auf Alephium von Grund auf neue Tokens ausgeben können.

Tokens sind in der Regel mit Informationen wie
`name`, `decimals`, `totalSupply` usw. verbunden. Das Ziel des Token-Standards 
ist es, Einschränkungen für den Token-ausgebenden Contract festzulegen, damit es 
für dApps und Wallets einfacher wird, Token-Typen zu erschließen und 
Token-Informationen abzurufen.

Die Standard [fungible-Token-Interface](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral) definiert Methoden zum Abrufen des `name`, `symbol`, `decimals` sowie des
`totalSupply` des Tokens. Sie ist auch mit der `@std`-Annotation mit der ID `#0001` versehen:

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

Sobald ein Token-Contract die
[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)-Schnittstelle implementiert, wie der oben gezeigte `TokenFaucet`-Contract, ermöglicht es dem SDK, 
Informationen auf eine standardisierte Weise abzurufen:

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

Tatsächlich bietet das SDK eine kanonische Möglichkeit, alle Metadaten für ein fungibles Token abzurufen.

```typescript
const metadata = await web3.getCurrentNodeProvider().fetchFungibleTokenMetaData(tokenFaucet.contractId)
console.log("TokenFaucet name, decimals, totalSupply", metadata.name, metadata.decimals, metadata.totalSupply)
```

[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
ermöglicht es dem SDK auch, den Typ eines Tokens zu erraten, 
damit dApps und Wallets diese entsprechend behandeln können:

```typescript
// Guess token type
const tokenType = await web3.getCurrentNodeProvider().guessStdTokenType(tokenFaucet.contractId)
expect(tokenType).toEqual('fungible')

// Guess token interface id
const tokenInterfaceId = await web3.getCurrentNodeProvider().guessStdInterfaceId(tokenFaucet.contractId)
expect(tokenInterfaceId).toEqual('0001')
```

Für ein funktionierendes und vollständigeres Beispiel werfen Sie bitte 
einen Blick auf das [NextJS-Template](https://github.com/alephium/nextjs-template)-Repository.

### Wallet Unterstützung

Sowohl die [Desktop Wallet](/wallet/desktop-wallet/overview) als auch 
die [Extension Wallet](/wallet/extension-wallet/overview) unterstützen 
fungible Tokens nativ.

Nachfolgend ein Beispiel für die Anzeige und Übertragung des `PACA` Tokens mit der Extension-Wallet:

<img src={require("./media/transfer-alphpaca-1.png").default} alt="Token Overview" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-2.png").default} alt="Send Token" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-3.png").default} alt="Sign Tx" width="250" />

### Token-Liste

Neben den grundlegenden Informationen wie `name`, `symbol` und
`decimals` usw., enthalten fungible Tokens in der Regel auch andere Metadaten 
wie `description` und `logoURI` , damit dApps und Wallets Sie ordnungsgemäß 
anzeigen können.

Das Ziel der [Token-Liste](https://github.com/alephium/token-list)
ist es, eine Vertrauensquelle für die Token-ID und die Metadaten der 
bekannten Tokens im Alephium-Ökosystem zu sein, damit Wallets und 
dApps Benutzer vor nicht verifizierten Tokens warnen können. Hier sehen 
Sie, wie die Erweiterungsbrieftasche ein Token vor und nachdem es zur 
Token-Liste hinzugefügt wurde, anzeigt.

<img src={require("./media/unverified-token.png").default} alt="Unverified" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/verified-token.png").default} alt="Verified" width="250"/>

Derzeit ist ein Pull Request erforderlich, um die Token-Metadaten zur Token-Liste hinzuzufügen.