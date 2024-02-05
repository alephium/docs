---
sidebar_position: 30
title: Non-fungible Tokens (NFTs)
sidebar_label: Non-fungible Tokens
---

Non-fungible tokens (NFTs) auf Alephium weisen im Vergleich zu 
NFTs auf anderen Blockchains mehrere einzigartige Merkmale auf:

- Echte Eigentumsübertragung basierend auf dem UTXO-Modell: Wie andere Arten von Tokens auf Alephium werden NFTs sicher durch UTXOs verwaltet, die sich direkt im Besitz von Adressen befinden. Da UTXOs durch die privaten Schlüssel der Benutzer geschützt sind, bleiben die Vermögenswerte der Benutzer auch dann sicher, wenn es Fehler im NFT-Contract gibt.

- Erstklassige Unterstützung für NFTs: Tokens sind native Vermögenswerte auf Alephium. Daher können die NFTs der Benutzer einfach von Wallets, Explorern und dApps gefunden und angezeigt werden, ohne auf Dienste von Drittanbietern angewiesen zu sein.

- Höhere Sicherheit dank Alephiums VM und Vertragssprache: Alephiums Virtual Machine (VM) und seine Contract-Sprache eliminieren die Notwendigkeit für eine separate Genehmigungstransaktion während des NFT-Handels, was die damit verbundenen Risiken reduziert. Dies vereinfacht den Prozess des Schreibens sicherer NFT-Verträge für Entwickler mithilfe von Tools wie dem [Asset Permission System](/ralph/asset-permission-system).

- Sub-Vertragsystem: In Alephium gibt es keine [Mapping](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types)-Datenstruktur. Kollektionen werden mit einem übergeordneten Contracts (der Kollektion) und [Sub-Contracts](http://localhost:3000/ralph/built-in-functions#subcontract-functions) (den Einzelteilen) erstellt. Jeder Sub-Contract repräsentiert ein NFT in dieser Kollektion, und alle Metadaten sind damit verbunden. Dies ist eine native Funktion der Alephium-Blockchain, die es ermöglicht, dass Alephiums NFTs einzigartig (ein Token pro Sub-Contract) oder halb-fungibel sind, da derselbe Minting-Contract mehr als ein Token erstellen kann.

- Effiziente Transaktionsbündelung: Mehrere NFTs und Benutzer können an einer einzigen Transaktion beteiligt sein.

- Günstigere Transaktionsgebühren und höhere Durchsatzrate: NFT-Transaktionen profitieren von Alephiums Sharding-Algorithmus.

- Knappheit von NFTs: Das Angebot an NFTs auf Alephium ist endlich, da jedes NFT die Bereitstellung seines eigenen individuellen Sub-Contracts erfordert, der wiederum eine Einzahlung von ALPH - derzeit auf 1 `ALPH`. festgelegt - erfordert. Diese einzigartige Struktur setzt von Natur aus eine Grenze für die Produktion von NFTs auf der Plattform und verstärkt die Knappheit von NFTs auf Alephium.
  
### Non-fungible-Token Standard

Sowohl NFT-Kollektionen als auch individuelle NFTs verfügen über Metadaten, wie z.B. `collectionUri`, `totalSupply` und `tokenUri`, usw. Die
[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral)
und [INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral)-Schnittstellen standardisieren die Methoden zum Abrufen dieser Metadaten.

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

Sie sind auch mit den `@std`-Annotationen versehen, 
um es dApps und Wallets zu erleichtern, ihre Contract-/Token-Typen zu inferieren.

```typescript
// Guess NFT token type
const nftTokenType = await web3.getCurrentNodeProvider().guessStdTokenType(nft.contractId)
expect(nftTokenType).toEqual('non-fungible')

// Check if a contract is a NFT collection
const isNFTCollection = await web3.getCurrentNodeProvider().guessFollowsNFTCollectionStd(nftCollection.contractId)
console.log("Is NFT collection", isNFTCollection)
```

Für Contracts, die
[INFTCollection](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_collection_interface.ral)
und
[INFT](https://github.com/alephium/alephium-web3/blob/master/packages/web3/std/nft_interface.ral),
implementieren, bietet das SDK eine kanonische Methode zum Abrufen ihrer jeweiligen Metadaten:

```typescript
// NFT Collection Metadata
const collectionMetadata = await web3.getCurrentNodeProvider().fetchNFTCollectionMetaData(nftCollection.contractId)
console.log("NFT Collection URI, totalSupply", collectionMetadata.collectionUri, collectionMetadata.totalSupply)

// NFT Metadata
const nftMetadata = await web3.getCurrentNodeProvider().fetchNFTMetadata(nft.contractId)
console.log("NFT Token URI, collection address", nftMetadata.tokenUri, nftMetadata.collectionAddress)
```

Für NFT-Kollektionen ist eine der Metadaten `collectionUri`, die eine URI ist und auf ein JSON-Dokument mit dem folgenden Schema verweist:

```typescript
interface NFTCollectionUriMetaData {
  name: string            // Name of the NFT collection
  description: string     // General description of the NFT collection
  image: string           // A URI to the image that represents the NFT collection
}
```

Für individuelle NFTs ist eine der Metadaten `tokenUri`, die eine URI ist und auf ein JSON-Dokument mit dem folgenden Schema verweist:

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

### AlephiumNFT Marktplatz

Der [AlephiumNFT](https://github.com/alephium/alephium-nft) Marktplatz ist 
ein Proof-of-Concept-NFT-Marktplatz, der die Fähigkeiten von NFTs auf Alephium 
präsentiert. Hier können Sie NFT-Sammlungen erstellen, NFTs entdecken, prägen 
und handeln. Sie können auch [Opensea Drop](https://docs.opensea.io/docs/drops-on-opensea)-style 
öffentliche Verkaufskampagnen für Ihre NFT-Sammlungen starten. Diese Kampagnen werden auf 
dem `AlephiumNFT`-Marktplatz als `Flows` bezeichnet.

Die Erstellung eigener NFT-Sammlungen sollte recht einfach sein. 
Folgen Sie diesem  [Twitter thread](https://twitter.com/alephium/status/1674397159947649030) für weitere Details.
Wenn Sie einen `Flow` auf dem `AlephiumNFT` Marktplatz erstellen möchten, 
kann Ihnen [@alephium/cli](https://www.npmjs.com/package/@alephium/cli) mit seinem
`nft` Unterbefehl dabei helfen.

#### Flows erstellen

Angenommen, Sie möchten einen öffentlichen Verkauf für Ihre NFT-Sammlung 
starten, die `5` individuelle NFTs hat. Bevor Sie einen `Flow` dafür 
erstellen, sollten Sie zunächst `5` Bilder bereithalten. Wenn nicht, bietet
 `@alephium/cli` einen Befehl, mit dem Sie Bilder mithilfe von OpenAI's
[DALL.E](https://openai.com/research/dall-e)-Modellen generieren können:

```bash
export OPENAI_API_KEY=xxxx-xxxx-xxxx-xxxx
npx @alephium/cli@latest nft generate-images-with-openai --number 5 -d /tmp/imagine "imagine all the people, living life in peace"
```

Das erstellt `5` Bilder mit der Aufforderung 
`imagine all the people, living life in peace` und speichert 
Sie unter dem Verzeichnis `/tmp/imagine`. Bitte überspringen 
Sie diesen Schritt, wenn Sie bereits Bilder für Ihre Sammlung 
entworfen haben.

Angenommen, die Bilder sind unter dem Verzeichnis `/tmp/imagine`
bereit. Der nächste Schritt besteht darin, eine Metadatendatei im 
YAML-Format für Ihre Sammlung zu erstellen. Hier ist ein Beispiel 
für eine YAML-Datei namens  `imagine.yaml`:

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

Wenn Sie mit den Bildern und Metadaten Ihrer Sammlung zufrieden sind, 
führen Sie den folgenden Befehl aus, um die Bilder und Metadaten auf 
IPFS hochzuladen:

```bash
> export IPFS_INFURA_PROJECT_ID=xxxx-xxxx-xxxx-xxxx
> export IPFS_INFURA_PROJECT_SECRET=xxxx-xxxx-xxxx-xxxx
> npx @alephium/cli@latest nft upload-images-and-metadata-to-ipfs -m imagine.yaml -d /tmp/imagine -i imagine
NFTBaseUri:
https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/
```

Der `NFTBaseUri` verweist auf ein IPFS-Verzeichnis, in dem `5` Dokumente 
benannt und basierend auf ihrer Reihenfolge in der Datei `imagine.yaml` gespeichert sind:

<img src={require("./media/ipfs-imagine-directory.png").default} alt="IPFS Imagine Directory"/>

Jedes Dokument verweist auf die Metadaten eines NFT und kann anhand 
seiner Indizes referenziert werden. Zum Beispiel verweist `https://ipfs.io/ipfs/QmaTXEGJQe5ZLg9TVEBJEpz3dwbzG9m7b6NWVogxnYgnbJ/2`
auf die Metadaten des 3. NFT:

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

Sie können mit dem folgenden Befehl überprüfen, ob ein  `NFTBaseUri` gültig ist:

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

Nachdem `NFTBaseUri` erstellt wurde, sind wir bereit, den `Flow` auf dem `AlephiumNFT` Marktplatz 
zu starten:

<img src={require("./media/create-flow-page.png").default} alt="Create FLow Page"/>

Wie oben dargestellt, können Sie das Bild der Sammlung, die maximale 
Stapel-Mint-Größe, den Mint-Preis, den Namen und die Beschreibung der 
Sammlung sowie den wichtigsten NFT-Basis-URI eingeben, den wir im letzten 
Schritt erstellt haben. Nachdem Sie auf die Schaltfläche `Create NFT Collection`
geklickt und die Transaktion signiert haben, erstellen Sie erfolgreich Ihren ersten `Flow`,
teilen den Link und starten den öffentlichen Verkauf Ihrer NFT-Sammlung!

<img src={require("./media/flow-page.png").default} alt="FLow Page"/>

### Wallet Unterstützung

Sowohl die [Desktop Wallet](/wallet/desktop-wallet/overview) als auch die [Extension
Wallet](/wallet/extension-wallet/overview) unterstützen nativ non-fungible Tokens.

Nachfolgend ein Beispiel für die Anzeige und Übertragung eines NFT in der
`Imagine Collection` in der Extension Wallet:

<img
src={require("./media/show-nft-collection-extension-wallet.png").default} alt="Show collection" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-nft-collection-extension-wallet.png").default} alt="Transfer NFT" width="250" />

### Token-Liste

Es ist nicht allzu schwierig, andere NFT-Sammlungen vorzutäuschen 
und Benutzer zu betrügen. Die[Token-Liste](https://github.com/alephium/token-list) 
ermöglicht es, bekannte NFT-Sammlungen im Alephium-Ökosystem zu whitelisten, 
sodass dApps und Wallets die Benutzer vor nicht überprüften NFT-Sammlungen warnen 
können. Hier sehen Sie, wie die Extension Wallet eine NFT-Sammlung vor und nachdem Sie 
in die Token-Liste aufgenommen wurde, anzeigt.

<img src={require("./media/unverified-nft-collection.png").default} alt="Unverified" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/verified-nft-collection.png").default} alt="Verified" width="250"/>

Aktuell ist ein Pull Request erforderlich, um die NFT-Sammlung zur Token-Liste hinzuzufügen.
