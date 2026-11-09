---
title: Requests & Responses
sidebar_position: 2
---

# Requests & Responses

The test client has a method for every operation in your API definition, named after its `operationId`:

```ts
import { test, expect } from 'vitest';
import { client } from './client';

test('lists pets', async () => {
  const res = await client.getPets({ query: { limit: 10 } });

  expect(res).toHaveStatus(200);
  expect(res.body).toHaveLength(10);
});
```

See [Testing](/docs/openapi-backend/testing#2-create-a-test-client) for how to create the client.

## Calling operations

Operation methods take a single request object. Every property is optional:

```ts
await client.getPetById({ params: { id: 1 } });

await client.getPets({
  query: { limit: 10 },
  headers: { 'x-request-id': 'test-1' },
  cookies: { session: 'abc123' },
});

await client.createPet({ body: { name: 'Garfield', type: 'cat' } });
```

| Option | Description |
| --- | --- |
| `params` | Path parameters, like `{ id: 1 }` for `/pets/{id}`. Your handlers read them from `c.request.params`. |
| `query` | Query parameters, like `{ limit: 10 }`. |
| `headers` | Request headers. |
| `cookies` | Cookies, sent in the `Cookie` header. |
| `body` | The request body. |
| `contentType` | The media type to send the body as, when the operation accepts more than one. |
| `example` | Fill in the request from the examples in your spec. See [Generating requests from examples](#generating-requests-from-examples). |
| `security` | Results to use instead of calling your security handlers. See [Testing security](/docs/openapi-backend/testing/security#stubbing-security-handlers). |
| `validateResponse` | Set to `false` to skip checking this response against your spec. See [Contract testing](/docs/openapi-backend/testing/contract). |

The client builds the HTTP request from the operation in your spec, the same way a real API client would:

- path parameters are filled into the path template and URL-encoded, and the [`apiRoot`](/docs/openapi-backend/api#parameter-optsapiroot) is prepended
- query parameters are serialized with the `style` and `explode` defined for each parameter, so an array declared with
  `explode: false` is sent as `tags=cat,dog`
- the body is encoded as the operation's media type, preferring `application/json`, and `content-type` is set for you.
  Strings and Buffers are sent as is.

`res.request` shows what was actually sent:

```ts
const res = await client.getPets({ query: { limit: 10 } });

expect(res.request.method).toBe('GET');
expect(res.request.url).toBe('/pets?limit=10');
```

## The response

Operation methods resolve to a response object:

| Property | Description |
| --- | --- |
| `status` | The HTTP status code. |
| `headers` | The response headers, with lowercase names. |
| `body` | The response body. JSON is parsed. Other content is a string, or a Buffer for binary content. |
| `operationId` | The `operationId` of the operation the router matched. `undefined` when no operation matched. |
| `operation` | The matched [Operation object](/docs/openapi-backend/api#operation-object). |
| `context` | The [Context object](/docs/openapi-backend/api#context-object) openapi-backend built for the request, with the parsed request, validation result and security handler results. `undefined` when the request never reached `api.handleRequest()`. |
| `request` | The request the client sent: `method`, `url`, `headers` and `body`. |

The client resolves for every status code. A `404` is a response to assert on, not an error:

```ts
test('returns 404 for unknown pets', async () => {
  const res = await client.getPetById({ params: { id: 999 } });

  expect(res).toHaveStatus(404);
  expect(res.body.message).toBe('Pet not found');
});
```

`context` lets you see what your handler saw. For example, with
[`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes) enabled, query parameters arrive as numbers:

```ts
const res = await client.getPets({ query: { limit: 10 } });

expect(res.context.request.query).toEqual({ limit: 10 });
```

:::note

Every response is checked against the responses documented for the operation before the method resolves. If your API
responds with something your spec doesn't describe, the call throws and the test fails. See
[Contract testing](/docs/openapi-backend/testing/contract).

:::

## Default request options

`client.with()` returns a new client that adds options to every request. Use it for things like authentication and
tenant headers:

```ts
const alice = client.with({ headers: { authorization: `Bearer ${token}` } });
const aliceAtAcme = alice.with({ headers: { 'x-tenant': 'acme' } });

await aliceAtAcme.getPets(); // sends both headers
```

Options are merged, and options passed to a single request win. The original client doesn't change, so it's safe to
share one client between tests.

You can also pass defaults straight to `createTestClient()`:

```ts
export const client = createTestClient(api, {
  app,
  headers: { 'x-tenant': 'acme' },
});
```

## Generating requests from examples

Set `example: true` and the client fills in the request from your spec:

```ts
const res = await alice.createPet({ example: true });
// POST /pets
// { "name": "Garfield", "type": "cat" }
```

Values come from the first place that has one:

1. the `example` or `examples` of the parameter or request body
1. the `example` or `default` of its schema
1. a value generated from the schema with [mock-json-schema](/docs/utilities/mock-json-schema)

When there are several examples, the first one is used. Required parameters and the request body are always filled
in. Optional parameters are only included if your spec has an example for them.

Pick a named example with its name:

```ts
await alice.createPet({ example: 'odie' });
// { "name": "Odie", "type": "dog" }
```

Anything else you pass is deep merged into the example. Set a property to `undefined` to leave it out. This makes
"a valid request, except for one thing" tests short and readable:

```ts
test('rejects an empty name', async () => {
  const res = await alice.createPet({ example: true, body: { name: '' } });

  expect(res).toFailValidation('body.name');
});

test('requires a type', async () => {
  const body = { type: undefined };
  const res = await alice.createPet({ example: true, body });

  expect(res).toFailValidation('body.type');
});
```

The generated request is checked against your API's own validation before your overrides are applied. If it doesn't
pass, for example because a schema has a `pattern` the generator can't satisfy, the client throws and tells you which
schema needs an example.

:::tip

Use `example` to cut out noise, not to hide what a test is about. When the request _is_ the point of the test, write
it out.

:::

## Raw requests

`client.request()` sends a request you write yourself, without looking up an operation. Use it to test routing, send
requests your types won't allow, or call endpoints that aren't in your spec:

```ts
await client.request('GET /pets/meta');
await client.request('GET /pets?limit=many');
await client.request('POST /pets', {
  headers: { 'content-type': 'application/json' },
  body: '{ "name": "Garfield", ',
});
```

The first argument is the method and path, with an optional query string. The options are the same as for operation
methods, except `params` and `example`. The response still has `operationId` and `context`, and is still checked
against your spec if the router matched an operation.

## Calling operations by name

`client.call()` calls an operation by its `operationId`. It's handy for table-driven tests:

```ts
test.each(['getPets', 'getPetsMeta'])('%s is public', async (operationId) => {
  const res = await client.call(operationId);

  expect(res).toHaveStatus(200);
});
```

It's also how you call an operation whose `operationId` clashes with one of the client's own methods: `call`,
`request`, `with` or `api`.

## Snapshots

Responses have a snapshot format that reads like HTTP:

```ts
test('creates a pet', async () => {
  const res = await alice.createPet({ example: 'garfield' });

  expect(res).toMatchInlineSnapshot(`
    HTTP/1.1 201 Created
    content-type: application/json; charset=utf-8

    {
      "id": 3,
      "name": "Garfield",
      "type": "cat"
    }
  `);
});
```

Snapshots include the status, the `content-type`, the response headers documented in your spec, and the body. Other
headers, like `date` or `etag`, change between runs and are left out.

`console.log(res)` prints a response in the same format.

## TypeScript

Pass the `Operations` type generated by [`openapi typegen --backend`](/docs/openapi-backend/typescript) to
`createTestClient()`:

```ts title="test/client.ts"
import type { Operations } from '../src/types/openapi';

export const client = createTestClient<Operations>(api, { app });
```

Operation methods are then typed from your spec:

```ts
const res = await client.getPetById({ params: { id: 1 } });
res.body; // Pet | Error

// ❌ Property 'getPetByID' does not exist
await client.getPetByID({ params: { id: 1 } });

// ❌ Property 'type' is missing
await client.createPet({ body: { name: 'Garfield' } });
```

To send an invalid request on purpose, mark it with `@ts-expect-error`, which also documents your intent:

```ts
// @ts-expect-error: id must be a number
const res = await client.getPetById({ params: { id: 'garfield' } });

expect(res).toFailValidation('params.id');
```

Or use [`client.request()`](#raw-requests), which isn't typed by operation.

Without types, calling an unknown operation throws:

```
Error: Unknown operationId "getPetByID". Did you mean "getPetById"?
```
