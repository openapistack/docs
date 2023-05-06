---
sidebar_position: 2
---

# Examples

OpenAPI backend is framework agnostic, which means you can use it with pretty much any javascript backend framework and hosting you're familiar with.

### Express

```javascript
import express from "express";

const app = express();
app.use(express.json());
app.use((req, res) => api.handleRequest(req, req, res));
app.listen(9000);
```

[See full Express example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/express)

[See full Express TypeScript example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/express-typescript)

### AWS Serverless (Lambda)

```javascript
// API Gateway Proxy handler
module.exports.handler = (event, context) =>
  api.handleRequest(
    {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      body: event.body,
      headers: event.headers,
    },
    event,
    context
  );
```

[See full AWS SAM example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/aws-sam)

[See full AWS CDK example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/aws-cdk)

[See full Serverless Framework example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/serverless-framework)

### Azure Function

```javascript
module.exports = (context, req) =>
  api.handleRequest(
    {
      method: req.method,
      path: req.params.path,
      query: req.query,
      body: req.body,
      headers: req.headers,
    },
    context,
    req
  );
```

[See full Azure Function example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/azure-function)

### Fastify

```ts
import fastify from "fastify";

fastify.route({
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  url: "/*",
  handler: async (request, reply) =>
    api.handleRequest(
      {
        method: request.method,
        path: request.url,
        body: request.body,
        query: request.query,
        headers: request.headers,
      },
      request,
      reply
    ),
});
fastify.listen();
```

[See full Fastify example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/fastify)

### Hapi

```javascript
import Hapi from "@hapi/hapi";

const server = new Hapi.Server({ host: "0.0.0.0", port: 9000 });
server.route({
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  path: "/{path*}",
  handler: (req, h) =>
    api.handleRequest(
      {
        method: req.method,
        path: req.path,
        body: req.payload,
        query: req.query,
        headers: req.headers,
      },
      req,
      h
    ),
});
server.start();
```

[See full Hapi example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/hapi-typescript)

### Koa

```javascript
import Koa from "koa";
import bodyparser from "koa-bodyparser";

const app = new Koa();

app.use(bodyparser());
app.use((ctx) => api.handleRequest(ctx.request, ctx));
app.listen(9000);
```

[See full Koa example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/koa)

### Fastify

```typescript
import Fastify from "fastify";
import type { Request } from "openapi-backend";

const fastify = Fastify();

fastify.route({
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  url: "/*",
  handler: async (request, reply) =>
    api.handleRequest(
      {
        method: request.method,
        path: request.url,
        body: request.body,
        query: request.query as NonNullable<Request["query"]>,
        headers: request.headers as Request["headers"],
      },
      request,
      reply
    ),
});
await fastify.listen({ port: 9000 });
```

[See full Fastify example](https://github.com/anttiviljami/openapi-backend/tree/master/examples/fastify)
