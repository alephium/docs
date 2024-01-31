---
sidebar_position: 50
title: Integration
sidebar_label: Integration
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

Dieses Dokument soll es Mining-Pools und Minern erleichtern, Alephium zu integrieren. Es enthält hauptsächlich:

* das Kommunikationsprotokoll zwischen dem Mining-Pool und dem Full Node
* wie der Miner den Blockhash basierend auf den Mining-Jobs berechnet

Hinsichtlich der Implementierung des Kommunikationsprotokolls zwischen Mining-Pool und Minern können sie sich auf das Stratum-Protokoll [hier](alephium-stratum.md) beziehen. Beachten sie, dass Mining-Pools das Protokoll nicht genau befolgen.
In diesem Dokument werde ich den Code von [mining-pool](https://github.com/alephium/mining-pool) und [gpu-miner](https://github.com/alephium/gpu-miner) als Referenz verwenden.


## Mining Pool

Der Mining-Pool muss sich mit dem Alephium Full Node verbinden, um Mining-Jobs zu erhalten, und der Standard-Mining-API-Server ist `localhost:10973`.

Der Mining-Pool kommuniziert mit dem Full Node über ein binäres Protokoll, das Format der Nachricht sieht wie folgt aus:

```
MessageSize(4 bytes) + Message(1 byte MessageType + Payload)
```

### Mining-Jobs vom Full Node erhalten

Jedes Mal, wenn der Full Node einen neuen Block empfängt, sendet er eine `Jobs` Nachricht an den Mining-Pool. Sie können auch das Zeitintervall in der [Mining-Konfiguration](https://github.com/alephium/alephium/blob/master/flow/src/main/resources/system_prod.conf.tmpl#L6) des Full Nodes festlegen, um `Jobs`-Nachrichten zu senden, wenn es keine neuen Blöcke gibt.

Da es jetzt 16 Chains in Alephium gibt, wird es in jeder `Jobs`-Nachricht 16 Blockvorlagen geben. Und die Blockvorlage besteht aus den folgenden Feldern:

* `fromGroup` und `toGroup`: der Chain-Index der Blockvorlage.
* `headerBlob`: die serialisierten binären Daten des [BlockHeader](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/BlockHeader.scala#L28), exklusive der ersten 24 Bytes (Nonce).
* `txsBlob`: die serialisierten binären Daten der Transaktionen.
* `targetBlob`: die serialisierten binären Daten des [Targets](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/model/Target.scala#L32).

Sie können den bereitgestellten Code [hier](https://github.com/alephium/mining-pool/blob/master/lib/messages.js) verwenden, um mehr über das Format der `Jobs`-Nachricht und das Parsen der `Jobs`-Nachricht zu erfahren.

Sobald der Mining-Pool die `Jobs` -Nachricht vom Full Node empfängt, kann er die Mining-Jobs basierend auf ihrer Hashrate an die Miner senden. Für jede Chain erfordert die Berechnung des Nonce nur die Felder `targetBlob` und `headerBlob`. Daher kann der Mining-Pool Bandbreite sparen, indem er das Feld `txsBlob` ausschließt, wenn er Mining-Jobs an die Miner sendet. Sie können den bereitgestellten Code [hier](https://github.com/alephium/mining-pool/blob/master/lib/blockTemplate.js#L51) verwenden.

### Blöcke an den Full Node senden

Sobald der Mining-Pool eine gültige `nonce` vom Miner erhält, kann er den Block an den Full Node senden, wobei der Block aus der `nonce`, `headerBlob` und `txsBlob` besteht. Sie können den bereitgestellten Code [hier](https://github.com/alephium/mining-pool/blob/master/lib/pool.js#L119) verwenden.

Dann können sie den bereitgestellten Code [hier](https://github.com/alephium/mining-pool/blob/master/lib/daemon.js#L49) verwenden, um eine gültige `SubmitBlock`-Nachricht zu konstruieren und diese Nachricht an den Full Node zu senden.

Nachdem der Full Node den Block überprüft hat, sendet er eine `SubmitBlockResult` -Nachricht, um dem Mining-Pool mitzuteilen, ob der Block gültig ist. Sie können den bereitgestellten Code [hier](https://github.com/alephium/mining-pool/blob/master/lib/messages.js#L72) verwenden, um die `SubmitBlockResult`-Nachricht zu parsen.

## Miner

### Berechnung des Blockhash

In Alephium beträgt die Größe der `nonce` 24 Bytes, und der Hash des Blocks lautet: `blake3(blake3(serialize(blockHeader))`. Wie zuvor erwähnt, ist `blockBlob` in jedem Job die serialisierten binären Daten von `BlockHeader` ohne dem Feld `nonce`. Daher muss der Miner beim Berechnen des Blockhash die `nonce` vor dem `headerBlob` voranstellen. Sie können den bereitgestellten Code [hier](https://github.com/alephium/gpu-miner/blob/master/src/worker.h#L135) und [hier](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#L314) verwenden.

### Überprüfen des Chain-Index

Zusätzlich zur Überprüfung des Ziels muss der Miner auch den Chain-Index des Blocks überprüfen, da Alephium den Chain-Index in den Blockhash kodiert. Sie können den bereitgestellten Code [hier](https://github.com/alephium/gpu-miner/blob/master/src/blake3/original-blake.hpp#LL303C2-L303C2) verwenden, um zu überprüfen, ob der Chain-Index des Blockhash korrekt ist.
