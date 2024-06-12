---
sidebar_position: 40
title: dApp'ler için Uzantı Cüzdanı
sidebar_label: dApp entegrasyonu
---

Alephium uzantı cüzdanı, kullanıcının etkileşimde bulunduğu dApp'lere
`window.alephiumProviders.alephium` global bir nesne enjekte eder. dApp'ler,
bu nesneyi kullanarak kullanıcıyı doğrulayabilir, kullanıcı hesabını
isteyebilir ve Alephium blockchain ile iletişim kurabilir, örneğin kullanıcı
bakiyesini alabilir, sözleşme durumunu alabilir ve işlemler gönderebilir, vb.

### Temel Kurulum

`window.alephiumProviders.alephium` nesnesini algılamak için
[@alephium/get-extension-wallet](https://www.npmjs.com/package/@alephium/get-extension-wallet)
paketini kullanmanızı öneririz.

```
npm install --save @alephium/get-extension-wallet
```

Aşağıdaki kod, TypeScript kullanarak uzantı cüzdanına nasıl bağlanılacağını göstermektedir:

```ts
import { getDefaultAlephiumWallet } from "@alephium/get-extension-wallet"

async function tryConnect() {
  // Returns the `window.alephiumProviders.alephium` object after user selects
  // the extension wallet.
  const windowAlephium = await getDefaultAlephiumWallet()
  // Authenticate user to the current dApp, return the selected account
  const selectedAccount = await windowAlephium?.enable()

  if (windowAlephium && selectedAccount) {
    // From here, you can execute various transactions:
    //
    // windowAlephium.signAndSubmitTransferTx(...)
    // windowAlephium.signAndSubmitDeployContractTx(...)
    // windowAlephium.signAndSubmitExecuteScriptTx(...)
    // ...
  }
}
```

`windowAlephium?.enable()` yöntemi çağrıldığında, kullanıcılardan mevcut dApp'e bağlanmaları istenecektir:

<img src={require("./media/connect-dapp.png").default} alt="Connect dApp" width="250" />

Kullanıcı "Bağlan" düğmesine tıkladıktan sonra, dApp kullanıcının uzantı cüzdanıyla bağlantı kurar.

### Web3 React

React ile oluşturulan dApp'ler için,
[@alephium/web3-react](https://www.npmjs.com/package/@alephium/web3-react)
uzantı cüzdanı dahil olmak üzere cüzdanları kullanarak dApp'lere kimlik doğrulaması yapmanın daha kolay bir yolunu sunar.

```
npm install --save @alephium/web3-react
```

Aşağıda basit bir örnek verilmiştir:

```typescript
const App = () => {
  return (
    <AlephiumWalletProvider useTheme="retro">
      /* Your App */
      <AlephiumConnectButton />
    </AlephiumWalletProvider>
  );
```

Bu, dApp'inize `retro` dahili temalı bir düğme yerleştirecektir. Kullanıcı düğmeye tıkladığında, bir açılır pencere görüntülenir ve kullanıcıdan bir cüzdan seçmesi istenir:

<img src={require("./media/connect-dapp-2.png").default} alt="Connect dApp Web3 React" />

Kullanıcı `Extension Wallet` seçerse, kullanıcı tekrar mevcut dApp'e bağlanması için uyarılır. Kullanıcı `Bağlan` düğmesine tıkladıktan sonra, dApp kullanıcının uzantı cüzdanıyla bağlantı kurulur.

Daha çalışan ve daha kapsamlı bir örnek için
[nextjs-template](https://github.com/alephium/nextjs-template) deposuna başvurun.

### İşlemleri İmzalama

`windowAlephium` nesnesi, işlem imzalamak için aşağıdaki yöntemleri sunan
[InteractiveSignerProvider](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/signer/signer.ts#L80)'ı uygular:

```ts
abstract signAndSubmitTransferTx(params: SignTransferTxParams): Promise<SignTransferTxResult>
abstract signAndSubmitDeployContractTx(params: SignDeployContractTxParams): Promise<SignDeployContractTxResult>
abstract signAndSubmitExecuteScriptTx(params: SignExecuteScriptTxParams): Promise<SignExecuteScriptTxResult>
abstract signAndSubmitUnsignedTx(params: SignUnsignedTxParams): Promise<SignUnsignedTxResult>
abstract signUnsignedTx(params: SignUnsignedTxParams): Promise<SignUnsignedTxResult>
// İmzalanmadan önce mesaj 'Alephium İmzalı Mesaj: ' ile öne eklenir
// böylece elde edilen imza, işlem oluşturmak için yeniden kullanılamaz.
abstract signMessage(params: SignMessageParams): Promise<SignMessageResult>
```

Herhangi bir bu yöntem çalıştırıldığında, uzantı cüzdanı işlem türüne bağlı olarak gerekli bilgileri sağlayacak ve kullanıcıdan imza isteyecektir.

Aşağıda, bir token transferi için bir işlem örneği verilmiştir: Kullanıcı, `Salary` hesabından `Saving` hesabına `2` `TokenFaucet` token transfer ediyor.

<img src={require("./media/transaction-signing-transfer.png").default} alt="Transaction Signing Transfer" width="250" />

Kullanıcı `İmzala` düğmesine tıkladıktan sonra, işlem uzantı cüzdanı tarafından imzalanacak ve Alephium blockchain'e gönderilecektir.
