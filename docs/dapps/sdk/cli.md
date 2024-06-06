---
sidebar_position: 70
title: CLI
sidebar_label: CLI
---

The `CLI` is a tool for creating projects, compiling contracts, and deploying contracts.

## Create a Project

You can create a new project using the `init` command, the `-t` parameter is used to specify the project type:

```shell
npx @alephium/cli init my-dapp -t react
```

There are three available project types:

* `base`: Create a Node.js project, this is the default type if the `-t` parameter is not specified
* `react`: Create a React project
* `nextjs`: Create a Next.js project

## Configuration

In order to use the `CLI`, you need to have a configuration file, and the default config file is `alephium.config.ts/js` located in the project root directory. The following is an example of a configuration file:

<details>
<summary>alephium.config.ts</summary>
<p>

```typescript
import { Configuration } from '@alephium/cli'

const configuration: Configuration = {
  // The `networks` field specifies configurations for different networks. It supports three types of networks: devnet, testnet, and mainnet
  networks: {
    devnet: {
      // The `nodeUrl` is the url of the full node
      nodeUrl: 'http://localhost:22973',
      // The purpose of private key is for deploying contracts. Since Alephium currently has 4 groups,
      // the maximum length of `privateKeys` is 4, and each group can have at most one private key.
      // If you only need to deploy contracts to one group, you only need to specify one private key.
      privateKeys: ['a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'],
      // The `deploymentFile` field is an optional config. If it is not specified, the default path
      // is `<project_root>/artifacts/.deployment.<network_id>.json`.
      deploymentFile: './deployments/.deployment.devnet.json',
      // The `confirmations` field is used to specify the number of block confirmations to wait for
      // after contract deployment. This is an optional config. If it is not specified, it defaults
      // to 1 for devnet and 2 for testnet and mainnet.
      confirmations: 1
    }
  }
}

// You must export the `configuration` from the config file
export default configuration
```

</p></details>

In most cases, you only need to specify the `networks` config, and the other optional configs can work well by default. But you can also configure these optional configs if needed:

* `sourceDir`: This config is used to specify the directory path for contract code, it is `<project_root>/contracts` by default
* `artifactDir`: This config is used to specify the directory path for compiled contract artifacts, it is `<project_root>/artifacts` by default
* `deployToMultipleGroupsInParallel`: If the contract needs to be deployed to multiple groups, this config specifies whether to deploy contracts on each group in parallel, it is `true` by default
* `deploymentScriptDir`: This config is used to specify the directory path for deployment scripts, it is `<project_root>/scripts` by default
* `compilerOptions`: You can refer to the code [here](https://github.com/alephium/alephium-web3/blob/3640e46892c7d2f52942447f300d4b21c7166a0c/packages/web3/src/contract/contract.ts#L104) for default compiler options
  * `ignoreUnusedConstantsWarnings`: Ignore unused constants warnings if this config is enabled
  * `ignoreUnusedVariablesWarnings`: Ignore unused variables warnings if this config is enabled
  * `ignoreUnusedFieldsWarnings`: Ignore unused contract fields warnings if this config is enabled
  * `ignoreUnusedPrivateFunctionsWarnings`: Ignore unused private functions warnings if this config is enabled
  * `ignoreUpdateFieldsCheckWarnings`: Ignore compiler warnings if contract functions update contract fields but does not have the `updateField` annotation
  * `ignoreCheckExternalCallerWarnings`: Ignore compiler warnings if public contract functions does not have the `checkExternalCaller` annotation
  * `errorOnWarnings`: Compiler warnings will be treated as errors if this config is enabled
* `skipRecompile`: This config is used to specify whether contract code needs to be recompiled when deploying contracts, it is `false` by default
* `enableDebugMode`: If this config is enabled, it will print out network requests and error stack traces
* `forceRecompile`: The purpose of this config is to maintain backward compatibility, it is disabled by default.
  * If this config is disabled and the contract code has already been deployed to the testnet/mainnet without any updates, then no new bytecode will be generated for the contract
  * If this config is disabled and the contract code has already been deployed to the testnet/mainnet but the contract code has been updated, then new bytecode will be generated for the contract
  * If this config is enabled or the contract code has not been deployed to the testnet/mainnet, then new bytecode will be generated for the contract

## Compile Project

You can use the `compile` command to compile contract code, the `-n` parameter is used to specify the network type:

```shell
npx @alephium/cli compile -n devent
```

The `compile` command compiles contract code, saves the compiled artifacts, and generates `TypeScript` code based on the artifacts. You can use the generated `TypeScript` code to deploy contracts, execute scripts, query contract states, etc.

## Deploy Contracts

To deploy contracts, you need to write contract deployment scripts. The filenames of deployment scripts must follow this regular expression pattern: `^([0-9]+)_.*.(ts|js)$`. Deployment scripts are executed in the order determined by the numerical prefix in their filenames. You can refer to the documentation [here](../tutorials/quick-start.md#deploy-your-contract) for writing deployment scripts.

You can use the `deploy` command to deploy contracts, the `-n` parameter is used to specify the network type:

```shell
npx @alephium/cli deploy -n devnet
```

When contract deployment is successful, deployment results will be saved to the `artifacts/.deployment.<network_id>.json` file, and it will [generate `TypeScript` code](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/deployments.ts) for [loading deployment results](https://github.com/alephium/nextjs-template/blob/1e5b2b5ce69ba830782383f48210303151937cf2/src/services/utils.tsx#L18).
