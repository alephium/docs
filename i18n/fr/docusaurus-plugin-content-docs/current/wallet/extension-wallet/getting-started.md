---
sidebar_position: 20
title: Getting Started
sidebar_label: Getting started
---

### Installation

Alephium extension wallet is available for both
[Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj)
and
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/).

### Create Wallet

\<img src={require("/img/new-wallet-1.png").default} alt="Create wallet"/>

1. Click the Alephium extension wallet icon on your browser
2. On the landing page, click the `New wallet` button
3. Enter the password to protect your wallet
4. Done! Your wallet is created.

Now your wallet does not have any assets. In the next step, let's
transfer some ALPH to this wallet.

### Transfer Assets

#### ALPH Token Faucet

For `devnet` and `testnet`, extension wallet has a `ALPH` token faucet
built-in. You can recieve `1000` `ALPH` for `devnet` and `12` `ALPH` for
`testnet` respectively everytime.

\<img src={require("/img/token-faucet-1.png").default} alt="Receive Fund" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/token-faucet-2.png").default} alt="Token Faucet" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/token-faucet-3.png").default} alt="Token Received" width="250" />

#### Transfer ALPH

You can also transfer `ALPH` to your account from another acount:

\<img src={require("/img/transfer-alph-1.png").default} alt="Overview page" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/transfer-alph-2.png").default} alt="Transfer page" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/transfer-alph-3.png").default} alt="Review transfer" width="250" />

After signing the transfer transaction, you can monitor the
transaction state from the `Activity` tab. As soon as the transaction
is confirmed, the transferred `ALPH` amount is reflected on the
receiving account.

\<img src={require("/img/received-alph-1.png").default} alt="Pending Tx" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/received-alph-2.png").default} alt="Confirmed Tx" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/received-alph-3.png").default} alt="ALPH Received" width="250" />

That's it! You have successfully transfered some `ALPH`.

#### Transfer Tokens

The process of transferring other fungible tokens is basically the
same as transferring the `ALPH` token:

\<img src={require("/img/transfer-alphpaca-1.png").default} alt="Transfer Token 1" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/transfer-alphpaca-2.png").default} alt="Transfer Token 2" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/transfer-alphpaca-3.png").default} alt="Transfer Token 3" width="250" />

Please refer to the [Fungible Tokens](/dapps/standards/fungible-tokens) guide
for more information about fungible tokens.

### NFT Support

Alephium extension wallet also support displaying and transferring NFTs, as shown below:

\<img src={require("/img/display-nft-collections.png").default} alt="Display Collections" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/display-nft-collection.png").default} alt="Display Collection" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/transfer-nft.png").default} alt="Transfer NFT" width="250" />

Please refer to the Non-fungible Tokens
(NFTs) guide for more information about
NFTs.

### Manage Accounts

Account in the Alephium extension wallet represents a digital
container that consists of a public address and its corresponding
private key, allowing user to receive, store and transfer assets on
the Alephium blockchain.

Alephium extension wallet allows users to manage multiple accounts at
the same time. For example, Alice can have one account for `Salary`,
one account for `Saving` and another account for `Trip 2023`.

#### Create Account

To add an extra account, follow the steps below:

\<img src={require("/img/manage-accounts-1.png").default} alt="Overview" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/manage-accounts-2.png").default} alt="Account List" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/manage-accounts-3.png").default} alt="Add Account" width="250"/>

There are couple of options that we can choose before creating an
account:

- `Group`: Available options are `0`, `1`, `2` or `3`. If `any` is
  chosen, the group where the created account belongs to will be
  random
- `Sign`: Available options are `default` and `schnorr`. `default`
  represents the default Alephium signature type used to e.g. sign
  Alephium transactoins, whereas `schnorr` represents the `BIP340`
  Schnorr signature type which is useful when interacting with
  protocols like [Nostr](https://nostr.com/)
- `Account Type`: Available options are `Alephium Account` or a
  `Ledger Account`. For more details about the Ledger integration
  please refer to the [Ledger](/wallet/ledger) guide.

After choosing the desired options, a new account will be created and
ready to be used.

#### Edit Account

You can also edit the name of an existing account, export its public key and private
key, delete an account, etc:

\<img src={require("/img/manage-accounts-4.png").default} alt="Account List" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/manage-accounts-5.png").default} alt="Edit Account" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/manage-accounts-6.png").default} alt="Export Public Key" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
\<img src={require("/img/manage-accounts-7.png").default} alt="Export Private Key" width="250"/>
