---
sidebar_position: 50
title: Ledger
sidebar_label: Ledger
---

# How To Use Your Ledger Device With Alephium Wallets

### **INTRODUCTION**

A Ledger Device is a hardware wallet considered one of the most secure ways to store your digital assets. Ledger uses an offline, or cold storage, method of generating private keys, making it a preferred method for many crypto users. This guide will help you connect your Ledger device to the Alephium Browser Extension and Desktop Wallet. The Alephium Wallets enable you to Send and Receive ALPH with your Ledger Device.

**Note:** This integration allows users to securely store, send tokens, and interact with decentralized applications (dApps) while keeping their assets protected offline with the full suite of Ledger HW (Nano S+ / Nano X / Stax / Flex)


### BEFORE YOU START, MAKE SURE:

1. You’ve initialized your Ledger Device.
2. The latest firmware has been installed.
3. Ledger Live is [ready to use](https://support.ledger.com/article/4404389606417-zd).
4. You have the latest [Alephium Browser Extension Wallet or Desktop Wallet](https://alephium.org/#wallets) installed.

### INSTALL THE ALEPHIUM APP

1. Open **My Ledger** in Ledger Live.
2. Connect and unlock your Ledger Device.
3. If asked, follow the onscreen instructions and **Allow Ledger Manager**.
4. Find **Alephium** in the app catalog.
5. Click the Install button.
   
   a. An installation window will appear.
   
   b.  Your device will display **Processing…**
   
   c.  The app installation is confirmed.
   

![image](https://github.com/user-attachments/assets/5e278065-6611-450a-9e41-020834879224)

6. Close Ledger Live.
   
### CREATING A NEW ACCOUNT ON THE ALEPHIUM BROWSER EXTENSION WALLET

If you are using the Desktop wallet, jump to [this section](ledger.md#CREATING-A-NEW-ACCOUNT-ON-THE-ALEPHIUM-DESKTOP-WALLET)

1. First, connect and unlock your Ledger Device.
2. Open the Alephium App on your Ledger Device

![image](https://github.com/user-attachments/assets/cc39691b-d884-4edc-9328-9de877f5d0a5)

_Ledger Flex/Stax will show **“Alephium”**_

3. Open the Alephium Browser Extension Wallet.

Go to the browser where you installed the browser extension wallet, and open it.

Create a new address in your extension wallet: Click on the current address name, and then in the “+” icon. That will lead you to the Ledger Connection page:

![create address](https://github.com/user-attachments/assets/a5688765-d28d-4116-9be8-b8bacebf5f43)


4. Verify that the address on the Alephium Browser Extension Wallet matches the address on your Ledger Device. Click on “Add funds” and then on “Verify with Ledger”

![image](https://github.com/user-attachments/assets/22b790f3-03fd-4b1a-82c3-d4187ad704c2)


5. Verify in the Ledger if the address matches with the one shown on the extension wallet.

For Ledger Nano X: Press the right button to scroll to “Display Account”. Then press both buttons to show the address.

For Ledger Flex/Stax: Swipe & confirm.

![address](https://github.com/user-attachments/assets/18285864-1fb6-4604-88ab-afbb16e6b604)



### VIEW ACCOUNT BALANCE
Your account balance is shown on the main screen Browser Extension Wallet denominated in ALPH.

![image](https://github.com/user-attachments/assets/7607511c-b5a8-476b-8484-3635c3d3ff5a)


### RECEIVING ALPH IN THE ALEPHIUM BROWSER EXTENSION WALLET

1. Ensure you have verified your Receive address as shown in Step 4 and 5 of “Connecting to the Alephium Browser Extension Wallet”.
2. Click the “Add Funds” button. You can get your address by simply copying the address to the clipboard or scanning the QR Code.

![image](https://github.com/user-attachments/assets/a6114c94-59e4-469a-93c0-0280f45cc897)
 

3. Once you have sent ALPH from another Wallet, you will see it in your transaction history and your ALPH balance will update. 
 
### SENDING ALPH IN THE ALEPHIUM BROWSER EXTENSION WALLET

1. Click on the “Send” button

![image](https://github.com/user-attachments/assets/564f985c-3440-47a8-a8b5-65f31efea5f3)


2. Choose the token you want to send:

![image](https://github.com/user-attachments/assets/8f4d8801-02e8-490f-b903-d05e33ced593)


3. Select the recipient’s address:

![image](https://github.com/user-attachments/assets/37f1505f-b8cc-4b14-9ac3-8fbe76056f94)


4. Review the transaction details and click on “Sign with Ledger.”

![image](https://github.com/user-attachments/assets/b288b2a6-4958-4e68-881e-929b6fb70590)

5. Review the Details on your Ledger Device and sign the transaction.


For Ledger Flex/Stax

Swipe right on your Ledger Device to review the outputs (Amount and Address). Review the transaction fees until you see **“Sign Transaction to send assets”** then press and hold to sign the transaction.

![review tx (1)](https://github.com/user-attachments/assets/56dc5bac-fcd4-4f1b-b7ab-4badcc979bab)


Once you sign the Transaction on the Ledger Device, you can follow its completion in “Activity” section (Please wait a few seconds for the transaction to confirm)

![image](https://github.com/user-attachments/assets/03df7345-46ff-4384-8408-30e9eb21ce2c)

**Important:** As transfers of ALPH or other tokens are handled by UTXOs on Alephium blockchain, the flow to send any type of token is the same.


### ENABLING BLIND SIGNING ON YOUR LEDGER

Blind signing means signing a transaction without knowing or seeing the full transaction data before authorizing it. – The user should be mindful of this and proceed with caution, ensuring that the source is trusted. You can find more information about blind signing in this [article](https://www.ledger.com/academy/cryptos-greatest-weakness-blind-signing-explained)

For Ledger Flex/Stax:

**Click on the “gear” at the top right.** In the new page, turn the toggle on. Click on the arrow to go back to the main page.

![enabling blind signing](https://github.com/user-attachments/assets/eeb12bd5-ef67-4b1b-ba95-ae0a75cc6351)


### INTERACTING WITH SMART CONTRACTS WITH THE EXTENSION WALLET AND LEDGER

1. When interacting with protocols like exchanges, NFT marketplaces and others, the extension wallet will be prompted when a transaction needs to be signed.

![image](https://github.com/user-attachments/assets/b085ae30-566d-4844-8c5e-ec10c270b50e)

2. Click on Sign with Ledger. Review all inputs in your Ledger Device and sign the transaction.

For Ledger Flex/Stax:

![blind signing (1)](https://github.com/user-attachments/assets/1cc4bcc3-3f63-454c-b439-efc0fa719a55)


### ### CREATING A NEW ACCOUNT ON THE ALEPHIUM DESKTOP WALLET

To create a new account, open your Desktop Aallet and click on "Connect with Ledger".

![ledgerdesktopwallet-1online-video-cutter com-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/f1dbc332-f9df-4065-8b8c-ff99d2e445cb)

Click on the "Addresses" tab in the left menu, and after opening the page, click on the button "+ New Address". If you want to choose the group of this new address, enable the "Advanced options" toggle to select the group (hint: most dApps are in the "Group 0")

That is it! Now, you can interact with the Alephium blockchain using your Ledger and Desktop Wallet!

### SUPPORT

Telegram: https://t.me/alephiumgroup

Discord: https://alephium.org/discord

### HOW IT WAS MADE

This guide was made according to the third-party application design guidelines for ledger.

[Ledger Third Party Guidelines](https://developers.ledger.com/docs/device-app/deliver/deliverables/documentation)

