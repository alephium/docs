---
sidebar_position: 35
title: Laden aus dem Snapshot
sidebar_label: Laden aus dem Snapshot
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Full node

Der allererste Start eines Full Nodes, wie im [Einstiegshandbuch](./getting-started) beschrieben, dauert einige Stunden, bis er vollständig mit den anderen Nodes im Netzwerk synchronisiert ist. Anders ausgedrückt, bis er eine Kopie der gesamten Blockchain heruntergeladen hat.

Um diesen anfänglichen Synchronisierungsprozess zu beschleunigen, stehen Snapshots im
[dedizierten Alephium Archives Repository](https://archives.alephium.org) zur Verfügung. Ein automatisierter Prozess lädt Snapshots sowohl für das [Testnet](https://archives.alephium.org/#testnet/) als auch für das [Mainnet](https://archives.alephium.org/#mainnet/) hoch.

## Einen Snapshot herunterladen

Beim Vorbereiten des Full Node für seinen ersten Start, kurz bevor Sie ihn starten, können Sie den neuesten Snapshot herunterladen und (es handelt sich um eine `tar`-Datei) an der richtigen Stelle extrahieren. Der folgende Codeausschnitt führt dies sogar inline aus, d.h., ohne den benötigten Festplattenspeicherplatz für den Download und das Extrahieren des Snapshots zu verdoppeln:

```shell
ALEPHIUM_HOME=~/.alephium
ALEPHIUM_NETWORK=mainnet
curl -L "$(curl -s https://archives.alephium.org/archives/$ALEPHIUM_NETWORK/full-node-data/_latest.txt)" | tar xf - -C "$ALEPHIUM_HOME/"
```

Eine spezielle Datei mit dem Namen `_latest.txt` wird regelmäßig aktualisiert und zeigt stets auf den aktuellsten verfügbaren Snapshot, um Ihnen die Nutzung zu erleichtern.

## Die Verwendung eines vorgefertigten Skripts

Die oben gegebene Anleitung funktioniert zwar, deckt jedoch nicht alle möglichen Fehlerfälle ab, die auftreten können und dazu führen können, dass die Datenbank des Full Node in einem inkonsistenten Zustand bleibt. Glücklicherweise hilft Ihnen ein einsatzbereites Skript bei dieser Aufgabe.

```shell
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
curl -L https://github.com/touilleio/alephium-standalone/raw/main/snapshot-loader.sh | env ALEPHIUM_HOME=${ALEPHIUM_HOME} ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} sh
```

## Starten eines eigenständigen Containers

Und schließlich, wenn Sie dieses Setup schnell ausprobieren möchten, erledigt ein OCI-Image, das einfach das offizielle `alephium/alephium`-Image erweitert, automatisch alle oben beschriebenen Schritte: `touilleio/alephium-standalone`. Sein [Quellcode](https://github.com/touilleio/alephium-standalone) enthält alle erforderlichen Details zur Verwendung..

Ein kurzer Referenzbefehl zum Starten des eigenständigen Containers ist unten für die einfache Verwendung aufgeführt:

```
ALEPHIUM_HOME=/tmp
ALEPHIUM_NETWORK=mainnet
docker run -p 39973:39973 -p 127.0.0.1:12973:12973 \
  -v ${ALEPHIUM_HOME}:/alephium-home/.alephium \
  -e ALEPHIUM_NETWORK=${ALEPHIUM_NETWORK} touilleio/alephium-standalone:latest
```

# Explorer Datenbank

Das [Alephium Archives Repository](https://archives.alephium.org) enthält zudem Explorer-Datenbanksnapshots. Beim ersten Start können Sie den Snapshot in die PostgreSQL-Datenbank des Explorer-Backends laden, indem Sie den folgenden Befehl verwenden:

```shell
ALEPHIUM_NETWORK=mainnet
curl -L $(curl -L -s https://archives.alephium.org/archives/${ALEPHIUM_NETWORK}/explorer-db/_latest.txt) | gunzip -c | psql -U $pg_user -d $database
```
