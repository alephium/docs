---
sidebar_position: 90
title: Çoklu İmza Arayüzü
sidebar_label: Çoklu İmza Arayüzü
---

## Alephium Araç Seti: Çoklu İmza Cüzdanı Oluşturma Kılavuzu

*Çoklu imza cüzdanları, daha fazla granülerlik ve güvenlik sağladığı için olgunlaşan bir altyapıda temel bir rol oynarlar. Çekirdek ekibimiz, Alephium Araç Seti'nin ilk parçası olan Çoklu İmza Cüzdanı Oluşturma aracını gururla sunmaktan mutluluk duyuyor!*

![image](https://github.com/alephium/docs/assets/88235023/29f9c9e9-02e4-4d26-80bb-7d0e5c14b6d0)


### Neden Çoklu İmza Kullanmalı?

Kripto paralarda çoklu imza (multi-signature) cüzdanlar, artırılmış güvenlik ve varlıkların ortak kontrolü için kullanılır. Bir işlemi yetkilendirmek için birden fazla imza gerektirir, bu da saldırganların fonlara erişimini zorlaştırır. Harcamadan önce uzlaşma gereken kişiler veya kuruluşlar için faydalıdır, bir anahtar kaybolduğunda yedek bir çözüm olarak hizmet eder, düzenleyici uyumluluğa yardımcı olur ve tek anahtarlı cüzdanlarla ilişkilendirilen tek bir başarısızlık noktası riskini azaltır.

Fonların birden fazla kişi tarafından yönetilmesini istiyorsanız (örneğin, fonlar bir şirkete veya derneğe aitse) veya kendi cüzdanınız için birden fazla anahtarınız olmasını istiyorsanız, bunu çoklu imza cüzdanında yapmak iyi bir güvenlik uygulamasıdır. Bu konuda daha önce konuştuk!

Aşağıdaki kılavuzu kullanarak bir çoklu imza cüzdanı oluşturun ve işlemleri hazırlama, imzalama ve gönderme konusunda bilgi edinin. Discord'da herhangi bir sorunuz varsa çekinmeden bize bildirin.

### Çoklu imzanın nasıl çalıştığı?
Çoklu imza işlemleri, basit işlemlere benzer olmasına rağmen, işlem sürecinde bazı yapısal farklılıklar bulunmaktadır.

İlk olarak, birisi işlemi oluşturmalıdır, yani alıcıyı, miktarı ve işlemi imzalamak için kaç (ve hangi) imzalayıcının gerektiğini belirtmelidir.

Ardından, imzalayıcılar işlemi imzalamalı ve imzalarını rapor etmelidir.

Son olarak, oluşturucu imzaları birleştirir ve işlemi gönderir.

Bu örnek eğitimde, M'nin N kişinin işlemi imzalaması gereken bir çoklu imza hayal edeceğiz.


**1 — Tüm Halka Açık Anahtarları Alın**

İlk adım, çoklu imza'nın tüm imzalayıcılarının Halka açık anahtarlarını almak için şunları içerir.

Tüm imzalayıcılar aşağıdaki adımları tamamlamalıdır:

* https://alephium.github.io/alephium-toolkit/ adresine erişin.
* Karşılama sayfası "Cüzdan Bilgisi"dir.
* Sağ üst köşedeki "Alephium'a Bağlan" düğmesine tıklayın.
* dApp ile bağlanmak istediğiniz cüzdan türünü seçin.
* Başarılı bağlantıdan sonra, cüzdan bilgileriniz cüzdan bilgisi bölümünde görüntülenecektir.
* Halka açık anahtarınızı kopyalayın ve çoklu imzanın oluşturucusuna gönderin.

![image](https://github.com/alephium/docs/assets/88235023/235b6c73-5519-4231-9f46-21e822843bfe)


**2 — Cüzdanı Oluşturun**

İkinci adım, tüm imzalayıcıların halka açık anahtarlarıyla çoklu imzayı oluşturmaktan oluşur. Çoklu imzanın oluşturucusu (imzalayıcılardan herhangi biri (veya başka biri) olabilir) şunları tamamlamalıdır:

![image](https://github.com/alephium/docs/assets/88235023/43f25034-30af-4b70-9565-2514b656138c)

* [Çoklu İmza Cüzdanı Oluştur](https://alephium.github.io/alephium-toolkit/) sayfasına gidin
* Çoklu imzanız için bir ad seçin
* Her imzalayıcının "halka açık anahtarlarını" girin (ve bunları doğru bir şekilde adlandırın!). Olası imzalayıcılar kadar ekleyin.
* Bir işlemi gönderebilmek için gereken imzaların sayısını seçin (3'ten 2, 5'ten 3 veya herhangi bir M'den N'ye): bu çoklu imzanızın gerçekte bir işlem gönderebilmek için gereken kotağıdır.
* "Çoklu İmza Oluştur" a tıklayın
* Sonraki ekran, çoklu imzanın yapılandırmasının bir özetini gösterir. Her şeyin yolunda olduğunu kontrol edin.
* "Dışa Aktar" a tıklayın: Bu, diğer tüm imzalayıcılara geri göndermeleri için ihtiyacınız olan cüzdan bilgilerini kopyalar.

**3 — Çoklu imza cüzdanını içe aktarın** 

Bu üçüncü adımda, imzalayıcılar işlemleri imzalamak için çoklu imza cüzdanını içe aktaracaklardır. Tüm imzalayıcılar aşağıdakileri tamamlamalıdır:

![image](https://github.com/alephium/docs/assets/88235023/ddf154db-31c7-45b4-bd37-48c61811ebc5)

* [Çoklu İmza Cüzdanını İçe Aktar](https://alephium.github.io/alephium-toolkit/#/multisig/import) sayfasına gidin
* "Çoklu İmza İçe Aktar" a tıklayın
* Artık bu belirli çoklu imzada işlem oluşturabilir ve/veya imzalayabilirsiniz
* Bir sonraki adım, bazı fonları çoklu imzaya koymaktır, böylece gerçekten bir işlem oluşturabilir, imzalayabilir ve ardından gönderebilirsiniz!


**4 — $ALPH'yi çoklu imzaya gönderin**

Çoklu imza ile işlem yapmadan önce, ona bir miktar $ALPH göndermeniz gerekir.

![image](https://github.com/alephium/docs/assets/88235023/f16d17dd-1520-4869-8506-6ab0e0cc8209)

* [Çoklu İmza Cüzdanını Göster](https://alephium.github.io/alephium-toolkit/#/multisig/show) sayfasına gidin
* "Adres" içeriğini kopyalayın
* İstediğiniz cüzdanınıza gidin (başka bir çoklu imza, masaüstü veya uzantı cüzdanı olabilir) ve adresi alıcı alanına yapıştırın, miktarı, tokenı seçin ve gönderin! — Bu adresi başkasına da çoklu imzaya ödeme yapması için verebilirsiniz!
* (Bir token göndermek istiyorsanız, yine de gaz için bazı $ALPH göndermeniz gerekeceğini unutmayın, bu yüzden biraz da gönderin)


**5 — Bir işlem oluşturun**

Herhangi bir çoklu imza cüzdanı tarafından şimdi bir işlemi oluşturma yetkisine sahip olabilir. Dolayısıyla işlem oluşturucusu olarak harekete geçin ve bir işlem oluşturmaya başlayın:

![image](https://github.com/alephium/docs/assets/88235023/25a813a5-bbdc-4ade-874f-aa1d3c256368)

* [İşlem Oluştur](https://alephium.github.io/alephium-toolkit/#/multisig/build-tx) sayfasına gidin
* Listeden çoklu imzanızı seçin, ihtiyacınız/istediğiniz imzalayıcıları, miktarı ve işlem için alıcının adresini seçin. Doğru imzalayıcıları seçtiğinizden ve kota gereksinimini karşıladığınızdan emin olun!
* "İşlem Oluştur" a tıklayın. Bir işaretsiz işlem olan temel bir metin parçası alırsınız.
* Bunun kopyasını alın ve seçtiğiniz imzalayıcılara gönderin.

![image](https://github.com/alephium/docs/assets/88235023/df652c60-e247-4b6d-8363-e847729ef0d7)

**6 — İşlemi İmzalayın**

Bir çoklu imza işlemine taraf olduğunuzda, işlem oluşturucusu tarafından bir işlemi imzalamak için uzun bir metin parçası olarak gönderilen bir işlemi imzalamak istiyorsunuzdur, işte yapmanız gerekenler:

![image](https://github.com/alephium/docs/assets/88235023/2c4bc5fa-c262-4d8b-a102-03ab20529689)

* [İşlem İmzalama](https://alephium.github.io/alephium-toolkit/#/multisig/sign-tx) sayfasına gidin
* Çoklu imzaya taraf olduğunuzdan emin olun (çoklu imza cüzdanını içe aktarmadıysanız, bu çalışmayacak, bkz. adım 3)
* İşlem ayrıntılarını girin
* İşlem parametrelerini doğrulayın!
* "İmzala" ya tıklayın
* Cüzdanınız açılacak ve işlemi gösterecek: işlemi imzalayın.
* "İmzala işlem" sayfasında, işlem kimliğinin altında, bir imza görünecektir
* İmzayı kopyalayın ve "İşlem Oluştur" sayfasına yapıştırın (veya işlem oluşturucusuna geri gönderin!)

![image](https://github.com/alephium/docs/assets/88235023/c11ff378-ff58-4eef-9db3-021041205c3d)

**7 — İşlemi Gönderin**

Bu aşamada, cüzdan oluşturuldu, bir işlem oluşturuldu ve tüm imzalayıcılara dağıtıldı, işlemleri imzaladılar ve imzaları oluşturucuya geri gönderdiler. Şimdi yapması gerekenler şunlardır:

![image](https://github.com/alephium/docs/assets/88235023/2c1107b7-11f7-4cd0-982a-4c60ee90d924)

* [“İşlemi Oluştur”](https://alephium.github.io/alephium-toolkit/#/multisig/build-tx) sayfasına geri dönün
* İmzaları ilgili alana girin
* "Gönder" e tıklayın: işlem gönderilecektir.
* İzleyicide kontrol etmek için “keşfedici üzerinde görüntüle” ye tıklayabilirsiniz

![image](https://github.com/alephium/docs/assets/88235023/6fcec318-8c61-4c33-9157-d9cd66f0e3d8)

Ve işte bu kadar!

Alephium üzerinde başarılı bir şekilde çoklu imza cüzdanı oluşturdunuz ve bir işlem göndermek için kullandınız. Hem güvenlik hem de esneklik değer verenler ve fonların sahipliğini başkalarıyla paylaşma ihtiyacı duyanlar için, çoklu imza cüzdanı kripto silahınızda güçlü bir araçtır. Unutmayın, finansın geleceği yalnızca dijital varlıklara sahip olmakla ilgili değil, [akıllıca güvenliğini sağlamakla ilgilidir](https://medium.com/@alephium/ttxoo-2-the-road-to-self-custody-cfea4ae89444).

*Düşüncelerinizi bize bildirin, kodun gelişimini [Github](https://github.com/alephium) üzerinden takip edin, haberleri [Twitter](https://twitter.com/alephium) & [Medium](https://medium.com/@alephium) üzerinden takip edin veya [Discord](https://discord.com/invite/GEbcpajCJG) & [Telegram](https://t.me/alephiumgroup) üzerinde etkileşime geçin!*

### Çoklu İmza SSS:

**Neden çoklu imza cüzdan adresi çok uzun?**

Yerel çoklu imzayı mümkün olduğunca basit hale getirmek istedik, bu nedenle adres şu anda daha fazla bilgi içerir. Sonunda, Ethereum'da kullanılabilir olan akıllı sözleşmelere dayalı daha kısa çoklu imza adreslerini de benzer şekilde uygulayabiliriz.

**5'ten 3, herhangi 3'ten 5'i mi ifade ediyor?**

Hayır. Bir işlem oluşturduğunuzda, 5 imzalayıcıdan 3'ünün belirtilmesi gereken 3 imzalayıcıyı belirlemelisiniz. Bir işlem, sadece oluşturma sürecinde belirlenen 3 imzalayıcı tarafından imzalandığında geçerlidir. Bir işlem için imzalayıcı kümesini değiştirmek istiyorsanız, yeniden oluşturmanız gerekir.

**Araç takımı, çoklu imza cüzdanlarını oluşturmak ve kullanmak için tek yol mudur?**

Hayır, çoklu imza cüzdanları düğüm cüzdanını kullanarak oluşturulabilir ve yönetilebilir. Buna ilişkin öğreticiyi [burada](https://docs.alephium.org/misc/multisig-guide/) bulabilirsiniz.
