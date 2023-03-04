---
sidebar_position: 3
---

# Call API operations

:::info

The call command can be used to call APIs from the command line for testing or automation purposes e.g. in CI pipelines or shell scripts.

:::

Use the `call` command to call operations in your API from the command line:

```
npx openapicmdcall https://petstore3.swagger.io/api/v3/openapi.json
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
npx openapicmdcall https://petstore3.swagger.io/api/v3/openapi.json -o updatePet -d '{"id": 1, "name":"Cats"}' -p petId=1 --security=none
```

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

## Authorization

The call command supports most security schemes defined in OpenAPI v3.

### Setting Headers

You can directly set headers such as api keys or `authorization` using the `-H` or `--header` flag.

```
npx openapicmdcall https://petstore3.swagger.io/api/v3/openapi.json -o getInventory -H 'authorization: Bearer token123'
```

### Basic Auth

For basic auth, you can directly pass `--username` and `--passsword`

```
npx openapicmdcall https://petstore3.swagger.io/api/v3/openapi.json -o getInventory --username admin --password secret123
```

### API Key or Bearer Token

If your API defines an API Key or Bearer Token security scheme, you can directly pass the key / token using the `--token` flag.

```
npx openapicmdcall https://petstore3.swagger.io/api/v3/openapi.json -o getInventory --token=secret123
```
