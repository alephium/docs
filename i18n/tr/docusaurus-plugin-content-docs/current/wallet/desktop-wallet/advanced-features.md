---
sidebar_position: 40
title: Gelişmiş Özellikler
sidebar_label: Gelişmiş Özellikler
---

# Gelişmiş Özellikler

## 1. UTXO birleştirme

:::info

UTXO'nun doğası gereği, her bir işlem yapıldığında, çeşitli miktarda ALPH içeren yeni Kullanılmamış İşlem Çıktıları (UTXO) oluşturulur. Bu UTXO'lar zaman zaman birleştirilmezse, bir UTXO, "toz" olarak adlandırılan bir noktaya ulaşabilir. Bir UTXO'daki miktar, içerdiği ALPH'leri göndermek için gereken GAZ maliyetinden daha küçükse, bu ALPH'ler artık taşınamaz.

Bunu önlemek için, cüzdan size bir düğmeye tıklayarak UTXO'larınızı kolayca birleştirme imkanı sunar.

:::

`Adresler` sekmesinde, `Gelişmiş işlemler` simgesine tıklayın ve `UTXO'ları birleştir` seçeneğini seçin.

<img src={require("./media/af1.png").default} alt="UTXO birleştirme" width="auto" style={{ height: '200px' }} />

<img src={require("./media/af4.png").default} alt="UTXO birleştirme" width="auto" style={{ height: '200px' }} />

UTXO'ları birleştirmek istediğiniz adresi seçin ve hedef adresi seçin (aynı adres olabilir). `Birleştir` düğmesine tıklayın ve UTXO'larınız birleştirilecektir.

<img src={require("./media/af2.png").default} alt="Ana sayfa" width="auto" style={{ height: '200px' }} />

## 2. Parola (GELİŞMİŞ GÜVENLİK ÖZELLİĞİ)

Sürüm 1.3.0'da tanıtıldı

:::caution
Bu özelliği kullanmadan önce lütfen aşağıdaki belgelendirmeyi ve bu [makaleyi](https://medium.com/@alephium/bip39-passphrase-implementation-f87adecd6f59) okuyun.
:::

### 1. Önemli Noktalar

- Parola, mevcut Gizli Kurtarma Cümlesi'ne eklediğiniz bir ek kelime olan gelişmiş bir güvenlik özelliğidir.
- Bir Parola kullanmak, yalnızca Gizli Kurtarma Cümlesi ile erişilemeyen tamamen yeni bir cüzdan oluşturur.
- Masaüstü cüzdan parolası, Gizli Kurtarma Cümlesini şifrelemek ve depolamak için yalnızca bilgisayarınızda kullanılır. Parola, cüzdanda depolanmaz ve Gizli Kurtarma Cümlesine ek bir kelimedir.
- Başka bir güvenlik katmanı eklemenin yanı sıra, Parola size inkar edilebilirlik sağlar.
- **Parola kullanmaya karar verirseniz, Parolayı Gizli Kurtarma Cümlesinden farklı bir fiziksel konumda güvenli bir şekilde depolamak ve yedeklemek çok önemlidir. Parolanızı mükemmel bir şekilde hatırlamalısınız. Tek bir karakteri değiştirmek (örneğin, küçük harften büyük harfe geçmek bile), tamamen yeni bir cüzdanın oluşturulmasına neden olur.**

Masaüstü cüzdan uygulamasını kullanarak bir cüzdan oluşturduğunuzu varsayalım. Bu cümle, cüzdanınızı geri yüklemek ve fonlarınıza erişmek için kullanılabilir. Bu 24 kelimelik Gizli Kurtarma Cümlesi çalınırsa, saldırgan fonlarınızı çalabilir. Masaüstü cüzdan kullanıcılarımızın güvenliğini artırmak ve 24 kelimelik Gizli Kurtarma Cümlesinin çalınması nedeniyle fon kaybını önlemek için [BIP39 parola](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) özelliğini uyguladık.

Parola, kendiniz için istediğiniz ek isteğe bağlı 25. kelime olup, herhangi bir küçük/büyük harf karakteri, sayı ve/veya işaret içerebilir ve istediğiniz kadar uzun olabilir.

### 2. Parola nasıl kullanılır

:::warning

Herhangi bir benzersiz Parola'nın tamamen yeni bir cüzdan oluşturacağını ve erişim sağlayacağını hatırlamak önemlidir. Parolayı Gizli Kurtarma Cümlesinden farklı bir fiziksel konumda güvenli bir şekilde depolamak ve yedeklemek çok önemlidir. **Parolanızı mükemmel bir şekilde hatırlamalısınız. Tek bir karakteri değiştirmek (örneğin, küçük harften büyük harfe geçmek bile), tamamen yeni bir cüzdanın oluşturulmasına neden olur.**

:::

Parola kullanmak için, sadece `İsteğe bağlı parolayı kullan (gelişmiş)` seçeneğini işaretleyin ve istediğiniz isteğe bağlı Parolayı girin.

<img src={require("./media/af5.png").default} alt="Ana sayfa" width="auto" style={{ height: '200px' }} />

### 3. Parola etkinleştirilmiş cüzdanların sınırlamaları

1. Oluşturulan adresler için renkli etiketleri kullanamazsınız (henüz).
2. Her oturum açmadan sonra ek olarak oluşturulan adresler yeniden oluşturulmalıdır.

Bu gelecekte değişebilir.
