---
title: Building APIs
sidebar_position: 2
---

In this example, we will design and build a simple REST API using express and openapi-backend.

Let's start by setting up a basic express server:

```ts
import express from 'express';

const app = express();

// use the json middleware
app.use(express.json());

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));
```

We can then import `openapi-backend` and initialize it:

```ts
import { OpenAPIBackend } from 'openapi-backend';

const api = new OpenAPIBackend({
  definition: './openapi.yml',
});

api.init();
```

We are loading our API definition from `openapi.yml`, so let's write a simple API design with a `getPets` operation:

```yaml
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
      required:
        - id
        - type
```

Let's then implement `getPets` and some default handlers in our code:

```ts
api.register('getPets', async (c, req: Express.Request, res: Express.Response) =>
  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])
)
api.register('validationFail', (c, req: Express.Request, res: Express.Response) =>
  res.status(400).json({ err: c.validation.errors }),
)
api.register('notFound', (c, req: Express.Request, res: Express.Response) =>
  res.status(404).json({ err: 'not found' }),
)
```

Finally we can use openapi-backend as an express middleware to route, validate and handle API requests:

```ts
app.use((req, res) => api.handleRequest(req, req, res));
```

## Full Example

Putting everything together, here is our full code example:

```ts
// server.ts
import { OpenAPIBackend, Request } from 'openapi-backend';
import express from 'express';

const api = new OpenAPIBackend({
  definition: './openapi.yml',
});

api.init();

api.register('getPets', async (c, req: express.Request, res: express.Response) =>
  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])
)
api.register('validationFail', (c, req: express.Request, res: express.Response) =>
  res.status(400).json({ err: c.validation.errors }),
)
api.register('notFound', (c, req: express.Request, res: express.Response) =>
  res.status(404).json({ err: 'not found' }),
)

const app = express();

app.use(express.json());
app.use((req, res) => api.handleRequest(req as Request, req, res));

app.listen(9000, () => console.info('api listening at http://localhost:9000'));
```