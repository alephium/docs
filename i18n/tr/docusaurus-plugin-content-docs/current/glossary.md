---
sidebar_position: 30
sidebar_label: Sözlük
slug: /glossary
title: Sözlük
---

Bu, özellikle Alephium'u ve genel olarak Blok Zincirlerini anlamak için kullanışlı kavramların bir listesidir.

## A

### Alephium

Alephium, PoW ve UTXO kavramlarını ölçeklendirme ve iyileştirme hedefiyle geliştirilen ilk operasyonel sharded L1 blok zinciridir. Merkeziyetsizlik, öz egemenlik ve güvenlik, yüksek performans, erişilebilirlik ve enerji verimliliği ile birleşir ve DeFi ve akıllı sözleşme uygulamaları için optimize edilmiş bir geliştirici dostu ağda buluşur.

Teknik tasarımından arayüzlerine kadar Alephium, günümüzde merkezi olmayan uygulamaların karşılaştığı erişilebilirlik, ölçeklenebilirlik ve güvenlik sorunlarını ele almak üzere oluşturulmuştur.

### Akıllı Sözleşme 

[Akıllı Sözleşme (AS)](https://tr.wikipedia.org/wiki/Ak%C4%B1ll%C4%B1_s%C3%B6zle%C5%9Fme), belirli bir kural setine göre yürütülebilen işlemlerin üçüncü bir tarafa, merkezi bir otoriteye veya harici mekanizmalara güvenmeye gerek kalmadan gerçekleştirilmesini sağlayan bir bilgisayar programıdır. Blok zincirinde, akıllı bir sözleşme, yerel Programlama Dili kullanılarak yazılır veya ona derlenir (çevrilir) ve genellikle blok zincirinin [Sanal Makinesi](#sanal-makine) üzerinde çalışır.

Bir blok zincirindeki AS'ler, keyfi [durumu](#durum) saklayabilir ve keyfi işlemleri gerçekleştirebilir. Son kullanıcılar, aynı zamanda işlemlerle etkileşime girerken de işlemleri kullanır. Ve AS işlemleri ayrıca diğer AS'leri çağırabilir. Bu işlemler, durumu değiştirebilir ve jetonları bir akıllı sözleşmeden diğerine veya bir hesaptan diğerine gönderebilir.

Alephium'da akıllı sözleşmeler, Ralph dili kullanılarak yazılır ve Alphred Sanal Makinesinde çalışır.

## B

### Blake 3 Algoritması (Hash Fonksiyonu)
[Blake 3 Algoritması](https://github.com/BLAKE3-team/BLAKE3), bir kriptografik hash fonksiyonudur. Bir hash fonksiyonu, herhangi bir uzunluktaki bir giriş dizisini alıp sabit uzunlukta bir çıkış dizesine dönüştüren matematiksel bir fonksiyondur. Sabit uzunluklu çıkış, hash değeri olarak bilinir.

Hash fonksiyonlarının bir blok zincirinde birçok kullanım alanı vardır: [Merkle Ağacı](#merkle-ağacı), Proof of Work Consensus, Dijital İmzalar ve Blok Zinciri kendisi (çünkü bir blok zincirindeki her blok başlığı önceki bloğun başlığının hash'ini içerir). Örneğin, Bitcoin, SHA-256'yı kullanır.

Alephium, madencilik için kriptografik hash fonksiyonu olarak Blake 3 Algoritmasını kullanır.

### Blok Ödülü

Blok ödülü, madencilerin ağı güvence altına almaları için bir ekonomik teşviktir.

Blok zincirinin yerel jetonunda ödenir. Ağ küçük ve yeni olduğunda genellikle daha yüksektir ve zamanla olgunlaştıkça azalır.

[Blok Ödülü GitHub Uygulaması](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/mining/Emission.scala)

### Blok Boyutu

Blok boyutu, her bloğun işleyebileceği veri limitidir. 

Farklı şekillerde ölçülebilir. Bazı blok zincirlerinde, bloğun gerçek veri taşıma kapasitesi olarak ifade edilir (örneğin, Zcash'te blok boyutu 2MB'dir). Diğer blok zincirlerinde, blok boyutu ağdan tüketebileceği hesaplama işlem sınırıyla ilişkilidir (genellikle gaz olarak ifade edilir). Ethereum'un ve Alephium'un blok boyutları bu şekilde ölçülür.

### Blok Zamanı

Blok Zamanı, işlemlerin bir blok içinde hesaplanması ve ağa gönderilmesi için gereken süredir.

İşlemler bir blok içine toplanır ve madenciler (veya PoS blok zincirlerinde doğrulayıcılar) tarafından kontrol edilir. Genellikle, Blok Zamanı, ağın hesaplama kapasitesini (hashrate) belirlemek için ayarlanırken madencilik zorluğundan etkilenir.

Alephium ağı her blokta zorluk ayarlaması yapar ve beklenen blok zamanı **64 saniyedir**.

Ek kaynaklar: [Blok Zamanı ve Blok Boyutu Makalesi](https://medium.com/@alephium/block-time-and-block-size-16e37292444f)

## C

## Ç

### Çoklu İmza

Çoklu İmzalı veya Çok İmzalı, bir işlemin ağa gönderilmesi için birden fazla özel anahtarın imzalamasını isteme sürecidir. Bu, ek bir güvenlik adımı olarak kullanılır.

Genellikle, çok imzalı kurulum, belirli bir işlemin onaylanması ve gönderilmesi için bir minimal kuartum gerektirir. Örneğin, 9 potansiyel eş imzacı arasından 5 imzacı gerektiren bir çoklu imza 5'ten 9'a kadar.

Alephium'un [Tam Düğüm Cüzdanı](/wallet/node-wallet-guide), çoklu imza adreslerini destekler

## D

### Daha Az İş Kanıtı (veya PoLW)

Bitcoin için Proof-of-Work veya Ethereum için Proof-of-Stake'e benzer şekilde, PoLW, Alephium'un konsensüs algoritmasıdır. Ağın enerji tüketimini güvenliği ve merkeziyetsizliği olumsuz etkilemeden optimize eder. Toplam birikmiş hashrate 1 Eh/s'yi geçtiğinde etkinleştirilir.

Bu noktadan sonra, yeni bir blok çıkartmanın maliyetini kısmen içselleştirir, blok doğrulama sürecine bir sikke yakma mekanizması ekleyerek, genel olarak gerekli işlemci gücünün bir üst sınırını teşvik eder. Aynı ağ koşulları verildiğinde, Alephium'un, Bitcoin madenciliğinin tükettiğinin yalnızca ⅛'ini kullanması beklenir.

Ek kaynaklar: [TECH TALK #1 — The Ultimate guide to Proof-of-Less-Work, the universe and everything…](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)

### Durum

Durum, bir makinenin birden fazla duruma sahip olabileceği, ancak herhangi bir zamanda yalnızca bir durumda olabileceği [bilgisayar bilimi kavramıdır.](https://en.wikipedia.org/wiki/State_(computer_science)) Bir blok zinciri bir durum makinesi olarak kabul edilir. Durum, sistemin mevcut durumunu açıklar ve işlemler (girişler ve çıkışlar) durum geçişlerini tetikler. İşlemler süreci daha verimli hale getirmek için bloklara toplandığında, bir bloğun eklenmesi asıl blok zincir durumunu değiştirir.

Alephium, diğer UTXO muhasebe modellerinden faydalanmasına izin veren tam özellikli bir durum kullanır.

## E

## F

## G

### Gaz Fiyatı

Bu, gazın parasal değeridir. Gaz, bir blok zincirinde bir komutun yürütülmesi için gereken hesaplama çabası olarak tanımlanır. Gaz fiyatı, madencinin yaptığı iş için ödenen parasal karşılıktır. 

Alephium'daki mevcut en düşük gaz fiyatı 10^-7 ALPH veya 0.0000001 ALPH'tır.

### Genesis Blok

Genesis Blok, bir blok zincirinin madenciliğe başladığı ilk bloğun adıdır. Bloklar bir üstüne diğerine yerleştirildikçe, Genesis Blok, temel veya başlangıçtır.

Bazen Blok 0 veya Blok 1 olarak da adlandırılır. Bir blok bir blok zincirine yayınlandığında, önceki bloğa referans verir. Referans alınacak önceki blok olmadığı için, genesis blokları genellikle yazılımın içine sert kodlanmıştır.

Alephium'un genesis bloğu 8 Kasım 2021'de madencilik yapıldı

## H

### Harcanan Gaz Miktarı

Harcanan Gaz, madencinin işlemleri yürütmek için kullandığı hesaplamaların miktarıdır. İşlemin daha fazla işlevi varsa, daha karmaşık bir yürütme ve daha fazla gaz harcanır. 

Şu anda, ve bir anti-spam önlemi olarak, Alephium'da herhangi bir işlem için minimum 20.000 gaz değeri bulunur, yani işlem ücretiniz en az 0,002 ALPH tutarında olur.

Ağ olgunlaştıkça, bu gevşetilecek ve işlem ücretlerinin fiyatı piyasa tarafından belirlenecektir.

## I

## İ

## J

## K

### Köprü

Bir köprü, farklı blok zincirlerini birbirine bağlayarak etkileşimleri mümkün kılan bir protokoldür. Her blok zinciri genellikle kendi teknolojik özelliklerine sahiptir ve diğer protokollarla iletişim kurma doğal bir yolunun yoktur. Bu nedenle, köprü, bu farklı ekosistemleri bağlayan bir dizi akıllı sözleşmeden oluşur.
 
Bir köprü daha özelleştirilebilir olabilir, yalnızca bir tür etkileşimi (örneğin, jeton transferleri gibi) izin verir veya daha genel amaçlı olabilir, köprülenmiş blok zincirleri arasında her türlü veri transferine izin verir.

## L

## M

### Madencilik Ödülü

![](media/Block%20reward.png)

Alephium'un yeni oluşturulan bloklar için ödülü aynı zamanda Madencilik Ödülü (MR) olarak adlandırılır. Dağıtımdan sonra, [blok ödülleri](#blok-ödülü) 500 dakika boyunca kilitlenir.

Madencilik ödülü, hashrate ve zaman damgasına dayalı iki eğriyle sınırlanmıştır. Belli bir zamanda ve belirli bir hashrate için blok başına ödül, zaman tabanlı ödül ve hashrate tabanlı ödül arasındaki minimumdur.

Blok Ödülü = min (zaman tabanlı ödül, hashrate tabanlı ödül).

Ek kaynaklar: [Alephium Blok Ödülleri](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)

### Maksimum Çıkartılabilir Değer (MEV)

Madenci veya [Maksimum Çıkartılabilir Değer (MEV)](https://ethereum.org/en/developers/docs/mev/), bir blok madenciliğinden standart blok ödülü ve gaz ücretleri fazlasıyla elde edilen değere atıfta bulunur.

Bu fark, "aramacılar" olarak adlandırılan aktörler tarafından sunulur ve bir blok madenciliği için bir sonraki üretilen bloğun bir parçası olmak için seçilen bir işlemin bilgilerini değiştirerek, dahil ederek veya kaldırarak elde edilir. Gönderen veya alıcı adresi gibi belirli bir işlemin bilgilerini değiştirerek karlılık fırsatlarını arayan. İşlemlerinin bir sonraki bloğun bir parçası olması için madenci tarafından seçilme olasılığını artırmak için ortalama değerin çok üzerinde bir gaz ücreti ödemeye isteklidirler ve kârın bir kısmını "paylaşırlar".

### Merkle Ağacı

Merkle ağacı, bir blok zincirinde verileri daha verimli ve güvenli bir şekilde sıkıştırmak için kullanılan bir yapıdır.
Blok zinciri işlemleri bloklarda paketlenir. Her bloğun bir başlığı vardır ve bu başlığın bir hash'i vardır. Bu hash, Merkle Ağacında saklanır. Merkle Ağacından gelen hash, bir veri kümesinin blok içindeki içerik olmadan orijinal işlem kümesiyle aynı olduğunu doğrulamak için kullanılır. Görselleştirildiğinde, bu yapı bir ağaç gibi görünür ve "ikili hash ağacı" olarak da adlandırılabilir.

Örneğin, Alephium, her grup başına üç Merkle ağacı kullanır ve bu ağaçlar varlık-UTXO'ları, sözleşme mantığı ve sözleşme durumu saklar.

## N

### Nihaiye Zamanı

Nihaiye Zamanı, bir işlemin ağa gönderildiği ve nihai (ve değiştirilemez) olarak kabul edildiği zamana kadar geçen süredir. İki ana nihaiyet kategorisi vardır: olasılıksal nihaiyet ve kesin nihaiyet.

Çoğu blok zincir sistemi, olasılıksal işlem nihaiyeti sunar - bu, bir işlemin geçerli ve geri dönülemez olduğu olasılığının, zincire daha fazla blok eklenmesiyle arttığı anlamına gelir, ancak kesinlikle kesin değildir. Ağ, işlemin yeterince zaman ve blok ekleyerek kesin olduğu konusunda uzlaşır.

Alephium'un blok zamanı ve blok boyutu, ağın işlem kabul hızını ve işlem nihaiyetini belirler. Alephium'da işlem nihaiyeti, işlemin bir blok zincirindeki kaç blok sürdüğüne bağlıdır.

## O

## Ö

## P

### Parçalama 

Parçalama, büyük veritabanlarını daha küçük, daha hızlı ve daha kolay yönetilen bölümlere ayıran bir veritabanı yönetimi stratejisidir. 

Bu daha küçük parçalar, "parçalar" olarak adlandırılır, "bir bütünün küçük bir parçası" anlamına gelir. Parçalama, bir veritabanının çalıştırılması için gereken gücün bir tek bir bilgisayarın işleme kapasitesini aştığı durumlarda kullanılır. Parçalama, blok zincirinin boyutu, sanal makinenin işlemci kapasitesini ve ağın işlem kapasitesini aştığında gereklidir. Parçalama, ana blok zincirini ayrı parçalara böler ve düğümler yalnızca bir alt kümenin işlemlerini doğrular, paralel işlem doğrulamasına izin verir. Bu, ağın verimliliğini artırır. 

Alephium'un blok zinciri parçalıdır ve Blok Akışı algoritması bunu yönetir. Şu anda, her biri dört parçadan oluşan dört grup bulunmaktadır.

## R

## S

### Sanal Makine

Bir sanal makine, bir bilgisayarın yazılımını çalıştırmak için tasarlanmış bir yazılım uygulamasıdır. Fiziksel bir bilgisayarın donanımını simüle eder ve işletim sistemi ve diğer yazılım uygulamalarını çalıştırmak için bir ortam sağlar. Sanal makineler, fiziksel makineye benzer bir şekilde çalışır ve kendi işletim sistemleri ve uygulamaları vardır.

Blok zincirlerinde, bir sanal makine, akıllı sözleşmeler gibi kod parçalarını çalıştırmak için kullanılır. Blok zinciri üzerinde çalışan her düğüm, bir sanal makineyi çalıştırır ve akıllı sözleşmeleri bu sanal makine üzerinde çalıştırır.

Alephium'un Sanal Makinesi, Alphred olarak adlandırılır ve Ralph diliyle yazılan akıllı sözleşmeleri çalıştırır.

### Sert Çatal

Bir sert çatal, bir ağın protokolünde yapılan bir ana güncelleme, bu güncelleme ile önceki sürümü çalıştıran düğümler veya kullanıcılar artık ağda işlem gönderemez veya doğrulayamaz hale gelir.

Güncelleme isteğe bağlı olduğundan, bazen düğümlerin veya kullanıcıların bir kısmı bunu yapmamaya karar verir ve bu da o noktadan itibaren farklı bir blok zinciri sürümünün oluşturulmasına neden olur. Örneğin, bu Ethereum ve Ethereum Classic'te meydana geldi.

## Ş

## T

## U

### UTXO

UTXO, "kullanılmamış işlem çıkışı" anlamına gelir. Bir UTXO, bir işlemin bir girdisi olarak harcandığında kullanılır ve bir çıktı olarak bir işleme dahil edildiğinde kullanılmış olarak işaretlenir.

Bitcoin ve diğer birçok kripto para birimi, UTXO tabanlı bir muhasebe modelini kullanır. Bu, bir hesabın dengesini izlemek yerine, her işlemin, tıpkı bir nakit paranın fiziksel olarak parçalanabilir olması gibi, bir girdi ve bir çıktı olarak kaydedilmesi anlamına gelir.

Alephium'un ölçeklenebilirlik ve hızını artırmak için bir UTXO muhasebesi kullanır.

## Ü

## V

## Y

## Z
