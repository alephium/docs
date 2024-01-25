---
sidebar_position: 40
title: Problembehebung und Mehr
sidebar_label: Problembehebung und Mehr 
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## API-Schlüssel

Es ist eine gute Praxis, einen API-Schlüssel zu verwenden, um den Zugriff auf die REST-Endpunkte Ihres Full Nodes zu beschränken.

### Einrichtung des API-Schlüssels

Fügen Sie bitte folgendes zu Ihrer `user.conf` hinzu, indem Sie die Nullen durch Ihren eigenen Schlüssel (>= 32 Zeichen) ersetzen.

```
alephium.api.api-key = "--- your own key with >= 32 characters"
```

Starten Sie Ihren Full Node neu, damit dies wirksam wird.

#### Generieren eines API-Schlüssels

Für GNU/ Linux: `cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 48 | head -n 1`

### API-Schlüssel benutzen

1. Klicken Sie auf die Schaltfläche `Authorize`  oben rechts in Ihrer Swagger-Benutzeroberfläche:
   ![full-node-api-key-auth0](media/full-node-api-key-auth0.png)

2. Füllen Sie das Wertfeld mit Ihrem Schlüssel aus und klicken Sie auf die Schaltfläche "Authorize":
   ![full-node-api-key-auth1](media/full-node-api-key-auth1.png)

Nun können Sie Swagger UI verwenden, als ob kein API-Schlüssel vorhanden wäre.

## Wie mache ich die API meines Full Nodes öffentlich zugänglich?

1. Richten Sie Ihren API-Schlüssel gemäß der oben stehenden Anleitung ordnungsgemäß ein.

2. Add the following to your `user.conf` and restart your full node.

```
alephium.api.network-interface = "0.0.0.0"
```

## Wie greife ich auf die Swagger UI meines Full Nodes von einem anderen Computer im selben Subnetz aus zu?

1. Fügen Sie folgendes zu Ihrer `user.conf` hinzu und starten Sie Ihren Full Node neu.

```
alephium.api.network-interface = "0.0.0.0"
```

2. Ändern Sie den `host` der Swagger UI auf die Subnetz-IP Ihres Full Nodes.

## Fehler "java.lang.AssertionError: assumption failed"

Dieser Fehler tritt häufig aufgrund von Verbindungsverlust während der Knoten Synchronisierung auf und bedeutet, dass einige der Dateien beschädigt sind.
Um das Problem zu beheben:

1. Löschen sie den Ordner .alephium `rm .alephium`

2. Starten Sie den Knoten neu und warten Sie auf die Synchronisierung `java -jar alephium-x.x.x.jar`

## Verschieben des Alephium-Datenordners

Viele Benutzer bevorzugen es, den Alephium-Datenordner auf einer anderen Festplatte als der primären Startfestplatte zu speichern. Hierzu können Sie die Umgebungsvariable `ALEPHIUM_HOME` im Alephium-Full-Node-Jar nutzen:

1. Stoppen Sie das Alephium-Full-Node-Jar
2. Verschieben Sie den Alephium-Datenordner (normalerweise unter `%userprofile%\.alephium` für Windows oder `~/.alephium` für Linux und macOS) an den neuen Speicherort
3. Fügen Sie eine Umgebungsvariable `ALEPHIUM_HOME` auf Systemebene hinzu, die auf den neuen Speicherort verweist. Dies können Sie entweder auf Systemebene durchführen oder einfach eine Batch-Datei erstellen, die die Variable vor dem Starten des Alephium-Jars festlegt.
4. Starten Sie den Alephium-Knoten neu

Wenn Sie den Docker-Full-Node verwenden, passen Sie einfach die Definitionen der eingebundenen Ordner in der Docker-Datei an, um auf das neue Verzeichnis zu zeigen, und starten Sie dann den Node neu.

## Anpassen des Protokolls

Es gibt mehrere Umgebungsvariablen, die für das Protokollieren verwendet werden:

- `ALEPHIUM_LOG_LEVEL` könnte das Konsolen-Protokollniveau ändern.
- `ALEPHIUM_ENABLE_DEBUG_LOGGING` könnte das Debug-Protokollieren aktivieren.
- `ALEPHIUM_HOME` könnte den Hauptordner des Full Nodes ändern, daher auch den Ordner der Protokolle.

Im Folgenden finden Sie ein Beispiel mit allen möglichen Protokolloptionen:

```
ALEPHIUM_HOM=<folder> ALEPHIUM_LOG_LEVEL=<DEBUG | INFO | WARN | ERROR> ALEPHIUM_ENABLE_DEBUG_LOGGING=<true | false> java -jar alephium-x.x.x.jar
```

Es ist auch möglich, die [Protokollkonfigurationsdatei](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/logback.xml) von Alephium zu überschreiben.

```
java -Dlogback.configurationFile=/path/to/config.xml alephium-x.x.x.jar
```

## Pruning (Beschneidung)

Ein vollständig synchronisierter Alephium-Full-Node benötigt mehr als 80 GB Festplattenspeicher, um Blockchain-Daten zu speichern. Seit Version `2.6.1` unterstützt der Alephium-Full-Node das Pruning der Festplatte, was den Speicherbedarf erheblich reduzieren kann.

Hier sind die Schritte des Prunings des Alephium Full Nodes:

1. Stellen Sie sicher, dass der Alephium-Full-Node gestoppt ist.
2. Laden Sie  `alephium-tools-2.6.1.jar` von https://github.com/alephium/alephium/releases/tag/v2.6.1 herunter.
3. Wenn Sie das Standard-Alephium-Verzeichnis geändert haben, setzen Sie die Umgebungsvariable `ALEPHIUM_HOME`
4. Führen Sie den folgenden Befehl aus:  `java -cp alephium-tools-2.6.1.jar org.alephium.tools.PruneStorage` um mit dem Beschneiden zu beginnen.
5. Warten Sie, bis der Befehl abgeschlossen ist. Der Festplattenspeicher sollte auf etwa 20 GB reduziert sein.
6. Starten Sie den Alephium-Full-Node neu.
