---
sidebar_position: 30
title: Değiştirilebilir Olmayan Jetonlar (NFT'ler)
sidebar_label: Değiştirilebilir Olmayan Jetonlar (NFT'ler)
---

Alephium'daki değiştirilebilir olmayan jetonlar (NFT'ler), diğer blok zincirlerindeki NFT'lerle karşılaştırıldığında birkaç benzersiz özelliğe sahiptir:

- UTXO modeline dayalı gerçek sahiplik: Alephium'daki diğer türdeki jetonlar gibi, NFT'ler de adresler tarafından doğrudan sahip olunan UTXO'larla güvenli bir şekilde yönetilir. UTXO'lar, kullanıcıların özel anahtarlarıyla korunduğundan, NFT sözleşmesinde hatalar olsa bile, kullanıcıların varlıkları güvende kalır.

- NFT'ler için birinci sınıf destek: Jetonlar, Alephium'da yerel varlıklardır. Sonuç olarak, kullanıcıların NFT'leri, üçüncü taraf hizmetlerine bağlı olmadan cüzdanlar, gezginler ve dApp'ler tarafından kolayca keşfedilip gösterilebilir.

- Alephium'un VM ve sözleşme dili sayesinde daha yüksek güvenlik: Alephium'un sanal makinesi (VM) ve sözleşme dili, NFT ticaretinde ayrı bir onay işlemine gerek kalmadan, ilişkili riskleri azaltarak daha yüksek güvenlik sağlar. Bu, [Varlık İzin Sistemi](/ralph/asset-permission-system) gibi araçların yardımıyla geliştiriciler için güvenli NFT sözleşmeleri yazma sürecini basitleştirir.

- Alt sözleşme sistemi: Alephium'da [eşleme](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types) veri yapısı bulunmaz. Koleksiyonlar, bir ana sözleşme (koleksiyon) ve [alt sözleşmeler](http://localhost:3000/ralph/built-in-functions#subcontract-functions) (öğeler) ile oluşturulur. Her alt sözleşme, bu koleksiyondaki bir NFT'yi temsil eder ve tüm metaveri ona bağlıdır. Bu, Alephium Blok Zinciri'nin doğal bir özelliğidir ve Alephium'un NFT'lerinin benzersiz (bir alt sözleşme başına bir jeton) veya yarı-değiştirilebilir olmasını sağlar, çünkü aynı basım sözleşmesi birden fazla jeton oluşturabilir.

- Verimli işlem toplu işleme: Tek bir işlemde birden fazla NFT ve kullanıcı yer alabilir.

- Daha düşük işlem ücretleri ve daha yüksek işlem hızı: NFT işlemleri, Alephium'un parçalanma algoritmasından faydalanacaktır.

- NFT kıtlığı: Alephium'daki NFT'lerin arzı sınırlıdır, çünkü her NFT'nin kendi bireysel alt sözleşmesinin dağıtılması gerekmektedir ve bu da bir ALPH depozitosunu gerektirir - şu anda 1 `ALPH`. Bu benzersiz yapı, platformdaki NFT'lerin kıtlığını güçlendiren bir sınırlama getirir.

### Değiştirilebilir Olmayan Jeton Standartı

Hem NFT koleksiyonları hem de bireysel NFT'lerle ilişkilendirilen metaveriler bulunmaktadır, örneğin `collectionUri`, `totalSupply` ve `tokenUri` vb. [INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral) ve [INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral) arabirimleri, bu metaverileri almak için yöntemleri standartlaştırır.

```rust
// Standard interface for NFT collection
@std(id = #0002)
Interface INFTCollection {
   pub fn getCollectionUri() -> ByteVec
   pub fn totalSupply() -> U256
   pub fn nftByIndex(index: U256) -> INFT
   pub fn validateNFT(nftId: ByteVec, nftIndex: U256) -> () // Validates that the NFT is part of the collection, otherwise throws exception.
}

// Standard interface for NFT
@std(id = #0003)
Interface INFT {
   pub fn getTokenUri() -> ByteVec
   pub fn getCollectionIndex() -> (ByteVec, U256) // Returns collection id and index of the NFT in the collection.
}
```

Bu arabirimler, dApp'lerin ve cüzdanların sözleşme/jeton tiplerini çıkarmasını kolaylaştırmak için `@std` açıklamaları ile işaretlenmiştir.

```typescript
// Guess NFT token type
const nftTokenType = await web3.getCurrentNodeProvider().guessStdTokenType(nft.contractId)
expect(nftTokenType).toEqual('non-fungible')

// Check if a contract is a NFT collection
const isNFTCollection = await web3.getCurrentNodeProvider().guessFollowsNFTCollectionStd(nftCollection.contractId)
console.log("Is NFT collection", isNFTCollection)
```

[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral) ve [INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral) arabirimlerini uygulayan sözleşmeler için, SDK, ilgili metaverileri almanın kanonik bir yolunu sunar:

```typescript
// NFT Collection Metadata
const collectionMetadata = await web3.getCurrentNodeProvider().fetchNFTCollectionMetaData(nftCollection.contractId)
console.log("NFT Collection URI, totalSupply", collectionMetadata.collectionUri, collectionMetadata.totalSupply)

// NFT Metadata
const nftMetadata = await web3.getCurrentNodeProvider().fetchNFTMetadata(nft.contractId)
console.log("NFT Token URI, collection address", nftMetadata.tokenUri, nftMetadata.collectionAddress)
```

NFT koleksiyonu için, metaverilerden biri `collectionUri`dir, bu, aşağıdaki şemaya sahip bir JSON belgesine işaret eden bir URI'dir:

```typescript
interface NFTCollectionUriMetaData {
  name: string            // Name of the NFT collection
  description: string     // General description of the NFT collection
  image: string           // A URI to the image that represents the NFT collection
}
```

Bireysel NFT için, metaverilerden biri `tokenUri`dir, bu, aşağıdaki şemaya sahip bir JSON belgesine işaret eden bir URI'dir:

```typescript
interface NFTTokenUriMetaData {
  name: string                           // Name of the NFT
  description?: string                   // General description of the NFT
  image: string                          // A URI to the image that represents the NFT
  attributes?: [                         // Attributes of the NFT
    {
      trait_type: string
      value: string | number | boolean
    }
  ]
}
```

### AlephiumNFT Pazarı

[AlephiumNFT](https://github.com/alephium/alephium-nft) pazarı, Alephium'daki NFT'lerin yeteneklerini sergilemek için bir kanıt-of-konsept NFT pazarıdır. Burada NFT koleksiyonları oluşturabilir, keşif yapabilir, NFT'ler basabilir ve ticaret yapabilirsiniz. Ayrıca, NFT koleksiyonlarınız için [Opensea
  Drop](https://docs.opensea.io/docs/drops-on-opensea) tarzında halka açık satış kampanyaları başlatabilirsiniz. Bu kampanyalar, `AlephiumNFT` pazarında `Akışlar` olarak adlandırılır.

Kendi NFT koleksiyonlarınızı oluşturmak oldukça
basittir. Daha fazla ayrıntı için bu [Twitter
dizisini](https://twitter.com/alephium/status/1674397159947649030) takip edin. Eğer bir `Flow` oluşturmak istiyorsanız, `@alephium/cli` sizin için yardımcı olabilecek bir `nft` alt komutuna sahiptir.

#### Akışlar Oluşturun

Diyelim ki `5` bireysel NFT'ye sahip NFT koleksiyonunuz için halka açık bir satış başlatmak istiyorsunuz. Bunu yapmadan önce, bunun için hazır `5` görüntünüz olmalı. Değilse, `@alephium/cli`, OpenAI'in [DALL.E](https://openai.com/research/dall-e) modellerini kullanarak görüntüler oluşturmanıza yardımcı olacak bir komuta sahiptir:

```bash
export OPENAI_API_KEY=xxxx-xxxx-xxxx-xxxx
npx @alephium/cli@latest nft generate-images-with-openai --number 5 -d /tmp/imagine "imagine all the people, living life in peace"
```

Bu, `imagine all the
people, living life in peace` girişi ile `5` görüntü oluşturacak ve bunları `/tmp/imagine` dizini altında saklayacaktır. Eğer koleksiyonunuz için görüntüleri zaten tasarladıysanız, bu adımı atlayabilirsiniz.

Görüntülerin `/tmp/imagine` dizini altında hazır olduğunu varsayalım. Bir sonraki adım, koleksiyonunuz için YAML formatında bir metaveri dosyası oluşturmaktır. İşte `imagine.yaml` adlı bir YAML dosyası örneği:


```bash
> ls /tmp/imagine
0.jpg  1.jpg  2.jpg  3.jpg  4.jpg

> cat imagine.yaml
0.jpg:                              # File name of the image
  attributes:                       # Attributes of the NFT, optional
    - color: blue                   # Value of the attributes can be `number`, `boolean` or `string`
    - is_outdoor: true
1.jpg:
  description: Imagine is too naive # Description of the NFT, optional
2.jpg:
  name: Imagine in Asia             # Name of the NFT, optional
  attributes:
    - color: blue
    - is_outdoor: false
3.jpg:                              # Name is auto-generated as #${index} if not specified, e.g. #04
4.jpg:
```

Görüntülerinizden ve koleksiyonunuzun metaverisinden memnun olduğunuzda, aşağıdaki komutu kullanarak görüntüleri ve metaveriyi IPFS'e yükleyin:

```bash
> export IPFS_INFURA_PROJECT_ID=xxxx-xxxx-xxxx-xxxx
> export IPFS_INFURA_PROJECT_SECRET=xxxx-xxxx-xxxx-xxxx
> npx @alephium/cli@latest nft upload-images-and-metadata-to-ipfs -m imagine.yaml -d /tmp/imagine -i imagine
NFTBaseUri:
https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/
```

`NFTBaseUri`, `imagine.yaml` dosyasındaki sırasına göre adlandırılmış ve depolanmış `5` belgeye işaret eden bir IPFS dizinini gösterir:

<img src={require("./media/ipfs-imagine-directory.png").default} alt="IPFS Imagine Directory"/>

Her belge, bir NFT'nin metaverisine işaret eder ve dizin içindeki sırasına göre referanslanabilir. Örneğin `https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/2`, 3. NFT'nin metaverisine işaret eder:

```bash
> curl https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/2 | jq
{
  "name": "Imagine in Asia",
  "image": "https://ipfs.io/ipfs/QmbLevU4kVnQCCoYt23mKhdowJ7TnNNT9dRyVw9AyQDJty/2.jpg",
  "attributes": [
    {
      "trait_type": "color",
      "value": "blue"
    },
    {
      "trait_type": "is_outdoor",
      "value": false
    }
  ]
}
```

Bir `NFTBaseUri`'nin geçerli olup olmadığını doğrulayabilirsiniz:

```bash
> npx @alephium/cli@latest nft validate-enumerable-nft-base-uri --nftBaseUri https://ipfs.io/ipfs/QmbLevU4kVnQCCoYt23mKhdowJ7TnNNT9dRyVw9AyQDJty/ --maxSupply 5
Token Metadataz:
[
  {
    name: '#0',
    ....
  },
  ....
]
```

`NFTBaseUri` oluşturulduktan sonra, `Akış`'ı `AlephiumNFT` Pazarı'nda başlatmaya hazırız:

<img src={require("./media/create-flow-page.png").default} alt="Flow Sayfası Oluştur" />

Yukarıdaki gibi, koleksiyon görüntüsünü, maksimum toplu basım boyutunu, basım fiyatını, koleksiyonun adını ve açıklamasını, ve en önemlisi, bir önceki adımda oluşturduğumuz NFT taban URI'yi girebilirsiniz. `NFT Koleksiyonu Oluştur` düğmesine tıkladıktan ve işlemi imzaladıktan sonra, ilk `Flow`'unuzu başarıyla oluşturacak ve bağlantıyı paylaşacak ve NFT koleksiyonunuzun halka açık satışını başlatacaksınız!

<img src={require("./media/flow-page.png").default} alt="Flow Sayfası"/>

### Cüzdan Desteği

Hem [Masaüstü Cüzdanı](/wallet/desktop-wallet/overview) hem de [Uzantı
Cüzdanı](/wallet/extension-wallet/overview) değiştirilebilir olmayan jetonlar için doğal destek sağlar.

Aşağıda, uzantı cüzdanında `Imagine Collection` içinde bir NFT'nin görüntülenmesi ve transfer edilmesi örneği bulunmaktadır:

<img
src={require("./media/show-nft-collection-extension-wallet.png").default} alt="Koleksiyonu Göster" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-nft-collection-extension-wallet.png").default} alt="NFT Transferi" width="250" />

### Jeton Listesi

Diğer NFT koleksiyonlarını taklit etmek ve kullanıcıları dolandırmak çok zor değildir. [Jeton listesi](https://github.com/alephium/token-list), Alephium ekosistemindeki tanınmış NFT koleksiyonlarını beyaz listeye alır, böylece dApp'ler ve cüzdanlar kullanıcıları doğrulanmamış NFT koleksiyonları konusunda uyarabilir. İşte uzantı cüzdanının, bir NFT koleksiyonunu jeton listesine eklenmeden önce ve sonra nasıl gösterdiği:

<img src={require("./media/unverified-nft-collection.png").default} alt="Doğrulanmamış" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/verified-nft-collection.png").default} alt="Doğrulanmış" width="250"/>

Şu anda, NFT koleksiyonunu jeton listesine eklemek için bir pull isteği gereklidir.