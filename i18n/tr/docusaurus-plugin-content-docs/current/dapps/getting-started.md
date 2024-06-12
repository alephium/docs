---
sidebar_position: 5
title: Başlarken
sidebar_label: Başlarken
---

## Genel Bakış

Alephium, dApp'lerinizi oluşturmanıza yardımcı olmak için çeşitli araçlar ve paketler önermektedir.

Bu kılavuz, önerilen kurulumumuzu yüklemenize yardımcı olacaktır.

Önkoşullar:

- Kodu [TypeScript](https://www.typescriptlang.org/) ile yazın
- [Terminal](https://en.wikipedia.org/wiki/Terminal_emulator) ile çalışın
- Yüklü [nodejs](https://nodejs.org/en/) sürümü >= 16
- `npm` sürümü >= 8 yüklü

:::info
`npm` ve `npx` ile yavaşlık yaşarsanız, `bun` ve `bunx`'e bir şans vermek düşünülebilir.
:::

## Yeni bir dApp projesi oluşturun

Öğretici projesini oluşturmak için yeni bir terminal açın ve şunu çalıştırın:

```
npx @alephium/cli@latest init alephium-tutorial
```


Bu, `alephium-tutorial` adında yeni bir dizin oluşturacak ve bu dizin içine örnek bir proje başlatacaktır.

## Yerel geliştirme ağını başlatın

Kontratlarınızı derlemek ve test etmek için yerel bir geliştirme ağı başlatmak gereklidir ve bir geliştirme ağı başlatmak için [bu kılavuzu](/full-node/devnet) takip edebilirsiniz.

Yeni ağınız, [bu yapılandırmayı](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf) ve test amaçları için yeterli ALPH'ye sahip 4 grup ile oluşturulmuştur.

Daha sonra, TypeScript SDK, REST uçları aracılığıyla ağla etkileşim kurabilir.

## Kontratınızı derleyin

Sonraki adımda, çalışma alanını öğretici projesine değiştirin:

```
cd alephium-tutorial
```


`contracts/` klasörüne bir göz atın, `token.ral` ve `withdraw.ral` dosyalarını bulabilirsiniz:

<details>
<summary>token.ral</summary>
<p>

```rust
import "std/fungible_token_interface"

// `TokenFaucet` adında bir kontrat tanımlar.
// Bir kontrat, alanları (durumu) ve fonksiyonları içeren bir koleksiyondur.
// Dağıtıldıktan sonra, bir kontrat, Alephium blok zincirinde belirli bir adreste bulunur.
// Kontrat alanları kalıcı olarak kontrat depolamasında saklanır.
// Bir kontrat, dağıtımında bir başlangıç ​​miktarı jeton çıkarabilir.
Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {

    // Etkinlikler, blok zincirindeki faaliyetleri günlüğe kaydetmek için kullanılır.
    // Alephium istemcileri, kontrat durum değişikliklerine tepki vermek için etkinlikleri dinleyebilir.
    event Withdraw(to: Address, amount: U256)

    enum ErrorCodes {
        InvalidWithdrawAmount = 0
    }

    // Kontratın tokeninin başlangıç ​​arzını döndüren genel bir fonksiyon.
    // Alanın, çıkarılan token miktarı olarak başlatılması gerektiğini unutmayın.
    pub fn getTotalSupply() -> U256 {
        return supply
    }

    // Tokenin sembolünü döndüren genel bir fonksiyon.
    pub fn getSymbol() -> ByteVec {
        return symbol
    }

    // Tokenin adını döndüren genel bir fonksiyon.
    pub fn getName() -> ByteVec {
        return name
    }

    // Tokenin ondalık sayılarını döndüren genel bir fonksiyon.
    pub fn getDecimals() -> U256 {
        return decimals
    }

    // Kontratın mevcut bakiyesini döndüren genel bir fonksiyon.
    pub fn balance() -> U256 {
        return balance
    }

    // Kendisini çağıran herkese tokenleri aktaran genel bir fonksiyon.
    // Bu fonksiyon, kontrat alanlarını değiştirdiği için `updateFields = true` ile işaretlenmiştir.
    // İşlev, kontrat varlıklarını kullandığı için contract assets olarak işaretlenmiştir.
    @using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn withdraw(amount: U256) -> () {
        // Hata analizi için Hata ayıklama etkinlikleri yararlı olabilir
        emit Debug(`Mevcut bakiye ${balance}`)

        // Miktarın geçerli olduğundan emin olun
        assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
        // '!' ile biten işlevler yerleşik işlevlerdir.
        transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
        // Ralph'da taşma olmaz.
        balance = balance - amount

        // Önceden tanımlanmış etkinliği yayar
        emit Withdraw(callerAddress!(), amount)
    }
}
```

</p></details>

<details>
<summary>withdraw.ral</summary>
<p>

```rust
// Bir işlem betiği tanımlar.
// Bir işlem betiği, blok zincirindeki kontratlarla etkileşim için bir kod parçasıdır.
// İşlem betikleri genelde işlemlerin giriş varlıklarını kullanabilir.
// Bir betik tek kullanımlıktır ve sadece bir kez işlem ile birlikte yürütülür.
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    // token kontratının çekme işlevini çağırır.
    token.withdraw(amount)
}
```

</p></details>

Kontratlarınızı derlemek için şunu çalıştırın:

```
npx @alephium/cli@latest compile
```

Derlenmiş artefaktlar `artifacts` dizinindedir.

Bu komut ayrıca derlenmiş artefaklara dayalı olarak TypeScript kodu oluşturur. Oluşturulan TypeScript kodu `artifacts/ts`dizinindedir. Oluşturulan TypeScript kodunu kullanarak Alephium blok zinciriyle daha pratik bir şekilde etkileşim kurabilirsiniz.

## Kontratınızı test edin

Örnek proje, kontratınız için `test/unit/token.test.ts` adlı testlerle birlikte gelir:

<details>
<summary>token.test.ts</summary>
<p>

```typescript
import { web3, Project, TestContractParams, addressFromContractId, AssetOutput, DUST_AMOUNT } from '@alephium/web3'
import { expectAssertionError, randomContractId, testAddress, testNodeWallet } from '@alephium/web3-test'
import { deployToDevnet } from '@alephium/cli'
import { TokenFaucet, TokenFaucetTypes, Withdraw } from '../artifacts/ts'

describe('unit tests', () => {
  let testContractId: string
  let testTokenId: string
  let testContractAddress: string
  let testParamsFixture: TestContractParams<TokenFaucetTypes.Fields, { amount: bigint }>

  // We initialize the fixture variables before all tests
  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')
    await Project.build()
    testContractId = randomContractId()
    testTokenId = testContractId
    testContractAddress = addressFromContractId(testContractId)
    testParamsFixture = {
      // a random address that the test contract resides in the tests
      address: testContractAddress,
      // assets owned by the test contract before a test
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testTokenId, amount: 10n }] },
      // initial state of the test contract
      initialFields: {
        symbol: Buffer.from('TF', 'utf8').toString('hex'),
        name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
        decimals: 18n,
        supply: 10n ** 18n,
        balance: 10n
      },
      // arguments to test the target function of the test contract
      testArgs: { amount: 1n },
      // assets owned by the caller of the function
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }
  })
  //See more test in `test/unit/token.test.ts`
})
```

</p></details>

Bu testleri şu şekilde çalıştırabilirsiniz:

```
npm run test
```

veya

```
npx @alephium/cli@latest test
```

## Kontratınızı dağıtın

Şimdi, kontratı dağıtmak için Alephium CLI ve bir dağıtım betiği olan `scripts/0_deploy_faucet.ts` kullanacağız:

<details>
<summary>0_deploy_faucet.ts</summary>
<p>

```typescript
import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenFaucet } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings
  const issueTokenAmount = network.settings.issueTokenAmount
  const result = await deployer.deployContract(TokenFaucet, {
    // The amount of token to be issued
    issueTokenAmount: issueTokenAmount,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('TF', 'utf8').toString('hex'),
      name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Token faucet contract id: ' + result.contractInstance.contractId)
  console.log('Token faucet contract address: ' + result.contractInstance.address)
}

export default deployFaucet
```

</p></details>

Bunu kullanarak şunu çalıştırabilirsiniz:

```
npx @alephium/cli@latest deploy
```

Bu, token musluğunu devnet'in 0. grubuna dağıtacaktır. Testnet'te (veya başka bir ağda) dağıtmak için `alephium.config.ts` dosyanızı güncelleyin ve `--network` seçeneğini kullanın:

```
npx @alephium/cli@latest deploy --network testnet
```

## Dağıtılan kontratla etkileşime geçin

Şimdi,  `src/token.ts`dosyasını oluşturabilirsiniz:

<details>
<summary>token.ts</summary>
<p>

```typescript
import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, Project } from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import configuration from '../alephium.config'
import { TokenFaucet, Withdraw } from '../artifacts/ts'

async function withdraw() {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')
  // Compile the contracts of the project if they are not compiled
  Project.build()

  // Attention: test wallet is used for demonstration purpose
  const signer = await testNodeWallet()

  const deployments = await Deployments.load(configuration, 'devnet')

  // The test wallet has four accounts with one in each address group
  // The wallet calls withdraw function for all of the address groups
  for (const account of await signer.getAccounts()) {
    // Set an active account to prepare and sign transactions
    await signer.setSelectedAccount(account.address)
    const accountGroup = account.group

    // Load the metadata of the deployed contract in the right group
    const deployed = deployments.getDeployedContractResult(accountGroup, 'TokenFaucet')
    if (deployed === undefined) {
      console.log(`The contract is not deployed on group ${account.group}`)
      continue
    }
    const tokenId = deployed.contractInstance.contractId
    const tokenAddress = deployed.contractInstance.address

    // Submit a transaction to use the transaction script
    await Withdraw.execute(signer, {
      initialFields: { token: tokenId, amount: 1n },
      attoAlphAmount: DUST_AMOUNT
    })

    const faucet = TokenFaucet.at(tokenAddress)
    // Fetch the latest state of the token contract
    const state = await faucet.fetchState()
    console.log(JSON.stringify(state.fields, null, '  '))
  }
}

withdraw()

```

</p></details>

Sadece şunu çalıştırın:

```
npm run build
```

ve dağıtılan token musluğu ile etkileşime geçin:

```
node dist/src/token.js
```

## Cüzdanlara bağlanın

dApp'ler, dApp kullanıcılarının kimlik doğrulaması yapmasını ve Alephium blok zinciriyle etkileşimde bulunmasını sağlamak için cüzdan entegrasyonu gerektirir,
örneğin işlem imzalama. Şu anda dApp'ler hem [Extension Wallet](../wallet/extension-wallet/dapp) hem de [WalletConnect](../wallet/walletconnect) ile entegre edilebilir. Daha fazla ayrıntı için ilgili sayfalara başvurun.

## Daha fazlasını öğrenin

- Ekosistem hakkında daha fazla bilgi edinmek için lütfen [ekosistem genel bakışına](/dapps/ecosystem) gidin.
- Web3 SDK hakkında daha fazla bilgi edinmek için lütfen [web3 SDK kılavuzuna](/dapps/alephium-web3) gidin.
- Ralph dili hakkında daha fazla bilgi edinmek için lütfen [Ralph kılavuzuna](/ralph/getting-started) gidin.
- Bir Nextjs dApp'in nasıl oluşturulacağını öğrenmek için lütfen [Nextjs ile dApp oluşturma](/dapps/build-dapp-with-nextjs.md) sayfasına gidin.
