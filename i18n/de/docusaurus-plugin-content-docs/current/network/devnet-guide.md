---
sidebar_position: 20
title: Devnet Leitfaden
sidebar_label: Devnet Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Es ist entwicklerfreundlich, eine lokale Entwicklungsumgebung (Devnet) mit leerer Blockhistorie und einer beliebigen Menge an Münzen zu starten.

Die Installation des Full Nodes für das Devnet erfolgt genauso wie für das Mainnet: [Full Node Starter Guide](full-node/getting-started.md)

**Die `user.conf` muss vor dem Starten des Full Nodes modifiziert werden.**.

Bitte beachten Sie, dass die Standardadresse und der Port für die REST-API [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) sind.

## Konfiguration

In der Datei `$HOME/.alephium/user.conf` (`user.conf`, wenn Docker verwendet wird) müssen Sie Folgendes hinzufügen:

```
// In den meisten Fällen, ändern Sie die folgenden beiden Zeilen:
alephium.genesis.allocations = [{address = "<your-own-address>", amount = 1000000000000000000000000, lock-duration = 0 seconds}] // 1 million token allocated for your address
alephium.consensus.num-zeros-at-least-in-hash = 0

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true

// arbitrary mining addresses
alephium.mining.miner-addresses = [
"1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
"1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
"193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
"16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

Setzen Sie bitte Ihre eigenen Adressen für die Genesis-Zuweisungen ein. Sie können auch `num-zeros-at-least-in-hash` eduzieren, um das Mining zu beschleunigen.

Weitere Konfigurationen finden Sie in `$HOME/.alephium/network-4/`, und Protokolle können in `$HOME/.alephium/logs/` gefunden werden.

Wenn Sie `user.conf` ändern, ist es besser, `$HOME/.alephium/network-4/` u löschen, bevor Sie den Full Node neu starten.

## Mining

Devnet mit der Beispielkonfigurationsdatei kann automatisch neue Blöcke für alle neuen Transaktionen minen. Es ist nicht erforderlich, die CPU für das Mining zu verwenden.

Wenn Sie das Devnet für Mining-Tests verwenden möchten, setzen Sie bitte eine relativ hohe Schwierigkeit wie folgt:

```
alephium.consensus.num-zeros-at-least-in-hash = 24
```
