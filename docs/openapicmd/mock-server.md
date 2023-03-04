---
sidebar_position: 4
---

# Mock Server

To quickly spin up a local mock server for an openapi, use the `mock` command.

```
npx openapicmd mock ./openapi.yml

Mock server running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
```

:::tip

You can then use the `call` or `swagger-ui` commands to test your mock API.

```
npx openapi call http://localhost:9000/openapi.json
```

:::
