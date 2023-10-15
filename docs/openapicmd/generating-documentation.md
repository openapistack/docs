---
sidebar_position: 2
title: Generating documentation
---

# Generating Documentation

## Swagger UI

:::info

[Swagger UI](https://swagger.io/tools/swagger-ui/) is an open source browser interface used to visualize OpenAPI documents.

:::

You can use the `swagger-ui` command quickly launch Swagger UI in your browser to preview your API.

```
openapi swagger-ui ./openapi.yml
```

```
Swagger UI running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
```

[![Screenshot of Swagger UI](/img/swagger-ui-screenshot.png)](/img/swagger-ui-screenshot.png)

## ReDoc

:::info

[ReDoc](https://github.com/Redocly/redoc) is an alternative open source browser interface used to visualize OpenAPI documents in a three-panel, responsive layout:.

:::

You can use the `redoc` command quickly launch ReDoc in your browser to preview your API.

```
openapi redoc ./openapi.yml
```

```
ReDoc running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
```

[![Screenshot of ReDoc](/img/redoc-screenshot.png)](/img/redoc-screenshot.png)

## Generating Static Documentation

:::tip

You can create a standalone static website that can be deployed to any static page hosting provider (e.g. GitHub pages or Vercel) using the `--bundle` option.

:::

To bundle your API documentation into a static website that can be deployed, use the `--bundle` option.

```
openapi swagger-ui ./openapi.yml --bundle=outDir
openapi redoc ./openapi.yml --bundle=outDir
```

## Proxy (Avoiding CORS)

Often remote APIs do not support calling from localhost due to CORS configuration. To work around that, you can use the `--proxy` option to route API requests from Swagger UI via a local proxy to the remote API.

```
openapi swagger-ui ./openapi.yml --proxy
```

```
Swagger UI running at http://localhost:9000
OpenAPI definition at http://localhost:9000/openapi.json
Proxy running at http://localhost:9001/proxy
```

## Swagger Editor

To design and edit OpenAPI files using Swagger Editor, you can use the `swagger-editor` command:

```
openapi swagger-ui ./openapi.yml
```

```
Swagger Editor running at http://localhost:9000
```
