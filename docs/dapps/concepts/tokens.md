---
sidebar_position: 30
title: Tokens
sidebar_label: Tokens
---

Tokens are first class citizens in Alephium. Just like the native
token `ALPH`, all tokens on Alephium are managed by UTXOs, which is
battle tested for its security in managing assets.

This design has a few advantages compared to other blockchains:

- True ownership: Tokens are securely managed by UTXOs, which are
  directly owned by addresses. Since UTXOs are protected by users'
  private keys, even if there are bugs in the token contract, users'
  assets remain safe.
- First-class support: Tokens are native assets on Alephium, therefore
  both fungible and non-fungible tokens can be easily discovered and
  displayed by wallets, explorers, and dApps without relying on
  third-party services.
- Better UX and higher security: When smart contracts need to transfer
  tokens, no extra approval transactions are required since the
  approval is implicit in the UTXO model. Alephium leverages its
  unique [Asset Permission
  System](/dapps/concepts/asset-permission-system) to ensure that
  tokens are handled securely by the smart contracts.
- Cheaper transaction fees and higher throughput: Token transfer is
  very scalable because they can take full advantage of Alephium's
  [sharding](/misc/glossary.md#sharding) design.
- Efficient transaction batching: Multiple fungible and non-fungible
  tokens can be involved in a single transaction.

Specifically to NFTs:

- Scarcity: Each NFT requires the deployment of its own individual
  contract, which in turn requires a deposit of `ALPH`. This unique
  structure imposes a upper limit on the production of NFTs on
  Alephium.
- Semi-fungible tokens: Each NFT has a corresponding issuing contract
  with the associated metadata. Usually the contract issues one token
  which makes the NFT unique. But it can also issue multiple tokens
  to make the token semi-fungible.

To make it easier to work with tokens in the Alephium ecosystem:

- Standards are defined for both [fungible
  tokens](/dapps/standards/fungible-tokens) and [non-fungible
  tokens](/dapps/standards/non-fungible-tokens).
- [Typescript SDK](/sdk/getting-started) offers a set of utility
  functions to help dApps and wallets to interact with the tokens,
  such as guessing token types and extracting token metadata.
- [Token list](https://github.com/alephium/token-list) is created as a
  platform for token issuers to submit token metadata for proper
  display in wallets, explorers, and other ecosystem interfaces. 

You can learn more about the [Fungible Token](/dapps/standards/fungible-tokens) and [Non-fungible Token
](/dapps/standards/non-fungible-tokens) standards, and learn how to
create your [first fungible token](/dapps/tutorials/first-fungible-token) and [NFT](/dapps/tutorials/first-nft).
