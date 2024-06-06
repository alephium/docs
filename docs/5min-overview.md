---
sidebar_position: 0
sidebar_label: Overview
slug: /
title: Alephium Overview
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Quickstart
import {
  LocalLanguageRegular,
  PhoneDesktopRegular,
  RocketRegular,
  WalletRegular,
  ShapeIntersectRegular,
  BatterySaverRegular
} from '@fluentui/react-icons';

<CardSection
  id="Quickstart"
  description="Welcome to Alephium, the first operational sharded blockchain that brings scalability and smart contracts to Bitcoin's proven core technologies, delivering enhanced performance and improved energy efficiency."
>
  <Card
    title="Build dApps"
    icon={<PhoneDesktopRegular />}
    to="/dapps"
    description="Begin building dApps on Alephium using the Ralph programming language and SDK."
  />
  <Card
    title="Learn Ralph"
    icon={<LocalLanguageRegular />}
    to="/ralph/getting-started"
    description="Explore Ralph, the smart contract programming language for Alephium, focused on security, simplicity and efficiency."
  />
  <Card
    title="Run Nodes"
    icon={<RocketRegular />}
    to="/full-node/getting-started"
    description="Running Alephium full node is crucial for the security and decentralization of the network."
  />
  <Card
    title="Wallets"
    icon={<WalletRegular />}
    to="/wallet"
    description="Alephium offers a suite of user-friendly wallets to make its technology accessible to everyone."
  />
  <Card
    title="Mining"
    icon={<BatterySaverRegular />}
    to="/mining"
    description="Alephium supports solo mining or mining with mining pools."
  />
  <Card
    title="Integrations"
    icon={<ShapeIntersectRegular />}
    to="/integration"
    description={
      <div>Integration guides for <a href="/integration/exchange">exchanges</a> and <a href="/integration/mining">mining pool</a>.</div>
    }
  />
</CardSection>

## What is Alephium?

**Scalable for devs. Secure for users. Decentralized for all.**

Alephium combines innovative sharding, expressive sUTXO, and efficient Proof-of-Less-Work to secure scalable dApps for real-world applications.

## Why is Alephium special?

On top of an awesome team, an outstanding community and a lot of energy, here are our technical specificities:

**Scalable Through Sharding**. Alephium utilizes a novel sharding algorithm called BlockFlow. It enhances the UTXO model of BTC to achieve scalability and uses a DAG data structure to reach consensus among different shards, enabling up to 10’000 Transactions Per Second (currently more than 400 TPS vs Bitcoins 7 TPS).

**Programmable & Secure**. Alephium offers a stateful UTXO model that ensures layer-1 scalability and high programmability similar to Ethereum's account model, but with enhanced security.

**Energy Efficiency with PoLW**. Proof of Less Work (PoLW) combines physical work and token economics to dynamically adjust the work required to mine new blocks. Given the same network conditions, Alephium only uses 1/8 of the energy compared to Bitcoin.

**Custom VM (Alphred)**. Alephium's custom virtual machine addresses critical issues in current dApp platforms, offering significant improvements in security and development experience, and introducing new paradigms like trustless P2P smart contract transactions.

**Dedicated Programming Language (Ralph)**. Ralph is similar to the Rust syntax, hence its name. Ralph simplifies the creation of efficient and secure smart contracts, particularly for decentralized finance applications.

Combining these innovations, Alephium delivers a highly demanded solution in the industry: a scalable blockchain improving on mature ideas from Bitcoin to deliver reliable, powerful and secure DeFi and dApps capabilities. And we’re live!

**Check out our [whitepapers][whitepaper]!**

## Tokenomics

Alephium's token supply is capped at 1 billion. At Mainnet Launch (Nov. 8th, 2021), 140M tokens (14% of the hardcap) was mined with the genesis block. The remaining ALPH tokens will be mined over the next ~80 years. The initial 140M tokens are allocated as follows:

80M tokens (8%) 🤝 **Pre-sales and future strategic private sales**. Vesting periods varying from 2 to 4 years.

30M tokens (3%) 💡 **Community and ecosystem development**. Locked on-chain for 4 years and vested quarterly.

30M tokens (3%) 🧑‍💻 **Treasury & Team**. Locked on-chain for 3 years, and vested quarterly.

860M tokens (86%) 🌊 **Mining Rewards**. These tokens will be used for mining rewards over the next ~80 years. They ensure the processing of transactions and the execution of smart contracts on the Alephium blockchain.

In addition, all the transaction fees are burned with each block and Proof of Less Work enables internal mining cost through burning when the hashrate and energy consumption are significantly high.


### Total Supply and Circulating Supply

The Total Supply is calculated by adding the tokens mined at the Genesis Block (see breakdown above) and the block rewards since the Mainnet Launch.

Alephium uses the CMC method to calculate the circulating supply of ALPH. It consists of: the total number of existing ALPH from which is subtracted the balance (locked & unlocked) from the private sale investors, the treasury, ecosystem, the advisors/contractors, the project-controlled assets and all locked ALPH from other addresses.
In general, you can find our circulating supply on the front page of our [explorer](https://explorer.alephium.org/#/blocks). If you want a more in-depth explanation of the Coin Market Cap methodology, find it [here.](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-)

If you need the endpoints, find them here: [Total Supply](https://mainnet-backend.alephium.org/infos/supply/total-alph) = [Circulating Supply](https://mainnet-backend.alephium.org/infos/supply/circulating-alph) + [Reserved Supply](https://mainnet-backend.alephium.org/infos/supply/reserved-alph) + [Locked ALPH](https://mainnet-backend.alephium.org/infos/supply/locked-alph)

**Find more details in our [Tokenomics Medium article][tokenomics-medium].**

## Milestones & Roadmap

Please read the roadmap [here][roadmap] and completed milestones [here][milestones].

## Exchanges

### CEXs
The full list of centralized exchanges is available on [CoinMarketCap][CoinMarketCap] and [Coingecko][Coingecko].

### DEXs
ALPH is available on Alephium's native DEX [AYIN][AYIN] and Uniswap (wrapped ALPH). Full list of decentralized exchanges available on [Coingecko][Coingecko].

⚠️ Some pairs have low liquidity, always check liquidity before choosing a venue or bridging an asset.

## Contribute as Developers

Alephium is public, fully open source and decentralized. Discover and contribute to Alephium's main projects on [GitHub][github].

If you are building a dApp, get start from
[here](/dapps/tutorials/quick-start). Once released, let everyone know by
sending a PR to add your project to the [awesome-alephium][awesome] repo. The
Alephium [Brand Guide][brand-guide] might also come in handy.

Alephium has both a [Grant & Rewards][reward-grant] program and a [Bug Bounty](https://github.com/alephium/community/blob/master/BugBounty.md) program, please join [discord][discord] for further discussions.


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

## Non-official Content & Communities

:::info
Not moderated, endorsed or managed by Alephium
:::

You will find the complete list of internationalized channel [here](/misc/Internationalization-and-Localization)

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

## Partners

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
[node-release]: https://github.com/alephium/alephium/releases/latest/
[full-node]: https://github.com/alephium/alephium
[desktop-wallet]: https://github.com/alephium/alephium-frontend/apps/desktop-wallet
[mobile-wallet]: https://github.com/alephium/alephium-frontend/apps/mobile-wallet
[explorer]: https://github.com/alephium/alephium-frontend/apps/explorer
[web3-sdk]: https://github.com/alephium/alephium-web3
[docs]: https://github.com/alephium/docs
[awesome]: https://github.com/alephium/awesome-alephium
[mining-discord]: https://alephium.org/discord
[miner-starter-pack]: https://github.com/alephium/alephium-miner-getting-started
[solo-mining-video]: https://www.youtube.com/watch?v=hdPH6inWjhc
[reddit]: https://www.reddit.com/r/Alephium/
[extension-wallet-repo]: https://github.com/alephium/extension-wallet
[walletconnect-repo]: https://github.com/alephium/walletconnect
[wormhole-fork-repo]: https://github.com/alephium/wormhole-fork
[brand-guide]: https://github.com/alephium/alephium-brand-guide
[reward-grant]: https://github.com/alephium/community/tree/master
[Coingecko]: https://www.coingecko.com/en/coins/alephium#markets
[CoinMarketCap]: https://coinmarketcap.com/currencies/alephium/#Markets
[roadmap]: https://alephium.org/#next
[milestones]: https://alephium.org/#milestones
[AYIN]: https://www.ayin.app/
