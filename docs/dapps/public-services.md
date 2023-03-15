---
sidebar_position: 40
title: Public Services
sidebar_label: Public services
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Testnet Faucet

The Testnet Faucet is a way to receive testnet-v1 tokens into a given wallet.

### Via Twitter

To receive testnet-v16 tokens, simply tweet `#alephium` followed by your wallet address (the one you use on testnet).

```
#alephium 1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy
```

### Via HTTP API

Another way to receive testnet-v16 tokens is via an HTTP call, giving your wallet address in the request body, simply as follows:

```
curl -X POST -d '1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy' https://faucet.testnet.alephium.org/send
```

Mind that the faucet is throttling requests for few minutes.

## Node and Explorer APIs

Currently, the following API services are maintained. Note that all APIs are rate limited to prevent spam.
* `https://wallet-v16.mainnet.alephium.org` for mainnet with node v1.6.X, deprecated ([Test](https://wallet-v16.mainnet.alephium.org/infos/version))
* `https://wallet-v17.mainnet.alephium.org` for mainnet with node v1.7.X ([Test](https://wallet-v17.mainnet.alephium.org/infos/version))
* `https://wallet-v17.testnet.alephium.org` for testnet with node v1.7.X ([Test](https://wallet-v17.testnet.alephium.org/infos/version))
* `https://backend-v112.mainnet.alephium.org` for mainnet with explorer backend v1.12.X, deprecated ([Test](https://backend-v112.mainnet.alephium.org/infos))
* `https://backend-v113.mainnet.alephium.org` for mainnet with explorer backend v1.13.X ([Test](https://backend-v113.mainnet.alephium.org/infos))
* `https://backend-v112.testnet.alephium.org` for testnet with explorer backend v1.12.X, deprecated ([Test](https://backend-v112.testnet.alephium.org/infos))
* `https://backend-v113.testnet.alephium.org` for testnet with explorer backend v1.13.X ([Test](https://backend-v113.testnet.alephium.org/infos))

As the project is still under active development, all APIs are versioned. Typically, only the latest versions are maintained, but any API upgrades will be announced to the community in advance.

## API Aliases

We maintain the following API aliases to give users time to migrate from the old API.

import aliases from "./api-aliases.json";

export const Aliases = ({aliases, type}) => (
    <Box>
        {aliases.length > 0 && <h3>{type} Aliases</h3>}
        <ul>{aliases && aliases.map((alias) => {
            const from = alias['from'];
            const to = alias['to'];
            const additionalPath = from.includes('wallet') ? '/infos/version' : from.includes('backend') ? '/infos' : '';
            return <li key={from}><code>{from}</code> (<a href={`${from}${additionalPath}`}>Test</a>) -> <code>{to}</code></li>;
        })}</ul>
    </Box>
)

<Aliases aliases={aliases['current']} type='Current' />
<Aliases aliases={aliases['deprecated']} type='Deprecated' />
