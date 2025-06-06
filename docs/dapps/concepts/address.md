---
sidebar_position: 40
title: Address
sidebar_label: Address
---

### Overview

An address on Alephium is a unique identifier that represents an
account or a contract. All networks (i.e. mainnet, testnet, devnet)
share the same address format.

There are currently 6 different address types on Alephium, each represented by a unique byte prefix:

| Prefix | Address Type | Description                        |
|--------|--------------|------------------------------------|
|   0x00 | P2PKH        | Pay to public key hash             |
|   0x01 | P2MPKH       | Pay to multiple public key Hash    |
|   0x02 | P2SH         | Pay to script hash                 |
|   0x03 | P2C          | Pay to contract                    |
|   0x04 | P2PK         | Pay to public key                  |
|   0x05 | P2HMPK       | Pay to hash of mutiple public keys |

Each address type is followed by a specific content bytes format:

| Address Type | Content Bytes                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------|
| P2PKH        | Serialized public key hash                                                                      |
| P2MPKH       | Serialized public key hashes and multisig threshold                                             |
| P2SH         | Serialized script hash                                                                          |
| P2C          | Serialized contract ID                                                                          |
| P2PK         | Serialized public key with checksum + group info                                                |
| P2HMPK       | Serialized hash of key type, multisig threshold and all public keys with check sum + group info |

The complete address in bytes is constructed by concatenating the address type and the content bytes:

```
address = address type || content bytes
```

The string representation of an address is the `base58` encoding of its
byte representation. At the protocol level, each address on Alephium
belongs to a group, which can be derived deterministically from the
address. In Ralph, address literals must start with `@` followed by a
valid base58-encoded Alephium address.

```rust
Contract AddressTest () {
    fn prefix(address: Address) -> ByteVec {
       return byteVecSlice!(toByteVec!(address), 0, 1)
    }

    pub fn test() -> ()  {
      // Address literals must start with `@`
      let p2pkh = @1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH
      let p2mpkh = @2jW1n2icPtc55Cdm8TF9FjGH681cWthsaZW3gaUFekFZepJoeyY3ZbY7y5SCtAjyCjLL24c4L2Vnfv3KDdAypCddfAY
      let p2sh = @ibsc1yJLJxxVcsPfSDJoR3mzrasrZq2Rn63dFQGcDAYE
      let p2c = @26j4viXkBzJd5SaDtQzyGM6joqoECmajncT4QS3tmT9hb
      let p2pk = @3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:1
      let p2hmpk = @CSYxX7pdWvrbqAQFfHaUsrL4xpgXKktsQF2yJ8P53AmCyGiNbU:0

      assert!(prefix(p2pkh) == #00, 0)
      assert!(prefix(p2mpkh) == #01, 1)
      assert!(prefix(p2sh) == #02, 2)
      assert!(prefix(p2c) == #03, 3)
      assert!(prefix(p2pk) == #04, 4)
      assert!(prefix(p2hmpk) == #05, 5)

      assert!(groupOfAddress!(p2pkh) == 0, 4)
      assert!(groupOfAddress!(p2mpkh) == 0, 5)
      assert!(groupOfAddress!(p2sh) == 0, 6)
      assert!(groupOfAddress!(p2c) == 2, 7)
      assert!(groupOfAddress!(p2pk) == 1, 8)
      assert!(groupOfAddress!(p2hmpk) == 3, 9)

      emit Debug(`Test successful for Address`)
   }
}
```

The `prefix` function is a helper function that extracts the address
type from an address. The `groupOfAddress!` function is a built-in
function that returns the group of an address.

### Groupless Address

Before the Danube upgrade, Alephium addresses included group
information at both the protocol and application level. The Danube
upgrade introduced groupless address types, which abstract away the
complexity of groups at the application level. This enables wallets
and dApps to offer a significantly smoother and more intuitive user
experience.

Note that group information is still required at the protocol level,
for example in the Ralph code. Currently, the supported groupless
address types include both `P2PK` and `P2HMPK`.

```rust
let p2pk = @3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:1  // explicit group required
let p2hmpk = @CSYxX7pdWvrbqAQFfHaUsrL4xpgXKktsQF2yJ8P53AmCyGiNbU:0   // explicit group required

assert!(prefix(p2pk) == #04, 4)
assert!(prefix(p2hmpk) == #05, 5)

assert!(groupOfAddress!(p2pk) == 1, 8)
assert!(groupOfAddress!(p2hmpk) == 3, 9)
```

At the application level,
`3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK` is a valid `P2PK`
groupless address. This is what user would normally see and use. Under
the hood, it contains the following grouped addresses:

```
3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:0
3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:1
3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:2
3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK:3
```

When user checks the balance of
`3cUqhqEgt8qFAokkD7qRsy9Q2Q9S1LEiSdogbBmaq7CnshB8BdjfK`, it returns the
combined balance of all the underlying grouped addresses. When the
user uses this address to transfer assets or interact with dApps, the
system automatically picks the appropriate underlying grouped address
and performs any neccessary internal transfers to complete the
transaction seamlessly. The same logic applies to the `P2HMPK` addresses
as well.

For `P2PK` address, the content bytes of the address consist of the
following components:

```
content bytes = public key type || public key || checksum || group
```

Unlike `P2PKH` which only supports the `SecP256K1` public keys, `P2PK` also
supports the following public key types to enable more use cases such
as `PassKey`:

| Public Key Prefix | Public Key Type |
|-------------------|-----------------|
|              0x00 | SecP256K1       |
|              0x01 | SecP256R1       |
|              0x02 | ED25519         |
|              0x03 | WebAuthn        |

The checksum is a 4-byte `djb2` hash of the public key, the purpose is
to provide simple integrity check for the public key. Group
information is also included.

For `P2HMPK` address, the address content bytes are composed of the
following components:

```
content bytes = blake2b(address type || public keys || multisig threshold) | checksum | group
```

The content of the `P2HMPK` address is constructed by first computing a
`Blake2b` hash over the concatenation of the address type (`05`), all
public keys and the multisig threshold. This hash is then followed by
a 4-byte `djb2` checksum of the hash and finally a single byte
indicating the group.
