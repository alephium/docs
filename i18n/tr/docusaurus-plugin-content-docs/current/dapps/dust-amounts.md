---
sidebar_position: 30
title: Toz Miktarı
sidebar_label: Toz Miktarı
---

Alephium'un benzersiz [sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749) modeli, UTXO modelinin güvenliğini ve hesap modelinin ifade yeteneğini birleştirir. Alephium'daki tüm varlıklar, yerel ALPH ve diğer [jetonlar](/tokens/overview) dahil olmak üzere, UTXO'lar tarafından yönetilir. UTXO modeli birçok güvenlik avantajını masaya getirirken (örneğin, [Varlık İzin Sistemi'ni](http://localhost:3000/ralph/asset-permission-system) görün), aynı zamanda UX etkileri olan bir takasla da gelir: özellikle **toz miktarı** kavramı. Bu makalenin amacı bu konuda biraz netlik getirmektir.

Her UTXO, sözde [UTXO setinin](https://en.wikipedia.org/wiki/Unspent_transaction_output#UTXO_set) boyutuna katkıda bulunur. Boyutunun kontrol edilmesi için etkili bir mekanizmanın olmaması durumunda, UTXO seti, özellikle IO'ya gelindiğinde, blockchain için önemli performans engelleri yaratabilir. Nispeten küçük bir UTXO setinin korunması, Alephium'un kendisinin en iyi sürümü olmaya devam etmesi için önemlidir: etkin, performanslı ve ölçeklenebilir.

Çok küçük bir değere sahip UTXO'lar da harcanması ekonomik olmayabilir, çünkü bir UTXO'nun harcanma işlem ücreti, UTXO'nun değerinden daha fazla olabilir. Zamanla, bu, kullanıcıların sistemin uzun vadeli sağlığı ile uyumlu olmadığı bir durum yaratabilir.

Bu, tüm UTXO tabanlı blockchain'lerin karşılaştığı bir sorundur. UTXO setinin boyutunu kontrol altında tutmak için, Bitcoin Core, [toz](https://bitcoin.stackexchange.com/questions/10986/what-is-meant-by-bitcoin-dust/41082#41082) kavramını tanıttı. Bir kullanıcı, bir UTXO'yu toz limitinin altında bir değerle oluşturmaya çalışırsa, Bitcoin Core, blockchain'in durum şişmesini önlemek için bunu ağa iletmez. Alephium'daki **toz miktarı** kavramı, Bitcoin'deki toz limitine benzer, ancak işlem türüne bağlı olarak değişmez, bu yüzden düşünmek daha da basittir. Bir işlem çıktısı, en az **toz miktarı** ALPH içermiyorsa, Alephium blockchain işlemi geçersiz olarak kabul eder.

Düzenli UTXO'lar için, **toz miktarı** `0.001` ALPH'dir. Bu, aşağıdaki işlemlerin geçersiz olduğu anlamına gelir:

```
1)                ----------------
                  |              | 0.0005 ALPH (ALPH too small)
    1 ALPH        |              | =============================>
================> |              |
                  |              | (0.9995 - gas fee) ALPH
                  |              | =============================>
                  ----------------

2)                ----------------
                  |              |
                  |              |
                  |              | 1 Token A
  1 Token A       |              | 0.0005 ALPH (ALPH too small)
================> |              | =============================>
                  |              |
  1 ALPH          |              | (0.9995 - gas fee) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------

3)                ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 Token A (no ALPH)
================> |              | =============================>
                  |              |
   1 ALPH         |              |   (1 - gas fee) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------
```

İkinci ve üçüncü durum, kullanıcının niyetinin Jeton A'yı göndermek olsa bile, en az bir toz miktarı ALPH'nin de gönderilmesi gerektiğini göstermektedir. Özetle, her düzenli UTXO en az `0.001` ALPH gerektirir, aksi takdirde işlem başarısız olur. Bu basit yaklaşım, Alephium sistemindeki UTXO setinin boyutunun bir üst sınırının olmasını sağlar.

Her sözleşmenin Alephium sisteminde tam olarak bir UTXO'su vardır. Sözleşme UTXO'ları için (ayrıca **sözleşme teminatı** olarak da bilinir) toz miktarı şu anda `1` ALPH olarak ayarlanmıştır. Düzenli UTXO'ların toz miktarına kıyasla, bu, sistemdeki sözleşme UTXO setinin boyutuna çok daha agresif bir üst sınır koyar ve aynı zamanda hesap modeli kullanılarak yönetilen sözleşme durumlarının boyutunu da sınırlar. Sözleşme yok edildikten sonra sözleşme teminatını geri almak mümkün olduğundan, umarım geliştiricilerin sözleşme durumunu sağlıklı bir seviyede tutmaları için doğru teşvikleri oluşturur.

UX açısından, bunun anlamı bir sözleşmenin oluşturulması için en az `1` ALPH'nin sözleşme teminatı olarak gerektiğidir. Somut olarak, bir NFT'nin damga fiyatı `100` ALPH ise, sözleşme teminatını dikkate alarak toplam maliyet `101` ALPH olabilir. Ayrıca, herhangi bir işlem, sözleşmenin bakiyesini `1` ALPH'nin altına düşürüyorsa başarısız olur.

Özetle, bazı UX zorlukları yaratmasına rağmen, UTXO'lar için **toz miktarı** (ve genişletilmiş olarak **sözleşme teminatı**) Alephium blockchain'inin performansı, ölçeklenebilirliği ve merkezi olmayanlığı için kilit bir öneme sahiptir.
