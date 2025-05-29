---
sidebar_position: 50
title: Unit Tests
sidebar_label: Unit Tests
---

Ralph provides an experimental testing framework for writing unit tests directly within smart contracts.

:::info
The Ralph testing framework is currently experimental and evolving. It's particularly well-suited for testing pure functions. [Testing with TypesScript SDK](/sdk/testing-and-debugging) is recommended for complex contract interactions.
:::

## Basic Test Syntax

Tests are written in `test` blocks with descriptive text explaining what is being tested:

```rust
Contract Calculator() {
    fn add(a: U256, b: U256) -> U256 {
        return a + b
    }

    test "should add two numbers correctly" {
        testEqual!(add(2, 3), 5)
        testEqual!(add(0, 10), 10)
        testEqual!(add(100, 200), 300)
    }
}
```

## Assertion Functions

### `testEqual!` - Equality Testing
Compares two values for exact equality:

```rust
test "should return correct fibonacci numbers" {
    testEqual!(fibonacci(0), 0)
    testEqual!(fibonacci(5), 5)
    testEqual!(fibonacci(10), 55)
}
```

### `testCheck!` - Boolean Assertions
Verifies boolean conditions:

```rust
test "should validate age correctly" {
    testCheck!(isValidAge(25))
    testCheck!(!isValidAge(17))
}
```

### `testError!` - Specific Error Testing
Tests that a function throws a specific error code:

```rust
test "should throw insufficient funds error" {
    testError!(withdraw(balance + 1), ErrorCodes.InsufficientFunds)
    testError!(withdraw(0), ErrorCodes.InvalidAmount)
}
```

### `testFail!` - General Error Testing
Tests that a function throws any error:

```rust
test "should fail on division by zero" {
    testFail!(divide(10, 0))
    testFail!(divide(0, 0))
}
```

### Random Value Generation
Use random values for property-based testing:

```rust
test "addition should be commutative" {
    let a = randomU256!()
    let b = randomU256!()
    testEqual!(add(a, b), add(b, a))
}
```

## State and Asset Testing

Use `before` and `after` blocks to test state changes and asset transfers.

### State Testing

```rust
Contract Counter(mut count: U256) {
    pub fn increment() -> () {
        count = count + 1
    }

    test "should increment count by one"
    before
        Self(5)  // Initial state: count = 5
    after
        Self(6)  // Expected state: count = 6
    {
        increment()
    }
}
```

### Asset Transfer Testing

```rust
Contract TokenVault() {
    @using(assetsInContract = true, checkExternalCaller = false)
    pub fn deposit() -> () {
        // Contract receives tokens
    }

    test "should increase contract balance on deposit"
    before
        Self{ALPH: 1 alph}()
    after
        Self{ALPH: 3 alph}()
    {
        deposit{callerAddress!() -> ALPH: 2 alph}()
    }
}
```

### Multi-Contract Testing

Test interactions between multiple contracts:

```rust
Contract Bank(mut totalDeposits: U256) {
    @using(assetsInContract = true, checkExternalCaller = false)
    pub fn deposit() -> () {
        totalDeposits = totalDeposits + 1 alph
    }
}

Contract Customer() {
    pub fn makeDeposit(bank: Bank) -> () {
        bank.deposit{callerAddress!() -> ALPH: 1 alph}()
    }

    test "customer should be able to make deposit to bank"
    before
        Bank{ALPH: 0 alph}(0)@bankId
        Self()
    after
        Bank{ALPH: 1 alph}(1 alph)@bankId
        Self()
    {
        let bank = Bank(bankId)
        makeDeposit(bank)
    }
}
```

## Best Practices

- Use descriptive test descriptions that explain what is being tested
- Test both success and failure scenarios
- Group related tests logically within contracts
- Use random values for property-based testing
- Keep tests focused on single behaviors

## Running Tests

```bash
npx @alephium/cli test
```
