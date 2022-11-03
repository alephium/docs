---
sidebar_position: 1
slug: /frequently-asked-questions
title: FAQ
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Frequently Asked Questions

:::info 
📚 Learn everything about Alephium in this [5min overview](/).
:::

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

## Chain Data

### How much ALPH in circulation?

You can find the circulating supply on our explorer: https://explorer.alephium.org or by using this endpoint: https://mainnet-backend.alephium.org/infos/supply/circulating-alph

### Is there a way to check which wallet holds how much alph? Top addresses ? 

"This website created by a community member lists the top 256 addresses: https://alph-top.web.app/ For specific wallets, the Explorer is your goto.
https://explorer.alephium.org"

### How many seconds for a transaction?

1sec should be fine to see the incoming tx in the mempool. One block is ~64sec. Economic finality is depending on the amount and your risk management. For a small TX - mempool is probably enough, 1 - 4 blocks are enough for most TXs If you are an exchange on the other hand, you will probably wait from a few dozens to hundreds of blocks for large amounts.

### What is the minimum Transaction Fee (TF)?

Currently, the minimum transaction fee is currently 0.002 ALPH. This is enforced at the node level to avoid DoS attacks on the network. Later on, the minimum will be reduced. The lowest minimum transaction fee possible is at 0.00000000000001 ALPH. The actual fee will depend on the number of inputs (utxo) and on the number of signers.

### How many Transactions Per Second (TPS)

Currently up to 400 TPS with 16 shards. Alephium can scale up to 10k TPS by increasing the number of shards as necessary.

## dApps

### Is anyone already building a DEX on ALPH?

We have a simple [Uniswap-like DEX in the test](https://github.com/alephium/alephium/blob/master/app/src/it/scala/org/alephium/app/SmartContractTest.scala#L142-L170)
We could also support order-book style DEX, which would avoid the well-known impermanent loss problem thanks to the UTXO model.

We identified DeFi and dApps to be the next critical focus for Alephium. To kickstart the development we will build clean Proof-of-concept dApps, to serve as examples. This will help us find bottlenecks or edge cases we haven’t been able to identify before. It will also serve as a basis to compile the necessary documentation to help community developers to build and deploy their applications.
Our VM and language are really dev-friendly and if you're familiar with Solidity, you can easily build similar applications on Alephium.

## Development

### Where is the roadmap?

You will find it on the Wiki: https://docs.alephium.org/#roadmap and on the website: https://alephium.org/#what's_next. You can also follow our weekly development updates on Discord, Twitter or Reddit.

### Where can I query an API?

First, you need to be running a full node (https://docs.alephium.org/full-node/Full-Node-Starter-Guide). 
We use OpenAPI to interact with the full node. You can directly open Swagger UI through http://127.0.0.1:12973/docs once your full node is running.
Alternatively, you can use any OpenAPI client to import the openapi.json file from our repository.

### Do you have a Grant, Reward or Bountie Program?

Yes, Alephium has a Grants and Reward program, meaning that your contribution, as small or big as it may be, might be eligible for a reward. [Read about it here](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md)

## Listings & Exchanges

### How long does it take for deposits to show up on exchanges?

Currently, 120 confirmations are needed for deposits, which is around 2hours (120 blocks \* block time 64s). PoW chains usually require a higher number of confirmation to ensure sufficient security. For reference, it is still around 1 hour for Bitcoin.

### When Binance?

We don't have an exact date on this. But we are working on it. However, you will be among the first to know by joining the [Telegram group](https://t.me/alephiumgroup), the [Alephium Discord](https://discord.gg/JErgRBfRSB) or if you follow our [Twitter account](https://twitter.com/alephium).

### What is your token symbol?

ALPH

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

## Tech

### Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?

Alephium addresses are usually longer, as it uses 32 bytes hash instead of 20 bytes hash.

### What are stateful UTXOs and how are they different from the other UTXOs models?

There are two types of states: mutable state (e.g. ETH) and immutable state (e.g. UTXO, Extended UTXO). Mutable state is much more expressive as you can see from the ecosystem of ETH, while eUTXO can be used to build some applications with limitations.
In our stateful UTXO model, we support ETH-like mutable states. It allows us to easily build dApps as powerful as on Ethereum without the security concerns of the account model.

### What is the reason for making a new language instead of using an existing language like Solidity?

Multiple reasons:

1. We are based on the stateful UTXO model, which is very different from ETH's account model. It is incompatible with Solidity.
2. Solidity & EVM designs are not optimal and have known security issues. We want to propose a better alternative.
3. We focused on development experience when designing our own language, to ensure it is easy to get started!

### Are flash loans possible on alephium ?

No, our virtual machine Alphred doesn't allow flash loans by design.

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

Networking is the main bottleneck to increase the number of shards. Each node needs to maintain 2G - 1 other shards for consistency. If the average network bandwidth is sufficient, G can be set as high as 32. There is some computation overhead as well, but networking is the main bottleneck. 

### Can a sharded network, specifically Alephium, be attacked with less than 51% hashrate? As in just compromising one shard group?

Sharded blockchain could have security concerns if not designed well. Vitalik coined the "1% attack" terminology for such concerns. ETH's sharding approach solved the issue with validator shuffling.

Alephium solved it with blockflow algorithm. Mining work of different shards is accumulated due to block dependencies. If an attacker wants to reorg one shard, one needs to reorg all of the dependencies. One intuitive way to view this is that all of the shards merged-mine with each other. 

### Can I use my mainnet address on the testnet? 

Alephium addresses are algorithmically created and are independent from any network (testnet, mainnet, devnet, etc). You don't need to connect to a network node (or internet) to create a wallet and addresses. In a sense, every Alephium address exists in every network, even ones that have not been created yet. In many early crypto-networks when a transaction was created it had no information about the network and the transaction could be ""replayed"" on other networks. Therefore it was a bad practice to use the same addresses on different networks. In Alephium, we have network-id as part of transactions so it's perfectly fine to use the same address in different networks.

Once you connect your wallet to a network, say testnet for example, you can then query a node of the testnet to ask for the balance of your address on testnet. Switching the network settings of your wallet to connect to mainnet, a mainnet node will then tell you the balance of your address on the mainnet network. So every address has a balance in every network, and based on which network you chose to connect to, you'll see the balance of your address on that specific network. 

## Tokenomics

### If tokens are burnt, will there be a time in the future where the amount of existing ALPH will be close to zero?

Theoretically yes, the future is not really projectable beyond 80 years. However, it is not uncommon for open-source community-driven blockchains such as Alephium to change their policies along their evolution. If the community decides to alter a cap, then that cap will be altered.

## Wallet

### Is there a planned integration with Ledger Nano?

The plan is that once the design of desktop wallet and browser wallet get stable, we will work on Ledger integration. Right now, we are introducing breaking changes which might affect the design of Ledger app

### What type of wallet do you offer? Is it plan to offer hardware wallets?

We currently have a desktop [wallet](https://github.com/alephium/desktop-wallet/releases/latest) and the team is working on mobile and [web extension wallets](https://github.com/alephium/extension-wallet/releases/latest). We want to offer the possibility to store ALPH on hardware wallets. We are currently pursuing being supported on Ledger. Please note that it is a lengthy process and won't be completed overnight.

### When importing my seed to another desktop wallet, is there a way to import all generated addresses with it?

At the moment, when using the desktop wallet, one will have to manually re-generate each address when restoring a mnemonic into a new wallet. 
Assuming a wallet had generated X active addresses (an address is considered active when it has had at least one transaction), when the mnemonic of this wallet is restored and X addresses are generated, those addresses will be the same addresses as before and will have the same balance.

Automatic address discovery will be added in the near future. That way, when restoring a wallet, the app will automatically start a scanning process to find addresses that are "active" (active = have been used to send/receive transactions), so that the user doesn't have to manually re-generate them.

## Miscellaneous

### What's new?

You can check our announcement channels on Telegram or Discord. We also have developments update every week on [Discord](https://discord.gg/GxfzPBKJcy), [Reddit](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1) & [Twitter](https://twitter.com/alephium).

### Why is the project named Alephium?

For those of you less familiar with set theory and mathematics the origin of the name “Alephium” might not be so evident. It is made from the name “Aleph” which is defined on Wikipedia: “Aleph numbers are a sequence of numbers used to represent the cardinality of infinite sets that can be well-ordered. They were introduced by the mathematician Georg Cantor and are named after the symbol he used to denote them, the Hebrew letter aleph ( ℵ )”

In fact, the logotype for Alephium is a stylisation of the letter Aleph.

In an homage to the technical promises of Ethereum, we followed the same naming pattern and the name Alephium was coined.

### Where can I learn everything about Alephium in 5min?

You can quickly get a very good overview about everything regarding Alephium in the [landing page of the wiki](/)

### WHEN MOON?

1ALPH always amounts to 1ALPH. The journey is the destination!
