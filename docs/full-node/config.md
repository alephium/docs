---
sidebar_position: 10
title: Configuration
sidebar_label: Configuration
---

The configuration of Alephium full node depends on the use case.
To customize the configuration, one could add new key-value items into the `user.conf` file.

## Mainnet Examples

### Network Validators

The default configurations are good enough. There is no need to customize anything.

### dApp Development

For dApp development, it's recommended to enable API key and contract events persistence.

```
alephium.api.api-key = "<YOUR KEY with 32+ characters>"

alephium.node.event-log.enabled=true
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true
```

### Docker Environment



### Mining Pool & Miners

```
```

## Main Options

### Network Id

### API Key

### Contract Events
