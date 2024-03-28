---
sidebar_position: 10
title: Testnet Rehberi
sidebar_label: Testnet rehberi
---

Testnet için tam düğümün kurulumu ana ağla aynıdır: [Tam Düğüm Başlangıç Rehberi](full-node/getting-started.md)

**Tam düğümü başlatmadan önce `user.conf` dosyasını değiştirmeniz gerekmektedir**.

Lütfen REST API için varsayılan adres ve bağlantı noktasının [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) olduğunu unutmayın.

## Yapılandırma

`$HOME/.alephium/user.conf` (`user.conf` kullanılıyorsa) dosyasına aşağıdaki satırları eklemelisiniz:

```
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
```

## Madencilik

Testnet'te bazı ALPH almak için [CPU Madenci Rehberi](cpu-miner-guide.md)'ni kullanabilirsiniz.

Madenci adreslerinizi `$HOME/.alephium/user.conf` dosyasına aşağıdaki gibi ekleyin:

```
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

:::info 

[Desktop cüzdanı](../wallet/desktop-wallet/configure-mining-wallet) yükleyerek kolayca madencilik adresleri oluşturabilir ve 4 adet adres içeren bir cüzdan oluşturabilirsiniz. Ardından adresleri kopyalayıp yukarıdaki `user.conf` dosyasına yapıştırabilirsiniz.

:::

## Yapılandırma örneği

```
alephium.api.network-interface = "0.0.0.0"
alephium.mining.api-interface = "0.0.0.0"
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
alephium.api.api-key-enabled = false
```
