---
title: "dereference-json-schema"
hide_title: true
sidebar_position: 2
---

# dereference-json-schema

[![CI](https://github.com/anttiviljami/dereference-json-schema/workflows/CI/badge.svg)](https://github.com/anttiviljami/dereference-json-schema/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/dereference-json-schema.svg)](https://www.npmjs.com/package/dereference-json-schema)
[![npm downloads](https://img.shields.io/npm/dw/dereference-json-schema)](https://www.npmjs.com/package/dereference-json-schema)
[![bundle size](https://img.shields.io/bundlephobia/minzip/dereference-json-schema?label=gzip%20bundle)](https://bundlephobia.com/package/dereference-json-schema)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/dereference-json-schema/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Dereference $ref pointers in JSONSchema or OpenAPI documents.

Zero dependencies. Synchronous core. Handles circular refs.

## Usage

```
npm i dereference-json-schema
```

```js
import { dereferenceSync } from 'dereference-json-schema';

const schemaWithRefs = {
  schemas: {
    Person: {
      type: 'object',
      properties: {
        name: {
          $ref: '#/schemas/Name',
        },
      },
    },
    Name: {
      type: 'string',
    },
  },
};

const schemaWithNoRefs = dereferenceSync(schemaWithRefs);
```

## Contributing

dereference-json-schema is Free and Open Source Software. Issues and pull requests are more than welcome!
