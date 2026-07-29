---
sidebar_position: 4
---

# Request validation

All you need to enable request validation is to register a [`validationFail`](/docs/openapi-backend/api#validationfail-handler) handler.

```ts
function validationFailHandler(c: Context, _req: Request, res: Response) {
  return res.status(400).json({ status: 400, err: c.validation.errors });
}
api.register("validationFail", validationFailHandler);
```

Once registered, this handler gets called if any JSON Schemas in either operation parameters (in: path, query, header, cookie) or requestPayload don't match the request.

The context object `c` gets a `validation` property with the [validation result](/docs/openapi-backend/api#validationresult-object).

## Controlling when requests get validated

Request validation is enabled by default. Pass [`validate: false`](/docs/openapi-backend/api#parameter-optsvalidate) to turn it off entirely, which also skips building the Ajv validators at startup.

```ts
const api = new OpenAPIBackend({ definition, validate: false });
```

You can also pass a predicate to decide per request. It receives the context object followed by the same handler arguments you pass to `handleRequest()`, and validation runs only when it returns `true`.

```ts
const api = new OpenAPIBackend({
  definition,
  // skip validation for internal traffic, validate everything else
  validate: (c, req: Request, res: Response) => !req.headers["x-internal-request"],
});
```

Note that type coercion happens as part of validation, so when [`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes) is enabled, requests your predicate skips won't have their path and query parameters coerced either.

## Extended Formats

To add validation for JSON Schema formats like `email`, `uri`, `date-time`, `uuid` you can use the [`customizeAjv`](/docs/openapi-backend/api/#parameter-optscustomizeajvoriginalajv-ajvopts-validationcontext) option when creating your OpenAPIIBackend instance to extend Ajv.

```ts
import addFormats from 'ajv-formats';

const api = new OpenAPIBackend({
  definition,
  customizeAjv: (ajv) => {
    addFormats(ajv, { mode: 'fast', formats: ['email', 'uri', 'date-time', 'uuid'] });

    return ajv;
  },
});
```

You can simply opt to add all formats with `addFormats(ajv)`. Warning: this may slow down the initialisation of openapi-backend, and is not recommended in FaaS environments.

See [ajv-formats documentation](https://ajv.js.org/packages/ajv-formats.html) for more configuration options.
