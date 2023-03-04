---
sidebar_position: 5
---

# Response validation

While not recommended for production APIs, to enable response validation for your handlers, you can register a [`postResponseHandler`](/docs/openapi-backend/api#postresponsehandler-handler)
to add a response validation step using [`validateResponse`](/docs/openapi-backend/api#validateresponseres-operation).

```ts
api.register({
  getPets: (c) => {
    // when a postResponseHandler is registered, your operation handlers' return value gets passed to context.response
    return [{ id: 1, name: "Garfield" }];
  },
  postResponseHandler: (c: Context, _req: Request, res: Response) => {
    const valid = c.api.validateResponse(c.response, c.operation);
    if (valid.errors) {
      // response validation failed
      return res.status(502).json({ status: 502, err: valid.errors });
    }
    return res.status(200).json(c.response);
  },
});
```

It's also possible to validate the response headers using [`validateResponseHeaders`](/docs/openapi-backend/api#validateresponseheadersheaders-operation-opts).

```javascript
api.register({
  getPets: (c) => {
    // when a postResponseHandler is registered, your operation handlers' return value gets passed to context.response
    return [{ id: 1, name: "Garfield" }];
  },
  postResponseHandler: (c, req, res) => {
    const valid = c.api.validateResponseHeaders(res.headers, c.operation, {
      statusCode: res.statusCode,
      setMatchType: "exact",
    });
    if (valid.errors) {
      // response validation failed
      return res.status(502).json({ status: 502, err: valid.errors });
    }
    return res.status(200).json(c.response);
  },
});
```
