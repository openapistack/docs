"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[4995],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),m=s(n),u=i,k=m["".concat(l,".").concat(u)]||m[u]||d[u]||o;return n?a.createElement(k,p(p({ref:t},c),{},{components:n})):a.createElement(k,p({ref:t},c))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,p=new Array(o);p[0]=u;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r[m]="string"==typeof e?e:i,p[1]=r;for(var s=2;s<o;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2110:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var a=n(7462),i=(n(7294),n(4137));const o={title:"Invoking APIs",sidebar_position:2},p=void 0,r={unversionedId:"examples/calling-apis",id:"examples/calling-apis",title:"Invoking APIs",description:"In this example we will write code to interact with a public mock API available on example.openapistack.co/openapi.json",source:"@site/docs/examples/calling-apis.md",sourceDirName:"examples",slug:"/examples/calling-apis",permalink:"/docs/examples/calling-apis",draft:!1,editUrl:"https://github.com/openapistack/docs/edit/main/docs/examples/calling-apis.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Invoking APIs",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Building APIs",permalink:"/docs/examples/building-apis"},next:{title:"Use with React Query",permalink:"/docs/examples/tanstack-query"}},l={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Creating a client instace",id:"creating-a-client-instace",level:2},{value:"Adding Types",id:"adding-types",level:2},{value:"Invoking the API",id:"invoking-the-api",level:2},{value:"Full Example",id:"full-example",level:2}],c={toc:s},m="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"In this example we will write code to interact with a public mock API available on ",(0,i.kt)("a",{parentName:"p",href:"https://example.openapistack.co/openapi.json"},"example.openapistack.co/openapi.json"))),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"If you're looking to invoke APIs via CLI, see ",(0,i.kt)("a",{parentName:"p",href:"/docs/openapicmd/call/"},(0,i.kt)("inlineCode",{parentName:"a"},"openapicmd call")))),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Before starting, make sure to install ",(0,i.kt)("inlineCode",{parentName:"p"},"openapi-client-axios")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"axios")," as dependencies in your project:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"npm i openapi-client-axios axios\n")),(0,i.kt)("h2",{id:"creating-a-client-instace"},"Creating a client instace"),(0,i.kt)("p",null,"To call our API, we import ",(0,i.kt)("inlineCode",{parentName:"p"},"openapi-client-axios")," and configure it by passing the OpenAPI definition URL:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { OpenAPIClientAxios } from 'openapi-client-axios';\n\nconst api = new OpenAPIClientAxios({\n  definition: 'https://example.openapistack.co/openapi.json',\n});\n")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"For optimal performance, it's recommended to pass the definition as a JS object instead or fetching it from a URL in runtime.")),(0,i.kt)("p",null,"To initialise our client instance, we call ",(0,i.kt)("inlineCode",{parentName:"p"},"api.init()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const client = await api.init();\n")),(0,i.kt)("h2",{id:"adding-types"},"Adding Types"),(0,i.kt)("p",null,"For type-safety and code autocompletion we use the CLI command ",(0,i.kt)("inlineCode",{parentName:"p"},"openapicmd typegen")," to generate types."),(0,i.kt)("p",null,"This command will create a file named ",(0,i.kt)("inlineCode",{parentName:"p"},"openapi.d.ts")," in the src directory:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"npx openapicmd typegen https://example.openapistack.co/openapi.json > src/openapi.d.ts\n")),(0,i.kt)("p",null,"We can now import the types and use them to create our fully typed API client by passing the ",(0,i.kt)("inlineCode",{parentName:"p"},"Client")," type to our ",(0,i.kt)("inlineCode",{parentName:"p"},"init")," call."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import type { Client } from './openapi.d.ts';\n\nconst client = await api.init<Client>();\n")),(0,i.kt)("h2",{id:"invoking-the-api"},"Invoking the API"),(0,i.kt)("p",null,"Finally, we are ready to call our API using ",(0,i.kt)("a",{parentName:"p",href:"/docs/openapi-client-axios/usage/#operation-methods"},"operation methods")," based on our ",(0,i.kt)("inlineCode",{parentName:"p"},"openapi.yml")," spec:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const petsResponse = await client.getPets();\n\nconst pets = petsResponse.data; // Pet[] inferred as type as defined in the API\n")),(0,i.kt)("h2",{id:"full-example"},"Full Example"),(0,i.kt)("p",null,"Putting everything together, here is our full code example combining all the steps:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"// src/example.ts\nimport { OpenAPIClientAxios } from 'openapi-client-axios';\nimport type { Client } from './openapi.d.ts';\n\nconst api = new OpenAPIClientAxios({\n  definition: 'https://example.openapistack.co/openapi.json'\n});\n\nasync function main() {\n  const client = await api.init<Client>();\n\n  const petsResponse = await client.getPets();\n  const pets = petsResponse.data; // Pet[] inferred as type\n  console.log('getPets response', petsResponse.status, pets);\n}\nmain();\n")))}d.isMDXComponent=!0}}]);