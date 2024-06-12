---
sidebar_position: 10
title: First Transaction
sidebar_label: First transaction
---

In this guide, you will learn how to transfer `ALPH` or other tokens
and check the status of the transaction.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- [Typescript SDK](/sdk/getting-started) installed

## Transfer ALPH

Below is an example of how to transfer `ALPH` from one address to another
using [Typescript SDK](/sdk/getting-started). The code waits for the transaction
to be confirmed and then verify the balance of the recipient:

```typescript
import { ONE_ALPH, waitForTxConfirmation } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'

web3.setCurrentNodeProvider('localhost:22973') // local devnet
const nodeProvider = web3.getCurrentNodeProvider()

const [sender, receiver] = await getSigners(2)
const { balance: receiverBalanceBefore } = await nodeProvider.addresses.getAddressesAddressBalance(receiver.address)

// Transfer ALPH from sender to receiver
const transferResult = await sender.signAndSubmitTransferTx({
  signerAddress: sender.address,
  destinations: [ { address: receiver.address, attoAlphAmount: 10n * ONE_ALPH } ]
})

waitForTxConfirmation(nodeProvider, transferResult.txId, 1, 1000)
const { balance: receiverBalanceAfter } = await nodeProvider.addresses.getAddressesAddressBalance(receiver.address)

expect(BigInt(receiverBalanceAfter)).toEqual(BigInt(receiverBalanceBefore) + 10n * ONE_ALPH)
```

## Transfer Tokens

Transferring tokens is as straightforward as transferring `ALPH`: in
the `signAndSubmitTransferTx` function, we can also specify the tokens
to be transferred:

```typescript
// Transfer ALPH from sender to receiver
const transferResult = await sender.signAndSubmitTransferTx({
  signerAddress: sender.address,
  destinations: [
    { address: receiver.address, attoAlphAmount: 10n * ONE_ALPH, tokens: [{id: tokenId, amount: 10n}] }
  ]
})
```

In fact, you have the flexibility to send multiple tokens to multiple
recipients within the same transaction!
