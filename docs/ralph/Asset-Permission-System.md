---
sidebar_position: 60
title: Asset permission system (APS)
---

:::caution
This page is WIP until our dApps stack is more stable 🚧
:::

The Asset Permission System (APS) is one of Ralph's defining features. It gives
developers a safety net and the ability to build with confidence on Alephium.

It may not be obvious at first how to use the APS. Sure it may seem simple to
call `approveAlph!(fromAddress, amount)`, but when you mix it with `alphRemaining!()`
and `transfer` functions it can then become confusing, even overwhelming. What
are those built-in functions actually doing? Well it all has to do with
understanding the flow of funds and what happens between function calls.

A very important point to internalize is that the "flow of funds" always starts
from a `TxScript`.

Using the `TxScript` the funds can flow into a contract, or to another user's
address.

:::note
That's right! Unlike in Ethereum, you _don't_ send funds directly to contract
addresses!
:::

A way to think the system are the two states of "staged" and "commited" funds.
Funds are staged when approved, and they are commited when a contract method
is called.

Now let's look at some code to see the details and the full picture.

:::note
Funds can be from many sources, not just one! Just like how you can stage many
files for a commit in version control, you can stage many address balances in
Ralph.
:::

:::note
There are also some built-ins which also commit funds and use them immediately.

These built-ins are:

- `createContract!`

:::

## A concrete demonstration

Since code partially dictates the flow of funds, the explanation is tightly
coupled to it. The best way to explain then is to use code and comments.

```javascript
// User sends 10 ALPH along with this TxScript
TxScript MyScriptWithAName() {
  let myAddress = callerAddress!()

  // Stage 5 ALPH into the `approvedAssets` property.
  approveAlph!(myAddress, 5)
  let contract = SomeContractIWrote(<contract-id-goes-here>)

  //
  // Remember, every function has a frame of state.
  // This function call will commit 5 ALPH into `doStuff`'s `remainingAssets` property.
  // Consequently this means the `approvedAssets` property (staging) is now empty!
  //
  contract.doStuff()

  //
  // There is still `5 ALPH` in the `remainingAssets` property in this frame to use for anything else.
  // If it's not used, it's returned to the user.
  // You could use the remainingAlph!(address) built-in to check the remaining funds in `remainingAssets`.
  // There is no way to check how many funds are staged in `approvedAssets`.
  //
}

TxContract SomeContractIWrote() {
  //
  // If preapprovedAssets equaled false then the function would completely ignore the approved Alph!
  // This means the `remainingAssets` property would be initialized as empty in this function's frame.
  //
  // Here though it's the opposite and *we will* set `remainingAssets` *of this frame*
  // to what was approved before calling. `approvedAssets` will be initialized as
  // empty, ready to stage more funds to be commited!
  //
  // So if it isn't clear, each method you call that expects funds *must* again
  // stage them.
  //
  @using(preapprovedAssets = true)
  pub doStuff() -> () {
    // 5 ALPH will be taken from `remainingAssets` and put into the contract's
    // funds (meaning `remainingAssets` is now empty).
    transferAlphToSelf!(callerAddress!(), 5)
  }

  //
  // If assetsInContract is true then the function has immediate access to the
  // contract's funds, or in other words, `remainingAssets` becomes equal to
  // what the contract holds already.
  //
  @using(assetsInContract = true)
  pub useTheAlph(to: Address) -> () {
    //
    // 5 ALPH will be taken from `remainingAssets`.
    //
    // If assetsInContract equaled false, then this would throw an error!
    //
    transferAlphFromSelf!(to, 5)

    // And the rest is sent back to the contract.
  }
}
```
