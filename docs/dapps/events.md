---
sidebar_position: 27
title: Events
sidebar_label: Events
---

Events are immutable, verifiable objects emitted by the smart
contracts, stored and served by the Alephium full node. They play a
critical role in facilitating efficient and transparent communication
between smart contracts and off-chain applications.

There are many use cases for events: DEX can use events to keep track
of all the swaps happening in a token pair. NFT marketplace can use
events to store all the NFT listings. Oracle can use events to signal
requests of certain offchain info from smart contracts. Bridge can use
events to represent certain actions that require consensus from all
the bridge operators, etc.

## Event Object

An event object in Alephium consists of the following attributes:

```
txId            : transaction id
blockHash       : block hash
contractAddress : address of the contract where the event is emitted / special address for system events
eventIndex      : index of the event emitted from the contract / special index for system events
fields          : fields contained in the event
```

There are two types of events in Alephium: *contract events* and
*system events*. The following sections discuss them respectively,
with more details on the `contractAddress`, `eventIndex` and `fields`
attributes.

## Contract Events

As suggested by the name, contract events are custom events emitted by
the contracts:

```rust
Contract Admin(mut admin: Address) {
  event AdminUpdated(previous: Address, new: Address)

  @using(updateFields = true)
  pub fn updateAdmin(newAdmin: Address) -> () {
      checkCaller!(callerAddress!() == admin, 0)

      admin = newAdmin
      emit AdminUpdated(admin, newAdmin)
  }
}
```

In this example, an `AdminUpdated` event is emitted every time `admin`
is updated. This information can be listened to by the off-chain
applications to update their user interfaces or for auditing.

You can subscribe to all events emitted from a contract, or a specific
event emitted from a contract using Alephium's [Web3
SDK](/dapps/alephium-web3):

```typescript
// `adminInstance` is a contract instance of the Admin contract
adminInstance.subscribeAdminUpdatedEvent({
  pollingInterval: 500,
  messageCallback: (event: AdminTypes.AdminUpdatedEvent): Promise<void> => {
    console.log('got admin updated event:', event)
    return Promise.resolve()
  },
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
})
```

In `AdminUpdated`'s [event object](#event-data-structure),
`contractAddress` represents the contract address of `adminInstance`,
`eventIndex` is `0` since `AdminUpdated` is the first event defined in
the `Admin` contract (0-based index). `fields` contains two
addresses: one for the previous admin, the other for the new admin.

## System Events

Compared to the contract events, which are emitted explicitly from the
contracts, system events are emitted automatically by the Alephium
full node. Currently there are two system events:

### ContractCreatedEvent

`ContractCreatedEvent` is emitted when a new contract is created:

```rust
TxScript Deploy(fooByteCode: ByteVec) {
  createContract!{callerAddress!() -> ALPH: 1 ALPH}(fooByteCode, #00, #00)
}
```

In the example above, the `Deploy` transaction script creates a new
`Foo` contract from its contract bytecode. `Foo` contract has no
contract fields, which is why `#00` is passed in as arguments to the
[createContract](/ralph/built-in-functions#createcontract) function. A
`ContractCreatedEvent` system event is emitted after the `Foo`
contract is created.

Alephium's [Web3 SDK](/dapps/alephium-web3) provides a helper function
to subscribe to the `ContractCreatedEvent` event:

```typescript
subscribeContractCreatedEvent({
  pollingInterval: 500,
  messageCallback: (event: ContractCreatedEvent): Promise<void> => {
    console.log('got contract created event:', event)
    return Promise.resolve()
  },
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
})
```

In `ContractCreatedEvent`'s [event object](#event-data-structure),
`eventIndex` is set to `-1`, a value specifically set aside for the
`ContractCreatedEvent` event. `contractAddress` is set to a special
value calculated based on the `eventIndex` and contract
group. `fields` contains the address of the newly created contract as
well as its parent contract id if it exists.

### ContractDestroyedEvent

`ContractDestroyedEvent` is emitted when a contract is destroyed:

```rust
Contract Foo() {
  @using(assetsInContract = true)
  pub fn destroy() -> () {
    destroySelf!(callerAddress!())
  }
}
```

In the example above, after the `destroy` function is called, `Foo`
contract will be destroyed and a `ContractDestroyedEvent` system event
will be emitted by the Alephium full node.

Alephium's [Web3 SDK](/dapps/alephium-web3) provides a helper function
to subscribe to the `ContractDestroyedEvent` event:

```typescript
subscribeContractDestroyedEvent({
  pollingInterval: 500,
  messageCallback: (event: ContractDestroyedEvent): Promise<void> => {
    console.log('got contract destroyed event:', event)
    return Promise.resolve()
  },
  errorCallback: (error: any, subscription): Promise<void> => {
    console.log(error)
    subscription.unsubscribe()
    return Promise.resolve()
  }
})
```

In `ContractDestroyedEvent`'s [event object](#event-data-structure),
`eventIndex` is set to `-2`, a value specifically allocated for the
`ContractDestroyedEvent` event. `contractAddress` is set to a special
value calculated based on the `eventIndex` and contract
group. `fields` contains the address of the destroyed contract.

## Configuration

Alephium's full node allows flexible configuration of how events
should be stored and indexed. By default it doesn't store events to
keep the full node lightweight.

You can enable storing events using the following flag:

```
alephium.node.event-log.enabled=true
```

This allows us to query [contract
events](/dapps/events#contract-events) and [system
events](/dapps/events#system-events) based on the contract
address.

To enable querying events based on transaction id and block hash, you
need to enable the following flags:

```
alephium.node.event-log.index-by-tx-id = true
alephium.node.event-log.index-by-block-hash = true
```

By default, events emitted from all contracts are stored. But if you
know what contracts you are interested in getting events for, you can
use the following configuration:

```
alephium.node.event-log.contract-addresses = [$CONTRACT_ADDR_1, $CONTRACT_ADDR_2]
```

This way, you will save disk space because your full node only stores
the events you are interested in.

## Further Reading

The event subscription functions in Alephium's [Web3
SDK](/dapps/alephium-web3) are built on top of Alephium's full node
APIs. For more details about the APIs please refer to the [OpenAPI
Documentation](https://wallet.mainnet.alephium.org/docs).

Other than `ContractEvent` and `SystemEvent`, there is in fact another
(special) system event called `DebugEvent`, please refer to
[Debugging](/dapps/testing-and-debugging#debugging) for more
information.
