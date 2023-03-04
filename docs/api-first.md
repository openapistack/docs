---
title: Philosophy
hide_title: true
sidebar_position: 2
---

# Philosophy

:::info

The goal of openapi-stack to enable API First with great developer experience for software teams using OAS and Typescript; inspired by tools like GraphQL and tRPC.

:::

<div className="text-center">
<img alt="API First Cycle" src="/img/openapi-stack.drawio.png" />
</div>

## Why API First?

The core idea of _API First_ is to treat API specs as a first class citizen in your software architecture, using them as part of the implementation instead of easily out-of-date documentation.

This means teams using machine readable specifications like OpenAPI leverage the API design as a contract to rapidly iterate and parallelize their software development using cheap API mocking; not having to wait around for backend implementations to be completed.

API First software teams are also able to more effectively collaborate on API design, often using it as a primary way to design data models with well defined types used across the codebase.

## Type Safety

Since OpenAPI specification already leverages JSON Schema to define types for data in your software, teams should be able to directly utilise them in the codebase as Typescript types.

Use of types significantly improves developer experience and code qualtiy, especially when shared and used across the stack both in backend implementation and client-side.

openapi-stack comes batteries included with [typegen](/docs/openapi-client-axios/typegen) built exactly for this purpose.

## No Code Generation

Lots of code generation tools out there for OAS, but developers don't always enjoy working with code generation tools. Achieving great developer experience in a codebase with generated code is not always easy and often requires significant investment.

With openapi-stack you can say goodbye to generated client implementations or annoying backend boilerplate.

The only thing we generate are types from your API specs.

## Framework agnostic

openapi-stack is not an opinionated framework, nor does it require you to pick any specific framework.

You choose whether to build your frontend in React, Angular, Vue, Svelte, your backend with Express, Nest.js, AWS Lambda, Google Cloud Function, etc.

These libraries are built to be simple, generic and work on pure Typescript or Javascript.
