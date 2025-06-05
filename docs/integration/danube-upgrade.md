---
sidebar_position: 30
title: Danube Upgrade
sidebar_label: Danube Upgrade
---

## Overview

The Danube upgrade is a [major upgrade](https://github.com/alephium/alephium/blob/master/docs/danube-upgrade.md) to the Alephium network. It will be activated on mainnet on **XXX, 2025** and is already activated on testnet.

If you encounter any issues with the upgrade, please don't hesitate to reach out to the core developers on Discord/Telegram.

## How to upgrade

The upgrade is mostly backward compatible, so users do not need to take any action. However, ecosystem services need to pay attention to the following changes.

### Full node

If your service runs with a full node, you must upgrade the full node to the new version before the upgrade activation. To do this, simply upgrade your full node to version `4.x.x`.

### New Address Types

Danube introduces several new address types in addition to the existing ones. If your service validates addresses, you need to update your address validation logic to support the new address formats.

You can refer to the validation function in the [TypeScript SDK](https://github.com/alephium/alephium-web3/blob/48878adeae9b6f9543dc5569d38c2f077c4e6a9c/packages/web3/src/address/address.ts#L48-L59) for reference.

For a simple regex to perform sanity checks on addresses, you can use `^[1-9A-HJ-NP-Za-km-z]+(?:\:[0-9])?$`.

### TypeScript SDK

To take advantage of the new features in the Danube upgrade, you need to upgrade the TypeScript SDK to version `2.x.x`. However, we will continue to maintain version `1.x.x` for compatibility purposes.

We recommend upgrading the TypeScript SDK to version `2.x.x`, but you can also remain on version `1.x.x`.

## Ecosystem Services

We expect other ecosystem services to work well with the new version. The only thing you likely need to pay attention to is the [new address types](#new-address-types). Below are some specific notes for particular ecosystem services.

### Mining pools

In the Danube upgrade, the target block time is reduced from 16 seconds to 8 seconds, which means the average block production rate is doubled. However, we have optimized the block assembly algorithm, so the actual mining task load will likely be similar to the previous version. We expect mining pools to work well with the new version. Please don't hesitate to reach out if you have any questions.

### Wallets

Danube introduces groupless addresses to improve the user experience of Alephium wallets. Using this new address type is optional. We recommend upgrading to this feature only after the official wallets have completed their integration.

### Chain indexing

The new address types will affect the way chain indexing services store and query addresses. If your service indexes the blockchain, you need to update your indexing logic to support the [new address types](#new-address-types).

## Additional Resources

For detailed technical information and code examples of the new features in Ralph, please refer to the [Danube Features documentation](/ralph/danube-features/).

For the complete list of improvements and their implications, see the [official Danube upgrade documentation](https://github.com/alephium/alephium/blob/master/docs/danube-upgrade.md).
