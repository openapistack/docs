---
sidebar_position: 3
title: Typegen
---

# Generating Types

:::tip

It's recommended to use [`openapicmd typegen`](/docs/openapicmd/typegen/) to generate types instead of directly installing the typegen package.

:::

`openapi-client-axios-typegen` is a command line tool to generate easy to use Typescript types from
OpenAPI files.

![TypeScript IntelliSense](/img/intellisense.gif)

## Usage

```
npm install -g openapi-client-axios-typegen
```

or with npx:

```
npx openapi-client-axios-typegen
```

```
Usage: typegen [file]

Options:
      --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -t, --transformOperationName                                          [string]

Examples:
  typegen ./openapi.yml > openapi.d.ts
  typegen https://openapistack.co/petstore.openapi.json > openapi.d.ts
```

`typegen` supports both local and remote files:

```
typegen ./openapi.yaml > openapi.d.ts # local file
typegen https://petstore3.swagger.io/api/v3/openapi.json > openapi.d.ts # remote url
```

## Typesafe Clients

The output of `typegen` exports a type called `Client`, which can be directly used with clients created with `OpenAPIClientAxios`.

Both the `api.getClient()` and `api.init()` methods support passing in a Client type.

```typescript
import { Client as PetStoreClient } from "./openapi.d.ts";

const client = await api.init<PetStoreClient>();
const client = await api.getClient<PetStoreClient>();
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

## Advanced: `--transformOperationName`

You can provide a predicate function to typegen to transform operation names in the output type file.

The function needs to be exported from a module:

```ts
// operation-transform.ts
export const prefix = (operationId: string) => ["$", operationId].join("");
```

Example usage:

```
typegen ./openapi.yaml --transformOperationName operation-transform.prefix > openapi.d.ts
```

## Example type file

Here's a full example of a generated type file:

```ts
// openapi.d.ts

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

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

export interface OperationMethods {
  /**
   * getPets - List pets
   *
   * Returns all pets in database
   */
  "getPets"(
    parameters?: Parameters<Paths.GetPets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetPets.Responses.$200>;
  /**
   * createPet - Create a pet
   *
   * Crete a new pet into the database
   */
  "createPet"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePet.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreatePet.Responses.$201>;
  /**
   * getPetById - Get a pet
   *
   * Returns a pet by its id in database
   */
  "getPetById"(
    parameters?: Parameters<Paths.GetPetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetPetById.Responses.$200>;
  /**
   * replacePetById - Replace pet
   *
   * Replace an existing pet in the database
   */
  "replacePetById"(
    parameters?: Parameters<Paths.ReplacePetById.PathParameters> | null,
    data?: Paths.ReplacePetById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ReplacePetById.Responses.$200>;
  /**
   * updatePetById - Update pet
   *
   * Update an existing pet in the database
   */
  "updatePetById"(
    parameters?: Parameters<Paths.UpdatePetById.PathParameters> | null,
    data?: Paths.UpdatePetById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdatePetById.Responses.$200>;
  /**
   * deletePetById - Delete a pet
   *
   * Deletes a pet by its id in database
   */
  "deletePetById"(
    parameters?: Parameters<Paths.DeletePetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeletePetById.Responses.$200>;
  /**
   * getOwnerByPetId - Get a pet's owner
   *
   * Get the owner for a pet
   */
  "getOwnerByPetId"(
    parameters?: Parameters<Paths.GetOwnerByPetId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetOwnerByPetId.Responses.$200>;
  /**
   * getPetOwner - Get owner by id
   *
   * Get the owner for a pet
   */
  "getPetOwner"(
    parameters?: Parameters<Paths.GetPetOwner.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetPetOwner.Responses.$200>;
  /**
   * getPetsMeta - Get pet metadata
   *
   * Returns a list of metadata about pets and their relations in the database
   */
  "getPetsMeta"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetPetsMeta.Responses.$200>;
  /**
   * getPetsRelative - Get pet metadata
   *
   * Returns a list of metadata about pets and their relations in the database
   */
  "getPetsRelative"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetPetsRelative.Responses.$200>;
}

export interface PathsDictionary {
  ["/pets"]: {
    /**
     * getPets - List pets
     *
     * Returns all pets in database
     */
    "get"(
      parameters?: Parameters<Paths.GetPets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetPets.Responses.$200>;
    /**
     * createPet - Create a pet
     *
     * Crete a new pet into the database
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePet.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreatePet.Responses.$201>;
  };
  ["/pets/{id}"]: {
    /**
     * getPetById - Get a pet
     *
     * Returns a pet by its id in database
     */
    "get"(
      parameters?: Parameters<Paths.GetPetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetPetById.Responses.$200>;
    /**
     * replacePetById - Replace pet
     *
     * Replace an existing pet in the database
     */
    "put"(
      parameters?: Parameters<Paths.ReplacePetById.PathParameters> | null,
      data?: Paths.ReplacePetById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ReplacePetById.Responses.$200>;
    /**
     * updatePetById - Update pet
     *
     * Update an existing pet in the database
     */
    "patch"(
      parameters?: Parameters<Paths.UpdatePetById.PathParameters> | null,
      data?: Paths.UpdatePetById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdatePetById.Responses.$200>;
    /**
     * deletePetById - Delete a pet
     *
     * Deletes a pet by its id in database
     */
    "delete"(
      parameters?: Parameters<Paths.DeletePetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeletePetById.Responses.$200>;
  };
  ["/pets/{id}/owner"]: {
    /**
     * getOwnerByPetId - Get a pet's owner
     *
     * Get the owner for a pet
     */
    "get"(
      parameters?: Parameters<Paths.GetOwnerByPetId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetOwnerByPetId.Responses.$200>;
  };
  ["/pets/{petId}/owner/{ownerId}"]: {
    /**
     * getPetOwner - Get owner by id
     *
     * Get the owner for a pet
     */
    "get"(
      parameters?: Parameters<Paths.GetPetOwner.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetPetOwner.Responses.$200>;
  };
  ["/pets/meta"]: {
    /**
     * getPetsMeta - Get pet metadata
     *
     * Returns a list of metadata about pets and their relations in the database
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetPetsMeta.Responses.$200>;
  };
  ["/pets/relative"]: {
    /**
     * getPetsRelative - Get pet metadata
     *
     * Returns a list of metadata about pets and their relations in the database
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetPetsRelative.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;

export type PetId = Components.Schemas.PetId;
export type PetPayload = Components.Schemas.PetPayload;
export type QueryLimit = Components.Schemas.QueryLimit;
export type QueryOffset = Components.Schemas.QueryOffset;
```
