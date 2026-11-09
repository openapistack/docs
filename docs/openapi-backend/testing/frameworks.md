---
title: Frameworks
sidebar_position: 8
---

# Frameworks

The test client sends requests into your app in the same process as your tests. Requests go through the same
middleware, error handlers and framework glue as in production, without deploying anything.

Pass your app as the `app` option, and the client works out what kind of app it is:

| Framework | Pass as `app` |
| --- | --- |
| [Express](#express) | your Express app |
| [Fastify](#fastify) | your Fastify instance |
| [Koa](#koa) | your Koa app |
| [Hapi](#hapi) | your Hapi server |
| [Node.js](#nodejs-http) | an `http.Server`, or a `(req, res)` request listener |
| [Hono, Elysia and other fetch apps](#fetch-apps) | an object with a `fetch(request)` method |
| [AWS Lambda](#aws-lambda) | `lambda(handler)` |
| [A running server](#a-running-server) | its URL |
| [Anything else](#custom-adapters) | an object with a `send(request)` method |
| [No framework](#no-framework) | leave out `app`, and pass `transformResponse` |

:::tip

Export your app from a module that doesn't call `app.listen()`, and start the server in a separate entry point. Then
your tests can import the app without starting it.

:::

## Express

```ts title="src/app.ts"
export const app = express();
app.use(express.json());
app.use((req, res, next) => api.handleRequest(req, req, res).catch(next));
```

```ts title="test/client.ts"
export const client = createTestClient(api, { app });
```

The first time it sends a request, the client serves your app on a random port on `127.0.0.1`, like
[supertest](https://github.com/ladjs/supertest) does. The server doesn't keep your test process running.

The same works for any framework that gives you a Node.js request listener, like [Connect](https://github.com/senchalabs/connect)
or [Polka](https://github.com/lukeed/polka).

## Fastify

```ts title="src/app.ts"
export const app = Fastify();
app.route({
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  url: '/*',
  handler: (request, reply) =>
    api.handleRequest(
      {
        method: request.method,
        path: request.url,
        body: request.body,
        query: request.query,
        headers: request.headers,
      },
      request,
      reply,
    ),
});
```

```ts title="test/client.ts"
export const client = createTestClient(api, { app });
```

The client uses Fastify's [`inject()`](https://fastify.dev/docs/latest/Guides/Testing/), so you don't need to call
`app.listen()` or `app.ready()`.

## Koa

```ts title="src/app.ts"
export const app = new Koa();
app.use(bodyparser());
app.use((ctx) => api.handleRequest(ctx.request, ctx));
```

```ts title="test/client.ts"
export const client = createTestClient(api, { app });
```

The client serves `app.callback()` on a random local port, like it does for Express.

## Hapi

```ts title="src/server.ts"
export const server = Hapi.server();
server.route({
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  path: '/{path*}',
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
      h,
    ),
});
```

```ts title="test/client.ts"
import { api, server } from '../src/server';

await server.initialize();

export const client = createTestClient(api, { app: server });
```

The client uses Hapi's `server.inject()`. Call `server.initialize()` first, but not `server.start()`.

## Node.js http

Pass an `http.Server`, or the request listener you'd pass to `http.createServer()`:

```ts title="test/client.ts"
import { api, server } from '../src/server';

export const client = createTestClient(api, { app: server });
```

The client serves the server's request listener on a random local port. It doesn't call `listen()` on your server.

## Fetch apps

Frameworks built on the web-standard `Request` and `Response`, like [Hono](https://hono.dev) or
[Elysia](https://elysiajs.com), have a `fetch()` method. Pass the app:

```ts title="src/app.ts"
export const app = new Hono();
app.all('*', async (c) =>
  api.handleRequest(
    {
      method: c.req.method,
      path: c.req.path,
      query: c.req.query(),
      headers: c.req.header(),
      body: await c.req.text(),
    },
    c,
  ),
);
```

```ts title="test/client.ts"
export const client = createTestClient(api, { app });
```

For a plain `(request) => Response` function, like a Next.js route handler, pass `{ fetch: handler }`.

## AWS Lambda

Wrap your Lambda handler with `lambda()`:

```ts title="src/lambda.ts"
export const handler = (event, context) =>
  api.handleRequest(
    {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      body: event.body,
      headers: event.headers,
    },
    event,
    context,
  );
```

```ts title="test/client.ts"
import { createTestClient, lambda } from 'openapi-backend/testing';
import { api, handler } from '../src/lambda';

export const client = createTestClient(api, { app: lambda(handler) });
```

The client turns each request into an API Gateway event, calls your handler, and reads the response from its result,
like API Gateway does. Results without a `content-type` header are sent as `application/json`.

By default, events look like they come from an API Gateway REST API. For HTTP APIs and function URLs, use
`lambda(handler, { event: 'v2' })`. See the [reference](/docs/openapi-backend/testing/reference#lambdahandler-options)
for all options.

## A running server

Pass a URL to send requests over the network, for example for smoke tests against a staging environment:

```ts title="test/smoke/client.ts"
export const client = createTestClient(api, {
  app: 'https://staging.example.com',
});
```

Requests are built from your spec and responses are checked against it, as usual. But the client can't see inside
another process, so `res.context` is `undefined`, and
[security stubs](/docs/openapi-backend/testing/security#stubbing-security-handlers) throw an error.

## Custom adapters

For anything else, pass an object with a `send()` method. It gets the request the client built, which is also a valid
openapi-backend [Request object](/docs/openapi-backend/api#request-object), and returns the response as
`{ status, headers, body }` or as a fetch `Response`:

```ts
const client = createTestClient(api, {
  app: {
    async send(request) {
      const result = await myPlatform.invoke(toPlatformRequest(request));
      return { status: result.code, headers: result.headers, body: result.payload };
    },
  },
});
```

String and Buffer bodies are parsed according to the `content-type` header. Other values are used as the body as they
are.

## No framework

If your handlers don't depend on a framework, you don't need an app. Leave out `app`, and the client calls
`api.handleRequest()` directly. openapi-backend doesn't know what your handlers return, so tell the client how to turn
it into a response with `transformResponse`:

```ts
const api = new OpenAPIBackend({
  definition: './openapi.yml',
  handlers: {
    getPets: async () => ({ statusCode: 200, body: await db.listPets() }),
    validationFail: (c) => ({
      statusCode: 400,
      body: { message: 'Bad request', errors: c.validation.errors },
    }),
  },
});

const client = createTestClient(api, {
  transformResponse: (result) => ({
    status: result.statusCode,
    headers: { 'content-type': 'application/json', ...result.headers },
    body: result.body,
  }),
});
```

`transformResponse` gets the value `api.handleRequest()` returned, and returns `{ status, headers, body }` or a fetch
`Response`, like a [custom adapter](#custom-adapters).

Request bodies reach `api.handleRequest()` the way a body parser would pass them on: JSON as parsed objects, form
fields as strings, and other bodies as strings or Buffers.

If `api.handleRequest()` throws, for example with a `400-validationFail` error in strict mode, the call throws the same
error.

## Base path

The client prepends your API's [`apiRoot`](/docs/openapi-backend/api#parameter-optsapiroot) to the paths of operations.
If your app serves the API under another path, set `basePath`:

```ts
// the app serves openapi-backend under /api
const client = createTestClient(api, { app, basePath: '/api' });

await client.getPets(); // GET /api/pets
```

## How the client sees what happened

To link each request to the context openapi-backend builds for it, the client adds an `x-openapi-backend-test-id`
header to requests it handles in the same process. Your app needs to pass the request headers to `api.handleRequest()`,
which it does anyway, so they can be validated. The header isn't included in `res.request`.
