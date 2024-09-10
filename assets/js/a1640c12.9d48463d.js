"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[5195],{4137:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=c(n),u=a,f=d["".concat(p,".").concat(u)]||d[u]||m[u]||i;return n?r.createElement(f,o(o({ref:t},l),{},{components:n})):r.createElement(f,o({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4651:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(7462),a=(n(7294),n(4137));const i={title:"Why API First?",hide_title:!0,sidebar_position:1},o="Why API First?",s={unversionedId:"api-first",id:"api-first",title:"Why API First?",description:"Schema First",source:"@site/docs/api-first.md",sourceDirName:".",slug:"/api-first",permalink:"/docs/api-first",draft:!1,editUrl:"https://github.com/openapistack/docs/edit/main/docs/api-first.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Why API First?",hide_title:!0,sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/intro"},next:{title:"Quick Start: Backend",permalink:"/docs/openapi-backend/intro"}},p={},c=[{value:"Schema First",id:"schema-first",level:2},{value:"Type Safety",id:"type-safety",level:2},{value:"Design First",id:"design-first",level:2}],l={toc:c},d="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"why-api-first"},"Why API First?"),(0,a.kt)("h2",{id:"schema-first"},"Schema First"),(0,a.kt)("p",null,"The core idea of ",(0,a.kt)("em",{parentName:"p"},"API First"),", sometimes referred to as ",(0,a.kt)("em",{parentName:"p"},"Schema First"),", is that software teams start by defining an API contract and use it as the single source of truth for data models in their application logic."),(0,a.kt)("p",null,"Teams using this approach define their API contracts using machine-readable specifications like ",(0,a.kt)("a",{parentName:"p",href:"https://www.openapis.org/"},"OpenAPI")," or ",(0,a.kt)("a",{parentName:"p",href:"https://graphql.org/"},"GraphQL"),", and leverage techniques like ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapicmd/typegen"},"Generating Types")," and ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapicmd/mock-server/"},"API Mocking")," to rapidly iterate the product and API design while making sure the implementation and documentation stay up to date with the API contract."),(0,a.kt)("p",null,"We do this to collaborate effectively on software design, making changes to the API schema when needed, using shared types and automated tests to ensure our implementation follows the API contract. ",(0,a.kt)("strong",{parentName:"p"},"This reduces bugs and allows teams to deliver continuously.")),(0,a.kt)("h2",{id:"type-safety"},"Type Safety"),(0,a.kt)("p",null,"Use of typed languages like TypeScript improve developer experience and reduce bugs by providing strict type checks and code autocomplete during development. This is especially powerful when types are shared and used across the stack in both backend implementation and client-side logic."),(0,a.kt)("p",null,"Given that the OpenAPI specification already leverages ",(0,a.kt)("a",{parentName:"p",href:"https://json-schema.org/"},"JSON Schema")," for defining data model types, these can be effortlessly translated into TypeScript types for coding use."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"OpenAPI Stack provides the ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapicmd/typegen/"},(0,a.kt)("inlineCode",{parentName:"a"},"openapi typegen"))," CLI command to generate types from OpenAPI schema, to keep your implementation up to date with the API contract.")),(0,a.kt)("h2",{id:"design-first"},"Design First"),(0,a.kt)("p",null,"Introducing ",(0,a.kt)("a",{parentName:"p",href:"/docs/openapicmd/mock-server/"},"API Mocking")," enables developers working on the application's frontend to develop the app against a mocked version of the backend which can be cheaply adjusted by fine-tuning the API schema. ",(0,a.kt)("strong",{parentName:"p"},"This means the frontend team is never blocked waiting for backend changes.")),(0,a.kt)("p",null,"For customer-centric agile teams, focusing on the user facing parts of the application first is a great way to rapidly prototype designs before investing into implementing backend logic."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Design First")," signifies that design drives the code, not the other way around."),(0,a.kt)("div",{className:"text-center"},(0,a.kt)("img",{alt:"API First Cycle",src:"/img/openapi-stack.drawio.png"})))}m.isMDXComponent=!0}}]);