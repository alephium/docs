---
sidebar_position: 10
title: Başlarken
sidebar_label: Başlarken
---

## Gereksinimler

- Java (11 veya 17 önerilir)
- [PostgreSQL](https://www.postgresql.org)
- [Çalışan tam düğüm](full-node/getting-started.md)

## Uygulama Dosyasını İndirin

[GitHub sürümünden](https://github.com/alephium/explorer-backend/releases/latest) `explorer-backend-x.x.x.jar` dosyasını indirin.

## Veritabanını Oluşturun:

1. `postgresql` servisini başlatın.
2. PostgreSQL kabuğuna varsayılan `postgres` kullanıcısı ile giriş yapın:
   ```shell
   psql postgres # or `psql -U postgres` depending on your OS
   ```
3. `postgres` rolünün var olduğundan ve yoksa oluşturulduğundan emin olun.
   Tüm rolleri listele:
   ```shell
   postgres=# \du
   ```
   `postgres` rolünü oluşturun:
   ```shell
   postgres=# CREATE ROLE postgres WITH LOGIN;
   ```
4. Daha sonra, veritabanını oluşturun:
   ```shell
   postgres=# CREATE DATABASE explorer;
   ```

## Explorer-backend'inizi Başlatın

```shell
java -jar explorer-backend-x.x.x.jar
```

Explorer-backend'iniz tam düğümle senkronize olmaya başlayacaktır. İlk sefer buzun sürebilir

## Anlık Görüntüden Başlama

İlk senkronizasyon süresini azaltmak için, anlık görüntülerden birini geri yükleyebilirsiniz.

Anlık görüntüler [archives.alephium.org](https://archives.alephium.org/#mainnet/explorer-db/) adresinde bulunmaktadır.

```shell
psql explorer < explorer-db-xxx.pg_dump
```

Lütfen `explorer` veritabanının önceden oluşturulmuş ve boş olması gerektiğini unutmayın.