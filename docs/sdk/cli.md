---
sidebar_position: 70
title: Alephium CLI
sidebar_label: Alephium CLI
---

Alephium CLI is a tool for creating projects, compiling contracts, and deploying contracts.

## Create a Project

We can create a new project using the `init` command, the `-t` parameter is used to specify the project type:

```shell
npx @alephium/cli init my-dapp -t react
```

There are three available project types:

* `base`: Create a Node.js project, this is the default type if the `-t` parameter is not specified
* `react`: Create a React project
* `nextjs`: Create a Next.js project

## Configuration

In order to use the Alephium CLI, we need to have a configuration file. The default config file is `alephium.config.ts/js` located in the project root directory. The following is an example of a configuration file:

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

In most cases, we only need to specify the `networks` config. The other optional configs work well by default, but we can also configure them if needed:

<table>
 <thead>
   <tr>
     <th>Name</th>
     <th>Description</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>sourceDir</td>
     <td>Location for contract code, it is `<project_root>/contracts` by default</td>
   </tr>
   <tr>
     <td>artifactDir</td>
     <td>Location for compiled contract artifacts, it is `<project_root>/artifacts` by default</td>
   </tr>
   <tr>
     <td>deployToMultipleGroupsInParallel</td>
     <td>If the contract needs to be deployed to multiple groups, this config specifies whether to deploy them in parallel, it is `true` by default</td>
   </tr>
   <tr>
     <td>deploymentScriptDir</td>
     <td>Location for deployment scripts, it is `<project_root>/scripts` by default</td>
   </tr>
   <tr>
     <td rowspan={8}>compilerOptions</td>
   </tr>
   <tr>
     <td><i>ignoreUnusedConstantsWarnings</i></td>
   </tr>
   <tr>
     <td><i>ignoreUnusedVariablesWarnings</i></td>
   </tr>
   <tr>
     <td><i>ignoreUnusedFieldsWarnings</i></td>
   </tr>
   <tr>
     <td><i>ignoreUnusedPrivateFunctionsWarnings</i></td>
   </tr>
   <tr>
     <td><i>ignoreUpdateFieldsCheckWarnings</i><br/>Ignore compiler warnings if contract functions update contract fields but does not have the `updateField` annotation</td>
   </tr>
   <tr>
     <td><i>ignoreCheckExternalCallerWarnings</i><br/>Ignore compiler warnings if public contract functions does not have the `checkExternalCaller` annotation</td>
   </tr>
   <tr>
     <td><i>errorOnWarnings</i><br/>Compiler warnings will be treated as errors if this config is enabled</td>
   </tr>
   <tr>
     <td>skipRecompile</td>
     <td>Specify whether contract code should be recompiled when deploying contracts, it is `false` by default</td>
   </tr>
   <tr>
     <td>forceRecompile</td>
     <td>
       The purpose of this config is to maintain backward compatibility, it is disabled by default. More concretely:
       <ul>
         <li>
           If this config is disabled and the contract code has already been deployed to the testnet/mainnet without any updates, then no new bytecode will be generated for the contract
         </li>
         <li>
           If this config is disabled and the contract code has already been deployed to the testnet/mainnet but the contract code has been updated, then new bytecode will be generated for the contract
         </li>
         <li>
           If this config is enabled or the contract code has not been deployed to the testnet/mainnet, then new bytecode will be generated for the contract
         </li>
       </ul>
     </td>
   </tr>
   <tr>
     <td>enableDebugMode</td>
     <td>Alephium CLI will print out network requests and error stack traces if enabled</td>
   </tr>
 </tbody>
</table>

## Compile Contracts

After project is created, we can use the `compile` command to compile contract code, the `-n` parameter is used to specify the network type:

```shell
npx @alephium/cli compile -n devent
```

The `compile` command compiles contract code, saves the compiled artifacts, and generates `TypeScript` code based on the artifacts. We can use the generated `TypeScript` code to [interact with the contracts](./interact-with-contracts.md).

## Deploy Contracts

To deploy contracts, we need to write the contract deployment scripts. The file names of the deployment scripts must follow this regular expression pattern: `^([0-9]+)_.*.(ts|js)$`, and they will be executed according to the same numerical order of their file names. Please refer to the documentation [here](/dapps/tutorials/quick-start#deploy-your-contract) for writing deployment scripts.

We can use the `deploy` command to deploy contracts, the `-n` parameter is used to specify the network type:

```shell
npx @alephium/cli deploy -n devnet
```

When contract deployment is successful, deployment results will be saved to the `artifacts/.deployment.<network_id>.json` file, and it will [generate `TypeScript` code](https://github.com/alephium/nextjs-template/blob/main/artifacts/ts/deployments.ts) for [loading deployment results](https://github.com/alephium/nextjs-template/blob/1e5b2b5ce69ba830782383f48210303151937cf2/src/services/utils.tsx#L18).

After contracts are well tested, we can deploy them to the `Mainnet` by simply switching the network type:

```shell
npx @alephium/cli deploy -n mainnet
```
