---
sidebar_position: 70
title: More and Troubleshooting
sidebar_label: More and troubleshooting
---


## Coin name and ticker

* Name: `Alephium`
* Ticker/Symbol: `ALPH`

## Public services

All latest public APIs are listed on the [Public services](/infrastructure/public-services.md) page.

## Official wallets

Please refer to the [wallet guide](/wallet).

## Full node 

### Run a full node
Please read the [get started](/full-node/getting-started.md) guide.

### Required disk size
The current mainnet database size is around `95G`. [Pruned
nodes](../full-node/full-node-more#pruning) can reduce the disk
requirement to around `25G`.

### Snapshots

Please read the [load snapshot](/full-node/loading-snapshot) guide.

### Block producing rate

Currently the average network block production rate is 1 block every 1sec.
This is because the network currently has 16 chains each with a blocktime of 16sec. (16/16=1s in average).

### Configure file directory

Data folder for full node can be changed, use the following [documentation](../full-node/full-node-more.md#moving-the-alephium-data-folder).

### Customize RPC Port

To customize the RPC port: add this line `alephium.network.rest-port =
PORT` to the `${ALEPHIUM_HOME}/user.conf` file[^1].

### RPC documentation / SDK

- [Full Node API Documentation](https://node.mainnet.alephium.org/docs).
- [Typescript/Javascript SDK](https://github.com/alephium/alephium-web3).

### Does the fullnode need to expose its port to the outside? If so, is it acceptable for the machine to have a NAT IP?

Yes and NAT IP is ok.

### Is it necessary to add our node IP into your whitelist when synchronizing?

No, it’s not necessary.


## Wallets & Addresses

### Validate address format

Address is base58 encoded string, there is no max length for address, but in most case the decoded address length is 33 bytes.

There is a [utility function](https://github.com/alephium/alephium-web3/blob/31823ffdc7e8c430e5d27f7ac980db3529724ef4/packages/web3/src/utils/exchange.ts#L23-L41) in the TS SDK.

### Access the address history

You can access the address history in two ways:
* You can get the address history from the explorer, but you will need
  to [run your own explorer
  backend](/full-node/explorer-backend). Here is the explorer
  [endpoint](https://backend.mainnet.alephium.org/docs/#/Addresses/getAddressesAddressTransactions)
  you can use.
* You can also maintain your own database, whenever you receive a new deposit.

### Access the balance of an address

You can get the balance using this [endpoint](https://wallet.mainnet.alephium.org/docs/#/Addresses/getAddressesAddressBalance).

### Get the UTXOs of an address

You can get the UTXOs using this [endpoint](https://wallet.mainnet.alephium.org/docs/#/Addresses/getAddressesAddressUtxos)

### Restoring and recovering Wallets

You could restore your Wallets with your secret mnemonic or private keys:
* [SDK wallet](https://github.com/alephium/alephium-web3/blob/713f48088653a637aca15cbbfde1601207fe6940/packages/web3-wallet/src/hd-wallet.ts#L112-L185)
* [Full node wallet](https://wallet.mainnet.alephium.org/docs/#/Wallets/putWallets)

### Does the Wallet supports memo function?

No.


## Transactions

### Simple asset transfer

Simple transfer can be created using this [endpoint](./exchange#create-a-transaction).

### Transfer process: sign transaction offline and broadcast it online

You can create, sign, and broadcast transactions following this [guide](./exchange#transaction-apis).

### Transaction precision

Alephium supports transaction precision up to `10^-18`.

### Is there any dust limit or reservation?

Yes, the dust amount is `0.001` ALPH and each at output/UTXO needs least `0.001` ALPH.

### Is there a timeout mechanism for a transaction in tx pool, and if so, how long does it deal?
Yes, by default tx will be removed from mempool if it is not mined after 2 hours.
You can customize this config by add this line `alephium.mempool.unconfirmed-tx-expiry-duration = xxx minutes` in `user.conf`.

### Access the detailed information of a transaction

You can get the tx details using this [endpoint](https://wallet.mainnet.alephium.org/docs/#/Transactions/getTransactionsDetailsTxid).

### How to determine if a transaction failed

A transaction will if you [submit](./exchange#submit-a-transaction) it
into the pool and get an internal server error message back.

### How to determine if a transaction is accurate and avoid cheating recharge

Alephium is a UTXO-based blockchain, recharging can be avoided by ensuring the same UTXO input is not spend twice in two transactions. This is checked by the consensus protocol.


## Misc.

### Get highest blocks

You can get the current height using this [endpoint](https://wallet.mainnet.alephium.org/docs/#/Blockflow/getBlockflowChain-info)`, you need to replace the `fromGroup` and `toGroup` params as needed, which can be any value of [0, 1, 2, 3].

### What mechanism is in place to protect Alephium against 51% attack or to avoid chain forking?

It’s recommended to wait for 110 block confirmations (about 2 hours currently) for each deposit as it’s a PoW chain.
Alephium implemented the same 51% attack protection as [Ravencoin](https://tronblack.medium.com/ravencoin-building-the-immune-system-23d077b65f71) and other PoW coins when the number of reorg is larger than 100.

### What is the maximum reorg/rollback possible on Alephium?

The maximum allowed reorg size is 200 blocks. It is recommend to check 210 blocks for higher safety.

[^1]: By default it is under `C:\Users\<your-username>` in Windows, `/Users/<your-username>` in macOS, and `/home/<your-username>` in Linux.
