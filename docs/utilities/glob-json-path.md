---
title: "glob-json-path"
hide_title: true
sidebar_position: 4
---

# glob-json-path

[![CI](https://github.com/anttiviljami/glob-json-path/workflows/CI/badge.svg)](https://github.com/anttiviljami/glob-json-path/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/glob-json-path.svg)](https://www.npmjs.com/package/glob-json-path)
[![bundle size](https://img.shields.io/bundlephobia/minzip/glob-json-path?label=gzip%20bundle)](https://bundlephobia.com/package/glob-json-path)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/glob-json-path/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Bash-like globbing for JSON objects.

```
npm i glob-json-path
```

```typescript
import { globValues, globPaths } from "glob-json-path";

globValues("a.b", { a: { b: 1 } }); // [1]
globValues("a.b.c", { a: { b: { c: 1 }}}); // [1]
globValues("a.b", { a: { b: { c: 1 }}}); // [{ c: 1 }]
globValues("a.*", { a: { b: 2, c: 3 }}); // [2, 3]
globValues("a.*.c", { a: [{ b: 3, c: 4 }, { c: 5 }] }); // [4, 5]
globValues("**.c", { a: { c: 6, b: { c: 7 }}}); // [6, 7]
globValues("a*", { ab: 7, abc: 8, ba: 9, bc: 10 }); // [7, 8]
globValues("b?", { ab: 7, abc: 8, ba: 9, bc: 10 }); // [9, 10]

globPaths("a.*", { a: { b: 2, c: 3 }}); // ["a.b", "a.c"]
globPaths("a.*.c", { a: { b: { c: 3 }, d: { c: 3 }}}); // ["a.b.c", "a.d.c"]
globPaths("a.*.c", { a: [{ b: 3, c: 4 }, { c: 5 }] }); // ["a.0.c", "a.1.c"]
globPaths("**.c", { a: { c: 6, b: { c: 7 } } }); // ["a.c", "a.b.c"]
globPaths("a*", { ab: 7, abc: 8, ba: 9, bc: 10 }); // ["ab", "abc"]
globPaths("b?", { ab: 7, abc: 8, ba: 9, bc: 10 }); // ["ba", "bc"]
```

## Features

- Minimum number of dependencies. Tiny package size.
- Return matching values or paths for bash-like globs
- Support for wildcards `*`, `?`
- Support for double wildcards `**` (globstar)
- Support for arrays and all JSON primitives
- Relies on [minimatch](https://github.com/isaacs/minimatch) package for converting globs to regex.

## Examples

See [tests](https://github.com/anttiviljami/glob-json-path/blob/main/src/glob.test.ts) for more use cases.

## Contributing

glob-json-path is Free and Open Source Software. Issues and pull requests are more than welcome!
