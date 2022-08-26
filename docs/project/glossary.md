---
sidebar_position: 30
sidebar_label: Glossary
slug: /glossary
title: Glossary
---

## A

## B

### Block Reward

The block reward is an economic incentive for the miners to do their job of securing the network. It is paid in the blockchain’s native token. It is usually higher when the network is small and new and decreases over time as it matures.

[Block Reward GitHub Implementation](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/mining/Emission.scala)

## C

## D

## E

## F

## G

### Gas Amount Spent

Gas Spent is the amount of computations the miner uses to execute the transactions. The more functions the transaction has, the more complex its execution, and the more gas is spent. 

For now, and as an anti-spam measure, there is a minimum value of 20’000 gas in the Alephium blockchain, meaning your transaction fee will always cost at least 0.002 ALPH. As the network matures, this will be relaxed, and the market will define the price of transaction fees. 

### Gas Price

This is the monetary value of the gas. Gas is defined as the computational effort to execute a command in a blockchain. The gas price is the monetary counterpart to pay for the work done by the miner. At Alephium, we have a minimal value of 0.0000001 ALPH per transaction or 1 phi, and you can change it for a higher value.

## H

## I

## J

## K

## L

## M

### Mining reward

![](media/Block%20reward.png)

The mining reward is the payment to the miner for the computational work needed to validate the transactions and put them into a block. On Alephium, The mining reward has two components: [Transaction Fee](#transaction-fee) and [Block Reward](#block-reward) or new token emissions. The transaction rewarding the miner and issuing the newly minted ALPH is called a coinbase transaction.


The following equation defines it:

Total Mining Reward = Block Reward + min(max(Block Reward, 1 ALPH), Transaction Fee / 2)

![image](media/186885966-b8d746fb-612b-433e-8f79-47e5a87ea375.png)

Half of the transaction fees component is burnt to act as a deflationary mechanism.  

Additional resources: [Alephium Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)

## N

## O

## P

### Proof of Less Work (or PoLW)
Similar to Proof-of-Work for Bitcoin, or Proof-of-Stake for Ethereum (post-merge), PoLW is Alephium’s consensus algorithm. It optimizes the network's energy consumption without compromising its security & decentralisation. It is activated when the network surpasses 1 Eh/s of accumulated hashrate. 

After that, it partially internalizes the cost to mine a new block, by adding a coin-burning mechanism into the block validation process, incentivizing a cap on the processing power needed overall. Given the same network conditions, Alephium would only use ⅛ of the energy consumed by Bitcoin mining.

Additional resources: [TECH TALK #1 — The Ultimate guide to Proof-of-Less-Work, the universe and everything…](https://medium.com/@alephium/tech-talk-1-the-ultimate-guide-to-proof-of-less-work-the-universe-and-everything-ba70644ab301)

## Q

## R

## S

## T

### Transaction fee 

![image](media/186886291-79745fc1-25dc-4307-a752-400ce1ff2d31.png)

When someone does a transaction in Alephium, there’s a price to be paid to the miners for including it in a block. 

This price is composed of two elements: the [Gas Price](#gas-price) in the network’s native token and the [Gas Amount Spent](#gas-amount-spent) on this transaction processing and can be defined by this equation:

Transaction fee = Gas Price * Gas Amount Spent

Additional resources: [Transaction fee GitHub Implementation](https://github.com/alephium/alephium/blob/v1.4.2/protocol/src/main/scala/org/alephium/protocol/model/Transaction.scala#L230-L239)

## U

## V

## W

## X

## Y

## Z

