---
title: Unit Testing Handlers
sidebar_position: 7
---

# Unit Testing Handlers

Most of the time, the best way to test a handler is to send it a request with the test client. That tests your
handler together with the routing, validation and security in front of it, and it's what your API's users will do.

Sometimes it helps to test a handler function by itself, like a handler with lots of branches, or one that's shared
between operations. `createContext()` builds the [Context object](/docs/openapi-backend/api#context-object) your
handler would receive for a request.

## createContext()

Say your handlers return their responses, like handlers for AWS Lambda do:

```ts title="src/pets.ts"
import type { Context } from 'openapi-backend';
import * as db from './db';

export async function getPetById(c: Context) {
  const pet = await db.findPet(c.request.params.id);
  if (!pet) {
    return { statusCode: 404, body: { message: 'Pet not found' } };
  }
  return { statusCode: 200, body: pet };
}
```

Create a context for the operation and call the handler with it:

```ts title="test/getPetById.test.ts"
import { test, expect, vi } from 'vitest';
import { createContext } from 'openapi-backend/testing';
import { api } from './client';
import { getPetById } from '../src/pets';
import * as db from '../src/db';

vi.mock('../src/db');

test('responds with 404 when the pet does not exist', async () => {
  vi.mocked(db.findPet).mockResolvedValue(undefined);

  const c = await createContext(api, 'getPetById', { params: { id: 1 } });
  const res = await getPetById(c);

  expect(res.statusCode).toBe(404);
});
```

`createContext()` takes the same [request options](/docs/openapi-backend/testing/requests#calling-operations) as the
test client, and builds the context the same way `api.handleRequest()` does:

1. the request is built from the operation, like the test client builds it
1. it's parsed: header names are lowercased, cookies and query parameters are parsed, and path parameters are read
   from the path
1. your security handlers are called, or [stubs](#signed-in-users) are used instead
1. the request is validated, and types are coerced if you enabled [`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes)

So `c.request`, `c.operation`, `c.security` and `c.validation` are exactly what your handler gets in production.

## Signed-in users

Pass `security` to provide the results of your security handlers:

```ts
const c = await createContext(api, 'deletePetById', {
  params: { id: 1 },
  security: { jwt: { sub: 'alice', role: 'user' } },
});

expect(await deletePetById(c)).toMatchObject({ statusCode: 403 });
```

## Requests your handler never receives

`createContext()` throws when your handler could never receive the request, because openapi-backend would reject it
first:

```
Error: createContext(): the getPetById handler never receives this request

  The request failed validation:
    params.id  must be integer

  Your validationFail handler responds to requests like this. Send them
  with the test client, and check them with toFailValidation().
```

The same goes for requests that don't satisfy the operation's security requirements, when you have an
`unauthorizedHandler` or use strict mode. Test those with the [test client](/docs/openapi-backend/testing/validation).

## Framework arguments

Handlers also get the extra arguments you pass to `api.handleRequest()`, like Express's `req` and `res`. Pass your own:

```ts
import type { Request, Response } from 'express';

test('responds with the pet', async () => {
  const c = await createContext(api, 'getPetById', { params: { id: 1 } });
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  await getPetById(c, {} as Request, res as unknown as Response);

  expect(res.status).toHaveBeenCalledWith(200);
});
```

When handlers write to framework objects like this, tests through the test client are usually easier to read.

## Mocking dependencies

Mock the modules your handlers use with [`vi.mock()`](https://vitest.dev/api/vi#vi-mock), like in any other test. This
works with the test client too, since requests are handled in the same process as your tests:

```ts
import * as db from '../src/db';

vi.mock('../src/db');

test('responds with 404 when the pet does not exist', async () => {
  vi.mocked(db.findPet).mockResolvedValue(undefined);

  const res = await client.getPetById({ params: { id: 1 } });

  expect(res).toHaveStatus(404);
});
```
