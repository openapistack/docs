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
  $ openapi typegen [DEFINITION] [-h] [-D] [-B] [-R /] [-H <value>...] [-V] [-S http://localhost:9000...] [-I
    {"info":{"version":"1.0.0"}}...] [-E x-internal] [-C default|all|openapi_client_axios|openapi_backend] [-U] [-b
    <value>] [--client] [--backend] [-A]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -A, --[no-]type-aliases                                       Generate module level type aliases for schema components
                                                                defined in spec
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -U, --[no-]remove-unreferenced                                Remove unreferenced components, you can skip individual
                                                                component being removed by setting x-openapicmd-keep to
                                                                true
  -V, --validate                                                validate against openapi schema
  -b, --banner=<value>                                          include a banner comment at the top of the generated
                                                                file
  -h, --help                                                    Show CLI help.
      --backend                                                 Generate types for openapi-backend
      --client                                                  Generate types for openapi-client-axios (default)

EXAMPLES
  $ openapi typegen --client ./openapi.yml > openapi.d.ts
  $ openapi typegen --backend ./openapi.yml > openapi.d.ts
```

## Importing generated types

You can directly import types defined as schemas in your openapi spec as Typescript types:

```ts
import type { Pet, User } from "./openapi.d.ts";

const myPet: Pet = {
  id: 1,
  name: "My Pet",
  tag: "My Tag",
};

const myUser: User = {
  id: 1,
  name: "My User",
};
```

## Typesafe Clients

The output of `openapi typegen --client` exports a type called `Client`, which can be directly used with clients created with `OpenAPIClientAxios`.

Both the `api.getClient()` and `api.init()` methods support passing in a Client type.

```typescript
import { Client as PetStoreClient } from "./openapi.d.ts";

const client = await api.init<PetStoreClient>();
const client = await api.getClient<PetStoreClient>();
```

![TypeScript IntelliSense](/img/intellisense.gif)

## Typesafe Backends

To generate types for the backend, use `openapi typegen --backend`.

See documentation for [usage of openapi-backend with TypeScript](/docs/openapi-backend/typescript).
