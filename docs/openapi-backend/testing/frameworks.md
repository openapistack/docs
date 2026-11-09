---
title: Frameworks
sidebar_position: 8
---

# Frameworks

The test client sends requests into your app in the same process as your tests. Requests go through the same
middleware, error handlers and framework glue as in production, but without starting a server or opening a port.

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
| [No framework](#no-framework) | leave out `app` |
| [A running server](#a-running-server) | its URL |
| [Anything else](#custom-adapters) | an object with a `send(request)` method |

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

The client turns each request into an API Gateway event, calls your handler, and reads the response from the result.
By default, events look like they come from an API Gateway REST API. For HTTP APIs and function URLs, use
`lambda(handler, { event: 'v2' })`. See the [reference](/docs/openapi-backend/testing/reference#lambdahandler-options)
for all options.

## No framework

If your handlers return their responses, you don't need an app. Leave out `app`, and the client calls
`api.handleRequest()` directly:

```ts
const api = new OpenAPIBackend({
  definition: './openapi.yml',
  handlers: {
    getPets: async () => ({ status: 200, body: await db.listPets() }),
    validationFail: (c) => ({
      status: 400,
      body: { message: 'Bad request', errors: c.validation.errors },
    }),
  },
});

const client = createTestClient(api);
```

The value returned by `api.handleRequest()` is turned into a response:

| Return value | Response |
| --- | --- |
| a `Response` | used as is |
| an object with a numeric `statusCode`, like an API Gateway result | its `statusCode`, `headers` and `body` |
| an object with a numeric `status` | its `status`, `headers` and `body` |
| anything else | a `200` response with the value as its body |

Bodies that are JSON strings are parsed.

When `api.handleRequest()` throws one of openapi-backend's own errors, like `404-notFound` or, in strict mode,
`400-validationFail`, the client responds with that status code. Any other error is thrown, so the test fails with
your original error and stack trace.

Handlers called this way get no framework arguments. If your handlers use objects like Express's `res`, pass your
`app` instead.

## A running server

Pass a URL to send requests over the network, for example for smoke tests against a staging environment:

```ts title="test/smoke/client.ts"
export const client = createTestClient(api, {
  app: 'https://staging.example.com',
});
```

Requests are built from your spec and responses are checked against it, as usual. But the client can't see inside
another process, so `res.context` is `undefined`, and `toFailValidation()`, `toBeUnauthorized()` and
[security stubs](/docs/openapi-backend/testing/security#stubbing-security-handlers) don't work.

## Base path

The client prepends your API's [`apiRoot`](/docs/openapi-backend/api#parameter-optsapiroot) to the paths of operations.
If your app serves the API under another path, set `basePath`:

```ts
// the app serves openapi-backend under /api
const client = createTestClient(api, { app, basePath: '/api' });

await client.getPets(); // GET /api/pets
```

## Custom adapters

For anything else, pass an object with a `send()` method. It gets the request the client built, which is also a valid
openapi-backend [Request object](/docs/openapi-backend/api#request-object), and returns the response:

```ts
// handlers that return { code, data }
const client = createTestClient(api, {
  app: {
    async send(request) {
      const { code, data } = await api.handleRequest(request);
      return { status: code, body: data };
    },
  },
});
```

Whenever `api.handleRequest()` runs in the same process as your tests, the client records what openapi-backend did,
so `res.context`, `toFailValidation()` and `toBeUnauthorized()` work with custom adapters too.
