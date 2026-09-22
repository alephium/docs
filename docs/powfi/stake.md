---
sidebar_position: 70
title: Stake
sidebar_label: Stake
---

A simple guide to staking ALPH on Powfi. Learn how staking works, what xALPH represents, how rewards accrue, and how you can use xALPH in supported pools and applications.

**Prerequisite:** a [funded](/powfi/funding-a-wallet) Alephium wallet with ALPH available to stake. You also need enough ALPH to cover the network fee.

## **Goal**

Stake ALPH and receive xALPH.

When you stake ALPH, it becomes locked in the Powfi staking system and xALPH is minted to represent your staked position.

**What you'll have after staking:**

- Your ALPH is locked in the staking system.

- You receive xALPH representing your staked ALPH.

- Your position can earn staking rewards.

- Your xALPH can be used in supported pools and applications.

## **Step-by-step**

### **1. Open Powfi**

Open [powfi.alephium.org](https://powfi.alephium.org/) and connect your Alephium wallet.

Verify that the URL is [powfi.alephium.org](https://powfi.alephium.org/) before connecting your wallet.

### **2. Open Staking**

Go to the [**Staking**](https://powfi.alephium.org/staking/) section on Powfi.

You will see the option to stake ALPH and receive xALPH.

### **3. Enter the amount**

Enter the amount of ALPH you want to stake.

Before continuing, check:

- **Amount of ALPH** you are staking.

- **Staking APR**, which is the estimated annual rate of rewards.

- **Available to stake, which is the amount of ALPH available for staking in your wallet.**

Keep some ALPH in your wallet for network fees.

### **4. Review and stake**

Review the staking details.

When everything looks correct, click **Stake**.

Powfi will prepare the staking transaction and your wallet will ask you to confirm it.

### **5. Approve in your wallet**

Review the transaction in your Alephium wallet before signing.

Make sure the amount being staked matches what you entered.

If everything looks correct, approve the transaction.

### **6. Receive xALPH**

Once the transaction is confirmed, your ALPH is locked in the staking system and xALPH is minted to represent your staked position.

At mainnet launch:

**1 xALPH = 1 ALPH**

Over time, staking rewards accumulate to the underlying staked ALPH, increasing the amount of ALPH represented by each xALPH.

## **What is xALPH?**

xALPH is a liquid representation of staked ALPH.

Mainnet xALPH token ID: [6dc961b59aae53c768fe6f608e6bea30f6747041af3fd800c8c6533766e54f00](https://explorer.alephium.org/tokens/6dc961b59aae53c768fe6f608e6bea30f6747041af3fd800c8c6533766e54f00)

Mainnet xALPH staking contract: [225WevmFp5ZgzPsyVJTvyp2v2uyKrvp329HfrVmzffnWj](https://explorer.alephium.org/addresses/225WevmFp5ZgzPsyVJTvyp2v2uyKrvp329HfrVmzffnWj)

When you stake ALPH:

**ALPH → locked ALPH → xALPH**

Each xALPH is backed by locked ALPH and represents your staked position.

xALPH does not replace ALPH. It lets you use your staked position in supported pools and applications while the underlying ALPH stays locked.

## FAQ

### **How do staking rewards work?**

Rewards deposited into the xALPH contract increase the ALPH backing each xALPH.

The Staking APY is the estimated annual percentage rate of rewards you can earn by staking ALPH.

xALPH holders do not receive a separate ALPH payment. Instead, each xALPH represents more ALPH as rewards are deposited. Rewards may come from:

- Powfi DEX fees after fee collection and distribution are configured.

- Funded campaign rewards while a campaign is active.

The exact APY can change over time depending on network activity and protocol fees.

No 5% return is currently guaranteed. The Powfi interface displays estimated APR, which does not include compounding; APY would assume compounding.

- Campaign status: Not active. No campaign rewards are paid until the campaign is funded and enabled.

- Start date: Not announced.

- End date: Not announced.

- Total reward budget: Not announced.

- Distribution frequency: Not announced.

- Participation limit: Not announced.

- When the budget is exhausted: Campaign distributions stop unless a new budget is announced.

### **Why does xALPH increase in value?**

As staking rewards accumulate, the amount of ALPH backing xALPH increases.

This changes the conversion rate between xALPH and ALPH.

In simple terms:

**More rewards → more ALPH backing → each xALPH represents more ALPH**

The conversion rate changes whenever ALPH rewards are deposited into the xALPH contract. No separate ALPH payment is sent to holders; each xALPH becomes backed by more ALPH.

### **How can I use xALPH?**

xALPH keeps your staked position liquid where xALPH is explicitly supported.

You can use xALPH for activities such as:

- Swapping xALPH and ALPH on Powfi.

- Providing liquidity in Powfi's ALPH/xALPH pool.

- Using xALPH in another application only when that application explicitly supports it.

- Confirming token support before depositing xALPH into any application.

xALPH does not automatically work in every DeFi application.

### **Can I convert xALPH back to ALPH?**

Yes. There are two ways to convert xALPH back to ALPH.

#### **Official unstaking**

You can use the official **Unstaking** process.

- The conversion uses the rate in effect when you press **Unstake**.

- There is a **30-day unlock period**.

- Your ALPH becomes claimable linearly during the unlock period.

#### **DEX**

You can also swap xALPH for ALPH through a DEX such as Powfi.

- The swap is based on the live market price.

- The conversion is
