---
sidebar_position: 11
title: Technical guide with a fullnode
---

This document guides you through the creation, deployment and usage of
smart contracts on Alephium mainnet.


We will first deploy a contract which allows any user to exchange
**ALPH** for tokens. Then we will deploy a script which calls the
contract to buy tokens.


This document is based on the [Chinese smart contract tutorial and
documentation](https://github.com/Lbqds/alephium-docs/blob/master/contract.md)
by [Lbqds](https://github.com/Lbqds).


## Requirements

For this tutorial you will need to have a node running locally and a
wallet. Here are the related tutorials:

- [How to launch your node](https://github.com/alephium/alephium/wiki/Starter-Guide---How-to-Launch-your-node)
- [How to setup a wallet](https://github.com/alephium/alephium/wiki/Wallet-Guide)

We will use a wallet named `demo-1` in this tutorial.

## Create and deploy a token contract

In this section we will create, build, sign and submit a contract
transaction.


### Create a token Contract

First, we create a token contract as shown below:

```rust
TxContract MyToken(owner: Address, mut remain: U256) {
  pub payable fn buy(from: Address, alphAmount: U256) -> () {
    let tokenAmount = alphAmount * 1000
    assert!(remain >= tokenAmount)
    let tokenId = selfTokenId!()
    transferAlph!(from, owner, alphAmount)
    transferTokenFromSelf!(from, tokenId, tokenAmount)
    remain = remain - tokenAmount
  }
}
```

This simple token contract allows users to buy tokens by paying
**ALPH** to the contract owner at a rate `1:1000`. It uses the
following built-in functions:


- `assert!(pred)` Causes the contract execution to fail when `pred`
  evaluates to `false`
- `selfTokenId!(a)` Returns the current token id which is also the
  current contract id
- `transferAlph!(from, to, alphAmount)` Transfers `alphAmount`
  **ALPH** from address `from` to `to`.
- `transferTokenFromSelf!(to, tokenId, tokenAmount)` Transfers
  `tokenAmount` tokens of `MyToken` to address `to`.

**Note**: The `remain` variable is not necessary but helps
understanding state variables of the contract. We will explain how the
contract state is stored later.


### Compile a Contract

Next we compile the contract via the full node API.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/compile-contract' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "TxContract MyToken(owner: Address, mut remain: U256) {\n  pub payable fn buy(from: Address, alphAmount: U256) -> () {\n    let tokenAmount = alphAmount * 1000\n    assert!(remain >= tokenAmount)\n    let tokenId = selfTokenId!()\n    transferAlph!(from, owner, alphAmount)\n    transferTokenFromSelf!(from, tokenId, tokenAmount)\n    remain = remain - tokenAmount\n  }\n}"
}'
```

We receive the binary code of the contract as a response:

```json
{
  "compiled": {
    "type": "SimpleContractByteCode",
    "bytecode": "0201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101"
  },
  "fields": {
    "signature": "TxContract MyToken(owner:Address,mut remain:U256)",
    "types": [
      "Address",
      "U256"
    ]
  },
  "functions": [
    {
      "name": "buy",
      "signature": "pub payable buy(from:Address,alphAmount:U256)->()",
      "argTypes": [
        "Address",
        "U256"
      ],
      "returnTypes": []
    }
  ],
  "events": []
}
```

### Build an unsigned contract transaction

Now we need to create the contract transaction. First we obtain the
publicKey of the address currently in use. We use address
`1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG`.


```bash
curl 'http://127.0.0.1:12973/wallets/demo-1/addresses/1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG'
```

We obtain the following response:

```json
{
  "address": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG",
  "publicKey": "029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f1",
  "group": 3,
  "path": "m/44'/1234'/0'/0/0"
}
```

Then we build the contract transaction.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/unsigned-tx/build-contract' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f1",
  "bytecode": "0201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101",
  "gasAmount": 80000,
  "initialFields": [{"type": "Address", "value": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG"}, {"type": "U256", "value": "10000000000000000000000000000"}],
  "issueTokenAmount": "10000000000000000000000000000"
}'
```

The parameters are:

- `fromPublicKey` Public key from the address currently in use
- `bytecode` Contract binary code
- `gasAmount` Manually specified gas as the default gas may not be
  enough for contract related operations
- `initialFields` List of initial state variables passed to the
  contract constructor
- `issueTokenAmount` The total number of tokens issued by the contract

We get the following response:

```json
{
  "group": 3,
  "unsignedTx": "000401010101000000081500bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e313c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e302c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae1880013880c1174876e80001adcf9eb78826cef24403641dea9e899dbbcfc7007c21e0ff46a76189d04a830986eb7c9e00029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f100",
  "gasAmount": 80000,
  "gasPrice": "100000000000",
  "txId": "a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2",
  "contractAddress": "2AKg3eFfeBANTSc1RPH4FUho8KrrzMdKMCiXeBc2X3taP"
}
```

### Sign a contract

Next, we sign the previously obtained transaction hash.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/wallets/demo-1/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": "a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2"
}'
```

The response contains the signature.

```json
{
  "signature": "77373aeac77ca269169faada8a2f3f60301a4a0fe0f0a5d96d0c8c5551a176f140e7526662f7dbbe58b3294fcc63eac269f74e289da62c95ab8149728eb317af"
}
```

### Submit a contract

Finally we submit the contract transaction to the Alephium network.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/transactions/submit' \
  -H 'Content-Type: application/json' \
  -d '{
  "unsignedTx": "000401010101000000081500bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e313c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e302c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae1880013880c1174876e80001adcf9eb757a0fc312c490625510071acc022635fa53f4649813549f0669095473a7a7d7600029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f100",
  "signature": "77373aeac77ca269169faada8a2f3f60301a4a0fe0f0a5d96d0c8c5551a176f140e7526662f7dbbe58b3294fcc63eac269f74e289da62c95ab8149728eb317af"
}'
```

If the request is valid, a response similar to the following is
returned.


```json
{
  "txId":"a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2",
  "fromGroup": 3,
  "toGroup": 3
}
```

In order to understand the contract creation process more clearly,
let's take a look at the specific content of the above tx. Currently
there is no friendly interface to examine the content of a transaction
so we need fetch the block containing the transaction via the node
API. (You can obtain the block hash of a transaction either via the
explorer or the endpoint `GET /transaction/status?txId={txId}`)


```bash
curl 'http://127.0.0.1:12973/blockflow/blocks/08041abb8bc8d06c6b840ceb345a4f8953a9fbf9c32c08be34a63c93fd8dfcdf \
```

We obtain a list of transactions (here we only show 2 out of 5
transactions for readability):


```json
{
  "hash": "08041abb8bc8d06c6b840ceb345a4f8953a9fbf9c32c08be34a63c93fd8dfcdf",
  "timestamp": 1652689725997,
  "chainFrom": 3,
  "chainTo": 3,
  "height": 12,
  "deps": [
    "40d58f8563a6de46fa0efda4670aeb43a451b349d8af1403b341413d5010c0e0",
    "30b0c63cf62aa6cdc1c72e8fc2f31703b8318654b65acaaece48ee503da87845",
    "be73f0505c81184bc4691ee1ffeafaf7fbb091f412d500fc882aeecc8929e1fa",
    "8f8ddaeddfd21b003ad39dfd1d7c4593d7f63d2951aecd16de8a749edf26c23c",
    "6d258ca53dbe960adf19f899248e1d60c83ac65aac323a4ff195541b84ccfb4d",
    "4862925410e6951836bd8808b94a8492ca5d718ec642d375f170e5b3b8ca51ce",
    "c5a260997400e9512b6e1ca41c18653580e39ecdbd33c26f9ee971b6f2bb96cf"
  ],
  "transactions": [
    {
      "unsigned": {
        "txId": "a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2",
        "version": 0,
        "networkId": 4,
        "scriptOpt": "010101000000081500bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e313c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e302c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae18",
        "gasAmount": 80000,
        "gasPrice": "100000000000",
        "inputs": [
          {
            "outputRef": {
              "hint": -1378902345,
              "key": "8826cef24403641dea9e899dbbcfc7007c21e0ff46a76189d04a830986eb7c9e"
            },
            "unlockScript": "00029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f1"
          }
        ],
        "fixedOutputs": []
      },
      "scriptExecutionOk": true,
      "contractInputs": [],
      "generatedOutputs": [
        {
          "type": "ContractOutput",
          "hint": 585739684,
          "key": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
          "alphAmount": "1000000000000",
          "address": "2AKg3eFfeBANTSc1RPH4FUho8KrrzMdKMCiXeBc2X3taP",
          "tokens": [
            {
              "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
              "amount": "10000000000000000000000000000"
            }
          ]
        },
        {
          "type": "AssetOutput",
          "hint": -1378902345,
          "key": "1d4b4f18b41e34e64d9e8fe6ee038ef8acaa8763f7b276b3b157120d393857bd",
          "alphAmount": "6499975998000000000000",
          "address": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG",
          "tokens": [],
          "lockTime": 0,
          "additionalData": ""
        }
      ],
      "inputSignatures": [
        "1def939243491d681b68790a2c0d906c50a3f3bef453cc47ca6822b669d6437c565af0ba9d7cd191cd99144f8fa07fe07effe6c3b21d4a9e9898d1a4eea3ae82"
      ],
      "scriptSignatures": []
    },
    {
      "unsigned": {
        "txId": "ee023aea5778fd390cc16dc2a706647c3490cf888ed90cfe4505257863e7fb31",
        "version": 0,
        "networkId": 4,
        "gasAmount": 20000,
        "gasPrice": "1000000000",
        "inputs": [],
        "fixedOutputs": [
          {
            "hint": -11128529,
            "key": "e895ec4b15e4b50e3c21e04f23dfa5e3ea424e8db92bb10d52c10b3761905665",
            "alphAmount": "1879000000000000000",
            "address": "17UjAgeAVixkYksn5snhQ4k1CpGAoBJmdsBNGdyHWqm4M",
            "tokens": [],
            "lockTime": 1652690325997,
            "additionalData": "030300000180cbfbea2d"
          }
        ]
      },
      "scriptExecutionOk": true,
      "contractInputs": [],
      "generatedOutputs": [],
      "inputSignatures": [],
      "scriptSignatures": []
    }
  ],
  "nonce": "c55b55079d5eb165ee7cc093ffde19f6867090621d16ef61",
  "version": 0,
  "depStateHash": "e500d692f7fe6daa400b81d4f78b300f78fbf926a20c03b51ada40b37f441ded",
  "txsHash": "72913f92b28be354026409f9b7c0d11e2b763c99de5bb0eeb1bd9a6b92aabee8",
  "target": "20ffffff"
}
```

We only focus on the transaction with id
`a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2`.

```json
{
  "unsigned": {
    "txId": "a8fa7a28618fd361fc7d8f2ad51c772ef561406ffe4a8b4fe1a5e68e84e2a4e2",
    "version": 0,
    "networkId": 4,
    "scriptOpt": "010101000000081500bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e313c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400bae81fae7fc67d18210b938e31e12d43c48cd9f89668957c7a5fd3e0e57f36e302c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae18",
    "gasAmount": 80000,
    "gasPrice": "100000000000",
    "inputs": [
      {
        "outputRef": {
          "hint": -1378902345,
          "key": "8826cef24403641dea9e899dbbcfc7007c21e0ff46a76189d04a830986eb7c9e"
        },
        "unlockScript": "00029347489f53e7050e5c7edb5ef305d33316772836370750ff747eb6dc3f5f47f1"
      }
    ],
    "fixedOutputs": []
  },
  "scriptExecutionOk": true,
  "contractInputs": [],
  "generatedOutputs": [
    {
      "type": "ContractOutput",
      "hint": 585739684,
      "key": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
      "alphAmount": "1000000000000",
      "address": "2AKg3eFfeBANTSc1RPH4FUho8KrrzMdKMCiXeBc2X3taP",
      "tokens": [
        {
          "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
          "amount": "10000000000000000000000000000"
        }
      ]
    },
    {
      "type": "AssetOutput",
      "hint": -1378902345,
      "key": "1d4b4f18b41e34e64d9e8fe6ee038ef8acaa8763f7b276b3b157120d393857bd",
      "alphAmount": "6499975998000000000000",
      "address": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG",
      "tokens": [],
      "lockTime": 0,
      "additionalData": ""
    }
  ],
  "inputSignatures": [
    "1def939243491d681b68790a2c0d906c50a3f3bef453cc47ca6822b669d6437c565af0ba9d7cd191cd99144f8fa07fe07effe6c3b21d4a9e9898d1a4eea3ae82"
  ],
  "scriptSignatures": []
}
```

This transaction has one input and two outputs. Below is the
description of the some fields:

- `outputRef` pointer to UTXO
- `key` UTXO hash
- `type` the type of the tx output, `ContractOutput` or `AssetOutput`
- `address` base58 encoding of the `contract` or `asset` address
- `alphAmount` the amount of ALPH owned by the address
- `tokens` list of tokens owned by the address
- `tokens.id` contract id
- `tokens.amount` the amount of tokens owned

The first output is the contract we just created. We see that the
contract address owns `10000000000000000000000000000` tokens which is
exactly the `issueTokenAmount` we previously defined.


The second output is the UTXO output of the transaction submitted by
our address `1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG`. This
address doesn't own any tokens.


## Create and deploy a script

Now that the contract has been successfully created, we will deploy a
`TxScript` which calls the `Mytoken.buy` method to obtain tokens by
paying **ALPH** to the contract. For this example, we will pay using
address `1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h` which is
different than the one used to create the contract.


If you also want to pay with an address different than the one used to
submit the contract, please make sure that your address belongs to the
same group as the contract. You can obtain the contract group by
checking the `chainFrom` field of its transaction block. In our
example, the contract is in group 3, but it might be in a different
group for you. You can verify the group of an address at endpoint `GET
addresses/{address}/group`. If it is not the case, you can use
`POST/wallets/{wallet_name}/derive-next-address` until you obtain an
address in the correct group. As new addresses are initialized with
balance `0`, you should transfer some **ALPH** to this new
address. Finally, change your active address at endpoint `POST
wallets/{wallet_name}/change-active-address`.


### Create a TxScript

We first create the `TxScript` to buy some tokens.

```rust
TxScript Main {
  pub payable fn main() -> () {
    approveAlph!(@1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h, 1000000000000000000)
    let contract = MyToken(#e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c)
    contract.buy(@1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h, 1000000000000000000)
  }
}
```

Here is a brief explanation of this code:

- `approveAlph!(address, amount)` authorizes the specified amount of `ALPH` from the address to be used in the script.
- The contract is loaded by its `id`
- Call `MyToken.buy` to buy 1000 tokens for 1 **ALPH**

The next steps are very similar to the previous sections. We will
compile, build, sign and submit the script.


### Compile a Script

We query the node API to compile the script to binary code. **Make
sure you append the source code of the `MyToken` contract after your
`TxScript` code.**


```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/compile-script' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "TxScript Main {\n  pub payable fn main() -> () {\n    approveAlph!(@1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h, 1000000000000000000)\n    let contract = MyToken(#e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c)\n    contract.buy(@1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h, 1000000000000000000)\n  }\n}\nTxContract MyToken(owner: Address, mut remain: U256) {\n  pub payable fn buy(from: Address, alphAmount: U256) -> () {\n    let tokenAmount = alphAmount * 1000\n    assert!(remain >= tokenAmount)\n    let tokenId = selfTokenId!()\n    transferAlph!(from, owner, alphAmount)\n    transferTokenFromSelf!(from, tokenId, tokenAmount)\n    remain = remain - tokenAmount\n  }\n}"
}'
```

A response similar to the following will be returned:

```json
{
  "compiled": {
    "type": "SimpleScriptByteCode",
    "bytecode": "010101000100091500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a7640000a2144020e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c17001500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a764000016000100"
  },
  "functions": [
    {
      "name": "main",
      "signature": "pub payable main()->()",
      "argTypes": [],
      "returnTypes": []
    }
  ],
  "events": []
}
```

### Build an unsigned script transaction

We first obtain the publicKey of the active address:

```bash
curl 'http://127.0.0.1:12973/wallets/demo-1/addresses/1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h'
```

We get a response similar to:

```json
{
  "address": "1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h",
  "publicKey": "0203ff28b14840ee75f8e624ae4f35ae26c67e4e835975bbaac9a2046e622358d5",
  "group": 3,
  "path": "m/44'/1234'/0'/0/18"
}
```

Then we build the unsigned transaction:

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/unsigned-tx/build-script' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "0203ff28b14840ee75f8e624ae4f35ae26c67e4e835975bbaac9a2046e622358d5",
  "bytecode": "010101000100091500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a7640000a2144020e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c17001500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a764000016000100",
  "gasAmount": 80000
}'
```

We obtain the following response:

```json
{
  "unsignedTx": "000401010101000100091500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a7640000a2144020e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c17001500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a76400001600010080013880c1174876e80001174aa36169adea3987f239001301642efa3e74c5ec1f1f185d1ab24ca2032f8bbfd267c7000203ff28b14840ee75f8e624ae4f35ae26c67e4e835975bbaac9a2046e622358d500",
  "gasAmount": 80000,
  "gasPrice": "100000000000",
  "txId": "2fe9100b8ede85114a707314f9416ada97735b68a9db9693c7d7bbbf9326daf2",
  "group": 3
}
```

### Sign a script

Next, we sign the transaction hash:

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/wallets/demo-1/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": "2fe9100b8ede85114a707314f9416ada97735b68a9db9693c7d7bbbf9326daf2"
}'
```

And we receive the signature:

```json
{
  "signature": "df4b2e61c81304b3f3d34dd1f193010ff0d82abe53edd403c636823b1f71247a4908e963cf7c89284a30315d89ec72b3637cf50f023a6f905cd0c4e3d3c9941c"
}
```

### Submit a script

Finally we can submit the transaction.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/transactions/submit' \
  -H 'Content-Type: application/json' \
  -d '{
  "unsignedTx": "000401010101000100091500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a7640000a2144020e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c17001500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a76400001600010080013880c1174876e80001174aa36169adea3987f239001301642efa3e74c5ec1f1f185d1ab24ca2032f8bbfd267c7000203ff28b14840ee75f8e624ae4f35ae26c67e4e835975bbaac9a2046e622358d500",
  "signature": "df4b2e61c81304b3f3d34dd1f193010ff0d82abe53edd403c636823b1f71247a4908e963cf7c89284a30315d89ec72b3637cf50f023a6f905cd0c4e3d3c9941c"
}'
```

And we receive the `txId` and groups information:

```json
{
  "txId": "2fe9100b8ede85114a707314f9416ada97735b68a9db9693c7d7bbbf9326daf2",
  "fromGroup": 3,
  "toGroup": 3
}
```

Again, we can find the transaction on the mainnet by query the block
containing the transaction. We observe the following transaction
content:


```json
{
  "hash": "0f13b84553050263b173f3aa00386d3cc22863080d4b8642b4dcdfea15af0e6f",
  "timestamp": 1652700335564,
  "chainFrom": 3,
  "chainTo": 3,
  "height": 13,
  "deps": [
    "40d58f8563a6de46fa0efda4670aeb43a451b349d8af1403b341413d5010c0e0",
    "30b0c63cf62aa6cdc1c72e8fc2f31703b8318654b65acaaece48ee503da87845",
    "be73f0505c81184bc4691ee1ffeafaf7fbb091f412d500fc882aeecc8929e1fa",
    "8f8ddaeddfd21b003ad39dfd1d7c4593d7f63d2951aecd16de8a749edf26c23c",
    "6d258ca53dbe960adf19f899248e1d60c83ac65aac323a4ff195541b84ccfb4d",
    "4862925410e6951836bd8808b94a8492ca5d718ec642d375f170e5b3b8ca51ce",
    "08041abb8bc8d06c6b840ceb345a4f8953a9fbf9c32c08be34a63c93fd8dfcdf"
  ],
  "transactions": [
    {
      "unsigned": {
        "txId": "2fe9100b8ede85114a707314f9416ada97735b68a9db9693c7d7bbbf9326daf2",
        "version": 0,
        "networkId": 4,
        "scriptOpt": "010101000100091500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a7640000a2144020e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c17001500a095abc2f02eaf33573e17d9c5f6946da5903459f4e752146b847b3831a339c613c40de0b6b3a764000016000100",
        "gasAmount": 80000,
        "gasPrice": "100000000000",
        "inputs": [
          {
            "outputRef": {
              "hint": 390767457,
              "key": "69adea3987f239001301642efa3e74c5ec1f1f185d1ab24ca2032f8bbfd267c7"
            },
            "unlockScript": "000203ff28b14840ee75f8e624ae4f35ae26c67e4e835975bbaac9a2046e622358d5"
          }
        ],
        "fixedOutputs": []
      },
      "scriptExecutionOk": true,
      "contractInputs": [
        {
          "hint": 585739684,
          "key": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c"
        }
      ],
      "generatedOutputs": [
        {
          "type": "AssetOutput",
          "hint": -1378902345,
          "key": "68e0b6a089ce4f6abd47d818e9accf5a88ac7714fef4eaa5b9a9d2099e5ad726",
          "alphAmount": "1000000000000000000",
          "address": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG",
          "tokens": [],
          "lockTime": 0,
          "additionalData": ""
        },
        {
          "type": "AssetOutput",
          "hint": 390767457,
          "key": "a11564f890f1cd3108834e0664dc1f97424cb7e1be4b68982a921a8fa2099846",
          "alphAmount": "498992000000000000000",
          "address": "1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h",
          "tokens": [
            {
              "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
              "amount": "1000000000000000000000"
            }
          ],
          "lockTime": 0,
          "additionalData": ""
        },
        {
          "type": "ContractOutput",
          "hint": 585739684,
          "key": "9f8296350b307d98914e54d748d1cef42293c277f57d3ad98b309c28edc5cdf8",
          "alphAmount": "1000000000000",
          "address": "2AKg3eFfeBANTSc1RPH4FUho8KrrzMdKMCiXeBc2X3taP",
          "tokens": [
            {
              "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
              "amount": "9999999000000000000000000000"
            }
          ]
        }
      ],
      "inputSignatures": [
        "df4b2e61c81304b3f3d34dd1f193010ff0d82abe53edd403c636823b1f71247a4908e963cf7c89284a30315d89ec72b3637cf50f023a6f905cd0c4e3d3c9941c"
      ],
      "scriptSignatures": []
    },
    {
      "unsigned": {
        "txId": "d9468e7b33300cb2824147166c5ee441e3865f4bc23563e54aff117810a290fa",
        "version": 0,
        "networkId": 4,
        "gasAmount": 20000,
        "gasPrice": "1000000000",
        "inputs": [],
        "fixedOutputs": [
          {
            "hint": 17786109,
            "key": "e19b512d57dab97c48d2352485abe76c6707c32dc7f308e4ca0051f40f2d2228",
            "alphAmount": "1879000000000000000",
            "address": "19Sxx6RVyenkDovv6LiMW2ymxP2UfxmvGZGhmNcxq5jqX",
            "tokens": [],
            "lockTime": 1652700935564,
            "additionalData": "030300000180cc9dcdcc"
          }
        ]
      },
      "scriptExecutionOk": true,
      "contractInputs": [],
      "generatedOutputs": [],
      "inputSignatures": [],
      "scriptSignatures": []
    }
  ],
  "nonce": "5c694b2fc6f235ff20bc02661ab3724b06e2d3ae92c97d47",
  "version": 0,
  "depStateHash": "74e3cb156bebf185dee4c3160841d1cfc812bf17be1a81744fbca18a0fefff79",
  "txsHash": "73a5c883b253ef17faa935fe8edacf1ba9690f2d543dd206042b69e06170e631",
  "target": "20ffffff"
}
```

We can see that there is a contract input, with the `outputRef.key`
pointing to the contract we created earlier.


```json
"contractInputs": [
  {
    "hint": 585739684,
    "key": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c"
  }
]
```

This time we have three outputs: two assets and a contract. The first
output is the new UTXO for the 1 **ALPH** payed to the contract owner.

```json
{
  "type": "AssetOutput",
  "hint": -1378902345,
  "key": "68e0b6a089ce4f6abd47d818e9accf5a88ac7714fef4eaa5b9a9d2099e5ad726",
  "alphAmount": "1000000000000000000",
  "address": "1Dac89UqoyQ7NPvuoX5cnYDp44UQDDEo4iMrYQwToqiRG",
  "tokens": [],
  "lockTime": 0,
  "additionalData": ""
}
```

The second output is a new UTXO equivalent to the change of the
consumed UTXOs for the payment to the contract owner. Additionnally,
The first item in the `tokens` list corresponds to the tokens we just
bought! The id corresponds to the one of our contract.

```json
{
  "type": "AssetOutput",
  "hint": 390767457,
  "key": "a11564f890f1cd3108834e0664dc1f97424cb7e1be4b68982a921a8fa2099846",
  "alphAmount": "498992000000000000000",
  "address": "1Borbt3zgchtQyrTrLxhUeAknP4cxYqYkNQUrth5V7U6h",
  "tokens": [
    {
      "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
      "amount": "1000000000000000000000"
    }
  ],
  "lockTime": 0,
  "additionalData": ""
}
```

The third output is the contract after the exchange. We observe that
the amount of tokens changed from `10000000000000000000000000000` to
`9999999000000000000000000000`. The difference is equivalent to the
amount of tokens we bought.


```json
{
  "type": "ContractOutput",
  "hint": 585739684,
  "key": "9f8296350b307d98914e54d748d1cef42293c277f57d3ad98b309c28edc5cdf8",
  "alphAmount": "1000000000000",
  "address": "2AKg3eFfeBANTSc1RPH4FUho8KrrzMdKMCiXeBc2X3taP",
  "tokens": [
    {
      "id": "e847a0a9212bcdc07ddc1b74526c0523f11042e13330c9d889e4bc16f74e084c",
      "amount": "9999999000000000000000000000"
    }
  ]
}
```

Congratulations! You have deployed and used your first smart contract
on Alephium! 🚀

## Contract State

From the previous sections, we can see that:

- When a contract is created, a contract output will be generated
  regardless of whether a token is issued or not. If a token is
  issued, there will be an initial number of tokens in the output
  tokens list.
- Calling the contract will consume the contract output and generate a
  new contract output. In the above example, we can see that the
  contract output generated when the contract is created is consumed,
  and then a new contract output is generated.
- Calling the contract may also modify the state of the contract. In
  the above example, it will be modified after calling `MyToken.buy`.

Let's take a look at what the contract state specifically includes:

```scala
final case class ContractState private (
    codeHash: Hash,
    initialStateHash: Hash,
    fields: AVector[Val],
    contractOutputRef: ContractOutputRef
)
```

where the fields are:

- `codeHash`: The hash of the contract code.
- `initialStateHash`: The hash of the initial contract state
- `fields`: Vector of state values. `AVector(owner, remain)` in the
  `MyToken` example.
- `contractOutputRef`: Pointer to contract output

The process of calling and changing the state of the contract is
roughly as follows:

1. Load the contract state from the WorldState, which is a storage for
   UTXOs, smart contracts state and code.
2. Load contract output pointed by `contractOutputRef` according to
   the contract state (executed when method is payable)
3. When the contract execution involves modifications of the contract
   state, the contract state in WorldState will be updated
4. If the contract generates a new contract output, the contract state
   will be updated and the old contract output will be deleted

In addition, we will briefly mention the errors and solutions that may
be encountered when creating and calling contracts:

- NotEnoughBalance: This can only be solved by obtaining mining
  rewards or transfers by others.
- OutOfGas: The default gas is relatively small and it is usually not
  enough when creating and calling contracts, so it is generally
  necessary to manually specify the gas consumed.
- AmountIsDustOrZero: In order to avoid being attacked, the system
  will reject outputs with too small amount. If you want to know more,
  please refer to [here](misc/On-dust-outputs-and-state-explosion.md).

Interested people can try to create various contracts on the mainnet
and migrate ETH applications to Alephium.
