---
sidebar_position: 50
title: Geliştirme Ağı (Devnet)
sidebar_label: Geliştirme Ağı (Devnet)
---

# Yerel Bir Devnet Oluşturun

## Docker Kullanarak

Eğer yerel bir geliştirme ağı oluşturmak ve keşif desteği almak istiyorsanız, lütfen `docker-compose` kullanın ve [alephium-stack](https://github.com/alephium/alephium-stack#devnet) rehberindeki talimatları izleyin.

## Jar dosyalarını manuel olarak kullanma

### Tam düğüm

Dosyayı (`alephium-x.x.x.jar`) [Github yayınından](https://github.com/alephium/alephium/releases/latest) indirin (çift tıklamayın, bu şekilde başlatılamaz).

`~/.alephium/user.conf` adresinde bir yapılandırma dosyası yazın, aşağıdaki örnek [alephium-stack deposundan](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf) alınmıştır:

```conf
# Bu tanımlama anahtarını içe aktarın, adresleriniz için ayrılmış 4'000'000 jeton almak için
#
# vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava

alephium.genesis.allocations = [
  {
    address = "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "14UAjZ3qcmEVKdTo84Kwf4RprTQi86w2TefnnGFjov9xF",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "15jjExDyS8q3Wqk9v29PCQ21jDqubDrD8WQdgn6VW2oi4",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "17cBiTcWhung3WDLuc9ja5Y7BMus5Q7CD9wYBxS1r1P2R",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  }
]

alephium.consensus.num-zeros-at-least-in-hash = 0
alephium.consensus.uncle-dependency-gap-time = 0 seconds
alephium.network.leman-hard-fork-timestamp = 1643500800000 # GMT: 30 Ocak 2022 00:00:00

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true
alephium.node.event-log.enabled=true
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true

alephium.network.rest-port = 22973
alephium.network.ws-port = 21973
alephium.network.miner-api-port = 20973
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key-enabled = false
alephium.mining.api-interface = "0.0.0.0"
alephium.network.bind-address  = "0.0.0.0:19973"
alephium.network.internal-address  = "alephium:19973"
alephium.network.coordinator-address  = "alephium:19973"

# rastgele madencilik adresleri
alephium.mining.miner-addresses = [
  "1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
  "1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
  "193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
  "16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

Not: Mnemonik (24 kelime) ve ilgili adresler, geliştirme amaçları için oluşturulmuştur, bunu kullanabilir veya kendi mnemonik ve adresinizi oluşturabilirsiniz, ancak asla bunu mainnet üzerinde kullanmayın.
Daha fazla adres ekleyebilirsiniz. Adresleri daha sonra değiştirmek isterseniz, devnetinizi silip yeniden başlatmanız gerekecektir.
Şimdi `devnet`'inizi başlatabilirsiniz:

```sh
java -jar alephium-x.x.x.jar
```

Artık tam düğümün API'sine şu adresten erişebilirsiniz: `http://localhost:22973/docs`

### Explorer-backend

Gereksinim: https://www.postgresql.org/

Dosyayı (`explorer-backend-x.x.x.jar`) [Github yayınından](https://github.com/alephium/explorer-backend/releases/latest) indirin.

PostgreSQL'ye bağlanın ve devnetiniz için bir veritabanı oluşturun

```sql
CREATE DATABASE devnet;
```

Hangi ayarların geçersiz kılınabileceğini görmek için [yapılandırma dosyasına](https://github.com/alephium/explorer-backend/blob/feature/contract-subcontract/app/src/main/resources/application.conf) bakabilirsiniz. Daha sonra `explorer-backend`'inizi yapılandırabilir ve başlatabilirsiniz:

```sh
export BLOCKFLOW_NETWORK_ID=2
export BLOCKFLOW_PORT=22973
export DB_NAME=devnet
java -jar explorer-backend-x.x.x.jar
```
