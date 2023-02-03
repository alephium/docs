---
sidebar_position: 30
sidebar_label: Glossary
slug: /glossary
title: Glossary
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

This is a list of useful concepts for understanding Alephium in particular and Blockchains in general.

## A

### Alephium

Alephium is the first operational sharded L1 blockchain scaling and enhancing PoW & UTXO concepts. Decentralization, self-sovereignty and security meet high-performance, accessibility and energy efficiency in a dev-friendly network optimized for DeFi & smart contract applications. 

From its technical design to its interfaces, Alephium has been created to address the challenges of accessibility, scalability, and security encountered by decentralized applications today.

## B

### Blake 3 Algorithm (Hash Function)
[Blake 3 Algorithm](https://github.com/BLAKE3-team/BLAKE3) is a cryptographic hash function. A hash function is a mathematical function that takes an input string of any length and converts it to a fixed-length output string. The fixed-length output is known as the hash value.

Hash functions have a lot of use cases on a blockchain: in the [Merkle Tree](#merkle-tree), Proof of Work Consensus, Digital Signatures, and on the Blockchain itself (as each block header in a block in the blockchain contains the hash of the previous block header). Bitcoin, for example, uses the [SHA-256.](https://en.wikipedia.org/wiki/SHA-2)

Alephium uses the Blake 3 Algorithm as its cryptographic hash function for mining.

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

The current lowest possible gas price on Alephium is 10^-7 ALPH or 0.0000001 ALPH.

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

### Merkle Tree

A Merkle tree [is a structure](https://en.wikipedia.org/wiki/Merkle_tree) used in a blockchain to compress data more efficiently and securely.
The blockchain packs the transactions in blocks. Each block has a header, and this header has a hash. This hash is stored on the Merkle Tree. The hash from the Merkle Tree is used to verify that a data set is the same as the original set of transactions without accessing the content inside the block. When visualized, this structure resembles a tree and can also be called a "binary hash tree."

For example, Alephium uses three Merkle trees per group to store assets-UTXOs, contract logic, and contract state. 

### Maximal Extractble Value (MEV)

Miner or [Maximal Extractable Value (MEV)](https://ethereum.org/en/developers/docs/mev/) refers to the value obtained from a block mining in excess of the standard block reward and gas fees by changing, including, or removing transactions in a block.

This difference is offered by actors referred to as “searchers” that analyze the mempool looking for profit opportunities by replacing the information on a given transaction, like the sender or receive address. To increase the likelihood of their transaction being chosen by the miner to be part of the next block produced, they are willing to pay a much higher gas fee than the average one, giving away or “sharing” part of the profit.

### Mining Reward

![](media/Block%20reward.png)

The mining reward is the payment to the miner for the computational work needed to validate the transactions and put them into a block. On Alephium, The mining reward has two components: [Transaction Fee](#transaction-fee) and [Block Reward](#block-reward) or new token emissions. The transaction rewarding the miner and issuing the newly minted ALPH is called a coinbase transaction.

The following equation defines it:

Total Mining Reward = Block Reward + min(max(Block Reward, 1 ALPH), Transaction Fee / 2)

![image](media/186885966-b8d746fb-612b-433e-8f79-47e5a87ea375.png)

Half of the transaction fees component is burnt to act as a deflationary mechanism.  

Additional resources: [Alephium Block Rewards](https://medium.com/@alephium/alephium-block-rewards-72d9fb9fde33)

### Multisig

Multisig or Multisignature is the process of requesting more than one private key to co-sign a transaction for it to be broadcast to the network. It is used as an additional security step.

Usually, the multisig setup is done in a way that requires a minimal quorum of signers for a specific transaction to be approved and sent. For instance, a multisig of 5 out of 9 will require a quorum of 5 signers (among nine potential co-signers) to co-sign a transaction before it can be sent.

Alephium’s [Full Node Wallet](/wallet/node-wallet-guide) supports multisig addresses

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

### Smart Contract 

[Smart Contract (SC)](https://en.wikipedia.org/wiki/Smart_contract) is a computer program that enables transactions to be executed by rules predefined, without needing to rely on a third party, central authority or external mechanisms. In the blockchain context, a smart contract is written using the native Programing Language or is compiled (translated) to it and usually runs on the blockchain’s [Virtual Machine.](#virtual-machine)

SCs on a blockchain can store arbitrary [state](#state) and execute arbitrary transactions. End clients also use transactions to interact with it. And the SC transactions can also invoke other SCs. These transactions might result in changing the state and sending coins from one smart contract to another or from one account to another.

In Alephium, the smart contracts are written using the Ralph language and run on Alphred Virtual Machine.

### State

The state is a [computer science concept](https://en.wikipedia.org/wiki/State_(computer_science)) where a machine can have multiple states, but only one at any given time.

A blockchain is considered to be a state machine. The state describes the system's current situation, and the transactions (inputs and outputs) trigger state transitions. As the transactions are bundled in blocks to make the process more efficient, the addition of a block is what changes the actual blockchain state.

Alephium uses the stateful UTXO model, which, compared to other UTXO accounting models, allows it to benefit from a full-featured state. 

## T

### Time to Finality

Time to Finality is the time between when a transaction is submitted to the network and when it’s considered final (and immutable). There are two main categories of finality: probabilistic finality and deterministic finality.

Most blockchain systems offer probabilistic transaction finality — this means that the probability that a transaction is valid and cannot be reversed increases with adding more blocks on the chain, but it’s never absolutely final. The network agrees that the transaction is final with enough time and blocks. This is how Bitcoin achieves finality, for example, a transaction is considered final after 6 blocks.

Other blockchains use a deterministic transaction finality (sometimes called absolute finality) — this means that the transaction is considered final when it is added to the blockchain. Fantom is one example of it.

Additional resource: [Time to Finality Article](https://medium.com/@alephium/time-to-finality-17d64eeffd25)

### Token

A token is a registry entry in a blockchain that follows a set of rules encoded by the smart contract issuing it. This definition makes it different from a cryptocurrency as the latter is the native asset of a blockchain like BTC or ETH, whereas tokens are built on an existing blockchain using smart contracts.

Tokens can be categorized as fungible or non-fungible. Fungible tokens are identical and can seamlessly replace one another. On the other hand, non-fungible tokens (NFTs) are unique and provably scarce, meaning their histories can be traced down to the individual level.

Tokens can also be categorized by their intended function: Utility, Security, or Currency Tokens. Currency tokens are created to be traded, like MakerDAO’s DAI or USDC. Utility tokens are focused on practical use, representing access to a given product or service. Security tokens are a digital representation of an underlying asset, such as a share in a company, voting right in a company or other centralized organization, or some tangible or digital article of value.

### Transaction Fee 

![image](media/186886291-79745fc1-25dc-4307-a752-400ce1ff2d31.png)

When someone does a transaction in Alephium, there’s a price to be paid to the miners for including it in a block. 

This price is composed of two elements: the [Gas Price](#gas-price) in the network’s native token and the [Gas Amount Spent](#gas-amount-spent) on this transaction processing and can be defined by this equation:

Transaction fee = Gas Price * Gas Amount Spent

Additional resources: [Transaction fee GitHub Implementation](https://github.com/alephium/alephium/blob/v1.4.2/protocol/src/main/scala/org/alephium/protocol/model/Transaction.scala#L230-L239)

### Transactions Per Second (TPS)

Transactions Per Second (TPS) is a measure that comes from the [database systems](https://en.wikipedia.org/wiki/Transactions_per_second) environment, and it means how many transactions theoretically can happen in one second in a given system.

In the blockchain context, it is used as a synonym for speed: how fast a transaction can be broadcasted to the network. The following equation calculates it:
 
TPS = (Block Size / Transaction Size ) /Block Time

Additional resources:[Transactions Per Second Article](https://medium.com/@alephium/transactions-per-second-tps-f13217a49e39)

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

