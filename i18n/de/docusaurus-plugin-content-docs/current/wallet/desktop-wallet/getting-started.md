---
sidebar_position: 20
title: Erste Schritte
sidebar_label: Erste Schritte
---

# Erste Schritte

## 1. Installation

1. Lade die ausführbare Datei gemäß deinem Setup (macOS, Windows, Linux) von der [neuesten Veröffentlichung](https://github.com/alephium/desktop-wallet/releases/latest) herunter und doppelklicke darauf, um die Anwendung zu installieren.
2. Auf Linux und Windows doppelklicke auf die Anwendung, um die Desktop-Wallet zu starten. Auf macOS musst du zum Anwendungsordner gehen, mit der rechten Maustaste auf die Alephium-App klicken und dann auf _Open_ (doppelklicken funktioniert nicht, es sei denn, du erlaubst es in den Systemeinstellungen).

## 2. Wallet erstellen

:::info

Standardmäßig ist die Wallet mit dem öffentlichen Alephium-Knoten verbunden. Wenn du deinen eigenen Knoten verwenden oder die Wallet offline erstellen möchtest, kannst du dies tun, indem du auf das Einstellungsrad oben rechts in der App klickst und den Node Host auf deinen localhost änderst oder ihn einfach leer lässt, um die Wallet offline zu erstellen.

:::

<img src={require("./media/gs1.png").default} alt="Desktop Wallet Landing page" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs2.png").default} alt="Prompt to create new wallet" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs3.png").default} alt="Prompt to chose a name and set a password" width="auto" style={{ height: '200px' }} />

1. Klicke auf `Erstelle/Importiere eine neue Wallet`, dann auf `Neue Wallet`.

2. Wähle einen Wallet-Namen und vergib ein Passwort, um deine Wallet auf deinem Computer zu schützen. Dieses Passwort ersetzt nicht die 24-Wort Secret Recovery Phrase deiner Wallet. Es wird nur verwendet, um die neu erstellte Wallet zu sperren und zu entsperren.
  Klicke auf  `Continue`.

<img src={require("./media/gs4.png").default} alt="Display of the 24 secret words" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs5.png").default} alt="Prompt to verify annotation of the 24 secret words was correct" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs6.png").default} alt="Landing page of a brand new wallet" width="auto" style={{ height: '200px' }} />

3. Im hervorgehobenen Feld siehst du nun 24 Wörter. Diese bilden die 24-Wort Secret Recovery Phrase deiner Wallet. Dies ist deine wichtigste Information, und du musst sie weise, sicher und sorgfältig aufbewahren.

4. Du wirst nun aufgefordert, zu überprüfen, ob du die 24-Wort Secret Recovery Phrase richtig notiert hast. Klicke auf `Ready` und wähle die Wörter in der richtigen Reihenfolge aus. Wenn der Vorgang richtig durchgeführt wurde, werden die Wörter grün. Bei einem Fehler werden sie rot: Keine Sorge, du kannst die Wörter neu anordnen, bis du die Phrase richtig hast.

5. Alles ist jetzt bereit! Herzlich willkommen in deiner neuen Wallet.

## 3. ALPH versenden

<img src={require("./media/gs7.png").default} alt="Landing page of Desktop Wallet" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs8.png").default} alt="Prompt to enter destination address and amount of transaction" width="auto" style={{ height: '200px' }} />

<img src={require("./media/gs9.png").default} alt="Prompt to enter destination address and amount of transaction" width="auto" style={{ height: '200px' }} />

1. Klicke einfach auf die Schaltfläche `Senden` im linken Menü.

2. Gib die Menge an ALPH ein (z. B. 100) und die Empfängeradresse ein.

3. (Optional) Du kannst eine Sperrzeit festlegen, indem du das entsprechende Kästchen ankreuzt. In diesem Fall wird das ALPH an die Empfängeradresse gesendet, ist jedoch bis zum von dir angegebenen Datum blockiert. Beachte, dass es nach Absenden der Transaktion nicht möglich ist, die Sperrzeit zu ändern.

4. Klicke auf `Überprüfen` und überprüfe sorgfältig die Details deiner Transaktion. Sobald du auf `Senden` klickst, wird das ALPH an den Empfänger übertragen.

:::info

Die Transaktion kann sowohl im Tab `Übersicht` als auch im Tab `Adressen` eingesehen werden, wenn du auf die spezifische Adresse klickst

:::

## 4. Verwalten von Adressen:

Alle vorhandenen Adressen werden in einer Liste im Tab `Adressen` angezeigt, mit Informationen wie Label, entsprechenden Guthaben, Gruppennummer usw.

<img src={require("./media/gs10.png").default} alt="Address page" width="auto" style={{ height: '200px' }} />

Durch Klicken auf eine der `+ New address`-Schaltflächen gelangst du zur Seite `Neue Adresse`, auf der du die neue Adresse erstellen und beschriften kannst. Standardmäßig werden Adressen in einer zufälligen Gruppe generiert. Du kannst manuell eine bestimmte Gruppe unter dem Abschnitt `Erweiterte Einstellungen` auswählen.

<img src={require("./media/gs11.png").default} alt="Prompt to create a new address" width="auto" style={{ height: '200px' }} />

Durch Klicken auf eine bestimmte Adresse siehst du die Adressdetails einschließlich ihrer Transaktionshistorie.

<img src={require("./media/gs12.png").default} alt="View of a singel address" width="auto" style={{ height: '200px' }} />

Über das Einstellungsrad oben in der Anwendung kannst du das Adresslabel bearbeiten, es als deine Standardadresse auswählen oder alle nicht gesperrten Mittel auf eine Adresse deiner Wahl übertragen.

<img src={require("./media/gs13.png").default} alt="Prompt to configure address options" width="auto" style={{ height: '200px' }} />
