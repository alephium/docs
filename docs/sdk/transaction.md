---
sidebar_position: 10
title: Work with Transaction
sidebar_label: Work with transaction
---

Transaction is one of the most important data structures on
Alephium. We can observe some of Alephium's unique designs and
features through the lens of transactions.

Alephium leverages the [sUTXO](/misc/content/#stateful-utxo) model.
The transaction data structure contains inputs and outputs just as
other UTXO based blockchains. What's unique is that Alephium's
transaction output has a `tokens` field which is able to store and
transfer tokens natively. Alephium's transaction data structure also
has an optional `scriptOpt` field which contains the bytecode that can
be executed by the [VM](/misc/content/#alphred-virtual-machine) to
interact with the contracts.

An *unsigned transaction* consists of the following attributes:

```
version      : Version of the transaction, allows for further evolution of the transaction data structure
networkId    : Intended network for the transaction, e.g. `Mainnet`, `Testnet`, `Devnet`
scriptOpt    : (Optional) script bytecode to be executed by the VM to interact with the contracts
gasAmount    : Amount of gas that the transaction can consume
gasPrice     : Price per unit of gas that the sender is willing to pay
inputs       : References to the transaction outputs to be spent and the corresponding unlocking scripts
fixedOutputs : New transaction outputs created by the transaction
```

Other than the `fixedOutputs`, if a transaction executes the script,
it could potentially generate more transaction outputs as well. Script
might also require contract inputs if it takes assets from the
contracts during its execution.

Before an unsigned transaction can be submitted to the network, it
needs to be executed and signed. A *signed transaction* consists of
the following attributes:

```
unsigned          : Serialized version of the unsigned transaction
scriptExecutionOk : Whether the transaction script is executed successfully
contractInputs    : Contract inputs required during the script execution
generatedOutputs  : Transaction outputs generated during the script execution
inputSignatures   : Signatures required for spending the inputs in the unsigned transaction
scriptSignatures  : Signatures required during the script execution
```

In the following sections, we will learn how to build, sign, submit,
query and decode transactions.

## Build Unsigned Transaction

You can use `TransactionBuilder` in [Typescript
SDK](./getting-started) to build unsigned transactions. Before you
start, it requires both your address and its corresponding public
key. If you have a private key, you can obtain the public key using
the following method:

```typescript
import { publicKeyFromPrivateKey } from '@alephium/web3'

const publicKey = publicKeyFromPrivateKey('your-private-key')
```

You can also export the public key from your [extension wallet](/wallet/extension-wallet/getting-started#edit-account) or [desktop wallet](/wallet/desktop-wallet/getting-started.md#5-export-public-key-and-private-key).

### Transfer Transaction

In the following example, we build an unsigned transaction that transfers
`ONE_ALPH` to the `receiverAddress`:

```typescript
import { TransactionBuilder } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:22973'
const builder = TransactionBuilder.from(nodeUrl)
const senderAddress = '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH'
const senderPublicKey = '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0'
const receiverAddress = '1FsroWmeJPBhcPiUr37pWXdojRBe6jdey9uukEXk1TheA'
const buildTxResult = await builder.buildTransferTx(
  {
    signerAddress: senderAddress,
    destinations: [{
      address: receiverAddress,
      attoAlphAmount: ONE_ALPH
    }]
  },
  senderPublicKey
)
console.log('unsigned transaction', buildTxResult.unsignedTx)
```

You can also use `builtTransferTx` to build a token transfer transaction:

```typescript
import { DUST_AMOUNT } from '@alephium/web3'

const buildTxResult = await builder.buildTransferTx(
  {
    signerAddress: senderAddress,
    destinations: [{
      address: receiverAddress,
      attoAlphAmount: DUST_AMOUNT,
      tokens: [{
        id: '19246e8c2899bc258a1156e08466e3cdd3323da756d8a543c7fc911847b96f00',
        amount: 1000000000000000000n
      }]
    }]
  },
  senderPublicKey
)
console.log('unsigned transaction', buildTxResult.unsignedTx)
```

### Execute Script Transaction

Let's build an unsigned transaction to execute a transaction script.

Once your `TxScript` is [compiled](/dapps/tutorials/quick-start#compile-your-contract), its
bytecode can be returned by calling the
[buildByteCodeToDeploy](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/contract/contract.ts#L712-L719)
function. For instance, consider the following `TxScript`:

```
TxScript LockAlph(amount: U256) {
   let caller = callerAddress!()
   lockApprovedAssets!{caller -> ALPH: amount}(caller, blockTimeStamp!() + 86400000)
}
```

You can obtain the bytecode of `LockAlph` by:

```typescript
const bytecode = LockAlph.script.buildByteCodeToDeploy({ amount: ONE_ALPH })
```

After obtaining the bytecode for your `TxScript`, you can create an
unsigned transaction as follows:

```typescript
const senderAddress = '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH'
const senderPublicKey = '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0'
const bytecode = '0101030001000ab41700160013c40de0b6b3a7640000a21600561385265c002abe'
const buildTxResult = await builder.buildExecuteScriptTx(
  {
    signerAddress: account.address,
    bytecode
  },
  senderPublicKey
)
console.log('unsigned transaction', buildTxResult.unsignedTx)
```

### Deploy Contract Transaction

We can also build an unsigned transaction that deploys a contract. After your contract is
[compiled](/dapps/tutorials/quick-start#compile-your-contract), you
can obtain the bytecode to deploy it using the [Contract.buildByteCodeToDeploy](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/contract/contract.ts#L550-L561)
function. The following example assumes the `bytecode` is already created:

```typescript
const senderAddress = '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH'
const senderPublicKey = '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0'
const bytecode = '00010b010000000001d38d0b36360000'
const buildTxResult = await builder.buildDeployContractTx(
  {
    signerAddress: senderAddress,
    bytecode
  },
  senderPublicKey
)
console.log('unsigned transaction', buildTxResult.unsignedTx)
```

### Chained Transactions

Chained transactions is a powerful feature of the Alephium blockchain that allows users to build a sequence
of transactions that can be signed and submitted together. The subsequent transaction can potentially
use the outputs of the previous transaction as inputs. This can unlock some interesting use cases, such as:

- If a user interacts with a dApp but the connected account doesn't have enough assets, the wallet can
  build chained transactions to first transfer the required assets to the connected account from other
  accounts in the wallet, and then interact with the dApp. This provides a seamless experience where
  the user only needs to review and sign once.
- If a DEX wants to migrate user's liquidity from one pool to another, it can build a chained transaction
  that first withdraws liquidity from the current pool and then deposits it to the new pool. User only needs
  to review and sign once, rather than executing multiple separate transactions.

Here are a few examples of how to build chained transactions:

#### Transfer Assets and Execute Script

Let's say we want to lock 1 ALPH by executing the `LockAlph` transaction script as shown in the
[Execute Script Transaction](#execute-script-transaction) section, but the connnected account doesn't
have enough ALPH to be locked, so we need to transfer some ALPH from another account in the wallet first.
We can build chained transactions as follows:

```typescript
const wallet = new HDWallet({ mnemonic })          // Just for testing, could be any wallets
const account1 = wallet.deriveAndAddNewAccount(1)  // Group 1
const account2 = wallet.deriveAndAddNewAccount(2)  // Group 2

// Assuming that account1 doesn't have enough ALPH, but account2 does
await wallet.setSelectedAccount(account1.address)

const lockAlphTxParams = await LockAlph.script.txParamsForExecution(wallet, {
  initialFields: { amount: ONE_ALPH },
  attoAlphAmount: ONE_ALPH
})

const transferTxParams = {
  signerAddress: account2.address,
  destinations: [ { address: account1.address, attoAlphAmount: 2n * ONE_ALPH } ]
}

const [transferResult, lockAlphResult] = await wallet.signAndSubmitChainedTx([
  { ...transferTxParams, type: 'Transfer' },
  { ...lockAlphTxParams, type: 'ExecuteScript' },
])
```

After the chained transactions are built, the wallet signs and submits them together using the `signAndSubmitChainedTx` function.
This function returns an array of transaction results in the same order as the input transactions.

#### Transfer Assets and Deploy Contract

If we need to deploy a contract but the connected account lacks sufficient ALPH for gas fees and the minimum contract deposit,
we can create chained transactions to first transfer ALPH from another account in the wallet:

```typescript
const wallet = new HDWallet({ mnemonic })          // Just for testing, could be any wallets
const account1 = wallet.deriveAndAddNewAccount(1)  // Group 1
const account2 = wallet.deriveAndAddNewAccount(2)  // Group 2

// Assuming that account1 doesn't have enough ALPH, but account2 does
await wallet.setSelectedAccount(account1.address)

// Deploy a TestContract
const deployTxParams = await TestContract.contract.txParamsForDeployment(wallet, {
  initialAttoAlphAmount: ONE_ALPH,
  initialFields: {}
})

const transferTxParams = {
  signerAddress: account2.address,
  destinations: [ { address: account1.address, attoAlphAmount: 2n * ONE_ALPH } ]
}

const [transferResult, deployResult] = await wallet.signAndSubmitChainedTx([
  { ...transferTxParams, type: 'Transfer' },
  { ...deployTxParams, type: 'DeployContract' },
])
```

Similar to the previous example, the wallet signs and submits the transactions together using the `signAndSubmitChainedTx` function.

#### Chained dApp Transactions

In a hypothetical example where a connected account lacks sufficient ALPH to deposit to a contract, we can use chained transactions to
first withdraw ALPH from another contract and then make the deposit:

```typescript
const wallet = new HDWallet({ mnemonic })          // Just for testing, could be any wallets
const account1 = wallet.deriveAndAddNewAccount(1)  // Group 1

await wallet.setSelectedAccount(account1.address)

// Assuming that account1 doesn't have enough ALPH to deposit
const depositTxParams = await Deposit.script.txParamsForExecution(wallet, {
  initialFields: { contract: depositContractId, amount: ONE_ALPH },
  attoAlphAmount: ONE_ALPH
})

const withdrawTxParams = await Withdraw.script.txParamsForExecution(wallet, {
  initialFields: { contract: withdrawContractId, amount: ONE_ALPH * 2n }
})

const [depositResult, withdrawResult] = await wallet.signAndSubmitChainedTx([
  { ...depositTxParams, type: 'ExecuteScript' },
  { ...withdrawTxParams, type: 'ExecuteScript' },
])
```

After the wallet signs and submits the transactions together successfully using the `signAndSubmitChainedTx` function,
the deposit contract will receive 1 ALPH.

## Gas Estimation

On Alephium, each transaction involves two key parameters related to gas: `gasAmount` and `gasPrice`.

- **`gasAmount`**: This represents the amount of gas required for on-chain computation and storage.
- **`gasPrice`**: This is the amount of ALPH (Alephium's native token) that the user is willing to pay per unit of gas consumed during transaction execution.

### Specifying `gasPrice`

Users can set the `gasPrice` as long as it meets the [minimum required amount](/dapps/constants). 

### Estimating `gasAmount`

Estimating `gasAmount` is an integral part of building the transaction. The full node can accurately estimate the gas required based on the current state of the blockchain. However, this estimation can sometimes fail if the contract state changes due to other pending transactions in the mempool.

### Using `gasEstimationMultiplier` (Optional)

To mitigate the potential estimation errors for dApp transactions, a parameter called `gasEstimationMultiplier` can be used to scale up the estimated gas amount, providing a buffer to handle gas requirement changes. Note that the multiplier must be between 1.0 and 2.0.

### Example

Here’s how you can use extract the estimated `gasAmount` and optionally use `gasEstimationMultiplier` in your code:

```typescript
import { unsignedTxCodec } from '@alephium/web3/codec';

const buildTxResult = await builder.buildExecuteScriptTx(
  {
    signerAddress: account.address,
    bytecode,
    gasEstimationMultiplier: 1.05 // Scale up the estimated gas amount by 5%
  },
  senderPublicKey
);

const decodedTx = unsignedTxCodec.decodeApiUnsignedTx(hexToBinUnsafe(buildTxResult.unsignedTx));

console.log(decodedTx.gasAmount); // This is the scaled-up gas amount used in the transaction
```

By following this approach, you can ensure that your transactions are more robust against estimation errors, providing a smoother and more reliable user experience on the Alephium network.

## Sign and Submit Transaction

We need the [SignerProvider](./signer-provider.md) to sign and submit
the unsigned transaction. The following example assumes that we have
already created an unsigned transaction from the previous section:

```typescript
import { getSigner } from '@alephium/web3-test'

const signer = await getSigner()
const signerAddress = (await signer.getSelectedAccount()).address
const txResult = await signer.signAndSubmitUnsignedTx({
  signerAddress: signerAddress,
  unsignedTx: buildTxResult.unsignedTx // assuming an unsigned transaction was already created
})
console.log('transaction id', txResult.txId)
```

## Query Transaction

### Transaction Status

```typescript
import { NodeProvider } from '@alephium/web3'

const nodeUrl = 'http://127.0.0.1:12973'
const nodeProvider = new NodeProvider(nodeUrl)

const txId = '919d4e4b1080d74beb56a1f78ea7c0569a358e3ea3988058987cc1addf4b93cc'
const txStatus = await nodeProvider.transactions.getTransactionsStatus({ txId })
console.log('transaction status', txStatus.type)
```

You can differentiate the transaction status using the `txStatus.type`:

1. `MemPooled`: transaction is in the mempool
2. `Confirmed`: transaction has been confirmed, and you can get the number of confirmations using `txStatus.chainConfirmations`
3. `TxNotFound`: transaction does not exist

### Transaction Details

```typescript
const details = await nodeProvider.transactions.getTransactionsDetailsTxid(txId)
console.log('transaction details', details)
```

For transfer transactions, you can obtain the transaction details if the transaction is successful. For script tx, you need to check `scriptExecutionOk` to determine if the transaction is executed successfully:

```typescript
if (details.unsigned.scriptOpt !== undefined && !details.scriptExecutionOk) {
  // the script transaction failed
}
```
Transaction details consists of the same attributes as a *signed
transaction*.

## Decode Unsigned Transaction

The Alephium full node also provides an API to decode unsigned
transaction from its serialized format:

```typescript
const nodeProvider = new NodeProvider('http://127.0.0.1:22973')
const decodedUnsignedTx = await nodeProvider.transactions.postTransactionsDecodeUnsignedTx({ unsignedTx })
console.log('decoded unsigned transaction ', decodedUnsignedTx)
```

You can also use the [codec](./codec.md) to decode unsigned
transaction at the client side.
