---
sidebar_position: 40
title: Node Cüzdanı
sidebar_label: Node Cüzdanı
---

Cüzdan API'sine [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) adresindeki Swagger UI aracılığıyla veya `curl` kullanarak erişilebilir. Tam düğümünüzün çalıştığından emin olun, böylece Swagger UI'ye erişebilirsiniz.

## Yeni bir cüzdan oluşturun

Aşağıdaki verilerle `/wallets` adresine POST işlemi yaparak yeni bir cüzdan oluşturabilirsiniz.

```json
{
  "password": "123456",
  "walletName": "foo" //isteğe bağlı (varsayılan olarak wallet-x)
}
```

Sunucunun, yeni cüzdan mnemoniklerimizi size başarıyla vermesi gerekmektedir.

```json
{
  "walletName": "foo",
  "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer"
}
```

Yeni cüzdan adresinizi  `GET /wallets/{wallet_name}/addresses` ile alın.

```json
{
  "activeAddress": "T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw",
  "addresses": ["T1J2yrmQrNwuFW8z2W6xXFLtJoBCWEm7gLg9BuY8tzKjxw"]
}
```

Daha önce bir kez bir cüzdan oluşturduysanız ancak silindi veya şifrenizi hatırlamıyorsanız,  `mnemonic` kullanarak cüzdanınızı geri yükleyebilirsiniz:
```
PUT /wallets
{
    "password": "123456",
    "mnemonic": "laptop tattoo torch range exclude fuel bike menu just churn then busy century select cactus across other merge vivid alarm asset genius mountain transfer",
    "walletName": "foo" //optional
}
```

## Kilitleme/Açma

Bir süre sonra cüzdanınız otomatik olarak kilitlenecektir, kullanmak istiyorsanız kilidini açmanız gerekecektir:

```
POST /wallets/{wallet_name}/unlock
{
    "password": "123456"
}
```

Ayrıca manuel olarak kilitleyebilirsiniz:

```
POST /wallets/{wallet_name}/lock
```

## Bakiye sorgusu

Mevcut bakiyeyi `GET /wallets/{wallet_name}/balances` ile kontrol edebilirsiniz. Yanıt:

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

## Fon transferi

Bir cüzdandan bir adrese bir işlem gönderebilirsiniz:

```
POST /wallets/{wallet_name}/transfer
{
    "destinations ": [{
        "address": "<the destination address>",
        "amount ": "42 ALPH"
    }]
}
```

Sunucu, işlem kimliği ve grup bilgileriyle başarılı bir şekilde yanıt vermelidir.

```json
{
  "txId": "50318e5bfd56796690890f4a9c5aae2725629a15a71cad909bbf4a669c32c2f4",
  "fromGroup": 0,
  "toGroup": 3
}
```
