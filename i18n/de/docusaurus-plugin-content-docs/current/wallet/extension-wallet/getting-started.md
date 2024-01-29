---
sidebar_position: 20
title: Erste Schritte
sidebar_label: Erste Schritte
---

### Installation

Die Alephium Extension Wallet ist für beide Browser
[Chrome](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj)
und
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/) verfügbar.

### Wallet erstellen

<img src={require("./media/new-wallet-1.png").default} alt="Create wallet"/>

1. Klicken Sie auf das Alephium Extension Wallet-Symbol in Ihrem Browser.
2. Auf der Startseite klicken Sie auf die Schaltfläche `Neue Wallet`.
3. Geben Sie das Passwort ein, um Ihre Wallet zu schützen.
4. Fertig! Ihre Wallet ist erstellt.

Ihre Wallet hat jetzt noch keine Vermögenswerte. Im nächsten Schritt übertragen wir etwas ALPH auf diese Wallet.

### Vermögenswerte übertragen

#### ALPH Token Faucet

Für das `Devnet` und das `Testnet` verfügt die Extension-Wallet über einen integrierten `ALPH` Token-Faucet. 
Sie können jeweils `1000` `ALPH` für das `Devnet` und `12` `ALPH` für das
`Testnet` erhalten.

<img src={require("./media/token-faucet-1.png").default} alt="Receive Fund" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/token-faucet-2.png").default} alt="Token Faucet" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/token-faucet-3.png").default} alt="Token Received" width="250" />

#### ALPH übertragen

Sie können auch `ALPH` von einem anderen Konto auf Ihr Konto übertragen:

<img src={require("./media/transfer-alph-1.png").default} alt="Overview page" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alph-2.png").default} alt="Transfer page" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alph-3.png").default} alt="Review transfer" width="250" />

Nachdem Sie die Transfertransaktion signiert haben, können Sie den Transaktionsstatus im Tab `Aktivität` überwachen. 
Sobald die Transaktion bestätigt ist, wird der übertragene  `ALPH`-Betrag auf dem Empfängerkonto angezeigt.

<img src={require("./media/received-alph-1.png").default} alt="Pending Tx" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/received-alph-2.png").default} alt="Confirmed Tx" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/received-alph-3.png").default} alt="ALPH Received" width="250" />

Das war's! Sie haben erfolgreich einige `ALPH` übertragen.

#### Token übertragen

Der Prozess des Übertragens anderer fungibler Tokens ist im Wesentlichen der gleiche wie beim Übertragen 
des `ALPH`-Tokens:

<img src={require("./media/transfer-alphpaca-1.png").default} alt="Transfer Token 1" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-2.png").default} alt="Transfer Token 2" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-alphpaca-3.png").default} alt="Transfer Token 3" width="250" />

Bitte lesen Sie den Leitfaden zu [Fungiblen Tokens](/tokens/fungible-tokens) für weitere Informationen 
zu fungiblen Tokens.

### NFT-Unterstützung

Die Alephium Extension-Wallet unterstützt auch die Anzeige und Übertragung von NFTs, wie unten gezeigt:

<img src={require("./media/display-nft-collections.png").default} alt="Display Collections" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/display-nft-collection.png").default} alt="Display Collection" width="250" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/transfer-nft.png").default} alt="Transfer NFT" width="250" />

Bitte lesen Sie den Leitfaden zu [Non-fungible Tokens (NFTs)](/tokens/non-fungible-tokens) für weitere Informationen zu NFTs.

### Konten verwalten

Ein Konto in der Alephium Extension-Wallet repräsentiert einen digitalen Container, der aus einer öffentlichen Adresse und dem entsprechenden privaten Schlüssel besteht und es dem Benutzer ermöglicht, Vermögenswerte auf der Alephium-Blockchain zu empfangen, zu speichern und zu übertragen.

Die Alephium Extension-Wallet ermöglicht es Benutzern, gleichzeitig mehrere Konten zu verwalten. 
Zum Beispiel kann Alice ein Konto für `Gehalt`, ein Konto für `Sparen` und ein weiteres Konto für `Reise 2023` haben. 

#### Konto erstellen
Um ein zusätzliches Konto hinzuzufügen, befolgen Sie die unten stehenden Schritte:

<img src={require("./media/manage-accounts-1.png").default} alt="Overview" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-2.png").default} alt="Account List" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-3.png").default} alt="Add Account" width="250"/>

Es gibt einige Optionen, die wir vor dem Erstellen eines Kontos auswählen können:

- `Group`: Die verfügbaren Optionen sind `0`, `1`, `2` oder `3`. Wenn `beliebig` ausgewählt wird, 
  wird die Gruppe, zu der das erstellte Konto gehört, zufällig sein.
- `Sign`: Die verfügbaren Optionen sind `Standard` und `Schnorr`. `Standard`
  repräsentiert den Standard-Alephium-Signaturtyp, der z.B. zum Signieren von 
  Alephium-Transaktionen   verwendet wird, während `Schnorr` den `BIP340`
  Schnorr-Signaturtyp repräsentiert, welcher nützlich ist, wenn Sie mit Protokollen wie 
  [Nostr](https://nostr.com/) interagieren. 
- `Account Type`: Die verfügbaren Optionen sind `Alephium Account` oder 
  `Ledger Account`. Weitere Details zur Ledger-Integration finden Sie im 
  [Ledger](/wallet/ledger)-Leitfaden.

Nach Auswahl der gewünschten Optionen wird ein neues Konto erstellt und ist bereit zur Verwendung.

#### Konto bearbeiten
Sie können auch den Namen eines vorhandenen Kontos bearbeiten, den privaten Schlüssel exportieren, 
ein Konto löschen, usw.

<img src={require("./media/manage-accounts-4.png").default} alt="Account List" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-5.png").default} alt="Edit Account" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/manage-accounts-6.png").default} alt="Export Private Key" width="250"/>
