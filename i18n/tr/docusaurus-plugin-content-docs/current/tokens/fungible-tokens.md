---
sidebar_position: 20
title: Takas edilebilir Jetonlar
sidebar_label: Takas edilebilir Jetonlar
---

### Takas edilebilir Jetonl Standardı

Alephium'da, yeni jetonlar yeni sözleşmeler yayımlandığında oluşturulabilir. Yeni oluşturulan jetonun kimliği, onu yayınlayan sözleşmenin kimliğiyle aynıdır. Bu konuda ayrıntılı bilgi için [bu kılavuzu](/dapps/build-dapp-from-scratch) inceleyebilirsiniz.

Jetonlar genellikle `ad`, `ondalık`, `toplamArz` gibi bilgilerle ilişkilendirilir. Jeton standardının amacı, jeton yayımlama sözleşmesine kısıtlamalar getirerek dApp'lerin ve cüzdanların jeton türlerini kolayca çıkarmasını ve jeton bilgilerini almasını sağlamaktır.

Standart [değiştirilebilir jeton arayüzü](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral), jetonun `sembol`, `ad`, `ondalık` ve `toplamArz` bilgilerini almak için yöntemler tanımlar. Ayrıca, `@std` belirteci ile `#0001` kimliğiyle işaretlenmiştir:

```rust
// Değiştirilebilir jetonlar için standart arayüz
@std(id = #0001)
Interface IFungibleToken {
  pub fn getSymbol() -> ByteVec
  pub fn getName() -> ByteVec
  pub fn getDecimals() -> U256
  pub fn getTotalSupply() -> U256
}

// `IFungibleToken` arayüzünü uygulayan bir `TokenFaucet` sözleşmesi
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

Bir jeton sözleşmesi, yukarıdaki gibi
[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
arayüzünü uyguladığında, SDK'nın bilgileri standart bir şekilde almasını sağlar:

```typescript
// SDK'yı yöntemleri ayrı ayrı çağırmak için kullanın
const getDecimalResult = await tokenFaucet.methods.getDecimals()
const getTotalSupplyResult = await tokenFaucet.methods.getTotalSupply()
const getNameResult = await tokenFaucet.methods.getName()
console.log("TokenFaucet adı, ondalık, toplamArz", getNameResult.returns, getDecimalResult.returns, getTotalSupplyResult.returns)

// SDK'yı aynı anda birden çok yöntemi çağırmak için kullanın
const multicallResult = await tokenFaucet.multicall({
  getDecimals: {},
  getTotalSupply: {},
  getName: {},
})
console.log("TokenFaucet adı, ondalık, toplamArz", multicallResult.getName.returns, multicallResult.getDecimal.returns, multicallResult.getTotalSupply.returns)
```

Aslında, SDK, bir değiştirilebilir jeton için tüm meta verileri almak için kanonik bir yol sağlar.

```typescript
const metadata = await web3.getCurrentNodeProvider().fetchFungibleTokenMetaData(tokenFaucet.contractId)
console.log("TokenFaucet adı, ondalık, toplamArz", metadata.name, metadata.decimals, metadata.totalSupply)
```

[IFungibleToken](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral)
, bir jetonun türünü tahmin etmek için de SDK'ya olanak tanır, böylece dApp'ler ve cüzdanlar onları ilgili şekilde işleyebilir:

```typescript
// Jeton türünü tahmin edin
const tokenType = await web3.getCurrentNodeProvider().guessStdTokenType(tokenFaucet.contractId)
expect(tokenType).toEqual('fungible')

// Jeton arayüz kimliğini tahmin edin
const tokenInterfaceId = await web3.getCurrentNodeProvider().guessStdInterfaceId(tokenFaucet.contractId)
expect(tokenInterfaceId).toEqual('0001')
```

Çalışan ve daha kapsamlı bir örnek için, lütfen
[nextjs-template](https://github.com/alephium/nextjs-template) deposuna göz atın.

### Cüzdan Desteği

Hem [Masaüstü Cüzdanı](/wallet/desktop-wallet/overview) hem [Uzantı
Cüzdanı](/wallet/extension-wallet/overview), değiştirilebilir jetonlar için doğal destek sağlar.

Aşağıda, uzantı cüzdanı kullanarak `PACA` jetonunu görüntüleme ve transfer etme örneği bulunmaktadır:

\`\`\`jsx
<img src={require("./media/transfer-alphpaca-1.png").default} alt="Jeton Genel Bakışı" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-2.png").default} alt="Jeton Gönderme" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-3.png").default} alt="İmzala Tx" width="250" />
\`\`\`

### Jeton Listesi

Temel bilgilerin yanı sıra `ad`, `sembol` ve
`ondalık` gibi diğer metaverileri içerir. Değiştirilebilir jetonlar genellikle dApp'lerin ve cüzdanların bunları düzgün bir şekilde göstermesi için `açıklama` ve `logoURI` gibi diğer metaverileri içerir.

[Jeton listesi](https://github.com/alephium/token-list), Alephium ekosistemindeki tanınmış jetonların kimlik ve metaverileri için bir güven kaynağı olmayı amaçlar, böylece cüzdanlar ve dApp'ler kullanıcıları doğrulanmamış jetonlar konusunda uyarabilir. İşte uzantı cüzdanının bir jetonu eklenmeden önce ve sonra nasıl görüntülediği:

\`\`\`jsx
<img src={require("./media/unverified-token.png").default} alt="Doğrulanmamış" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/verified-token.png").default} alt="Doğrulanmış" width="250"/>
\`\`\`

Şu anda, jeton metaverilerini jeton listesine eklemek için bir pull isteği gereklidir.
