![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
# @astar.js dapp template

This template provide access to Astar's modules by using [astar.js](https://github.com/AstarNetwork/astar.js)

# Getting Started

More documentation and examples on [wiki](https://github.com/astarNetwork/astar.js/wiki)

- Install dependencies

```
yarn
```
- Start the app

```
yarn start
```

# Usage

- App.tsx is the entry point of the app. It has the following code for connecting to the node:


```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';

async function main() {
    const provider = new WsProvider('ws://localhost:9944');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());

    process.exit(0);
}

main()
```

- Use api to interact with node

```ts
// query and display account data
const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
console.log(data.toHuman())
```

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [api-derive](./packages/api-derive)
  - Contains utility classes and derived methods.
- [types-definitions](./packages/type-definitions)
  - Polkadot.js type definitions for Astar Network.
- [types](./packages/types)
  - Polkadot.js type definitions for Astar Network.
- [sdk-core](./packages/sdk-core)
  - core api libraries
- [precomplies](./packages/precomplies)
  - precomplied contracts abi

## How-to

### Update polkadot libraries

```shell
yarn up @polkadot/api @polkadot/api-augment @polkadot/api-derive @polkadot/rpc-core @polkadot/types @polkadot/types-codec
```
