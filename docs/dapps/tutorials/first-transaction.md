---
sidebar_position: 10
title: First Transaction
sidebar_label: First transaction
---

In this guide, you will learn how to transfer `ALPH` or another tokens
and check the status of the transaction.

Prerequisites:

- Write code in [Typescript](https://www.typescriptlang.org/)
- [Web3 SDK](/dapps/sdk/getting-started) installed

## Transfer ALPH

Here is an example of transferring `ALPH` from one address to another
using [Web3 SDK](/dapps/sdk/getting-started), wait for the transaction
to be confirmed and then verify the balance of the recipient:

```typescript
import { ONE_ALPH } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'
import { waitTxConfirmed } from '@alephium/cli'

const nodeProvider = web3.getCurrentNodeProvider()
const [sender, receiver] = await getSigners(2)
const { balance: receiverBalanceBefore } = await nodeProvider.addresses.getAddressesAddressBalance(receiver.address)

// Transfer ALPH from sender to receiver
const transferResult = await sender.signAndSubmitTransferTx({
  signerAddress: sender.address,
  destinations: [ { address: receiver.address, attoAlphAmount: 10n * ONE_ALPH } ]
})

waitTxConfirmed(nodeProvider, transferResult.txId, 1, 1000)
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

