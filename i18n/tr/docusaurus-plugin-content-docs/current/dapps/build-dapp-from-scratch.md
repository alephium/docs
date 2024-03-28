---
sidebar_position: 15
title: Sıfırdan dApp Oluşturma
sidebar_label: Sıfırdan dApp Oluşturma
---

Bu kılavuz, bir Alephium dApp projesi oluşturmanın temellerini keşfedecektir.

Ön koşullar:

- [TypeScript](https://www.typescriptlang.org/) dilinde kod yazabilme
- Bir [terminal](https://en.wikipedia.org/wiki/Terminal_emulator) kullanabilme
- Kurulu olan [nodejs](https://nodejs.org/en/) sürümü 16 veya daha yüksek olmalıdır
- `npm` sürümü 8 veya daha yüksek olmalıdır

## Yeni bir dApp projesi oluşturun: Token Musluğu

Bu öğreticide ilk dApp'ımızı yazacağız: Bir token musluğu.

Buradaki kodlar, [başlangıç sayfamızdan](/dapps/getting-started) alınmıştır, ancak bu kılavuzu nasıl oluşturduğumuzu adım adım göreceğiz.

Yeni bir proje klasörü oluşturun ve içine gidin:

```sh
mkdir alephium-faucet-tuto
cd alephium-faucet-tuto
```

Şimdi tüm sözleşmelerimizi saklayacağımız bir `contracts` klasörü oluşturalım:

```sh
mkdir contracts
```

İlk sözleşmemiz `token.ral` olacak ve [burada](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral). bulunabilir. Tüm dosyayı `contracts` klasörünüze kopyalayabilirsiniz.

Şimdi, parça parça inceleyelim:

```rust
import "std/fungible_token_interface"

Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {
```

İlk dört alan, [IFungibleToken Arayüzümüze](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/fungible_token_interface.ral) hizmet etmek için gereken verileri saklayan değişmez değerler olacaktır.

`mut balance`, bu muslukta kaç jetonun kaldığını takip eden değişken bir değerdir.

Sözleşmemizin bir `event` yayınladığını ve bir `error`kodu tanımladığını görebilirsiniz. Daha fazla bilgi için [etkinlikler](https://wiki.alephium.org/ralph/getting-started#events) ve [hata işleme](https://wiki.alephium.org/ralph/getting-started#error-handling) hakkındaki bilgilere bakın.

Bu, farklı sözleşme argümanları için 5 erişim yöntemiyle takip edilir.

Büyünün gerçekleştiği son yöntem:

```rust
@using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
pub fn withdraw(amount: U256) -> () {
    // Hata analizi için Hata Ayıklama etkinlikleri yararlı olabilir
    emit Debug(`The current balance is ${balance}`)

    // Miktarın geçerli olduğundan emin olun
    assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
    // `!` ile sonlanan işlevler yerleşik işlevlerdir.
    transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
    // Ralph negatif değerlere izin vermez.
    balance = balance - amount

    // Daha önce tanımladığımız etkinliği yayınlayın.
    emit Withdraw(callerAddress!(), amount)
}
```

`assert!` ile aynı anda 2'den fazla jeton alan olmamasını sağlarız.  
`transferTokenFromSelf`, jetonların gerçek transferini gerçekleştirir.  
`mut balance` alanını yeni bakiye ile güncelliyoruz. Negatif durumda bir hata oluşur ve işlem gerçekleşmez.
`callerAddress!()` ve `selfTokenId!()` yerleşik işlevlerdir, bunlar hakkında daha fazla bilgiyi [yerleşik işlevler sayfamızda](/ralph/built-in-functions) bulabilirsiniz.
## Sözleşmenizi derleyin

Derleyicinin sözleşmeyi derlemek için tam düğümle iletişime geçmesi gerekir, [geliştirme ağınızı oluştururken](/full-node/devnet) tanımlanan doğru bilgileri kullanmanız gerekir. Henüz başlatmadıysanız, şimdi zamanıdır.
Düğüm URL'sini aşağıdaki yapılandırma dosyası kullanarak tanımlıyoruz: `alephium.config.ts`. 
Bu dosyayı projenizin kök dizininde oluşturun ve aşağıdaki kodu yapıştırın:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      // İki değerin, geliştirme ağınızda bulunan değerlerle eşleştiğinden emin olun
      nodeUrl: 'http://localhost:22973',
      networkId: 2
    }
  }
}

export default configuration
```

Şimdi derleyelim:

```sh
npx @alephium/cli@latest compile
```

Muhtemelen en son  `@alephium/cli` paketini yüklemek için bir onay isteyecektir. Devam etmek için evet'i seçin.

Yukarıdaki komut başarılı olduğunda, `artifacts` adında yeni bir klasör oluşturulduğunu fark edeceksiniz. Bu klasör, sözleşmenize ilişkin birkaç dosyayı içerir. Örneğin,  `artifacts/ts/TokenFaucet.ts` , `at`, `fetchState`, `call*`, gibi birçok yardımcı işlev üretir, ayrıca birçok test işlevini içerir.

## Sözleşmenizi test edin
SDK, bir işlem göndererek sözleşmeyi çağıran birim test işlevselliği sağlar, ancak blok zinciri durumunu değiştirmek yerine, yeni sözleşme durumu, işlem çıktıları ve etkinlikleri döndürür.

Test çerçevesini yükleyin:

```sh
npm install ts-jest @types/jest
```

Ayrıca `@alephium/web3` paketimize de ihtiyacınız olacak:

```sh
npm install @alephium/web3 @alephium/web3-test
```

Bir `test` klasörü oluşturun:

```sh
mkdir test
```

ve aşağıdaki içeriğe sahip `test/token.test.ts` adında minimal test dosyasını oluşturun:

```typescript
import { web3, Project, addressFromContractId } from '@alephium/web3'
import { randomContractId, testAddress } from '@alephium/web3-test'
import { TokenFaucet } from '../artifacts/ts'

describe('unit tests', () => {
  it('TokenFaucet\'ten 1 jeton çeker', async () => {

    // Doğru ana bilgisayarı ve bağlantı noktasını kullanın
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()

    const testContractId = randomContractId()
    const testParams = {
      // test kontratının bulunduğu rastgele bir adres
      address: addressFromContractId(testContractId),
      // bir testin öncesinde test kontratına ait varlıklar
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testContractId, amount: 10n }] },
      // test kontratının başlangıç durumu
      initialFields: {
        symbol: Buffer.from('TF', 'utf8').toString('hex'),
        name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 10n ** 18n,
        balance: 10n
      },
      // test kontratının hedef işlevini test etmek için argümanlar
      testArgs: { amount: 1n },
      // işlevi çağrılayanın sahip olduğu varlıklar
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }

    const testResult = await TokenFaucet.tests.withdraw(testParams)
    console.log(testResult)
  })
})
```

Daha karmaşık bir test, projemizdeki [şablonda](https://github.com/alephium/nextjs-template/blob/main/test/unit/token.test.ts) bulunabilir.

Ayrıntılara fazla girmeden, TypeScript'in testi çalıştırabilmesi için bazı yapılandırmalara ihtiyacı vardır, bu yüzden projenizin kök dizininde `tsconfig.json` adında bir dosya oluşturun ve aşağıdaki gibi içeriğe sahip olduğundan emin olun:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "target": "es2020",
    "esModuleInterop": true,
    "module": "commonjs",
    "resolveJsonModule": true
  },
  "exclude": ["node_modules"],
  "include": ["src/**/*.ts", "test/**/*.ts", "scripts/**/*.ts", "alephium.config.ts", "artifacts/**/*.ts"]
}
```

Şimdi testleri çalıştırın:

```sh
npx @alephium/cli@latest test
```

Çekme yöntemini çağırarak terminalinizde çıktıyı görebilmelisiniz.

🎉 Tebrikler! İlk sözleşmenizi oluşturdunuz ve onu çağırmak ve yerel olarak test etmek için bir test yazdınız! Artık sözleşmenizi dağıtma zamanı geldi.

## Sözleşmenizi Dağıtın

Şimdi işler ciddiye biniyor, sözleşmemizi `devnet`imize dağıtacağız :rocket:

`deploy` komutu, `scripts` klasörü içinde bulduğu tüm dağıtım betiklerini yürütür. Projemizin kök klasöründe `scripts` klasörünü oluşturun:

```sh
mkdir scripts
```

 `scripts` klasörüne `0_deploy_faucet.ts` adında bir dağıtım betik dosyası oluşturalım ve aşağıdaki kodu yapıştıralım.
Unutmayın ki dağıtım betikleri her zaman sayılarla başlamalıdır (`0`dan başlayarak).

```typescript
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenFaucet } from '../artifacts/ts'

// Bu dağıtım fonksiyonu, cli dağıtım aracı tarafından otomatik olarak çağrılacaktır
// Dağıtım betiklerinin numaralandırılması gerektiğini unutmayın (0'dan başlayarak)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
  const issueTokenAmount = 100n
  const result = await deployer.deployContract(TokenFaucet, {
    // Verilecek token miktarı
    issueTokenAmount: issueTokenAmount,
    // Musluk sözleşmesinin başlangıç durumları
    initialFields: {
      symbol: Buffer.from('TF', 'utf8').toString('hex'),
      name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token musluk sözleşme kimliği: ' + result.contractInstance.contractId)
  console.log('Token musluk sözleşme adresi: ' + result.contractInstance.address)
}

export default deployFaucet
```

Deployer'ın [deployContract](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L133-L137) fonksiyonu, sözleşmemizi doğru argümanlarla dağıtır. Dağıtımı belirli bir adla etiketlemek için bir `taskTag` argümanı da ekleyebilirsiniz. Varsayılan olarak, sözleşme adını kullanacaktır, ancak aynı sözleşmeyi farklı başlangıç alanlarıyla birden çok kez dağıtırsanız, `.deployment` dosyanız geçersiz kılınır. Belirli bir `taskTag` kullanarak bu sorunu çözebilirsiniz.

[DeployContractParams](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/web3/src/contract/contract.ts#L1286-L1293) arayüzünden, `initialFields`'in zorunlu olduğunu görebiliriz, çünkü bu, `TokenFaucet` sözleşmemizin argümanlarını içerir.

`issueTokenAmount` ile kaç token ihraç etmek istediğinizi belirleyebilirsiniz, bu bir token oluşturmak istiyorsanız gereklidir, aksi takdirde token-id oluşturulmayacaktır.

Şimdi, dağıtım yapalım!

```sh
npx @alephium/cli@latest deploy
```

...HATA... Çalışmıyor mu???

Eğer `The node chain id x is different from configured chain id y` hatası alıyorsanız, `networkId`'nizi devnet yapılandırmanızda ve `alephium.config.ts` dosyanızda kontrol edin.

`No UTXO found` ???

Tabii ki `how-to-use-my-utxos`'u sağlamadık, [privateKeys](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L39-L46) alanımızı tanımlamamız gerekiyor.

Cüzdan uzantımızdan özel anahtarları ihraç etmeniz gerekecek (daha sonra diğer cüzdanlarımızdan yapabiliriz), bir fon içeren bir cüzdanı kullanmaya dikkat edin, örneğin devnet'inizdeki genesis tahsisinden birinin cüzdanını kullanın. 
Devnetinizi başlatmak için docker yoluyla başlattıysanız, kullandığımız cli paketimize [varsayılan özel anahtar](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L75) tanımlıyoruz.

Hadi `alephium.config.ts` dosyamızı güncelleyelim

```typescript
const configuration: Configuration<void> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2,
      //The private key of my genesis address 132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh
      privateKeys: ['672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559']
    }
  }
}
```

:::caution
Gerçek uygulamalar, `privateKeys` gibi hassas ayarlar için ortam değişkenleri veya benzer teknikleri kullanmalıdır.
Özel anahtarlarınızı kaynak kontrolüne göndermeyin.
:::

ve tekrar dağıtılmaya çalışalım:

```sh
npx @alephium/cli@latest deploy
```

```sh
Contracts are compiled already. Loading them from folder "artifacts"
Deploying contract TokenFaucet
Deployer - group 1 - 132mqFF2BuxGigdaMTGSruuW29kmEs2eEGcpquG4YZRNh
Token faucet contract id: d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301
Token faucet contract address: 28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA
✅ Deployment scripts executed!
```

Tebrikler! Sözleşmeniz dağıtıldı. Sözleşmenin bakiyesini kontrol edebiliriz. `curl` kullanarak ve çıkışı deployma sonucunuza göre değiştirerek sözleşme adresini kullanın:

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/balance'
```

Yanıt şuna benzer olmalıdır:

```json
{
  "balance": "1000000000000000000",
  "balanceHint": "1 ALPH",
  "lockedBalance": "0",
  "lockedBalanceHint": "0 ALPH",
  "tokenBalances": [
    {
      "id": "d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301",
      "amount": "100"
    }
  ],
  "utxoNum": 1
}
```

Oluşturmak istediğimiz 100 token ile token kimliğimizi görebiliriz.

Şimdi, sözleşme durumunu kontrol edelim, önce adres grubumuzu alalım: 

```sh
curl 'http://localhost:22973/addresses/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/group'
curl 'http://localhost:22973/contracts/28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA/state?group=1'
```


Sözleşme durumu yanıtı:
```json
{
  "address": "28h7qSmkAAeNyoBuQKGyp1WG8VfdKPePCCFGKwp2Y8yyA",
  "bytecode": "050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f",
  "codeHash": "641343b4f1c08b03969b127b452acc7535cad20231bc32af6c0b5f218dd8ff0c",
  "initialStateHash": "06595afa695949e915dfc1220dfb47125b01751d9e193f4c5fa1c7fc3566673d",
  "immFields": [
    {
      "type": "ByteVec",
      "value": "5446"
    },
    {
      "type": "ByteVec",
      "value": "546f6b656e466175636574"
    },
    {
      "type": "U256",
      "value": "18"
    },
    {
      "type": "U256",
      "value": "100"
    }
  ],
  "mutFields": [
    {
      "type": "U256",
      "value": "100"
    }
  ],
  "asset": {
    "attoAlphAmount": "1000000000000000000",
    "tokens": [
      {
        "id": "d00e9c788ddd572b0c186f0599a264f4c79f009c632c8040b7c5f71bfc0ec301",
        "amount": "100"
      }
    ]
  }
}
```

`immFields` içinde başlangıçtaki `TokenFaucet` argümanlarımızı (`symbol`, `name`, `decimals`, `supply`) görebiliriz. Ayrıca `mutFields`'in mevcut token bakiyesini içerdiğini görebiliriz. Musluğu çağırdıktan sonra o alanı kontrol edeceğiz.

`deploy` komutu ayrıca `.deployments.devnet.json` dosyası oluşturdu, dağıtım sonucuyla. Bu dosyayı sözleşmeyle kolayca etkileşime girmek için saklamak önemlidir, ancak tüm bilgiler blok zincirinde bulunabilir.

# Dağıtılmış sözleşme ile etkileşime geçin

Bir token musluğuna sahip olmak güzel, ondan token almak daha da iyidir.

Artık musluk sözleşmesiyle etkileşim kurmak için birkaç kod yazabiliriz.

`cli` paketimizi ve `typescript` bağımlılığını kurmamız gerekecek:

```
npm install @alephium/cli typescript
```

Artık blok zinciriyle etkileşim kurmanın farklı bir yolu var. Daha önce `scripts/<number>_*` dosyalarımızla `DeployFunction`'ı kullanıyorduk, bu dosyalar CLI aracıyla otomatik olarak dağıtılıyordu.

Başka bir yol, TypeScript kullanarak bir skelet web uygulama projesi oluşturmaktır. Projemizin kök klasöründe `src` klasörü ve içinde `tokens.ts` adında bir dosya oluşturun ve aşağıdaki içeriği yapıştırın.

```typescript
import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, Project, NodeProvider } from '@alephium/web3'
import { PrivateKeyWallet} from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {

  //Select our network defined in alephium.config.ts
  const network = configuration.networks.devnet

  //NodeProvider is an abstraction of a connection to the Alephium network
  const nodeProvider = new NodeProvider(network.nodeUrl)

  //Sometimes, it's convenient to setup a global NodeProvider for your project:
  web3.setCurrentNodeProvider(nodeProvider)

  //Connect our wallet, typically in a real application you would connect your web-extension or desktop wallet
  const wallet = new PrivateKeyWallet({privateKey: '672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559' })

  // Compile the contracts of the project if they are not compiled
  Project.build()

  //.deployments contains the info of our `TokenFaucet` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.from('.deployments.devnet.json')

  //Make sure it match your address group
  const accountGroup = 1

  const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')

  if(deployed !== undefined) {
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Submit a transaction to use the transaction script
    // It uses our `wallet` to sing the transaction.
    await Withdraw.execute(wallet, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
    })

    // Fetch the latest state of the token contract, `mut balance` should have change
    const faucet = TokenFaucet.at(tokenAddress)
    const state = await faucet.fetchState()
    console.log(state.fields)

    // Fetch wallet balance see if token is there
    const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
    console.log(balance)
  } else {
    console.log('`deployed` is undefined')
  }
}

// Let's perform one withdraw
withdraw()
```

Dikkatli insanlar için, `artifacts`'tan yeni bir şey göreceksiniz: [`Withdraw`](https://github.com/alephium/nextjs-template/blob/main/contracts/withdraw.ral), `TokenFaucet` sözleşmesiyle etkileşimde kullanılması gereken bir [`TxScript`](https://wiki.alephium.org/ralph/getting-started#txscript). Kodu oldukça basit. `contracts` klasöründe `withdraw.ral` adında bir dosya oluşturun ve aşağıdaki kodu yapıştırın:


```rust
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    token.withdraw(amount)
}
```

Şimdi, sözleşmelerimizi derlememiz gerekiyor ve `Withdraw` için sanatı almak için:

```sh
npx @alephium/cli@latest compile
```

Artık TypeScript kodunu JavaScript'e derleyebilirsiniz:

```sh
npx tsc --build .
```

HATA, `alephium.config.ts`'den gelen bir hata almalısınız, şimdiye kadar yapılandırma basit bir JSON olarak kullanıldı, ancak şimdi `TypeScript` onun [arayüzünü](https://github.com/alephium/alephium-web3/blob/d2b5b63cae015e843aa77b4cf484bc62a070f1d5/packages/cli/src/types.ts#L48-L62)ne saygı göstermesini istiyor. Özellikle `networks`, 3 `NetworkType` içeren bir kayıt olmalıdır. Kendiniz düzeltmeyi deneyebilir veya `alephium.config.ts` dosyanızı aşağıdaki gibi güncelleyebilirsiniz:

```typescript
import { Configuration } from '@alephium/cli'

export type Settings = {}

const configuration: Configuration<Settings> = {
  defaultNetwork: 'devnet',
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 2, //Use the same as in your devnet configuration
      privateKeys: ['672c8292041176c9056bb0dd1d91d34711ceed2493b5afc83f2012b27df2c559'],
      settings: {}
    },
    testnet: {
      nodeUrl: '',
      privateKeys: [],
      settings: {}
    },
    mainnet: {
      nodeUrl: '',
      privateKeys: [],
      settings: {}
    }
  }
}

export default configuration
```

Şimdi tekrar derleyin

```
npx tsc --build .
```

Bir `dist` klasörü oluşturulmuş olmalı, devam edin ve dağıtılmış jeton musluğu ile etkileşime girin:

```
node dist/src/token.js
```

Artık oluşturduğunuz token'ın gururlu sahibi olmalısınız.


## Bundan Sonra Ne Var?

Token musluğu öğreticisinin daha karmaşık bir örneğini [alephium/nextjs-template](https://github.com/alephium/nextjs-template) projesinde bulabilirsiniz.

## Cüzdanlara Bağlanın

dApp, dApp kullanıcılarının, Alephium blok zinciriyle kimlik doğrulaması yapmak ve etkileşimde bulunmak gibi işlemleri imzalamak için cüzdan entegrasyonunu gerektirir. Şu anda dApp'ler hem [Uzantı Cüzdanı](../wallet/extension-wallet/dapp) hem de [WalletConnect](../wallet/walletconnect) ile entegre edilebilir. Daha fazla ayrıntı için ilgili sayfalara başvurun.

## Daha Fazla Bilgi

- Ekosistem hakkında daha fazla bilgi edinmek için lütfen [ekosistem genel bakışına](/dapps/ecosystem) göz atın.
- Web3 SDK hakkında daha fazla bilgi edinmek için lütfen [web3 SDK kılavuzuna](/dapps/alephium-web3) göz atın.
- Ralph dili hakkında daha fazla bilgi edinmek için lütfen [Ralph kılavuzuna](/ralph/getting-started) göz atın.
- Bir Nextjs dApp nasıl oluşturulur, lütfen [Nextjs ile dApp oluşturma](/dapps/build-dapp-with-nextjs.md) sayfasına göz atın.