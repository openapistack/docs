---
sidebar_position: 8.5
title: Security Best Practices
---

# Security Best Practices

openapi-backend routes requests, runs your security handlers and validates requests against your OpenAPI definition.
But in the default non-strict mode, **it doesn't reject a request just because its security check or validation failed.** It
records the result on the [Context object](/docs/openapi-backend/api#context-object), and enforcing it is up to you.

This page covers the most common ways openapi-backend gets set up insecurely, and how to fix each one. The full
contract is in the openapi-backend [threat model](https://github.com/openapistack/openapi-backend/blob/main/docs/threat-model.md).

:::tip

Use [openapi-backend-codeql](#static-analysis-with-codeql) to find these problems in your code automatically.

:::

## TL;DR

- Set [`strict: true`](/docs/openapi-backend/api#parameter-optsstrict) in production.
- Register a security handler for every security scheme in your definition.
- Register an [`unauthorizedHandler`](/docs/openapi-backend/api#unauthorizedhandler-handler) and a
  [`validationFail`](/docs/openapi-backend/api#validationfail-handler) handler if you want custom error responses.
- Wrap `handleRequest()` in `try` / `catch`.

## Enforce security requirements

Security handlers compute `c.security.authorized`, but don't stop request handling on their own. Without an
`unauthorizedHandler` or `strict: true`, the operation handler still runs for requests that fail their security
requirements. openapi-backend logs a warning once, and that's it.

❌ Insecure: anyone can delete users

```javascript
const api = new OpenAPIBackend({
  definition: "./openapi.yml", // deleteUser requires a JWT
  securityHandlers: {
    jwt: (c) => verifyJwt(c.request.headers.authorization),
  },
  handlers: {
    deleteUser: (c) => users.delete(c.request.params.id),
  },
});
```

✅ Fix it with **one** of these:

```javascript
// 1. strict mode: handleRequest() rejects with a "401-unauthorized: ..." error
const api = new OpenAPIBackend({ definition, strict: true, securityHandlers, handlers });

// 2. an unauthorizedHandler: unauthorized requests never reach operation handlers
api.register("unauthorizedHandler", (c, req, res) => res.status(401).json({ err: "unauthorized" }));

// 3. a check in every protected operation handler
api.register("deleteUser", (c) => {
  if (!c.security.authorized) throw new Unauthorized();
  return users.delete(c.request.params.id);
});
```

## Enforce request validation

Validation works the same way. With `validate: true` (the default), openapi-backend computes whether a request
matches your schema, but without a `validationFail` handler or `strict: true`, requests that fail validation still
reach the operation handler.

❌ Insecure: the schema only allows `role: "user"`, but `{ "role": "admin" }` gets through

```javascript
const api = new OpenAPIBackend({ definition: "./openapi.yml" });
api.register("createUser", (c) => users.insert(c.request.requestBody));
```

✅ Register a `validationFail` handler, or set `strict: true` (`handleRequest()` rejects with a `400-validationFail: ...` error):

```javascript
api.register("validationFail", (c, req, res) => res.status(400).json({ err: c.validation.errors }));
```

## Register a handler for every security scheme

A security scheme with no registered handler counts as failed. That's safe on its own, but usually means auth was
never wired up. If failed security requirements aren't enforced either, operations that use the scheme are open to
anyone.

```yaml
security:
  - jwt: []
paths:
  /reports/export:
    post:
      operationId: exportReports
      security:
        - apiKey: []
```

```javascript
api.registerSecurityHandler("jwt", verifyJwt);
api.registerSecurityHandler("apiKey", verifyApiKey); // ✅ don't forget this one
```

## Don't let the client decide what gets validated

The [`validate`](/docs/openapi-backend/api#parameter-optsvalidate) option accepts a predicate to skip validation
for some requests. If its result depends on anything the client sends, any client can skip validation.

❌ Insecure: `curl -H 'x-internal-request: 1'` turns off validation

```javascript
const api = new OpenAPIBackend({
  definition,
  validate: (c, req) => !req.headers["x-internal-request"],
});
```

✅ Decide on something the client can't forge:

```javascript
const api = new OpenAPIBackend({
  definition,
  validate: (c, req) => !isInternalNetwork(req.socket.remoteAddress),
});
```

If you rely on a header set by your proxy, make sure the proxy strips it from external requests.

## Don't pass client input to operation lookups

[`mockResponseForOperation()`](/docs/openapi-backend/api#mockresponseforoperationoperationid-opts) and
[`validateRequest()`](/docs/openapi-backend/api#validaterequest) trust their arguments. If the operation ID, status
code or example name comes from the client, the client can read any response or example in your definition, or
validate its request against a different operation.

❌ Insecure

```javascript
app.get("/mock/:operationId", (req, res) => {
  const { status, mock } = api.mockResponseForOperation(req.params.operationId, {
    example: req.query.example,
  });
  res.status(status).json(mock);
});
```

✅ Use the operation the router matched:

```javascript
api.register("notImplemented", (c, req, res) => {
  const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
  return res.status(status).json(mock);
});
```

## Load the definition from a trusted location

Your OpenAPI definition decides which operations exist and which security requirements apply. External `$ref`s get
resolved from the filesystem and over the network when openapi-backend loads it. Treat the definition as code: never
load it from a path, URL or object the client can influence.

❌ Insecure: `/tenants/..%2F..%2Fuploads%2Fevil/...` loads a definition the attacker uploaded

```javascript
app.use("/tenants/:tenant", async (req, res) => {
  const api = new OpenAPIBackend({ definition: `./specs/${req.params.tenant}.yml` });
  await api.init();
  return api.handleRequest(req, req, res);
});
```

✅ Load definitions from fixed paths at startup, and pick one per request from an allow-list.

## Handle errors from handleRequest()

`handleRequest()` rejects when no route matches and no `notFound` handler is registered, when one of your handlers
throws, and in strict mode, for every unauthorized or invalid request. Always catch it:

```javascript
app.use((req, res, next) => api.handleRequest(req, req, res).catch(next));
```

## Don't serve mocks in production

`mockResponseForOperation()` returns the `example` values in your definition as they are. If you mock unimplemented
operations with a `notImplemented` handler, check the environment first, so production clients don't get your examples.

## Static analysis with CodeQL

[openapi-backend-codeql](https://github.com/openapistack/openapi-backend-codeql) finds most of the problems on this
page with [CodeQL](https://codeql.github.com/), in CI or in GitHub code scanning:

| Query | Finds |
| --- | --- |
| `js/openapi-backend/unenforced-security` | Operation handlers that run when security requirements fail |
| `js/openapi-backend/unenforced-validation` | Operation handlers that run when request validation fails |
| `js/openapi-backend/missing-security-handler` | Security schemes with no registered handler |
| `js/openapi-backend/client-controlled-validation` | `validate` predicates the client can switch off |
| `js/openapi-backend/client-controlled-operation` | Client input choosing the operation or mock example |
| `js/openapi-backend/untrusted-definition` | Definitions loaded from a client-influenced location |

It also comes with models that make CodeQL's built-in queries treat `context.request` as user input, so SQL injection,
XSS and path traversal in your operation handlers get flagged too.

Add both packs to your GitHub code scanning workflow:

```yaml
- uses: github/codeql-action/init@v4
  with:
    languages: javascript-typescript
    packs: |
      openapistack/openapi-backend-queries
      openapistack/openapi-backend-models
```

See the [openapi-backend-codeql README](https://github.com/openapistack/openapi-backend-codeql) for examples of each
query and how to run them with the CodeQL CLI.

## Reporting vulnerabilities

Found a vulnerability in openapi-backend itself? Report it privately as described in
[SECURITY.md](https://github.com/openapistack/openapi-backend/blob/main/SECURITY.md).
