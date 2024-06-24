---
sidebar_position: 20
title: Functions
sidebar_label: Functions
---

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

In Ralph, local variables can be either immutable or mutable.

```rust
fn foo() -> () {
  // `a` is immutable and cannot be reassigned
  let a = 10
  a = 9 // ERROR: Cannot reassign

  // `b` is mutable and can be reassigned
  let mut b = 10
  b = 9
}

fn bar() -> (U256, Boolean) {
  return 1, false
}
```

You could also create multiple variables in one statement when calling functions that return multiple values.

```rust
fn baz() -> () {
  // Both `a` and `b` are immutable
  let (a, b) = bar()
  // `c` is immutable, but `d` is mutable
  let (c, mut d) = bar()
  // Ignore the first return value of the function `bar`
  let (_, e) = bar()
}
```

For security reasons, variable shadowing is not allowed. The following example will fail to compile.

```rust
// This won't compile
fn foo() -> () {
  if (true) {
    let a = 1
  } else {
    let a = 2
  }
}
```

#### Anonymous variables

You could use anonymous variables to ignore unused variables with underscore.

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

:::tip note
`break` and `continue` statements are not supported in `for-loop` and `while-loop` because they may be bad practice in some cases. It's recommended to replace them with early `return` or [assert function](/ralph/built-in-functions#assert).
:::

:::tip note
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
Additional details about the Asset Permission System (APS) can be found [here](/dapps/concepts/asset-permission-system).

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

- `preapprovedAssets = true/false`: whether the function uses user-approved assets. The default value is `false` for contracts, `true` for scripts.
- `assetsInContract = true/false`: whether the function uses contract assets. The default value is `false`.
- `payToContractOnly = true/false`: whether the funciton only transfers assets to the contract. The default value is `false`.
- `checkExternalCaller = true/false`: whether the function checks the caller. The default value is `true`.
- `updateFields = true/false`: whether the function changes contract fields. The default value is `false`.

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

You can find more information about asset permission at [here](/dapps/concepts/asset-permission-system).

### Pay To Contract Only

You can set the `payToContractOnly` annotation to `true` when the contract only accepts transfers. Functions annotated with `@using(payToContractOnly = true)` can be called multiple times within a single transaction.

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
