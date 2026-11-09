---
title: Testing Routing
sidebar_position: 3
---

# Testing Routing

openapi-backend routes every request to an operation by matching its method and path against the paths in your API
definition. Routing tests make sure requests end up where you expect, especially where paths overlap, like `/pets/meta`
and `/pets/{id}`.

## Routing tables

Send requests with [`client.request()`](/docs/openapi-backend/testing/requests#raw-requests), and check which operation
handled them with `res.operationId`:

```ts title="test/routing.test.ts"
import { test, expect } from 'vitest';
import { client } from './client';

test.each([
  ['GET /pets', 'getPets'],
  ['POST /pets', 'createPet'],
  ['GET /pets/meta', 'getPetsMeta'],
  ['GET /pets/1', 'getPetById'],
  ['DELETE /pets/1', 'deletePetById'],
  ['GET /pets/1/', 'getPetById'], // trailing slashes are ignored by default
])('%s routes to %s', async (request, operationId) => {
  const res = await client.request(request);

  expect(res.operationId).toBe(operationId);
});
```

The requests go through your app, so this tests routing the way it works in production. `res.operationId` is the
operation openapi-backend matched for the request.

To check the router alone, without sending requests, use [`api.matchOperation()`](/docs/openapi-backend/api#matchoperationreq):

```ts
const operation = api.matchOperation({ method: 'GET', path: '/pets/meta', headers: {} });

expect(operation?.operationId).toBe('getPetsMeta');
```

## Requests that don't match

When no operation matches, `res.operationId` is `undefined`, and the response comes from your `notFound` handler:

```ts
test('responds with 404 to unknown paths', async () => {
  const res = await client.request('GET /cats');

  expect(res.status).toBe(404);
  expect(res.operationId).toBeUndefined();
});
```

When the path exists but the method doesn't, openapi-backend calls your `methodNotAllowed` handler, or your `notFound`
handler if you haven't registered one. See [Request Lifecycle & Handlers](/docs/openapi-backend/request-lifecycle).

## Path parameters

`res.context` shows the path parameters openapi-backend parsed for your handler:

```ts
test('parses the pet id from the path', async () => {
  const res = await client.request('GET /pets/42');

  expect(res.operationId).toBe('getPetById');
  expect(res.context.request.params).toEqual({ id: '42' });
});
```

Path parameters are strings, unless you enable [`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes).

## Operation methods check routing too

When you call an operation method, the client checks that the request it built is routed back to that same
operation. If it isn't, real clients could never reach the operation's handler with those parameters, and the call
throws a `RoutingError`.

Say your API has both `/users/me` and `/users/{username}`:

```ts
await client.getUserByUsername({ params: { username: 'me' } });
```

```
RoutingError: client.getUserByUsername() sent GET /users/me, but the router matched getCurrentUser (GET /users/me) instead.
getUserByUsername can't be reached with { username: "me" }.
```

That's a user called "me" who can never see their profile, found without writing a routing test. If you want to send
such a request on purpose, use [`client.request()`](/docs/openapi-backend/testing/requests#raw-requests).

## API root

Raw requests take the full path, including the [`apiRoot`](/docs/openapi-backend/api#parameter-optsapiroot):

```ts
const api = new OpenAPIBackend({ definition, apiRoot: '/v1' });

const res = await client.request('GET /v1/pets');
expect(res.operationId).toBe('getPets');
```

Operation methods add the `apiRoot` for you. If your app serves openapi-backend under a different path, set the
client's [`basePath`](/docs/openapi-backend/testing/frameworks#base-path).

## Every operation has a handler

A request to an operation without a handler ends up in your `notImplemented` handler, or throws a
`501-notImplemented` error. Catch missing handlers before your users do:

```ts
test('every operation has a handler', () => {
  const missing = api
    .getOperations()
    .map((operation) => operation.operationId)
    .filter((operationId) => !api.handlers[operationId]);

  expect(missing).toEqual([]);
});
```
