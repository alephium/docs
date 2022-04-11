---
sidebar_position: 20
title: Pool Mining Guide
---

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

We’re happy to see this list of pools grow and diversify. Please give them a try. Alephium is still very new and it is important that you keep an eye on updates. Remember that each pool has a thriving community with channels welcoming your support requests and questions. Therefore it is always best to ask your pool related questions in the concerned pool’s group. You may also find instructions in your own language in one of our [community playlists available here](https://www.youtube.com/channel/UCIX9Eww2Kch7sc0E6gCmEdg/playlists)

### Here is a list of mining pools in alphabetic order.

### Metapool (Community pool)

- Website: [https://www.metapool.tech](https://www.metapool.tech)
- Calculator: [https://metapool.tech/dashboard#calculator](https://metapool.tech/dashboard#calculator)
- Telegram: [https://t.me/metapool1](https://t.me/metapool1)
- Discord: [https://discord.gg/5TTzMDzJ](https://discord.gg/5TTzMDzJ)

### Wooly Pooly

- Website: [https://woolypooly.com/en/coin/alph](https://woolypooly.com/en/coin/alph)
- Calculator: [https://woolypooly.com/en/calc/what-to-mine-gpu](https://woolypooly.com/en/calc/what-to-mine-gpu)
- Discord: [https://woolypooly.com/discord](https://woolypooly.com/discord)
- Telegram: [https://woolypooly.com/telegram](https://woolypooly.com/telegram)

### Herominers Pool

- Website: [https://alephium.herominers.com/](https://alephium.herominers.com/)
- Discord: [https://discord.com/invite/gvWSs84](https://discord.com/invite/gvWSs84)
- Telegram: [https://t.me/HeroMinersPool](https://t.me/HeroMinersPool)

### Enigma Pool

- Website: [https://enigmapool.com/](https://enigmapool.com/)
- Discord: [https://discord.com/invite/enigmapool](https://discord.com/invite/enigmapool)
- Calculator: [https://enigmapool.com/tools/calculator](https://enigmapool.com/tools/calculator)

## Make sure you use the latest version of the mining software

### Alephium GPU-Miner

- Download: [https://github.com/alephium/gpu-miner](https://github.com/alephium/gpu-miner)
- Support: [https://discord.gg/JErgRBfRSB](https://discord.gg/JErgRBfRSB)

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
