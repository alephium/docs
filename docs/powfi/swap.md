---
sidebar_position: 50
title: Swap
sidebar_label: Swap
---

A simple walkthrough of your first token swap on [Powfi.](https://powfi.alephium.org/) Learn how to connect your Alephium wallet, choose tokens, review the swap, confirm the transaction, and check that it worked.

**Prerequisite:** a [funded](/powfi/funding-a-wallet) Alephium wallet with enough ALPH to make a swap and cover the network fee. If you do not have ALPH yet, see **Funding a Wallet**.

## **Goal**

Swap a small amount of ALPH for another token. This covers the basic flow:

Connect your wallet → Choose tokens → Enter an amount → Review the quote → Confirm → Verify

**What you'll pay:**

- A trading fee shown before you confirm the swap.

- An Alephium network fee.

- The exact amount you receive depends on the current pool price and the amount you swap.

**What you'll have after:**

- Less of the token you swapped from.

- More of the token you swapped to.

- A confirmed transaction you can check on the Alephium network.

## **Step-by-step**

### **1. Open Powfi**

Open the official Powfi application at [powfi.alephium.org](https://powfi.alephium.org/).

**Verify the URL** before connecting your wallet. Phishing websites can look very similar to the real application.

The swap interface includes:

- A **From** section for the token you are spending.

- A **To** section for the token you are receiving.

- An amount field.

- A **Swap** button.

- Swap settings, where available.

### **2. Connect your wallet**

Click **Connect Wallet** and choose your Alephium wallet.

Your wallet will ask you to approve the connection.

Connecting your wallet allows Powfi to interact with your wallet address and prepare transactions. **Connecting does not by itself transfer your funds.**

After connecting, your wallet address and available balances should appear in the interface.

### **3. Pick your tokens**

Choose the token you want to spend in **From**.

Then choose the token you want to receive in **To**.

Before continuing, check the token name and details carefully. Avoid tokens with similar names or unknown contracts.

### **4. Enter an amount**

Enter the amount you want to swap in the **From** field.

Powfi will show the estimated amount you will receive in the **To** field.

Review the information shown before continuing, including:

- **Estimated output**

- **Price**

- **Trading fee**

- **Price impact**

- **Slippage**

The quoted amount can change before the transaction is confirmed because token prices and pool conditions can change.

### **5. Review and swap**

When everything looks correct, click **Swap**.

Review the swap details carefully, including the amount you are spending, the estimated amount you will receive, and the applicable fees.

Then confirm the swap in Powfi.

### **6. Approve in your wallet**

Your Alephium wallet will open a transaction confirmation.

Review the transaction before signing.

Check that:

- The transaction is for the swap you intended to make.

- The amount being spent is correct.

- The destination and transaction details look correct.

- You have enough ALPH remaining for network fees.

If something looks different from what you expected, reject the transaction and review it before trying again.

If everything looks correct, approve the transaction in your wallet.

### **7. Confirmation**

Once the transaction is confirmed, Powfi will show the result of the swap.

Your wallet balance should update to reflect the transaction.

If the transaction does not complete, check the transaction status before trying again.

## **Verifying it worked**

### **In your wallet**

Open your wallet and check your token balances.

You should see:

- The token you swapped from has decreased.

- The token you swapped to has increased.

- The transaction appears in your recent activity.

The exact amounts depend on the quote and the final execution.

### **On the [Alephium explorer](https://explorer.alephium.org/)**

You can also check the transaction on an Alephium blockchain explorer.

Look for:

- **Transaction status**

- **Your wallet address**

- **Asset balance changes**

- **Transaction details**

This lets you verify what happened on-chain.

## **What just happened?**

At a simple level:

1. You selected the token you wanted to spend.

2. You selected the token you wanted to receive.

3. Powfi provided a swap quote based on available liquidity.

4. You reviewed the quote and confirmed the swap.

5. Your wallet signed the transaction.

6. The Alephium network processed the transaction.

7. The tokens were exchanged through the liquidity pool.

## **Common mistakes**

### **Not leaving enough ALPH for fees**

Do not use your entire ALPH balance for a swap if you need ALPH to pay network fees.

Keep some ALPH available in your wallet.

### **Not checking the token**

Make sure you are swapping the token you intended to use.

Tokens with similar names can be different assets.

### **Ignoring the quote**

Always check the estimated amount you will receive, fees, price impact, and slippage before confirming.

### **Signing a transaction you do not understand**

Your wallet is the final step before the transaction is submitted.

Read the transaction details and reject anything that does not match what you intended to do.

### **Using an unofficial website**

Always verify that you are using [powfi.alephium.org](https://powfi.alephium.org/) before connecting your wallet.

## **After your first swap**

Once you are comfortable with swapping, you can explore other Powfi features:

### **Provide liquidity** through CLMM or CPMM pools.

### **Farm** eligible liquidity positions.

### **Stake ALPH** and receive xALPH.

### Use xALPH in supported pools and applications.
