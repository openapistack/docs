"use strict";(self.webpackChunkopenapi_stack=self.webpackChunkopenapi_stack||[]).push([[1513],{4137:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,f=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(f,p(p({ref:t},s),{},{components:n})):r.createElement(f,p({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,p=new Array(a);p[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[m]="string"==typeof e?e:o,p[1]=i;for(var l=2;l<a;l++)p[l]=n[l];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},431:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var r=n(7462),o=(n(7294),n(4137));const a={sidebar_position:4},p="Mock Server",i={unversionedId:"openapicmd/mock-server",id:"openapicmd/mock-server",title:"Mock Server",description:"To quickly spin up a local mock server for an openapi, use the mock command.",source:"@site/docs/openapicmd/mock-server.md",sourceDirName:"openapicmd",slug:"/openapicmd/mock-server",permalink:"/docs/openapicmd/mock-server",draft:!1,editUrl:"https://github.com/openapistack/docs/edit/main/docs/openapicmd/mock-server.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Call API operations",permalink:"/docs/openapicmd/call"},next:{title:".openapiconfig",permalink:"/docs/openapicmd/config"}},c={},l=[],s={toc:l},m="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"mock-server"},"Mock Server"),(0,o.kt)("p",null,"To quickly spin up a local mock server for an openapi, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"mock")," command."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"openapi mock ./openapi.yml\n\nMock server running at http://localhost:9000\nOpenAPI definition at http://localhost:9000/openapi.json\n")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"You can then use the ",(0,o.kt)("inlineCode",{parentName:"p"},"call")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"swagger-ui")," commands to test your mock API."),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre"},"npx openapi call http://localhost:9000/openapi.json\n"))))}u.isMDXComponent=!0}}]);