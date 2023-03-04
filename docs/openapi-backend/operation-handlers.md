---
sidebar_position: 4
---

# Operation Handlers

Handlers are controllers for operations described in your OpenAPI document. They are registered for each [`operationId`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-8) found in the OpenAPI definitions.

```ts
import type { Context } from "openapi-backend";
import type { Request, Response } from "express";

async function getPetByIdHandler(
  c: Context<{ id: string }>,
  _req: Request,
  res: Response
) {
  const id = c.request.params.id;
  const pet = await pets.getPetById(id);
  return res.status(200).json({ result: pet });
}

api.register("getPetById", getPetByIdHandler);
// or
api.register({
  getPetById: getPetByIdHandler,
});
```

Operation handlers are passed a special [Context object](/docs/openapi-backend/api#context-object) as the first argument, which contains the parsed request, the matched API operation and input validation results.

Arguments 2 and higher are passed through from [`handleRequest`](/docs/openapi-backend/api#handlerequestreq-handlerargs)

### validationFail Handler

The `validationFail` handler gets called by `.handleRequest()` if the input validation fails for a request.

HINT: You should probably return a 400 status code from this handler.

Example handler:

```javascript
function validationFailHandler(c, req, res) {
  return res.status(400).json({ status: 400, err: c.validation.errors });
}
api.register("validationFail", validationFailHandler);
```

### notFound Handler

The `notFound` handler gets called by `.handleRequest()` if the path doesn't
match an operation in the API definitions.

HINT: You should probably return a 404 status code from this handler.

Example handler:

```javascript
function notFound(c, req, res) {
  return res.status(404).json({ status: 404, err: "Not found" });
}
api.register("notFound", notFound);
```

### methodNotAllowed Handler

The `methodNotAllowed` handler gets called by `.handleRequest()` if request
method does not match any operations for the path.

If this handler isn't registered, the [notFound Handler](#notfound-handler) will be used instead.

HINT: You should probably return a 405 status code from this handler.

Example handler:

```javascript
function methodNotAllowed(c, req, res) {
  return res.status(405).json({ status: 405, err: "Method not allowed" });
}
api.register("methodNotAllowed", methodNotAllowed);
```

### notImplemented Handler

The `notImplemented` handler gets called by `.handleRequest()` if no other Operation Handler has been registered for
the matched operation.

HINT: You can either mock the response or return a 501 status code.

Example handler:

```javascript
function notImplementedHandler(c, req, res) {
  return res
    .status(404)
    .json({ status: 501, err: "No handler registered for operation" });
}
api.register("notImplemented", notImplementedHandler);
```

### unauthorizedHandler Handler

The `unauthorizedHandler` handler gets called by `.handleRequest()` if security
requirements are not met after checking [Security Requirements](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#securityRequirementObject)
and calling their [Security Handlers](#security-handlers).

HINT: You should probably return a 401 or 403 code from this handler and
instruct the client to authenticate.

Example handler:

```javascript
function unauthorizedHandler(c, req, res) {
  return res
    .status(401)
    .json({ status: 401, err: "Please authenticate first" });
}
api.register("unauthorizedHandler", unauthorizedHandler);
```

If no `unauthorizedHandler` is registered, the Security Handlers will still be
called and their output and the authorization status for the request can be
checked in operation handlers via the [`context.security` property](#context-object).

### postResponseHandler Handler

The `postResponseHandler` handler gets called by `.handleRequest()` after resolving the response handler.

The return value of the response handler will be passed in the context object `response` property.

HINT: You can use the postResponseHandler to validate API responses against your response schema

Example handler:

```javascript
function postResponseHandler(c, req, res) {
  const valid = c.api.validateResponse(c.response, c.operation);
  if (valid.errors) {
    // response validation failed
    return res.status(502).json({ status: 502, err: valid.errors });
  }
  return res.status(200).json(c.response);
}
api.register("postResponseHandler", postResponseHandler);
```
