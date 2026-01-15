"use strict";exports.id=745,exports.ids=[745],exports.modules={2125:(e,t,a)=>{a.d(t,{Z:()=>createLucideIcon});var r=a(9885);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),toCamelCase=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase()),toPascalCase=e=>{let t=toCamelCase(e);return t.charAt(0).toUpperCase()+t.slice(1)},mergeClasses=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim(),hasA11yProp=e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:l="",children:d,iconNode:i,...c},h)=>(0,r.createElement)("svg",{ref:h,...s,width:t,height:t,stroke:e,strokeWidth:o?24*Number(a)/Number(t):a,className:mergeClasses("lucide",l),...!d&&!hasA11yProp(c)&&{"aria-hidden":"true"},...c},[...i.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(d)?d:[d]])),createLucideIcon=(e,t)=>{let a=(0,r.forwardRef)(({className:a,...s},l)=>(0,r.createElement)(o,{ref:l,iconNode:t,className:mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`,`lucide-${e}`,a),...s}));return a.displayName=toPascalCase(e),a}},169:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(2125);let s=(0,r.Z)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]])},132:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(2125);let s=(0,r.Z)("mic",[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]])},644:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(2125);let s=(0,r.Z)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]])},6206:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(2125);let s=(0,r.Z)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},784:(e,t,a)=>{e.exports=a(316).vendored["react-ssr"].ReactJsxRuntime}};