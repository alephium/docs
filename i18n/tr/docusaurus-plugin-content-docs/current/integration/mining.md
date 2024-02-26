---
sidebar_position: 50
title: Madencilik
sidebar_label: Madencilik
---

Bu belge, madencilik havuzlarının ve madencilerin alephium'u entegre etmesini kolaylaştırmayı amaçlamaktadır. Bu belge genellikle şunları içerir:

* madencilik havuzu ile tam düğüm arasındaki iletişim protokolü
* madencinin maden işlerine dayanarak blok hash'ini nasıl hesapladığı

Madencilik havuzu ile madenciler arasındaki iletişim protokolünün uygulanması hakkında daha fazla bilgi için, stratum protokolüne [buradan](/mining/alephium-stratum.md) bakabilirsiniz. Madencilik havuzları tam olarak protokolü takip etmez.

Bu belgede bir referans olarak [madencilik havuzu](https://github.com/alephium/mining-pool) ve [gpu madencisi](https://github.com/alephium/gpu-miner) kodunu kullanacağım.

## Madencilik Havuzu

Madencilik havuzu, maden işleri almak için alephium tam düğümüne bağlanmalıdır ve varsayılan madencilik api sunucusu `localhost:10973` 'tür.

Madencilik havuzu, tam düğümle bir binar protokol aracılığıyla iletişim kurar, mesaj formatı aşağıdaki gibidir:

```
MessageSize(4 bytes) + Message(1 byte MessageType + Payload)
```

### Tam Düğümden İşler Almak

Her tam düğüm yeni bir blok aldığında, bir `Jobs` mesajı gönderir. Tam düğümün, yeni bir blok olmadığında da `Jobs` mesajı göndermek için zaman aralığını [buradaki](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/system_prod.conf.tmpl#L6) madencilik yapılandırmasında ayarlayabilirsiniz.

Alephium'da şu anda 16 zincir bulunduğundan, her `Jobs` mesajında 16 blok şablonu olacaktır. Ve blok şablonu aşağıdaki alanlardan oluşur:

* `fromGroup` ve `toGroup`: blok şablonunun zincir dizini.
* `headerBlob`: [BlockHeader](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/BlockHeader.scala#L28) 'nin seri haldeki ikili verisi, ilk 24 baytı(nonce) hariç.
* `txsBlob`: işlemlerin seri haldeki ikili verisi.
* `targetBlob`: [Target](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/Target.scala#L32) 'nin seri haldeki ikili verisi.

`Jobs` mesajının formatı ve `Jobs` mesajının nasıl ayrıştırılacağı hakkında daha fazla bilgi için sağlanan kodlara [buradan](https://github.com/alephium/mining-pool/blob/master/lib/messages.js) bakabilirsiniz.

Madencilik havuzu, tam düğümden `Jobs` mesajını aldığında, madencilere hashrate'lerine dayanarak maden işlerini gönderebilir. Her zincir için, nonce hesaplamak yalnızca `targetBlob` ve `headerBlob` alanlarını gerektirir. Bu nedenle, madencilik havuzu, madencilere maden işlerini gönderirken `txsBlob` alanını dışarıda bırakarak bant genişliği tasarrufu yapabilir. Kodlara [buradan](https://github.com/alephium/mining-pool/blob/master/lib/blockTemplate.js#L51) bakabilirsiniz.

### Blokları Tam Düğüme Gönderme

Madencilik havuzu, bir madenciden geçerli bir `nonce` aldığında, bloğu tam düğüme gönderebilir, blok `nonce`, `headerBlob` ve `txsBlob`'dan oluşur, kodlara [buradan](https://github.com/alephium/mining-pool/blob/master/lib/pool.js#L119) bakabilirsiniz.

Ardından, geçerli bir `SubmitBlock` mesajı oluşturmak için sağlanan kodlara [buradan](https://github.com/alephium/mining-pool/blob/master/lib/daemon.js#L49) bakabilirsiniz.

Tam düğüm bloğu doğruladıktan sonra, madencilik havuzuna bloğun geçerli olup olmadığını belirten bir `SubmitBlockResult` mesajı gönderecektir, bu mesajın nasıl ayrıştırılacağına [buradan](https://github.com/alephium/mining-pool/blob/master/lib/messages.js#L72) bakabilirsiniz.

## Madenci

### Blok Hash'ini Hesaplama

Alephium'da, `nonce`'un boyutu 24 bayttır ve bloğun hash'i: `blake3(blake3(serialize(blockHeader))` 'dir. Yukarıda belirtildiği gibi, her işteki `blockBlob`, `BlockHeader` 'ın seri haldeki ikili verisidir ve `nonce` alanını içermez. Bu nedenle, madenci blok hash'ini hesaplarken, `nonce`'u `headerBlob`'un önüne eklemesi gerekir, kodlara [buradan](https://github.com/alephium/gpu-miner/blob/master/src/worker.h#L135) ve [buradan](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#L314) bakabilirsiniz.

### Zincir Endeksini Kontrol Etme

Madenci, hedefi kontrol etmenin yanı sıra, alephium zincir endeksini de kontrol etmelidir, çünkü alephium, zincir endeksini blok hash'ine kodlar. Zincir endeksinin blok hash'ının doğru olup olmadığını kontrol etmek için [buradan](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#LL303C2-L303C2) kodlara bakabilirsiniz.

## UTXO Yönetimi

Her işlemde dahil edilebilecek girişlerin sınırlı sayıda olması nedeniyle, maden işçisinin cüzdanı küçük UTXO'larla doluysa, çekilmeler başarısız olabilir. Uygulamada, bazı madenciler maden ödüllerini doğrudan borsa adreslerine göndermeyi tercih ederler. Bu durumda lütfen [buradaki](/integration/exchange#utxo-management) kılavuzu izleyin.

Eğer tam düğüm cüzdanı madencilik için kullanılıyorsa, aktif adres için UTXO'ları konsolide etmenin daha basit ve daha verimli yolları vardır.

### Aktif adres için UTXO'ları konsolide etme

```shell
# Consolidate UTXOs for the active address
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/sweep-active-address' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "toAddress": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3"
}'
```

Unutmayın ki bu, yalnızca aktif adres için UTXO'ları konsolide eder. Diğer adresler için UTXO'ları konsolide etmek için, her birini aktif adres olarak güncellememiz ve yukarıdaki komutu çalıştırmamız gerekir.

```shell
# Change active address
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/change-active-address' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y"
}'
```

### Tüm adresler için UTXO'ları konsolide etme

Tam düğüm cüzdanındaki tüm adresler için UTXO'ları konsolide etmenin en basit yolu `sweep-all-addresses` uç noktasını kullanmaktır:

```shell
# Consolidate UTXOs for all addresses
curl -X 'POST' \
  'http://127.0.0.1:22973/wallets/my-wallet/sweep-all-addresses \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "toAddress": "1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3"
}'
```
