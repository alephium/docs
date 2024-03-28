---
sidebar_position: 25
title: Web3 SDK
sidebar_label: Web3 SDK
---

## Kurulum

```
npm install --save @alephium/web3
```

## Alephium'a bağlanma

`NodeProvider`, Alephium ağına bir bağlantı soyutlamasıdır, bir `NodeProvider` alabilirsiniz:

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
```

Veya tam düğüm yapılandırma dosyanızda alephium.api.api-key bulunuyorsa API_KEY'i belirtin:

```typescript
const API_KEY = // tam düğüm yapılandırma dosyanızdaki alephium.api.api-key
const nodeProvider = new NodeProvider('http://localhost:22973', API_KEY)
```

Bazen, projeniz için global bir NodeProvider kurmak uygun olabilir:

```typescript
web3.setCurrentNodeProvider(<nodeURL>)
```

## Blockchain Sorgulama

Bir `NodeProvider`'a sahip olduktan sonra, mevcut sözleşme durumunu sorgulamak, geçmiş sözleşme etkinliklerini almak, dağıtılmış sözleşmeleri aramak vb. gibi işlemler için kullanabileceğiniz bir blok zincirine bağlantınız olur.
'
```typescript
// Verilen zincir dizininden blok zincir yüksekliğini alın
await nodeProvider.blockflow.getBlockflowChainInfo({
  fromGroup: 0,
  toGroup: 0
})
// { currentHeight: 315 }

// Verilen blok özetinden bloğu alın
await nodeProvider.blockflow.getBlockflowBlocksBlockHash('1ccfe845988ebf878384dd2dc9e55920261566c2ad9143963180222059ffd3b0')
// {
//   hash: '1ccfe845988ebf878384dd2dc9e55920261566c2ad9143963180222059ffd3b0',
//   timestamp: 1665207807876,
//   chainFrom: 0,
//   chainTo: 0,
//   height: 315,
//   deps: [
//     '5e9209fbf2b4c656b136933684b8606382575f16795ddc7a6317c5d4b7e378c5',
//     'b5d69f03d4d0eea5a4c7e0bc0e2e8c5a8f99306050d641b599991b441ea0f9ea',
//     'f344b3dd45f39d62cfd200cfa3312c080018102908787c5565b8c8af3647368f',
//     'fa359ce0b5accb1584cd280ae3c32f210424a9fd32cb736b6cdfe64882651010',
//     '8bc7d94ddfc66129049862e501ff5d5042e1e978b1a51d28e238321444a91071',
//     '5896ee3cbc8c4f4432a0b221039113061b6cf7eeb794b25758d247120d0df712',
//     'fc312b0c04a0eeb0767ec98137b740047d7c5e8f64463531828b7015cbeaeaa3'
//   ],
//   transactions: [
//     {
//       unsigned: [Object],
//       scriptExecutionOk: true,
//       contractInputs: [],
//       generatedOutputs: [],
//       inputSignatures: [],
//       scriptSignatures: []
//     }
//   ],
//   nonce: '5da513de7183d7eb1a90b46c4ffe6f7ae4fdf012f0018f41',
//   version: 0,
//   depStateHash: '2edccc3e717d38a6564fb970f6714f0c00c074226b2cb1ee6272781d3c9bc870',
//   txsHash: '738e879791e0c164a5a12b658e2b37e65ed9c415c2e152656c8469273f775f5a',
//   target: '20ffffff'
// }

// İşlem durumunu alın
await nodeProvider.transactions.getTransactionsStatus({
  txId: 'f33da0d8f4c00d68e2d5818cb9617219a1108b801f387fc8d1595287e4dbf2aa'
})
// {
//   type: 'Confirmed',
//   blockHash: '47c95e02a7d7ca442ee1849d76a5987c7b72ddcad0b05e9f01df4bc4878f5980',
//   txIndex: 0,
//   chainConfirmations: 295,
//   fromGroupConfirmations: 295,
//   toGroupConfirmations: 295
// }

// Hesap bakiyesini al
await nodeProvider.addresses.getAddressesAddressBalance('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
// {
//   balance: '999972904436900000000000',
//   balanceHint: '999972.9044369 ALPH',
//   lockedBalance: '0',
//   lockedBalanceHint: '0 ALPH',
//   tokenBalances: [
//     {
//       id: 'ee682f8182f56b55a36a7f916a901685752e00d0e4b90de073e6658156ae82a9',
//       amount: '10000000000000000000'
//     }
//   ],
//   utxoNum: 1
// }
```

## Blokzinciri'ne Yazma

İşlemler, blokzincirinin durumunu değiştirmek için kullanılır. Her işlem, özel bir anahtar ile imzalanmalıdır ve bunu `SignerProvider`aracılığıyla yapabilirsiniz.`alephium/web3-wallet` iki `SignerProvider` bulunmaktadır.

### Web3 Cüzdanını Kurma

```
npm install --save @alephium/web3-wallet
```

:::note
Her iki cüzdan da sözleşme geliştirme ve dağıtımı için kullanılır, lütfen büyük miktarda jeton saklamak için kullanmayın.
:::

### NodeWallet

Tam bir düğüm cüzdanı oluşturmak için lütfen [rehberi](/wallet/node-wallet-guide) takip edin.

```typescript
// Cüzdan adı ile bir düğüm cüzdanı oluşturun
const nodeWallet = new NodeWallet('alephium-web3-test-only-wallet', nodeProvider)

// Şifre ile cüzdanı açın
await nodeWallet.unlock('alph')

// Hesapları alın
await nodeWallet.getAccounts()
// [
//   {
//     publicKey: '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0',
//     address: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
//     group: 0
//   }
// ]

// 1 ALPH'i 15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT adresine transfer edin
await nodeWallet.signAndSubmitTransferTx({
  signerAddress: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
  destinations: [{
    address: '15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT',
    attoAlphAmount: 10n ** 18n,
  }]
})
// {
//   txId: '7d11b0e88f0158cdd94fcf4e7af04a76be1101293a50050523f72422a9269f36',
//   fromGroup: 0,
//   toGroup: 0
// }

// Cüzdanı kilitleyin
await nodeWallet.lock()
```

### PrivateKeyWallet

```typescript
// Özel anahtar ile bir PrivateKeyWallet oluşturun
const wallet =  new PrivateKeyWallet({privateKey: 'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5', keyType: undefined, nodeProvider: web3.getCurrentNodeProvider()})

// Mnemonik ve grup ile bir PrivateKeyWallet oluşturun, burada hesap grubu 0'da bir hesap oluşturur
const wallet = PrivateKeyWallet.FromMnemonicWithGroup(
  'vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava',
  0,
  undefined,
  undefined,
  undefined,
  nodeProvider
)
console.log(wallet.account)
// {
//   address: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH',
//   publicKey: '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0',
//   group: 0
// }

// 1 ALPH'i 15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT adresine transfer edin
await wallet.signAndSubmitTransferTx({
  signerAddress: wallet.account.address,
  destinations: [{
    address: '15Z54erRksUHb7qxegcKN5DePMv96tXdc1jW26fW3REwT',
    attoAlphAmount: 10n ** 18n
  }]
})
// {
//   txId: '9a23eab3796a56f538a4574d617b667fb9187721c8df9f39ac89d878cb9755a0',
//   fromGroup: 0,
//   toGroup: 0
// }
```

## Sözleşmeler

Ethereum'a benzer şekilde, bir sözleşme, Alephium blokzincirinde yaşayan program kodu soyutlamasıdır. Bir proje oluşturmak için lütfen aşağıdaki örneği kullanarak bir sözleşmenin nasıl test edileceğini, dağıtılacağını ve çağrılacağını göstermeyi düşünün, lütfen bir proje oluşturmak için [rehberi](/dapps/getting-started) takip edin.

### Sözleşmeyi Test Etme
#### Birim testleri

SDK, sözleşmeyi normal bir işlem gibi çağıran birim test işlevselliği sağlar, ancak blokzincir durumunu değiştirmek yerine, yeni sözleşme durumunu, işlem çıktılarını ve olayları döndürür.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
// Projeyi ilk önce oluşturun
await Project.build()

// `withdraw` metodunu `TokenFaucet` sözleşmesinde test edin, bu, blokzinciri durumunu DEĞİŞTİRMEZ
const testContractAddress = randomContractAddress()
// `TokenFaucet` başlangıç ​​rehberinde oluşturulur
const result = await TokenFaucet.tests.withdraw({
  address: testContractAddress,
  // Test sözleşmesinin başlangıç durumu
  initialFields: {
    symbol: Buffer.from('TF', 'utf8').toString('hex'),
    name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
    decimals: 18n,
    supply: 10n ** 18n,
    balance: 10n
  },
  // Bir test öncesi test kontratının sahip olduğu varlıklar
  initialAsset: {
    alphAmount: 10n ** 18n,
    tokens: [{
      id: binToHex(contractIdFromAddress(testContractAddress)),
      amount: 10n
    }]
  },
  // Test kontratının hedef fonksiyonunu test etmek için kullanılan argümanlar
  testArgs: { amount: 1n },
  // Fonksiyon çağırıcısının sahip olduğu varlıklar
  inputAssets: [{
    address: wallet.account.address,
    asset: { alphAmount: 10n ** 18n }
  }]
})

const contractState = result.contracts[0] as TokenFaucetTypes.State
expect(contractState.address).toEqual(testContractAddress)
```

Tam bir örnek, [`alephium-nextjs-template`](https://github.com/alephium/nextjs-template/blob/main/test/unit/token.test.ts) dosyasında bulunabilir.

#### Entegrasyon testleri

Birim testlerin yanı sıra, bazı entegrasyon testlerini de çalıştırabilirsiniz, ancak bunların blok zinciri durumunu değiştirebileceğine dikkat edin.

```typescript
web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
await Project.build()

const accounts = signer.getAccounts()
const account = accounts[0]
const testAddress = account.address
await signer.setSelectedAccount(testAddress)
const testGroup = account.group

const deployed = deployments.getDeployedContractResult(testGroup, 'TokenFaucet')
const tokenId = deployed.contractInstance.contractId
const tokenAddress = deployed.contractInstance.address

const faucet = TokenFaucet.at(tokenAddress)
const initialState = await faucet.fetchState()
const initialBalance = initialState.fields.balance

// `withdraw` fonksiyonunu 10 kez çağır
for (let i = 0; i < 10; i++) {
  await Withdraw.execute(signer, {
    initialFields: { token: tokenId, amount: 1n },
    attoAlphAmount: DUST_AMOUNT * 2n
  })

  //!!! Blok zinciri durumu değişir !!!
  const newState = await faucet.fetchState()
  const newBalance = newState.fields.balance
  expect(newBalance).toEqual(initialBalance - BigInt(i) - 1n)
}
```

Daha fazla detay, [entegrasyon test klasörümüzde](https://github.com/alephium/nextjs-template/blob/integration-test/test/integration) bulunabilir.

### Sözleşmeyi dağıt

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
await Project.build()

// Sözleşmenin dağıtılması için bir işlem oluşturun ve işlemi Alephium ağına gönderin:
// Sözleşmede alanlar varsa `initialFields` gereklidir
// `initialAttoAlphMiktarı`, 1 ALPH'den büyük veya eşit olmalıdır, varlıklar işlem gönderen hesaptan sözleşmeye gönderilir
// `issueTokenMiktarı`, çıkarılacak jeton miktarını belirtir
const issueTokenAmount = 10n
const deployResult = await TokenFaucet.deploy(wallet, {
  initialFields: {
    symbol: Buffer.from('TF', 'utf8').toString('hex'),
    name: Buffer.from('TokenFaucet', 'utf8').toString('hex'),
    decimals: 18n,
    supply: issueTokenAmount,
    balance: issueTokenAmount
  },
  initialAttoAlphAmount: 10n ** 18n,
  issueTokenAmount: issueTokenAmount
})
console.log(JSON.stringify(deployResult, null, 2))
// {
//   "signature": "ea95754bae7935311acf15d3323293f03bce89bb6c82939427da5e3074f0ada93b0cda24138dcec1de4e21a1a66dc1f0c8e99297e6ff8fe10587d1821cbae23f",
//   "fromGroup": 0,
//   "toGroup": 0,
//   "unsignedTx": "000401010103000000091500bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a13c40de0b6b3a7640000a2144055050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f14160403025446030b546f6b656e4661756365740212020a140301020a130aae188000dfdfc1174876e8000137a444479fa782e8b88d4f95e28b3b2417e5bc30d33a5ae8486d4a8885b82b224259c1e6000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b000",
//   "gasAmount": 57311,
//   "gasPrice": "100000000000",
//   "txId": "c9adbbc02f34d2b3f2db8790354bca9f3d6f7a1fde9b9269a393d6693663c084",
//   "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//   "groupIndex": 0,
//   "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//   "instance": {
//     "address": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//     "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//     "groupIndex": 0
//   }
// }

// Sözleşme durumunu al
const tokenFaucet = deployResult.instance
const contractState = await tokenFaucet.fetchState()
console.log(JSON.stringify(contractState, null, 2))
// {
//   "address": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//   "contractId": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//   "bytecode": "050609121b4024402d404a010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302010000000102a0000201020101001116000e320c7bb4b11600aba00016002ba10005b416005f",
//   "initialStateHash": "236a82352f5e34f813ecf274385912ed0ba67f1c305c24f7a6934c18d32213b1",
//   "codeHash": "641343b4f1c08b03969b127b452acc7535cad20231bc32af6c0b5f218dd8ff0c",
//   "fields": {
//     "symbol": "5446",
//     "name": "546f6b656e466175636574",
//     "decimals": "18",
//     "supply": "10",
//     "balance": "10"
//   },
//   "fieldsSig": {
//     "names": [
//       "symbol",
//       "name",
//       "decimals",
//       "supply",
//       "balance"
//     ],
//     "types": [
//       "ByteVec",
//       "ByteVec",
//       "U256",
//       "U256",
//       "U256"
//     ],
//     "isMutable": [
//       false,
//       false,
//       false,
//       false,
//       true
//     ]
//   },
//   "asset": {
//     "alphAmount": "1000000000000000000",
//     "tokens": [
//       {
//         "id": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//         "amount": "10"
//       }
//     ]
//   }
// }
```

Çıktıdan görebileceğimiz gibi, sözleşmeyi başarıyla dağıttık ve sözleşme varlığında 10 jeton bulunmaktadır.

### Sözleşmeyi çağır

Alephium blok zincirindeki sözleşmeleri çağırmak için betikler kullanabilirsiniz, betik kodu, işlem Alephium ağına gönderildiğinde yürütülür, ancak betik kodu blok zincirinin durumuna kaydedilmez.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
const wallet = new PrivateKeyWallet('a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5')
await Project.build()

// Dağıtım sonucundan sözleşme adresi
const contractAddress = deployResult.instance.address

// Dağıtım sonucundan sözleşme kimliği
const contractId = deployResult.instance.contractId

// Bir sözleşme çağrısı işlemi oluşturun, betik alanları varsa `initialFields` gereklidir
// `Withdraw`, başlangıç kılavuzunda oluşturulur
const executeResult = await Withdraw.execute(wallet, {
  initialFields: {
    token: contractId,
    amount: 1n
  }
})
console.log(JSON.stringify(executeResult, null, 2))
// {
//   "signature": "16ec5eed788bfe7a803ec89f47d8ef7c1ac5f626ad88e4b46ecdde8be9fdef5719db49b09ef4e11a94901082e34c52629aafad4b9753483bf853ff695b19b9a4",
//   "fromGroup": 0,
//   "toGroup": 0,
//   "unsignedTx": "0004010101030000000513010d0c1440201581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c0001058000a447c1174876e8000137a44447f11525fe8e58af5a02b2f81bbbf35ea3c1bdf319ffe76794709c9e9d4e80c599000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b000",
//   "gasAmount": 42055,
//   "gasPrice": "100000000000",
//   "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
//   "groupIndex": 0
// }

// Hesap bakiyesini al
const balance = await wallet.nodeProvider.addresses.getAddressesAddressBalance(wallet.account.address)
console.log(JSON.stringify(balance, null, 2))
// {
//   "balance": "999998990063400000000000",
//   "balanceHint": "999998.9900634 ALPH",
//   "lockedBalance": "0",
//   "lockedBalanceHint": "0 ALPH",
//   "tokenBalances": [
//     {
//       "id": "1581cc793fc7bafce6ef89eaf66404c9eec17561ef0e169ef2a4329c9f190c00",
//       "amount": "1"
//     }
//   ],
//   "utxoNum": 2
// }
```

### Geçmiş sözleşme etkinliklerini sorgula

Sözleşme etkinlikleri, sözleşme adresleri tarafından belirli bir ofsetle dizinlenir ve bir sözleşme adresinin geçmiş etkinliklerini ofset ve limit (isteğe bağlı) belirterek sorgulayabilirsiniz.

```typescript
const nodeProvider = new NodeProvider('http://localhost:22973')
// Sözleşme dağıtım sonucundan sözleşme adresi
const contractAddress = deployResult.instance.address

// Sözleşme etkinliklerini indeks 0'dan sorgula ve `limit` 100'den büyük olamaz
const result = await nodeProvider.events.getEventsContractContractaddress(
  contractAddress, {start: 0, limit: 100}
)

// Sonraki sorguda `result.nextStart` ile başlayabilirsiniz
console.log(JSON.stringify(result, null, 2))
// {
//   "events": [
//     {
//       "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//       "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
//       "eventIndex": 0,
//       "fields": [
//         {
//           "type": "Address",
//           "value": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"
//         },
//         {
//           "type": "U256",
//           "value": "1"
//         }
//       ]
//     }
//   ],
//   "nextStart": 1
// }

// Bazı durumlarda, blok yeniden düzenleme nedeniyle ana zincirde olmayan bloklardan etkinlikler yayımlanabilir, bloğun ana zincirde olup olmadığını kontrol edebilirsiniz
await nodeProvider.blockflow.getBlockflowIsBlockInMainChain({blockHash: events[0].blockHash})
// true

// Geçerli sözleşme etkinlik sayaçını alın
await nodeProvider.events.getEventsContractContractaddressCurrentCount(contractAddress)
// 1

// Ayrıca, `alephium.node.event-log.index-by-tx-id` tam düğüm yapılandırma dosyanızda etkinleştirilmişse, işlem kimliği ile etkinlikleri de alabilirsiniz
await nodeProvider.events.getEventsTxIdTxid('c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617')
// {
//   "events": [
//     {
//       "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//       "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//       "eventIndex": 0,
//       "fields": [
//         {
//           "type": "Address",
//           "value": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"
//         },
//         {
//           "type": "U256",
//           "value": "1"
//         }
//       ]
//     }
//   ]
// }
```

### Etkinliklere dinleme

Tek tek sorgulamaya ek olarak, etkinlik aboneliği ile etkinlikleri de alabilirsiniz. Yeni etkinlikleri periyodik olarak sorgulayacak ve alacak.

```typescript
web3.setCurrentNodeProvider('http://localhost:22973')
// Dağıtım sonucundan `TokenFaucet` sözleşme örneği
const tokenFaucet = deployResult.instance
// `TokenFaucetTypes.WithdrawEvent` dağıtım kılavuzunda oluşturulur
const events: TokenFaucetTypes.WithdrawEvent[] = []
const subscribeOptions = {
  // Her `pollingInterval` zaman diliminde tam düğümden yeni etkinlikleri kontrol edecektir
  pollingInterval: 500,
  // Her etkinlik için geri çağrı işlevi çağrılacaktır
  messageCallback: (event: TokenFaucetTypes.WithdrawEvent): Promise<void> => {
    events.push(event)
    return Promise.resolve()
  },
  // Bir hata oluştuğunda bu geri çağrı işlevi çağrılacaktır
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
}

// Sözleşme etkinliklerini indeks 0'dan abone olun
const subscription = tokenFaucet.subscribeWithdrawEvent(subscribeOptions, 0)
await new Promise((resolve) => setTimeout(resolve, 1000))
console.log(JSON.stringify(events, null, 2))
// [
//   {
//     "contractAddress": "v8uU9yLfzUwqpJeS9Kd76DB75WJBcEuMdYgEQ2Gn8pLF",
//     "blockHash": "0c07e672c40629a5c943cc7e4ec677140cbd50fdc9dcacb6a1d30bc38c0e7b50",
//     "txId": "c29e9cb10b3e0b34979b9daac73151d98ee4de8f913e66aa0f0c8dc0cb99a617",
//     "eventIndex": 0,
//     "name": "Withdraw",
//     "fields": {
//       "to": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
//       "amount": "1"
//     }
//   }
// ]

// Aboneliği iptal edin
subscription.unsubscribe()
```

## Araçlar

### Sözleşme kimliği ile sözleşme adresi arasında dönüşüm

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
const contractAddress = addressFromContractId(contractId)
console.log(binToHex(contractIdFromAddress(contractAddress)) === contractId)
// true
```

### Adresin grubunu alın

```typescript
const group = groupOfAddress('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
console.log(group)
// 0
```

### Alt sözleşme kimliğini alın

```typescript
const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
console.log(subContractId(contractId, '00'))
// 303483cfe0eaead281879233f884e8b64c2ecf26e368ccd4b05b2b5bda87ec3d
```
