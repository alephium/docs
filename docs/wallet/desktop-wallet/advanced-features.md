---
sidebar_position: 40
title: Advanced Features
sidebar_label: Advanced Features
---

# Advanced Features

## 1. UTXO consolidation

:::info

Due to the nature of UTXO, every time a transaction is made, a couple of new Unspent Transaction Outputs are created, each containing various amounts of ALPH. If these UTXOs aren't consolidated every now and then, a UTXO can reach a point where it becomes so-called "dust". Meaning that if the amount in a UTXO is smaller than the cost of GAS to send the ALPHs it contains, these ALPHs cannot be moved anymore.

To make sure this doesn't happen, the wallet allows you to easily consolidate your UTXOs with the click of a button.

:::

In the `Addresses` tab, click on the `Advanced operations` icon and choose `Consolidate UTXOs`.

<img src={require("/img/af1.png").default} alt="UTXO consolidation" width="auto" style={{ height: '200px' }} />

<img src={require("/img/af4.png").default} alt="UTXO consolidation" width="auto" style={{ height: '200px' }} />

Select the address from which you want to consolidate the UTXOs and select the destination address (it can be the same address). Click on `Consolidate` and your UTXOs will be consolidated.

<img src={require("/img/af2.png").default} alt="Landing page" width="auto" style={{ height: '200px' }} />

## 2. Passphrase (ADVANCED SECURITY FEATURE)

Introduced in version 1.3.0

:::caution
Please, read the following documentation and this [article](https://medium.com/@alephium/bip39-passphrase-implementation-f87adecd6f59) before deciding to use this feature.
:::

### 1. Important Takeaways

- The Passphrase is an advanced security feature that adds an additional word that you choose to your existing Secret Recovery Phrase.
- Using a Passphrase will cause an entirely new wallet to be created which cannot be accessed via the Secret Recovery Phrase alone.
- The desktop wallet password is different from the Passphrase. The password is only used on your computer to encrypt and store the Secret Recovery Phrase. The Passphrase is an additional word to that Secret Recovery Phrase and is not stored in the wallet.
- Apart from adding another layer of security, the Passphrase grants you plausible deniability when under duress.
- **If you decide to use a Passphrase, it is vital to store it and back it up securely in a different physical location than the Secret Recovery Phrase. You must remember your Passphrase perfectly. Changing a single character (even, for example, from lower to upper-case), will result in the generation of a completely new wallet. **

Assuming you have created a wallet using the desktop wallet app, you have a list of 24 words referred to as your Secret Recovery Phrase. This phrase can be used to restore your wallet and access your funds. If this 24-word Secret Recovery Phrase gets stolen, the attacker will be able to steal your funds. To enhance the security of our desktop wallet users and to prevent loss of funds due to theft of the 24-word Secret Recovery Phrase, we implemented the [BIP39 passphrase](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) feature.

The Passphrase is an additional optional 25th word that you are free to choose for yourself. It can be composed of any lower/upper-case character, number, and/or signs and be as long as you want.

### 2. How to use a passphrase

:::warning

It is important to remember that any unique Passphrase will generate and give access to a completely new wallet. It is vital to store and back up the Passphrase securely in a different physical location than the Secret Recovery Phrase. **You must remember your Passphrase perfectly. Changing a single character (even, for example, from lower to upper-case), will result in the generation of a completely new wallet.**

:::

To use a Passphrase, simply tick the `Use optional passphrase (advanced)` and enter the optional Passphrase of your choice.

<img src={require("/img/af5.png").default} alt="Landing page" width="auto" style={{ height: '200px' }} />

### 3. Limitations of Passphrase-enabled wallets

1. You cannot (yet) use colored labels for your generated addresses.
2. Any additionally generated addresses will need to be re-generated after every login.

This may change in the future.
