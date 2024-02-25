---
sidebar_position: 30
title: Multisig Guide
sidebar_label: Multisig guide
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Alephium is supporting `m-of-n` multi-signature addresses.

You can find the related command for multisig at [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) under the `Multi-signature` section. Make sure that your full node is running so that you can access the Swagger UI.

## Create a multisig address

1. Get all the public keys of the accounts for that multisig.

   Public key can be retrieve with the wallet by calling:

   ```
   GET /wallets/{wallet_name}/addresses/{address}
   ```

   response:

   ```json
   {
     "address": "{address}",
     "publicKey": "d1b70d2226308b46da297486adb6b4f1a8c1842cb159ac5ec04f384fe2d6f5da28"
   }
   ```

2. For example, if you want to create a multisig address with 3 accounts that needs 2 signatures to unlock (2-of-3), you can do:

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

   response:

   ```json
   {
     "address": "1AujpupFP4KWeZvqA7itsHY9cLJmx4qTzojVZrg8W9y9n"
   }
   ```

   > ⚠️ WARNING: Make sure to remember the order of the public keys, you'll need to provide the same order later.

   Funds can now be send to that address.

3. To use the funds, you need to build a multisig transaction.  
   Pass the public keys that will sign the transaction, 2 in our example.  
   Make sure to have the same order as during the address creation:

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

   response:

   ```json
   {
     "unsignedTx": "0ecd20654c2e2be708495853e8da35c664247040c00bd10b9b13",
     "txId": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```

4. You can now send the `txId` to the people that need to sign the transaction. Everyone can sign it using their wallet:

   ```
   POST /wallets/{wallet_name}/sign
   {
     "data": "798e9e137aec7c2d59d9655b4ffa640f301f628bf7c365083bb255f6aa5f89ef"
   }
   ```

   response:

   ```json
   {
     "signature": "9e1a35b2931bd04e6780d01c36e3e5337941aa80f173cfe4f4e249c44ab135272b834c1a639db9c89d673a8a30524042b0469672ca845458a5a0cf2cad53221b"
   }
   ```

5. Collect the signatures, 2 in our example (because `m=2`) and finally send the transaction:

   > NOTE: The signatures order needs to be the same as the public keys.

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

   response:

   ```json
   {
     "txId": "503bfb16230888af4924aa8f8250d7d348b862e267d75d3147f1998050b6da69",
     "fromGroup": 2,
     "toGroup": 1
   }
   ```
