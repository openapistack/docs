"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[8594],{4137:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),l=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=l(e.components);return r.createElement(o.Provider,{value:n},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=l(t),m=a,g=c["".concat(o,".").concat(m)]||c[m]||u[m]||s;return t?r.createElement(g,i(i({ref:n},d),{},{components:t})):r.createElement(g,i({ref:n},d))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,i=new Array(s);i[0]=m;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p[c]="string"==typeof e?e:a,i[1]=p;for(var l=2;l<s;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3960:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>p,toc:()=>l});var r=t(7462),a=(t(7294),t(4137));const s={title:"Building APIs",sidebar_position:2},i=void 0,p={unversionedId:"examples/building-apis",id:"examples/building-apis",title:"Building APIs",description:"In this example, we will design and build a minimal Node.js REST API using openapi-backend and the express framework.",source:"@site/docs/examples/building-apis.md",sourceDirName:"examples",slug:"/examples/building-apis",permalink:"/docs/examples/building-apis",draft:!1,editUrl:"https://github.com/anttiviljami/openapi-stack/edit/main/docs/examples/building-apis.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Building APIs",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Invoking APIs",permalink:"/docs/examples/calling-apis"},next:{title:"Boilerplate projects",permalink:"/docs/examples/boilerplate"}},o={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Setting up express",id:"setting-up-express",level:2},{value:"Setting up openapi-backend",id:"setting-up-openapi-backend",level:2},{value:"Writing our API spec",id:"writing-our-api-spec",level:2},{value:"Implementing Handlers",id:"implementing-handlers",level:2},{value:"Use as express middleware",id:"use-as-express-middleware",level:2},{value:"Full Example",id:"full-example",level:2},{value:"Optional: Mocking Responses",id:"optional-mocking-responses",level:2}],d={toc:l},c="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(c,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"In this example, we will design and build a minimal Node.js REST API using ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapi-backend"},"openapi-backend")," and the ",(0,a.kt)("a",{parentName:"p",href:"https://expressjs.com"},"express")," framework.")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Not using express? The ",(0,a.kt)("inlineCode",{parentName:"p"},"openapi-backend")," package can be used with any other Node.js framework or server. See ",(0,a.kt)("a",{parentName:"p",href:"/docs/examples/boilerplate/"},"boilerplate projects")," for examples of using OpenAPI stack with other frameworks.")),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("p",null,"This guide assumes you already know how to set up a Node.js project with Typescript. You can find a minimal sample project ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/express-typescript"},"here"),"."),(0,a.kt)("p",null,"Before starting, make sure to install ",(0,a.kt)("inlineCode",{parentName:"p"},"openapi-backend")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"express")," as dependencies:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"npm i openapi-backend express\n")),(0,a.kt)("h2",{id:"setting-up-express"},"Setting up express"),(0,a.kt)("p",null,"We will start by setting up a basic express server listening on port ",(0,a.kt)("inlineCode",{parentName:"p"},"9000"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// src/server.ts\nimport express from 'express';\n\nconst app = express();\n\n// use the json middleware\napp.use(express.json());\n\n// start server\napp.listen(9000, () => console.info('api listening at http://localhost:9000'));\n")),(0,a.kt)("h2",{id:"setting-up-openapi-backend"},"Setting up openapi-backend"),(0,a.kt)("p",null,"We can then import ",(0,a.kt)("inlineCode",{parentName:"p"},"openapi-backend")," and initialize it with an openapi definition file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { OpenAPIBackend } from 'openapi-backend';\n\nconst api = new OpenAPIBackend({\n  definition: './openapi.yml',\n});\n\napi.init();\n")),(0,a.kt)("h2",{id:"writing-our-api-spec"},"Writing our API spec"),(0,a.kt)("p",null,"We load our API definition from ",(0,a.kt)("inlineCode",{parentName:"p"},"openapi.yml"),", so let's populate it with a simple API design with a ",(0,a.kt)("inlineCode",{parentName:"p"},"getPets")," operation:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'# src/openapi.yml\nopenapi: 3.0.2\ninfo:\n  title: "Pet API"\n  version: 1.0.0\npaths:\n  "/pets":\n    get:\n      operationId: getPets\n      responses:\n        "200":\n          description: list of pets\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: "#/components/schemas/Pet"\ncomponents:\n  schemas:\n    Pet:\n      type: object\n      properties:\n        id:\n          type: string\n        type:\n          type: string\n          enum: ["cat", "dog"]\n        name:\n          type: string\n      required: ["id", "type"]\n')),(0,a.kt)("h2",{id:"implementing-handlers"},"Implementing Handlers"),(0,a.kt)("p",null,"Let's then implement an ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapi-backend/operation-handlers/"},"operation handler")," for the ",(0,a.kt)("inlineCode",{parentName:"p"},"getPets")," operation defined in our spec."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"api.register('getPets', async (c, req: express.Request, res: express.Response) =>\n  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])\n)\n")),(0,a.kt)("p",null,"To enable routing and validation, we'll add some default handlers in our code for common exceptions:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// return 400 when request validation fails\napi.register('validationFail', (c, req: express.Request, res: express.Response) =>\n  res.status(400).json({ err: c.validation.errors }),\n)\n// return 404 when route doesn't match any operation in openapi.yml\napi.register('notFound', (c, req: express.Request, res: express.Response) =>\n  res.status(404).json({ err: 'not found' }),\n)\n")),(0,a.kt)("h2",{id:"use-as-express-middleware"},"Use as express middleware"),(0,a.kt)("p",null,"Finally we wire up openapi-backend to route, validate and handle API requests with express:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"app.use((req, res) => api.handleRequest(req, req, res));\n")),(0,a.kt)("h2",{id:"full-example"},"Full Example"),(0,a.kt)("p",null,"Putting everything together, here is our complete example server code:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// src/server.ts\nimport { OpenAPIBackend, Request } from 'openapi-backend';\nimport express from 'express';\n\nconst api = new OpenAPIBackend({\n  definition: './openapi.yml',\n});\n\napi.init();\n\n// handler for getPets operation in openapi.yml\napi.register('getPets', async (c, req: express.Request, res: express.Response) =>\n  res.status(200).json([{ id: '1', type: 'cat', name: 'Garfield' }])\n)\n// return 400 when request validation fails\napi.register('validationFail', (c, req: express.Request, res: express.Response) =>\n  res.status(400).json({ err: c.validation.errors }),\n)\n// return 404 when route doesn't match any operation in openapi.yml\napi.register('notFound', (c, req: express.Request, res: express.Response) =>\n  res.status(404).json({ err: 'not found' }),\n)\n\nconst app = express();\n\n// use the json middleware\napp.use(express.json());\n\n// use openapi-backend to handle requests\napp.use((req, res) => api.handleRequest(req as Request, req, res));\n\n// start server\napp.listen(9000, () => console.info('api listening at http://localhost:9000'));\n")),(0,a.kt)("h2",{id:"optional-mocking-responses"},"Optional: Mocking Responses"),(0,a.kt)("p",null,"Instead of implementing a handler for ",(0,a.kt)("inlineCode",{parentName:"p"},"getPets"),", you can register a ",(0,a.kt)("inlineCode",{parentName:"p"},"notImplemented")," handler to mock the response based\non the OpenAPI schema:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// mock responses for operations with no registered handlers\napi.register('notImplemented', (c, req: express.Request, res: express.Response) => {\n  const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);\n  return res.status(status).json(mock);\n});\n")))}u.isMDXComponent=!0}}]);