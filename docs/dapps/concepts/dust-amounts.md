---
sidebar_position: 40
title: Dust Amount
sidebar_label: Dust amount
---

Alephium's unique
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
model combines security of the UTXO model and the expressiveness of
the account model. All assets in Alephium, including the native ALPH
and other [tokens](/dapps/concepts/tokens), are managed by UTXOs. Even though
UTXO model brings many of the security benefits on to the table
(e.g. see [Asset Permission
System](http://localhost:3000/ralph/asset-permission-system)), it also
comes with a tradeoff that has UX implications: specifically the
concept of **dust amount**. The goal of this article is to bring
some clarity to this topic.

Every UTXO contributes to the size of the so-called [UTXO
set](https://en.wikipedia.org/wiki/Unspent_transaction_output#UTXO_set).
Without an effective mechanism to control its size, UTXO set could
create significant performance bottlenecks to the blockchain,
especially when it comes to IO. Maintaining a relatively small UTXO
set is important for Alephium to keep becoming the best version of
itself: efficient, performant and scalable. 

UTXO with a very small amount of value can also become uneconomical to
spend if the transaction fee of spending an UTXO is more than the
value of the UTXO itself. Over time this can potentially create a
situation where users are not incentive-compatible with the long term
health of the system.

This is a problem faced by all UTXO based blockchains. To control the
size of the UTXO set, Bitcoin Core introduced the concept of [dust
](https://bitcoin.stackexchange.com/questions/10986/what-is-meant-by-bitcoin-dust/41082#41082). If
a user attempts to create a UTXO with a value that is below the dust
limit, Bitcoin Core will not relay it to the network to avoid state
bloat of the blockchain. The concept of **dust amount** in Alephium is
similar to the dust limit in Bitcoin but even simpler to reason about
since it doesn't change depending on the type of the transaction. If a
transaction output does not have at least the **dust amount** of ALPH,
Alephium blockchain will consider the transaction invalid.

For regular UTXOs, the **dust amount** is `0.001` ALPH. This means
that the following transaction are invalid:

```
1)                ----------------
                  |              | 0.0005 ALPH (ALPH too small)
    1 ALPH        |              | =============================>
================> |              |
                  |              | (0.9995 - gas fee) ALPH
                  |              | =============================>
                  ----------------

2)                ----------------
                  |              |
                  |              |
                  |              | 1 Token A
  1 Token A       |              | 0.0005 ALPH (ALPH too small)
================> |              | =============================>
                  |              |
  1 ALPH          |              | (0.9995 - gas fee) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------

3)                ----------------
                  |              |
                  |              |
   1 Token A      |              |   1 Token A (no ALPH)
================> |              | =============================>
                  |              |
   1 ALPH         |              |   (1 - gas fee) ALPH
================> |              | =============================>
                  |              | 
                  |              |
                  ----------------
```

The second and third case illustrate the situation where even if
the user's intention is to send token A, at least a dust amount of ALPH
needs to be sent as well. Button line is, each regular UTXO at least
requires `0.001` ALPH or else the transaction will fail. This simple
approach ensures that there is an upper bound to the size of the UTXO
set in the Alephium system.

Each contract has exactly one UTXO in the Alephium system. The dust
amount for contract UTXOs (also known as **contract deposit**) is
currently set as `0.1` ALPH. Compared
to the dust amount in the regular UTXOs, it puts a much more
aggressive upper bound to the number of contracts in the system, which
limits not only the size of the contract UTXO set, but also the size
of the contract states managed using the account model as well. Since
it is possible to reclaim the contract deposit after the contract is
destroyed, it aims to create the right incentives for developers to
keep the size of the contract state at a healthy level.

From the UX perspective, this means that creating a contract requires
at least `0.1` ALPH as contract
deposit. Concretely, if the mint price of an NFT is `100` ALPH, the
total cost might be `100.1` ALPH after
taking contract deposit into consideration. It also means that any
transactions that reduce the balance of the contract to below `0.1` ALPH
will fail.

In summary, while it does create some UX challenges, **dust amount**
for UTXOs (and by extension **contract deposit**) is a pivotal to the
performance, scalability and decentralization of the Alephium
blockchain.
