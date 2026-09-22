---
sidebar_position: 10
title: Overview
sidebar_label: Overview
---

## **Powfi — Core product surfaces**

Launched on September 22, 2026, Powfi introduces two complementary foundations for **ALPH DeFi: CLMM and xALPH**. The CLMM brings concentrated liquidity to ALPH, allowing liquidity providers to allocate capital within specific price ranges, with the first key market being ALPH × USDTeth (Ethereum-bridged USDT). xALPH is Powfi’s liquid staking layer: users stake ALPH and receive **xALPH**, representing their staked ALPH while remaining usable in supported pools and applications. Powfi also supports **CPMM pools** as an additional, more traditional liquidity model. Powfi can support incentive campaigns when their terms and funding are published.

![overview-1-foundations](https://github.com/user-attachments/assets/53cc7449-22b7-4492-a52e-9cb4141faa02)

### **CLMM — Concentrated liquidity**

Powfi’s CLMM allows liquidity providers to allocate capital within specific price ranges, making liquidity more efficient than traditional AMMs. The first key market is ALPH × USDTeth (Ethereum-bridged USDT), creating an on-chain liquidity venue for ALPH that can compete for trading flow with centralized exchanges.

### **CPMM — Constant-product liquidity**

Powfi also supports **CPMM pools**, providing a traditional liquidity model alongside its concentrated-liquidity markets. While CLMM is the key liquidity layer highlighted for ALPH DeFi, CPMM gives Powfi an additional pool design for token markets.

### **xALPH — Liquid ALPH staking**

**xALPH represents staked ALPH and can be used in supported pools and applications. Current support includes swapping xALPH and providing liquidity in Powfi’s ALPH/xALPH pool.**

### **Cross-chain liquidity**

Powfi links to the Alephium Bridge, a separate Alephium application for moving supported assets between Alephium, Ethereum, and BSC. Bridge functionality is not operated by Powfi’s smart contracts.

### **ALPH alignment**

For eligible CLMM swaps, 75% of the trading fee goes to liquidity providers and 25% becomes a protocol fee. Protocol fees must be collected and converted to ALPH before reaching RewardFeeCollector. No buyback, burn, or staker distribution is active on mainnet today; those actions require configuration and a distribution transaction.

![overview-2-alph-alignment](https://github.com/user-attachments/assets/f217c020-5e63-4728-b9f6-0d6682e1c5b9)

### **Incentives**

The ALPH × USDTeth farming and xALPH staking campaigns are planned but are not active on mainnet. Their start and end dates, reward budgets, distribution frequency, limits, and budget-exhaustion rules must be published before rewards begin.

**ALPH × USDTeth CLMM Round 0 farming overview:**

![overview-3-farming-round-0](https://github.com/user-attachments/assets/d5472012-5f98-4a43-a1fe-624e71d1c77a)

**ALPH staking round 0 campaign overview:**

![overview-4-staking-round-0](https://github.com/user-attachments/assets/5ae92853-80ba-4643-b789-a68fa4dbd6f2)

*The images above show planning targets, not guaranteed returns. Powfi displays estimated APR; APY assumes compounding and is not interchangeable with APR.*
