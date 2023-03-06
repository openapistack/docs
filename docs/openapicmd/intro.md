---
title: "Quick Start: CLI"
hide_title: true
sidebar_position: 1
---

<div align="center">
<img alt="openapicmd logo" src="/img/openapi-stack-logo.png" className="max-w-[150px]" />
<h1 className="mb-6">
  openapicmd
  <a href="https://github.com/anttiviljami/openapicmd" target="_blank"><img className="w-[1em] ml-2 relative top-1" src="https://img.icons8.com/material-sharp/96/000000/github.png" alt="GitHub" /></a>
</h1>
<p>openapicmd - The CLI for all things OpenAPI and Swagger</p>

[![CI](https://github.com/anttiviljami/openapicmd/workflows/CI/badge.svg)](https://github.com/anttiviljami/openapicmd/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/openapicmd.svg)](https://www.npmjs.com/package/openapicmd)
[![npm downloads](https://img.shields.io/npm/dw/openapicmd)](https://www.npmjs.com/package/openapicmd)
[![GitHub stars](https://img.shields.io/github/stars/anttiviljami/openapicmd)](https://github.com/anttiviljami/openapicmd)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/openapicmd/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

</div>

## Features

- [x] Read and convert local and remote JSON/YAML OpenAPI definition files
- [x] Use as CLI client to easily call API endpoints
- [x] Run [Swagger UI](https://github.com/swagger-api/swagger-ui) locally
- [x] Bundle static [Swagger UI](https://github.com/swagger-api/swagger-ui) sites
- [x] Run [Swagger Editor](https://github.com/swagger-api/swagger-editor) locally
- [x] Convert Swagger 2.0 to OpenAPI 3.0.x
- [x] Run Local Mock APIs

## Quick Start

```
npm install -g openapicmd
openapi help
```

Or with npx:

```
npx openapicmd
```

## Commands

<!-- commands -->

- [`openapi auth [DEFINITION]`](#openapi-auth-definition)
- [`openapi call [DEFINITION]`](#openapi-call-definition)
- [`openapi help [COMMAND]`](#openapi-help-command)
- [`openapi info [DEFINITION]`](#openapi-info-definition)
- [`openapi init`](#openapi-init)
- [`openapi load DEFINITION`](#openapi-load-definition)
- [`openapi mock [DEFINITION]`](#openapi-mock-definition)
- [`openapi read [DEFINITION]`](#openapi-read-definition)
- [`openapi swagger-editor [DEFINITION]`](#openapi-swagger-editor-definition)
- [`openapi swagger-ui [DEFINITION]`](#openapi-swagger-ui-definition)
- [`openapi swagger2openapi [DEFINITION]`](#openapi-swagger2openapi-definition)
- [`openapi unload`](#openapi-unload)

## `openapi auth [DEFINITION]`

Authenticate with apis (writes to .openapiconfig)

```
Authenticate with apis (writes to .openapiconfig)

USAGE
  $ openapi auth [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                               resolve remote $ref pointers
  -D, --dereference                          resolve $ref pointers
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -V, --validate                             validate against openapi schema
  -h, --help                                 show CLI help
  -k, --apikey=apikey                        set api key
  -p, --password=password                    set basic auth password
  -s, --security=security                    use security scheme
  -t, --token=token                          set bearer token
  -u, --username=username                    set basic auth username

EXAMPLES
  $ openapi auth
  $ openapi auth --token eyJh...
  $ openapi auth --security ApiKeyAuth --apikey secret123
  $ openapi auth --security BasicAuth --username admin --password password
```

_See code: [src/commands/auth.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/auth.ts)_

## `openapi call [DEFINITION]`

Call API endpoints

```
Call API endpoints

USAGE
  $ openapi call [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                               resolve remote $ref pointers
  -D, --dereference                          resolve $ref pointers
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -V, --validate                             validate against openapi schema
  -d, --data=data                            request body
  -h, --help                                 show CLI help
  -i, --include                              include status code and response headers the output
  -k, --apikey=apikey                        set api key
  -o, --operation=operationId                operationId
  -p, --param=key=value                      parameter
  -p, --password=password                    set basic auth password
  -s, --security=security                    use security scheme
  -t, --token=token                          set bearer token
  -u, --username=username                    set basic auth username
  -v, --verbose                              verbose mode

EXAMPLES
  $ openapi call -o getPets
  $ openapi call -o getPet -p id=1
  $ openapi call -o createPet -d '{ "name": "Garfield" }'
```

_See code: [src/commands/call.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/call.ts)_

## `openapi help [COMMAND]`

display help for openapi

```
display help for <%= config.bin %>

USAGE
  $ openapi help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.14/src/commands/help.ts)_

## `openapi info [DEFINITION]`

Display API information

```
Display API information

USAGE
  $ openapi info [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                               resolve remote $ref pointers
  -D, --dereference                          resolve $ref pointers
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -V, --validate                             validate against openapi schema
  -h, --help                                 show CLI help
  --operations                               list operations in document
  --schemas                                  list schemas in document
  --security                                 list security schemes in document

EXAMPLES
  $ openapi info https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
  $ openapi info ./openapi.yml
```

_See code: [src/commands/info.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/info.ts)_

## `openapi init`

Initialise a definition file from scratch

```
Initialise a definition file from scratch

USAGE
  $ openapi init

OPTIONS
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -S, --server=http://localhost:9000         override servers definition
  -T, --title=title                          [default: My API] The title for the API
  -d, --description=description              Description for the API
  -f, --format=(json|yaml|yml)               [default: yaml] output format
  -h, --help                                 show CLI help
  -v, --version=version                      [default: 0.0.1] Version of the API
  --json                                     format as json (short for -f json)
  --license=mit|apache2                      The license for the API
  --terms=terms                              A URL to the Terms of Service for the API.
  --yaml                                     format as yaml (short for -f yaml)

EXAMPLE
  $ openapi init --title 'My API' > openapi.yml
```

_See code: [src/commands/init.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/init.ts)_

## `openapi load DEFINITION`

Set the default definition file for a workspace (writes to .openapiconfig)

```
Set the default definition file for a workspace (writes to .openapiconfig)

USAGE
  $ openapi load DEFINITION

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -V, --validate  validate against openapi schema
  -h, --help      show CLI help

EXAMPLES
  $ openapi load ./openapi.yml
  $ openapi load https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
```

_See code: [src/commands/load.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/load.ts)_

## `openapi mock [DEFINITION]`

Start a local mock API server

```
Start a local mock API server

USAGE
  $ openapi mock [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -U, --swagger-ui=docs                      Swagger UI endpoint
  -h, --help                                 show CLI help
  -p, --port=9000                            [default: 9000] port
  --[no-]logger                              [default: true] log requests
  --[no-]validate                            [default: true] validate requests according to schema

EXAMPLES
  $ openapi mock ./openapi.yml
  $ openapi mock https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
```

_See code: [src/commands/mock.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/mock.ts)_

## `openapi read [DEFINITION]`

Read and manipulate definition files

```
Read and manipulate definition files

USAGE
  $ openapi read [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                               resolve remote $ref pointers
  -D, --dereference                          resolve $ref pointers
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -V, --validate                             validate against openapi schema
  -f, --format=(json|yaml|yml)               [default: yaml] output format
  -h, --help                                 show CLI help
  --json                                     format as json (short for -f json)
  --yaml                                     format as yaml (short for -f yaml)

EXAMPLES
  $ openapi read https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
  $ openapi read ./openapi.yml -f json > openapi.json
```

_See code: [src/commands/read.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/read.ts)_

## `openapi swagger-editor [DEFINITION]`

Start a Swagger Editor instance

```
Start a Swagger Editor instance

USAGE
  $ openapi swagger-editor [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -H, --header=header  add request headers when calling remote urls
  -h, --help           show CLI help
  -p, --port=9000      [default: 9000] port
  --[no-]logger        [default: true] log requests

EXAMPLES
  $ openapi swagger-editor
  $ openapi swagger-editor ./openapi.yml
```

_See code: [src/commands/swagger-editor.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/swagger-editor.ts)_

## `openapi swagger-ui [DEFINITION]`

Start or bundle a Swagger UI instance

```
Start or bundle a Swagger UI instance

USAGE
  $ openapi swagger-ui [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle=outDir                        bundle a static site to directory
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -h, --help                                 show CLI help
  -p, --port=9000                            [default: 9000] port
  --[no-]deeplinks                           [default: true] allow deep linking
  --expand=full|list|none                    [default: list] default expansion setting for the operations and tags
  --[no-]filter                              [default: true] enable filtering by tag
  --[no-]logger                              [default: true] log requests
  --[no-]operationids                        [default: true] display operationIds
  --proxy                                    set up a proxy for the api to avoid CORS issues
  --[no-]requestduration                     [default: true] display request durations in "try it now"
  --[no-]withcredentials                     [default: true] send cookies in "try it now"

EXAMPLES
  $ openapi swagger-ui
  $ openapi swagger-ui ./openapi.yml
  $ openapi swagger-ui ./openapi.yml --bundle outDir
```

_See code: [src/commands/swagger-ui.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/swagger-ui.ts)_

## `openapi swagger2openapi [DEFINITION]`

Convert Swagger 2.0 definitions to OpenAPI 3.0.x

```
Convert Swagger 2.0 definitions to OpenAPI 3.0.x

USAGE
  $ openapi swagger2openapi [DEFINITION]

ARGUMENTS
  DEFINITION  input definition file

OPTIONS
  -B, --bundle                               resolve remote $ref pointers
  -D, --dereference                          resolve $ref pointers
  -H, --header=header                        add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}  inject JSON to definition with deep merge
  -R, --root=/                               override API root path
  -S, --server=http://localhost:9000         override servers definition
  -V, --validate                             validate against openapi schema
  -f, --format=(json|yaml|yml)               [default: yaml] output format
  -h, --help                                 show CLI help
  --json                                     format as json (short for -f json)
  --yaml                                     format as yaml (short for -f yaml)

EXAMPLE
  $ openapi swagger2openapi --yaml ./swagger.json > openapi.yml
```

_See code: [src/commands/swagger2openapi.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/swagger2openapi.ts)_

## `openapi unload`

Unset the default definition file for a workspace (writes to .openapiconfig)

```
Unset the default definition file for a workspace (writes to .openapiconfig)

USAGE
  $ openapi unload

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ openapi unload
```

_See code: [src/commands/unload.ts](https://github.com/anttiviljami/openapicmd/blob/v1.14.0/src/commands/unload.ts)_

<!-- commandsstop -->
