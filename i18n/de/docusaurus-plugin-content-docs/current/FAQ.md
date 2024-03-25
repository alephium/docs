---
sidebar_position: 1
slug: /haeufig-gestellte-fragen
sidebar_label: FAQ
title: Häufig gestellte Fragen
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

:::info
📚 Erfahren Sie alles über Alephium in diesem [5-minütigen Überblick](/).
:::

Bevor Sie tiefer eintauchen, empfehlen wir Ihnen, die folgenden Ressourcen sorgfältig zu lesen, da sie nützliche Informationen über Alephium bereitstellen:

- [Offizielle Webseite](https://alephium.org)
- [Offizielles Twitter](https://twitter.com/alephium)
- [Offizielles Discord](https://alephium.org/discord)
- [Offizielles Telegram](https://t.me/alephiumgroup)
- [Offizielles Reddit](https://reddit.com/r/Alephium)
- [Offizielles Medium](https://medium.com/@alephium), insbesondere:
  - [Alephium's Tokenomics](https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c)
  - [Alephium's Blockbelohnungen](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
  - [Alephium's Community Belohnungs-Programm](https://medium.com/@alephium/introducing-community-rewards-f4638bbf14bf)
  - [Der ultimative Leitfaden zu Proof-of-Less-Work, dem Universum und allem dazwischen...](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)
  - [Einführung in sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
  - [ALPHred, die virtuelle Maschine](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025)
  - [Das Leman Network Upgrade ist Live!](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a)

## Chain Data

### Wie viele ALPH befinden sich im Umlauf?

Die Umlaufmenge können Sie mit dem Alephium [Explorer](https://explorer.alephium.org) oder durch Verwendung des [Endpunkts für zirkulierende ALPH](https://backend.mainnet.alephium.org/infos/supply/circulating-alph) herausfinden.

### Wie wird die Umlaufmenge berechnet?

Sie wird nach der [Methodik von CoinMarketCap](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-) berechnet.

Die Umlaufmenge entspricht der Anzahl der existierenden ALPH abzüglich:

- Des Gesamtsaldos (gesperrt und entsperrt) der Teilnehmer an privaten Verkäufen, den vom Projekt kontrollierten Adressen und den vom Team kontrollierten Adressen. Gemäß CMC: _"Tokens werden im Allgemeinen erst als im Umlauf befindlich betrachtet, nachdem sie die ursprüngliche Reserve-Wallet verlassen haben (d.h., ausgehende Überweisungen sind eher repräsentativ für die Absicht, die Münze in Umlauf zu bringen, als lediglich eine Freigabe)."_.
- Allen gesperrten ALPH von anderen Adressen.

### Wie kann ich mein Wallet-Guthaben überprüfen, und welche Adressen haben die größten Bestände?

Um das Guthaben einer bestimmten Wallet zu überprüfen, ist der [Explorer](https://explorer.alephium.org) die erste Anlaufstelle.  
Community-Mitglieder haben eine [Alph Richlist](https://alph-richlist.vercel.app/) erstellt, die die Adressen mit den größten Beständen auflistet.

Zusätzlich können Sie die Inhaber von gewrappten ALPH/ERC20 auf [etherscan.io](https://etherscan.io/token/0x590F820444fA3638e022776752c5eEF34E2F89A6#balances) überprüfen.

### Was ist die minimalste Transaktionsgebühr?

Aktuell beträgt die minimalste Transaktionsgebühr `0.002`, ALPH um Netzwerk-DoS-Angriffe zu verhindern. In der Zukunft kann diese Mindestgebühr niedriger sein, wobei die niedrigstmögliche minimale Transaktionsgebühr auf Alephium `0.00000000000001` ALPH beträgt. Die genaue Gebühr hängt von der Anzahl der Inputs (UTXOs) und der Anzahl der beteiligten Unterzeichner einer Transaktion ab.

### Wie viele Transaktionen pro Sekunde (TPS) sind auf Alephium möglich?

Das Alephium Mainnet unterstützt derzeit über 400 Transaktionen pro Sekunde (TPS) mit 16 Shards. Es kann auf über 10.000 TPS skalieren, indem die Anzahl der Shards bei Bedarf erhöht wird. Erfahren Sie mehr über [das Konzept von TPS](https://medium.com/@alephium/transactions-per-second-tps-f13217a49e39).

### Was ist die kleinste Einheit von Alephium?

Alephium erlaubt bis zu 18 Dezimalstellen, und seine kleinste Einheit wird Phi genannt. Ein Phi entspricht `0.000000000000000001` ALPH, oder `10^-18` ALPH, während 1 ALPH `10^18` Phi entspricht.

## DApps

### Gibt es eine DEX auf Alephium?

Alephium verfügt über einen [DEX-Prototyp](https://alephium.github.io/alephium-dex/#/swap) der im Testnet läuft. Erfahren Sie mehr darüber im [Artikel zum DEX-Prototyp](https://medium.com/@alephium/dex-prototype-live-on-testnet-bac5e7d095ce).

Die [DEX Contracts](https://github.com/alephium/alephium-dex/tree/master/contracts) wurden gründlich von den Kernentwicklern getestet, was sie zuverlässig und effizient macht. Sie können problemlos verzweigt und für Projekte verwendet werden.

### Gibt es DApps auf Alephium?

Die meisten bisher auf Alephium erstellten Projekte sind im [Awesome Alephium Repository](https://github.com/alephium/awesome-alephium) aufgeführt. Um Ihren Beitrag hinzuzufügen, reichen Sie einen Pull Request ein!

Alephium befindet sich noch in einem sehr frühen Stadium, die Infrastruktur (einschließlich einer [Bridge](https://github.com/alephium/wormhole-fork)) und die Dokumentation zur Erleichterung der Entwicklung von DApps werden kontinuierlich verbessert.
Alephium verfügt über eine Reihe [gut gepflegter Prototypen](dapps/ecosystem#prototypes) die als Grundlage oder Inspiration für Ihr Projekt dienen können.

Wenn Sie eine DApp erstellen möchten, werfen Sie einen Blick auf unseren [Leitfaden zum Einstieg in DApps](dapps/getting-started).

### Warum kann sich eine DApp nur mit einer meiner Adressen verbinden?

Alephium funktioniert als eine Sharded-Blockchain, bei der Adressen und Vertragszustände in mehrere Gruppen organisiert sind. Wenn es um DApps geht, können diese in jeder dieser Gruppen bereitgestellt werden. Es gibt jedoch einen Haken: DApps können nur von Adressen in derselben Gruppe verwendet werden.

Wenn Sie sich also mit einer DApp verbinden, wird diese speziell nach Adressen fragen, die zur gleichen Gruppe gehören wie die DApp selbst. Dieses Gruppensystem stellt sicher, dass alles reibungslos innerhalb der geschicheten Struktur von Alephium funktioniert.

Beachten Sie, dass dieses Problem die Verwendung von DApps betrifft. Normale Transaktionen bieten eine ähnliche Benutzererfahrung wie nicht Sharded-Blockchains. Das Kernentwicklerteam ist entschlossen, die Verwaltung von Vermögenswerten über verschiedene Gruppen hinweg zu verbessern, um sie benutzerfreundlicher für DApp-Benutzer zu gestalten.

## Entwicklung

### Wo finde ich die Roadmap?

Die Roadmap finden sie auf unserer [Webseite](https://alephium.org/#next) und in der [Dokumentation](#roadmap).  Sie können auch die wöchentlichen Entwicklungsaktualisierungen auf [Discord](https://alephium.org/discord), [Twitter](https://twitter.com/alephium) oder auf [Reddit](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1) verfolgen..

### Wo kann ich den Status der von Alephium öffentlich betriebenen Dienste überwachen?

Sie können den öffentlichen Dienst von Alephium überwachen für:

- Das Mainnet auf https://status.mainnet.alephium.org
- Das Testnet auf https://status.testnet.alephium.org

### Wo kann ich eine API abfragen?

Um eine API abzufragen, müssen Sie einen Full Node (vollständigen Knoten) ausführen ([Anleitung](full-node/getting-started)).  
Alephium verwendet OpenAPI, um mit Full Nodes zu interagieren. Sie können direkt Ihr lokales Swagger UI über `127.0.0.1:12973/docs` öffnen, sobald Ihre Full Node ausgeführt wird. 
Alternativ ist es möglich jeden OpenAPI-Client zu verwenden, um die [openapi.json](https://raw.githubusercontent.com/alephium/alephium/master/api/src/main/resources/openapi.json) aus dem Repository von Alephium zu importieren.

### Haben Sie ein Förder-, Belohnungs- oder Prämienprogramm?

Alephium bietet ein [Förder- und Belohnungsprogramm](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md) an, bei dem Ihr Beitrag, unabhängig von der Größe, möglicherweise für eine Belohnung in Frage kommt.

### Was wird auf Alephium entwickelt?

Die meisten bisher auf Alephium erstellten Projekte sind im [Awesome Alephium Repository](https://github.com/alephium/awesome-alephium) aufgeführt. Wenn Sie präsentieren möchten, was Sie erstellt haben, reichen Sie einen Pull Request ein, um es zur Liste hinzuzufügen.

## Full Node (Vollständiger Knoten)

### Gibt es eine Belohnung für den Betrieb einer Full Node?

Alephium verwendet einen Proof-of-(Less)-Work-Konsensmechanismus, was bedeutet, dass es im Gegensatz zu Proof-of-Stake-Netzwerken keine nativen monetären Belohnungen für das Betreiben eines Full Nodes gibt. Das Betreiben Ihres eigenen Node bietet jedoch andere Vorteile wie Dezentralisierung, unabhängige Überprüfung, Datenschutz und wirtschaftliche Selbstbestimmung. Der Ausdruck *"not your node, not your network"* unterstreicht die Bedeutung des Betreibens Ihres eigenen Node, da die Abhängigkeit von einem Node eines Dritten für die Interaktion mit der Blockchain bedeutet, diesem Dritten zu vertrauen. Obwohl die Verbindung zu einem Node eines Dritten im Allgemeinen sicher ist, bevorzugen einige Personen die Aufrechterhaltung ihres eigenen Vertrauens- und Datenschutzniveaus.

### Was benötige ich, um einen Full Node auszuführen?

Ein Full Node von Alephium ist leichtgewichtig und kann auf den meisten Geräten laufen, einschließlich eines Raspberry Pi oder sogar auf einem Smartphone. Um Ihren eigenen Node einzurichten und auszuführen, folgen Sie bitte dem [Leitfaden zum Einstieg des Betriebs eines Full Node](full-node/getting-started/).

### Ist es möglich, auf Alephium zu staken?

Alephium bietet kein natives Staking auf seiner Blockchain an, da es nicht auf einem PoS-Konsensmechanismus basiert. Allerdings könnten DeFi-Liquiditätspools in Zukunft die Möglichkeit des Staking für Benutzer anbieten.

## Listungen & Börsen

### Was ist Ihr Token-Ticker?

Das Token-Ticker für Alephium lautet [ALPH](https://medium.com/@alephium/introducing-alph-8381dbd9f88d).

### Wie lange dauert es, bis Einzahlungen auf Börsen angezeigt werden?

Börsen benötigen in der Regel eine höhere Anzahl von Bestätigungen für PoW-Chains, um ausreichende Sicherheit zu gewährleisten. Derzeit fordern die meisten Börsen zwischen 30 und 60 Bestätigungen für Alephium, was etwa 30 Minuten bis eine Stunde entspricht.

### Auf welchen Börsen ist Alephium derzeit gelistet?

Die Liste der verfügbaren Alephium-Märkte finden Sie auf [CoinMarketCap](https://coinmarketcap.com/currencies/alephium/markets/) oder [CoinGecko](https://www.coingecko.com/en/coins/alephium).

## Mining

### Wie hoch sind die Mining-Belohnungen?

Es gibt einen [ausführlichen Artikel, der die Blockbelohnungen von Alephium erklärt](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33).

### Was ist der Grund, die Blockbelohnung für 500 Minuten zu sperren, obwohl die Blockzeit nur 64 Sekunden beträgt?

Die 500-minütige Sperrfrist ist so konzipiert, um Re-Org-Angriffe zu verhindern, ähnlich wie die 1000-minütige Sperrfrist für geschürfte Belohnungen bei Bitcoin.

### Warum habe ich 4 Mining-Adressen?

Alephium ist eine Sharded-Blockchain mit `G` Gruppen und `G*G` Shards. Aufgrund dieses Designs benötigt jede Gruppe ihre eigene Mining-Adresse.

Derzeit besitzt Alephium 4 Gruppen und 16 Shards in seinem Mainnet. Daher werden 4 Mining-Adressen benötigt, eine für jede Gruppe.

### Wie viele Münzen werden pro Tag geschürft?

Um zu erfahren, wie viele Münzen pro Tag geschürft werden, können Sie die folgende Formel verwenden. Da die Blockbelohnung sich dynamisch mit jedem Block ändert, liefert die Formel nur eine Annäherung.

```
3600 Sekunden / 64 Sekunden (Alephium Blockzeit) == 56,25 Blöcke pro Stunde, pro Shard.
56,25 x 16 Shard== 900 Blöcke insgesamt pro Stunde.
900 x 24 Stunden == 21600 Blöcke pro Tag.
21600 x Belohnung pro ALPH-Block ~= Anzahl der ALPH, die pro Tag geschürft werden.
```

Zum Zeitpunkt der letzten Aktualisierung dieses Eintrags betrug die durchschnittliche Blockbelohnung `2.87` ALPH, was etwa `61'992` ALPH pro Tag entspricht.

### Ist Alephium ASIC-Resistent?

Nein, Alephium ist darauf ausgelegt, ASIC-freundlich zu sein, genau wie Bitcoin. Die Aufrechterhaltung von ASIC-Resistenz kann äußerst herausfordernd, wenn nicht sogar unmöglich, wie bei anderen Blockchains, die sich gezwungen sahen, Forks durchzuführen und ihre Mining-Algorithmen zu ändern. Alephium hat sich dafür entschieden, die Priorität auf ein sicheres und stabiles Netzwerk zu legen, anstatt Widerstand gegen spezialisierte Hardware zu bieten. Wenn die Zeit gekommen ist, kann die Verwendung von ASICs auf Alephium die Leistung und die Treue der Miner unterstützen. Die Investition in hardware, die speziell für die Blockchain entwickelt wurde, macht es wahrscheinlicher, dass Miner engagiert bleiben und verringert das Risiko plötzlicher Verschiebungen in der Mining-Leistung.

### Welche Mining Software kann ich verwenden, um ALPH zu schürfen?

Unterhalb ist eine Liste bekannter Mining Software für Alephium aufgelistet. Beachten Sie, dass die Liste unvollständig sein kann, da es schwierig ist, neue Miner im Auge zu behalten. Sie können gerne einen Pull Request einreichen, um weitere hinzuzufügen.

- https://www.bzminer.com/guides/how-to-mine-alephium/
- https://lolminer.site/
  https://github.com/Lolliedieb/lolMiner-releases
- https://www.srbminer.com/
  https://github.com/doktor83/SRBMiner-Multi/releases
- https://trex-miner.com/
  https://github.com/trexminer/T-Rex

Sie können auch den [Alephium GPU Miner](https://github.com/alephium/gpu-miner) verwenden, jedoch ist dieser nicht so effizient wie die anderen in dieser Liste.

## Tech

### Warum eine weitere L1-Blockchain? Gibt es nicht schon zu viele?

Die Blockchain hat sich von einer disruptiven Technologie zu einer möglichen Mainstream-Lösung für verschiedene Sektoren entwickelt. Aufgrund dieses Paradigmenwechsels geben die meisten Projekte die Grundwerte von Dezentralisierung, Selbstbestimmung und Sicherheit auf, um die Skalierbarkeit zu verfolgen, die für derartige Anwendungen erforderlich ist. Alephium erzielt dasselbe Ergebnis, ohne dabei die Grundprinzipien zu beeinträchtigen, und ist einzigartig positioniert, um das Interesse der Branche an (s)UTXO und Po(L)W zu wecken und die Bewegung von UTXO-basierten DeFi- und Smart-Vertragsanwendungen anzuführen.

Darüber hinaus gab es einige wichtige technologische Motivationen für den Aufbau von Alephium:

1. Horizontale Skalierung durch Sharding
2. Viele der neuen Layer 1 (L1)-Blockchains sind ressourcenintensiv und machen es teuer, einen vollständigen Knoten zu betreiben, was langfristig zu einem Mangel an Dezentralisierung und Desintermediation führen kann. Alephiums Ansatz ähnelt dem von Bitcoin, bei dem jeder einen vollständigen Knoten (Full Node) betreiben und das Netzwerk überprüfen kann. _"Don't trust, verify."_
3. Viele neue L1-Blockchains verwenden das Account-Modell oder sind EVM-kompatibel und erben dessen Schwächen. Alephium hat eine neue virtuelle Maschine (VM) auf Basis des Unspent Transaction Output (UTXO)-Modells erstellt, um ein neues Programmierparadigma mit höherem Sicherheitsniveau für dezentrale Anwendungen (DApps) zu bieten.
4. Die meisten neuen L1-Blockchains verwenden den Proof-of-Stake (PoS)-Konsensmechanismus. Alephium hat sich dafür entschieden, auf dem Proof-of-Work (PoW) aufzubauen, da es ein einfacherer, konsistenterer und robusterer Konsensmechanismus für die Erreichung der Dezentralisierung ist.

### Unterstützt Alephium Smart Contracts?

Ja, Alephium unterstützt Smart Contracts. Es wurde speziell dafür entwickelt, ein skalierbares und sicheres Netzwerk für Smart Contracts und dezentrale Anwendungen zu sein.

### Warum beträgt die Blockzeit 64 Sekunden? Gibt es dafür einen bestimmten Grund?

Die Endgültigkeit (Finality) in Proof-of-Work (PoW)-Blockchains basiert auf der Menge an Arbeit, die in neuen Blöcken akkumuliert wird, anstatt auf der Blockzeit. Dies bedeutet, dass, wenn eine Transaktion N Blöcke mit einer Blockzeit T benötigt, um bestätigt zu werden, sie dann 2N Blöcke benötigen wird, um bestätigt zu werden, wenn die Blockzeit auf T/2 halbiert wird. Dies würde zu derselben Zeitspanne für die Bestätigung führen.

Obwohl kürzere Blockzeiten eine bessere Benutzererfahrung bieten, bringen sie auch einige Nachteile mit sich:

- Mehr Waisenblöcke werden produziert. Die Rate an Onkelblöcken im PoW-Netzwerk von Ethereum beträgt 10% oder mehr, während die Waisenblockrate bei Bitcoin weniger als 1% beträgt.
- Erhöhter Overhead im P2P-Netzwerk. Dieses Problem ist für PoS-Blockchains besonders schwerwiegend, da Berichte darauf hinweisen, dass bis zu 90% der Transaktionen auf Solana Validator-Nachrichten sind.

Um langfristig eine leichte und effiziente Blockchain zu gewährleisten, sollten solche Overheads vermieden werden. Daher startete Alephium mit einer Blockzeit von 64 Sekunden, die einen Kompromiss zwischen Bitcoin und neueren Blockchains mit kürzeren Blockzeiten darstellt.

Für diejenigen, die Blockzeiten und sofortige Endgültigkeit priorisieren, können Layer-2-Lösungen auf Alephium aufgebaut werden, und die Blockzeit kann in Zukunft verringert werden, wenn die Blockchain reift oder die Internetgeschwindigkeit zunimmt. Letztendlich ist eine leichte, skalierbare und effiziente Layer-1-Lösung für den Kryptowährungsraum unerlässlich.

### Wie lange dauert es, bis eine Transaktion durchgeführt wird?

1 Sekunde sollte ausreichen, um die eingehende Transaktion im Mempool zu sehen. Die Blockzeit von Alephium beträgt derzeit 64 Sekunden. Die ökonomische Endgültigkeit hängt von der Menge und Ihrem Risikomanagement ab. Für eine kleine Transaktion ist der Mempool wahrscheinlich ausreichend, und 1-4 Blöcke reichen für die meisten Transaktionen aus. Wenn Sie jedoch eine Börse beitreiben und mit großen Beträgen handeln, werden Sie wahrscheinlich auf einige Dutzend bis Hunderte von Blöcken warten.

Sie können mehr über das Konzept der Blockzeit und der Zeit bis zur Endgültigkeit in diesen Artikeln lesen:

- [Blockzeit & Blockgröße](https://medium.com/@alephium/block-time-and-block-size-16e37292444f)
- [Zeit bis zur Endgültigkeit](https://medium.com/@alephium/time-to-finality-17d64eeffd25)

### Warum habt ihr euch für PoLW entschieden und nicht für PoS?

Die Blockchain-Technologie befindet sich noch in ihren Anfangsphasen, und eine häufige Frage ist, welche Blockchain-Infrastruktur in den nächsten 10 Jahren für die Unterstützung von DApps, einschließlich DeFi, benötigt wird.

Alephium wurde mit der Überzeugung entwickelt, dass eine skalierbare Blocskchain mit hoher Durchsatzrate und niedrigen Transaktionsgebühren, kombiniert mit einem hohen Maß an Programmierbarkeit wie bei Ethereum sowie der Zuverlässigkeit und Sicherheit von Bitcoin, notwendig ist.  Das Ziel war es, einen "skalierbaren Bitcoin mit einer zuverlässigen Smart Contract-Lösung" zu schaffen.

Nach dem Lindy-Effekt ist trotz der jüngsten Erfolge mit PoS das Bitcoin-Modell und das Sharding mit PoW nach wie vor der robusteste und dezentralste Weg, um eine skalierbare Blockchain aufzubauen. Insbesondere:

- PoW ist einfach und robust und einfacher zu gestalten mit Sharding-Algorithmen.
- PoS wurde noch nicht über einen längeren Zeitraum getestet, und es bleibt abzuwarten, wie es sich nach dem PoS-Wechsel von Ethereum entwickelt.
- PoS neigt dazu, stärker zentralisiert und anfälliger für Zensur zu sein.
- PoS neigt dazu, die Vertrauenslosigkeit zu verringern, da die Kosten für den Betrieb eines Knotens erheblich höher sein können.
- PoS ist anfälliger für einige DeFi-Angriffe wie MEV.

### Was sind stateful UTXOs und wie unterscheiden sie sich von anderen UTXO-Modellen?

Es gibt zwei Arten von Zuständen in der Blockchain-Technologie: veränderlicher Zustand (wie in Ethereum) und unveränderlicher Zustand (wie bei UTXO oder eUTXO). Der veränderliche Zustand ist flexibler und ausdrucksstärker, wie es durch das lebendige Ökosystem von Ethereum belegt. Allerdings bietet das UTXO-Modell inhärente Sicherheitsvorteile.

[Alephium's stateful UTXO model](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) kombiniert die Vorteile beider. Es unterstützt veränderliche Zustände, wie sie für Smart Contracts in Ethereum zu finden sind, während es die Sicherheitsvorteile des UTXO-Modells für Vermögenswerte nutzt.

### Ist Alephium anfällig für die gleichen Konfliktprobleme wie das klassische und erweiterte UTXO-Modell, die zu einer niedrigen Transaktionen pro Sekunde (TPS) führen können??

Nein, Alephium hat diese Einschränkung nicht. Alephiums stateful UTXO-Modell kombiniert das klassische UTXO-Modell mit dem Account-Modell und unterstützt veränderliche Zustände. Dadurch können DApps parallelen Zugriff auf veränderliche Vertragszustände haben, was jede Möglichkeit von Konfliktproblemen ausschließt.

### Warum nicht 1 Million Shards haben?

Die Netzwerkanbindung ist der Hauptengpass für die Erhöhung der Anzahl der Shards. Jeder Knoten muss `2G - 1` andere Shards für die Konsistenz aufrechterhalten. Wenn die durchschnittliche Netzwerkbandbreite ausreicht, kann G so hoch wie 32 festgelegt werden. Obwohl auch einige Rechenüberlastungen vorhanden sind, bleibt die Netzwerkanbindung der hauptsächliche Engpass.

### Wie verläuft der Prozess, die Anzahl der Shards auf Alephium zu erhöhen?

Ein Upgrade des Netzwerks ist erforderlich, um die Anzahl der Shards zu erhöhen. Ein solches Upgrade erfolgt, wenn die vorhandene Anzahl von Shards nicht ausreicht, um die Netzwerklast zu bewältigen.

### Kann ein geschichtetes Netzwerk, insbesondere Alephium, mit weniger als 51 % Hashrate angegriffen werden? Zum Beispiel durch Kompromittieren nur einer Gruppe oder eines Shards?

Sicherheitsbedenken können bei geschichteten Blockchains auftreten, wenn sie nicht ordnungsgemäß gestaltet sind, wie Vitalik es in seiner Terminologie des "1% - Angriffs" erklärte. Ethereums Sharding-Ansatz hat dieses Problem mit dem Shuffeln der Validatorn gelöst.

Alephium hat es andererseits mit seinem Blockflow-Algorithmus gelöst. Die Mining-Arbeit über verschiedene Shards hinweg wird aufgrund von Blockabhängigkeiten akkumuliert. Ein Angreifer, der versucht, einen Shard neu zu organisieren, müsste auch alle seine Abhängigkeiten neu organisieren. Eine intuitive und vereinfachte Möglichkeit dies zu betrachten, ist, dass alle Shards miteinander Merge-Mining betreiben.

### Gibt es in Alephium eine atomare Transaktion zwischen Shards für Tokens und Smart Contracts?

Auf Alephium sind Tokens zwischen Shards atomar zusammensetzbar, was bedeutet, dass es möglich ist, Tokens in einer Transaktion atomar von einem Shard zu einem anderen Shard zu transferieren. Allerdings haben Smart Contracts im zustandsbasierten UTXO-Modell von Alephium Token- und Zustandskomponenten. Nur Tokens ermöglichen eine atomare Übergreifung zwischen Shards; die Zustände sind geschardet und daher nicht zusammensetzbar. Diese Designentscheidung spiegelt den tokenzentrierten Ansatz von Alephium wider und ermöglicht ein einfacheres Zustandsdesign, das einem partitionierten Datenbankmodell ähnelt. Dieser Kompromiss ist kostengünstiger als die aktuellen Trends auf Layer-2, die an atomarer Komposabilität von Tokens mangelt. Derzeit existiert keine praktische Lösung für eine vollständige Zustandskomposabilität.

### Sind Flash Loans auf Alephium möglich?

Nein, Flash Loans sind auf [Alephiums virtueller Maschine, Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025) nicht möglich.

### Wie werden Alephium-Adressen generiert? Gibt es eine Möglichkeit, eine Bitcoin Legacy-Adresse von einer Alephium-Adresse zu unterscheiden?

Alephium verwendet dieselbe Kurve wie Bitcoin (secp256k1-Kurve), um Adressen zu generieren, aber einen anderen Hash-Algorithmus (blake2b). Allerdings sind Alephium-Adressen normalerweise länger als Bitcoin-Adressen, da sie einen 32-Byte-Hash anstelle eines 20-Byte-Hash verwenden.

### Kann ich meine Mainnet-Adresse im Testnet verwenden?

Alephium-Adressen werden vom Algorithmus selbst generiert und sind netzwerkunabhängig (Testnet, Mainnet, Devnet usw.). Es ist nicht notwendig, mit einem Netzwerkknoten (oder sogar dem Internet) verbunden zu sein, um eine Wallet und Adressen zu erstellen. Jede Alephium-Adresse existiert im Grunde genommen in allen Netzwerken, auch in solchen, die noch nicht generiert/entdeckt wurden.

In früheren Krypto-Netzwerken enthielten Transaktionen keine Netzwerkinformationen und konnten auf anderen Netzwerken "wiedergegeben" werden. Es wurde daher nicht empfohlen, dieselben Adressen auf verschiedenen Netzwerken zu verwenden. Alephium enthält die Netzwerk-ID in seinen Transaktionen, daher ist es durchaus akzeptabel, dieselbe Adresse auf verschiedenen Netzwerken zu verwenden.

Wenn Sie Ihr Wallet mit einem Netzwerk verknüpfen, z. B. Testnet, können Sie einen Testnet-Knoten bitten, Ihr Adressguthaben zu überprüfen. Wenn Sie die Netzwerkeinstellungen Ihrer Wallet ändern, um sich mit dem Mainnet zu verbinden, zeigt ein Mainnet-Knoten Ihr Adressguthaben im Mainnetzwerk an. Jede Adresse hat also ein Guthaben in jedem Netzwerk, und Sie können das Guthaben Ihrer Adresse in diesem speziellen Netzwerk anzeigen, indem Sie sich damit verbinden.

### Warum hat Alephium beschlossen, seine eigene virtuelle Maschine und Programmiersprache für Smart Contracts zu entwicklen?

Das auf Alephium basierende [stateful UTXO model](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) ist völlig neuartig und nicht mit vorhandenen virtuellen Maschinen wie EVM kompatibel, die für das Account-Modell konzipiert wurden. Dies führte zur Entscheidung, eine neue virtuelle Maschine namens [Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025) zu erstellen, die speziell darauf ausgerichtet ist, die Stärken von sUTXO zu nutzen..

Ähnlich der EVM mit Solidity verfügt Alphred über eine domänenspezifische Sprache namens Ralph. Ralph wurde speziell für die Blockchain von Alephium entwickelt, um äußerst ausdrucksstark und benutzerfreundlich zu sein. Es wurde speziell darauf ausgelegt, sicherheitstechnisch durchdacht zu sein, indem die integrierten Funktionen der VM genutzt werden.

Durch die Erstellung seiner eigenen VM und seiner eigenen Smart-Contract-Sprache konnte Alephium eine bessere Alternative vorschlagen und einige der bekannten Sicherheitsprobleme von Solidity und der EVM mildern. Darüber hinaus wurde bei der Gestaltung von Alphred und Ralph die Entwicklererfahrung priorisiert, um einen einfachen Einstieg für Entwickler zu gewährleisten.

### Ist Alephium Quanten-Resistent?

Ähnlich wie bei Bitcoin und Ethereum betrachtet Alephium Quantencomputer nicht als unmittelbare Bedrohung. Die Hashing- und Signaturalgorithmen sowie die Adresskonstruktion können aktualisiert werden. Das Problem der Quantencomputer wird angegangen, wenn es zu einer signifikanteren Bedrohung wird.

## Tokenomics

### Was ist die niedrigstmögliche GAS-Gebühr?

Die aktuell niedrigstmögliche Gas-Gebühr beträgt `10^-7` ALPH oder `0.0000001` ALPH.

### Wie ist der Emissionszeitplan von Alephium? Gibt es bei Alephium Halbierungen der Block-Rewards?

Alephium hat keine Halbierungen wie Bitcoin. Sein Emissionszeitplan hängt von der Netzwerk-Hashrate und dem Zeitstempel ab. Die Mining-Rewards werden dynamisch mit jedem Block angepasst. Weitere Informationen dazu finden Sie in diesen Artikeln:

- [Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
- [Proof of Less Work](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)

### Wenn Token verbrannt werden, wird es in der Zukunft einen Zeitpunkt geben, an dem die Menge an existierenden ALPH nahezu null sein wird?

In der Theorie, ja. Die Vorhersage der Zukunft von Technologien über 10, geschweige denn 80 Jahre hinaus, ist schwierig. Für Blockchains wie Alephium ist es nicht ungewöhnlich, dass Richtlinien, wie beispielsweise der Emissionsplan, sich ändern, wenn sich Technologien weiterentwickeln. Wenn der Konsens einer Änderung des Emissionsplans zustimmt, wird die Änderung erfolgen.

### Wie wird die Obergrenze für die maximale Versorgung umgesetzt?

Die Obergrenze für die maximale Versorgung von 1 Milliarde ALPH ist eine Schätzung. Das Protokoll setzt eine Obergrenze für die Emissionen auf Grundlage eines Zeitstempels von etwa 80 Jahren um. Dies liegt daran, dass die Berechnung der Summe der Emissionen für eine gemeinsame Kette innerhalb des Protokolls rechenintensiv ist. Die Emissionsrate wird durch die Zeit bestimmt und variiert je nach Hash-Rate.

Es ist zu beachten, dass die Schätzung der 1-Milliarden-Obergrenze vor der Implementierung des verbesserten [DAA](https://github.com/alephium/alephium/blob/master/docs/proposals/lemanDAA.md) erfolgte. Mit dem aktuellen Code wird erwartet, dass die tatsächliche Obergrenze für die Emissionen und die maximale Versorgung mit ALPH in 80 Jahren weniger als 1 Milliarde beträgt, selbst ohne Berücksichtigung des Gebühren-Verbrennungsmechanismus POLW.

## Wallet

### Welche Art von Wallet bietet Alephium an?

Alephium bietet derzeit:

- Eine [Desktop wallet](https://github.com/alephium/desktop-wallet/releases/latest)
- Eine [Webextension Wallet](https://github.com/alephium/extension-wallet) verfügbar für [Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) und [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)
- Eine [Mobile Wallet](https://github.com/alephium/mobile-wallet) wird derzeit entwickelt.

Zusätzlich zu den offiziellen Wallets gibt es eine Reihe von Wallets von Drittanbietern.

### Ist geplant, dass Alephium von Hardware-Wallets unterstützt wird?

Die Unterstützung von Hardware-Wallets anzubieten, hat für Alephium hohe Priorität. Eine Integration von Ledger ist derzeit in Arbeit und wird im Entwicklermodus mit der Webextension-Wallet `v0.7.0` verfügbar sein.
Die offizielle Veröffentlichung auf Ledger ist ein längerer Prozess mit mehreren Phasen, der Zeit in Anspruch nehmen wird.

### Gibt es eine Möglichkeit beim Importieren meines Seeds in die Desktop Wallet, alle generierten Adressen zu importieren?

Nachdem Sie Ihre Wallet mithilfe der Wiederherstellungsphrase importiert haben, kann die Wallet nun das verbundene Netzwerk scannen, um alle aktiven Adressen zu finden, die Sie in der Vergangenheit verwendet haben. Eine aktive Adresse ist eine Adresse, die mindestens eine Transaktion aufweist. Für die manuelle Adresssuche gehen Sie zum Abschnitt "Adressen" und klicken Sie auf das Schraubenschlüssel-Symbol neben der Schaltfläche "+ Neue Adresse". Nachdem Sie auf die Schaltfläche "Suchen" in der Option "Aktive Adressen finden" geklickt haben, zeigt die Desktop-Wallet alle aktiven Adressen an, die mit dieser Wiederherstellungsphrase verknüpft sind.

### Welche Daten werden bei der Analyse der Desktop-Wallet gesammelt?

Alephium nimmt Bedenken hinsichtlich Datenschutz und Benutzererfahrung ernst. Das Aktivieren von Analysen kann tatsächlich dazu beitragen, die Benutzererfahrung zu verbessern, ohne die Privatsphäre zu beeinträchtigen. Die vom Desktop-Wallet gesammelten Informationen sind vollständig anonym. Bei der ersten Ausführung Ihres Wallets wird eine eindeutige ID generiert (zum Beispiel, `vCJGCsDPrZ8WJaIKZMWjU`) , die die einzige erforderliche Identifikationsinformation ist. IPs oder andere [persönliche Daten](https://posthog.com/blog/what-is-personal-data-pii) werden nicht erfasst. Es werden nur Klicks auf Schaltflächen, Anzahl der Wallets, Adressen, Kontakte und Wallet-Einstellungen erfasst. Diese Informationen helfen dabei, nützliche Funktionen und Verbesserungsbereiche zu identifizieren.
Der Open-Source-Code von Alephium ermöglicht es Benutzern, zu überprüfen, welche Ereignisse erfasst werden, indem sie [nach dem Schlüsselwort `posthog?.capture`](https://github.com/search?q=repo%3Aalephium%2Fdesktop-wallet+posthog?.capture&type=code) suchen.

### Warum wird meiner Transaktion beim Versuch, Tokens zu senden, zusätzlich 0,001 ALPH pro Token hinzugefügt?

Die `0.001` ALPH ist die minimalste Anforderung pro UTXO, um UTXO-Spamming zu vermeiden. Dieser Betrag wird vom Netzwerk nicht verbraucht und wird an die Zieladresse gelangen, genauso wie die Tokens.

### Warum ist es wichtig, Ihre geheimen Wiederherstellungsphrase zu sichern?

Das Sichern Ihrer geheimen Wiederherstellungsphrase ist entscheidend, da sie als der Hauptschlüssel zu Ihrem Wallet fungiert. Wenn Sie den Zugriff auf Ihr Wallet verlieren (z. B. durch Geräteverlust, Funktionsstörung oder App-Löschung), ist die geheime Wiederherstellungsphrase die einzige Möglichkeit, Ihre Mittel wiederherzustellen und darauf zuzugreifen. Ohne sie könnten alle im Wallet gespeicherten Vermögenswerte dauerhaft verloren gehen. Behandeln Sie sie daher mit äußerster Sorgfalt und bewahren Sie sie sicher und privat auf.

## Sonstiges

### Wo kann ich übersetzten Inhalt finden?

Sie können viele internationale und übersetzte Inhalte auf Medium, Twitter und Youtube finden.

Auf Twitter übersetzen folgende Community-Accounts Alephium-Tweets:

- [Deutsch](https://twitter.com/Alephiumde)
- [Französisch](https://twitter.com/Alephiumfr)
- [Bulgarisch](https://twitter.com/alephiumbg)
- [Indonesisch](https://twitter.com/Alephium_id)

Übersetzer werden ermutigt, die folgende Hashtag-Struktur zu verwenden, wenn sie übersetzten Inhalt veröffentlichen: #Alephium[i18n]. Sie können Übersetzungen auf Medium, Twitter und anderen Kanälen mit den folgenden Hashtags finden:

- Spanisch: "#AlephiumES"
- Portugisisch: "#AlephiumPT"
- Französisch: "#AlephiumFR"
- Deutsch: "#AlephiumDE"
- Bulgarisch: "#AlephiumBG"

Auf dem [Discord Server](https://alephium.org/discord) hat Alephium dedizierte internationale Kanäle.
Auf Telegramm stehen die folgenden Community-geführten Gruppen zur Verfügung:

- [Deutsch](https://t.me/alphgermanofficial)
- [Vietnamesisch](https://t.me/alephiumvn)
- [Russisch](https://t.me/alephiumgroup_ru)
- [Portugiesisch](https://t.me/Alephium_pt)
- [Türkisch](https://t.me/alephiumturkiye)
- [Niederländisch](https://t.me/AlephiumgroupNL)
- [Chinesisch](https://t.me/alephiumCN)

### Was gibt es Neues? 

Verfolgen Sie die Ankündigungskanäle von Alephium auf [Discord](https://discord.gg/AFXKJNVFKJ) und [Telegram](https://t.me/Alephium_Announcement).
Wir haben auch wöchentliche Entwicklungsaktualisierungen auf [Discord](https://alephium.org/discord), [Reddit](https://www.reddit.com/r/Alephium) & [Twitter](https://twitter.com/alephium).

### Warum wurde das Projekt mit Alephium benannt?

Der Name Alephium leitet sich von "Aleph" ab, einem Begriff, der auf Wikipedia wie folgt definiert ist: "Aleph-Zahlen sind eine Sequenz von Zahlen, die zur Darstellung der Kardinalität von unendlichen Mengen verwendet werden können, die gut angeordnet werden können. Sie wurden vom Mathematiker Georg Cantor eingeführt und sind nach dem Symbol benannt, das er zur Kennzeichnung verwendete, dem hebräischen Buchstaben Aleph (ℵ)."

Tatsächlich ist das Alephium-Logo eine stilisierte Version des Aleph-Buchstabens.

Als Anspielung auf die technischen Versprechen von Ethereum wurde Alephium nach einer ähnlichen Benennungskonvention benannt.

### Was ist das Leman Upgrade?

Am 30. März 2023 aktiviert, ist das [Leman Upgrade](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a) das erste Netzwerk-Upgrade des Alephium-Netzwerks. Es ist das Ergebnis von über einem Jahr harter Arbeit und Hingabe vieler Beitragenden und es stellt einen bedeutenden Meilenstein für das Projekt dar. Es ist der erste Schritt zum Wachstum des Alephium-Ökosystems, mit mehreren neuen Funktionen, die eine verbesserte Entwicklererfahrung für den Aufbau von dezentralen Anwendungen bieten.

### Wo kann ich alles über Alephium in 5 Minuten lernen?

Eine gute Übersicht finden Sie in der [Dokumentation](https://docs.alephium.org/) und zusätzliche Ressourcen finden Sie oben in diesem FAQ.

### WANN MOND?

1 ALPH ist immer 1 ALPH wert.
