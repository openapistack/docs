---
title: Overview
hide_title: true
sidebar_position: 0
---

<div className="text-center mt-4 mb-8">

<img alt="openapicmd logo" src="/img/openapi-stack-logo.png" className="max-w-[150px] mb-4" />

<h1>
  openapi-stack
  <a href="https://github.com/openapistack/docs" target="_blank"><img className="w-[1em] ml-2 relative top-1" src="https://img.icons8.com/material-sharp/96/000000/github.png" alt="GitHub" /></a>
</h1>

[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/openapistack/docs/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dw/openapi-backend?label=backend)](https://www.npmjs.com/package/openapi-backend)
[![npm downloads](https://img.shields.io/npm/dw/openapi-client-axios?label=client)](https://www.npmjs.com/package/openapi-backend)
[![GitHub stars](https://img.shields.io/github/stars/openapistack/docs?label=github%20stars)](https://github.com/openapistack/docs)

</div>

**openapi-stack** is a collection of open source libraries and tools for full stack software development using [OpenAPI specification](https://www.openapis.org/).

The goal is to unlock great developer experience and full stack type safety for software teams using REST; inspired by tools like [GraphQL](https://graphql.org/) and [tRPC](https://trpc.io).


<details>
<summary><b>How does openapi-stack compare to <i>GraphQL</i>?</b></summary>

[*GraphQL*](https://graphql.org/) is a query language for APIs developed by Facebook. It gives API clients full control over the data they query, making it extremely flexible and efficient for client-centric use cases.

Similar to [OpenAPI specification](https://www.openapis.org/), GraphQL APIs define a strongly typed schema for the data and mutations they support which makes them discoverable and intuitive to develop against.

OpenAPI stack achieves the same type safety and great developer experience by using the OpenAPI specification as a single source of truth for the API contract, used to generate types for both client and server side and utilising it for routing and validation during runtime.

Both GraphQL and openapi-stack encourage an [API First](/docs/api-first/) approach where the API contract is treated as a first class citizen in software design instead of treating it as merely documentation.

While REST APIs don't generally provide the same level of control to clients as GraphQL, many times this could be seen as a benefit especially in scenarios where strict control over data access and operations is crucial.

Many organizations choose REST over GraphQL due to more established conventions, simplicity, and the ability to leverage standard HTTP features directly. Widespread knowledge around REST contribute to its choice among organizations looking for a tried-and-tested approach to building APIs.
</details>

<details>
<summary><b>How does openapi-stack compare to <i>tRPC</i>?</b></summary>

[tRPC](https://trpc.io/) is a *Remote Procedure Call* (RPC) library for Typescript to build and consume typesafe APIs.

Designed for full-stack Typescript applications, tRPC allows direct sharing of types between both the client and server, without relying on code generation.

Unlike GraphQL and REST, tRPC doesn't expose a standard machine-readable API schema to be consumed by clients, instead taking a more straightforward approach of exposing endpoints or *procedures*, essentially [*"just functions"*](https://trpc.io/docs/concepts#its-just-functions) invoked by the client to the server.

OpenAPI stack achieves type safety using a similar workflow to tRPC's procedures with [*OpenAPI operations*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operation-object), also avoiding code generation by only generating types from OpenAPI spec and using the machine readable contract in the runtime for routing and validation.

While the lightweight tRPC approach is optimal for teams just looking to build full stack applications, teams looking to build robust APIs are better served by the API design first approach of openapi-stack or GraphQL.

</details>

## Benefits

1. **Single source of truth for your API contract.** No more manually updating your OpenAPI specs to keep up with your backend code. Always keep your API documentation and SDKs up to date!
1. **Type safety and validation**. Build your product faster and with a better developer experience using strongly typed Typescript and runtime validation both in the server and client side.
1. **Testing & Collaboration**. Leverage API mocks to make testing and development easier and iterate fast on your API design as you build your app's interface. Being blocked by the backend team is a thing of the past!

## Backend

Build, Validate, Route, Authenticate, and Mock your backend using the [openapi-backend](https://github.com/openapistack/openapi-backend) library.

[Quickstart](/docs/openapi-backend/intro) - [NPM](https://www.npmjs.com/package/openapi-backend)

## Client

Easily consume your API using the typesafe [openapi-client-axios](https://github.com/openapistack/openapi-client-axios) library.

[Quickstart](/docs/openapi-client-axios/intro) - [NPM](https://www.npmjs.com/package/openapi-client-axios)

## CLI

Generate types, design and test your API using the [openapicmd](https://github.com/openapistack/openapicmd) command line tool.

[Quickstart](/docs/openapicmd/intro) - [NPM](https://www.npmjs.com/package/openapicmd)

## Features

- [x] 🚀 Battle-tested in production. High test coverage.
- [x] 🤝 Built with TypeScript, types included with full autocomplete support
- [x] 🥃 Framework agnostic – works with your stack
- [x] 🏎 Lightweight - small frontend bundle + optimized for serverless cold starts
- [x] 🧙‍♂️ No code generation – we only generate types
- [x] ❤️ OpenAPI 3.x support
- [x] 👀 [Samples](/docs/examples/boilerplate/) included
