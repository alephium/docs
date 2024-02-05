---
sidebar_position: 50
title: Devnet
sidebar_label: Devnet
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Ein lokales Devnet erstellen

## Docker verwenden

Wenn Sie ein lokales Entwicklungsnetzwerk mit Unterstützung für den Explorer erstellen möchten, verwenden Sie bitte `docker-compose` und befolgen Sie die Anweisungen in [alphium-stack](https://github.com/alephium/alephium-stack#devnet).

## Manuelle Verwendung von JAR-Dateien

### Full node

Laden Sie die Datei `alephium-x.x.x.jar` vom [Github Release](https://github.com/alephium/alephium/releases/latest) herunter (klicken Sie nicht doppelt darauf, die Datei kann nicht auf diese Weise gestartet werden).

Schreiben Sie eine Konfigurationsdatei unter  `~/.alephium/user.conf`. Die unten stehende stammt aus unserem [Alephium-Stack-Repo](https://github.com/alephium/alephium-stack/blob/master/devnet/devnet.conf)

```conf
# Import this mnemonic to have 4'000'000 token allocated for your addresses
#
# vault alarm sad mass witness property virus style good flower rice alpha viable evidence run glare pretty scout evil judge enroll refuse another lava

alephium.genesis.allocations = [
  {
    address = "1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "14UAjZ3qcmEVKdTo84Kwf4RprTQi86w2TefnnGFjov9xF",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "15jjExDyS8q3Wqk9v29PCQ21jDqubDrD8WQdgn6VW2oi4",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  },
  {
    address = "17cBiTcWhung3WDLuc9ja5Y7BMus5Q7CD9wYBxS1r1P2R",
    amount = 1000000000000000000000000,
    lock-duration = 0 seconds
  }
]

alephium.consensus.num-zeros-at-least-in-hash = 0
alephium.consensus.uncle-dependency-gap-time = 0 seconds
alephium.network.leman-hard-fork-timestamp = 1643500800000 # GMT: 30 January 2022 00:00:00

alephium.network.network-id = 4
alephium.discovery.bootstrap = []
alephium.wallet.locking-timeout = 99999 minutes
alephium.mempool.auto-mine-for-dev = true
alephium.node.event-log.enabled=true
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true

alephium.network.rest-port = 22973
alephium.network.ws-port = 21973
alephium.network.miner-api-port = 20973
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key-enabled = false
alephium.mining.api-interface = "0.0.0.0"
alephium.network.bind-address  = "0.0.0.0:19973"
alephium.network.internal-address  = "alephium:19973"
alephium.network.coordinator-address  = "alephium:19973"

# arbitrary mining addresses
alephium.mining.miner-addresses = [
  "1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA",
  "1CQvSXsmM5BMFKguKDPpNUfw1idiut8UifLtT8748JdHc",
  "193maApeJWrz9GFwWCfa982ccLARVE9Y1WgKSJaUs7UAx",
  "16fZKYPCZJv2TP3FArA9FLUQceTS9U8xVnSjxFG9MBKyY"
]
```

Hinweis: Das Mnemonic (24 Wörter) und die entsprechenden Adressen wurden zu Entwicklungs­zwecken erstellt. Sie können es verwenden oder Ihr eigenes erstellen, verwenden Sie es jedoch niemals auf dem `mainnet`.
Sie können auch weitere Adressen hinzufügen, wenn Sie möchten. Wenn Sie die Adressen später ändern möchten, müssen Sie Ihr Devnet löschen und neu starten.


Sie können Ihr Devnet jetzt starten: `devnet`:

```sh
java -jar alephium-x.x.x.jar
```

Sie können nun auf die API des Full Nodes zugreifen: `http://localhost:22973/docs`

### Explorer-Backend

Voraussetzung: https://www.postgresql.org/

Laden Sie die Datei `explorer-backend-x.x.x.jar` vom [Github Release](https://github.com/alephium/explorer-backend/releases/latest) herunter.

Verbinden Sie sich mit PostgreSQL und erstellen Sie eine Datenbank für Ihr Devnet.

```sql
CREATE DATABASE devnet;
```

Sie können die [Konfigurationsdatei](https://github.com/alephium/explorer-backend/blob/feature/contract-subcontract/app/src/main/resources/application.conf) überprüfen, um zu sehen, welche Einstellungen überschrieben werden können. Sie können dann Ihr `Explorer-Backend` konfigurieren und starten mit:

```sh
export BLOCKFLOW_NETWORK_ID=2
export BLOCKFLOW_PORT=22973
export DB_NAME=devnet
java -jar explorer-backend-x.x.x.jar
```
