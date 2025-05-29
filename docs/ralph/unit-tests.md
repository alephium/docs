---
sidebar_position: 50
title: Unit Tests
sidebar_label: Unit Tests
---

Ralph offers built-in functions that let you write unit tests directly within your smart contracts, these functions let you assert conditions, compare values, and test for errors.

### `testCheck!`

It accepts an expression of type `Bool`. This function checks if a given **condition** evaluates to `true`. If `condition` is `false`, the test fails.

**Usage:**

```rust
Contract Foo() {
  fn foo(a: U256, b: U256) -> U256 {
    return a + b
  }

  test "foo" {
    testCheck!(foo(1, 2) == 3) // This passes
    testCheck!(foo(1, 2) == 4) // This fails
  }
}
```

### `testEqual!`

This function accepts two values of **primitive type**, `a` and `b`. It compares them for equality. If `a` is not equal to `b`, the test fails.

**Usage:**

```rust
Contract Foo() {
  fn foo(a: U256, b: U256) -> U256 {
    return a + b
  }

  test "foo" {
    testEqual!(foo(1, 2), 3) // This passes
    testEqual!(foo(1, 2), 4) // This fails
  }
}
```

### `testError!`

This function accepts an **expression** and an `errorCode` of type `U256`. It's used when you expect the expression to throw a specific error during its execution. The test passes if the `expr` executes and throws the exact `errorCode`. It fails if `expr` does not throw an error, or if it throws a different error code.

**Usage:**

```rust
Contract Foo() {
  fn foo(number: U256) -> () {
    if (number > 10) {
      assert!(number < 15, 0)
    } else if (number < 5) {
      assert!(number > 2, 1)
    } else {
      return
    }
  }

  test "foo" {
    testError!(foo(17), 0) // This passes
    testError!(foo(17), 1) // This fails because the wrong error code is thrown
    testError!(foo(0), 1) // This passes
    testError!(foo(0), 0) // This fails because the wrong error code is thrown
    testError!(foo(7), 1) // This fails because no error is thrown
  }
}
```

### `testFail!`

This function accepts an **expression**. It's used when you expect the expression to throw *any* exception during its execution. The test passes if `expr` throws an error and fails if it completes successfully without one.

**Usage:**

```rust
Contract Foo() {
  fn foo(a: U256, b: U256) -> U256 {
    return a / b
  }

  test "foo" {
    testFail!(foo(1, 0)) // This passes
    testFail!(foo(1, 2)) // This fails because no error is thrown
  }
}
```

Ralph also provides `randomU256!` and `randomI256!` functions, which respectively generate random `U256` and `I256` values for use in tests.

Note that all these testing functions can only be used within unit tests; using them outside of a test context will result in a compiler error.

Besides pure functions, Ralph also supports testing contract state and asset changes.

```rust
Contract Foo(bar: Bar) {
  @using(checkExternalCaller = false, assetsInContract = enforced)
  pub fn foo() -> () {
    bar.bar()
  }

  test "foo"
  before
    Bar{ALPH: 10 alph}(0)@barId
    Self(barId)
  after
    Bar{ALPH: 9 alph}(1)@barId
    Self{ALPH: 1.1 alph}(barId)
  {
    foo()
  }
}

Contract Bar(mut count: U256) {
  @using(checkExternalCaller = false, assetsInContract = true)
  pub fn bar() -> () {
    count += 1
    transferTokenFromSelf!(callerAddress!(), ALPH, 1 alph)
  }
}
```

In the tests above, `before` represents the contract's assets and state before test execution, while `after` represents its state after test execution. If the contract's state after execution differs from the expected state, the test will fail.
