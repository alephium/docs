---
sidebar_position: 30
sidebar_label: Oracles
title: Oracles
---

# Ecosystem Price Oracles, powered by DIA

## Introduction to DIA 

**[DIA](https://diadata.org/)** is a cross-chain oracle provider that sources granular market data from diverse exchanges, including CEXs and DEXs. Its data sourcing is thorough, enabling unparalleled transparency and customizability for resilient price feeds for 20,000+ assets. Its versatile data processing and delivery ensures adaptability and reliability for any decentralized application.

## Information on Usage of DIA Oracles on Alephium

The DIA oracle on Alephium is free of use. dApps built on Alephium can leverage the oracles to access up-to-date asset price information. This oracles are designed for production environments and comes with a predefined list of feeds and settings.

**If dApps require a custom oracle with different assets and configurations, please [contact DIA on Telegram](https://t.me/diabdteam).**

## Price Oracles

### Deployed contracts

The main oracle contracts on Group 0 are deployed at the following addresses: 

- **Testnet**: 216wgM3Xi5uBFYwwiw2T7iZoCy9vozPJ4XjToW74nQjbV
- **Mainnet:** 285zrkZTPpUCpjKg9E3z238VmpUBQEAbESGsJT6yX7Rod

(New groups will be added in the near future).

### How to access DIA oracles?

Locate one of the deployed contracts (either testnet or mainnet) and call the `get-value `function. This function expects one parameter, which is the symbols of the asset you want to retrieve and a “/USD”, so for example for the Bitcoin price the parameter must be “BTC/USD”.

This will return two values:

1. The price of the asset, with 8 decimals.
2. The timestamp of the last update in Unix time format, in UTC timezone.

### Included price feeds

The Alephium oracle includes the following price feeds. Use the Query Symbol as a parameter in the `get-value` function to receive the latest price information for any of these assets.

| Asset | Query Symbol | Sources Overview |
| ----------- | ----------- | ------|
| Bitcoin (BTC) | BTC/USD | [BTC Sources](https://www.diadata.org/app/price/asset/Bitcoin/0x0000000000000000000000000000000000000000/) |
| USD Coin (USDC) | USDC/USD | [USDC Sources](https://www.diadata.org/app/price/asset/Ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/) |
| Ether (ETH) | ETH/USD | [ETH Sources](https://www.diadata.org/app/price/asset/Ethereum/0x0000000000000000000000000000000000000000/) |
| Wrapped Bitcoin (WBTC) | WBTC/USD | [WBTC Sources](https://www.diadata.org/app/price/asset/Ethereum/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/) |
| Tether USD (USDT) | USDT/USD | [USDT Sources](https://www.diadata.org/app/price/asset/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7/) |
| Alephium (ALPH) | ALPH/USD | [ALPH Sources](https://www.diadata.org/app/price/asset/Alephium/tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq/) |
| Ayin (AYIN) | AYIN/USD | [AYIN Sources](https://www.diadata.org/app/price/asset/Alephium/vT49PY8ksoUL6NcXiZ1t2wAmC7tTPRfFfER8n3UCLvXy/) |

Learn more about DIA’s [data sourcing](https://docs.diadata.org/introduction/dia-technical-structure/data-sourcing) and [data computation](https://docs.diadata.org/introduction/dia-technical-structure/data-computation) architecture.


### Oracle configuration settings

#### Methodology: VWAPIR

The final price point for each asset is calculated by computing the assets' trade information across multiple DEXs and CEXs. This is done using a [Volume Weighted Average Price with Interquartile Range (VWAPIR) methodology](https://docs.diadata.org/products/token-price-feeds/exchangeprices/vwapir-volume-weighted-average-price-with-interquartile-range-filter).

#### Update frequency: 0.5% deviation + 1-hour heartbeat

Each asset is updated every two minutes if the new price deviates from the old one by more than 0.5%. Additionally, a heartbeat of 1 hour is applied, which means that each price is updated at least once per day even if it moves by less than 0.5%.

## Example

You can find a deployment example [here](https://github.com/alephium/ralph-example/tree/master/call-oracle/contracts).

## Support

For developer assistance, connect with the DIA team directly on [Discord](https://discord.gg/ZvGjVY5uvs) or [Telegram](https://t.me/diadata_org).

Developers seeking other specialized, production-grade oracle with tailored price feeds and configurations can initiate the request by [contacting the DIA BD Team via Telegram](https://t.me/diabdteam).
