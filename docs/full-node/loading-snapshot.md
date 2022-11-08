---
sidebar_position: 35
title: Loading from a snapshot
sidebar_label: Loading from snapshot
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Full node
The very first run of a full node, as described in the [getting started](./getting-started) takes few hours until 
it is fully in sync with the other nodes in the network, or said differently, until it downloads a copy of the entire blockchain.

In order to speed up this initial sync process, snapshots are available in the
[dedicated Alephium archive repository](https://archives.alephium.org). An automated process upload snapshots
for both testnet and mainnet networks.

When preparing the full node for its first run, just before launching it, you can download the latest snapshot and
extract (it's a `tar` file) it at the right location. The snippet below even does this inline, i.e. without doubling the
required disk space to download and to extract the snapshot:

```shell
ALEPHIUM_HOME=~/.alephium
ALEPHIUM_NETWORK=mainnet
curl -L "$(curl -s https://s3.eu-central-1.amazonaws.com/archives.alephium.org/archives/$ALEPHIUM_NETWORK/full-node-data/_latest.txt)" | tar xf - -C "$ALEPHIUM_HOME/"
```

A specific file `_latest.txt` is updated for your convenience, always pointing to the latest snapshot available.

If you want to try this setup quickly, an OCI image, simply extending the official `alephium/alephium` image, is doing all the steps
describe above automagically: `touilleio/alephium-standalone`. [Its source code](https://github.com/touilleio/alephium-standalone)
provides all the required details around its usage.

# Explorer database

[Alephium archive repository](https://archives.alephium.org) is also populated with explorer database snapshots. The snapshot
can be loaded in the postgresql database of the explorer backend at the first run, using the command below:

```shell
ALEPHIUM_NETWORK=mainnet
curl -L $(curl -L -s https://s3.eu-central-1.amazonaws.com/archives.alephium.org/archives/${ALEPHIUM_NETWORK}/full-node-data/_latest.txt) | gunzip -c | psql -U $pg_user -d $database
```
