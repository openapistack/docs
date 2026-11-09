---
title: Contract Testing
sidebar_position: 6
---

# Contract Testing

Your OpenAPI definition is a contract between your API and its clients. Every test that uses the test client also
checks that your API keeps it.

## Responses are checked automatically

Before an operation method resolves, the client checks the response against the responses documented for the
operation:

- the status code is documented, either exactly, as a range like `4XX`, or with a `default` response
- the `content-type` is one of the media types documented for that status, and the body isn't missing
- JSON bodies are valid JSON, and match the documented schema
- the required response headers are there, and documented headers match their schemas

If anything doesn't match, the call throws a `ResponseValidationError`, and the test fails right where the request was
sent, even if the test never looks at the body:

```
ResponseValidationError: getPetById's 200 response doesn't match the API spec

  GET /pets/1  →  getPetById
  200 OK
  {
    "id": 1,
    "type": "hamster"
  }

  body.name  must have required property 'name'
  body.type  must be equal to one of the allowed values: cat, dog

  Documented at paths./pets/{id}.get.responses.200
```

Status codes your spec doesn't document fail too, which catches unhandled errors in your handlers:

```
ResponseValidationError: getPetById responded with an undocumented 500

  GET /pets/1  →  getPetById
  500 Internal Server Error
  {
    "message": "Cannot read properties of undefined (reading 'name')"
  }

  The API spec documents 200, 400 and 404.
```

Responses to requests that didn't match any operation aren't checked, since there's nothing to check them against.

The checks use the same [Ajv](https://ajv.js.org) options and custom formats as your API's request validation, and
report every problem with a response, not just the first one.

## Turning it off

Set `validateResponse: false` to skip the check for one request, for a client created with
[`client.with()`](/docs/openapi-backend/testing/requests#default-request-options), or for every request:

```ts
// one request
await client.getPets({ validateResponse: false });

// every request sent with this client
const legacy = client.with({ validateResponse: false });

// every request
createTestClient(api, { app, validateResponse: false });
```

This is useful while you bring an existing API in line with its spec.

`ResponseValidationError` is exported from `openapi-backend/testing`. Its `errors` property lists what didn't match,
each with a `location` like `body.name` and a `message`, and `response` is the response that didn't match:

```ts
import { ResponseValidationError } from 'openapi-backend/testing';

await expect(client.getLegacyReport()).rejects.toThrow(ResponseValidationError);
```

## Testing your examples

The examples in your spec are documentation that your API's users copy from. Make sure they work:

```ts title="test/examples.test.ts"
import { test, expect } from 'vitest';
import { api, client } from './client';

const admin = client.with({ security: { jwt: { role: 'admin' } } });
const operationIds = api
  .getOperations()
  .map(({ operationId }) => operationId);

test.each(operationIds)('%s accepts its example', async (operationId) => {
  const res = await admin.call(operationId, { example: true });

  expect(res.context.validation.valid).toBe(true);
  expect(res.status).toBeLessThan(500);
});
```

Each operation gets a test that sends the request built from its examples, checks that your API accepts it and doesn't
fail with a server error, and, automatically, that the response matches your spec. An example that doesn't match its
own schema fails here, before it confuses anyone reading your API docs.

To test every named example, list them from the request bodies in your spec:

```ts
const examples = api.getOperations().flatMap((operation) => {
  const media = operation.requestBody?.content['application/json'];
  const names = Object.keys(media?.examples ?? {});
  return names.map((name) => [operation.operationId, name]);
});

test.each(examples)('%s accepts example %s', async (operationId, name) => {
  const res = await admin.call(operationId, { example: name });

  expect(res.context.validation.valid).toBe(true);
});
```

These tests call your handlers, so run them against test data.
