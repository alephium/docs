---
sidebar_position: 30
title: Sorun Giderme
---

# Sorun Giderme

#### Neden 4 madenci adresimden sadece 1'ini geri yükleyebiliyorum?

Madenci adresinizi geri yüklerken `isMiner = true` olarak belirtmeniz gerekmektedir. Lütfen buradaki örneğe bakınız: [Madenci Cüzdanını Geri Yükleme](solo-mining-guide.md#madenci-cüzdanınızı-geri-yükleyin)

#### Madencimi aynı alt ağdaki başka bir bilgisayarımın tam düğümüne nasıl bağlarım?

1. `user.conf` dosyanıza aşağıdakini ekleyin ve tam düğümünüzü yeniden başlatın.

```
alephium.mining.api-interface = "0.0.0.0"
```

2. Madencinizi `-a IP` ile çalıştırın, burada IP alt ağdaki tam düğümünüzün IP'sidir.

#### VPS'de barındırılan tam düğümünün Swagger UI'ını nasıl kullanırım?

SSH port yönlendirmesi önerilir:

```
ssh user@server  -L 12973:127.0.0.1:12973
```

#### Aynı alt ağdaki başka bir bilgisayardaki tam düğümümün Swagger UI'ına nasıl erişirim?

1. `user.conf` dosyanıza aşağıdakini ekleyin ve tam düğümünüzü yeniden başlatın.

```
alephium.api.network-interface = "0.0.0.0"
```

2. Swagger UI'nın `host`unu tam düğümünüzün IP'si olarak değiştirin.

#### Madencim (run-miner.sh ile) başka bir bilgisayardaki tam düğümüme bağlanamıyor

`run-miner.sh` betiği varsayılan olarak `127.0.0.1` adresine bağlanır. `run-miner.sh` içine `-a IP` eklemeniz gerekecektir.

#### Neden Madenci, HiveOS'ta büyük miktarda bellek kullanıyor?

`logs-on` komutu ile `RAM'a yazma` seçeneğini devre dışı bırakmanız gerekmektedir.

#### Cüzdanlar için otomatik kilitleme zamanlayıcısını nasıl özelleştiririm?

Aşağıdaki yapılandırmayla cüzdanın otomatik kilitleme zaman aşımını değiştirebilirsiniz:

```
alephium.wallet.locking-timeout = 10 minutes
```
