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

Here is an example of how to transfer `ALPH` from one address to
another using [Typescript SDK](/sdk/getting-started). You can execute the
code by:

```shell
git clone git@github.com:alephium/ralph-example.git
cd ralph-example/your-firsts
npm install
npx ts-node src/transfer-alph.ts
```

The code transfers `10` ALPH
from the sender to the recipient and print out the balance of the
recipient before and after the transfer:

```typescript
import { ONE_ALPH, waitForTxConfirmation } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'

async function transferAlph() {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  const nodeProvider = web3.getCurrentNodeProvider()

  const [sender, receiver] = await getSigners(2)
  const { balance: receiverBalanceBefore } = await nodeProvider.addresses.getAddressesAddressBalance(receiver.address)

  // Transfer ALPH from sender to receiver
  await sender.signAndSubmitTransferTx({
    signerAddress: sender.address,
    destinations: [{ address: receiver.address, attoAlphAmount: 10n * ONE_ALPH }]
  })

  const { balance: receiverBalanceAfter } = await nodeProvider.addresses.getAddressesAddressBalance(receiver.address)

  console.log(`receiver balance before: ${receiverBalanceBefore}, after: ${receiverBalanceAfter}`)
}

transferAlph()
```

## Transfer Tokens

Here is an example of how to transfer a token from one address to
another using [Typescript SDK](/sdk/getting-started). You can execute the
code by:

```shell
git clone git@github.com:alephium/ralph-example.git
cd ralph-example/your-firsts
npm install
npx ts-node src/transfer-token.ts
```

Transferring tokens is as straightforward as transferring `ALPH`: in
the `signAndSubmitTransferTx` function, we can also specify the token
to be transferred and its amount:

```typescript
// Transfer token from sender to receiver
await sender.signAndSubmitTransferTx({
  signerAddress: sender.address,
  destinations: [
    { address: receiver.address, attoAlphAmount: DUST_AMOUNT, tokens: [{ id: tokenId, amount: 10n }] }
  ]
})
```

In fact, we have the flexibility to send multiple tokens to multiple
recipients within the same transaction!
