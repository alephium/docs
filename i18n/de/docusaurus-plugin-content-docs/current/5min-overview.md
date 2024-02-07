---
sidebar_position: 0
sidebar_label: Übersicht
slug: /
title: Alephium Übersicht
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Was ist Alephium?

**Skalierbar für Entwickler. Sicher für Benutzer. Dezentralisiert für alle.**

Innovatives Sharding trifft auf expressive sUTXO und effizientes Proof-of-Less-Work, um skalierbare DApps für den realen Einsatz zu sichern.

---

## Warum ist Alephium besonders?

Neben einem beeindruckenden Team, einer herausragenden Gemeinschaft und viel Energie zeichnen Alephium folgende technische Besonderheiten aus:

**Skaliert durch Sharding.** Alephium basiert auf einem neuartigen und umfassenden Sharding-Algorithmus namens BlockFlow. Dieser verbessert das UTXO-Modell von BTC, um es skalierbar zu machen, und verwendet die DAG-Datenstruktur, um Konsens zwischen verschiedenen Shards zu erreichen. Dies ermöglicht bis zu 10.000 Transaktionen pro Sekunde (derzeit mehr als 400 TPS im Vergleich zu Bitcoins 7 TPS).

**Programmierbar und Sicher.** Alephium bietet ein zustandsbehaftetes UTXO-Modell, das Layer-1-Skalierbarkeit und das gleiche Maß an Programmierbarkeit wie das auf ETH implementierte Account-Modell verwendet, während es gleichzeitig sicherer ist.

**Weniger energieintensiv dank POLW.** Proof of Less Work kombiniert physische Arbeit und Coin-Ökonomie, um die erforderliche Arbeit für das Minen neuer Blöcke dynamisch anzupassen. Unter gleichen Netzwerkbedingungen verwendet Alephium nur ⅛ der Energie im Vergleich zu Bitcoin.

**Verbessert die On-Chain-Struktur mit seiner eigenen benutzerdefinierten VM (Alphred).** Es löst viele der kritischen Probleme der aktuellen DApps-Plattformen mit erheblichen Verbesserungen bei Sicherheit, Entwicklungserfahrung und der Einführung neuer Paradigmen wie trustless P2P Smart Contracts Transaktionen.

**Verfügt über eine eigene Programmiersprache für DApps.** Ralph ähnelt der Rust-Syntax, daher sein Name. Es ermöglicht das einfachere Erstellen effizienter und sicherer Smart Contracts im Vergleich zu Solidity. Es ist speziell darauf ausgerichtet, die Erstellung von dezentralen Finanzanwendungen zu erleichtern!

Durch die Kombination all dieser Innovationen bietet Alephium eine stark nachgefragte Lösung in der Branche: eine skalierbare Blockchain, die auf bewährten Ideen von Bitcoin aufbaut, um zuverlässige, leistungsstarke und sichere DeFi- und DApps-Funktionen zu liefern. Und wir sind live!

**Schehen Sie sich unsere [Whitepapers][whitepaper] an!**

---

## Unsere Tokenökonomie

Die Tokenversorgung auf Alephium ist begrenzt und hat ein Hardcap von 1 Milliarde. Zum Zeitpunkt des Mainnet-Launchs (11.8.21) wurden mit dem Genesis-Block eine anfängliche Versorgung von 140 Millionen Tokens (14% des Hardcaps) abgebaut. Die verbleibende Versorgung der ALPH-Token wird über die nächsten ~80 Jahre abgebaut. Von diesen 140 Millionen Tokens:

80 Millionen Tokens (8%) 🤝 **Vorverkäufe und zukünftige strategische private Verkäufe**. Vesting-Perioden variieren von 2 bis 4 Jahren.

30 Millionen Tokens (3%) 💡 **Community- und Ökosystementwicklung**. Auf der Chain für 4 Jahre gesperrt und vierteljährlich gevestet.

30 Millionen Tokens (3%) 🧑‍💻 **Treasury & Team**. Auf der Chain für 3 Jahre gesperrt und vierteljährlich gevestet.

860 Millionen Tokens (86%) 🌊 **Mining Rewards**. Diese Tokens werden für Mining-Belohnungen über die nächsten ~80 Jahre verwendet. Sie gewährleisten die Verarbeitung von Transaktionen und die Ausführung von Smart Contracts auf der Alephium-Blockchain.

Zusätzlich werden die Hälfte der Transaktionsgebühren mit jedem Block verbrannt, und Proof of Less Work ermöglicht interne Mining-Kosten durch Verbrennung, wenn die Hashrate und der Energieverbrauch signifikant hoch sind.


### Gesamtangebot und Umlaufangebot

Das Gesamtangebot wird berechnet, indem die Tokens, die beim Genesis-Block abgebaut wurden (siehe Aufschlüsselung oben), und die Blockbelohnungen seit dem Mainnet-Launch addiert werden.

Alephium verwendet die CMC-Methode, um das Umlaufangebot von ALPH zu berechnen. Dieses besteht aus: der Gesamtanzahl der vorhandenen ALPH, von der der Saldo (gesperrt & nicht gesperrt) der Privatverkaufsinvestoren, den Finanzressourcen, des Ökosystems, der Berater/Auftragnehmer, der projektgesteuerten Vermögenswerte und aller gesperrten ALPH von anderen Adressen abgezogen wird.
Im Allgemeinen finden Sie unser Umlaufangebot auf der Startseite unseres [Explorers](https://explorer.alephium.org/). Wenn Sie eine detailliertere Erklärung der Coinmarketcap-Methodik wünschen, finden Sie diese [hier.](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-)

Wenn Sie die Endpunkte benötigen, finden Sie diese hier: [Gesamtangebot](https://mainnet-backend.alephium.org/infos/supply/total-alph) = [Umlaufangebot](https://mainnet-backend.alephium.org/infos/supply/circulating-alph) + [Reserviertes Angebot](https://mainnet-backend.alephium.org/infos/supply/reserved-alph) + [Gesperrte ALPH](https://mainnet-backend.alephium.org/infos/supply/locked-alph)

**Weitere Details finden Sie in unserem [Tokenomics-Artikel auf Medium][tokenomics-medium].**

---

## Wenn Sie Entwickler sind, starten Sie hier

Sie finden unser neuestes Node-Release auf [GitHub][node-release].

Entdecken und tragen Sie zu unseren Hauptprojekten [auf GitHub][github] bei:

- [Full Node][full-node]
- [Desktop Wallet][desktop-wallet]
- [Mobile Wallet][mobile-wallet]
- [Explorer][explorer]
- [Web3 SDK][web3-sdk]
- [Extension Wallet][extension-wallet-repo]
- [Wallet Connect][walletconnect-repo]
- [Bridge][wormhole-fork-repo]
- [Awesome Alephium][awesome]
- [Docs][docs]

### Etwas auf Alephium entwickeln?

Beginne mit dem [Web3 SDK][web3-sdk], und wenn du eine DApp erstellen möchtest, schau [hier](./dapps/Getting-Started) vorbei. 
Sobald Ihr Projekt veröffentlicht ist, informieren Sie alle, indem Sie einen Pull Request (PR) senden, um Ihr Projekt zu [Awesome Alephium][awesome]!
Die Alephium [Markenrichtlinie][brand-guide] könnte ebenfalls nützlich sein.

[Belohnungs- und Förderprogramm][reward-grant]

## Wenn du Miner bist, starte hier

Beginnen Sie, indem Sie dem dedizierten [Mining Kanal auf Discord][mining-discord] beitreten.

Sie finden unser Miner Starter Packet [auf Github][miner-starter-pack].

und spezifische Repos:

- https://github.com/alephium/gpu-miner
- https://github.com/alephium/fpga-miner
- https://github.com/alephium/mining-pool

Hier ist ein Video über [Wie starte ich mit dem Solo Mining][solo-mining-video].

Und wenn Sie lieber einem Pool beitreten möchten, finden Sie eine Liste der verfügbaren Pools im [Pool Mining Guide](./mining/pool-mining-guide).

---

## Meilensteine & Roadmap

[Abgeschlossene Meilensteine][milestones]

[Roadmap][roadmap]

---

## [Kaufen/Verkaufen][markets]

⚠️ Einige Handelspaare verfügen über eine geringere Liquidität. Überprüfen Sie immer die Liquidität, bevor Sie einen Handelsplatz auswählen oder ein Asset überbrücken.

---

## Trete Alephium Community bei!

### Unterhalten

- [Discord][discord]
- [Telegram][telegram]
- [Reddit][reddit]

### Verbinden 

- [Twitter][twitter]
- [LinkedIn][linkedin]
- [Facebook][facebook]

### Lesen, einrichten, erkunden, beitragen

- [Webseite][website]
- [Whitepapers][whitepaper]
- [Medium][medium]
- [GitHub][github]

---

## Nicht offizielle Inhalte & Communities

:::info
Nicht moderiert, unterstützt oder verwaltet durch Alephium.
:::

Sie finden [hier](./misc/Internationalization-and-Localization) die vollständige Liste der internationalisierten Kanäle.

### Youtube

- [Youtube 🌎](https://www.youtube.com/playlist?list=PL8q8n0BHJS1Nd0nxGfsNJzNnAeHoXhezz)
- [Youtube 🇧🇷](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PiisJCIWqeOsd20dsMtJIg)
- [Youtube 🇨🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1O931vGMfFb0Qx3gFKhd4bD)
- [Youtube 🇩🇪](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OtYdw8lKeke6nNSSfASzZq)
- [Youtube 🇮🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PBoCF0L2TfeWYC8b7DeTAn)
- [Youtube 🇮🇩](https://www.youtube.com/playlist?list=PL8q8n0BHJS1MEOKbcmicEO0uTuz67D5Fz)
- [Youtube 🇮🇹](https://www.youtube.com/playlist?list=PL8q8n0BHJS1O749KEPqfnwlr-RDlqJ20U)
- [Youtube 🇯🇵](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PS9PGIYJd8pjK6fw8AKZO4)
- [Youtube 🇲🇾](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OkFwspCxIVfFS2sVeGEC4K)
- [Youtube 🇷🇺](https://www.youtube.com/playlist?list=PL8q8n0BHJS1P4-22OaT_w3vwNZVwiQt6s)
- [Youtube 🇹🇭](https://www.youtube.com/playlist?list=PL8q8n0BHJS1MhpbWV3PI4xoXhjB06az_M)
- [Youtube 🇹🇷](https://www.youtube.com/playlist?list=PL8q8n0BHJS1OJIUOh0yANAEKdSUG8DdDG)
- [Youtube 🇻🇳](https://www.youtube.com/playlist?list=PL8q8n0BHJS1PJq68hRBfw3xeXGlfVDWVr)

---

## Unsere Partner

- [Bitcoin Association Switzerland](https://medium.com/@alephium/alephium-becomes-a-member-of-bitcoin-association-switzerland-2293fec16fc9)
- [Cetacean Capital](https://cetacean.capital/)
- [Crypto Valley Association](https://cryptovalley.swiss/)
- [Dappnode](https://dappnode.io)
- [Ergo](https://ergoplatform.org/)
- [Flux Labs](https://runonflux.io/fluxlabs.html)
- [Hodling SA](https://www.hodling.ch/)
- [UTXO Alliance](https://utxo-alliance.org/)


[whitepaper]: https://github.com/alephium/white-paper
[tokenomics-medium]: https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c
[website]: https://alephium.org/
[discord]: https://alephium.org/discord
[telegram]: https://t.me/alephiumgroup
[twitter]: https://twitter.com/alephium
[linkedin]: https://www.linkedin.com/company/alephium
[facebook]: https://www.facebook.com/alephium
[medium]: https://medium.com/@alephium
[github]: https://github.com/alephium
[node-release]: https://github.com/alephium/alephium/releases/latest/
[full-node]: https://github.com/alephium/alephium
[desktop-wallet]: https://github.com/alephium/alephium-frontend/apps/desktop-wallet
[mobile-wallet]: https://github.com/alephium/alephium-frontend/apps/mobile-wallet
[explorer]: https://github.com/alephium/alephium-frontend/apps/explorer
[web3-sdk]: https://github.com/alephium/alephium-web3
[docs]: https://github.com/alephium/docs
[awesome]: https://github.com/alephium/awesome-alephium
[mining-discord]: https://alephium.org/discord
[miner-starter-pack]: https://github.com/alephium/alephium-miner-getting-started
[solo-mining-video]: https://www.youtube.com/watch?v=hdPH6inWjhc
[reddit]: https://www.reddit.com/r/Alephium/
[extension-wallet-repo]: https://github.com/alephium/extension-wallet
[walletconnect-repo]: https://github.com/alephium/walletconnect
[wormhole-fork-repo]: https://github.com/alephium/wormhole-fork
[brand-guide]: https://github.com/alephium/alephium-brand-guide
[reward-grant]: https://github.com/alephium/community/tree/master
[markets]: https://www.coingecko.com/en/coins/alephium#markets
[roadmap]: https://alephium.org/#next
[milestones]: https://alephium.org/#milestones
