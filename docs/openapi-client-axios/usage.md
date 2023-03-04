---
sidebar_position: 2
---

# Usage

OpenAPI Client Axios uses [operationIds](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operation-object)
in OpenAPIv3 definitions to call API operations.

After initializing `OpenAPIClientAxios`, an axios client instance extended with OpenAPI capabilities is exposed.

Example:

```javascript
const api = new OpenAPIClientAxios({
  definition: "https://example.com/api/openapi.json",
});
api.init().then((client) => {
  client.updatePet(1, { age: 12 });
});
```

`client` is an [axios instance](https://github.com/axios/axios#creating-an-instance) initialized with
baseURL from OpenAPI definitions and extended with extra operation methods for calling API operations.

It also has a reference to OpenAPIClientAxios at `client.api`

## Operation methods

OpenAPIClientAxios operation methods take 3 arguments:

```javascript
client.operationId(parameters?, data?, config?)
```

### Parameters

The first argument is used to pass parameters available for the operation.

```javascript
// GET /pets/{petId}
client.getPet({ petId: 1 });
```

For syntactic sugar purposes, you can also specify a single implicit parameter value, in which case OpenAPIClientAxios
will look for the first required parameter for the operation. Usually this is will be a path parameter.

```javascript
// GET /pets/{petId} - getPet
client.getPet(1);
```

Alternatively, you can explicitly specify parameters in array form. This method allows you to set custom parameters not defined
in the OpenAPI spec.

```javascript
// GET /pets?search=Garfield - searchPets
client.searchPets([{ name: "search", value: "Garfield", in: "query" }]);
```

The type of the parameters can be any of:

- query
- header
- path
- cookie

### Data

The second argument is used to pass the requestPayload

```javascript
// PUT /pets/1 - updatePet
client.updatePet(1, { name: "Odie" });
```

More complex payloads, such as Node.js streams or FormData supported by Axios can be used.

The first argument can be set to null if there are no parameters required for the operation.

```javascript
// POST /pets - createPet
client.updatePet(null, { name: "Garfield" });
```

### Config object

The last argument is the config object.

The config object is an [`AxiosRequestConfig`](https://github.com/axios/axios#request-config) object. You can use it to
override axios request config parameters, such as `headers`, `timeout`, `withCredentials` and many more.

```javascript
// POST /user - createUser
client.createUser(
  null,
  { user: "admin", pass: "123" },
  { headers: { "x-api-key": "secret" } }
);
```

## Paths Dictionary

OpenAPI Client Axios also allows calling API operations via their path and HTTP
method, using the paths dictionary.

Example:

```javascript
client.paths["/pets"].get(); // GET /pets, same as calling client.getPets()
client.paths["/pets"].post(); // POST /pets
client.paths["/pets/{petId}"].put(1); // PUT /pets/1
client.paths["/pets/{petId}/owner/{ownerId}"].get({ petId: 1, ownerId: 2 }); // GET /pets/1/owner/2
```

This allows calling operation methods without using their operationIds, which
may be sometimes preferred.
