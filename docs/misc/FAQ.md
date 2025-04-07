---
sidebar_position: 40
slug: /frequently-asked-questions
sidebar_label: FAQ
title: Frequently Asked Questions
---

:::info
📚 Learn everything about Alephium in this [5min overview](/).
:::

Before diving in deeper, we recommend that you check the following resources as they provide useful information about Alephium:

- [Official Website](https://alephium.org)
- [Official Twitter][alephium-twitter-link]
- [Official Discord][alephium-discord-link]
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

You can find the circulating supply on Alephium [Explorer][explorer-link] or by using the [circulating ALPH endpoint](https://backend.mainnet.alephium.org/infos/supply/circulating-alph).

### How is the circulating supply calculated?

It is calculated according to [CoinMarketCap's methodology](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-).

The circulating supply is equal to number existing ALPH minus:

- The full balance (locked & unlocked) of private sale participants, project and team-controlled addresses. According to CMC: _"tokens are generally only counted as circulating after they leave the original reserve wallet (i.e. outbound transfers are more representative of an intent to bring the coin into circulation rather than a mere unlock)"_.
- All locked ALPH from other addresses.

### How can I check wallets balances and which are the top holding addresses?

To check the balance of a specific wallet, the [Explorer][explorer-link] is your go-to.
Community members have created [Alph Richlist](https://alph-richlist.vercel.app/) that lists the top holding addresses, alongside [Alph.Pro](https://alph.pro/), a comprehensive website/tool that offers data on all things DeFi on Alephium, including NFTs, the Richlist, Liquidity pools and more.

In addition, you can find the wrapped ALPH/erc20 holders at [etherscan.io](https://etherscan.io/token/0x590F820444fA3638e022776752c5eEF34E2F89A6#balances)

### What is the minimum Transaction Fee?

Currently, the minimum transaction fee is set at `0.002` ALPH to prevent network DoS attacks. In the future, this minimum fee can be lowered, with the lowest possible minimum transaction fee being `0.00000000000001` ALPH on Alephium. The exact fee charged depends on the number of inputs (UTXOs) and signers involved in the transaction.

### How many Transactions Per Second (TPS) are possible on Alephium?

Alephium Mainnet can currently support over 400 TPS with 16 shards. It can scale up over 10,000+ TPS by increasing the number of shards as necessary.
Read more about [the concept of TPS](https://medium.com/@alephium/transactions-per-second-tps-f13217a49e39).

### What is Alephium's smallest denomination?

Alephium allows up to 18 decimals and its smallest denomination is called Phi. Phi is equivalent to `0.000000000000000001` ALPH, or `10^-18` ALPH, while 1 ALPH equals `10^18` Phi.

## dApps

### Is there a DEX on Alephium?

Alephium has a [DEX prototype](https://alephium.github.io/alephium-dex/#/swap) running on Testnet. Learn more about it in [the DEX prototype article](https://medium.com/@alephium/dex-prototype-live-on-testnet-bac5e7d095ce).

The [DEX contracts](https://github.com/alephium/alephium-dex/tree/master/contracts) have been thoroughly tested by the core developers, making them reliable and efficient. They can easily be forked and used for projects.

Alephium’s DeFi is continuously expanding and you can check all deployed DEXes on [Coingecko][coingecko-alph-link] and on [Alph.land][alph-land-link].

### Are there any dApps on Alephium?

Most of what has been built on Alephium so far is listed on the [Awesome Alephium repository](https://github.com/alephium/awesome-alephium). To add your contribution, submit a Pull Request!

There’s also [Alph.land][alph-land-link], a community-made platform that contains a list of most dApps deployed on the Mainnet.

Alephium is still at a very early stage and the infrastructure (including a [bridge](https://github.com/alephium/wormhole-fork)) and documentation to ease the development of dApps is continuously being worked on. Alephium has a number of [well-maintained prototypes](/dapps/ecosystem#prototypes) that can be used as a basis or inspiration for your project.

If you want to build a dApp, check out our [dApps Getting Started guide](/dapps/getting-started).

### Why can the dApp only connect to one of my addresses?

Alephium operates as a sharded blockchain, where addresses and contract states are organized into several groups. When it comes to dApps, they can be deployed to any of these groups. However, there's a catch — dApps can only be used by addresses in the same group.

So, when you connect to a dApp, it will specifically ask to connect with addresses that belong to the same group as the dApp itself. This grouping system ensures everything runs smoothly within Alephium's sharded structure.

Note that this is only required when using dApps. Normal transfers have similar user experience as non-sharded blockchains. The core team is committed to improve the assets management across different groups to make it more friendly for dApp users.

## Development

### Where is the roadmap?

You will find the roadmap on the [website](https://alephium.org/#next) and on the [docs](/#milestones--roadmap). You can also follow the weekly development updates on [Discord][alephium-discord-link], [Twitter][alephium-twitter-link] or [Reddit](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1).

### Where can I monitor the status of Alephium maintained public service?

You can monitor Alephium's public service for:

- the mainnet on https://status.mainnet.alephium.org
- the testnet on https://status.testnet.alephium.org

### Where can I query an API?

In order to query an API you need to be running a full node ([instructions](/full-node/getting-started)).
Alephium uses OpenAPI to interact with the full node. You can directly open your local Swagger UI through `127.0.0.1:12973/docs` once your full node is running.
Alternatively, you can use any OpenAPI client to import the [openapi.json](https://raw.githubusercontent.com/alephium/alephium/master/api/src/main/resources/openapi.json) file from Alephium's repository.

### Do you have a Grant, Reward or Bountie Program?

Alephium offers a [Grants and Rewards program](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md) where your contribution, regardless of size, may be eligible for a reward.

### What is being built on Alephium?

Most of what has been built on Alephium so far is listed on the [Awesome Alephium repository](https://github.com/alephium/awesome-alephium) & community ran platform Alph.Land[alph-land-link]. If you'd like to showcase what you've built, submit a Pull Request to add it to the list.

## Full node

### Is there a reward for running a fullnode?

Alephium uses a Proof of (Less) Work consensus mechanism, which means there is no native monetary reward for running a full node, unlike Proof of Stake networks. However, running your own node offers other benefits such as decentralization, independent verification, privacy, economic self-sovereignty & potentially less fees if you’re a miner as you wouldn’t be paying a percentage to a mining pool. The phrase _"not your node, not your network"_ highlights the importance of running your own node, as relying on a third party node for blockchain interaction means trusting that third party. While connecting to a third party node is generally safe, some individuals may prefer to maintain their own level of trust and privacy.

### What do I need to run a full node?

Alephium's full node is lightweight and can run on most devices, including Raspberry-Pi or phones. To set-up and run your own node, please follow the [Full-node Getting Started guide](/full-node/getting-started/).

### Is it possible to stake on Alephium?

Alephium does not offer native staking on its blockchain, as it does not operate on a PoS consensus mechanism. However, DeFi liquidity pools on DEXs within Alephium’s Mainnet may provide staking opportunities.

## Listings & Exchanges

### What is your token ticker?

The Alephium token ticker is [ALPH](https://medium.com/@alephium/introducing-alph-8381dbd9f88d).

### How long does it take for deposits to show up on exchanges?

Exchanges usually require a higher number of confirmation for PoW chains to ensure sufficient security. Currently, most exchanges request between 30 to 110 confirmations for Alephium which is between 30 minutes and an hour.

### What exchanges is Alephium currently listed on?

You can find the list of available Alephium markets on [CoinMarketCap](https://coinmarketcap.com/currencies/alephium/markets/) or [CoinGecko][coingecko-alph-link].

## Mining

### What is the Mining Reward?

There is a [detailed article explaining Alephium's block rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33).

### What is the reason for holding the block reward for 500 minutes, given the block time is only 16 seconds?

The 500-minute lock is designed to prevent re-org attacks, much like Bitcoin's ~1000 minute lock for mined rewards.

### Why do I have 4 mining addresses?

Alephium is a sharded blockchain with `G` groups and `G*G` chains. Due to this design, each group requires its own mining address.

Currently, Alephium has 4 groups and 16 chains on its mainnet. Therefore, 4 mining addresses are needed, one for each group.

### How many coins are mined per day?

To know how many coins are mined per day, you can use the formula below. As the block reward changes dynamically with each block, the formula will only give you an approximation.

3'600 seconds / 16 seconds (Alephium block time) == 225 blocks per hour, per shard.

225 x 16 shards == 3'600 blocks total per hour.

3'600 x 24 hours == 86'400 blocks per day.

86'400 x  ALPH reward per block ~= number of ALPH mined per day.

At the time this entry was last updated the average block reward was: `0.4952` ALPH which results in approximately `42,785.28` ALPH mined per day.

### Is Alephium ASIC resistant?

No, Alephium is designed to be ASIC friendly, just like Bitcoin. Maintaining ASIC resistance can be incredibly challenging, if not impossible, as evidenced by other chains that have had to fork and change their mining algorithms. Alephium decided to prioritize a secure and stable network over resistance to specialized hardware. When the time comes, the use of ASICs on Alephium can support performance and miner fidelity, as investing in chain-specific hardware makes miners more likely to stay committed, reducing the risk of sudden shifts in mining power.

### Which miners can I use to mine ALPH?

Below is a list of known Alephium miners. Please note the list may be incomplete as it is difficult to keep track of new miners coming out, feel free to submit a Pull Request to add to the list.

- [BzMiner](https://www.bzminer.com/guides/how-to-mine-alephium/)
- [lolMiner](https://lolminer.site) ([lolMiner releases](https://github.com/Lolliedieb/lolMiner-releases))
- [SBRMINER](https://www.srbminer.com) ([SBRMINER releases](https://github.com/doktor83/SRBMiner-Multi/releases))
- [T-Rex](https://trex-miner.com) ([T-Rex GitHub](https://github.com/trexminer/T-Rex))

You can also use [Alephium's gpu-miner](https://github.com/alephium/gpu-miner) but it is not as efficient as the others in this list.

## Tech

### Why another L1 blockchain? Isn't there too many already?

The blockchain’s narrative evolved from disruptive technology to a possible mainstream solution for several sectors. Due to this paradigm shift, most projects are giving away the core values of decentralization, self-sovereignty, and security in pursuing scalability to meet the performance requirements needed for such applications. Alephium delivers the same result without compromising on those fundamentals, and it is uniquely placed to ignite the industry’s interest in (s)UTXO and Po(L)W and spearhead the movement of UTXO-based DeFi and smart contract applications.

In addition, there were a few key technological motivations for building Alephium:

1. Horizontal scaling through sharding
2. Many of the new Layer 1 (L1) blockchains are resource intensive, making it costly to run a full node which in turn can lead to a lack of decentralization and disintermediation in the long term. Alephium's approach is similar to Bitcoin's where anyone can run a full node and verify network. _"Don't trust, verify."_
3. Many of the new L1 blockchains use the account model or are EVM compatible and inherits its weaknesses. Alephium created a new Virtual Machine (VM) built on the Unspent Transaction Output (UTXO) model to provide a new programming paradigm with higher security level for decentralized applications (dApps).
4. Most new L1s use Proof of Stake (PoS) consensus mechanism. Alephium chose to build on the Proof of Work (PoW) as a simpler, more consistent, and more robust consensus mechanism for achieving decentralization.

### Does Alephium support smart contracts?

Yes, Alephium supports smart contracts. It was specifically designed to be a scalable and secure network for smart contracts and decentralized applications.

### Why is the blocktime 16 seconds? Is there a particular reason for that?

Finality on Proof-of-Work (PoW) blockchains is based on the amount of work accumulated in new blocks, rather than the block time. This means that if a transaction needs N blocks with block time T to be confirmed, then it will need 2N blocks to be confirmed if the block time is halved to T/2, which would result in the same amount of time for confirmation.

While shorter block times provide a better user experience, they also come with some drawbacks:

- More orphan blocks are produced. The rate of uncle blocks on PoW Ethereum is 10% or higher, while Bitcoin's orphan rate is less than 1%.
- Increased overhead in the P2P network. This problem is more severe for PoS blockchains, as reports suggest up to 90% of transactions on Solana are validator messages.

To ensure a lightweight and efficient chain in the long term, these types of overheads should be avoided. Therefore, Alephium now has a block time of 16 seconds, which strikes a balance between Bitcoin and newer blockchains with shorter block times.

For those who prioritize block times and instant finality, Layer 2 solutions can be built on top of Alephium. Ultimately, a lightweight, scalable, and efficient Layer 1 is essential for the cryptocurrency space.

### How long does it take for a transaction to go through?

1 second should be enough to see the incoming transaction in the mempool. Alephium's block time is currently 16 seconds. Economic finality depends on the amount and your risk management. For a small transaction, the mempool is probably enough, and 1-4 blocks are enough for most transactions. However, if you are an exchange and dealing with large amounts, you will probably wait for a few dozen to hundreds of blocks.

You can read more about the concept of block time and time to finality in these articles:

- [Block time & block size](https://medium.com/@alephium/block-time-and-block-size-16e37292444f)
- [Time to finality](https://medium.com/@alephium/time-to-finality-17d64eeffd25)

### Why did you choose PoLW, not PoS?

Blockchain technology is still in its early stages and a common question is what blockchain infrastructure is needed for the next 10 years to support dApps, including DeFi.

Alephium was built with the belief that a scalable blockchain with high throughput and low transaction fees, along with a high level of programmability like Ethereum and the reliability and security of Bitcoin, is necessary. The goal was to create a "scalable Bitcoin with a reliable smart contract solution".

According to the Lindy effect, despite recent successes with PoS, the Bitcoin model and sharding with PoW is still the most robust and decentralized way to build a scalable blockchain. Specifically:

- PoW is simple and robust and easier to design sharding algorithms with
- PoS hasn't been time-tested yet and it remains to be seen how it will evolve with Ethereum's PoS switch
- PoS tends to be more centralized and vulnerable to censorship
- PoS tends to reduce trustlessness as the cost of running a node can be significantly higher
- PoS is more vulnerable to some DeFi attacks like MEV

### What are stateful UTXOs and how are they different from the other UTXOs models?

There are two types of states in blockchain technology: mutable state (as seen in Ethereum) and immutable state (such as UTXO or eUTXO). Mutable state is more flexible and expressive, as evidenced by the vibrant ecosystem of Ethereum.However, the UTXO model provides inherent security advantages.

[Alephium's stateful UTXO model](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) combines the advantages of both. It supports mutable states, like those found in Ethereum, for smart contracts while leveraging the security benefits of the UTXO model for assets.

### Is Alephium prone to the same concurrency issue as the classic and extended UTXO model which can result in low TPS?

No, Alephium does not have this limitation. Alephium's stateful UTXO model combines the classic UTXO model with the account model and supports mutable states. This ensures that dApps can access mutable contract states in parallel, eliminating any possibility of a concurrency issue.

Alephium Mainnet can scale up over 10,000+ TPS by increasing the number of shards as necessary.

### Why not have 1M shards?

Networking is the main bottleneck for increasing the number of shards. Each node needs to maintain `2G - 1` other shards for consistency. If the average network bandwidth is sufficient, `G` can be set as high as 32. While there is also some computation overhead, networking is the primary bottleneck.

### What is the process to increase the number of shards on Alephium?

An upgrade to the network is required to increase the number of shards. Such upgrade would occur when the existing number of shards is insufficient to handle the network load.

### Can a sharded network, specifically Alephium, be attacked with less than 51% hashrate? For example by compromising only one group or shard?

Security concerns can arise in sharded blockchains if they are not designed properly, as Vitalik explained in his "1% attack" terminology. Ethereum's sharding approach addressed this issue with validator shuffling.

Alephium, on the other hand, addressed it with its Blockflow algorithm. Mining work across different shards is accumulated due to block dependencies. An attacker trying to reorganize one shard would also need to reorganize all of its dependencies. One intuitive and simplified way to view this is that all of the shards merge-mine with each other.

### Is there cross shard atomicity for tokens and smart contracts on Alephium?

On Alephium, tokens are atomically composable across shards, which means that it is possible to transfer tokens from one shard to another shard atomically in one transaction. However, while smart contracts have token and state components in Alephium's stateful UTXO model, only tokens have cross-shard atomicity; states are sharded and thus not composable. This design decision reflects Alephium's token-centric approach and allows for a simpler state design resembling a partitioned database. This tradeoff is more favorable than the current Layer 2 trends that lack token atomicity, and there is currently no practical solution for complete state composability.

### Are flash loans possible on Alephium?

No, flash loans are not available by design on [Alephium's virtual machine, Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025).

### How are Alephium addresses generated? Is there a way to distinguish between a Bitcoin legacy address and an Alephium address?

Alephium uses the same curve as Bitcoin (secp256k1 curve) to generate addresses, but a different hashing algorithm (blake2b). However, Alephium addresses are typically longer than Bitcoin addresses since it uses a 32-byte hash instead of a 20-byte hash.

### Can I use my mainnet address on the testnet?

Alephium addresses are self-generated by an algorithm and are network-agnostic (testnet, mainnet, devnet, etc). It is not necessary to be connected to a network node (or even the internet) to create a wallet and addresses. Essentially, every Alephium address exists in all networks, even those that haven't been generated/discovered yet.

In earlier crypto-networks, transactions didn't contain any network information and could be "replayed" on other networks. Therefore, it was not recommended to use the same addresses on different networks. Alephium includes network ID in its transactions, so it is perfectly acceptable to use the same address on various networks.
When you link your wallet to a network, such as testnet, you can request a testnet node to check your address balance. If you change your wallet's network settings to connect to mainnet, a mainnet node will display your address balance on the mainnet network. Thus, each address has a balance in every network, and you can view the balance of your address on that specific network by connecting to it.

### Why did Alephium choose to build its own virtual machine and smart contract language?

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

In theory, yes. Predicting the future of technologies beyond 10, let alone 80 years is difficult. For blockchains like Alephium, it is not unusual for policies, such as emission schedule, to change as technologies evolve. If the consensus agrees to a change in the emission schedule, the change will happen.

### How is the maximum supply cap implemented?

The maximum supply cap of 1 billion ALPH is an estimate. The protocol implements a cap on emissions based on a timestamp of approximately 80 years. This is because computing the sum of emissions for a sharded chain within the protocol is computationally expensive. The emission rate is determined by the time and varies depending on the hash rate.
It's worth noting that the 1 billion cap was estimated before the implementation of the improved [DAA](https://github.com/alephium/alephium/blob/master/docs/proposals/lemanDAA.md). With the current code, the actual cap on emission and maximum supply of ALPH is expected to be less than 1 billion in 80 years, even without taking into account the PoLW mechanism's fee burning.

## Wallet

### What type of wallet does Alephium offer?

Alephium currently offers:

- a [desktop wallet](https://github.com/alephium/alephium-frontend/releases/latest)
- a [web extension wallet](https://github.com/alephium/extension-wallet) available on [Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)
- a mobile wallet:
  - [Android](https://play.google.com/store/apps/details?id=org.alephium.wallet)
  - [Apple](https://apps.apple.com/us/app/alephium-wallet/id6469043072)

In addition to the official wallets, there are a number of third-party wallets available.

### Is it planned for Alephium to be supported on hardware wallets?

Offering hardware wallet support is an important priority for Alephium. Several HW integrations are available:

* [Ledger](https://www.ledger.com/)
* [OneKey](https://onekey.so/)
* [Safepal](https://safepal.com/)
* [Tangem](https://tangem.com/)
* [Goldshell Wallet](https://wallet.goldshell.com/)

### When importing my seed into the desktop wallet, is there a way to import all generated addresses with it?

After importing your wallet using the recovery phrase, the wallet can now scan the connected network to discover all the active addresses you have used in the past. An active address is one that has at least one transaction. For manual address discovery, go to the Addresses section and click on the wrench icon next to the "+ New address" button. After clicking on the “Search” button in the “Discover active addresses” option the Desktop wallet will show all active addresses linked to this recovery phrase.

### What analytics does the desktop wallet collect?

Alephium takes concerns about privacy and user experience seriously. Enabling analytics can actually help improve user experience without compromising your privacy. The information collected by the Desktop wallet is completely anonymous. Upon the first launch of your wallet, a unique ID is generated (for example, `vCJGCsDPrZ8WJaIKZMWjU`) which is the only identification information required. IPs or any other [personal data](https://posthog.com/blog/what-is-personal-data-pii) are not collected. Only button clicks, number of wallets, addresses, contacts, and wallet preferences are recorded. This information helps identify useful features and areas for improvement. Alephium's open-source code base allows users to verify which events are captured by [searching for the posthog?.capture keyword](https://github.com/search?q=repo%3Aalephium%2Fdesktop-wallet+posthog?.capture&type=code).

### Why is there an additional 0.001 ALPH per token added to my transaction when I try to send tokens?

The `0.001` ALPH is the minimal requirement per UTXO to avoid UTXO spamming. This amount is not consumed by the network and it will arrive at the destination address, same as the tokens.

### Why is it important to back-up your secret recovery phrase?

Backing up your secret recovery phrase is crucial because it acts as the master key to your wallet. If you lose access to your wallet (e.g., due to device loss, malfunction, or app deletion), the secret recovery phrase is the only way to restore and access your funds.
Without it, any assets stored in the wallet could be permanently lost. Treat it with utmost care, and store it securely and privately.

## Miscellaneous

### How can I find translated content?

You can find a lot of international and translated content on Medium, Twitter and Youtube.

On Twitter, the following community accounts translate Alephium tweets:

- [German](https://twitter.com/Alephiumde)
- [French](https://twitter.com/Alephiumfr)
- [Bulgarian](https://twitter.com/alephiumbg)
- [Indonesian](https://twitter.com/Alephium_id)
- [Greek](https://x.com/AlephiumGreece)
- [Arabic](https://x.com/AlephiumArabia)
- [Italian](https://x.com/Alephium_it)

Translators are encouraged to use the following hashtag structure when they publish translated content: #Alephium[i18n] You can find translation on Medium, Twitter and other channels with the following hashtags:

- Spanish: "#AlephiumES"
- Portuguese: "#AlephiumPT"
- French: "#AlephiumFR"
- German: "#AlephiumDE"
- Bulgarian: "#AlephiumBG"
- Arabic: “#AlephiumAR”
- Vietnamese: “#AlephiumVN”
- Italian: “#AlephiumIT”
- Turkish: “#AlephiumTR”
- Greek: “#AlephiumGR”
- Chinese: “#AlephiumCN”
- Polish: “#AlephiumPL”
- Indonesian: “#AlephiumID”
- Russian: “#AlephiumRU”
- Dutch: “#AlephiumNL”

On its [Discord server][alephium-discord-link], Alephium has dedicated international channels.

On Telegram, the following community-managed groups are available:

- [German](https://t.me/alphgermanofficial)
- [Vietnamese](https://t.me/alephiumvn)
- [Russian](https://t.me/alephiumgroup_ru)
- [Portuguese](https://t.me/Alephium_pt)
- [Turkish](https://t.me/AlephiumTurkey)
- [Dutch](https://t.me/AlephiumgroupNL)
- [Chinese](https://t.me/alephiumCN)
- [Spanish](https://t.me/minerosAlephium)
- [Indonesian](https://t.me/AlephiumID)
- [French](https://t.me/Alephiumfr)
- [Polish](https://t.me/alephiumPL)
- [Greek](https://t.me/AlephiumGreece)
- [Indian](https://t.me/AlephiumIndia)
- [Italian](https://t.me/Alephium_it)
- [Arabic](https://t.me/AlephiumArabia)

### What's new?

Check Alephium's announcement channels on [Discord][alephium-discord-link] and [Telegram](https://t.me/Alephium_Announcement). We also have developments update every week on [Discord][alephium-discord-link], [Reddit](https://www.reddit.com/r/Alephium) & [Twitter][alephium-twitter-link].

### Why is the project named Alephium?

Alephium's name is derived from "Aleph", which is a term defined on Wikipedia as follows: "Aleph numbers are a sequence of numbers used to represent the cardinality of infinite sets that can be well-ordered. They were introduced by the mathematician Georg Cantor and are named after the symbol he used to denote them, the Hebrew letter aleph (ℵ)."

In fact, the Alephium logo is a stylized version of the Aleph letter.

As a nod to Ethereum's technical promises, Alephium was named using a similar naming convention.

Learn more [here](https://medium.com/@alephium/introducing-alph-8381dbd9f88d).

### What is the Leman Upgrade?

Activated on March 30th, 2023, the [Leman Upgrade](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a) is the first network upgrade of the Alephium network. It is the culmination of over a year of hard work and dedication from many contributors, and it represents a significant milestone for the project. It is the first step towards the growth of the Alephium ecosystem, with multiple new features offering an enhanced developer experience to build decentralized applications.

### Where can I learn everything about Alephium in 5min?

A good overview is available on the [docs](/) and additional resources are available at the top of this FAQ.

### What is Alephium’s APS?

Alephium’s Asset Permission System (APS) is a flexible and secure solution for managing assets on the Alephium blockchain, offering a solution to eliminate Ethereum's token approval risk.

APS brings security as it eliminates EVM’s token approval risk by allowing users and contracts to approve tokens on demand and in the same transaction.

APS offers protection from attacks such as Reentrancy attack, Bitflip attack, SmartContract Draining, Malicious NFTs & more, rendering them to be completely impossible on Alephium.

APS enhances user experience when signing, APS with UTXO allows predefined approvals and asset transfers in a single TxScript-based transaction, enhancing both efficiency and security for the user.

Read more about APS: [DOCS](/dapps/concepts/asset-permission-system/) , [ARTICLE](https://medium.com/@alephium/alephiums-aps-eliminating-evm-token-approval-risks-5407e7e70a33)

### How do I Revoke a Smart Contract on Alephium?

Thanks to Alephium APS, there's no need to manually revoke your smart contract or perform any user-side smart contract maintenance.

### I’ve imported my wallet using the same Secret Recovery Phrase, why is my balance missing?

If you have your Secret Recovery Phrase, there's no need to worry!

Ensure the following:

1. Your wallet is up to date.
2. You are connected to Mainnet, not "testnet" or "devnet."
3. You’re using the same Secret Recovery Phrase as the intended wallet.
4. You can alternatively scan it on the [Explorer][explorer-link] to verify that your assets are indeed on the address you’re checking.

If your wallet is up to date but you still can’t find your balance, your previous balance might be in a different group than the ones currently loaded in your wallet.

You can try the following steps based on the platform you’re having issues with:

_Desktop:_

1. Refresh your wallet. Simply click on the “Refresh Data” button top right.
2. On the Main Page overview:
3. Go to "Addresses" or click "See More" in the "Your Addresses" window.
4. Click the wrench icon for "Advanced Operations"
5. Select "Discover Active Addresses" by clicking “Search”.

_Mobile:_

1. Swipe down from the Main Page overview to Refresh.
2. Click on the Gear icon on top right, to access “Settings”.
3. In Settings, scroll down to “Wallet” category, and click on “Scan for active addresses”.
4. Click “Start Scanning”.

_Browser Extension:_

1. Click on the Gear icon on top right, to access “Settings”.
2. Scroll down & click on “Developer settings”.
3. Click on “Discover Accounts”.

If your wallets are up-to-date & synced you should always be able to see your balances update the second you refresh.

### When connecting to a dApp, my wallet says "There are no accounts on Mainnet for group 0. Please generate a new account first." Is this normal?

Yes, that is normal. Depending on the dApp you are interacting with, you might need to create an address in a different "group" than the one you currently have.

For example, most dApps on Alephium, including the DeFi platform Ayin, require a "group 0" address to connect. Therefore, if your assets are in group 1 or group 2, you might need to create a new address in group 0 and move your assets there to interact with the dApp.

This can all be done under the same secret recovery phrase. To create a new group address, follow the steps below:

_Browser Extension:_

1. Connect to a dApp and select “Browser Extension”.
2. If you’ve got a group 0 already, it will ask you to connect it.
3. If not, your Wallet Extension would tell you _“There are no accounts on Mainnet for group 0. Please generate a new account first.”_
4. Simply click on “Create new Alephium Account”.
5. Click “Connect”.

_Alternatively:_

1. Click on your account TOP LEFT of your Extension Wallet.
2. Click on the “+” icon TOP RIGHT.
3. In “Add a new account” menu, change “Group: any” to the group you want (i.e. Group 0).
4. Click on “Create new Alephium account”.

_Desktop & Mobile:_

1. Click on “Addresses”.
2. Click on “+ New address”.
3. Turn on “Advanced options”.
4. Select your address group as needed.
5. Click on “Generate”.

### How do I use WalletConnect?

1. Connect to any dApp by using “WalletConnect”.
2. This will create a QR Code, which you can also copy to clipboard.
3. You may Scan your QR code on Mobile, or copy to clipboard on Desktop.

_Desktop:_

- Click on the “WalletConnect” icon on top right.
- Paste WalletConnect URL copied from the dApp & click “Connect”.

_Mobile_:

- Click on the Gear icon on top right, to access “Settings”.
- Under “Experimental Features”, turn on WalletConnect.
- You should now see the WalletConnect icon in the wallet overview.
- Scan QR code or Paste a WalletConnect URL to proceed.

Please note that the mobile WalletConnect feature is experimental, use it at your own risk.

### What does “Export Current Wallet” do?

In the Desktop Wallet settings, the 'Export current wallet' option allows you to export your wallet via a QR code, which you can then scan with your Mobile wallet to import it.

This is useful for those who’d like to quickly import their wallet from Desktop to Mobile without having to type their secret recovery phrase.

How to use:

1. On Desktop, go to “Settings” by clicking the gear Icon at bottom left of the screen.
2. Click on “Wallets” & scroll down. _(Notice: Treat it with the same care as your secret recovery phrase; ensure no one else is watching.)_
3. Click on Export current wallet.
4. This will create a QR code for you to scan on your mobile device.
5. Install Alephium wallet app on Mobile using the official links only.
6. Click on “Import Wallet”.
7. Give your wallet a name & click next.
8. Select “Scan the QR code”
9. Scan the code shown on your screen.
10. Enter the Password used to lock your Desktop wallet as verification.

Congratulations, you’ve now safely exported your wallet from Desktop to Mobile.

### Why am I seeing API Errors telling me that I don’t have enough ALPH even though I do?

There could be a few reasons for this error, from desynchronized wallet/browser to UTXO fragmentation. Here are some possible solutions you can try:

- Refresh your browser if you’re getting this error in a dApp.
- Disconnect & re-connect your wallet.
- Consolidate UTXO, follow [this guide here](/wallet/desktop-wallet/advanced-features/#1-utxo-consolidation).

### What makes PoLW special?

Similar to Proof-of-Work for Bitcoin, or Proof-of-Stake for Ethereum (post-merge), PoLW is Alephium’s consensus algorithm.

PoLW reduces energy consumption by over 87% compared to traditional PoW systems, offering great energy optimization without compromising security or decentralization.

Learn more about PoLW & how it achieves that here: [DOCS](/glossary/#proof-of-less-work-or-polw), “Tech Talk” [Article](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301).

### What is the Rhône Upgrade?

Rhône, Alephium's second network upgrade, was activated on _June 12 2024_. This upgrade introduced several significant features, including:

- Reduced blocktime from 64 seconds to 16 seconds.
- Gasless transactions (user side).
- Reduced minimum storage fee from 1 to 0.1 ALPH.
- Developer-friendly reentrancy protection tweaks.
- PoLW address type.
- Mapping and APS enhancement.

And that's not all! To learn more, read the following threads: Twitter/X [link ](https://x.com/alephium/status/1795460039659884898), Medium Article [link](https://medium.com/@alephium/rh%C3%B4ne-network-upgrade-activated-cbeb298585fe).

### Why do some blocks or transactions appear with a 2009 timestamp?

The genesis block of Alephium is timestamped **January 3rd, 2009**, the same date as Bitcoin’s genesis block. This is an intentional and symbolic design choice made as both a **tribute** and an **homage** to the launch of Bitcoin and the beginning of decentralized blockchain technology.

Alephium’s actual mainnet launch took place on **November 8, 2021**. The 2009 timestamp applies only to the genesis block and does not affect consensus, block validation, or any network operations.

This behavior is defined in the source code:

```scala
val GenesisHeight: Int          = 0
val GenesisWeight: Weight       = Weight.zero
val GenesisTimestamp: TimeStamp = TimeStamp.unsafe(1231006505000L) // BTC genesis timestamp
val LaunchTimestamp: TimeStamp  = TimeStamp.unsafe(1636379973000L) // 2021-11-08T11:20:06+00:00
```

📄 [View on GitHub](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/ALPH.scala#L32-L33)


### WHEN MOON?

1ALPH is always worth 1ALPH.

[explorer-link]: https://explorer.alephium.org/
[alph-land-link]: https://www.alph.land/
[coingecko-alph-link]: https://www.coingecko.com/en/coins/alephium
[alephium-twitter-link]: https://twitter.com/alephium
[alephium-discord-link]: https://alephium.org/discord
