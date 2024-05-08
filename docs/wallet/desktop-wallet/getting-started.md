---
sidebar_position: 20
title: Getting Started
sidebar_label: Getting Started
---

# Getting Started

## 1. Installation

1. Download the executable file in line with your set-up (macOS, Windows, Linux) from the [latest release](https://github.com/alephium/alephium-frontend/releases/latest) and double click on it to install the application.
2. On Linux and Windows, double click on the application to launch the desktop wallet. On macOS, you'll need to go to the Application folder, click right on the Alephium app and then click on _Open_ (don't double click, it won't work unless you allow it from the System Preferences).

## 2. Create Wallet

:::info

By default, the wallet will be connected to the Alephium public node. Should you want to use your personal node or generate the wallet offline, you can do so by clicking the setting wheel on the top right of the app and changing the Node Host to your localhost or simply leaving it blank to create the wallet offline.

:::

<img src={require("./media/gs1.png").default} alt="Desktop Wallet Landing page" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs2.png").default} alt="Prompt to create new wallet" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs3.png").default} alt="Prompt to chose a name and set a password" width="auto" style={{ height: '200px' }} />

1. Click on `Create/Import a new wallet`, then click `New wallet`.

2. Choose a wallet name and pick a password to protect your wallet on your computer. This password does not replace your wallet's 24-word Secret Recovery Phrase. It is only used to lock and unlock the newly created wallet.
   Click `Continue`.

<img src={require("./media/gs4.png").default} alt="Display of the 24 secret words" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs5.png").default} alt="Prompt to verify annotation of the 24 secret words was correct" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs6.png").default} alt="Landing page of a brand new wallet" width="auto" style={{ height: '200px' }} />

3. In the highlighted box, you will see 24 words. These are your wallet's 24-word Secret Recovery Phrase. This is your most precious piece of information, and you must store it wisely, safely, and carefully.

4. You will now be asked to verify that you got the 24-word Secret Recovery Phrase right. Click `Ready` and select the words in the right order. If the process was done correctly, the words turn green. If a mistake was made, they turn red: don't worry, you can reorder the words until you get the Phrase right.

5. Everything is now ready! Welcome to your new wallet.

## 3. Transfer ALPH

<img src={require("./media/gs7.png").default} alt="Landing page of Desktop Wallet" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs8.png").default} alt="Prompt to enter destination address and amount of transaction" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs9.png").default} alt="Prompt to enter destination address and amount of transaction" width="auto" style={{ height: '200px' }} />

1. To send ALPH, simply click on the `Send` button in the left menu.

2. Enter the amount of ALPH (e.g. 100) and recipient's address.

3. (Optional) You can set a lock time by ticking the corresponding box. In that case, the ALPH will be sent to the recipient address but subject to an on-chain lock until the date you have indicated. Please note that it is not possible to change the lock-time once the transaction has been submitted.

4. Click `Check` and carefully review your transaction details. Once you click on `Send` the ALPH will be transferred to the recipient.

:::info

The transaction can be seen in both the `Overview` tab as well as the `Addresses` tab when clicking on the specific address.

:::

## 4. Manage Addresses

You can see all the existing addresses displayed in a list in the `Addresses` tab, with information such as their label, respective balances, group number, etc.

<img src={require("./media/gs10.png").default} alt="Address page" width="auto" style={{ height: '200px' }} />

Clicking on one of the `+ New address` buttons brings you to the `New address` page where you'll be able to create and label the new address. By default, addresses are generated in a random group. You can manually choose a specific group under the `Advanced options` section.

<img src={require("./media/gs11.png").default} alt="Prompt to create a new address" width="auto" style={{ height: '200px' }} />

By clicking on a specific address, you'll see the address details including its transaction history.

<img src={require("./media/gs12.png").default} alt="View of a singel address" width="auto" style={{ height: '200px' }} />

Using the Settings wheel at the top of the application, you will be able to edit the Address label, choose it as your default address or sweep all its unlocked funds to an address of your choice.

<img src={require("./media/gs13.png").default} alt="Prompt to configure address options" width="auto" style={{ height: '200px' }} />
