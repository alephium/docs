---
sidebar_position: 10
title: A primer with the desktop wallet
---

This short primer is to familiarize you with the dApp user experience on Alephium.

:::note
If you're a developer and already familiar with the experience, then [navigate](./Developing-Your-First-dApp)
to the chapter on developing your first dApp!
:::

:::note
For visual learners, this video is available:

video-here
:::

## Requirements

There are some requirements before you can start:

* The Alephium team's [desktop wallet](https://github.com/alephium/desktop-wallet/releases)
* Testnet ALPH

In order to get testnet ALPH you can:

* [Mine some](/mining/Solo-Mining-Guide) (it'll take about an hour)
* Ping `@Moderators` or ask in `#general` on the [Discord server](https://discord.gg/QYWRbkCx)

:::note
There are currently no available [faucets](https://coinmarketcap.com/alexandria/article/what-is-a-crypto-faucet)
due to their nature of being easily drained.
:::

## Setup a wallet test account

Start the wallet as you normally would.

Set the wallet's network to testnet by clicking the gear in the top right and
navigating to "networks".

Create a wallet, and *make sure to toggle the **Using for DeFi** option*. This is
vital for using your wallet with dApps on Alephium because of how sharding works.
This generates a number of addresses. This is normal, as each address is
associated with a shard.

Now go get some testnet ALPH!

## You feeling lucky, (crypto) punk?

Welcome to the crypto-saloon! Step right up over here and have yourself a bet.

https://coinflip.dapp.alephium.org/ is a simple dApp where, you guessed it,
you place a bet on heads or tails. The twist is: there's a 1% chance it could land on
its edge!

### Connect to the dApp

After the selection, go back to the wallet and a new [WalletConnect](https://docs.walletconnect.com/#introduction)
prompt will ask you to authorize a connection with the dApp. This technology is
used so dApps never have control of your wallet.

:::tip
Make it a habit to carefully read what you are authorizing!
:::

Go back to the dApp to have your first real interaction.

### Placing a bet

Enter how much you'd like to bet. If you win, you get back twice as much, covering
the initial bet and giving you some winnings.

Click `flip`!

And navigate back to the wallet once again. Now a prompt to make a transaction is
presented.

:::caution
The dApp sets the transaction fields for a reason! It will set everything properly
so that you won't overpay and lose money, or accidentally set something incorrectly.
:::

This transaction will do two things:

* Send your bet to the contract
* Run the contract's flip functionality


Once you send the transaction head back to the dApp.


### Waiting for the result

The result *should be* near instant to get back, but your winnings may take around
a minute to finalize into your wallet. This is because contracts use an event
system to communicate information back to dApps, which is separate from the
financial part of the Alephium system.

## Writing your own first dApp!

So as you see, it's quite simple to interact with dApps on Alephium. The core
team has made its best effort, through long and tense discussions, to bring
cryptocurrency to people in the most approachable and safe way it believes.

This same philosophy extends to all aspects of Alephium, as you'll see, when
you [begin writing your first dApp](./Developing-Your-First-dApp)!
