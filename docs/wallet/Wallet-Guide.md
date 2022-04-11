---
sidebar_position: 10
title: Full Node Wallet Guide
---

The wallet API can be called using our Swagger UI at [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) or by using `curl`. Make sure that your full node is running so you could access the Swagger UI.

## Create a new wallet

You can create a new wallet by doing a POST with the following data on `/wallets`.

```json
{
  "password": "123456",
  "walletName": "foo" //optional (wallet-x) by default
}
```

The server must response successfully giving you our new wallet mnemonic.

```json
{
  "walletName": "foo",
  "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer"
}
```

Fetch your new wallet address by `GET /wallets/{wallet_name}/addresses`

```json
{
  "activeAddress": "T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw",
  "addresses": ["T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw"]
}
```

If you already created a wallet once but it got deleted or you don't remember your password, you can restore your wallet with your `mnemonic` using:

```
PUT /wallets
{
    "password": "123456",
    "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer",
    "walletName": "foo" //optional
}
```

## Lock/Unlock

You wallet will automatically be locked after some time, you'll need to unlock it if you want to use it:

```
POST /wallets/{wallet_name}/unlock
{
    "password": "123456"
}
```

You can also manually lock it:

```
POST /wallets/{wallet_name}/lock
```

## Query for balance

You can check the current balance with `GET /wallets/{wallet_name}/balances`
response:

```json
{
  "totalBalance": 0,
  "balances": [
    {
      "address": "T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw",
      "balance": 0
    }
  ]
}
```

## Transfering funds

You can submit a transaction from a wallet to an address by doing:

```
POST /wallets/{wallet_name}/transfer
{
    "destinations ": [{
        "address": "<the destination address>",
        "amount ": "42 ALPH"
    }]
}
```

The server must response succussfully with the transaction id and the group information.

```json
{
  "txId": "50318e5bfd56796690890f4a9c5aae2725629a15a71cad909bbf4a669c32c2f4",
  "fromGroup": 0,
  "toGroup": 3
}
```
