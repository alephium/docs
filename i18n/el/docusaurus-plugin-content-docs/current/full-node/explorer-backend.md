---
sidebar_position: 30
title: Explorer Backend
sidebar_label: Explorer backend
---

## Prerequisites

- Java (11 or 17 is recommended)
- [PostgreSQL](https://www.postgresql.org)
- A running [full node](full-node/getting-started.md)

## Download Application File

Download file `explorer-backend-x.x.x.jar` from [Github release](https://github.com/alephium/explorer-backend/releases/latest).

## Create the database:

1. Start the `postgresql` service.
2. Login to the PostgreSQL shell with the default `postgres` user:
   ```shell
   psql postgres # or `psql -U postgres` depending on your OS
   ```
3. Ensure that the `postgres` role exists, and if not, create it.
   List all roles:
   ```shell
   postgres=# \du
   ```
   Create `postgres` role:
   ```shell
   postgres=# CREATE ROLE postgres WITH LOGIN;
   ```
4. Then, create the database:
   ```shell
   postgres=# CREATE DATABASE explorer;
   ```

## Start your explorer-backend

```shell
java -jar explorer-backend-x.x.x.jar
```

Your explorer-backend will start to sync with the full node. It might take long the first time

## Start from a snapshot

To reduce the first syncing time, you can restore one of our snapshot. Snapshots are available [here](https://archives.alephium.org/#mainnet/explorer-db/).

Download the latest one, extract it, and run:

```shell
psql explorer < explorer-db-xxx.pg_dump
```

Please note that the `explorer` database must have been created before and be empty.
