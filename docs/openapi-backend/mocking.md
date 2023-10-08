---
sidebar_position: 7
---

# Mocking API responses

Mocking APIs just got really easy with OpenAPI Backend! Register a [`notImplemented`](/docs/openapi-backend/api#notimplemented-handler)
handler and use [`mockResponseForOperation()`](/docs/openapi-backend/api##mockresponseforoperationoperationid-opts)
to generate mock responses for operations with no custom handlers specified yet:

```javascript
api.register("notImplemented", (c, req, res) => {
  const { status, mock } = c.api.mockResponseForOperation(
    c.operation.operationId
  );
  return res.status(status).json(mock);
});
```

OpenAPI Backend supports mocking responses using both OpenAPI example objects and JSON Schema:

```yaml
paths:
  "/pets":
    get:
      operationId: getPets
      summary: List pets
      responses:
        200:
          $ref: "#/components/responses/PetListWithExample"
  "/pets/{id}":
    get:
      operationId: getPetById
      summary: Get pet by its id
      responses:
        200:
          $ref: "#/components/responses/PetResponseWithSchema"
components:
  responses:
    PetListWithExample:
      description: List of pets
      content:
        "application/json":
          example:
            - id: 1
              name: Garfield
            - id: 2
              name: Odie
    PetResponseWithSchema:
      description: A single pet
      content:
        "application/json":
          schema:
            type: object
            properties:
              id:
                type: integer
                minimum: 1
              name:
                type: string
                example: Garfield
```

The example above will yield:

```javascript
api.mockResponseForOperation("getPets"); // => { status: 200, mock: [{ id: 1, name: 'Garfield' }, { id: 2, name: 'Odie' }]}
api.mockResponseForOperation("getPetById"); // => { status: 200, mock: { id: 1, name: 'Garfield' }}
```

[See full Mock API example on Express](https://github.com/openapistack/openapi-backend/tree/master/examples/express-ts-mock)
