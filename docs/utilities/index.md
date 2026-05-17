---
title: "Utility Libraries"
hide_title: true
sidebar_position: 1
---

# Utility Libraries

Beyond the three main libraries (`openapi-backend`, `openapi-client-axios`, `openapicmd`), the openapi-stack project maintains a set of small, focused utility libraries. They power the rest of the stack internally and are also used directly by teams at GitHub, SAP, Prisma, Zitadel, Mojaloop and many others.

| Library | What it does | Weekly downloads |
| --- | --- | --- |
| [`dereference-json-schema`](./dereference-json-schema) | Fast, in-memory dereferencing of `$ref` pointers in OpenAPI / JSON Schema documents. | ~240k |
| [`mock-json-schema`](./mock-json-schema) | Generate mock objects from JSON Schema definitions or OpenAPI `examples`. | ~70k |
| [`glob-json-path`](./glob-json-path) | Glob-style matching for JSON paths. Pull a slice out of a deeply nested object by pattern. | ~5k |

All three are MIT-licensed, framework-agnostic, and ship with TypeScript types out of the box.
