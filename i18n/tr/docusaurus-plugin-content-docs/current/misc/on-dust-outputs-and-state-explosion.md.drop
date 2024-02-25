---
sidebar_position: 20
title: On dust outputs and state explosion
---

This article follows a brainstorm between [Cheng](https://github.com/polarker) and [Tom](https://github.com/tshabs)

Let’s consider mainly UTXO-based blockchain. The state of such kind of blockchains is mainly about the number of UTXOs. To ease the state explosion issue, we will need a proper design to invalidate UTXOs with small value.

Let’s also assume that all the UTXOs are equally sized. Then the state explosion problem can be reduced to bound the number of UTXOs. As blockchain protocol applies the same validation rules to each UTXO, an upper bound on the number of UTXOs means a lower bound on the number of coins per UTXO (inflation and deflation are not considered as the rates of both are usually not so high ). Therefore, we come to the conclusion that a lower bound is necessary.

However, it’s nearly impossible to find a fixed lower bound for the coin amount per UTXO. For example, for Bitcoin, 1mBTC might be a reasonable lower bound 10 years ago, but it cannot be used anymore nowadays. The second best is to find a dynamic lower bound that depends on the current state of the blockchain. Ideally, the lower bound would make attackers either impossible or cost high to inflate the state. When the market value of the blockchain is low, the cost to attack is low anyway, so the lower bound has to be high to make it impossible to create new utxos insanely. When the market value of the blockchain gets higher, the lower bound can be reduced.

@Tom suggested designing such a lower bound based on averaged tx fee of the latest blocks. However, most of the blockchains would have “gas limit” as Ethereum. When the network is very congested, the tx fee would be equal to the gas limit always. In this case, the lower bound will not be dynamic enough in the long term. However, with a dynamic gas limit like EIP1559, it might perform well.

@Cheng suggested designing the lower bound based on the hash rate of the blockchain. Theoretically, hash rate is a good index for energy consumption and block reward in fiat. In practice, when using a simple and efficient mining algorithm like Sha256, the cost per hash rate is pretty stable and predictable in the long run. The lower bound can be inversely proportional to (hash_rate / coinbase_reward) if follow this design.

As noted by @Tom, there is an edge case that one UTXO might be above the lower bound when it’s created, but later might be invalid with a new lower bound. There are two ways to deal with it: 1) actively removing those invalid UTXOs, but this will probably make users angry and also make the system complicated; 2) just leave it there and users will still be able to use it as each tx can include multiple inputs. Note that this is not possible for Ethreum's native token, as there can be only one caller for each Eth tx.
