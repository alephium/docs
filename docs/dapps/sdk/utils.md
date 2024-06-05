---
sidebar_position: 90
title: Utils
sidebar_label: Utils
---

The Web3 SDK also provides many utility functions to simplify
developers' tasks. Here are a few examples:

## Conversion between contract id and contract address

```typescript
import { addressFromContractId, contractIdFromAddress, binToHex } from '@alephium/web3'

const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
const contractAddress = addressFromContractId(contractId)
console.log(binToHex(contractIdFromAddress(contractAddress)) === contractId)
// true
```

## Get the group of an address

```typescript
import { groupOfAddress } from '@alephium/web3'

const group = groupOfAddress('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH')
console.log(group)
// 0
```

## Check the address type

```typescript
import { isAssetAddress, isContractAddress } from '@alephium/web3'

console.log(isAssetAddress('15EM5rGtt7dPRZScE4Z9oL2EDfj84JnoSgq3NNgdcGFyu'))
// true
console.log(isContractAddress('vobthYg1e9tPKhmF96rpkv3akCj7vhvgPpsP4qwZqDw3'))
// true
```

## Get the sub-contract id

```typescript
import { subContractId } from '@alephium/web3'

const contractId = 'bfc891f2f7fbb466bd7808f71cc022debb71fd3c1ceb752b623eb9c48ec4d165'
console.log(subContractId(contractId, '00'))
// 303483cfe0eaead281879233f884e8b64c2ecf26e368ccd4b05b2b5bda87ec3d
```

## Conversion between difficulty and target

```typescript
import { targetToDifficulty, difficultyToTarget } from '@alephium/web3'

const difficulty = targetToDifficulty('03010101')
console.log(difficulty)
// 1759945423332515547604927348026201994942774834186624170344224826469580800n
const target = difficultyToTarget(difficulty)
console.log(target)
// 03010101
```

## Wait for tx confirmation

```typescript
import { waitForTxConfirmation } from '@alephium/web3'

const txId = // tx id
// it will query the tx status every 4 seconds and wait for 2 block confirmations
await waitForTxConfirmation(txId, 2, 4000)
```

## Prettify token amounts

The web3 SDK provides a few utility functions to convert between currency and numbers

```Typescript
convertAlphAmountWithDecimals(1.23) // 1230000000000000000n
prettifyAttoAlphAmount(1230000000000000000n) // '1.23'
number256ToNumber(1230000000000000000n, 18) // 1.23
```

## Rate limit

`NodeProvider` is used to communicate with the full node when developing a dApp,
and you can use the public [API services](/infrastructure/public-services.md) provided by Alephium. 
But all APIs are rate limited to prevent spam. So if the client sends too many requests in a given amount of time, it will receive the HTTP 429 error.

You can use the [fetch-retry](https://github.com/jonbern/fetch-retry) to solve this issue:

```typescript
import * as fetchRetry from 'fetch-retry'

// We specify up to 10 retries, with 1 second retry delay
const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider('node-url', undefined, retryFetch)
```
