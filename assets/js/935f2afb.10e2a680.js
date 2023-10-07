"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Overview","href":"/docs/intro","docId":"intro"},{"type":"link","label":"API First","href":"/docs/api-first","docId":"api-first"},{"type":"category","label":"Examples","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Invoking APIs","href":"/docs/examples/calling-apis","docId":"examples/calling-apis"},{"type":"link","label":"Building APIs","href":"/docs/examples/building-apis","docId":"examples/building-apis"},{"type":"link","label":"Boilerplate projects","href":"/docs/examples/boilerplate","docId":"examples/boilerplate"}]},{"type":"category","label":"Backend","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Quick Start: Backend","href":"/docs/openapi-backend/intro","docId":"openapi-backend/intro"},{"type":"link","label":"Framework Examples","href":"/docs/openapi-backend/examples","docId":"openapi-backend/examples"},{"type":"link","label":"Operation Handlers","href":"/docs/openapi-backend/operation-handlers","docId":"openapi-backend/operation-handlers"},{"type":"link","label":"Request validation","href":"/docs/openapi-backend/request-validation","docId":"openapi-backend/request-validation"},{"type":"link","label":"Response validation","href":"/docs/openapi-backend/response-validation","docId":"openapi-backend/response-validation"},{"type":"link","label":"Mocking API responses","href":"/docs/openapi-backend/mocking","docId":"openapi-backend/mocking"},{"type":"link","label":"Auth with Security Handlers","href":"/docs/openapi-backend/security-handlers","docId":"openapi-backend/security-handlers"},{"type":"link","label":"Typescript","href":"/docs/openapi-backend/typescript","docId":"openapi-backend/typescript"},{"type":"link","label":"Reference","href":"/docs/openapi-backend/api","docId":"openapi-backend/api"},{"type":"link","label":"API Versioning","href":"/docs/openapi-backend/versioning","docId":"openapi-backend/versioning"}]},{"type":"category","label":"Client","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Quick Start: Client","href":"/docs/openapi-client-axios/intro","docId":"openapi-client-axios/intro"},{"type":"link","label":"Using the client","href":"/docs/openapi-client-axios/usage","docId":"openapi-client-axios/usage"},{"type":"link","label":"Typegen","href":"/docs/openapi-client-axios/typegen","docId":"openapi-client-axios/typegen"},{"type":"link","label":"Bundling","href":"/docs/openapi-client-axios/bundling","docId":"openapi-client-axios/bundling"}]},{"type":"category","label":"CLI","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Quick Start: CLI","href":"/docs/openapicmd/intro","docId":"openapicmd/intro"},{"type":"link","label":"Generating types","href":"/docs/openapicmd/typegen","docId":"openapicmd/typegen"},{"type":"link","label":"Swagger UI","href":"/docs/openapicmd/swagger-ui","docId":"openapicmd/swagger-ui"},{"type":"link","label":"Call API operations","href":"/docs/openapicmd/call","docId":"openapicmd/call"},{"type":"link","label":"Mock Server","href":"/docs/openapicmd/mock-server","docId":"openapicmd/mock-server"},{"type":"link","label":".openapiconfig","href":"/docs/openapicmd/config","docId":"openapicmd/config"}]},{"type":"category","label":"Testing","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Testing with msw + openapi-backend mocks","href":"/docs/testing/testing-react-with-jest-and-openapi-mocks","docId":"testing/testing-react-with-jest-and-openapi-mocks"}]}]},"docs":{"api-first":{"id":"api-first","title":"API First","description":"While modern alternatives like GraphQL and tRPC are awesome, REST keeps growing and improving as an industry standard API design pattern not in small part thanks to the widely adopted OpenAPI specification.","sidebar":"tutorialSidebar"},"examples/boilerplate":{"id":"examples/boilerplate","title":"Boilerplate projects","description":"See Framework Examples for how openapi-backend integrates with any Node.js server or framework.","sidebar":"tutorialSidebar"},"examples/building-apis":{"id":"examples/building-apis","title":"Building APIs","description":"In this example, we will design and build a minimal Node.js REST API using openapi-backend and the express framework.","sidebar":"tutorialSidebar"},"examples/calling-apis":{"id":"examples/calling-apis","title":"Invoking APIs","description":"In this example we will write code to interact with a public mock API available on example.openapistack.co/openapi.json","sidebar":"tutorialSidebar"},"intro":{"id":"intro","title":"Overview","description":"openapi-stack","sidebar":"tutorialSidebar"},"openapi-backend/api":{"id":"openapi-backend/api","title":"Reference","description":"Class OpenAPIBackend","sidebar":"tutorialSidebar"},"openapi-backend/examples":{"id":"openapi-backend/examples","title":"Framework Examples","description":"OpenAPI backend is framework agnostic, which means you can use it with pretty much any javascript backend framework and hosting you\'re familiar with.","sidebar":"tutorialSidebar"},"openapi-backend/intro":{"id":"openapi-backend/intro","title":"Quick Start: Backend","description":"openapi-backend","sidebar":"tutorialSidebar"},"openapi-backend/mocking":{"id":"openapi-backend/mocking","title":"Mocking API responses","description":"Mocking APIs just got really easy with OpenAPI Backend! Register a notImplemented","sidebar":"tutorialSidebar"},"openapi-backend/operation-handlers":{"id":"openapi-backend/operation-handlers","title":"Operation Handlers","description":"Handlers are controllers for operations described in your OpenAPI document. They are registered for each operationId found in the OpenAPI definitions.","sidebar":"tutorialSidebar"},"openapi-backend/request-validation":{"id":"openapi-backend/request-validation","title":"Request validation","description":"All you need to enable request validation is to register a validationFail handler.","sidebar":"tutorialSidebar"},"openapi-backend/response-validation":{"id":"openapi-backend/response-validation","title":"Response validation","description":"While not recommended for production APIs, to enable response validation for your handlers, you can register a postResponseHandler","sidebar":"tutorialSidebar"},"openapi-backend/security-handlers":{"id":"openapi-backend/security-handlers","title":"Auth with Security Handlers","description":"When your OpenAPI document contains Security Schemes","sidebar":"tutorialSidebar"},"openapi-backend/typescript":{"id":"openapi-backend/typescript","title":"Typescript","description":"OpenAPI Backend is entirely built with typescript and supports using types in operation handlers.","sidebar":"tutorialSidebar"},"openapi-backend/versioning":{"id":"openapi-backend/versioning","title":"API Versioning","description":"Since OpenAPI specification already supports the version field in the info object,","sidebar":"tutorialSidebar"},"openapi-client-axios/bundling":{"id":"openapi-client-axios/bundling","title":"Bundling","description":"When using openapi-client-axios in a project with a bundler such as webpack, esbuild or rollup, you can include your","sidebar":"tutorialSidebar"},"openapi-client-axios/intro":{"id":"openapi-client-axios/intro","title":"Quick Start: Client","description":"openapi-client-axios","sidebar":"tutorialSidebar"},"openapi-client-axios/typegen":{"id":"openapi-client-axios/typegen","title":"Typegen","description":"It\'s recommended to use openapicmd typegen to generate types instead of directly installing the typegen package.","sidebar":"tutorialSidebar"},"openapi-client-axios/usage":{"id":"openapi-client-axios/usage","title":"Using the client","description":"OpenAPI Client Axios uses operationIds","sidebar":"tutorialSidebar"},"openapicmd/call":{"id":"openapicmd/call","title":"Call API operations","description":"The call command can be used to call APIs from the command line for testing or automation purposes e.g. in CI pipelines or shell scripts.","sidebar":"tutorialSidebar"},"openapicmd/config":{"id":"openapicmd/config","title":".openapiconfig","description":"You can then use load and auth commands to create a .openapiconfig file to avoid having to pass the openapi document when running openapicmd commands.","sidebar":"tutorialSidebar"},"openapicmd/intro":{"id":"openapicmd/intro","title":"Quick Start: CLI","description":"openapicmd","sidebar":"tutorialSidebar"},"openapicmd/mock-server":{"id":"openapicmd/mock-server","title":"Mock Server","description":"To quickly spin up a local mock server for an openapi, use the mock command.","sidebar":"tutorialSidebar"},"openapicmd/swagger-ui":{"id":"openapicmd/swagger-ui","title":"Swagger UI","description":"Swagger UI is an open source browser interface used to visualize OpenAPI documents.","sidebar":"tutorialSidebar"},"openapicmd/typegen":{"id":"openapicmd/typegen","title":"Generating types","description":"Use the typegen command to generate Typescript types from your OpenAPI definition.","sidebar":"tutorialSidebar"},"testing/testing-react-with-jest-and-openapi-mocks":{"id":"testing/testing-react-with-jest-and-openapi-mocks","title":"Testing with msw + openapi-backend mocks","description":"MSW (Mock Service Worker) is a popular library built to intercept and mock network requests commonly used in testing.","sidebar":"tutorialSidebar"}}}')}}]);