---
title: Philosophy
hide_title: true
sidebar_position: 2
---

# Philosophy

:::info

openapi-stack is built to enable API First worklows and great developer experience for software teams using OAS and Typescript.

:::

<div className="text-center">
<img alt="API First Cycle" src="/img/openapi-stack.drawio.png" />
</div>

## Why API First?

The core idea of _API First_ is to treat API specs as a first class citizen in your software architecture, using them as part of the implementation instead of easily out-of-date documentation.

In practice this means teams use machine readable specifications like OpenAPI as contracts to rapidly iterate and parallelize work during development using cheap API mocking; not having to wait around for backend implementations to be completed or changed.

API First software teams are also able to effectively collaborate on software design and data modeling using API schemas as a source of truth for types across the entire codebase.

## Type Safety

Since OpenAPI specification already leverages JSON Schema to define types for data in your software, teams should be able to directly utilise them in the codebase as Typescript types.

Use of types significantly improves developer experience and code quality – especially when shared and used across the stack both in backend implementation and client-side.

openapi-stack comes batteries included with [typegen](/docs/openapi-client-axios/typegen) built exactly for this purpose.

## No Code Generation

Lots of code generation tools out there for OAS, but developers don't always enjoy working with code generation. Achieving great developer experience in a codebase with generated code is not always easy and often requires significant investment.

With openapi-stack you can say goodbye to generated client implementations or annoying backend boilerplate.

The only thing we generate are types from your API specs.

## Framework agnostic

openapi-stack is not an opinionated framework, nor does it require you to pick any specific framework.

You choose whether to build your frontend in React, Angular, Vue, Svelte, your backend with Express, Nest.js, AWS Lambda, Google Cloud Function, etc.
