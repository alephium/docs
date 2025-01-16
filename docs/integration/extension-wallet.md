---
sidebar_position: 70
title: Extension Wallet
sidebar_label: Extension Wallet
---

To enable dApps to automatically detect extension wallets that support Alephium, these wallets must adhere to the following standard, which is inspired by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963):

```typescript
function announceProvider() {
  const event = new CustomEvent('announceAlephiumProvider', {
    detail: Object.freeze({ provider: alephiumWindowObject })
  })
  const handler = () => window.dispatchEvent(event)
  handler()
  window.addEventListener('requestAlephiumProvider', handler)
}
```

The extension wallets must call the `announceProvider` function in `inpage.js`.

The `alephiumWindowObject` must inherit from the [`InteractiveSignerProvider`](https://github.com/alephium/alephium-web3/blob/db71321796e69944710368c6a1182a4473def4e6/packages/web3/src/signer/signer.ts#L81) and include the following four fields:

1. `name`: The wallet name, **please note that `alephium` cannot be used as the wallet name**
2. `id`: The wallet ID, **please note that `alephium` cannot be used as the wallet ID**
3. `icon`: The wallet icon
4. `version`: The wallet version

For more details, you can refer to the code in the Alephium extension wallet [here](https://github.com/alephium/extension-wallet/blob/e3f10da92580e7f6447c27c6d158f6ac46301b55/packages/extension/src/inpage/alephiumWindowObject.ts#L38).
