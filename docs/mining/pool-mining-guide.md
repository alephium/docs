---
sidebar_position: 20
title: Pool Mining Guide
sidebar_label: Pool mining guide
---


## For Miner

Please follow instructions of the respective mining pool. You will
find a complete list of known mining pools [here](#community-pools).

For `HiveOS`, `RaveOS` or `OKMiner` related questions, these resources might help you:

- Hive OS: [Website](https://hiveos.farm), [Forum](https://hiveon.com/forum/), [Telegram](https://t.me/hiveoschat_en), [Discord](https://discord.gg/CVZeZdn)
- Rave OS: [Website](https://raveos.com), [Email](mailto:support@raveos.com), [Telegram](https://t.me/raveossupport), [Discord](https://discord.gg/Dcdadz2)
- OKMiner Mobile OS: [Website (CN)](https://okminer.com), [iOS](https://apps.apple.com/ru/app/okminer-os/id1494087547), [Android](https://downap.okminer.com/hashapk/okminer.apk), [Calculator](https://okminer.com/tools), [Telegram (CN)](https://t.me/okminer_CN), [Telegram (EN)](https://t.me/okminer_support)

## For Pool Operator

### Build your own Pool

If you want to host your own mining pool, please check out [the repo here](https://github.com/alephium/mining-pool/). If you create a pool, feel free to send a Pull Request to add your pool to the [list](#community-pools).

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


#### ANTPOOL

- Website: https://www.antpool.com/home
- Email: support@antpool.com
- Guide: https://antpoolsupport-hc.zendesk.com/hc/en-us/articles/33026304706841-ANTPOOL-ALPH-Alephium-Mining-Tutorial
- Telegram: https://t.me/AntPoolOffical
- Twitter/X: https://x.com/AntPoolofficial
- Youtube: https://www.youtube.com/@antpooltech

#### Alephium-pool (Community pool)

- Website: https://alephium-pool.com/
- Discord: https://discord.gg/ZXYU2NGx
- Guide: https://alephium-pool.com/instruction.html
- Telegram: https://t.me/alephium_pool

#### Alph2Mine.com

- Website: https://alph2mine.com/
- Email: alph2mine@gmail.com

#### Cedric-CRISPIN.com

- Website: https://alephium.cedric-crispin.com/
- Discord: https://discord.gg/8sTGZf3Kpm
- Email: webmaster@cedric-crispin.com
- Guide: https://alephium.cedric-crispin.com/start-mining/
- Twitter: https://twitter.com/Cedric_Crispin

#### Cloudiko Pool

- Website: https://cloudiko.io/
- Discord: https://discord.gg/8sTGZf3Kpm
- Twitter: https://twitter.com/Cloudiko_io

#### Coinmore.io

- Website: https://coinmore.io/coin/alephium/
- Calculator: https://coinmore.io/calculator/?coin=alephium
- Discord: https://discord.com/invite/FSXWEUGmEK
- Guide: https://coinmore.io/coin/alephium/instructions/

#### DXPool

- Website: https://www.dxpool.com/
- Discord: https://discord.gg/SD3wYt5AaJ
- Email: support@dxpool.com
- Github: https://github.com/dxpool
- Guide: https://www.dxpool.com/help/en/alph-mining-tutorial
- Telegram: https://t.me/globaldxpool 
- Twitter/X: https://x.com/dxpoolofficial

#### E4pool ALPH Pool 

- Website: https://e4pool.com/alph
- Forum: https://forum.e4pool.com/
- Support: https://t.me/e4pool_howto
- Telegram: https://t.me/E4piko

#### F2Pool

- Website: https://www.f2pool.com/
- Discord: https://discord.com/invite/A4CfrUUxY6
- Email: support@f2pool.com
- Guide: https://f2pool.zendesk.com/hc/en-us/articles/29518911466265-How-to-mine-Alephium
- Reddit: https://www.reddit.com/r/f2pool/
- Telegram: https://t.me/f2poolreal
- Twitter/X: https://x.com/f2pool_official

#### Herominers Pool

- Website: https://alephium.herominers.com/
- Discord: https://discord.com/invite/gvWSs84
- Telegram: https://t.me/HeroMinersPool
- Twitter: https://x.com/herominerss

#### HumPool

- Website: https://humpool.com/
- Discord: https://discord.gg/NYaK98qXxn
- Guide: https://www.humpool.com/pool/help?type=alph
- Telegram: https://t.me/HumPoolOfficial

#### JJPool

- Website: https://jjpool.fr/#/alph
- Discord: https://discord.gg/X7UsCQTy73


#### K1Pool

- Website: https://k1pool.com/
- Calculator: https://k1pool.com/dashboard
- Discord: https://discord.com/invite/gSdJXFk
- Email: contact@k1pool.com
- Guide: https://k1pool.com/pool/alph/how-to-start
- Telegram: https://t.me/k1pool
- Twitter: https://twitter.com/K1Pool

#### Kryptex Pool

- Website: https://pool.kryptex.com/alph
- Calculator: https://www.kryptex.com/en/mining-calculator
- Discord: https://discord.gg/ejyx9PkCW3
- How to create wallet: https://pool.kryptex.com/en/articles/alephium-wallet-en
- How to mine ALPH: https://pool.kryptex.com/en/articles/how-to-mine-alephium-en
- Table of the best GPUs for mining ALPH: https://www.kryptex.com/best-gpus-for-mining
- Telegram: https://t.me/kryptex_chat_en
- Twitter: https://www.twitter.com/KryptexMining

#### Okminer 

- Website (CN): https://okminer.com
- Calculator: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support

#### P1pool.com

- Website: https://p1pool.com/
- Discord: https://discord.gg/U8dh97XHk8
- Email: info@p1pool.com
- Telegram: https://t.me/p1pool_com

#### Solopool.org

- Website: https://alph.solopool.org/
- Email: support@solopool.org
- Guide: https://alph.solopool.org/help
- Telegram: https://t.me/solopool_org
- Twitter: https://twitter.com/solopool_org

#### Tw-pool.com

- Website (CN): https://tw-pool.com/stats/alephium
- Discord: https://discord.gg/UT65Tctm9t

#### Vipor.net

- Website: https://vipor.net/mine/alph
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
