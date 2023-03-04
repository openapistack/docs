---
sidebar_position: 2
---

# Swagger UI

:::tip

[Swagger UI](https://swagger.io/tools/swagger-ui/) is an open source browser interface used to visualize OpenAPI documents.

:::

You can use the `swagger-ui` command quickly launch Swagger UI in your browser to preview your API.

```
npx openapicmd swagger-ui ./openapi.yml
```

```
Swagger UI running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
```

## Proxy (Avoiding CORS)

Ofter remote APIs do not support calling from localhost due to CORS configuration. To work around that, you can use the `--proxy` option to route API requests from Swagger UI via a local proxy to the remote API.

```
npx openapicmd swagger-ui ./openapi.yml --proxy
```

```
Swagger UI running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
Proxy running at http://localhost:9001/proxy
```

## Swagger Editor

To design and edit OpenAPI files using Swagger Editor, you can use the `swagger-editor` command:

```
npx openapicmd swagger-ui ./openapi.yml
```

```
Swagger Editor running at http://localhost:9000
```

## Generating Documentation

To bundle your API documentation into a static Swagger UI page, use the `--bundle` option.

```
npx openapicmd swagger-ui ./openapi.yml --bundle=outDir
```
