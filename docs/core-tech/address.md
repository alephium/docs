---
sidebar_position: 5
title: Address
sidebar_label: Address
---

An Alephium address is an identifier used to interact with an Alephium network. Addresses can be user-controlled or deployed through a contract.

## Address type

Alephium has two address types:

* Asset: corresponding to a public/private key pair. Controlled by the private key
* Contract: created when deploying a contract. Controlled by the code.

Both address types are able to:

* Receive, hold and send ALPH and tokens
* Interact with deployed contracts

Assets can have three different form:

* P2PKH: Pay-to-Public-Key-Hash
* P2MPKH: Pay-to-Multi-Public-Key-Hash, also known as `multisig`
* P2SH: Pay-to-Script-Hash

While contract addresses are currently only defined as:

* P2C: Pay-to-Contract

## Asset address

An asset address is derived from a cryptographic pair of public and private keys, using the same [secp256k1's elliptic curve](https://en.bitcoin.it/wiki/Secp256k1) as bitcoin. 
Those keys play a crucial role in validating the authenticity of a transaction and safeguarding against fraudulent activities. 
The private key is used to sign the transactions, as the address is derived from the public key, anyone can validate the signature.

## Contract address

Contract addresses are created when deployed on an Alephium network, they are derived from the transaction's id and the output index.
