---
sidebar_position: 0
slug: /
title: Intro
---

# Alephium Wiki

Ce wiki contient la documentation de [Alephium](https://github.com/alephium/alephium), une blockchain partionnée qui rend la monnaie programmable évolutive et sécurisée.

Vous y trouverez des informations sur la façon de configurer un nœud complet et de commencer le minage, des sections de support, des guides pour nos portefeuilles, un guide sur la construction de contrats intelligents, la feuille de route de nos projets, des FAQ, et plus encore.


## Aperçu du protocole Alephium

Les innovations du protocole prolongent les idées éprouvées du [Bitcoin](https://bitcoin.org/bitcoin.pdf) et de l'[Ethereum](https://ethereum.org/en/whitepaper/) :

- L'algorithme BlockFlow basé sur le modèle UTXO permet le partionnement et l'évolutivité (code + [document sur l'algorithme](https://github.com/alephium/research/blob/master/alephium.pdf))
  - Le premier algorithme de partionnement qui prend en charge les `transactions cross-shard en une seule étape`, offrant la même expérience utilisateur que sur une chaîne unique.
  - Simple et élégant `PoW sharding based`, ne repose pas sur la chaîne de référence.
- Le modèle UTXO statique combine les avantages du modèle eUTXO et du modèle de compte (voir le code, wiki à venir).
  - Les jetons sont des citoyens de première classe et basés sur UTXO, qui sont `propriétés par les utilisateurs` directement au lieu de contrats.
  - Ils offrent la même expressivité que le `modèle de compte`. Les DApps peuvent être facilement construites par dessus avec une meilleure sécurité.
  - Supporte les `multiples participants` dans une seule transaction de contrat intelligent. Des appels multiples peuvent également être regroupés dans une seule transaction.
- La conception novatrice de la VM résout de nombreux problèmes critiques des plateformes d'applications numériques (voir le code, wiki à venir).
  - Moins d'IO intensive.
  - Le prêt flash `flash loan` n'est pas disponible par conception.
  - Élimine de nombreux vecteurs d'attaque d'EVM, notamment l'autorisation illimitée, le problème du double dip, l'attaque par réentrance, etc.
  - UTXO style `fine-grained execution model` réduit l'arbitrage sans risque.
- Atténuation du front-running par l'exécution aléatoire des transactions (voir le code, wiki à venir).
- L'algorithme PoLW réduit la consommation d'énergie du PoW à long terme ([research paper](https://github.com/alephium/research/blob/master/polw.pdf)).
  - Des récompenses adaptatives basées sur le hashrate et le timestamp sont conçues et implémentées.
  - Un coût interne de minage par combustion sera ajouté lorsque le hashrate et la consommation d'énergie sont significativement élevés.
