---
title: Invoking APIs
sidebar_position: 1
---

:::info

In this example we will write code to interact with a public mock API available on [example.openapistack.co/openapi.json](https://example.openapistack.co/openapi.json)

:::

## Prerequisites

Before starting, make sure to install `openapi-client-axios` and `axios` as dependencies in your project:

```
npm i openapi-client-axios axios
```

## Creating a client instace

To call our API, we import `openapi-client-axios` and configure it by passing the OpenAPI definition URL:

```ts
import { OpenAPIClientAxios } from 'openapi-client-axios';

const api = new OpenAPIClientAxios({
  definition: 'https://example.openapistack.co/openapi.json',
});
```

*Note: You may also pass a definition object or path to a definition file depending on your setup.*

To initialise a client instance, we call `api.init()`:

```ts
const client = await api.init();
```

## Adding Types

For type-safety and code autocompletion we use the CLI command `openapicmd typegen` to generate types.

This command will create a file named `openapi.d.ts` in the src directory:

```sh
npx openapicmd typegen https://example.openapistack.co/openapi.json > src/openapi.d.ts
```

We can now import the types and use them to create our fully typed API client by passing the `Client` type to our `init` call.

```ts
import type { Client } from './openapi.d.ts';

const client = await api.init<Client>();
```

## Invoking the API

Finally, we are ready to call our API using [operation methods](/docs/openapi-client-axios/usage/#operation-methods) based on our `openapi.yml` spec:

```ts
const petsResponse = await client.getPets();

const pets = petsResponse.data; // Pet[] inferred as type as defined in the API
```

## Full Example

Putting everything together, here is our full code example combining all the steps:

```ts
// src/example.ts
import { OpenAPIClientAxios } from 'openapi-client-axios';
import type { Client } from './openapi.d.ts';

const api = new OpenAPIClientAxios({
  definition: 'https://example.openapistack.co/openapi.json'
});

async function main() {
  const client = await api.init<Client>();

  const petsResponse = await client.getPets();
  const pets = petsResponse.data; // Pet[] inferred as type
  console.log('getPets response', petsResponse.status, pets);
}
main();
```
