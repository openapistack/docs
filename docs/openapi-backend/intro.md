---
title: Quick Start
hide_title: true
sidebar_position: 1
---

<div align="center">
<img alt="openapi-backend logo" src="/img/openapi-stack-logo.png" className="max-w-[150px]" />
<h1 className="mb-6">openapi-backend</h1>

[![CI](https://github.com/anttiviljami/openapi-backend/workflows/CI/badge.svg)](https://github.com/anttiviljami/openapi-backend/actions?query=workflow%3ACI)
[![GitHub stars](https://img.shields.io/github/stars/anttiviljami/openapi-backend?label=github%20stars)](https://github.com/anttiviljami/openapi-backend)
[![npm version](https://img.shields.io/npm/v/openapi-backend.svg)](https://www.npmjs.com/package/openapi-backend)
[![npm downloads](https://img.shields.io/npm/dw/openapi-backend)](https://www.npmjs.com/package/openapi-backend)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/openapi-backend/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

<p><b>Build, Validate, Route, Authenticate, and Mock using OpenAPI definitions.</b></p>

<p>OpenAPI Backend is a Framework-agnostic middleware tool for building beautiful APIs with <a href="https://github.com/OAI/OpenAPI-Specification">OpenAPI Specification</a>.</p>
</div>

## Features

- [x] Build APIs by describing them in [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md)
- [x] Register handlers for [operationIds](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-8)
      to route requests in your favourite Node.js backend
- [x] Use [JSON Schema](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#data-types) to validate
      API requests and/or responses. OpenAPI Backend uses the [AJV](https://ajv.js.org/) library under the hood for performant validation
- [x] Register Auth / Security Handlers for [OpenAPI Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#securitySchemeObject)
      to authorize API requests
- [x] Auto-mock API responses using [OpenAPI examples objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#example-object)
      or [JSON Schema definitions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schema-object)
- [x] Built with TypeScript, types included
- [x] Optimised runtime routing and validation. **No generated code!**
- [x] OpenAPI 3.1 support

## Quick Start

The easiest way to get started with OpenAPI Backend is to check out one of the
[examples](/docs/openapi-backend/examples).

```
npm install --save openapi-backend
```

```javascript
import OpenAPIBackend from "openapi-backend";

// create api with your definition file or object
const api = new OpenAPIBackend({ definition: "./petstore.yml" });

// register your framework specific request handlers here
api.register({
  getPets: (c, req, res) => res.status(200).json({ result: "ok" }),
  getPetById: (c, req, res) => res.status(200).json({ result: "ok" }),
  validationFail: (c, req, res) =>
    res.status(400).json({ err: c.validation.errors }),
  notFound: (c, req, res) => res.status(404).json({ err: "not found" }),
});

// initalize the backend
api.init();
```
