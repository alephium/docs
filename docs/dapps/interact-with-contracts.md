---
sidebar_position: 26
title: Interact with Contracts
sidebar_label: Interact with contracts
---

<UntranslatedPageText />

Alephium's full node provides a set of
[APIs](https://node.mainnet.alephium.org/docs/#/Contracts) to
interact with the deployed contracts. These interactions can be
divided into two categories depending on whether they intend to update
the state of the blockchain: *Contract calls* are read-only
interactions that are gas free, executed straight away with result
returned to the caller immediately. *TxScript transactions* on the
other hand update the blockchain state, require gas, get executed when
transactions are mined with only the transaction ids returned to the
caller.

Interacting with contracts directly through the full node API can be
tedious. Alephium's [Web3 SDK](/dapps/alephium-web3) abstracts away
many details by generating wrapper code for contracts and transaction
scripts. Let's demonstrate its usefulness using the
[TokenFaucet](https://github.com/alephium/nextjs-template/blob/main/contracts/token.ral)
contract discussed in the [Getting started](/dapps/getting-started)
guide:

<details>
<summary>token_faucet.ral</summary>
<p>

```rust
import "std/fungible_token_interface"

// Defines a contract named `TokenFaucet`.
// A contract is a collection of fields (its state) and functions.
// Once deployed, a contract resides at a specific address on the Alephium blockchain.
// Contract fields are permanently stored in contract storage.
// A contract can issue an initial amount of token at its deployment.
Contract TokenFaucet(
    symbol: ByteVec,
    name: ByteVec,
    decimals: U256,
    supply: U256,
    mut balance: U256
) implements IFungibleToken {

    // Events allow for logging of activities on the blockchain.
    // Alephium clients can listen to events in order to react to contract state changes.
    event Withdraw(to: Address, amount: U256)

    enum ErrorCodes {
        InvalidWithdrawAmount = 0
    }

    // A public function that returns the initial supply of the contract's token.
    // Note that the field must be initialized as the amount of the issued token.
    pub fn getTotalSupply() -> U256 {
        return supply
    }

    // A public function that returns the symbol of the token.
    pub fn getSymbol() -> ByteVec {
        return symbol
    }

    // A public function that returns the name of the token.
    pub fn getName() -> ByteVec {
        return name
    }

    // A public function that returns the decimals of the token.
    pub fn getDecimals() -> U256 {
        return decimals
    }

    // A public function that returns the current balance of the contract.
    pub fn balance() -> U256 {
        return balance
    }

    // A public function that transfers tokens to anyone who calls it.
    // The function is annotated with `updateFields = true` as it changes the contract fields.
    // The function is annotated as using contract assets as it does.
    @using(assetsInContract = true, updateFields = true, checkExternalCaller = false)
    pub fn withdraw(amount: U256) -> () {
        // Debug events can be helpful for error analysis
        emit Debug(`The current balance is ${balance}`)

        // Make sure the amount is valid
        assert!(amount <= 2, ErrorCodes.InvalidWithdrawAmount)
        // Functions postfixed with `!` are built-in functions.
        transferTokenFromSelf!(callerAddress!(), selfTokenId!(), amount)
        // Ralph does not allow underflow.
        balance = balance - amount

        // Emit the event defined earlier.
        emit Withdraw(callerAddress!(), amount)
    }
}
```
</p></details>

The `TokenFaucet` contract has `5` public functions that only reads
the contract states: `getTotalSupply`, `getSymbol`, `getName`,
`getDecimals` and `balance`. It also has a function called `withdraw`,
which not only updates the contract state, but also transfers assets.

After `TokenFaucet` contract is
[compiled](/dapps/getting-started#compile-your-contract), a
corresponding Typescript class is generated. We can get an instance of
this class after deploying it to devnet:

```typescript
import { DUST_AMOUNT } from '@alephium/web3'
import { getSigner } from '@alephium/web3-test'
import { TokenFaucet, TokenFaucetTypes, Withdraw } from '../artifacts/ts'

const signer = await getSigner()
const deployResult = await TokenFaucet.deploy(signer, {
  initialFields: {
    symbol: stringToHex('TF'),
    name: stringToHex('TokenFaucet'),
    decimals: 18n,
    supply: 10n ** 18n,
    balance: 10n
  }
})

const tokenFaucet = deployResult.contractInstance
```

## Contract Call

Inside of the `TokenFaucet` typescript class, Alephium SDK generates
methods for all of the pure functions in the `TokenFaucet`
contract. They can be called just like regular typescript functions:

```typescript
const getNameResult = await tokenFaucet.methods.getName()
console.log(`name: ${hexToString(getNameResult.returns)}`)  // name: TokenFaucet

const getDecimalsResult = await tokenFaucet.methods.getDecimals()
console.log(`decimals: ${getDecimalsResult.returns)}`)      // decimals: 18
```

Note that results of the contract calls are returned immediately and
there is no gas or signatures required.

Alephium SDK also generates code for calling multiple pure
functions at the same time, reducing the number of network requests:

```typescript
const result = await tokenFaucet.multicall({
  getSymbol: {},
  getName: {},
  getDecimals: {},
  getTotalSupply: {}
})

console.log(`name: ${hexToString(result.getName.returns)}`)       // name: TokenFaucet
console.log(`symbol: ${hexToString(result.getSymbol.returns)}`)   // symbol: TF
console.log(`decimals: ${result.getDecimals.returns}`)            // decimals: 18
console.log(`total supply: ${result.getTotalSupply.returns}`)     // total supply: 10
```

## TxScript Transactions

`TokenFaucet` contract also has a function called `withdraw`, which
transfers the token from the faucet to the caller and updates the
balance. When calling `withdraw` function we'll need to execute it as
a transaction using TxScript:

```rust
TxScript Withdraw(token: TokenFaucet, amount: U256) {
    // Call token contract's withdraw function.
    token.withdraw(amount)
}
```

Alephium's SDK also generates a corresponding typescript class for the
`Withdraw` transaction script after
[compilation](/dapps/getting-started#compile-your-contract), which we
can use execute the transaction:

```typescript
const signer = await getSigner()
const withdrawResult = await Withdraw.execute(signer, {
  initialFields: { token: tokenFaucet.contractId, amount: 2n },
  attoAlphAmount: DUST_AMOUNT * 2n
})
console.log(`tx id: ${withdrawResult.txId}`)  // tx id: xxxx
```

We pass in the `initialFields` as defined in the `Withdraw` transaction
script, and enough `attoAlphAmount` for covering the gas as well as the [dust
amount](/dapps/dust-amounts) for receiving tokens.

Note that a `signer` is required to sign the transaction. The
execution result of the `Withdraw` script contains a transaction id,
which can be used to query the status of the transaction later. Some
other useful information in the execution result include:

- `unsignedTx`: Serialized version of unsigned transaction
- `signature`: Signer's signature for the transaction
- `gasAmount`: Gas cost of the transaction

Function executed from `TxScript` can not return value to the caller
directly because the transaction will be processed later and the result is
non-deterministic depending on the future state of the blockchain when
the transaction is mined. `Events` are instead often used to gain insights
into the contract activities.

## Events Subscription

The `withdraw` function for `TokenFaucet` contract emits a `Withdraw`
event, which contains the recipient and amount of the withdrawn token.

```rust
emit Withdraw(callerAddress!(), amount)
```

Events like this are very useful for dApps to track contract
activities. Alephium's [Web3 SDK](/dapps/alephium-web3) provides a set
of functions to interact with contract's events, here is how we can
subscribe to the `Withdraw` event emitted from the `withdraw` function
in `TokenFaucet` contract:


```typescript
// Subscribe to the `Withdraw` event in
tokenFaucet.subscribeWithdrawEvent({
  pollingInterval: 500,
  messageCallback: (event: TokenFaucetTypes.WithdrawEvent): Promise<void> => {
    console.log('got withdraw event:', event)
    return Promise.resolve()
  },
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
})
```

If there are more than one events emitted from the `TokenFaucet`
contract, a function called `subscribeAllEvents` will also be
generated to subscribe to all events emitted from the contract.

## Further Reading

Alephium's [Web3 SDK](/dapps/alephium-web3) builds developer friendly
abstractions on top of Alephium's full node APIs. For more details
about the APIs please refer to the [OpenAPI
Documentation](https://node.mainnet.alephium.org/docs).

Please read a more detailed explanation about `TxScript`
[here](/dapps/programming-model#txscript), a unique feature in
Alephium that is a more flexible and efficient way of creating
transactions that interact with smart contracts.

Events are crucial to build dApps, more information can be found
[here](/dapps/events). 
