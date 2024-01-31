---
sidebar_position: 50
title: Öffentliche Dienste
sidebar_label: Öffentliche Dienste
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Testnet Faucet

Der Testnet-Faucet ist eine Möglichkeit, Testnet-v1-Token in eine bestimmte Wallet zu erhalten.

### Via HTTP API

Eine andere Möglichkeit, Testnet-v16-Token zu erhalten, besteht darin, einen HTTP-Aufruf durchzuführen und Ihre Wallet-Adresse im Anfragekörper anzugeben, einfach wie folgt:

```
curl -X POST -d '1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy' https://faucet.testnet.alephium.org/send
```

Beachten sie, dass der Faucet Anfragen für einige Minuten drosselt.

## Node und Explorer APIs

Aktuell werden die folgenden API-Services gewartet. Beachten sie, dass alle APIs ratenbegrenzt sind, um Spam zu verhindern.
* `https://wallet-v20.mainnet.alephium.org` für das Mainnet mit Node v2.X ([Doc](https://wallet-v20.mainnet.alephium.org/docs))
* `https://wallet-v20.testnet.alephium.org` für Testnet mit Node v2.X ([Doc](https://wallet-v20.testnet.alephium.org/docs))
* `https://backend-v113.mainnet.alephium.org` für das Mainnet einschließlich Explorer-Backend v1.13.X ([Doc](https://backend-v113.mainnet.alephium.org/docs))
* `https://backend-v113.testnet.alephium.org` für das Testnet einschließlich Explorer-Backend v1.13.X ([Doc](https://backend-v113.testnet.alephium.org/docs))

Da das Projekt sich noch in aktiver Entwicklung befindet, sind alle APIs versioniert. In der Regel werden nur die neuesten Versionen gepflegt, aber alle API-Upgrades werden der Community im Voraus angekündigt.

## API Aliases

Wir pflegen die folgenden API-Aliase, um Benutzern Zeit für die Migration von der alten API zu geben.

import aliases from "./api-aliases.json";

export const Aliases = ({aliases, type}) => (
    <Box>
        {aliases.length > 0 && <h3>{type} Aliases</h3>}
        <ul>{aliases && aliases.map((alias) => {
            const from = alias['from'];
            const to = alias['to'];
            const additionalPath = from.includes('wallet') ? '/infos/version' : from.includes('backend') ? '/infos' : '';
            return <li key={from}><code>{from}</code> (<a href={`${from}${additionalPath}`}>Test</a>) -> <code>{to}</code></li>;
        })}</ul>
    </Box>
)

<Aliases aliases={aliases['current']} type='Current' />
<Aliases aliases={aliases['deprecated']} type='Deprecated' />

## API-Ratenbegrenzung

Um die beste Leistung und Sicherheit zu gewährleisten, haben alle unsere öffentlichen APIs eine Ratenbegrenzung implementiert. Dies bedeutet, dass es eine Begrenzung für die Anzahl der Anfragen gibt, die sie innerhalb eines bestimmten Zeitraums machen können. Da unsere Dienste sich weiterentwickeln und wachsen, kann die Ratenbegrenzung basierend auf der tatsächlichen Nutzung des Dienstes angepasst werden.

Um eine reibungslose Erfahrung bei der Arbeit innerhalb der Ratenbegrenzung zu gewährleisten, empfehlen wir dringend, Cache- und Wiederholungsmechanismen zu implementieren, wenn Anfragen an unsere API-Dienste gestellt werden. Das Zwischenspeichern von Antworten kann dazu beitragen, die Anzahl der API-Aufrufe zu reduzieren, während das Wiederholen fehlgeschlagener Anfragen vorübergehende Probleme oder Fehler behandeln kann.

Wenn Ihre Anwendung mit dem React-Framework erstellt wurde, können sie das ["SWR"](https://www.npmjs.com/package/swr)-Paket nutzen, das auf npm verfügbar ist. SWR bietet bequeme Hooks für Datenabruf und Zwischenspeicherung und erleichtert die Arbeit mit APIs. Insbesondere können sie das `useSWR`-Hook für die Bearbeitung von veränderlichen Daten und das `useSWRImmutable`-Hook für die Bearbeitung von unveränderlichen Daten wie Token-Metadaten verwenden.
