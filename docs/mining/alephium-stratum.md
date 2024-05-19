---
sidebar_position: 30
title: Alephium Stratum
sidebar_label: Alephium stratum
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

The proposal is based on: [https://eips.ethereum.org/EIPS/eip-1571](https://eips.ethereum.org/EIPS/eip-1571).
Messages follow EIP-1571's JSON-RPC-2.0 specification.

? - denotes that a property is optional

```
Methods:
  Requests:
    mining.hello
    mining.subscribe
    mining.authorize
    mining.submit
    mining.noop
    connection.set_gzip

  Notifications
    mining.set_extranonce
    mining.set_target
    mining.set_cleanjobs
    mining.notify

mining.hello
client { id: "0", method: "mining.hello", params: [<agent: string>, "AlephiumStratum/1.0.0"] }
server { id: "0", result: ["AlephiumStratum/1.0.0, <resume: bool>, <timeoutSeconds: hex>, <maxErrors: hex>, <node: string>] }

optional connection.set_gzip
client { id: "1", method: "connection.set_gzip" }
server { id: "1", result: <ok: bool> }

mining.subscribe
client { id: "2", method: "mining.subscribe", params: <sessionId?: string> }
server { id: "2", result: <sessionId: string | empty string> }

mining.authorize
client { id: "3", method: "mining.authorize", params: [<login: wallet.worker>, <password?: string>] }
server { id: "3", result: <workerId: string | empty string> }

mining.set_extranonce
server { method: "mining.set_extranonce", params: <extraNonce: hex> }

mining.set_target
server { method: "mining.set_target", params: <target: hex> }

mining.set_cleanjobs
server { method: "mining.set_cleanjobs", params: <active: bool> }

mining.notify
server { method: "mining.notify", params: [<jobId: string>, <chainIndex: hex>, <header: hex>] }

mining.submit
client { id: "4", method: "mining.submit", params: [<jobId: string>, <nonceSansExtraNonce: hex>, <workerId?: string>] }
server { id: "4", result: <ok: bool> }

mining.noop
client { id: "5", method: "mining.noop" }
server { id: "5", result: "1" }
```
