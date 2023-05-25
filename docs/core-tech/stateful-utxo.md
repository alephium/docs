---
sidebar_position: 20
title: Stateful UTXO Model
sidebar_label: Stateful UTXO model
---

In the space of programmable blockchains, there are two main paradigms: UTXO-based and account-based. The UTXO model is started by Bitcoin and extended by its successors. The account model is widely adopt by Ethereum and other popular blockchains.

Alephium designs and implements an innovative `stateful UTXO` model to combine the advantages of both the UTXO model and the account model.

## Overview of the UTXO model

UTXO stands for "extended Unspent Transactions Output". In the UTXO model, a transaction has inputs and outputs, where the inputs are unspent outputs from previous transactions. Similar to how a coin or note cannot be divided into a smaller denominations, an UTXO can only be used and cannot be altered. In the words of programming, it is an immutable chunk of data controlled by its owner.

The primary advantages of UTXO model are:

- **Scalability** Thanks to the immutability of UTXOs, there are more opportunities to process multiple transactions in parallel, which allows for a higher blockchain execution throughput.

- **Security** First, UTXOs are directly controlled by the owners. A compromised contract cannot steal user's funds. Note that a contract's funds might be lost in this case. Second, since the inputs and outputs of transactions are explicitly linked, it is easier to reason about the correctness of the transactions.

## Overview of the account model

## Stateful UTXO model

## FAQ

### What is the minimal amount of ALPH per UTXO?

0.001 ALPH

### 

### Why is UTXO model less popular?
