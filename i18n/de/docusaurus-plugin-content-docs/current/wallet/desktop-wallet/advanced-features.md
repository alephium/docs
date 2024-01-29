---
sidebar_position: 40
title: Erweiterte Funktionen
sidebar_label: Erweiterte Funktionen
---

# Erweiterte Funktionen

## 1. UTXO-Konsolidierung

:::info

Aufgrund der Natur von UTXO werden bei jeder Transaktion mehrere neue "Unspent Transaction Outputs" (UTXOs) erstellt, die jeweils verschiedene Beträge von ALPH enthalten. Wenn diese UTXOs nicht von Zeit zu Zeit konsolidiert werden, kann ein UTXO den Punkt erreichen, an dem es so genanntes "Staub (Dust)" wird. Das bedeutet, dass, wenn der Betrag in einem UTXO kleiner ist als die Kosten für GAS, um die enthaltenen ALPH zu senden, diese ALPH nicht mehr bewegt werden können.

Um sicherzustellen, dass dies nicht passiert, ermöglicht es das Wallet, deine UTXOs mit einem Klick auf eine Schaltfläche einfach zu konsolidieren.

:::

Im Tab `Adressen` auf das Symbol `Erweiterte Operationen` klicken und `UTXOs konsolidieren` auswählen.

<img src={require("./media/af1.png").default} alt="UTXO consolidation" width="auto" style={{ height: '200px' }} />

<img src={require("./media/af4.png").default} alt="UTXO consolidation" width="auto" style={{ height: '200px' }} />

Wähle die Adresse aus, von der aus du die UTXOs konsolidieren möchtest, und wähle die Zieladresse aus (es kann dieselbe Adresse sein). Klicke auf `Konsolidieren` und deine UTXOs werden konsolidiert.

<img src={require("./media/af2.png").default} alt="Landing page" width="auto" style={{ height: '200px' }} />

## 2. Passphrase (ERWEITERTES SICHERHEITSFEATURE)

Eingeführt in Version 1.3.0

:::caution
Bitte lies die folgende Dokumentation und diesen [Artikel](https://medium.com/@alephium/bip39-passphrase-implementation-f87adecd6f59) bevor du dich entscheidest, diese Funktion zu verwenden.
:::

### 1. Wichtige Erkenntnisse

- Die Passphrase ist ein fortgeschrittenes Sicherheitsmerkmal, das ein zusätzliches von dir gewähltes Wort zu deiner vorhandenen Secret Recovery Phrase hinzufügt.
- Die Verwendung einer Passphrase führt dazu, dass ein vollständig neues Wallet erstellt wird, auf das nicht allein über die Secret Recovery Phrase zugegriffen werden kann.
- Das Desktop Wallet-Passwort unterscheidet sich von der Passphrase. Das Passwort wird nur auf deinem Computer verwendet, um die Secret Recovery Phrase zu verschlüsseln und zu speichern. Die Passphrase ist ein zusätzliches Wort zu dieser Secret Recovery Phrase und wird nicht im Wallet gespeichert.
- Neben der Erhöhung der Sicherheit gewährt die Passphrase dir plausible Abstreitbarkeit bei Zwangslage.
- **Wenn du dich entscheidest, eine Passphrase zu verwenden, ist es entscheidend, diese sicher an einem anderen physischen Ort als der Secret Recovery Phrase zu speichern und zu sichern. Du musst dich an deine Passphrase perfekt erinnern. Eine Änderung eines einzelnen Zeichens (selbst von Klein- zu Großbuchstaben) führt zur Generierung eines völlig neuen Wallets. **

Angenommen, du hast eine Wallet mit der Desktop Wallet-App erstellt, du hast eine Liste von 24 Wörtern, die als deine Secret Recovery Phrase bezeichnet werden. Diese Phrase kann verwendet werden, um deine Wallet wiederherzustellen und auf deine Mittel zuzugreifen. Wenn diese 24-Wort Secret Recovery Phrase gestohlen wird, kann der Angreifer deine Mittel stehlen. Um die Sicherheit der Benutzer unserer Desktop-Wallet zu erhöhen und den Verlust von Mitteln aufgrund des Diebstahls der 24-Wort Secret Recovery Phrase zu verhindern, haben wir die [BIP39 Passphrase](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) Funktion implementiert.

Die Passphrase ist ein zusätzliches optionales 25. Wort, das du selbst wählen kannst. Es kann aus beliebigen Klein-/Großbuchstaben, Zahlen und/oder Zeichen bestehen und so lang sein, wie du möchtest.

### 2. Wie man eine Passphrase verwendet

:::warning

Es ist wichtig zu beachten, dass jede einzigartige Passphrase ein vollständig neues Wallet generieren und darauf zugreifen wird. Es ist entscheidend, die Passphrase sicher an einem anderen physischen Ort als der Secret Recovery Phrase zu speichern und zu sichern.  **Du musst dich perfekt an deine Passphrase erinnern. Eine Änderung eines einzelnen Zeichens (selbst von Klein- zu Großbuchstaben) führt zur Generierung eines völlig neuen Wallets.**

:::

Um eine Passphrase zu verwenden, aktiviere einfach die Option `optionale Passphrase verwenden (Fortgeschritten)` und gib die optionale Passphrase deiner Wahl ein.

<img src={require("./media/af5.png").default} alt="Landing page" width="auto" style={{ height: '200px' }} />

### 3. Einschränkungen von Wallets mit Passphrase

1. Du kannst (noch) keine farbigen Etiketten für deine generierten Adressen verwenden.
2. Alle zusätzlich generierten Adressen müssen nach jedem Login erneut generiert werden.

Dies könnte sich in Zukunft ändern.
