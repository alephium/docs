---
sidebar_position: 80
title: Codec
sidebar_label: Codec
---

[Typescript SDK](/sdk/getting-started) provides `codec` for encoding
and decoding transactions, contracts and transaction scripts. `codec`
can be helpful in many scenarios: it is useful to debug transactions
and contracts, inspect security risks of existing dApps, efficiently
construct bytecode, etc.

In this guide we will learn how to use `codec` to encode and decode
transaction, contract and transaction script.

## Transaction
### Unsigned Transaction

```typescript
import { codec, node } from '@alephium/web3'

const unsignedTx: node.UnsignedTx = // unsigned transaction
const encoded = codec.unsignedTxCodec.encodeApiUnsignedTx(unsignedTx)
const decoded = codec.unsignedTxCodec.decodeApiUnsignedTx(encoded)
```

### Signed Transaction

```typescript
import { codec, node } from '@alephium/web3'

const tx: node.Transaction = // transaction
const encoded = codec.transactionCodec.encodeApiTransaction(tx)
const decoded = codec.transactionCodec.decodeApiTransaction(encoded)
```

## Contract

```typescript
import { codec } from '@alephium/web3'

const contract: codec.contract.Contract = // contract
const encoded = codec.contract.contractCodec.encodeContract(contract)
const decoded = codec.contract.contractCodec.decodeContract(encoded)
```

You can also decode from the contract artifact:

```typescript
import { codec, Contract } from '@alephium/web3'

const artifact: Contract = // contract artifact
const decoded = codec.contract.contractCodec.decodeContract(artifact.bytecode)
```

## Transaction Script

```typescript
import { codec } from '@alephium/web3'

const script: codec.script.Script = // script
const encoded = codec.script.scriptCodec.encodeScript(script)
const decoded = codec.script.scriptCodec.decodeScript(encoded)
```

You can also decode from the script artifact:

```typescript
import { codec, Script } from '@alephium/web3'

const artifact: Script = // script artifact
const scriptBytecode = artifact.buildByteCodeToDeploy(...)
const decoded = codec.script.scriptCodec.decodeScript(scriptBytecode)
```
