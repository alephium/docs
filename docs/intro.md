---
sidebar_position: 1
slug: /
title: Intro
---

# Alephium Wiki

This wiki contains the documentation of [Alephium](https://github.com/alephium/alephium), a sharded blockchain that makes programmable money scalable and secure.

Here, you will find information on how to set up a full node and get started with mining, troubleshooting sections, guides for our wallets, a guide on building smart contracts, the roadmap of our projects, FAQs, and more.

## Alephium overview

The protocol's innovations extend battle-tested ideas from [Bitcoin](https://bitcoin.org/bitcoin.pdf) and [Ethereum](https://ethereum.org/en/whitepaper/):

- BlockFlow algorithm based on UTXO model enables sharding and scalability for today (code + [algorithm paper](https://github.com/alephium/research/blob/master/alephium.pdf))
  - The first sharding algorithm that supports `single-step cross-shard transactions`, offering the same user experience as single chain.
  - Simple and elegant `PoW based sharding`, does not rely on beacon chain.
- `Stateful UTXO model` combines the advantages of both eUTXO model and account model (see code, wiki to come).
  - Tokens are first-class citizens and UTXO-based, which are `owned by users` directly instead of contracts.
  - Offer the same expressiveness as `account model`. DApps can be easily built on top of it with better security.
  - Support `multiple participants` in a single smart contract transaction. Multiple calls can be packed into a single transaction too.
- Novel VM design resolves many critical challenges of dApp platforms (see code, wiki to come).
  - Less IO intensive.
  - Flash loan is not available by design.
  - Eliminate many attack vectors of EVM, including unlimited authorization, double dip issue, reentrancy attack, etc.
  - UTXO style `fine-grained execution model` reduces risk-free arbitrage.
- `Front-running mitigation` through random execution of transactions (see code, wiki to come).
- PoLW algorithm reduces the energy consumption of PoW in the long term ([research paper](https://github.com/alephium/research/blob/master/polw.pdf)).
  - Adaptive rewards based on hashrate and timestamp are designed and implemented.
  - Internal mining cost through burning will be added when hashrate and energy consumption is significantly high.
