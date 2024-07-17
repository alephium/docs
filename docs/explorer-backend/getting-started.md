---
sidebar_position: 1
title: Getting Started
sidebar_label: Getting started
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

Your explorer-backend will start to sync with the full node. It might take long the first time or [start from a snapshot](explorer-backend/loading-snapshot.md).


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
