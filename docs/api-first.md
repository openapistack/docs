---
title: Why API First?
hide_title: true
sidebar_position: 1
---

# Why API First?

## Schema First

The core idea of _API First_, sometimes referred to as _Design First_ or _Schema First_, is that software teams start by defining an API contract and use it as the single source of truth for data models in their application logic.

Teams using this approach define their API contracts using machine-readable specifications like [OpenAPI](https://www.openapis.org/) or [GraphQL](https://graphql.org/), and leverage techniques like [Generating Types](/docs/openapicmd/typegen) and [API Mocking](/docs/openapicmd/mock-server/) to rapidly iterate on the API Schema while making sure the implementation and documentation stay up to date with the API contract.

API First software teams are able to effectively collaborate on software design and change the established single source of truth for data models when needed, using shared types and automated tests to ensure implementation follows the API contract. **This reduces bugs and allows the team to iterate on the product faster.**

## Type Safety

Use of typed languages like TypeScript improve developer experience and reduce bugs by providing strict type checks and code autocomplete during development. This is especially powerful when types are shared and used across the stack in both backend implementation and client-side logic.

Since OpenAPI specification already leverages [JSON Schema](https://json-schema.org/) to define types for your data model, teams are able to utilise them in code as TypeScript types.

:::tip

OpenAPI Stack provides the [`openapi typegen`](/docs/openapicmd/typegen/) CLI command to generate types from OpenAPI schema, to keep your implementation up to date with the API contract.

:::

## Product Velocity


Introducing [API Mocking](/docs/openapicmd/mock-server/) enables developers working on the application's frontend to develop the app against a mocked version of the backend which can quickly be adjusted by changing the API schema. This means the frontend team is never blocked waiting for the backend team to implement changes to the API.

For agile teams, focusing on the user facing parts of the application first is a great way to deliver fast and iterate on the design before investing into implementing backend logic.

<div className="text-center">
<img alt="API First Cycle" src="/img/openapi-stack.drawio.png" />
</div>
