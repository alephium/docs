---
sidebar_position: 55
title: Constants
sidebar_label: Constants
---

There are some protocol level constants that we should be aware of
when building dApps on Alephium, such as the minimal required gas,
maximal numbers of tokens per contract, etc. This guide is a
compilation of some of the important constants on Alephium.


| Description                                       | Value            |
|---------------------------------------------------|------------------|
| Maximal transactions per block                    | 2000             |
| Minimal gas per transaction                       | 20000            |
| Minimal gas price per transaction                 | 0.0000001 `ALPH` |
| Minimal gas fee per transaction                   | 0.002 `ALPH`     |
| Maximal gas per block                             | 10000000         |
| Maximal gas per transaction                       | 5000000          |
| Minimal ALPH per asset utxo (dust amount)         | 0.001 `ALPH`     |
| Minimal ALPH per contract utxo (contract deposit) | 0.1 `ALPH`       |
| Maximal number of token per asset utxo            | 1                |
| Maximal number of token per contract utxo         | 8                |
| Maximal contract code size                        | 32 `KB`          |
| Maximal contract total fields size                | 3 `KB`           |

