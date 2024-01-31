---
sidebar_position: 30
title: Fehlerbehebung
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Fehlerbehebung

#### Warum kann ich nur 1 meiner 4 Miner-Adressen wiederherstellen ?

Sie müssen beim Wiederherstellen Ihrer Miner-Adresse `isMiner = true` angeben. 
Bitte werfen sie einen Blick auf das Beispiel hier: [Restore-Miner-Wallet](solo-mining-guide.md#restore-your-miner-wallet)

#### Wie verbinde ich meinen Miner mit meinem Full Node auf einem anderen Computer im gleichen Subnetz ?

1. Fügen sie das Folgende zu Ihrer `user.conf` hinzu und starten sie Ihren Full Node neu.

```
alephium.mining.api-interface = "0.0.0.0"
```

2. Führen sie Ihren Miner mit `-a IP` aus, wobei die IP die IP Ihres Full Nodes im Subnetz ist.

#### Wie kann ich die Swagger UI meines VPS-gehosteten Full Nodes verwenden ?

SSH-Portweiterleitung wird empfohlen:

```
ssh user@server  -L 12973:127.0.0.1:12973
```

#### Wie greife ich auf die Swagger UI meines Full Nodes auf einem anderen Computer im gleichen Subnetz zu ?

1. Fügen sie das Folgende zu Ihrer `user.conf` hinzu und starten sie Ihren Full Node neu.

```
alephium.api.network-interface = "0.0.0.0"
```

2. Ändern sie den `host` der Swagger UI auf die IP Ihres Full Nodes.

#### Mein Miner (über run-miner.sh) kann keine Verbindung zu meinem Full Node auf einem anderen Computer herstellen.

Das Skript `run-miner.sh` stellt standardmäßig eine Verbindung zu `127.0.0.1` her. Sie müssen `-a IP` zu `run-miner.sh` hinzufügen.

#### Warum verwendet der Miner auf HiveOS eine große Menge an Speicher ?

Sie sollten die `log to write in RAM` mit dem Befehl `logs-on` deaktivieren.

#### Wie kann ich den Auto-Lock-Timeout für Wallets anpassen ?

Sie können den Auto-Lock-Timeout des Wallets mit der folgenden Konfiguration ändern:

```
alephium.wallet.locking-timeout = 10 minutes
```
