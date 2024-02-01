---
sidebar_position: 20
title: Pool Mining Guide
sidebar_label: Pool mining guide
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

# Pool Mining Guide

You will find a complete list of known mining pools [on this link.](#community-pools)

### Build your own Pool

If you want to host your own mining pool, please checkout [the repo here](https://github.com/alephium/mining-pool/). If you create a pool, feel free to send a Pull Request to add your pool the [list](#community-pools).

### Example node configuration for mining pool:

> This section is for pool operators, not for miners.

```
// more connections for better block propagation
alephium.network.external-address = "<public IP for discovery>:9973"
alephium.network.max-outbound-connections-per-group = 48
alephium.network.max-inbound-connections-per-group  = 256

alephium.mining.miner-addresses = [4 miner addresses]

// comment out the following 2 lines if you don't access rest api from external network
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key = "<api key>"
```

## Community Pools

### ⚠️ Disclaimer

This is a non-exhaustive list of mining-pools that are driven by the community. These pools are in no way endorsed by Alephium and Alephium cannot be held responsible for your choice of Pool. While the pools listed here have behaved as expected so far, keep in mind that choosing a pool requires you to do some research regarding the security, reputation and general safety of the pool. A good place to start is to [ask the community on the Discord](https://alephium.org/discord)

### Using pools and how to get support

We’re happy to see this list of pools grow and diversify. Please give them a try. If one pool grows too big, consider switching to a different pool to enhance decentralization.

Alephium is still very new and it is important that you keep an eye on updates. This is also valid for the software needed to join the mining pools. Remember that each pool has a thriving community with channels welcoming your support requests and questions. Therefore it is always best to ask your pool-related questions in the concerned pool’s group. You may also find instructions in your own language in one of our [community playlists available here.](https://www.youtube.com/channel/UCIX9Eww2Kch7sc0E6gCmEdg/playlists)

### Currently known and active pools

Below is a list of mining pools in alphabetic order. We encourage you to [send a pull request](https://github.com/alephium/wiki/tree/master/docs/mining/pool-mining-guide.md) to add up-and-coming pools to this wiki and/or to report their disappearance as well as potential misbehavior.

You can also check [https://miningpoolstats.stream/alephium](https://miningpoolstats.stream/alephium).

#### Alephium-pool (Community pool)

- Website: https://alephium-pool.com/
- Telegram: https://t.me/alephium_pool
- Discord: https://discord.gg/ZXYU2NGx

#### ALPH.city

- Website: https://alph.city/
- Telegram: https://t.me/alphcity

#### ALPH-pool.com

- Website: https://alph-pool.com/
- Telegram: https://t.me/ALPH_pool_chat

#### Alph2Mine.com

- Website: https://alph2mine.com/
- Email: alph2mine@gmail.com

#### Cedric-CRISPIN.com
- Website: https://alephium.cedric-crispin.com/
- Twitter: https://twitter.com/Cedric_Crispin
- Email: webmaster@cedric-crispin.com

#### Cloudiko Pool

- Website: [https://cloudiko.io/](https://cloudiko.io/)
- Twitter: [https://twitter.com/Cloudiko_io](https://twitter.com/Cloudiko_io)
- Discord: [https://discord.gg/8sTGZf3Kpm](https://discord.gg/8sTGZf3Kpm)

#### Coinhunters Pool

- Website: https://alph.coinhunters.space
- Telegram (EN): https://t.me/alph_coinhunters_en
- Telegram (RU): https://t.me/alph_gravitsapapool_ru

#### e4pool ALPH Pool 

- Website: https://e4pool.com/alph
- Telegram: https://t.me/E4piko
- Support: https://t.me/e4pool_howto
- Forum: https://forum.e4pool.com/

#### Enigma Pool

- Website: https://enigmapool.com/
- Discord: https://discord.com/invite/enigmapool
- Calculator: https://enigmapool.com/tools/calculator

#### Herominers Pool

- Website: https://alephium.herominers.com/
- Discord: https://discord.com/invite/gvWSs84
- Telegram: https://t.me/HeroMinersPool

#### Metapool (Community pool)

- Website: https://www.metapool.tech
- Calculator: https://metapool.tech/dashboard#calculator
- Telegram: https://t.me/metapool1
- Discord: https://discord.gg/5TTzMDzJ

#### Okminer 

- Website (CN): https://okminer.com
- Calculator: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support

#### p1pool.com

- Website: https://p1pool.com/
- Telegram: https://t.me/p1pool_com
- Discord: https://discord.gg/U8dh97XHk8
- Email: info@p1pool.com

#### Soloblocks

- Website: https://soloblocks.org/alph/

#### Solopool.org

- Website: https://alph.solopool.org/
- Telegram: https://t.me/solopool_org
- Twitter: https://twitter.com/solopool_org
- Email: support@solopool.org

#### Vipor.net

- Website: https://vipor.net
- Discord: https://discord.gg/4tQU83Yq3Z
- Telegram: https://t.me/vipornet

#### Wooly Pooly

- Website: https://woolypooly.com/en/coin/alph
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

- Website: [https://hiveos.farm](https://hiveos.farm)
- Forum: [https://hiveon.com/forum/](https://hiveon.com/forum/)
- Telegram: [https://t.me/hiveoschat_en](https://t.me/hiveoschat_en)
- Discord: [https://discord.gg/CVZeZdn](https://discord.gg/CVZeZdn)

### Rave OS

- Mail support: support@raveos.com
- Website: [https://raveos.com/](https://raveos.com/)
- Telegram: [https://t.me/raveossupport](https://t.me/raveossupport)
- Discord: [https://discord.gg/Dcdadz2](https://discord.gg/Dcdadz2)

### OKMiner Mobile OS 

- iOS: [https://apps.apple.com/ru/app/okminer-os/id1494087547](https://apps.apple.com/ru/app/okminer-os/id1494087547)
- Android: [https://downap.okminer.com/hashapk/okminer.apk](https://downap.okminer.com/hashapk/okminer.apk)
- Website (CN): https://okminer.com
- Calculator: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support
