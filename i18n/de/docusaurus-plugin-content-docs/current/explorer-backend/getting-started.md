---
sidebar_position: 10
title: Einstieg
sidebar_label: Einstieg
---

## Anforderungen

- Java (11 oder 17 wird empfohlen)
- [PostgreSQL](https://www.postgresql.org)
- [Ein laufender full-node](full-node/getting-started.md)

## Anwendungsdatei herunterladen

Laden sie die Datei  `explorer-backend-x.x.x.jar` von [Github-Release](https://github.com/alephium/explorer-backend/releases/latest)  herunter.

## Erstellen der Datenbank:

1. Starten sie den `postgresql`-Dienst.
2. Melden sie sich bei der PostgreSQL-Shell mit dem Standardbenutzer `postgres` an:
   ```shell
   psql postgres # or `psql -U postgres` depending on your OS
   ```
3. Stellen sie sicher, dass die Rolle `postgres` existiert, und erstellen sie diese bei Bedarf.
   Alle Rollen auflisten:
   ```shell
   postgres=# \du
   ```
   Erstellen sie die Rolle `postgres`:
   ```shell
   postgres=# CREATE ROLE postgres WITH LOGIN;
   ```
4. Erstellen sie dann die Datenbank:
   ```shell
   postgres=# CREATE DATABASE explorer;
   ```

## Starten sie Ihr Explorer-Backend

```shell
java -jar explorer-backend-x.x.x.jar
```

Ihr Explorer-Backend wird mit dem Full Node synchronisiert. Es kann beim ersten Mal lange dauern.

## Starten sie von einem Snapshot

Um die Zeit für die erste Synchronisierung zu verkürzen, können sie eine unserer Snapshots wiederherstellen.

Snapshots sind verfügbar unter https://archives.alephium.org/#mainnet/explorer-db/

Laden sie den neuesten herunter, extrahieren sie ihn und führen sie folgendes aus:

```shell
psql explorer < explorer-db-xxx.pg_dump
```

Bitte beachten sie, dass die `Explorer`-Datenbank zuvor erstellt und leer sein muss.
