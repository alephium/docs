---
sidebar_position: 1
slug: /frequently-asked-questions
title: FAQ
---

# Frequently Asked Questions

> 📚 Learn everything about Alephium in this [5min overview](/).

Before diving in deeper, we recommend that you check the following resources as they provide useful information about Alephium:

- [Official Website](https://alephium.org)
- [Official Discord](https://discord.gg/JErgRBfRSB)
- [Official Telegram](https://t.me/alephiumgroup)
- [Official Medium](https://medium.com/@alephium), specifically:
  - [Alephium's Tokenomics](https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c)
  - [Alephium's Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
  - [Alephium's Community Reward Program](https://medium.com/@alephium/introducing-community-rewards-f4638bbf14bf)
  - [Alephium's Q1 2022 Update](https://medium.com/@alephium/alephium-q1-project-update-50f4a7b354b0)
  - [Alephium's 1st AMA](https://medium.com/@alephium/alephiums-first-live-ama-761a90d3f672)

## FAQ

- [FAQ](#faq)
- [Mining](#mining)
  - [What is the Mining Reward?](#what-is-the-mining-reward)
  - [I have a GPU model XYZ, what is my profit per day?](#i-have-gpu-model-xyz-what-is-my-profit-per-day)
  - [What is the reason to hold the block reward for 500 minutes, given the block time is only 64 seconds?](#what-is-the-reason-to-hold-the-block-reward-for-500-minutes-given-the-block-time-is-only-64-seconds)
  - [Why do I have 4 mining addresses?](#why-do-i-have-4-mining-addresses)
  - [Is there a group for Alephium miners?](#is-there-a-group-for-alephium-miners)
  - [How many coins are mined per day?](#how-many-coins-are-mined-per-day)
- [dApps](#dapps)
  - [What are stateful UTXOs and how are they different from the other UTXOs models?](#what-are-stateful-utxos-and-how-are-they-different-from-the-other-utxos-models)
  - [What is the reason for making a new language instead of using an existing language like Solidity?](#what-is-the-reason-for-making-a-new-language-instead-of-using-an-existing-language-like-solidity)
  - [Is anyone already building a DEX on ALPH?](#is-anyone-already-building-a-dex-on-alph)
- [Wallet](#wallet)
  - [Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?](#is-there-a-way-to-distinguish-between-a-bitcoin-legacy-address-and-an-alephium-address)
  - [Is there a planned integration with Ledger Nano?](#is-there-a-planned-integration-with-ledger-nano)
- [Tokenomics](#tokenomics)
  - [If tokens are burnt, will there be a time in the future where the amount of existing ALPH will be close to zero?](#if-tokens-are-burnt-will-there-be-a-time-in-the-future-where-the-amount-of-existing-alph-will-be-close-to-zero)
  - [What is the minimum Transaction Fee (TF)?](#what-is-the-minimum-transaction-fee-tf)
- [Exchanges](#exchanges)
  - [How long does it takes for deposits to show up on exchanges?](#how-long-does-it-takes-for-deposits-to-show-up-on-exchanges)
  - [When Binance?](#when-binance)
- [Miscellaneous](#miscellaneous)
  - [Do you have a Grant & Reward Program?](#do-you-have-a-grant--reward-program)
  - [How many Transactions Per Second (TPS)](#how-many-transactions-per-second-tps)
  - [Why is the project named Alephium?](#why-is-the-project-named-alephium)
  - [Why did you choose PoLW, not PoS?](#why-did-you-choose-polw-not-pos)
  - [Why not have 1M shards?](#why-not-have-1m-shards)
  - [What is your token symbol?](#what-is-your-token-symbol)
  - [Where can I learn everything about Alephium in 5min?](#where-can-i-learn-everything-about-alephium-in-5min)
  - [WHEN MOON?](#when-moon)

## Mining

### What is the Mining Reward?

Alephium’s block reward is made up of two components: the reward for newly generated blocks, also called Mining Reward (MR), and Transaction Fees (TF).

Total Block Reward = Mining Reward + min(max(MR, 1 ALPH), Transaction Fee / 2)

You will find a more elaborate explanation of the Block Reward [in this article from the Official Alephium Medium](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)

### I have a GPU model XYZ, what is my profit per day?

A community member has made a spreadsheet with different GPUs [available here](https://docs.google.com/spreadsheets/d/10eUjwGU-Kmw1XM1dDOKfdscOeShakSnjcBGzBT46rmc/)

### What is the reason to hold the block reward for 500 minutes, given the block time is only 64 seconds?

The 500min lock was implemented to prevent re-org attacks. Similar to Bitcoin, which has a ~1000 minutes lock for mined rewards.

### Why do I have 4 mining addresses?

Alephium is a sharded blockchain with G groups and G\*G shards. Due to this design, it is necessary to have one mining address per group.

On the mainnet, we currently have 4 Groups and 16 shards. It's why you have 4 mining addresses, one for each group.

### Is there a group for Alephium miners?

On [the Discord,](https://discord.gg/JErgRBfRSB) there is a special mining channel, where you can find active groups.

### How many coins are mined per day?

Every day approximately 72k ALPH are mined.
To know how many coins are mined per day, we can use this formula:

```
3600 seconds / 64 seconds (block time) == 56.25 blocks per hour, per shard.
56.25 x 16 shards == 900 blocks total per hour.
900 x 24 hours == 21600 blocks per day.
21600 x ~3.3 ALPH reward per block ~= 72k ALPH reward per day.
```

This is not an exact calculation, because the number of ALPH issued per block can vary. But it is close enough.

## dApps

### What are stateful UTXOs and how are they different from the other UTXOs models?

There are two types of states: mutable state (e.g. ETH) and immutable state (e.g. UTXO, Extended UTXO). Mutable state is much more expressive as you can see from the ecosystem of ETH, while eUTXO can be used to build some applications with limitations.
In our stateful UTXO model, we support ETH-like mutable states. It allows us to easily build dApps as powerful as on Ethereum without the security concerns of the account model.

### What is the reason for making a new language instead of using an existing language like Solidity?

Multiple reasons:

1. We are based on the stateful UTXO model, which is very different from ETH's account model. It is incompatible with Solidity.
2. Solidity & EVM designs are not optimal and have known security issues. We want to do better.
3. We focused on development experience when designing our own language, to ensure it is easy to get started!

### Is anyone already building a DEX on ALPH?

We have a simple [Uniswap-like DEX in the test](https://github.com/alephium/alephium/blob/master/app/src/it/scala/org/alephium/app/SmartContractTest.scala#L142-L170)
We could also support order-book style DEX, which would avoid the well-known impermanent loss problem thanks to the UTXO model.

We identified DeFi and dApps to be the next critical focus for Alephium. To kickstart the development we will build clean Proof-of-concept dApps, to serve as examples. This will help us find bottlenecks or edge cases we haven’t been able to identify before. It will also serve as a basis to compile the necessary documentation to help community developers to build and deploy their applications.
Our VM and language are really dev-friendly and if you're familiar with Solidity, you can easily build similar applications on Alephium.

## Wallet

### Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?

Alephium addresses are usually longer, as it uses 32 bytes hash instead of 20 bytes hash.

### Is there a planned integration with Ledger Nano?

The plan is that once the design of desktop wallet and browser wallet get stable, we will work on Ledger integration. Right now, we are introducing breaking changes which might affect the design of Ledger app

## Tokenomics

### If tokens are burnt, will there be a time in the future where the amount of existing ALPH will be close to zero?

Theoretically yes, the future is not really projectable beyond 80 years. However, it is not uncommon for open-source community-driven blockchains such as Alephium to change their policies along their evolution. If the community decides to alter a cap, then that cap will be altered.

### What is the minimum Transaction Fee (TF)?

Currently, the minimum transaction fee is currently 0.002 ALPH. This is enforced at the node level to avoid DoS attacks on the network.
Later on, the minimum will be reduced. The lowest minimum transaction fee possible is at 0.00000000000001 ALPH.
The actual fee will depend on the number of inputs (utxo) and on the number of signers.

## Exchanges

### How long does it take for deposits to show up on exchanges?

Currently, 120 confirmations are needed for deposits, which is around 2hours (120 blocks \* block time 64s). PoW chains usually require a higher number of confirmation to ensure sufficient security. For reference, it is still around 1 hour for Bitcoin.

### When Binance?

We don't have an exact date on this. But we are working on it. However, you will be among the first to know by joining the [Telegram group](https://t.me/alephiumgroup), the [Alephium Discord](https://discord.gg/JErgRBfRSB) or if you follow our [Twitter account](https://twitter.com/alephium).

## Miscellaneous

### Do you have a Grant & Reward Program?

Yes, see [this document](https://github.com/alephium/community/blob/master/Grant&RewardProgram.md) for the details.

### How many Transactions Per Second (TPS)

Currently up to 400 TPS with 16 shards. Alephium can scale up to 10k TPS by increasing the number of shards as necessary.

### Why is the project named Alephium?

For those of you less familiar with set theory and mathematics the origin of the name “Alephium” might not be so evident. It is made from the name “Aleph” which is defined on Wikipedia: “Aleph numbers are a sequence of numbers used to represent the cardinality of infinite sets that can be well-ordered. They were introduced by the mathematician Georg Cantor and are named after the symbol he used to denote them, the Hebrew letter aleph ( ℵ )”

In fact, the logotype for Alephium is a stylisation of the letter Aleph.

In an homage to the technical promises of Ethereum, we followed the same naming pattern and the name Alephium was coined.

### Why did you choose PoLW, not PoS?

Blockchain technology is still at an early stage and one of the most prevalent questions is: what blockchain infrastructure is needed for the next 10 years for Dapps, including DeFi ?

We believe we need a blockchain that is scalable with high throughput and low transaction fees. We want a high level of programmability like on Ethereum. And we need it to be as reliable and secure as Bitcoin is.
As a result, Alephium was developed on the idea to build a scalable Bitcoin with a reliable DeFi solution.

According to the Lindy effect’s theory, and despite POS recent successes, it’s very likely that the Bitcoin model and sharding + PoW is still the most robust and decentralized way to build a scalable blockchain. Specifically:

1. PoW is simple and robust. It's much easier to design sharding algorithm with PoW
2. PoS is not tested by time yet, we look forward to see how PoS will evolve after ETH's PoS switch
3. PoS tends to be more centralized and more vulnerable to censorship
4. PoS tends to reduce trustlessness as the cost of running a node can be significantly higher
5. PoS is more vulnerable to some DeFi attacks like MEV

### Why not have 1M shards?

The groupsize G is not very big. Each node needs to maintain 2G - 1 other shards for consistency. We want to keep things small. 2G-1 cannot be too large. Given the average network bandwidth is enough, G can be set as high as 32. There is some computation overhead as well, but networking is the main bottleneck to push G higher.

### What is your token symbol?

ALPH

### Where can I learn everything about Alephium in 5min?

You can quickly get a very good overview about everything regarding Alephium in [this Medium post](https://medium.com/@alephium/welcome-to-alephium-alph-48dfb72aa458)

### WHEN MOON?

1ALPH always amounts to 1ALPH. The journey is the destination!
