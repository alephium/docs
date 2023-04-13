---
sidebar_position: 40
title: Exchange
sidebar_label: Exchange
---

This guide explains the basic APIs and information required for integrating Alephium with a cryptocurrency exchange.

## Run a local development network

To integrate Alephium, an exchange must run a full node. Additionally, the explorer-backend can be run for debugging and additional indexing. 

To create a local development network with explorer support, follow the instructions in the [alephium-stack](https://github.com/alephium/alephium-stack#devnet) repository. Once launched, Swagger UI can be accessed for the API interface of the full node and the explorer backend.

Full node Swagger UI: [http://127.0.0.1:22973/docs](http://127.0.0.1:22973/docs)

Explorer backend Swagger UI: [http://127.0.0.1:9090/docs](http://127.0.0.1:9090/docs)

Explorer front-end: [http://localhost:3000](http://localhost:3000)

Relevant API queries will be posted instead of Swagger UI screenshots to keep the guide concise, but the correct Swagger commands should be easy to locate based on these queries.

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

## Get block hash with transaction ID

To get the block hash of a confirmed transaction, you can use the full node API:

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

## Get block with block hash

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

## Polling for blocks

In Alephium, you can fetch all the blocks from all the chains for a given time interval because it is a sharded blockchain with multiple chains operating at different heights simultaneously.

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

You can retrieve blocks for each chain individually using this endpoint:
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

Like Bitcoin, Alephium uses the UTXO model. To create transactions more efficiently, an exchange can store the set of UTXOs of the chain and then provide specific UTXOs through the API.

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

`hint` and `key` for the UTXO are fetched from the first output of the first transaction we made. `key` is unique and can be used to index the UTXO.

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

## More information

### Wallet generation

To generate multiple addresses for users, you can use the [HD-wallet in our web3 SDK](https://github.com/alephium/alephium-web3/blob/master/packages/web3-wallet/src/hd-wallet.ts#L112-L185)

### Sharding

Alephium is a sharded blockchain and its addresses are split into 4 groups on the mainnet. However, one can: 
- Send ALPH to multiple addresses that belong to the same address group in a single transaction. All the destination addresses must belong to the same group.
- Send ALPH from multiple addresses that belong to the same address group in a single transaction. All the sending addresses must belong to the same group.
- Send ALPH from multiple addresses that belong to the same group to multiple addresses that belong to another group. All the sending addresses must belong to the same group, and all the destination addresses must belong to the same group too.

To get the group of an address:

```shell
curl -X 'GET' \
  'http://127.0.0.1:22973/addresses/1C2RAVWSuaXw8xtUxqVERR7ChKBE1XgscNFw73NSHE1v3/group' \
  -H 'accept: application/json'
```

### Gas Computation

Alephium's transaction fees are determined by the amount of gas allocated and the gas price. A maximum gas amount of 625,000 can be assigned to each transaction.
The default gas price is set at `1e11` attoALPH per gas unit. When conducting a simple transfer transaction, the gas amount can be computed using the following pseudo code:

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
