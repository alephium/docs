---
sidebar_position: 30
title: Çoklu İmza Kılavuzu
sidebar_label: Çoklu imza kılavuzu
---

Alephium, `m-of-n` çoklu imza adreslerini desteklemektedir.

Çoklu imza ile ilgili komutu [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) adresindeki `Çoklu-imza` bölümünde bulabilirsiniz. Tam düğümünüzün çalıştığından emin olun, böylece Swagger UI'ye erişebilirsiniz.

## Çoklu imza adresi oluşturma

1. İmzalanacak hesapların tüm genel anahtarlarını alın.

   Genel anahtar, cüzdanı şu şekilde çağırarak alınabilir:

   ```
   GET /wallets/{wallet_name}/addresses/{address}
   ```

   cevap:

   ```json
   {
     "address": "{address}",
     "publicKey": "d1b70d2226308b46da297486adb6b4f1a8c1842cb159ac5ec04f384fe2d6f5da28"
   }
   ```

2. Örneğin, 3 hesap ile (2-of-3) kilidini açmak için 2 imza gereken bir çoklu imza adresi oluşturmak istiyorsanız, şunu yapabilirsiniz:

   ```
   POST /multisig/address
   {
     "keys": [
       "d1b70d2226308b46da297486adb6b4f1a8c1842cb159ac5ec04f384fe2d6f5da28",
       "8c1842cb159ac5ec04f384fe2d6f5da2d1b70d2226308b46da297486adb6b41a8f",
       "e4a8c1842cb159ac5ec0b70d2226308b46da297486adb6b4f14f384fe2d6f5da31"
     ],
     "mrequired": 2
   }
   ```

   cevap:

   ```json
   {
     "address": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y9n"
   }
   ```

   > ⚠️ UYARI: Genel anahtarların sırasını hatırlamayı unutmayın, daha sonra aynı sırayı sağlamanız gerekecektir.

Artık bu adrese fon gönderilebilir.

3. Fonları kullanmak için, çoklu imza işlemi oluşturmanız gerekir.
İmzalayacak genel anahtarları geçirin, örneğimizde 2.
Adres oluşturulurken aynı sıraya sahip olduğunuzdan emin olun:

   ```
   POST /multisig/build
   {
     "fromAddress": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y9n",
     "fromPublicKeys": [
       "d1b70d2226308b46da297486adb6b4f1a8c1842cb159ac5ec04f384fe2d6f5da28",
       "e4a8c1842cb159ac5ec0b70d2226308b46da297486adb6b4f14f384fe2d6f5da31"
     ],
     "destinations": [
       {
         "address": "1jVZrg8W9y9AujpupFP4KWeZvqA7itsHY9cLJmTonx4zq",
         "amount": "42 ALPH"
       }
     ]
   }
   ```

   cevap:

   ```json
   {
     "unsignedTx": "0ecd20654c2e2be708495853e8da35c664247040c00bd10b9b13",
     "txId": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```

4. Şimdi txId'yi işlemi imzalaması gereken kişilere gönderebilirsiniz. Herkes cüzdanlarını kullanarak imzalayabilir:

   ```
   POST /wallets/{wallet_name}/sign
   {
     "data": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef"
   }
   ```

   cevap:

   ```json
   {
     "signature": "9e1a35b2931bd04e6780d01c36e3e5337941aa80f173cfe4f4e249c44ab135272b834c1a639db9c89d673a8a30524042b0469672ca845458a5a0cf2cad53221b"
   }
   ```

5. İmzaları toplayın, örneğimizde 2 (çünkü `m=2`) ve son olarak işlemi gönderin:

   > NOT: İmza sırasının genel anahtarlarla aynı olması gerekir.

   ```
   POST /multisig/submit
   {
      "unsignedTx": "0ecd20654c2e2be708495853e8da35c664247040c00bd10b9b13",
      "signatures": [
      "9e1a35b2931bd04e6780d01c36e3e5337941aa80f173cfe4f4e249c44ab135272b834c1a639db9c89d673a8a30524042b0469672ca845458a5a0cf2cad53221b",
      "ab135272b834c1a639db9c89d673a8a30524042b0469672ca845458a5a0cf2cad53221b9e1a35b2931bd04e6780d01c36e3e5337941aa80f173cfe4f4e249c44"
      ]
   }

   ```

   cevap:

   ```json
   {
     "txId": "503bfb16230888af4924aa8f8250d7d348b862e267d75d3147f1998050b6da69",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```
