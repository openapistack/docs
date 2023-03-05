---
sidebar_position: 3
---

# Generating types

:::tip

You can set up a script in package.json to easily update types when the openapi spec is changed.

```json
{
  "scripts": {
    "openapi": "npx openapi-client-axios-typegen typegen ./openapi.yaml > src/types/openapi.d.ts"
  }
}
```

:::

`openapi-client-axios-typegen` is a command line tool to generate easy to use Typescript types from
OpenAPI files.

![TypeScript IntelliSense](/img/intellisense.gif)

## Usage

```
npm install -g openapi-client-axios-typegen
```

or with npx:

```
npx openapi-client-axios-typegen
```

```
Usage: typegen [file]

Options:
      --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -t, --transformOperationName                                          [string]

Examples:
  typegen ./openapi.yml > openapi.d.ts
  typegen https://openapistack.co/petstore.openapi.json > openapi.d.ts
```

## Typesafe Clients

The output of `typegen` exports a type called `Client`, which can be directly used with clients created with `OpenAPIClientAxios`.

Both the `api.getClient()` and `api.init()` methods support passing in a Client type.

```typescript
import { Client as PetStoreClient } from "./openapi.d.ts";

const client = await api.init<PetStoreClient>();
const client = await api.getClient<PetStoreClient>();
```

`typegen` supports both local and remote URLs:

```
typegen ./openapi.yaml > openapi.d.ts # local file
typegen https://petstore3.swagger.io/api/v3/openapi.json > openapi.d.ts # remote url
```

## Importing Schemas

You can import schemas and response/request models defined in your openapi definition as Typescript types:

```ts
import { Components } from "./openapi.d.ts";

export type Pet = Components.Schemas.Pet;
export type User = Components.Schemas.User;

export type AddPetRequest = Paths.AddPet.RequestBody;
export type AddPetResponse = Paths.AddPet.Responses.$200;
```

## Advanced: `--transformOperationName`

You can provide a predicate function to typegen to transform operation names in the output type file.

The function needs to be exported from a module:

```ts
// operation-transform.ts
export const prefix = (operationId: string) => ["$", operationId].join("");
```

Example usage:

```
typegen ./openapi.yaml --transformOperationName operation-transform.prefix > openapi.d.ts
```
