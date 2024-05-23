---
sidebar_position: 10
title: Testnet Guide
sidebar_label: Testnet guide
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

The installation of full node for testnet is the same as the mainnet: [Full Node Starter Guide](full-node/getting-started.md)

**The `user.conf` must be modified before starting the full node**.

## Configuration

In the `$HOME/.alephium/user.conf` (`user.conf` if docker is used) file you have to add:

```
alephium.network.network-id = 1
```

In the latest version, the testnet bootstrap URLs are hardcoded into the code, so you don't need to specify the `bootstrap` config in `user.config` anymore.

## Mining

To maintain the stability of the testnet network, we only allow [specific addresses](https://github.com/alephium/alephium/blob/fb4c4947ee0d0c57424d74ea197f19e72dc46c60/protocol/src/main/scala/org/alephium/protocol/ALPH.scala#L104) to mine blocks in the testnet. If you need to test mining, please set up your own testnet.

## Configuration example

```
alephium.api.network-interface = "0.0.0.0"
alephium.mining.api-interface = "0.0.0.0"
alephium.network.network-id = 1
alephium.api.api-key-enabled = false
```
