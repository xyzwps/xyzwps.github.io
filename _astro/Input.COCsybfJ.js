import{g as v}from"./_commonjsHelpers.CqkleIqs.js";var f={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c;function R(){if(c)return a;c=1;var o=Symbol.for("react.transitional.element"),u=Symbol.for("react.fragment");function t(s,n,r){var e=null;if(r!==void 0&&(e=""+r),n.key!==void 0&&(e=""+n.key),"key"in n){r={};for(var i in n)i!=="key"&&(r[i]=n[i])}else r=n;return n=r.ref,{$$typeof:o,type:s,key:e,ref:n!==void 0?n:null,props:r}}return a.Fragment=u,a.jsx=t,a.jsxs=t,a}var l;function h(){return l||(l=1,f.exports=R()),f.exports}var d=h(),p={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var x;function j(){return x||(x=1,function(o){(function(){var u={}.hasOwnProperty;function t(){for(var r="",e=0;e<arguments.length;e++){var i=arguments[e];i&&(r=n(r,s(i)))}return r}function s(r){if(typeof r=="string"||typeof r=="number")return r;if(typeof r!="object")return"";if(Array.isArray(r))return t.apply(null,r);if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]"))return r.toString();var e="";for(var i in r)u.call(r,i)&&r[i]&&(e=n(e,i));return e}function n(r,e){return e?r?r+" "+e:r+e:r}o.exports?(t.default=t,o.exports=t):window.classNames=t})()}(p)),p.exports}var E=j();const S=v(E),m=(o,u,t,s)=>S(t||"border","rounded outline-none",u==="sm"?"px-2":"px-4 py-2",s==="error"?"border-red-300":"border-indigo-300",s==="error"?"bg-red-50":null,"hover:ring-2",s==="error"?"hover:ring-red-200":"hover:ring-indigo-200",s==="error"?"hover:bg-red-50":"hover:bg-indigo-50","focus:ring-2 focus:bg-white",s==="error"?"focus:ring-red-400":"focus:ring-indigo-400",o);function g({className:o,size:u,noborder:t,varient:s,...n}){return d.jsx("input",{className:m(o,u,t,s),...n})}function _({className:o,size:u,noborder:t,...s}){return d.jsx("textarea",{className:m(o,u,t),...s})}export{g as I,_ as T,S as c,d as j};
