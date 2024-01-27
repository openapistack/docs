---
title: "Quick Start: CLI"
hide_title: true
sidebar_position: 0
---

<div align="center">
<img alt="openapicmd logo" src="/img/openapi-stack-logo.png" className="max-w-[150px]" />
<h1 className="mb-6">
  openapicmd
  <a href="https://github.com/openapistack/openapicmd" target="_blank"><img className="w-[1em] ml-2 relative top-1" src="https://img.icons8.com/material-sharp/96/000000/github.png" alt="GitHub" /></a>
</h1>
<p>openapicmd - The CLI for all things OpenAPI and Swagger</p>

[![CI](https://github.com/openapistack/openapicmd/workflows/CI/badge.svg)](https://github.com/openapistack/openapicmd/actions?query=workflow%3ACI)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/openapistack/openapicmd/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/openapicmd.svg)](https://www.npmjs.com/package/openapicmd)
[![npm downloads](https://img.shields.io/npm/dw/openapicmd.svg)](https://www.npmjs.com/package/openapicmd)
![npm type definitions](https://img.shields.io/npm/types/openapicmd.svg)
[![GitHub stars](https://img.shields.io/github/stars/openapistack/openapicmd)](https://github.com/openapistack/openapicmd)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

</div>

## Features

- [x] Read and convert local and remote JSON/YAML OpenAPI definition files
- [x] Generate TypeScript types from OpenAPI definitions
- [x] Use as a CLI client to easily call API endpoints
- [x] Run Local Mock APIs
- [x] Automate API tests and validate specs
- [x] Run [Swagger UI](https://github.com/swagger-api/swagger-ui) or [ReDoc](https://github.com/Redocly/redoc) locally
- [x] Bundle static [Swagger UI](https://github.com/swagger-api/swagger-ui) or [ReDoc](https://github.com/Redocly/redoc) sites
- [x] Run [Swagger Editor](https://github.com/swagger-api/swagger-editor) locally
- [x] Convert Swagger to OpenAPI 

## Quick Start

```
npm install -g openapicmd
openapi help
```

Or with npx:

```
npx openapicmd
```

# Commands
<!-- commands -->
* [`openapi auth [DEFINITION]`](#openapi-auth-definition)
* [`openapi call [DEFINITION]`](#openapi-call-definition)
* [`openapi help [COMMANDS]`](#openapi-help-commands)
* [`openapi info [DEFINITION]`](#openapi-info-definition)
* [`openapi init`](#openapi-init)
* [`openapi load DEFINITION`](#openapi-load-definition)
* [`openapi mock [DEFINITION]`](#openapi-mock-definition)
* [`openapi read [DEFINITION]`](#openapi-read-definition)
* [`openapi redoc [DEFINITION]`](#openapi-redoc-definition)
* [`openapi swagger-editor [DEFINITION]`](#openapi-swagger-editor-definition)
* [`openapi swagger-ui [DEFINITION]`](#openapi-swagger-ui-definition)
* [`openapi swagger2openapi [DEFINITION]`](#openapi-swagger2openapi-definition)
* [`openapi test`](#openapi-test)
* [`openapi test add [DEFINITION]`](#openapi-test-add-definition)
* [`openapi typegen [DEFINITION]`](#openapi-typegen-definition)
* [`openapi unload`](#openapi-unload)

## `openapi auth [DEFINITION]`

Authenticate with apis (writes to .openapiconfig)

```
USAGE
  $ openapi auth [DEFINITION] [-h] [-V] [-D] [-B] [-R <value>] [-H <value>] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [-s <value>] [-k <value>] [-t <value>] [-u <value>] [-P <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -P, --password=<value>                                        set basic auth password
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -h, --help                                                    Show CLI help.
  -k, --apikey=<value>                                          set api key
  -s, --security=<value>...                                     use security scheme
  -t, --token=<value>                                           set bearer token
  -u, --username=<value>                                        set basic auth username

DESCRIPTION
  Authenticate with apis (writes to .openapiconfig)

EXAMPLES
  $ openapi auth

  $ openapi auth --token eyJh...

  $ openapi auth --security ApiKeyAuth --apikey secret123

  $ openapi auth --security BasicAuth --username admin --password password
```


## `openapi call [DEFINITION]`

Call API endpoints

```
USAGE
  $ openapi call [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [--interactive] [-o <value>] [-p <value>] [-d <value>] [-i] [-v] [-s <value>] [-k <value>] [-t
    <value>] [-u <value>] [-P <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -P, --password=<value>                                        set basic auth password
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -d, --data=<value>                                            request body
  -h, --help                                                    Show CLI help.
  -i, --include                                                 include status code and response headers the output
  -k, --apikey=<value>                                          set api key
  -o, --operation=operationId                                   operationId
  -p, --param=key=value...                                      parameter
  -s, --security=<value>...                                     use security scheme
  -t, --token=<value>                                           set bearer token
  -u, --username=<value>                                        set basic auth username
  -v, --verbose                                                 verbose mode
  --[no-]interactive                                            [default: true] enable CLI interactive mode

DESCRIPTION
  Call API endpoints

EXAMPLES
  $ openapi call -o getPets

  $ openapi call -o getPet -p id=1

  $ openapi call -o createPet -d '{ "name": "Garfield" }'
```


## `openapi help [COMMANDS]`

Display help for openapi.

```
USAGE
  $ openapi help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for openapi.
```


## `openapi info [DEFINITION]`

Display API information

```
USAGE
  $ openapi info [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [--security] [--operations] [--schemas]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -h, --help                                                    Show CLI help.
  --operations                                                  list operations in document
  --schemas                                                     list schemas in document
  --security                                                    list security schemes in document

DESCRIPTION
  Display API information

EXAMPLES
  $ openapi info https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml

  $ openapi info ./openapi.yml
```


## `openapi init`

Initialise a definition file from scratch

```
USAGE
  $ openapi init [-h] [-T <value>] [-d <value>] [-v <value>] [--terms <value>] [--license mit|apache2] [-S
    <value>] [-I <value>] [-f json|yaml|yml | --json | --yaml]

FLAGS
  -I, --inject={"info":{"version":"1.0.0"}}...  inject JSON to definition with deep merge
  -S, --server=http://localhost:9000...         override servers definition
  -T, --title=<value>                           [default: My API] The title for the API
  -d, --description=<value>                     Description for the API
  -f, --format=<option>                         [default: yaml] output format
                                                <options: json|yaml|yml>
  -h, --help                                    Show CLI help.
  -v, --version=<value>                         [default: 0.0.1] Version of the API
  --json                                        format as json (short for -f json)
  --license=<option>                            The license for the API
                                                <options: mit|apache2>
  --terms=<value>                               A URL to the Terms of Service for the API.
  --yaml                                        format as yaml (short for -f yaml)

DESCRIPTION
  Initialise a definition file from scratch

EXAMPLES
  $ openapi init --title 'My API' > openapi.yml
```


## `openapi load DEFINITION`

Set the default definition file for a workspace (writes to .openapiconfig)

```
USAGE
  $ openapi load DEFINITION [-h] [-V] [-S <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -S, --server=http://localhost:9000...  override servers definition
  -V, --validate                         validate against openapi schema
  -h, --help                             Show CLI help.

DESCRIPTION
  Set the default definition file for a workspace (writes to .openapiconfig)

EXAMPLES
  $ openapi load ./openapi.yml

  $ openapi load https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
```


## `openapi mock [DEFINITION]`

Start a local mock API server

```
USAGE
  $ openapi mock [DEFINITION] [-h] [-p <value>] [--logger] [-S <value>] [-I <value>] [-C <value>] [-E
    <value>] [-H <value>] [-R <value>] [-U <value>] [--validate]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -U, --swagger-ui=docs                                         Swagger UI endpoint
  -h, --help                                                    Show CLI help.
  -p, --port=9000                                               [default: 9000] port
  --[no-]logger                                                 [default: true] log requests
  --[no-]validate                                               [default: true] validate requests according to schema

DESCRIPTION
  Start a local mock API server

EXAMPLES
  $ openapi mock ./openapi.yml

  $ openapi mock https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml
```


## `openapi read [DEFINITION]`

Read and manipulate definition files

```
USAGE
  $ openapi read [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [-f json|yaml|yml | --json | --yaml]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -f, --format=<option>                                         [default: yaml] output format
                                                                <options: json|yaml|yml>
  -h, --help                                                    Show CLI help.
  --json                                                        format as json (short for -f json)
  --yaml                                                        format as yaml (short for -f yaml)

DESCRIPTION
  Read and manipulate definition files

EXAMPLES
  $ openapi read https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml

  $ openapi read ./openapi.yml -f json > openapi.json
```


## `openapi redoc [DEFINITION]`

Start or bundle a ReDoc instance

```
USAGE
  $ openapi redoc [DEFINITION] [-h] [-p <value>] [--logger] [-S <value>] [-I <value>] [-E <value>] [-C
    <value>] [-H <value>] [-R <value>] [-B <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle=outDir                                           bundle a static site to directory
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -h, --help                                                    Show CLI help.
  -p, --port=9000                                               [default: 9000] port
  --[no-]logger                                                 [default: true] log requests

DESCRIPTION
  Start or bundle a ReDoc instance

EXAMPLES
  $ openapi redoc

  $ openapi redoc ./openapi.yml

  $ openapi redoc ./openapi.yml --bundle outDir
```


## `openapi swagger-editor [DEFINITION]`

Start a Swagger Editor instance

```
USAGE
  $ openapi swagger-editor [DEFINITION] [-h] [-p <value>] [--logger] [-H <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -H, --header=<value>...  add request headers when calling remote urls
  -h, --help               Show CLI help.
  -p, --port=9000          [default: 9000] port
  --[no-]logger            [default: true] log requests

DESCRIPTION
  Start a Swagger Editor instance

EXAMPLES
  $ openapi swagger-editor

  $ openapi swagger-editor ./openapi.yml
```


## `openapi swagger-ui [DEFINITION]`

Start or bundle a Swagger UI instance

```
USAGE
  $ openapi swagger-ui [DEFINITION] [-h] [-p <value>] [--logger] [-S <value>] [-I <value>] [-C <value>] [-E
    <value>] [--expand full|list|none] [--operationids] [--filter] [--deeplinks] [--withcredentials] [--requestduration]
    [-H <value>] [-R <value>] [--proxy | -B <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle=outDir                                           bundle a static site to directory
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -h, --help                                                    Show CLI help.
  -p, --port=9000                                               [default: 9000] port
  --[no-]deeplinks                                              [default: true] allow deep linking
  --expand=<option>                                             [default: list] default expansion setting for the
                                                                operations and tags
                                                                <options: full|list|none>
  --[no-]filter                                                 [default: true] enable filtering by tag
  --[no-]logger                                                 [default: true] log requests
  --[no-]operationids                                           [default: true] display operationIds
  --proxy                                                       set up a proxy for the api to avoid CORS issues
  --[no-]requestduration                                        [default: true] display request durations in "try it
                                                                now"
  --[no-]withcredentials                                        [default: true] send cookies in "try it now"

DESCRIPTION
  Start or bundle a Swagger UI instance

EXAMPLES
  $ openapi swagger-ui

  $ openapi swagger-ui ./openapi.yml

  $ openapi swagger-ui ./openapi.yml --bundle outDir
```


## `openapi swagger2openapi [DEFINITION]`

Convert Swagger 2.0 definitions to OpenAPI 3.0.x

```
USAGE
  $ openapi swagger2openapi [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [-f json|yaml|yml | --json | --yaml]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -f, --format=<option>                                         [default: yaml] output format
                                                                <options: json|yaml|yml>
  -h, --help                                                    Show CLI help.
  --json                                                        format as json (short for -f json)
  --yaml                                                        format as yaml (short for -f yaml)

DESCRIPTION
  Convert Swagger 2.0 definitions to OpenAPI 3.0.x

EXAMPLES
  $ openapi swagger2openapi --yaml ./swagger.json > openapi.yml
```


## `openapi test`

Run automated tests against APIs

```
USAGE
  $ openapi test [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E <value>] [-C
    <value>] [--interactive] [-o <value>] [-v] [-s <value>] [-k <value>] [-t <value>] [-u <value>] [-P <value>]

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -P, --password=<value>                                        set basic auth password
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -h, --help                                                    Show CLI help.
  -k, --apikey=<value>                                          set api key
  -o, --operation=operationId...                                filter by operationId
  -s, --security=<value>...                                     use security scheme
  -t, --token=<value>                                           set bearer token
  -u, --username=<value>                                        set basic auth username
  -v, --verbose                                                 verbose mode
  --[no-]interactive                                            [default: true] enable CLI interactive mode

DESCRIPTION
  Run automated tests against APIs

EXAMPLES
  $ openapi test

  $ openapi test -o getPets
```


## `openapi test add [DEFINITION]`

Add automated tests for API operations

```
USAGE
  $ openapi test add [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>] [--auto] [-o <value>] [-n <value>] [-c all|default|Success2XX|ValidResponseBody] [-p <value>]
    [-d <value>] [-v] [--interactive] [-s <value>] [-k <value>] [-t <value>] [-u <value>] [-P <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -P, --password=<value>                                        set basic auth password
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -c, --checks=2XXStatus...                                     checks to include in test
  -d, --data=<value>                                            request body
  -h, --help                                                    Show CLI help.
  -k, --apikey=<value>                                          set api key
  -n, --name=my test                                            test name
  -o, --operation=operationId                                   operationId
  -p, --param=key=value...                                      parameter
  -s, --security=<value>...                                     use security scheme
  -t, --token=<value>                                           set bearer token
  -u, --username=<value>                                        set basic auth username
  -v, --verbose                                                 verbose mode
  --auto                                                        auto generate tests for all operations
  --[no-]interactive                                            [default: true] enable CLI interactive mode

DESCRIPTION
  Add automated tests for API operations

EXAMPLES
  $ openapi test add

  $ openapi test add -o getPet --checks all
```


## `openapi typegen [DEFINITION]`

Generate types from openapi definition

```
USAGE
  $ openapi typegen [DEFINITION] [-h] [-D] [-B] [-R <value>] [-H <value>] [-V] [-S <value>] [-I <value>] [-E
    <value>] [-C <value>]

ARGUMENTS
  DEFINITION  input definition file

FLAGS
  -B, --bundle                                                  resolve remote $ref pointers
  -C, --strip=default|all|openapi_client_axios|openapi_backend  Strip optional metadata such as examples and
                                                                descriptions from definition
  -D, --dereference                                             resolve $ref pointers
  -E, --exclude-ext=x-internal                                  Specify an openapi extension to exclude parts of the
                                                                spec
  -H, --header=<value>...                                       add request headers when calling remote urls
  -I, --inject={"info":{"version":"1.0.0"}}...                  inject JSON to definition with deep merge
  -R, --root=/                                                  override API root path
  -S, --server=http://localhost:9000...                         override servers definition
  -V, --validate                                                validate against openapi schema
  -h, --help                                                    Show CLI help.

DESCRIPTION
  Generate types from openapi definition

EXAMPLES
  $ openapi typegen ./openapi.yml > openapi.d.ts
```


## `openapi unload`

Unset the default definition file for a workspace (writes to .openapiconfig)

```
USAGE
  $ openapi unload [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Unset the default definition file for a workspace (writes to .openapiconfig)

EXAMPLES
  $ openapi unload
```

<!-- commandsstop -->
