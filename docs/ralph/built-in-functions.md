---
sidebar_position: 20
title: Built-in functions
---

<!---
This file is auto-generated with "scripts/generate-builtin-functions.js"
-->

The built-in functions are divided into several categories:
[Contract](#contract-functions),
[SubContract](#subcontract-functions),
[Asset](#asset-functions),
[Utils](#utils-functions),
[Chain](#chain-functions),
[Conversion](#conversion-functions),
[ByteVec](#bytevec-functions),
[Cryptography](#cryptography-functions).
All built-in functions are suffixed with `!`.

## Contract Functions
---
### createContract

```Rust
fn createContract!(bytecode:ByteVec, encodedFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance.

> @param **bytecode** *the bytecode of the contract to be created*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### createContractWithToken

```Rust
fn createContractWithToken!(bytecode:ByteVec, encodedFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance.

> @param **bytecode** *the bytecode of the contract to be created*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### copyCreateContract

```Rust
fn copyCreateContract!(contractId:ByteVec, encodedFields:ByteVec) -> (ByteVec)
```

Creates a new contract without token issuance by copying another contract's code. This costs less gas than createContract!(...).

> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### copyCreateContractWithToken

```Rust
fn copyCreateContractWithToken!(contractId:ByteVec, encodedFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new contract with token issuance by copying another contract's code. This costs less gas than createContractWithToken!(...).

> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
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

### callerContractId

```Rust
fn callerContractId!() -> (ByteVec)
```

Returns the contract id of the caller.

> @returns *the contract id of the caller*

---

### callerAddress

```Rust
fn callerAddress!() -> (Address)
```

Returns the address of the caller.

> @returns *the address of the caller*

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

Destroys the contract and transfer the remaining assets to a designated address.

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
fn migrateWithFields!(newBytecode:ByteVec, newEncodedFields:ByteVec) -> ()
```

Migrates both the code and the fields of the contract.

> @param **newBytecode** *the bytecode for the contract to migrate to*
>
> @param **newEncodedFields** *the new fields for the contract to migrate to*
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

## SubContract Functions
---
### createSubContract

```Rust
fn createSubContract!(subContractPath:ByteVec, bytecode:ByteVec, encodedFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance.

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **bytecode** *the bytecode of the sub-contract to be created*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### createSubContractWithToken

```Rust
fn createSubContractWithToken!(subContractPath:ByteVec, bytecode:ByteVec, encodedFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance.

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **bytecode** *the bytecode of the sub-contract to be created*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @param **issueTokenAmount** *the amount of token to be issued*
>
> @param **issueTo** *(optional) a designated address to receive issued token*
>
> @returns *the id of the created contract*

---

### copyCreateSubContract

```Rust
fn copyCreateSubContract!(subContractPath:ByteVec, contractId:ByteVec, encodedFields:ByteVec) -> (ByteVec)
```

Creates a new sub-contract without token issuance by copying another contract's code. This costs less gas than createSubContract!(...).

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
>
> @returns *the id of the created contract*

---

### copyCreateSubContractWithToken

```Rust
fn copyCreateSubContractWithToken!(subContractPath:ByteVec, contractId:ByteVec, encodedFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Creates a new sub-contract with token issuance by copying another contract's code. This costs less gas than createSubContractWithToken!(...).

> @param **subContractPath** *the path of the sub-contract to be created*
>
> @param **contractId** *the id of the contract to be copied*
>
> @param **encodedFields** *the encoded fields as a ByteVec*
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

## Asset Functions
---
### approveAlph

```Rust
fn approveAlph!(fromAddress:Address, amount:U256) -> ()
```

Approves the usage of certain amount of ALPH from the given address

> @param **fromAddress** *the address to approve ALPH from*
>
> @param **amount** *the amount of attoALPH to be approved*
>
> @returns

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

### alphRemaining

```Rust
fn alphRemaining!(address:Address) -> (U256)
```

Returns the amount of the remaining ALPH for an address.

> @param **address** *the input address*
>
> @returns *the amount of the remaining ALPH for an address*

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

### transferAlph

```Rust
fn transferAlph!(fromAddress:Address, toAddress:Address, amount:U256) -> ()
```

Transfers certain amount of ALPH from one address to another

> @param **fromAddress** *the address to transfer ALPH from*
>
> @param **toAddress** *the address to transfer ALPH to*
>
> @param **amount** *the amount of attoALPH to be transferred*
>
> @returns

---

### transferAlphFromSelf

```Rust
fn transferAlphFromSelf!(toAddress:Address, amount:U256) -> ()
```

Transfers the contract's ALPH from the input assets of the function.

> @param **toAddress** *the address to transfer ALPH to*
>
> @param **amount** *the amount of attoALPH to be transferred*
>
> @returns

---

### transferAlphToSelf

```Rust
fn transferAlphToSelf!(fromAddress:Address, amount:U256) -> ()
```

Transfers ALPH to the contract from the input asset of the function.

> @param **fromAddress** *the address to transfer ALPH from*
>
> @param **amount** *the amount of attoALPH to be transferred*
>
> @returns

---

### transferToken

```Rust
fn transferToken!(fromAddress:Address, toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Transfers token from the input assets of the function.

> @param **fromAddress** *the address to transfer ALPH from*
>
> @param **toAddress** *the address to transfer ALPH to*
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

Transfers the contract's token from the input assets of the function.

> @param **toAddress** *the address to transfer ALPH to*
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

Transfers token to the contract from the input assets of the function.

> @param **fromAddress** *the address to transfer ALPH from*
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
> @returns *true if the condition is satisfied, false otherwise*

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

### nullContractAddress

```Rust
fn nullContractAddress!() -> (Address)
```

Returns the null contract address with contract id being zeros.

> @returns *the null contract address with contract id being zeros*

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

### blockHash

```Rust
fn blockHash!() -> (ByteVec)
```

Returns the block hash of the current block.

> @returns *the block hash of the current block*

---

### blockTimeStamp

```Rust
fn blockTimeStamp!() -> (U256)
```

Returns the block timestamp.

> @returns *the block timestamp*

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

### verifyAbsoluteLocktime

```Rust
fn verifyAbsoluteLocktime!(lockUntil:U256) -> ()
```

Verifies the absolute locktime with the block timestamp.

> @param **lockUntil** *the timestamp until which the lock is valid*
>
> @returns *true if the lock timestamp is before the block timestamp, false otherwise*

---

### verifyRelativeLocktime

```Rust
fn verifyRelativeLocktime!(txInputIndex:U256, lockDuration:U256) -> ()
```

Verifies the relative locktime for transaction input.

> @param **txInputIndex** *the index of the transaction input*
>
> @param **lockDuration** *the duration that the input is locked for*
>
> @returns *true if the input's creation timestamp + lock duration is before the block timestamp, false otherwise*

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

Converts U256 to 2 bytes.

> @param **u256** *the input U256*
>
> @returns *2 bytes*

---

### u256To4Byte

```Rust
fn u256To4Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 4 bytes.

> @param **u256** *the input U256*
>
> @returns *4 bytes*

---

### u256To8Byte

```Rust
fn u256To8Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 8 bytes.

> @param **u256** *the input U256*
>
> @returns *8 bytes*

---

### u256To16Byte

```Rust
fn u256To16Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 16 bytes.

> @param **u256** *the input U256*
>
> @returns *16 bytes*

---

### u256To32Byte

```Rust
fn u256To32Byte!(u256:U256) -> (ByteVec)
```

Converts U256 to 32 bytes.

> @param **u256** *the input U256*
>
> @returns *32 bytes*

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

Converts 2 byte to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From4Byte

```Rust
fn u256From4Byte!(bytes:ByteVec) -> (U256)
```

Converts 4 byte to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From8Byte

```Rust
fn u256From8Byte!(bytes:ByteVec) -> (U256)
```

Converts 8 byte to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From16Byte

```Rust
fn u256From16Byte!(bytes:ByteVec) -> (U256)
```

Converts 16 byte to U256.

> @param **bytes** *the input ByteVec*
>
> @returns *an U256*

---

### u256From32Byte

```Rust
fn u256From32Byte!(bytes:ByteVec) -> (U256)
```

Converts 32 byte to U256.

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

Encodes inputs as ByteVec.

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

Computes the Blake2b hash of the input.

> @param **data** *the input data to be hashed*
>
> @returns *the hash result*

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

Verifies the transaction signature of a public key. The signature is signed against the transaction id.

> @param **publicKey** *the public key of the signer*
>
> @returns *true if the signature is valid, false otherwise*

---

### verifySecP256K1

```Rust
fn verifySecP256K1!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the SecP256K1 signature of the input and public key.

> @param **data** *the data that was supposed to have been signed*
>
> @param **publicKey** *the public key of the signer*
>
> @param **signature** *the signature value*
>
> @returns *true if the signature is valid, false otherwise*

---

### verifyED25519

```Rust
fn verifyED25519!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Verifies the ED25519 signature of the input and public key.

> @param **data** *the data that was supposed to have been signed*
>
> @param **publicKey** *the public key of the signer*
>
> @param **signature** *the signature value*
>
> @returns *true if the signature is valid, false otherwise*

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

