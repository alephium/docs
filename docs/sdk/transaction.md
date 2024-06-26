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

### Execute Script Transaction

Let's build an unsigned transaction that executes `TxScript`. After
your `TxScript` is
[compiled](/dapps/tutorials/quick-start#compile-your-contract), its
bytecode can be obtained by using the
[Script.buildByteCodeToDeploy](https://github.com/alephium/alephium-web3/blob/master/packages/web3/src/contract/contract.ts#L712-L719)
function. The following example assumes the `bytecode` is already
created:

```typescript
const senderAddress = '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH'
const senderPublicKey = '0381818e63bd9e35a5489b52a430accefc608fd60aa2c7c0d1b393b5239aedf6b0'
const bytecode = '010103000000040c0c1440205f3a18d50689521ddc9eec9472976c5495301169ae2d21af662e0836fb87f6ff0100'
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

## Gas Estimation

On Alephium, each transaction involves two key parameters related to gas: `gasAmount` and `gasPrice`.

- **`gasAmount`**: This represents the amount of gas required for on-chain computation and storage.
- **`gasPrice`**: This is the amount of ALPH (Alephium's native token) that the user is willing to pay per unit of gas consumed during transaction execution.

### Specifying `gasPrice`

Users can set the `gasPrice` as long as it meets the [minimum required amount](/dapps/constants). 

### Estimating `gasAmount`

Estimating `gasAmount` is an integral part of building the transaction. The full node can accurately estimate the gas required based on the current state of the blockchain. However, this estimation can sometimes fail if the contract state changes due to other pending transactions in the mempool.

### Using `gasEstimationMultiplier` (Optional)

To mitigate the potential estimation errors for dApp transactions, a parameter called `gasEstimationMultiplier` can be used to scale up the estimated gas amount, providing a buffer to handle gas requirement changes.

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
