---
title: Building APIs
sidebar_position: 2
---

:::info

In this example, we will design and build a minimal Node.js REST API using [openapi-backend](/docs/openapi-backend) and the [express](https://expressjs.com) framework.

:::

:::tip

Not using express? The `openapi-backend` package can be used with any other Node.js framework or server. See [boilerplate projects](/docs/examples/boilerplate/) for examples of using OpenAPI stack with other frameworks.

:::

## Prerequisites

This guide assumes you already know how to set up a Node.js project with Typescript. You can find a minimal sample project [here](https://github.com/anttiviljami/openapi-backend/tree/master/examples/express-typescript).

Before starting, make sure to install `openapi-backend` and `express` as dependencies:

```
npm i openapi-backend express
```

## Setting up express

We will start by setting up a basic express server listening on port `9000`:

```ts
// src/server.ts
import express from 'express';

const app = express();

// use the json middleware
app.use(express.json());

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));
```

## Setting up openapi-backend

We can then import `openapi-backend` and initialize it with an openapi definition file:

```ts
import { OpenAPIBackend } from 'openapi-backend';

const api = new OpenAPIBackend({
  definition: './openapi.yml',
});

api.init();
```

## Writing our API spec

We load our API definition from `openapi.yml`, so let's populate it with a simple API design with a `getPets` operation:

```yaml
# src/openapi.yml
openapi: 3.0.2
info:
  title: "Pet API"
  version: 1.0.0
paths:
  "/pets":
    get:
      operationId: getPets
      responses:
        "200":
          description: list of pets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
components:
  schemas:
    Pet:
      type: object
      properties:
        id:
          type: string
        type:
          type: string
          enum: ["cat", "dog"]
        name:
          type: string
      required: ["id", "type"]
```

## Implementing Handlers

Let's then implement an [operation handler](/docs/openapi-backend/operation-handlers/) for the `getPets` operation defined in our spec.

```ts
api.register('getPets', async (c, req: express.Request, res: express.Response) =>
  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])
)
```

To enable routing and validation, we'll add some default handlers in our code for common exceptions:

```ts
// return 400 when request validation fails
api.register('validationFail', (c, req: express.Request, res: express.Response) =>
  res.status(400).json({ err: c.validation.errors }),
)
// return 404 when route doesn't match any operation in openapi.yml
api.register('notFound', (c, req: express.Request, res: express.Response) =>
  res.status(404).json({ err: 'not found' }),
)
```


## Use as express middleware

Finally we wire up openapi-backend to route, validate and handle API requests with express:

```ts
app.use((req, res) => api.handleRequest(req, req, res));
```

## Full Example

Putting everything together, here is our complete example server code:

```ts
// src/server.ts
import { OpenAPIBackend, Request } from 'openapi-backend';
import express from 'express';

const api = new OpenAPIBackend({
  definition: './openapi.yml',
});

api.init();

// handler for getPets operation in openapi.yml
api.register('getPets', async (c, req: express.Request, res: express.Response) =>
  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])
)
// return 400 when request validation fails
api.register('validationFail', (c, req: express.Request, res: express.Response) =>
  res.status(400).json({ err: c.validation.errors }),
)
// return 404 when route doesn't match any operation in openapi.yml
api.register('notFound', (c, req: express.Request, res: express.Response) =>
  res.status(404).json({ err: 'not found' }),
)

const app = express();

// use the json middleware
app.use(express.json());

// use openapi-backend to handle requests
app.use((req, res) => api.handleRequest(req as Request, req, res));

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));
```

## Optional: Mocking Responses

Instead of implementing a handler for `getPets`, you can register a `notImplemented` handler to mock the response based
on the OpenAPI schema:

```ts
// mock responses for operations with no registered handlers
api.register('notImplemented', (c, req: express.Request, res: express.Response) => {
  const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
  return res.status(status).json(mock);
});
```