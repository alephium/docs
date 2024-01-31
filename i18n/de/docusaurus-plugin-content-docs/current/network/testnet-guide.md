---
sidebar_position: 10
title: Testnet Leitfaden
sidebar_label: Testnet Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Die Installation des Full Nodes für das Testnet erfolgt genauso wie für das Mainnet: [Full Node Starter Guide](full-node/getting-started.md)

**Die `user.conf` muss vor dem Starten des Full Nodes modifiziert werden.**.

Bitte beachten sie, dass die Standardadresse und der Port für die REST-API  [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) sind.

## Konfiguration

In der Datei `$HOME/.alephium/user.conf` (`user.conf` , wenn Docker verwendet wird) müssen sie Folgendes hinzufügen:

```
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
```

## Mining

Im Testnet können sie den [CPU Miner Leitfaden](cpu-miner-guide.md) verwenden, um einige ALPH zu erhalten.

Fügen sie Ihre Miner-Adressen in `$HOME/.alephium/user.conf` wie folgt hinzu:

```
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

:::info 

Sie können ganz einfach Mining-Adressen generieren, indem sie die [Desktop Wallet](../wallet/desktop-wallet/configure-mining-wallet) installieren und eine Wallet mit 4 Adressen erstellen. Sie können dann die Adressen kopieren und in Ihre oben genannte `user.conf`-Datei einfügen.

:::

## Konfigurationsbeispiel:

```
alephium.api.network-interface = "0.0.0.0"
alephium.mining.api-interface = "0.0.0.0"
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
alephium.api.api-key-enabled = false
```
