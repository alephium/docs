# Ralph Language Reference
A reference for the Ralph smart contract language.

The following documentation is derived from the alephium/alephium source code.

**It could become out of date at any time**, so double-check with other developers
if you think something has changed, and if it has, [fork this wiki](git@github.com:alephium/wiki.git)
and [open a PR](https://github.com/alephium/wiki/compare)!

## Notation used in this document

`<thing>` just means you replace it with the appropriately described text. For
example, `<number>` means type a literal number value: 6, 7, 44, etc.

`[thing]` means the text is optional unless otherwise specified (like array syntax).

## Types, their constructors, and a few other things

* Empty / Nothing
  * `()`
* Bool
  * `false, true`
* I256
  * `<number>i, -<number>`
* U256
  * `<number>u,  <number>`
* Address
  * `@<address>`
* ByteVec
  * `#<hex-string>`
* `[<type>; <size>]` for a fixed array
  * Example: `[Address; 6]` for 6 addresses
* Comment
  * `//`
* Variable
  * `let <name> = ...`

**Ralph does not use semi-colons!** It can be easy to accidentally add them due
to muscle memory.

## General program structure

```
// To create a contract:
TxContract ContractName([mut] arg1: <type>, [mut] arg2: <type>, ...etc) {
  [pub] [payable] fn functionName(arg1: <type>, ...etc) -> (<return type>) {
    return <thing>
  }
}

// To invoke the contract:
TxScript ScriptNameCanBeAnything {
  // Note this signature. It must be just like this.
  [pub] [payable] fn main() -> () {
    contract = ContractName(#<contract-id>)
    result = contract.functionName(arg)
    anotherFunc()
  }
  
  fn anotherFunc() -> () {
    ...
  }
}
```

`payable` means the function can use [stateful functions](#stateful-functions)
that modify the contract / script state.

`pub` means the function can be called outside the contract / script.

You can call contract methods right after the contract constructor, i.e.
`ContractName(...).function()`.
 
## Built-in functions

There are two types of functions: stateless and stateful.

The former are just pure functions: they take inputs and give the same outputs
every time.

The latter will access contract state, which can cause the output to be
different each time, or it will modify the contract state.

When you see `!` it means the function is built-in to Ralph.

### Stateless functions

* `blake2b!(input: ByteVec) -> (ByteVec)`
* `keccak256!(input: ByteVec) -> (ByteVec)`
* `sha256!(input: ByteVec) -> (ByteVec)`
* `sha3!(input: ByteVec) -> (ByteVec)`
* `assert!(input: Bool) -> ()`
* `verifyTxSignature!(signature: ByteVec) -> ()`
* `verifySecP256K1!(input: ByteVec, publicKey: ByteVec, signature: ByteVec) -> ()`
* `verifyED25519!(input: ByteVec, publicKey: ByteVec, signature: ByteVec) -> ()`
* `networkId!() -> (ByteVec)`
* `blockTimeStamp!() -> (U256)`
* `blockTarget!() -> (U256)`
* `txId!() -> (ByteVec)`
* `txCaller!(txHash: U256) -> (Address)`
* `txCallerSize!(txHash: U256) -> (U256)`
* `verifyAbsoluteLocktime!(unixTimestampMillis: U256) -> ()`
* `verifyRelativeLocktime!(txHash: U256, timestampMillisRelative: U256) -> ()`
* `toI256!(input: U256) -> (I256)`
* `toU256!(input: I256) -> (U256)`
* `toByteVec!(input: (Bool|I256|U256|Address)) -> (ByteVec)`
* `size!(input: ByteVec) -> (U256)`
* `isAssetAddress!(input: Address) -> (Bool)`
* `isContractAddres!(input: Address) -> (Bool)`

### Stateful functions

* `approveAlph!(forAddress: Address, amount: U256)) -> ()`
* `approveToken!(forAddress: Address, tokenId: ByteVec, amount:U256)) -> ()`
* `alphRemaining!(address: Address) -> (U256)`
* `tokenRemaining!(address: Address, tokenId: ByteVec) -> (U256)`
* `isPaying!(address: Address) -> (Bool)`
* `transferAlph!(from: Address, to: Address, amount: U256) -> ()`
* `transferAlphFromSelf!(toBeneficiary: Address, amount: U256) -> ()`
* `transferAlphToSelf!(fromBeneficiary: Address, amount: U256) -> ()`
  * From what I understand, this pair of `transferAlph` functions are useful to avoid accidentally sending or receiving money to another address.
* `transferToken!(from: Address, to: Address, tokenId: ByteVec, amount: U256) -> ()`
* `transferTokenFromSelf!(toBeneficiary: Address, tokenId: ByteVec, amount: U256) -> ()`
* `transferTokenToSelf!(fromBeneficiary: Address, tokenId: ByteVec, amount: U256) -> ()`
  `* Same usage as the other pair of `transferAlph` functions.`
* `createContract!(codeCompiled: ByteVec, state: ByteVec) -> ()`
* `createContractWithToken!(codeCompiled: ByteVec, state: ByteVec, tokenAmount: U256) -> ()`
  * `state` is the state as its passed to the build-contract endpoint.
* `copyCreateContract!(contractId: ByteVec, state: ByteVec) -> ()`
* `copyCreateContractWithToken!(contractId: ByteVec, state: ByteVec, tokenAmount: U256) -> ()`
* `destroySelf!(address: Address) -> ()`
* `selfAddress!() -> (Address)`
* `selfContractId!() -> (ByteVec)`
* `selfTokenId!() -> (ByteVec)`
* `callerContractId!() -> (ByteVec)`
* `callerAddress!() -> (Address)`
* `isCalledFromTxScript!() -> (Bool)`
* `callerInitialStateHash!() -> (ByteVec)`
* `callerCodeHash!() -> (ByteVec)`
* `contractInitialStateHash!(contractId: ByteVec) -> (ByteVec)`
* `contractCodeHash!() -> (contractId: ByteVec) -> (ByteVec)`

