---
sidebar_position: 1
slug: /frequently-asked-questions
sidebar_label: FAQ
title: Frequently Asked Questions
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

:::info 
📚 Learn everything about Alephium in this [5min overview](/).
:::

Before diving in deeper, we recommend that you check the following resources as they provide useful information about Alephium:

- [Official Website](https://alephium.org)
- [Official Twitter](https://twitter.com/alephium)
- [Official Discord](https://alephium.org/discord)
- [Official Telegram](https://t.me/alephiumgroup)
- [Official Reddit](https://reddit.com/r/Alephium)
- [Official Medium](https://medium.com/@alephium), specifically:
  - [Alephium's Tokenomics](https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c)
  - [Alephium's Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
  - [Alephium's Community Reward Program](https://medium.com/@alephium/introducing-community-rewards-f4638bbf14bf)
  - [The Ultimate guide to Proof-of-Less-Work, the universe and everything…](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)
  - [Introduction to sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
  - [ALPHred, the Virtual Machine](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025)
  - [The Leman Network Upgrade is Live!](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a)

## Chain Data

### How much ALPH are in circulation?

You can find the circulating supply on our explorer: https://explorer.alephium.org or by using this endpoint: https://mainnet-backend.alephium.org/infos/supply/circulating-alph

### How is the circulating supply calculated? 

It is calculated according to CoinMarketCap methodology https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-. 
The circulating supply is equal to number existing ALPH minus:
-  The full balance (locked & unlocked) of private sale participants, project and team-controlled addresses. According to CMC: "tokens are generally only counted as circulating after they leave the original reserve wallet (i.e. outbound transfers are more representative of an intent to bring the coin into circulation rather than a mere unlock)",
- All locked ALPH from other addresses.

### How can I check wallets balances and which are the top holding addresses? 

To check the balance of a specific wallet, the Explorer (https://explorer.alephium.org) is your go-to.

Community members have created a web-app that lists the top 256 addresses: https://alph-top.web.app/

### How long does it take for a transaction to go through?

1sec should be fine to see the incoming tx in the mempool. One block is ~64sec. Economic finality is depending on the amount and your risk management. For a small TX - mempool is probably enough, 1 - 4 blocks are enough for most TXs If you are an exchange on the other hand, you will probably wait from a few dozens to hundreds of blocks for large amounts.

### What is the minimum Transaction Fee?

Currently, the minimum transaction fee is currently 0.002 ALPH. This is enforced at the node level to avoid DoS attacks on the network. Later on, the minimum will be reduced. The lowest minimum transaction fee possible is at 0.00000000000001 ALPH. The actual fee will depend on the number of inputs (utxo) and on the number of signers.

### How many Transactions Per Second (TPS) are possible on Alephium?

Alephium Mainnet can currently support over 400 TPS with 16 shards. It can scale up over 10k TPS by increasing the number of shards as necessary.

### What is Alephium's smallest denomination?

Alephium allows 18 decimals and its smallest denomination is called Phi. Phi = 0.000000000000000001 = 10^-18 ALPH and 1 ALPH = 10^18 Phi.

## dApps

### Is there a DEX on Alephium?

Alephium has a [DEX prototype](https://alephium.github.io/alephium-dex) running on Testnet. To learn more about it, check out [this medium article](https://medium.com/@alephium/dex-prototype-live-on-testnet-bac5e7d095ce).

The contracts have been thoroughly tested by the core devs, making them reliable and efficient. The community can easily fork and use them for their own projects.

### Is Alephium prone to the concurrency issue of classic UTXO model?

No. Alephium's stateful UTXO model combines the classic UTXO model with the account model. This ensures that dApps can access mutable contract states in parallel, eliminating any possibility of a concurrency issue.

### Is there any dApps on Alephium?

Most of what has been built on Alephium so far can be found here: https://github.com/alephium/awesome-alephium 

Alephium is still very early stage and the infrastructure (including a bridge) and documentation to ease the development of dApps is being worked on. There is a Voting dApp example and proof of concepts for NFT platforms, DEX, and a name service are being worked on. 

If you want to build a dApp, head here: [https://docs.alephium.org/dapps/getting-started](https://docs.alephium.org/dapps/getting-started)(WIP)!

## Development

### Where is the roadmap?

You will find it on the Wiki: https://docs.alephium.org/#roadmap and on the website: https://alephium.org/#what's_next. You can also follow our weekly development updates on Discord, Twitter or Reddit.

### Where can I monitor the status of Alephium maintained public service?

You can monitor Alephium's public service for:  
- the mainnet on https://status.mainnet.alephium.org/
- the testnet on https://status.testnet.alephium.org/

### Where can I query an API?

First, you need to be running a full node (https://docs.alephium.org/full-node/Full-Node-Starter-Guide). 
We use OpenAPI to interact with the full node. You can directly open Swagger UI through http://127.0.0.1:12973/docs once your full node is running.
Alternatively, you can use any OpenAPI client to import the openapi.json file from our repository.

### Do you have a Grant, Reward or Bountie Program?

Yes, Alephium has a Grants and Reward program, meaning that your contribution, as small or big as it may be, might be eligible for a reward. [Read about it here](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md)

### What is being built on Alephium?

Most of what has been built on Alephium can be found here: https://github.com/alephium/awesome-alephium

If you have built something, feel free to add it to this list by sending a Pull Request.

## Listings & Exchanges

### How long does it take for deposits to show up on exchanges?

Exchanges usually require a higher number of confirmations for PoW chains to ensure sufficient security. Currently, most exchanges request 50-60 confirmations for Alephium which is around 1 hour.

### When Binance?

We are working toward additional listings and working our way up towards Binance. You will be among the first to know by joining the [Telegram group](https://t.me/alephiumgroup), the [Alephium Discord](https://alephium.org/discord) or if you follow our [Twitter account](https://twitter.com/alephium).

### What is your token ticker?

The Alephium token ticker is [ALPH](https://medium.com/@alephium/introducing-alph-8381dbd9f88d).

## Full node

### Is there a reward for running a fullnode?

Alephium is using Proof of (Less) Work. As a result, there is no native monetary reward for running a full-node as there is on Proof of Stake for example. 
However, there is number of other incentives to run your own node such as desintermediation,  trust-less independent verification, privacy and economic self-sovereignty. ""Not your Node, not your network"" emphasize if you don't run your own node, you need to connect to someone else's node and therefore rely on a 3rd party in order to view and interact with the blockchain. While it is generally safe to connect to a 3rd party node, depending on your personal levels of required trust and privacy, it might not be your prefered solution.

### What do I need to run a full-node?

Alephium full-node is really lightweight and can run on most machines, even on a Raspberry-Pi or a phone. 
To run your own node, follow the instructions.

### Is it possible to stake on Alephium?

Alephium is not a PoS blockchain, so there is no native stacking. However, in the future, there will be opportunities for returns with liquidity pools in DeFi.

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

### Why another L1 blockchain? Isn't there too many already?

There are a few key motivations for building a new blockchain:  

1. To scale horizontally with sharding, similar to what Ethereum is attempting to do but has yet to fully achieve.  

2. Many new Layer 1 (L1) blockchains are resource intensive, making it costly to run a full node, which is not ideal for decentralization in the long term. Alephium took a similar approach to Bitcoin, where everyone can run a full node and ""verify, rather than trust"".

3. Most of the new L1s are using the account model or are Ethereum Virtual Machine (EVM) compatible, which inherits all of the weaknesses of the EVM. Alephium created a new Virtual Machine (VM) built on the Unspent Transaction Output (UTXO) model that provides a higher level of security for decentralized applications (dApps) by default.

4. Most new L1s are based on the Proof of Stake (PoS) consensus mechanism. The Alephium's take is that the Proof of Work (PoW) consensus mechanism is simpler, more consistent, and more robust for achieving decentralization.

### Why is the blocktime 64 seconds? Is there a particular reason for that?

For Proof-of-Work (PoW) blockchains, finality is not related to the block time, but rather the amount of work accumulated in the new blocks. In other words, if a transaction needs N blocks (with block time T) to be confirmed, then with a block time of T/2, it will need 2N blocks to be confirmed, which will take the same amount of time.

Although shorter block time offers a better user experience, it also has some drawbacks:
1. More orphan blocks will be produced. The rate of uncle blocks on PoW Ethereum is 10% or higher, while Bitcoin's orphan rate is less than 1%.
2. There will be more overhead in the P2P network. This problem is exacerbated for PoS blockchains, as some reports suggest that up to 90% of transactions on Solana are validator messages.

In order to make the chain lightweight and efficient in the long run, these types of overheads should be avoided. Thus, Alephium began with a block time of 64 seconds, as it provides a balance between Bitcoin and newer blockchains with shorter block times. This can be reduced in the future if the blockchain matures or internet speed increases.

For those who are focused on block times and instant finality, Layer 2 solutions can be built on top of Alephium. Ultimately, a lightweight, scalable, and efficient Layer 1 is essential for the cryptocurrency space.

### How are Alephium addresses generated? Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?

To generate addresses, Alephium uses the same curve as Bitcoin (secp256k1 curve) but a different hashing algortim (blake2b). Alephium addresses are usually longer, as it uses 32 bytes hash instead of 20 bytes hash.

### What are stateful UTXOs and how are they different from the other UTXOs models?

There are two types of states: mutable state (e.g. ETH) and immutable state (e.g. UTXO, Extended UTXO). Mutable state is much more expressive as demonstrated by the ecosystem of ETH. While  eUTXO can be used to build some applications it still has limitations. In our stateful UTXO model, we support ETH-like mutable states. It  allows us to easily build dApps as powerful as on Ethereum without the  security concerns of the account model. https://www.youtube.com/watch?v=VVYH9rBJAdA

### What is the reason for making a new language instead of using an existing language like Solidity?

Multiple reasons:

1. We are based on the stateful UTXO model, which is very different from ETH's account model. It is incompatible with Solidity.
2. Solidity & EVM designs are not optimal and have known security issues. We want to propose a better alternative.
3. We focused on development experience when designing our own language, to ensure it is easy to get started!

### Are flash loans possible on alephium?

No, our virtual machine Alphred doesn't allow flash loans by design.

### Why did you choose PoLW, not PoS?

Blockchain technology is still at an early stage and one of the most prevalent questions is: what blockchain infrastructure is needed for the next 10 years for Dapps, including DeFi?

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

### Are you quantum resistant?

Like both Bitcoin and Ethereum, we believe that for now quantum computers are not an imminent threat. Hashing and signing algorithms, as well as ways to construct an address can be upgraded, so when it becomes more of a concrete threat, it will be addressed. 

### What is the process to increase the number of shards on Alephium?

A network upgrade is necessary to increase the number of shards. Such upgrade will only happen when the existing number of shards isn't sufficient to handle the network load.

## Tokenomics

### What is the lowest possible GAS fee?

The current lowest possible gas price is 10^-7 ALPH or 0.0000001 ALPH.

### If tokens are burnt, will there be a time in the future where the amount of existing ALPH will be close to zero?

Theoretically yes, the future is not really projectable beyond 80 years. However, it is not uncommon for open-source community-driven blockchains such as Alephium to change their policies along their evolution. If the community decides to alter a cap, then that cap will be altered.

## Wallet

### What type of wallet do you offer? Is it planned to offer hardware wallets?

We currently have a desktop [wallet](https://github.com/alephium/desktop-wallet/releases/latest) and the team is working on mobile and [web extension wallets](https://github.com/alephium/extension-wallet/releases/latest). We want to offer the possibility to store ALPH on hardware wallets. We are currently pursuing being supported on Ledger. Please note that it is a lengthy process and won't be completed overnight.

### When importing my seed to another desktop wallet, is there a way to import all generated addresses with it?

At the moment, when using the desktop wallet, one will have to manually re-generate each address when restoring a mnemonic into a new wallet. 
Assuming a wallet had generated X active addresses (an address is considered active when it has had at least one transaction), when the mnemonic of this wallet is restored and X addresses are generated, those addresses will be the same addresses as before and will have the same balance.

Automatic address discovery will be added in the near future. That way, when restoring a wallet, the app will automatically start a scanning process to find addresses that are "active" (active = have been used to send/receive transactions), so that the user doesn't have to manually re-generate them.

## Miscellaneous

### How can I find translated content?

Translators are encouraged to use the following hashtag structure when they publish translated content: `#Alephium[i18n]`
For example, you can find translation on Medium, Twitter and other channels with the following hashtags: 
- Spanish: `#AlephiumES`
- Portugese: `#AlephiumPT`
- French: `#AlephiumFR`
- German: `#AlephiumDE`

### What's new?

You can check our announcement channels on Telegram or Discord. We also have developments update every week on [Discord](https://alephium.org/discord), [Reddit](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1) & [Twitter](https://twitter.com/alephium).

### Why is the project named Alephium?

For those of you less familiar with set theory and mathematics the origin of the name “Alephium” might not be so evident. It is made from the name “Aleph” which is defined on Wikipedia: “Aleph numbers are a sequence of numbers used to represent the cardinality of infinite sets that can be well-ordered. They were introduced by the mathematician Georg Cantor and are named after the symbol he used to denote them, the Hebrew letter aleph ( ℵ )”

In fact, the logotype for Alephium is a stylisation of the letter Aleph.

In an homage to the technical promises of Ethereum, we followed the same naming pattern and the name Alephium was coined.

### Where can I learn everything about Alephium in 5min?

You can quickly get a very good overview about everything regarding Alephium in the [landing page of the wiki](/)

### WHEN MOON?

1ALPH always amounts to 1ALPH. The journey is the destination!
