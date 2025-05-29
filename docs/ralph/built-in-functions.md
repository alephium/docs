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
[Cryptography](#cryptography-functions),
[Test](#test-functions).
All built-in functions are suffixed with `!`.
All of the byte encoding use Big Endian byte order.

## Contract Functions
---
### encodeFields

```Rust
fn <ContractName>.encodeFields!(...) -> (ByteVec, ByteVec)
```

Encode the fields for creating a contract

> @param **...** *the fields of the to-be-created target contract*
>
> @returns *two ByteVecs: the first one is the encoded immutable fields, and the second one is the encoded mutable fields*

---

### createContract

```Rust
fn createContract!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance.

> @param **bytecode** *the bytecode of the contract to be created*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### createContractWithToken

```Rust
fn createContractWithToken!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance.

> @param **bytecode** *the bytecode of the contract to be created*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### copyCreateContract

```Rust
fn copyCreateContract!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance by copying another contract's code. This costs less gas than createContract!(...).

> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### copyCreateContractWithToken

```Rust
fn copyCreateContractWithToken!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance by copying another contract's code. This costs less gas than createContractWithToken!(...).

> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### selfAddress

```Rust
fn selfAddress!() -> (Address)
```

Returns the address of the contract.

> @returns *the address of the contract*

---

### selfContractId

```Rust
fn selfContractId!() -> (ByteVec)
```

Returns the id (ByteVec) of the contract.

> @returns *the id (ByteVec) of the contract*

---

### selfTokenId

```Rust
fn selfTokenId!() -> (ByteVec)
```

Returns the token id (ByteVec) of the contract.

> @returns *the token id (ByteVec) of the contract*

---

### tokenId

```Rust
fn tokenId!(contract:<Contract>) -> (ByteVec)
```

Returns the id of the contract

> @param **contract** *the contract variable*
>
> @returns *the id of the contract*

---

### contractId

```Rust
fn contractId!(contract:<Contract>) -> (ByteVec)
```

Returns the id of the contract

> @param **contract** *the contract variable*
>
> @returns *the id of the contract*

---

### contractAddress

```Rust
fn contractAddress!(contract:<Contract>) -> (Address)
```

Returns the address of the contract

> @param **contract** *the contract variable*
>
> @returns *the address of the contract*

---

### callerContractId

```Rust
fn callerContractId!() -> (ByteVec)
```

Returns the contract id of the immediate caller, which could be the current contract in case of recursive calls.

> @returns *the contract id of the immediate caller, which could be the current contract in case of recursive calls*

---

### callerAddress

```Rust
fn callerAddress!() -> (Address)
```

<ol>
<li>When used in a TxScript, returns the transaction caller's address. The transaction must have identical input addresses, otherwise the call fails.</li>
<li>When used in a contract function called from a TxScript, returns the transaction caller's address.</li>
<li>When used in a contract function called from another contract, returns the address of the calling contract.</li>
</ol>

> @returns *the address of the caller*

---

### externalCallerContractId

```Rust
fn externalCallerContractId!() -> (ByteVec)
```

Returns the contract id of the first external contract in the call stack (different from the current contract).

> @returns *the contract id of the first external contract in the call stack (different from the current contract)*

---

### externalCallerAddress

```Rust
fn externalCallerAddress!() -> (Address)
```

<ol>
<li>When used in a TxScript, returns the transaction caller's address. The transaction must have identical input addresses, otherwise the call fails.</li>
<li>When used in a contract function called from a TxScript, returns the transaction caller's address.</li>
<li>When used in a contract function called from another contract, returns the address of the first external calling contract in the call stack (different from the current contract). If multiple calls come from the same contract, it skips intermediate frames to find the first external contract caller.</li>
</ol>

> @returns *the address of the external caller*

---

### contractInitialStateHash

```Rust
fn contractInitialStateHash!(contractId:ByteVec) -> (ByteVec)
```

Returns the initial state hash of the contract.

> @param **contractId** *the id of the input contract*
>
> @returns *the initial state hash of the contract*

---

### contractCodeHash

```Rust
fn contractCodeHash!(contractId:ByteVec) -> (ByteVec)
```

Returns the contract code hash of the contract.

> @param **contractId** *the id of the input contract*
>
> @returns *the contract code hash of the contract*

---

### callerInitialStateHash

```Rust
fn callerInitialStateHash!() -> (ByteVec)
```

Returns the initial state hash of the caller contract.

> @returns *the initial state hash of the caller contract*

---

### callerCodeHash

```Rust
fn callerCodeHash!() -> (ByteVec)
```

Returns the contract code hash of the caller contract.

> @returns *the contract code hash of the caller contract*

---

### contractExists

```Rust
fn contractExists!(contractId:ByteVec) -> (Bool)
```

Checks whether the contract exists with the given id.

> @param **contractId** *the input contract id to be tested*
>
> @returns *ture if the contract exists on the chain, false otherwise*

---

### destroySelf

```Rust
fn destroySelf!(refundAddress:Address) -> ()
```

Destroys the contract and transfer the remaining assets to a designated address. The function will return immediately once the contract is destroyed. Returning value following the contract destruction is not supported.

> @param **refundAddress** *the address to receive the remaining assets in the contract*
>
> @returns

---

### migrate

```Rust
fn migrate!(newBytecode:ByteVec) -> ()
```

Migrates the code of the contract.

> @param **newBytecode** *the new bytecode for the contract to migrate to*
>
> @returns

---

### migrateWithFields

```Rust
fn migrateWithFields!(newBytecode:ByteVec, newEncodedImmFields:ByteVec, newEncodedMutFields:ByteVec) -> ()
```

Migrates both the code and the fields of the contract.

> @param **newBytecode** *the bytecode for the contract to migrate to*
>
> @param **newEncodedImmFields** *the encoded immutable fields for the contract to migrate to*
>
> @param **newEncodedMutFields** *the encoded mutable fields for the contract to migrate to*
>
> @returns

---

### isCalledFromTxScript

```Rust
fn isCalledFromTxScript!() -> (Bool)
```

Checks whether the function is called by a TxScript.

> @returns *true if the function is called by a TxScript, false otherwise*

---

### selfContract

```Rust
fn selfContract!() -> (<Contract>)
```

Returns self contract

> @returns *self contract*

---

## SubContract Functions
---
### createSubContract

```Rust
fn createSubContract!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance.

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **bytecode** *the bytecode of the sub-contract to be created*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### createSubContractWithToken

```Rust
fn createSubContractWithToken!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance.

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **bytecode** *the bytecode of the sub-contract to be created*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### copyCreateSubContract

```Rust
fn copyCreateSubContract!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance by copying another contract's code. This costs less gas than createSubContract!(...).

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### copyCreateSubContractWithToken

```Rust
fn copyCreateSubContractWithToken!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance by copying another contract's code. This costs less gas than createSubContractWithToken!(...).

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedImmFields** *the encoded immutable fields as a ByteVec*
>
> @param **encodedMutFields** *the encoded mutable fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### subContractId

```Rust
fn subContractId!(subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **subContractPath** *the path of the sub-contract*
>
> @returns *the id of the sub contract*

---

### subContractIdOf

```Rust
fn subContractIdOf!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **contract** *the parent contract of the sub-contract*
>
> @param **subContractPath** *the path of the sub-contract*
>
> @returns *the id of the sub contract*

---

### subContractIdInParentGroup

```Rust
fn subContractIdInParentGroup!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Returns the id of the sub contract.

> @param **contract** *the parent contract of the sub-contract*
>
> @param **subContractPath** *the path of the sub-contract*
>
> @returns *the id of the sub contract*

---

## Map Functions
---
### map.insert

```Rust
fn <map>.insert!(depositorAddress?: Address, key: <Bool | U256 | I256 | Address | ByteVec>, value: Any) -> ()
```

Insert a key/value pair into the map. No brace syntax is required, as the minimal storage deposit will be deducted from the approved assets by the VM

> @param **depositorAddress** *the address to pay the minimal storage deposit (0.1 ALPH) for the new map entry. If not provided, minimal storage deposit will be paid by the transaction caller*
>
> @param **key** *the key to insert*
>
> @param **value** *the value to insert*
>
> @returns

---

### map.remove

```Rust
fn <map>.remove!(refundRecipient?: Address, key: <Bool | U256 | I256 | Address | ByteVec>) -> ()
```

Remove a key from the map

> @param **refundRecipient** *the address to receive the redeemed minimal storage deposit. If not provided, minimal storage deposit will be received by the transaction caller*
>
> @param **key** *the key to remove*
>
> @returns

---

### map.contains

```Rust
fn <map>.contains!(key: <Bool | U256 | I256 | Address | ByteVec>) -> Bool
```

Check whether the map contains a bindiing for the key

> @param **key** *the key to check*
>
> @returns *true if there is a binding for key in this map, false otherwise*

---

## Asset Functions
---
### approveToken

```Rust
fn approveToken!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Approves the usage of certain amount of token from the given address

> @param **fromAddress** *the address to approve token from*
>
> @param **tokenId** *the token to be approved*
>
> @param **amount** *the amount of the token to be approved*
>
> @returns

---

### tokenRemaining

```Rust
fn tokenRemaining!(address:Address, tokenId:ByteVec) -> (U256)
```

Returns the amount of the remaining token amount in the input assets of the function.

> @param **address** *the input address*
>
> @param **tokenId** *the token id*
>
> @returns *the amount of the remaining token amount in the input assets of the function*

---

### transferToken

```Rust
fn transferToken!(fromAddress:Address, toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers token from the input assets of the function.

> @param **fromAddress** *the address to transfer token from*
>
> @param **toAddress** *the address to transfer token to*
>
> @param **tokenId** *the token to be transferred*
>
> @param **amount** *the amount of token to be transferred*
>
> @returns

---

### transferTokenFromSelf

```Rust
fn transferTokenFromSelf!(toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers the contract's token from the input assets of the function. The toAddress must not be the same as the contract address.

> @param **toAddress** *the address to transfer token to*
>
> @param **tokenId** *the token to be transferred*
>
> @param **amount** *the amount of token to be transferred*
>
> @returns

---

### transferTokenToSelf

```Rust
fn transferTokenToSelf!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers token to the contract from the input assets of the function. The fromAddress must not be the same as the contract address.

> @param **fromAddress** *the address to transfer token from*
>
> @param **tokenId** *the token to be transferred*
>
> @param **amount** *the amount of token to be transferred*
>
> @returns

---

### burnToken

```Rust
fn burnToken!(address:Address, tokenId:ByteVec, amount:U256) -> ()
```

Burns token from the input assets of the function.

> @param **address** *the address to burn token from*
>
> @param **tokenId** *the token to be burnt*
>
> @param **amount** *the amount of token to be burnt*
>
> @returns

---

### lockApprovedAssets

```Rust
fn lockApprovedAssets!(address:Address, timestamp:U256) -> ()
```

Locks the current approved assets.

> @param **address** *the address to lock assets to*
>
> @param **timestamp** *the timestamp that the assets will be locked until*
>
> @returns

---

### payGasFee

```Rust
fn payGasFee!(payer:Address, amount:U256) -> ()
```

Pay gas fee.

> @param **payer** *payer of the gas*
>
> @param **amount** *the amount of gas to be paid in ALPH*
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

> @param **condition** *the condition to be checked*
>
> @param **errorCode** *the error code to throw if the check fails*
>
> @returns

---

### checkCaller

```Rust
fn checkCaller!(condition:Bool, errorCode:U256) -> ()
```

Checks conditions of the external caller of the function.

> @param **condition** *the condition to be checked*
>
> @param **errorCode** *the error code to throw if the check fails*
>
> @returns

---

### isAssetAddress

```Rust
fn isAssetAddress!(address:Address) -> (Bool)
```

Returns whether an address is an asset address.

> @param **address** *the input address to be tested*
>
> @returns *true if the address is an asset address, false otherwise*

---

### isContractAddress

```Rust
fn isContractAddress!(address:Address) -> (Bool)
```

Returns whether an address is a contract address.

> @param **address** *the input address to be tested*
>
> @returns *true if the address is a contract address, false otherwise*

---

### zeros

```Rust
fn zeros!(n:U256) -> (ByteVec)
```

Returns a ByteVec of zeros.

> @param **n** *the number of zeros*
>
> @returns *a ByteVec of zeros*

---

### panic

```Rust
fn panic!(errorCode?: U256) -> (Never)
```

Terminates the application immediately.

> @param **errorCode** *(optional) the error code to be thrown when the panic!(...) is called*
>
> @returns

---

### mulModN

```Rust
fn mulModN!(x:U256, y:U256, n:U256) -> (U256)
```

Returns compute the x * y % n.

> @param **x** *x*
>
> @param **y** *y*
>
> @param **n** *n*
>
> @returns *compute the x * y % n*

---

### addModN

```Rust
fn addModN!(x:U256, y:U256, n:U256) -> (U256)
```

Returns compute the (x + y) % n.

> @param **x** *x*
>
> @param **y** *y*
>
> @param **n** *n*
>
> @returns *compute the (x + y) % n*

---

### u256Max

```Rust
fn u256Max!() -> (U256)
```

Returns the max value of U256.

> @returns *the max value of U256*

---

### i256Max

```Rust
fn i256Max!() -> (I256)
```

Returns the max value of I256.

> @returns *the max value of I256*

---

### i256Min

```Rust
fn i256Min!() -> (I256)
```

Returns the min value of I256.

> @returns *the min value of I256*

---

### groupOfAddress

```Rust
fn groupOfAddress!(address:Address) -> (U256)
```

Returns the group of the input address.

> @param **address** *the input address*
>
> @returns *the group of the input address*

---

### len

```Rust
fn len!(array) -> (U256)
```

Get the length of an array

> @param **an** *array*
>
> @returns *the length of an array*

---

### nullContractAddress

```Rust
fn nullContractAddress!() -> (Address)
```

Returns the null contract address with contract id being zeros.

> @returns *the null contract address with contract id being zeros*

---

### minimalContractDeposit

```Rust
fn minimalContractDeposit!() -> (U256)
```

The minimal contract deposit

> @returns *the minimal ALPH amount for contract deposit*

---

### mapEntryDeposit

```Rust
fn mapEntryDeposit!() -> (U256)
```

The amount of ALPH required to create a map entry, which is '0.1 ALPH' since Rhone upgrade

> @returns *the amount of ALPH required to create a map entry*

---

## Chain Functions
---
### networkId

```Rust
fn networkId!() -> (ByteVec)
```

Returns the network id (a single byte).

> @returns *the network id (a single byte)*

---

### blockTimeStamp

```Rust
fn blockTimeStamp!() -> (U256)
```

Returns the timestamp of the current block in milliseconds since the Unix epoch.

> @returns *the timestamp of the current block in milliseconds since the Unix epoch*

---

### blockTarget

```Rust
fn blockTarget!() -> (U256)
```

Returns the block difficulty target.

> @returns *the block difficulty target*

---

### txId

```Rust
fn txId!() -> (ByteVec)
```

Returns the current transaction id.

> @returns *the current transaction id*

---

### txInputAddress

```Rust
fn txInputAddress!(txInputIndex:U256) -> (Address)
```

Returns the n-th transaction input address.

> @param **txInputIndex** *the index of the transaction input*
>
> @returns *the n-th transaction input address*

---

### txInputsSize

```Rust
fn txInputsSize!() -> (U256)
```

Returns the number of transaction inputs.

> @returns *the number of transaction inputs*

---

### txGasPrice

```Rust
fn txGasPrice!() -> (U256)
```

Returns the current transaction gas price.

> @returns *the current transaction gas price*

---

### txGasAmount

```Rust
fn txGasAmount!() -> (U256)
```

Returns the current transaction gas amount.

> @returns *the current transaction gas amount*

---

### txGasFee

```Rust
fn txGasFee!() -> (U256)
```

Returns the current transaction gas fee.

> @returns *the current transaction gas fee*

---

### verifyAbsoluteLocktime

```Rust
fn verifyAbsoluteLocktime!(lockUntil:U256) -> ()
```

Verifies that the absolute locktime is before the block timestamp (milliseconds), otherwise it fails.

> @param **lockUntil** *the timestamp until which the lock is valid*
>
> @returns

---

### verifyRelativeLocktime

```Rust
fn verifyRelativeLocktime!(txInputIndex:U256, lockDuration:U256) -> ()
```

Verifies that the input's creation timestamp + lock duration is before the block timestamp (milliseconds), otherwise it fails.

> @param **txInputIndex** *the index of the transaction input*
>
> @param **lockDuration** *the duration that the input is locked for*
>
> @returns

---

### dustAmount

```Rust
fn dustAmount!() -> (U256)
```

Returns the dust amount of an UTXO.

> @returns *the dust amount of an UTXO*

---

## Conversion Functions
---
### toI256

```Rust
fn toI256!(from:U256) -> (I256)
```

Converts U256 to I256.

> @param **from** *a U256 to be converted*
>
> @returns *a I256*

---

### toU256

```Rust
fn toU256!(from:I256) -> (U256)
```

Converts I256 to U256.

> @param **from** *a I256 to be converted*
>
> @returns *a U256*

---

### toByteVec

```Rust
fn toByteVec!(from:Bool|I256|U256|Address) -> (ByteVec)
```

Converts Bool/I256/U256/Address to ByteVec

> @param **from** *a Bool|I256|U256|Address to be converted*
>
> @returns *a ByteVec*

---

### contractIdToAddress

```Rust
fn contractIdToAddress!(contractId:ByteVec) -> (Address)
```

Converts contract id (ByteVec) to contract address (Address).

> @param **contractId** *the input contract id*
>
> @returns *a contract Address*

---

### addressToContractId

```Rust
fn addressToContractId!(contractAddress:Address) -> (ByteVec)
```

Converts contract address (Address) to contract id (ByteVec)

> @param **contractAddress** *the input contract address*
>
> @returns *a contract id*

---

### byteVecToAddress

```Rust
fn byteVecToAddress!(bytes:ByteVec) -> (Address)
```

Converts ByteVec to Address.

> @param **bytes** *the input ByteVec*
>
> @returns *an Address*

---

### u256To1Byte

```Rust
fn u256To1Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 1 byte.

> @param **u256** *the input U256*
>
> @returns *1 byte*

---

### u256To2Byte

```Rust
fn u256To2Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 2 big-endian bytes.

> @param **u256** *the input U256*
>
> @returns *2 bytes*

---

### u256To4Byte

```Rust
fn u256To4Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 4 big-endian bytes.

> @param **u256** *the input U256*
>
> @returns *4 bytes*

---

### u256To8Byte

```Rust
fn u256To8Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 8 big-endian bytes.

> @param **u256** *the input U256*
>
> @returns *8 bytes*

---

### u256To16Byte

```Rust
fn u256To16Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 16 big-endian bytes.

> @param **u256** *the input U256*
>
> @returns *16 bytes*

---

### u256To32Byte

```Rust
fn u256To32Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 32 big-endian bytes.

> @param **u256** *the input U256*
>
> @returns *32 bytes*

---

### u256ToString

```Rust
fn u256ToString!(u256:U256) -> (ByteVec)
```

Converts U256 to string in ByteVec.

> @param **u256** *the input U256*
>
> @returns *Converted string in ByteVec*

---

### i256ToString

```Rust
fn i256ToString!(i256:I256) -> (ByteVec)
```

Converts I256 to string in ByteVec.

> @param **i256** *the input I256*
>
> @returns *Converted string in ByteVec*

---

### boolToString

```Rust
fn boolToString!(bool:Bool) -> (ByteVec)
```

Converts Bool to string in ByteVec.

> @param **bool** *the input Bool*
>
> @returns *Converted string in ByteVec*

---

### u256From1Byte

```Rust
fn u256From1Byte!(bytes:ByteVec) -> (U256)
```

Converts 1 byte to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From2Byte

```Rust
fn u256From2Byte!(bytes:ByteVec) -> (U256)
```

Converts 2 big-endian bytes to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From4Byte

```Rust
fn u256From4Byte!(bytes:ByteVec) -> (U256)
```

Converts 4 big-endian bytes to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From8Byte

```Rust
fn u256From8Byte!(bytes:ByteVec) -> (U256)
```

Converts 8 big-endian bytes to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From16Byte

```Rust
fn u256From16Byte!(bytes:ByteVec) -> (U256)
```

Converts 16 big-endian bytes to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From32Byte

```Rust
fn u256From32Byte!(bytes:ByteVec) -> (U256)
```

Converts 32 big-endian bytes to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

## ByteVec Functions
---
### size

```Rust
fn size!(bytes:ByteVec) -> (U256)
```

Returns the size of the ByteVec.

> @param **bytes** *a ByteVec*
>
> @returns *the size of the ByteVec*

---

### byteVecSlice

```Rust
fn byteVecSlice!(bytes:ByteVec, from:U256, until:U256) -> (ByteVec)
```

Selects an interval of bytes.

> @param **bytes** *a ByteVec*
>
> @param **from** *the lowest index to include from the ByteVec*
>
> @param **until** *the lowest index to exclude from the ByteVec*
>
> @returns *a ByteVec containing the elements greater than or equal to index from extending up to (but not including) index until of this ByteVec*

---

### encodeToByteVec

```Rust
fn encodeToByteVec!(...any) -> (ByteVec)
```

Encodes inputs as big-endian ByteVec.

> @param **any** *a sequence of input values*
>
> @returns *a ByteVec encoding the inputs*

---

## Cryptography Functions
---
### blake2b

```Rust
fn blake2b!(data:ByteVec) -> (ByteVec)
```

Computes the Blake2b-256 hash of the input.

> @param **data** *the input data to be hashed*
>
> @returns *the 32 bytes hash result*

---

### keccak256

```Rust
fn keccak256!(data:ByteVec) -> (ByteVec)
```

Computes the Keccak256 hash of the input.

> @param **data** *the input data to be hashed*
>
> @returns *the hash result*

---

### sha256

```Rust
fn sha256!(data:ByteVec) -> (ByteVec)
```

Computes the Sha256 hash of the input.

> @param **data** *the input data to be hashed*
>
> @returns *the hash result*

---

### sha3

```Rust
fn sha3!(data:ByteVec) -> (ByteVec)
```

Computes the Sha3 hash of the input.

> @param **data** *the input data to be hashed*
>
> @returns *the hash result*

---

### verifyTxSignature

```Rust
fn verifyTxSignature!(publicKey:ByteVec) -> ()
```

Verifies the transaction SecP256K1 signature of a public key. The signature is signed against the transaction id.

> @param **publicKey** *the public key (33 bytes) of the signer*
>
> @returns

---

### getSegregatedSignature

```Rust
fn getSegregatedSignature!() -> (ByteVec)
```

The segregated signature of the transaction

> @returns *the segregated signature of the transaction*

---

### verifySecP256K1

```Rust
fn verifySecP256K1!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the SecP256K1 signature of the input and public key.

> @param **data** *the data (32 bytes) that was supposed to have been signed*
>
> @param **publicKey** *the public key (33 bytes) of the signer*
>
> @param **signature** *the signature (64 bytes) value*
>
> @returns

---

### verifyED25519

```Rust
fn verifyED25519!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the ED25519 signature of the input and public key.

> @param **data** *the data (32 bytes) that was supposed to have been signed*
>
> @param **publicKey** *the public key (32 bytes) of the signer*
>
> @param **signature** *the signature value (64 bytes)*
>
> @returns

---

### verifyBIP340Schnorr

```Rust
fn verifyBIP340Schnorr!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the BIP340 Schnorr signature of the input and public key.

> @param **data** *the data (32 bytes) that was supposed to have been signed*
>
> @param **publicKey** *the public key (32 bytes) of the signer*
>
> @param **signature** *the signature value (64 bytes)*
>
> @returns

---

### ethEcRecover

```Rust
fn ethEcRecover!(data:ByteVec, signature:ByteVec) -> (ByteVec)
```

Recovers the ETH account that signed the data.

> @param **data** *the data that was supposed to have been signed*
>
> @param **signature** *the signature value*
>
> @returns *the ETH account that signed the data*

---

### verifySignature

```Rust
fn verifySignature!(data:ByteVec, publicKey:ByteVec, signature:ByteVec, publicKeyType:ByteVec) -> ()
```

(Deprecated) Verifies the signature of the input and public key. This function is deprecated, please use the other specific verify functions instead.

> @param **data** *the data that was supposed to have been signed*
>
> @param **publicKey** *the public key of the signer*
>
> @param **signature** *the signature value*
>
> @param **publicKeyType** *the type of the public key*
>
> @returns

---

### verifySecP256R1

```Rust
fn verifySecP256R1!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the SecP256R1 signature of the input data using the provided public key.

> @param **data** *the data (32 bytes) that was supposed to have been signed*
>
> @param **publicKey** *the public key (33 bytes) of the signer*
>
> @param **signature** *the signature value (64 bytes)*
>
> @returns

---

### verifyWebAuthn

```Rust
fn verifyWebAuthn!(challenge:ByteVec, publicKey:ByteVec, payload:ByteVec) -> ()
```

Verifies a WebAuthn signature for the input challenge using the provided public key.

> @param **challenge** *The challenge (32 bytes) in the webauthn client data that was supposed to have been signed*
>
> @param **publicKey** *the public key (33 bytes) of the signer*
>
> @param **payload** *the WebAuthn payload containing the signature and authenticator data*
>
> @returns

---

### getSegregatedWebAuthnSignature

```Rust
fn getSegregatedWebAuthnSignature!() -> (ByteVec)
```

Retrieves the segregated WebAuthn signature payload from the current transaction

> @returns *the segregated WebAuthn payload containing the signature and authenticator data*

---

## Test Functions
---
### testCheck

```Rust
fn testCheck!(condition:Bool) -> ()
```

Tests the condition or checks invariants.

> @param **condition** *the condition to be checked*
>
> @returns

---

### testEqual

```Rust
fn testEqual!(left: <Bool | U256 | I256 | Address | ByteVec>, right: <Bool | U256 | I256 | Address | ByteVec>) -> ()
```

Asserts that the given values are equal.

> @param **left** *the first value to compare*
>
> @param **right** *the second value to compare; must be the same type as `left`*
>
> @returns

---

### testFail

```Rust
fn testFail!(expr) -> ()
```

Asserts that the given expression throws an exception during execution.

> @param **expr** *the expression to be executed*
>
> @returns

---

### testError

```Rust
fn testError!(expr, errorCode: U256) -> ()
```

Asserts that the given expression throws an exception with the expected error code.

> @param **expr** *the expression to be executed*
>
> @param **errorCode** *the expected error code*
>
> @returns

---

### randomU256

```Rust
fn randomU256!() -> U256
```

Generates a random U256 value

> @returns *a randomly generated U256 value for testing purposes*

---

### randomI256

```Rust
fn randomI256!() -> I256
```

Generates a random I256 value

> @returns *a randomly generated I256 value for testing purposes*

---

