---
sidebar_position: 3
title: Use with React Query
---

To use `openapi-client-axios` in a declarative way in the frontend, we recommend using [TanStack Query](https://tanstack.com/query/latest) (previously known as React Query) together with type safe clients created with openapi-stack.

## Example with React Query

First, let's set up our type safe API client:

:::tip
Use the [`openapicmd typegen`](/docs/openapicmd/typegen/) command to generate the `openapi.d.ts` type file for your API.
:::

:::note
For optimal performance, it's recommended to pass the definition as a JS object instead or fetching it from a URL in runtime.
:::

```ts
// api.ts
import { OpenAPIClientAxios } from 'openapi-client-axios';
import type { Client } from './openapi.d.ts';

const api = new OpenAPIClientAxios({
  definition: 'https://example.openapistack.co/openapi.json',
});

export const getApiClient = async () => {
  const client = await api.getClient<Client>();

  // add auth token
  client.default.headers['authorization'] = `Bearer ${API_TOKEN}`;

  return client;
}
```

Now we are ready to use our type safe client with React Query:

```tsx
// PetView.tsx
import { useQuery } from 'react-query';
import { getApiClient } from './api';
import Loader from './Loader';

export const PetView = (props: { petId: string }) => {
  const petQuery = useQuery(
    ['getPetById', props.petId],
    () => getApiClient()
      .then(client => client.getPetById(props.petId))
      .then(res => res.data),
    { enabled: !!props.petId },
  );

  const pet = petQuery.data; // type Pet is inferred from openapi.d.ts

  return (
    <div>
      {petQuery.fetching && <Loader />} 

      {petQuery.data && (/* TODO: show pet information */)}
    </div>
  )
}
```