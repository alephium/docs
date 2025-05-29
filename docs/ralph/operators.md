---
sidebar_position: 40
title: Operators
sidebar_label: Operators
---

### Arithmetic operators

There are arithmetic operators such as `+`, `-`, `*`, `/`, `\`, `**`, and `%` available for `I256` and `U256` types, and these operators will check for overflow at runtime.

For example, the following expressions will cause the VM to throw an error at runtime:

```rust
u256Max!() + 1  // overflow
0 - 1           // overflow
i256Max!() + 1i // overflow
i256Min!() - 1i // overflow
```

Ralph provides two division operators: `/` for round-down division and `\` for round-up division. Here are some examples:

```rust
5 / 3 == 1
5 \ 3 == 2

5i / 3i == 1i
5i / -3i == -2i
5i \ 3i == 2i
5i \ -3i == -1i
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
