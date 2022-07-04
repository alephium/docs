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

## Passphrase

:::info Advanced security feature
Please, read the following documentation before deciding to use this feature.
:::

:::tip Important takeaways

- The Passphrase is an advanced security feature that adds an **additional word** that you choose to your existing secret phrase.
- Using a Passphrase will cause an **entirely new wallet** to be created which cannot be accessed via the secret phrase alone.
- Apart from adding another layer of security, the Passphrase grants you **plausible deniability** when under duress.
- If you decide to use a Passphrase, it is vital to store it securely and to **remember it perfectly**, character by character.

:::

Assuming you have created a wallet using the desktop wallet app, you have a list of 24 words referred to as your _secret phrase_. This phrase can be used to restore your wallet and access your funds. If this 24-word secret phrase gets stolen, the attacker will be able to steal your funds. To enhance the security of our desktop wallet users and to prevent loss of funds due to theft of the 24-word secret phrase, we implemented the [BIP39 passphrase][bip39-spec] feature.

The Passphrase is an additional optional 25th word that you are free to choose for yourself. It can be composed of any lower/upper-case character, number, and/or signs and be as long as you want.

Once you create a wallet into the desktop wallet app, the next time you open the app to log in to your wallet, you will be able to provide an additional Passphrase. **It is important to remember that any unique Passphrase will generate and give access to a completely new wallet.**

### Example scenario

#### The "normal wallet"

Let's assume that you created a new wallet, you gave it the name _My Alephium Wallet_ and the password _myVeryStrongPassw0rd_. Let's also assume that the generated 24-word secret phrase is `scan pause slender around cube flavor neck shrug gadget ramp rude lend capable tone nose unhappy gift across cluster minor tragic fever detail script`. You decide to transfer 100 ALPH to it. We'll call this the "normal wallet".

#### The "hidden wallet"

The next time you open your wallet, you select that you want to login to _My Alephium Wallet_ and you provide your password _myVeryStrongPassw0rd_. Instead of clicking _Login_ directly, however, you enter the Passphrase _letsUnlockAHiddenWallet_, and then click _Login_. This gives you access to a completely new wallet (let's call it "hidden wallet"). You will not be able to see your balance of 100 ALPH there, since the wallet you tranferred your 100 ALPH to was the one that did not use the Passphrase _letsUnlockAHiddenWallet_ (a.k.a. the "normal wallet"). You decide to transfer 10'000 ALPH to the "hidden wallet".

#### The other "hidden wallets"

When you logout and you try to login into your "hidden wallet" again, if you enter your chosen Passphrase wrong (for example you enter _letsUnlockAHiddenwallet_ instead of _letsUnlockAHiddenWallet_ - notice the lower case `w` instead of `W`), you will gain access to yet another new "hidden wallet" with 0 funds. Logging out and logging in again, with the correct Passphrase this time, will give you access to your "hidden wallet" with the 10'000 ALPH in it.

### Plausible deniability use-case

In the unfortunate scenario where an attacker forces you to reveal your wallet password and your 24-word secret phrase (also known as the "$5 wrench attack"), the Passphrase feature can help you secure your physical safety as well as most of your wealth by convincing the attacker that they have access to all your funds. Let's explore this with the use of an example:

- You are a proud owner of 10'000 ALPH.
- You have created a "normal wallet" (no Passphrase) with the name _My Alephium Wallet_ and the password _myVeryStrongPassw0rd_. You have transferred 100 ALPH to it.
- You have created a "hidden wallet" with the passphrase _letsUnlockAHiddenWallet_. You have transferred 900 ALPH to it.
- You have created yet another "hidden wallet" with the passphrase _youCanNeverGuessThat!_. You have transferred the remaining 9'000 ALPH to it.

An attacker threatens you to reveal the password to your _My Alephium Wallet_ wallet. You give it and the attacker steals the 100 ALPH in it. The attacker notices that the wallet offers the Passphrase feature and once again threatens you to reveal any additional Passphrases. At this point, you can deny that you use this feature and there will be no way for the attacker to prove whether you use it or not. Nevertheless, you decide to give them the passphrase _letsUnlockAHiddenWallet_ and the attacker steals the 900 ALPH. The attacker is happy that they stole all your funds and leaves you in peace. You have successfully managed to secure your safety and most of your funds' safety.

### Best practices when using a Passphrase

You must remember your Passphrase perfectly. Changing a single character (even, for example, from lower to upper-case), will result in the generation of a completely new wallet. As a result, it is imperative to:

1. Choose a Passphrase that you can remember and enter it correctly before sending any funds to the generated wallet.
2. Remember it character by character.

[bip39-spec]: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed

### Limitations of Passphrase-enabled wallets

**You cannot (yet) use colored labels for your generated addresses. Any additionally generated addresses will need to be re-generated after every login.**

The desktop wallet allows you to generate multiple addresses and select a colored label for each. This is helpful for organizing your funds into different "buckets". The metadata information about the addresses that you generated as well as their labels and their colors is stored in the local storage of the desktop wallet app.

To guarantee the benefit of plausible deniability for our users, we cannot store metadata related to the Passphrase-enabled wallets, since we assume that an attacker has access to your wallet password, your 24-word secret phrase, as well as to the local storage of the app. Thus, the Passphrase-enabled wallets cannot remember which addresses you have generated and what labels and colors you assign to each of them.

In the future, we will be able to bring the metadata storage feature to the Passphrase-enabled wallets, once we implement the feature that will allow importing of Extended Public Keys. Then, you will be able to store additional addresses together with their labels and colors in the Passphrase-enabled wallets. Stay tuned and always keep your desktop wallet app up to date!
