---
sidebar_position: 12
title: Developing your first dApp
---

# Overview

The document tries to segment development of smart contracts into two sections.
You can imagine this as being similar to client/server architecture. The contract
on the blockchain is the server, waiting to be called by other code. The web
browser is the client, using code to call the contract. Note that contracts can
be called from anything, as long as it supports HTTP and JSON. For a traditional
dApp though we expect to be able to see something visual!

# Requirements

There are **only two requirements** to write and deploy a dApp:

* alephium/desktop-wallet:cheng-walletconnect
* nodejs

and one temporary requirement until the hardfork happens:

* alephium/alephium:1.4.0-leman8

## Setup

* Start the desktop wallet
* Make sure the wallet is using the testnet
* Create a new wallet
* Request testnet ALPH from the Discord or mine it

# Section 1 - The pieces of a smart contract

At its heart there is really only one piece to a smart contract, and that's the
**TxContract**. The reality is though one more component is needed to utilise it:
the **TxScript**. A way to see this relationship is the TxContract is a package / library,
and the TxScript is the program that uses it. More interesting, complex contracts
can be made from having TxContracts use other TxContracts even! In the end though
it's the TxScript that kicks off execution when it's sent in a transaction.

It's a good idea to open the [language reference] alongside this document to
understand the semantics a bit more as we continue. If the semantics were
explained alongside everything, it would add too much new information at once to
learn.

## 

# Section 2 - The web browser, smart contract, and wallet trifecta

## @alephium/web3
## WalletConnect
## Composing them together (development and interaction)

