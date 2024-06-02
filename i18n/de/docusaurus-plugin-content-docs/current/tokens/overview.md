---
sidebar_position: 10
title: Übersicht
sidebar_label: Übersicht
---

Tokens sind in Alephium *First-class citizen*. Genau wie das native Token ALPH werden 
alle Tokens auf Alephium von UTXOs verwaltet, die direkt von Adressen gehalten werden.

Dieses Design hat einige Vorteile im Vergleich zu anderen Blockchains:

- Token-Transfers zwischen Benutzern erfordern nur UTXOs, die sich in der Praxis in Bezug 
  auf ihre Sicherheit bei der Verwaltung von Vermögenswerten bewährt haben.
- Es ist einfacher für Wallets und DApps, die Tokens der Benutzer zu finden, 
  einschließlich sowohl fungibler als auch nicht fungibler Tokens.
- Wenn Smart Contracts Tokens übertragen müssen, sind keine zusätzlichen Genehmigungstransaktionen 
  erforderlich, da die Genehmigung im UTXO-Modell implizit ist. Alephium nutzt sein einzigartiges 
  [Asset Permission System](/ralph/asset-permission-system), 
  um sicherzustellen, dass Tokens von den Smart Contracts sicher behandelt werden.
- Der Token-Transfer ist sehr skalierbar, weil er die [Sharding](/glossary.md#sharding)-Architektur 
  von Alephium optimal nutzen kann. 

Um die Arbeit mit Tokens im Alephium-Ökosystem zu erleichtern:

- [Token standards](https://github.com/alephium/alephium-web3/tree/master/packages/web3/std)
  werden im SDK eingeführt, um standardisierte Schnittstellen für sowohl fungible als auch 
  nicht fungible Tokens zu definieren.
- Im SDK werden Utility-Funktionen definiert, um häufige Aufgaben für DApps 
  und Wallets beim Umgang mit Tokens zu erleichtern, wie z. B. das Erraten 
  von Token-Typen und das Extrahieren von Token-Metadaten.
- [Token list](https://github.com/alephium/token-list) wird verwendet, 
  um eine Vertrauensquelle für bekannte fungible Tokens und NFT-Sammlungen 
  herzustellen.
- Native Unterstützung sowohl für fungible als auch nicht fungible Tokens in Wallets 
  und im Explorer.
- Tools zur Unterstützung beim Start von NFT-Public-Sales im [Opensea-Drop](https://docs.opensea.io/docs/drops-on-opensea)-Stil, 
  genannt `Flow`.

In der Seite [Fungible Tokens](/tokens/fungible-tokens) erfahren Sie mehr über 
den fungiblen Token-Standard, wie man fungible Tokens ausgibt, wie man Token-Metadaten 
abruft und wie man fungible Tokens in Wallets überträgt, usw.

Auf der Seite [Non-fungible Tokens](/tokens/non-fungible-tokens) erfahren Sie mehr 
über den nicht fungiblen Token-Standard, wie Sie Ihre eigenen NFT-Sammlungen erstellen 
und Ihre erste NFT-Public-Sale-Kampagne namens
`Flows` im [NFT Marktplatz](https://testnet.nft.alephium.org/) starten können.
