---
title: Testing Validation
sidebar_position: 4
---

# Testing Validation

openapi-backend validates path, query, header and cookie parameters and request bodies against the schemas in your
API definition. Validation tests make sure invalid requests are rejected before they reach your handlers, and that
valid requests aren't.

## Invalid requests

Send a request that breaks a rule in your spec, and check that it was rejected. `res.context.validation` has the
result of request validation:

```ts title="test/createPet.test.ts"
import { describe, test, expect } from 'vitest';
import { client } from './client';

const alice = client.with({ security: { jwt: { sub: 'alice' } } });

describe('createPet', () => {
  test('requires a name', async () => {
    const res = await alice.createPet({ body: { type: 'cat' } });

    expect(res.status).toBe(400);
    expect(res.context.validation.errors).toContainEqual(
      expect.objectContaining({ keyword: 'required', params: { missingProperty: 'name' } }),
    );
  });

  test('only accepts cats and dogs', async () => {
    const nemo = { name: 'Nemo', type: 'fish' };
    const res = await alice.createPet({ body: nemo });

    expect(res.status).toBe(400);
    expect(res.context.validation.errors).toContainEqual(
      expect.objectContaining({ instancePath: '/requestBody/type', keyword: 'enum' }),
    );
  });

  test('rejects unknown properties', async () => {
    const res = await alice.createPet({
      body: { name: 'Garfield', type: 'cat', age: 5 },
    });

    expect(res.status).toBe(400);
    expect(res.context.validation.valid).toBe(false);
  });
});
```

`createPet` requires authentication, and openapi-backend checks security before it validates a request. That's why
these requests are sent [as alice](/docs/openapi-backend/testing/security#stubbing-security-handlers): an anonymous
request would be rejected as unauthorized before validation even runs.

### Reading validation errors

`res.context.validation` is a [ValidationResult object](/docs/openapi-backend/api#validationresult-object): `valid`
tells whether the request passed, and `errors` is a list of [Ajv errors](https://ajv.js.org/api.html#validation-errors).
Their `instancePath` points into the request:

| `instancePath` | Points to |
| --- | --- |
| `/path/id` | the path parameter `id` |
| `/query/limit` | the query parameter `limit` |
| `/header/x-api-key` | the header `x-api-key` |
| `/cookie/session` | the cookie `session` |
| `/requestBody/owner/name` | a property in the body |
| `/requestBody/tags/0` | an item in an array |

Missing properties are reported at the object they're missing from, with the property in `params.missingProperty`.
Ajv stops at the first error unless you set `allErrors` in [`ajvOpts`](/docs/openapi-backend/api#parameter-optsajvopts).

## Valid requests

`res.context.validation.valid` tells whether a request passed validation, whatever your handler did with it
afterwards. That lets you test what your spec accepts without setting up data for your handlers:

```ts
test.each([1, 50, 100])('accepts limit=%i', async (limit) => {
  const res = await client.getPets({ query: { limit } });

  expect(res.context.validation.valid).toBe(true);
});

test.each([0, 101])('rejects limit=%i', async (limit) => {
  const res = await client.getPets({ query: { limit } });

  expect(res.status).toBe(400);
  expect(res.context.validation.valid).toBe(false);
});
```

## Starting from a valid request

Most validation tests send a valid request with one thing wrong. With
[`example: true`](/docs/openapi-backend/testing/requests#generating-requests-from-examples), the client starts from
the examples in your spec, and you only write the part that matters:

```ts
test('rejects an empty name', async () => {
  const res = await alice.createPet({ example: true, body: { name: '' } });

  expect(res.status).toBe(400);
  expect(res.context.validation.errors).toContainEqual(
    expect.objectContaining({ instancePath: '/requestBody/name', keyword: 'minLength' }),
  );
});
```

Because your spec is available in tests, you can even generate the cases from it. This tests every required property
of the `createPet` body, and keeps testing them when you add more:

```ts
import { api, client } from './client';

const alice = client.with({ security: { jwt: { sub: 'alice' } } });

const { requestBody } = api.getOperation('createPet');
const { required } = requestBody.content['application/json'].schema;

test.each(required)('createPet requires %s', async (property) => {
  const body = { [property]: undefined };
  const res = await alice.createPet({ example: true, body });

  expect(res.status).toBe(400);
  expect(res.context.validation.errors).toContainEqual(
    expect.objectContaining({ params: { missingProperty: property } }),
  );
});
```

## Malformed requests

To send a request your types won't allow, like a body that isn't valid JSON, use
[`client.request()`](/docs/openapi-backend/testing/requests#raw-requests):

```ts
test('rejects malformed JSON', async () => {
  const res = await alice.request('POST /pets', {
    headers: { 'content-type': 'application/json' },
    body: '{ "name": "Garfield", ',
  });

  expect(res.status).toBe(400);
});
```

Whether openapi-backend ever sees a malformed body depends on your app. In the example Express app, `express.json()`
rejects it before the request reaches `api.handleRequest()`, so this test checks your app's own error handling, and
`res.context` is `undefined`. When your app passes the raw body to openapi-backend, like a Lambda handler does, the
request fails validation with a `parse` error instead:

```ts
expect(res.context.validation.errors).toContainEqual(expect.objectContaining({ keyword: 'parse' }));
```

## Formats and Ajv options

Tests use your own `api` instance, so custom formats from [`customizeAjv`](/docs/openapi-backend/request-validation#extended-formats),
[`ajvOpts`](/docs/openapi-backend/api#parameter-optsajvopts) and
[`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes) apply in tests exactly as they do in production.

## Check the status, too

Without a `validationFail` handler or [`strict: true`](/docs/openapi-backend/api#parameter-optsstrict), requests
that fail validation still reach your operation handlers. `res.context.validation.valid` is `false` either way, so
assert on `res.status` as well: a test like the ones above fails if an invalid request gets a `201`. See
[Security Best Practices](/docs/openapi-backend/security#enforce-request-validation).

## Response validation

Responses are validated too, automatically, on every request. See [Contract testing](/docs/openapi-backend/testing/contract).
