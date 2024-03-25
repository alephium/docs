---
sidebar_position: 50
title: Ledger
sidebar_label: Ledger
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

![IMG_8932-2](https://github.com/alephium/alephium/assets/88235023/010e915e-0ecd-4f8f-808e-4223202eaecd)

## Dies ist eine Anleitung zur Installation der Alephium-App auf Ihrem Ledger und zur Verwendung zum Signieren von Transaktionen

🚨 *Wichtige Informationen: Die Alephium-App für Ledger-Geräte ist eine benutzerdefinierte/communitybasierte App, die von Alephium entwickelt wurde. Sie ist derzeit nicht in Ledger Live verfügbar. Sie erfordert, dass Sie andere Software auf Ihrem Computer herunterladen, und umfasst mehrere manuelle technische Schritte. Fahren Sie nur fort, wenn Sie sicher sind, dass Sie wissen, wie Sie diesen Vorgang durchführen!*

🚨 *Da dies eine frühe Alpha-Version ist, ist es ratsam, einen neuen/frischen Ledger zu verwenden, auf dem keine anderen Münzen verwaltet werden.*

🚨 *Die Ledger-App funktioniert derzeit nur mit der neuesten Version (v0.7.0) der Erweiterungsbrieftasche.*

### Video Anleitung
Eine Anleitung im Videoformat finden Sie hier: https://www.youtube.com/watch?v=YBQy_siZh6w

### Geschriebene Anleitung

**1 — Laden Sie die neueste Wallet-Version von**: Chrome — [Extension Wallet](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) / Firefox — [Extension Wallet](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)


**2 — Installieren Sie die erforderliche Software** (wenn Sie bereits PIP & Python installiert haben, überspringen Sie Schritt 3)

Sie benötigen Python und PIP auf Ihrem Computer, um die Alephium-App auf Ihrem Ledger zu erhalten:

* Python ([how to for Windows](https://www.simplilearn.com/tutorials/python-tutorial/python-installation-on-windows#:~:text=To%20download%20Python%2C%20you%20need,then%20select%20the%20Windows%20option.), [how to for Mac](https://docs.python.org/3/using/mac.html), [how to for Linux](https://docs.python-guide.org/starting/install3/linux/))
* PIP ([how to for Windows](https://www.dataquest.io/blog/install-pip-windows/), [how to for Mac](https://www.groovypost.com/howto/install-pip-on-a-mac/), [how to for Linux](https://docs.python-guide.org/starting/install3/linux/))


**3 — Installieren Sie die Ledger Python-Bibliothek**

![image](https://github.com/alephium/docs/assets/88235023/fade8c08-f3a1-41b2-b7e9-9a3cd638a683)

Wir werden die Ledger Python-Bibliothek verwenden (Sie finden sie hier). Sie ist erforderlich, weil Sie eine benutzerdefinierte App auf Ihr Ledger-Gerät installieren.

Um die Ledger Python-Bibliothek zu installieren, öffnen Sie einfach ein Terminalfenster und geben Sie Folgendes ein:

**pip3 install — upgrade protobuf setuptools ecdsa**

**pip3 install ledgerwallet**

Dies führt alle Upgrades durch und installiert die Ledger Wallet Library, die für den nächsten Schritt benötigt wird.

![Install Ledger App](https://github.com/alephium/docs/assets/88235023/f3f096e3-fb9b-4a8c-9a98-a060112b0f5f)

**4 — Alephium Ledger App auf Ihren Computer herunterladen**

Gehen Sie zum folgenden GitHub-Repository: https://github.com/alephium/ledger-alephium und laden Sie es herunter.

🚨*Um das Repository herunterzuladen, klicken Sie auf die grüne Schaltfläche „Code“ und wählen Sie „Zip herunterladen“.*

![image](https://github.com/alephium/docs/assets/88235023/f699b669-1b00-4b2e-9649-5cedd221e0cb)

Laden Sie es herunter und entpacken Sie es in einen Ordner, auf den Sie einfachen Zugriff und alle Lese-/Schreibberechtigungen haben.

**5 — Installieren Sie die Alephium-App auf Ihrem Ledger-Gerät**

Ihr Ledger muss nun mit Ihrem Computer verbunden und entsperrt sein.

Gehen Sie zum GitHub-Repository (https://github.com/alephium/ledger-alephium/tree/master) und scrollen Sie nach unten, um den Befehl zu finden, der auf Ihre Ledger-Version zutrifft:

![image](https://github.com/alephium/docs/assets/88235023/6c5df18d-c59f-4ae4-ad8c-3e7bceb65014)

Mit diesen Informationen gehen Sie zur Konsolen-Eingabeaufforderung und führen Sie den Befehl aus, um die Alephium-App zu installieren:

🚨 *Wichtige Information: Sie müssen den Befehl im Ordner ausführen, in dem Sie die Dateien von GitHub heruntergeladen haben.*

In diesem Beispiel wird der Ledger Nano S verwendet:

![image](https://github.com/alephium/docs/assets/88235023/d92896ef-5f9b-43a6-8f53-ab56f38c1700)

Nach Ausführung dieses Befehls müssen Sie die Installation der Alephium-App auf Ihrem Ledger-Gerät validieren. Durchlaufen Sie alle Genehmigungen und fügen Sie Ihre PIN hinzu, um die Installation zu validieren.

Bei erfolgreicher Durchführung erscheint das Alephium-Symbol auf Ihrem Gerät.

![image](https://github.com/alephium/docs/assets/88235023/7c41b2d3-ea5a-44ca-bd05-46338cf3274c)

Nun sind Sie bereit, Ihren Ledger zum Signieren von Transaktionen auf Alephium zu verwenden! 🎉

**6 — Verwenden Sie Ihren Ledger mit der Extension Wallet**

Gehen Sie zum Browser, in dem Sie die Extension Wallet installiert haben, und öffnen Sie sie.

🚨 *Die Ledger-App funktioniert derzeit nur mit der neuesten Version (v0.7.0) der Extension Wallet. Wenn Sie diese nicht haben, können Sie diese von [hier](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj/related) (Chrome) oder [hier](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/) (Firefox) installieren .*

Erstellen Sie eine neue Adresse in Ihrer Extension Wallet: Klicken Sie auf den aktuellen Adressnamen und dann auf das „+“-Symbol. Dadurch gelangen Sie zur Ledger Connection-Seite:

* Schließen Sie Ihren Ledger an und entsperren Sie ihn.
* Öffnen Sie die Alephium-App (stellen Sie sicher, dass Sie alle Schritte validiert haben!).
* Wählen Sie Ihr Ledger-Gerät aus der Liste.
* Schließen Sie die Konfiguration ab.

![Neue Wallet isntallieren](https://github.com/alephium/alephium/assets/88235023/5fa7e000-2f77-4b44-9dfa-13b784e05eba)

**7 —  Verwenden Sie den Ledger, um eine Transaktion zu senden!**

Alle Schritte hier sind die üblichen, die wir bereits bei der Verwendung der Erweiterungsbrieftasche gesehen haben:

* Klicken Sie auf die Schaltfläche „Senden“.

![image](https://github.com/alephium/docs/assets/88235023/17eaf25a-5629-48cb-bee7-996513e9a7b4)

* Wählen Sie den Token aus, den Sie senden möchten.

![image](https://github.com/alephium/docs/assets/88235023/60a3ed3b-04f7-447a-9472-886147d2b5d4)

* Wählen Sie die Empfängeradresse aus.

![image](https://github.com/alephium/docs/assets/88235023/b6b7aae2-4c9e-4048-934e-95caa93bf577)

* Überprüfen Sie die Transaktionsdetails und klicken Sie auf „Mit Ledger signieren“.

![image](https://github.com/alephium/docs/assets/88235023/fde7b7c2-b864-468e-bb3f-66448fe8a4d2)

* Signieren Sie die Transaktion auf Ihrem Ledger-Gerät und verfolgen Sie deren Abschluss im Abschnitt „Aktivität“:

![image](https://github.com/alephium/docs/assets/88235023/efffc0de-01f8-48d7-a67c-ed1487c95483)

** 8 — Verwenden Sie ihren Ledger, um mit dApps in Alephium zu interagieren** 

Jetzt, da Sie bereits eine Transaktion mit Ihrem Ledger signiert haben, ist es an der Zeit, es mit einer dApp zu verbinden. Dieser Prozess ist ebenfalls unkompliziert.

Greifen Sie auf die [Alephium DEX auf dem Testnet](https://alephium.github.io/alephium-dex) zu. Klicken Sie oben rechts auf die Schaltfläche „Alephium verbinden“. Wählen Sie in der Aufforderung die Extension Wallet und das Ledger-Konto aus.

![connect with dex](https://github.com/alephium/alephium/assets/88235023/f3e6cf9e-e632-4bc0-84a8-67f38d067311)

Jetzt sind Sie mit der Alephium DEX verbunden. Führen Sie eine Swap-Transaktion durch und verwenden Sie Ihren Ledger, um sie zu signieren. Der Vorgang ist ähnlich wie bei einer Übertragung.

![unnamed](https://github.com/alephium/alephium/assets/88235023/bb263f71-3801-4be3-86cd-d7a18b525e0a)

Bei Fragen oder Anregungen kontaktieren Sie uns bitte über [Alephium’s Discord](http://alephium.org/discord), [Telegram](https://t.me/alephiumgroup), oder melden Sie sich auf [Twitter](https://twitter.com/alephium)!
