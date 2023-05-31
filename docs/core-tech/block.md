---
sidebar_position: 7
title: Block
sidebar_label: Block
---

A block is a fundamental component of the blockchain, it is a data structure that contains a batch of validated transactions along with other essential information. 
Blocks are linked together to form a [BlockFlow](/core-tech/blockflow-and-sharding).

## Prerequisites

Understanding of a [Transaction](/core-tech/transaction) is a plus.

## Overview of a Block

Each Alephium block includes various components, such as the timestamp of creation, a record of transactions, and a reference to the dependencies blocks. Additionally, it incorporates the solution to the mining puzzle that is unique to each block, so the network can easily verify its correctness. While multiple valid solutions may exist for a given block, only one needs to be discovered to consider the block solved. As an incentive for solving each block, miners are rewarded with new generated ALPH.

New transactions are constantly being processed by miners into new blocks and added to the BlockFlow.

### Block model

The block model is quite simple:

* header: Block's header
* transactions: The record of transactions

The `header` contains all other metadata:

* nonce
* version: 
* blockDeps: A list of older block hashes, used to validate the BlockFlow
* depStateHash: : TBD
* txsHash: An hash based on all transactions
* timestamp: creation timestamp
* target

## Block time

WIP

## Block size

WIP
