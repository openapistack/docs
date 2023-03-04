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
