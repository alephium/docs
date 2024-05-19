---
sidebar_position: 41
title: Testnet
sidebar_label: Testnet
---

`Testnet` can be
launched using the same steps outlined in the [get
started](full-node/getting-started) guide using Java directly or with
Docker. Compared to `Mainnet`, the following configurations needs to
be updated in the `${ALEPHIUM_HOME}/user.conf` file:

```conf
alephium.network.network-id = 1
alephium.discovery.bootstrap = ["testnet-bootstrap0.alephium.org:9973","testnet-bootstrap1.alephium.org:9973"]
```

You can use [extension
wallet](/wallet/Basic%20functions#request-testnet-alph-using-extension-wallet)
or [desktop
wallet](/wallet/Basic%20functions#request-testnet-alph-using-desktop-wallet)
to get some `ALPH` from the testnet faucet.
