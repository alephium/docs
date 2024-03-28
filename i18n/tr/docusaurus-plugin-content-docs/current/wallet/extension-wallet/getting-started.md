---
sidebar_position: 20
title: Başlarken
sidebar_label: Başlarken
---

### Kurulum

Alephium uzantı cüzdanı hem [Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) hem de [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/) için mevcuttur.

### Cüzdan Oluşturma

<img src={require("./media/new-wallet-1.png").default} alt="Cüzdan oluşturma"/>

1. Tarayıcınızdaki Alephium uzantı cüzdanı simgesine tıklayın.
2. Ana sayfada, `Yeni cüzdan` düğmesine tıklayın.
3. Cüzdanınızı korumak için şifreyi girin.
4. Tamamlandı! Cüzdanınız oluşturuldu.

Şimdi cüzdanınızda herhangi bir varlık bulunmamaktadır. Bir sonraki adımda, bu cüzdana bazı ALPH tokenları transfer edelim.

### Varlık Transferi

#### ALPH Token Faucet

`devnet` ve `testnet` için, uzantı cüzdanında yerleşik bir `ALPH` token faucet bulunur. Her seferinde `devnet` için `1000` `ALPH` ve `testnet` için `12` `ALPH` alabilirsiniz.

<img src={require("./media/token-faucet-1.png").default} alt="Fon Al" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/token-faucet-2.png").default} alt="Token Faucet" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/token-faucet-3.png").default} alt="Token Alındı" width="250" />

#### ALPH Transferi

Başka bir hesaptan `ALPH` transferi de yapabilirsiniz:

<img src={require("./media/transfer-alph-1.png").default} alt="Genel Bakış" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alph-2.png").default} alt="Transfer Sayfası" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alph-3.png").default} alt="Transferi İncele" width="250" />

Transfer işlemini imzaladıktan sonra, işlemin durumunu `Aktivite` sekmesinden takip edebilirsiniz. İşlem onaylandığında, transfer edilen `ALPH` miktarı alıcı hesapta yansıtılır.

<img src={require("./media/received-alph-1.png").default} alt="Bekleyen İşlem" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/received-alph-2.png").default} alt="Onaylanmış İşlem" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/received-alph-3.png").default} alt="ALPH Alındı" width="250" />

Bu kadar! Başarıyla bir miktar `ALPH` transfer ettiniz.

#### Token Transferi

Diğer değiştirilebilir tokenların transfer süreci, `ALPH` tokenını transfer etme süreciyle temelde aynıdır:

<img src={require("./media/transfer-alphpaca-1.png").default} alt="Token Transferi 1" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-2.png").default} alt="Token Transferi 2" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-3.png").default} alt="Token Transferi 3" width="250" />

Daha fazla bilgi için lütfen [Değiştirilebilir Tokenlar](/tokens/fungible-tokens) rehberine başvurun.

### NFT Desteği

Alephium uzantı cüzdanı ayrıca NFT'leri görüntüleme ve transfer etme desteği sunar, aşağıda gösterildiği gibi:

<img src={require("./media/display-nft-collections.png").default} alt="Koleksiyonları Görüntüle" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/display-nft-collection.png").default} alt="Koleksiyonu Görüntüle" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-nft.png").default} alt="NFT Transferi" width="250" />

Daha fazla bilgi için lütfen [Değiştirilemez Tokenlar (NFT'ler)](/tokens/non-fungible-tokens) rehberine başvurun.

### Hesap Yönetimi

Alephium uzantı cüzdanındaki hesap, bir genel adres ve buna karşılık gelen özel anahtar içeren bir dijital konteyneri temsil eder ve kullanıcının Alephium blok zincirinde varlık almasına, saklamasına ve transfer etmesine olanak tanır.

Alephium uzantı cüzdanı, kullanıcıların aynı anda birden fazla hesabı yönetmelerine olanak tanır. Örneğin, Alice `Maaş`, `Tasarruf` ve `2023 Tatili` için ayrı ayrı birer hesap sahibi olabilir.

#### Hesap Oluşturma
Ek bir hesap eklemek için aşağıdaki adımları izleyin:

<img src={require("./media/manage-accounts-1.png").default} alt="Genel Bakış" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-2.png").default} alt="Hesap Listesi" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-3.png").default} alt="Hesap Ekle" width="250"/>

Hesap oluşturmadan önce seçebileceğimiz birkaç seçenek bulunur:

- `Grup`: Mevcut seçenekler `0`, `1`, `2` veya `3`'tür. `herhangi` seçilirse, oluşturulan hesabın ait olduğu grup rastgele olacaktır.
- `İmza`: Mevcut seçenekler `varsayılan` ve `schnorr`dur. `varsayılan`, Alephium işlemlerini imzalamak için kullanılan varsayılan Alephium imza türünü temsil ederken, `schnorr`, [Nostr](https://nostr.com/) gibi protokollerle etkileşimde bulunurken kullanışlı olan `BIP340` Schnorr imza türünü temsil eder.
- `Hesap Türü`: Mevcut seçenekler `Alephium Hesabı` veya `Ledger Hesabı`'dır. Ledger entegrasyonu hakkında daha fazla bilgi için lütfen [Ledger](/wallet/ledger) rehberine başvurun.

İstenen seçenekleri seçtikten sonra, yeni bir hesap oluşturulacak ve kullanıma hazır olacaktır.

#### Hesap Düzenleme
Varolan bir hesabın adını düzenleyebilir, özel anahtarını dışa aktarabilir, bir hesabı silebilir vb.:

<img src={require("./media/manage-accounts-4.png").default} alt="Hesap Listesi" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-5.png").default} alt="Hesap Düzenleme" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-6.png").default} alt="Özel Anahtarı Dışa Aktar" width="250"/>
