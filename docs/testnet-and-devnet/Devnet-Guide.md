---
sidebar_position: 2
---
# Devnet Guide

It's dev-friendly to start a local devnet with empty block history and arbitrary amount of coins.

The installation of full node for devnet is the same as the mainnet: [Full Node Starter Guide](full-node/Full-Node-Starter-Guide.md)

**The user.conf must be modified before starting the full node**

Please note that the default address and port for the REST API is [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

## Configuration

In the `$HOME/.alephium/user.conf` (`user.conf` if docker is used) file you have to add:
```
// in most cases, modify the following two lines
alephium.genesis.allocations = [{address = "<your-own-address>", amount = 1000000000000000000000000, lock-duration = 0 seconds}] // 1 million token allocated for your address
alephium.consensus.num-zeros-at-least-in-hash = 0

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true

// arbitrary mining addresses
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```
Please put your own addresses for genesis allocations. You could also reduce `num-zeros-at-least-in-hash` to make mining faster.

More configurations can be found in `$HOME/.alephium/network-4/`, and logs can be found in `$HOME/.alephium/logs/`.

If you modify `user.conf`, then better to wipe out `$HOME/.alephium/network-4/` before restarting the full node.

## Mining

You will need to mine new blocks to include your transactions into the blockchain.

In the devnet you can use the [CPU Miner Guide](CPU-Miner-Guide.md) to start mining and stop mining.
You can also use the endpoint `/transactions/status` to track the status of your submitted transactions.
