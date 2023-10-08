"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[7695],{4137:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(n),m=i,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:i,o[1]=p;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7857:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>l});var a=n(7462),i=(n(7294),n(4137));const r={sidebar_position:2},o="Using the client",p={unversionedId:"openapi-client-axios/usage",id:"openapi-client-axios/usage",title:"Using the client",description:"OpenAPI Client Axios uses operationIds",source:"@site/docs/openapi-client-axios/usage.md",sourceDirName:"openapi-client-axios",slug:"/openapi-client-axios/usage",permalink:"/docs/openapi-client-axios/usage",draft:!1,editUrl:"https://github.com/openapistack/docs/edit/main/docs/openapi-client-axios/usage.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Quick Start: Client",permalink:"/docs/openapi-client-axios/intro"},next:{title:"Typegen",permalink:"/docs/openapi-client-axios/typegen"}},s={},l=[{value:"Operation methods",id:"operation-methods",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Data",id:"data",level:3},{value:"Config object",id:"config-object",level:3},{value:"Paths Dictionary",id:"paths-dictionary",level:2}],c={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"using-the-client"},"Using the client"),(0,i.kt)("p",null,"OpenAPI Client Axios uses ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operation-object"},"operationIds"),"\nin OpenAPIv3 definitions to call API operations."),(0,i.kt)("p",null,"After initializing ",(0,i.kt)("inlineCode",{parentName:"p"},"OpenAPIClientAxios"),", an axios client instance extended with OpenAPI capabilities is exposed."),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'const api = new OpenAPIClientAxios({\n  definition: "https://example.com/api/openapi.json",\n});\napi.init().then((client) => {\n  client.updatePet(1, { age: 12 });\n});\n')),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"client")," is an ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/axios/axios#creating-an-instance"},"axios instance")," initialized with\nbaseURL from OpenAPI definitions and extended with extra operation methods for calling API operations."),(0,i.kt)("p",null,"It also has a reference to OpenAPIClientAxios at ",(0,i.kt)("inlineCode",{parentName:"p"},"client.api")),(0,i.kt)("h2",{id:"operation-methods"},"Operation methods"),(0,i.kt)("p",null,"OpenAPIClientAxios operation methods take 3 arguments:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"client.operationId(parameters?, data?, config?)\n")),(0,i.kt)("h3",{id:"parameters"},"Parameters"),(0,i.kt)("p",null,"The first argument is used to pass parameters available for the operation."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// GET /pets/{petId}\nclient.getPet({ petId: 1 });\n")),(0,i.kt)("p",null,"For syntactic sugar purposes, you can also specify a single implicit parameter value, in which case OpenAPIClientAxios\nwill look for the first required parameter for the operation. Usually this is will be a path parameter."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// GET /pets/{petId} - getPet\nclient.getPet(1);\n")),(0,i.kt)("p",null,"Alternatively, you can explicitly specify parameters in array form. This method allows you to set custom parameters not defined\nin the OpenAPI spec."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'// GET /pets?search=Garfield - searchPets\nclient.searchPets([{ name: "search", value: "Garfield", in: "query" }]);\n')),(0,i.kt)("p",null,"The type of the parameters can be any of:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"query"),(0,i.kt)("li",{parentName:"ul"},"header"),(0,i.kt)("li",{parentName:"ul"},"path"),(0,i.kt)("li",{parentName:"ul"},"cookie")),(0,i.kt)("h3",{id:"data"},"Data"),(0,i.kt)("p",null,"The second argument is used to pass the requestPayload"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'// PUT /pets/1 - updatePet\nclient.updatePet(1, { name: "Odie" });\n')),(0,i.kt)("p",null,"More complex payloads, such as Node.js streams or FormData supported by Axios can be used."),(0,i.kt)("p",null,"The first argument can be set to null if there are no parameters required for the operation."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'// POST /pets - createPet\nclient.updatePet(null, { name: "Garfield" });\n')),(0,i.kt)("h3",{id:"config-object"},"Config object"),(0,i.kt)("p",null,"The last argument is the config object."),(0,i.kt)("p",null,"The config object is an ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/axios/axios#request-config"},(0,i.kt)("inlineCode",{parentName:"a"},"AxiosRequestConfig"))," object. You can use it to\noverride axios request config parameters, such as ",(0,i.kt)("inlineCode",{parentName:"p"},"headers"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"timeout"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"withCredentials")," and many more."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'// POST /user - createUser\nclient.createUser(\n  null,\n  { user: "admin", pass: "123" },\n  { headers: { "x-api-key": "secret" } }\n);\n')),(0,i.kt)("h2",{id:"paths-dictionary"},"Paths Dictionary"),(0,i.kt)("p",null,"OpenAPI Client Axios also allows calling API operations via their path and HTTP\nmethod, using the paths dictionary."),(0,i.kt)("p",null,"Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'client.paths["/pets"].get(); // GET /pets, same as calling client.getPets()\nclient.paths["/pets"].post(); // POST /pets\nclient.paths["/pets/{petId}"].put(1); // PUT /pets/1\nclient.paths["/pets/{petId}/owner/{ownerId}"].get({ petId: 1, ownerId: 2 }); // GET /pets/1/owner/2\n')),(0,i.kt)("p",null,"This allows calling operation methods without using their operationIds, which\nmay be sometimes preferred."))}d.isMDXComponent=!0}}]);