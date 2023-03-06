---
sidebar_position: 40
title: Exchange
sidebar_label: Exchange
---

This guide will cover the common APIs that are essential to integrate Alephium to a crypto exchange.
Note that this guide is based on pure UTXO model, we will write another simpler integration guide leveraging smart contracts later after the Leman upgrade.

## Run a local development network

An exchanges needs to run a full node to integrate Alephium. In addition, one might run the `explorer-backend` as the blockchain indexer for the sake of efficiency.

You could create a local development network with explorer support by following the instructions in [alphium-stack](https://github.com/alephium/alephium-stack#devnet).
Once it is launched, you will be able to access the Swagger UI, the API interface, of the full node and the explorer backend.

Full node Swagger UI: [http://127.0.0.1:22973/docs](http://127.0.0.1:22973/docs)

Explorer backend Swagger UI: [http://127.0.0.1:9090/docs](http://127.0.0.1:9090/docs)

Explorer front-end: [http://localhost:3000](http://localhost:3000)

All of the available APIs can be queried directly from the Swagger UI. To make this guide succinct, we will only post the relevant API queries instead of the Swagger UI screenshots.
It should be easy to find the right Swagger entity based on those queries.

## Test wallet

Let's recover the test wallet by executing the following API. The test wallet has 1million ALPH for the address `1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH`.

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

Get the public key of the address by querying:

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

## Transaction APIs

Let's build a transaction to send `1.23 ALPH` to address `1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3`.

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

Let's sign the transaction id:

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

Let's submit the transaction to the network:

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

You could fetch the block hash of the confirmed transaction by either the explorer backend API:

```shell
curl -X 'GET' \
  'http://127.0.0.1:9090/transactions/a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617' \
  -H 'accept: application/json'

# Response
# {
#   "type": "Accepted",
#   "hash": "a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617",
#   "blockHash": "1d616d33a7aadc3cf49f5db1cc484b22a642140673f66020c13dc7648b9382d1",
#   ...
# }
```

or by the full node API

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

With the block hash, you will be able to fetch information about the block with APIs from either explorer backend or front-end. This is left as an exercise.

## More information

### Wallet generation

To generate many addresses for users, you could checkout the [HD-wallet in our web3 SDK](https://github.com/alephium/alephium-web3/blob/v0.6.2/packages/web3-wallet/src/hd-wallet.ts#L113-L185)

### UTXO

Alephium is based on the UTXO model, like Bitcoin. To build transactions efficiently, the exchange could maintain the set of UTXOs of the chain and then provide specified UTXOs in the API:

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

`hint` and `key` for the UTXO are fetched from the first output of the first transaction we made:

```shell
curl -X 'GET' \
  'http://127.0.0.1:9090/transactions/a6c14ad03597ce96ebf78b336aded654395f38e0274c810183c4847d9af3d617' \
  -H 'accept: application/json'
```

### Sharding

Alephium is a sharded blockchain and its addresses are split into 4 groups on the mainnet. However, one could send ALPH from one group to another group with just a single transaction.
It requires all of the destination addresses are in the same address group. To get the group of an address:

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/addresses/1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3/group' \
  -H 'accept: application/json'
```
