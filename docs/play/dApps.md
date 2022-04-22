---
sidebar_position: 10
title: dApps
---

Playing with dApps on Alephium is currently a more technical undertaking. This
workshop does not handhold for non-technical users, but given some effort, they
too should be able to play along.

The reward for this is learning how dApps work in general, and possibly having
some influence with your votes!

There are some requirements before you can start:

* git
* NodeJS
* Alephium testnet ALPH
* A buddy (optional)

In order to get testnet ALPH you can either mine (it'll take about an hour)
or ping @lee in the Discord server, and if not available, ask openly for some
in #general.

## Building the test wallet

The current dApp functionality is heavily under development, so you must build
a test version of the wallet. This is quite simple:

* Open a terminal
* Run `git clone https://github.com/alephium/desktop-wallet/tree/walletconnect && cd desktop-wallet && npm install && npm run electron-dev`

The wallet will open.

Set the wallet's network to testnet by clicking the gear in the top right and
navigating to "networks".

Create a wallet, and make sure to check the "Using for DeFi" option. This will
generate an address for each chain, which is required for dApps to function.

At this point ask for some testnet ALPH.

## Playing with voting-demo

Open https://testnet-voting-demo.alephium.org/ , and you'll be presented with
a message to select a network: select testnet. Mainnet will work but it is
**highly discouraged**. I condem it! We don't want people using unstable
software seriously.

When you see the QR code, copy the link below it. **Be sure you copy the full
link!** It's easy to accidentally partial-copy.

Go back to your wallet and click the WalletConnect logo.

Paste the WalletConnect URI and continue. Approve the dApp. Your wallet and the
dApp are now connected! In the near future this process will be removed
entirely, and will be handled using a technique called "deep linking". In fact
the UX in general will improve since our UX expert has not even touched it yet.

Go back to the dApp and create your first contract!

### Create a poll

Enter the appropriate information.

You will notice when you input your admin address, a "G<number>" appears. This
is the group your address is part of. Voter addresses will need to have the same
group number.

Make sure your voters have funds on the address they provide by asking them.

Click "Create" and navigate back to your wallet to confirm the transaction.

The transaction doesn't require any to-address or amount.

You may have to adjust the gas price.

Click "Check", review the transaction details and send. You will notice there is
a minimal amount of ALPH being sent: this is required as a "storage fee" for
contracts.

Go back to the dApp and wait for the transaction to confirm.

### Allocate voting tokens

Click on "Allocate voter tokens" and follow the same process for sending a
transaction.

Give out the URL given by the dApp to your voters.

Save the contract transaction id, as you'll need it again to do additional
operations like closing the poll.

Once everyone has told you they have voted, close the poll.

Tell all your voters the poll is now closed and they can check the voting
results by going back to the voting page. Reshare the voting URL in case anyone
has lost or forgot it.

Review the results and have a discussion! 🙂
