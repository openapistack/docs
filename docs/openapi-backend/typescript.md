---
sidebar_position: 9
title: TypeScript
---

# openapi-backend with TypeScript

OpenAPI Backend is entirely built with typescript and supports using types in operation handlers.

The [`openapi typegen`](/docs/openapicmd/typegen) command can be used to generate types to for use on the backend side using the `--backend` option.

:::tip

You can set up a script in package.json to easily update types when the openapi spec is changed.

```json
{
  "scripts": {
    "openapi": "openapi typegen --backend ./openapi.yaml > src/types/openapi.d.ts"
  }
}
```

:::

`openapi typegen` supports both local and remote files:

```
npx openapicmd typegen --backend ./openapi.yaml > src/types/openapi.d.ts # local file
npx openapicmd typegen --backend https://petstore3.swagger.io/api/v3/openapi.json > src/types/openapi.d.ts # remote url
```

## Importing generated types

You can directly import types defined as schemas in your openapi spec as Typescript types:

```ts
import type { Pet, User } from "./openapi.d.ts";

const myPet: Pet = {
  id: 1,
  name: "My Pet",
  tag: "My Tag",
};

const myUser: User = {
  id: 1,
  name: "My User",
};
```

## Typesafe Operation Handlers

For type safety in API handlers, annotate your operation handlers with the `OperationHandler` generic type:

```ts
import type { OperationHandler, OperationResponse } from "./openapi.d.ts";
import type { Request, Response } from "express";

const updatePetHandler: OperationHandler<"updatePet"> = async (
  c,
  _req: Request,
  res: Response
) => {
  const petId = c.request.params.petId; // string
  const requestBody = c.request.requestBody; // Pet

  const updatedPet = await db.updatePet(petId, requestBody);

  const response: OperationResponse<"updatePet"> = {
    ...updatedPet,
  };

  return res.status(200).json(response);
};
```

You can also create a typed response util function using the `HandlerResponse` generic type to make sure the response is typed correctly:

```ts
import type { HandlerResponse } from "./openapi.d.ts";
import type { Response } from "express";

export const replyJSON = <T>(
  json: T,
  res: Response,
  statusCode: number = 200
): HandlerResponse<T> => {
  return res.status(statusCode).json(json);
};
```

Usage:

```ts
import { replyJSON } from "./utils";

const getPetHandler: OperationHandler<"getPet"> = async (c) => {
  const petId = c.request.params.petId; // string

  const result = await db.getPetById(petId);

  return replyJSON(result, res);
};
```

## Example type file

Here's a full example of a generated type file:

```ts
// openapi.d.ts

import type { Context, UnknownParams } from "openapi-backend";

declare namespace Components {
  namespace RequestBodies {
    export type PetPayload = Schemas.PetPayload;
  }
  namespace Schemas {
    /**
     * PetId
     * Unique identifier for pet in database
     * example:
     * 1
     */
    export type PetId = number;
    export interface PetPayload {
      /**
       * PetName
       * Name of the pet
       * example:
       * Garfield
       */
      name: string;
    }
    /**
     * QueryLimit
     * Number of items to return
     * example:
     * 25
     */
    export type QueryLimit = number;
    /**
     * QueryOffset
     * Starting offset for returning items
     * example:
     * 0
     */
    export type QueryOffset = number;
  }
}
declare namespace Paths {
  namespace CreatePet {
    export type RequestBody = Components.RequestBodies.PetPayload;
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace DeletePetById {
    namespace Parameters {
      export type Id =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
  namespace GetOwnerByPetId {
    namespace Parameters {
      export type Id =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
  namespace GetPetById {
    namespace Parameters {
      export type Id =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
  namespace GetPetOwner {
    namespace Parameters {
      export type OwnerId =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
      export type PetId =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      petId: Parameters.PetId;
      ownerId: Parameters.OwnerId;
    }
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
  namespace GetPets {
    namespace Parameters {
      export type Limit =
        /**
         * QueryLimit
         * Number of items to return
         * example:
         * 25
         */
        Components.Schemas.QueryLimit;
      export type Offset =
        /**
         * QueryOffset
         * Starting offset for returning items
         * example:
         * 0
         */
        Components.Schemas.QueryOffset;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetPetsMeta {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetPetsRelative {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ReplacePetById {
    namespace Parameters {
      export type Id =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.RequestBodies.PetPayload;
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
  namespace UpdatePetById {
    namespace Parameters {
      export type Id =
        /**
         * PetId
         * Unique identifier for pet in database
         * example:
         * 1
         */
        Components.Schemas.PetId;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    export type RequestBody = Components.RequestBodies.PetPayload;
    namespace Responses {
      export interface $200 {}
      export interface $404 {}
    }
  }
}

export interface Operations {
  /**
   * GET /pets
   */
  ["getPets"]: {
    requestBody: any;
    params: UnknownParams;
    query: Paths.GetPets.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      UnknownParams,
      Paths.GetPets.QueryParameters,
      UnknownParams,
      UnknownParams
    >;
    response: Paths.GetPets.Responses.$200;
  };
  /**
   * POST /pets
   */
  ["createPet"]: {
    requestBody: Paths.CreatePet.RequestBody;
    params: UnknownParams;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      Paths.CreatePet.RequestBody,
      UnknownParams,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response: Paths.CreatePet.Responses.$201;
  };
  /**
   * GET /pets/{id}
   */
  ["getPetById"]: {
    requestBody: any;
    params: Paths.GetPetById.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      Paths.GetPetById.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response: Paths.GetPetById.Responses.$200 | Paths.GetPetById.Responses.$404;
  };
  /**
   * PUT /pets/{id}
   */
  ["replacePetById"]: {
    requestBody: Paths.ReplacePetById.RequestBody;
    params: Paths.ReplacePetById.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      Paths.ReplacePetById.RequestBody,
      Paths.ReplacePetById.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response:
      | Paths.ReplacePetById.Responses.$200
      | Paths.ReplacePetById.Responses.$404;
  };
  /**
   * PATCH /pets/{id}
   */
  ["updatePetById"]: {
    requestBody: Paths.UpdatePetById.RequestBody;
    params: Paths.UpdatePetById.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      Paths.UpdatePetById.RequestBody,
      Paths.UpdatePetById.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response:
      | Paths.UpdatePetById.Responses.$200
      | Paths.UpdatePetById.Responses.$404;
  };
  /**
   * DELETE /pets/{id}
   */
  ["deletePetById"]: {
    requestBody: any;
    params: Paths.DeletePetById.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      Paths.DeletePetById.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response:
      | Paths.DeletePetById.Responses.$200
      | Paths.DeletePetById.Responses.$404;
  };
  /**
   * GET /pets/{id}/owner
   */
  ["getOwnerByPetId"]: {
    requestBody: any;
    params: Paths.GetOwnerByPetId.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      Paths.GetOwnerByPetId.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response:
      | Paths.GetOwnerByPetId.Responses.$200
      | Paths.GetOwnerByPetId.Responses.$404;
  };
  /**
   * GET /pets/{petId}/owner/{ownerId}
   */
  ["getPetOwner"]: {
    requestBody: any;
    params: Paths.GetPetOwner.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      Paths.GetPetOwner.PathParameters,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response:
      | Paths.GetPetOwner.Responses.$200
      | Paths.GetPetOwner.Responses.$404;
  };
  /**
   * GET /pets/meta
   */
  ["getPetsMeta"]: {
    requestBody: any;
    params: UnknownParams;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      UnknownParams,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response: Paths.GetPetsMeta.Responses.$200;
  };
  /**
   * GET /pets/relative
   */
  ["getPetsRelative"]: {
    requestBody: any;
    params: UnknownParams;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<
      any,
      UnknownParams,
      UnknownParams,
      UnknownParams,
      UnknownParams
    >;
    response: Paths.GetPetsRelative.Responses.$200;
  };
}

export type OperationContext<operationId extends keyof Operations> =
  Operations[operationId]["context"];
export type OperationResponse<operationId extends keyof Operations> =
  Operations[operationId]["response"];
export type HandlerResponse<
  ResponseBody,
  ResponseModel = Record<string, any>
> = ResponseModel & { _t?: ResponseBody };
export type OperationHandlerResponse<operationId extends keyof Operations> =
  HandlerResponse<OperationResponse<operationId>>;
export type OperationHandler<
  operationId extends keyof Operations,
  HandlerArgs extends unknown[] = unknown[]
> = (
  ...params: [OperationContext<operationId>, ...HandlerArgs]
) => Promise<OperationHandlerResponse<operationId>>;

export type PetId = Components.Schemas.PetId;
export type PetPayload = Components.Schemas.PetPayload;
export type QueryLimit = Components.Schemas.QueryLimit;
export type QueryOffset = Components.Schemas.QueryOffset;
```
