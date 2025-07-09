---
sidebar_position: 0
sidebar_label: Overview
slug: /
title: Alephium Overview
---


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
  description={<div><h3>Welcome to Alephium!</h3><div> Fast & Scalable Proof-of-Work and secure Smart Contracts.</div></div>}
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
    to="/ralph"
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

**The Web3 you were promised.**
**Scalability, smart contracts, and real decentralization without the tradeoffs.**

Alephium unites the best of both worlds: the decentralized, censorship-resistant security of Proof-of-Work & UTXO, and the speed, scalability, and usability expected from modern smart contract platforms.

## Why is Alephium special?

On top of an awesome team, an outstanding community and a lot of energy, here are our technical specificities:


**⚡Fast:** 8 second block time, 2 BPS network throughput.
Each chain on Alephium now produces a block every 8 seconds. With parallel processing across the network, Alephium achieves 2 blocks per second on average, **matching the speed of leading PoS networks without sacrificing decentralization.**

**⛓️Scalable:** 20,000+ tps, single-chain experience.
Alephium's BlockFlow sharding processes over 20,000 transactions per second while eliminating cross-chain complexity, **delivering high throughput and the simplicity of a single-chain environment.**

**🔒Secure:** Security by design.
Alephium offers a robust, developer-friendly environment with **built-in protections against common vulnerabilities.** Its MEV-aware architecture and native safeguards **prevent threats like reentrancy attacks, unlimited approvals, and flash loan exploits.**

**🌱Sustainable:** The best of PoW, 87% less energy.
Alephium's **Proof-of-Less-Work** consensus delivers true decentralization with a fraction of the energy. **It retains the security and simplicity of traditional PoW while cutting energy use by over 87%.**

**🧩Programmable:** Stateful UTXO, the best of Bitcoin and Ethereum.
**Alephium's stateful UTXO model combines Ethereum's flexibility with Bitcoin's security.** It enables powerful smart contracts with mutable state while ensuring robust, UTXO-based asset protection.

**🧑‍💻Dev-friendly:** Custom VM & language built for performance.
Alephium empowers developers with its **purpose-built Virtual Machine (Alphred), intuitive SDK, and high-performance programming language (RALPH)**, enabling efficient development and unlocking new possibilities for smart contracts, dApps, and tokens.


All of this runs natively on a single Layer 1, with no dependence on bridges, sequencers, L2s, or rollups,  avoiding complexity, fragmentation, and UX tradeoffs.
Alephium unites the best of both worlds: the decentralized, censorship-resistant security of Proof-of-Work, and the speed, scalability, and usability expected from modern smart contract chains.

Alephium delivers the Web3 you were promised.

**Check out our [whitepapers][whitepaper]!**

## Built on Alephium 

Alephium powers a diverse ecosystem of innovative dApps. [Dive in!](https://www.alph.land/)


## Tokenomics

Since the Danube upgrade, ALPH emissions are no longer capped and the supply is unlimited.

| **Category**                | **Allocation** | **Vesting/Lock**                      |
|-----------------------------|:--------------:|---------------------------------------|
| Mining Emissions            | Unlimited      | 500 minutes lock                      |
| Burned                      | - All transaction fees  <br/> - Proof of Less Work | None                                  |
| Seed/Private Sales Allocation | 80M           | Unlock quarterly over 2 to 4 years    |
| Ecosystem Allocation        | 30M            | Unlock quarterly over 4 years         |
| Treasury Allocation         | 30M            | Unlock quarterly over 3 years         |

<sub>Tokenomics emission and vesting schedule</sub>

<br/><br/>
If you need the endpoints, find them here: [Total Supply](https://mainnet-backend.alephium.org/infos/supply/total-alph) = [Circulating Supply](https://mainnet-backend.alephium.org/infos/supply/circulating-alph) + [Reserved Supply](https://mainnet-backend.alephium.org/infos/supply/reserved-alph) + [Locked ALPH](https://mainnet-backend.alephium.org/infos/supply/locked-alph)

**For more information on current and historical emissions, read the full Tokenomics article [here](https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c)**

## Get ALPH

The native token of Alephium. You can get it through your wallet, exchanges, other networks or your peers.

### On-Ramps
You can get ALPH directly from the Alephium mobile and desktop wallets with a debit/credit card, bank transfer, or even Apple Pay. Geographical restrictions apply. [See announcement.](https://x.com/alephium/status/1899529139331481881)

### Centralised Exchanges

Centralised Exchanges (CEX) are platforms where ALPH is available using traditional currencies. They maintain custody over the ALPH you get until you transfer it to a wallet under your control.
The full list of centralized exchanges is available on [CoinMarketCap][CoinMarketCap] and [Coingecko][Coingecko].

### DEXs
ALPH is available natively on [Elexium](https://elexium.finance), [Ayin](https://www.ayin.app/), and [Nightshade](https://nightshade.finance), as well as on [Uniswap](https://app.uniswap.org/) (wrapped ALPH via the Ethereum Bridge) and [PancakeSwap](https://pancakeswap.finance/) (via the BSC Bridge). For a full list of decentralized exchanges, see [Coingecko](https://www.coingecko.com/en/coins/alephium).

⚠️ Some pairs have low liquidity, always check liquidity before choosing a venue or bridging an asset.

### Bridged ALPH
ALPH is also available on other networks such as Ethereum (via [Uniswap](https://app.uniswap.org/)) and BSC (via [PancakeSwap](https://pancakeswap.finance/)). You can use the [Alephium Token Bridge](https://docs.alephium.org/infrastructure/the-bridge/) to move bridged ALPH between these networks and the native Alephium network.

## From your peers

Once you have an Alephium wallet, you just need to share your address to start sending and receiving ALPH and other tokens directly with others. [Get a wallet here.](https://alephium.org/wallets/)

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

### Read, setup, explore, contribute

- [Website][website]
- [Whitepapers][whitepaper]
- [Medium][medium]
- [GitHub][github]

## Non-official Content & Communities

:::info
Not moderated, endorsed or managed by Alephium
:::

You will find the complete list of international communities [here](https://alephium.org/communities/).

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
