---
sidebar_position: 40
title: Node Wallet
sidebar_label: Node Wallet
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Die Wallet-API kann über unsere Swagger UI unter [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs)  oder durch Verwendung von `curl` aufgerufen werden. Stellen Sie sicher, dass Ihr Full Node ausgeführt wird, damit Sie auf die 
Swagger UI zugreifen können.

## Erstellen Sie eine neue Wallet

Sie können eine neue Wallet erstellen, indem Sie eine POST-Anfrage mit den folgenden Daten an `/wallets` senden.

```json
{
  "password": "123456",
  "walletName": "foo" //optional (wallet-x) by default
}
```

Der Server muss erfolgreich antworten und Ihnen Ihre neue Wallet-Mnemonic geben.

```json
{
  "walletName": "foo",
  "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer"
}
```

Rufen Sie Ihre neue Wallet-Adresse mit `GET /wallets/{wallet_name}/addresses` ab.

```json
{
  "activeAddress": "T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw",
  "addresses": ["T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw"]
}
```

Wenn Sie bereits einmal eine Wallet erstellt haben, diese jedoch gelöscht wurde oder Sie Ihr Passwort vergessen haben, können Sie Ihre Wallet mit Ihrer `mnemonic` wiederherstellen, indem Sie:

```
PUT /wallets
{
    "password": "123456",
    "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer",
    "walletName": "foo" //optional
}
```

## Sperren/Entsperren

Ihre Wallet wird automatisch nach einiger Zeit gesperrt. Sie müssen sie entsperren, wenn Sie sie verwenden möchten:

```
POST /wallets/{wallet_name}/unlock
{
    "password": "123456"
}
```

Sie können sie auch manuell sperren:

```
POST /wallets/{wallet_name}/lock
```

## Abfrage des Kontostands

Sie können den aktuellen Kontostand mit `GET /wallets/{wallet_name}/balances`
überprüfen.

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

## Funds übertragen

Sie können eine Transaktion von einer Wallet zu einer Adresse senden, indem Sie:

```
POST /wallets/{wallet_name}/transfer
{
    "destinations ": [{
        "address": "<the destination address>",
        "amount ": "42 ALPH"
    }]
}
```

Der Server muss erfolgreich mit der Transaktions-ID und den Gruppeninformationen antworten.

```json
{
  "txId": "50318e5bfd56796690890f4a9c5aae2725629a15a71cad909bbf4a669c32c2f4",
  "fromGroup": 0,
  "toGroup": 3
}
```
