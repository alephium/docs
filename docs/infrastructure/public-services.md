---
sidebar_position: 10
title: Public Services
sidebar_label: Public services
---


## Testnet Faucet

The Testnet Faucet is a way to receive testnet-v1 tokens into a given wallet.

### Via HTTP API

Another way to receive testnet-v16 tokens is via an HTTP call, giving your wallet address in the request body, simply as follows:

```
curl -X POST -d '1H1GPLkoMGVUfxQcJgtjWTrKV1KJCQooEV5WxPMhP4Zjy' https://faucet.testnet.alephium.org/send
```

Mind that the faucet is throttling requests for few minutes.

## Node and Explorer APIs

Currently, the following API services are maintained. Note that all APIs are rate limited to prevent spam.
* `https://node.mainnet.alephium.org` for mainnet with node v3.X ([Doc](https://node.mainnet.alephium.org/docs))
* `https://node.testnet.alephium.org` for testnet with node v3.X ([Doc](https://node.testnet.alephium.org/docs))
* `https://backend.mainnet.alephium.org` for mainnet with explorer backend v1.19.X ([Doc](https://backend.mainnet.alephium.org/docs))
* `https://backend.testnet.alephium.org` for testnet with explorer backend v1.19.X ([Doc](https://backend.testnet.alephium.org/docs))

As the project is still under active development, all APIs are versioned. Typically, only the latest versions are maintained, but any API upgrades will be announced to the community in advance.

## API Aliases

We maintain the following API aliases to give users time to migrate from the old API.

import aliases from "./api-aliases.json";

export const Aliases = ({aliases, type}) => (
    <div>
        {aliases.length > 0 && <h3>{type} Aliases</h3>}
        <ul>{aliases && aliases.map((alias) => {
            const from = alias['from'];
            const to = alias['to'];
            const additionalPath = from.includes('wallet') ? '/infos/version' : from.includes('backend') ? '/infos' : '';
            return <li key={from}><code>{from}</code> (<a href={`${from}${additionalPath}`}>Test</a>) {`->`}gg <code>{to}</code></li>;
        })}</ul>
    </div>
)

<Aliases aliases={aliases['current']} type='Current' />

## API rate limiting

To ensure the best performance and security, all of our public APIs have implemented rate limiting. This means that there is a limit on the number of requests you can make within a certain time period. As our services evolve and grow, the rate limit may be adjusted based on the actual usage of the service.

To ensure a smooth experience while working within the rate limit, we highly recommend implementing cache and retry mechanisms when making requests to our API services. Caching responses can help reduce the number of API calls, while retrying failed requests can handle temporary issues or errors.

If your application is built with the React framework, you can leverage the ["SWR"](https://www.npmjs.com/package/swr) package available on npm. SWR provides convenient hooks for data fetching and caching, making it easier to work with APIs. Specifically, you can use the `useSWR` hook for handling mutable data and the `useSWRImmutable` hook for handling immutable data such as token metadata.
