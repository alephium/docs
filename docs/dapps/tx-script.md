---
sidebar_position: 29
title: Transaction Script
sidebar_label: Transaction script
---

Alephium's
[sUTXO](https://medium.com/@alephium/an-introduction-to-the-stateful-utxo-model-8de3b0f76749)
model enables two types of transactions: One involves pure asset
transfer from senders to the recipients, which is similar to the
transactions seen in other pure UTXO-based blockchains such as
Bitcoin. Another involves smart contract interactions where
transactions are initiated by executing transaction scripts
(i.e. `TxScript`).


`TxScript` is a unique feature in Alephium. It allows developers to
write re-usable or one-off scripts that can compose multiple contract
calls into a single transaction, with the flexibility and security
enabled by the full power of Ralph language and Alphred VM, but
without the overhead and cost of deploying new aggregation contracts.

As an example, following is an illustration of a transaction with
`TxScript` that uses two DEXes to figure out the average exhange rate
of USD to ALPH, and then donate $100 worth of ALPH to a charity:

```
                  ----------------------------------------------------
                  |                <TxScript>                        |   fixed output
                  |                                                  | ========================>
                  |                                                  |
     input        |  let rate1  = dex1.exchageRateOfUSDToALPH()      |   generated output
================> |  let rate2  = dex2.exchageRateOfUSDToALPH()      | ========================>
                  |  let amount = 100 / ((rate1 + rate2) / 2)        |
                  |  charity.donate {donor -> ALPH: amount} (amount) |   generated output
                  |                                                  | ========================>
                  |                                                  |
                  |                                                  |
                  ----------------------------------------------------
```

As you can see, `TxScript` is a lightweight and flexible way of
interacting with smart
contracts. [Here](/dapps/interact-with-contracts#txscript-transactions)
you can find a concrete example of how to interact with smart contract
using `TxScript`. To better understand how assets flows from the
inputs through `Txscript` into the (fixed/generated) outputs, please
read the [Flow of
Assets](/ralph/asset-permission-system#flow-of-assets) section in
[Asset Permission System](/ralph/asset-permission-system).
