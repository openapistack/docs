---
sidebar_position: 10
title: .openapiconfig
hide_title: true
---

# .openapiconfig

:::tip

You can then use `load` and `auth` commands to create a `.openapiconfig` file to avoid having to pass the openapi document when running openapicmd commands.

:::

openapicmd tries to load a `.openapiconfig` file in the current working directory or parent directories for default parameters.

## Loading a definition file

To avoid having to pass the openapi file as an argument to openapicmd commands, you can _load_ a document, which creates or updates a `.openapiconfig` file.

```
openapi load https://petstore3.swagger.io/api/v3/openapi.json
```

Now you can run commands without passing the definition:

```
$ openapi info
Loaded: https://petstore3.swagger.io/api/v3/openapi.json

title: Swagger Petstore - OpenAPI 3.0
version: 1.0.17
description:
This is a sample Pet Store Server based on the OpenAPI 3.0 specification.
```

## Authentication

You can also set up authentication strategies for [API calls](/docs/openapicmd/call#authorization) using the `auth` command.

```
openapi auth https://petstore3.swagger.io/api/v3/openapi.json
? use security scheme api_key
? api_key: Set API key (api_key) secret123
Wrote auth config to /Users/viljamikuosmanen/Projects/openapi-stack/.openapiconfig. You can now use openapi call with the following auth configs:
- api_key
```

## Unloading

The `unload` command can be used to quickly delete an existing `.openapiconfig` file.

```
openapi unload
```
