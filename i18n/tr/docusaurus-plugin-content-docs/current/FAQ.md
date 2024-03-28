---
sidebar_position: 1
slug: /frequently-asked-questions
sidebar_label: SSS
title: Sıkça Sorulan Sorular
---

:::info
📚 Alephium'a bu [5 dakikalık özetle](/) genel bir bakış atarak her şeyi öğren.
:::

Daha derine inmeden önce, Alephium hakkında faydalı bilgiler sunabilecek aşağıdaki kaynaklara göz atmanı öneririz:

- [Resmi Web Sitesi](https://alephium.org)
- [Resmi Twitter](https://twitter.com/alephium)
- [Resmi Discord](https://alephium.org/discord)
- [Resmi Telegram](https://t.me/alephiumgroup)
- [Resmi Reddit](https://reddit.com/r/Alephium)
- [Resmi Medium](https://medium.com/@alephium), özellikle şunlara dikkat et:
  - [Alephium'un Token Ekonomisi](https://medium.com/@alephium/tokenomics-of-alephium-61d59b51029c)
  - [Alephium'un Blok Ödülleri](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)
  - [Alephium'un Topluluk Ödül Programı](https://medium.com/@alephium/introducing-community-rewards-f4638bbf14bf)
  - [Proof-of-Less-Work'e Kapsamlı Bakış...](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)
  - [sUTXO'ya Giriş](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
  - [ALPHred, Sanal Makine](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025)
  - [Leman Ağ Güncellemesi Yayında!](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a)

## Zincir Verileri

### Dolaşımda ne kadar ALPH var?

Dolaşımdaki supply'ı Alephium [Explorer](https://explorer.alephium.org)'da bulabilir veya [dolaşımdaki ALPH endpoint'ini](https://backend.mainnet.alephium.org/infos/supply/circulating) kullanabilirsin.

### Dolaşımdaki supply nasıl hesaplanıyor?

[CoinMarketCap'in metodolojisine](https://support.coinmarketcap.com/hc/en-us/articles/360043396252-Supply-Circulating-Total-Max-) göre hesaplanıyor.

Dolaşımdaki supply, varolan ALPH miktarı eksi şunlara eşittir:

- Özel satış katılımcıları ve proje/takım kontrolündeki adreslerin tam bakiyesi (kilitli & kilitsiz). CMC'ye göre: _"token'lar genellikle orijinal rezerv cüzdanından çıktıktan sonra dolaşımdaki olarak sayılırlar (yani giden transferler, bir coin'i dolaşıma sokma niyetini kilit açmaktan daha iyi yansıtır)"_.
- Diğer adreslerdeki tüm kilitli ALPH'lar.

### Cüzdan bakiyelerini ve en çok tutan adresleri nereden kontrol edebilirim?

Belirli bir cüzdanın bakiyesini kontrol etmek için en iyi seçeneğin [Explorer](https://explorer.alephium.org). Topluluğun üyeleri en çok tutan adresleri listeleyen bir [Alph Richlist](https://alph-richlist.vercel.app/) oluşturdu.

Ayrıca sarılı (wrapped) ALPH/erc20 sahiplerini [etherscan.io](https://etherscan.io/token/0x590F820444fA3638e022776752c5eEF34E2F89A6#balances) adresinden de bulabilirsin.

### Minimum İşlem Ücreti nedir?

Şu anda, ağa yönelik DoS saldırılarını önlemek için minimum işlem ücreti `0.002` ALPH olarak belirlenmiştir. Gelecekte, bu minimum ücret düşürülebilir ve Alephium'daki en düşük minimum işlem ücreti `0.00000000000001` ALPH olabilir. Kesin işlem ücreti, söz konusu işlemdeki girdi (UTXO'lar) ve imzalayanların sayısına bağlıdır.

### Alephium'da Saniye Başına Kaç İşlem (TPS) mümkün?

Alephium Ana Ağı (Mainnet) şu anda 16 shard ile 400'ün üzerinde TPS'i destekleyebilmektedir. Gerektiğinde shard sayısını artırarak 10k TPS'in üzerine çıkabilir.  
[TPS konsepti](https://medium.com/@alephium/transactions-per-second-tps-f13217a49e39) hakkında daha fazla bilgiye ulaşabilirsin.

### Alephium'un en küçük birimi nedir?

Alephium 18 ondalık basamağa kadar imkan verir ve en küçük birimine Phi adı verilmiştir. Phi, `0.000000000000000001` ALPH'a, veya `10^-18` ALPH'a eşittir; 1 ALPH ise `10^18` Phi karşılık gelir.

## dApp'ler

### Alephium'un DEX'i var mı?

Alephium'un Testnet'te çalışan bir [DEX prototipi](https://alephium.github.io/alephium-dex/#/swap) var. [DEX prototipi makalesinden](https://medium.com/@alephium/dex-prototype-live-on-testnet-bac5e7d095ce) daha fazla bilgi edinebilirsin.

[DEX kontratları](https://github.com/alephium/alephium-dex/tree/master/contracts) ana geliştiriciler tarafından kapsamlı şekilde test edildi ve güvenli, verimli bir yapıları var. Projeler için kolayca kopyalanıp (fork) kullanılabilirler. 

### Alephium üzerinde herhangi bir dApp var mı?

Alephium üzerinde şimdiye kadar geliştirilenlerin çoğu [Muhteşem Alephium (Awesome Alephium) reposunda](https://github.com/alephium/awesome-alephium) listelenmiştir. Sen de katkıda bulunmak için, bir Pull Request gönder!

Alephium henüz çok erken bir aşamada ve dApp'lerin geliştirilmesini kolaylaştıracak altyapı (bir [köprü](https://github.com/alephium/wormhole-fork) dahil) ve dokümantasyon sürekli olarak geliştiriliyor. Alephium, projen için temel veya ilham kaynağı olarak kullanabileceğin bir dizi [bakımlı prototipe](https://docs.alephium.org/dapps/ecosystem#prototypes) sahip.

Bir dApp geliştirmek istiyorsan, [dApp'lere Başlarken kılavuzumuza](https://docs.alephium.org/dapps/getting-started) göz at.

### dApp neden yalnızca bir adresime bağlanabiliyor?

Alephium, shard'lı (parçalı) bir blockchain olarak çalışır; adresler ve kontrat durumları çeşitli gruplara düzenlenir. Söz konusu dApp'lere gelince, bunlar bu gruplardan herhangi birine dağıtılmış olabilirler. Ancak, şöyle bir durum var — dApp'ler yalnızca aynı gruptaki adresler tarafından kullanılabilir.

Bu yüzden, bir dApp'e bağlandığında, özellikle dApp'le aynı grupta olan adreslerle bağlantı kurması istenecek. Bu gruplama sistemi, Alephium'un shard'lı yapısında her şeyin sorunsuz çalışmasını sağlar.

Bunun yalnızca dApp'leri kullanırken bir sorun olduğunu unutma. Normal transferlerde, shard'lı olmayan blockchain'lere benzer bir kullanıcı deneyimi yaşarsın. Ana geliştirici ekibi, varlık yönetimini farklı gruplar arasında geliştirmeyi hedefliyor; böylece dApp kullanıcıları için kolaylık sağlanmış olacak.

## Geliştirme

### Yol haritası (roadmap) nerede? 

Yol haritasını [web sitesinde](https://alephium.org/#next) ve [dokümantasyonda](https://docs.alephium.org/#roadmap) bulabilirsin. Ayrıca, haftalık geliştirme güncellemelerini [Discord](https://alephium.org/discord), [Twitter](https://twitter.com/alephium), ya da [Reddit'te](https://www.reddit.com/r/Alephium/search?q=flair_name%3A%22Development%22&restrict_sr=1) takip edebilirsin.

### Alephium'un bakımını yaptığı genel servislerin durumunu nereden kontrol edebilirim?

Alephium'un genel servis durumunu şu linklerden kontrol edebilirsin:

- ana ağ (mainnet): https://status.mainnet.alephium.org
- test ağı (testnet): https://status.testnet.alephium.org

### API sorgulamasını nereden yapabilirim?

API sorgulaması yapmak için bir tam düğüm (full node) çalıştırman gerekli ([talimatlar](https://wiki.alephium.org/full-node/Full-Node-Starter-Guide)). Alephium, tam düğüm ile etkileşimde bulunmak için OpenAPI kullanır. Tam düğümün çalıştıktan sonra, yerel Swagger UI'ını `127.0.0.1:12973/docs` üzerinden açabilirsin. Alternatif olarak, herhangi bir OpenAPI client kullanarak Alephium'un reposundan [openapi.json](https://raw.githubusercontent.com/alephium/alephium/master/api/src/main/resources/openapi.json) dosyasını alabilirsin (import).

### Hibe, Ödül veya İkramiye Programınız var mı?

Alephium'da, katkının boyutundan bağımsız olarak ödüle uygun olabileceğin bir [Hibe ve Ödüller Programı](https://github.com/alephium/community/blob/master/Grant%26RewardProgram.md) mevcut.

### Alephium üzerinde ne geliştiriliyor?

Alephium üzerinde şimdiye kadar geliştirilenlerin çoğu [Muhteşem Alephium reposunda](https://github.com/alephium/awesome-alephium) listelenmiştir. Geliştirdiğin şeyi sergilemek istersen, listeye eklemek için bir Pull Request gönder!

## Tam Düğüm (Full Node)

### Tam düğüm çalıştırmanın herhangi bir ödülü var mı?

Alephium bir Proof of (Less) Work fikir birliği (consensus) mekanizması kullanır. Bu, Proof of Stake ağlarının aksine, bir tam düğüm çalıştırmak için doğrudan parasal bir ödül olmadığı anlamına gelir. Ancak, kendi düğümünü çalıştırmanın; merkeziyetsizlik, bağımsız doğrulama, gizlilik ve ekonomik egemenlik gibi başka avantajları da vardır. "_Senin düğümün değilse, senin ağın değil_" ifadesi, kendi düğümünü çalıştırmanın önemini vurgular. Üçüncü parti bir düğüme bağlanmak genelde güvenli olsa da, bazı kullanıcılar kendi güvenlik ve gizlilik seviyelerini sağlamayı tercih ediyor olabilir.

### Tam düğüm çalıştırmak için nelere ihtiyacım var?

Alephium'un tam düğümü hafiftir ve Raspberry-Pi veya telefonlar dahil çoğu cihazda çalışabilir. Kendi düğümünü kurup çalıştırmak için lütfen [Tam Düğüme Başlarken kılavuzuna](https://docs.alephium.org/full-node/getting-started/) göz at.

### Alephium üzerinde stake yapmak mümkün mü?

Alephium, Proof of Stake (PoS) fikir birliği mekanizması ile çalışmadığı için blok zincirinde doğrudan stake etme imkanı sunmaz. Ancak, gelecekte DeFi likidite havuzları kullanıcılar için stake seçenekleri sunabilir.

## Borsa Listelemeleri 

### Token kısaltmanız nedir?

Alephium token kısaltması [ALPH](https://medium.com/@alephium/introducing-alph-8381dbd9f88d)'dır. 

### Borsalarda para yatırma işlemlerinin görünmesi ne kadar sürer?

Borsalar, yeterli güvenliği sağlamak için genellikle PoW zincirleri için daha yüksek sayıda onay gerektirir. Şu anda, çoğu borsa Alephium için 30 ila 60 dakika arasında olan 30 ila 60 onay talep etmektedir.

### Alephium şu anda hangi borsalarda listeleniyor?

Mevcut Alephium piyasalarının listesini [CoinMarketCap](https://coinmarketcap.com/currencies/alephium/markets/) veya [CoinGecko](https://www.coingecko.com/en/coins/alephium) adresinde bulabilirsiniz.

## Madencilik

### Madencilik Ödülü nedir?

Alephium'un blok ödüllerini açıklayan [detaylı bir makale](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33) bulunmaktadır.

### Blok süresi sadece 64 saniye iken blok ödülünü 500 dakika tutmanın nedeni nedir?

500 dakikalık kilitleme, tıpkı Bitcoin'in madencilik ödülleri için ~1000 dakikalık kilidi gibi, yeniden düzenleme saldırılarını önlemek için tasarlanmıştır.

### Neden 4 madencilik adresim var?

Alephium, `G` grupları ve `G*G` parçaları olan parçalı bir blok zinciridir. Bu tasarım nedeniyle, her grup kendi madencilik adresini gerektirir.

Şu anda Alephium, ana ağında 4 grup ve 16 parça bulundurmaktadır. Bu nedenle, her grup için bir tane olmak üzere 4 madencilik adresine ihtiyaç vardır.

### Günde kaç coin çıkarılıyor?

Günde kaç coin çıkarıldığını öğrenmek için aşağıdaki formülü kullanabilirsiniz. Blok ödülü her blokta dinamik olarak değiştiğinden, formül size yalnızca yaklaşık bir değer verecektir.

```
3600 saniye / 64 saniye (Alephium blok süresi) == Parça başına saatte 56,25 blok.
56.25 x 16 parça == Saatte toplam 900 blok.
900 x 24 saat == Günde 21600 blok
21600 x  blok başına ALPH ödülü ~= Günde çıkarılan ALPH sayısı.
```

Bu giriş son güncellendiğinde ortalama blok ödülü: `2.87` ALPH'dı ve bunun sonucunda günde yaklaşık `61'992` ALPH çıkarılıyordu.

### Alephium, ASIC'e dayanıklı mı?

Hayır, Alephium tıpkı Bitcoin gibi ASIC dostu olarak tasarlanmıştır. Diğer zincirlere kanıtlandığı gibi, ASIC direncini sürdürmek son derece zor, hatta imkansız olabilir. Alephium, özel donanıma karşı direnç yerine güvenli ve kararlı bir ağı önceliklendirmeye karar verdi. 

### ALPH madenciliği için hangi madencileri kullanabilirim?

Aşağıda, bilinen Alephium madencilerinin bir listesi bulunmaktadır. Yeni madencilerin ortaya çıkmasını takip etmenin zor olması nedeniyle listenin eksik olabileceğini lütfen unutmayın. Listeye eklemek için istediğiniz zaman bir Pull Request gönderebilirsiniz.

- https://www.bzminer.com/guides/how-to-mine-alephium/
- https://lolminer.site/ veya https://github.com/Lolliedieb/lolMiner-releases
- https://www.srbminer.com/ veya https://github.com/doktor83/SRBMiner-Multi/releases
- https://trex-miner.com/ veya https://github.com/trexminer/T-Rex

[Alephium'un gpu-miner'ı](https://github.com/alephium/gpu-miner)nı da kullanabilirsiniz ancak bu listedekiler kadar verimli değil.

## Teknik

### Neden yeni bir L1 blok zinciri? Zaten çok fazla yok mu?

Blok zinciri anlatısı, yıkıcı teknolojiden birçok sektör için olası bir ana akım çözüme dönüştü. Bu paradigma değişikliğinden ötürü, çoğu proje, bu tür uygulamalar için gereken performans gereksinimlerini karşılamak için ölçeklenebilirliği takip ederek, ademi merkeziyetçiliğin, kendi kendini yönetmenin ve güvenliğin temel değerlerini bir kenara bırakıyor. Alephium, bu temel değerlerden ödün vermeden aynı sonucu verir ve sektörün (s)UTXO ve Po(L)W'ye olan ilgisini ateşlemek ve UTXO tabanlı DeFi ve akıllı kontrat uygulamaları hareketine öncülük etmek için benzersiz bir konuma sahiptir.

Ek olarak, Alephium'un inşası için birkaç önemli teknolojik motivasyon vardı:

1. Parçalama (sharding) yoluyla yatay ölçeklendirme.
2. Yeni Katman 1 (L1) blok zincirlerinin çoğu kaynak yoğundur, bu da bir tam düğüm (full node) çalıştırmayı maliyetli hale getirir ve bu da uzun vadede ademi merkeziyetçilik ve aracıların kaldırılmasına yol açabilir. Alephium'un yaklaşımı, herkesin tam bir düğüm çalıştırabileceği ve ağı doğrulayabileceği Bitcoin'e benzer. _"Güvenme, doğrula."_
3. Pek çok yeni L1 blok zinciri, hesap modelini kullanır veya EVM ile uyumludur ve zayıf yönlerini miras alır. Alephium, merkeziyetsiz uygulamalar (dApp'ler) için daha yüksek güvenlik seviyesine sahip yeni bir programlama paradigması sağlamak için Harcanmamış İşlem Çıktısı (UTXO) modeli üzerine kurulmuş yeni bir Sanal Makine (VM) yarattı.
4. Çoğu yeni L1, Proof of Stake (PoS) konsensüs mekanizmasını kullanır. Alephium, ademi merkeziyetçiliği sağlamak için daha basit, daha tutarlı ve daha sağlam bir fikir birliği mekanizması olarak Proof of Work (PoW) üzerine inşa etmeyi seçti.

### Alephium akıllı sözleşmeleri destekliyor mu?

Evet, Alephium akıllı sözleşmeleri destekler. Özellikle akıllı sözleşmeler ve merkezi olmayan uygulamalar için ölçeklenebilir ve güvenli bir ağ olarak tasarlanmıştır.

### Blok süresi neden 64 saniye? Bunun için özel bir sebep var mı?

Proof of Work (PoW) blok zincirlerinde kesinlik, blok süresi yerine yeni bloklarda biriken iş miktarına dayanır. Bu, bir işlemin onaylanması için T blok süresine sahip N bloğa ihtiyaç duyması durumunda, onaylanması için blok süresi T/2'ye yarıya indirilirse 2N bloğa ihtiyaç duyacağı anlamına gelir ve bu da aynı süreyle sonuçlanır.

Daha kısa blok süreleri daha iyi bir kullanıcı deneyimi sağlarken, bazı dezavantajları da vardır:

- Daha fazla öksüz blok üretilir. PoW Ethereum'daki amca bloklarının oranı %10 veya daha yüksekken, Bitcoin'in öksüz oranı %1'den azdır.
- P2P ağında artan yük. Bu sorun, raporların Solana'daki işlemlerin %90'ına kadarının doğrulayıcı mesajları olduğunu öne sürdüğü gibi, PoS blok zincirleri için daha şiddetlidir.

Uzun vadede hafif ve verimli bir blok zinciri sağlamak için bu tür ek yüklerden kaçınılmalıdır. Bu nedenle Alephium, Bitcoin ile daha kısa blok sürelerine sahip daha yeni blok zincirleri arasında bir denge kuran 64 saniyelik bir blok süresiyle başladı.

Blok sürelerine ve anlık kesinliğe öncelik verenler için, Alephium üzerinde Katman 2 çözümleri oluşturulabilir ve blok zinciri olgunlaştıkça veya internet hızı arttıkça gelecekte blok süresi azaltılabilir. Sonuç olarak, kripto para alanı için hafif, ölçeklenebilir ve verimli bir Katman 1 esastır. 

### Bir işlemin gerçekleşmesi ne kadar sürer?

Gelen işlemi mempool'da görmek için 1 saniye yeterli olmalıdır. Alephium'un blok süresi şu anda 64 saniyedir. Ekonomik kesinlik, miktara ve risk yönetiminize bağlıdır. Küçük bir işlem için mempool muhtemelen yeterlidir ve çoğu işlem için 1-4 blok yeterlidir. Ancak, bir borsa iseniz ve büyük miktarlarla uğraşıyorsanız, muhtemelen birkaç düzine ila yüzlerce blok bekleyeceksiniz.

Blok süresi ve kesinliğe kadar geçen süre kavramı hakkında daha fazla bilgiyi şu makalelerde okuyabilirsiniz:

- [Block time & block size](https://medium.com/@alephium/block-time-and-block-size-16e37292444f) (Blok süresi ve blok boyutu)
- [Time to finality](https://medium.com/@alephium/time-to-finality-17d64eeffd25) (Kesinliğe kadar geçen süre)

### Neden PoS değil de PoLW'yi seçtiniz?

Blockchain teknolojisi hala ilk aşamalarındadır ve DeFi dahil dApp'leri desteklemek için önümüzdeki 10 yıl için hangi blockchain altyapısına ihtiyaç duyulduğu ortak bir sorudur.

Alephium, yüksek işlem hacmi ve düşük işlem ücretlerine sahip ölçeklenebilir bir blok zincirinin, Ethereum gibi yüksek düzeyde programlanabilirlik ile Bitcoin'in güvenilirliği ve güvenliği ile birlikte gerekli olduğuna inanılarak oluşturuldu. Amaç, "güvenilir bir akıllı sözleşme çözümü ile ölçeklenebilir bir Bitcoin" oluşturmaktı.

Lindy etkisine göre, PoS ile son zamanlardaki başarılara rağmen, Bitcoin modeli ve PoW ile parçalama, ölçeklenebilir bir blok zinciri oluşturmanın hala en sağlam ve merkezi olmayan yoludur. Özellikle:

- PoW basit ve sağlamdır ve parçalama (sharding) algoritmaları tasarlamak daha kolaydır.
- PoS henüz zamanla test edilmedi ve Ethereum'un PoS geçişinden sonra nasıl gelişeceği henüz görülmedi.
- PoS daha merkezi ve sansüre karşı daha savunmasız olma eğilimindedir.
- PoS, bir düğüm çalıştırma maliyeti önemli ölçüde daha yüksek olabileceğinden, güvensizliği azaltma eğilimindedir.
- PoS, MEV gibi bazı DeFi saldırılarına karşı daha savunmasızdır.

### Durumlu UTXO'lar nelerdir ve diğer UTXO modellerinden nasıl farklıdırlar?

Blok zinciri teknolojisinde iki tür durum vardır: değiştirilebilir durum (Ethereum'da görüldüğü gibi) ve değiştirilemez durum (UTXO veya eUTXO gibi). Ethereum'un canlı ekosisteminin de kanıtladığı gibi, değiştirilebilir durum daha esnek ve etkileyicidir. Ancak, UTXO modeli doğal güvenlik avantajları sağlar.

[Alephium'un stateful UTXO modeli,](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) her ikisinin de avantajlarını birleştirir. Varlıklar için UTXO modelinin güvenlik avantajlarından yararlanırken, akıllı sözleşmeler için Ethereum'da bulunanlar gibi değiştirilebilir durumları destekler.

### Alephium, düşük TPS'ye neden olabilecek klasik ve genişletilmiş UTXO modelindeki aynı eşzamanlılık sorununa eğilimli mi?

Hayır, Alephium'un bu sınırlaması yoktur. Alephium'un durum bilgili UTXO modeli, klasik UTXO modelini hesap modeliyle birleştirir ve değiştirilebilir durumları destekler. Bu, dApp'lerin değişken sözleşme durumlarına paralel olarak erişebilmesini sağlayarak, bir eşzamanlılık sorununu olasılığını ortadan kaldırır. 

### Neden 1 milyon shard yok?

Ağ oluşturma, shard sayısını artırmak için ana darboğazdır. Her düğüm, tutarlılık için `2G - 1` diğer parçalara sahip olmalıdır. Ortalama ağ bant genişliği yeterliyse, `G` 32 kadar yüksek ayarlanabilir. Bazı hesaplama ek yükleri de olsa da, ağ oluşturma birincil darboğazdır.

### Alephium üzerinde shard sayısını arttırma süreci nedir?

Shard sayısını artırmak için ağda bir yükseltme yapılması gerekiyor. Mevcut shard sayısı ağ yükünü kaldırmaya yetmediğinde bu tür bir yükseltme gerçekleşir.

### Parçalı bir ağ, özellikle Alephium, %51'den az hashrate ile saldırıya uğrayabilir mi? Örneğin, yalnızca bir grup veya parçada ödün verilerek?

Parçalı blok zincirleri, Vitalik'in "%1 saldırı" terminolojisinde açıkladığı gibi, düzgün tasarlanmazlarsa güvenlik endişelerine neden olabilirler. Ethereum'un parçalama yaklaşımı, bu sorunu validator karıştırmasıyla (shuffling) ele aldı. 

Öte yandan Alephium, bunu Blockflow algoritmasıyla ele aldı. Farklı shard'lardaki madencilik çalışması, blok bağımlılıkları nedeniyle biriktirilir. Bir parçalayı yeniden organize etmeye çalışan bir saldırganın, tüm bağımlılıklarından da vazgeçmesi gerekir. Bunu görmenin sezgisel ve basitleştirilmiş bir yolu, tüm shard'ların birbiriyle birleştirilmiş olarak mayınlandığını düşünmektir.

### Alephium üzerinde tokenlar ve akıllı sözleşmeler için shardlar arası atomik yapı var mı?

Alephium'da, tokenlar shard'lar arasında atomik olarak oluşturulabilir, yani tokenları bir shard'dan başka bir shard'a atomik olarak tek bir işlemde transfer etmek mümkündür.
Bununla birlikte, Alephium'un stateful (durumlu) UTXO modelinde akıllı sözleşmeler token ve state bileşenlerine sahip olsa da, yalnızca tokenlar shardlar arası atomik yapıya sahiptir; state'ler parçalanmıştır ve bu nedenle oluşturulamaz. Bu tasarım kararı, Alephium'un token merkezli yaklaşımını yansıtır ve bölümlenmiş bir veritabanına benzeyen daha basit bir durum tasarımına izin verir. Bu ödünleşme, token atomik yapıdan yoksun olan mevcut Layer 2 trendlerinden daha elverişlidir ve şu anda state oluşturulabilirliği için pratik bir çözüm yoktur.

### Alephium'da flash krediler (flash loan) mümkün mü?

Hayır, flash krediler tasarım gereği [Alephium'ın sanal makinesi Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025)'de mevcut değildir.  

### Alephium adresleri nasıl oluşturulur? Bir Bitcoin legacy adresi ile bir Alephium adresi arasında ayrım yapmanın bir yolu var mı?

Alephium, adres oluşturmak için Bitcoin (secp256k1 eğrisi) ile aynı eğriyi kullanır, ancak farklı bir hash algoritması (blake2b) kullanır. Alephium adresleri 20 baytlık hash yerine 32 baytlık hash kullanması sebebiyle tipik olarak Bitcoin adreslerinden daha uzundur.

### Ana ağ (mainnet) adresimi test ağında (testnet) kullanabilir miyim?

Alephium adresleri bir algoritma tarafından kendi kendine oluşturulur ve ağdan bağımsızdır (testnet, mainnet, devnet, vb.). Cüzdan ve adres oluşturmak için ağ düğümüne (ve hatta internete) bağlı olmak gerekli değildir. Esasen, her Alephium adresi, henüz üretilmemiş/keşfedilmemiş olanlar da dahil olmak üzere tüm ağlarda bulunur.

Daha eski kripto ağlarında, işlemler herhangi bir ağ bilgisi içermiyordu ve diğer ağlarda "yeniden oynatılabiliyordu". Bu nedenle, aynı adresleri farklı ağlarda kullanmak tavsiye edilmezdi.
Alephium, ağ kimliğini (ID) işlemlerine dahil eder, bu nedenle aynı adresi çeşitli ağlarda kullanmak tamamen kabul edilebilir. 
Cüzdanınızı testnet gibi bir ağa bağladığınızda, adres bakiyenizi kontrol etmek için bir testnet düğümünden talepte bulunabilirsiniz. Cüzdanınızın ağ ayarlarını mainnet'e bağlanacak şekilde değiştirirseniz, bir mainnet düğümü adres bakiyenizi mainnet ağında görüntüler. Bu nedenle, her adresin her ağda bir bakiyesi vardır ve belirli bir ağın adresinizin bakiyesini ona bağlanarak görüntüleyebilirsiniz.

### Alephium neden kendi sanal makinesini ve akıllı sözleşme dilini oluşturmayı seçti?

Alephium'un temel aldığı [stateful UTXO modeli](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) tamamen yenidir ve hesap modeli için tasarlanmış olan EVM gibi mevcut sanal makinelerle uyumlu değildir. Bu, sUTXO'ların güçlü yönlerinden yararlanmak için özel olarak tasarlanmış yeni bir sanal makine [Alphred](https://medium.com/@alephium/meet-alphred-a-virtual-machine-like-no-others-85ce86540025) oluşturma kararını zorunlu kıldı. 

Solidity ile EVM'ye benzer şekilde, Alphred'in Ralph adlı alana özel bir dili vardır. Ralph, Alephium'un blok zinciri için son derece anlamlı ve kullanımı kolay olacak şekilde özel olarak oluşturulmuştur. Sanal makinenin yerleşik özellikleri sayesinde tasarım gereği güvenli olacak şekilde özel olarak geliştirilmiştir.

Alephium, kendi VM ve akıllı sözleşme dilini oluşturarak daha iyi bir alternatif sunmayı ve Solidity ve EVM'nin bilinen bazı güvenlik sorunlarını azaltmayı başardı. Ek olarak, Alphred ve Ralph tasarlanırken geliştirme deneyimi önceliklendirildi ve geliştiriciler için kolay bir başlangıç sağlandı.

### Alephium kuantum dirençli mi?

Bitcoin ve Ethereum'a benzer şekilde, Alephium da kuantum bilgisayarları yakın bir endişe olarak görmemektedir. Karma oluşturma ve imzalama algoritmaları ile adres oluşturma güncellenebilir. Kuantum hesaplama sorunu, daha önemli bir tehdit haline geldiğinde ele alınacaktır.

## Token Ekonomisi

### Mümkün olan en düşük GAS ücreti nedir?

Şu anda mümkün olan en düşük gas ücreti `10^-7` ALPH veya `0.0000001` ALPH'tır.

### Alephium'un emisyon programı nedir? Alephium'da halving (blok ödülü yarıya indirme) var mı?

Alephium'da Bitcoin gibi bir halving yoktur. Emisyon programı, ağ hashrate'ine ve zaman damgasına bağlıdır. Madencilik ödülleri her blokta dinamik olarak ayarlanır. Bu konuda şu makalelerden daha fazla bilgi edinebilirsiniz:

- [Block Reward](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33) (Blok Ödülü)
- [Proof of Less Work](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301) (Azaltılmış İş İspatı)

### Tokenlar yakılırsa, gelecekte mevcut ALPH miktarının sıfıra yakın olacağı bir zaman olacak mı?

Teorik olarak, evet. 80 yıl bir yana, 10 yıl sonra da teknolojilerin geleceğini tahmin etmek zor. Alephium gibi blok zincirleri için, emisyon programı gibi politikaların teknolojiler geliştikçe değişmesi alışılmadık bir durum değildir. Konsensüs, emisyon programında bir değişikliği kabul ederse, değişiklik uygulanır.

### Maksimum arz sınırı nasıl uygulanıyor?

1 milyar ALPH'lik maksimum arz sınırı bir tahmindir. Protokol, yaklaşık 80 yıllık bir zaman damgasına göre emisyonlarda bir sınır uygular. Bunun nedeni, protokol içinde paylaşılan bir zincir için emisyonlar toplamını hesaplamanın hesaplama açısından maliyetli olmasıdır. Emisyon oranı zamana göre belirlenir ve hashrate'e göre değişir.
Geliştirilmiş [DAA](https://github.com/alephium/alephium/blob/master/docs/proposals/lemanDAA.md)'nın uygulanmasından önce 1 milyar sınırın tahmin edildiğini belirtmekte fayda var. Mevcut kodla, POLW mekanizmasının ücret yakması dikkate alınmasa bile, gerçek emisyon sınırı ve maksimum ALPH arzının 80 yıl içinde 1 milyardan az olması bekleniyor.

## Cüzdan

### Alephium ne tür bir cüzdan sunuyor?

Alephium şu anda şunları sunmaktadır:

- Bir [masaüstü cüzdanı](https://github.com/alephium/desktop-wallet/releases/latest)
- [Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) ve [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/) için mevcut bir [web uzantısı cüzdanı](https://github.com/alephium/extension-wallet)
- Bir [mobil cüzdan](https://github.com/alephium/mobile-wallet) üzerinde çalışılmaktadır.

Resmi cüzdanlara ek olarak, birkaç üçüncü taraf cüzdan mevcuttur.

### Alephium'un donanım cüzdanlarında desteklenmesi planlanıyor mu?

Donanım cüzdanı desteği sunmak Alephium için önemli bir önceliktir.
Şu anda bir Ledger entegrasyonu üzerinde çalışılmaktadır ve web uzantısı cüzdanı `v0.7.0` ile geliştirici modunda mevcut olacaktır.
Ledger'da resmi yayın, tamamlanması zaman alacak birden çok aşamalı uzun bir süreçtir.

### Seed'imi masaüstü cüzdanına aktarırken, onunla birlikte oluşturulan tüm adresleri de aktarmak mümkün mü?

Cüzdanınızı kurtarma cümlesi (recovery phrase) kullanarak aktardıktan sonra, artık bağlı ağınızı tarayarak geçmişte kullandığınız tüm aktif adresleri keşfedebilir. Aktif adres, en az bir işlemi olan bir adrestir. Manuel adres keşfi için Adresler bölümüne gidin ve"+ Yeni adres" butonunun yanındaki anahtar ikonuna tıklayın. "Aktif adresleri keşfet" seçeneğindeki “Ara” butonuna tıkladıktan sonra Masaüstü cüzdanı, bu kurtarma cümlesine bağlı tüm aktif adresleri gösterecektir.

### Masaüstü cüzdanı hangi analitikleri topluyor?

Alephium gizlilik ve kullanıcı deneyimi ile ilgili endişeleri ciddiye almaktadır. Analitikleri etkinleştirmek ise aslında gizliliğinizi tehlikeye atmadan kullanıcı deneyimini iyileştirmeye yardımcı olabilir.  Masaüstü Cüzdanı tarafından toplanan bilgiler tamamen anonimdir. Cüzdanınızın ilk başlatılmasında, gerekli olan tek tanımlama bilgisi benzersiz bir kimlik (ID) oluşturulur (örneğin, `vCJGCsDPrZ8WJaIKZMWjU`).   IP'ler veya diğer herhangi bir [kişisel veri](https://posthog.com/blog/what-is-personal-data-pii) toplanmaz. Yalnızca buton tıklamaları, cüzdan, adres, kişiler ve cüzdan tercihleri kaydedilir. Bu bilgiler, yararlı özellikleri ve iyileştirme alanlarını belirlemeye yardımcı olur.
Alephium'un açık kaynak kod tabanı, kullanıcıların hangi olayların yakalandığını [ `posthog?.capture` anahtar kelimesini arayarak ](https://github.com/search?q=repo%3Aalephium%2Fdesktop-wallet+posthog?.capture&type=code) doğrulamasına olanak tanır.

### Token göndermeye çalıştığımda işlemlerime neden token başına ek olarak 0,001 ALPH ekleniyor?

UTXO spamming'in önüne geçmek için `0.001` ALPH, UTXO başına minimum gerekliliktir. Bu miktar ağ tarafından tüketilmez ve tokenlar ile aynı şekilde hedef adrese ulaşır.

### Gizli kurtarma cümlemi (secret recovery phrase) yedeklemek neden önemli?

Gizli kurtarma cümlenizi yedeklemek çok önemlidir, çünkü cüzdanınız için ana anahtar görevi görür. Cüzdanınıza erişimi kaybederseniz (örneğin, cihaz kaybı, arızası veya uygulamanın silinmesi nedeniyle), gizli kurtarma cümlesi varlıklarınızı geri yüklemenin ve onlara erişmenin tek yoludur. 
Bu cümle olmadan, cüzdanda saklanan tüm varlıklar kalıcı olarak kaybolabilir. Gizli kurtarma cümlenizi son derece dikkatli bir şekilde ele alın ve güvenli ve özel bir yerde saklayın.

## Muhtelif

### Çevrilmiş içeriği nasıl bulabilirim?

Medium, Twitter ve Youtube'da birçok uluslararası ve çevrilmiş içerik bulabilirsiniz.

Twitter'da aşağıdaki topluluk hesapları Alephium tweetlerini çevirir:

- [German](https://twitter.com/Alephiumde) (Almanca)
- [French](https://twitter.com/Alephiumfr) (Fransızca)
- [Bulgarian](https://twitter.com/alephiumbg) (Bulgarca)
- [Indonesian](https://twitter.com/Alephium_id) (Endonezce)

Çevirmenler, çevrilmiş içeriği yayınladıklarında aşağıdaki etiket (hashtag) yapısını kullanmaya teşvik edilir: #Alephium\[i18n\]
Medium, Twitter ve diğer kanallarda aşağıdaki etiketlerle çevirileri bulabilirsiniz:

- İspanyolca: "#AlephiumES"
- Portekizce: "#AlephiumPT"
- Fransızca: "#AlephiumFR"
- Almanca: "#AlephiumDE"
- Bulgarca: "#AlephiumBG"

[Discord sunucusu](https://alephium.org/discord) üzerinde, Alephium'un özel uluslararası kanalları vardır.

Telegram'da aşağıdaki topluluk tarafından yönetilen gruplar mevcuttur:

- [German](https://t.me/alphgermanofficial) (Almanca)
- [Vietnamese](https://t.me/alephiumvn) (Vietnamca)
- [Russian](https://t.me/alephiumgroup_ru) (Rusça)
- [Portugese](https://t.me/Alephium_pt) (Portekizce)
- [Turkish](https://t.me/alephiumturkiye) (Türkçe)
- [Dutch](https://t.me/AlephiumgroupNL) (Felemenkçe)
- [Chinese](https://t.me/alephiumCN) (Çince) 

### Yeni olan ne?

Alephium'un duyuru kanallarını kontrol edin [Discord](https://discord.gg/AFXKJNVFKJ) ve [Telegram](https://t.me/Alephium_Announcement).
Ayrıca her hafta [Discord](https://alephium.org/discord), [Reddit](https://www.reddit.com/r/Alephium) & [Twitter](https://twitter.com/alephium) üzerinde geliştirme güncellemelerimiz bulunmaktadır.

### Proje neden Alephium olarak adlandırıldı?

Alephium adı, Wikipedia'da şu şekilde tanımlanan "Aleph" teriminden türetilmiştir: "Aleph sayıları, iyi sıralanabilen sonsuz kümelerin kardinalitesini temsil etmek için kullanılan bir sayı dizisidir. Matematikçi Georg Cantor tarafından tanıtıldılar ve onları belirtmek için kullandığı İbranice aleph (ℵ) harfinden sonra adlandırıldılar.."

Aslında, Alephium logosu Aleph harfinin stilize edilmiş bir versiyonudur.

Ethereum'un teknik vaatlerine bir gönderme olarak Alephium, benzer bir adlandırma kuralı kullanılarak adlandırılmıştır.

### Leman Yükseltmesi nedir?

30 Mart 2023'te etkinleştirilen [Leman Yükseltmesi](https://medium.com/@alephium/the-leman-network-upgrade-is-live-f52c89b7dd6a), Alephium ağının ilk ağ yükseltmesidir. Birçok katılımcının bir yıldan fazla süren sıkı çalışmasının ve özverisinin zirvesidir ve proje için önemli bir dönüm noktasını temsil eder. Merkeziyetsiz uygulamalar oluşturmak için zenginleştirilmiş bir geliştirici deneyimi sunan çok sayıda yeni özellikle, Alephium ekosisteminin büyümesine yönelik ilk adımdır.

### Alephium hakkında her şeyi 5 dakikada nerede öğrenebilirim?

İyi bir genel bakış, [belgeler](https://docs.alephium.org/) üzerinde mevcuttur ve bu SSS'nin başında ek kaynaklar bulunur.

### AYA NE ZAMAN GİDİYORUZ?

1ALPH her zaman 1ALPH eder.
