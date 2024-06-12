---
sidebar_position: 40
title: Borsa
sidebar_label: Borsa
---

Alephium'in SDK'sı ile entegrasyon prototipi: [https://github.com/alephium/alephium-web3/blob/master/test/exchange.test.ts](https://github.com/alephium/alephium-web3/blob/master/test/exchange.test.ts)

Bu kılavuz, bir kripto para birimi borsasının Alephium'u entegre etmek için gereken temel API'ler ve bilgileri açıklar.

## Başlarken

### Yerel geliştirme ağı

Alephium'u entegre etmek için bir borsanın bir tam düğüm çalıştırması gerekir. Ayrıca, hata ayıklama ve ek dizinleme için explorer-backend de çalıştırılabilir.

Explorer desteği ile yerel bir geliştirme ağı oluşturmak için, [alephium-stack](https://github.com/alephium/alephium-stack#devnet) deposundaki talimatları izleyin. Başlatıldıktan sonra, Swagger UI, tam düğüm ve explorer backend için API arabirimine erişilebilir.

* Tam düğüm Swagger UI'sı: [http://127.0.0.1:22973/docs](http://127.0.0.1:22973/docs)
* Explorer backend Swagger UI'sı: [http://127.0.0.1:9090/docs](http://127.0.0.1:9090/docs)
* Explorer ön ucu: [http://localhost:23000](http://localhost:23000)

### API'ler

Kılavuzu kısa tutmak için, ilgili API sorguları, Swagger UI ekran görüntüleri yerine belgelerde sağlanacaktır.

[web3 SDK](https://github.com/alephium/alephium-web3#packages), hem [tam düğüm](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/api/api-alephium.ts) için hem de [explorer backend](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/api/api-explorer.ts) için oluşturulmuş TypeScript API'lerini içerir.

### Test cüzdanı

:::caution
Düğüm cüzdanı, tam düğümün API'lerini test etmek içindir. Yatırım yapmak için sıcak cüzdanlar için test cüzdanları oluşturmak için [cüzdan oluşturma](exchange#wallet-generation) kısmına bakın.
:::

Aşağıdaki API'yi çalıştırarak test cüzdanını kurtaralım. Test cüzdanı için adres `1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH` adresi için 1 milyon ALPH'e sahiptir.

```shell
curl -X 'PUT' \
  'http://127.0.0.1:22973/wallets' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "password": "test",
  "mnemonic": "vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava",
  "walletName": "test"
}'

# Response
# {
#   "walletName": "test"
# }
```

Adresin genel anahtarını sorgulayarak başlayalım:

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/wallets/test/addresses/1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH' \
  -H 'accept: application/json'

# Response
# {
#   "address": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
#   "publicKey": "0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0",
#   "group": 0,
#   "path": "m/44'/1234'/0'/0/0"
# }
```

## İşlem API'leri

### Bir işlem oluşturma

`1.23 ALPH`'yi `1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3` adresine göndermek için bir işlem oluşturalım.

```shell
# `fromPublicKey` is the public key of the wallet address

curl -X 'POST' \
  'http://127.0.0.1:22973/transactions/build' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0",
  "destinations": [
    {
      "address": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3",
      "attoAlphAmount": "1230000000000000000"
    }
  ]
}'

# Response:
# {
#   "unsignedTx": "00040080004e20c1174876e8000137a444479fa782e8b88d4f95e28b3b2417e5bc30d33a5ae8486d4a8885b82b224259c1e6000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b002c41111d67bb1bb000000a3cd757be03c7dac8d48bf79e2a7d6e735e018a9c054b99138c7b29738c437ec00000000000000000000c6d3c20ab5db74a5b8000000bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a00000000000000000000",
#   "gasAmount": 20000,
#   "gasPrice": "100000000000",
#   "txId": "a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617",
#   "fromGroup": 0,
#   "toGroup": 1
# }
```

### Bir işlemi imzalama

İşlem kimliğini imzalayalım:

```shell
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/test/sign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": "a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617"
}'

# Response
# {
#   "signature": "78a607ec26165b5a63d7e30a0c85657e8a0fe3b7efccdba78166e51b52c32c9020f921e0a29b6a436ec330c3b3eb2222ee851e718e3504b1a70d73ba45cd503c"
# }
```

### Bir işlem gönderme

İşlemi ağa gönderelim:

```shell
# `unsignedTx` is from the response of transaction building
# `signature` is from the response of transaction signing

curl -X 'POST' \
  'http://127.0.0.1:22973/transactions/submit' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "unsignedTx": "00040080004e20c1174876e8000137a444479fa782e8b88d4f95e28b3b2417e5bc30d33a5ae8486d4a8885b82b224259c1e6000381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b002c41111d67bb1bb000000a3cd757be03c7dac8d48bf79e2a7d6e735e018a9c054b99138c7b29738c437ec00000000000000000000c6d3c20ab5db74a5b8000000bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a00000000000000000000",
  "signature": "78a607ec26165b5a63d7e30a0c85657e8a0fe3b7efccdba78166e51b52c32c9020f921e0a29b6a436ec330c3b3eb2222ee851e718e3504b1a70d73ba45cd503c"
}'

# Response
# {
#   "txId": "a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617",
#   "fromGroup": 0,
#   "toGroup": 1
# }
```

## Blok API'leri

### İşlem Kimliği ile Blok Anahtarı Al

Onaylanmış bir işlemin blok anahtarını almak için, tam düğüm API'sini kullanabilirsiniz:

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/transactions/status?txId=a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617' \
  -H 'accept: application/json'

# Response
# {
#   "type": "Confirmed",
#   "blockHash": "1d616d33a7aadc3cf49f5db1cc484b22a642140673f66020c13dc7648b9382d1",
#   "txIndex": 0,
#   "chainConfirmations": 1,
#   "fromGroupConfirmations": 1,
#   "toGroupConfirmations": 0
# }
```

### Blok anahtarı ile blok al

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/blockflow/blocks-with-events/ecbc7a3115eb0da1f82902db226b80950e861ef8cbb6623ed02fc42a6eeb69cb' \
  -H 'accept: application/json'

# Response
# {
#   "block": {
#     "hash": "ecbc7a3115eb0da1f82902db226b80950e861ef8cbb6623ed02fc42a6eeb69cb",
#     "timestamp": 1231006505000,
#     "chainFrom": 2,
#     "chainTo": 3,
#     "height": 0,
#     ...
#   },
#   "events": []
# }
```

### Bloklar için polling

Alephium'da, bir dizi zincirde birden fazla zincirin aynı anda farklı yüksekliklerde çalıştığı bir parçalı blok zinciri olduğu için belirli bir zaman aralığı için tüm blokları alabilirsiniz.

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/blockflow/blocks?fromTs=0&toTs=30' \
  -H 'accept: application/json'

# Response: there are 16 chains, therefore 16 lists of block hashes
# {
#   "blocks": [
#     [],
#     ...
#     []
#   ]
# }
```

Bu uç nokta kullanılarak her zincir için blokları alabilirsiniz:
```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/blockflow/chain-info?fromGroup=2&toGroup=3' \
  -H 'accept: application/json'

# Response
# {
#   "currentHeight": 0
# }

curl -X 'GET' \
  'http://127.0.0.1:22973/blockflow/hashes?fromGroup=2&toGroup=3&height=0' \
  -H 'accept: application/json'

# Response
# {
#   "headers": [
#     "ecbc7a3115eb0da1f82902db226b80950e861ef8cbb6623ed02fc42a6eeb69cb"
#   ]
# }
```

## UTXO Management

### Neden UTXO yönetimi?

Uygulamada, bazı madenciler genellikle doğrudan borsa adreslerine madencilik ödülleri gönderirler, bu da borsanın sıcak cüzdanlarında çok sayıda düşük değerli UTXO'ya yol açar. Ancak, her işleme dahil edilebilecek sınırlı sayıda giriş olduğundan, sıcak cüzdan bu küçük UTXO'larla doluysa çekimler başarısız olabilir.

### Düşük değerli UTXO'ları nasıl birleştirebilirsiniz?

Bir borsanız zaten uygun bir UTXO yönetim çerçevesine sahipse, işleriniz yolundadır. Ancak, yoksa basit bir çözüm mevcuttur. Belirli bir adresin küçük değerli UTXO'larını birleştirmek için süpürme uç noktasını kullanabilirsiniz. Lütfen bu özelliğin tam düğüm `2.3.0` sürümünden itibaren erişilebilir olduğunu unutmayın.

```shell
# `maxAttoAlphPerUTXO` refers to the maximum amount of ALPH in the UTXOs to be consolidated.

curl -X 'POST' \
  'http://127.0.0.1:22973/transactions/sweep-address/build' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0",
  "toAddress": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
  "maxAttoAlphPerUTXO": "100 ALPH"
}'
```

#### Belirlenen UTXO'larla nasıl çalışılır?

İşlemleri daha verimli bir şekilde oluşturmak için, bir borsanın sıcak cüzdanlarının UTXO setini saklaması ve ardından API aracılığıyla belirli UTXO'ları sağlaması önerilir.

```shell
curl -X 'POST' \
  'http://127.0.0.1:22973/transactions/build' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0",
  "destinations": [
    {
      "address": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3",
      "attoAlphAmount": "230000000000000000"
    }
  ]
  "utxos": [
    {
        "hint": 714242201,
        "key": "3bfdeea82a5702cdd98426546d9eeecd744cc540aaffc5ec8ea998dc105da46f"
    }
  ]
}'
```

UTXO için `ipucu` ve `anahtar`'ı, oluşturduğumuz ilk işlemin ilk çıktısından alınır. `anahtar` benzersizdir ve UTXO'ları dizinlemek için kullanılabilir.

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/transactions/details/a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617' \
  -H 'accept: application/json'

# Response
# {
#   "unsigned": {
#     "txId": "a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617",
#     ...
#     "fixedOutputs": [
#       {
#         "hint": 714242201,
#         "key": "3bfdeea82a5702cdd98426546d9eeecd744cc540aaffc5ec8ea998dc105da46f",
#         "attoAlphAmount": "1230000000000000000",
#         "address": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3",
#         ...
#       },
#       {
#         "hint": 933512263,
#         "key": "087ee967733900cc7f7beada612ba514dd134ddffc2ad1b6ad8b6998915089c4",
#         "attoAlphAmount": "999998768000000000000000",
#         "address": "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
#         ...
#       }
#     ]
#   },
#   ...
# }
```

## Daha Fazla Bilgi

### Cüzdan oluşturma

Kullanıcılar için birden fazla adres oluşturmak için [web3 SDK'daki HD-cüzdanı](https://github.com/alephium/alephium-web3/blob/master/packages/web3-wallet/src/hd-wallet.ts#L112-L185) kullanabilirsiniz.

### Parçalama (Sharding)

Alephium, bir parçalı blok zinciri olduğundan ve adresleri ana ağda 4 gruba ayrıldığından, bir işlemde aynı gruplara ait birden fazla adrese ALPH gönderebilirsiniz. Tüm hedef adreslerin aynı gruba ait olması gerekir.
Aynı gruplara ait birden fazla adresten ALPH gönderebilirsiniz. Tüm gönderme adreslerinin aynı gruba ait olması gerekir.
Aynı gruplara ait birden fazla adresten diğer bir gruba ait birden fazla adrese ALPH gönderebilirsiniz. Tüm gönderme adreslerinin aynı gruba ait olması gerekir ve tüm hedef adreslerin aynı gruba ait olması gerekir.

Bir adresin grubunu almak için web3 SDK fonksiyonuna [groupOfAddress(address)](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/utils/utils.ts#L85-L103) bakabilirsiniz.

### Gaz hesaplama

Alephium'un işlem ücretleri, ayrılan gaz miktarı ve gaz fiyatına bağlıdır. Her işleme maksimum 625,000 gaz miktarı atanabilir.
Varsayılan gaz fiyatı, her gaz birimi başına `1e11` attoALPH olarak ayarlanmıştır. Basit bir transfer işlemi yaparken, gaz miktarı aşağıdaki sözde kod kullanılarak hesaplanabilir:

```Typescript
txInputBaseGas = 2000
txOutputBaseGas = 4500
inputGas = txInputBaseGas * tx.inputs.length
outputGas = txOutputBaseGas * tx.outputs.length

txBaseGas = 1000
p2pkUnlockGas = 2060 // Currently there is only one signature

txGas = inputGas + outputGas + txBaseGas + p2pkUnlockGas
minimalGas = 20000

gas = max(minimalGas, txGas)
```
