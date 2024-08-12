---
sidebar_position: 20
sidebar_label: Alephium bridge
title: Alephium Bridge
---

# The Bridge

## Tutorials & Links

- [Bridge Website](https://bridge.alephium.org/#/)
- [Bridge Explorer Website](https://explorer.bridge.alephium.org/)
- [The Alephium Bridge: How does it work? How to use it?](https://medium.com/@alephium/the-alephium-bridge-a787d90b2e4a)
- [Bridge Tutorial (Article)](https://medium.com/@alephium/alephiumalephium-bridge-the-tutorial-28e7b92b339a)
- [Bridge Tutorial (Video)](https://www.youtube.com/watch?v=xoYVzbwBAjg)
 
## Bridge FAQ

### 1. I have waited long enough, and it is not letting me redeem! What should I do? 

Please bear in mind that: 

- Bridging from ETH to ALPH takes an average of 15-20 minutes.

- Bridging from ALPH to ETH, will take a bit more time. The transaction needs to meet two conditions: at least 205 blocks and at least 55 minutes. If one of the conditions is not met, redemption is not possible (yet).

In most cases, waiting a little bit longer to redeem your tokens is enough. 

If it still doesn’t work, please try to disconnect & reconnect your wallets to the bridge, and try to redeem again (see

If that doesn’t work, open an issue [here](https://discord.gg/FCN5bgGMuG).


### 2. The Bridge alerted me that I need to create a new wallet address! What does that mean? 

To interact with most dapps on Alephium, you need to create an address in Group 0. Here's how:

### Desktop wallet

Go to the addresses tab and click on "+ New address".
Tick the advanced options and select "Group 0".
Click on "Generate" to create the address.
Transfer your funds to this address for bridging.

### Extension wallet

Click on your current wallet in the top left corner of the app.
Select the "+" icon to add a new address.
Choose the desired group for the new address (Group 0).
Transfer your funds to this address for bridging.

### Mobile wallet

To connect to the bridge using the mobile wallet you need to connect via WalletConnect.

If you are using the bridge on your **laptop or your desktop**, click the "WalletConnect" option. Scan the QR code with your mobile app.

If you are using the bridge on your phone through your **phone's browser**, follow these steps:

- **Android:** Simply click on the "Connect" button after choosing "WalletConnect". This will redirect you to the mobile app if it is installed on your Android phone.
- **iOS:** We are working on improving the UX on iOS. In the meantime, you can copy the WalletConnect URI, open the mobile app, click on the WalletConnect icon at the top and paste the URL.

If you don't already have an address in group 0 the app will ask you to generate one. Simply click "Generate" and then "Connect". Transfer some funds to it and proceed with the bridge process.

### 3. I am getting “failed to fetch” errors! 

This error is related to your wallet locking itself. The steps to go around this are simple:


- Copy your Transaction Hash from the bottom of the page, just in case.
- Refresh the page
- Switch to the “Transactions” tab.
- Reconnect your wallets
- Recover your transaction.

### 4. The confirmations won’t update.


Usually that means that one of your wallets has locked itself. Please copy your Transaction Hash from the bottom of the page, refresh the page, reconnect your wallets and head over to the redeem tab where you can recover the transaction using your Transaction Hash. 



### 5. Transaction has over 205 confirmations and I can't redeem!

Bridging from ALPH to ETH, will take a bit more time. The transaction needs to meet two conditions: at least 205 blocks and at least 55 minutes. If one of the conditions is not met, redemption is not possible (yet). If the problem persists, try the solutions provided in the following: 

- “Issue 1. I have waited long enough, and it is not letting me redeem! What do I do?”
- “Issue 6. I am getting a VAA error! And I can't redeem.” 

If that doesn’t work, open an issue [here](https://discord.gg/FCN5bgGMuG).

### 6. I am getting a VAA error! And I can't redeem.


If you are getting a VAA error, and waiting before trying again didn’t work, try the following steps: 

- Close the tab, and re-open it.
- Connect your wallets.
- Recover your operation from the “Transactions” tab.
- Try again.

If that doesn’t work, open an issue [here](https://discord.gg/FCN5bgGMuG).

### 7. Can we only bridge USDT from ETH to ALPH?

No. For example, you can also bridge USDC, ETH, DAI, WBTC & ALPH. Using the provided UI, you can bridge all tokens from [1inch list](https://tokenlists.org/token-list?url=tokens.1inch.eth)

And if you interact with the smart contract directly, you can bridge all erc20 tokens you want.


### 8. I bridged ETH and/or USDC, and there’s no liquidity on AYIN pools, what can I do?

Before bridging any token, please check that there is enough liquidity available, otherwise you might have to bridge those tokens back.


### 9. How do I add the ALPH ERC-20 token to my Metamask? 

In order to have the ALPH ERC-20 token show in your Metamask wallet you are going to need to do the following : 

- Get the Token Contract from [here](https://etherscan.io/token/0x590F820444fA3638e022776752c5eEF34E2F89A6)
- Open & Unlock your metamask
- Click on "Import Token"
- Select "Custom Token" 
- Copy & Paste the contract into the first field. 
- Press "Next" & then "Import"


### 10. I got an error when redeeming from Ethereum to Alephium, even after waiting enough time. What to do?

- On Metamask, click on the "..." on the top right
- Click on "connected site"
- You will see the bridge as one of the dApps connected. Click on it to disconnect.
- Refresh the [redeem page](https://bridge.alephium.org/#/redeem)
- Now select Ethereum as the source chain and reconnect your metamask wallet.
