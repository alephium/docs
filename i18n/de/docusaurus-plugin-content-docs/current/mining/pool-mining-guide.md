---
sidebar_position: 20
title: Pool Mining Leitfaden
sidebar_label: Pool Mining Leitfaden
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Pool Mining Leitfaden

Sie finden eine vollständige Liste bekannter Mining-Pools [auf diesem Link](#community-pools).

### Erstellen Sie Ihren eigenen Pool

Wenn Sie Ihren eigenen Mining-Pool hosten möchten, schauen Sie sich [dieses Repo hier](https://github.com/alephium/mining-pool/) an. Wenn Sie einen Pool erstellen, können Sie gerne einen Pull Request senden, um Ihren Pool der [Liste](#community-pools) hinzuzufügen.

### Beispiel-Node-Konfiguration für den Mining-Pool:

> Dieser Abschnitt richtet sich an Pool-Betreiber, nicht an Miner.

```
// mehr Verbindungen für bessere Blockpropagation
alephium.network.external-address = "<public IP for discovery>:9973"
alephium.network.max-outbound-connections-per-group = 48
alephium.network.max-inbound-connections-per-group  = 256

alephium.mining.miner-addresses = [4 miner addresses]

// kommentieren Sie die folgenden 2 Zeilen aus, wenn Sie nicht aus dem externen Netzwerk auf die REST-API zugreifen
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key = "<api key>"
```

## Community Pools

### ⚠️ Haftungsausschluss

Dies ist eine nicht erschöpfende Liste von Mining-Pools, die von der Community betrieben werden. Diese Pools werden in keiner Weise von Alephium unterstützt, und Alephium kann nicht für Ihre Auswahl des Pool verantwortlich gemacht werden. Obwohl die hier aufgeführten Pools sich bisher wie erwartet verhalten haben, sollten Sie bedenken, dass die Auswahl eines Pools erfordert, dass Sie einige Recherchen zur Sicherheit, Reputation und allgemeinen Sicherheit des Pools durchführen. Ein guter Ausgangspunkt ist, [die Community im Discord zu fragen](https://alephium.org/discord)

### Verwendung von Pools und wie Sie Unterstützung erhalten

Wir freuen uns, dass diese Liste von Pools wächst und vielfältiger wird. Probieren Sie sie aus. Wenn ein Pool zu groß wird, sollten Sie in Betracht ziehen, zu einem anderen Pool zu wechseln, um die Dezentralisierung zu fördern.

Alephium ist noch sehr neu, und es ist wichtig, dass Sie Updates im Auge behalten. Dies gilt auch für die Software, die zum Beitritt zu den Mining-Pools erforderlich ist. Beachten Sie, dass jeder Pool eine blühende Community mit Kanälen hat, die Ihre Supportanfragen und Fragen begrüßen. Daher ist es immer am besten, Ihre poolbezogenen Fragen in der entsprechenden Pool-Gruppe zu stellen. Sie finden möglicherweise auch Anleitungen in Ihrer eigenen Sprache in einer unserer [verfügbaren Community-Playlists hier](https://www.youtube.com/channel/UCIX9Eww2Kch7sc0E6gCmEdg/playlists).

### Aktuell bekannte und aktive Pools

Hier ist eine Liste von Mining-Pools in alphabetischer Reihenfolge. Wir ermutigen Sie, [einen Pull-Request zu senden](https://github.com/alephium/wiki/tree/master/docs/mining/pool-mining-guide.md) , um aufstrebende Pools zu dieser Wiki hinzuzufügen und/oder ihr Verschwinden sowie mögliches Fehlverhalten zu melden.

Sie können auch [https://miningpoolstats.stream/alephium](https://miningpoolstats.stream/alephium) überprüfen.

#### Alephium-pool (Community pool)

- Webseite: https://alephium-pool.com/
- Telegram: https://t.me/alephium_pool
- Discord: https://discord.gg/ZXYU2NGx

#### ALPH.city

- Webseite: https://alph.city/
- Telegram: https://t.me/alphcity

#### ALPH-pool.com

- Webseite: https://alph-pool.com/
- Telegram: https://t.me/ALPH_pool_chat

#### Alph2Mine.com

- Webseite: https://alph2mine.com/
- Email: alph2mine@gmail.com

#### Coinhunters Pool

- Webseite: https://alph.coinhunters.space
- Telegram (EN): https://t.me/alph_coinhunters_en
- Telegram (RU): https://t.me/alph_gravitsapapool_ru

#### e4pool ALPH Pool 

- Webseite: https://e4pool.com/alph
- Telegram: https://t.me/E4piko
- Support: https://t.me/e4pool_howto
- Forum: https://forum.e4pool.com/

#### Enigma Pool

- Webseite: https://enigmapool.com/
- Discord: https://discord.com/invite/enigmapool
- Calculator: https://enigmapool.com/tools/calculator

#### Herominers Pool

- Webseite: https://alephium.herominers.com/
- Discord: https://discord.com/invite/gvWSs84
- Telegram: https://t.me/HeroMinersPool

#### Metapool (Community pool)

- Webseite: https://www.metapool.tech
- Calculator: https://metapool.tech/dashboard#calculator
- Telegram: https://t.me/metapool1
- Discord: https://discord.gg/5TTzMDzJ

#### Okminer 

- Webseite (CN): https://okminer.com
- Calculator: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support

#### p1pool.com

- Webseite: https://p1pool.com/
- Telegram: https://t.me/p1pool_com
- Discord: https://discord.gg/U8dh97XHk8
- Email: info@p1pool.com

#### Soloblocks

- Webseite: https://soloblocks.org/alph/

#### Solopool.org

- Webseite: https://alph.solopool.org/
- Telegram: https://t.me/solopool_org
- Twitter: https://twitter.com/solopool_org
- Email: support@solopool.org

#### Wooly Pooly

- Webseite: https://woolypooly.com/en/coin/alph
- Calculator: https://woolypooly.com/en/calc/what-to-mine-gpu
- Discord: https://woolypooly.com/discord
- Telegram: https://woolypooly.com/telegram

⚠️ **Make sure you use the latest version of the mining software**

### Alephium GPU-Miner

- Download: [https://github.com/alephium/gpu-miner](https://github.com/alephium/gpu-miner)
- Support: [https://alephium.org/discord](https://alephium.org/discord)

### bzMiner

- Download: [https://www.bzminer.com/](https://www.bzminer.com/)
- Support: [https://discord.gg/NRty3PCVdB](https://discord.gg/NRty3PCVdB)

### lolMiner

- Download: [https://lolminer.site/download/](https://lolminer.site/download/)

### T-Rex

- Download: [https://trex-miner.com/](https://trex-miner.com/)

### SRBMiner

- Download: [https://www.srbminer.com/download.html](https://www.srbminer.com/download.html)

## If you have HiveOS or RaveOS related questions, these resources will help you

### Hive OS

- Webseite: [https://hiveos.farm](https://hiveos.farm)
- Forum: [https://hiveon.com/forum/](https://hiveon.com/forum/)
- Telegram: [https://t.me/hiveoschat_en](https://t.me/hiveoschat_en)
- Discord: [https://discord.gg/CVZeZdn](https://discord.gg/CVZeZdn)

### Rave OS

- Mail support: support@raveos.com
- Webseite: [https://raveos.com/](https://raveos.com/)
- Telegram: [https://t.me/raveossupport](https://t.me/raveossupport)
- Discord: [https://discord.gg/Dcdadz2](https://discord.gg/Dcdadz2)

### OKMiner Mobile OS 

- iOS: [https://apps.apple.com/ru/app/okminer-os/id1494087547](https://apps.apple.com/ru/app/okminer-os/id1494087547)
- Android: [https://downap.okminer.com/hashapk/okminer.apk](https://downap.okminer.com/hashapk/okminer.apk)
- Webseite (CN): https://okminer.com
- Kalkulator: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support
