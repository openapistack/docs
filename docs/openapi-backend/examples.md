---
sidebar_position: 2
---

# Framework Examples

OpenAPI backend is framework agnostic, which means you can use it with pretty much any javascript backend framework and hosting you're familiar with.

Full, tested examples can be found the openapi-backend GitHub repository: [https://github.com/openapistack/openapi-backend/tree/main/examples/](https://github.com/openapistack/openapi-backend/tree/main/examples/)

### Express

```javascript
import express from "express";

const app = express();
app.use(express.json());
app.use((req, res) => api.handleRequest(req, req, res));
app.listen(9000);
```

[See full Express example](https://github.com/openapistack/openapi-backend/tree/main/examples/express)

[See full Express TypeScript example](https://github.com/openapistack/openapi-backend/tree/main/examples/express-typescript)

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

[See full AWS SAM example](https://github.com/openapistack/openapi-backend/tree/main/examples/aws-sam)

[See full AWS CDK example](https://github.com/openapistack/openapi-backend/tree/main/examples/aws-cdk)

[See full SST example](https://github.com/openapistack/openapi-backend/tree/main/examples/aws-sst)

[See full Serverless Framework example](https://github.com/openapistack/openapi-backend/tree/main/examples/serverless-framework)

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

[See full Azure Function example](https://github.com/openapistack/openapi-backend/tree/main/examples/azure-function)

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

[See full Fastify example](https://github.com/openapistack/openapi-backend/tree/main/examples/fastify)


### Koa

```javascript
import Koa from "koa";
import bodyparser from "koa-bodyparser";

const app = new Koa();

app.use(bodyparser());
app.use((ctx) => api.handleRequest(ctx.request, ctx));
app.listen(9000);
```

[See full Koa example](https://github.com/openapistack/openapi-backend/tree/main/examples/koa)

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

[See full Hapi example](https://github.com/openapistack/openapi-backend/tree/main/examples/hapi-typescript)

## More Examples

A full list of openapi-stack boilerplate projects available here: [openapistack.co/docs/examples/boilerplate/](/docs/examples/boilerplate/)
