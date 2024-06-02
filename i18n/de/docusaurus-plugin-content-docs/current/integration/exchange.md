---
sidebar_position: 40
title: Börse (Exchange)
sidebar_label: Börse (Exchange)
---

Integration des Prototyps mit Alephiums SDK: https://github.com/alephium/alephium-web3/blob/master/test/exchange.test.ts

Dieser Leitfaden erläutert die grundlegenden APIs und Informationen, die für die Integration von Alephium mit einer Kryptowährungsbörse erforderlich sind.

## Einstieg

### Lokales Entwicklungsnetzwerk

Um mit Alephium zu integrieren, muss eine Börse einen Full Node betreiben. Zusätzlich kann das Explorer-Backend zu Debugging- und zusätzlichen Indexierungszwecken ausgeführt werden.

Um ein lokales Entwicklungsnetzwerk mit Explorer-Unterstützung zu erstellen, folgen Sie den Anweisungen im [Alephium-Stack](https://github.com/alephium/alephium-stack#devnet) Repository. Sobald es gestartet ist, kann auf die Swagger UI für die API-Schnittstelle des Full Nodes und des Explorer-Backends zugegriffen werden.

* Swagger UI des Full Nodes: [http://127.0.0.1:22973/docs](http://127.0.0.1:22973/docs)
* Swagger UI des Explorer-Backends: [http://127.0.0.1:9090/docs](http://127.0.0.1:9090/docs)
* Explorer-Frontend: [http://localhost:23000](http://localhost:23000)

### APIs

Um den Leitfaden kurz zu halten, werden relevante API-Anfragen im Dokument bereitgestellt, anstatt Swagger UI-Screenshots zu verwenden.

Das [web3 SDK](https://github.com/alephium/alephium-web3#packages) enthält generierte TypeScript-APIs sowohl für den [Full Node](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/api/api-alephium.ts) als auch für das [Explorer-Backend](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/api/api-explorer.ts).

### Test wallet

:::caution
Die Node-Wallet dient dazu, die APIs des Full Nodes zu testen. Um Hot Wallets für Einzahlungen zu generieren, überprüfen Sie bitte [Wallet-Generierung](exchange#wallet-generation).
:::

Lassen Sie uns die Test-Wallet wiederherstellen, indem wir die folgende API ausführen. Die Test-Wallet hat 1 Million ALPH für die Adresse `1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH`.

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

Erhalten Sie den öffentlichen Schlüssel der Adresse durch folgende Abfrage:

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

## Transaktions-APIs

### Eine Transaktion erstellen

Lassen Sie uns eine Transaktion erstellen, um `1.23 ALPH` an die Adresse `1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3` zu senden.

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

### Transaktion signieren

Lassen Sie uns die Transaktions-ID signieren:

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

### Eine Transaktion übermitteln

Lassen Sie uns die Transaktion an das Netzwerk übermitteln:

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

## Block APIs

### Blockhash mit Transaktions-ID abrufen

Um den Blockhash einer bestätigten Transaktion zu erhalten, können Sie die Full-Node-API verwenden:

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

### Block mit Blockhash abrufen

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

### Abfrage von Blöcken

In Alephium können Sie alle Blöcke von allen Ketten für einen bestimmten Zeitintervall abrufen, da es sich um eine sharded Blockchain handelt, bei der mehrere Ketten gleichzeitig auf unterschiedlichen Höhen arbeiten.

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

Sie können Blöcke für jede Kette einzeln mit diesem Endpunkt abrufen:
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

## UTXO Verwaltung

### Warum UTXO-Verwaltung?

In der Praxis neigen einige Miner dazu, Mining-Belohnungen direkt an Börsenadressen zu senden, was zu einer großen Anzahl von UTXOs mit geringem Wert in den Hot Wallets der Börse führt. Aufgrund der begrenzten Anzahl von Inputs, die in jede Transaktion aufgenommen werden können, können Auszahlungen fehlschlagen, wenn das Hot Wallet mit diesen kleinen UTXOs gefüllt ist.

### Wie konsolidiert man UTXOs mit geringem Wert?

Wenn Ihre Börse bereits ein geeignetes UTXO-Verwaltungssystem hat, sind Sie gut aufgestellt. Wenn nicht, gibt es eine einfache Lösung. Sie können den Sweep-Endpunkt verwenden, um die UTXOs mit geringem Wert einer bestimmten Adresse zu konsolidieren. Beachten Sie, dass diese Funktion nur ab Full Node `2.3.0` verfügbar ist.

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

### Wie man mit bestimmten UTXOs arbeitet?

Um Transaktionen effizienter zu erstellen, wird einer Börse empfohlen, den Satz von UTXOs ihrer Hot Wallets zu speichern und dann spezifische UTXOs über die API bereitzustellen.

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

`hint` und `key` für den UTXO werden aus der ersten Ausgabe der ersten von uns erstellten Transaktion abgerufen. `key` ist eindeutig und kann verwendet werden, um den UTXO zu indizieren.

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

## Mehr Informationen

### Wallet-Generierung

Um mehrere Adressen für Benutzer zu generieren, können Sie die [HD-Wallet im Web3 SDK](https://github.com/alephium/alephium-web3/blob/master/packages/web3-wallet/src/hd-wallet.ts#L112-L185) verwenden.

### Sharding

Alephium ist eine sharded Blockchain, und seine Adressen sind auf dem Mainnet in 4 Gruppen unterteilt. Man kann jedoch:
- ALPH an mehrere Adressen derselben Adressgruppe in einer einzigen Transaktion senden. Alle Zieladressen müssen derselben Gruppe angehören.
- ALPH von mehreren Adressen derselben Adressgruppe in einer einzigen Transaktion senden. Alle sendenden Adressen müssen derselben Gruppe angehören.
- ALPH von mehreren Adressen derselben Gruppe an mehrere Adressen einer anderen Gruppe senden. Alle sendenden Adressen müssen derselben Gruppe angehören, und alle Zieladressen müssen ebenfalls derselben Gruppe angehören.

Um die Gruppe einer Adresse zu erhalten, können Sie auf die Web3 SDK-Funktion [groupOfAddress(address)](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/utils/utils.ts#L85-L103) verweisen.

### Gasberechnung

Die Transaktionsgebühren von Alephium werden durch die zugewiesene Gasmenge und den Gaspreis bestimmt. Pro Transaktion können maximal 625.000 Gas zugewiesen werden.
Der Standard-Gaspreis beträgt `1e11` AttoALPH pro Gas-Einheit. Bei einer einfachen Übertragungstransaktion kann die Gasmenge mit dem folgenden Pseudocode berechnet werden:

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
