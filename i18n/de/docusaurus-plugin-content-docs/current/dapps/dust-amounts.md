---
sidebar_position: 30
title: Dust Betrag
sidebar_label: Dust Betrag
---

Alephium's einzigartiges
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
kombiniert die Sicherheit des UTXO-Modells mit der Ausdrucksstärke 
des Account-Modells. Alle Vermögenswerte in Alephium, einschließlich 
des nativen ALPH und anderer [Tokens](/tokens/overview), werden durch 
UTXOs verwaltet. Obwohl das UTXO-Modell viele Sicherheitsvorteile mit 
sich bringt (siehe [Asset Permission System](http://localhost:3000/ralph/asset-permission-system)), 
geht es auch mit einem Kompromiss einher, der UX-Auswirkungen hat, 
insbesondere bei dem Konzept des **Dust-Betrags**. Das Ziel dieses Artikels 
ist es, etwas Klarheit zu diesem Thema zu schaffen.

Jeder UTXO trägt zur Größe des sogenannten [UTXO-Set](https://en.wikipedia.org/wiki/Unspent_transaction_output#UTXO_set) bei.
Ohne einen effektiven Mechanismus zur Kontrolle seiner Größe könnte 
das UTXO-Set erhebliche Leistungseinschränkungen für die Blockchain 
verursachen, insbesondere hinsichtlich der Ein-/Ausgabe. Die 
Aufrechterhaltung eines relativ kleinen UTXO-Sets ist wichtig für 
Alephium, um die beste Version von sich selbst zu bewahren: effizient, 
leistungsfähig und skalierbar. 

UTXOs mit sehr geringem Wert können auch unwirtschaftlich werden, wenn die 
Transaktionsgebühr für die Ausgabe eines UTXOs höher ist als der Wert des 
UTXOs selbst.Da es möglich ist, die Vertragskaution zurückzuerhalten, nachdem 
der Vertrag zerstört wurde, schafft dies hoffentlich die richtigen Anreize für 
Entwickler, die Größe des Vertragszustands auf einem gesunden Niveau zu halten.

Dies ist ein Problem, dem alle UTXO-basierten Blockchains gegenüberstehen. 
Um die Größe des UTXO-Sets zu kontrollieren, führte Bitcoin Core das Konzept 
des [Dust](https://bitcoin.stackexchange.com/questions/10986/what-is-meant-by-bitcoin-dust/41082#41082) ein. 
Wenn ein Benutzer versucht, einen UTXO mit einem Wert unterhalb des Dust-Limits 
zu erstellen, wird Bitcoin Core ihn nicht an das Netzwerk weiterleiten, um eine 
Vergrößerung des Blockchain-Zustands zu vermeiden. Das Konzept des Dust-Betrags 
in Alephium ähnelt dem Dust-Limit in Bitcoin, ist jedoch noch einfacher zu 
verstehen, da es nicht von der Art der Transaktion abhängt. Wenn eine 
Transaktionsausgabe nicht mindestens den **Dust-Betrag** von ALPH hat, betrachtet die 
Alephium-Blockchain die Transaktion als ungültig.

Für reguläre UTXOs beträgt der **Dust-Betrag** `0.001` ALPH. Das bedeutet, 
dass die folgenden Transaktionen ungültig sind:

```
1)                ----------------
                  |              | 0.0005 ALPH (ALPH zu klein)
    1 ALPH        |              | =============================>
================> |              |
                  |              | (0.9995 - Gas Gebühr) ALPH
                  |              | =============================>
                  ----------------

1)                ----------------
                  |              |
                  |              |
                  |              | 1 Token A
  1 Token A       |              | 0.0005 ALPH (ALPH zu klein)
================> |              | =============================>
                  |              |
  1 ALPH          |              | (0.9995 - Gas Gebühr) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------

1)                ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 Token A (keine ALPH)
================> |              | =============================>
                  |              |
   1 ALPH         |              |   (1 - Gas Gebühr) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------
```

Der zweite und dritte Fall veranschaulichen die Situation, in der 
selbst wenn die Absicht des Benutzers darin besteht, Token A zu senden, 
mindestens ein Dust-Betrag von ALPH ebenfalls gesendet werden muss. 
Kurz gesagt, jeder reguläre UTXO erfordert mindestens `0,001` ALPH, sonst 
wird die Transaktion fehlschlagen. Dieser einfache Ansatz stellt sicher, 
dass es eine Obergrenze für die Größe des UTXO-Sets im Alephium-System gibt.

Jeder Vertrag hat genau einen UTXO im Alephium-System. Der Dust-Betrag für 
Vertrags-UTXOs (auch als **Vertragskaution** bekannt) ist derzeit auf `1` ALPH 
festgelegt. Im Vergleich zum Dust-Betrag in regulären UTXOs setzt dies eine 
viel aggressivere Obergrenze für die Anzahl der Verträge im System, die nicht 
nur die Größe des Vertrags-UTXO-Sets begrenzt, sondern auch die Größe der mit 
dem Account-Modell verwalteten Vertragszustände. Da es möglich ist, die 
Vertragskaution nach der Zerstörung des Vertrags zurückzugewinnen, schafft dies 
hoffentlich die richtigen Anreize für Entwickler, die Größe des Vertragszustands 
auf einem gesunden Niveau zu halten.

Aus UX-Sicht bedeutet dies, dass für die Erstellung eines Vertrags mindestens 
`1` ALPH als Vertragskaution erforderlich ist. Konkret könnte der Gesamtpreis, 
wenn der Preis eines NFT `100` ALPH beträgt, nach Berücksichtigung der 
Vertragskaution `101` ALPH betragen. Es bedeutet auch, dass alle Transaktionen, 
die das Guthaben des Vertrags auf unter `1` ALPH reduzieren, fehlschlagen werden.

Zusammenfassend lässt sich sagen, dass der **Dust-Betrag** für UTXOs (und folglich 
die **Vertragskaution**) einige UX-Herausforderungen schafft, aber entscheidend für 
die Leistung, Skalierbarkeit und Dezentralisierung der Alephium-Blockchain ist.
