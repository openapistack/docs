---
sidebar_position: 4
---

# Request Lifecycle & Handlers

OpenAPIBackend defines a rich set of hooks to intercept and control each step of the request lifecycle. Each handler receives the parsed `Context` object as the first argument, followed by any arguments passed to `.handleRequest()`, such as Express `req`, `res`, and `next`.

## Built-in Lifecycle Handlers

These can be registered to hook into specific steps.

### `preRoutingHandler`

Called **before routing**, after parsing the request. Can be used for logging, metrics, or overriding routing behavior.

```ts
api.register("preRoutingHandler", (c, req, res) => {
  console.log("Request received", req.method, req.url);
});
```

### `postRoutingHandler`

Called **after routing**, regardless of match success. Useful for metrics or auditing.

```ts
api.register("postRoutingHandler", (c, req, res) => {
  console.log("Matched operation:", c.operation?.operationId);
});
```

### `postSecurityHandler`

Called **after all security handlers** have run.

```ts
api.register("postSecurityHandler", (c, req, res) => {
  if (!c.security.authorized) console.warn("Unauthorized access attempt");
});
```

### `preOperationHandler`

Called right **before the operation handler**. Can be used for setting response headers, request mutation, etc.

```ts
api.register("preOperationHandler", (c, req, res) => {
  res.setHeader("x-trace-id", generateTraceId());
});
```

### `postResponseHandler`

Called **after the main operation handler**. You can use this to validate responses or mutate them.

```ts
api.register("postResponseHandler", (c, req, res) => {
  const result = c.api.validateResponse(c.response, c.operation);
  if (result.errors) {
    return res
      .status(500)
      .json({ error: "Invalid response", details: result.errors });
  }
  return res.send(c.response);
});
```

---

## Error Handlers

### `notFound`

Called if the path doesn't match any operation.

```ts
api.register("notFound", (c, req, res) => {
  res.status(404).json({ error: "Route not found" });
});
```

### `methodNotAllowed`

Called if the path matches but the method doesn't.

```ts
api.register("methodNotAllowed", (c, req, res) => {
  res.status(405).json({ error: "Method not allowed" });
});
```

### `notImplemented`

Called if the operation is matched but **no handler is registered**.

```ts
api.register("notImplemented", (c, req, res) => {
  res.status(501).json({ error: "Not implemented" });
});
```

### `unauthorizedHandler`

Called if the request does not satisfy OpenAPI security requirements.

```ts
api.register("unauthorizedHandler", (c, req, res) => {
  res.status(401).json({ error: "Unauthorized" });
});
```

### `validationFail`

Called if the request validation fails.

```ts
api.register("validationFail", (c, req, res) => {
  res
    .status(400)
    .json({ error: "Validation failed", details: c.validation.errors });
});
```
