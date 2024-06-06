---
sidebar_position: 80
title: Codec
sidebar_label: Codec
---

The SDK provides `codec` for encoding and decoding transactions, contracts and scripts.

## Encode/Decode Unsigned Transaction

```typescript
import { codec, node } from '@alephium/web3'

const unsignedTx: node.UnsignedTx = // unsigned transaction
const encoded = codec.unsignedTxCodec.encodeApiUnsignedTx(unsignedTx)
const decoded = codec.unsignedTxCodec.decodeApiUnsignedTx(encoded)
```

## Encode/Decode Signed Transaction

```typescript
import { codec, node } from '@alephium/web3'

const tx: node.Transaction = // transaction
const encoded = codec.transactionCodec.encodeApiTransaction(tx)
const decoded = codec.transactionCodec.decodeApiTransaction(encoded)
```

## Encode/Decode Contract

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

## Encode/Decode Script

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
