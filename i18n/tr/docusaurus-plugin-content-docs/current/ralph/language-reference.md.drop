---
sidebar_position: 10
title: Ralph Language Reference
sidebar_label: Ralph language reference
---

:::caution
This page is WIP until our dApps stack is more stable 🚧.
:::

A reference for the Ralph smart contract language.

## Notation used in this document

`<thing>` just means you replace it with the appropriately described text. For
example, `<number>` means type a literal number value: 6, 7, 44, etc.

`[thing]` means the text is optional unless otherwise specified (like array syntax).

## Primitive types

Ralph has a nice small core of primitives.

|             Type | Constructor                                                                                                   |
| ---------------: | ------------------------------------------------------------------------------------------------------------- |
|           **()** | None (a return statement with nothing)                                                                        |
|         **Bool** | <code>false, true, <, >, >=, <=, ==, !=, &&, &#124;&#124;, !</code>                                           |
|         **I256** | <code>-&lt;number&gt;, &lt;number&gt;i, +, -, \*, /, %, ⊕, ⊖, ⊗, &lt;&lt;, &gt;&gt;, >, ^, &#124;</code>      |
|         **U256** | <code>&nbsp;&lt;number&gt;, &lt;number&gt;u, +, -, \*, /, %, ⊕, ⊖, ⊗, &lt;&lt;, &gt;&gt;, >, ^, &#124;</code> |
|      **Address** | `@<address>`, `nullAddress!()`                                                                                |
|      **ByteVec** | `#<hex-string>, ++`                                                                                           |
| **[type; size]** | `[<value...>]`, type example: `[Address; 6]`                                                                  |

You'll notice there is no `String` type. Instead the `ByteVec` type can be used
to hold onto textual data, or a `[U256; N]` array if you need to modify it.

:::note
For numbers you can also use the following:

- 1_000_000_000
- 0.000_001
- 1e18
- 1e-18
- 1_000e9

:::

## Syntax

Ralph as you'll soon learn is a simple language. So simple that it can be summed
up in this table below, which presents various mechanisms which are normally
available in programming languages.

:::note
**Ralph does not use semi-colons!** It can be easy to accidentally add them due
to muscle memory.
:::

|           Token | Constructor                                                                        |
| --------------: | ---------------------------------------------------------------------------------- |
|     **Comment** | `//`                                                                               |
|  **Assignment** | `let [mut] <name> = ...`                                                           |
|  **Assignment** | `<arg> = <value>` or `(<arg1>, <argN>) = funcMultipleRetVals()`                    |
|    **Function** | `[pub] [payable] fn <name>(arg: <type>) -> <type> { return <thingN, ...> }`        |
| **Conditional** | `if <boolean expression> { <statements> } [else if { <statements> } else { ... }]` |
|   **Iteration** | `while <boolean expression> { <statements> }`                                      |
|       **Event** | `event <TupleName>(field1: <type>, field2: <type>, fieldN: <type>, ...)`           |
|       **Event** | `emit <TupleName>(<value1>, <value2>, <valueN>, ...)`                              |
|   **Structure** | `interface <InterfaceName> { ... }`                                                |
|   **Structure** | `Contract ContractName([mut] fieldN: <type>) [extends <InterfaceName>] { ... }`  |
|   **Structure** | `TxScript <ScriptName>([mut] fieldN: <type>) { ... }`                              |

### Interfaces, Contracts, and TxScripts

Below is a "code template" of the general structure of what smart contracts will
look like. They take on a class-like appearance, similar to JavaScript, C#, and
other OOP languages.

```
// To create an interface:
interface InterfaceName {
  event TupleName(field1: U256, field2: U256)
  pub fn foo() -> ()
}

// To create a contract:
Contract ContractName([mut] arg1: <type>, [mut] arg2: <type>, ...etc) implements InterfaceName {
  [@using(preapprovedAssets = <Bool>, assetsInContract = <Bool>)]
  [pub] fn functionName(arg1: <type>, ...etc) -> (<return type>) {
    return <thing>
  }

  fn foo() {
    emit TupleName(1, 2)
  }
}

// To invoke the contract:
TxScript ScriptNameCanBeAnything {
  // Note this signature. It must be just like this.
  [pub] [payable] fn main() -> () {
    contract = ContractName(#<contract-id>)
    result = contract.functionName(arg)
    anotherFunc()
  }

  fn anotherFunc() -> () {
    ...
  }
}
```

`pub` means the function can be called outside the contract / script.

`@using` is a function annotation.

To understand `preapprovedAssets` and `assetsInContract` please go read about
the [Asset Permission System](/dapps/Asset-Permission-System].

:::note
You can call contract methods right after the contract constructor, i.e.
`ContractName(...).function()`.
:::
