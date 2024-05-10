---
sidebar_position: 10
title: Getting Started
sidebar_label: Getting started
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Introduction

Ralph is the smart contract programming language for the Alephium blockchain, which focuses on three goals: security, simplicity and efficiency. This tutorial provides tips for writing clean, idiomatic, and secure Ralph smart contracts. We follow the following principles when designing Ralph:
1. Make the smart contract DSL as simple as possible.
2. There should be one-- and preferably only one --obvious way to do it.
3. Make good practices built-in.

## Types

Ralph is a statically typed language, but you don't need to specify the type for local variables and constants thanks to type inference.
All types of Ralph are value types, i.e. they are always copied when they are used as function arguments or assigned.
Currently, Ralph only supports the following data types:

### Primitive Types

#### U256

```rust
// The type of `a` ... `d` is U256.
let a = 10
let b = 10u
let c = 1_000_000_000
let d = 1e18
```

#### I256

```rust
// The type of `a` ... `d` is I256.
let a = -10
let b = 10i
let c = -1_000_000_000
let d = -1e18
```

#### Bool

```rust
// The type of `a` and `b` is Bool.
let a = false
let b = true
```

#### ByteVec

```rust
// ByteVec literals must start with `#` followed by a hex string.
let a = #00112233
// ByteVec concatenation
let b = #0011 ++ #2233 // `b` is #00112233
// Empty ByteVec
let c = #
```

#### Address

```rust
// Address literals must start with `@` followed by a valid base58 encoded Alephium address.
let a = @1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH
```

#### String

Ralph does not have a native type for strings, but you can define string literals which are encoded in `ByteVec`.

```rust
// String literals starts with `b`.
let a = b`Hello`
let b = b`World`
let c = a ++ b` ` ++ b
```

### Fixed Size Array

The syntax for fixed-size arrays is influenced by Rust.

```rust
// The type of `a0` is [U256; 4]
let a0 = [0, 1, 2, 3]

// The type of `a1` is [[U256, 2]; 2]
let a1 = [[0, 1], [2, 3]]

// The type of `a2` is [I256; 3]
let a2 = [0i; 3]

// The type of `a3` is [ByteVec; 4]
let a3 = [#00, #11, #22, #33]
```

### Struct

In Ralph, Structs can be globally defined and can contain fields that are either mutable or immutable. However, to assign a value to a field, all of the field selectors must be mutable.
E.g. in order to set `foo.x.y.z = 123`, all `foo`, `x`, `y`, and `z` must be mutable.

```rust
// Structs have to be defined globally
struct Foo { x: U256, mut y: U256 }
struct Bar { z: U256, mut foo: Foo }

Contract Baz() {
  ...

  // f.y = 3 won't work as f is immutable despite the field y being mutable
  let f = Foo { x: 1, y: 2 }

  // ff = f won't work as ff.x is immutable despite ff and ff.y being mutable
  let mut ff = Foo { x: 1, y: 2 }
  ff.y = 3 // This works as both ff and y are mutable

  // b.foo.y = 5 won't work as b is immutable
  let b = Bar { z: 4, foo: f }

  let mut bb = Bar { z: 5, foo: f }
  bb.foo.y = 6 // This works as bb, foo, and y are all mutable

  ...
}
```

In Ralph, structs are value types, not reference types. When assigned to a new struct variable, it copies all fields to the new struct variable:

```rust
struct Foo { x: U256, mut y: U256 }
Contract Bar() {
  pub fn bar() -> () {
    let foo0 = Foo { x: 0, y: 1 }
    let mut foo1 = foo0
    foo1.x = 1 // modifying foo1.x will not change foo0.x
    assert!(foo0.x == 0, 0)
    assert!(foo1.x == 1, 0)
  }
}
```

Ralph also supports struct destruction, and the syntax is similar to TypeScript:

```rust
struct Foo { x: U256, y: U256 }
Contract Bar() {
  pub fn bar() -> () {
    let foo = Foo { x: 0, y: 1 }
    let Foo { mut x, y } = foo
    x = 1

    // the variables `x` and `y` already exist, we create two new variables `x1` and `y1`
    let Foo { x: x1, y: y1 } = foo
  }
}
```

### Map (Rhone Upgrade Only)

The map data structure is currently available exclusively in the [devnet release](https://github.com/alephium/alephium-stack/tree/master/rhone-devnet) of full node.

In Ralph, Maps are defined as global contract attributes, eliminating the need for initialization. Under the hood, each Map entry is constructed as a subcontract of the current contract. Therefore, creating a map entry entails a minimal contract deposit, easily done using the built-in function `mapEntryDeposit!()`.

There are 3 essential built-in map methods `insert!, remove!, contains!`. Map values can be accessed and updated with the bracket syntax `map[key] = newValue`. Below are some examples illustrating their usage. For more comprehensive examples, refer to the [blind-auction](https://github.com/alephium/ralph-example/tree/master/blind-auction) repository and the [unit tests here](https://github.com/alephium/alephium-web3/blob/master/test/contract.test.ts#L448-L477).

```rust
Contract Counters() {
  // All maps must be defined here with `mapping[KeyType, ValueType]`, before events and constants
  mapping[Address, U256] counters

  @using(preapprovedAssets = true)
  pub fn create() -> () {
    let key = callerAddress!()
    let depositor = key
    // The depositor will deposit a minimal ALPH deposit for the new map entry which is a subcontract
    counters.insert!(depositor, key, 0)
  }

  pub fn count() -> () {
    let key = callerAddress!()
    let value = counters[key]
    // Update the map entry value
    counters[key] = value + 1
  }

  pub fn clear() -> U256 {
    let key = callerAddress!()
    let depositRecipient = key
    let value = counters[key]
    // Each map entry removal redeems the map entry deposit
    counters.remove!(depositRecipient, key)
    return value
  }

  pub fn contains() -> Bool {
    // Check the existence of map entry
    return counters.contains!(callerAddress!())
  }
}

TxScript CreateCounter(counters: Counters) {
  let from = callerAddress!()
  counters.insert{from -> ALPH: mapEntryDeposit!()}() // Approve minimal deposit for creating the map entry
}
```

## Operators

### Arithmetic operators

There are arithmetic operators such as `+`, `-`, `*`, `/`, `**`, and `%` available for `I256` and `U256` types, and these operators will check for overflow at runtime.

For example, the following expressions will cause the VM to throw an error at runtime:

```rust
u256Max!() + 1  // overflow
0 - 1           // overflow
i256Max!() + 1i // overflow
i256Min!() - 1i // overflow
```

#### Modulo 2^256 operators

For the `U256` type, there are arithmetic operators modulo `2^256`: `|+|, |-|, |*|, |**|`. Here are some examples:

```rust
assert!(u256Max!() |+| 1 == 0, 0) // addition modulo 2^256
assert!(0 |-| 1 == u256Max!(), 0) // subtraction modulo 2^256
assert!(u256Max!() |*| 2 == u256Max!() - 1, 0) // multiplication modulo 2^256
assert!((1 << 128) |**| 2 == 0, 0) // pow modulo 2^256
```

#### Modulo N operators

The VM also provides two advanced modulo functions for the `U256` type, `addModN` and `mulModN`:

```rust
assert!(mulModN!(2, 3, 4) == 2, 0) // (2 * 3) % 4
assert!(mulModN!(1 << 128, 1 << 128, u256Max!() - 1) == 2, 0)
assert!(mulModN!(u256Max!(), u256Max!(), u256Max!()) == 0, 0)

assert!(addModN!(2, 3, 4) == 1, 0) // (2 + 3) % 4
assert!(addModN!(1 << 128, 1 << 128, u256Max!()) == 1 << 129, 0)
assert!(addModN!(u256Max!(), u256Max!(), u256Max!()) == 0, 0)
```

### Bitwise operators

Ralph supports bit operators such as `&`, `|`, `^`, `<<`, and `>>` only for the `U256` type, here are some examples:

```rust
assert!(0xff & 0xf0 == 0xf0, 0)
assert!(0xff | 0xf0 == 0xff, 0)
assert!(0xff ^ 0xf0 == 0x0f, 0)
assert!(0xff << 8 == 0xff00, 0)
assert!(u256Max!() << 2 == u256Max!() - 3, 0)
assert!(0xff >> 4 == 0x0f, 0)
```

### Comparison operators

There are inequality operators such as `<`, `>`, `<=`, and `>=` available for `I256` and `U256` types, and equality operators `==`, `!=` for all primitive types.

Note that the comparison operators cannot be used with array types or struct types.

### Logical Operators

Similar to other programming languages, Ralph also supports logical operators such as `&&`, `||`, and `!`.

### ByteVec Operators

Ralph has a special operator `++` for concatenating `ByteVec`:

```rust
assert!(#00 ++ #11 == #0011, 0)
```

## Functions

Functions are the executable units of code, you can also define functions inside a contract.

### Function Signatures

```rust
// Public function, which can be called by anyone
pub fn foo() -> ()

// Private function, which can only be called inside the contract
fn foo() -> ()

// Function takes 1 parameter and has no return values
fn foo(a: U256) -> ()

// Function takes 2 parameters and returns 1 value
fn foo(a: U256, b: Boolean) -> U256

// Function takes 2 parameters and returns multiple values
fn foo(a: U256, b: Boolean) -> (U256, ByteVec, Address)
```

### Local Variables

A function cannot have duplicate variable definitions, and the variable name in the function cannot be the same as the contract field name.

```rust
fn foo() -> () {
  // `a` is immutable, and it cannot be reassigned
  let a = 10
  a = 9 // ERROR

  // `b` is mutable, and it can be reassigned
  let mut b = 10
  b = 9
}

fn bar() -> (U256, Boolean) {
  return 1, false
}

fn baz() -> () {
  // Both `a` and `b` are immutable
  let (a, b) = bar()
  // `c` is immutable, but `d` is mutable
  let (c, mut d) = bar()
  // Ignore the first return value of the function `bar`
  let (_, e) = bar()
}
```

#### Anonymous variables

You could use anonymous variables to use the unused variables with underscore.

```rust
let _ = foo()
let (_, x) = bar()
```

### Control Structures

#### Return statements

```rust
fn foo() -> (U256, Boolean, ByteVec) {
  return 1, false, #00
}
```

#### If-else statements/expressions

```rust
fn foo() -> ByteVec {
  // If else statement
  if (a == 0) {
    return #00
  } else if (a == 1) {
    return #01
  } else {
    return #02
  }
}

fn foo() -> ByteVec {
  return if (a == 0) #00 else if (a == 1) #01 else #02
}
```

#### For loop

```rust
// For loop
fn foo() -> () {
  for (let mut index = 0; index <= 4; index = index + 1) {
    bar(index)
  }
}
```

#### While loop

```rust
// While loop
fn foo() -> () {
  let mut index = 0
  while (index <= 4) {
    bar(index)
    index += 1
  }
}
```

:::note
`break` and `continue` statements are not supported in `for-loop` and `while-loop` because they may be bad practice in some cases. It's recommended to replace them with early `return` or [assert function](/ralph/built-in-functions#assert).
:::

:::note
In Ralph, each function has only one scope, so you can not define duplicated variables in the `while` or `for` block:

```rust
let value = 0
while (true) {
  let value = 0 // ERROR, duplicated variable definitions
  // ...
}
```
This is an on-purpose design since variable shadowing is generally not a good practice.
:::

### Error Handling

Ralph provides two builtin assertion functions for error handling: [assert!](/ralph/built-in-functions#assert) and [panic!](/ralph/built-in-functions#panic). Assertion failure will revert all changes made to the world state by the transaction and stop the execution of the transaction immediately.

```rust
enum ErrorCodes {
  InvalidContractState = 0
}

fn foo(cond: Boolean) -> () {
  // It will stop the transaction if `cond` is false.
  // The Alephium client will return the error code if the transaction fails.
  assert!(cond, ErrorCodes.InvalidContractState)
}

fn bar(cond: Boolean) -> U256 {
  if (!cond) {
    // The difference between `panic!` and `asset!` is that the return type of `panic!` is bottom type
    panic!(ErrorCodes.InvalidContractState)
  }
  return 0
}
```

### Function Calls

Functions of the current contract can be called directly ('internally') or recursively:

```rust
Contract Foo() {
  fn foo(v: U256) -> () {
    if (v == 0) {
      return
    }
    // Internal function call
    bar()
    // Recursive function call
    foo(v - 1)
  }

  fn bar() -> () {
    // ...
  }
}
```

Functions can also be called externally using the `bar.func()` notation, where `bar` is a contract instance and `func` is a function belonging to `bar`:

```rust
Contract Bar() {
  pub fn func() -> U256 {
    // ...
  }
}

Contract Foo() {
  pub fn foo() -> () {
    // Instantiate the contract from contract id
    let bar = Bar(#15be9537456726c336a3cd1aa36074759c457f151ac253a500085920afe3838a)
    // External call
    let a = bar.func()
    // ...
  }
}
```

### Builtin Functions

Ralph provides lots of builtin functions, you can refer to [here](/ralph/built-in-functions).

### Braces Syntax for Asset Approval

In function calls, you could specify the amount of assets to be used by a function using braces syntax.
Additional details about the Asset Permission System (APS) can be found [here](/ralph/asset-permission-system).

```rust
// Approve a certain amount of token1 for swapping
tokenPair.swap{caller -> token1Id: amount1In}(caller, to, amount0In, amount1In, amount0Out, amount1Out)

// Approve a certain amount of ALPH for buying an NFT
nftMarketplace.buyNFT{caller -> ALPH: totalPayment}(tokenId)

// Approve multiple assets from multiple users
otc.exchange{
  user0 -> ALPH: amount00, tokenId: amount01;
  user1 -> ALPH: amount10, tokenId: amount11
}(user0, amount00, amount01, user1, amount10, amount11)
```

### Annotations

The Ralph function also supports annotations, currently the only valid annotation is the `@using` annotation, and user-defined annotations will be supported in the future if necessary.

The `@using` annotation has four optional fields:

* `preapprovedAssets = true/false`: whether the function uses user-approved assets. The default value is `false` for contracts, `true` for scripts.
* `assetsInContract = true/false`: whether the function uses contract assets. The default value is `false`.
* `payToContractOnly = true/false`: whether the funciton only transfers assets to the contract. The default value is `false`.
* `checkExternalCaller = true/false`: whether the function checks the caller. The default value is `true`.
* `updateFields = true/false`: whether the function changes contract fields. The default value is `false`.

#### Using Approved Assets

In Ralph, if a function uses assets, then the caller needs to explicitly approve assets. And all functions in the call stack must be annotated with `@using(preapprovedAssets = true)`.

```rust
Contract Foo() {
  // Function `foo` uses approved assets, and it will transfer 1 ALPH and 1 token to the contract from the `caller`
  @using(preapprovedAssets = true)
  fn foo(caller: Address, tokenId: ByteVec) -> () {
    transferTokenToSelf!(caller, ALPH, 1)
    transferTokenToSelf!(caller, tokenId, 1)
  }

  @using(preapprovedAssets = true)
  fn bar(caller: Address, tokenId: ByteVec) -> () {
    // We need to explicitly approve assets when calling function `foo`
    foo{caller -> 1 alph, tokenId: 1}(caller, tokenId)
    // ...
  }
}
```

For the `preapprovedAssets` annotation, the compiler will do the following checks:

1. If a function is annotated `preapprovedAssets = true` but don't use the braces syntax, the compiler will report an error
2. If a function call uses the braces syntax but the function is not annotated `preapprovedAssets = true`, the compiler will report an error

#### Using Contract Assets

```rust
Contract Foo() {
  // Function `foo` uses the contract assets, and it will transfer 1 alph to the caller
  @using(assetsInContract = true)
  fn foo(caller: Address) -> () {
    transferAlphFromSelf!(caler, 1 alph)
  }

  // Function `bar` must NOT be annotated with `@using(assetsInContract = true)`
  // because the contract assets will be removed after use
  fn bar(caller: Address) -> () {
    // ...
    foo(caller)
  }
}
```

For the `assetsInContract` annotation, the compiler will do the following checks:

1. If a function is annotated `assetsInContract = true` but does not use contract assets, the compiler will report an error

You can find more information about asset permission at [here](/ralph/asset-permission-system).

### Pay To Contract Only

In the Rhone upgrade, we introduced the `@using(payToContractOnly = true/false)` annotation. You can set this annotation to `true` when the contract only accepts transfers. Functions annotated with `@using(payToContractOnly = true)` can be called multiple times within a single transaction.

```rust
Contract Foo() {
  @using(preapprovedAssets = true, payToContractOnly = true)
  pub fn payToContract(address: Address) -> () {
    transferTokenToSelf!(address, ALPH, 1 alph)
  }
}

TxScript Main(foo: Foo, address0: Address, address1: Address) {
  foo.payToContract{address0 -> ALPH: 1 alph}(address0)
  foo.payToContract{address1 -> ALPH: 1 alph}(address1)
}
```

Note that `payToContractOnly` and `assetsInContract` cannot both be set to true simultaneously. Otherwise, the compiler will report an error.

#### Update Fields

Functions that update fields will change the current contract fields. If a function changes the contract fields but without the `@using(updateFields = true)` annotation, the compiler will report a warning; if a function does not change the contract fields but annotated with `@using(updateFields = true)`, the compiler will report a warning as well.

```rust
Contract Foo(a: U256, mut b: Boolean) {
  // Function `f0` does not changes the contract fields
  fn f0() -> U256 {
    return a
  }

  // Function `f1` changes the contract fields
  @using(updateFields = true)
  fn f1() -> () {
    b = false
  }

  // Function f2 calls function f1, even if function f1 changes the contract fields,
  // function f2 still does not need to be annotated with `@using(updateFields = true)`,
  // because function f2 does not directly change the contract fields
  fn f2() -> () {
    f1()
  }
}
```

#### Check External Caller

In smart contracts, we often need to check whether the caller of the contract function is authorized. To avoid bugs caused by unauthorized callers, the compiler will report warnings for all public functions that do not check for external callers. The warning can be suppressed with annotation `@using(checkExternalCaller = false)`.

The compiler will skip the checking for simple view functions. A simple view function must satisfy all of the following conditions:

1. It cannot change the contract fields.
2. It cannot use any assets.
3. All sub-function calls must also be simple view functions.

To check the caller of a function, the built-in function [checkCaller!](/ralph/built-in-functions#checkcaller) has to be used.

```rust
Contract Foo(barId: ByteVec, mut b: Boolean) {
  enum ErrorCodes {
    InvalidCaller = 0
  }

  // We don't need to add the `@using(checkExternalCaller = true)` because
  // the `checkExternalCaller` is true by default for public functions.
  pub fn f0() -> () {
    // The `checkCaller!` built-in function is used to check if the caller is valid.
    checkCaller!(callerContractId!() == barId, ErrorCodes.InvalidCaller)
    b = !b
    // ...
  }

  // The compiler will report warnings for the function `f1`
  pub fn f1() -> () {
    b = !b
    // ...
  }

  // Function `f2` is a simple view function, we don't need to add the
  // `using(checkExternalCaller = false)` for simple view functions.
  pub fn f2() -> ByteVec {
    return barId
  }

  // The compiler will NOT report warnings because we checked the caller in function`f4`.
  pub fn f3() -> () {
    f4(callerContractId!())
    // ...
  }

  fn f4(callerContractId: ByteVec) -> () {
    checkCaller!(callerContractId == barId, ErrorCodes.InvalidCaller)
    // ...
  }
}
```

There is another scenario where the compiler will report warnings if a contract calls a function through an interface, this is because we do not know if the implementation of the function needs to check the external caller:

```rust
Interface Bar() {
  pub fn bar() -> ()
}

Contract Foo() {
  // The compiler will report warnings for the function `Foo.foo`
  pub fn foo(barId: ByteVec) -> () {
    Bar(barId).bar()
  }
}
```

## Contracts

:::info
Each Alephium's contract has 3 forms of unique identification:
1. **Address**: each contract has a unique address
2. **Contract ID**: each contract has a unique contract ID
3. **Token ID**: each contract can issue a token with the same ID as its own contract ID

In Ralph, the contract ID is used more frequently. Contract ids can be converted from/to other forms with Ralph's built-in functions or web3 SDK.
:::

Contracts in Ralph are similar to classes in object-oriented languages. Each contract can contain declarations of contract fields, events, constants, enums, and functions. All these declarations must be inside a contract. Furthermore, contracts can inherit from other contracts.

```rust
// This is a comment, and currently Ralph only supports line comments.
// Contract should be named in upper camel case.
// Contract fields are permanently stored in the contract storage.
Contract MyToken(supply: U256, name: ByteVec) {

  // Events should be named in upper camel case.
  // Events allow for logging of activities on the blockchain.
  // Applications can listen to these events through the REST API of an Alephium client.
  event Transfer(to: Address, amount: U256)

  // Constant variables should be named in upper camel case.
  const Version = 0

  // Enums can be used to create a finite set of constant values.
  enum ErrorCodes {
    // Enum constants should be named in upper camel case.
    InvalidCaller = 0
  }

  // Functions, parameters, and local variables should be named in lower camel case.
  pub fn transferTo(toAddress: Address) -> () {
    let payloadId = #00
    // ...
  }
}
```

### Fields

Contract fields are permanently stored in the contract storage, and the fields can be changed by the contract code. Applications can get the contract fields through the REST API of an Alephium client.

```rust
// Contract `Foo` has two fields:
// `a`: immutable, it can not be changed by the contract code
// `b`: mutable, it can be changed by the contract code
Contract Foo(a: U256, mut b: Boolean) {
  // ...
}

// Contract fields can also be other contract.
// It will store the contract id of `Bar` in the contract storage of `Foo`.
Contract Foo(bar: Bar) {
  // ...
}

Contract Bar() {
  // ...
}
```

### Contract Built-In Functions

Sometimes we need to create a contract within a contract, and in such cases, we need to encode the contract fields into `ByteVec`. Ralph provides a built-in function called `encodeFields` that can be used to encode the contract fields into `ByteVec`.

The parameter type of the `encodeFields` function is a list of the types of the contract fields, arranged in the order of their definitions. And the function returns two `ByteVec` values, where the first one is the encoded immutable fields, and the second one is the encoded mutable fields.

There is an example:

```rust
Contract Foo(a: U256, mut b: I256, c: ByteVec, mut d: Bool) {
  pub fn update(value: I256) -> () {
    b = value
  }
}

Contract Bar() {
  @using(preapprovedAssets = true)
  fn createFoo(caller: Address, fooBytecode: ByteVec, a: U256, b: I256, c: ByteVec, d: Bool) -> (ByteVec) {
    let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(a, b, c, d)
    return createContract!{caller -> 1 alph}(fooBytecode, encodedImmFields, encodedMutFields)
  }
}
```

In the Rhone upgrade, we support utilizing contract fields after deploying the contract in the same transaction. With the above example, you can call the `foo.update` after deploying the contract `Foo`:

```rust
@using(preapprovedAssets = true)
fn createFoo(caller: Address, fooBytecode: ByteVec, a: U256, b: I256, c: ByteVec, d: Bool) -> (ByteVec) {
  let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(a, b, c, d)
  let fooId = createContract!{caller -> 1 alph}(fooBytecode, encodedImmFields, encodedMutFields)
  Foo(fooId).update(-1)
}
```

Note that after deploying the contract, you cannot utilize contract assets in the same transaction.

### Events

Events are dispatched signals that contracts can fire. Applications can listen to these events through the REST API of an Alephium client.

```rust
Contract Token() {
  // The number of event fields cannot be greater than 8
  event Transfer(to: Address, amount: U256)

  @using(assetsInContract = true)
  pub fn transfer(to: Address) -> () {
    transferTokenFromSelf!(selfTokenId!(), to, 1)
    // Emit the event
    emit Transfer(to, 1)
  }
}
```

### SubContract

Alephium's virtual machine supports subcontract. Subcontracts can be used as map-like data structure but they are less prone to the state bloat issue. A subcontract can be created by a parent contract with a unique subcontract path.

```rust
Contract Bar(value: U256) {
  pub fn getValue() -> U256 {
    return value
  }
}

Contract Foo(barTemplateId: ByteVec) {
  event SubContractCreated(key: U256, contractId: ByteVec)

  @using(preapprovedAssets = true, checkExternalCaller = false)
  pub fn set(caller: Address, key: U256, value: U256) -> () {
    let path = toByteVec!(key)
    let (encodedImmFields, encodedMutFields) = Bar.encodeFields!(value) // Contract `Bar` has only one field
    // Create a sub contract from the given key and value.
    // The sub contract id is `blake2b(blake2b(selfContractId!() ++ path))`.
    // It will fail if the sub contract already exists.
    let contractId = copyCreateSubContract!{caller -> ALPH: 1 alph}(
      path,
      barTemplateId,
      encodedImmFields,
      encodedMutFields
    )
    emit SubContractCreated(key, contractId)
  }

  pub fn get(key: U256) -> U256 {
    let path = toByteVec!(key)
    // Get the sub contract id by the `subContractId!` built-in function
    let contractId =  subContractId!(path)
    return Bar(contractId).getValue()
  }
}
```

:::note
Deploying a contract requires depositing a certain amount of ALPH in the contract(currently 1 alph, it will be reduced to 0.1 alph after the Rhone upgrade is activated), so creating a large number of sub-contracts is not practical.
:::

### Contract Creation inside a Contract

Ralph supports creating contracts programmatically within contracts, Ralph provides some builtin functions to create contracts, you can find more information at [here](/ralph/built-in-functions#contract-functions).

If you want to create multiple instances of a contract, then you should use the `copyCreateContract!` builtin functions, which will reduce a lot of on-chain storage and transaction gas fee.

```rust
Contract Foo(a: ByteVec, b: Address, mut c: U256) {
  // ...
}

// We want to create multiple instances of contract `Foo`.
// First we need to deploy a template contract of `Foo`, which contract id is `fooTemplateId`.
// Then we can use `copyCreateContract!` to create multiple instances.
TxScript CreateFoo(fooTemplateId: ByteVec, a: ByteVec, b: Address, c: U256) {
  let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(a, b, c)
  copyCreateContract!(fooTemplateId, encodedImmFields, encodedMutFields)
}
```

### Migration

Alephium's contracts can be upgraded with two migration functions: [migrate!](/ralph/built-in-functions#migrate) and [migrateWithFields!](/ralph/built-in-functions#migratewithfields). Here are the three typical ways to use them:

```Rust
fn upgrade(newCode: ByteVec) -> () {
  checkOwner(...)
  migrate!(newCode)
}

fn upgrade(newCode: ByteVec, newImmFieldsEncoded: ByteVec, newMutFieldsEncoded: ByteVec) -> () {
  checkOwner(...)
  migrateWithFields!(newCode, newImmFieldsEncoded, newMutFieldsEncoded)
}

fn upgrade(newCode: ByteVec) -> () {
  checkOwner(...)
  let (newImmFieldsEncoded, newMutFieldsEncoded) = ContractName.encodeFields!(newFields...)
  migrateWithFields!(newCode, newImmFieldsEncoded, newMutFieldsEncoded)
}
```

## Inheritance

Ralph also supports multiple inheritance, when a contract inherits from other contracts, only a single contract is created on the blockchain, and the code from all the parent contracts is compiled into the created contract.

```rust
Abstract Contract Foo(a: U256) {
  pub fn foo() -> () {
    // ...
  }
}

Abstract Contract Bar(b: ByteVec) {
  pub fn bar() -> () {
    // ...
  }
}

// The field name of the child contract must be the same as the field name of parnet contracts.
Contract Baz(a: U256, b: ByteVec) extends Foo(a), Bar(b) {
  pub fn baz() -> () {
    foo()
    bar()
  }
}
```

:::note
In Ralph, abstract contracts are not instantiable, which means the following code is invalid:

```rust
let bazId = // The contract id of `Baz`
Foo(bazId).foo() // ERROR
```
:::

## Interface

Interfaces are similar to abstract contracts with the following restrictions:

* They cannot have any functions implemented.
* They cannot inherit from other contracts, but they can inherit from other interfaces.
* They cannot declare contract fields.

```rust
Interface Foo {
  event E(a: U256)

  @using(assetsInContract = true)
  pub fn foo() -> ()
}

Interface Bar extends Foo {
  pub fn bar() -> U256
}

Contract Baz() implements Bar {
  // The function signature must be the same as the function signature declared in the interface.
  @using(assetsInContract = true)
  pub fn foo() -> () {
    // Inherit the event from `Foo`
    emit E(0)
    // ...
  }

  pub fn bar() -> U256 {
    // ...
  }
}
```

And you can instantiate a contract with interface:

```rust
let bazId = // The contract id of `Baz`
Foo(bazId).foo()
let _ = Bar(bazId).bar()
```

In the Rhone upgrade, we introduced the `@using(methodSelector = true/false)` annotation to support multiple interfaces inheritance. You can set the `methodSelector` to `true` if your contract needs to inherit from multiple interfaces:

```rust
@using(methodSelector = true)
Interface Foo {
  pub fn foo() -> ()
}

@using(methodSelector = true)
Interface Bar {
  pub fn bar() -> ()
}

Contract Baz() implements Foo, Bar {
  pub fn foo() -> () {}
  pub fn bar() -> () {}
}
```

## TxScript

A transaction script is a piece of code to interact with contracts on the blockchain. Transaction scripts can use the input assets of transactions in general. A script is disposable and will only be executed once along with the holder transaction.

```rust
Contract Foo() {
  pub fn foo(v: U256) -> () {
    // ...
  }
}

// The `preapprovedAssets` is true by default for `TxScript`.
// We set the `preapprovedAssets` to false because the script does not need assets.
@using(preapprovedAssets = false)
// `TxScript` fields are more like function parameters, and these
// fields need to be specified every time the script is executed.
TxScript Main(fooId: ByteVec) {
  // The body of `TxScript` consists of statements
  bar()
  Foo(fooId).foo(0)

  // You can also define functions in `TxScript`
  fn bar() -> () {
    // ...
  }
}
```

## Gasless Transaction

In the Rhone upgrade, we introduced support for gasless transactions. We can use the built-in `payGasFee` to pay transaction gas fees on behalf of the user, for example:

```rust
Contract Foo() {
  pub fn foo() -> () {
    payGasFee!(selfAddress!(), txGasFee!())
  }
}
```

The built-in `payGasFee` has two parameters:

1. The first parameter is the payer address, in the example above, the contract paid the gas fee. But the payer address can also be the user addresse.
2. The second parameter is the amount of gas to be paid, in the above example, the contract paid all the gas fees. You can choose to pay part of the gas fees.

Note that gasless transactions do not mean that transactions do not require gas fees, but that others pay the gas fees on your behalf. You still need to have ALPH to send transactions.
