# Köprü

## Öğreticiler ve Bağlantılar

Köprü Websitesi: https://bridge.alephium.org/#/

Köprü Keşif Websitesi: https://explorer.bridge.alephium.org/

Köprü Öğretici Makalesi (Ana Ağ): https://medium.com/@alephium/alephiumalephium-bridge-the-tutorial-28e7b92b339a

Alephium Köprüsü Nasıl Çalışır? Nasıl Kullanılır? (Makale): https://medium.com/@alephium/the-alephium-bridge-a787d90b2e4a

Köprü Öğretici (Ana Ağ): https://www.youtube.com/watch?v=xoYVzbwBAjg
 
## Köprü SSS

### 1. Yeterince bekledim ve hak talep edemiyorum! Ne yapmalıyım?

Lütfen şunları dikkate alın:

- ETH'den ALPH'a köprü kurma işlemi ortalama 15-20 dakika sürer.

- ALPH'tan ETH'ye köprü kurma işlemi biraz daha uzun sürebilir. İşlemin iki koşulu karşılaması gerekir: en az 105 blok ve en az 112 dakika. Koşullardan biri karşılanmazsa, hak talebinde bulunulamaz (henüz).

Çoğu durumda, tokenlerinizi talep etmek için biraz daha beklemek yeterlidir.

Hala çalışmıyorsa, lütfen köprüye bağlı cüzdanlarınızı bağlantısız hale getirin ve yeniden talep etmeyi deneyin (bkz.

Bu çalışmazsa, burada bir sorun açın.


### 2. Köprü, yeni bir cüzdan adresi oluşturmam gerektiğini bildirdi! Bu ne anlama geliyor?

Alephium'daki çoğu dapp ile etkileşim kurmak için Grup 0 adresi oluşturmanız gerekmektedir. İşte nasıl yapılır:

### Masaüstü:

Adresler sekmesine gidin ve "+ Yeni adres"i tıklayın.
Gelişmiş seçenekleri işaretleyin ve "Grup 0"ı seçin.
Adresi oluşturmak için üretmek üzerine tıklayın.
Köprü için bu adrese fonlarınızı aktarın.

### Uzantı:

Uygulamanın sol üst köşesindeki mevcut cüzdanınıza tıklayın.
Yeni bir adres eklemek için artı simgesini seçin.
Yeni adres için istenen grubu seçin.
Köprü için bu adrese fonlarınızı aktarın.


### Mobil:

Mobil uygulama sizin için adresi oluşturacaktır.
Oluşturulan adrese fonları aktarın.
Köprü işlemine devam edin.


Köprüleme için yeni oluşturulan adreslere fonlarınızı aktardığınızı unutmayın.

### 3. "Alınamadı" hataları alıyorum!

Bu hata, cüzdanınızın kendini kilitlemesi ile ilgilidir. Bu durumu aşmanın adımları basittir:


- Sayfanın alt kısmından İşlem Hash'inizi kopyalayın, belki lazım olur.
- Sayfayı yenileyin
- "İşlemler" sekmesine geçin.
- Cüzdanlarınızı yeniden bağlayın
- İşleminizi kurtarın.

### 4. Onaylar güncellenmiyor.


Genellikle bu, cüzdanlarınızdan birinin kendini kilitlemiş olması anlamına gelir. Lütfen sayfanın alt kısmından İşlem Hash'inizi kopyalayın, sayfayı yenileyin, cüzdanlarınızı yeniden bağlayın ve işlemi kurtarabileceğiniz hak talep etme sekmesine gidin.


### 5. İşlem 105 onaydan fazla ve hak talep edemiyorum!

ALPH'ten ETH'ye köprü kurma işlemi biraz daha uzun sürebilir. İşlemin iki koşulu karşılaması gerekir: en az 105 blok ve en az 112 dakika. Koşullardan biri karşılanmazsa, hak talebinde bulunulamaz (henüz). Sorun devam ederse, aşağıdakilerde sağlanan çözümleri deneyin:

- "Sorun 1. Yeterince bekledim ve hak talep edemiyorum! Ne yapmalıyım?"
- "Sorun 6. VAA hatası alıyorum! Ve hak talep edemiyorum."

Bu çalışmazsa, burada bir sorun açın.

### 6. VAA hatası alıyorum! Ve hak talep edemiyorum.


VAA hatası alıyorsanız ve yeniden denemeden önce beklemek işe yaramadıysa, aşağıdaki adımları deneyin:

- Sekmeyi kapatın ve yeniden açın.
- Cüzdanlarınızı bağlayın.
- İşleminizi "İşlemler" sekmesinden kurtarın.
- Yeniden deneyin.

Bu çalışmazsa, burada bir sorun açın.

### 7. Sadece USDT'yi ETH'ten ALPH'a köprü kurabilir miyiz?

Hayır. Örneğin, USDC, ETH, DAI, WBTC ve ALPH da dahil olmak üzere diğer tüm tokenları da köprüleyebilirsiniz. Sağlanan UI kullanarak, [1inch listesindeki](https://tokenlists.org/token-list?url=tokens.1inch.eth) tüm tokenları köprüleyebilirsiniz.

Ve akıllı sözleşmeyle doğrudan etkileşim kurarsanız, istediğiniz tüm erc20 tokenları köprüleyebilirsiniz.

### 8. ETH ve/veya USDC köprüledim, ancak AYIN havuzlarında likidite yok, ne yapabilirim?

Herhangi bir tokeni köprülemeden önce, yeterli likidite olup olmadığını kontrol edin, aksi takdirde bu tokenları geri köprülemeniz gerekebilir.


### 9. ALPH ERC-20 tokenını Metamask'ıma nasıl eklerim?

ALPH ERC-20 tokenınızı Metamask cüzdanınızda görmek için aşağıdaki adımları izlemeniz gerekecektir:

- [Buradan](https://etherscan.io/token/0x590F820444fA3638e022776752c5eEF34E2F89A6) Token Sözleşmesini alın.
- Metamask'ınızı açın ve kilidini açın.
- "Token Ekle"ye tıklayın.
- "Özel Token"u seçin
- Sözleşmeyi ilk alana kopyalayın ve yapıştırın.
- "İleri" ve ardından "Ekle"ye basın.
