---
sidebar_position: 0
sidebar_label: Genel Bakış
slug: /
title: Alephium Genel Bakış
---

## Alephium Nedir?

**Geliştiriciler için Ölçeklenebilir. Kullanıcılar için Güvenli. Herkes için Merkeziyetsiz.**

Yenilikçi sharding, ifade edici sUTXO ve etkin Az İş Kanıtı ile gerçek dünya kullanım durumları için ölçeklenebilir dApps'leri güvence altına alıyor.

---

## Alephium'u Özel Yapan Nedir?

Harika bir ekip, olağanüstü bir topluluk ve çok fazla enerjinin yanı sıra, işte teknik özelliklerimiz:

**Sharding ile ölçeklenir**. Alephium, BlockFlow adlı yeni ve bütün bir sharding algoritması üzerine inşa edilmiştir. BTC'nin UTXO modelini ölçeklendirmek için iyileştirir ve farklı shardlar arasında uzlaşma sağlamak için DAG veri yapısını kullanır. Bu, Şu anda Bitcoin'in 7 TPS'sine kıyasla 10.000 İşlem/s'ye kadar izin verecektir (şu anda 400 TPS'den fazla).

**Programlanabilir ve güvenli**. Alephium, ETH üzerinde uygulanan hesap modeli kadar programlanabilirlik sunan bir durumlu UTXO modeli önerirken daha güvenlidir.

**POLW sayesinde daha az enerji tüketiyor**. Az İş Kanıtı, yeni blokları madencilik için gereken işi dinamik olarak ayarlamak için fiziksel işi ve Coin ekonomisini birleştirir. Aynı ağ koşulları verildiğinde, Alephium Bitcoin'e kıyasla enerjinin sadece 1/8'ini kullanır.

**Kendi özel VM'si (Alphred) ile zincir yapısını iyileştiriyor**. Güvenlik, geliştirme deneyimi ve güvenilmez P2P akıllı sözleşme işlemleri gibi yeni paradigma tanıtımlarıyla mevcut dApps platformlarının birçok eleştirisini çözer.

**dApps için kendi programlama diline sahiptir**. Ralph, isminden de anlaşılacağı gibi Rust sözdizimine benzer. Örneğin Solidity'den daha kolay ve güvenli akıllı sözleşmeler oluşturmayı sağlar. Merkezi Olmayan Finans uygulamalarının oluşturulmasını kolaylaştırmak için özel olarak tasarlanmıştır!

Tüm bu yenilikleri bir araya getirerek, Alephium endüstride çok talep edilen bir çözüm sunar: güvenilir, güçlü ve güvenli DeFi ve dApps yetenekleri sunan Bitcoin'den olgun fikirleri iyileştiren ölçeklenebilir bir blockchain. Ve canlıyız!

**[Whitepaper'larımızı][whitepaper] kontrol edin!**

---

## Token Ekonomimiz

Alephium'daki token arzı, 1 milyarlık bir hard cap ile sınırlıdır. Ana Ağ Başlatma Tarihi'nde (8 Kasım 2021), 140M tokenlik başlangıç arzı (hard cap'in %14'ü) genesis bloğu ile çıkarıldı. Kalan ALPH token arzı yaklaşık 80 yıl içinde çıkarılacaktır. Bu 140M tokenin:

80M token (8%) 🤝 **Ön satışlar ve gelecekteki stratejik özel satışlar**. 2 ile 4 yıl arasında değişen kilitleme süreleri.

30M token (3%) 💡 **Topluluk ve ekosistem geliştirme**. 4 yıl boyunca zincir üzerinde kilitli ve her çeyrekte kilitleme.

30M token (3%) 🧑‍💻 **Hazine & Ekip**. 3 yıl boyunca zincir üzerinde kilitli ve her çeyrekte kilitleme.

860M token (86%) 🌊 **Madencilik Ödülleri**. Bu tokenler önümüzdeki yaklaşık 80 yıl boyunca madencilik ödülleri için kullanılacaktır. Bunlar, Alephium blockchain'de işlemlerin işlenmesini ve akıllı sözleşmelerin yürütülmesini sağlar.

Ayrıca, tüm işlem ücretleri her blokta yakılır ve Hash oranı ve enerji tüketimi önemli ölçüde yüksek olduğunda iç madencilik maliyetini POLW ile sağlar.


### Toplam Arz ve Dolaşımdaki Arz

Toplam Arz, Genesis Bloğu'nda çıkarılan tokenlerin (yukarıdaki dağılıma bakınız) ve Ana Ağ Başlatma Tarihi'nden bu yana blok ödüllerinin toplanmasıyla hesaplanır.

Alephium, CMC yöntemini kullanarak ALPH'nin dolaşımdaki arzını hesaplar. Bu, var olan tüm ALPH'nin (özel satış yatırımcılarının kilitleme ve kilidini açma dahil) toplamından, hazine, ekosistem, danışmanlar/sözleşmeli çalışanlar, proje tarafından kontrol edilen varlıklar ve diğer adreslerdeki tüm kilitli ALPH'ler çıkarılarak yapılır.
Genel olarak, dolaşımdaki arzımızı [explorer](https://explorer.alephium.org/#/blocks) sayfamızın ana sayfasında bulabilirsiniz. Coin Market Cap metodolojisinin daha detaylı bir açıklamasını istiyorsanız, [buradan](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-) bulabilirsiniz.

Eğer endpoint'lere ihtiyacınız varsa, onları buradan bulabilirsiniz: [Toplam Arz](https://mainnet-backend.alephium.org/infos/supply/total-alph) = [Dolaşımdaki Arz](https://mainnet-backend.alephium.org/infos/supply/circulating-alph) + [Rezerv Arz](https://mainnet-backend.alephium.org/infos/supply/reserved-alph) + [Kilitli ALPH](https://mainnet-backend.alephium.org/infos/supply/locked-alph)

**Tokenomics Medium makalemizde daha fazla detay bulabilirsiniz.**

---

## Eğer bir geliştiriciyseniz, buradan başlayın

En son [GitHub'daki düğüm sürümümüzü][node-release] bulun.

Ana projelerimize keşfedin ve katkıda bulunun [GitHub'da][github]:

- [Tam düğüm][full-node]
- [Masaüstü cüzdanı][desktop-wallet]
- [Mobil cüzdan][mobile-wallet]
- [Araştırıcı][explorer]
- [Web3 SDK][web3-sdk]
- [Uzantı Cüzdanı][extension-wallet-repo]
- [Cüzdan Bağlantısı][walletconnect-repo]
- [Köprü][wormhole-fork-repo]
- [Harika Alephium][awesome]
- [Dokümantasyon][docs]

### Alephium üzerinde bir şey mi inşa ediyorsunuz?

İlk olarak [Web3 SDK][web3-sdk] ile başlayın ve eğer bir dApp inşa ediyorsanız, [buraya](./dapps/Getting-Started) gidin. Yayınlandığında, projenizi [Harika Alephium][awesome] eklemek için bir PR göndererek herkese bildirin! Alephium [Marka Kılavuzu][brand-guide] ayrıca işinize yarayabilir.

[Ödül ve Hibeler Programı][reward-grant]

## Eğer bir madenciseniz, buradan başlayın

İlk olarak, Discord'taki [Madencilik kanalına katılarak][mining-discord] başlayın.

GitHub'daki [Madenci başlangıç paketimizi][miner-starter-pack] bulun.

Ve özel depolar:

- https://github.com/alephium/gpu-miner
- https://github.com/alephium/fpga-miner
- https://github.com/alephium/mining-pool

İşte [tek başına madenciliğe nasıl başlanır][solo-mining-video] videomuz.

Ve eğer bir havuza katılmak isterseniz, [Havuz Madenciliği Kılavuzunda](./mining/pool-mining-guide) mevcut havuzların listesini bulacaksınız.

---

## Kilometre Taşları ve Yol Haritası

[Tamamlanan Kilometre Taşları][milestones]

[Yol Haritası][roadmap]

---

## [Satın Al/Sat][markets]

⚠️ Bazı çiftlerin likiditesi düşüktür, bir varlık veya köprüleme seçerken her zaman likiditeyi kontrol edin.

---

## Alephium Topluluğuna Katılın!

### Konuşun

- [Discord][discord]
- [Telegram][telegram]
- [Reddit][reddit]

### Bağlantı Kurun

- [Twitter][twitter]
- [LinkedIn][linkedin]
- [Facebook][facebook]

### Okuyun, kurun, keşfedin, katkıda bulunun

- [Website][website]
- [Whitepaper'lar][whitepaper]
- [Medium][medium]
- [GitHub][github]

---

## Resmi Olmayan İçerikler ve Topluluklar

:::info
Alephium tarafından denetlenmemiş, onaylanmamış veya yönetilmemiştir
:::

Tüm uluslararası kanal listesini [burada](./misc/Internationalization-and-Localization) bulabilirsiniz.

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

## Ortaklarımız

- [Bitcoin Derneği İsviçre](https://medium.com/@alephium/alephium-becomes-a-member-of-bitcoin-association-switzerland-2293fec16fc9)
- [Cetacean Capital](https://cetacean.capital/)
- [Crypto Valley Derneği](https://cryptovalley.swiss/)
- [Dappnode](https://dappnode.io)
- [Ergo](https://ergoplatform.org/)
- [Flux Labs](https://runonflux.io/fluxlabs.html)
- [Hodling SA](https://www.hodling.ch/)
- [UTXO İttifakı](https://utxo-alliance.org/)



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
