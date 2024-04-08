---
sidebar_position: 60
title: More and Troubleshooting
sidebar_label: More and Troubleshooting
---


## Coin name and ticker

* Name: Alephium
* Ticker/Symbol: ALPH

## Explorer URLs

* Mainnet: https://explorer.alephium.org
* Testnet: https://testnet.alephium.org/

## Measures to avoid chain's forking

It’s recommended to wait for 110 block confirmations (about 2 hours) for each deposit as it’s a PoW chain.

We implemented similar protection as the other PoW coins when the number of reorg is larger than 100.

## How many blocks will not be rolled back

The maximum allowed reorg size is 100. We recommend checking 110 blocks for better safety.

## How to determine a trade is accurate to avoid cheating recharge

It’s a UTXO-based blockchain, you can avoid recharging by ensuring the same UTXO input is not spend twice in two transactions. The consensus protocol checks this as well.

## Restoring and recovering accounts

You could restore your accounts with your secret mnemonic or private keys:
* SDK wallet: https://github.com/alephium/alephium-web3/blob/master/packages/web3-wallet/src/hd-wallet.ts#L112-L185
* Full node wallet: https://wallet-v20.mainnet.alephium.org/docs/#/Wallets/putWallets


## Official wallets

Official desktop wallet: https://github.com/alephium/desktop-wallet/releases/latest

Official mobile wallet:
* Android: https://play.google.com/store/apps/details?id=org.alephium.wallet
* Apple: https://apps.apple.com/us/app/alephium-wallet/id6469043072

Official web extension wallet:
* Chrome: https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj
* Firefox: https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/

## Audit report of the cross-chain bridge

Our coin ALPH also exist as wrapped ALPH on Ethereum. We forked the well-known Wormhole bridge for our own cross-chain bridge.
There is no audit report for the Alephium Bridge but it uses copy of the wormhole smart contracts which have been audited multiple times.

[Wormhole audits](https://github.com/wormhole-foundation/wormhole-audits)

## How to avoid 51% attack?

We implemented the same 51% attack protection as Ravencoin, ref: https://tronblack.medium.com/ravencoin-building-the-immune-system-23d077b65f71.

## Types of transfers

Simple token transfer using this [endpoint](./exchange#create-a-transaction).


## Precision of each transaction

0.0001

## Is there any rent or reservation?

Yes, at least 0.001 ALPH for each output/UTXO.

## Public API interface URL

URL: https://wallet-v20.mainnet.alephium.org

More APIs can be found on [Public services](../dapps/public-services.md) page.

## Does account supports memo function?

No

## Mainnet is live ?

The mainnet has been operating for 2+ years. Launched on November 2021.


## Fullnode 

### Node installation documents

[Getting started with Fullnode](../full-node/getting-started.md)

### Required disk size

The current mainnet database size is about 85G. Documentation for [pruned nodes](../full-node/full-node-more#pruning).

### Mainnet snapshots

URL: [https://archives.alephium.org/#mainnet/](https://archives.alephium.org/#mainnet/)

To use the snapshot, use the following [documentation](../full-node/loading-snapshot.md).

### Block producing rate

Currently the average network block production rate is 1 block every 4sec.
This is because the network currently has 16 chains each with a blocktime of 64sec. (64/16=4s in average).

The next network upgrade will reduce blocktime to 16s for all 16 chains resulting in the average network block production rate to be 1s.

### Configure file directory

Data folder for fullnode can be changed,  use the following [documentation](../full-node/full-node-more.md#moving-the-alephium-data-folder).

### How to customize RPC Port and directory of block data

For customize the directory of block data, you can refer to the doc [here](../full-node/full-node-more.md#moving-the-alephium-data-folder).

For customize the RPC port: add this line `alephium.network.rest-port = PORT` to the `user.conf` file.

### RPC/SDK documentation link

After running the full node, you can access the API doc at `http://full-node-ip:port/docs`.

JS/TS SDK documentation: https://github.com/alephium/alephium-web3.

### Is there a timeout mechanism for a transaction in tx pool, and if so, how long does it deal?
Yes, by default tx will be removed from mempool if it is not mined after 2 hours.
You can customize this config by add this line `alephium.mempool.unconfirmed-tx-expiry-duration = xxx minutes` in `user.conf`.


### Need wallet node expose its port to outside ? if so, if the machine with NAT IP?

Yes, it’s ok.

### Is it necessary to add our node IP into your whitelist when synchronizing?

No, it’s not necessary.

## API/ SDK

### Validate address format

Address is base58 encoded string, there is no max length for address, but in most case the decoded address length is 33 bytes.

There is a utility function in the TS SDK for it: https://github.com/alephium/alephium-web3/blob/v0.23.0/packages/web3/src/utils/exchange.ts#L23-L41.


### Get highest blocks

You can get the current height using this endpoint: `http://full-node-ip:port/blockflow/chain-info?fromGroup=0&toGroup=0`, you need to replace the `fromGroup` and `toGroup` params as needed, which can be any value of [0, 1, 2, 3].

### Access the account history

You can access the account history in two ways:
* You can get the account history from the explorer, but you will need to run your own explorer-backend, installation [documentation](../explorer-backend/getting-started). Endpoint: https://backend-v113.mainnet.alephium.org/docs/#/Addresses/getAddressesAddressTransactions.
* You can maintain your own database for that. Whenever you receive a new deposit.

### Access the detailed information of a trade

You can get the tx details using this endpoint: `https://full-node-ip:port/transactions/details/YOUR-TX-ID`

### How to determine if a transaction failed

If you submit your tx into the pool and get an internal server error message, it will fail.

[API documentation](./exchange#submit-a-transaction)


### Transfer process: sign transaction offline and broadcast it online

You can create, sign, and broadcast transactions following this [guide](./exchange#transaction-apis).

### Access the balance of an account

You can get the balance using this endpoint: `https://full-node-ip:port/addresses/YOUR-ADDRESS/balance`.


