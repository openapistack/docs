"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[8509],{4137:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},p=Object.keys(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),l=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},u=function(e){var t=l(e.components);return n.createElement(o.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,p=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=l(a),d=r,h=m["".concat(o,".").concat(d)]||m[d]||c[d]||p;return a?n.createElement(h,s(s({ref:t},u),{},{components:a})):n.createElement(h,s({ref:t},u))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=a.length,s=new Array(p);s[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[m]="string"==typeof e?e:r,s[1]=i;for(var l=2;l<p;l++)s[l]=a[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},2161:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>c,frontMatter:()=>p,metadata:()=>i,toc:()=>l});var n=a(7462),r=(a(7294),a(4137));const p={sidebar_position:2},s="Examples",i={unversionedId:"openapi-backend/examples",id:"openapi-backend/examples",title:"Examples",description:"OpenAPI backend is framework agnostic, which means you can use it with pretty much any javascript backend framework and hosting you're familiar with.",source:"@site/docs/openapi-backend/examples.md",sourceDirName:"openapi-backend",slug:"/openapi-backend/examples",permalink:"/docs/openapi-backend/examples",draft:!1,editUrl:"https://github.com/anttiviljami/openapi-stack/edit/main/docs/openapi-backend/examples.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Quick Start: Backend",permalink:"/docs/openapi-backend/intro"},next:{title:"Operation Handlers",permalink:"/docs/openapi-backend/operation-handlers"}},o={},l=[{value:"Express",id:"express",level:3},{value:"AWS Serverless (Lambda)",id:"aws-serverless-lambda",level:3},{value:"Azure Function",id:"azure-function",level:3},{value:"Fastify",id:"fastify",level:3},{value:"Hapi",id:"hapi",level:3},{value:"Koa",id:"koa",level:3},{value:"Fastify",id:"fastify-1",level:3}],u={toc:l},m="wrapper";function c(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"examples"},"Examples"),(0,r.kt)("p",null,"OpenAPI backend is framework agnostic, which means you can use it with pretty much any javascript backend framework and hosting you're familiar with."),(0,r.kt)("h3",{id:"express"},"Express"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'import express from "express";\n\nconst app = express();\napp.use(express.json());\napp.use((req, res) => api.handleRequest(req, req, res));\napp.listen(9000);\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/express"},"See full Express example")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/express-typescript"},"See full Express TypeScript example")),(0,r.kt)("h3",{id:"aws-serverless-lambda"},"AWS Serverless (Lambda)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"// API Gateway Proxy handler\nmodule.exports.handler = (event, context) =>\n  api.handleRequest(\n    {\n      method: event.httpMethod,\n      path: event.path,\n      query: event.queryStringParameters,\n      body: event.body,\n      headers: event.headers,\n    },\n    event,\n    context\n  );\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/aws-sam"},"See full AWS SAM example")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/aws-cdk"},"See full AWS CDK example")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/serverless-framework"},"See full Serverless Framework example")),(0,r.kt)("h3",{id:"azure-function"},"Azure Function"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"module.exports = (context, req) =>\n  api.handleRequest(\n    {\n      method: req.method,\n      path: req.params.path,\n      query: req.query,\n      body: req.body,\n      headers: req.headers,\n    },\n    context,\n    req\n  );\n")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/azure-function"},"See full Azure Function example")),(0,r.kt)("h3",{id:"fastify"},"Fastify"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import fastify from "fastify";\n\nfastify.route({\n  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],\n  url: "/*",\n  handler: async (request, reply) =>\n    api.handleRequest(\n      {\n        method: request.method,\n        path: request.url,\n        body: request.body,\n        query: request.query,\n        headers: request.headers,\n      },\n      request,\n      reply\n    ),\n});\nfastify.listen();\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/fastify"},"See full Fastify example")),(0,r.kt)("h3",{id:"hapi"},"Hapi"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'import Hapi from "@hapi/hapi";\n\nconst server = new Hapi.Server({ host: "0.0.0.0", port: 9000 });\nserver.route({\n  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],\n  path: "/{path*}",\n  handler: (req, h) =>\n    api.handleRequest(\n      {\n        method: req.method,\n        path: req.path,\n        body: req.payload,\n        query: req.query,\n        headers: req.headers,\n      },\n      req,\n      h\n    ),\n});\nserver.start();\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/hapi-typescript"},"See full Hapi example")),(0,r.kt)("h3",{id:"koa"},"Koa"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'import Koa from "koa";\nimport bodyparser from "koa-bodyparser";\n\nconst app = new Koa();\n\napp.use(bodyparser());\napp.use((ctx) => api.handleRequest(ctx.request, ctx));\napp.listen(9000);\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/koa"},"See full Koa example")),(0,r.kt)("h3",{id:"fastify-1"},"Fastify"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import Fastify from "fastify";\nimport type { Request } from "openapi-backend";\n\nconst fastify = Fastify();\n\nfastify.route({\n  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],\n  url: "/*",\n  handler: async (request, reply) =>\n    api.handleRequest(\n      {\n        method: request.method,\n        path: request.url,\n        body: request.body,\n        query: request.query as NonNullable<Request["query"]>,\n        headers: request.headers as Request["headers"],\n      },\n      request,\n      reply\n    ),\n});\nawait fastify.listen({ port: 9000 });\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/anttiviljami/openapi-backend/tree/master/examples/fastify"},"See full Fastify example")))}c.isMDXComponent=!0}}]);