---
sidebar_position: 4
---

# Testing with msw + openapi-backend mocks

:::info

[MSW](https://mswjs.io/) (Mock Service Worker) is a popular library built to intercept and mock network requests commonly used in testing.

:::

### Setting up msw

Here is the basic setup for a rest api mock using msw:

```javascript
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/api/pets", (req, res, ctx) => {
    const pets = [{ id: 1, name: "Garfield", type: "cat" }];
    return res(ctx.json({ pets }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
```

One of the reasons this is extremely cool is because it avoids the pain of having to start up a real local mock backend, such as an express server that needs to be bound to a specific port on the host running the test.

This helps keep your tests fast and simple to run, as they should be.

### Even better with OpenAPI

It turns out `msw` together with `openapi-backend` is the perfect combination for mocking REST apis.

To provide a full mock for an API, all we need is to create a mock backend with openapi-backend using the API definition and tell msw to use it:

```javascript
import { rest } from "msw";
import { setupServer } from "msw/node";
import OpenAPIBackend from "openapi-backend";
import definition from "./path/to/definition.json";

// create our mock backend with openapi-backend
const api = new OpenAPIBackend({ definition });
api.register("notFound", (c, res, ctx) => res(ctx.status(404)));
api.register("notImplemented", async (c, res, ctx) => {
  const { status, mock } = api.mockResponseForOperation(
    c.operation.operationId
  );
  ctx.status(status);
  return res(ctx.json(mock));
});

// tell msw to intercept all requests to api/* with our mock
const server = setupServer(
  rest.all("/api/*", async (req, res, ctx) =>
    api.handleRequest(
      {
        path: req.url.pathname,
        query: req.url.search,
        method: req.method,
        body: req._bodyUsed ? await req.json() : null,
        headers: { ...req.headers.raw },
      },
      res,
      ctx
    )
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
```

Now instead of having to write your own mock handlers for each operation, they're generated from the response schemas and examples defined in the OpenAPI document.

What's more: any time the API definition changes, all your mocks will be automatically updated giving you further confidence your app is compatible with the new API version.

### Enabling Request Validation

When testing, it's often very useful to make sure your application is actually sending the correct requests to the API.

Working with OpenAPI definitions has the benefit that API operations are well defined and requests can be automatically validated using JSON schema.

To enable request validation during tests, you can simply register the [validationFail handler](https://openapistack.co/docs/openapi-backend/api#validationfail-handler) for openapi-backend:

```javascript
api.register("validationFail", (c, res, ctx) =>
  res(ctx.status(400), ctx.json({ error: c.validation.errors }))
);
```

When running tests, a malformed call to an API endpoint will now result in a 400 Bad Request error from the mock backend, alongside a useful error message telling you what's wrong with the request.

### Custom Handlers

In some tests it might make sense to provide a different mock than the default one as provided by openapi-backend.

Registering your own mock for an API operation in a test is as simple as calling `api.register()` with the operationId and a mock handler:

```javascript
it("should call getPets operation", () => {
  // given
  const mockResponse = [{ id: 2, name: "Odie" }];
  const mockHandler = jest.fn((c, res, ctx) => res(ctx.json(mockResponse)));
  api.register("getPets", mockHandler);

  // when
  // render(<MyComponent />)...

  // then
  expect(mockHandler).toBeCalled();
});
```
