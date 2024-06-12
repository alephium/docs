---
sidebar_position: 20
title: Havuz Madenciliği Kılavuzu
sidebar_label: Havuz madenciliği kılavuzu
---

# Havuz Madenciliği Kılavuzu

Tüm bilinen madencilik havuzlarının tam listesini [bu bağlantıda bulabilirsiniz.](#community-pools)

### Kendi Havuzunuzu Oluşturun

Kendi madencilik havuzunuzu barındırmak istiyorsanız, lütfen [buradaki depoya bakınız](https://github.com/alephium/mining-pool/). Bir havuz oluşturursanız, havuzunuzu [listeye eklemek için bir Pull Request göndermekten](#community-pools) çekinmeyin.

### Madencilik havuzu için örnek düğüm yapılandırması:

> Bu bölüm, madencilik havuzu işletmecileri içindir, madenciler için değil.

```
// Blok propagasyonunu artırmak için daha fazla bağlantı
alephium.network.external-address = "<public IP for discovery>:9973"
alephium.network.max-outbound-connections-per-group = 48
alephium.network.max-inbound-connections-per-group  = 256

alephium.mining.miner-addresses = [4 miner addresses]

// Dış ağdan rest api'ye erişmiyorsanız aşağıdaki 2 satırın yorum satırına alın
alephium.api.network-interface = "0.0.0.0"
alephium.api.api-key = "<api key>"
```

## Topluluk Havuzları

### ⚠️ Uyarı

Bu, topluluk tarafından yönlendirilen madencilik havuzlarının eksiksiz bir listesi değildir. Bu havuzlar, Alephium tarafından onaylanmamıştır ve Alephium, Havuzunuzun seçimi için sorumlu tutulamaz. Burada listelenen havuzlar şimdiye kadar beklenildiği gibi davranmış olsa da, havuz seçimiyle ilgili güvenlik, itibar ve genel güvenlikle ilgili bazı araştırmalar yapmanız gerektiğini unutmayın. Bir yere başlamak için [Discord'da topluluktan yardım isteyebilirsiniz.](https://alephium.org/discord)

### Havuzları Kullanma ve Destek Alma

Bu havuz listesinin büyüdüğünü ve çeşitlendiğini görmekten mutluluk duyuyoruz. Lütfen onları deneyin. Bir havuzun çok büyümesi durumunda, merkezsizleşmeyi artırmak için farklı bir havuza geçmeyi düşünün.

Alephium hala çok yeni ve güncellemeleri takip etmeniz önemlidir. Bu, madencilik havuzlarına katılmak için gereken yazılım için de geçerlidir. Unutmayın ki her havuzun, destek taleplerinizi ve sorularınızı karşılayan kanalları olan aktif bir topluluğu vardır. Bu nedenle, havuzla ilgili sorularınızı ilgili havuz grubuna sormak her zaman en iyisidir. Ayrıca, kendi dilinizde talimatlarımızı [buradaki topluluk çalma listelerinden birinde bulabilirsiniz.](https://www.youtube.com/channel/UCIX9Eww2Kch7sc0E6gCmEdg/playlists)

### Şu anda bilinen ve aktif havuzlar

Aşağıda, alfabetik sıraya göre sıralanmış madencilik havuzlarının bir listesi bulunmaktadır. Bu wiki'ye yükselen ve giden havuzları eklemek için [bir pull request göndermek](https://github.com/alephium/wiki/tree/master/docs/mining/pool-mining-guide.md) veya potansiyel kötü davranışlarını bildirmek için de göndermekten çekinmeyin.

Ayrıca [https://miningpoolstats.stream/alephium](https://miningpoolstats.stream/alephium) adresinden kontrol edebilirsiniz.

#### Alephium-havuz (Topluluk havuzu)

- Web sitesi: https://alephium-pool.com/
- Telegram: https://t.me/alephium_pool
- Discord: https://discord.gg/ZXYU2NGx

#### ALPH.city

- Web sitesi: https://alph.city/
- Telegram: https://t.me/alphcity

#### ALPH-havuz.com

- Web sitesi: https://alph-pool.com/
- Telegram: https://t.me/ALPH_pool_chat

#### Alph2Mine.com

- Web sitesi: https://alph2mine.com/
- E-posta: alph2mine@gmail.com

#### Cedric-CRISPIN.com

- Web sitesi: https://alephium.cedric-crispin.com/
- Twitter: https://twitter.com/Cedric_Crispin
- E-posta: webmaster@cedric-crispin.com

#### Cloudiko Havuzu

- Web sitesi: [https://cloudiko.io/](https://cloudiko.io/)
- Twitter: [https://twitter.com/Cloudiko_io](https://twitter.com/Cloudiko_io)
- Discord: [https://discord.gg/8sTGZf3Kpm](https://discord.gg/8sTGZf3Kpm)

#### Coinhunters Havuzu

- Web sitesi: https://alph.coinhunters.space
- Telegram (EN): https://t.me/alph_coinhunters_en
- Telegram (RU): https://t.me/alph_gravitsapapool_ru

#### e4pool ALPH Havuzu

- Web sitesi: https://e4pool.com/alph
- Telegram: https://t.me/E4piko
- Destek: https://t.me/e4pool_howto
- Forum: https://forum.e4pool.com/

#### Enigma Havuzu

- Web sitesi: https://enigmapool.com/
- Discord: https://discord.com/invite/enigmapool
- Hesap makinesi: https://enigmapool.com/tools/calculator

#### Herominers Havuzu

- Web sitesi: https://alephium.herominers.com/
- Discord: https://discord.com/invite/gvWSs84
- Telegram: https://t.me/HeroMinersPool

#### Metapool (Topluluk havuzu)

- Web sitesi: https://www.metapool.tech
- Hesap makinesi: https://metapool.tech/dashboard#calculator
- Telegram: https://t.me/metapool1
- Discord: https://discord.gg/5TTzMDzJ

#### Okminer

- Web sitesi (CN): https://okminer.com
- Hesap makinesi: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support

#### p1pool.com

- Web sitesi: https://p1pool.com/
- Telegram: https://t.me/p1pool_com
- Discord: https://discord.gg/U8dh97XHk8
- E-posta: info@p1pool.com

#### Soloblocks

- Web sitesi: https://soloblocks.org/alph/

#### Solopool.org

- Web sitesi: https://alph.solopool.org/
- Telegram: https://t.me/solopool_org
- Twitter: https://twitter.com/solopool_org
- E-posta: support@solopool.org

#### Vipor.net

- Web sitesi: https://vipor.net
- Discord: https://discord.gg/4tQU83Yq3Z
- Telegram: https://t.me/vipornet

#### Wooly Pooly

- Web sitesi: https://woolypooly.com/en/coin/alph
- Hesap makinesi: https://woolypooly.com/en/calc/what-to-mine-gpu
- Discord: https://woolypooly.com/discord
- Telegram: https://woolypooly.com/telegram

⚠️ **Lütfen madencilik yazılımının en son sürümünü kullanın**

### Alephium GPU-Miner

- İndir: [https://github.com/alephium/gpu-miner](https://github.com/alephium/gpu-miner)
- Destek: [https://alephium.org/discord](https://alephium.org/discord)

### bzMiner

- İndir: [https://www.bzminer.com/](https://www.bzminer.com/)
- Destek: [https://discord.gg/NRty3PCVdB](https://discord.gg/NRty3PCVdB)

### lolMiner

- İndir: [https://lolminer.site/download/](https://lolminer.site/download/)

### T-Rex

- İndir: [https://trex-miner.com/](https://trex-miner.com/)

### SRBMiner

- İndir: [https://www.srbminer.com/download.html](https://www.srbminer.com/download.html)

## Eğer HiveOS veya RaveOS ile ilgili sorularınız varsa, bu kaynaklar size yardımcı olacaktır

### Hive OS

- Web sitesi: [https://hiveos.farm](https://hiveos.farm)
- Forum: [https://hiveon.com/forum/](https://hiveon.com/forum/)
- Telegram: [https://t.me/hiveoschat_en](https://t.me/hiveoschat_en)
- Discord: [https://discord.gg/CVZeZdn](https://discord.gg/CVZeZdn)

### Rave OS

- E-posta desteği: support@raveos.com
- Web sitesi: [https://raveos.com/](https://raveos.com/)
- Telegram: [https://t.me/raveossupport](https://t.me/raveossupport)
- Discord: [https://discord.gg/Dcdadz2](https://discord.gg/Dcdadz2)

### OKMiner Mobil İşletim Sistemi

- iOS: [https://apps.apple.com/ru/app/okminer-os/id1494087547](https://apps.apple.com/ru/app/okminer-os/id1494087547)
- Android: [https://downap.okminer.com/hashapk/okminer.apk](https://downap.okminer.com/hashapk/okminer.apk)
- Web sitesi (CN): https://okminer.com
- Hesap makinesi: https://okminer.com/tools
- Telegram (CN): https://t.me/okminer_CN
- Telegram (EN): https://t.me/okminer_support
