---
sidebar_position: 30
title: Desktop Wallet Guide
---

The desktop wallet is the most user-friendly Alephium wallet available today. You can download its latest version from our [GitHub][latest-release].

## Step-by-step instructions to install the desktop wallet

1. Go to the [release page on GitHub][latest-release].
1. Download the executable file in line with your set-up (macOS, Windows, Linux). Alternatively, if you are comfortable using the terminal, you can build the wallet directly from source (if, for example, you want to build for Linux arm64). If you're struggling with this, don't hesitate to contact us on [Discord](https://discord.gg/JErgRBfRSB).
1. Double click on the file you've downloaded to install it.
1. On Linux and Windows, double click on the application to launch the desktop wallet.
1. On macOS, you'll need to go to the Application folder, click right on the Alephium app and then click on _Open_ (don't double click, as the application isn't signed yet, it won't work unless you allow it from the System Preferences).
1. By default, the wallet will be connected to the Alephium public node (please note that your mnemonic or your private key will never be uploaded to the public node). Should you want to use your personal node or generate the wallet offline, you can do so by clicking the setting wheel on the top right of the app and changing the Node Host to your localhost or simply leaving it blank to create the wallet offline.
1. Click on _Create/Import a wallet_, then click _New wallet_.
1. Choose a wallet name. You might want to choose a name that allows you to identify your wallet easily.
1. Pick a password to protect your wallet on your computer. This password does not replace your wallet's 24-word secret phrase. It is only used to log in and out of the created wallet easily.
1. Click _Continue_.
1. You now see your new wallet's information 🎉
1. Your address is a long string of characters. It is what identifies your wallet on the Alephium network.
1. In the highlighted box, you will see 24 words. These are your wallet's 24-word secret phrase. This is your most precious piece of information, and you must store it wisely, safely, and carefully.
1. Copy and store your 24-word secret phrase safely on several offline mediums such as paper and metal and store them in different places.
1. You will now be asked to verify that you got the 24-word secret phrase right by listing the words in the correct order. Click _Ready_ and reenter the words with the selection box.
1. When all the words are in the correct order, you will be prompted visually to continue.
1. Everything is ready! Your wallet is now created (and you've made sure to save your 24-word secret phrase).

## Creating a mining wallet with 4 addresses

A mining wallet is slightly different in that it needs to have one address per group. Currently, Alephium is running 4 groups meaning there is a needed total of 4 addresses. The desktop wallet can do this for you.

To do this, simply unfold the "Advanced Settings" in the welcome screen when creating a new wallet. Alternatively, you can create additional addresses manually after you login to your wallet.

## UTXO consolidation

Due to the nature of UTXO, every time a transaction is made a couple of new Unspent Transaction Outputs are created, each containing various amounts of ALPH. If these UTXOs aren't consolidated every now and then, a UTXO can reach a point where it becomes so-called "dust". Meaning that if the amount in a UTXO is smaller than the cost of GAS to send the ALPHs it contains, these ALPHs cannot be moved anymore. To make sure this doesn't happen, the wallet allows you to easily consolidate your UTXOs with the click of a button.

## Privacy and security concerns

Some could consider the desktop wallet slightly less privacy-preserving and secure than the node wallet as it requires you to trust the application’s security and is by default connected to a public node. However, you can build the wallet directly from our GitHub repository and to use a local node or even create your wallet completely offline to mitigate some of these risks.

[latest-release]: https://github.com/alephium/desktop-wallet/releases/latest
