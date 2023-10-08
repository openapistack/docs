---
sidebar_position: 8
---

# Auth with Security Handlers

:::tip

Check out [boilerplate projects](/docs/examples/boilerplate/) for working examples of authorization with security handlers. ([JWT](https://github.com/openapistack/openapi-backend/tree/master/examples/express-jwt-auth), [API Key](https://github.com/openapistack/openapi-backend/tree/master/examples/express-apikey-auth))

:::

When your OpenAPI document contains [Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#securitySchemeObject)
you can register security handlers to handle authorization for your API:

```yaml
components:
  securitySchemes:
    - ApiKey:
        type: apiKey
        in: header
        name: x-api-key
security:
  - ApiKey: []
```

```javascript
api.registerSecurityHandler("ApiKey", (c) => {
  const authorized =
    c.request.headers["x-api-key"] === "SuperSecretPassword123";
  // truthy return values are interpreted as auth success
  // you can also add any auth information to the return value
  return authorized;
});
```

The authorization status and return values of each security handler can be
accessed via the [Context Object](/docs/openapi-backend/api#context-object)

You can also register an [`unauthorizedHandler`](/docs/openapi-backend/api#unauthorizedhandler-handler)
to handle unauthorized requests.

```javascript
api.register("unauthorizedHandler", (c, req, res) => {
  return res.status(401).json({ err: "unauthorized" });
});
```

See examples using security handlers:

- [API Key auth (express)](https://github.com/openapistack/openapi-backend/tree/master/examples/express-apikey-auth)
- [JWT auth (express)](https://github.com/openapistack/openapi-backend/tree/master/examples/express-jwt-auth)

## Security Handlers

Example handler for JWT auth:

```javascript
const jwt = require("jsonwebtoken");

function jwtHandler(c, req, res) {
  const authHeader = c.request.headers["authorization"];
  if (!authHeader) {
    throw new Error("Missing authorization header");
  }
  const token = authHeader.replace("Bearer ", "");
  return jwt.verify(token, "secret");
}

api.registerSecurityHandler("jwt", jwtHandler);
```

The first argument of the handler is the [Context object](/docs/openapi-backend/api#context-object) and rest are passed from `.handleRequest()`
arguments, starting from the second one.

The return value of each security handler is added as a key-value mapping to
`security` property of the [Context object](/docs/openapi-backend/api#context-object).

Truthy return values from security handlers are generally interpreted as auth
success, unless the return value is an object containing an `error` property.

All falsy return values are interpreted as auth fail.

Throwing an error from the security handler also gets interpreted as auth fail. The error is available in `context.security[name].error`.
