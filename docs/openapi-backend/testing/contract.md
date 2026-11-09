---
title: Contract Testing
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Contract Testing

Your OpenAPI definition is a contract between your API and its clients. Every test that uses the test client also
checks that your API keeps it.

## Responses are checked automatically

Before an operation method resolves, the client checks the response against the responses documented for the
operation:

- the status code is documented, either exactly, as a range like `4XX`, or with a `default` response
- the `content-type` is one of the media types documented for that status
- the body matches the documented schema
- the required response headers are there, and documented headers match their schemas

If anything doesn't match, the call throws and the test fails right where the request was sent, even if the test
never looks at the body:

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

  The API spec documents 200, 400 and 404.
```

Responses to requests that didn't match any operation aren't checked, since there's nothing to check them against.

## Checking responses yourself

Set `validateResponse: false` to skip the automatic check, for one request, for a client created with
[`client.with()`](/docs/openapi-backend/testing/requests#default-request-options), or for all requests in
`createTestClient()`. Then check responses with `toMatchApiSpec()` where you want to:

```ts
const legacy = client.with({ validateResponse: false });

test('getPets matches the spec', async () => {
  const res = await legacy.getPets();

  expect(res).toMatchApiSpec();
});
```

This is useful while you bring an existing API in line with its spec. `toMatchApiSpec()` runs the same checks and
fails with the same message.

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

  expect(res).not.toFailValidation();
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

  expect(res).not.toFailValidation();
});
```

These tests call your handlers, so run them against test data.

## API coverage

The API coverage reporter shows which operations and documented responses your tests never exercised:

<Tabs groupId="test-runner">
<TabItem value="vitest" label="Vitest" default>

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';
import { apiCoverage } from 'openapi-backend/vitest/reporter';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default', apiCoverage()],
  },
});
```

</TabItem>
<TabItem value="jest" label="Jest">

```js title="jest.config.js"
module.exports = {
  setupFilesAfterEnv: ['openapi-backend/jest'],
  reporters: ['default', 'openapi-backend/jest/reporter'],
};
```

</TabItem>
</Tabs>

After the test run, you get a report:

```
 API coverage

  getPets         ✓ 200
  createPet       ✓ 201   ✓ 400   ✗ 401
  getPetsMeta     ✗ never called
  getPetById      ✓ 200   ✗ 400   ✓ 404
  deletePetById   ✓ 204   ✓ 401   ✓ 403   ✗ 404

  Operations  4/5 (80%)   Responses  8/12 (67%)
```

An operation is covered when a test sent a request that was routed to it, and a response is covered when a test
received it. A `4XX` or `default` response is covered by any status code it matches. Requests from all test files
count, no matter which client sent them.

Set thresholds to fail the test run when coverage drops:

<Tabs groupId="test-runner">
<TabItem value="vitest" label="Vitest" default>

```ts title="vitest.config.ts"
reporters: [
  'default',
  apiCoverage({ thresholds: { operations: 100, responses: 80 } }),
],
```

</TabItem>
<TabItem value="jest" label="Jest">

```js title="jest.config.js"
reporters: [
  'default',
  [
    'openapi-backend/jest/reporter',
    { thresholds: { operations: 100, responses: 80 } },
  ],
],
```

</TabItem>
</Tabs>
