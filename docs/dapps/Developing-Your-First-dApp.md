---
sidebar_position: 11
title: Developing your first dApp
---

The document segments development of smart contracts into two sections: server
and client.

You can imagine contract interaction as being similar to the client-server
architecture of web development. The contract on the blockchain is the server,
waiting to be called. The web browser is the client, using code to call the
contract. Contracts can be called from anything, as long as it supports HTTP and
JSON. For an interactive dApp though we'll use web technologies to build an
interface which communicates with its contract(s).

## Requirements

There are **only two requirements** to write and deploy a dApp:

* alephium/desktop-wallet:cheng-walletconnect
* nodejs

and one temporary requirement until the hardfork happens:

* alephium/alephium:1.4.0-leman8

### Setup

* Start the desktop wallet
* Make sure the wallet is using the testnet
* Create a new wallet
* Request testnet ALPH from the Discord or mine it

## The pieces of a smart contract

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

### TxContract

### TxScript

## The web browser, smart contract, and wallet triad

### @alephium
### WalletConnect
### Composing them together (development and interaction)

