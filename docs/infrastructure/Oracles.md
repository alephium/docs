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

**If dApps require a custom oracle with different assets and configurations, please [contact DIA on Telegram](https://t.me/DIAOracles_Support_Bot).**

## Price Oracles

### Deployed contracts

The main oracle contracts on Group 0 are deployed at the following addresses: 

Network    | Address
-----------|--------------------------------------------------------------
Mainnet    | 285zrkZTPpUCpjKg9E3z238VmpUBQEAbESGsJT6yX7Rod
Testnet    | 216wgM3Xi5uBFYwwiw2T7iZoCy9vozPJ4XjToW74nQjbV


(New groups will be added in the near future).

### How to access DIA oracles?

Locate one of the deployed contracts (either testnet or mainnet) and call the `get-value `function. This function expects one parameter, which is the symbols of the asset you want to retrieve and a “/USD”, so for example for the Bitcoin price the parameter must be “BTC/USD”.

This will return two values:

1. The price of the asset, with 8 decimals.
2. The timestamp of the last update in Unix time format, in UTC timezone.

View complete integration guide on Alephium [here](https://www.diadata.org/docs/guides/chain-specific-guide/alephium).

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

### Oracle configuration settings

#### Methodology: VWAPIR

The final price point for each asset is calculated by computing the assets' trade information across multiple DEXs and CEXs. This is done using a [Volume Weighted Average Price with Interquartile Range (VWAPIR) methodology](https://www.diadata.org/docs/guides/methodologies/pricing-methodologies/vwapir-volume-weighted-average-price-with-interquartile-range-filter).

#### Update frequency: 0.2% deviation + 10 minutes heartbeat

Each asset is updated every two minutes if the new price deviates from the old one by more than 0.2%. Additionally, a heartbeat of 10 minutes is applied, which means that each price is updated at least once per day even if it moves by less than 0.2%.

---

## Randomness Oracles

### Deployed contracts

The Randomness oracle contracts on Group 0 are deployed at the following addresses: 

Network    | Address
-----------|--------------------------------------------------------------
Mainnet    | v1v4cBXP9L7M9ryZZCx7tuXuNb9pnDLGb3JJkPBpbR1Z
Testnet    | 217k7FMPgahEQWCfSA1BN5TaxPsFovjPagpujkyxKDvS3

### How the Randomness Oracle Works

DIA leverages [drand](https://drand.love/)’s distributed randomness beacon, enabling verifiable, unpredictable, and unbiased random numbers.

![DIA xRandom Alephium](https://github.com/user-attachments/assets/8f11cf93-87a5-4333-86ce-b129623aee0a)

The drand network's nodes collaborate every 30 seconds to produce a verifiable random number, which DIA's oracle system then captures and publishes to its smart contract, making this randomness readily available for on-chain applications. 

You can learn more about the full publishing process [here](https://www.diadata.org/docs/dia-stack/architecture/data-sources/randomness#on-chain-publishing-process).

### How to Access Data  

#### Accessing the oracle on-chain  

To consume randomness data, you’ll need to use the `IDIARandomOracle` interface to

1. Invoke the **`getLastRound`** method to get the round ID of the latest randomness data update.
2. Use the round ID to invoke the **`getRandomValue`** method to get the randomness value, the round ID, and the BLS signature.

The `RandomnessFetcher` contract below is a simple example to fetch and store the randomness value from the randomness oracle:

```rust
struct DIARandomValue {
    mut randomness: ByteVec,
    mut signature: ByteVec,
    mut round: U256
}

Interface IDIARandomOracle {
    pub fn getLastRound() -> U256
    pub fn getRandomValue(round: U256) -> DIARandomValue
}

Contract RandomnessFetcher(
  oracle: IDIARandomOracle,
  mut randomValue: DIARandomValue
) {
  @using(updateFields = true, checkExternalCaller = false)
  pub fn update() -> () {
    let lastRound = oracle.getLastRound()
    let value = oracle.getRandomValue(lastRound)
    randomValue = value
  }
}
```

When deploying the `RandomnessFetcher` contract, you'll need to pass in the address of the [deployed oracle contract](#deployed-contracts) depending on the network.

Please note that round IDs are used round-robin and will repeat after **1000 iterations**.

## Example

You can find a deployment example [here](https://github.com/alephium/ralph-example/tree/master/call-oracle/contracts).

## Request a Custom Oracle
For assets not currently available or dApps requiring specific configurations, DIA deploys production-grade custom oracles tailored to your requirements with configurable data sources, pricing methodologies, update triggers, and coverage for any of 20,000+ supported assets.

→ [Request a Custom Oracle](https://www.diadata.org/docs/guides/how-to-guides/request-a-custom-oracle)

## Resources

- Developer Support: [Discord](https://discord.com/invite/ZvGjVY5uvs) | [Telegram](https://t.me/diadata_org)
- [Alephium Integration Guide](https://www.diadata.org/docs/guides/chain-specific-guide/alephium)
- [DIA Documentation](https://www.diadata.org/docs)
