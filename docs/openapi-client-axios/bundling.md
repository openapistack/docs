---
sidebar_position: 10
---

# Bundling

When using `openapi-client-axios` in a project with a bundler such as webpack, esbuild or rollup, you can include your
openapi definition in the bundle to avoid a performance penalty from having to load the openapi file from a remote URL
to initialize the client.

This can be done by directly passing the definition as a loaded javascript object, instead of an URL:

```js
import OpenAPIClientAxios from "openapi-client-axios";
import definition from "./openapi.json"; // most bundlers can load json files as importable javascript objects

const api = new OpenAPIClientAxios({ definition });
```

The bundling approach has the additional benefit of creating an atomic standalone client module, which doesn't depend
on any external resources.

## Optimizing the bundle

:::info

In most cases you want to keep your javascript bundle as small as possible; so including the entire openapi definition
file in the bundle may not be optimal.

Consider all the metadata included in the OpenAPI spec such as examples, descriptions, schemas and contact
information, none of which is essential for openapi-client-axios to operate during runtime.

:::

[The `openapicmd read` command](/docs/openapicmd/intro/#openapi-read) ships with a `--strip` flag designed to remove
all unnecessary metadata from your openapi file before bundling for use with openapi-client-axios.

To create an optimized runtime version of your openapi definition:

```sh
npx openapicmd read --strip openapi_client_axios --format json openapi.json > openapi-runtime.json
```

This file can then be included in your runtime bundle:

```js
import definition from "./openapi-runtime.json";

const api = new OpenAPIClientAxios({ definition });
```

:::caution

Note that for [typegen](/docs/openapi-client-axios/typegen/), you should always use the full version of the openapi file, not the optimized runtime
version created with openapicmd.

:::
