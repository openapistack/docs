---
title: Testing Validation
sidebar_position: 4
---

# Testing Validation

openapi-backend validates path, query, header and cookie parameters and request bodies against the schemas in your
API definition. Validation tests make sure invalid requests are rejected before they reach your handlers, and that
valid requests aren't.

## Invalid requests

`toFailValidation()` checks that a request was rejected by request validation, and where the error was:

```ts title="test/createPet.test.ts"
import { describe, test, expect } from 'vitest';
import { client } from './client';

const alice = client.with({ security: { jwt: { sub: 'alice' } } });

describe('createPet', () => {
  test('requires a name', async () => {
    const res = await alice.createPet({ body: { type: 'cat' } });

    expect(res).toFailValidation('body.name');
  });

  test('rejects names longer than 64 characters', async () => {
    const name = 'G'.repeat(65);
    const res = await alice.createPet({ body: { name, type: 'cat' } });

    expect(res).toFailValidation('body.name');
  });

  test('only accepts cats and dogs', async () => {
    const nemo = { name: 'Nemo', type: 'fish' };
    const res = await alice.createPet({ body: nemo });

    expect(res).toFailValidation('body.type');
  });

  test('rejects unknown properties', async () => {
    const res = await alice.createPet({
      body: { name: 'Garfield', type: 'cat', age: 5 },
    });

    expect(res).toFailValidation('body.age');
  });
});
```

`createPet` requires authentication, and openapi-backend checks security before it validates a request. That's why
these requests are sent [as alice](/docs/openapi-backend/testing/security#stubbing-security-handlers): an anonymous
request would be rejected as unauthorized before validation even runs.

### Error locations

Locations are written the same way you wrote the request:

| Location | Points to |
| --- | --- |
| `params.id` | the path parameter `id` |
| `query.limit` | the query parameter `limit` |
| `headers.x-api-key` | the header `x-api-key` |
| `cookies.session` | the cookie `session` |
| `body` | the request body as a whole, like when it's missing or isn't valid JSON |
| `body.owner.name` | a property in the body |
| `body.tags[0]` | an item in an array |

A location matches errors at that location and anywhere inside it, so `toFailValidation('body')` passes for any error
in the body. Without a location, `toFailValidation()` passes for any validation error.

Missing and unknown properties are reported at the property itself. A body without a `name` fails at `body.name`,
not at `body`.

### Checking the error

To be more specific, pass an object with the `keyword` or `message` you expect:

```ts
expect(res).toFailValidation({ at: 'body.name', keyword: 'maxLength' });
expect(res).toFailValidation({ at: 'query.limit', message: 'must be <= 100' });
```

Keywords are the JSON Schema keywords reported by [Ajv](https://ajv.js.org), like `required`, `type`, `enum`,
`minLength` or `additionalProperties`, and `parse` for malformed JSON.

When a request has several problems, assert each one:

```ts
const res = await alice.createPet({ body: {} });

expect(res).toFailValidation('body.name');
expect(res).toFailValidation('body.type');
```

All the errors are in `res.context.validation.errors`.

## Valid requests

`.not.toFailValidation()` passes when a request was validated and passed, whatever your handler did with it
afterwards. That lets you test what your spec accepts without setting up data for your handlers:

```ts
test.each([1, 50, 100])('accepts limit=%i', async (limit) => {
  const res = await client.getPets({ query: { limit } });

  expect(res).not.toFailValidation();
});

test.each([0, 101])('rejects limit=%i', async (limit) => {
  const res = await client.getPets({ query: { limit } });

  expect(res).toFailValidation('query.limit');
});
```

## Starting from a valid request

Most validation tests send a valid request with one thing wrong. With
[`example: true`](/docs/openapi-backend/testing/requests#generating-requests-from-examples), the client starts from
the examples in your spec, and you only write the part that matters:

```ts
test('rejects an empty name', async () => {
  const res = await alice.createPet({ example: true, body: { name: '' } });

  expect(res).toFailValidation('body.name');
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

  expect(res).toFailValidation(`body.${property}`);
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

  expect(res).toHaveStatus(400);
});
```

Whether openapi-backend ever sees a malformed body depends on your app. In the example Express app, `express.json()`
rejects it before the request reaches `api.handleRequest()`, so this test checks your app's own error handling. When
your app passes the raw body to openapi-backend, like a Lambda handler does, the request fails validation instead:

```ts
expect(res).toFailValidation({ at: 'body', keyword: 'parse' });
```

If a request never reached openapi-backend, `toFailValidation()` fails and tells you so.

## Formats and Ajv options

Tests use your own `api` instance, so custom formats from [`customizeAjv`](/docs/openapi-backend/request-validation#extended-formats),
[`ajvOpts`](/docs/openapi-backend/api#parameter-optsajvopts) and
[`coerceTypes`](/docs/openapi-backend/api#parameter-optscoercetypes) apply in tests exactly as they do in production.

## What toFailValidation() checks

`toFailValidation()` only passes when both of these are true:

1. the request failed openapi-backend's request validation, at the location you gave
1. the request was rejected because of it: your `validationFail` handler responded, or
   [strict mode](/docs/openapi-backend/api#parameter-optsstrict) rejected the request. Your operation handler never ran.

The second part matters. Without a `validationFail` handler or `strict: true`, requests that fail validation still
reach your operation handlers. `toFailValidation()` catches that:

```
AssertionError: expected createPet to reject the request

  The request failed validation:
    body.name  must NOT have fewer than 1 characters

  But the createPet handler ran anyway, and responded with 201.
  Requests that fail validation reach your handlers unless you register a
  validationFail handler or set strict: true. See
  https://openapistack.co/docs/openapi-backend/security
```

See [Security Best Practices](/docs/openapi-backend/security#enforce-request-validation).

## Response validation

Responses are validated too, automatically, on every request. See [Contract testing](/docs/openapi-backend/testing/contract).
