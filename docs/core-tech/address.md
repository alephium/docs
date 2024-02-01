---
sidebar_position: 5
title: Address
sidebar_label: Address
---

An Alephium address represents a user or a contract within the Alephium network. Addresses can be user-controlled or deployed through a contract.

## Address type

Alephium has two address types:

* Asset: generated with one or multiple public/private key pair or a script.
* Contract: Created when deploying a contract. Controlled by the code.

Both address types are able to:

* Receive, hold and send ALPH and tokens
* Interact with deployed contracts

Assets can have three different forms:

* P2PKH: Pay-to-Public-Key-Hash
* P2MPKH: Pay-to-Multi-Public-Key-Hash, also known as `multisig`
* P2SH: Pay-to-Script-Hash

While contract addresses are currently only defined as:

* P2C: Pay-to-Contract

## P2PKH address

An p2pkh address is derived from a cryptographic pair of public and private keys, using the same [secp256k1's elliptic curve](https://en.bitcoin.it/wiki/Secp256k1) as bitcoin.
Those keys play a crucial role in validating the authenticity of a transaction and safeguarding against fraudulent activities.
The private key can be used to sign any messages, including transactions. As the address is derived from the public key, anyone can validate the signature.

## Contract address

Contract addresses are created when deployed on an Alephium network, they are derived from the transaction's id and the output index.
