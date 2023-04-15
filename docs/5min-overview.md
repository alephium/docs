---
sidebar_position: 0
sidebar_label: Overview
slug: /
title: Alephium Overview
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## What is Alephium?

Alephium is the first operational sharded L1 blockchain scaling and enhancing PoW & UTXO concepts. Decentralization, self-sovereignty and security meet high-performance, accessibility and energy efficiency in a dev-friendly network optimized for DeFi & smart contract applications.

---

## Why is Alephium special?

On top of an awesome team, an outstanding community and a lot of energy, here are our technical specificities:

**It scales through sharding**. Alephium is built on a novel and complete sharding algorithm called BlockFlow. It improves on the UTXO model of BTC to make it scalable, and uses DAG data structure to reach consensus between different shards. This will allow up to 10’000 Transactions Per Second (currently more than 400 TPS vs Bitcoins 7 TPS).

**It is programmable & secure**. Alephium proposes a stateful UTXO model offering layer-1 scalability and the same level of programmability as the account model implemented on ETH, whilst being more secure.

**It is less energy consuming thanks to POLW**. Proof of Less Work combines physical work and Coin economics to dynamically adjust the work required to mine new blocks. Given the same network conditions, Alephium only uses ⅛ of the energy compared to Bitcoin.

**It improves on chain structure with its own custom VM (Alphred)**. It resolves many of the critical issues of the current dApps platforms with huge improvements on security, development experience and introductions of new paradigms such as trustless P2P smart contracts transactions.

**It has its own programming language for dApps**. Ralph is similar to the Rust syntax, hence its name. It allows to build efficient and secure smart contracts easier than Solidity for example. It is specifically designed to facilitate the creation of Decentralized Finance applications!

Putting all these innovations together, Alephium delivers a highly demanded solution in the industry: a scalable blockchain improving on mature ideas from Bitcoin to deliver reliable, powerful and secure DeFi and dApps capabilities. And we’re live!

**Check out our [whitepapers][whitepaper]!**

---

## Our tokenomics

The token supply on Alephium is limited with a hardcap of 1 billion. At Mainnet Launch (11.8.21), an initial supply of 140M tokens (14% of the hardcap) was mined with the genesis block. The remaining supply of ALPH tokens will be mined over the next ~80 years. Of these 140M tokens:

80M tokens (8%) 🤝 **Pre-sales and future strategic private sales**. Vesting periods varying from 2 to 4 years.

30M tokens (3%) 💡 **Community and ecosystem development**. Locked on-chain for 4 years and vested quarterly.

30M tokens (3%) 🧑‍💻 **Treasury & Team**. Locked on-chain for 3 years, and vested quarterly.

860M tokens (86%) 🌊 **Mining Rewards**. These tokens will be used for mining rewards over the next ~80 years. They ensure the processing of transactions and the execution of smart contracts on the Alephium blockchain.

In addition, half of the transaction fees are burned with each block and Proof of Less Work enables internal mining cost through burning when the hashrate and energy consumption are significantly high.


### Total Supply and Circulating Supply

The Total Supply is calculated by adding the tokens mined at the Genesis Block (see breakdown above) and the block rewards since the Mainnet Launch.

Alephium uses the CMC method to calculate the circulating supply of ALPH. It consists of: the total number of existing ALPH from which is subtracted the balance (locked & unlocked) from the private sale investors, the treasury, ecosystem, the advisors/contractors, the project-controlled assets and all locked ALPH from other addresses.
In general, you can find our circulating supply on the front page of our [explorer](https://explorer.alephium.org/#/blocks). If you want a more in-depth explanation of the Coin Market Cap methodology, find it [here.](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-)

If you need the endpoints, find them here: [Total Supply](https://mainnet-backend.alephium.org/infos/supply/total-alph) = [Circulating Supply](https://mainnet-backend.alephium.org/infos/supply/circulating-alph) + [Reserved Supply](https://mainnet-backend.alephium.org/infos/supply/reserved-alph) + [Locked ALPH](https://mainnet-backend.alephium.org/infos/supply/locked-alph)

**Find more details in our [Tokenomics Medium article][tokenomics-medium].**

---

## If you’re a dev, start here

Find our latest [node release on GitHub][node-release].

Discover and contribute to our main projects [on GitHub][github]:

- [Full node][full-node]
- [Desktop wallet][desktop-wallet]
- [Explorer][explorer]
- [Web3 SDK][web3-sdk]
- [Mobile Wallet][mobile-wallet-repo]
- [Extension Wallet][extension-wallet-repo]
- [Wallet Connect][walletconnect-repo]
- [Bridge][wormhole-fork-repo]
- [Wiki][wiki]
- [Awesome Alephium][awesome]

### Building something on Alephium?

Start with the [Web3 SDK][web3-sdk] and if you’re building a dApp, head over [here](./dapps/Getting-Started). 
Once released, let everyone know by sending a PR to add your project to [Awesome Alephium][awesome]!
The Alephium [Brand Guide][brand-guide] might also come in handy.

[Reward & Grant Program][reward-grant]

## If you’re a miner, start here

Start by joining the dedicated [Mining channel on Discord][mining-discord].

Find our [Miner starter pack on Github][miner-starter-pack].

and the specific repos:

- https://github.com/alephium/gpu-miner
- https://github.com/alephium/fpga-miner
- https://github.com/alephium/mining-pool

Here is a video of [how to get started for solo mining][solo-mining-video].

And if you’d rather join a pool, you will find list of available pools in the [Pool Mining Guide](./mining/pool-mining-guide).

---

## Milestones & Roadmap

### Completed Milestones

**Core Platform**

02.2019 - Whitepapers publicly released
Q1.2020 - Alpha version of the core sharding protocol implemented and tested on AWS
12.2020 - Testnet Launch
Q1.2021 - Smart contract support
09.2021 - Desktop wallet & explorer public release
**08.11.2021 - Mainnet launch**
01.2022 - 1st dApp prototype
06.2022 - Beta version of contract SDK (alephium-web3)
06.2022 - Leman Network Upgrade deployed on the testnet
11.2022 - Alpha version of multi-guardians bridge on the Testnet 
Q4.2022 - NFT prototype alpha released
03.2023 - DEX prototype Released
03.2023 - Launch Browser Wallet Extension
**27.03.2023 - Leman Network Upgrade on Mainnet**
03.2023 - Schnorr signatures and cross chain interoperability
03.2023 - New  Asset Permission System and set of Virtual Machine (VM) instructions and building functions
03.2023 - Improved node APIs and SDK
03.2023 - Improved difficulty adjustment algorithm (DAA)


**Ecosystem**

08.11.2021 - 3rd party cloud mining service at Mainnet Launch
11.2021 - Joined the UTXO alliance & Bitcoin Association Switzerland
Q4.2021 - Mining ecosystem development:community pools, miners development, reference mining pool, and pool integration.
12.01.2022 - First exchange listing: Gate.io
Q3.2022 - Initiation of marketing initiatives ( sponsoring of ErgoHack, AMAs, community competitions, campaigns, Tech Talk Series, etc)
Q3.2022 - 3rd party dApps development started on Alephium
10.2022 - Dappnode Integration 
11.2022 - Flux Integration
11.2022 - Launch of Alephium Swag Shop
H2.2022 - Joint communication and marketing initiatives with UTXO Alliance members
12.2022 - Reached over 265 community contributions 


### Roadmap

The network is young and growing rapidly. We will update the roadmap to reflect the latest priorities.

**Core Platform**

- [Feature] Desktop Wallet v2.0
- [Launch] Mobile wallet (Android and iOS)
- [Launch] Alephium’s Bridge Launch on Mainnet
- [Feature & UX] Support streaming for blockchain events (tx, block, contract events)
- [Feature & Security] Typescript SDK for off-chain transaction encoding/decoding
- [Feature] P2P transaction endpoints and SDKs
- [Community] Introduce AIP for Alephium Improvement Proposals
- [Improvement] Improved web3 SDK with better DevX and more functionality
- [Feature] Multisig support in SDK and wallets
- [Security] Standard for transaction information display on wallet
- [Improvement] Improved full node’s database system for better performance
- [DevX & UX] Better error system for full node and its endpoints
- [Feature] Design and implement fast sync for full node
- [Feature] Smart contracts support in the Explorer
- [Improvement] Enhanced UX and additional features for the Browser Wallet Extension
- [Improvement] Improved NFT standard and prototype
- [Launch] Additional dApps prototypes
- [DevX] Better development experience and additional functionalities for the Ralph language
- [Improvement] Continuous improvement of the documentation 
- [Feature] Design and implement light node


**Ecosystem**

- Additional CEX listings
- DEX listing 
- Launch of 3rd party dApps (NFT, DEX, stablecoin, Alephium Name Services, oracle, etc) on Alephium
- Ledger wallet integration
- Additional bridges to other ecosystems
- Introduction videos & articles for building dApps on Alephium
- Integration with 3rd party wallets
- First Alephium Hackathon
- Grant program & Development Bounties V2
- Improve developers' onboarding experience
- Launch of the Ambassador program
- Building-up community engagement
- Additional marketing, partnership and knowledge-sharing initiatives with like-minded communities and projects.
- Website revamp


---

## Buy/sell

- [Gate.io - USDT][gateio]
- [TradeOgre - USDT][tradeogreUSDT]
- [TradeOgre - BTC][tradeogreBTC]

---

## Join the Alephium Community!

### Talk

- [Discord][discord]
- [Telegram][telegram]
- [Reddit][reddit]

### Connect 

- [Twitter][twitter]
- [LinkedIn][linkedin]
- [Facebook][facebook]

### Read, setup, explore, contribute

- [Website][website]
- [Whitepapers][whitepaper]
- [Medium][medium]
- [GitHub][github]

---

## Non-official Content & Communities

:::info
Not moderated, endorsed or managed by Alephium
:::

You will find the complete list of internationalized channel [here](./misc/Internationalization-and-Localization)

### Youtube

- [Youtube 🌎](https://www.youtube.com/playlist?list=PL8q8n0BHJS1Nd0nxGfsNJzNnAeHoXhezz)
- [Youtube 🇧🇷](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PiisJCIWqeOsd20dsMtJIg)
- [Youtube 🇨🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1O931vGMfFb0Qx3gFKhd4bD)
- [Youtube 🇩🇪](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OtYdw8lKeke6nNSSfASzZq)
- [Youtube 🇮🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PBoCF0L2TfeWYC8b7DeTAn)
- [Youtube 🇮🇩](https://www.youtube.com/playlist?list=PL8q8n0BHJS1MEOKbcmicEO0uTuz67D5Fz)
- [Youtube 🇮🇹](https://www.youtube.com/playlist?list=PL8q8n0BHJS1O749KEPqfnwlr-RDlqJ20U)
- [Youtube 🇯🇵](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PS9PGIYJd8pjK6fw8AKZO4)
- [Youtube 🇲🇾](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OkFwspCxIVfFS2sVeGEC4K)
- [Youtube 🇷🇺](https://www.youtube.com/playlist?list=PL8q8n0BHJS1P4-22OaT_w3vwNZVwiQt6s)
- [Youtube 🇹🇭](https://www.youtube.com/playlist?list=PL8q8n0BHJS1MhpbWV3PI4xoXhjB06az_M)
- [Youtube 🇹🇷](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OJIUOh0yANAEKdSUG8DdDG)
- [Youtube 🇻🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PJq68hRBfw3xeXGlfVDWVr)

---

## Our partners

- [Bitcoin Association Switzerland](https://medium.com/@alephium/alephium-becomes-a-member-of-bitcoin-association-switzerland-2293fec16fc9)
- [Cetacean Capital](https://cetacean.capital/)
- [Crypto Valley Association](https://cryptovalley.swiss/)
- [Dappnode](https://dappnode.io)
- [Ergo](https://ergoplatform.org/)
- [Flux Labs](https://runonflux.io/fluxlabs.html)
- [Hodling SA](https://www.hodling.ch/)
- [UTXO Alliance](https://utxo-alliance.org/)


[whitepaper]: https://github.com/alephium/white-paper
[tokenomics-medium]: https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c
[website]: https://alephium.org/
[discord]: https://alephium.org/discord
[telegram]: https://t.me/alephiumgroup
[twitter]: https://twitter.com/alephium
[linkedin]: https://www.linkedin.com/company/alephium
[facebook]: https://www.facebook.com/alephium
[medium]: https://medium.com/@alephium
[github]: https://github.com/alephium
[gateio]: https://www.gate.io/fr/trade/ALPH_USDT
[tradeogreBTC]: https://tradeogre.com/exchange/BTC-ALPH
[tradeogreUSDT]: https://tradeogre.com/exchange/USDT-ALPH
[utxo-alliance]: https://utxo-alliance.org/
[bas]: https://medium.com/@alephium/alephium-becomes-a-member-of-bitcoin-association-switzerland-2293fec16fc9
[market-across]: https://marketacross.com/
[node-release]: https://github.com/alephium/alephium/releases/latest/
[full-node]: https://github.com/alephium/alephium
[desktop-wallet]: https://github.com/alephium/desktop-wallet
[explorer]: https://github.com/alephium/explorer
[web3-sdk]: https://github.com/alephium/alephium-web3
[wiki]: https://github.com/alephium/wiki
[awesome]: https://github.com/alephium/awesome-alephium
[mining-discord]: https://alephium.org/discord
[miner-starter-pack]: https://github.com/alephium/alephium-miner-getting-started
[solo-mining-video]: https://www.youtube.com/watch?v=hdPH6inWjhc
[reddit]: https://www.reddit.com/r/Alephium/
[mobile-wallet-repo]: https://github.com/alephium/mobile-wallet
[extension-wallet-repo]: https://github.com/alephium/extension-wallet
[walletconnect-repo]: https://github.com/alephium/walletconnect
[wormhole-fork-repo]: https://github.com/alephium/wormhole-fork
[brand-guide]: https://github.com/alephium/alephium-brand-guide
[reward-grant]: https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md
