---
sidebar_position: 30
title: CPU Miner Leitfaden
sidebar_label: CPU Miner Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

:::info

CPU-Mining ist nur für Testzwecke gedacht. Um das Testnet zu verwenden, besuchen Sie bitte  [Testnet Leitfaden](network/testnet-guide.md).

Für das Mining in der Produktion besuchen Sie bitte [Solo Mining Leitfaden](mining/solo-mining-guide.md) oder [Pool Mining Leitfaden](mining/pool-mining-guide.md).

:::

Sie müssen zuerst den Schritten im [Full-node Guide](full-node/getting-started.md) folgen, um Ihren Node herunterzuladen, zu konfigurieren, zu starten und Swagger (oder andere OpenAPI-Clients) zu verwenden.

Bitte beachten sie, dass die Standardadresse und der Port für die REST-API  [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) sind.

## Mining starten

Stellen sie sicher, dass Ihr lokaler Node vollständig synchronisiert ist, bevor sie mit dem Mining beginnen. Wir werden in unserem nächsten großen Release eine Validierung dafür hinzufügen.

Sie können das Mining **starten**, indem sie auf Ihrem lokalen Node einen POST auf `/miners/cpu-mining?action=start-mining` durchführen..

Der Server sollte einfach mit `true` antworten, um zu bestätigen, dass der Mining-Prozess jetzt gestartet ist.

Bitte beachten sie, dass sie zuerst Ihre Miner-Adressen konfigurieren müssen, wie im Abschnitt [Eine neue Miner-Wallet erstellen](mining/solo-mining-guide.md#create-a-new-miner-wallet) des GPU-Miner-Guides erklärt.

## Mining stoppen
Ebenso können sie das Mining **stoppen** , indem sie auf Ihrem lokalen Node einen POST auf `/miners/cpu-mining?action=stop-mining` durchführen..

## CPU Nutzung

Sie können die Menge der CPU-Ressourcen für das Mining durch Verwendung der folgenden beiden Konfigurationen anpassen:

    akka.actor.mining-dispatcher.fork-join-executor.parallelism-min = 1 // the minimal number of threads for mining
    akka.actor.mining-dispatcher.fork-join-executor.parallelism-max = 4 // the maximal number of threads for mining
