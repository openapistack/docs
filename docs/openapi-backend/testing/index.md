---
title: Testing
sidebar_position: 1
---

# Testing

openapi-backend comes with a test client for testing your API the way your OpenAPI definition describes it. It has a
method for every operation, and shows you what openapi-backend did with each request:

```ts title="test/pets.test.ts"
import { describe, test, expect } from 'vitest';
import { client } from './client';

describe('createPet', () => {
  const garfield = { name: 'Garfield', type: 'cat' };

  // sign in as alice, without a real token
  const alice = client.with({ security: { jwt: { sub: 'alice' } } });

  test('creates a pet', async () => {
    const res = await alice.createPet({ body: garfield });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(garfield);
  });

  test('requires a name', async () => {
    const res = await alice.createPet({ body: { type: 'cat' } });

    expect(res.status).toBe(400);
    expect(res.context.validation.errors).toContainEqual(
      expect.objectContaining({ params: { missingProperty: 'name' } }),
    );
  });

  test('requires authentication', async () => {
    const res = await client.createPet({ body: garfield });

    expect(res.status).toBe(401);
    expect(res.context.security.authorized).toBe(false);
  });
});
```

Every response is also checked against the responses documented in your API definition. If `createPet` returned a pet
without an `id`, the first test would fail, even though it never asserts on `id`.

The examples use [Vitest](https://vitest.dev), but the test client works with any test runner.

## Why test with openapi-backend?

- **Requests come from your spec.** `client.getPetById({ params: { id: 1 } })` builds the method, path, query string,
  headers and body the way your OpenAPI definition describes them. No hand-written URLs. You can even
  [generate requests](/docs/openapi-backend/testing/requests#generating-requests-from-examples) from the examples in
  your spec.
- **See what openapi-backend did.** `res.context` has the operation the router matched, the result of request
  validation and the results of your security handlers, so you can test
  [routing](/docs/openapi-backend/testing/routing), [validation](/docs/openapi-backend/testing/validation) and
  [security](/docs/openapi-backend/testing/security) directly.
- **Every test is a contract test.** Responses that don't match your spec fail the test, so your handlers can't drift
  away from your API documentation. See [Contract testing](/docs/openapi-backend/testing/contract).
- **Works with your framework.** Requests go into your Express, Fastify, Koa, Hapi, AWS Lambda or fetch app, in the
  same process as your tests. Nothing to deploy, and nothing to start yourself.
- **Typesafe.** Types for operations, parameters and bodies come from [`openapi typegen`](/docs/openapicmd/typegen).

## Quick start

The test client is part of the `openapi-backend` package. All you need to add is a test runner:

```
npm install --save-dev vitest
```

### 1. Create a test client

Create the client once, in a module your tests can share:

```ts title="test/client.ts"
import { createTestClient } from 'openapi-backend/testing';
import { api, app } from '../src/app';

// load the API definition before the tests start
await api.init();

export { api };
export const client = createTestClient(api, { app });
```

Here `app` is the Express app that serves your API. The client sends requests into it, in the same process as your
tests. For Fastify, Koa, Hapi, AWS Lambda and others, see [Frameworks](/docs/openapi-backend/testing/frameworks).

### 2. Write a test

```ts title="test/pets.test.ts"
import { test, expect } from 'vitest';
import { client } from './client';

test('getPetById returns the pet', async () => {
  const res = await client.getPetById({ params: { id: 1 } });

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, name: 'Garfield', type: 'cat' });
});
```

```
npx vitest
```

If a response doesn't match your API definition, the test fails with an error that shows the request, the response
and what didn't match. See [Contract testing](/docs/openapi-backend/testing/contract).

:::tip

Vitest doesn't know your tests depend on your OpenAPI definition. Add it to
[`forceRerunTriggers`](https://vitest.dev/config/forcereruntriggers) to re-run your tests in watch mode when the
definition changes:

```ts title="vitest.config.ts"
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    forceRerunTriggers: [
      ...configDefaults.forceRerunTriggers,
      '**/openapi.yml',
    ],
  },
});
```

:::

## What to test

| What | How | Read more |
| --- | --- | --- |
| Requests reach the right operation | `res.operationId`, and operation methods check routing for you | [Testing routing](/docs/openapi-backend/testing/routing) |
| Invalid requests are rejected | `res.status` and `res.context.validation` | [Testing validation](/docs/openapi-backend/testing/validation) |
| Protected operations require auth | `res.status` and `res.context.security` | [Testing security](/docs/openapi-backend/testing/security) |
| Responses match the spec | Automatic, for every request | [Contract testing](/docs/openapi-backend/testing/contract) |

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

The client links each request to the [Context object](/docs/openapi-backend/api#context-object) openapi-backend
builds for it, and returns it as `res.context`. It has the parsed request your handlers saw, the operation the router
matched, the request validation result and the results of your security handlers.

## Typesafe tests

Generate types for your API with [`openapi typegen --backend`](/docs/openapi-backend/typescript), and pass the
`Operations` type to the client:

```ts title="test/client.ts"
import type { Operations } from '../src/types/openapi';

export const client = createTestClient<Operations>(api, { app });
```

You get autocomplete for every operation, typechecked parameters and request bodies, and typed response bodies. See
[TypeScript](/docs/openapi-backend/testing/requests#typescript).

## Mocking dependencies

Requests are handled in the same process as your tests, so you can mock the modules your handlers use with
[`vi.mock()`](https://vitest.dev/api/vi#vi-mock), like in any other test:

```ts
import { test, expect, vi } from 'vitest';
import { client } from './client';
import * as db from '../src/db';

vi.mock('../src/db');

test('responds with 404 when the pet does not exist', async () => {
  vi.mocked(db.findPet).mockResolvedValue(undefined);

  const res = await client.getPetById({ params: { id: 1 } });

  expect(res.status).toBe(404);
});
```

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
        "400":
          $ref: "#/components/responses/Error"
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
