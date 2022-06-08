The Asset Permission System (APS) is one of Ralph's defining features. It gives
developers a safety net and the ability to build with confidence on Alephium.

It may not be obvious at first how to use the APS. Sure it may seem simple to
call `approveAlph!(fromAddress, amount)`, but when you mix it with `alphRemaining!()`
and `transfer` functions it can then become confusing, even overwhelming. What
are those built-in functions actually doing? Well it all has to do with
understanding the flow of funds and what happens between function calls.

## The tale of two properties

The "flow of funds" always starts from a `TxScript`. A user will send funds
along with the TxScript in a transaction typically.

At this point the funds can flow into a contract, or to another user's address.

:::note
That's right! Unlike in Ethereum, you *don't* send funds directly to contract
addresses!
:::

When a contract method is called, it creates a "frame". A frame is state that belongs
to a method during runtime. The state we care about for understanding the APS are the
internal `approvedAssets` and `remainingAssets` properties.

A way to think about these are "staged" and "commited" funds, respectively. This
also means funds can be from many sources, not just one! Just like how you
can stage many files for a commit in version control, you can stage many address
balances in Ralph.

The initial state of `approvedAssets` is an empty set (no funds) of addresses.
The initial state of `remainingAssets` though **is what was sent with the
transaction containing this TxScript**!

From here on it's just about staging and commiting funds between the two
properties using `approve*` functions and function calls. `transfer*` functions
are used to actually transact the funds from `remainingAssets` to or
from an address.

:::note
There are also some built-ins which also commit funds and use them immediately.

These built-ins are:

* `createContract!`
:::


## A concrete demonstration

Let's use some code now since the problem is tightly related to it!

```rust
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
    // 5 ALPH will be taken from `remainingAssets`, meaning now it's empty 🙂
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
