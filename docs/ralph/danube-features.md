---
sidebar_position: 100
title: Danube Features
sidebar_label: Danube Features
---

The Danube upgrade introduced several new features to the Ralph language to improve its developer experience. This section aims to help you understand these new features with code examples.

### Minimal UTXO Amounts

In Alephium, minimal UTXO amount is important to maintain the sustainability of the network by preventing the creation of tiny, uneconomical outputs that can bloat the state of the blockchain.

For regular UTXOs, the minimal amount is called dust amount (0.001 ALPH). For contract UTXOs, it's called minimal contract deposit (0.1 ALPH). Since maps in Ralph is implemented via sub-contracts, each new map entry requires map entry deposit, which has the same value as minimal contract deposit (0.1 ALPH).

While minimal UTXO amounts are necessary for network sustainability, they previously created friction for developers. The Danube upgrade simplifies this by handling them automatically by default.

#### Dust Amount

When a dApp transfers an asset to a recipient, it must ensure that the recipient's UTXO contains at least the `dustAmount!()` of ALPH.

In the `DustAmounts` contract below, the `transferBeforeDanube` function demonstrates how token transfers worked before Danube. It transfers one token to the recipient while also sending the required `dustAmount!()` of ALPH. Without this explicit ALPH transfer, the transaction would fail because recipient's UTXO must contain the minimum dust amount.

In the `transferAfterDanube` function, the explicit transfer of `dustAmount!()` is no longer necessary. The transaction caller will automatically cover the dust amount for the recipient. This change also eliminates the need for the `preapprovedAssets = true` annotation.

```rust
Contract DustAmounts() {
    @using(preapprovedAssets = true, assetsInContract = true, checkExternalCaller = false)
    pub fn transferBeforeDanube(recipient: Address) -> () {
      transferTokenFromSelf!(recipient, selfTokenId!(), 1)
      transferToken!(callerAddress!(), recipient, ALPH, dustAmount!())
    }

    @using(assetsInContract = true, checkExternalCaller = false)
    pub fn transferAfterDanube(recipient: Address) -> () {
      transferTokenFromSelf!(recipient, selfTokenId!(), 1)
    }
}
```

#### Contract Deposit

Before the Danube upgrade, dApp developers had to explicitly specify who would pay for the minimal contract deposit when creating a contract. For example, in the `createBeforeDanube` function below, the transaction caller approves the `minimalContractDeposit!()` amount of ALPH to create the contract.

In contrast, the `createAfterDanube` function demonstrates how this process has been simplified after the Danube upgrade. The VM now automatically deducts the required contract deposit from the transaction caller if no explicit asset approval is specified. It also eliminates the need for the `preapprovedAssets = true` annotation that was previously required in the `createBeforeDanube` function, making contract creation more straightforward for developers.

```rust
Contract ContractDeposits() {
    @using(preapprovedAssets = true, checkExternalCaller = false)
    pub fn createBeforeDanube(bytecode: ByteVec) -> () {
      let _ = createContract!{callerAddress!() -> ALPH: minimalContractDeposit!()}(bytecode, #00, #00)
    }

    @using(checkExternalCaller = false)
    pub fn createAfterDanube(bytecode: ByteVec) -> () {
        let _ = createContract!(bytecode, #00, #00)
    }
}
```

#### Map Entry Deposit

Maps in Alephium are implemented using sub-contracts, with each map entry requiring `mapEntryDeposit!()` of ALPH to prevent state bloat. Before the Danube upgrade, developers had to explicitly specify who would pay this deposit when creating a new map entry. After the Danube upgrade, this process is simplified as the deposit is automatically deducted from the transaction caller if not specified explicitly.

When removing map entries before Danube, developers needed to specify a refund address for the map entry deposit. After Danube, this deposit is automatically refunded to the transaction caller when no refund address is specified.

Here is an example to demonstrate the difference:

```rust
Contract MapEntryDeposits() {
    mapping[U256, U256] map

    @using(preapprovedAssets = true, checkExternalCaller = false, updateFields = true)
    pub fn insertBeforeDanube(key: U256, value: U256) -> () {
      map.insert!(callerAddress!(), key, value)
    }

    @using(checkExternalCaller = false, updateFields = true)
    pub fn removeBeforeDanube(key: U256) -> () {
      map.remove!(callerAddress!(), key)
    }

    @using(checkExternalCaller = false, updateFields = true)
    pub fn insertAfterDanube(key: U256, value: U256) -> () {
        map.insert!(key, value)
    }

    @using(checkExternalCaller = false, updateFields = true)
    pub fn removeAfterDanube(key: U256) -> () {
      map.remove!(key)
    }
}
```

The effect of calling `insertBeforeDanube` and `removeBeforeDanube` is the same as `insertAfterDanube` and `removeAfterDanube`.

### Chained Transaction in TxScript

Alephium follows the stateful UTXO (sUTXO) model, where transaction outputs created within a transaction cannot be spent in the same transaction. This design provides important security benefits. For example flashloans are disabled by default because assets cannot be borrowed and returned within the same transaction.

After the Danube upgrade, this limitation is relaxed in TxScript, which can now call multiple contracts and chain the asset outputs. This enhancement improves composability and enables more sophisticated contract interactions, allowing developers to build more complex dApps and DeFi protocols.

There are a few things worth emphasizing here:

- TxScript can only chain the asset outputs from the contract call, contract output cannot be chained
- At the contract level, the same UTXO restrictions still apply, preserving the security properties of the UTXO model

Here's an example of using chained transactions in a TxScript to perform token swaps across multiple liquidity pools in a single transaction:

```rust
Contract Swap(tokenId1: ByteVec, tokenId2: ByteVec, mut token1Reserve: U256, mut token2Reserve: U256) {
    @using(preapprovedAssets = true, assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn addLiquidity(lp: Address, token1Amount: U256, token2Amount: U256) -> () {
        transferTokenToSelf!(lp, tokenId1, token1Amount)
        transferTokenToSelf!(lp, tokenId2, token2Amount)
        token1Reserve = token1Reserve + token1Amount
        token2Reserve = token2Reserve + token2Amount
    }

    @using(preapprovedAssets = true, assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn swap(buyer: Address, tokenId: ByteVec, tokenAmount: U256) -> () {
        assert!(tokenId == tokenId1 || tokenId == tokenId2, 0)

        if (tokenId == tokenId1) {
            let token1Amount = tokenAmount
            let token2Amount = token2Reserve - token1Reserve * token2Reserve / (token1Reserve + token1Amount)
            transferTokenToSelf!(buyer, tokenId1, token1Amount)
            transferTokenFromSelf!(buyer, tokenId2, token2Amount)
            token1Reserve = token1Reserve + token1Amount
            token2Reserve = token2Reserve - token2Amount
        } else {
            let token2Amount = tokenAmount
            let token1Amount = token1Reserve - token1Reserve * token2Reserve / (token2Reserve + token2Amount)
            transferTokenToSelf!(buyer, tokenId2, token2Amount)
            transferTokenFromSelf!(buyer, tokenId1, token1Amount)
            token1Reserve = token1Reserve + token1Amount
            token2Reserve = token2Reserve - token2Amount
        }
    }
}

TxScript ChainedSwapToken(tokenPair12: Swap, tokenPair23: Swap, token1: ByteVec, token2: ByteVec) {
    let caller = callerAddress!()
    tokenPair12.swap{caller -> token1: 5}(caller, token1, 5)
    tokenPair23.swap{caller -> token2: 5}(caller, token2, 5)
}
```

In the example above, the TxScript `ChainedSwapToken` performs two swap operations in sequence. First, it swaps `token1` for `token2` using the `tokenPair12` swap contract, and then it uses the received `token2` to swap for `token3` using the `tokenPair23` swap contract. This chaining of asset outputs would not be possible before the Danube upgrade, as the tokens received from the first swap would not be available for use in the second swap within the same transaction.

### Caller Address

The ability to determine the caller of a function is important for implementing proper access control and security measures in smart contracts. Before the Danube upgrade, there are two built-in functions to determine the function caller: `callerAddress!()` and `callerContractId!()`.

`callerAddress!()` works in the following ways:

1. Return the transaction caller when called in a TxScript or a contract function directly called by TxScript
2. Return the address of the calling contract when called in a contract function that is not called by the TxScript

`callerContractId!()` fails in scenario 1 (no calling contract) but works exactly like `callerAddress!()` in scenario 2, except that it returns the contract ID instead of the address of the calling contract.

Despite being very useful, there are two limitations with how these two built-in functions work:

First, when a function calls another function within the same contract, `callerAddress!()` in the called function returns the contract's own address, not the external caller's address. This limits dApps that need to identify the external caller, whether its is a user or another contract.

Second, in a chain of function calls, `callerAddress!()` only returns the immediate caller. However, functions sometimes need to preserve the identity of the caller. This is particularly useful for contracts implementing the routing patterns where maintaining the identity of the original caller is essential for proper access control and authorization.

The Danube upgrade provides solutions to address both of these limitations.

#### External Caller Address


The Danube upgrade introduces the `externalCallerAddress!()` and `externalCallerContractId!()` built-in functions. These two functions return the address and contract ID of the first external caller from outside the current contract, regardless of how many internal function calls have occurred.

The following example demonstrates how `externalCallerAddress!()` works, `externalCallerContractId!()` works in a similar way:

```rust
Contract ExternalContract(internal: InternalContract) {
    pub fn callInternal() -> (Address, Address) {
        return internal.call()
    }
}

Contract InternalContract() {
    pub fn call() -> (Address, Address) {
        return internalCall()
    }

    fn internalCall() -> (Address, Address) {
        return callerAddress!(), externalCallerAddress!()
    }
}
```

When the `callInternal` function from the `ExternalContract` is called, the returned tuple contains two addresses: First, the address of the `InternalContract` (returned by `callerAddress!()`) because it's the immediate caller of the `internalCall` function. Second, the address of the `ExternalContract` (returned by `externalCallerAddress!()`) because it's the first external caller outside of the current contract.

#### PreserveCaller Function Annotation

The Danube upgrade introduces the `@preserveCaller` function annotation. When a function is annotated with `@preserveCaller`, the caller information is preserved for the next function call in the chain.

More specifically, if a `@preserveCaller` annotated function calls another function, the `callerAddress!()` in the called function will return the caller address of the annotated function rather than its immediate caller. This feature is particularly valuable for implementing routing patterns in smart contracts, where maintaining the identity of the original caller is essential for proper access control and authorization.

Here's an example of how `@preserveCaller` works:

```rust
Contract PreserveCaller(internal: PreserveCallerInternal) {
    pub fn default() -> Address {
        return internal.call()
    }

    @using(preserveCaller = true)
    pub fn preserveCaller() -> Address {
        return internal.call()
    }
}

Contract PreserveCallerInternal() {
    pub fn call() -> Address {
        return callerAddress!()
    }
}
```

When `PreserveCaller.default` is called, it returns the address of the `PreserveCaller` contract since that's the immediate caller of `PreserveCallerInternal.call()`. However, when `PreserveCaller.preserveCaller` is called from a TxScript, it returns the address of the transaction caller instead, because the `@preserveCaller` annotation passes the information of its caller to the next function in the call chain.

### Syntax Improvements

Danube also improves the Ralph syntax to make it more developer friendly, as demonstrated by the examples below:

```rust
Contract SyntaxImprovements() {
    pub fn ifStmts(x: U256, y: U256) -> U256 {
        let num1 = if (x > y) 1 else 0
        let num2 = if x > y 1 else 0
        let num3 = if x > y { log(x) 1 } else { log(x) 0 }
        return num1 + num2 + num3
    }

    fn log(v: U256) -> () {
        emit Debug(`value: ${v}`)
    }

    pub fn returnWithoutParentheses() -> (U256, Address) {
        return 1, callerAddress!()
    }

    pub fn returnWithParentheses() -> (U256, Address) {
        return (1, callerAddress!())
    }
}
```

If statements support both parenthesized and non-parenthesized conditions, as well as both block-style and expression-style branches. This makes the code more concise and easier to read. Additionally, in the block-style branches, you can include multiple statements (e.g. `log` function) followed by the expression that becomes the result of the if statement.

The `return` statement now supports both parenthesized and non-parenthesized tuple returns.