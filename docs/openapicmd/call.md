---
sidebar_position: 3
---

# Call API operations

:::info

The call command can be used to call APIs from the command line for testing or automation purposes e.g. in CI pipelines or shell scripts.

:::

Use the `call` command to call operations in your API from the command line:

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json
```

or with npx:

```
npx openapicmd call https://petstore3.swagger.io/api/v3/openapi.json
```

## Interactive Mode

:::tip

In non-TTY environments openapicmd will not run in interactive mode. See how to pass [parameters](#parameters) instead.

:::

By default, openapicmd will act in interactive mode to guide with calling the API:

```
? select operation
❯ GET /pet/{petId} - Find pet by ID (getPetById)
  POST /pet/{petId} - Updates a pet in the store with form data (updatePetWithForm)
  DELETE /pet/{petId} - Deletes a pet (deletePet)
  POST /pet/{petId}/uploadImage - uploads an image (uploadFile)
  GET /store/inventory - Returns pet inventories by status (getInventory)
  POST /store/order - Place an order for a pet (placeOrder)
  GET /store/order/{orderId} - Find purchase order by ID (getOrderById)
(Move up and down to reveal more choices)
```

```
? select operation GET /pet/{petId} - Find pet by ID (getPetById)
petId: 1
```

```
? use security scheme
◯ api_key
◯ petstore_auth

```

Result:

```json
GET /pet/1
{
  "id": 1,
  "name": "Dogs",
  "photoUrls": [
    "nulla mollit veniam ea"
  ],
  "tags": [
    {
      "id": -21297897,
      "name": "incididunt sed eiusmod"
    }
  ],
  "status": "pending"
}
```

## Parameters

You can pass parameters directly as command line flags to skip interactive mode:

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json -o updatePet -d '{"id": 1, "name":"Cats"}' -p petId=1 --security=none
```

- operationId can be speficified with the `-o` or `--operation`
- Path, query and header parameters can be passed with the `-p` or `--param` flag.
- Request bodies can be passed with the `-d` or `--data` flag.
- Raw headers can be passed with the `-H` or `--header` flag.

To gain more information about the request and response, you can use the `-i` or `--include` flag.

## Authorization

The call command supports most security schemes defined in OpenAPI v3.

### Setting Headers

You can directly set headers such as api keys or `authorization` using the `-H` or `--header` flag.

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json -o getInventory -H 'authorization: Bearer token123'
```

### Basic Auth

For basic auth, you can directly pass `--username` and `--passsword`

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json -o getInventory --username admin --password secret123
```

### Bearer Token

If your API defines a Bearer Token security scheme e.g. OAuth2, you can pass a token using the `--token` flag.

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json -o getInventory --token=eyJhbGciOiJIUzI1....
```

### API Key

If your API defines an API Key security scheme, you can directly pass the key / token using the `--api-key` flag.

```
openapi call https://petstore3.swagger.io/api/v3/openapi.json -o getInventory --api-key=secret123
```
