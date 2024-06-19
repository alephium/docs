---
sidebar_position: 35
title: Load from a snapshot
sidebar_label: Load from snapshot
---


The initial run of a full node, as outlined in the [get
started](./getting-started) guide, takes ~20 hours to fully sync
with the other nodes in the network. In other words, it takes this
time to download a complete copy of the blockchain.

In order to speed up this initial sync process, snapshots are made available in the dedicated Alephium
[archives repository](https://archives.alephium.org). An automated
process is scheduled to upload snapshots
for both [testnet](https://archives.alephium.org/#testnet/) and [mainnet](https://archives.alephium.org/#mainnet/) networks.

Snapshots for pruned nodes are also
[provided](https://archives.alephium.org/#mainnet/pruned-node-data/)
to reduce the disk requirement for the full node.

## Download the snapshot

Before running full node for the first time, you can download the latest snapshot and
extract (it's a `tar` file) it at the right location. The snippet does
this inline, i.e. without requiring extra disk space to download the
snapshot before extracting it:

```shell
ALEPHIUM_HOME=~/.alephium
ALEPHIUM_NETWORK=mainnet
curl -L "$(curl -sL https://archives.alephium.org/archives/$ALEPHIUM_NETWORK/full-node-data/_latest.txt)" | tar xf - -C "$ALEPHIUM_HOME/"
```

A specific file `_latest.txt` is updated for your convenience, always pointing to the latest snapshot available.

## Using a ready-made script

While the command given above works, it does not cover all the edge failure cases that can happen and can lead the full node
database in an inconsistent state. Luckily a ready-to-use script will help you with this task.

```shell
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
curl -L https://github.com/touilleio/alephium-standalone/raw/main/snapshot-loader.sh | env ALEPHIUM_HOME=${ALEPHIUM_HOME} ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} sh
```

## Launch a standalone container

And finally if you want to try this setup quickly, an OCI image, simply extending the official `alephium/alephium` image, is doing all the steps
describe above automagically: `touilleio/alephium-standalone`. Its [source code](https://github.com/touilleio/alephium-standalone)
provides all the required details around its usage.

A quick reference command to run the standalone container is given below for convenience:

```
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
docker run -p 39973:39973 -p 127.0.0.1:12973:12973 \
  -v ${ALEPHIUM_HOME}:/alephium-home/.alephium \
  -e ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} touilleio/alephium-standalone:latest
```

# Explorer database

Alephium [archives repository](https://archives.alephium.org) also
contain the snapshots for explorer backend database. The snapshot
can be loaded in the postgresql database of the explorer backend at the first run, using the command below:

```shell
ALEPHIUM_NETWORK=mainnet
curl -L $(curl -L -s https://archives.alephium.org/archives/${ALEPHIUM_NETWORK}/explorer-db/_latest.txt) | gunzip -c | psql -U $pg_user -d $database
```
