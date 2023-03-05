---
hide_title: true
sidebar_position: 10
---

# API Versioning

Since OpenAPI specification already supports the `version` field in the [`info` object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#infoObject),
it's easy to do URI versioning utilising multiple [`OpenAPIBackend`](#class-openapibackend) instances with different
[`apiRoot`](#parameter-optsapiroot) values.

Simple example:

```typescript
const apiV1 = new OpenAPIBackend({
  definition: "./openapi-v1.json",
  apiRoot: "/v1",
});

const apiV2 = new OpenAPIBackend({
  definition: "./openapi-v2.json",
  apiRoot: "/v2",
});

const v1Handlers = {
  notFound,
  getPet,
  listPets,
  createPet,
};
apiV1.register(v1Handlers);

const v2Handlers = {
  ...v1Handlers,
  deletePet, // add new operation
  createPet: createPetV2, // override old handler
};
apiV2.register(v2Handlers);
```

For a real world API versioning implementation with `openapi-backend`, see
[ether/etherpad](https://github.com/ether/etherpad-lite/blob/39425e4e5bc4579d4b478d3b8b5e92fde55bde86/src/node/hooks/express/openapi.js)
