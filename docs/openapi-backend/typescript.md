---
sidebar_position: 9
---

# Typescript

OpenAPI Backend is entirely built with typescript and supports using types in operation handlers.

The [typegen CLI](/docs/openapi-client-axios/typegen/) from `openapi-client-axios` is designed to also be used to generate types to for use on the backend side.

:::tip

You can set up a script in package.json to easily update types when the openapi spec is changed.

```json
{
  "scripts": {
    "openapi": "npx openapi-client-axios-typegen ./openapi.yaml > src/types/openapi.d.ts"
  }
}
```

:::

`openapi-client-axios-typegen` supports both local and remote files:

```
npx openapi-client-axios-typegen ./openapi.yaml > src/types/openapi.d.ts # local file
npx openapi-client-axios-typegen https://petstore3.swagger.io/api/v3/openapi.json > src/types/openapi.d.ts # remote url
```

## Using types in operation handlers

You can import schemas and response/request models defined in your openapi definition as Typescript types:

```ts
// types.ts
import { Components } from "./openapi.d.ts";

export type Pet = Components.Schemas.Pet;
export type User = Components.Schemas.User;

export type UpdatePetParams = Paths.AddPet.PathParameters;
export type UpdatePetRequest = Paths.AddPet.RequestBody;
export type UpdatePetResponse = Paths.AddPet.Responses.$200;
```

These types can then be used part of your controllers and logic:

```ts
import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
import type {
  UpdatePetParams,
  UpdatePetRequest,
  UpdatePetResponse,
} from "./types";

async function updatePetHandler(
  c: Context<UpdatePetRequest, UpdatePetParams>,
  _req: Request,
  res: Response
) {
  const { petId } = c.request.params;
  const requestBody = c.request.requestBody;

  const updatedPet = await db.updatePet(petId, requestBody);

  const response: UpdatePetResponse = {
    ...updatedPet,
  };

  return res.status(200).json(response);
}

api.register("updatePet", getPetByIdHandler);
```

## Generic Types

The `Context` and `Handler` types from openapi-backend are generic and can be passed types:

```ts
/**
 * Passed context built for request. Passed as first argument for all handlers.
 */
export interface Context<
  RequestBody = any,
  Params = UnknownParams,
  Query = UnknownParams,
  Headers = UnknownParams,
  Cookies = UnknownParams
> {
  api: OpenAPIBackend;
  request: ParsedRequest<RequestBody, Params, Query, Headers, Cookies>;
  operation: Operation;
  validation: ValidationResult;
  security: SecurityHandlerResults;
  response: any;
}

/**
 * A handler for an operation with request Context and passed arguments from handleRequest
 */
export type Handler<
  RequestBody = any,
  Params = UnknownParams,
  Query = UnknownParams,
  Headers = UnknownParams,
  Cookies = UnknownParams
> = (
  context: Context<RequestBody, Params, Query, Headers, Cookies>,
  ...args: any[]
) => any | Promise<any>;
```
