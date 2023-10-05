---
title: Calling APIs
sidebar_position: 1
---

:::info

In this example, we will call the mock API available on [example.openapistack.co/openapi.json](https://example.openapistack.co/openapi.json)

:::


To call our API, we will import `openapi-client-axios` and create a client.

```ts
import { OpenAPIClientAxios } from 'openapi-client-axios';

const api = new OpenAPIClientAxios({
  definition: 'https://example.openapistack.co/openapi.json',
})
```

To create a client instance, we initialize with `api.init()`.

```ts
const client = await api.init();
```

## Adding Types

We now have a working API client ready to call our API, but no types yet.

To generate types for our client, we use the CLI command `openapicmd typegen` and save the output to a file called `openapi.d.ts`:

```sh
npx openapicmd typegen https://example.openapistack.co/openapi.json > src/openapi.d.ts
```

We can now import the types in our code, and use them to create our fully typed API client

```ts
import type { Client } from './openapi.d.ts';

const client = await api.init<Client>();
```

Finally, we are ready to call our API using operationIds defined in our `openapi.yml` spec:

```ts
const petsResponse = await client.getPets();
console.log('getPets response', petsResponse.status, petsResponse.data);
```

## Full Example

Putting everything together, here is our full code example:

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
  console.log('getPets response', petsResponse.status, petsResponse.data);
}
main();
```