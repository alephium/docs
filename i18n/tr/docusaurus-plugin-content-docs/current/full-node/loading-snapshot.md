---
sidebar_position: 35
title: Bir anlık görüntüden yükleme
sidebar_label: Bir anlık görüntüden yükleme
---

# Tam düğüm

[başlangıç kılavuzunda](./getting-started) açıklandığı gibi, bir tam düğümün ilk çalıştırılması, diğer ağ düğümleriyle tam senkronize olana kadar birkaç saat alır veya farklı bir ifadeyle, tüm blok zincirinin bir kopyasını indirene kadar.

Bu ilk senkronizasyon sürecini hızlandırmak için anlık görüntüler, [özel Alephium Arşivleri deposunda](https://archives.alephium.org) mevcuttur. Bir otomatik süreç, hem [test ağı](https://archives.alephium.org/#testnet/) hem de [ana ağ](https://archives.alephium.org/#mainnet/) için anlık görüntüler yükler.

## Bir anlık görüntü indirme

Tam düğümü ilk çalıştırmaya hazırlarken, başlatmadan hemen önce en son anlık görüntüyü indirebilir ve (bu bir `tar` dosyasıdır) doğru konuma çıkarabilirsiniz. Aşağıdaki kod parçacığı bunu hatta disk alanını ikiye katlamadan yapar, yani indirme ve anlık görüntünün çıkarılması için gerekli olan disk alanı ihtiyacını karşılar:

```shell
ALEPHIUM_HOME=~/.alephium
ALEPHIUM_NETWORK=mainnet
curl -L "$(curl -sL https://archives.alephium.org/archives/$ALEPHIUM_NETWORK/full-node-data/_latest.txt)" | tar xf - -C "$ALEPHIUM_HOME/"
```

Özel bir `_latest.txt` dosyası, her zaman en son kullanılabilir anlık görüntüye işaret edecek şekilde güncellenir.

## Hazır bir betik kullanma

Yukarıda verilen komut işe yarasa da, tüm kenar durumları kapsamaz ve tam düğüm veritabanını tutarsız bir duruma getirebilecek hatalı durumları ele almaz. Neyse ki, bu görevi yapmak için hazır kullanıma hazır bir betik size yardımcı olur.

```shell
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
curl -L https://github.com/touilleio/alephium-standalone/raw/main/snapshot-loader.sh | env ALEPHIUM_HOME=${ALEPHIUM_HOME} ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} sh
```

## Bağımsız bir konteyner başlatma

Ve son olarak, bu kurulumu hızlı bir şekilde denemek istiyorsanız, resmi `alephium/alephium` görüntüsünü genişleten bir OCI görüntüsü, yukarıdaki adımları otomatik olarak yapmaktadır: `touilleio/alephium-standalone`. [Kaynak kodu](https://github.com/touilleio/alephium-standalone)
kullanımı hakkında gerekli tüm ayrıntıları sağlar.

Bağımsız konteynerı çalıştırmak için hızlı bir referans komutu aşağıda verilmiştir:

```
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
docker run -p 39973:39973 -p 127.0.0.1:12973:12973 \
  -v ${ALEPHIUM_HOME}:/alephium-home/.alephium \
  -e ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} touilleio/alephium-standalone:latest
```

# Explorer veritabanı

[Alephium Arşivleri deposu](https://archives.alephium.org) ayrıca keşif veritabanı anlık görüntüleri ile doldurulmuştur. Anlık görüntü, postgresql veritabanındaki keşif arka ucu (backend) için ilk çalıştırıldığında aşağıdaki komut kullanılarak yüklenebilir:

```shell
ALEPHIUM_NETWORK=mainnet
curl -L $(curl -L -s https://archives.alephium.org/archives/${ALEPHIUM_NETWORK}/explorer-db/_latest.txt) | gunzip -c | psql -U $pg_user -d $database
```
