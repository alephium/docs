---
sidebar_position: 50
title: Ledger
sidebar_label: Ledger
---


![IMG_8932-2](https://github.com/alephium/alephium/assets/88235023/010e915e-0ecd-4f8f-808e-4223202eaecd)

## This is a tutorial on how to install the Alephium App in your ledger and use it to sign transactions

🚨 *Important information: The Alephium App for Ledger Devices is a custom/community App developed by Alephium. It is not available on Ledger Live (yet!). It requires you to download other software on your computer and has several manual technical steps. Proceed only if you are sure that you understand how to perform this operation!*

🚨 *Since this is an early Alpha version, it is advisable to use a new/fresh ledger with no other coins managed on it.*

🚨 *The Ledger app only works with the latest version (v0.7.0) of the extension wallet for now.*

### Video Tutorial
A tutorial in a video format can be found here: https://www.youtube.com/watch?v=YBQy_siZh6w

### Written Tutorial

**1 — Download the new wallet release from**: Chrome — [Extension Wallet](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) / Firefox — [Extension Wallet](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)


**2 — Install the necessary software** (if you already have PIP & Python installed, jump to step 3)

You will need Python and PIP installed on your computer to get the Alephium App on your Ledger:

* Python ([how to for Windows](https://www.simplilearn.com/tutorials/python-tutorial/python-installation-on-windows#:~:text=To%20download%20Python%2C%20you%20need,then%20select%20the%20Windows%20option.), [how to for Mac](https://docs.python.org/3/using/mac.html), [how to for Linux](https://docs.python-guide.org/starting/install3/linux/))
* PIP ([how to for Windows](https://www.dataquest.io/blog/install-pip-windows/), [how to for Mac](https://www.groovypost.com/howto/install-pip-on-a-mac/), [how to for Linux](https://docs.python-guide.org/starting/install3/linux/))


**3 — Install the Ledger Python Library**

![image](https://github.com/alephium/docs/assets/88235023/fade8c08-f3a1-41b2-b7e9-9a3cd638a683)

We are going to use the Ledger Python Library (you can find it here). It is necessary because you are going to install a custom App onto your Ledger Device.

To install the Ledger Python Library just open a terminal window and type the following:

**pip3 install — upgrade protobuf setuptools ecdsa**

**pip3 install ledgerwallet**

This will make all upgrades and install the Ledger Wallet Library that will be needed for the next step.

![Install Ledger App](https://github.com/alephium/docs/assets/88235023/f3f096e3-fb9b-4a8c-9a98-a060112b0f5f)

**4 — Download the Alephium Ledger App to your computer**

Go to the following GitHub repository: https://github.com/alephium/ledger-alephium and download it.

🚨*To download the repository, click on the “Code” green button and choose “Download Zip.”*

![image](https://github.com/alephium/docs/assets/88235023/f699b669-1b00-4b2e-9649-5cedd221e0cb)

Download and unzip it in a folder you have easy access to and all read/write permissions.

**5 — Install the Alephium App on your Ledger Device**

Your Ledger now needs to be connected to your computer and unlocked.

Go to the GitHub repository (https://github.com/alephium/ledger-alephium/tree/master) and scroll down to find the command that applies to your Ledger version:

![image](https://github.com/alephium/docs/assets/88235023/6c5df18d-c59f-4ae4-ad8c-3e7bceb65014)

With this information, go to the console terminal and run the command to install the Alephium App:

🚨 *Important information: You need to run the command inside the folder you downloaded the files from GitHub.*

In this example, the Ledger Nano S is being used:

![image](https://github.com/alephium/docs/assets/88235023/d92896ef-5f9b-43a6-8f53-ab56f38c1700)

After running this command you will need to validate the installation of the Alephium App in your Ledger Device. Go through all approvals and add your pin to validate the installation.

When successful, the Alephium icon will appear on your device.

![image](https://github.com/alephium/docs/assets/88235023/7c41b2d3-ea5a-44ca-bd05-46338cf3274c)

Now you are ready to use your Ledger to sign transactions on Alephium! 🎉

**6 — Use your Ledger with the Extension Wallet**

Go to the browser where you installed the browser extension wallet, and open it.

🚨 *The Ledger app only works with the latest version (v0.7.0) of the extension wallet for now. If you don’t have it, you can install it from [here (Chrome)](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj/related) or [here (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/).*

Create a new address in your extension wallet: Click on the current address name, and then in the “+” icon. That will lead you to Ledger Connection page:

* Plug in your Ledger and unlocked it;
* Open the Alephium App (make sure you validated all steps!)
* Select your Ledger device from the list;
* Finish the configuration.

![install new wallet](https://github.com/alephium/alephium/assets/88235023/5fa7e000-2f77-4b44-9dfa-13b784e05eba)

**7 — Use the Ledger Device to send a transaction!**

All the steps here are the usual ones we have seen before using the extension wallet:

* Click on the “Send” button

![image](https://github.com/alephium/docs/assets/88235023/17eaf25a-5629-48cb-bee7-996513e9a7b4)

* Choose the token you want to send:

![image](https://github.com/alephium/docs/assets/88235023/60a3ed3b-04f7-447a-9472-886147d2b5d4)

* Select the recipient’s address:

![image](https://github.com/alephium/docs/assets/88235023/b6b7aae2-4c9e-4048-934e-95caa93bf577)

* Review the transaction details and click on “Sign with Ledger.”

![image](https://github.com/alephium/docs/assets/88235023/fde7b7c2-b864-468e-bb3f-66448fe8a4d2)

* Sign the transaction in your Ledger Device, and follow its completion in “Activity” section:

![image](https://github.com/alephium/docs/assets/88235023/efffc0de-01f8-48d7-a67c-ed1487c95483)

** 8 — Use the Ledger Device to interact with dApps in Alephium** 

Now that you have a already sign a transaction with your Ledger Device, it is time to connect it to a dApp. This process is also straightforward.

Access the [Alephium DEX on Testnet](https://alephium.github.io/alephium-dex). Click in the “Connect Alephium” button on the top right. Select the extension wallet in the prompt and the Ledger account.

![connect with dex](https://github.com/alephium/alephium/assets/88235023/f3e6cf9e-e632-4bc0-84a8-67f38d067311)

Now you are connected to the Alephium DEX. Make a swap transaction and use your Ledger to sign it. The process is similar to a transfer.

![unnamed](https://github.com/alephium/alephium/assets/88235023/bb263f71-3801-4be3-86cd-d7a18b525e0a)

If you have questions or suggestions, please come to [Alephium’s Discord](http://alephium.org/discord), [Telegram](https://t.me/alephiumgroup), or reach out on [Twitter](https://twitter.com/alephium)!
