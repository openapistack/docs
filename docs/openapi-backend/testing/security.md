---
title: Testing Security
sidebar_position: 5
---

# Testing Security

openapi-backend checks the [security requirements](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#security-requirement-object)
of every operation by calling your [security handlers](/docs/openapi-backend/security-handlers), and rejects requests
that don't satisfy them with your `unauthorizedHandler`, or in [strict mode](/docs/openapi-backend/api#parameter-optsstrict).
Security tests make sure protected operations stay protected.

## Anonymous requests

Send a request without credentials, and check that it was rejected:

```ts
import { test, expect } from 'vitest';
import { client } from './client';

test('creating pets requires authentication', async () => {
  const res = await client.createPet({ example: true });

  expect(res.status).toBe(401);
  expect(res.context.security.authorized).toBe(false);
});
```

## Every protected operation

Your spec says which operations need authentication, so you can test all of them with one test:

```ts title="test/security.test.ts"
import { test, expect } from 'vitest';
import { api, client } from './client';

// operations that require authentication
const operationIds = api
  .getOperations()
  .filter(({ security }) => security.length > 0)
  // an empty requirement {} makes authentication optional
  .filter(({ security }) =>
    security.every((requirement) => Object.keys(requirement).length > 0),
  )
  .map(({ operationId }) => operationId);

test.each(operationIds)('%s requires authentication', async (operationId) => {
  const res = await client.call(operationId, { example: true });

  expect(res.status).toBe(401);
});
```

`example: true` fills in path parameters and request bodies from your spec, so the same test works for every
operation. Operations you add later are tested automatically.

:::note

Test tables built from `api.getOperations()` need the API to be initialized when the test file loads. The shared
[test client module](/docs/openapi-backend/testing#1-create-a-test-client) does that with a top-level `await api.init()`.

:::

## Authenticated requests

To test your security handlers, send real credentials. Create a client for each user with
[`client.with()`](/docs/openapi-backend/testing/requests#default-request-options):

```ts
import { signToken } from '../src/auth';

const token = signToken({ sub: 'alice' });
const alice = client.with({ headers: { authorization: `Bearer ${token}` } });

test('alice can create pets', async () => {
  const res = await alice.createPet({ example: true });

  expect(res.status).toBe(201);
});

test('rejects expired tokens', async () => {
  const expired = signToken({ sub: 'alice' }, { expiresIn: -1 });
  const res = await client.createPet({
    example: true,
    headers: { authorization: `Bearer ${expired}` },
  });

  expect(res.status).toBe(401);
});
```

## Stubbing security handlers

To test what your operation handlers do with a user, like checking roles or who owns a pet, you don't need real
credentials. The `security` option provides the result of a security handler, and the handler isn't called:

```ts
const user = client.with({ security: { jwt: { role: 'user' } } });
const admin = client.with({ security: { jwt: { role: 'admin' } } });

test('only admins can delete pets', async () => {
  expect((await user.deletePetById({ params: { id: 1 } })).status).toBe(403);
  expect((await admin.deletePetById({ params: { id: 1 } })).status).toBe(204);
});
```

The keys are the names of your security schemes, and the values are what your security handler would have returned.
Your handlers find them in `c.security.jwt`, as usual.

Stubs only replace security handlers. Security requirements are still checked the usual way: a stubbed `jwt` result
doesn't let a request into an operation that requires `apiKey`, and a falsy result, or an object with an `error`
property, fails the requirement.

:::caution

Stubs skip your security handlers. Keep some tests that send real credentials, so the handlers themselves are tested
too.

:::

Stubs need the request to be handled in the same process as your tests. They don't work against a
[running server](/docs/openapi-backend/testing/frameworks#a-running-server).

## Inspecting security results

`res.context.security` has the authorization result and the result of each security handler:

```ts
const res = await alice.createPet({ example: true });

expect(res.context.security.authorized).toBe(true);
expect(res.context.security.jwt).toMatchObject({ sub: 'alice' });
```

## Check the status, too

Security handlers don't reject requests on their own. Without an `unauthorizedHandler` or `strict: true`, the
operation handler still runs for unauthorized requests, and `res.context.security.authorized` is `false` either way.
Assert on `res.status`, like the tests above do, and a protected operation that lets anonymous requests through fails
the test. See [Security Best Practices](/docs/openapi-backend/security#enforce-security-requirements).

For the rest of the best practices, use [openapi-backend-codeql](/docs/openapi-backend/security#static-analysis-with-codeql).

## Signed-in users with Vitest fixtures

When signing in takes setup, like creating a user in your database, provide clients with
[Vitest fixtures](https://vitest.dev/guide/test-context#extend-test-context):

```ts title="test/fixtures.ts"
import { test as base } from 'vitest';
import type { TestClient } from 'openapi-backend/testing';
import { client } from './client';
import { createUser, deleteUser, signToken } from './users';

export const test = base.extend<{ user: TestClient }>({
  user: async ({}, use) => {
    const account = await createUser();
    const token = signToken({ sub: account.id });
    await use(client.with({ headers: { authorization: `Bearer ${token}` } }));
    await deleteUser(account.id);
  },
});
```

```ts title="test/pets.test.ts"
import { expect } from 'vitest';
import { test } from './fixtures';

test('users can create pets', async ({ user }) => {
  const res = await user.createPet({ example: true });

  expect(res.status).toBe(201);
});
```
