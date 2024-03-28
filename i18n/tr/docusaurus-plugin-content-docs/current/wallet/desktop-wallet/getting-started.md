---
sidebar_position: 20
title: Başlarken
sidebar_label: Başlarken
---

# Başlarken

## 1. Kurulum

1. [En son sürümü](https://github.com/alephium/desktop-wallet/releases/latest)nden indirin ve çift tıklayarak uygulamayı kurun. İşletim sisteminize uygun olanı seçin (macOS, Windows, Linux).
2. Linux ve Windows'ta masaüstü cüzdanını başlatmak için uygulamaya çift tıklayın. macOS'ta, Uygulamalar klasörüne gidip Alephium uygulamasına sağ tıklayın ve ardından _Aç_ seçeneğini tıklayın (çift tıklama yapmayın, çalışmaz, ancak Sistem Tercihlerinden izin verirseniz çalışır).

## 2. Cüzdan Oluşturma

:::info

Varsayılan olarak, cüzdan Alephium genel düğümüne bağlanır. Kişisel düğümünüzü kullanmak veya cüzdanı çevrimdışı oluşturmak isterseniz, uygulamanın sağ üst köşesindeki ayar çarkına tıklayarak Node Host'u localhost olarak değiştirebilir veya boş bırakabilirsiniz.

:::

<img src={require("./media/gs1.png").default} alt="Masaüstü Cüzdanı Ana Sayfası" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs2.png").default} alt="Yeni cüzdan oluşturma uyarısı" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs3.png").default} alt="Bir isim seçme ve şifre belirleme uyarısı" width="auto" style={{ height: '200px' }} />

1. `Yeni bir cüzdan oluştur / İçe aktar` seçeneğine tıklayın, ardından `Yeni cüzdan` seçeneğini tıklayın.

2. Cüzdanınızı bilgisayarınızda korumak için bir cüzdan adı seçin ve bir şifre belirleyin. Bu şifre, cüzdanınızın 24 kelime Gizli Kurtarma Cümlesiyle değiştirmez. Yalnızca yeni oluşturulan cüzdanı kilitlemek ve açmak için kullanılır.
   `Devam` seçeneğine tıklayın.

<img src={require("./media/gs4.png").default} alt="24 gizli kelimenin görüntüsü" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs5.png").default} alt="24 gizli kelimenin doğrulama uyarısı" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs6.png").default} alt="Yeni bir cüzdanın ana sayfası" width="auto" style={{ height: '200px' }} />

3. Vurgulanan kutuda, cüzdanınızın 24 kelime Gizli Kurtarma Cümlesi görünecektir. Bu en değerli bilginizdir ve dikkatlice, güvenli ve özenli bir şekilde saklamalısınız.

4. Şimdi, 24 kelime Gizli Kurtarma Cümlesini doğru bir şekilde aldığınızı doğrulamanız istenecektir. `Hazır` seçeneğine tıklayın ve doğru sırayla kelimeleri seçin. İşlem doğru yapıldıysa, kelimeler yeşil renge döner. Bir hata yapıldıysa, kelimeler kırmızı renge döner: endişelenmeyin, kelimeleri doğru bir şekilde sıralayana kadar yeniden düzenleyebilirsiniz.

5. Her şey hazır! Yeni cüzdanınıza hoş geldiniz.

## 3. ALPH Transferi

<img src={require("./media/gs7.png").default} alt="Masaüstü Cüzdanı Ana Sayfası" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs8.png").default} alt="Hedef adres ve işlem miktarını girmek için uyarı" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs9.png").default} alt="Hedef adres ve işlem miktarını girmek için uyarı" width="auto" style={{ height: '200px' }} />

1. ALPH göndermek için, sol menüdeki `Gönder` düğmesine tıklayın.

2. ALPH miktarını (örneğin 100) ve alıcının adresini girin.

3. (İsteğe bağlı) Kilit süresini belirlemek için ilgili kutuyu işaretleyebilirsiniz. Bu durumda, ALPH alıcı adresine gönderilecek, ancak belirttiğiniz tarihe kadar zincir üzerinde kilitli kalacaktır. Lütfen unutmayın, işlem gönderildikten sonra kilit süresini değiştirmek mümkün değildir.

4. İşlem detaylarını dikkatlice kontrol etmek için `Kontrol Et` seçeneğine tıklayın. `Gönder`e tıkladığınızda ALPH alıcıya transfer edilecektir.

:::info

İşlem, belirli bir adrese tıklandığında hem `Genel Bakış` hem de `Adresler` sekmesinde görülebilir.

:::

## 4. Adresleri Yönetme

Mevcut tüm adresler, etiketleri, bakiyeleri, grup numaraları vb. bilgilerle bir liste halinde `Adresler` sekmesinde görüntülenir.

<img src={require("./media/gs10.png").default} alt="Adres sayfası" width="auto" style={{ height: '200px' }} />

`+ Yeni adres` düğmelerinden birine tıklamak, yeni adresi oluşturma ve etiketleme sayfasına götürür. Varsayılan olarak, adresler rastgele bir grupta oluşturulur. `Gelişmiş seçenekler` bölümünde belirli bir grup seçebilirsiniz.

<img src={require("./media/gs11.png").default} alt="Yeni bir adres oluşturma uyarısı" width="auto" style={{ height: '200px' }} />

Bir adresin üzerine tıkladığınızda, adresin ayrıntılarını ve işlem geçmişini göreceksiniz.

<img src={require("./media/gs12.png").default} alt="Tek bir adresin görünümü" width="auto" style={{ height: '200px' }} />

Uygulamanın üstündeki Ayarlar çarkını kullanarak Adres etiketini düzenleyebilir, varsayılan adres olarak seçebilir veya kilidi açık olan tüm fonları istediğiniz bir adrese aktarabilirsiniz.

<img src={require("./media/gs13.png").default} alt="Adres seçeneklerini yapılandırma uyarısı" width="auto" style={{ height: '200px' }} />
