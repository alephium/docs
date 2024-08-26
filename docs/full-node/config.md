---
sidebar_position: 12
title: Configuration
sidebar_label: Configuration
---

The configuration of an Alephium full node can be tailored to your
specific use case. To customize the settings, you can add key-value
pairs to the `user.conf` file in
[HOCON](https://github.com/lightbend/config/blob/main/HOCON.md)
format.

## Examples

### Non-mining Node

For full node that validates transactions and blocks but doesn't
engage in mining process, the default configurations are generally
good enough, there is usually no need to customize anything.

### Support dApps

To support development and operation of dApps, it's recommended to
enable persistence of [contract events](/sdk/events/#contract-events):

```
alephium.node.event-log.enabled = true
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true
```

You can read more about the events configuration
[here](/sdk/events/#configuration).

It is also recommended to enable the following node indexes:

```
alephium.node.indexes.subcontract-index = true
alephium.node.indexes.tx-output-ref-index = true
```

Setting `alephium.node.indexes.subcontract-index = true` enables
querying of a contract's subcontracts or its parent contract.

Setting `alephium.node.indexes.tx-output-ref-index = true` allows for
querying transaction id from the reference of a transaction output. In
a transaction, each input only contains the reference of the output it
spends. This index is useful to figure out the details of the
referenced transaction output. You can read more about the transaction
data structure [here](/sdk/transaction/).

By default, contract events and node indexes are turned off to improve
storage efficiency.

For public nodes, it is also advised to enable [API
key](/full-node/full-node-more#api-key) to control access to your full
node's rest endpoints:

```
alephium.api.api-key = "<YOUR KEY with 32+ characters>"
```

### Mining Pool & Miners

Miners needs to [set up mining
addresses](/mining/solo-mining-guide#miner-wallet) to begin
mining. It is also preferrable to set up external address for the node
to enhance discoverability:

```
alephium.network.external-address = "x.x.x.x:9973" // Put your public IP here for better discovery
alephium.mining.miner-addresses = ["1AuWeE5Cwt2ES3473qnpKFV96z57CYL6mbTY7hva9Xz3h", "12sxfxraVoU8FcSVd7P2SVr2cd2vi8d17KtrprrL7cBbV", "1E3vV7rFCgq5jo4NszxH5PqzyxvNXH5pvk2aQfMwmSxPB", "147nW43BH137TYjqEnvA9YfH1oFXKQxcvLZFwZauo7Ahy"]
```

For mining pools, you can add the following lines in `user.conf` as
well to have better block propagation:

```
alephium.network.max-outbound-connections-per-group = 48
alephium.network.max-inbound-connections-per-group  = 256
```

### Docker Environment

For docker environment, it's recommended to mount the local
`user.conf` file into the container:

```yaml
volumes:
  - ./user.conf:/alephium-home/.alephium/user.conf
```

## Main Settings

| Setting                                     | Description                                                                                                                                                                       |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| alephium.network.network-id                 | `0` for Mainnet, `1` for Testnet, `2` for Devnet. Default is `0`.                                                                                                                 |
| alephium.network.external-address           | External address of the full node to enhance discoverability                                                                                                                      |
| alephium.api.api-key-enabled                | `true` to enable API key for full node's API endpoints.                                                                                                                           |
| alephium.api.api-key                        | 32+ characters API key.                                                                                                                                                           |
| alephium.node.event-log.enabled             | `true` to enable storing contract events, so we can query or subscribe events based on contract address. Default is `false`.                                                      |
| alephium.node.event-log.contract-addresses  | A list of addresses whose events will be stored. By default, it is `[]`, which means the events for all contracts will be stored if `alephium.node.event-log.enabled` is enabled. |
| alephium.node.event-log.index-by-tx-id      | `true` to enable querying events based on transaction id. Default is `false`.                                                                                                     |
| alephium.node.event-log.index-by-block-hash | `true` to enable querying events based on block hash. Default is `false`.                                                                                                         |
| alephium.wallet.enable                      | `true` to enable node wallet. Default is `true`.                                                                                                                                  |
| alephium.wallet.locking-timeout             | Time of inactivity before node wallet is locked.                                                                                                                                  |
