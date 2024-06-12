---
sidebar_position: 20
title: Geliştirme Ağı Rehberi
sidebar_label: Geliştirme ağı rehberi
---

Boş blok geçmişi ve isteğe bağlı miktarda jetonla başlayan yerel bir geliştirme ağı oluşturmak geliştiriciler için uygun olacaktır.

Geliştirme ağı için tam düğümün kurulumu ana ağla aynıdır: [Tam Düğüm Başlangıç Rehberi](full-node/getting-started.md)

**Tam düğümü başlatmadan önce `user.conf` dosyasını değiştirmeniz gerekmektedir**.

Lütfen REST API için varsayılan adres ve bağlantı noktasının [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) olduğunu unutmayın.

## Yapılandırma

`$HOME/.alephium/user.conf` (`user.conf` kullanılıyorsa) dosyasına aşağıdaki satırları eklemelisiniz:

```
// çoğu durumda, aşağıdaki iki satırı değiştirin
alephium.genesis.allocations = [{address = "<kendi-adresiniz>", amount = 1000000000000000000000000, lock-duration = 0 seconds}] // Adresinize tahsis edilen 1 milyon jeton
alephium.consensus.num-zeros-at-least-in-hash = 0

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true

// isteğe bağlı madencilik adresleri
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

Lütfen kendi adreslerinizi genesis tahsisleri için kullanın. Ayrıca madencilik daha hızlı olsun istiyorsanız `num-zeros-at-least-in-hash` değerini azaltabilirsiniz.

Daha fazla yapılandırma dosya yolunda `$HOME/.alephium/network-4/` bulunabilir ve günlükler `$HOME/.alephium/logs/` içinde bulunabilir.

Eğer `user.conf` dosyasını değiştiriyorsanız, tam düğümü yeniden başlatmadan önce `$HOME/.alephium/network-4/` klasörünü temizlemeniz daha iyi olacaktır.

## Madencilik

Örnek yapılandırma dosyasıyla geliştirme ağı, tüm yeni işlemler için otomatik olarak yeni blokları kazabilir. Madencilik için CPU kullanmanıza gerek yoktur.

Geliştirme ağını madencilik testleri için kullanmak istiyorsanız, lütfen şu şekilde göreceli yüksek bir zorluk belirleyin:

```
alephium.consensus.num-zeros-at-least-in-hash = 24
```
