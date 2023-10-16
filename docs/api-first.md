---
title: Why API First?
hide_title: true
sidebar_position: 1
---

# API First Manifesto

## Schema First

The core idea of _API First_, sometimes referred to as _Schema First_, is that software teams start by defining an API contract and use it as the single source of truth for data models in their application logic.

Teams using this approach define their API contracts using machine-readable specifications like [OpenAPI](https://www.openapis.org/) or [GraphQL](https://graphql.org/), and leverage techniques like [Generating Types](/docs/openapicmd/typegen) and [API Mocking](/docs/openapicmd/mock-server/) to rapidly iterate the product while making sure the implementation and documentation stay up to date with the API contract.

We do this to effectively collaborate on software design, making changes to the API design when needed, using shared types and automated tests to ensure our implementation follows the API contract. **This reduces bugs and allows teams to deliver continuously.**

## Type Safety

Use of typed languages like TypeScript improve developer experience and reduce bugs by providing strict type checks and code autocomplete during development. This is especially powerful when types are shared and used across the stack in both backend implementation and client-side logic.

Given that the OpenAPI specification already leverages [JSON Schema](https://json-schema.org/) for defining data model types, these can be effortlessly translated into TypeScript types for coding use.

:::tip

OpenAPI Stack provides the [`openapi typegen`](/docs/openapicmd/typegen/) CLI command to generate types from OpenAPI schema, to keep your implementation up to date with the API contract.

:::

## Design First

Introducing [API Mocking](/docs/openapicmd/mock-server/) enables developers working on the application's frontend to develop the app against a mocked version of the backend which can cheaply be adjusted by fine-tuning the API schema. **This means the frontend team is never blocked waiting for backend changes.**

For customer-centric agile teams, focusing on the user facing parts of the application first is a great way to rapidly prototype designs before investing into implementing backend logic.

**Design First** signifies that design drives the code, not the other way around.

<div className="text-center">
<img alt="API First Cycle" src="/img/openapi-stack.drawio.png" />
</div>
