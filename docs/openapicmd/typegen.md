---
sidebar_position: 1
---

# Generating types

Use the `typegen` command to generate Typescript types from your OpenAPI definition.

```
openapi typegen ./openapi.yml > openapi.d.ts
```

or with npx:

```
npx openapicmd typegen ./openapi.yml > openapi.d.ts
```

:::tip

You can also use remote URLs to pass your openapi spec:

```
openapi typegen https://example.openapistack.co/openapi.json
```

:::

## Usage

```
Generate types from openapi definition

USAGE
  $ openapi typegen [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                                                  resolve remote $ref pointers

  -D, --dereference                                             resolve $ref pointers

  -I, --inject={"info":{"version":"1.0.0"}}                     inject JSON to definition with deep merge

  -V, --validate                                                validate against openapi schema

  -h, --help                                                    show CLI help

EXAMPLE
  $ openapi typegen ./openapi.yml > openapi.d.ts
```

## Importing Schemas

You can import schemas and response/request models defined in your openapi definition as Typescript types:

```ts
import type { Components, Paths } from "./openapi.d.ts";

export type Pet = Components.Schemas.Pet;
export type User = Components.Schemas.User;

export type AddPetRequest = Paths.AddPet.RequestBody;
export type AddPetResponse = Paths.AddPet.Responses.$200;
```


## Typesafe Clients

The output of `typegen` exports a type called `Client`, which can be directly used with clients created with `OpenAPIClientAxios`.

Both the `api.getClient()` and `api.init()` methods support passing in a Client type.

```typescript
import { Client as PetStoreClient } from "./openapi.d.ts";

const client = await api.init<PetStoreClient>();
const client = await api.getClient<PetStoreClient>();
```

![TypeScript IntelliSense](/img/intellisense.gif)

:::info

The `typegen` command uses [`openapi-client-axios-typegen`](/docs/openapi-client-axios/typegen/) under the hood.

:::