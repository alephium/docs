---
sidebar_position: 10
title: Einstieg
sidebar_label: Einstieg
---

## Anforderungen

- Java (11 oder 17 wird empfohlen)
- [PostgreSQL](https://www.postgresql.org)
- [Ein laufender Full Node](full-node/getting-started.md)

## Anwendungsdatei herunterladen

Laden Sie die Datei  `explorer-backend-x.x.x.jar` von [Github-Release](https://github.com/alephium/explorer-backend/releases/latest)  herunter.

## Erstellen der Datenbank:

1. Starten Sie den `postgresql`-Dienst.
2. Melden Sie sich bei der PostgreSQL-Shell mit dem Standardbenutzer `postgres` an:
   ```shell
   psql postgres # or `psql -U postgres` depending on your OS
   ```
3. Stellen Sie sicher, dass die Rolle `postgres` existiert, und erstellen Sie diese bei Bedarf.
   Alle Rollen auflisten:
   ```shell
   postgres=# \du
   ```
   Erstellen Sie die Rolle `postgres`:
   ```shell
   postgres=# CREATE ROLE postgres WITH LOGIN;
   ```
4. Erstellen Sie dann die Datenbank:
   ```shell
   postgres=# CREATE DATABASE explorer;
   ```

## Starten Sie Ihr Explorer-Backend

```shell
java -jar explorer-backend-x.x.x.jar
```

Ihr Explorer-Backend wird mit dem Full Node synchronisiert. Es kann beim ersten Mal lange dauern.

## Starten Sie von einem Snapshot

Um die Zeit für die erste Synchronisierung zu verkürzen, können Sie eine unserer Snapshots wiederherstellen.

Snapshots sind verfügbar unter https://archives.alephium.org/#mainnet/explorer-db/

Laden Sie den neuesten herunter, extrahieren Sie ihn und führen Sie folgendes aus:

```shell
psql explorer < explorer-db-xxx.pg_dump
```

Bitte beachten Sie, dass die `Explorer`-Datenbank zuvor erstellt und leer sein muss.
