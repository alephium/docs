---
sidebar_position: 10
title: Einstieg
sidebar_label: Einstieg
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Anforderungen

Stellen Sie sicher, dass Java (11 oder 17 wird empfohlen) auf Ihrem Computer installiert ist:

- Windows oder macOS: [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
- Ubuntu: führen sie `sudo apt install default-jdk` in Ihrem Terminal auf

## Anwendungsdatei herunterladen

Laden Sie die Datei `alephium-x.x.x.jar` vom [Github-Release](https://github.com/alephium/alephium/releases/latest) herunter (klicken Sie nicht doppelt darauf, da sie auf diese Weise nicht gestartet werden kann).

## Starte deinen Node (Knoten)

1. Öffnen Sie die Suche und geben Sie im `Terminal` (für Mac und Ubuntu) oder der `Eingabeaufforderung` (für Windows) ein.
2. Geben Sie im Terminal-/Eingabeaufforderungsprogramm `cd Ihr-jar-File-Pfad` ein, um in das Verzeichnis zu wechseln, in dem die Datei **alephium-x.x.x.jar** gespeichert ist.
3. Geben Sie den folgenden Befehl ein und drücken Sie Enter, um den Full Node zu starten:
   ```shell
   java -jar alephium-x.x.x.jar
   ```

🎉 _**Tada, Ihr Node ist aktiviert.**_

- Ihr Node beginnt, sich mit dem Netzwerk zu synchronisieren. Es kann beim ersten Mal eine Weile dauern. Ihr Node ist vollständig synchronisiert, wenn die Blockhöhe in den Terminalprotokollen mit derjenigen in den neuesten Blöcken des [Explorers] übereinstimmt.
- Wenn Sie das Terminal schließen, wird der Node ausgeschaltet.
- Alle Blockchain-Daten werden im Ordner `.alephium` unter Ihrem Benutzerverzeichnis [^1] gespeichert.

### Swagger

Wir verwenden OpenAPI, um mit dem Full Node zu interagieren. Sie können direkt die Swagger-Benutzeroberfläche öffnen unter: [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

Alternativ können Sie jeden OpenAPI-Client verwenden, um die Datei
aus unserem Repository `openapi.json` zu importieren. ([Download](https://github.com/alephium/alephium/raw/master/api/src/main/resources/openapi.json)).

### Mining

Für ein Mining-Tutorial können Sie unserer Anleitung zum [Solo Mining Guide](mining/solo-mining-guide.md) oder [Pool Mining Guide](mining/pool-mining-guide.md) folgen.

### Wallet

Sie können die Desktop Wallet von hier [GitHub](https://github.com/alephium/desktop-wallet/releases/latest) herunterladen.

Alternativ verfügt unsere Full Node über eine integrierte Wallet mit erweiterten Funktionen. Sie können unserem [Wallet Guide](wallet/node-wallet-guide.md) folgen, um zu lernen, wie Sie die Wallet verwenden können.

[^1]: Der Home-Ordner hängt von Ihrem System ab: `C:\Users\<ihr-benutzername>` unter Windows, `/Users/<ihr-benutzername>` auf macOS, `/home/<ihr-benutzername>` unter Linux.

[explorer]: https://explorer.alephium.org
