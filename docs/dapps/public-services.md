---
sidebar_position: 40
title: Public Services
sidebar_label: Public services
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Testnet Faucet

To receive testnet tokens, simply tweet `#alephium` followed by your wallet address (the one you use on testnet).

```
#alephium 1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy
```

## Node and Explorer APIs

Currently, the following API services are maintained. Note that all APIs are rate limited to prevent spam.
* `https://wallet-v15.mainnet.alephium.org` for mainnet with node v1.5.X ([Test](https://wallet-v15.mainnet.alephium.org/infos/version))
* `https://wallet-v15.testnet.alephium.org` for testnet with node v1.5.X ([Test](https://wallet-v15.testnet.alephium.org/infos/version))
* `https://backend-v110.mainnet.alephium.org` for mainnet with explorer backend v1.10.X ([Test](https://backend-v110.mainnet.alephium.org/infos))
* `https://backend-v110.testnet.alephium.org` for testnet with explorer backend v1.10.X ([Test](https://backend-v110.testnet.alephium.org/infos))

As the project is still under active development, all APIs are versioned. Typically, only the latest versions are maintained, but any API upgrades will be announced to the community in advance.

## API Redirects

We also maintain the following API redirects to give users time to migrate from the old API.

import redirects from "./api-redirects.json";

<ul>{redirects && redirects.map((redirection) => {
    const from = redirection['from'];
    const to = redirection['to'];
    const additionalPath = from.includes('wallet') ? '/infos/version' : from.includes('backend') ? '/infos' : '';
    return <li key={from}><code>{from}</code> (<a href={`${from}${additionalPath}`}>Test</a>) -> <code>{to}</code></li>;
})}</ul>
