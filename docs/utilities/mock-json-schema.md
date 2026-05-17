---
title: "mock-json-schema"
hide_title: true
sidebar_position: 3
---

# mock-json-schema

[![CI](https://github.com/anttiviljami/mock-json-schema/workflows/CI/badge.svg)](https://github.com/anttiviljami/mock-json-schema/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/mock-json-schema.svg)](https://www.npmjs.com/package/mock-json-schema)
[![npm downloads](https://img.shields.io/npm/dw/mock-json-schema)](https://www.npmjs.com/package/mock-json-schema)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/mock-json-schema/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Simple utility to mock example objects based on JSON schema definitions

## Features

- [x] Minimal & deterministic. Predictable single example with no randomisation involved
- [x] Thoroughly [tested](https://github.com/anttiviljami/mock-json-schema/blob/master/src/mock.test.ts) feature set
- [x] Supports `example`, `default`
- [x] Supports `anyOf`, `allOf`, `oneOf`
- [x] Built-in examples for following string formats:
	- `email`
	- `hostname`
	- `ipv4`
	- `ipv6`
	- `uri`
	- `uri-reference`
	- `uri-template`
	- `json-pointer`
	- `date-time`
	- `uuid`
- [x] TypeScript types included
- [ ] Supports $ref pointers

## Usage

```javascript
const { mock } = require('mock-json-schema');
const assert = require('assert');

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
      },
      name: {
        type: 'string',
        example: 'John Doe',
      },
      email: {
        type: 'string',
        format: 'email',
      },
    },
  },
};

assert.deepEqual(mock(schema), [{ id: 1, name: 'John Doe', email: 'user@example.com' }]);
```

View more [examples](https://github.com/anttiviljami/mock-json-schema/blob/master/src/mock.test.ts)

## Contributing

mock-json-schema is Free and Open Source Software. Issues and pull requests are more than welcome!
