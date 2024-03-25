---
sidebar_position: 30
title: Multisig Leitfaden
sidebar_label: Multisig Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium unterstützt `m-of-n` Multi-Signature-Adressen.

Die entsprechenden Befehle für Multi-Sig finden Sie unter [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) im Abschnitt `Multi-signature`. Stellen Sie sicher, dass ihr Full Node läuft, damit Sie auf die Swagger UI zugreifen können.

## Erstellen einer Multi-Sig-Adresse

1. Holen Sie alle öffentlichen Schlüssel der Konten für diese Multi-Sig.

   Der öffentliche Schlüssel kann mit der Wallet abgerufen werden, indem Sie folgenden Befehl aufrufen:

   ```
   GET /wallets/{wallet_name}/addresses/{address}
   ```

   Rückmeldung:

   ```json
   {
     "address": "{address}",
     "publicKey": "d1b70d2226308b46da297486adb6b4f1a8c1842cb159ac5ec04f384fe2d6f5da28"
   }
   ```

2. Zum Beispiel, wenn Sie eine Multi-Sig-Adresse mit 3 Konten erstellen möchten, die 2 Signaturen zum Entsperren benötigt (2-of-3), können Sie folgendes tun:

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

   Rückmeldung:

   ```json
   {
     "address": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y9n"
   }
   ```

   > ⚠️ WARNUNG: Stellen Sie sicher, dass Sie die Reihenfolge der öffentlichen Schlüssel beibehalten; Sie müssen später dieselbe Reihenfolge angeben.

   Gelder können jetzt an diese Adresse gesendet werden.

3. Um die Gelder zu nutzen, müssen Sie eine Multi-Sig-Transaktion erstellen.  
   Übergeben Sie die öffentlichen Schlüssel, die die 
   Transaktion signieren werden, in unserem Beispiel 2.  
   Stellen Sie sicher, dass die Reihenfolge dieselbe ist wie bei der Adresserstellung:

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

   Rückmeldung:

   ```json
   {
     "unsignedTx": "0ecd20654c2e2be708495853e8da35c664247040c00bd10b9b13",
     "txId": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```

4. Sie können jetzt die `txId` an die Personen senden, die die Transaktion signieren müssen. 
   Jeder kann es mit seiner Wallet signieren:

   ```
   POST /wallets/{wallet_name}/sign
   {
     "data": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef"
   }
   ```

   Rückmeldung:

   ```json
   {
     "signature": "9e1a35b2931bd04e6780d01c36e3e5337941aa80f173cfe4f4e249c44ab135272b834c1a639db9c89d673a8a30524042b0469672ca845458a5a0cf2cad53221b"
   }
   ```

5. Sammlen Sie die Signaturen, in unserem Beispiel 2 (weil `m=2`) , und senden Sie schließlich die Transaktion:

   > HINWEIS: Die Reihenfolge der Signaturen muss dieselbe wie die der öffentlichen Schlüssel sein.

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

   Rückmeldung:

   ```json
   {
     "txId": "503bfb16230888af4924aa8f8250d7d348b862e267d75d3147f1998050b6da69",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```
