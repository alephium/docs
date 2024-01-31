---
sidebar_position: 10
title: Solo-Mining-Leitfaden
sidebar_label: Solo-Mining-Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Solo-Mining-Leitfaden

Sie müssen zunächst den Schritten im [Full Node Starter - Leitfaden](full-node/getting-started.md) folgen, um Ihren Node herunterzuladen, zu starten und Swagger [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs) zu verwenden.

## Mining-Informationen

- Insgesamt 4 Adressgruppen und 16 Ketten
- Die Zielblockzeit beträgt 64 Sekunden
- Jeden Tag werden durchschnittlich `24 * 60 * 60 / 64 * 16 = 21600` Blöcke abgebaut
- Die Blockbelohnungen betragen derzeit 3 ALPH
- Alle abgebauten Münzen sind für 500 Minuten gesperrt

Weitere Informationen zu Mining-Belohnungen finden sie in diesem Artikel [Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33).

Sie können die geschätzte Netzwerk-Hashrate aus dem Protokoll Ihres Full Node oder aus dem Grafana-Dashboard des Full Node erhalten, wenn sie es mit [docker-compose](full-node/docker-guide.md) ausführen.

## Miner wallet

Zunächst müssen sie eine dedizierte Wallet für das Mining erstellen. Im Gegensatz zu einer _traditionellen Wallet_, hat eine _Miner Wallet_ mehrere Adressen, die für jede Adressgruppe zum Sammeln von Mining-Belohnungen verwendet werden.

#### Erstellen sie Ihre Miner Wallet

![miner-wallet-create-query](media/miner-wallet-create-query.png)

Der Server gibt Ihnen die neue Wallet-Mnemonic zurück. Bitte sichern und speichern sie es sicher.

![miner-wallet-create-response](media/miner-wallet-create-response.png)

#### Liste deine Miner-Adressen auf

![miner-wallet-list-addresses-query](media/miner-wallet-list-addresses-query.png)

Der Server gibt Ihnen 4 Adressen für den nächsten Schritt zurück:

![miner-wallet-list-addresses-response](media/miner-wallet-list-addresses-response.png)

## Konfigurieren sie Miner-Adressen

Nachdem sie Ihre 4 Miner-Adressen erhalten haben, müssen sie diese Ihrem Node zuweisen, damit sie Belohnungen erhalten, wenn er mit dem Mining beginnt. Dies kann erreicht werden, indem sie den folgenden Inhalt in die Datei `.alephium/user.conf` unter Ihrem Home-Verzeichnis hinzufügen[^1]:

    alephium.network.external-address = "x.x.x.x:9973" // put your public IP here; otherwise remove this line
    alephium.mining.miner-addresses = [
      "1HiYeRbypJQK4nc6EFYWiRVdsdYukQKq8SvKQsfJ3wiR8",
      "1HD3q1G7qVoeyNA4U6HbBhFvv1FLUWNGwNavPamScpVLa",
      "1CQiD2RQ58ymszcgPEszRomyMZxEjH1Rtp4tB84JY2qgL",
      "19vvD3QbfEYbJexk6yCtnDNpRrfr3xQv2Pzc6x265MRhD"
    ]

Starten sie Ihren Knoten neu, um diese neuen Konfigurationen wirksam zu machen. Achten sie darauf, sie in derselben Reihenfolge hinzuzufügen, wie sie vom Endpunkt zurückgegeben wurden, da sie nach ihrer Gruppe sortiert sind.

## Sicherheit

Standardmäßig ist die API-Schnittstelle von Alephium an localhost gebunden, Ihre API-Endpunkte sind sicher. Wenn sie jedoch `alephium.api.network-interface` konfiguriert haben, können Ihre Endpunkte möglicherweise dem öffentlichen Netzwerk ausgesetzt sein. Dies kann gefährlich sein, da jeder auf Ihre Miner-Wallet zugreifen könnte. Bitte erwägen sie die Konfiguration eines API-Schlüssels gemäß dieser Anleitung: [API Key](full-node/full-node-more.md#api-key).

Bitte erwägen sie auch die Erstellung einer weiteren sicheren Wallet und überweisen sie regelmäßig Ihre Mittel auf diese Wallet mit `sweep-all-addresses` Endpoint.

## Starten sie das Mining

### Stellen sie sicher, dass Ihr Full Node synchronisiert ist

Sie können dies überprüfen, indem sie diesen Endpunkt ausführen:

![full-node-synced-query](media/full-node-synced-query.png)

Wenn sie in der Antwort `"synced": true` sehen, sind sie bereit.

### Nvidia GPU

Bitte folgen sie den Anweisungen auf [https://github.com/alephium/gpu-miner](https://github.com/alephium/gpu-miner#readme) um den GPU-Miner für Nvidia-GPUs auszuführen.

Alternativ können sie den GPU-Miner mit Docker ausführen, indem sie den Anweisungen [https://github.com/alephium/alephium/tree/master/docker#gpu-miner-optional](https://github.com/alephium/alephium/tree/master/docker#gpu-miner-optional) folgen.

### AMD GPU

Bitte folgen sie den Anweisungen auf [https://github.com/alephium/amd-miner](https://github.com/alephium/amd-miner#readme) um den GPU-Miner für AMD-GPUs auszuführen. Beachten sie, dass die Leistung des AMD-Miners nicht mit dem Nvidia-Miner vergleichbar ist.

Wenn sie Fragen haben, können sie sich gerne an die Entwickler auf [Discord](https://alephium.org/discord) wenden.

## Weitere Informationen zur Miner Wallet

Hier sind weitere Endpunkte, die für Miner nützlich sind.

#### Ihr Guthaben abfragen

![miner-wallet-balance-query](media/miner-wallet-balance-query.png)

#### Ändern sie Ihre aktive Adresse

![miner-wallet-change-active-address](media/miner-wallet-change-active-address.png)

#### Übertragen sie alle Ihre Mittel auf die aktive Adresse zu einer anderen Adresse

![miner-wallet-sweep-all-query](media/miner-wallet-sweep-all-query.png)

#### Entsperren sie Ihre Wallet

![miner-wallet-unlock-query](media/miner-wallet-unlock-query.png)

#### Wiederherstellen der Miner Wallet

![miner-wallet-restore-query](media/miner-wallet-restore-query.png)

[^1]: Das Home-Verzeichnis hängt von Ihrem System ab: `C:\Users\<your-username>` in Windows, `/Users/<your-username>` in macOS, `/home/<your-username>` in Linux.
