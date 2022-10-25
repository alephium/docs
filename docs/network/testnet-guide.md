---
sidebar_position: 10
title: Testnet Guide
sidebar_label: Testnet guide
---

The installation of full node for testnet is the same as the mainnet: [Full Node Starter Guide](full-node/getting-started.md)

**The `user.conf` must be modified before starting the full node**.

Please note that the default address and port for the REST API is [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

## Configuration

In the `$HOME/.alephium/user.conf` (`user.conf` if docker is used) file you have to add:

```
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
```

## Mining

In the testnet you can use the [CPU Miner Guide](cpu-miner-guide.md) to get some ALPH

Append your miner addresses in `$HOME/.alephium/user.conf` like:

```
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

:::info 

You can easily generate mining addresses by installing the [desktop wallet](../wallet/desktop-wallet/configure-mining-wallet), and creating a wallet with 4 addresses. You can then copy the addresses and paste them in your `user.conf` file mentioned above.

:::

## Configuration example

```
alephium.api.network-interface = "0.0.0.0"
alephium.mining.api-interface = "0.0.0.0"
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
alephium.api.api-key-enabled = false
```
