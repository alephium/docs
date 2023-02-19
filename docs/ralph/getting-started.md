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
// The type fo `a` and `b` is Bool.
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

### Mapping

Ralph uses [subcontract](/ralph/getting-started#subcontract) instead of map-like data structure to provide map-like functionality and mitigate the state bloat issue.

### Struct

Currently, Ralph does not support user-defined data types, but it will be supported in the future.

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

### Control Structures

#### Return statements

```rust
fn foo() -> (U256, Boolean, ByteVec) {
  return 1, false, #00
}
```

#### If-else statements/expressions

```
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

```
// For loop
fn foo() -> () {
  for (let mut index = 0; index <= 4; index = index + 1) {
    bar(index)
  }
}
```

#### While loop

```
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
`break` and `continue` statements are not supported in `for-loop` and `while-loop` because they may be bad practice in some cases. It's recommended to replace them with early `return` or [assert](/ralph/built-in-functions#assert).
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

### Annotations

The Ralph function also supports annotations, currently the only valid annotation is the `@using` annotation, and user-defined annotations will be supported in the future if necessary.

The `@using` annotation has four optional fields:

* `preapprovedAssets = true/false`: whether the function uses user-approved assets. The default value is `false` for contracts, `true` for scripts.
* `assetsInContract = true/false`: whether the function uses contract assets. The default value is `false` for contracts
* `externalCallCheck = true/false`: whether the function checks the caller. The default value is `true` for contracts
* `readonly = true/false`: whether the function changes the world state. The default value is `false` for contracts

#### Using Approved Assets

In Ralph, if a function uses assets, then the caller needs to explicitly approve assets. And all functions in the call stack must be annotated with `@using(approvedAssets = true)`.

```rust
Contract Foo() {
  // Function `foo` uses approved assets, and it will transfer 1 ALPH and 1 token to the contract from the `caller`
  @using(approvedAssets = true)
  fn foo(caller: Address, tokenId: ByteVec) -> () {
    transferAlphToSelf!(caller, 1 alph)
    transferTokenToSelf!(caller, tokenId, 1)
  }

  @using(approvedAssets = true)
  fn bar(caller: Address, tokenId: ByteVec) -> () {
    // We need to explicitly approve assets when calling function `foo`
    foo{caller -> 1 alph, tokenId: 1}(caller, tokenId)
    // ...
  }
}
```

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

You can find more information about asset permission at [here](/ralph/asset-permission-system).

#### Readonly

Readonly functions will never change the world state of the blockchain. If a function is readonly but without the `@using(readonly = true)` annotation, the compiler will report a warning; if a function is non-readonly but annotated with `@using(readonly = true)`, the compiler will report an error.

```rust
Contract Foo(a: U256, mut b: Boolean) {
  event State(a: U256, b: Boolean)

  // Function `f0` is readonly
  @using(readonly = true)
  fn f0() -> U256 {
    return a
  }

  // Function `f1` is not readonly because it changes the contract state
  fn f1() -> () {
    b = false
  }

  // Function `f2` is not readonly because it changes the contract assets
  @using(approvedAssets = true)
  fn f2(caller: Address) -> () {
    transferAlphToSelf!(caller, 1 alph)
  }

  // Function `f3` is readonly because it changes nothing
  @using(approvedAssets = true, readonly = true)
  fn f3(caller: Address) -> () {
    assert!(alphRemaining!(caller) >= 1 alph, 0)
  }

  // Function `f4` is readonly because event emission will not change the world state
  fn f4() -> () {
    emit State(a, b)
  }
}
```

#### External Call Check

In smart contracts, we often need to check whether the caller of the contract function is authorized. To avoid bugs caused by unauthorized callers, the compiler will report warnings for public functions that do not check for external calls. The warning can be suppressed with annotation `@using(externalCallCheck = false)`.

To check the caller of a function, the built-in function [checkCaller!](/ralph/built-in-functions#checkcaller) has to be used.

```rust
Contract Foo(barId: ByteVec, mut b: Boolean) {
  enum ErrorCodes {
    InvalidCaller = 0
  }

  // We don't need to add the `@using(externalCallCheck = true)` because
  // the `externalCallCheck` is true by default for public functions.
  pub fn f0() -> () {
    // The `checkCaller!` built-in function is used to check if the caller is valid.
    checkCaller!(callerContractId!() == barId, ErrorCodes.InvalidCaller)
    b = !b
    // ...
  }

  // Function `f1` is readonly, so it does not need to check the caller.
  // We need to explicitly add the `@using(externalCallCheck = false)` annotation.
  @using(externalCallCheck = false, readonly = true)
  pub fn f1() -> () {
    // ...
  }

  // The compiler will report warnings if the `f2` is called by other contract.
  pub fn f2() -> () {
    b = !b
    // ...
  }

  // The compiler will NOT report warnings if the `f3` is caller by
  // other contract, because we checked the caller in function`f4`.
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
  @using(readonly = true, externalCallCheck = false)
  pub fn getValue() -> U256 {
    return value
  }
}

Contract Foo(barTemplateId: ByteVec) {
  emit SubContractCreated(key: U256, contractId: ByteVec)

  @using(preapprovedAssets = true, externalCallCheck = false)
  pub fn set(caller: Address, key: U256, value: U256) -> () {
    let path = u256To8Bytes!(key)
    let encodedFields = encodeToByteVec!(value)
    // Create a sub contract from the given key and value.
    // The sub contract id is `blake2b(blake2b(selfContractId!() ++ path))`.
    // It will fail if the sub contract already exists.
    let contractId = copyCreateSubContract!{caller -> 1 alph}(
      u256To8Bytes!(path),
      barTemplateId,
      encodedFields
    )
    emit SubContractCreated(key, contractId)
  }

  @using(readonly = true)
  pub fn get(key: U256) -> U256 {
    const path = u256To8Bytes(key)
    // Get the sub contract id by the `subContractId!` built-in function
    const contractId =  subContractId!(path)
    return Bar(contractId).getValue()
  }
}
```

### Contract Creation inside a Contract

Ralph supports creating contracts programmatically within contracts, Ralph provides some builtin functions to create contracts, you can find more information at [here](/ralph/built-in-functions#contract-functions).

If you want to create multiple instances of a contract, then you should use the `copyCreateContract!` builtin functions, which will reduce a lot of on-chain storage and transaction gas fee.

```rust
Contract Foo(a: ByteVec, b: Address, c: U256) {
  // ...
}

// We want to create multiple instances of contract `Foo`.
// First we need to deploy a template contract of `Foo`, which contract id is `fooTemplateId`.
// Then we can use `copyCreateContract!` to create multiple instances.
TxScript CreateFoo(fooTemplateId: ByteVec, a: ByteVec, b: Address, c: U256) {
  let encodedFields = encodeToBytes!(a, b, c)
  copyCreateContract!(fooTemplateId, encodedFields)
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
  let newImmFieldsEncoded = encode!(immField0, immField1, ...)
  let newMutFieldsEncoded = encode!(mutField0, mutField1, ...)
  migrateWithFields!(newCode, newMutFieldsEncoded, newMutFieldsEncoded)
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
* Contracts can only implements one interface.

```rust
Interface Foo {
  event E(a: U256)

  @using(assetsInContract = true)
  pub fn foo() -> ()
}

Interface Bar extends Foo {
  @using(readonly = true)
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

  @using(readonly = true)
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

:::note
Deploying a contract requires depositing a certain amount of ALPH in the contract(currently 1 alph), so creating a large number of sub-contracts is not practical.
:::

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
