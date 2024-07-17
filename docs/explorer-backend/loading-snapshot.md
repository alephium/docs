---
sidebar_position: 5
title: Load from a snapshot
sidebar_label: Load from snapshot
---
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
