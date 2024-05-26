---
sidebar_position: 30
title: Tokens
sidebar_label: Tokens
---

Tokens are first class citizens in Alephium. Just like the native
token ALPH, all tokens on Alephium are managed by UTXOs, which are
owned directly by addresses.

This design has a few advantages compared to other blockchains:

- Token transfers among users only require UTXOs, which is battle
  tested for its security in managing assets.
- Easier for wallets and dApps to discover users' tokens, including
  both fungible and non-fungible tokens.
- When smart contracts need to transfer tokens, no extra approval
  transactions are required since the approval is implicit in the
  UTXO model. Alephium leverages its unique [Asset Permission
  System](/dapps/concepts/asset-permission-system) to ensure that tokens
   are handled securely by the smart contracts.
- Token transfer is very scalable because they can take full
  advantage of Alephium's [Sharding](/misc/glossary.md#sharding) design. 

To make it easier to work with tokens in the Alephium ecosystem:

- [Token
  standards](https://github.com/alephium/alephium-web3/tree/master/packages/web3/std)
  are introduced in the SDK to define standard interfaces for both
  fungible and non-fungible tokens
- Utilities functions are defined in the SDK to ease common tasks
  for dApps and wallets when interacting with the tokens, such as
  guessing token types and the extraction of token metadata.
- [Token list](https://github.com/alephium/token-list) is used
  establish a source of trust for well known fungible tokens and NFT
  collections.
- Native support for both fungible and non-fungible tokens in wallets
  and explorer.
- Tools to help launch [Opensea
  Drop](https://docs.opensea.io/docs/drops-on-opensea) style NFT
  public sale, called `Flow`.

In the [Fungible Tokens](/dapps/standards/fungible-tokens) page, you will learn
about the fungible token standard, how to issue fungible tokens, how
to fetch token metadata and how to transfer fungible tokens in
wallets, etc.

In the [Non-fungible Tokens](/dapps/standards/non-fungible-tokens) page, you will learn about
the non-fungible token standard, how to create your own NFT
collections and launch your first NFT public sale campaign called
`Flows` in the [NFT marketplace](https://testnet.nft.alephium.org/).
