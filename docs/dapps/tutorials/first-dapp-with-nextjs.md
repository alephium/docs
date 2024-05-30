---
sidebar_position: 40
title: First dApp with Nextjs
sidebar_label: First dApp with Nextjs
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

This is a continuation of the [getting started](/dapps/sdk/work-with-project/getting-started)
guide. By the end of this guide, you should be able to build a simple
[Nextjs](https://nextjs.org/) dApp that interacts with the token faucet
smart contracts discussed in the [getting started](/dapps/sdk/work-with-project/getting-started) guide

Prerequisites:

- Basic understanding of [Typescript](https://www.typescriptlang.org/)
  and [Nextjs](https://nextjs.org/)
- [npm](https://www.npmjs.com/) and
  [npx](https://www.npmjs.com/package/npx) installed on your machine
- Get familiar with the token faucet tutorial project in the [getting
  started](/dapps/sdk/work-with-project/getting-started) guide.
- Install the [extension wallet](/wallet/extension-wallet/overview)
- Install docker and docker-compose

## Create a dApp project using the Nextjs template

```sh
npx @alephium/cli@latest init alephium-nextjs-tutorial --template nextjs
```

This will create a new directory `alephium-nextjs-tutorial` and
initialize a sample Nextjs project inside that directory.


## Launch a local development network

Go to the `alephium-nextjs-tutorial/docker` directory and run

```sh
cd alephium-nextjs-tutorial/docker
docker-compose up -d
```

This will start both the Alephium full node and the [explorer
backend](https://github.com/alephium/explorer-backend) on
`devnet`. Explorer backend is needed for extension wallet to work.

Now you can [compile](/dapps/sdk/work-with-project/getting-started#compile-your-contract),
[test](/dapps/sdk/work-with-project/getting-started#test-your-contract) and
[deploy](/dapps/sdk/work-with-project/getting-started#deploy-your-contract) your token
faucet contracts just as described in the [getting
started](/dapps/sdk/work-with-project/getting-started) guide.

Make sure the contract is deployed before proceeding to the next step.

```sh
npx @alephium/cli@latest deploy
```

## Interact with the token faucet with the Nextjs dApp

Go to the project root directory and run

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
to see the token faucet application.

<img src={require("./media/nextjs-template-connect.png").default}
alt="Connect button" width="300"/>

As illustrated above, the token faucet dApp shows a `Connect Alephium`
button before it is connected with a wallet. Click the button and
choose the `Extension Wallet` option to open the extension
wallet. `WalletConnect` will be supported soon.

<img src={require("./media/nextjs-template-open-connect.png").default} alt="Landing page" width="250"/>
&nbsp;&nbsp;&nbsp;&nbsp;
<img src={require("./media/nextjs-template-connect-click-extensonwallet.png").default} alt="Create wallet" width="250" />

Review the approval screen of the extension wallet and click
`Connect`, the token faucet dApp will be connected to the extension
wallet. 

<img src={require("./media/nextjs-template-connected.png").default} alt="Landing page" width="520"/>

Input the number of tokens to be withdrawn (maximum 2), and click
the `Send Me Token` button. Review the transaction details and click
`Confirm`.

<img src={require("./media/nextjs-template-send-token.png").default} alt="Landing page" width="520"/>

Congratulations, you have just transferred some tokens from the token
faucet to your account!

## Implementation

The goal of the [nextjs
template](https://github.com/alephium/nextjs-template) project is to
demonstrate how to interact with the Alephium blockchain from a Nextjs
app.

Authentication can be done in a few lines using the
[@alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react)
component:

```tsx
<AlephiumWalletProvider>
  <AlephiumConnectButton />
  // Your logic
</AlephiumWalletProvider>
```

`<AlephiumWalletProvider>` creates a react
[context](https://reactjs.org/docs/context.html) and passes it through
the component tree of the application. The context
contains the
[SignerProvider](https://github.com/alephium/alephium-web3/blob/8cf20fee4c16091cf581518e9f411e31ec37955e/packages/web3-react/src/contexts/alephiumConnect.tsx#L56)
which is an essential piece of information to interact with the
Alephium blockchain, such as signing transaction, etc.

After user is connected to the wallet, we can interact with the
Alephium blockchain by using a set of react hooks provided by
[@alephium/web3-react](https://github.com/alephium/alephium-web3/tree/master/packages/web3-react). For
example, getting the [current
connected wallet](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useWallet.tsx),
[balance](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useBalance.tsx)
and [transaction
status](https://github.com/alephium/alephium-web3/blob/master/packages/web3-react/src/hooks/useTxStatus.tsx),
etc.

When a user makes a transaction, you can update the user's balance using `updateBalanceForTx`.
Here is a simple example:

```typescript
// The useBalance hook returns two values:
// 1. balance: the current balance
// 2. updateBalanceForTx: used to update the balance when the user makes a transaction.
const { balance, updateBalanceForTx } = useBalance()

const withdrawCallback = useCallback(async () => {
  const result = await withdraw(...)
  updateBalanceForTx(result.txId)
}, [updateBalanceForTx])
```

For more implementation details, please take a look at the
[code](https://github.com/alephium/nextjs-template). 

## Learn More

- Nextjs template is deployed on testnet and available at [https://alephium.github.io/nextjs-template](https://alephium.github.io/nextjs-template/)
- To learn more about the ecosystem, please visit the [overview of ecosystem](/dapps/ecosystem).
- To learn more about the web3 SDK, please visit the [guide of web3 SDK](/dapps/sdk/getting-started).
- To learn more about Ralph language, please visit the [guide of Ralph](/dapps/ralph/getting-started).
