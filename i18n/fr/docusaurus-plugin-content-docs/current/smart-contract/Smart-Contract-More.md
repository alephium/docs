---
sidebar_position: 20
title: More on Smart Contracts
---

> ## ⚠️ Cette page n'a pas encore été traduite. Vous pouvez le faire en suivant le lien en pied de page.

We will provide more documentation soon. For the moment, there are several parts of our source code where you can learn about our contract language:

## Contract examples

- A complete [voting app tutorial](https://github.com/alephium/voting-tutorial)
- Simple [Uniswap-like contract](https://github.com/alephium/alephium/blob/master/flow/src/test/scala/org/alephium/flow/core/VMSpec.scala#L877-L985)
- More [examples in the same file](https://github.com/alephium/alephium/blob/master/flow/src/test/scala/org/alephium/flow/core/VMSpec.scala) as above
- An [integration test](https://github.com/alephium/alephium/blob/master/app/src/it/scala/org/alephium/app/SmartContractTest.scala) for the Uniswap-like exchange based on Rest API

## Built-ins

1. [Stateless functions](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/vm/lang/BuiltIn.scala#L195-L218)
2. [Statefull functions](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/vm/lang/BuiltIn.scala#L383-L411)
