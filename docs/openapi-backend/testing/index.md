---
title: Testing
sidebar_position: 1
---

# Testing

openapi-backend comes with tools for testing your API the way your OpenAPI definition describes it. Call operations by
their `operationId`, and assert on routing, validation and security with [Vitest](https://vitest.dev) matchers:

```ts title="test/pets.test.ts"
import { describe, test, expect } from 'vitest';
import { client } from './client';

describe('createPet', () => {
  const garfield = { name: 'Garfield', type: 'cat' };

  // sign in as alice, without a real token
  const alice = client.with({ security: { jwt: { sub: 'alice' } } });

  test('creates a pet', async () => {
    const res = await alice.createPet({ body: garfield });

    expect(res).toHaveStatus(201);
    expect(res.body).toMatchObject(garfield);
  });

  test('requires a name', async () => {
    const res = await alice.createPet({ body: { type: 'cat' } });

    expect(res).toFailValidation('body.name');
  });

  test('requires authentication', async () => {
    const res = await client.createPet({ body: garfield });

    expect(res).toBeUnauthorized();
  });
});
```

Every response is also checked against the responses documented in your API definition. If `createPet` returned a pet
without an `id`, the first test would fail, even though it never asserts on `id`.

## Why test with openapi-backend?

- **Requests come from your spec.** `client.getPetById({ params: { id: 1 } })` builds the method, path, query string,
  headers and body the way your OpenAPI definition describes them. No hand-written URLs. You can even
  [generate requests](/docs/openapi-backend/testing/requests#generating-requests-from-examples) from the examples in
  your spec.
- **Routing, validation and security in one line each.** [`toRoute()`](/docs/openapi-backend/testing/routing),
  [`toFailValidation()`](/docs/openapi-backend/testing/validation) and
  [`toBeUnauthorized()`](/docs/openapi-backend/testing/security) test the work openapi-backend does for you, and their
  failure messages tell you what happened instead.
- **Every test is a contract test.** Responses that don't match your spec fail the test, so your handlers can't drift
  away from your API documentation. See [Contract testing](/docs/openapi-backend/testing/contract).
- **Fast, and works with your framework.** Requests go into your Express, Fastify, Koa, Hapi, AWS Lambda or fetch app
  in-process. No server to start, no ports, no network.
- **Built for Vitest.** Custom matchers, readable snapshots, and types from
  [`openapi typegen`](/docs/openapicmd/typegen).

## Quick start

The testing tools are part of the `openapi-backend` package. All you need to add is Vitest:

```
npm install --save-dev vitest
```

### 1. Register the matchers

```ts title="vitest.setup.ts"
import 'openapi-backend/vitest';
```

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
  },
});
```

This registers the [matchers](/docs/openapi-backend/testing/reference#matchers) and their TypeScript types, and a
snapshot serializer for responses.

:::tip

Vitest doesn't know your tests depend on your OpenAPI definition. Add it to
[`forceRerunTriggers`](https://vitest.dev/config/forcereruntriggers) to re-run your tests in watch mode when the
definition changes:

```ts title="vitest.config.ts"
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    forceRerunTriggers: [
      ...configDefaults.forceRerunTriggers,
      '**/openapi.yml',
    ],
  },
});
```

:::

### 2. Create a test client

Create the client once, in a module your tests can share:

```ts title="test/client.ts"
import { createTestClient } from 'openapi-backend/testing';
import { api, app } from '../src/app';

// load the API definition before the tests start
await api.init();

export { api };
export const client = createTestClient(api, { app });
```

Here `app` is the Express app that serves your API. The client sends requests straight into it, in the same process.
For Fastify, Koa, Hapi, AWS Lambda and others, see [Frameworks](/docs/openapi-backend/testing/frameworks). If your
handlers don't depend on a framework, leave out `app` and requests go directly to `api.handleRequest()`.

### 3. Write a test

```ts title="test/pets.test.ts"
import { test, expect } from 'vitest';
import { client } from './client';

test('getPetById returns the pet', async () => {
  const res = await client.getPetById({ params: { id: 1 } });

  expect(res).toHaveStatus(200);
  expect(res.body).toEqual({ id: 1, name: 'Garfield', type: 'cat' });
});
```

```
npx vitest
```

When a test fails, the error shows the request, the response, and anything openapi-backend found along the way:

```
 FAIL  test/pets.test.ts > getPetById returns the pet
AssertionError: expected getPetById to respond with 200, but got 404

  GET /pets/1  →  getPetById
  404 Not Found
  {
    "message": "Pet not found"
  }
```

## What to test

| What | How | Read more |
| --- | --- | --- |
| Requests reach the right operation | `expect(api).toRoute('GET /pets/meta', 'getPetsMeta')` | [Testing routing](/docs/openapi-backend/testing/routing) |
| Invalid requests are rejected | `expect(res).toFailValidation('body.name')` | [Testing validation](/docs/openapi-backend/testing/validation) |
| Protected operations require auth | `expect(res).toBeUnauthorized()` | [Testing security](/docs/openapi-backend/testing/security) |
| Responses match the spec | Automatic, or `expect(res).toMatchApiSpec()` | [Contract testing](/docs/openapi-backend/testing/contract) |
| Handler logic in isolation | `createContext(api, 'getPetById', { params: { id: 1 } })` | [Unit testing handlers](/docs/openapi-backend/testing/handlers) |

## How it works

```
client.createPet({ body })      builds POST /pets from your spec
        │
        ▼
your app, in-process            middleware, body parsing, error handlers
        │
        ▼
api.handleRequest()             routing → security → validation → handler
        │
        ▼
{ status: 201, body: { … } }    checked against your spec
```

The client records what openapi-backend did with each request: the operation it matched, the request validation
result and the security handler results. That's how `toFailValidation()` knows _which_ field failed, and how
`toBeUnauthorized()` knows the request was rejected by your security requirements, and not by something else.

## Typesafe tests

Generate types for your API with [`openapi typegen --backend`](/docs/openapi-backend/typescript), and pass the
`Operations` type to the client:

```ts title="test/client.ts"
import type { Operations } from '../src/types/openapi';

export const client = createTestClient<Operations>(api, { app });
```

You get autocomplete for every operation, typechecked parameters and request bodies, and typed response bodies. See
[TypeScript](/docs/openapi-backend/testing/requests#typescript).

## The example API

The examples in this section test a small pet store API built with Express:

<details>
<summary><code>openapi.yml</code></summary>

```yaml title="openapi.yml"
openapi: 3.1.0
info:
  title: Pet Store
  version: 1.0.0
paths:
  /pets:
    get:
      operationId: getPets
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
      responses:
        "200":
          description: List of pets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Pet"
    post:
      operationId: createPet
      security:
        - jwt: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewPet"
            examples:
              garfield:
                value: { name: Garfield, type: cat }
              odie:
                value: { name: Odie, type: dog }
      responses:
        "201":
          description: Created pet
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pet"
        "400":
          $ref: "#/components/responses/Error"
        "401":
          $ref: "#/components/responses/Error"
  /pets/meta:
    get:
      operationId: getPetsMeta
      responses:
        "200":
          description: Pet statistics
          content:
            application/json:
              schema:
                type: object
                required: [count]
                properties:
                  count:
                    type: integer
  /pets/{id}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
    get:
      operationId: getPetById
      responses:
        "200":
          description: A pet
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pet"
        "400":
          $ref: "#/components/responses/Error"
        "404":
          $ref: "#/components/responses/Error"
    delete:
      operationId: deletePetById
      security:
        - jwt: []
      responses:
        "204":
          description: Deleted
        "401":
          $ref: "#/components/responses/Error"
        "403":
          $ref: "#/components/responses/Error"
        "404":
          $ref: "#/components/responses/Error"
components:
  schemas:
    Pet:
      type: object
      required: [id, name, type]
      properties:
        id:
          type: integer
        name:
          type: string
        type:
          type: string
          enum: [cat, dog]
    NewPet:
      type: object
      required: [name, type]
      additionalProperties: false
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 64
        type:
          type: string
          enum: [cat, dog]
    Error:
      type: object
      required: [message]
      properties:
        message:
          type: string
  responses:
    Error:
      description: Error
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
  securitySchemes:
    jwt:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

</details>

<details>
<summary><code>src/app.ts</code></summary>

```ts title="src/app.ts"
import express from 'express';
import OpenAPIBackend from 'openapi-backend';
import { verifyToken } from './auth';
import * as pets from './pets';

export const api = new OpenAPIBackend({
  definition: './openapi.yml',
  strict: true,
  securityHandlers: {
    jwt: (c) => verifyToken(c.request.headers.authorization),
  },
  handlers: {
    ...pets,
    validationFail: (c, req, res) =>
      res.status(400).json({
        message: 'Bad request',
        errors: c.validation.errors,
      }),
    unauthorizedHandler: (c, req, res) =>
      res.status(401).json({ message: 'Unauthorized' }),
    notFound: (c, req, res) =>
      res.status(404).json({ message: 'Not found' }),
  },
});

export const app = express();
app.use(express.json());
app.use((req, res, next) => api.handleRequest(req, req, res).catch(next));

// respond with JSON to errors, like malformed JSON bodies
app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ message: err.message });
});
```

</details>

:::tip

Testing a frontend against your API? See [Testing with msw + openapi-backend mocks](/docs/examples/testing-react-with-jest-and-openapi-mocks).

:::
