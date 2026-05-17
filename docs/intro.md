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

*Battle-tested in production. [See who uses openapi-stack →](/users)*


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

<details>
<summary><b>How does openapi-stack compare to <i>openapi-typescript</i>?</b></summary>

[*openapi-typescript*](https://openapi-ts.dev/) is a popular tool that converts an OpenAPI spec into a TypeScript `.d.ts` file. It usually pairs with [*openapi-fetch*](https://openapi-ts.dev/openapi-fetch/), a thin `fetch` wrapper that consumes those generated types via a generic. Both are excellent — and they sit closer to openapi-stack than GraphQL or tRPC do, so the comparison is worth doing carefully.

**The three real differences:**

**1. SDK-style methods vs path-based requests.**

```ts
// openapi-fetch — generic path-based client
const { data, error } = await client.GET("/pets/{id}", {
  params: { path: { id: 1 } },
});

// openapi-client-axios — an axios instance, shaped like an SDK for your API
const { data } = await client.getPetById(1);
```

`openapi-client-axios` returns a fully-featured **axios instance** decorated with one typed method per `operationId` in your spec — so the client looks and feels like a hand-written SDK for *your* API. You get `client.getPetById(1)` *and* every axios primitive (`client.get('/pets/1')`, `client.interceptors.request.use(...)`, `client.defaults.headers.common.Authorization = ...`) on the same object, ready to pass around your codebase. The path-based axios API is always available as a fallback for operations you'd rather not call via `operationId` — so it's *both* SDK-style and path-based, not one or the other.

`openapi-fetch` is a generic, path-based client where the HTTP verb and URL template stay explicit at the call site. Method-based code is easier to grep, jump-to-definition, and rename through your editor; path-based code mirrors the HTTP shape more literally and surfaces a TypeScript error if the path string drifts from the spec. Both are typesafe; pick the surface you prefer.

**2. Axios vs fetch — and the ecosystems around them.**

`openapi-client-axios` is built on [axios](https://axios-http.com/), so every interceptor, adapter, and plugin in the axios ecosystem works out of the box: auth header injection, token refresh, retry, request cancellation, upload progress, response transformers. Adding `axios-retry` or `axios-cache-interceptor` is one line.

`openapi-fetch` is built on the platform `fetch`, with its own middleware API. It's clean, but you bring more of the building blocks yourself — axios's specific plugin model has accumulated a larger set of off-the-shelf middlewares than fetch wrappers typically have.

Both libraries themselves are small. Pick based on which HTTP foundation suits your project, not bundle size.

**3. Runtime spec loading.**

```ts
// openapi-client-axios — spec resolved at runtime
const api = new OpenAPIClientAxios({
  definition: 'https://api.example.com/openapi.json',
});
const client = await api.init();
```

`openapi-client-axios` can take a URL, a JSON object, or a YAML string and build the client dynamically. That's load-bearing for plugin systems, admin tools that talk to many APIs, multi-tenant backends where each tenant exposes a slightly different surface, or LLM-driven agents that discover capabilities from a spec at run time.

`openapi-typescript` runs ahead-of-time and bakes the API surface into your TypeScript build. If you need the surface to change without redeploying, you have to ship a new build.

**4. One stack, two ends of the wire.**

`openapi-stack` includes [openapi-backend](/docs/openapi-backend/intro) for the server side — request/response validation, routing by `operationId`, security handlers, and built-in mocking against the *same* spec your client uses. With `openapi-typescript` you bring your own server framework and validation library; the typegen layer does not participate at runtime on the backend.

---

**Picking between them:**

- Choose **openapi-typescript + openapi-fetch** when you want zero runtime spec coupling and prefer a path-based API surface. Especially clean if you're allergic to axios or building a thin frontend SDK where the spec rarely changes.
- Choose **openapi-stack** when you want method-based ergonomics, axios's mature interceptor ecosystem, runtime spec introspection, *and* a single library that covers both sides of the API.

You can also mix — use `openapi-typescript` for types in one part of your codebase and `openapi-backend` on the server for validation. They share OpenAPI as the source of truth.

</details>

## Benefits

1. 🚀 **No code generation.** Write your own code the way you like it. Only generate types from OpenAPI spec if you want.
1. 🤝 **Single source of truth for your API contract.** No more manually updating your OpenAPI specs to keep up with your backend code. Ensure your API docs and SDKs stay up to date by using the spec in runtime to route and validate.
1. 🧙‍♂️ **Type safety and validation.** Build your product faster and with a better developer experience using strongly typed Typescript and code autocomplete both in the server and client side.
1. ❤️ **Testing & Collaboration.** Leverage API mocks to make testing and development easier and iterate fast on your API design as you build your app's interface. Being blocked by the backend team is a thing of the past!

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

- [x] Battle-tested in production. High test coverage.
- [x] ️No code generation – we only generate types
- [x] Built with TypeScript, types included with full autocomplete support
- [x] Framework agnostic – works with your stack
- [x] Lightweight - small frontend bundle + optimized for serverless cold starts
- [x]  OpenAPI 3.x support
- [x] [Samples](/docs/examples/boilerplate/) included

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openapistack/openapi-backend,openapistack/openapi-client-axios,openapistack/openapicmd,openapistack/docs&type=Date)](https://star-history.com/#openapistack/openapi-backend&openapistack/openapi-client-axios&openapistack/openapicmd&openapistack/docs&Date)
