---
sidebar_position: 30
sidebar_label: Glossary
slug: /glossary
title: Glossary
---

This is a list of useful concepts for understanding Alephium in particular and Blockchains in general.

## A

### Alephium

Alephium is the first live layer 1 sharded blockchain scaling and improving on Bitcoin core technologies, Proof of Work and UTXO. It delivers a highly performant, secure DeFi & dApps platform with enhanced energy efficiency. 

From its technical design to its interfaces, Alephium has been created to address the challenges of accessibility, scalability, and security encountered by decentralized applications today.

## B

### Block Reward

The block reward is an economic incentive for the miners to do their job of securing the network.

It is paid in the blockchain’s native token. It is usually higher when the network is small and new and decreases over time as it matures.

[Block Reward GitHub Implementation](https://github.com/alephium/alephium/blob/master/protocol/src/main/scala/org/alephium/protocol/mining/Emission.scala)

### Block Size

Block size is the data limit each block can handle. 

It can be measured in different ways. In some blockchains, it is expressed in how much actual data the block can carry (for example, in Zcash, the block size is 2MB). In other blockchains, the block size is related to the computational processing limit it can consume from the network (usually expressed in gas). Ethereum’s and Alephium’s block sizes are measured this way.

### Block Time

Block Time is the time needed to compute the transactions inside a block and send it to the network.

Transactions are gathered inside a block and checked by the miners (or validators on PoS blockchains). Usually, the Block Time is impacted by the mining difficulty, as it is adjusted to reflect the network's computational capacity (hashrate) over a given time.

Alephium network has a difficulty adjustment on every block and has an expected block time of **64 seconds**.

Additional resources: [Block Time and Block Size Article](https://medium.com/@alephium/block-time-and-block-size-16e37292444f)

### Bridge

A bridge is a protocol connecting separate blockchains to enable interactions between them. Each blockchain usually has its own technological features and doesn’t have a native way to communicate with other protocols. So the bridge is a set of smart contracts that links these different ecosystems.
 
A bridge can be more specialized, only allowing one type of interaction (like token transfers, for instance), or it can be more generalistic, allowing any kind of data transfer between the bridged blockchains.

## C

## D

## E

## F

## G

### Gas Amount Spent

Gas Spent is the amount of computations the miner uses to execute the transactions. The more functions the transaction has, the more complex its execution, and the more gas is spent. 

For now, and as an anti-spam measure, there is a minimum value of 20’000 gas for any transaction on Alephium, meaning that your transaction fee will cost at least 0.002 ALPH. 

As the network matures, this will be relaxed, and the market will define the price of transaction fees.

### Gas Price

This is the monetary value of the gas. Gas is defined as the computational effort to execute a command in a blockchain. The gas price is the monetary counterpart to pay for the work done by the miner. 

At Alephium, the smallest price denomination is 0.0000001 ALPH, also called 1 phi.

### Genesis Block

A Genesis Block is the name of a blockchain’s first block ever mined. As the blocks get layered one on top of the other, the Genesis Block is the foundation or beginning of it.

It is also occasionally referred to as Block 0 or Block 1. When a block is broadcasted to the blockchain, it references the previous block. Because there is no previous block to reference, genesis blocks are generally hardcoded into the software.

Alephium’s genesis block was mined on November 8th, 2021

## H

### Hard Fork

A hard fork happens when a major upgrade on a network's protocol makes nodes or users running the previous version unable to send or validate transactions on the network after it.

As the upgrade is optional, sometimes some of the nodes or users decide not to do it, thus creating a different version of the blockchain from that point on. That happened with Ethereum and Ethereum Classic, for example.

## I

## J

## K

## L

## M

### Merkle tree

A Merkle tree [is a structure](https://en.wikipedia.org/wiki/Merkle_tree) used in a blockchain to compress data more efficiently and securely.
The blockchain packs the transactions in blocks. Each block has a header, and this header has a hash. This hash is stored on the Merkle Tree. The hash from the Merkle Tree is used to verify that a data set is the same as the original set of transactions without accessing the content inside the block. When visualized, this structure resembles a tree and can also be called a "binary hash tree."

For example, Alephium uses three Merkle trees per group to store assets-UTXOs, contract logic, and contract state. 

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

### Sharding 

Sharding is a strategy of database management that splits large databases into smaller, faster, more easily managed sections. 

These smaller parts are called [“shards”](https://en.wikipedia.org/wiki/Shard_(database_architecture)), which means "a small part of a whole." Sharding is used when the power needed to run the database exceeds the processing capacity of a single computer. Sharding becomes necessary when the size of the blockchain exceeds the processing power of the Virtual Machine and the network. Sharding breaks up the main blockchain into separate segments, and the nodes verify only a subset of transactions, allowing parallel transaction validation. This increases the network throughput. 

Alephium’s blockchain is sharded, and the Blockflow algorithm manages this. Currently, we have four groups with four shards in each one.

### State

The state is a [computer science concept](https://en.wikipedia.org/wiki/State_(computer_science)) where a machine can have multiple states, but only one at any given time.

A blockchain is considered to be a state machine. The state describes the system's current situation, and the transactions (inputs and outputs) trigger state transitions. As the transactions are bundled in blocks to make the process more efficient, the addition of a block is what changes the actual blockchain state.

Alephium uses the stateful UTXO model, which, compared to other UTXO accounting models, allows it to benefit from a full-featured state. 

## T

### Transaction fee 

![image](media/186886291-79745fc1-25dc-4307-a752-400ce1ff2d31.png)

When someone does a transaction in Alephium, there’s a price to be paid to the miners for including it in a block. 

This price is composed of two elements: the [Gas Price](#gas-price) in the network’s native token and the [Gas Amount Spent](#gas-amount-spent) on this transaction processing and can be defined by this equation:

Transaction fee = Gas Price * Gas Amount Spent

Additional resources: [Transaction fee GitHub Implementation](https://github.com/alephium/alephium/blob/v1.4.2/protocol/src/main/scala/org/alephium/protocol/model/Transaction.scala#L230-L239)

## U

### UTXO

[UTXO](https://en.wikipedia.org/wiki/Unspent_transaction_output) (Unspent Transaction Output) is the term for the amount of a specific currency that remains unspent after a cryptocurrency transaction.

On a UTXO account model blockchain, the portion of what was sent and not spent in a transaction is used as an accounting method. Like double-entry accounting, each transaction has an input and output.

Improved versions were built over it, like eUTXO, Cell System, or Alephium’s sUTXO.

## V

### Virtual Machine

A Virtual Machine (VM) is a software emulation of a physical computer to run programs and deploy apps.

A virtual machine runs its own operating system and functions. Each node runs a copy of the VM to run the programs (smart contracts) and allow them to interact with each other and the blockchain itself. 

Alephium’s Virtual machine is called Alphred and has a lot of very [interesting properties.](https://www.youtube.com/watch?v=VVYH9rBJAdA&list=PLqL60kqgLPBBrc64K-1Gs771FBTiLtYZE&index=29)


## W

## X

## Y

## Z

