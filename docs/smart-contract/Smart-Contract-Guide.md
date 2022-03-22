# Smart Contract Guide

This document guides you through the creation, deployment and usage of smart contracts on Alephium mainnet.

We will first deploy a contract which allows any user to exchange **ALPH** for tokens. Then we will deploy a script which calls the contract to buy tokens.

This document is based on the [Chinese smart contract tutorial and documentation](https://github.com/Lbqds/alephium-docs/blob/master/contract.md) by [Lbqds](https://github.com/Lbqds).

## Table of Contents

- [Requirements](#requirements)
- [Create and deploy a token contract](#create-and-deploy-a-token-contract)
  - [Create a token Contract](#create-a-token-contract)
  - [Compile a Contract](#compile-a-contract)
  - [Build an unsigned contract transaction](#build-an-unsigned-contract-transaction)
  - [Sign a contract](#sign-a-contract)
  - [Submit a contract](#submit-a-contract)
- [Create and deploy a script](#create-and-deploy-a-script)
  - [Create a TxScript](#create-a-txscript)
  - [Compile a Script](#compile-a-script)
  - [Build an unsigned script transaction](#build-an-unsigned-script-transaction)
  - [Sign a script](#sign-a-script)
  - [Submit a script](#submit-a-script)
- [Contract State](#contract-state)

## Requirements

For this tutorial you will need to have a node running locally and a wallet. Here are the related tutorials:

- [How to launch your node](https://github.com/alephium/alephium/wiki/Starter-Guide---How-to-Launch-your-node)
- [How to setup a wallet](https://github.com/alephium/alephium/wiki/Wallet-Guide)

We will use a wallet named `demo-1` in this tutorial.

## Create and deploy a token contract

In this section we will create, build, sign and submit a contract transaction.

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

This simple token contract allows users to buy tokens by paying **ALPH** to the contract owner at a rate `1:1000`. It uses the following built-in functions:

* `assert!(pred)` Causes the contract execution to fail when `pred` evaluates to `false`
* `selfTokenId!(a)` Returns the current token id which is also the current contract id
* `transferAlph!(from, to, alphAmount)` Transfers `alphAmount` **ALPH** from address `from` to `to`.
* `transferTokenFromSelf!(to, tokenId, tokenAmount)` Transfers `tokenAmount` tokens of `MyToken` to address `to`.

**Note**: The `remain` variable is not necessary but helps understanding state variables of the contract. We will explain how the contract state is stored later.

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
  "code": "0201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101"
}
```

### Build an unsigned contract transaction
Now we need to create the contract transaction. First we obtain the publicKey of the address currently in use. We use address `1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r`.

```bash
curl 'http://127.0.0.1:12973/wallets/demo-1/addresses/1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r'
```

We obtain the following response:

```json
{
  "address": "1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r",
  "publicKey": "027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a7"
}
```

Then we build the contract transaction.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/build-contract' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a7",
  "code": "0201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101",
  "gas": 80000,
  "state": "[@1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r,10000000000000000000000000000u]",
"issueTokenAmount": "10000000000000000000000000000"
}'
```

The parameters are:

* `fromPublicKey`  Public key from the address currently in use
* `code` Contract binary code
* `gas` Manually specified gas as the default gas may not be enough for contract related operations
* `state` List of initial state variables passed to the contract constructor
* `issueTokenAmount` The total number of tokens issued by the contract

We get the following response:

```json
{
  "unsignedTx": "0101010101000000071500a273b4a26cef6181b90a80c5e8738478ed35b9ea10f9e00e12225174a86ebd8113c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400a273b4a26cef6181b90a80c5e8738478ed35b9ea10f9e00e12225174a86ebd8102c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae80013880c1174876e8000145827e150d3aa8643039f353c4e0f6bc554d53e61304f566f3302323c89eede0b86e130d00027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a700",
  "hash": "8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22",
  "contractId": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
  "fromGroup": 0,
  "toGroup": 0
}

```
### Sign a contract
Next, we sign the previously obtained transaction hash.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/wallets/demo-1/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": "8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22"
}'
```
The response contains the signature.

```json
{
  "signature": "6bc932a4c9c8c4e8a38fe7f93bd5d43bfe19a3aea2f9d976376951ec7499f5b472e299a12b52e459d66ef13a5aa9de195b2fa97d461e9853eae2281dda4d3cba"
}
```
### Submit a contract
Finally we submit the contract transaction to the Alephium network.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/transactions/submit' \
  -H 'Content-Type: application/json' \
  -d '{
  "unsignedTx": "0101010101000000071500a273b4a26cef6181b90a80c5e8738478ed35b9ea10f9e00e12225174a86ebd8113c1e8d4a51000a21440300201402c01010204001616011343e82c1702a0011602344db117031600a0001601a7160016031602aba00116022ba101144031020400a273b4a26cef6181b90a80c5e8738478ed35b9ea10f9e00e12225174a86ebd8102c8204fce5e3e2502611000000013c8204fce5e3e25026110000000ae80013880c1174876e8000145827e150d3aa8643039f353c4e0f6bc554d53e61304f566f3302323c89eede0b86e130d00027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a700",
  "signature": "6bc932a4c9c8c4e8a38fe7f93bd5d43bfe19a3aea2f9d976376951ec7499f5b472e299a12b52e459d66ef13a5aa9de195b2fa97d461e9853eae2281dda4d3cba"
}'
```
If the request is valid, a response similar to the following is returned.

```json
{
  "txId": "8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22",
  "fromGroup": 0,
  "toGroup": 0
}
```

In order to understand the contract creation process more clearly, let's take a look at the specific content of the above tx. Currently there is no friendly interface to examine the content of a transaction so we need fetch the block containing the transaction via the node API. (You can obtain the block hash of a transaction either via the explorer or the endpoint `GET /transaction/status?txId={txId}`)

```bash
curl 'http://127.0.0.1:12973/blockflow/blocks/000000eb4a6e3d3327ef1deeb3f2bc49d4b4af637c749a49bea2a0bfd63d6590' \
```

We obtain a list of transactions (here we only show 2 out of 5 transactions for readability):

```json
{
  "hash": "000000eb4a6e3d3327ef1deeb3f2bc49d4b4af637c749a49bea2a0bfd63d6590",
  "timestamp": 1633096699956,
  "chainFrom": 0,
  "chainTo": 0,
  "height": 24945,
  "deps": [
    "0000022d620b58c4852640bf497adb353bdddc5238c3d1ee690f2e8fb88d6e75",
    "0000028c0e316c239d44a0f86fd73d57f536e296d73cacea03bb837d6add9bda",
    "00000072e06ddcdf9268e7d4551ac4ca5d8de2467fcd15f2ff11f7a3ded87c7f",
    "000002b60cbf367c591c8b6de3775d3ea042622eefa09ac25e5487e49e331400",
    "000001d7fc80fa66e4ef0a73f54400ae622f8feb27679a3f77f71b35f6477bb1",
    "000000d2921c3d03228f28ef2ecb49d687913e346af2dec63d89c33edc757472",
    "000001a2f388e1a9dbb41e5475031cd1f3a506bb0703fa7818debc624f39f953"
  ],
  "transactions": [
    {
      "id": "1cb33fd8ff18504c6b0432dfeac03ffd050226e62f8c1b14213d5e7bd2533786",
      "inputs": [
        {
          "type": "asset",
          "outputRef": {
            "hint": 1472622741,
            "key": "c89da3210c5f709cd9363f6c12c3fdd1ac7da9f063c05ac9bb0d0fbd5698ba17"
          },
          "unlockScript": "0003dc84c5228297efb1d02c95ca9ec6091c065d4c8a3695ecce9e2c0dd0d04fafbd"
        }
      ],
      "outputs": [
        {
          "type": "asset",
          "amount": "3440997000000000",
          "address": "1BBEMJQpRzFcKsQgfnVH2KhLgP5haD1o7D8dTSQ9QJS1q",
          "tokens": [],
          "lockTime": 0,
          "additionalData": ""
        },
        {
          "type": "asset",
          "amount": "1700253026000000000",
          "address": "125hGgrju9sgDsxd5kkdVm1D6aaGqXRXwcDZjk1WE9DdY",
          "tokens": [],
          "lockTime": 0,
          "additionalData": ""
        }
      ],
      "gasAmount": 20000,
      "gasPrice": "100000000000"
    },
    ,
    {
      "id": "8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22",
      "inputs": [
        {
          "type": "asset",
          "outputRef": {
            "hint": 1166179861,
            "key": "0d3aa8643039f353c4e0f6bc554d53e61304f566f3302323c89eede0b86e130d"
          },
          "unlockScript": "00027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a7"
        }
      ],
      "outputs": [
        {
          "type": "contract",
          "amount": "1000000000000",
          "address": "uomjgUz6D4tLejTkQtbNJMY8apAjTm1bgQf7em1wDV7S",
          "tokens": [
            {
              "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
              "amount": "10000000000000000000000000000"
            }
          ]
        },
        {
          "type": "asset",
          "amount": "3991999000000000000",
          "address": "1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r",
          "tokens": [],
          "lockTime": 0,
          "additionalData": ""
        }
      ],
      "gasAmount": 80000,
      "gasPrice": "100000000000"
    },
  ]
}
```

We only focus on the transaction with id `8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22`.

```json
{
  "id": "8d01198f2ec74b1e5cfd8c8a37d6542d16ee692df47700ce2293e0a22b6d4c22",
  "inputs": [
    {
      "type": "asset",
      "outputRef": {
        "hint": 1166179861,
        "key": "0d3aa8643039f353c4e0f6bc554d53e61304f566f3302323c89eede0b86e130d"
      },
      "unlockScript": "00027b029462e7df54cd218cc46e2f3c8fd6cfd3c0d475474e5a3ded70d809df04a7"
    }
  ],
  "outputs": [
    {
      "type": "contract",
      "amount": "1000000000000",
      "address": "uomjgUz6D4tLejTkQtbNJMY8apAjTm1bgQf7em1wDV7S",
      "tokens": [
        {
          "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
          "amount": "10000000000000000000000000000"
        }
      ]
    },
    {
      "type": "asset",
      "amount": "3991999000000000000",
      "address": "1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r",
      "tokens": [],
      "lockTime": 0,
      "additionalData": ""
    }
  ],
  "gasAmount": 80000,
  "gasPrice": "100000000000"
}
```

This transaction has one input and two outputs. Below is the description of the some fields:
* `outputRef` pointer to UTXO
* `outputRef.key` UTXO hash
* `type` the type of the tx output, `contract` or `asset`
* `address` base58 encoding of the `contract` or `asset` address
* `amount` the amount of ALPH owned by the address
* `tokens` list of tokens owned by the address
* `tokens.id` contract id
* `tokens.amount` the amount of tokens owned

The first output is the contract we just created. We see that the contract address owns `10000000000000000000000000000` tokens which is exactly the `issueTokenAmount` we previously defined.

The second output is the UTXO output of the transaction submitted by our address `1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r`. This address doesn't own any tokens.

## Create and deploy a script
Now that the contract has been successfully created, we will deploy a `TxScript` which calls the `Mytoken.buy` method to obtain tokens by paying **ALPH** to the contract. For this example, we will pay using address `1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9` which is different than the one used to create the contract.

If you also want to pay with an address different than the one used to submit the contract, please make sure that your address belongs to the same group as the contract. You can obtain the contract group by checking the `chainFrom` field of its transaction block. In our example, the contract is in group 0, but it might be in a different group for you. You can verify the group of an address at endpoint `GET addresses/{address}/group`. If it is not the case, you can use `POST/wallets/{wallet_name}/derive-next-address` until you obtain an address in the correct group. As new addresses are initialized with balance `0`, you should transfer some **ALPH** to this new address. Finally, change your active address at endpoint `POST wallets/{wallet_name}/change-active-address`.

### Create a TxScript
We first create the `TxScript` to buy some tokens.
```rust
TxScript Main {
  pub payable fn main() -> () {
    approveAlph!(@1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9, 1000000000000000000)
    let contract = MyToken(#109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25)
    contract.buy(@1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9, 1000000000000000000)
  }
}
```
Here is a brief explanation of this code:

* `approveAlph!(address, amount)` authorizes the specified amount of `ALPH` from the address to be used in the script.
* The contract is loaded by its `id`
* Call `MyToken.buy` to buy 1000 tokens for 1 **ALPH**

The next steps are very similar to the previous sections. We will compile, build, sign and submit the script.

### Compile a Script
We query the node API to compile the script to binary code. **Make sure you append the source code of the `MyToken` contract after your `TxScript` code.**

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/compile-script' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "TxScript Main {\n  pub payable fn main() -> () {\n    approveAlph!(@1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9, 1000000000000000000)\n    let contract = MyToken(#109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25)\n    contract.buy(@1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9, 1000000000000000000)\n  }\n}\nTxContract MyToken(owner: Address, mut remain: U256) {\n  pub payable fn buy(from: Address, alphAmount: U256) -> () {\n    let tokenAmount = alphAmount * 1000\n    assert!(remain >= tokenAmount)\n    let tokenId = selfTokenId!()\n    transferAlph!(from, owner, alphAmount)\n    transferTokenFromSelf!(from, tokenId, tokenAmount)\n    remain = remain - tokenAmount\n  }\n}"
}'
```
A response similar to the following will be returned:

```json
{
  "code": "010101000100091500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a7640000a2144020109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba2517001500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a764000016000100"
}
```
### Build an unsigned script transaction
We first obtain the publicKey of the active address:

```bash
curl 'http://127.0.0.1:12973/wallets/demo-1/addresses/1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9'
```
We get a response similar to:

```json
{
  "address": "1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9",
  "publicKey": "02d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0"
}
```

Then we build the unsigned transaction:

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/contracts/build-script' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromPublicKey": "02d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0",
  "code": "010101000100091500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a7640000a2144020109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba2517001500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a764000016000100",
  "gas": 80000
}'
```

We obtain the following response:

```json
{
  "unsignedTx": "0101010101000100091500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a7640000a2144020109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba2517001500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a76400001600010080013880c1174876e80002d8d380f36d9df13e2b5d0bbb80a186e9a931e3a8044b1392a244274e029553af7c108d760002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0d8d380f3b9df6551974363e5c69ba811c484e94304b0d2c86e61be4850d1872cd4923a140002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be000",
  "hash": "3fb33e83cf246fff900c5ff59d2ce3f835816dcf936922471337a7df893325bf",
  "fromGroup": 0,
  "toGroup": 0
}
```
### Sign a script
Next, we sign the transaction hash:

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/wallets/demo-1/sign' \
  -H 'Content-Type: application/json' \
  -d '{
  "data": "3fb33e83cf246fff900c5ff59d2ce3f835816dcf936922471337a7df893325bf"
}'
```
And we receive the signature:

```json
{
  "signature": "1aa1aa909fca1b24dbf95bc105eceab08992ff88622424d8055531d06ce56d0832d4d468b23c9484bb471c193f912ad96dc3378c670e32527598479de721c750"
}
```

### Submit a script
Finally we can submit the transaction.

```bash
curl -X 'POST' \
  'http://127.0.0.1:12973/transactions/submit' \
  -H 'Content-Type: application/json' \
  -d '{
  "unsignedTx": "0101010101000100091500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a7640000a2144020109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba2517001500c632fb35c006d09c104c9a1075c03adde92636de8a5ea3be934a65cfebb0321813c40de0b6b3a76400001600010080013880c1174876e80002d8d380f36d9df13e2b5d0bbb80a186e9a931e3a8044b1392a244274e029553af7c108d760002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0d8d380f3b9df6551974363e5c69ba811c484e94304b0d2c86e61be4850d1872cd4923a140002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be000",
  "signature": "1aa1aa909fca1b24dbf95bc105eceab08992ff88622424d8055531d06ce56d0832d4d468b23c9484bb471c193f912ad96dc3378c670e32527598479de721c750"
}'
```
And we receive the `txId` and groups information:

```json
{
  "txId": "3fb33e83cf246fff900c5ff59d2ce3f835816dcf936922471337a7df893325bf",
  "fromGroup": 0,
  "toGroup": 0
}
```

Again, we can find the transaction on the mainnet by query the block containing the transaction. We observe the following transaction content:

```json
{
  "id": "3fb33e83cf246fff900c5ff59d2ce3f835816dcf936922471337a7df893325bf",
  "inputs": [
    {
      "type": "asset",
      "outputRef": {
        "hint": -657227533,
        "key": "6d9df13e2b5d0bbb80a186e9a931e3a8044b1392a244274e029553af7c108d76"
      },
      "unlockScript": "0002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0"
    },
    {
      "type": "asset",
      "outputRef": {
        "hint": -657227533,
        "key": "b9df6551974363e5c69ba811c484e94304b0d2c86e61be4850d1872cd4923a14"
      },
      "unlockScript": "0002d6ab089cd90b9017d209f8acad31b22cd4da2059caf48b0b64a2b6bc9b145be0"
    },
    {
      "type": "contract",
      "outputRef": {
        "hint": -527339900,
        "key": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25"
      }
    }
  ],
  "outputs": [
    {
      "type": "asset",
      "amount": "1000000000000000000",
      "address": "1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r",
      "tokens": [],
      "lockTime": 0,
      "additionalData": ""
    },
    {
      "type": "asset",
      "amount": "4992000000000000000",
      "address": "1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9",
      "tokens": [
        {
          "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
          "amount": "1000000000000000000000"
        }
      ],
      "lockTime": 0,
      "additionalData": ""
    },
    {
      "type": "contract",
      "amount": "1000000000000",
      "address": "uomjgUz6D4tLejTkQtbNJMY8apAjTm1bgQf7em1wDV7S",
      "tokens": [
        {
          "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
          "amount": "9999999000000000000000000000"
        }
      ]
    }
  ],
  "gasAmount": 80000,
  "gasPrice": "100000000000"
}
```

We can see that there is a contract input, with the `outputRef.key` pointing to the contract we created earlier.

```json
{
  "type": "contract",
  "outputRef": {
    "hint": -527339900,
    "key": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25"
  }
}
```
This time we have three outputs: two assets and a contract. The first output is the new UTXO for the 1 **ALPH** payed to the contract owner.

```json
{
  "type": "asset",
  "amount": "1000000000000000000",
  "address": "1Bw9NuSufuvi1EgWFe9uCQS3xi1gkZ81mtdPRhPbSqw5r",
  "tokens": [],
  "lockTime": 0,
  "additionalData": ""
}
```

The second output is a new UTXO equivalent to the change of the consumed UTXOs for the payment to the contract owner. Additionnally, The first item in the `tokens` list corresponds to the tokens we just bought! The id corresponds to the one of our contract.

```json
{
  "type": "asset",
  "amount": "4992000000000000000",
  "address": "1ELgp7U4D1QL82G9q9dAdp43k45onPDezGLjHSFGcwCj9",
  "tokens": [
    {
      "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
      "amount": "1000000000000000000000"
    }
  ],
  "lockTime": 0,
  "additionalData": ""
}
```

The third output is the contract after the exchange. We observe that the amount of tokens changed from `10000000000000000000000000000` to `9999999000000000000000000000`. The difference is equivalent to the amount of tokens we bought.

```json
{
  "type": "contract",
  "amount": "1000000000000",
  "address": "uomjgUz6D4tLejTkQtbNJMY8apAjTm1bgQf7em1wDV7S",
  "tokens": [
    {
      "id": "109b05391a240a0d21671720f62fe39138aaca562676053900b348a51e11ba25",
      "amount": "9999999000000000000000000000"
    }
  ]
}
```

Congratulations! You have deployed and used your first smart contract on Alephium! 🚀

## Contract State

From the previous sections, we can see that:

* When a contract is created, a contract output will be generated regardless of whether a token is issued or not. If a token is issued, there will be an initial number of tokens in the output tokens list.
* Calling the contract will consume the contract output and generate a new contract output. In the above example, we can see that the contract output generated when the contract is created is consumed, and then a new contract output is generated.
* Calling the contract may also modify the state of the contract. In the above example, it will be modified after calling `MyToken.buy`.

Let's take a look at what the contract state specifically includes:

```scala
final case class ContractState private (
    code: StatefulContract.HalfDecoded,
    initialStateHash: Hash,
    fields: AVector[Val],
    contractOutputRef: ContractOutputRef
)
```
where the fields are:

* `code`: Contract code half-decoded. Since only part of the code may be involved when calling the contract, there is no need to completely decode it.
* `initialStateHash`: The hash of the initial contract state
* `fields`: Vector of state values. `AVector(owner, remain)` in the `MyToken` example.
* `contractOutputRef`: Pointer to contract output


The process of calling and changing the state of the contract is roughly as follows:

1. Load the contract state from the WorldState, which is a storage for UTXOs, smart contracts state and code.
2. Load contract output pointed by `contractOutputRef` according to the contract state (executed when method is payable)
3. When the contract execution involves modifications of the contract state, the contract state in WorldState will be updated
4. If the contract generates a new contract output, the contract state will be updated and the old contract output will be deleted


In addition, we will briefly mention the errors and solutions that may be encountered when creating and calling contracts:

* NotEnoughBalance: This can only be solved by obtaining mining rewards or transfers by others.
* OutOfGas: The default gas is relatively small and it is usually not enough when creating and calling contracts, so it is generally necessary to manually specify the gas consumed.
* AmountIsDustOrZero: In order to avoid being attacked, the system will reject outputs with too small amount. If you want to know more, please refer to [here](misc/On-dust-outputs-and-state-explosion.md).

Interested people can try to create various contracts on the mainnet and migrate ETH applications to Alephium.
