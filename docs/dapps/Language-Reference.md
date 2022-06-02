---
sidebar_position: 14
title: Ralph language reference
---

A reference for the Ralph smart contract language.

:::note
The following documentation is derived from the alephium/alephium source code.
:::

:::caution
**It could become out of date at any time**, so double-check with other developers
if you think something has changed, and if it has, [fork this wiki](https://github.com/alephium/wiki.git)
and [open a PR](https://github.com/alephium/wiki/compare)!
:::

## Notation used in this document

`<thing>` just means you replace it with the appropriately described text. For
example, `<number>` means type a literal number value: 6, 7, 44, etc.

`[thing]` means the text is optional unless otherwise specified (like array syntax).

## Primitive types

Ralph has a nice small core of primitives.

| Type                 | Constructor                                                     |
| --------------------:| --------------------------------------------------------------- |
| **()**               | None (a return statement with nothing)                          |
| **Bool**             | <code>false, true, <, >, >=, <=, ==, !=, &&, &#124;&#124;, !</code> |
| **I256**             | <code>-&lt;number&gt;, &lt;number&gt;i, +, -, *, /, %, ⊕, ⊖, ⊗, &lt;&lt;, &gt;&gt;, &, ^, &#124;</code> |
| **U256**             | <code>&nbsp;&lt;number&gt;, &lt;number&gt;u, +, -, *, /, %, ⊕, ⊖, ⊗, &lt;&lt;, &gt;&gt;, &, ^, &#124;</code> |
| **Address**          | `@<address>`                                                    |
| **ByteVec**          | `#<hex-string>, ++`                                             |
| **[type; size]**     | `[<value...>]`, type example: `[Address; 6]`                    |

You'll notice there is no `String` type. Instead the `ByteVec` type can be used
to hold onto textual data, or a `[U256; N]` array if you need to modify it.

## Everything else

Ralph as you'll soon learn is a simple language. So simple that it can be summed
up in this table below, which presents various mechanisms which are normally
available in programming languages.

:::note
**Ralph does not use semi-colons!** It can be easy to accidentally add them due
to muscle memory.
:::

| Token           | Constructor                                                                        |
| ---------------:| ---------------------------------------------------------------------------------- |
| **Comment**     | `//`                                                                               |
| **Assignment**  | `let [mut] <name> = ...`                                                           |
| **Assignment**  | `<arg> = <value>` or `<arg1>, <argN> = funcMultipleRetVals()`                      |
| **Function**    | `[pub] [payable] fn <name>(arg: <type>) -> <type> { return <thingN, ...> }`        |
| **Conditional** | `if <boolean expression> { <statements> } else { <statements> }`                   |
| **Iteration**   | <code>loop (startAt: U256, endAt: U256, step: U256 &#124; I256, assignment)</code> |
| **Iteration**   | `while <boolean expression> { <statements> }`                                      |
| **Event**       | `event <TupleName>(field1: <type>, field2: <type>, fieldN: <type>, ...)`           |
| **Event**       | `emit <TupleName>(<value1>, <value2>, <valueN>, ...)`                              |
| **Structure**   | `interface <InterfaceName> { ... }`                                                |
| **Structure**   | `TxContract ContractName([mut] fieldN: <type>) [extends <InterfaceName>] { ... }`  |
| **Structure**   | `TxScript <ScriptName>([mut] fieldN: <type>) { ... }`                              |

### Array iteration (index variable)

Iteration in smart contracts is kind of a dangerous operation. It's easy to eat
gas, or use a lot of space. Ralph does its best to make this a safe operation.

Ralph **does not** let you dynamically access arrays. For example, `a[b]` will
result in a syntax error (but `a[0]` is valid). This is because arrays in Ralph
aren't actually arrays but a list of constants that are built-up and
manipulated. To account for this, the `loop` function is provided.

`loop`'s current index can be accessed using the `?` token, which is the main
way to iterate through an array.

For example: `loop(1, 6, 1, array[?] = 0)` which zeros out array elements.

`?` can be used anywhere in the statement. **This placeholder value is passed
down as far as necessary**. Imagine it's a kind of global variable, but scoped
to everything within a `loop` call.

:::note
`loop` in reality is an unrolled loop, and is why its usage should be restricted
to only assignments like in the example (but it can take anything that's a
statement). Anything else will be prohibitively expensive. The reason for this
is because arrays are compiled to constants and so the indices must be "fixed".
:::

:::caution
Because loop unrolling is space consuming, there is an upper limit which must be
considered when using it.
:::

### Interfaces, TxContracts, and TxScripts

Below is a "code template" of the general structure of what smart contracts will
look like. They take on a class-like appearance, similar to JavaScript, C#, and
other OOP languages.

```
// To create an interface:
interface InterfaceName {
  event TupleName(field1: U256, field2: U256)
  pub fn foo() -> ()
}

// To create a contract:
TxContract ContractName([mut] arg1: <type>, [mut] arg2: <type>, ...etc) extends InterfaceName {
  [pub] [payable] fn functionName(arg1: <type>, ...etc) -> (<return type>) {
    return <thing>
  }

  fn foo() {
    emit TupleName(1, 2)
  }
}

// To invoke the contract:
TxScript ScriptNameCanBeAnything {
  // Note this signature. It must be just like this.
  [pub] [payable] fn main() -> () {
    contract = ContractName(#<contract-id>)
    result = contract.functionName(arg)
    anotherFunc()
  }
  
  fn anotherFunc() -> () {
    ...
  }
}
```

`payable` means the function can use [stateful functions](#stateful-functions)
that modify the contract / script state.

`pub` means the function can be called outside the contract / script.

:::note
You can call contract methods right after the contract constructor, i.e.
`ContractName(...).function()`.
:::
 
## Built-in functions

There are two types of functions: stateless and stateful.

The former are just pure functions: they take inputs and give the same outputs
every time.

The latter will access contract state, which can cause the output to be
different each time, or it will modify the contract state.

When you see `!` it means the function is built-in to Ralph.

## Stateless functions


### Assertions

* `assert!(input: Bool) -> ()`
  * Will halt execution if false
* `isAssetAddress!(input: Address) -> (Bool)`
* `isContractAddress!(input: Address) -> (Bool)`

### Hashing

* `blake2b!(input: ByteVec) -> (ByteVec)`
* `keccak256!(input: ByteVec) -> (ByteVec)`
* `sha256!(input: ByteVec) -> (ByteVec)`
* `sha3!(input: ByteVec) -> (ByteVec)`

### Verification

* `verifyTxSignature!(signature: ByteVec) -> ()`
* `verifySecP256K1!(input: ByteVec, publicKey: ByteVec, signature: ByteVec) -> ()`
* `verifyED25519!(input: ByteVec, publicKey: ByteVec, signature: ByteVec) -> ()`
* `verifyAbsoluteLocktime!(unixTimestampMillis: U256) -> ()`
* `verifyRelativeLocktime!(txHash: U256, timestampMillisRelative: U256) -> ()`
* `ethEcRecover!(messageHash: ByteVec, sigBytes: ByteVec) -> (ByteVec)`

### Network
* `networkId!() -> (ByteVec)`
* `blockTimeStamp!() -> (U256)`
* `blockTarget!() -> (U256)`

### Transactions
* `txId!() -> (ByteVec)`
* `txCaller!(txHash: U256) -> (Address)`
* `txCallerSize!(txHash: U256) -> (U256)`

### Integer conversion
* `toI256!(input: U256) -> (I256)`
* `toU256!(input: I256) -> (U256)`
 
### ByteVec functions
* `byteVecSlice!(input: ByteVec, start: U256, end: U256) -> (ByteVec)`
* `size!(input: ByteVec) -> (U256)`
* `zeros!(amountOfZeros: U256) -> (ByteVec)`
* `byteVecToAddress!(input: ByteVec) -> Address`
* `encodeToByteVec!(fields...) -> (ByteVec)`
* `toByteVec!(input: (Bool|I256|U256|Address)) -> (ByteVec)`
* `u256To1Byte!(a: U256) -> (ByteVec)`
* `u256To2Byte!(a: U256) -> (ByteVec)`
* `u256To4Byte!(a: U256) -> (ByteVec)`
* `u256To8Byte!(a: U256) -> (ByteVec)`
* `u256To16Byte!(a: U256) -> (ByteVec)`
* `u256To32Byte!(a: U256) -> (ByteVec)`
* `u256From1Byte!(a: U256) -> (ByteVec)`
* `u256From2Byte!(a: U256) -> (ByteVec)`
* `u256From4Byte!(a: U256) -> (ByteVec)`
* `u256From8Byte!(a: U256) -> (ByteVec)`
* `u256From16Byte!(a: U256) -> (ByteVec)`
* `u256From32Byte!(a: U256) -> (ByteVec)`

## Stateful functions

### Assertions
* `isPaying!(address: Address) -> (Bool)`
* `isCalledFromTxScript!() -> (Bool)`

### Asset transfer approval
* `approveAlph!(forAddress: Address, amount: U256)) -> ()`
* `approveToken!(forAddress: Address, tokenId: ByteVec, amount:U256)) -> ()`

### Account balance
* `alphRemaining!(address: Address) -> (U256)`
* `tokenRemaining!(address: Address, tokenId: ByteVec) -> (U256)`

### Transfers
* `transferAlph!(from: Address, to: Address, amount: U256) -> ()`
* `transferAlphFromSelf!(toBeneficiary: Address, amount: U256) -> ()`
* `transferAlphToSelf!(fromBeneficiary: Address, amount: U256) -> ()`
  * This pair of `transferAlph` functions are useful to avoid accidentally sending or receiving money to another address.
* `transferToken!(from: Address, to: Address, tokenId: ByteVec, amount: U256) -> ()`
* `transferTokenFromSelf!(toBeneficiary: Address, tokenId: ByteVec, amount: U256) -> ()`
* `transferTokenToSelf!(fromBeneficiary: Address, tokenId: ByteVec, amount: U256) -> ()`
  * Same usage as the other pair of `transferAlph` functions.

### Contracts
* `createContract!(codeCompiled: ByteVec, state: ByteVec) -> ()`
* `createContractWithToken!(codeCompiled: ByteVec, state: ByteVec, tokenAmount: U256) -> ()`
  * `state` is the state as its passed to the build-contract endpoint.
* `copyCreateContract!(contractId: ByteVec, state: ByteVec) -> ()`
* `copyCreateContractWithToken!(contractId: ByteVec, state: ByteVec, tokenAmount: U256) -> ()`
* `destroySelf!(address: Address) -> ()`
* `migrate!(codeCompiled: ByteVec)`
  * Updates the contract in-place
* `migrateWithState!(codeCompiled: ByteVec, state: ByteVec)`

### Internal
* `selfAddress!() -> (Address)`
* `selfContractId!() -> (ByteVec)`
* `selfTokenId!() -> (ByteVec)`

### Caller
* `callerContractId!() -> (ByteVec)`
* `callerAddress!() -> (Address)`
* `callerInitialStateHash!() -> (ByteVec)`
* `callerCodeHash!() -> (ByteVec)`

### Hashes
* `contractInitialStateHash!(contractId: ByteVec) -> (ByteVec)`
* `contractCodeHash!() -> (contractId: ByteVec) -> (ByteVec)`

