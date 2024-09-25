---
sidebar_position: 15
title: Explorer Backend
sidebar_label: Explorer backend
---

Alephium's explorer backend is an indexer that provides a RESTful API to query the Alephium blockchain.

It serves https://explorer.alephium.org/ as well as our wallets.

Find more information in the [Alephium Explorer Backend repository](https://github.com/alephium/explorer-backend/)

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

Your explorer-backend will start to sync with the full node. When syncing for the first time the process might take long. To speed it up you can [start from a snapshot](#start-from-a-snapshot).


## Configuration

The default configuration is available in [application.conf](https://github.com/alephium/explorer-backend/blob/master/app/src/main/resources/application.conf).

Everything can be override with two ways:

### `user.conf` file

You can change the config with the `~/.alephium-explorer-backend/user.conf` file. e.g:

```conf
alephium {
  explorer {
      port = 9191 //Change default 9090 port
  }
}
```

### Environment variables:

Every value has a corresponding environment variable, you can find all of them in the [application.conf](https://github.com/alephium/explorer-backend/blob/master/app/src/main/resources/application.conf).  e.g:

```shell
export EXPLORER_PORT=9191

```

## Start from a snapshot

Alephium [archives repository](https://archives.alephium.org) also contain the snapshots for explorer backend database.
The snapshot can be loaded in the postgresql database of the explorer backend at the first run, using the command below.

* Make sure to use the network you want to load the snapshot for, and the correct database name and user.
* The database must be created before running the command and must be empty.

```shell
alephium_network=mainnet
pg_user=postgres
database=explorer
curl -L $(curl -L -s https://archives.alephium.org/archives/${alephium_network}/explorer-db/_latest.txt) | gunzip -c | psql -U $pg_user -d $database
```
