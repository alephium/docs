sidebar_position: 10
title: Nextjs ile dApp Oluşturma
sidebar_label: Nextjs ile dApp Oluşturma
---

Bu, [başlangıç rehberinin](/dapps/getting-started.md) bir devamıdır. Bu rehberin sonunda, [başlangıç rehberinde](/dapps/getting-started.md) tartışılan jeton musluğu akıllı sözleşmeleriyle etkileşim kurabilen basit bir [Nextjs](https://nextjs.org/) dApp oluşturabilmeniz gerekmektedir.

Önkoşullar:

- [Typescript](https://www.typescriptlang.org/) ve [Nextjs](https://nextjs.org/) hakkında temel anlayış
- Makinenize [npm](https://www.npmjs.com/) ve [npx](https://www.npmjs.com/package/npx) kurulu olmalıdır.
- [Başlangıç rehberinde](/dapps/getting-started.md) jeton musluğu öğretici projesine aşina olun.
- [Uzantı Cüzdanını](/wallet/extension-wallet/overview) yükleyin
- Docker ve docker-compose yükleyin

## Nextjs şablonunu kullanarak bir dApp projesi oluşturun

```sh
npx @alephium/cli@latest init alephium-nextjs-tutorial --template nextjs
```

Bu, yeni bir dizin olan `alephium-nextjs-tutorial` oluşturur ve bu dizin içinde örnek bir Nextjs projesi başlatır.

## Yerel geliştirme ağı başlatın

`alephium-nextjs-tutorial/docker` dizinine gidin ve şunu çalıştırın

```sh
cd alephium-nextjs-tutorial/docker
docker-compose up -d
```

TBu, hem Alephium tam düğümünü hem de [explorer arka ucu](https://github.com/alephium/explorer-backend)'nu `devnet` üzerinde başlatacaktır. Uzantı cüzdanının çalışması için Explorer arka ucu gereklidir.

Şimdi [sözleşmenizi derleyebilir](/dapps/getting-started.md#sözleşmenizi-derleme), [test edebilir](/dapps/getting-started.md#sözleşmenizi-test-etme) ve [dağıtabilirsiniz](/dapps/getting-started.md#sözleşmenizi-dağıtma) jeton musluğu sözleşmelerinizi, [başlangıç rehberinde](/dapps/getting-started.md) açıklandığı gibi.

Bir sonraki adıma geçmeden önce sözleşmenin dağıtıldığından emin olun.


```sh
npx @alephium/cli@latest deploy
```

## Nextjs dApp ile jeton musluğuyla etkileşim

Proje kök dizinine gidin ve şunu çalıştırın

```sh
npm install
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın ve jeton musluğu uygulamasını görün.

<img src={require("./media/nextjs-template-connect.png").default}
alt="Connect button" width="300"/>

Yukarıda gösterildiği gibi, jeton musluğu dApp, bir cüzdanla bağlanmadan önce `Alephium'a Bağlan` düğmesini gösterir. Düğmeyi tıklayın ve uzantı cüzdanını açmak için `Uzantı Cüzdanı` seçeneğini seçin. `WalletConnect` yakında desteklenecek.

<img src={require("./media/nextjs-template-open-connect.png").default} alt="Landing page" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/nextjs-template-connect-click-extensonwallet.png").default} alt="Create wallet" width="250" />

Uzantı cüzdanının onay ekranını inceleyin ve `Bağlan`'ı tıklayın, jeton musluğu dApp, uzantı cüzdanına bağlanacaktır. 


<img src={require("./media/nextjs-template-connected.png").default} alt="Landing page" width="520"/>

Çekilecek jeton miktarını girin (maksimum 2) ve `Bana Jeton Gönder` düğmesini tıklayın. İşlem ayrıntılarını inceleyin ve `Onayla`yı tıklayın.

<img src={require("./media/nextjs-template-send-token.png").default} alt="Landing page" width="520"/>

Tebrikler, jeton musluğundan hesabınıza bazı jetonlar aktardınız!

## Uygulama

[nextjs şablonunun](https://github.com/alephium/nextjs-template) amacı, bir Nextjs uygulamasından Alephium blok zinciriyle nasıl etkileşim kurulacağını göstermektir.

Kimlik doğrulaması, [alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react) bileşeni kullanılarak birkaç satırda yapılabilir:

```tsx
<AlephiumWalletProvider>
  <AlephiumConnectButton />
  // Your logic
</AlephiumWalletProvider>
```
`<AlephiumWalletProvider>`, bir [context](https://reactjs.org/docs/context.html) oluşturur ve uygulamanın bileşen ağacı boyunca iletilir. Context, Alephium blok zinciriyle etkileşim kurmak için gerekli olan [SignerProvider](https://github.com/alephium/alephium-web3/blob/8cf20fee4c16091cf581518e9f411e31ec37955e/packages/web3-react/src/contexts/alephiumConnect.tsx#L56) 'i içerir.

Kullanıcı cüzdanla bağlandıktan sonra, [@alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react) tarafından sağlanan bir dizi react hooks kullanarak Alephium blok zinciriyle etkileşime geçebiliriz. Örneğin, [şu anki bağlı cüzdanı](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useWallet.tsx), [bakiyeyi](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useBalance.tsx) ve [işlem durumunu](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useTxStatus.tsx) almak gibi.

Bir kullanıcı işlem yaptığında, `updateBalanceForTx` kullanarak kullanıcının bakiyesini güncelleyebilirsiniz. İşte basit bir örnek:

```typescript
// The useBalance hook returns two values:
// 1. balance: the current balance
// 2. updateBalanceForTx: used to update the balance when the user makes a transaction.
const { balance, updateBalanceForTx } = useBalance()

const withdrawCallback = useCallback(async () => {
  const result = await withdraw(...)
  updateBalanceForTx(result.txId)
}, [updateBalanceForTx])
```

Daha fazla uygulama ayrıntısı için, lütfen [koda](https://github.com/alephium/nextjs-template) bakın.

## Daha Fazla Bilgi

- Nextjs şablonu test ağına dağıtılmış ve [buradan](https://alephium.github.io/nextjs-template/) erişilebilir.
- Ekosistem hakkında daha fazla bilgi edinmek için lütfen [ekosistem genel bakışına](/dapps/ecosystem) göz atın.
- Web3 SDK hakkında daha fazla bilgi edinmek için lütfen [web3 SDK kılavuzuna](/dapps/alephium-web3) göz atın.
- Ralph dili hakkında daha fazla bilgi edinmek için lütfen [Ralph kılavuzuna](/ralph/getting-started) göz atın.
