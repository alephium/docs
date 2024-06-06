---
sidebar_position: 50
title: Testing and Debugging
sidebar_label: Testing and debugging
---

Testing is essential to ensure the functionality, quality and security
of any software products. This is especially true when it comes to
smart contracts development because once deployed, smart contracts are
much more difficult, if possible, to update compared to traditional
software, and bugs in them can potentially lead to significant
financial losses.

Testing is a very complex topic. Alephium's [Web3
SDK](/sdk/getting-started) makes the following opinionated design
decisions when it comes to its testing framework:

- Unit tests and integration tests are both important. Even though in
  general the distinction between them can be blurry, the line drawn
  by the test framework is whether the smart contracts under test are
  required to be deployed or not.
- Test code is also code, it should be clean and maintainable as
  well. [Web3 SDK](/sdk/getting-started) automatically generates
  testing boilerplates to make writing and maintaining test cases much
  easier.
- Tests are run against the Alephium full node in
  [devnet](/full-node/getting-started#devnet), which has the same codebase as
  Alephium `mainnet` with differences only in configurations.

Alephium also supports the ability to emit debug statements in the
smart contracts, which is very useful to diagnose issues during
development.

## Unit Test

A unit test tests a specific function of a contract, without requiring
the contract to be deployed. Let's start with a simple example:

```rust
Contract Math(mut counter: U256) {
    event Add(x: U256, y: U256)

    @using(updateFields = true, checkExternalCaller = false)
    pub fn add(x: U256, y: U256) -> U256 {
        emit Add(x, y)
        counter = counter + 1
        return x + y
    }
}
```

The `Math` contract has a `add` function that adds two numbers
together. Every time it's called, it also increments the `counter` and
emits an `Add` event. Here is how we can test it using [Web3
SDK](/sdk/getting-started):

```typescript
const result = await Math.tests.add({
  initialFields: { counter: 0n },
  testArgs: { x: 1n, y: 2n }
})

expect(result.returns).toEqual(3n)
expect(result.events[0].name).toEqual('Add')
expect(result.events[0].fields).toEqual({ x: 1n, y: 2n })
expect(result.contracts[0].fields.counter).toEqual(1n)
```

To test the `add` function in `Math` contract, we need to setup
`Math`'s initial state using `initialFields`, and provide the
test arguments for `add` using `testArgs`. After executing the test,
we can verify that `add` function returns the correct value, `counter`
field is updated properly, and `Add` event is emitted with the right
fields as well.

Now let's juice up `Math` a bit: everytime `add` function is called,
it will cost the caller 1 `ALPH`:

```rust
Contract Math(mut counter: U256) {
    event Add(x: U256, y: U256)

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn add(x: U256, y: U256) -> U256 {
        transferTokenToSelf!(callerAddress!(), ALPH, 1 alph)
        emit Add(x, y)
        counter = counter + 1
        return x + y
    }
}
```

To test the logic of asset transfer in `add` function, we use the
following test code:

```typescript
const result = await Math.tests.add({
  initialFields: { counter: 0n },
  testArgs: { x: 1n, y: 2n },
  initialAsset: { alphAmount: 2n * ONE_ALPH },
  inputAssets: [{ address: testAddress, asset: { alphAmount: 2n * ONE_ALPH } }]
})

expect(result.txOutputs[0].alphAmount).toEqual(3n * ONE_ALPH)
expect(result.txOutputs[1].alphAmount).toEqual(ONE_ALPH - 625000n * (10n ** 11n))
```
`initialAsset` sets up the initial asset for the `Math` contract, in this
case 2 `ALPH`. `inputAssets` sets up all the input assets for the
transaction, in this case 2 `ALPH` from `testAddress` which will also
be the `callerAddress` when calling `add` function because it's in the
first input of the `inputAssets`. After executing the test, we can
verify that the balance of the first output is increased to 3 `ALPH` since
the `Math` contract receives 1 `ALPH` for running the `add` function. The
balance of the second output becomes less because `testAddress` spends
1 `ALPH` as well as the gas fee.

Now that we tested the assets, how about when the `Math` contract
relies on another contract to do the job?

```rust
Contract Math(add: Add, mut counter: U256) {
    event Add(x: U256, y: U256)

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn add(x: U256, y: U256) -> U256 {
        emit Add(x, y)
        counter = counter + 1
        transferTokenToSelf!(callerAddress!(), ALPH, 1 alph)
        return add.exec(x, y)
    }
}

Contract Add() {
    @using(checkExternalCaller = false)
    pub fn exec(x: U256, y: U256) -> U256 {
        return x + y
    }
}
```
In this case `Math` contract relies on the `Add` contract to perform
the add operation. Here is how we test the `add` function:

```typescript
const addState = Add.stateForTest({})
const result = await Math.tests.add({
  initialFields: { add: addState.contractId, counter: 0n },
  testArgs: { x: 1n, y: 2n },
  initialAsset: { alphAmount: 2n * ONE_ALPH },
  inputAssets: [{ address: testAddress, asset: { alphAmount: 2n * ONE_ALPH } }],
  existingContracts: [addState]
})

expect(result.returns).toEqual(3n)
// rest of the assertions ..
```
`Add.stateForTest({})` creates a state of the `Add` contract that we
can pass on to the `existingContracts` parameter. We also need to pass
`addState.contractId` as an initial field to the `Math` contract. After
executing the test, we can verify the result with the same assertions
as before.

## Integration Test

An integration test tests a feature of a set of deployed
contracts. Let's use the last example from the [Unit Test](#unit-test)
section:

```rust
Contract Math(add: Add, mut counter: U256) {
    event Add(x: U256, y: U256)

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn add(x: U256, y: U256) -> U256 {
        emit Add(x, y)
        counter = counter + 1
        transferTokenToSelf!(callerAddress!(), ALPH, 1 alph)
        return add.exec(x, y)
    }
}

Contract Add() {
    @using(checkExternalCaller = false)
    pub fn exec(x: U256, y: U256) -> U256 {
        return x + y
    }
}
```
Since `add` function in `Math` contract not only updates the contract
state but also transfer assets, we need to call it through
[TxScript](/dapps/concepts/programming-model#txscript):

```rust
TxScript AddScript(math: Math, x: U256, y: U256) {
    let _ = math.add{ callerAddress!() -> ALPH: 1 alph }(x, y)
}
```
In the integration test, we deploy both `Add` and `Math` contracts and
then execute the `AddScript` script:

```typescript
const signer = await getSigner()
const { contractInstance: addContract } = await Add.deploy(signer, { initialFields: {} })
const { contractInstance: mathContract } = await Math.deploy(signer, {
  initialFields: { add: addContract.contractId, counter: 0n },
  initialAttoAlphAmount: 2n * ONE_ALPH
})

await AddScript.execute(signer, {
  initialFields: { math: mathContract.address, x: 1n, y: 2n },
  attoAlphAmount: 2n * ONE_ALPH,
})

// `counter` field in `Math` is updated
const mathContractState = await mathContract.fetchState()
expect(mathContractState.fields.counter).toEqual(1n)

// contract balance in `Math` is updated
expect(BigInt(mathContractState.asset.alphAmount)).toEqual(3n * ONE_ALPH)

// `Add` event in `Math` is emitted
const { events } = await signer.nodeProvider.events.getEventsContractContractaddress(mathContract.address, { start: 0 })
expect(events[0].eventIndex).toEqual(0)
expect(events[0].fields).toEqual([{ type: 'U256', value: '1' }, { type: 'U256', value: '2' }])
```

After `AddScript` is executed, we can verify the state, balance and
events of the `Math` contract. Please refer to [Interact with
contracts](/sdk/interact-with-contracts) for more details.

## Debugging

Debug statement in Alephium supports string interpolation. Printing
debug messages has the same syntax as emitting [contract
events](/sdk/events#contract-events). For example:

```rust
Contract Math(mut counter: U256) {
    @using(checkExternalCaller = false)
    pub fn add(x: U256, y: U256) -> U256 {
        emit Debug(`${x} + ${y} = ${x + y}`)
        return x + y
    }
}
```
In the example above, the `add` function in `Math` contract is a pure
function that doesn't update the state of the blockchain. When we test
the `add` function using both unit and integration test, debug message
will be printed out in both the terminal console and the full node log:

```bash
# Your contract address should be different
> Contract @ vrcKqNuMrGpA32eUgUvAB3HBfkN4eycM5uvXukwn5SxP - 1 + 2 = 3
```

If the `add` function does update the blockchain state, therefore
requires `TxScript` to execute, the debug message will only be
printed out in the full node log for integration test because the
execution doesn't happen right away so the result can not be returned
to the terminal console immediately. For unit tests, debug messages
will still be printed out in both the terminal console and the full
node log.

Under the hood, `Debug` is a special [system
events](/sdk/events#system-events) which is only available in
[devnet](/full-node/getting-started#devnet).
