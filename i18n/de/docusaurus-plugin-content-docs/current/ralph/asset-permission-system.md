---
sidebar_position: 60
title: Asset Permission System (APS)
sidebar_label: Asset permission system (APS)
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Das Asset Permission System (APS) ist eine der einzigartigen Funktionen von Ralph. Es legt den Fluss von Vermögenswerten auf Code-Ebene explizit fest und gibt Entwicklern und Benutzern von Smart Contracts die Gewissheit, dass alle Vermögensübertragungen wie beabsichtigt erfolgen. Zusammen mit dem UTXO-Modell bietet es auch eine einfachere und sicherere Benutzererfahrung, indem es Risiken bei der Token-Genehmigung in Systemen wie EVM eliminiert.

Alephium verwendet das
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)-Modell, bei dem Vermögenswerte, einschließlich des nativen ALPH und anderer Token, durch UTXOs verwaltet werden, während Smart Contracts und ihre Zustände im Account-basierten Modell verwaltet werden.

Dies hat einige Auswirkungen:

1. Einfache Vermögensübertragungen zwischen Benutzern erfordern nur UTXOs, die sich in der Sicherheit bei der Verwaltung von Vermögenswerten bewährt haben. Hier sind keine Smart Contracts beteiligt.
2. Wenn Smart Contracts Vermögenswerte im Auftrag der Besitzer übertragen müssen, sind keine separaten Genehmigungstransaktionen erforderlich. Die Genehmigung ist im UTXO-Modell implizit: Wenn der Input, der einen bestimmten Token enthält, in der Transaktion autorisiert ist, ausgegeben zu werden, hat der Besitzer bereits seine Zustimmung zur Verwendung dieses Tokens im Kontext dieser Transaktion erteilt. Dies bedeutet, dass die Smart Contracts, die in derselben Transaktion aufgerufen werden, potenziell den Token übertragen können.

Nun stellt sich die Frage: In der zweiten Situation, wie können wir sicherstellen, dass die in der Transaktion über das UTXO-Modell implizit genehmigten Vermögenswerte sicher von den Smart Contracts verarbeitet werden können? Die Antwort lautet: Ralphs Asset Permission System (APS).

## Fluss von Vermögenswerten

Um mit den Smart Contracts in Alephium zu interagieren, muss eine Transaktion ein `TxScript` ausführen. Im folgenden Beispiel für eine Transaktion gibt es zwei Inputs, einen fixen Output und ein `TxScript`:

```
                  ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 ALPH (fester Output)
================> |              | ========================>
   6.1 ALPHs      |  <TxScript>  |   ??? (generierter Output)
================> |              | ========================>
                  |              | 
                  |              | 
                  |              |
                  ----------------
```

Hier sind zwei Dinge zu beachten:

1. Obwohl es nur einen festen Output gibt, werden für diese Transaktion mehrere Outputs generiert. Die generierten Outputs hängen vom Ergebnis der Ausführung des `TxScript` ab.
2. Die insgesamt verfügbaren Vermögenswerte für `TxScript` (einschließlich der von ihm aufgerufenen Smart Contracts) betragen `5.1` ALPHs und `1` Token A, da das `1` ALPH im festen Output abgezogen werden muss.

Angenommen, das `TxScript` sieht ungefähr so aus:

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

Wie Sie vielleicht vermutet haben, handelt es sich bei Token A um einen NFT-Token, und das obige `TxScript` hat zum Ziel, ihn über einen Marktplatz-Smart Contract zu listen.

Die folgende Codezeile ist besonders interessant:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

Der Code innerhalb der geschweiften Klammern genehmigt explizit, dass 
`approvedAlphAmount` ALPH und `1` Token A in der Funktion
`marketPlace.listNFT` ausgegeben werden dürfen, obwohl die Gesamtvermögenswerte für `TxScript` `5.1` und `1` für ALPH bzw. Token A betragen.

Es könnten folgende Szenarien eintreten:

1. Wenn sich herausstellt, dass `approvedAlphAmount` mehr als `5.1` ALPH beträgt, schlägt die Transaktion mit einem Fehler `NotEnoughBalance` fehl.
2. Wenn `approvedAlphAmount` weniger als `5.1` ALPH ist, sagen wir `1.1` ALPH,
   dann beträgt die maximal mögliche Menge an Vermögenswerten, die `marketPlace.listNFT` verarbeiten kann,  `1.1` ALPHs und `1` Token A. `marketPlace.listNFT` hat keinen Zugriff auf die restlichen `4` ALPHs.
3. Wenn `marketPlace.listNFT` nicht die gesamten genehmigten Vermögenswerte ausgegeben hat, werden die verbleibenden Vermögenswerte an ihren Besitzer zurückgegeben, wenn `marketPlace.listNFT` zurückkehrt.

Schauen wir uns die Funktion `marketPlace.listNFT` etwas genauer an:

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

Das erste, was auffällt, ist die Annotation für die Methode `listNFT`:

```rust
@using(preapprovedAssets = true, assetsInContract = true, updateFields = false)
```

`preapprovedAssets = true` teilt der VM mit, dass die Methode `listNFT` beabsichtigt, einige Vermögenswerte zu verwenden, und der Aufrufer beabsichtigt, einen Satz erforderlicher Vermögenswerte zu genehmigen, oder andernfalls wird ein Kompilierfehler gemeldet. Die Kompilierung schlägt auch fehl, wenn der Aufrufer versucht, Vermögenswerte für eine Methode zu genehmigen, bei der `preapprovedAssets = false` ist.

`assetsInContract = true` gibt der VM an, dass die Methode `listNFT`
beabsichtigt, das Vermögen des Vertrags `NFTMarketPlace` zu aktualisieren. 
Der Compiler stellt sicher, dass die Methode `listNFT` dies tatsächlich tut, 
oder es wird ein Kompilierfehler gemeldet. In diesem Fall aktualisiert
`listNFT` das Vermögen des Vertrags `NFTMarketPlace` indem es die `listingFee` darauf überträgt:

```rust
// Charge the listing fee
transferTokenToSelf!(tokenOwner, ALPH, listingFee)
```

Die Annotation `updateFields` liegt außerhalb des Rahmens dieser Dokumentation.

Die Methode `marketPlace.listNFT` wird vom `TxScript` `ListNFT`, aufgerufen, 
wie unten gezeigt:

```rust
marketPlace.listNFT{callerAddress!() -> ALPH: approvedAlphAmount, tokenAId: 1}(tokenAId, price)
```

Wenn `marketPlace.listNFT` von der VM ausgeführt wird, ist sie berechtigt, `1.1` ALPH und `1` Token vom Aufrufer des Skripts auszugeben. Wenn `marketPlace.listNFT` wiederum andere Methoden aufruft, kann es auch einem Teil dieser genehmigten Vermögenswerte für diese Methode zustimmen. Beispielsweise haben wir in `marketPlace.listNFT` den folgenden Code, um eine NFT-Listung zu erstellen:

```rust
let nftListingContractId = copyCreateSubContract!{tokenOwner -> ALPH: 1 alph, tokenId: 1}(
    tokenId, nftListingTemplateId, encodeImmutableFields, encodeMutableFields
)
```

Wie wir sehen können, genehmigt die Methode `marketPlace.listNFT`  `1` ALPH und `1`
Token A für die eingebaute Funktion `copyCreateSubContract!` aus ihrem eigenen Pool genehmigter Vermögenswerte (`1.1` ALPH and `1` Token A), bevor sie die `listingFee` dem Vertrag `NFTMarketPlace` selbst zusendet. Der Fluss von Vermögenswerten ist unten dargestellt:

```
  Aufrufer des TxScript
  (6.1 ALPH; 1 Token A)
           ||
           ||
           || Vermögenswerte in den
           || festen Outputs
           ||
           ||                    Genehmigungen                         Genehmigungen
           \/               (1.1 ALPH; 1 TokenA)              (1 ALPH; 1 TokenA)
  (5.1 ALPH; 1 Token A)  ========================> listNFT ========================> copyCreateSubContract!
                                                     ||
                                                     ||
                                                     || An sich selbst
                                                     ||
                                                     \/
                                                  (0.1 ALPH)
```

Wie wir uns vorstellen können, wenn wir einen größeren Baum von Methodenaufrufen haben, wird der genehmigte Betrag von der Wurzel des Baums bis zu den Blättern wie Wasser kaskadieren. Das Asset Permission System macht diesen Fluss des Vermögens über die Methodenaufrufe hinweg explizit und setzt Einschränkungen für jede der Methoden fest, welche Token und wie viel von ihnen ausgegeben werden können.

Zurück zur Transaktion sollten die generierten Ausgänge nach der Ausführung des  `TxScript`
ungefähr so aussehen:

```
                        ----------------
                        |              |
                        |              |   1 ALPH (fester Output)
  1 Token A             |              | =========================================>
======================> |              |   1 ALPH, 1 Token A (NFTListing contract)
  6.1 ALPHs             |  <TxScript>  | =========================================>
======================> |              |   0.1 ALPH (NFTMarketPlace contract)
                        |              | =========================================>
                        |              |   4 ALPH - gas (Ausgabe ändern)
                        |              | =========================================>
                        |              |
                        ----------------
```

## Zusammenfassung

Das Asset Permission System (APS) gibt den Fluss von Vermögenswerten in Smart Contracts vor. Die explizite Genehmigung der Vermögenswerte für jeden Methodenaufruf stellt sicher, dass die Methoden niemals mehr ausgeben können, als ihnen autorisiert wurde. Zusammen mit dem UTXO-Modell bietet es eine Vermögensverwaltungslösung, die einfacher, zuverlässiger und sicherer ist.