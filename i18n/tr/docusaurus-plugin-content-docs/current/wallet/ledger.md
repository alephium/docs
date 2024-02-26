---
sidebar_position: 50
title: Ledger
sidebar_label: Ledger
---

![IMG_8932-2](https://github.com/alephium/alephium/assets/88235023/010e915e-0ecd-4f8f-808e-4223202eaecd)

## Bu, Ledger'ınıza Alephium Uygulamasını nasıl kuracağınızı ve işlemleri imzalamak için nasıl kullanacağınızı anlatan bir rehberdir

🚨 *Önemli bilgi: Alephium Cihazları için Alephium Uygulaması, Alephium tarafından özel/topluluk Uygulaması olarak geliştirilmiştir. Şu anda Ledger Live'da mevcut değildir. Bu işlemi nasıl gerçekleştireceğinizi anladığınızdan eminseniz devam edin!*

🚨 *Bu, erken Alfa sürümü olduğundan, üzerinde yönetilen başka paralar olmayan yeni/başlangıç bir cihaz kullanmanız önerilir.*

🚨 *Şu anda Ledger uygulaması sadece en son sürüm (v0.7.0) uzantı cüzdanıyla çalışmaktadır.*

### Video Rehberi
Video formatında bir rehber burada bulunabilir: https://www.youtube.com/watch?v=YBQy_siZh6w

### Yazılı Rehber

**1 — Yeni cüzdan sürümünü şuradan indirin**: Chrome — [Uzantı Cüzdanı](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) / Firefox — [Uzantı Cüzdanı](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)


**2 — Gerekli yazılımı kurun** (eğer zaten PIP ve Python kuruluysa, adım 3'e geçin)

Ledger'ınıza Alephium Uygulamasını almak için bilgisayarınızda Python ve PIP kurulu olması gerekmektedir:

* Python ([Windows için nasıl](https://www.simplilearn.com/tutorials/python-tutorial/python-installation-on-windows#:~:text=Python%20indirmek%20i%C3%A7in%2C%20Python%20web,and%20run%20the%20installer.), [Mac için nasıl](https://docs.python.org/3/using/mac.html), [Linux için nasıl](https://docs.python-guide.org/starting/install3/linux/))
* PIP ([Windows için nasıl](https://www.dataquest.io/blog/install-pip-windows/), [Mac için nasıl](https://www.groovypost.com/howto/install-pip-on-a-mac/), [Linux için nasıl](https://docs.python-guide.org/starting/install3/linux/))


**3 — Ledger Python Kütüphanesini Kurun**

![image](https://github.com/alephium/docs/assets/88235023/fade8c08-f3a1-41b2-b7e9-9a3cd638a683)

Ledger Python Kütüphanesini kullanacağız (burada bulabilirsiniz). Bu, özel bir Uygulamayı Ledger Cihazınıza yükleyeceğiniz için gereklidir.

Ledger Python Kütüphanesini kurmak için terminal penceresini açın ve aşağıdaki komutu yazın:

**pip3 install — upgrade protobuf setuptools ecdsa**

**pip3 install ledgerwallet**

Bu, tüm yükseltmeleri yapacak ve bir sonraki adımda gerekecek olan Ledger Cüzdan Kütüphanesini kuracaktır.

![Ledger Uygulamasını Yükle](https://github.com/alephium/docs/assets/88235023/f3f096e3-fb9b-4a8c-9a98-a060112b0f5f)

**4 — Alephium Ledger Uygulamasını bilgisayarınıza indirin**

Aşağıdaki GitHub deposuna gidin: https://github.com/alephium/ledger-alephium ve indirin.

🚨*Depoyu indirmek için, "Code" yeşil düğmesine tıklayın ve "Download Zip" seçeneğini seçin.*

![image](https://github.com/alephium/docs/assets/88235023/f699b669-1b00-4b2e-9649-5cedd221e0cb)

İndirin ve kolayca erişebileceğiniz ve tüm okuma/yazma izinlerine sahip olduğunuz bir klasöre çıkarın.

**5 — Alephium Uygulamasını Ledger Cihazınıza Kurun**

Ledger'ınız şimdi bilgisayarınıza bağlanmalı ve kilidi açılmalıdır.

GitHub deposuna gidin (https://github.com/alephium/ledger-alephium/tree/master) ve sizin Ledger sürümünüze uygun olan komutu bulmak için aşağı kaydırın:

![image](https://github.com/alephium/docs/assets/88235023/6c5df18d-c59f-4ae4-ad8c-3e7bceb65014)

Bu bilgiyle, konsol terminaline gidin ve Alephium Uygulamasını kurmak için komutu çalıştırın:

🚨 *Önemli bilgi: Komutu GitHub'dan dosyaları indirdiğiniz klasörün içinde çalıştırmanız gerekmektedir.*

Bu örnekte, Ledger Nano S kullanılmaktadır:

![image](https://github.com/alephium/docs/assets/88235023/d92896ef-5f9b-43a6-8f53-ab56f38c1700)

Bu komutu çalıştırdıktan sonra, Alephium Uygulamasını Ledger Cihazınıza kurma işlemini doğrulamanız gerekecektir. Kurulumu doğrulamak için tüm onayları geçirin ve pininizi ekleyin.

Başarılı olduğunda, Alephium simgesi cihazınızda görünecektir.

![image](https://github.com/alephium/docs/assets/88235023/7c41b2d3-ea5a-44ca-bd05-46338cf3274c)

Şimdi Ledger'ınızı Alephium'da işlemleri imzalamak için kullanmaya hazırsınız! 🎉

**6 — Uzantı Cüzdanınızı Ledger ile kullanın**

Uzantı cüzdanınızı kurduğunuz tarayıcıya gidin ve açın.

🚨 *Şu anda Ledger uygulaması sadece en son sürüm (v0.7.0) uzantı cüzdanıyla çalışmaktadır. Eğer yoksa, [buradan (Chrome)](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj/related) veya [buradan (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/) yükleyebilirsiniz.*

Uzantı cüzdanınızda yeni bir adres oluşturun: Mevcut adres adına tıklayın ve ardından " +" simgesine tıklayın. Bu sizi Ledger Bağlantı sayfasına yönlendirecektir:

* Ledger'ınızı takın ve kilidini açın;
* Alephium Uygulamasını açın (tüm adımları doğruladığınızdan emin olun!)
* Listeden Ledger cihazınızı seçin;
* Yapılandırmayı tamamlayın.

![yeni cüzdan kurulumu](https://github.com/alephium/alephium/assets/88235023/5fa7e000-2f77-4b44-9dfa-13b784e05eba)

**7 — İşlem Göndermek için Ledger Cihazını Kullanın!**

Buradaki tüm adımlar, uzantı cüzdanını kullanarak gördüğümüz tipik adımlardır:

* "Gönder" düğmesine tıklayın

![image](https://github.com/alephium/docs/assets/88235023/17eaf25a-5629-48cb-bee7-996513e9a7b4)

* Göndermek istediğiniz tokenı seçin:

![image](https://github.com/alephium/docs/assets/88235023/60a3ed3b-04f7-447a-9472-886147d2b5d4)

* Alıcının adresini seçin:

![image](https://github.com/alephium/docs/assets/88235023/b6b7aae2-4c9e-4048-934e-95caa93bf577)

* İşlem detaylarını gözden geçirin ve "Ledger ile imzala" ya tıklayın.

![image](https://github.com/alephium/docs/assets/88235023/fde7b7c2-b864-468e-bb3f-66448fe8a4d2)

* İşlemi Ledger Cihazınızda imzalayın ve "Aktivite" bölümünde tamamlanmasını izleyin:

![image](https://github.com/alephium/docs/assets/88235023/efffc0de-01f8-48d7-a67c-ed1487c95483)

** 8 — Ledger Cihazıyla Alephium'da dApp'lerle etkileşime girin** 

Artık Ledger Cihazınızla bir işlem imzaladınız, sıra onu bir dApp'e bağlamakta. Bu işlem de kolaydır.

[Testnet'te Alephium DEX'e](https://alephium.github.io/alephium-dex) erişin. Sağ üst köşedeki "Alephium ile Bağlan" düğmesine tıklayın. İstekte bulunun ve uzantı cüzdanını ve Ledger hesabını seçin.

![dex ile bağlan](https://github.com/alephium/alephium/assets/88235023/f3e6cf9e-e632-4bc0-84a8-67f38d067311)

Artık Alephium DEX'e bağlısınız. Bir takas işlemi yapın ve bunu imzalamak için Ledger'ınızı kullanın. İşlem, bir transfer işlemine benzer şekilde gerçekleşir.

![isimsiz](https://github.com/alephium/alephium/assets/88235023/bb263f71-3801-4be3-86cd-d7a18b525e0a)

Sorularınız veya önerileriniz varsa, lütfen [Alephium'un Discord](http://alephium.org/discord), [Telegram](https://t.me/alephiumgroup) kanalına gelin veya [Twitter'dan](https://twitter.com/alephium) bize ulaşın!
