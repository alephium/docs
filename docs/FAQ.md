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

You can find the circulating supply on Alephium [Explorer](https://explorer.alephium.org) or by using the [circulating ALPH endpoint](https://backend.mainnet.alephium.org/infos/supply/circulating-alph).

### How is the circulating supply calculated?

It is calculated according to [CoinMarketCap's methodology](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-).

The circulating supply is equal to number existing ALPH minus:

- The full balance (locked & unlocked) of private sale participants, project and team-controlled addresses. According to CMC: _"tokens are generally only counted as circulating after they leave the original reserve wallet (i.e. outbound transfers are more representative of an intent to bring the coin into circulation rather than a mere unlock)"_.
- All locked ALPH from other addresses.

### How can I check wallets balances and which are the top holding addresses?

To check the balance of a specific wallet, the [Explorer](https://explorer.alephium.org) is your go-to.  
Community members have created web-apps that lists the top holding addresses:

- https://alph-richlist.vercel.app/
- https://alph-top.web.app/

### What is the minimum Transaction Fee?

Currently, the minimum transaction fee is set at `0.002` ALPH to prevent network DoS attacks. In the future, this minimum fee can be lowered, with the lowest possible minimum transaction fee being `0.00000000000001` ALPH on Alephium. The exact fee charged depends on the number of inputs (UTXOs) and signers involved in the transaction.

### How many Transactions Per Second (TPS) are possible on Alephium?

Alephium Mainnet can currently support over 400 TPS with 16 shards. It can scale up over 10k TPS by increasing the number of shards as necessary.  
Read more about [the concept of TPS](https://medium.com/@alephium/transactions-per-second-tps-f13217a49e39).

### What is Alephium's smallest denomination?

Alephium allows up to 18 decimals and its smallest denomination is called Phi. Phi is equivalent to `0.000000000000000001` ALPH, or `10^-18` ALPH, while 1 ALPH equals `10^18` Phi.

## dApps

### Is there a DEX on Alephium?

Alephium has a [DEX prototype](https://alephium.github.io/alephium-dex/#/swap) running on Testnet. Learn more about it in [the DEX prototype article](https://medium.com/@alephium/dex-prototype-live-on-testnet-bac5e7d095ce).

The [DEX contracts](https://github.com/alephium/alephium-dex/tree/master/contracts) have been thoroughly tested by the core developers, making them reliable and efficient. They can easily be forked and used for projects.

### Is there any dApps on Alephium?

Most of what has been built on Alephium so far is listed on the [Awesome Alephium repository](https://github.com/alephium/awesome-alephium). To add your contribution, submit a Pull Request!

Alephium is still at a very early stage and the infrastructure (including a [bridge](https://github.com/alephium/wormhole-fork)) and documentation to ease the development of dApps is continuously being worked on.
Alephium has a number of [well-maintained prototypes](https://docs.alephium.org/dapps/ecosystem#prototypes) that can be used as a basis or inspiration for your project.

If you want to build a dApp, check out our [dApps Getting Started guide](https://docs.alephium.org/dapps/getting-started).

### Why can the dApp only connect to one of my addresses?

Alephium operates as a sharded blockchain, where addresses and contract states are organized into several groups. When it comes to dApps, they can be deployed to any of these groups. However, there's a catch — dApps can only be used by addresses in the same group.

So, when you connect to a dApp, it will specifically ask to connect with addresses that belong to the same group as the dApp itself. This grouping system ensures everything runs smoothly within Alephium's sharded structure.

## Development

### Where is the roadmap?

You will find the roadmap on the [website](https://alephium.org/#next) and on the [docs](https://docs.alephium.org/#roadmap). You can also follow the weekly development updates on [Discord](https://alephium.org/discord), [Twitter](https://twitter.com/alephium) or [Reddit](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1).

### Where can I monitor the status of Alephium maintained public service?

You can monitor Alephium's public service for:

- the mainnet on https://status.mainnet.alephium.org
- the testnet on https://status.testnet.alephium.org

### Where can I query an API?

In order to query an API you need to be running a full node ([instructions](https://wiki.alephium.org/full-node/Full-Node-Starter-Guide)).  
Alephium uses OpenAPI to interact with the full node. You can directly open your local Swagger UI through `127.0.0.1:12973/docs` once your full node is running.  
Alternatively, you can use any OpenAPI client to import the [openapi.json](https://raw.githubusercontent.com/alephium/alephium/master/api/src/main/resources/openapi.json) file from Alephium's repository.

### Do you have a Grant, Reward or Bountie Program?

Alephium offers a [Grants and Rewards program](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md) where your contribution, regardless of size, may be eligible for a reward.

### What is being built on Alephium?

Most of what has been built on Alephium so far is listed on the [Awesome Alephium repository](https://github.com/alephium/awesome-alephium). If you'd like to showcase what you've built, submit a Pull Request to add it to the list.

## Full node

### Is there a reward for running a fullnode?

Alephium uses a Proof of (Less) Work consensus mechanism, which means there is no native monetary reward for running a full node, unlike Proof of Stake networks. However, running your own node offers other benefits such as decentralization, independent verification, privacy, and economic self-sovereignty. The phrase _"not your node, not your network"_ highlights the importance of running your own node, as relying on a third party node for blockchain interaction means trusting that third party. While connecting to a third party node is generally safe, some individuals may prefer to maintain their own level of trust and privacy.

### What do I need to run a full-node?

Alephium's full-node is lightweight and can run on most devices, including Raspberry-Pi or phones. To set-up and run your own node, please follow the [Full-node Getting Started guide](https://docs.alephium.org/full-node/getting-started/).

### Is it possible to stake on Alephium?

Alephium does not offer native staking on its blockchain, as it does not operate on a PoS consensus mechanism. However, DeFi liquidity pools may offer staking opportunities for users in the future.

## Listings & Exchanges

### What is your token ticker?

The Alephium token ticker is [ALPH](https://medium.com/@alephium/introducing-alph-8381dbd9f88d).

### How long does it take for deposits to show up on exchanges?

Exchanges usually require a higher number of confirmation for PoW chains to ensure sufficient security. Currently, most exchanges request between 30 to 60 confirmations for Alephium which is between 30 minutes and an hour.

### What exchanges is Alephium currently listed on?

You can find the list of available Alephium markets on [CoinMarketCap](https://coinmarketcap.com/currencies/alephium/markets/) or [CoinGecko](https://www.coingecko.com/en/coins/alephium).

## Mining

### What is the Mining Reward?

There is a [detailed article explaining Alephium's block rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33).

### What is the reason to hold the block reward for 500 minutes, given the block time is only 64 seconds?

The 500-minute lock is designed to prevent re-org attacks, much like Bitcoin's ~1000 minute lock for mined rewards.

### Why do I have 4 mining addresses?

Alephium is a sharded blockchain with `G` groups and `G*G` shards. Due to this design, each group requires its own mining address.

Currently, Alephium has 4 groups and 16 shards on its mainnet. Therefore, 4 mining addresses are needed, one for each group.

### How many coins are mined per day?

To know how many coins are mined per day, you can use the formula below. As the block reward change dynamically with each block, the formula will only give you an approximation.

```
3600 seconds / 64 seconds (Alephium block time) == 56.25 blocks per hour, per shard.
56.25 x 16 shards == 900 blocks total per hour.
900 x 24 hours == 21600 blocks per day.
21600 x  ALPH reward per block ~= number of ALPH mined per day.
```

At the time this entry was last updated the average block reward was: `2.87` ALPH which results in approximately `61'992` ALPH mined per day.

### Which miners can I use to mine ALPH?

Below is list of known Alephium miners. Please note the list may be incomplete as it is difficult to keep track of new miners coming out, feel free to submit a Pull Request to add to the list.

- https://www.bzminer.com/guides/how-to-mine-alephium/
- https://lolminer.site/
  https://github.com/Lolliedieb/lolMiner-releases
- https://www.srbminer.com/
  https://github.com/doktor83/SRBMiner-Multi/releases
- https://trex-miner.com/
  https://github.com/trexminer/T-Rex

You can also use [Alephium's gpu-miner](https://github.com/alephium/gpu-miner) but it is not as efficient as the others in this list.

## Tech

### Why another L1 blockchain? Isn't there too many already?

The blockchain’s narrative evolved from disruptive technology to a possible mainstream solution for several sectors. Due to this paradigm shift, most projects are giving away the core values of decentralization, self-sovereignty, and security in pursuing scalability to meet the performance requirements needed for such applications. Alephium delivers the same result without compromising on those fundamentals, and it is uniquely placed to ignite the industry’s interest in (s)UTXO and Po(L)W and spearhead the movement of UTXO-based DeFi and smart contract applications.

In addition, there were a few key technological motivations for building Alephium:

1. Horinzontal scaling through sharding
2. Many of the new Layer 1 (L1) blockchains are resource intensive, making it costly to run a full node which in turn can lead to a lack of decentralization and desintermediation in the long term. Alephium's approach is similar to Bitcoin's where anyone can run a full node and verify network. _"Don't trust, verify."_
3. Many of new L1 blockchains use the account model or are EVM compatible and inherits its weaknesses. Alephium created a new Virtual Machine (VM) built on the Unspent Transaction Output (UTXO) model to provides a new programming paradigm with higher security level for decentralized applications (dApps).
4. Most new L1s use Proof of Stake (PoS) consensus mechanism. Alephium chose to build on the Proof of Work (PoW) as simpler, more consistent, and more robust consensus mechanism for achieving decentralization.

### Does Alephium support smart contracts?

Yes, Alephium supports smart contracts. It was specifically designed to be a scalable and secure network for smart contracts and decentralized applications.

### Why is the blocktime 64 seconds? Is there a particular reason for that?

Finality on Proof-of-Work (PoW) blockchains is based on the amount of work accumulated in new blocks, rather than the block time. This means that if a transaction needs N blocks with block time T to be confirmed, then it will need 2N blocks to be confirmed if the block time is halved to T/2, which would result in the same amount of time for confirmation.

While shorter block times provide better user experience, they also come with some drawbacks:

- More orphan blocks are produced. The rate of uncle blocks on PoW Ethereum is 10% or higher, while Bitcoin's orphan rate is less than 1%.
- Increased overhead in the P2P network. This problem is more severe for PoS blockchains, as reports suggest up to 90% of transactions on Solana are validator messages.

To ensure a lightweight and efficient chain in the long term, these types of overheads should be avoided. Therefore, Alephium started with a block time of 64 seconds, which strikes a balance between Bitcoin and newer blockchains with shorter block times.

For those who prioritize block times and instant finality, Layer 2 solutions can be built on top of Alephium and block time can be reduced in the future as the blockchain matures or internet speed increases.
Ultimately, a lightweight, scalable, and efficient Layer 1 is essential for the cryptocurrency space.

### How long does it take for a transaction to go through?

1 second should be enough to see the incoming transaction in the mempool. Alephium's block time is currently 64 seconds. Economic finality depends on the amount and your risk management. For a small transaction, the mempool is probably enough, and 1-4 blocks are enough for most transactions. However, if you are an exchange and dealing with large amounts, you will probably wait for a few dozen to hundreds of blocks.

You can read more about the concept of block time and time to finality in these articles:

- [Block time & block size](https://medium.com/@alephium/block-time-and-block-size-16e37292444f)
- [Time to finality](https://medium.com/@alephium/time-to-finality-17d64eeffd25)

### Why did you choose PoLW, not PoS?

Blockchain technology is still in its early stages and a common question is what blockchain infrastructure is needed for the next 10 years to support dApps, including DeFi.

Alephium was built with the belief that a scalable blockchain with high throughput and low transaction fees, along with a high level of programmability like Ethereum and the reliability and security of Bitcoin, is necessary. The goal was to create a "scalable Bitcoin with a reliable smart contract solution".

According to the Lindy effect, despite recent successes with PoS, the Bitcoin model and sharding with PoW is still the most robust and decentralized way to build a scalable blockchain. Specifically:

- PoW is simple and robust and easier to design sharding algorithms with
- PoS hasn't been time-tested yet and it remains to be seen how it will evolve after Ethereum's PoS switch
- PoS tends to be more centralized and vulnerable to censorship
- PoS tends to reduce trustlessness as the cost of running a node can be significantly higher
- PoS is more vulnerable to some DeFi attacks like MEV

### What are stateful UTXOs and how are they different from the other UTXOs models?

There are two types of states in blockchain technology: mutable state (as seen in Ethereum) and immutable state (such as UTXO or eUTXO). Mutable state is more flexible and expressive, as evidenced by the vibrant ecosystem of Ethereum.However, the UTXO model provides inherent security advantages.

[Alephium's stateful UTXO model](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) combines the advantages of both. It supports mutable states, like those found in Ethereum, for smart contracts while leveraging the security benefits of the UTXO model for assets.

### Is Alephium prone to the same concurrency issue as the classic and extended UTXO model which can result in low TPS?

No, Alephium does not have this limitation. Alephium's stateful UTXO model combines the classic UTXO model with the account model and supports mutable states. This ensures that dApps can access mutable contract states in parallel, eliminating any possibility of a concurrency issue.

### Why not have 1M shards?

Networking is the main bottleneck for increasing the number of shards. Each node needs to maintain `2G - 1` other shards for consistency. If the average network bandwidth is sufficient, `G` can be set as high as 32. While there is also some computation overhead, networking is the primary bottleneck.

### What is the process to increase the number of shards on Alephium?

An upgrade to the network is required to increase the number of shards. Such upgrade would occur when the existing number of shards is insufficient to handle the network load.

### Can a sharded network, specifically Alephium, be attacked with less than 51% hashrate? For example by compromising only one group or shard?

Security concerns can arise in sharded blockchains if they are not designed properly, as Vitalik explained in his "1% attack" terminology. Ethereum's sharding approach addressed this issue with validator shuffling.

Alephium, on the other hand, addressed it with its Blockflow algorithm. Mining work across different shards is accumulated due to block dependencies. An attacker trying to reorganize one shard would also need to reogarnize all of its dependencies.
One intuitive and simplified way to view this is that all of the shards merge-mine with each other.

### Is there cross shard atomicity for tokens and smart contracts on Alephium?

On Alephium, tokens are atomically composable across shards, which means that it is possible to transfer tokens from one shard to another shard atomically in one transaction.
However, while smart contracts have token and state components in Alephium's stateful UTXO model, only tokens have cross-shard atomicity; states are sharded and thus not composable. This design decision reflects Alephium's token-centric approach and allows for a simpler state design resembling a partitioned database. This tradeoff is more favorable than the current Layer 2 trends that lack token atomicity, and there is currently no practical solution for complete state composability.

### Are flash loans possible on Alephium?

No, flash loan are not available by design on [Alephium's virtual machine, Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025).

### How are Alephium addresses generated? Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?

Alephium uses the same curve as Bitcoin (secp256k1 curve) to generate addresses, but a different hashing algorithm (blake2b). However, Alephium addresses are typically longer than Bitcoin addresses since it uses a 32-byte hash instead of a 20-byte hash.

### Can I use my mainnet address on the testnet?

Alephium addresses are self-generated by an algorithm and are network-agnostic (testnet, mainnet, devnet, etc). It is not necessary to be connected to a network node (or even the internet) to create a wallet and addresses. Essentially, every Alephium address exists in all networks, even those that haven't been generated/discovered yet.

In earlier crypto-networks, transactions didn't contain any network information and could be "replayed" on other networks. Therefore, it was not recommended to use the same addresses on different networks.
Alephium includes network ID in its transactions, so it is perfectly acceptable to use the same address on various networks.  
When you link your wallet to a network, such as testnet, you can request a testnet node to check your address balance. If you change your wallet's network settings to connect to mainnet, a mainnet node will display your address balance on the mainnet network. Thus, each address has a balance in every network, and you can view the balance of your address on that specific network by connecting to it.

### Why did Alephium chose to build its own virtual machine and smart contract language?

The [stateful UTXO model](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) on which Alephium is based is completely novel and is incompatible with existing virtual machine such as EVM which was designed for the account model. This imposed the decision to create a new virtual machine [Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025), specifically designed to take advantage of sUTXO’s strengths.

Similarly to the EVM with Solidity, Alphred has a domain-specific language called Ralph. Ralph was built specifically for Alephium’s blockchain to be extremely expressive and easy to use. It has been specially tailored to be secure by design, leveraging the built-in features of the VM.

By creating its own VM and smart contract language, Alephium was able to propose a better alternative and mitigate some of the known security issues of Solidity and EVM. In addition, development experience was prioritized when designing the Alphred and Ralph, ensuring an easy start for developers.

### Is Alephium quantum resistant?

Similar to Bitcoin and Ethereum, Alephium does not view quantum computers as an immediate concern. The hashing and signing algorithms, as well as address construction, can be updated. The issue of quantum computing will be addressed when it becomes a more significant threat.

## Tokenomics

### What is the lowest possible GAS fee?

The current lowest possible gas fee is `10^-7` ALPH or `0.0000001` ALPH.

### What is the emission schedule of Alephium? Does Alephium have halving?

Alephium does not have halving like Bitcoin. Its emission schedule depends on the network hashrate and timestamp. Mining rewards are dynamically adjusted with each block. You can read more about it in these articles:

- [Block Reward](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
- [Proof of Less Work](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)

### If tokens are burnt, will there be a time in the future where the amount of existing ALPH will be close to zero?

In theory, yes. Predicting the future of technologies beyond 10, let alone 80 years is difficult. For blockchains like Alephium, it is not unusual for policies, such as emission schedule, to change as technologies evolve. If the consensus agrees to a change in the emission schedule, the change will be happen.

### How is the maximum supply cap implemented?

The maximum supply cap of 1 billion ALPH is an estimate. The protocol implements a cap on emissions based on a timestamp of approximately 80 years. This is because computing the sum of emissions for a shared chain within the protocol is computationally expensive. The emission rate is determined by the time and varies depending on the hash rate.  
It's worth noting that the 1 billion cap was estimated before the implementation of the improved [DAA](https://github.com/alephium/alephium/blob/master/docs/proposals/lemanDAA.md). With the current code, the actual cap on emission and maximum supply of ALPH is expected to be less than 1 billion in 80 years, even without taking into account the POLW mechanism's fee burning.

## Wallet

### What type of wallet does Alephium offer?

Alephium currently offers:

- a [desktop wallet](https://github.com/alephium/desktop-wallet/releases/latest)
- a [web extension wallet](https://github.com/alephium/extension-wallet) available on [Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)
- a [mobile wallet](https://github.com/alephium/mobile-wallet) is currently being worked on.

In addition to the official wallets, there are a number of third-party wallets available.

### Is it planned for Alephium to be supported on hardware wallets?

Offering hardware wallet support is an important priority for Alephium.
A Ledger integration is currently being worked on and will be available in developer mode with the web extension wallet `v0.7.0`.
Official publication on Ledger is a lengthy process with multiple stages that will take time to complete.

### When importing my seed into the desktop wallet, is there a way to import all generated addresses with it?

After importing your wallet using the recovery phrase, the wallet can now scan the connected network to discover all the active addresses you have used in the past. An active address is one that has at least one transaction. For manual address discovery, go to the Addresses section and click on the wrench icon next to the "+ New address" button. After clicking on the “Search” button in the “Discover active addresses” option the Desktop wallet will shows all active addresses linked to this recovery phrase.

### What analytics does the desktop wallet collect?

Alephium takes concerns about privacy and user experience seriously. Enabling analytics can actually help improve user experience without compromising your privacy. The information collected by the Desktop wallet is completely anonymous. Upon the first launch of your wallet, a unique ID is generated (for example, `vCJGCsDPrZ8WJaIKZMWjU`) which is the only identification information required. IPs or any other [personal data](https://posthog.com/blog/what-is-personal-data-pii) are not collected. Only button clicks, number of wallets, addresses, contacts, and wallet preferences are recorded. This information helps identify useful features and areas for improvement.
Alephium's open-source code base allows users to verify which events are captured by [searching for the `posthog?.capture` keyword](https://github.com/search?q=repo%3Aalephium%2Fdesktop-wallet+posthog?.capture&type=code).

### Why is there an additional 0.001 ALPH per token added to my transaction when I try to send tokens?

The `0.001` ALPH is the minimal requirement per UTXO to avoid UTXO spamming. This amount is not consumed by the network and it will arrive to the destination address, same as the tokens.

## Miscellaneous

### How can I find translated content?

You can find a lot of international and translated content on Medium, Twitter and Youtube.

On Twitter, the following community accounts translate Alephium tweets:

- [German](https://twitter.com/Alephiumde)
- [French](https://twitter.com/Alephiumfr)
- [Bulgarian](https://twitter.com/alephiumbg)

Translators are encouraged to use the following hashtag structure when they publish translated content: #Alephium\[i18n\]
You can find translation on Medium, Twitter and other channels with the following hashtags:

- Spanish: "#AlephiumES"
- Portugese: "#AlephiumPT"
- French: "#AlephiumFR"
- German: "#AlephiumDE"
- Bulgarian: "#AlephiumBG"

On its [Discord server](https://alephium.org/discord), Alephium has dedicated international channels.

On Telegram, the following community-managed groups are available:

- [German](https://t.me/alphgermanofficial)
- [Vietnamese](https://t.me/alephiumvn)
- [Russian](https://t.me/alephiumgroup_ru)
- [Portugese](https://t.me/Alephium_pt)
- [Turkish](https://t.me/alephiumturkiye)
- [Dutch](https://t.me/AlephiumgroupNL)
- [Chinese](https://t.me/alephiumCN)

### What's new?

Check Alephium's announcement channels on [Discord](https://discord.gg/AFXKJNVFKJ) and [Telegram](https://t.me/Alephium_Announcement).
We also have developments update every week on [Discord](https://alephium.org/discord), [Reddit](https://www.reddit.com/r/Alephium) & [Twitter](https://twitter.com/alephium).

### Why is the project named Alephium?

Alephium's name is derived from "Aleph", which is a term defined on Wikipedia as follows: "Aleph numbers are a sequence of numbers used to represent the cardinality of infinite sets that can be well-ordered. They were introduced by the mathematician Georg Cantor and are named after the symbol he used to denote them, the Hebrew letter aleph (ℵ)."

In fact, the Alephium logo is a stylized version of the Aleph letter.

As a nod to Ethereum's technical promises, Alephium was named using a similar naming convention.

### What is the Leman Upgrade?

Activated on March 30th, 2023, the [Leman Upgrade](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a) is the first network upgrade of the Alephium network. It is the culmination of over a year of hard work and dedication from many contributors, and it represents a significant milestone for the project. It is the first step towards the growth of the Alephium ecosystem, with multiple new features offering an enhanced developer experience to build decentralized applications.

### Where can I learn everything about Alephium in 5min?

A good overview is available on the [docs](https://docs.alephium.org/) and additionnal resources are available at the top of this FAQ.

### WHEN MOON?

1ALPH is always worth 1ALPH.
