---
sidebar_position: 10
title: Genel Bakış
sidebar_label: Genel Bakış
---

Alephium'da jetonlar birinci sınıf vatandaşlardır. Yerel jeton ALPH gibi, Alephium'daki tüm jetonlar, adresler tarafından doğrudan sahip olunan UTXO'lar tarafından yönetilir.

Bu tasarım, diğer blok zincirlerine göre birkaç avantaja sahiptir:

- Kullanıcılar arasındaki jeton transferleri yalnızca UTXO'ları gerektirir ve varlıkları yönetme güvenliği açısından test edilmiştir.
- Cüzdanlar ve dApp'lerin, hem değiştirilebilir hem de değiştirilemez jetonlar dahil, kullanıcıların jetonlarını keşfetmesi daha kolaydır.
- Akıllı sözleşmelerin jeton transferi yapması gerektiğinde, UTXO modelinde izin artık gerektirilmediği için ek bir onay işlemi gereksizdir. Alephium, jetonların akıllı sözleşmeler tarafından güvenli bir şekilde ele alınmasını sağlamak için benzersiz [Varlık İzin Sistemi](/ralph/asset-permission-system)'ni kullanır.
- Jeton transferi çok ölçeklenebilirdir çünkü Alephium'un [Parçalanma](/glossary.md#sharding) tasarımından tam olarak faydalanabilirler.

Alephium ekosisteminde jetonlarla çalışmayı kolaylaştırmak için:

- [Jeton
  standartları](https://github.com/alephium/alephium-web3/tree/master/packages/web3/std)
  SDK'da tanıtılmıştır, bu standartlar, hem değiştirilebilir hem de değiştirilemez jetonlar için standart arabirimler tanımlar.
- SDK'da, dApp'ler ve cüzdanlar için yaygın görevleri kolaylaştırmak için yardımcı program işlevleri tanımlanmıştır, örneğin jeton türlerini tahmin etme ve jeton metaverisinin çıkarılması.
- [Jeton listesi](https://github.com/alephium/token-list), tanınmış değiştirilebilir jetonlar ve NFT koleksiyonları için güven kaynağı oluşturmak için kullanılır.
- Cüzdanlarda ve gezginlerde hem değiştirilebilir hem de değiştirilemez jetonlar için doğal destek.
- [Opensea
  Drop](https://docs.opensea.io/docs/drops-on-opensea) tarzında NFT halka açık satışını başlatmaya yardımcı olan `Flow` adı verilen araçlar.

[Fungible Tokens](/tokens/fungible-tokens) sayfasında, değiştirilebilir jeton standartını, değiştirilebilir jetonların nasıl ihraç edileceğini, jeton metaverisinin nasıl alınacağını ve cüzdanlarda değiştirilebilir jetonların nasıl transfer edileceğini öğreneceksiniz.

[Değiştirilebilir Olmayan Jetonlar](/tokens/non-fungible-tokens) sayfasında, değiştirilebilir olmayan jeton standartını, kendi NFT koleksiyonlarınızı nasıl oluşturacağınızı ve ilk NFT halka açık satış kampanyanızı `Flows` adı verilen [NFT pazarında](https://testnet.nft.alephium.org/) nasıl başlatacağınızı öğreneceksiniz.
