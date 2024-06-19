---
sidebar_position: 90
title: Built-in Functions
sidebar_label: Built-in functions
---

<!---
This file is auto-generated with "scripts/generate-builtin-functions.js"
-->

The built-in functions are divided into several categories:
[Contract](#contract-functions),
[SubContract](#subcontract-functions),
[Map](#map-functions),
[Asset](#asset-functions),
[Utils](#utils-functions),
[Chain](#chain-functions),
[Conversion](#conversion-functions),
[ByteVec](#bytevec-functions),
[Cryptography](#cryptography-functions).
All built-in functions are suffixed with `!`.
All of the byte encoding use Big Endian byte order.

## Contract Functions

---

### encodeFields

```Rust
fn <ContractName>.encodeFields!(...) -> (ByteVec, ByteVec)
```

Encode the fields for creating a contract

> @param **...** _the fields of the to-be-created target contract_
>
> @returns _two ByteVecs: the first one is the encoded immutable fields, and the second one is the encoded mutable fields_

---

### createContract

```Rust
fn createContract!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance.

> @param **bytecode** _the bytecode of the contract to be created_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @returns _the id of the created contract_

---

### createContractWithToken

```Rust
fn createContractWithToken!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance.

> @param **bytecode** _the bytecode of the contract to be created_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @param **issueTokenAmount** _the amount of token to be issued_
>
> @param **issueTo** _(optional) a designated address to receive issued token_
>
> @returns _the id of the created contract_

---

### copyCreateContract

```Rust
fn copyCreateContract!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance by copying another contract's code. This costs less gas than createContract!(...).

> @param **contractId** _the id of the contract to be copied_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @returns _the id of the created contract_

---

### copyCreateContractWithToken

```Rust
fn copyCreateContractWithToken!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance by copying another contract's code. This costs less gas than createContractWithToken!(...).

> @param **contractId** _the id of the contract to be copied_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @param **issueTokenAmount** _the amount of token to be issued_
>
> @param **issueTo** _(optional) a designated address to receive issued token_
>
> @returns _the id of the created contract_

---

### selfAddress

```Rust
fn selfAddress!() -> (Address)
```

Returns the address of the contract.

> @returns _the address of the contract_

---

### selfContractId

```Rust
fn selfContractId!() -> (ByteVec)
```

Returns the id (ByteVec) of the contract.

> @returns _the id (ByteVec) of the contract_

---

### selfTokenId

```Rust
fn selfTokenId!() -> (ByteVec)
```

Returns the token id (ByteVec) of the contract.

> @returns _the token id (ByteVec) of the contract_

---

### tokenId

```Rust
fn tokenId!(contract:<Contract>) -> (ByteVec)
```

Returns the id of the contract

> @param **contract** _the contract variable_
>
> @returns _the id of the contract_

---

### contractId

```Rust
fn contractId!(contract:<Contract>) -> (ByteVec)
```

Returns the id of the contract

> @param **contract** _the contract variable_
>
> @returns _the id of the contract_

---

### contractAddress

```Rust
fn contractAddress!(contract:<Contract>) -> (Address)
```

Returns the address of the contract

> @param **contract** _the contract variable_
>
> @returns _the address of the contract_

---

### callerContractId

```Rust
fn callerContractId!() -> (ByteVec)
```

Returns the contract id of the caller.

> @returns _the contract id of the caller_

---

### callerAddress

```Rust
fn callerAddress!() -> (Address)
```

Returns the address of the caller. When used in a TxScript, it returns the unique input address if the input addresses are the same, otherwise it fails.

> @returns _the address of the caller. When used in a TxScript, it returns the unique input address if the input addresses are the same, otherwise it fails_

---

### contractInitialStateHash

```Rust
fn contractInitialStateHash!(contractId:ByteVec) -> (ByteVec)
```

Returns the initial state hash of the contract.

> @param **contractId** _the id of the input contract_
>
> @returns _the initial state hash of the contract_

---

### contractCodeHash

```Rust
fn contractCodeHash!(contractId:ByteVec) -> (ByteVec)
```

Returns the contract code hash of the contract.

> @param **contractId** _the id of the input contract_
>
> @returns _the contract code hash of the contract_

---

### callerInitialStateHash

```Rust
fn callerInitialStateHash!() -> (ByteVec)
```

Returns the initial state hash of the caller contract.

> @returns _the initial state hash of the caller contract_

---

### callerCodeHash

```Rust
fn callerCodeHash!() -> (ByteVec)
```

Returns the contract code hash of the caller contract.

> @returns _the contract code hash of the caller contract_

---

### contractExists

```Rust
fn contractExists!(contractId:ByteVec) -> (Bool)
```

Checks whether the contract exists with the given id.

> @param **contractId** _the input contract id to be tested_
>
> @returns _ture if the contract exists on the chain, false otherwise_

---

### destroySelf

```Rust
fn destroySelf!(refundAddress:Address) -> ()
```

Destroys the contract and transfer the remaining assets to a designated address.

> @param **refundAddress** _the address to receive the remaining assets in the contract_
>
> @returns

---

### migrate

```Rust
fn migrate!(newBytecode:ByteVec) -> ()
```

Migrates the code of the contract.

> @param **newBytecode** _the new bytecode for the contract to migrate to_
>
> @returns

---

### migrateWithFields

```Rust
fn migrateWithFields!(newBytecode:ByteVec, newEncodedImmFields:ByteVec, newEncodedMutFields:ByteVec) -> ()
```

Migrates both the code and the fields of the contract.

> @param **newBytecode** _the bytecode for the contract to migrate to_
>
> @param **newEncodedImmFields** _the encoded immutable fields for the contract to migrate to_
>
> @param **newEncodedMutFields** _the encoded mutable fields for the contract to migrate to_
>
> @returns

---

### isCalledFromTxScript

```Rust
fn isCalledFromTxScript!() -> (Bool)
```

Checks whether the function is called by a TxScript.

> @returns _true if the function is called by a TxScript, false otherwise_

---

### selfContract

```Rust
fn selfContract!() -> (<Contract>)
```

Returns self contract

> @returns _self contract_

---

## SubContract Functions

---

### createSubContract

```Rust
fn createSubContract!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance.

> @param **subContractPath** _the path of the sub-contract to be created_
>
> @param **bytecode** _the bytecode of the sub-contract to be created_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @returns _the id of the created contract_

---

### createSubContractWithToken

```Rust
fn createSubContractWithToken!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance.

> @param **subContractPath** _the path of the sub-contract to be created_
>
> @param **bytecode** _the bytecode of the sub-contract to be created_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @param **issueTokenAmount** _the amount of token to be issued_
>
> @param **issueTo** _(optional) a designated address to receive issued token_
>
> @returns _the id of the created contract_

---

### copyCreateSubContract

```Rust
fn copyCreateSubContract!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance by copying another contract's code. This costs less gas than createSubContract!(...).

> @param **subContractPath** _the path of the sub-contract to be created_
>
> @param **contractId** _the id of the contract to be copied_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @returns _the id of the created contract_

---

### copyCreateSubContractWithToken

```Rust
fn copyCreateSubContractWithToken!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance by copying another contract's code. This costs less gas than createSubContractWithToken!(...).

> @param **subContractPath** _the path of the sub-contract to be created_
>
> @param **contractId** _the id of the contract to be copied_
>
> @param **encodedImmFields** _the encoded immutable fields as a ByteVec_
>
> @param **encodedMutFields** _the encoded mutable fields as a ByteVec_
>
> @param **issueTokenAmount** _the amount of token to be issued_
>
> @param **issueTo** _(optional) a designated address to receive issued token_
>
> @returns _the id of the created contract_

---

### subContractId

```Rust
fn subContractId!(subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **subContractPath** _the path of the sub-contract_
>
> @returns _the id of the sub contract_

---

### subContractIdOf

```Rust
fn subContractIdOf!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **contract** _the parent contract of the sub-contract_
>
> @param **subContractPath** _the path of the sub-contract_
>
> @returns _the id of the sub contract_

---

### subContractIdInParentGroup

```Rust
fn subContractIdInParentGroup!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **contract** _the parent contract of the sub-contract_
>
> @param **subContractPath** _the path of the sub-contract_
>
> @returns _the id of the sub contract_

---

## Map Functions

---

### map.insert

```Rust
fn <map>.insert!(depositorAddress: Address, key: <Bool | U256 | I256 | Address | ByteVec>, value: Any) -> ()
```

Insert a key/value pair into the map. No brace syntax is required, as the minimal storage deposit will be deducted from the approved assets by the VM

> @param **depositorAddress** _the address to pay the minimal storage deposit (0.1 ALPH) for the new map entry_
>
> @param **key** _the key to insert_
>
> @param **value** _the value to insert_
>
> @returns

---

### map.remove

```Rust
fn <map>.remove!(depositRecipient: Address, key: <Bool | U256 | I256 | Address | ByteVec>) -> ()
```

Remove a key from the map

> @param **depositRecipient** _the address to receive the redeemed minimal storage deposit_
>
> @param **key** _the key to remove_
>
> @returns

---

### map.contains

```Rust
fn <map>.contains!(key: <Bool | U256 | I256 | Address | ByteVec>) -> Bool
```

Check whether the map contains a bindiing for the key

> @param **key** _the key to check_
>
> @returns _true if there is a binding for key in this map, false otherwise_

---

## Asset Functions

---

### approveToken

```Rust
fn approveToken!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Approves the usage of certain amount of token from the given address

> @param **fromAddress** _the address to approve token from_
>
> @param **tokenId** _the token to be approved_
>
> @param **amount** _the amount of the token to be approved_
>
> @returns

---

### tokenRemaining

```Rust
fn tokenRemaining!(address:Address, tokenId:ByteVec) -> (U256)
```

Returns the amount of the remaining token amount in the input assets of the function.

> @param **address** _the input address_
>
> @param **tokenId** _the token id_
>
> @returns _the amount of the remaining token amount in the input assets of the function_

---

### transferToken

```Rust
fn transferToken!(fromAddress:Address, toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers token from the input assets of the function.

> @param **fromAddress** _the address to transfer token from_
>
> @param **toAddress** _the address to transfer token to_
>
> @param **tokenId** _the token to be transferred_
>
> @param **amount** _the amount of token to be transferred_
>
> @returns

---

### transferTokenFromSelf

```Rust
fn transferTokenFromSelf!(toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers the contract's token from the input assets of the function.

> @param **toAddress** _the address to transfer token to_
>
> @param **tokenId** _the token to be transferred_
>
> @param **amount** _the amount of token to be transferred_
>
> @returns

---

### transferTokenToSelf

```Rust
fn transferTokenToSelf!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers token to the contract from the input assets of the function.

> @param **fromAddress** _the address to transfer token from_
>
> @param **tokenId** _the token to be transferred_
>
> @param **amount** _the amount of token to be transferred_
>
> @returns

---

### burnToken

```Rust
fn burnToken!(address:Address, tokenId:ByteVec, amount:U256) -> ()
```

Burns token from the input assets of the function.

> @param **address** _the address to burn token from_
>
> @param **tokenId** _the token to be burnt_
>
> @param **amount** _the amount of token to be burnt_
>
> @returns

---

### lockApprovedAssets

```Rust
fn lockApprovedAssets!(address:Address, timestamp:U256) -> ()
```

Locks the current approved assets.

> @param **address** _the address to lock assets to_
>
> @param **timestamp** _the timestamp that the assets will be locked until_
>
> @returns

---

### payGasFee

```Rust
fn payGasFee!(payer:Address, amount:U256) -> ()
```

Pay gas fee.

> @param **payer** _payer of the gas_
>
> @param **amount** _the amount of gas to be paid in ALPH_
>
> @returns

---

## Utils Functions

---

### assert

```Rust
fn assert!(condition:Bool, errorCode:U256) -> ()
```

Tests the condition or checks invariants.

> @param **condition** _the condition to be checked_
>
> @param **errorCode** _the error code to throw if the check fails_
>
> @returns

---

### checkCaller

```Rust
fn checkCaller!(condition:Bool, errorCode:U256) -> ()
```

Checks conditions of the external caller of the function.

> @param **condition** _the condition to be checked_
>
> @param **errorCode** _the error code to throw if the check fails_
>
> @returns

---

### isAssetAddress

```Rust
fn isAssetAddress!(address:Address) -> (Bool)
```

Returns whether an address is an asset address.

> @param **address** _the input address to be tested_
>
> @returns _true if the address is an asset address, false otherwise_

---

### isContractAddress

```Rust
fn isContractAddress!(address:Address) -> (Bool)
```

Returns whether an address is a contract address.

> @param **address** _the input address to be tested_
>
> @returns _true if the address is a contract address, false otherwise_

---

### zeros

```Rust
fn zeros!(n:U256) -> (ByteVec)
```

Returns a ByteVec of zeros.

> @param **n** _the number of zeros_
>
> @returns _a ByteVec of zeros_

---

### panic

```Rust
fn panic!(errorCode?: U256) -> (Never)
```

Terminates the application immediately.

> @param **errorCode** _(optional) the error code to be thrown when the panic!(...) is called_
>
> @returns

---

### mulModN

```Rust
fn mulModN!(x:U256, y:U256, n:U256) -> (U256)
```

Returns compute the x \* y % n.

> @param **x** _x_
>
> @param **y** _y_
>
> @param **n** _n_
>
> @returns _compute the x \* y % n_

---

### addModN

```Rust
fn addModN!(x:U256, y:U256, n:U256) -> (U256)
```

Returns compute the (x + y) % n.

> @param **x** _x_
>
> @param **y** _y_
>
> @param **n** _n_
>
> @returns _compute the (x + y) % n_

---

### u256Max

```Rust
fn u256Max!() -> (U256)
```

Returns the max value of U256.

> @returns _the max value of U256_

---

### i256Max

```Rust
fn i256Max!() -> (I256)
```

Returns the max value of I256.

> @returns _the max value of I256_

---

### i256Min

```Rust
fn i256Min!() -> (I256)
```

Returns the min value of I256.

> @returns _the min value of I256_

---

### groupOfAddress

```Rust
fn groupOfAddress!(address:Address) -> (U256)
```

Returns the group of the input address.

> @param **address** _the input address_
>
> @returns _the group of the input address_

---

### nullContractAddress

```Rust
fn nullContractAddress!() -> (Address)
```

Returns the null contract address with contract id being zeros.

> @returns _the null contract address with contract id being zeros_

---

### minimalContractDeposit

```Rust
fn minimalContractDeposit!() -> (U256)
```

The minimal contract deposit

> @returns _the minimal ALPH amount for contract deposit_

---

### mapEntryDeposit

```Rust
fn mapEntryDeposit!() -> (U256)
```

The amount of ALPH required to create a map entry, which is '0.1 ALPH' since Rhone upgrade

> @returns _the amount of ALPH required to create a map entry_

---

## Chain Functions

---

### networkId

```Rust
fn networkId!() -> (ByteVec)
```

Returns the network id (a single byte).

> @returns _the network id (a single byte)_

---

### blockTimeStamp

```Rust
fn blockTimeStamp!() -> (U256)
```

Returns the block timestamp.

> @returns _the block timestamp_

---

### blockTarget

```Rust
fn blockTarget!() -> (U256)
```

Returns the block difficulty target.

> @returns _the block difficulty target_

---

### txId

```Rust
fn txId!() -> (ByteVec)
```

Returns the current transaction id.

> @returns _the current transaction id_

---

### txInputAddress

```Rust
fn txInputAddress!(txInputIndex:U256) -> (Address)
```

Returns the n-th transaction input address.

> @param **txInputIndex** _the index of the transaction input_
>
> @returns _the n-th transaction input address_

---

### txInputsSize

```Rust
fn txInputsSize!() -> (U256)
```

Returns the number of transaction inputs.

> @returns _the number of transaction inputs_

---

### txGasPrice

```Rust
fn txGasPrice!() -> (U256)
```

Returns the current transaction gas price.

> @returns _the current transaction gas price_

---

### txGasAmount

```Rust
fn txGasAmount!() -> (U256)
```

Returns the current transaction gas amount.

> @returns _the current transaction gas amount_

---

### txGasFee

```Rust
fn txGasFee!() -> (U256)
```

Returns the current transaction gas fee.

> @returns _the current transaction gas fee_

---

### verifyAbsoluteLocktime

```Rust
fn verifyAbsoluteLocktime!(lockUntil:U256) -> ()
```

Verifies that the absolute locktime is before the block timestamp, otherwise it fails.

> @param **lockUntil** _the timestamp until which the lock is valid_
>
> @returns

---

### verifyRelativeLocktime

```Rust
fn verifyRelativeLocktime!(txInputIndex:U256, lockDuration:U256) -> ()
```

Verifies that the input's creation timestamp + lock duration is before the block timestamp, otherwise it fails.

> @param **txInputIndex** _the index of the transaction input_
>
> @param **lockDuration** _the duration that the input is locked for_
>
> @returns

---

### dustAmount

```Rust
fn dustAmount!() -> (U256)
```

Returns the dust amount of an UTXO.

> @returns _the dust amount of an UTXO_

---

## Conversion Functions

---

### toI256

```Rust
fn toI256!(from:U256) -> (I256)
```

Converts U256 to I256.

> @param **from** _a U256 to be converted_
>
> @returns _a I256_

---

### toU256

```Rust
fn toU256!(from:I256) -> (U256)
```

Converts I256 to U256.

> @param **from** _a I256 to be converted_
>
> @returns _a U256_

---

### toByteVec

```Rust
fn toByteVec!(from:Bool|I256|U256|Address) -> (ByteVec)
```

Converts Bool/I256/U256/Address to ByteVec

> @param **from** _a Bool|I256|U256|Address to be converted_
>
> @returns _a ByteVec_

---

### contractIdToAddress

```Rust
fn contractIdToAddress!(contractId:ByteVec) -> (Address)
```

Converts contract id (ByteVec) to contract address (Address).

> @param **contractId** _the input contract id_
>
> @returns _a contract Address_

---

### addressToContractId

```Rust
fn addressToContractId!(contractAddress:Address) -> (ByteVec)
```

Converts contract address (Address) to contract id (ByteVec)

> @param **contractAddress** _the input contract address_
>
> @returns _a contract id_

---

### byteVecToAddress

```Rust
fn byteVecToAddress!(bytes:ByteVec) -> (Address)
```

Converts ByteVec to Address.

> @param **bytes** _the input ByteVec_
>
> @returns _an Address_

---

### u256To1Byte

```Rust
fn u256To1Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 1 byte.

> @param **u256** _the input U256_
>
> @returns _1 byte_

---

### u256To2Byte

```Rust
fn u256To2Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 2 big-endian bytes.

> @param **u256** _the input U256_
>
> @returns _2 bytes_

---

### u256To4Byte

```Rust
fn u256To4Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 4 big-endian bytes.

> @param **u256** _the input U256_
>
> @returns _4 bytes_

---

### u256To8Byte

```Rust
fn u256To8Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 8 big-endian bytes.

> @param **u256** _the input U256_
>
> @returns _8 bytes_

---

### u256To16Byte

```Rust
fn u256To16Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 16 big-endian bytes.

> @param **u256** _the input U256_
>
> @returns _16 bytes_

---

### u256To32Byte

```Rust
fn u256To32Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 32 big-endian bytes.

> @param **u256** _the input U256_
>
> @returns _32 bytes_

---

### u256ToString

```Rust
fn u256ToString!(u256:U256) -> (ByteVec)
```

Converts U256 to string in ByteVec.

> @param **u256** _the input U256_
>
> @returns _Converted string in ByteVec_

---

### i256ToString

```Rust
fn i256ToString!(i256:I256) -> (ByteVec)
```

Converts I256 to string in ByteVec.

> @param **i256** _the input I256_
>
> @returns _Converted string in ByteVec_

---

### boolToString

```Rust
fn boolToString!(bool:Bool) -> (ByteVec)
```

Converts Bool to string in ByteVec.

> @param **bool** _the input Bool_
>
> @returns _Converted string in ByteVec_

---

### u256From1Byte

```Rust
fn u256From1Byte!(bytes:ByteVec) -> (U256)
```

Converts 1 byte to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

### u256From2Byte

```Rust
fn u256From2Byte!(bytes:ByteVec) -> (U256)
```

Converts 2 big-endian bytes to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

### u256From4Byte

```Rust
fn u256From4Byte!(bytes:ByteVec) -> (U256)
```

Converts 4 big-endian bytes to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

### u256From8Byte

```Rust
fn u256From8Byte!(bytes:ByteVec) -> (U256)
```

Converts 8 big-endian bytes to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

### u256From16Byte

```Rust
fn u256From16Byte!(bytes:ByteVec) -> (U256)
```

Converts 16 big-endian bytes to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

### u256From32Byte

```Rust
fn u256From32Byte!(bytes:ByteVec) -> (U256)
```

Converts 32 big-endian bytes to U256.

> @param **bytes** _the input ByteVec_
>
> @returns _an U256_

---

## ByteVec Functions

---

### size

```Rust
fn size!(bytes:ByteVec) -> (U256)
```

Returns the size of the ByteVec.

> @param **bytes** _a ByteVec_
>
> @returns _the size of the ByteVec_

---

### byteVecSlice

```Rust
fn byteVecSlice!(bytes:ByteVec, from:U256, until:U256) -> (ByteVec)
```

Selects an interval of bytes.

> @param **bytes** _a ByteVec_
>
> @param **from** _the lowest index to include from the ByteVec_
>
> @param **until** _the lowest index to exclude from the ByteVec_
>
> @returns _a ByteVec containing the elements greater than or equal to index from extending up to (but not including) index until of this ByteVec_

---

### encodeToByteVec

```Rust
fn encodeToByteVec!(...any) -> (ByteVec)
```

Encodes inputs as big-endian ByteVec.

> @param **any** _a sequence of input values_
>
> @returns _a ByteVec encoding the inputs_

---

## Cryptography Functions

---

### blake2b

```Rust
fn blake2b!(data:ByteVec) -> (ByteVec)
```

Computes the Blake2b-256 hash of the input.

> @param **data** _the input data to be hashed_
>
> @returns _the 32 bytes hash result_

---

### keccak256

```Rust
fn keccak256!(data:ByteVec) -> (ByteVec)
```

Computes the Keccak256 hash of the input.

> @param **data** _the input data to be hashed_
>
> @returns _the hash result_

---

### sha256

```Rust
fn sha256!(data:ByteVec) -> (ByteVec)
```

Computes the Sha256 hash of the input.

> @param **data** _the input data to be hashed_
>
> @returns _the hash result_

---

### sha3

```Rust
fn sha3!(data:ByteVec) -> (ByteVec)
```

Computes the Sha3 hash of the input.

> @param **data** _the input data to be hashed_
>
> @returns _the hash result_

---

### verifyTxSignature

```Rust
fn verifyTxSignature!(publicKey:ByteVec) -> ()
```

Verifies the transaction SecP256K1 signature of a public key. The signature is signed against the transaction id.

> @param **publicKey** _the public key (33 bytes) of the signer_
>
> @returns

---

### getSegregatedSignature

```Rust
fn getSegregatedSignature!() -> (ByteVec)
```

The segregated signature of the transaction

> @returns _the segregated signature of the transaction_

---

### verifySecP256K1

```Rust
fn verifySecP256K1!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the SecP256K1 signature of the input and public key.

> @param **data** _the data (32 bytes) that was supposed to have been signed_
>
> @param **publicKey** _the public key (33 bytes) of the signer_
>
> @param **signature** _the signature (64 bytes) value_
>
> @returns

---

### verifyED25519

```Rust
fn verifyED25519!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the ED25519 signature of the input and public key.

> @param **data** _the data (32 bytes) that was supposed to have been signed_
>
> @param **publicKey** _the public key (32 bytes) of the signer_
>
> @param **signature** _the signature value (64 bytes)_
>
> @returns

---

### verifyBIP340Schnorr

```Rust
fn verifyBIP340Schnorr!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the BIP340 Schnorr signature of the input and public key.

> @param **data** _the data (32 bytes) that was supposed to have been signed_
>
> @param **publicKey** _the public key (32 bytes) of the signer_
>
> @param **signature** _the signature value (64 bytes)_
>
> @returns

---

### ethEcRecover

```Rust
fn ethEcRecover!(data:ByteVec, signature:ByteVec) -> (ByteVec)
```

Recovers the ETH account that signed the data.

> @param **data** _the data that was supposed to have been signed_
>
> @param **signature** _the signature value_
>
> @returns _the ETH account that signed the data_

---
