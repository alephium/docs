---
sidebar_position: 60
title: Varlık İzin Sistemi (APS)
sidebar_label: Varlık İzin Sistemi (APS)
---

Varlık İzin Sistemi (APS), Ralph'ın benzersiz özelliklerinden biridir. Kod düzeyinde varlıkların akışını açıkça belirtir, geliştiricilere ve akıllı sözleşme kullanıcılarına tüm varlık transferlerinin amaçlandığı gibi gerçekleştiği konusunda güven sağlar. UTXO modeli ile birlikte, EVM gibi sistemlerdeki token onay risklerini ortadan kaldırarak daha basit ve daha güvenli bir kullanıcı deneyimi sunar.

Alephium, varlıkların, dahil olmak üzere, yerel ALPH ve diğer tokenlerin UTXO'lar tarafından yönetildiği [sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) modelini kullanırken, akıllı sözleşmeler ve durumları hesap tabanlı model kullanılarak yönetilir.

Bu birkaç sonuç doğurur:

1. Kullanıcılar arasındaki basit varlık transferleri sadece UTXO'ları gerektirir ve varlıkları yönetme konusunda güvenliği kanıtlanmıştır. Burada akıllı sözleşmeler devreye girmez.
2. Akıllı sözleşmeler, sahiplerinin adına varlık transfer etmek istediğinde, ayrı onay işlemleri gerekmez. Onay, UTXO modelinde zımni olarak yapılır: belirli bir tokeni içeren girişin işlemde harcanmasına izin verilirse, sahibi o tokenin bu işlem bağlamında kullanımına zaten onay vermiş demektir; yani aynı işlemde çağrılan akıllı sözleşmeler potansiyel olarak tokeni aktarabilir.

Şimdi soru şudur: ikinci durumda, UTXO modelini kullanarak işlemde zımni olarak onaylanan varlıkların akıllı sözleşmeler tarafından güvenli bir şekilde işleneceğinden nasıl emin olabiliriz? Cevap, Ralph'ın Varlık İzin Sistemi (APS)'dir.

## Varlık Akışı

Alephium'daki akıllı sözleşmelerle etkileşim kurmak için bir işlemin bir `TxScript`i yürütmesi gerekir. Aşağıdaki örnek işlemde iki giriş, bir sabit çıkış ve bir `TxScript` bulunmaktadır:

```
                  ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 ALPH (fixed output)
================> |              | ========================>
   6.1 ALPHs      |  <TxScript>  |   ??? (generated output)
================> |              | ========================>
                  |              | 
                  |              | 
                  |              |
                  ----------------
```

Burada iki şey dikkate değerdir:

1. Yalnızca bir sabit çıkış olsa bile, bu işlem için daha fazla çıkış oluşturulacaktır. Oluşturulan çıkışlar, `TxScript` yürütmesinin sonucuna bağlıdır.
2. `TxScript` için mevcut olan toplam varlıklar (çağrılan akıllı sözleşmeler de dahil olmak üzere), `1` ALPH ve `1` Token A'dır, çünkü sabit çıkışta `1` ALPH çıkarılması gerekir.

Varsayalım ki `TxScript` şuna benziyor:

```rust
TxScript ListNFT(
    tokenAId: ByteVec,
    price: U256,
    marketPlace: NFTMarketPlace
) {
    let listingFee = marketPlace.getListingFee()
    let minimalAlphInContract = 1 alph
    let approvedAlphAmount = listingFee + minimalAlphInContract

    marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
}
```

Muhtemelen tahmin ettiğiniz gibi, Token A bir NFT tokenidir ve yukarıdaki `TxScript` in amacı bunu bir pazar yeri akıllı sözleşmesi aracılığıyla listelemektir.

Özellikle ilginç olan şu satırdır:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

Ayraçların içindeki kod, `approvedAlphAmount` ALPH ve `1` token A'nın, toplam varlıkların sırasıyla `5.1` ve `1` ALPH ve token A için mevcut olduğu halde, `marketPlace.listNFT` işlevinde harcanmasına izin verildiğini açıkça onaylar.

Aşağıdaki senaryolar meydana gelebilir:

1. Eğer `approvedAlphAmount`, `5.1` ALPH'den fazlaysa, o zaman işlem `YeterliBakiyeYok` hatası ile başarısız olur.
2. Eğer `approvedAlphAmount`, `5.1` ALPH'den azsa, örneğin `1.1` ALPH ise, o zaman `marketPlace.listNFT`'nin ele alabileceği varlıkların maksimum miktarı `1.1` ALPH ve `1` token A'dır. `marketPlace.listNFT`, kalan `4` ALPH'e erişemez.
3. Eğer `marketPlace.listNFT`, onaylanan varlıkların tamamını harcamamışsa, kalan varlıklar, `marketPlace.listNFT` döndüğünde sahiplerine geri döner.

Şimdi biraz daha yakından `marketPlace.listNFT` işlevine bakalım:

```rust
Contract NFTMarketPlace(
    nftListingTemplateId: ByteVec
) {
    // Other code are omitted for brevity

    pub fn getListingFee() -> U256 {
        return 0.1 ALPH
    }

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
    pub fn listNFT(
        tokenId: ByteVec,
        price: U256
    ) -> (Address) {
        assert!(price > 0, ErrorCodes.NFTPriceIsZero)

        // Only owner can list the NFT
        let tokenOwner = callerAddress!()

        let (encodeImmutableFields, encodeMutableFields) = NFTListing.encodeFields!(tokenId, tokenOwner, selfAddress!(), commissionRate, price)
        // Create the listing contract
        let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
            tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
        )

        // Charge the listing fee
        transferTokenToSelf!(tokenOwner, ALPH, listingFee)

        return contractIdToAddress!(nftListingContractId)
    }
}
```

İlk dikkat edilmesi gereken şey, `listNFT` yöntemi için yapılan açıklamadır:

```rust
@using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
```

`preapprovedAssets = true`, `listNFT` yönteminin bazı varlıkları kullanmayı amaçladığını ve çağrıcının gerekli varlıkları onaylaması gerektiğini belirtir, aksi takdirde bir derleme hatası rapor edilir. Çağrıcının `preapprovedAssets = false` olduğu bir yöntem için varlıkları onaylamaya çalışması durumunda derleme de başarısız olacaktır.

`assetsInContract = true`, `listNFT` yönteminin, `NFTMarketPlace` sözleşmesinin varlığını güncellemek istediğini VM'ye bildirir. Derleyici, `listNFT` yönteminin bunu gerçekten yapmasını sağlar, aksi takdirde bir derleme hatası rapor edilir. Bu durumda, `listNFT`, `listingFee`'yi aktararak `NFTMarketPlace` sözleşmesinin varlığını günceller:

```rust
// Charge the listing fee
transferTokenToSelf!(tokenOwner, ALPH, listingFee)
```

`updateFields` açıklaması bu belgelendirme kapsamı dışındadır.

`marketPlace.listNFT` yöntemi, aşağıda gösterildiği gibi `TxScript` `ListNFT` tarafından çağrılır:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

`marketPlace.listNFT`, `TxScript`'in çağrıcısından `1.1` ALPH ve `1` token harcaması için yetkilendirilmiştir. Eğer `marketPlace.listNFT` başka yöntemleri çağırıyorsa, bu onaylanan varlıkların bir alt kümesini o yönteme de onaylayabilir. Örneğin, `marketPlace.listNFT` içinde bir NFT listelemesi oluşturmak için aşağıdaki kodu bulunmaktadır:

```rust
let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
    tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
)
```

Görüleceği gibi, `marketPlace.listNFT` yöntemi, kendi onaylanmış varlıklar havuzundan (`1.1` ALPH ve `1` Token A) `copyCreateSubContract!` yerleşik fonksiyonuna `1` ALPH ve `1` Token A'yı onaylar, ardından `listingFee`'yi `NFTMarketPlace` sözleşmesine göndermeden önce. Varlık akışı aşağıda gösterilmiştir:

```
  Caller of the TxScript
  (6.1 ALPH; 1 Token A)
           ||
           ||
           || Subtract assets in
           || Fixed outputs
           ||
           ||                    Approves                         Approves
           \/               (1.1 ALPH; 1 TokenA)              (1 ALPH; 1 TokenA)
  (5.1 ALPH; 1 Token A)  ========================> listNFT ========================> copyCreateSubContract!
                                                     ||
                                                     ||
                                                     || To self
                                                     ||
                                                     \/
                                                  (0.1 ALPH)
```

Daha büyük bir yöntem çağrı ağacına sahipsek, onaylanan fonlar, su gibi, ağacın kökünden yapraklara kadar akar. Varlık İzin Sistemi, bu fon akışını yöntem çağrıları boyunca açıkça belirginleştirir ve her bir yönteme hangi tokenlerin ve ne kadarının harcanabileceğine dair kısıtlamalar getirir.

İşleme geri dönerek, `TxScript`in yürütülmesinden sonra oluşturulan çıkışlar aşağıdakilere benzemelidir:

```
                        ----------------
                        |              |
                        |              |   1 ALPH (fixed output)
  1 Token A             |              | =========================================>
======================> |              |   1 ALPH, 1 Token A (NFTListing contract)
  6.1 ALPHs             |  <TxScript>  | =========================================>
======================> |              |   0.1 ALPH (NFTMarketPlace contract)
                        |              | =========================================>
                        |              |   4 ALPH - gas (change output)
                        |              | =========================================>
                        |              |
                        ----------------
```

## Özet

Varlık İzin Sistemi (APS), akıllı sözleşmelerde varlıkların akışını belirler. Her yöntem çağrısı için varlıkların açıkça onaylanması, yöntemlerin yetkilendirildiklerinden fazlasını asla harcamayacaklarından emin olur. UTXO modeli ile birlikte, daha basit, daha güvenilir ve daha güvenli bir varlık yönetimi çözümü sunar.