(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{4444:function(e,t,n){"use strict";n.d(t,{BH:function(){return S},G6:function(){return m},L:function(){return u},LL:function(){return C},P0:function(){return T},Pz:function(){return k},Sg:function(){return x},ZR:function(){return _},aH:function(){return E},b$:function(){return f},eu:function(){return y},hl:function(){return g},m9:function(){return V},ne:function(){return P},pd:function(){return O},q4:function(){return b},ru:function(){return d},tV:function(){return l},uI:function(){return h},vZ:function(){return function e(t,n){if(t===n)return!0;let r=Object.keys(t),i=Object.keys(n);for(let s of r){if(!i.includes(s))return!1;let a=t[s],o=n[s];if(N(a)&&N(o)){if(!e(a,o))return!1}else if(a!==o)return!1}for(let u of i)if(!r.includes(u))return!1;return!0}},w1:function(){return p},xO:function(){return R},xb:function(){return D},z$:function(){return c},zd:function(){return L}});var r=n(3454);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let i=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):(64512&i)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let a=e[n++],o=e[n++],u=e[n++],l=((7&i)<<18|(63&a)<<12|(63&o)<<6|63&u)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(1023&l))}else{let c=e[n++],h=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&c)<<6|63&h)}}return t.join("")},a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let s=e[i],a=i+1<e.length,o=a?e[i+1]:0,u=i+2<e.length,l=u?e[i+2]:0,c=s>>2,h=(3&s)<<4|o>>4,d=(15&o)<<2|l>>6,f=63&l;u||(f=64,a||(d=64)),r.push(n[c],n[h],n[d],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let s=n[e.charAt(i++)],a=i<e.length,o=a?n[e.charAt(i)]:0;++i;let u=i<e.length,l=u?n[e.charAt(i)]:64;++i;let c=i<e.length,h=c?n[e.charAt(i)]:64;if(++i,null==s||null==o||null==l||null==h)throw Error();let d=s<<2|o>>4;if(r.push(d),64!==l){let f=o<<4&240|l>>2;if(r.push(f),64!==h){let p=l<<6&192|h;r.push(p)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},o=function(e){let t=i(e);return a.encodeByteArray(t,!0)},u=function(e){return o(e).replace(/\./g,"")},l=function(e){try{return a.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function c(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function h(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(c())}function d(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function f(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function p(){let e=c();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function m(){return!function(){try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(e){return!1}}()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function g(){return"object"==typeof indexedDB}function y(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(s){t(s)}})}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let v=()=>(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n.g)return n.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,$=()=>{if(void 0===r||void 0===r.env)return;let e=r.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},w=()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}let n=e&&l(e[1]);return n&&JSON.parse(n)},I=()=>{try{return v()||$()||w()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},b=e=>{var t,n;return null===(n=null===(t=I())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},T=e=>{let t=b(e);if(!t)return;let n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},E=()=>{var e;return null===(e=I())||void 0===e?void 0:e.config},k=e=>{var t;return null===(t=I())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class S{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function x(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[u(JSON.stringify({alg:"none",type:"JWT"})),u(JSON.stringify(s)),""].join(".")}class _ extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,_.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,C.prototype.create)}}class C{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){var n,r;let i=t[0]||{},s=`${this.service}/${e}`,a=this.errors[e],o=a?(n=a,r=i,n.replace(A,(e,t)=>{let n=r[t];return null!=n?String(n):`<${t}?>`})):"Error",u=`${this.serviceName}: ${o} (${s}).`,l=new _(s,u,i);return l}}let A=/\{\$([^}]+)}/g;function D(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function N(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function R(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function L(e){let t={},n=e.replace(/^\?/,"").split("&");return n.forEach(e=>{if(e){let[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function O(e){let t=e.indexOf("?");if(!t)return"";let n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function P(e,t){let n=new M(e,t);return n.subscribe.bind(n)}class M{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw Error("Missing Observer.");void 0===(r=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:n}:e).next&&(r.next=F),void 0===r.error&&(r.error=F),void 0===r.complete&&(r.complete=F);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){!this.finalized&&(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function F(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function V(e){return e&&e._delegate?e._delegate:e}},8006:function(e,t,n){"use strict";n.d(t,{w9:function(){return eL},hJ:function(){return eF},S$:function(){return em},Xb:function(){return eW},h8:function(){return eY},v0:function(){return ns},cx:function(){return tU},Aj:function(){return eZ},aF:function(){return e1},bc:function(){return tA},LS:function(){return eH},e5:function(){return e7},F6:function(){return tF},w7:function(){return eX},gQ:function(){return e4},ck:function(){return eQ}});var r=n(4444),i=n(5816),s=n(3333),a=n(655),o=n(8463);function u(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let l=u,c=new r.LL("auth","Firebase",u()),h=new s.Yd("@firebase/auth");function d(e,...t){h.logLevel<=s.in.ERROR&&h.error(`Auth (${i.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function f(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function m(e,t,n){let i=Object.assign(Object.assign({},l()),{[t]:n}),s=new r.LL("auth","Firebase",i);return s.create(t,{appName:e.name})}function g(e,t,n){let r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&f(e,"argument-error"),m(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function y(e,...t){if("string"!=typeof e){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return c.create(e,...t)}function v(e,t,...n){if(!e)throw y(t,...n)}function $(e){let t="INTERNAL ASSERTION FAILED: "+e;throw d(t),Error(t)}function w(e,t){e||$(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let I=new Map;function b(e){w(e instanceof Function,"Expected a class definition");let t=I.get(e);return t?(w(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,I.set(e,t),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function T(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function E(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class k{constructor(e,t){this.shortDelay=e,this.longDelay=t,w(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,r.uI)()||(0,r.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===E()||"https:"===E()||(0,r.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function S(e,t){w(e.emulator,"Emulator should always be set here");let{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class x{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void $("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void $("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void $("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let _={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"},C=new k(3e4,6e4);function A(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function D(e,t,n,i,s={}){return N(e,s,async()=>{let s={},a={};i&&("GET"===t?a=i:s={body:JSON.stringify(i)});let o=(0,r.xO)(Object.assign({key:e.config.apiKey},a)).slice(1),u=await e._getAdditionalHeaders();return u["Content-Type"]="application/json",e.languageCode&&(u["X-Firebase-Locale"]=e.languageCode),x.fetch()(L(e,e.config.apiHost,n,o),Object.assign({method:t,headers:u,referrerPolicy:"no-referrer"},s))})}async function N(e,t,n){e._canInitEmulator=!1;let i=Object.assign(Object.assign({},_),t);try{let s=new O(e),a=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();let o=await a.json();if("needConfirmation"in o)throw P(e,"account-exists-with-different-credential",o);if(a.ok&&!("errorMessage"in o))return o;{let u=a.ok?o.errorMessage:o.error.message,[l,c]=u.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===l)throw P(e,"credential-already-in-use",o);if("EMAIL_EXISTS"===l)throw P(e,"email-already-in-use",o);if("USER_DISABLED"===l)throw P(e,"user-disabled",o);let h=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw m(e,h,c);f(e,h)}}catch(d){if(d instanceof r.ZR)throw d;f(e,"network-request-failed")}}async function R(e,t,n,r,i={}){let s=await D(e,t,n,r,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}function L(e,t,n,r){let i=`${t}${n}?${r}`;return e.config.emulator?S(e.config,i):`${e.config.apiScheme}://${i}`}class O{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(p(this.auth,"network-request-failed")),C.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function P(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=p(e,t,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function M(e,t){return D(e,"POST","/v1/accounts:delete",t)}async function F(e,t){return D(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function V(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(n){}}async function U(e,t=!1){let n=(0,r.m9)(e),i=await n.getIdToken(t),s=B(i);v(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");let a="object"==typeof s.firebase?s.firebase:void 0,o=null==a?void 0:a.sign_in_provider;return{claims:s,token:i,authTime:V(q(s.auth_time)),issuedAtTime:V(q(s.iat)),expirationTime:V(q(s.exp)),signInProvider:o||null,signInSecondFactor:(null==a?void 0:a.sign_in_second_factor)||null}}function q(e){return 1e3*Number(e)}function B(e){var t;let[n,i,s]=e.split(".");if(void 0===n||void 0===i||void 0===s)return d("JWT malformed, contained fewer than 3 sections"),null;try{let a=(0,r.tV)(i);if(!a)return d("Failed to decode base64 JWT payload"),null;return JSON.parse(a)}catch(o){return d("Caught error parsing JWT payload as JSON",null===(t=o)||void 0===t?void 0:t.toString()),null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function j(e,t,n=!1){if(n)return t;try{return await t}catch(i){throw i instanceof r.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(i)&&e.auth.currentUser===e&&await e.auth.signOut(),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class G{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=V(this.lastLoginAt),this.creationTime=V(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function z(e){var t,n;let r=e.auth,i=await e.getIdToken(),s=await j(e,F(r,{idToken:i}));v(null==s?void 0:s.users.length,r,"internal-error");let o=s.users[0];e._notifyReloadListener(o);let u=(null===(t=o.providerUserInfo)||void 0===t?void 0:t.length)?(n=o.providerUserInfo,n.map(e=>{var{providerId:t}=e,n=(0,a.__rest)(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[],l=function(e,t){let n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}(e.providerData,u),c=e.isAnonymous,h=!(e.email&&o.passwordHash)&&!(null==l?void 0:l.length),d={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new G(o.createdAt,o.lastLoginAt),isAnonymous:!!c&&h};Object.assign(e,d)}async function K(e){let t=(0,r.m9)(e);await z(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function H(e,t){let n=await N(e,{},async()=>{let n=(0,r.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,a=L(e,i,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",x.fetch()(a,{method:"POST",headers:o,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class W{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(void 0!==e.idToken,"internal-error"),v(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){let t=B(e);return v(t,"internal-error"),v(void 0!==t.exp,"internal-error"),v(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return(v(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired)?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await H(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){let{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new W;return n&&(v("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(v("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(v("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new W,this.toJSON())}_performRefresh(){return $("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Q(e,t){v("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Z{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=(0,a.__rest)(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){!this.isRunning&&(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let n=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),n}{this.errorBackoff=3e4;let r=null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0,i=r-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){var e;try{await this.user.getIdToken(!0)}catch(t){(null===(e=t)||void 0===e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new G(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await j(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return U(this,e)}reload(){return K(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new Z(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await z(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await j(this,M(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,a,o,u,l;let c=null!==(n=t.displayName)&&void 0!==n?n:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(a=t.tenantId)&&void 0!==a?a:void 0,m=null!==(o=t._redirectEventId)&&void 0!==o?o:void 0,g=null!==(u=t.createdAt)&&void 0!==u?u:void 0,y=null!==(l=t.lastLoginAt)&&void 0!==l?l:void 0,{uid:$,emailVerified:w,isAnonymous:I,providerData:b,stsTokenManager:T}=t;v($&&T,e,"internal-error");let E=W.fromJSON(this.name,T);v("string"==typeof $,e,"internal-error"),Q(c,e.name),Q(h,e.name),v("boolean"==typeof w,e,"internal-error"),v("boolean"==typeof I,e,"internal-error"),Q(d,e.name),Q(f,e.name),Q(p,e.name),Q(m,e.name),Q(g,e.name),Q(y,e.name);let k=new Z({uid:$,auth:e,email:h,emailVerified:w,displayName:c,isAnonymous:I,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:E,createdAt:g,lastLoginAt:y});return b&&Array.isArray(b)&&(k.providerData=b.map(e=>Object.assign({},e))),m&&(k._redirectEventId=m),k}static async _fromIdTokenResponse(e,t,n=!1){let r=new W;r.updateFromServerResponse(t);let i=new Z({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await z(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class X{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}X.type="NONE";let Y=X;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function J(e,t,n){return`firebase:${e}:${t}:${n}`}class ee{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=J(this.userKey,r.apiKey,i),this.fullPersistenceKey=J("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Z._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new ee(b(Y),e,n);let r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=r[0]||b(Y),s=J(n,e.config.apiKey,e.name),a=null;for(let o of t)try{let u=await o._get(s);if(u){let l=Z._fromJSON(e,u);o!==i&&(a=l),i=o;break}}catch(c){}let h=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&h.length&&(i=h[0],a&&await i._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(t){}}))),new ee(i,e,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function et(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(es(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(en(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(eo(t))return"Blackberry";if(eu(t))return"Webos";if(er(t))return"Safari";if((t.includes("chrome/")||ei(t))&&!t.includes("edge/"))return"Chrome";if(ea(t))return"Android";let n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==n?void 0:n.length)===2)return n[1]}return"Other"}function en(e=(0,r.z$)()){return/firefox\//i.test(e)}function er(e=(0,r.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ei(e=(0,r.z$)()){return/crios\//i.test(e)}function es(e=(0,r.z$)()){return/iemobile/i.test(e)}function ea(e=(0,r.z$)()){return/android/i.test(e)}function eo(e=(0,r.z$)()){return/blackberry/i.test(e)}function eu(e=(0,r.z$)()){return/webos/i.test(e)}function el(e=(0,r.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function ec(e=(0,r.z$)()){return el(e)||ea(e)||eu(e)||eo(e)||/windows phone/i.test(e)||es(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function eh(e,t=[]){let n;switch(e){case"Browser":n=et((0,r.z$)());break;case"Worker":n=`${et((0,r.z$)())}-${e}`;break;default:n=e}let s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${i.Jn}/${s}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ed{constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ep(this),this.idTokenSubscription=new ep(this),this.beforeStateQueue=new /**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{let i=e(t);n(i)}catch(s){r(s)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e)return;let n=[];try{for(let r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(i){for(let s of(n.reverse(),n))try{s()}catch(a){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null===(t=i)||void 0===t?void 0:t.message})}}}(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=c,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=b(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await ee.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let n=await this.assertedPersistence.getCurrentUser(),r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let s=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,a=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===a)&&(null==o?void 0:o.user)&&(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(u){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(u))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){var t;try{await z(e)}catch(n){if((null===(t=n)||void 0===t?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?(0,r.m9)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(b(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new r.LL("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&b(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await ee.create(this,[b(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=this._isInitialized?Promise.resolve():this._initializationPromise;return(v(s,this,"internal-error"),s.then(()=>i(this.currentUser)),"function"==typeof t)?e.addObserver(t,n,r):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!(!e||this.frameworks.includes(e))&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}}function ef(e){return(0,r.m9)(e)}class ep{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,r.ne)(e=>this.observer=e)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function em(e,t,n){let r=ef(e);v(r._canInitEmulator,r,"emulator-config-failed"),v(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");let i=!!(null==n?void 0:n.disableWarnings),s=eg(t),{host:a,port:o}=function(e){let t=eg(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};let r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:ey(r.substr(s.length+1))}}{let[a,o]=r.split(":");return{host:a,port:ey(o)}}}(t),u=null===o?"":`:${o}`;r.config.emulator={url:`${s}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}function eg(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function ey(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ev{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return $("not implemented")}_getIdTokenResponse(e){return $("not implemented")}_linkToIdToken(e,t){return $("not implemented")}_getReauthenticationResolver(e){return $("not implemented")}}async function e$(e,t){return D(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ew(e,t){return R(e,"POST","/v1/accounts:signInWithPassword",A(e,t))}async function eI(e,t){return D(e,"POST","/v1/accounts:sendOobCode",A(e,t))}async function eb(e,t){return eI(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function e8(e,t){return R(e,"POST","/v1/accounts:signInWithEmailLink",A(e,t))}async function eT(e,t){return R(e,"POST","/v1/accounts:signInWithEmailLink",A(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eE extends ev{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new eE(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new eE(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return ew(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return e8(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return e$(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return eT(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ek(e,t){return R(e,"POST","/v1/accounts:signInWithIdp",A(e,t))}class eS extends ev{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new eS(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=(0,a.__rest)(t,["providerId","signInMethod"]);if(!n||!r)return null;let s=new eS(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){let t=this.buildRequest();return ek(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,ek(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ek(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,r.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ex(e,t){return D(e,"POST","/v1/accounts:sendVerificationCode",A(e,t))}async function e_(e,t){return R(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,t))}async function eC(e,t){let n=await R(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,t));if(n.temporaryProof)throw P(e,"account-exists-with-different-credential",n);return n}let eA={USER_NOT_FOUND:"user-not-found"};async function eD(e,t){let n=Object.assign(Object.assign({},t),{operation:"REAUTH"});return R(e,"POST","/v1/accounts:signInWithPhoneNumber",A(e,n),eA)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eN extends ev{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new eN({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new eN({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return e_(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return eC(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return eD(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new eN({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class eR{constructor(e){var t,n,i,s,a,o;let u=(0,r.zd)((0,r.pd)(e)),l=null!==(t=u.apiKey)&&void 0!==t?t:null,c=null!==(n=u.oobCode)&&void 0!==n?n:null,h=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(i=u.mode)&&void 0!==i?i:null);v(l&&c&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=c,this.continueUrl=null!==(s=u.continueUrl)&&void 0!==s?s:null,this.languageCode=null!==(a=u.languageCode)&&void 0!==a?a:null,this.tenantId=null!==(o=u.tenantId)&&void 0!==o?o:null}static parseLink(e){let t=function(e){let t=(0,r.zd)((0,r.pd)(e)).link,n=t?(0,r.zd)((0,r.pd)(t)).deep_link_id:null,i=(0,r.zd)((0,r.pd)(e)).deep_link_id,s=i?(0,r.zd)((0,r.pd)(i)).link:null;return s||i||n||t||e}(e);try{return new eR(t)}catch(n){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eL{constructor(){this.providerId=eL.PROVIDER_ID}static credential(e,t){return eE._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=eR.parseLink(t);return v(n,"argument-error"),eE._fromEmailAndCode(e,n.code,n.tenantId)}}eL.PROVIDER_ID="password",eL.EMAIL_PASSWORD_SIGN_IN_METHOD="password",eL.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eO{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eP extends eO{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eM extends eP{constructor(){super("facebook.com")}static credential(e){return eS._fromParams({providerId:eM.PROVIDER_ID,signInMethod:eM.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eM.credentialFromTaggedObject(e)}static credentialFromError(e){return eM.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eM.credential(e.oauthAccessToken)}catch(t){return null}}}eM.FACEBOOK_SIGN_IN_METHOD="facebook.com",eM.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eF extends eP{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return eS._fromParams({providerId:eF.PROVIDER_ID,signInMethod:eF.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return eF.credentialFromTaggedObject(e)}static credentialFromError(e){return eF.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return eF.credential(t,n)}catch(r){return null}}}eF.GOOGLE_SIGN_IN_METHOD="google.com",eF.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eV extends eP{constructor(){super("github.com")}static credential(e){return eS._fromParams({providerId:eV.PROVIDER_ID,signInMethod:eV.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return eV.credentialFromTaggedObject(e)}static credentialFromError(e){return eV.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return eV.credential(e.oauthAccessToken)}catch(t){return null}}}eV.GITHUB_SIGN_IN_METHOD="github.com",eV.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eU extends eP{constructor(){super("twitter.com")}static credential(e,t){return eS._fromParams({providerId:eU.PROVIDER_ID,signInMethod:eU.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return eU.credentialFromTaggedObject(e)}static credentialFromError(e){return eU.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return eU.credential(t,n)}catch(r){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function eq(e,t){return R(e,"POST","/v1/accounts:signUp",A(e,t))}eU.TWITTER_SIGN_IN_METHOD="twitter.com",eU.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eB{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){let i=await Z._fromIdTokenResponse(e,n,r),s=e0(n),a=new eB({user:i,providerId:s,_tokenResponse:n,operationType:t});return a}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);let r=e0(n);return new eB({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function e0(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class e9 extends r.ZR{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,e9.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new e9(e,t,n,r)}}function ej(e,t,n,r){let i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw e9._fromErrorAndOperation(e,n,t,r);throw n})}async function eG(e,t,n=!1){let r=await j(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return eB._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ez(e,t,n=!1){var r;let{auth:i}=e,s="reauthenticate";try{let a=await j(e,ej(i,s,t,e),n);v(a.idToken,i,"internal-error");let o=B(a.idToken);v(o,i,"internal-error");let{sub:u}=o;return v(e.uid===u,i,"user-mismatch"),eB._forOperation(e,s,a)}catch(l){throw(null===(r=l)||void 0===r?void 0:r.code)==="auth/user-not-found"&&f(i,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function e2(e,t,n=!1){let r="signIn",i=await ej(e,r,t),s=await eB._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}async function eK(e,t){return e2(ef(e),t)}async function e1(e,t){return ez((0,r.m9)(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function eH(e,t,n){let i=(0,r.m9)(e),s={requestType:"PASSWORD_RESET",email:t};if(n){var a,o,u,l;a=i,o=s,v((null===(l=(u=n).url)||void 0===l?void 0:l.length)>0,a,"invalid-continue-uri"),v(void 0===u.dynamicLinkDomain||u.dynamicLinkDomain.length>0,a,"invalid-dynamic-link-domain"),o.continueUrl=u.url,o.dynamicLinkDomain=u.dynamicLinkDomain,o.canHandleCodeInApp=u.handleCodeInApp,u.iOS&&(v(u.iOS.bundleId.length>0,a,"missing-ios-bundle-id"),o.iOSBundleId=u.iOS.bundleId),u.android&&(v(u.android.packageName.length>0,a,"missing-android-pkg-name"),o.androidInstallApp=u.android.installApp,o.androidMinimumVersionCode=u.android.minimumVersion,o.androidPackageName=u.android.packageName)}await eb(i,s)}async function eW(e,t,n){let r=ef(e),i=await eq(r,{returnSecureToken:!0,email:t,password:n}),s=await eB._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(s.user),s}function e7(e,t,n){return eK((0,r.m9)(e),eL.credential(t,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function e3(e,t){return D(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function eQ(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;let i=(0,r.m9)(e),s=await i.getIdToken(),a=await j(i,e3(i.auth,{idToken:s,displayName:t,photoUrl:n,returnSecureToken:!0}));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;let o=i.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=i.displayName,o.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function e4(e,t){return e6((0,r.m9)(e),null,t)}async function e6(e,t,n){let{auth:r}=e,i=await e.getIdToken(),s={idToken:i,returnSecureToken:!0};t&&(s.email=t),n&&(s.password=n);let a=await j(e,e$(r,s));await e._updateTokensIfNecessary(a,!0)}function eZ(e,t,n,i){return(0,r.m9)(e).onAuthStateChanged(t,n,i)}function eX(e){return(0,r.m9)(e).signOut()}async function eY(e){return(0,r.m9)(e).delete()}new WeakMap;let e5="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eJ{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(e5,"1"),this.storage.removeItem(e5),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class te extends eJ{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(){let e=(0,r.z$)();return er(e)||el(e)}()&&function(){try{return!!(window&&window!==window.top)}catch(e){return!1}}(),this.fallbackToPolling=ec(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let i=this.storage.getItem(n);if(e.newValue!==i)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}let s=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},a=this.storage.getItem(n);(0,r.w1)()&&10===document.documentMode&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}te.type="LOCAL";let tt=te;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tn extends eJ{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tn.type="SESSION";let tr=tn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ti{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let n=new ti(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){var t;let n=e,{eventId:r,eventType:i,data:s}=n.data,a=this.handlersMap[i];if(!(null==a?void 0:a.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let o=Array.from(a).map(async e=>e(n.origin,s)),u=await Promise.all((t=o).map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(n){return{fulfilled:!1,reason:n}}}));n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ts(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}ti.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ta{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw Error("connection_unavailable");let i,s;return new Promise((a,o)=>{let u=ts("",20);r.port1.start();let l=setTimeout(()=>{o(Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){let t=e;if(t.data.eventId===u)switch(t.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(t.data.response);break;default:clearTimeout(l),clearTimeout(i),o(Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function to(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tu(){return void 0!==to().WorkerGlobalScope&&"function"==typeof to().importScripts}async function tl(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{let e=await navigator.serviceWorker.ready;return e.active}catch(t){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let tc="firebaseLocalStorageDb",th="firebaseLocalStorage",td="fbase_key";class tf{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tp(e,t){return e.transaction([th],t?"readwrite":"readonly").objectStore(th)}function tm(){let e=indexedDB.open(tc,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(th,{keyPath:td})}catch(r){n(r)}}),e.addEventListener("success",async()=>{let n=e.result;n.objectStoreNames.contains(th)?t(n):(n.close(),await function(){let e=indexedDB.deleteDatabase(tc);return new tf(e).toPromise()}(),t(await tm()))})})}async function tg(e,t,n){let r=tp(e,!0).put({[td]:t,value:n});return new tf(r).toPromise()}async function ty(e,t){let n=tp(e,!1).get(t),r=await new tf(n).toPromise();return void 0===r?null:r.value}function tv(e,t){let n=tp(e,!0).delete(t);return new tf(n).toPromise()}class t${constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await tm()),this.db}async _withRetries(e){let t=0;for(;;)try{let n=await this._openDb();return await e(n)}catch(r){if(t++>3)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ti._getInstance(tu()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>{let n=await this._poll();return{keyProcessed:n.includes(t.key)}}),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tl(),!this.activeServiceWorker)return;this.sender=new ta(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(n){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await tm();return await tg(e,e5,"1"),await tv(e,e5),!0}catch(t){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>tg(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>ty(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tv(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>{let t=tp(e,!1).getAll();return new tf(t).toPromise()});if(!e||0!==this.pendingWrites)return[];let t=[],n=new Set;for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}t$.type="LOCAL";let tw=t$;function tI(e){return`__${e}${Math.floor(1e6*Math.random())}`}async function tb(e,t,n){var r,i,s,a,o;let u=await n.verify();try{v("string"==typeof u,e,"argument-error"),v("recaptcha"===n.type,e,"argument-error");let l;if(l="string"==typeof t?{phoneNumber:t}:t,"session"in l){let c=l.session;if("phoneNumber"in l){v("enroll"===c.type,e,"internal-error");let h=await (i=e,s={idToken:c.credential,phoneEnrollmentInfo:{phoneNumber:l.phoneNumber,recaptchaToken:u}},D(i,"POST","/v2/accounts/mfaEnrollment:start",A(i,s)));return h.phoneSessionInfo.sessionInfo}{v("signin"===c.type,e,"internal-error");let d=(null===(r=l.multiFactorHint)||void 0===r?void 0:r.uid)||l.multiFactorUid;v(d,e,"missing-multi-factor-info");let f=await (a=e,o={mfaPendingCredential:c.credential,mfaEnrollmentId:d,phoneSignInInfo:{recaptchaToken:u}},D(a,"POST","/v2/accounts/mfaSignIn:start",A(a,o)));return f.phoneResponseInfo.sessionInfo}}{let{sessionInfo:p}=await ex(e,{phoneNumber:l.phoneNumber,recaptchaToken:u});return p}}finally{n._reset()}}tI("rcb"),new k(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class t8{constructor(e){this.providerId=t8.PROVIDER_ID,this.auth=ef(e)}verifyPhoneNumber(e,t){return tb(this.auth,e,(0,r.m9)(t))}static credential(e,t){return eN._fromVerification(e,t)}static credentialFromResult(e){return t8.credentialFromTaggedObject(e)}static credentialFromError(e){return t8.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?eN._fromTokenResponse(t,n):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tT(e,t){return t?b(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}t8.PROVIDER_ID="phone",t8.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tE extends ev{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ek(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ek(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ek(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tk(e){return e2(e.auth,new tE(e),e.bypassAuthState)}function tS(e){let{auth:t,user:n}=e;return v(n,t,"internal-error"),ez(n,new tE(e),e.bypassAuthState)}async function tx(e){let{auth:t,user:n}=e;return v(n,t,"internal-error"),eG(n,new tE(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class t_{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tk;case"linkViaPopup":case"linkViaRedirect":return tx;case"reauthViaPopup":case"reauthViaRedirect":return tS;default:f(this.auth,"internal-error")}}resolve(e){w(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){w(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let tC=new k(2e3,1e4);async function tA(e,t,n){let i=(0,r.m9)(e);g(i.auth,t,eO);let s=tT(i.auth,n),a=new tD(i.auth,"reauthViaPopup",t,s,i);return a.executeNotNull()}class tD extends t_{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,tD.currentPopupAction&&tD.currentPopupAction.cancel(),tD.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){w(1===this.filter.length,"Popup operations only handle one event");let e=ts();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,tD.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,tC.get())};e()}}tD.currentPopupAction=null;let tN=new Map;class tR extends t_{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=tN.get(this.auth._key());if(!e){try{let t=await tL(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(r){e=()=>Promise.reject(r)}tN.set(this.auth._key(),e)}return this.bypassAuthState||tN.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tL(e,t){let n=tM(t),r=tP(e);if(!await r._isAvailable())return!1;let i=await r._get(n)==="true";return await r._remove(n),i}async function tO(e,t){return tP(e)._set(tM(t),"true")}function tP(e){return b(e._redirectPersistence)}function tM(e){return J("pendingRedirect",e.config.apiKey,e.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tF(e,t,n){return tV(e,t,n)}async function tV(e,t,n){let r=ef(e);g(e,t,eO);let i=tT(r,n);return await tO(i,r),i._openRedirect(r,t,"signInViaRedirect")}async function tU(e,t){return await ef(e)._initializationPromise,tq(e,t,!1)}async function tq(e,t,n=!1){let r=ef(e),i=tT(r,t),s=new tR(r,i,n),a=await s.execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,t)),a}class tB{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return t9(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!t9(e)){let r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(p(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(t0(e))}saveEventToCache(e){this.cachedEventUids.add(t0(e)),this.lastProcessedEventTime=Date.now()}}function t0(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function t9({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function tj(e,t={}){return D(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let tG=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tz=/^https?/;async function t2(e){if(e.config.emulator)return;let{authorizedDomains:t}=await tj(e);for(let n of t)try{if(tK(n))return}catch(r){}f(e,"unauthorized-domain")}function tK(e){let t=T(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!tz.test(n))return!1;if(tG.test(e))return r===e;let s=e.replace(/\./g,"\\."),a=RegExp("^(.+\\."+s+"|"+s+")$","i");return a.test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let t1=new k(3e4,6e4);function tH(){let e=to().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}let tW=null,t7=new k(5e3,15e3),t3={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tQ=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function t4(e){var t,n;let s=await (t=e,tW=tW||(n=t,new Promise((e,t)=>{var r,i,s,a;function o(){tH(),gapi.load("gapi.iframes",{callback(){e(gapi.iframes.getContext())},ontimeout(){tH(),t(p(n,"network-request-failed"))},timeout:t1.get()})}if(null===(i=null===(r=to().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)e(gapi.iframes.getContext());else if(null===(s=to().gapi)||void 0===s?void 0:s.load)o();else{let u=tI("iframefcb");return to()[u]=()=>{gapi.load?o():t(p(n,"network-request-failed"))},(a=`https://apis.google.com/js/api.js?onload=${u}`,new Promise((e,t)=>{var n,r;let i=document.createElement("script");i.setAttribute("src",a),i.onload=e,i.onerror=e=>{let n=p("internal-error");n.customData=e,t(n)},i.type="text/javascript",i.charset="UTF-8",(null!==(r=null===(n=document.getElementsByTagName("head"))||void 0===n?void 0:n[0])&&void 0!==r?r:document).appendChild(i)})).catch(e=>t(e))}}).catch(e=>{throw tW=null,e}))),a=to().gapi;return v(a,e,"internal-error"),s.open({where:document.body,url:function(e){let t=e.config;v(t.authDomain,e,"auth-domain-config-required");let n=t.emulator?S(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:i.Jn},a=tQ.get(e.config.apiHost);a&&(s.eid=a);let o=e._getFrameworks();return o.length&&(s.fw=o.join(",")),`${n}?${(0,r.xO)(s).slice(1)}`}(e),messageHandlersFilter:a.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:t3,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=p(e,"network-request-failed"),s=to().setTimeout(()=>{r(i)},t7.get());function a(){to().clearTimeout(s),n(t)}t.ping(a).then(a,()=>{r(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let t6={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class tZ{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function tX(e,t,n,s,a,o){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");let u={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:i.Jn,eventId:a};if(t instanceof eO)for(let[l,c]of(t.setDefaultLanguage(e.languageCode),u.providerId=t.providerId||"",(0,r.xb)(t.getCustomParameters())||(u.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))u[l]=c;if(t instanceof eP){let h=t.getScopes().filter(e=>""!==e);h.length>0&&(u.scopes=h.join(","))}e.tenantId&&(u.tid=e.tenantId);let d=u;for(let f of Object.keys(d))void 0===d[f]&&delete d[f];return`${function({config:e}){return e.emulator?S(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,r.xO)(d).slice(1)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let tY="webStorageSupport",t5=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=tr,this._completeRedirectFn=tq,this._overrideRedirectResult=function(e,t){tN.set(e._key(),t)}}async _openPopup(e,t,n,i){var s;w(null===(s=this.eventManagers[e._key()])||void 0===s?void 0:s.manager,"_initialize() not called before _openPopup()");let a=tX(e,t,n,T(),i);return function(e,t,n,i=500,s=600){let a=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString(),u="",l=Object.assign(Object.assign({},t6),{width:i.toString(),height:s.toString(),top:a,left:o}),c=(0,r.z$)().toLowerCase();n&&(u=ei(c)?"_blank":n),en(c)&&(t=t||"http://localhost",l.scrollbars="yes");let h=Object.entries(l).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=(0,r.z$)()){var t;return el(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(c)&&"_self"!==u)return function(e,t){let n=document.createElement("a");n.href=e,n.target=t;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",u),new tZ(null);let d=window.open(t||"",u,h);v(d,e,"popup-blocked");try{d.focus()}catch(f){}return new tZ(d)}(e,a,ts())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=tX(e,t,n,T(),r),to().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:n,promise:r}=this.eventManagers[t];return n?Promise.resolve(n):(w(r,"If manager is not set, promise should be"),r)}let i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){let t=await t4(e),n=new tB(e);return t.register("authEvent",t=>{v(null==t?void 0:t.authEvent,e,"invalid-auth-event");let r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){let n=this.iframes[e._key()];n.send(tY,{type:tY},n=>{var r;let i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[tY];void 0!==i&&t(!!i),f(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=t2(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ec()||er()||el()}};var tJ="@firebase/auth",ne="0.20.11";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nt{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;let t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let nn=(0,r.Pz)("authIdTokenMaxAge")||300,nr=null,ni=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>nn)return;let i=null==n?void 0:n.token;nr!==i&&(nr=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ns(e=(0,i.Mq)()){let t=(0,i.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e,t){let n=(0,i.qX)(e,"auth");if(n.isInitialized()){let s=n.getImmediate(),a=n.getOptions();if((0,r.vZ)(a,null!=t?t:{}))return s;f(s,"already-initialized")}let o=n.initialize({options:t});return o}(e,{popupRedirectResolver:t5,persistence:[tw,tt,tr]}),s=(0,r.Pz)("authTokenSyncURL");if(s){var a,o,u,l,c;let h=ni(s);a=n,o=h,u=()=>h(n.currentUser),(0,r.m9)(a).beforeAuthStateChanged(o,u),l=n,c=e=>h(e),(0,r.m9)(l).onIdTokenChanged(c,void 0,void 0)}let d=(0,r.q4)("auth");return d&&em(n,`http://${d}`),n}var na="Browser";(0,i.Xd)(new o.wA("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),{apiKey:i,authDomain:s}=n.options;return((e,n)=>{v(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),v(!(null==s?void 0:s.includes(":")),"argument-error",{appName:e.name});let r={apiKey:i,authDomain:s,clientPlatform:na,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eh(na)},a=new ed(e,n,r);return function(e,t){let n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(b);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(a,t),a})(n,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{let r=e.getProvider("auth-internal");r.initialize()})),(0,i.Xd)(new o.wA("auth-internal",e=>{var t;let n=ef(e.getProvider("auth").getImmediate());return t=n,new nt(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),(0,i.KN)(tJ,ne,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(na)),(0,i.KN)(tJ,ne,"esm2017")},5321:function(e,t,n){"use strict";n.r(t),n.d(t,{AbstractUserDataWriter:function(){return hB},AggregateField:function(){return cg},AggregateQuerySnapshot:function(){return cy},Bytes:function(){return cW},CACHE_SIZE_UNLIMITED:function(){return cO},CollectionReference:function(){return co},DocumentReference:function(){return cs},DocumentSnapshot:function(){return hG},FieldPath:function(){return c7},FieldValue:function(){return cQ},Firestore:function(){return cP},FirestoreError:function(){return n3},GeoPoint:function(){return c4},LoadBundleTask:function(){return cL},Query:function(){return ca},QueryConstraint:function(){return hT},QueryDocumentSnapshot:function(){return hz},QuerySnapshot:function(){return h2},SnapshotMetadata:function(){return hj},Timestamp:function(){return ro},Transaction:function(){return du},WriteBatch:function(){return ds},_DatabaseId:function(){return rX},_DocumentKey:function(){return rf},_EmptyAppCheckTokenProvider:function(){return rt},_EmptyAuthCredentialsProvider:function(){return n6},_FieldPath:function(){return rd},_cast:function(){return lJ},_debugAssert:function(){return nW},_isBase64Available:function(){return r1},_logWarn:function(){return nK},_validateIsNotUsedTogether:function(){return lZ},addDoc:function(){return hY},aggregateQuerySnapshotEqual:function(){return dn},arrayRemove:function(){return df},arrayUnion:function(){return dd},clearIndexedDbPersistence:function(){return c9},collection:function(){return cu},collectionGroup:function(){return cl},connectFirestoreEmulator:function(){return ci},deleteDoc:function(){return hX},deleteField:function(){return dc},disableNetwork:function(){return cz},doc:function(){return cc},documentId:function(){return c3},enableIndexedDbPersistence:function(){return cq},enableMultiTabIndexedDbPersistence:function(){return cB},enableNetwork:function(){return cG},endAt:function(){return hM},endBefore:function(){return hP},ensureFirestoreConfigured:function(){return cV},executeWrite:function(){return de},getCountFromServer:function(){return dr},getDoc:function(){return h1},getDocFromCache:function(){return hW},getDocFromServer:function(){return h7},getDocs:function(){return h3},getDocsFromCache:function(){return hQ},getDocsFromServer:function(){return h4},getFirestore:function(){return cF},increment:function(){return dp},initializeFirestore:function(){return cM},limit:function(){return hA},limitToLast:function(){return hD},loadBundle:function(){return cK},namedQuery:function(){return c1},onSnapshot:function(){return h5},onSnapshotsInSync:function(){return hJ},orderBy:function(){return h_},query:function(){return hE},queryEqual:function(){return cd},refEqual:function(){return ch},runTransaction:function(){return dl},serverTimestamp:function(){return dh},setDoc:function(){return h6},setIndexConfiguration:function(){return dg},setLogLevel:function(){return nG},snapshotEqual:function(){return hK},startAfter:function(){return hL},startAt:function(){return hR},terminate:function(){return c2},updateDoc:function(){return hZ},waitForPendingWrites:function(){return cj},where:function(){return hS},writeBatch:function(){return dm}});var r,i,s,a,o,u,l,c,h,d=n(5816),f=n(8463),p=n(3333),m=n(4444),g="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{},y={},v=v||{},$=g||self;function w(){}function I(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function b(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function T(e,t,n){return e.call.apply(e.bind,arguments)}function E(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function k(e,t,n){return(k=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?T:E).apply(null,arguments)}function S(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function x(e,t){function n(){}n.prototype=t.prototype,e.X=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Wb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function _(){this.s=this.s,this.o=this.o}_.prototype.s=!1,_.prototype.na=function(){this.s||(this.s=!0,this.M())},_.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};let C=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return -1};function A(e){let t=e.length;if(0<t){let n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function D(e,t){for(let n=1;n<arguments.length;n++){let r=arguments[n];if(I(r)){let i=e.length||0,s=r.length||0;e.length=i+s;for(let a=0;a<s;a++)e[i+a]=r[a]}else e.push(r)}}function N(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}N.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!$.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{$.addEventListener("test",w,t),$.removeEventListener("test",w,t)}catch(n){}return e}();function L(e){return/^[\s\xa0]*$/.test(e)}var O=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function P(e,t){return e<t?-1:e>t?1:0}function M(){var e=$.navigator;return e&&(e=e.userAgent)?e:""}function F(e){return -1!=M().indexOf(e)}function V(e){return V[" "](e),e}V[" "]=w;var U=F("Opera"),q=F("Trident")||F("MSIE"),B=F("Edge"),j=B||q,G=F("Gecko")&&!(-1!=M().toLowerCase().indexOf("webkit")&&!F("Edge"))&&!(F("Trident")||F("MSIE"))&&!F("Edge"),z=-1!=M().toLowerCase().indexOf("webkit")&&!F("Edge");function K(){var e=$.document;return e?e.documentMode:void 0}a:{var H,W="",Q=(H=M(),G?/rv:([^\);]+)(\)|;)/.exec(H):B?/Edge\/([\d\.]+)/.exec(H):q?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(H):z?/WebKit\/(\S+)/.exec(H):U?/(?:Version)[ \/]?(\S+)/.exec(H):void 0);if(Q&&(W=Q?Q[1]:""),q){var Z=K();if(null!=Z&&Z>parseFloat(W)){s=String(Z);break a}}s=W}var X={};if($.document&&q){a=K()||parseInt(s,10)||void 0}else a=void 0;var Y=a;function J(e,t){if(N.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(G){a:{try{V(t.nodeName);var i=!0;break a}catch(s){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:ee[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&J.X.h.call(this)}}x(J,N);var ee={2:"touch",3:"pen",4:"mouse"};J.prototype.h=function(){J.X.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var et="closure_listenable_"+(1e6*Math.random()|0),en=0;function er(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++en,this.ba=this.ea=!1}function ei(e){e.ba=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function es(e,t,n){for(let r in e)t.call(n,e[r],r,e)}function ea(e){let t={};for(let n in e)t[n]=e[n];return t}let eo="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function eu(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i])e[n]=r[n];for(let s=0;s<eo.length;s++)n=eo[s],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function el(e){this.src=e,this.g={},this.h=0}function ec(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=C(i,t);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(ei(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function eh(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.ba&&s.listener==t&&!!n==s.capture&&s.ha==r)return i}return -1}el.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var a=eh(e,t,r,i);return -1<a?(t=e[a],n||(t.ea=!1)):((t=new er(t,this.src,s,!!r,i)).ea=n,e.push(t)),t};var ed="closure_lm_"+(1e6*Math.random()|0),ef={};function ep(e,t,n,r,i){if(r&&r.once)return function e(t,n,r,i,s){if(Array.isArray(n)){for(var a=0;a<n.length;a++)e(t,n[a],r,i,s);return null}return r=eI(r),t&&t[et]?t.O(n,r,b(i)?!!i.capture:!!i,s):em(t,n,r,!0,i,s)}(e,t,n,r,i);if(Array.isArray(t)){for(var s=0;s<t.length;s++)ep(e,t[s],n,r,i);return null}return n=eI(n),e&&e[et]?e.N(t,n,b(r)?!!r.capture:!!r,i):em(e,t,n,!1,r,i)}function em(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var a=b(i)?!!i.capture:!!i,o=e$(e);if(o||(e[ed]=o=new el(e)),(n=o.add(t,n,r,a,s)).proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}let t=ev;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)R||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(ey(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function eg(e){if("number"!=typeof e&&e&&!e.ba){var t=e.src;if(t&&t[et])ec(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(ey(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=e$(t))?(ec(n,e),0==n.h&&(n.src=null,t[ed]=null)):ei(e)}}}function ey(e){return e in ef?ef[e]:ef[e]="on"+e}function ev(e,t){if(e.ba)e=!0;else{t=new J(t,this);var n=e.listener,r=e.ha||e.src;e.ea&&eg(e),e=n.call(r,t)}return e}function e$(e){return(e=e[ed])instanceof el?e:null}var ew="__closure_events_fn_"+(1e9*Math.random()>>>0);function eI(e){return"function"==typeof e?e:(e[ew]||(e[ew]=function(t){return e.handleEvent(t)}),e[ew])}function eb(){_.call(this),this.i=new el(this),this.P=this,this.I=null}function e8(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,"string"==typeof t)t=new N(t,e);else if(t instanceof N)t.target=t.target||e;else{var i=t;eu(t=new N(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var a=t.g=n[s];i=eT(a,r,!0,t)&&i}if(i=eT(a=t.g=e,r,!0,t)&&i,i=eT(a,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=eT(a=t.g=n[s],r,!1,t)&&i}function eT(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var a=t[s];if(a&&!a.ba&&a.capture==n){var o=a.listener,u=a.ha||a.src;a.ea&&ec(e.i,a),i=!1!==o.call(u,r)&&i}}return i&&!r.defaultPrevented}x(eb,_),eb.prototype[et]=!0,eb.prototype.removeEventListener=function(e,t,n,r){!function e(t,n,r,i,s){if(Array.isArray(n))for(var a=0;a<n.length;a++)e(t,n[a],r,i,s);else(i=b(i)?!!i.capture:!!i,r=eI(r),t&&t[et])?(t=t.i,(n=String(n).toString())in t.g&&-1<(r=eh(a=t.g[n],r,i,s))&&(ei(a[r]),Array.prototype.splice.call(a,r,1),0==a.length&&(delete t.g[n],t.h--))):t&&(t=e$(t))&&(n=t.g[n.toString()],t=-1,n&&(t=eh(n,r,i,s)),(r=-1<t?n[t]:null)&&eg(r))}(this,e,t,n,r)},eb.prototype.M=function(){if(eb.X.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)ei(n[r]);delete t.g[e],t.h--}}this.I=null},eb.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},eb.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var eE=$.JSON.stringify;function ek(){var e=eD;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var eS=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new ex,e=>e.reset());class ex{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function e_(e){$.setTimeout(()=>{throw e},0)}function eC(e,t){var n;o||(n=$.Promise.resolve(void 0),o=function(){n.then(eN)}),eA||(o(),eA=!0),eD.add(e,t)}var eA=!1,eD=new class{constructor(){this.h=this.g=null}add(e,t){let n=eS.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}};function eN(){for(var e;e=ek();){try{e.h.call(e.g)}catch(t){e_(t)}var n=eS;n.j(e),100>n.h&&(n.h++,e.next=n.g,n.g=e)}eA=!1}function eR(e,t){eb.call(this),this.h=e||1,this.g=t||$,this.j=k(this.lb,this),this.l=Date.now()}function eL(e){e.ca=!1,e.R&&(e.g.clearTimeout(e.R),e.R=null)}function eO(e,t,n){if("function"==typeof e)n&&(e=k(e,n));else if(e&&"function"==typeof e.handleEvent)e=k(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:$.setTimeout(e,t||0)}x(eR,eb),(h=eR.prototype).ca=!1,h.R=null,h.lb=function(){if(this.ca){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-e):(this.R&&(this.g.clearTimeout(this.R),this.R=null),e8(this,"tick"),this.ca&&(eL(this),this.start()))}},h.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())},h.M=function(){eR.X.M.call(this),eL(this),delete this.g};class eP extends _{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=eO(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.j);let n=t.h;t.h=null,t.m.apply(null,n)}(this)}M(){super.M(),this.g&&($.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eM(e){_.call(this),this.h=e,this.g={}}x(eM,_);var eF=[];function eV(e,t,n,r){Array.isArray(n)||(n&&(eF[0]=n.toString()),n=eF);for(var i=0;i<n.length;i++){var s=ep(t,n[i],r||e.handleEvent,!1,e.h||e);if(!s)break;e.g[s.key]=s}}function eU(e){es(e.g,function(e,t){this.g.hasOwnProperty(t)&&eg(e)},e),e.g={}}function eq(){this.g=!0}function eB(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var a=1;a<i.length;a++)i[a]=""}}}}return eE(n)}catch(o){return t}}(e,n)+(r?" "+r:"")})}eM.prototype.M=function(){eM.X.M.call(this),eU(this)},eM.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},eq.prototype.Aa=function(){this.g=!1},eq.prototype.info=function(){};var e0={},e9=null;function ej(){return e9=e9||new eb}function eG(e){N.call(this,e0.Pa,e)}function ez(e){let t=ej();e8(t,new eG(t))}function e2(e,t){N.call(this,e0.STAT_EVENT,e),this.stat=t}function eK(e){let t=ej();e8(t,new e2(t,e))}function e1(e,t){N.call(this,e0.Qa,e),this.size=t}function eH(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return $.setTimeout(function(){e()},t)}e0.Pa="serverreachability",x(eG,N),e0.STAT_EVENT="statevent",x(e2,N),e0.Qa="timingevent",x(e1,N);var eW={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},e7={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function e3(){}function eQ(e){return e.h||(e.h=e.i())}function e4(){}e3.prototype.h=null;var e6={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function eZ(){N.call(this,"d")}function eX(){N.call(this,"c")}function eY(){}function e5(e,t,n,r){this.l=e,this.j=t,this.m=n,this.U=r||1,this.S=new eM(this),this.O=te,e=j?125:void 0,this.T=new eR(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new eJ}function eJ(){this.i=null,this.g="",this.h=!1}x(eZ,N),x(eX,N),x(eY,e3),eY.prototype.g=function(){return new XMLHttpRequest},eY.prototype.i=function(){return{}},u=new eY;var te=45e3,tt={},tn={};function tr(e,t,n){e.K=1,e.v=tb(ty(t)),e.s=n,e.P=!0,ti(e,null)}function ti(e,t){e.F=Date.now(),tu(e),e.A=ty(e.v);var n=e.A,r=e.U;Array.isArray(r)||(r=[String(r)]),tL(n.i,"t",r),e.C=0,n=e.l.H,e.h=new eJ,e.g=nE(e.l,n?t:null,!e.s),0<e.N&&(e.L=new eP(k(e.La,e,e.g),e.N)),eV(e.S,e.g,"readystatechange",e.ib),t=e.H?ea(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.da(e.A,e.u,e.s,t)):(e.u="GET",e.g.da(e.A,e.u,null,t)),ez(),function(e,t,n,r,i,s){e.info(function(){if(e.g){if(s)for(var a="",o=s.split("&"),u=0;u<o.length;u++){var l=o[u].split("=");if(1<l.length){var c=l[0];l=l[1];var h=c.split("_");a=2<=h.length&&"type"==h[1]?a+(c+"=")+l+"&":a+(c+"=redacted&")}}else a=null}else a=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+a})}(e.j,e.u,e.A,e.m,e.U,e.s)}function ts(e){return!!e.g&&"GET"==e.u&&2!=e.K&&e.l.Da}function ta(e,t,n){let r=!0,i;for(;!e.I&&e.C<n.length;)if((i=to(e,n))==tn){4==t&&(e.o=4,eK(14),r=!1),eB(e.j,e.m,null,"[Incomplete Response]");break}else if(i==tt){e.o=4,eK(15),eB(e.j,e.m,n,"[Invalid Chunk]"),r=!1;break}else eB(e.j,e.m,i,null),tf(e,i);ts(e)&&i!=tn&&i!=tt&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,eK(16),r=!1),e.i=e.i&&r,r?0<n.length&&!e.$&&(e.$=!0,(t=e.l).g==e&&t.$&&!t.K&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),ny(t),t.K=!0,eK(11))):(eB(e.j,e.m,n,"[Invalid Chunked Response]"),td(e),th(e))}function to(e,t){var n=e.C,r=t.indexOf("\n",n);return -1==r?tn:isNaN(n=Number(t.substring(n,r)))?tt:(r+=1)+n>t.length?tn:(t=t.substr(r,n),e.C=r+n,t)}function tu(e){e.V=Date.now()+e.O,tl(e,e.O)}function tl(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=eH(k(e.gb,e),t)}function tc(e){e.B&&($.clearTimeout(e.B),e.B=null)}function th(e){0==e.l.G||e.I||nw(e.l,e)}function td(e){tc(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,eL(e.T),eU(e.S),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function tf(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||tq(n.h,e))){if(!e.J&&tq(n.h,e)&&3==n.G){try{var r=n.Fa.g.parse(t)}catch(i){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){a:if(!n.u){if(n.g){if(n.g.F+3e3<e.F)n$(n),nl(n);else break a}ng(n),eK(18)}}else n.Ba=s[1],0<n.Ba-n.T&&37500>s[2]&&n.L&&0==n.A&&!n.v&&(n.v=eH(k(n.cb,n),6e3));if(1>=tU(n.h)&&n.ja){try{n.ja()}catch(a){}n.ja=void 0}}else nb(n,11)}else if((e.J||n.g==e)&&n$(n),!L(t))for(s=n.Fa.g.parse(t),t=0;t<s.length;t++){let o=s[t];if(n.T=o[0],o=o[1],2==n.G){if("c"==o[0]){n.I=o[1],n.ka=o[2];let u=o[3];null!=u&&(n.ma=u,n.j.info("VER="+n.ma));let l=o[4];null!=l&&(n.Ca=l,n.j.info("SVER="+n.Ca));let c=o[5];null!=c&&"number"==typeof c&&0<c&&(r=1.5*c,n.J=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;let h=e.g;if(h){let d=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(d){var f=r.h;f.g||-1==d.indexOf("spdy")&&-1==d.indexOf("quic")&&-1==d.indexOf("h2")||(f.j=f.l,f.g=new Set,f.h&&(tB(f,f.h),f.h=null))}if(r.D){let p=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;p&&(r.za=p,tI(r.F,r.D,p))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-e.F,n.j.info("Handshake RTT: "+n.P+"ms")),r=n;var m=e;if(r.sa=nT(r,r.H?r.ka:null,r.V),m.J){t0(r.h,m);var g=m,y=r.J;y&&g.setTimeout(y),g.B&&(tc(g),tu(g)),r.g=m}else nm(r);0<n.i.length&&nh(n)}else"stop"!=o[0]&&"close"!=o[0]||nb(n,7)}else 3==n.G&&("stop"==o[0]||"close"==o[0]?"stop"==o[0]?nb(n,7):nu(n):"noop"!=o[0]&&n.l&&n.l.wa(o),n.A=0)}}ez(4)}catch(v){}}function tp(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(I(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.oa&&"function"==typeof e.oa)return e.oa();if(!e.W||"function"!=typeof e.W){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(I(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}for(let r in t=[],n=0,e)t[n++]=r;return t}}}(e),r=function(e){if(e.W&&"function"==typeof e.W)return e.W();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(I(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}(h=e5.prototype).setTimeout=function(e){this.O=e},h.ib=function(e){e=e.target;let t=this.L;t&&3==nn(e)?t.l():this.La(e)},h.La=function(e){try{if(e==this.g)a:{let t=nn(this.g);var n=this.g.Ea();let r=this.g.aa();if(!(3>t)&&(3!=t||j||this.g&&(this.h.h||this.g.fa()||nr(this.g)))){this.I||4!=t||7==n||(8==n||0>=r?ez(3):ez(2)),tc(this);var i=this.g.aa();this.Y=i;b:if(ts(this)){var s=nr(this.g);e="";var a=s.length,o=4==nn(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){td(this),th(this);var u="";break b}this.h.i=new $.TextDecoder}for(n=0;n<a;n++)this.h.h=!0,e+=this.h.i.decode(s[n],{stream:o&&n==a-1});s.splice(0,a),this.h.g+=e,this.C=0,u=this.h.g}else u=this.g.fa();if(this.i=200==i,function(e,t,n,r,i,s,a){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+a})}(this.j,this.u,this.A,this.m,this.U,t,i),this.i){if(this.Z&&!this.J){b:{if(this.g){var l,c=this.g;if((l=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(l)){var h=l;break b}}h=null}if(i=h)eB(this.j,this.m,i,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,tf(this,i);else{this.i=!1,this.o=3,eK(12),td(this),th(this);break a}}this.P?(ta(this,t,u),j&&this.i&&3==t&&(eV(this.S,this.T,"tick",this.hb),this.T.start())):(eB(this.j,this.m,u,null),tf(this,u)),4==t&&td(this),this.i&&!this.I&&(4==t?nw(this.l,this):(this.i=!1,tu(this)))}else 400==i&&0<u.indexOf("Unknown SID")?(this.o=3,eK(12)):(this.o=0,eK(13)),td(this),th(this)}}}catch(d){}finally{}},h.hb=function(){if(this.g){var e=nn(this.g),t=this.g.fa();this.C<t.length&&(tc(this),ta(this,e,t),this.i&&4!=e&&tu(this))}},h.cancel=function(){this.I=!0,td(this)},h.gb=function(){this.B=null;let e=Date.now();0<=e-this.V?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.j,this.A),2!=this.K&&(ez(),eK(17)),td(this),this.o=2,th(this)):tl(this,this.V-e)};var tm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tg(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof tg){this.h=void 0!==t?t:e.h,tv(this,e.j),this.s=e.s,this.g=e.g,t$(this,e.m),this.l=e.l,t=e.i;var n=new tA;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),tw(this,n),this.o=e.o}else e&&(n=String(e).match(tm))?(this.h=!!t,tv(this,n[1]||"",!0),this.s=t8(n[2]||""),this.g=t8(n[3]||"",!0),t$(this,n[4]),this.l=t8(n[5]||"",!0),tw(this,n[6]||"",!0),this.o=t8(n[7]||"")):(this.h=!!t,this.i=new tA(null,this.h))}function ty(e){return new tg(e)}function tv(e,t,n){e.j=n?t8(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function t$(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function tw(e,t,n){var r,i;t instanceof tA?(e.i=t,r=e.i,(i=e.h)&&!r.j&&(tD(r),r.i=null,r.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(tN(this,t),tL(this,n,e))},r)),r.j=i):(n||(t=tT(t,t_)),e.i=new tA(t,e.h))}function tI(e,t,n){e.i.set(t,n)}function tb(e){return tI(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function t8(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tT(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,tE),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function tE(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}tg.prototype.toString=function(){var e=[],t=this.j;t&&e.push(tT(t,tk,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(tT(t,tk,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(tT(n,"/"==n.charAt(0)?tx:tS,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",tT(n,tC)),e.join("")};var tk=/[#\/\?@]/g,tS=/[#\?:]/g,tx=/[#\?]/g,t_=/[#\?@]/g,tC=/#/g;function tA(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tD(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function tN(e,t){tD(e),t=tO(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tR(e,t){return tD(e),t=tO(e,t),e.g.has(t)}function tL(e,t,n){tN(e,t),0<n.length&&(e.i=null,e.g.set(tO(e,t),A(n)),e.h+=n.length)}function tO(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(h=tA.prototype).add=function(e,t){tD(this),this.i=null,e=tO(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},h.forEach=function(e,t){tD(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},h.oa=function(){tD(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){let i=e[r];for(let s=0;s<i.length;s++)n.push(t[r])}return n},h.W=function(e){tD(this);let t=[];if("string"==typeof e)tR(this,e)&&(t=t.concat(this.g.get(tO(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},h.set=function(e,t){return tD(this),this.i=null,tR(this,e=tO(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},h.get=function(e,t){return e&&0<(e=this.W(e)).length?String(e[0]):t},h.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];let i=encodeURIComponent(String(r)),s=this.W(r);for(r=0;r<s.length;r++){var a=i;""!==s[r]&&(a+="="+encodeURIComponent(String(s[r]))),e.push(a)}}return this.i=e.join("&")};var tP=class{constructor(e,t){this.h=e,this.g=t}};function tM(e){this.l=e||tF,e=$.PerformanceNavigationTiming?0<(e=$.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!($.g&&$.g.Ga&&$.g.Ga()&&$.g.Ga().$b),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var tF=10;function tV(e){return!!e.h||!!e.g&&e.g.size>=e.j}function tU(e){return e.h?1:e.g?e.g.size:0}function tq(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function tB(e,t){e.g?e.g.add(t):e.h=t}function t0(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function t9(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let n of e.g.values())t=t.concat(n.D);return t}return A(e.i)}function tj(){}function tG(){this.g=new tj}function tz(e,t,n){let r=n||"";try{tp(e,function(e,n){let i=e;b(e)&&(i=eE(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(i){throw t.push(r+"type="+encodeURIComponent("_badmap")),i}}function t2(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(s){}}function tK(e){this.l=e.ac||null,this.j=e.jb||!1}function t1(e,t){eb.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=tH,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}tM.prototype.cancel=function(){if(this.i=t9(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}},tj.prototype.stringify=function(e){return $.JSON.stringify(e,void 0)},tj.prototype.parse=function(e){return $.JSON.parse(e,void 0)},x(tK,e3),tK.prototype.g=function(){return new t1(this.l,this.j)},tK.prototype.i=(i={},function(){return i}),x(t1,eb);var tH=0;function tW(e){e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e))}function t7(e){e.readyState=4,e.l=null,e.j=null,e.A=null,t3(e)}function t3(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(h=t1.prototype).open=function(e,t){if(this.readyState!=tH)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,t3(this)},h.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||$).fetch(new Request(this.B,t)).then(this.Wa.bind(this),this.ga.bind(this))},h.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,t7(this)),this.readyState=tH},h.Wa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,t3(this)),this.g&&(this.readyState=3,t3(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(void 0!==$.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;tW(this)}else e.text().then(this.Va.bind(this),this.ga.bind(this))}},h.Ta=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?t7(this):t3(this),3==this.readyState&&tW(this)}},h.Va=function(e){this.g&&(this.response=this.responseText=e,t7(this))},h.Ua=function(e){this.g&&(this.response=e,t7(this))},h.ga=function(){this.g&&t7(this)},h.setRequestHeader=function(e,t){this.v.append(e,t)},h.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},h.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var n=t.next();!n.done;)e.push((n=n.value)[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(t1.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var tQ=$.JSON.parse;function t4(e){eb.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=t6,this.K=this.L=!1}x(t4,eb);var t6="",tZ=/^https?$/i,tX=["POST","PUT"];function tY(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,t5(e),ne(e)}function t5(e){e.D||(e.D=!0,e8(e,"complete"),e8(e,"error"))}function tJ(e){if(e.h&&void 0!==v&&(!e.C[1]||4!=nn(e)||2!=e.aa())){if(e.v&&4==nn(e))eO(e.Ha,0,e);else if(e8(e,"readystatechange"),4==nn(e)){e.h=!1;try{let t=e.aa();a:switch(t){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var n,r,i=!0;break a;default:i=!1}if(!(n=i)){if(r=0===t){var s=String(e.H).match(tm)[1]||null;if(!s&&$.self&&$.self.location){var a=$.self.location.protocol;s=a.substr(0,a.length-1)}r=!tZ.test(s?s.toLowerCase():"")}n=r}if(n)e8(e,"complete"),e8(e,"success");else{e.m=6;try{var o=2<nn(e)?e.g.statusText:""}catch(u){o=""}e.j=o+" ["+e.aa()+"]",t5(e)}}finally{ne(e)}}}}function ne(e,t){if(e.g){nt(e);let n=e.g,r=e.C[0]?w:null;e.g=null,e.C=null,t||e8(e,"ready");try{n.onreadystatechange=r}catch(i){}}}function nt(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&($.clearTimeout(e.A),e.A=null)}function nn(e){return e.g?e.g.readyState:0}function nr(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case t6:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function ni(e){let t="";return es(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function ns(e,t,n){a:{for(r in n){var r=!1;break a}r=!0}r||(n=ni(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):tI(e,t,n))}function na(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function no(e){this.Ca=0,this.i=[],this.j=new eq,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=na("failFast",!1,e),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=na("baseRetryDelayMs",5e3,e),this.bb=na("retryDelaySeedMs",1e4,e),this.$a=na("forwardChannelMaxRetries",2,e),this.ta=na("forwardChannelRequestTimeoutMs",2e4,e),this.ra=e&&e.xmlHttpFactory||void 0,this.Da=e&&e.Zb||!1,this.J=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.I="",this.h=new tM(e&&e.concurrentRequestLimit),this.Fa=new tG,this.O=e&&e.fastHandshake||!1,this.N=e&&e.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=e&&e.Xb||!1,e&&e.Aa&&this.j.Aa(),e&&e.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&e&&e.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}function nu(e){if(nc(e),3==e.G){var t=e.U++,n=ty(e.F);tI(n,"SID",e.I),tI(n,"RID",t),tI(n,"TYPE","terminate"),nf(e,n),(t=new e5(e,e.j,t,void 0)).K=2,t.v=tb(ty(n)),n=!1,$.navigator&&$.navigator.sendBeacon&&(n=$.navigator.sendBeacon(t.v.toString(),"")),!n&&$.Image&&((new Image).src=t.v,n=!0),n||(t.g=nE(t.l,null),t.g.da(t.v)),t.F=Date.now(),tu(t)}n8(e)}function nl(e){e.g&&(ny(e),e.g.cancel(),e.g=null)}function nc(e){nl(e),e.u&&($.clearTimeout(e.u),e.u=null),n$(e),e.h.cancel(),e.m&&("number"==typeof e.m&&$.clearTimeout(e.m),e.m=null)}function nh(e){tV(e.h)||e.m||(e.m=!0,eC(e.Ja,e),e.C=0)}function nd(e,t){var n;n=t?t.m:e.U++;let r=ty(e.F);tI(r,"SID",e.I),tI(r,"RID",n),tI(r,"AID",e.T),nf(e,r),e.o&&e.s&&ns(r,e.o,e.s),n=new e5(e,e.j,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.i=t.D.concat(e.i)),t=np(e,n,1e3),n.setTimeout(Math.round(.5*e.ta)+Math.round(.5*e.ta*Math.random())),tB(e.h,n),tr(n,r,t)}function nf(e,t){e.ia&&es(e.ia,function(e,n){tI(t,n,e)}),e.l&&tp({},function(e,n){tI(t,n,e)})}function np(e,t,n){n=Math.min(e.i.length,n);var r=e.l?k(e.l.Ra,e.l,e):null;a:{var i=e.i;let s=-1;for(;;){let a=["count="+n];-1==s?0<n?(s=i[0].h,a.push("ofs="+s)):s=0:a.push("ofs="+s);let o=!0;for(let u=0;u<n;u++){let l=i[u].h,c=i[u].g;if(0>(l-=s))s=Math.max(0,i[u].h-100),o=!1;else try{tz(c,a,"req"+l+"_")}catch(h){r&&r(c)}}if(o){r=a.join("&");break a}}}return e=e.i.splice(0,n),t.D=e,r}function nm(e){e.g||e.u||(e.Z=1,eC(e.Ia,e),e.A=0)}function ng(e){return!e.g&&!e.u&&!(3<=e.A)&&(e.Z++,e.u=eH(k(e.Ia,e),nI(e,e.A)),e.A++,!0)}function ny(e){null!=e.B&&($.clearTimeout(e.B),e.B=null)}function nv(e){e.g=new e5(e,e.j,"rpc",e.Z),null===e.o&&(e.g.H=e.s),e.g.N=0;var t=ty(e.sa);tI(t,"RID","rpc"),tI(t,"SID",e.I),tI(t,"CI",e.L?"0":"1"),tI(t,"AID",e.T),tI(t,"TYPE","xmlhttp"),nf(e,t),e.o&&e.s&&ns(t,e.o,e.s),e.J&&e.g.setTimeout(e.J);var n=e.g;e=e.ka,n.K=1,n.v=tb(ty(t)),n.s=null,n.P=!0,ti(n,e)}function n$(e){null!=e.v&&($.clearTimeout(e.v),e.v=null)}function nw(e,t){var n=null;if(e.g==t){n$(e),ny(e),e.g=null;var r=2}else{if(!tq(e.h,t))return;n=t.D,t0(e.h,t),r=1}if(0!=e.G){if(e.pa=t.Y,t.i){if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.F;var i,s,a=e.C;e8(r=ej(),new e1(r,n)),nh(e)}else nm(e)}else if(3==(a=t.o)||0==a&&0<e.pa||!(1==r&&(i=e,s=t,!(tU(i.h)>=i.h.j-(i.m?1:0))&&(i.m?(i.i=s.D.concat(i.i),!0):1!=i.G&&2!=i.G&&!(i.C>=(i.Za?0:i.$a))&&(i.m=eH(k(i.Ja,i,s),nI(i,i.C)),i.C++,!0)))||2==r&&ng(e)))switch(n&&0<n.length&&((t=e.h).i=t.i.concat(n)),a){case 1:nb(e,5);break;case 4:nb(e,10);break;case 3:nb(e,6);break;default:nb(e,2)}}}function nI(e,t){let n=e.Xa+Math.floor(Math.random()*e.bb);return e.l||(n*=2),n*t}function nb(e,t){if(e.j.info("Error code "+t),2==t){var n=null;e.l&&(n=null);var r=k(e.kb,e);n||(n=new tg("//www.google.com/images/cleardot.gif"),$.location&&"http"==$.location.protocol||tv(n,"https"),tb(n)),function(e,t){let n=new eq;if($.Image){let r=new Image;r.onload=S(t2,n,r,"TestLoadImage: loaded",!0,t),r.onerror=S(t2,n,r,"TestLoadImage: error",!1,t),r.onabort=S(t2,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=S(t2,n,r,"TestLoadImage: timeout",!1,t),$.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(n.toString(),r)}else eK(2);e.G=0,e.l&&e.l.va(t),n8(e),nc(e)}function n8(e){if(e.G=0,e.la=[],e.l){let t=t9(e.h);(0!=t.length||0!=e.i.length)&&(D(e.la,t),D(e.la,e.i),e.h.i.length=0,A(e.i),e.i.length=0),e.l.ua()}}function nT(e,t,n){var r=n instanceof tg?ty(n):new tg(n,void 0);if(""!=r.g)t&&(r.g=t+"."+r.g),t$(r,r.m);else{var i=$.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new tg(null,void 0);r&&tv(s,r),t&&(s.g=t),i&&t$(s,i),n&&(s.l=n),r=s}return n=e.D,t=e.za,n&&t&&tI(r,n,t),tI(r,"VER",e.ma),nf(e,r),r}function nE(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new t4(n&&e.Da&&!e.ra?new tK({jb:!0}):e.ra)).Ka(e.H),t}function nk(){}function nS(){if(q&&!(10<=Number(Y)))throw Error("Environmental error: no available transport.")}function nx(e,t){eb.call(this),this.g=new no(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.S=e,(e=t&&t.Yb)&&!L(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!L(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new nA(this)}function n_(e){eZ.call(this);var t=e.__sm__;if(t){a:{for(let n in t){e=n;break a}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function nC(){eX.call(this),this.status=1}function nA(e){this.g=e}(h=t4.prototype).Ka=function(e){this.L=e},h.da=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():u.g(),this.C=this.u?eQ(this.u):eQ(u),this.g.onreadystatechange=k(this.Ha,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(i){tY(this,i);return}if(e=n||"",n=new Map(this.headers),r){if(Object.getPrototypeOf(r)===Object.prototype)for(var a in r)n.set(a,r[a]);else if("function"==typeof r.keys&&"function"==typeof r.get)for(let o of r.keys())n.set(o,r.get(o));else throw Error("Unknown input type for opt_headers: "+String(r))}for(let[l,c]of(r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),a=$.FormData&&e instanceof $.FormData,!(0<=C(tX,t))||r||a||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(l,c);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{var h,d,f;nt(this),0<this.B&&((this.K=(h=this.g,q&&(d=function(){let e=0,t=O(String(s)).split("."),n=O("9").split("."),r=Math.max(t.length,n.length);for(let i=0;0==e&&i<r;i++){var a=t[i]||"",o=n[i]||"";do{if(a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],0==a[0].length&&0==o[0].length)break;e=P(0==a[1].length?0:parseInt(a[1],10),0==o[1].length?0:parseInt(o[1],10))||P(0==a[2].length,0==o[2].length)||P(a[2],o[2]),a=a[3],o=o[3]}while(0==e)}return 0<=e},f=X,Object.prototype.hasOwnProperty.call(f,9)?f[9]:f[9]=d(9))&&"number"==typeof h.timeout&&void 0!==h.ontimeout))?(this.g.timeout=this.B,this.g.ontimeout=k(this.qa,this)):this.A=eO(this.qa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(p){tY(this,p)}},h.qa=function(){void 0!==v&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,e8(this,"timeout"),this.abort(8))},h.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,e8(this,"complete"),e8(this,"abort"),ne(this))},h.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ne(this,!0)),t4.X.M.call(this)},h.Ha=function(){this.s||(this.F||this.v||this.l?tJ(this):this.fb())},h.fb=function(){tJ(this)},h.aa=function(){try{return 2<nn(this)?this.g.status:-1}catch(e){return -1}},h.fa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},h.Sa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),tQ(t)}},h.Ea=function(){return this.m},h.Oa=function(){return"string"==typeof this.j?this.j:String(this.j)},(h=no.prototype).ma=8,h.G=1,h.Ja=function(e){if(this.m){if(this.m=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;let t=new e5(this,this.j,e,void 0),n=this.s;if(this.S&&(n?eu(n=ea(n),this.S):n=this.S),null!==this.o||this.N||(t.H=n,n=null),this.O)a:{for(var r=0,i=0;i<this.i.length;i++){b:{var s=this.i[i];if("__data__"in s.g&&"string"==typeof(s=s.g.__data__)){s=s.length;break b}s=void 0}if(void 0===s)break;if(4096<(r+=s)){r=i;break a}if(4096===r||i===this.i.length-1){r=i+1;break a}}r=1e3}else r=1e3;r=np(this,t,r),i=ty(this.F),tI(i,"RID",e),tI(i,"CVER",22),this.D&&tI(i,"X-HTTP-Session-Id",this.D),nf(this,i),n&&(this.N?r="headers="+encodeURIComponent(String(ni(n)))+"&"+r:this.o&&ns(i,this.o,n)),tB(this.h,t),this.Ya&&tI(i,"TYPE","init"),this.O?(tI(i,"$req",r),tI(i,"SID","null"),t.Z=!0,tr(t,i,null)):tr(t,i,r),this.G=2}}else 3==this.G&&(e?nd(this,e):0==this.i.length||tV(this.h)||nd(this))}},h.Ia=function(){if(this.u=null,nv(this),this.$&&!(this.K||null==this.g||0>=this.P)){var e=2*this.P;this.j.info("BP detection timer enabled: "+e),this.B=eH(k(this.eb,this),e)}},h.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,eK(10),nl(this),nv(this))},h.cb=function(){null!=this.v&&(this.v=null,nl(this),ng(this),eK(19))},h.kb=function(e){e?(this.j.info("Successfully pinged google.com"),eK(2)):(this.j.info("Failed to ping google.com"),eK(1))},(h=nk.prototype).xa=function(){},h.wa=function(){},h.va=function(){},h.ua=function(){},h.Ra=function(){},nS.prototype.g=function(e,t){return new nx(e,t)},x(nx,eb),nx.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;eK(0),e.V=t,e.ia=n||{},e.L=e.Y,e.F=nT(e,null,e.V),nh(e)},nx.prototype.close=function(){nu(this.g)},nx.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=eE(e),e=n);t.i.push(new tP(t.ab++,e)),3==t.G&&nh(t)},nx.prototype.M=function(){this.g.l=null,delete this.j,nu(this.g),delete this.g,nx.X.M.call(this)},x(n_,eZ),x(nC,eX),x(nA,nk),nA.prototype.xa=function(){e8(this.g,"a")},nA.prototype.wa=function(e){e8(this.g,new n_(e))},nA.prototype.va=function(e){e8(this.g,new nC)},nA.prototype.ua=function(){e8(this.g,"b")},nS.prototype.createWebChannel=nS.prototype.g,nx.prototype.send=nx.prototype.u,nx.prototype.open=nx.prototype.m,nx.prototype.close=nx.prototype.close,eW.NO_ERROR=0,eW.TIMEOUT=8,eW.HTTP_ERROR=6,e7.COMPLETE="complete",e4.EventType=e6,e6.OPEN="a",e6.CLOSE="b",e6.ERROR="c",e6.MESSAGE="d",eb.prototype.listen=eb.prototype.N,t4.prototype.listenOnce=t4.prototype.O,t4.prototype.getLastError=t4.prototype.Oa,t4.prototype.getLastErrorCode=t4.prototype.Ea,t4.prototype.getStatus=t4.prototype.aa,t4.prototype.getResponseJson=t4.prototype.Sa,t4.prototype.getResponseText=t4.prototype.fa,t4.prototype.send=t4.prototype.da,t4.prototype.setWithCredentials=t4.prototype.Ka;var nD=y.createWebChannelTransport=function(){return new nS},nN=y.getStatEventTarget=function(){return ej()},nR=y.ErrorCode=eW,nL=y.EventType=e7,nO=y.Event=e0,nP=y.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},nM=y.FetchXmlHttpFactory=tK,nF=y.WebChannel=e4,nV=y.XhrIo=t4,nU=n(3454);let nq="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nB{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nB.UNAUTHENTICATED=new nB(null),nB.GOOGLE_CREDENTIALS=new nB("google-credentials-uid"),nB.FIRST_PARTY=new nB("first-party-uid"),nB.MOCK_USER=new nB("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let n0="9.13.0",n9=new p.Yd("@firebase/firestore");function nj(){return n9.logLevel}function nG(e){n9.setLogLevel(e)}function nz(e,...t){if(n9.logLevel<=p.in.DEBUG){let n=t.map(n1);n9.debug(`Firestore (${n0}): ${e}`,...n)}}function n2(e,...t){if(n9.logLevel<=p.in.ERROR){let n=t.map(n1);n9.error(`Firestore (${n0}): ${e}`,...n)}}function nK(e,...t){if(n9.logLevel<=p.in.WARN){let n=t.map(n1);n9.warn(`Firestore (${n0}): ${e}`,...n)}}function n1(e){var t;if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(n){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function nH(e="Unexpected state"){let t=`FIRESTORE (${n0}) INTERNAL ASSERTION FAILED: `+e;throw n2(t),Error(t)}function nW(e,t){e||nH()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let n7={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class n3 extends m.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nQ{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class n4{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class n6{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(nB.UNAUTHENTICATED))}shutdown(){}}class nZ{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class nX{constructor(e){this.t=e,this.currentUser=nB.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new nQ;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new nQ,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{nz("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(nz("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new nQ)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>{var n;return this.i!==e?(nz("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||nH(),new n4(t.accessToken,this.currentUser)):null}):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||nH(),new nB(e)}}class nY{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r,this.type="FirstParty",this.user=nB.FIRST_PARTY,this.p=new Map}I(){var e;return this.g?this.g():(("object"!=typeof this.h||null===this.h||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)&&nH(),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class n5{constructor(e,t,n,r){this.h=e,this.l=t,this.m=n,this.g=r}getToken(){return Promise.resolve(new nY(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(nB.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nJ{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class re{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){let n=e=>{null!=e.error&&nz("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.A;return this.A=e.token,nz("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{nz("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.T.getImmediate({optional:!0});e?r(e):nz("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>{var t;return e?("string"==typeof e.token||nH(),this.A=e.token,new nJ(e.token)):null}):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}class rt{getToken(){return Promise.resolve(new nJ(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rn(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rr{static R(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let r=rn(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function ri(e,t){return e<t?-1:e>t?1:0}function rs(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function ra(e){return e+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ro{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new n3(n7.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new n3(n7.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ro.fromMillis(Date.now())}static fromDate(e){return ro.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new ro(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ri(this.nanoseconds,e.nanoseconds):ri(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ru{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ru(e)}static min(){return new ru(new ro(0,0))}static max(){return new ru(new ro(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rl{constructor(e,t,n){void 0===t?t=0:t>e.length&&nH(),void 0===n?n=e.length-t:n>e.length-t&&nH(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===rl.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof rl?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let i=e.get(r),s=t.get(r);if(i<s)return -1;if(i>s)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class rc extends rl{construct(e,t,n){return new rc(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new n3(n7.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new rc(t)}static emptyPath(){return new rc([])}}let rh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class rd extends rl{construct(e,t,n){return new rd(e,t,n)}static isValidIdentifier(e){return rh.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),rd.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new rd(["__name__"])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new n3(n7.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let a=e[r];if("\\"===a){if(r+1===e.length)throw new n3(n7.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let o=e[r+1];if("\\"!==o&&"."!==o&&"`"!==o)throw new n3(n7.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=o,r+=2}else"`"===a?(s=!s,r++):"."!==a||s?(n+=a,r++):(i(),r++)}if(i(),s)throw new n3(n7.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new rd(t)}static emptyPath(){return new rd([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rf{constructor(e){this.path=e}static fromPath(e){return new rf(rc.fromString(e))}static fromName(e){return new rf(rc.fromString(e).popFirst(5))}static empty(){return new rf(rc.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===rc.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return rc.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new rf(new rc(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rp{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function rm(e){return e.fields.find(e=>2===e.kind)}function rg(e){return e.fields.filter(e=>2!==e.kind)}function ry(e,t){let n=ri(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(0!==(n=r$(e.fields[r],t.fields[r])))return n;return ri(e.fields.length,t.fields.length)}rp.UNKNOWN_ID=-1;class rv{constructor(e,t){this.fieldPath=e,this.kind=t}}function r$(e,t){let n=rd.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:ri(e.kind,t.kind)}class rw{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new rw(0,r8.min())}}function rI(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=ru.fromTimestamp(1e9===r?new ro(n+1,0):new ro(n,r));return new r8(i,rf.empty(),t)}function rb(e){return new r8(e.readTime,e.key,-1)}class r8{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new r8(ru.min(),rf.empty(),-1)}static max(){return new r8(ru.max(),rf.empty(),-1)}}function rT(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=rf.comparator(e.documentKey,t.documentKey))?n:ri(e.largestBatchId,t.largestBatchId)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let rE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function rS(e){if(e.code!==n7.FAILED_PRECONDITION||e.message!==rE)throw e;nz("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rx{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&nH(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new rx((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof rx?t:rx.resolve(t)}catch(n){return rx.reject(n)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):rx.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):rx.reject(t)}static resolve(e){return new rx((t,n)=>{t(e)})}static reject(e){return new rx((t,n)=>{n(e)})}static waitFor(e){return new rx((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=rx.resolve(!1);for(let n of e)t=t.next(e=>e?rx.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new rx((n,r)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let u=o;t(e[u]).next(e=>{s[u]=e,++a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new rx((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class r_{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.P=new nQ,this.transaction.oncomplete=()=>{this.P.resolve()},this.transaction.onabort=()=>{t.error?this.P.reject(new rD(e,t.error)):this.P.resolve()},this.transaction.onerror=t=>{let n=rP(t.target.error);this.P.reject(new rD(e,n))}}static open(e,t,n,r){try{return new r_(t,e.transaction(r,n))}catch(i){throw new rD(t,i)}}get v(){return this.P.promise}abort(e){e&&this.P.reject(e),this.aborted||(nz("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}V(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){let t=this.transaction.objectStore(e);return new rR(t)}}class rC{constructor(e,t,n){this.name=e,this.version=t,this.S=n,12.2===rC.D((0,m.z$)())&&n2("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return nz("SimpleDb","Removing database:",e),rL(window.indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!(0,m.hl)())return!1;if(rC.N())return!0;let e=(0,m.z$)(),t=rC.D(e),n=rC.k(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<n&&n<4.5)}static N(){var e;return void 0!==nU&&"YES"===(null===(e=nU.env)||void 0===e?void 0:e.O)}static M(e,t){return e.store(t)}static D(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static k(e){let t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async F(e){return this.db||(nz("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{let r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{let n=e.target.result;t(n)},r.onblocked=()=>{n(new rD(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{let r=t.target.error;"VersionError"===r.name?n(new n3(n7.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new n3(n7.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new rD(e,r))},r.onupgradeneeded=e=>{nz("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.S.$(t,r.transaction,e.oldVersion,this.version).next(()=>{nz("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.B&&(this.db.onversionchange=e=>this.B(e)),this.db}L(e){this.B=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.F(e);let a=r_.open(this.db,e,i?"readonly":"readwrite",n),o=r(a).next(e=>(a.V(),e)).catch(e=>(a.abort(e),rx.reject(e))).toPromise();return o.catch(()=>{}),await a.v,o}catch(u){let l=u,c="FirebaseError"!==l.name&&s<3;if(nz("SimpleDb","Transaction failed with error:",l.message,"Retrying:",c),this.close(),!c)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}class rA{constructor(e){this.U=e,this.q=!1,this.K=null}get isDone(){return this.q}get G(){return this.K}set cursor(e){this.U=e}done(){this.q=!0}j(e){this.K=e}delete(){return rL(this.U.delete())}}class rD extends n3{constructor(e,t){super(n7.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function rN(e){return"IndexedDbTransactionError"===e.name}class rR{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(nz("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(nz("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),rL(n)}add(e){return nz("SimpleDb","ADD",this.store.name,e,e),rL(this.store.add(e))}get(e){return rL(this.store.get(e)).next(t=>(void 0===t&&(t=null),nz("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return nz("SimpleDb","DELETE",this.store.name,e),rL(this.store.delete(e))}count(){return nz("SimpleDb","COUNT",this.store.name),rL(this.store.count())}W(e,t){let n=this.options(e,t);if(n.index||"function"!=typeof this.store.getAll){let r=this.cursor(n),i=[];return this.H(r,(e,t)=>{i.push(t)}).next(()=>i)}{let s=this.store.getAll(n.range);return new rx((e,t)=>{s.onerror=e=>{t(e.target.error)},s.onsuccess=t=>{e(t.target.result)}})}}J(e,t){let n=this.store.getAll(e,null===t?void 0:t);return new rx((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}Y(e,t){nz("SimpleDb","DELETE ALL",this.store.name);let n=this.options(e,t);n.X=!1;let r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}Z(e,t){let n;t?n=e:(n={},t=e);let r=this.cursor(n);return this.H(r,t)}tt(e){let t=this.cursor({});return new rx((n,r)=>{t.onerror=e=>{let t=rP(e.target.error);r(t)},t.onsuccess=t=>{let r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){let n=[];return new rx((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void r();let s=new rA(i),a=t(i.primaryKey,i.value,s);if(a instanceof rx){let o=a.catch(e=>(s.done(),rx.reject(e)));n.push(o)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>rx.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function rL(e){return new rx((t,n)=>{e.onsuccess=e=>{let n=e.target.result;t(n)},e.onerror=e=>{let t=rP(e.target.error);n(t)}})}let rO=!1;function rP(e){let t=rC.D((0,m.z$)());if(t>=12.2&&t<13){let n="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(n)>=0){let r=new n3("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return rO||(rO=!0,setTimeout(()=>{throw r},0)),r}}return e}class rM{constructor(e,t){this.asyncQueue=e,this.et=t,this.task=null}start(){this.nt(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}nt(e){nz("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{nz("IndexBackiller",`Documents written: ${await this.et.st()}`)}catch(e){rN(e)?nz("IndexBackiller","Ignoring IndexedDB error during index backfill: ",e):await rS(e)}await this.nt(6e4)})}}class rF{constructor(e,t){this.localStore=e,this.persistence=t}async st(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.it(t,e))}it(e,t){let n=new Set,r=t,i=!0;return rx.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return nz("IndexBackiller",`Processing collection: ${t}`),this.rt(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}rt(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{let i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this.ot(r,n)).next(n=>(nz("IndexBackiller",`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}ot(e,t){let n=e;return t.changes.forEach((e,t)=>{let r=rb(t);rT(r,n)>0&&(n=r)}),new r8(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rV{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ct&&this.ct(e),e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rU(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function rq(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function rB(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ rV.at=-1;class r0{constructor(e,t){this.comparator=e,this.root=t||rj.EMPTY}insert(e,t){return new r0(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,rj.BLACK,null,null))}remove(e){return new r0(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rj.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new r9(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new r9(this.root,e,this.comparator,!1)}getReverseIterator(){return new r9(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new r9(this.root,e,this.comparator,!0)}}class r9{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class rj{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:rj.RED,this.left=null!=r?r:rj.EMPTY,this.right=null!=i?i:rj.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new rj(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return rj.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return rj.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,rj.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,rj.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw nH();let e=this.left.check();if(e!==this.right.check())throw nH();return e+(this.isRed()?0:1)}}rj.EMPTY=null,rj.RED=!0,rj.BLACK=!1,rj.EMPTY=new class{constructor(){this.size=0}get key(){throw nH()}get value(){throw nH()}get color(){throw nH()}get left(){throw nH()}get right(){throw nH()}copy(e,t,n,r,i){return this}insert(e,t,n){return new rj(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rG{constructor(e){this.comparator=e,this.data=new r0(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rz(this.data.getIterator())}getIteratorFrom(e){return new rz(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof rG)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let r=t.getNext().key,i=n.getNext().key;if(0!==this.comparator(r,i))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new rG(this.comparator);return t.data=e,t}}class rz{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function r2(e){return e.hasNext()?e.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rK{constructor(e){this.fields=e,e.sort(rd.comparator)}static empty(){return new rK([])}unionWith(e){let t=new rG(rd.comparator);for(let n of this.fields)t=t.add(n);for(let r of e)t=t.add(r);return new rK(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return rs(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function r1(){return"undefined"!=typeof atob}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rH{constructor(e){this.binaryString=e}static fromBase64String(e){let t=atob(e);return new rH(t)}static fromUint8Array(e){let t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new rH(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){var e;return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ri(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}rH.EMPTY_BYTE_STRING=new rH("");let rW=RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function r7(e){if(!e&&nH(),"string"==typeof e){let t=0,n=rW.exec(e);if(!n&&nH(),n[1]){let r=n[1];t=Number(r=(r+"000000000").substr(0,9))}let i=new Date(e);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:r3(e.seconds),nanos:r3(e.nanos)}}function r3(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function rQ(e){return"string"==typeof e?rH.fromBase64String(e):rH.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function r4(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function r6(e){let t=r7(e.mapValue.fields.__local_write_time__.timestampValue);return new ro(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rZ{constructor(e,t,n,r,i,s,a,o){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.useFetchStreams=o}}class rX{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new rX("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof rX&&e.projectId===this.projectId&&e.database===this.database}}function rY(e){return null==e}function r5(e){return 0===e&&1/e==-1/0}function rJ(e){return"number"==typeof e&&Number.isInteger(e)&&!r5(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let ie={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},it={nullValue:"NULL_VALUE"};function ir(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?r4(e)?4:iy(e)?9007199254740991:10:nH()}function ii(e,t){var n,r,i,s;if(e===t)return!0;let a=ir(e);if(a!==ir(t))return!1;switch(a){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return r6(e).isEqual(r6(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=r7(e.timestampValue),r=r7(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return n=e,r=t,rQ(n.bytesValue).isEqual(rQ(r.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return i=e,s=t,r3(i.geoPointValue.latitude)===r3(s.geoPointValue.latitude)&&r3(i.geoPointValue.longitude)===r3(s.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return r3(e.integerValue)===r3(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=r3(e.doubleValue),r=r3(t.doubleValue);return n===r?r5(n)===r5(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return rs(e.arrayValue.values||[],t.arrayValue.values||[],ii);case 10:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(rU(n)!==rU(r))return!1;for(let i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!ii(n[i],r[i])))return!1;return!0}(e,t);default:return nH()}}function is(e,t){return void 0!==(e.values||[]).find(e=>ii(e,t))}function ia(e,t){if(e===t)return 0;let n=ir(e),r=ir(t);if(n!==r)return ri(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ri(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=r3(e.integerValue||e.doubleValue),r=r3(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return io(e.timestampValue,t.timestampValue);case 4:return io(r6(e),r6(t));case 5:return ri(e.stringValue,t.stringValue);case 6:return function(e,t){let n=rQ(e),r=rQ(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){let s=ri(n[i],r[i]);if(0!==s)return s}return ri(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=ri(r3(e.latitude),r3(t.latitude));return 0!==n?n:ri(r3(e.longitude),r3(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){let s=ia(n[i],r[i]);if(s)return s}return ri(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===ie.mapValue&&t===ie.mapValue)return 0;if(e===ie.mapValue)return 1;if(t===ie.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let a=0;a<r.length&&a<s.length;++a){let o=ri(r[a],s[a]);if(0!==o)return o;let u=ia(n[r[a]],i[s[a]]);if(0!==u)return u}return ri(r.length,s.length)}(e.mapValue,t.mapValue);default:throw nH()}}function io(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return ri(e,t);let n=r7(e),r=r7(t),i=ri(n.seconds,r.seconds);return 0!==i?i:ri(n.nanos,r.nanos)}function iu(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=r7(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?rQ(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,rf.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=iu(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${iu(e.fields[i])}`;return n+"}"}(e.mapValue):nH()}function il(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function ic(e){return!!e&&"integerValue"in e}function ih(e){return!!e&&"arrayValue"in e}function id(e){return!!e&&"nullValue"in e}function ip(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function im(e){return!!e&&"mapValue"in e}function ig(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return rq(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=ig(n)),t}if(e.arrayValue){let n={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)n.arrayValue.values[r]=ig(e.arrayValue.values[r]);return n}return Object.assign({},e)}function iy(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}function iv(e){return"nullValue"in e?it:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?il(rX.empty(),rf.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?{mapValue:{}}:nH()}function i$(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?il(rX.empty(),rf.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?{mapValue:{}}:"mapValue"in e?ie:nH()}function iw(e,t){let n=ia(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function iI(e,t){let n=ia(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ib{constructor(e){this.value=e}static empty(){return new ib({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!im(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ig(t)}setAll(e){let t=rd.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let s=this.getFieldsMap(t);this.applyChanges(s,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=ig(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());im(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ii(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];im(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(rq(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new ib(ig(this.value))}}function i8(e){let t=[];return rq(e.fields,(e,n)=>{let r=new rd([e]);if(im(n)){let i=i8(n.mapValue).fields;if(0===i.length)t.push(r);else for(let s of i)t.push(r.child(s))}else t.push(r)}),new rK(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iT{constructor(e,t,n,r,i,s){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.data=i,this.documentState=s}static newInvalidDocument(e){return new iT(e,0,ru.min(),ru.min(),ib.empty(),0)}static newFoundDocument(e,t,n){return new iT(e,1,t,ru.min(),n,0)}static newNoDocument(e,t){return new iT(e,2,t,ru.min(),ib.empty(),0)}static newUnknownDocument(e,t){return new iT(e,3,t,ru.min(),ib.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ib.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ib.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ru.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof iT&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new iT(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iE{constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.ht=null}}function ik(e,t=null,n=[],r=[],i=null,s=null,a=null){return new iE(e,t,n,r,i,s,a)}function iS(e){var t;let n=t=e;if(null===n.ht){let r=n.path.canonicalString();null!==n.collectionGroup&&(r+="|cg:"+n.collectionGroup),r+="|f:",r+=n.filters.map(e=>{var t,n;return(t=e).field.canonicalString()+t.op.toString()+iu(n=t.value)}).join(","),r+="|ob:",r+=n.orderBy.map(e=>{var t;return(t=e).field.canonicalString()+t.dir}).join(","),rY(n.limit)||(r+="|l:",r+=n.limit),n.startAt&&(r+="|lb:",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(e=>{var t;return iu(t=e)}).join(",")),n.endAt&&(r+="|ub:",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(e=>{var t;return iu(t=e)}).join(",")),n.ht=r}return n.ht}function ix(e,t){var n,r;if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++)if(!i0(e.orderBy[i],t.orderBy[i]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let s=0;s<e.filters.length;s++)if(n=e.filters[s],r=t.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!ii(n.value,r.value))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!ij(e.startAt,t.startAt)&&ij(e.endAt,t.endAt)}function i_(e){return rf.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function iC(e,t){return e.filters.filter(e=>e instanceof iN&&e.field.isEqual(t))}function iA(e,t,n){let r=it,i=!0;for(let s of iC(e,t)){let a=it,o=!0;switch(s.op){case"<":case"<=":a=iv(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,o=!1;break;case"!=":case"not-in":a=it}0>iw({value:r,inclusive:i},{value:a,inclusive:o})&&(r=a,i=o)}if(null!==n){for(let u=0;u<e.orderBy.length;++u)if(e.orderBy[u].field.isEqual(t)){let l=n.position[u];0>iw({value:r,inclusive:i},{value:l,inclusive:n.inclusive})&&(r=l,i=n.inclusive);break}}return{value:r,inclusive:i}}function iD(e,t,n){let r=ie,i=!0;for(let s of iC(e,t)){let a=ie,o=!0;switch(s.op){case">=":case">":a=i$(s.value),o=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,o=!1;break;case"!=":case"not-in":a=ie}iI({value:r,inclusive:i},{value:a,inclusive:o})>0&&(r=a,i=o)}if(null!==n){for(let u=0;u<e.orderBy.length;++u)if(e.orderBy[u].field.isEqual(t)){let l=n.position[u];iI({value:r,inclusive:i},{value:l,inclusive:n.inclusive})>0&&(r=l,i=n.inclusive);break}}return{value:r,inclusive:i}}class iN extends class{}{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.lt(e,t,n):new iR(e,t,n):"array-contains"===t?new iM(e,n):"in"===t?new iF(e,n):"not-in"===t?new iV(e,n):"array-contains-any"===t?new iU(e,n):new iN(e,t,n)}static lt(e,t,n){return"in"===t?new iL(e,n):new iO(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.ft(ia(t,this.value)):null!==t&&ir(this.value)===ir(t)&&this.ft(ia(t,this.value))}ft(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return nH()}}dt(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class iR extends iN{constructor(e,t,n){super(e,t,n),this.key=rf.fromName(n.referenceValue)}matches(e){let t=rf.comparator(e.key,this.key);return this.ft(t)}}class iL extends iN{constructor(e,t){super(e,"in",t),this.keys=iP("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class iO extends iN{constructor(e,t){super(e,"not-in",t),this.keys=iP("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function iP(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>rf.fromName(e.referenceValue))}class iM extends iN{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ih(t)&&is(t.arrayValue,this.value)}}class iF extends iN{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&is(this.value.arrayValue,t)}}class iV extends iN{constructor(e,t){super(e,"not-in",t)}matches(e){if(is(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!is(this.value.arrayValue,t)}}class iU extends iN{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ih(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>is(this.value.arrayValue,e))}}class iq{constructor(e,t){this.position=e,this.inclusive=t}}class iB{constructor(e,t="asc"){this.field=e,this.dir=t}}function i0(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function i9(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(r=s.field.isKeyField()?rf.comparator(rf.fromName(a.referenceValue),n.key):ia(a,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function ij(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!ii(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iG{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this._t=null,this.wt=null,this.startAt,this.endAt}}function iz(e,t,n,r,i,s,a,o){return new iG(e,t,n,r,i,s,a,o)}function i2(e){return new iG(e)}function iK(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function i1(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function iH(e){for(let t of e.filters)if(t.dt())return t.field;return null}function iW(e){return null!==e.collectionGroup}function i7(e){var t;let n=t=e;if(null===n._t){n._t=[];let r=iH(n),i=i1(n);if(null!==r&&null===i)r.isKeyField()||n._t.push(new iB(r)),n._t.push(new iB(rd.keyField(),"asc"));else{let s=!1;for(let a of n.explicitOrderBy)n._t.push(a),a.field.isKeyField()&&(s=!0);if(!s){let o=n.explicitOrderBy.length>0?n.explicitOrderBy[n.explicitOrderBy.length-1].dir:"asc";n._t.push(new iB(rd.keyField(),o))}}}return n._t}function i3(e){var t;let n=t=e;if(!n.wt){if("F"===n.limitType)n.wt=ik(n.path,n.collectionGroup,i7(n),n.filters,n.limit,n.startAt,n.endAt);else{let r=[];for(let i of i7(n)){let s="desc"===i.dir?"asc":"desc";r.push(new iB(i.field,s))}let a=n.endAt?new iq(n.endAt.position,n.endAt.inclusive):null,o=n.startAt?new iq(n.startAt.position,n.startAt.inclusive):null;n.wt=ik(n.path,n.collectionGroup,r,n.filters,n.limit,a,o)}}return n.wt}function iQ(e,t,n){return new iG(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function i4(e,t){return ix(i3(e),i3(t))&&e.limitType===t.limitType}function i6(e){return`${iS(i3(e))}|lt:${e.limitType}`}function iZ(e){var t;let n;return`Query(target=${n=(t=i3(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>{var t,n;return`${(t=e).field.canonicalString()} ${t.op} ${iu(n=t.value)}`}).join(", ")}]`),rY(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>{var t;return t=e,`${t.field.canonicalString()} (${t.dir})`}).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(e=>{var t;return iu(t=e)}).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(e=>{var t;return iu(t=e)}).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function iX(e,t){var n,r;return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):rf.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of e.explicitOrderBy)if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(n=e,r=t,(!n.startAt||!!function(e,t,n){let r=i9(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,i7(n),r))&&(!n.endAt||!!function(e,t,n){let r=i9(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,i7(n),r)))}function iY(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function i5(e){return(t,n)=>{let r=!1;for(let i of i7(e)){let s=iJ(i,t,n);if(0!==s)return s;r=r||i.field.isKeyField()}return 0}}function iJ(e,t,n){let r=e.field.isKeyField()?rf.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?ia(r,i):nH()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return nH()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function se(e,t){if(e.gt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:r5(t)?"-0":t}}function st(e){return{integerValue:""+e}}function sn(e,t){return rJ(t)?st(t):se(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sr{constructor(){this._=void 0}}function si(e,t,n){return e instanceof so?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof su?sl(e,t):e instanceof sc?sh(e,t):function(e,t){let n=sa(e,t),r=sf(n)+sf(e.yt);return ic(n)&&ic(e.yt)?st(r):se(e.It,r)}(e,t)}function ss(e,t,n){return e instanceof su?sl(e,t):e instanceof sc?sh(e,t):n}function sa(e,t){var n,r;return e instanceof sd?ic(n=t)||(r=n)&&"doubleValue"in r?t:{integerValue:0}:null}class so extends sr{}class su extends sr{constructor(e){super(),this.elements=e}}function sl(e,t){let n=sp(t);for(let r of e.elements)n.some(e=>ii(e,r))||n.push(r);return{arrayValue:{values:n}}}class sc extends sr{constructor(e){super(),this.elements=e}}function sh(e,t){let n=sp(t);for(let r of e.elements)n=n.filter(e=>!ii(e,r));return{arrayValue:{values:n}}}class sd extends sr{constructor(e,t){super(),this.It=e,this.yt=t}}function sf(e){return r3(e.integerValue||e.doubleValue)}function sp(e){return ih(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sm{constructor(e,t){this.field=e,this.transform=t}}class sg{constructor(e,t){this.version=e,this.transformResults=t}}class sy{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new sy}static exists(e){return new sy(void 0,e)}static updateTime(e){return new sy(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function sv(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class s${}function sw(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new sC(e.key,sy.none()):new sE(e.key,e.data,sy.none());{let n=e.data,r=ib.empty(),i=new rG(rd.comparator);for(let s of t.fields)if(!i.has(s)){let a=n.field(s);null===a&&s.length>1&&(s=s.popLast(),a=n.field(s)),null===a?r.delete(s):r.set(s,a),i=i.add(s)}return new sk(e.key,r,new rK(i.toArray()),sy.none())}}function sI(e,t,n){e instanceof sE?function(e,t,n){let r=e.value.clone(),i=sx(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof sk?function(e,t,n){if(!sv(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=sx(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(sS(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function sb(e,t,n,r){var i,s,a;return e instanceof sE?function(e,t,n,r){if(!sv(e.precondition,t))return n;let i=e.value.clone(),s=s_(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof sk?function(e,t,n,r){if(!sv(e.precondition,t))return n;let i=s_(e.fieldTransforms,r,t),s=t.data;return(s.setAll(sS(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(i=e,s=t,a=n,sv(i.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):a)}function s8(e,t){let n=null;for(let r of e.fieldTransforms){let i=t.data.field(r.field),s=sa(r.transform,i||null);null!=s&&(null===n&&(n=ib.empty()),n.set(r.field,s))}return n||null}function sT(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&rs(n,r,(e,t)=>{var n,r,i,s;return n=e,r=t,n.field.isEqual(r.field)&&(i=n.transform,s=r.transform,i instanceof su&&s instanceof su||i instanceof sc&&s instanceof sc?rs(i.elements,s.elements,ii):i instanceof sd&&s instanceof sd?ii(i.yt,s.yt):i instanceof so&&s instanceof so)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class sE extends s${constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class sk extends s${constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function sS(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function sx(e,t,n){var r;let i=new Map;(r=e.length===n.length)||nH();for(let s=0;s<n.length;s++){let a=e[s],o=a.transform,u=t.data.field(a.field);i.set(a.field,ss(o,u,n[s]))}return i}function s_(e,t,n){let r=new Map;for(let i of e){let s=i.transform,a=n.data.field(i.field);r.set(i.field,si(s,a,t))}return r}class sC extends s${constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class sA extends s${constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sD{constructor(e){this.count=e}}function sN(e){switch(e){default:return nH();case n7.CANCELLED:case n7.UNKNOWN:case n7.DEADLINE_EXCEEDED:case n7.RESOURCE_EXHAUSTED:case n7.INTERNAL:case n7.UNAVAILABLE:case n7.UNAUTHENTICATED:return!1;case n7.INVALID_ARGUMENT:case n7.NOT_FOUND:case n7.ALREADY_EXISTS:case n7.PERMISSION_DENIED:case n7.FAILED_PRECONDITION:case n7.ABORTED:case n7.OUT_OF_RANGE:case n7.UNIMPLEMENTED:case n7.DATA_LOSS:return!0}}function sR(e){if(void 0===e)return n2("GRPC error has no .code"),n7.UNKNOWN;switch(e){case l.OK:return n7.OK;case l.CANCELLED:return n7.CANCELLED;case l.UNKNOWN:return n7.UNKNOWN;case l.DEADLINE_EXCEEDED:return n7.DEADLINE_EXCEEDED;case l.RESOURCE_EXHAUSTED:return n7.RESOURCE_EXHAUSTED;case l.INTERNAL:return n7.INTERNAL;case l.UNAVAILABLE:return n7.UNAVAILABLE;case l.UNAUTHENTICATED:return n7.UNAUTHENTICATED;case l.INVALID_ARGUMENT:return n7.INVALID_ARGUMENT;case l.NOT_FOUND:return n7.NOT_FOUND;case l.ALREADY_EXISTS:return n7.ALREADY_EXISTS;case l.PERMISSION_DENIED:return n7.PERMISSION_DENIED;case l.FAILED_PRECONDITION:return n7.FAILED_PRECONDITION;case l.ABORTED:return n7.ABORTED;case l.OUT_OF_RANGE:return n7.OUT_OF_RANGE;case l.UNIMPLEMENTED:return n7.UNIMPLEMENTED;case l.DATA_LOSS:return n7.DATA_LOSS;default:return nH()}}(c=l||(l={}))[c.OK=0]="OK",c[c.CANCELLED=1]="CANCELLED",c[c.UNKNOWN=2]="UNKNOWN",c[c.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",c[c.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",c[c.NOT_FOUND=5]="NOT_FOUND",c[c.ALREADY_EXISTS=6]="ALREADY_EXISTS",c[c.PERMISSION_DENIED=7]="PERMISSION_DENIED",c[c.UNAUTHENTICATED=16]="UNAUTHENTICATED",c[c.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",c[c.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",c[c.ABORTED=10]="ABORTED",c[c.OUT_OF_RANGE=11]="OUT_OF_RANGE",c[c.UNIMPLEMENTED=12]="UNIMPLEMENTED",c[c.INTERNAL=13]="INTERNAL",c[c.UNAVAILABLE=14]="UNAVAILABLE",c[c.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sL{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[r,i]of n)if(this.equalsFn(r,e))return i}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){rq(this.inner,(t,n)=>{for(let[r,i]of n)e(r,i)})}isEmpty(){return rB(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let sO=new r0(rf.comparator),sP=new r0(rf.comparator);function sM(...e){let t=sP;for(let n of e)t=t.insert(n.key,n);return t}function sF(e){let t=sP;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function sV(){return sq()}function sU(){return sq()}function sq(){return new sL(e=>e.toString(),(e,t)=>e.isEqual(t))}let sB=new r0(rf.comparator),s0=new rG(rf.comparator);function s9(...e){let t=s0;for(let n of e)t=t.add(n);return t}let sj=new rG(ri);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class sG{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,sz.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new sG(ru.min(),r,sj,sO,s9())}}class sz{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new sz(n,t,s9(),s9(),s9())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class s2{constructor(e,t,n,r){this.Tt=e,this.removedTargetIds=t,this.key=n,this.Et=r}}class sK{constructor(e,t){this.targetId=e,this.At=t}}class s1{constructor(e,t,n=rH.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class sH{constructor(){this.Rt=0,this.bt=s3(),this.Pt=rH.EMPTY_BYTE_STRING,this.vt=!1,this.Vt=!0}get current(){return this.vt}get resumeToken(){return this.Pt}get St(){return 0!==this.Rt}get Dt(){return this.Vt}Ct(e){e.approximateByteSize()>0&&(this.Vt=!0,this.Pt=e)}xt(){let e=s9(),t=s9(),n=s9();return this.bt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:nH()}}),new sz(this.Pt,this.vt,e,t,n)}Nt(){this.Vt=!1,this.bt=s3()}kt(e,t){this.Vt=!0,this.bt=this.bt.insert(e,t)}Ot(e){this.Vt=!0,this.bt=this.bt.remove(e)}Mt(){this.Rt+=1}Ft(){this.Rt-=1}$t(){this.Vt=!0,this.vt=!0}}class sW{constructor(e){this.Bt=e,this.Lt=new Map,this.Ut=sO,this.qt=s7(),this.Kt=new rG(ri)}Gt(e){for(let t of e.Tt)e.Et&&e.Et.isFoundDocument()?this.Qt(t,e.Et):this.jt(t,e.key,e.Et);for(let n of e.removedTargetIds)this.jt(n,e.key,e.Et)}Wt(e){this.forEachTarget(e,t=>{let n=this.zt(t);switch(e.state){case 0:this.Ht(t)&&n.Ct(e.resumeToken);break;case 1:n.Ft(),n.St||n.Nt(),n.Ct(e.resumeToken);break;case 2:n.Ft(),n.St||this.removeTarget(t);break;case 3:this.Ht(t)&&(n.$t(),n.Ct(e.resumeToken));break;case 4:this.Ht(t)&&(this.Jt(t),n.Ct(e.resumeToken));break;default:nH()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Lt.forEach((e,n)=>{this.Ht(n)&&t(n)})}Yt(e){let t=e.targetId,n=e.At.count,r=this.Xt(t);if(r){let i=r.target;if(i_(i)){if(0===n){let s=new rf(i.path);this.jt(t,s,iT.newNoDocument(s,ru.min()))}else{var a;(a=1===n)||nH()}}else this.Zt(t)!==n&&(this.Jt(t),this.Kt=this.Kt.add(t))}}te(e){let t=new Map;this.Lt.forEach((n,r)=>{let i=this.Xt(r);if(i){if(n.current&&i_(i.target)){let s=new rf(i.target.path);null!==this.Ut.get(s)||this.ee(r,s)||this.jt(r,s,iT.newNoDocument(s,e))}n.Dt&&(t.set(r,n.xt()),n.Nt())}});let n=s9();this.qt.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this.Xt(e);return!t||2===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.Ut.forEach((t,n)=>n.setReadTime(e));let r=new sG(e,t,this.Kt,this.Ut,n);return this.Ut=sO,this.qt=s7(),this.Kt=new rG(ri),r}Qt(e,t){if(!this.Ht(e))return;let n=this.ee(e,t.key)?2:0;this.zt(e).kt(t.key,n),this.Ut=this.Ut.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ne(t.key).add(e))}jt(e,t,n){if(!this.Ht(e))return;let r=this.zt(e);this.ee(e,t)?r.kt(t,1):r.Ot(t),this.qt=this.qt.insert(t,this.ne(t).delete(e)),n&&(this.Ut=this.Ut.insert(t,n))}removeTarget(e){this.Lt.delete(e)}Zt(e){let t=this.zt(e).xt();return this.Bt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Mt(e){this.zt(e).Mt()}zt(e){let t=this.Lt.get(e);return t||(t=new sH,this.Lt.set(e,t)),t}ne(e){let t=this.qt.get(e);return t||(t=new rG(ri),this.qt=this.qt.insert(e,t)),t}Ht(e){let t=null!==this.Xt(e);return t||nz("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){let t=this.Lt.get(e);return t&&t.St?null:this.Bt.se(e)}Jt(e){this.Lt.set(e,new sH),this.Bt.getRemoteKeysForTarget(e).forEach(t=>{this.jt(e,t,null)})}ee(e,t){return this.Bt.getRemoteKeysForTarget(e).has(t)}}function s7(){return new r0(rf.comparator)}function s3(){return new r0(rf.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let sQ={asc:"ASCENDING",desc:"DESCENDING"},s4={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class s6{constructor(e,t){this.databaseId=e,this.gt=t}}function sZ(e,t){return e.gt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function sX(e,t){return e.gt?t.toBase64():t.toUint8Array()}function sY(e){return!e&&nH(),ru.fromTimestamp(function(e){let t=r7(e);return new ro(t.seconds,t.nanos)}(e))}function s5(e,t){var n;return(n=e,new rc(["projects",n.projectId,"databases",n.database])).child("documents").child(t).canonicalString()}function sJ(e){var t;let n=rc.fromString(e);return am(n)||nH(),n}function ae(e,t){return s5(e.databaseId,t.path)}function at(e,t){let n=sJ(t);if(n.get(1)!==e.databaseId.projectId)throw new n3(n7.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new n3(n7.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new rf(as(n))}function an(e,t){return s5(e.databaseId,t)}function ar(e){let t=sJ(e);return 4===t.length?rc.emptyPath():as(t)}function ai(e){return new rc(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function as(e){var t;return e.length>4&&"documents"===e.get(4)||nH(),e.popFirst(5)}function aa(e,t,n){return{name:ae(e,t),fields:n.value.mapValue.fields}}function ao(e,t,n){let r=at(e,t.name),i=sY(t.updateTime),s=new ib({mapValue:{fields:t.fields}}),a=iT.newFoundDocument(r,i,s);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function au(e,t){var n,r,i,s;let a;if(t instanceof sE)a={update:aa(e,t.key,t.value)};else if(t instanceof sC)a={delete:ae(e,t.key)};else if(t instanceof sk)a={update:aa(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof sA))return nH();a={verify:ae(e,t.key)}}return t.fieldTransforms.length>0&&(a.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof so)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof su)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof sc)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof sd)return{fieldPath:t.field.canonicalString(),increment:n.yt};throw nH()})(0,e))),t.precondition.isNone||(a.currentDocument=(n=e,void 0!==(r=t.precondition).updateTime?{updateTime:(i=n,sZ(i,(s=r.updateTime).toTimestamp()))}:void 0!==r.exists?{exists:r.exists}:nH())),a}function al(e,t){var n;let r=t.currentDocument?void 0!==(n=t.currentDocument).updateTime?sy.updateTime(sY(n.updateTime)):void 0!==n.exists?sy.exists(n.exists):sy.none():sy.none(),i=t.updateTransforms?t.updateTransforms.map(t=>(function(e,t){let n=null;if("setToServerValue"in t){var r;"REQUEST_TIME"===t.setToServerValue||nH(),n=new so}else if("appendMissingElements"in t){let i=t.appendMissingElements.values||[];n=new su(i)}else if("removeAllFromArray"in t){let s=t.removeAllFromArray.values||[];n=new sc(s)}else"increment"in t?n=new sd(e,t.increment):nH();let a=rd.fromServerFormat(t.fieldPath);return new sm(a,n)})(e,t)):[];if(t.update){t.update.name;let s=at(e,t.update.name),a=new ib({mapValue:{fields:t.update.fields}});if(t.updateMask){let o=function(e){let t=e.fieldPaths||[];return new rK(t.map(e=>rd.fromServerFormat(e)))}(t.updateMask);return new sk(s,a,o,r,i)}return new sE(s,a,r,i)}if(t.delete){let u=at(e,t.delete);return new sC(u,r)}if(t.verify){let l=at(e,t.verify);return new sA(l,r)}return nH()}function ac(e,t){return{documents:[an(e,t.path)]}}function ah(e,t){var n,r,i,s;let a={structuredQuery:{}},o=t.path;null!==t.collectionGroup?(a.parent=an(e,o),a.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(a.parent=an(e,o.popLast()),a.structuredQuery.from=[{collectionId:o.lastSegment()}]);let u=function(e){if(0===e.length)return;let t=e.map(e=>(function(e){var t;if("=="===e.op){if(ip(e.value))return{unaryFilter:{field:af(e.field),op:"IS_NAN"}};if(id(e.value))return{unaryFilter:{field:af(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ip(e.value))return{unaryFilter:{field:af(e.field),op:"IS_NOT_NAN"}};if(id(e.value))return{unaryFilter:{field:af(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:af(e.field),op:(t=e.op,s4[t]),value:e.value}}})(e));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);u&&(a.structuredQuery.where=u);let l=function(e){if(0!==e.length)return e.map(e=>{var t,n;return{field:af((t=e).field),direction:(n=t.dir,sQ[n])}})}(t.orderBy);l&&(a.structuredQuery.orderBy=l);let c=(r=e,i=t.limit,r.gt||rY(i)?i:{value:i});return null!==c&&(a.structuredQuery.limit=c),t.startAt&&(a.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(a.structuredQuery.endAt={before:!(s=t.endAt).inclusive,values:s.position}),a}function ad(e){var t,n;let r=ar(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){(t=1===s)||nH();let o=i.from[0];o.allDescendants?a=o.collectionId:r=r.child(o.collectionId)}let u=[];i.where&&(u=function e(t){var n;return t?void 0!==t.unaryFilter?[function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=ap(e.unaryFilter.field);return iN.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=ap(e.unaryFilter.field);return iN.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=ap(e.unaryFilter.field);return iN.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=ap(e.unaryFilter.field);return iN.create(i,"!=",{nullValue:"NULL_VALUE"});default:return nH()}}(t)]:void 0!==t.fieldFilter?[(n=t,iN.create(ap(n.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return nH()}}(n.fieldFilter.op),n.fieldFilter.value))]:void 0!==t.compositeFilter?t.compositeFilter.filters.map(t=>e(t)).reduce((e,t)=>e.concat(t)):nH():[]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>{var t;return t=e,new iB(ap(t.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}));let c=null,h;i.limit&&(c=rY(h="object"==typeof(n=i.limit)?n.value:n)?null:h);let d=null;i.startAt&&(d=function(e){let t=!!e.before,n=e.values||[];return new iq(n,t)}(i.startAt));let f=null;return i.endAt&&(f=function(e){let t=!e.before,n=e.values||[];return new iq(n,t)}(i.endAt)),iz(r,a,l,u,c,"F",d,f)}function af(e){return{fieldPath:e.canonicalString()}}function ap(e){return rd.fromServerFormat(e.fieldPath)}function am(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ag(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=av(t)),t=ay(e.get(n),t);return av(t)}function ay(e,t){let n=t,r=e.length;for(let i=0;i<r;i++){let s=e.charAt(i);switch(s){case"\0":n+="\x01\x10";break;case"\x01":n+="\x01\x11";break;default:n+=s}}return n}function av(e){return e+"\x01\x01"}function a$(e){var t;let n=e.length;if(n>=2||nH(),2===n)return"\x01"===e.charAt(0)&&"\x01"===e.charAt(1)||nH(),rc.emptyPath();let r=n-2,i=[],s="";for(let a=0;a<n;){let o=e.indexOf("\x01",a);switch((o<0||o>r)&&nH(),e.charAt(o+1)){case"\x01":let u=e.substring(a,o),l;0===s.length?l=u:(s+=u,l=s,s=""),i.push(l);break;case"\x10":s+=e.substring(a,o),s+="\0";break;case"\x11":s+=e.substring(a,o+1);break;default:nH()}a=o+2}return new rc(i)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let aw=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function aI(e,t){return[e,ag(t)]}function ab(e,t,n){return[e,ag(t),n]}let a8={},aT=["prefixPath","collectionGroup","readTime","documentId"],aE=["prefixPath","collectionGroup","documentId"],ak=["collectionGroup","readTime","prefixPath","documentId"],aS=["canonicalId","targetId"],ax=["targetId","path"],a_=["path","targetId"],aC=["collectionId","parent"],aA=["indexId","uid"],aD=["uid","sequenceNumber"],aN=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],aR=["indexId","uid","orderedDocumentKey"],aL=["userId","collectionPath","documentId"],aO=["userId","collectionPath","largestBatchId"],aP=["userId","collectionGroup","largestBatchId"],aM=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],aF=[...aM,"documentOverlays"],aV=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],aU=aV,aq=[...aU,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class aB extends rk{constructor(e,t){super(),this.ie=e,this.currentSequenceNumber=t}}function a0(e,t){var n;let r=n=e;return rC.M(r.ie,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class a9{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){let i=this.mutations[r];i.key.isEqual(e.key)&&sI(i,e,n[r])}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=sb(n,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=sb(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=sU();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields);a=t.has(r.key)?null:a;let o=sw(s,a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(ru.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),s9())}isEqual(e){return this.batchId===e.batchId&&rs(this.mutations,e.mutations,(e,t)=>sT(e,t))&&rs(this.baseMutations,e.baseMutations,(e,t)=>sT(e,t))}}class aj{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){var r;(r=e.mutations.length===n.length)||nH();let i=sB,s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,n[a].version);return new aj(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class aG{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class az{constructor(e,t,n,r,i=ru.min(),s=ru.min(),a=rH.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a}withSequenceNumber(e){return new az(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new az(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new az(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class a2{constructor(e){this.re=e}}function aK(e,t){let n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:a1(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument()){var i,s;r.document=(i=e.re,{name:ae(i,(s=t).key),fields:s.data.value.mapValue.fields,updateTime:sZ(i,s.version.toTimestamp())})}else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:aH(t.version)};else{if(!t.isUnknownDocument())return nH();r.unknownDocument={path:n.path.toArray(),version:aH(t.version)}}return r}function a1(e){let t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function aH(e){let t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function aW(e){let t=new ro(e.seconds,e.nanoseconds);return ru.fromTimestamp(t)}function a7(e,t){let n=(t.baseMutations||[]).map(t=>al(e.re,t));for(let r=0;r<t.mutations.length-1;++r){let i=t.mutations[r];if(r+1<t.mutations.length&&void 0!==t.mutations[r+1].transform){let s=t.mutations[r+1];i.updateTransforms=s.transform.fieldTransforms,t.mutations.splice(r+1,1),++r}}let a=t.mutations.map(t=>al(e.re,t)),o=ro.fromMillis(t.localWriteTimeMs);return new a9(t.batchId,o,n,a)}function a3(e){var t,n,r;let i=aW(e.readTime),s=void 0!==e.lastLimboFreeSnapshotVersion?aW(e.lastLimboFreeSnapshotVersion):ru.min(),a;return void 0!==e.query.documents?(1===(t=e.query).documents.length||nH(),a=i3(i2(ar(t.documents[0])))):a=i3(ad(r=e.query)),new az(a,e.targetId,0,e.lastListenSequenceNumber,i,s,rH.fromBase64String(e.resumeToken))}function aQ(e,t){let n=aH(t.snapshotVersion),r=aH(t.lastLimboFreeSnapshotVersion),i;i=i_(t.target)?ac(e.re,t.target):ah(e.re,t.target);let s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:iS(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function a4(e){let t=ad({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?iQ(t,t.limit,"L"):t}function a6(e,t){return new aG(t.largestBatchId,al(e.re,t.overlayMutation))}function aZ(e,t){let n=t.path.lastSegment();return[e,ag(t.path.popLast()),n]}function aX(e,t,n,r){return{indexId:e,uid:t.uid||"",sequenceNumber:n,readTime:aH(r.readTime),documentKey:ag(r.documentKey.path),largestBatchId:r.largestBatchId}}function aY(e){return a0(e,"bundles")}function a5(e){return a0(e,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class aJ{constructor(e,t){this.It=e,this.userId=t}static oe(e,t){let n=t.uid||"";return new aJ(e,n)}getOverlay(e,t){return oe(e).get(aZ(this.userId,t)).next(e=>e?a6(this.It,e):null)}getOverlays(e,t){let n=sV();return rx.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){let r=[];return n.forEach((n,i)=>{let s=new aG(t,i);r.push(this.ue(e,s))}),rx.waitFor(r)}removeOverlaysForBatchId(e,t,n){let r=new Set;t.forEach(e=>r.add(ag(e.getCollectionPath())));let i=[];return r.forEach(t=>{let r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(oe(e).Y("collectionPathOverlayIndex",r))}),rx.waitFor(i)}getOverlaysForCollection(e,t,n){let r=sV(),i=ag(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return oe(e).W("collectionPathOverlayIndex",s).next(e=>{for(let t of e){let n=a6(this.It,t);r.set(n.getKey(),n)}return r})}getOverlaysForCollectionGroup(e,t,n,r){let i=sV(),s,a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return oe(e).Z({index:"collectionGroupOverlayIndex",range:a},(e,t,n)=>{let a=a6(this.It,t);i.size()<r||a.largestBatchId===s?(i.set(a.getKey(),a),s=a.largestBatchId):n.done()}).next(()=>i)}ue(e,t){return oe(e).put(function(e,t,n){let[r,i,s]=aZ(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:au(e.re,n.mutation)}}(this.It,this.userId,t))}}function oe(e){return a0(e,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ot{constructor(){}ce(e,t){this.ae(e,t),t.he()}ae(e,t){if("nullValue"in e)this.le(t,5);else if("booleanValue"in e)this.le(t,10),t.fe(e.booleanValue?1:0);else if("integerValue"in e)this.le(t,15),t.fe(r3(e.integerValue));else if("doubleValue"in e){let n=r3(e.doubleValue);isNaN(n)?this.le(t,13):(this.le(t,15),r5(n)?t.fe(0):t.fe(n))}else if("timestampValue"in e){let r=e.timestampValue;this.le(t,20),"string"==typeof r?t.de(r):(t.de(`${r.seconds||""}`),t.fe(r.nanos||0))}else if("stringValue"in e)this._e(e.stringValue,t),this.we(t);else if("bytesValue"in e)this.le(t,30),t.me(rQ(e.bytesValue)),this.we(t);else if("referenceValue"in e)this.ge(e.referenceValue,t);else if("geoPointValue"in e){let i=e.geoPointValue;this.le(t,45),t.fe(i.latitude||0),t.fe(i.longitude||0)}else"mapValue"in e?iy(e)?this.le(t,Number.MAX_SAFE_INTEGER):(this.ye(e.mapValue,t),this.we(t)):"arrayValue"in e?(this.pe(e.arrayValue,t),this.we(t)):nH()}_e(e,t){this.le(t,25),this.Ie(e,t)}Ie(e,t){t.de(e)}ye(e,t){let n=e.fields||{};for(let r of(this.le(t,55),Object.keys(n)))this._e(r,t),this.ae(n[r],t)}pe(e,t){let n=e.values||[];for(let r of(this.le(t,50),n))this.ae(r,t)}ge(e,t){this.le(t,37),rf.fromName(e).path.forEach(e=>{this.le(t,60),this.Ie(e,t)})}le(e,t){e.fe(t)}we(e){e.fe(2)}}function on(e){if(0===e)return 8;let t=0;return e>>4==0&&(t+=4,e<<=4),e>>6==0&&(t+=2,e<<=2),e>>7==0&&(t+=1),t}function or(e){let t=64-function(e){let t=0;for(let n=0;n<8;++n){let r=on(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}ot.Te=new ot;class oi{constructor(){this.Be=new class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ee(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Ae(n.value),n=t.next();this.Re()}be(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Pe(n.value),n=t.next();this.ve()}Ve(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.Ae(n);else if(n<2048)this.Ae(960|n>>>6),this.Ae(128|63&n);else if(t<"\ud800"||"\udbff"<t)this.Ae(480|n>>>12),this.Ae(128|63&n>>>6),this.Ae(128|63&n);else{let r=t.codePointAt(0);this.Ae(240|r>>>18),this.Ae(128|63&r>>>12),this.Ae(128|63&r>>>6),this.Ae(128|63&r)}}this.Re()}Se(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.Pe(n);else if(n<2048)this.Pe(960|n>>>6),this.Pe(128|63&n);else if(t<"\ud800"||"\udbff"<t)this.Pe(480|n>>>12),this.Pe(128|63&n>>>6),this.Pe(128|63&n);else{let r=t.codePointAt(0);this.Pe(240|r>>>18),this.Pe(128|63&r>>>12),this.Pe(128|63&r>>>6),this.Pe(128|63&r)}}this.ve()}De(e){let t=this.Ce(e),n=or(t);this.xe(1+n),this.buffer[this.position++]=255&n;for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=255&t[r]}Ne(e){let t=this.Ce(e),n=or(t);this.xe(1+n),this.buffer[this.position++]=~(255&n);for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=~(255&t[r])}ke(){this.Oe(255),this.Oe(255)}Me(){this.Fe(255),this.Fe(255)}reset(){this.position=0}seed(e){this.xe(e.length),this.buffer.set(e,this.position),this.position+=e.length}$e(){return this.buffer.slice(0,this.position)}Ce(e){let t=function(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=0!=(128&t[0]);t[0]^=n?255:128;for(let r=1;r<t.length;++r)t[r]^=n?255:0;return t}Ae(e){let t=255&e;0===t?(this.Oe(0),this.Oe(255)):255===t?(this.Oe(255),this.Oe(0)):this.Oe(t)}Pe(e){let t=255&e;0===t?(this.Fe(0),this.Fe(255)):255===t?(this.Fe(255),this.Fe(0)):this.Fe(e)}Re(){this.Oe(0),this.Oe(1)}ve(){this.Fe(0),this.Fe(1)}Oe(e){this.xe(1),this.buffer[this.position++]=e}Fe(e){this.xe(1),this.buffer[this.position++]=~e}xe(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}},this.Le=new class{constructor(e){this.Be=e}me(e){this.Be.Ee(e)}de(e){this.Be.Ve(e)}fe(e){this.Be.De(e)}he(){this.Be.ke()}}(this.Be),this.Ue=new class{constructor(e){this.Be=e}me(e){this.Be.be(e)}de(e){this.Be.Se(e)}fe(e){this.Be.Ne(e)}he(){this.Be.Me()}}(this.Be)}seed(e){this.Be.seed(e)}qe(e){return 0===e?this.Le:this.Ue}$e(){return this.Be.$e()}reset(){this.Be.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class os{constructor(e,t,n,r){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=r}Ke(){let e=this.directionalValue.length,t=0===e||255===this.directionalValue[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new os(this.indexId,this.documentKey,this.arrayValue,n)}}function oa(e,t){let n=e.indexId-t.indexId;return 0!==n?n:0!==(n=oo(e.arrayValue,t.arrayValue))?n:0!==(n=oo(e.directionalValue,t.directionalValue))?n:rf.comparator(e.documentKey,t.documentKey)}function oo(e,t){for(let n=0;n<e.length&&n<t.length;++n){let r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ou{constructor(e){for(let t of(this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.Ge=e.orderBy,this.Qe=[],e.filters)){let n=t;n.dt()?this.je=n:this.Qe.push(n)}}We(e){let t=rm(e);if(void 0!==t&&!this.ze(t))return!1;let n=rg(e),r=0,i=0;for(;r<n.length&&this.ze(n[r]);++r);if(r===n.length)return!0;if(void 0!==this.je){let s=n[r];if(!this.He(this.je,s)||!this.Je(this.Ge[i++],s))return!1;++r}for(;r<n.length;++r){let a=n[r];if(i>=this.Ge.length||!this.Je(this.Ge[i++],a))return!1}return!0}ze(e){for(let t of this.Qe)if(this.He(t,e))return!0;return!1}He(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;let n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}Je(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}class ol{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new rG(rc.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new rG(rc.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let oc=new Uint8Array(0);class oh{constructor(e,t){this.user=e,this.databaseId=t,this.Xe=new ol,this.Ze=new sL(e=>iS(e),(e,t)=>ix(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Xe.has(t)){let n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Xe.add(t)});let i={collectionId:n,parent:ag(r)};return od(e).put(i)}return rx.resolve()}getCollectionParents(e,t){let n=[],r=IDBKeyRange.bound([t,""],[ra(t),""],!1,!0);return od(e).W(r).next(e=>{for(let r of e){if(r.collectionId!==t)break;n.push(a$(r.parent))}return n})}addFieldIndex(e,t){var n;let r=op(e),i={indexId:(n=t).indexId,collectionGroup:n.collectionGroup,fields:n.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};delete i.indexId;let s=r.add(i);if(t.indexState){let a=om(e);return s.next(e=>{a.put(aX(e,this.user,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let n=op(e),r=om(e),i=of(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,t){let n=of(e),r=!0,i=new Map;return rx.forEach(this.tn(t),t=>this.en(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=s9(),s=[];return rx.forEach(i,(r,i)=>{var a;nz("IndexedDbIndexManager",`Using index ${(a=r,`id=${a.indexId}|cg=${a.collectionGroup}|f=${a.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`)} to execute ${iS(t)}`);let o=function(e,t){let n=rm(t);if(void 0===n)return null;for(let r of iC(e,n.fieldPath))switch(r.op){case"array-contains-any":return r.value.arrayValue.values||[];case"array-contains":return[r.value]}return null}(i,r),u=function(e,t){let n=new Map;for(let r of rg(t))for(let i of iC(e,r.fieldPath))switch(i.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),i.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),i.value),Array.from(n.values())}return null}(i,r),l=function(e,t){let n=[],r=!0;for(let i of rg(t)){let s=0===i.kind?iA(e,i.fieldPath,e.startAt):iD(e,i.fieldPath,e.startAt);n.push(s.value),r&&(r=s.inclusive)}return new iq(n,r)}(i,r),c=function(e,t){let n=[],r=!0;for(let i of rg(t)){let s=0===i.kind?iD(e,i.fieldPath,e.endAt):iA(e,i.fieldPath,e.endAt);n.push(s.value),r&&(r=s.inclusive)}return new iq(n,r)}(i,r),h=this.nn(r,i,l),d=this.nn(r,i,c),f=this.sn(r,i,u),p=this.rn(r.indexId,o,h,l.inclusive,d,c.inclusive,f);return rx.forEach(p,r=>n.J(r,t.limit).next(t=>{t.forEach(t=>{let n=rf.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),s.push(n))})}))}).next(()=>s)}return rx.resolve(null)})}tn(e){let t=this.Ze.get(e);return t||(t=[e],this.Ze.set(e,t),t)}rn(e,t,n,r,i,s,a){let o=(null!=t?t.length:1)*Math.max(n.length,i.length),u=o/(null!=t?t.length:1),l=[];for(let c=0;c<o;++c){let h=t?this.on(t[c/u]):oc,d=this.un(e,h,n[c%u],r),f=this.cn(e,h,i[c%u],s),p=a.map(t=>this.un(e,h,t,!0));l.push(...this.createRange(d,f,p))}return l}un(e,t,n,r){let i=new os(e,rf.empty(),t,n);return r?i:i.Ke()}cn(e,t,n,r){let i=new os(e,rf.empty(),t,n);return r?i.Ke():i}en(e,t){let n=new ou(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(let r of e)n.We(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;return rx.forEach(this.tn(t),t=>this.en(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new rG(rd.comparator),n=!1;for(let r of e.filters){let i=r;i.field.isKeyField()||("array-contains"===i.op||"array-contains-any"===i.op?n=!0:t=t.add(i.field))}for(let s of e.orderBy)s.field.isKeyField()||(t=t.add(s.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>n)}an(e,t){let n=new oi;for(let r of rg(e)){let i=t.data.field(r.fieldPath);if(null==i)return null;let s=n.qe(r.kind);ot.Te.ce(i,s)}return n.$e()}on(e){let t=new oi;return ot.Te.ce(e,t.qe(0)),t.$e()}hn(e,t){let n=new oi;return ot.Te.ce(il(this.databaseId,t),n.qe(function(e){let t=rg(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.$e()}sn(e,t,n){if(null===n)return[];let r=[];r.push(new oi);let i=0;for(let s of rg(e)){let a=n[i++];for(let o of r)if(this.ln(t,s.fieldPath)&&ih(a))r=this.fn(r,s,a);else{let u=o.qe(s.kind);ot.Te.ce(a,u)}}return this.dn(r)}nn(e,t,n){return this.sn(e,t,n.position)}dn(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].$e();return t}fn(e,t,n){let r=[...e],i=[];for(let s of n.arrayValue.values||[])for(let a of r){let o=new oi;o.seed(a.$e()),ot.Te.ce(s,o.qe(t.kind)),i.push(o)}return i}ln(e,t){return!!e.filters.find(e=>e instanceof iN&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){let n=op(e),r=om(e);return(t?n.W("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.W()).next(e=>{let t=[];return rx.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){let n=t?new rw(t.sequenceNumber,new r8(aW(t.readTime),new rf(a$(t.documentKey)),t.largestBatchId)):rw.empty(),r=e.fields.map(([e,t])=>new rv(rd.fromServerFormat(e),t));return new rp(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{let n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:ri(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){let r=op(e),i=om(e);return this._n(e).next(e=>r.W("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(t=>rx.forEach(t,t=>i.put(aX(t.indexId,this.user,e,n)))))}updateIndexEntries(e,t){let n=new Map;return rx.forEach(t,(t,r)=>{let i=n.get(t.collectionGroup);return(i?rx.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),rx.forEach(i,n=>this.wn(e,t,n).next(t=>{let i=this.mn(r,n);return t.isEqual(i)?rx.resolve():this.gn(e,r,n,t,i)}))))})}yn(e,t,n,r){return of(e).put({indexId:r.indexId,uid:this.uid,arrayValue:r.arrayValue,directionalValue:r.directionalValue,orderedDocumentKey:this.hn(n,t.key),documentKey:t.key.path.toArray()})}pn(e,t,n,r){return of(e).delete([r.indexId,this.uid,r.arrayValue,r.directionalValue,this.hn(n,t.key),t.key.path.toArray()])}wn(e,t,n){let r=of(e),i=new rG(oa);return r.Z({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.hn(n,t)])},(e,r)=>{i=i.add(new os(n.indexId,t,r.arrayValue,r.directionalValue))}).next(()=>i)}mn(e,t){let n=new rG(oa),r=this.an(t,e);if(null==r)return n;let i=rm(t);if(null!=i){let s=e.data.field(i.fieldPath);if(ih(s))for(let a of s.arrayValue.values||[])n=n.add(new os(t.indexId,e.key,this.on(a),r))}else n=n.add(new os(t.indexId,e.key,oc,r));return n}gn(e,t,n,r,i){nz("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let s=[];return function(e,t,n,r,i){let s=e.getIterator(),a=t.getIterator(),o=r2(s),u=r2(a);for(;o||u;){let l=!1,c=!1;if(o&&u){let h=n(o,u);h<0?c=!0:h>0&&(l=!0)}else null!=o?c=!0:l=!0;l?(r(u),u=r2(a)):c?(i(o),o=r2(s)):(o=r2(s),u=r2(a))}}(r,i,oa,r=>{s.push(this.yn(e,t,n,r))},r=>{s.push(this.pn(e,t,n,r))}),rx.waitFor(s)}_n(e){let t=1;return om(e).Z({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>oa(e,t)).filter((e,t,n)=>!t||0!==oa(e,n[t-1]));let r=[];for(let i of(r.push(e),n)){let s=oa(i,e),a=oa(i,t);if(0===s)r[0]=e.Ke();else if(s>0&&a<0)r.push(i),r.push(i.Ke());else if(a>0)break}r.push(t);let o=[];for(let u=0;u<r.length;u+=2)o.push(IDBKeyRange.bound([r[u].indexId,this.uid,r[u].arrayValue,r[u].directionalValue,oc,[]],[r[u+1].indexId,this.uid,r[u+1].arrayValue,r[u+1].directionalValue,oc,[]]));return o}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(og)}getMinOffset(e,t){return rx.mapArray(this.tn(t),t=>this.en(e,t).next(e=>e||nH())).next(og)}}function od(e){return a0(e,"collectionParents")}function of(e){return a0(e,"indexEntries")}function op(e){return a0(e,"indexConfiguration")}function om(e){return a0(e,"indexState")}function og(e){var t;(t=0!==e.length)||nH();let n=e[0].indexState.offset,r=n.largestBatchId;for(let i=1;i<e.length;i++){let s=e[i].indexState.offset;0>rT(s,n)&&(n=s),r<s.largestBatchId&&(r=s.largestBatchId)}return new r8(n.readTime,n.documentKey,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let oy={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class ov{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new ov(e,ov.DEFAULT_COLLECTION_PERCENTILE,ov.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function o$(e,t,n){let r=e.store("mutations"),i=e.store("documentMutations"),s=[],a=IDBKeyRange.only(n.batchId),o=0,u=r.Z({range:a},(e,t,n)=>(o++,n.delete()));s.push(u.next(()=>{var e;(e=1===o)||nH()}));let l=[];for(let c of n.mutations){let h=ab(t,c.key.path,n.batchId);s.push(i.delete(h)),l.push(c.key)}return rx.waitFor(s).next(()=>l)}function ow(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw nH();t=e.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ ov.DEFAULT_COLLECTION_PERCENTILE=10,ov.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ov.DEFAULT=new ov(41943040,ov.DEFAULT_COLLECTION_PERCENTILE,ov.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ov.DISABLED=new ov(-1,0,0);class oI{constructor(e,t,n,r){this.userId=e,this.It=t,this.indexManager=n,this.referenceDelegate=r,this.In={}}static oe(e,t,n,r){var i;(i=""!==e.uid)||nH();let s=e.isAuthenticated()?e.uid:"";return new oI(s,t,n,r)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return o8(e).Z({index:"userMutationsIndex",range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){let i=oT(e),s=o8(e);return s.add({}).next(a=>{var o;(o="number"==typeof a)||nH();let u=new a9(a,t,n,r),l=function(e,t,n){let r=n.baseMutations.map(t=>au(e.re,t)),i=n.mutations.map(t=>au(e.re,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.It,this.userId,u),c=[],h=new rG((e,t)=>ri(e.canonicalString(),t.canonicalString()));for(let d of r){let f=ab(this.userId,d.key.path,a);h=h.add(d.key.path.popLast()),c.push(s.put(l)),c.push(i.put(f,a8))}return h.forEach(t=>{c.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.In[a]=u.keys()}),rx.waitFor(c).next(()=>u)})}lookupMutationBatch(e,t){return o8(e).get(t).next(e=>{var t;return e?(e.userId===this.userId||nH(),a7(this.It,e)):null})}Tn(e,t){return this.In[t]?rx.resolve(this.In[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){let n=e.keys();return this.In[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]),i=null;return o8(e).Z({index:"userMutationsIndex",range:r},(e,t,r)=>{var s;t.userId===this.userId&&(t.batchId>=n||nH(),i=a7(this.It,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return o8(e).Z({index:"userMutationsIndex",range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return o8(e).W("userMutationsIndex",t).next(e=>e.map(e=>a7(this.It,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=aI(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return oT(e).Z({range:r},(n,r,s)=>{let[a,o,u]=n,l=a$(o);if(a===this.userId&&t.path.isEqual(l))return o8(e).get(u).next(e=>{var t;if(!e)throw nH();e.userId===this.userId||nH(),i.push(a7(this.It,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new rG(ri),r=[];return t.forEach(t=>{let i=aI(this.userId,t.path),s=IDBKeyRange.lowerBound(i),a=oT(e).Z({range:s},(e,r,i)=>{let[s,a,o]=e,u=a$(a);s===this.userId&&t.path.isEqual(u)?n=n.add(o):i.done()});r.push(a)}),rx.waitFor(r).next(()=>this.En(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=aI(this.userId,n),s=IDBKeyRange.lowerBound(i),a=new rG(ri);return oT(e).Z({range:s},(e,t,i)=>{let[s,o,u]=e,l=a$(o);s===this.userId&&n.isPrefixOf(l)?l.length===r&&(a=a.add(u)):i.done()}).next(()=>this.En(e,a))}En(e,t){let n=[],r=[];return t.forEach(t=>{r.push(o8(e).get(t).next(e=>{var t;if(null===e)throw nH();e.userId===this.userId||nH(),n.push(a7(this.It,e))}))}),rx.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return o$(e.ie,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.An(t.batchId)}),rx.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}An(e){delete this.In[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return rx.resolve();let n=IDBKeyRange.lowerBound([this.userId]),r=[];return oT(e).Z({range:n},(e,t,n)=>{if(e[0]===this.userId){let i=a$(e[1]);r.push(i)}else n.done()}).next(()=>{var e;(e=0===r.length)||nH()})})}containsKey(e,t){return ob(e,this.userId,t)}Rn(e){return oE(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function ob(e,t,n){let r=aI(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r),a=!1;return oT(e).Z({range:s,X:!0},(e,n,r)=>{let[s,o,u]=e;s===t&&o===i&&(a=!0),r.done()}).next(()=>a)}function o8(e){return a0(e,"mutations")}function oT(e){return a0(e,"documentMutations")}function oE(e){return a0(e,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ok{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new ok(0)}static vn(){return new ok(-1)}}function oS(e){return a0(e,"targets")}function ox(e){return a0(e,"targetGlobal")}function o_(e){return a0(e,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function oC([e,t],[n,r]){let i=ri(e,n);return 0===i?ri(t,r):i}class oA{constructor(e){this.xn=e,this.buffer=new rG(oC),this.Nn=0}kn(){return++this.Nn}On(e){let t=[e,this.kn()];if(this.buffer.size<this.xn)this.buffer=this.buffer.add(t);else{let n=this.buffer.last();0>oC(t,n)&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class oD{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Mn=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Fn(6e4)}stop(){this.Mn&&(this.Mn.cancel(),this.Mn=null)}get started(){return null!==this.Mn}Fn(e){nz("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Mn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Mn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){rN(e)?nz("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await rS(e)}await this.Fn(3e5)})}}function oN(e,t){var n,r;return o_(e).put((n=t,r=e.currentSequenceNumber,{targetId:0,path:ag(n.path),sequenceNumber:r}))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oR{constructor(){this.changes=new sL(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,iT.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?rx.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oL{constructor(e){this.It=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return oF(e).put(n)}removeEntry(e,t,n){return oF(e).delete(function(e,t){let n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],a1(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Qn(e,n)))}getEntry(e,t){let n=iT.newInvalidDocument(t);return oF(e).Z({index:"documentKeyIndex",range:IDBKeyRange.only(oV(t))},(e,r)=>{n=this.jn(t,r)}).next(()=>n)}Wn(e,t){let n={size:0,document:iT.newInvalidDocument(t)};return oF(e).Z({index:"documentKeyIndex",range:IDBKeyRange.only(oV(t))},(e,r)=>{n={document:this.jn(t,r),size:ow(r)}}).next(()=>n)}getEntries(e,t){let n=sO;return this.zn(e,t,(e,t)=>{let r=this.jn(e,t);n=n.insert(e,r)}).next(()=>n)}Hn(e,t){let n=sO,r=new r0(rf.comparator);return this.zn(e,t,(e,t)=>{let i=this.jn(e,t);n=n.insert(e,i),r=r.insert(e,ow(t))}).next(()=>({documents:n,Jn:r}))}zn(e,t,n){if(t.isEmpty())return rx.resolve();let r=new rG(oq);t.forEach(e=>r=r.add(e));let i=IDBKeyRange.bound(oV(r.first()),oV(r.last())),s=r.getIterator(),a=s.getNext();return oF(e).Z({index:"documentKeyIndex",range:i},(e,t,r)=>{let i=rf.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&0>oq(a,i);)n(a,null),a=s.getNext();a&&a.isEqual(i)&&(n(a,t),a=s.hasNext()?s.getNext():null),a?r.j(oV(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=s.hasNext()?s.getNext():null})}getAllFromCollection(e,t,n){let r=[t.popLast().toArray(),t.lastSegment(),a1(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],i=[t.popLast().toArray(),t.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return oF(e).W(IDBKeyRange.bound(r,i,!0)).next(e=>{let t=sO;for(let n of e){let r=this.jn(rf.fromSegments(n.prefixPath.concat(n.collectionGroup,n.documentId)),n);t=t.insert(r.key,r)}return t})}getAllFromCollectionGroup(e,t,n,r){let i=sO,s=oU(t,n),a=oU(t,r8.max());return oF(e).Z({index:"collectionGroupIndex",range:IDBKeyRange.bound(s,a,!0)},(e,t,n)=>{let s=this.jn(rf.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);(i=i.insert(s.key,s)).size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new oP(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return oM(e).get("remoteDocumentGlobalKey").next(e=>(!e&&nH(),e))}Qn(e,t){return oM(e).put("remoteDocumentGlobalKey",t)}jn(e,t){if(t){let n=function(e,t){let n;if(t.document)n=ao(e.re,t.document,!!t.hasCommittedMutations);else if(t.noDocument){let r=rf.fromSegments(t.noDocument.path),i=aW(t.noDocument.readTime);n=iT.newNoDocument(r,i),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return nH();{let s=rf.fromSegments(t.unknownDocument.path),a=aW(t.unknownDocument.version);n=iT.newUnknownDocument(s,a)}}return t.readTime&&n.setReadTime(function(e){let t=new ro(e[0],e[1]);return ru.fromTimestamp(t)}(t.readTime)),n}(this.It,t);if(!(n.isNoDocument()&&n.version.isEqual(ru.min())))return n}return iT.newInvalidDocument(e)}}function oO(e){return new oL(e)}class oP extends oR{constructor(e,t){super(),this.Yn=e,this.trackRemovals=t,this.Xn=new sL(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){let t=[],n=0,r=new rG((e,t)=>ri(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{let a=this.Xn.get(i);if(t.push(this.Yn.removeEntry(e,i,a.readTime)),s.isValidDocument()){let o=aK(this.Yn.It,s);r=r.add(i.path.popLast());let u=ow(o);n+=u-a.size,t.push(this.Yn.addEntry(e,i,o))}else if(n-=a.size,this.trackRemovals){let l=aK(this.Yn.It,s.convertToNoDocument(ru.min()));t.push(this.Yn.addEntry(e,i,l))}}),r.forEach(n=>{t.push(this.Yn.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Yn.updateMetadata(e,n)),rx.waitFor(t)}getFromCache(e,t){return this.Yn.Wn(e,t).next(e=>(this.Xn.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Yn.Hn(e,t).next(({documents:e,Jn:t})=>(t.forEach((t,n)=>{this.Xn.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function oM(e){return a0(e,"remoteDocumentGlobal")}function oF(e){return a0(e,"remoteDocumentsV14")}function oV(e){let t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function oU(e,t){let n=t.documentKey.path.toArray();return[e,a1(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function oq(e,t){let n=e.path.toArray(),r=t.path.toArray(),i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=ri(n[s],r[s]))return i;return(i=ri(n.length,r.length))||(i=ri(n[n.length-2],r[r.length-2]))||ri(n[n.length-1],r[r.length-1])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oB{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class o0{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.getBaseDocument(e,t,n))).next(e=>(null!==n&&sb(n.mutation,e,rK.empty(),ro.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,s9()).next(()=>t))}getLocalViewOfDocuments(e,t,n=s9()){let r=sV();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=sM();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=sV();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,s9()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=sO,s=sq(),a=sq();return t.forEach((e,t)=>{let a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof sk)?i=i.insert(t.key,t):void 0!==a&&(s.set(t.key,a.mutation.getFieldMask()),sb(a.mutation,t,a.mutation.getFieldMask(),ro.now()))}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return a.set(e,new oB(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(e,t){let n=sq(),r=new r0((e,t)=>e-t),i=s9();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=n.get(e)||rK.empty();a=i.applyToLocalView(s,a),n.set(e,a);let o=(r.get(i.batchId)||s9()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{let s=[],a=r.getReverseIterator();for(;a.hasNext();){let o=a.getNext(),u=o.key,l=o.value,c=sU();l.forEach(e=>{if(!i.has(e)){let r=sw(t.get(e),n.get(e));null!==r&&c.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,u,c))}return rx.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){var r;return(r=t,rf.isDocumentKey(r.path)&&null===r.collectionGroup&&0===r.filters.length)?this.getDocumentsMatchingDocumentQuery(e,t.path):iW(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):rx.resolve(sV()),a=-1,o=i;return s.next(t=>rx.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?rx.resolve():this.getBaseDocument(e,t,n).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,s9())).next(e=>({batchId:a,changes:sF(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new rf(t)).next(e=>{let t=sM();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){let r=t.collectionGroup,i=sM();return this.indexManager.getCollectionParents(e,r).next(s=>rx.forEach(s,s=>{var a,o;let u=(a=t,o=s.child(r),new iG(o,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));return this.getDocumentsMatchingCollectionQuery(e,u,n).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n){let r;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next(i=>(r=i,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId))).next(e=>{e.forEach((e,t)=>{let n=t.getKey();null===r.get(n)&&(r=r.insert(n,iT.newInvalidDocument(n)))});let n=sM();return r.forEach((r,i)=>{let s=e.get(r);void 0!==s&&sb(s.mutation,i,rK.empty(),ro.now()),iX(t,i)&&(n=n.insert(r,i))}),n})}getBaseDocument(e,t,n){return null===n||1===n.mutation.type?this.remoteDocumentCache.getEntry(e,t):rx.resolve(iT.newInvalidDocument(t))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class o9{constructor(){this.overlays=new r0(rf.comparator),this.es=new Map}getOverlay(e,t){return rx.resolve(this.overlays.get(t))}getOverlays(e,t){let n=sV();return rx.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ue(e,t,r)}),rx.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.es.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.es.delete(n)),rx.resolve()}getOverlaysForCollection(e,t,n){let r=sV(),i=t.length+1,s=new rf(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let o=a.getNext().value,u=o.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&o.largestBatchId>n&&r.set(o.getKey(),o)}return rx.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new r0((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let a=s.getNext().value;if(a.getKey().getCollectionGroup()===t&&a.largestBatchId>n){let o=i.get(a.largestBatchId);null===o&&(o=sV(),i=i.insert(a.largestBatchId,o)),o.set(a.getKey(),a)}}let u=sV(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((e,t)=>u.set(e,t)),!(u.size()>=r)););return rx.resolve(u)}ue(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let i=this.es.get(r.largestBatchId).delete(n.key);this.es.set(r.largestBatchId,i)}this.overlays=this.overlays.insert(n.key,new aG(t,n));let s=this.es.get(t);void 0===s&&(s=s9(),this.es.set(t,s)),this.es.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oj{constructor(){this.ns=new rG(oG.ss),this.rs=new rG(oG.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){let n=new oG(e,t);this.ns=this.ns.add(n),this.rs=this.rs.add(n)}us(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.cs(new oG(e,t))}hs(e,t){e.forEach(e=>this.removeReference(e,t))}ls(e){let t=new rf(new rc([])),n=new oG(t,e),r=new oG(t,e+1),i=[];return this.rs.forEachInRange([n,r],e=>{this.cs(e),i.push(e.key)}),i}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){let t=new rf(new rc([])),n=new oG(t,e),r=new oG(t,e+1),i=s9();return this.rs.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new oG(e,0),n=this.ns.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class oG{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return rf.comparator(e.key,t.key)||ri(e._s,t._s)}static os(e,t){return ri(e._s,t._s)||rf.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oz{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new rG(oG.ss)}checkEmpty(e){return rx.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new a9(i,t,n,r);for(let a of(this.mutationQueue.push(s),r))this.gs=this.gs.add(new oG(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return rx.resolve(s)}lookupMutationBatch(e,t){return rx.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.ps(t+1),r=n<0?0:n;return rx.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return rx.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return rx.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new oG(t,0),r=new oG(t,Number.POSITIVE_INFINITY),i=[];return this.gs.forEachInRange([n,r],e=>{let t=this.ys(e._s);i.push(t)}),rx.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new rG(ri);return t.forEach(e=>{let t=new oG(e,0),r=new oG(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,r],e=>{n=n.add(e._s)})}),rx.resolve(this.Is(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;rf.isDocumentKey(i)||(i=i.child(""));let s=new oG(new rf(i),0),a=new rG(ri);return this.gs.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e._s)),!0)},s),rx.resolve(this.Is(a))}Is(e){let t=[];return e.forEach(e=>{let n=this.ys(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){var n;0===this.Ts(t.batchId,"removed")||nH(),this.mutationQueue.shift();let r=this.gs;return rx.forEach(t.mutations,n=>{let i=new oG(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.gs=r})}An(e){}containsKey(e,t){let n=new oG(t,0),r=this.gs.firstAfterOrEqual(n);return rx.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,rx.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){let t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}class o2 extends oR{constructor(e){super(),this.Yn=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Yn.addEntry(e,r)):this.Yn.removeEntry(n)}),rx.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oK{constructor(e,t){var n;this.Vs={},this.overlays={},this.Ss=new rV(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e){this.persistence=e,this.Rs=new sL(e=>iS(e),ix),this.lastRemoteSnapshotVersion=ru.min(),this.highestTargetId=0,this.bs=0,this.Ps=new oj,this.targetCount=0,this.vs=ok.Pn()}forEachTarget(e,t){return this.Rs.forEach((e,n)=>t(n)),rx.resolve()}getLastRemoteSnapshotVersion(e){return rx.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return rx.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),rx.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),rx.resolve()}Dn(e){this.Rs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.vs=new ok(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,rx.resolve()}updateTargetData(e,t){return this.Dn(t),rx.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,rx.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.Rs.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.Rs.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),rx.waitFor(i).next(()=>r)}getTargetCount(e){return rx.resolve(this.targetCount)}getTargetData(e,t){let n=this.Rs.get(t)||null;return rx.resolve(n)}addMatchingKeys(e,t,n){return this.Ps.us(t,n),rx.resolve()}removeMatchingKeys(e,t,n){this.Ps.hs(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),rx.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),rx.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Ps.ds(t);return rx.resolve(n)}containsKey(e,t){return rx.resolve(this.Ps.containsKey(t))}}(this),this.indexManager=new /**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(){this.Ye=new ol}addToCollectionParentIndex(e,t){return this.Ye.add(t),rx.resolve()}getCollectionParents(e,t){return rx.resolve(this.Ye.getEntries(t))}addFieldIndex(e,t){return rx.resolve()}deleteFieldIndex(e,t){return rx.resolve()}getDocumentsMatchingTarget(e,t){return rx.resolve(null)}getIndexType(e,t){return rx.resolve(0)}getFieldIndexes(e,t){return rx.resolve([])}getNextCollectionGroupToUpdate(e){return rx.resolve(null)}getMinOffset(e,t){return rx.resolve(r8.min())}getMinOffsetFromCollectionGroup(e,t){return rx.resolve(r8.min())}updateCollectionGroup(e,t,n){return rx.resolve()}updateIndexEntries(e,t){return rx.resolve()}},this.remoteDocumentCache=(n=e=>this.referenceDelegate.xs(e),new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class e{constructor(e){this.Es=e,this.docs=new r0(rf.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Es(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return rx.resolve(n?n.document.mutableCopy():iT.newInvalidDocument(t))}getEntries(e,t){let n=sO;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():iT.newInvalidDocument(e))}),rx.resolve(n)}getAllFromCollection(e,t,n){let r=sO,i=new rf(t.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){let{key:a,value:{document:o}}=s.getNext();if(!t.isPrefixOf(a.path))break;a.path.length>t.length+1||0>=rT(rb(o),n)||(r=r.insert(o.key,o.mutableCopy()))}return rx.resolve(r)}getAllFromCollectionGroup(e,t,n,r){nH()}As(e,t){return rx.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new o2(this)}getSize(e){return rx.resolve(this.size)}}(n)),this.It=new a2(t),this.Ns=new /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e){this.It=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return rx.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){var n;return this.Zn.set(t.id,{id:(n=t).id,version:n.version,createTime:sY(n.createTime)}),rx.resolve()}getNamedQuery(e,t){return rx.resolve(this.ts.get(t))}saveNamedQuery(e,t){var n;return this.ts.set(t.name,{name:(n=t).name,query:a4(n.bundledQuery),readTime:sY(n.readTime)}),rx.resolve()}}(this.It)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new o9,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Vs[e.toKey()];return n||(n=new oz(t,this.referenceDelegate),this.Vs[e.toKey()]=n),n}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,n){nz("MemoryPersistence","Starting transaction:",e);let r=new o1(this.Ss.next());return this.referenceDelegate.ks(),n(r).next(e=>this.referenceDelegate.Os(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ms(e,t){return rx.or(Object.values(this.Vs).map(n=>()=>n.containsKey(e,t)))}}class o1 extends rk{constructor(e){super(),this.currentSequenceNumber=e}}class oH{constructor(e){this.persistence=e,this.Fs=new oj,this.$s=null}static Bs(e){return new oH(e)}get Ls(){if(this.$s)return this.$s;throw nH()}addReference(e,t,n){return this.Fs.addReference(n,t),this.Ls.delete(n.toString()),rx.resolve()}removeReference(e,t,n){return this.Fs.removeReference(n,t),this.Ls.add(n.toString()),rx.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),rx.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach(e=>this.Ls.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Ls.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}ks(){this.$s=new Set}Os(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return rx.forEach(this.Ls,n=>{let r=rf.fromPath(n);return this.Us(e,r).next(e=>{e||t.removeEntry(r,ru.min())})}).next(()=>(this.$s=null,t.apply(e)))}updateLimboDocument(e,t){return this.Us(e,t).next(e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())})}xs(e){return 0}Us(e,t){return rx.or([()=>rx.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}}function oW(e){e.createObjectStore("targetDocuments",{keyPath:ax}).createIndex("documentTargetsIndex",a_,{unique:!0}),e.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",aS,{unique:!0}),e.createObjectStore("targetGlobal")}let o7="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class o3{constructor(e,t,n,r,i,s,a,o,u,l,c=15){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Hs=i,this.window=s,this.document=a,this.Js=u,this.Ys=l,this.Xs=c,this.Ss=null,this.Ds=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Zs=null,this.inForeground=!1,this.ti=null,this.ei=null,this.ni=Number.NEGATIVE_INFINITY,this.si=e=>Promise.resolve(),!o3.C())throw new n3(n7.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e,t){var n,r;this.db=e,this.garbageCollector=(n=this,r=t,new class e{constructor(e,t){this.$n=e,this.params=t}calculateTargetCount(e,t){return this.$n.Bn(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return rx.resolve(rV.at);let n=new oA(t);return this.$n.forEachTarget(e,e=>n.On(e.sequenceNumber)).next(()=>this.$n.Ln(e,e=>n.On(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.$n.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.$n.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(nz("LruGarbageCollector","Garbage collection skipped; disabled"),rx.resolve(oy)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(nz("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),oy):this.Un(e,t))}getCacheSize(e){return this.$n.getCacheSize(e)}Un(e,t){let n,r,i,s,a,o,u,l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(nz("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),nj()<=p.in.DEBUG&&nz("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-l}ms
	Determined least recently used ${r} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(u-o)+"ms\n"+`Total Duration: ${u-l}ms`),rx.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}(n,r))}Bn(e){let t=this.qn(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}qn(e){let t=0;return this.Ln(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Ln(e,t){return this.Kn(e,(e,n)=>t(n))}addReference(e,t,n){return oN(e,n)}removeReference(e,t,n){return oN(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return oN(e,t)}Gn(e,t){var n,r;let i;return n=e,r=t,i=!1,oE(n).tt(e=>ob(n,e,r).next(e=>(e&&(i=!0),rx.resolve(!e)))).next(()=>i)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[],i=0;return this.Kn(e,(s,a)=>{if(a<=t){let o=this.Gn(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,ru.min()),o_(e).delete([0,ag(s.path)])))});r.push(o)}}).next(()=>rx.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return oN(e,t)}Kn(e,t){let n=o_(e),r,i=rV.at;return n.Z({index:"documentTargetsIndex"},([e,n],{path:s,sequenceNumber:a})=>{0===e?(i!==rV.at&&t(new rf(a$(r)),i),i=a,r=s):i=rV.at}).next(()=>{i!==rV.at&&t(new rf(a$(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}(this,r),this.ii=t+"main",this.It=new a2(o),this.ri=new rC(this.ii,this.Xs,new /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e){this.It=e}$(e,t,n,r){var i,s;let a=new r_("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore("owner")}(e),(i=e).createObjectStore("mutationQueues",{keyPath:"userId"}),i.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",aw,{unique:!0}),i.createObjectStore("documentMutations"),oW(e),function(e){e.createObjectStore("remoteDocuments")}(e));let o=rx.resolve();return n<3&&r>=3&&(0!==n&&((s=e).deleteObjectStore("targetDocuments"),s.deleteObjectStore("targets"),s.deleteObjectStore("targetGlobal"),oW(e)),o=o.next(()=>(function(e){let t=e.store("targetGlobal"),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ru.min().toTimestamp(),targetCount:0};return t.put("targetGlobalKey",n)})(a))),n<4&&r>=4&&(0!==n&&(o=o.next(()=>{var t,n;return t=e,(n=a).store("mutations").W().next(e=>{t.deleteObjectStore("mutations"),t.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",aw,{unique:!0});let r=n.store("mutations"),i=e.map(e=>r.put(e));return rx.waitFor(i)})})),o=o.next(()=>{!function(e){e.createObjectStore("clientMetadata",{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(o=o.next(()=>this.qs(a))),n<6&&r>=6&&(o=o.next(()=>((function(e){e.createObjectStore("remoteDocumentGlobal")})(e),this.Ks(a)))),n<7&&r>=7&&(o=o.next(()=>this.Gs(a))),n<8&&r>=8&&(o=o.next(()=>this.Qs(e,a))),n<9&&r>=9&&(o=o.next(()=>{var t;(t=e).objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")})),n<10&&r>=10&&(o=o.next(()=>this.js(a))),n<11&&r>=11&&(o=o.next(()=>{(function(e){e.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(e){e.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&r>=12&&(o=o.next(()=>{!function(e){let t=e.createObjectStore("documentOverlays",{keyPath:aL});t.createIndex("collectionPathOverlayIndex",aO,{unique:!1}),t.createIndex("collectionGroupOverlayIndex",aP,{unique:!1})}(e)})),n<13&&r>=13&&(o=o.next(()=>(function(e){let t=e.createObjectStore("remoteDocumentsV14",{keyPath:aT});t.createIndex("documentKeyIndex",aE),t.createIndex("collectionGroupIndex",ak)})(e)).next(()=>this.Ws(e,a)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&r>=14&&(o=o.next(()=>this.zs(e,a))),n<15&&r>=15&&(o=o.next(()=>{var t;(t=e).createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),t.createObjectStore("indexState",{keyPath:aA}).createIndex("sequenceNumberIndex",aD,{unique:!1}),t.createObjectStore("indexEntries",{keyPath:aN}).createIndex("documentKeyIndex",aR,{unique:!1})})),o}Ks(e){let t=0;return e.store("remoteDocuments").Z((e,n)=>{t+=ow(n)}).next(()=>{let n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}qs(e){let t=e.store("mutationQueues"),n=e.store("mutations");return t.W().next(t=>rx.forEach(t,t=>{let r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.W("userMutationsIndex",r).next(n=>rx.forEach(n,n=>{var r;(r=n.userId===t.userId)||nH();let i=a7(this.It,n);return o$(e,t.userId,i).next(()=>{})}))}))}Gs(e){let t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(e=>{let r=[];return n.Z((n,i)=>{var s;let a=new rc(n),o=(s=a,[0,ag(s)]);r.push(t.get(o).next(n=>{var r;return n?rx.resolve():(r=a,t.put({targetId:0,path:ag(r),sequenceNumber:e.highestListenSequenceNumber}))}))}).next(()=>rx.waitFor(r))})}Qs(e,t){e.createObjectStore("collectionParents",{keyPath:aC});let n=t.store("collectionParents"),r=new ol,i=e=>{if(r.add(e)){let t=e.lastSegment(),i=e.popLast();return n.put({collectionId:t,parent:ag(i)})}};return t.store("remoteDocuments").Z({X:!0},(e,t)=>{let n=new rc(e);return i(n.popLast())}).next(()=>t.store("documentMutations").Z({X:!0},([e,t,n],r)=>{let s=a$(t);return i(s.popLast())}))}js(e){let t=e.store("targets");return t.Z((e,n)=>{let r=a3(n),i=aQ(this.It,r);return t.put(i)})}Ws(e,t){let n=t.store("remoteDocuments"),r=[];return n.Z((e,n)=>{var i;let s=t.store("remoteDocumentsV14"),a=((i=n).document?new rf(rc.fromString(i.document.name).popFirst(5)):i.noDocument?rf.fromSegments(i.noDocument.path):i.unknownDocument?rf.fromSegments(i.unknownDocument.path):nH()).path.toArray(),o={prefixPath:a.slice(0,a.length-2),collectionGroup:a[a.length-2],documentId:a[a.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>rx.waitFor(r))}zs(e,t){let n=t.store("mutations"),r=oO(this.It),i=new oK(oH.Bs,this.It.re);return n.W().next(e=>{let n=new Map;return e.forEach(e=>{var t;let r=null!==(t=n.get(e.userId))&&void 0!==t?t:s9();a7(this.It,e).keys().forEach(e=>r=r.add(e)),n.set(e.userId,r)}),rx.forEach(n,(e,n)=>{let s=new nB(n),a=aJ.oe(this.It,s),o=i.getIndexManager(s),u=oI.oe(s,this.It,o,i.referenceDelegate);return new o0(r,u,a,o).recalculateAndSaveOverlaysForDocumentKeys(new aB(t,rV.at),e).next()})})}}(this.It)),this.Cs=new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e,t){this.referenceDelegate=e,this.It=t}allocateTargetId(e){return this.Vn(e).next(t=>{let n=new ok(t.highestTargetId);return t.highestTargetId=n.next(),this.Sn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Vn(e).next(e=>ru.fromTimestamp(new ro(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Vn(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Vn(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.Sn(e,r)))}addTargetData(e,t){return this.Dn(e,t).next(()=>this.Vn(e).next(n=>(n.targetCount+=1,this.Cn(t,n),this.Sn(e,n))))}updateTargetData(e,t){return this.Dn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>oS(e).delete(t.targetId)).next(()=>this.Vn(e)).next(t=>{var n;return t.targetCount>0||nH(),t.targetCount-=1,this.Sn(e,t)})}removeTargets(e,t,n){let r=0,i=[];return oS(e).Z((s,a)=>{let o=a3(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,i.push(this.removeTargetData(e,o)))}).next(()=>rx.waitFor(i)).next(()=>r)}forEachTarget(e,t){return oS(e).Z((e,n)=>{let r=a3(n);t(r)})}Vn(e){return ox(e).get("targetGlobalKey").next(e=>(null!==e||nH(),e))}Sn(e,t){return ox(e).put("targetGlobalKey",t)}Dn(e,t){return oS(e).put(aQ(this.It,t))}Cn(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Vn(e).next(e=>e.targetCount)}getTargetData(e,t){let n=iS(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),i=null;return oS(e).Z({range:r,index:"queryTargetsIndex"},(e,n,r)=>{let s=a3(n);ix(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){let r=[],i=o_(e);return t.forEach(t=>{let s=ag(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),rx.waitFor(r)}removeMatchingKeys(e,t,n){let r=o_(e);return rx.forEach(t,t=>{let i=ag(t.path);return rx.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){let n=o_(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),r=o_(e),i=s9();return r.Z({range:n,X:!0},(e,t,n)=>{let r=a$(e[1]),s=new rf(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){let n=ag(t.path),r=IDBKeyRange.bound([n],[ra(n)],!1,!0),i=0;return o_(e).Z({index:"documentTargetsIndex",X:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}se(e,t){return oS(e).get(t).next(e=>e?a3(e):null)}}(this.referenceDelegate,this.It),this.remoteDocumentCache=oO(this.It),this.Ns=new /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{getBundleMetadata(e,t){return aY(e).get(t).next(e=>{var t;if(e)return{id:(t=e).bundleId,createTime:aW(t.createTime),version:t.version}})}saveBundleMetadata(e,t){var n;return aY(e).put({bundleId:(n=t).id,createTime:aH(sY(n.createTime)),version:n.version})}getNamedQuery(e,t){return a5(e).get(t).next(e=>{var t;if(e)return{name:(t=e).name,query:a4(t.bundledQuery),readTime:aW(t.readTime)}})}saveNamedQuery(e,t){var n;return a5(e).put({name:(n=t).name,readTime:aH(sY(n.readTime)),bundledQuery:n.bundledQuery})}},this.window&&this.window.localStorage?this.oi=this.window.localStorage:(this.oi=null,!1===l&&n2("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.ui().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new n3(n7.FAILED_PRECONDITION,o7);return this.ci(),this.ai(),this.hi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Cs.getHighestSequenceNumber(e))}).then(e=>{this.Ss=new rV(e,this.Js)}).then(()=>{this.Ds=!0}).catch(e=>(this.ri&&this.ri.close(),Promise.reject(e)))}li(e){return this.si=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.ri.L(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Hs.enqueueAndForget(async()=>{this.started&&await this.ui()}))}ui(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>o4(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.fi(e).next(e=>{e||(this.isPrimary=!1,this.Hs.enqueueRetryable(()=>this.si(!1)))})}).next(()=>this.di(e)).next(t=>this.isPrimary&&!t?this._i(e).next(()=>!1):!!t&&this.wi(e).next(()=>!0))).catch(e=>{if(rN(e))return nz("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return nz("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Hs.enqueueRetryable(()=>this.si(e)),this.isPrimary=e})}fi(e){return oQ(e).get("owner").next(e=>rx.resolve(this.mi(e)))}gi(e){return o4(e).delete(this.clientId)}async yi(){if(this.isPrimary&&!this.pi(this.ni,18e5)){this.ni=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{let t=a0(e,"clientMetadata");return t.W().next(e=>{let n=this.Ii(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return rx.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.oi)for(let t of e)this.oi.removeItem(this.Ti(t.clientId))}}hi(){this.ei=this.Hs.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.ui().then(()=>this.yi()).then(()=>this.hi()))}mi(e){return!!e&&e.ownerId===this.clientId}di(e){return this.Ys?rx.resolve(!0):oQ(e).get("owner").next(t=>{if(null!==t&&this.pi(t.leaseTimestampMs,5e3)&&!this.Ei(t.ownerId)){if(this.mi(t)&&this.networkEnabled)return!0;if(!this.mi(t)){if(!t.allowTabSynchronization)throw new n3(n7.FAILED_PRECONDITION,o7);return!1}}return!(!this.networkEnabled||!this.inForeground)||o4(e).W().next(e=>void 0===this.Ii(e,5e3).find(e=>{if(this.clientId!==e.clientId){let t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&nz("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.Ds=!1,this.Ai(),this.ei&&(this.ei.cancel(),this.ei=null),this.Ri(),this.bi(),await this.ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new aB(e,rV.at);return this._i(t).next(()=>this.gi(t))}),this.ri.close(),this.Pi()}Ii(e,t){return e.filter(e=>this.pi(e.updateTimeMs,t)&&!this.Ei(e.clientId))}vi(){return this.runTransaction("getActiveClients","readonly",e=>o4(e).W().next(e=>this.Ii(e,18e5).map(e=>e.clientId)))}get started(){return this.Ds}getMutationQueue(e,t){return oI.oe(e,this.It,t,this.referenceDelegate)}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new oh(e,this.It.re.databaseId)}getDocumentOverlayCache(e){return aJ.oe(this.It,e)}getBundleCache(){return this.Ns}runTransaction(e,t,n){var r;nz("IndexedDbPersistence","Starting transaction:",e);let i=15===(r=this.Xs)?aq:14===r?aU:13===r?aV:12===r?aF:11===r?aM:void nH(),s;return this.ri.runTransaction(e,"readonly"===t?"readonly":"readwrite",i,r=>(s=new aB(r,this.Ss?this.Ss.next():rV.at),"readwrite-primary"===t?this.fi(s).next(e=>!!e||this.di(s)).next(t=>{if(!t)throw n2(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Hs.enqueueRetryable(()=>this.si(!1)),new n3(n7.FAILED_PRECONDITION,rE);return n(s)}).next(e=>this.wi(s).next(()=>e)):this.Vi(s).next(()=>n(s)))).then(e=>(s.raiseOnCommittedEvent(),e))}Vi(e){return oQ(e).get("owner").next(e=>{if(null!==e&&this.pi(e.leaseTimestampMs,5e3)&&!this.Ei(e.ownerId)&&!this.mi(e)&&!(this.Ys||this.allowTabSynchronization&&e.allowTabSynchronization))throw new n3(n7.FAILED_PRECONDITION,o7)})}wi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return oQ(e).put("owner",t)}static C(){return rC.C()}_i(e){let t=oQ(e);return t.get("owner").next(e=>this.mi(e)?(nz("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):rx.resolve())}pi(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(n2(`Detected an update time that is in the future: ${e} > ${n}`),!1))}ci(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.ti=()=>{this.Hs.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.ui()))},this.document.addEventListener("visibilitychange",this.ti),this.inForeground="visible"===this.document.visibilityState)}Ri(){this.ti&&(this.document.removeEventListener("visibilitychange",this.ti),this.ti=null)}ai(){var e;"function"==typeof(null===(e=this.window)||void 0===e?void 0:e.addEventListener)&&(this.Zs=()=>{this.Ai(),(0,m.G6)()&&navigator.appVersion.match(/Version\/1[45]/)&&this.Hs.enterRestrictedMode(!0),this.Hs.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Zs))}bi(){this.Zs&&(this.window.removeEventListener("pagehide",this.Zs),this.Zs=null)}Ei(e){var t;try{let n=null!==(null===(t=this.oi)||void 0===t?void 0:t.getItem(this.Ti(e)));return nz("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(r){return n2("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Ai(){if(this.oi)try{this.oi.setItem(this.Ti(this.clientId),String(Date.now()))}catch(e){n2("Failed to set zombie client id.",e)}}Pi(){if(this.oi)try{this.oi.removeItem(this.Ti(this.clientId))}catch(e){}}Ti(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function oQ(e){return a0(e,"owner")}function o4(e){return a0(e,"clientMetadata")}function o6(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oZ{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Si=n,this.Di=r}static Ci(e,t){let n=s9(),r=s9();for(let i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new oZ(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oX{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,n,r){return this.ki(e,t).next(i=>i||this.Oi(e,t,r,n)).next(n=>n||this.Mi(e,t))}ki(e,t){if(iK(t))return rx.resolve(null);let n=i3(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=iQ(t,null,"F"),n=i3(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=s9(...r);return this.Ni.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.Fi(t,r);return this.$i(t,s,i,n.readTime)?this.ki(e,iQ(t,null,"F")):this.Bi(e,s,t,n)}))})))}Oi(e,t,n,r){return iK(t)||r.isEqual(ru.min())?this.Mi(e,t):this.Ni.getDocuments(e,n).next(i=>{let s=this.Fi(t,i);return this.$i(t,s,n,r)?this.Mi(e,t):(nj()<=p.in.DEBUG&&nz("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),iZ(t)),this.Bi(e,s,t,rI(r,-1)))})}Fi(e,t){let n=new rG(i5(e));return t.forEach((t,r)=>{iX(e,r)&&(n=n.add(r))}),n}$i(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Mi(e,t){return nj()<=p.in.DEBUG&&nz("QueryEngine","Using full collection scan to execute query:",iZ(t)),this.Ni.getDocumentsMatchingQuery(e,t,r8.min())}Bi(e,t,n,r){return this.Ni.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class oY{constructor(e,t,n,r){this.persistence=e,this.Li=t,this.It=r,this.Ui=new r0(ri),this.qi=new sL(e=>iS(e),ix),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(n)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new o0(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ui))}}function o5(e,t,n,r){return new oY(e,t,n,r)}async function oJ(e,t){var n;let r=n=e;return await r.persistence.runTransaction("Handle user change","readonly",e=>{let n;return r.mutationQueue.getAllMutationBatches(e).next(i=>(n=i,r.Qi(t),r.mutationQueue.getAllMutationBatches(e))).next(t=>{let i=[],s=[],a=s9();for(let o of n)for(let u of(i.push(o.batchId),o.mutations))a=a.add(u.key);for(let l of t)for(let c of(s.push(l.batchId),l.mutations))a=a.add(c.key);return r.localDocuments.getDocuments(e,a).next(e=>({ji:e,removedBatchIds:i,addedBatchIds:s}))})})}function ue(e){var t;let n=t=e;return n.persistence.runTransaction("Get last remote snapshot version","readonly",e=>n.Cs.getLastRemoteSnapshotVersion(e))}function ut(e,t,n){let r=s9(),i=s9();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=sO;return n.forEach((n,s)=>{let a=e.get(n);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(ru.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):nz("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)}),{Wi:r,zi:i}})}function un(e,t){var n;let r=n=e;return r.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),r.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function ur(e,t){var n;let r=n=e;return r.persistence.runTransaction("Allocate target","readwrite",e=>{let n;return r.Cs.getTargetData(e,t).next(i=>i?(n=i,rx.resolve(n)):r.Cs.allocateTargetId(e).next(i=>(n=new az(t,i,0,e.currentSequenceNumber),r.Cs.addTargetData(e,n).next(()=>n))))}).then(e=>{let n=r.Ui.get(e.targetId);return(null===n||e.snapshotVersion.compareTo(n.snapshotVersion)>0)&&(r.Ui=r.Ui.insert(e.targetId,e),r.qi.set(t,e.targetId)),e})}async function ui(e,t,n){var r;let i=r=e,s=i.Ui.get(t);try{n||await i.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",e=>i.persistence.referenceDelegate.removeTarget(e,s))}catch(a){if(!rN(a))throw a;nz("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}i.Ui=i.Ui.remove(t),i.qi.delete(s.target)}function us(e,t,n){var r;let i=r=e,s=ru.min(),a=s9();return i.persistence.runTransaction("Execute query","readonly",e=>(function(e,t,n){var r;let i=r=e,s=i.qi.get(n);return void 0!==s?rx.resolve(i.Ui.get(s)):i.Cs.getTargetData(t,n)})(i,e,i3(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,i.Cs.getMatchingKeysForTargetId(e,t.targetId).next(e=>{a=e})}).next(()=>i.Li.getDocumentsMatchingQuery(e,t,n?s:ru.min(),n?a:s9())).next(e=>(uu(i,iY(t),e),{documents:e,Hi:a})))}function ua(e,t){var n,r;let i=n=e,s=r=i.Cs,a=i.Ui.get(t);return a?Promise.resolve(a.target):i.persistence.runTransaction("Get target data","readonly",e=>s.se(e,t).next(e=>e?e.target:null))}function uo(e,t){var n;let r=n=e,i=r.Ki.get(t)||ru.min();return r.persistence.runTransaction("Get new document changes","readonly",e=>r.Gi.getAllFromCollectionGroup(e,t,rI(i,-1),Number.MAX_SAFE_INTEGER)).then(e=>(uu(r,t,e),e))}function uu(e,t,n){let r=e.Ki.get(t)||ru.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ki.set(t,r)}async function ul(e,t,n,r){var i,s;let a=i=e,o=s9(),u=sO;for(let l of n){let c=t.Ji(l.metadata.name);l.document&&(o=o.add(c));let h=t.Yi(l);h.setReadTime(t.Xi(l.metadata.readTime)),u=u.insert(c,h)}let d=a.Gi.newChangeBuffer({trackRemovals:!0}),f=await ur(a,(s=r,i3(i2(rc.fromString(`__bundle__/docs/${s}`)))));return a.persistence.runTransaction("Apply bundle documents","readwrite",e=>ut(e,d,u).next(t=>(d.apply(e),t)).next(t=>a.Cs.removeMatchingKeysForTargetId(e,f.targetId).next(()=>a.Cs.addMatchingKeys(e,o,f.targetId)).next(()=>a.localDocuments.getLocalViewOfDocuments(e,t.Wi,t.zi)).next(()=>t.Wi)))}async function uc(e,t,n=s9()){var r;let i=await ur(e,i3(a4(t.bundledQuery))),s=r=e;return s.persistence.runTransaction("Save named query","readwrite",e=>{let r=sY(t.readTime);if(i.snapshotVersion.compareTo(r)>=0)return s.Ns.saveNamedQuery(e,t);let a=i.withResumeToken(rH.EMPTY_BYTE_STRING,r);return s.Ui=s.Ui.insert(a.targetId,a),s.Cs.updateTargetData(e,a).next(()=>s.Cs.removeMatchingKeysForTargetId(e,i.targetId)).next(()=>s.Cs.addMatchingKeys(e,n,i.targetId)).next(()=>s.Ns.saveNamedQuery(e,t))})}function uh(e,t){return`firestore_clients_${e}_${t}`}function ud(e,t,n){let r=`firestore_mutations_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}function uf(e,t){return`firestore_targets_${e}_${t}`}class up{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static Zi(e,t,n){let r=JSON.parse(n),i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code)&&(i=new n3(r.error.code,r.error.message)),s?new up(e,t,r.state,i):(n2("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}tr(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class um{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Zi(e,t){let n=JSON.parse(t),r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code)&&(r=new n3(n.error.code,n.error.message)),i?new um(e,n.state,r):(n2("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}tr(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ug{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Zi(e,t){let n=JSON.parse(t),r="object"==typeof n&&n.activeTargetIds instanceof Array,i=sj;for(let s=0;r&&s<n.activeTargetIds.length;++s)r=rJ(n.activeTargetIds[s]),i=i.add(n.activeTargetIds[s]);return r?new ug(e,i):(n2("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class uy{constructor(e,t){this.clientId=e,this.onlineState=t}static Zi(e){let t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new uy(t.clientId,t.onlineState):(n2("SharedClientState",`Failed to parse online state: ${e}`),null)}}class uv{constructor(){this.activeTargetIds=sj}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class u${constructor(e,t,n,r,i){var s,a,o;this.window=e,this.Hs=t,this.persistenceKey=n,this.sr=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ir=this.rr.bind(this),this.ur=new r0(ri),this.started=!1,this.cr=[];let u=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.ar=uh(this.persistenceKey,this.sr),this.hr=`firestore_sequence_number_${s=this.persistenceKey}`,this.ur=this.ur.insert(this.sr,new uv),this.lr=RegExp(`^firestore_clients_${u}_([^_]*)$`),this.dr=RegExp(`^firestore_mutations_${u}_(\\d+)(?:_(.*))?$`),this._r=RegExp(`^firestore_targets_${u}_(\\d+)$`),this.wr=`firestore_online_state_${a=this.persistenceKey}`,this.mr=`firestore_bundle_loaded_v2_${o=this.persistenceKey}`,this.window.addEventListener("storage",this.ir)}static C(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.vi();for(let t of e){if(t===this.sr)continue;let n=this.getItem(uh(this.persistenceKey,t));if(n){let r=ug.Zi(t,n);r&&(this.ur=this.ur.insert(r.clientId,r))}}this.gr();let i=this.storage.getItem(this.wr);if(i){let s=this.yr(i);s&&this.pr(s)}for(let a of this.cr)this.rr(a);this.cr=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.hr,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Ir(this.ur)}isActiveQueryTarget(e){let t=!1;return this.ur.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Tr(e,"pending")}updateMutationState(e,t,n){this.Tr(e,t,n),this.Er(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){let n=this.storage.getItem(uf(this.persistenceKey,e));if(n){let r=um.Zi(e,n);r&&(t=r.state)}}return this.Ar.er(e),this.gr(),t}removeLocalQueryTarget(e){this.Ar.nr(e),this.gr()}isLocalQueryTarget(e){return this.Ar.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(uf(this.persistenceKey,e))}updateQueryState(e,t,n){this.Rr(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.Er(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.br(e)}notifyBundleLoaded(e){this.Pr(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ir),this.removeItem(this.ar),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return nz("SharedClientState","READ",e,t),t}setItem(e,t){nz("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){nz("SharedClientState","REMOVE",e),this.storage.removeItem(e)}rr(e){let t=e;if(t.storageArea===this.storage){if(nz("SharedClientState","EVENT",t.key,t.newValue),t.key===this.ar)return void n2("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Hs.enqueueRetryable(async()=>{if(this.started){if(null!==t.key){if(this.lr.test(t.key)){if(null==t.newValue){let e=this.vr(t.key);return this.Vr(e,null)}{let n=this.Sr(t.key,t.newValue);if(n)return this.Vr(n.clientId,n)}}else if(this.dr.test(t.key)){if(null!==t.newValue){let r=this.Dr(t.key,t.newValue);if(r)return this.Cr(r)}}else if(this._r.test(t.key)){if(null!==t.newValue){let i=this.Nr(t.key,t.newValue);if(i)return this.kr(i)}}else if(t.key===this.wr){if(null!==t.newValue){let s=this.yr(t.newValue);if(s)return this.pr(s)}}else if(t.key===this.hr){let a=function(e){let t=rV.at;if(null!=e)try{let n=JSON.parse(e);"number"==typeof n||nH(),t=n}catch(r){n2("SharedClientState","Failed to read sequence number from WebStorage",r)}return t}(t.newValue);a!==rV.at&&this.sequenceNumberHandler(a)}else if(t.key===this.mr){let o=this.Or(t.newValue);await Promise.all(o.map(e=>this.syncEngine.Mr(e)))}}}else this.cr.push(t)})}}get Ar(){return this.ur.get(this.sr)}gr(){this.setItem(this.ar,this.Ar.tr())}Tr(e,t,n){let r=new up(this.currentUser,e,t,n),i=ud(this.persistenceKey,this.currentUser,e);this.setItem(i,r.tr())}Er(e){let t=ud(this.persistenceKey,this.currentUser,e);this.removeItem(t)}br(e){let t={clientId:this.sr,onlineState:e};this.storage.setItem(this.wr,JSON.stringify(t))}Rr(e,t,n){let r=uf(this.persistenceKey,e),i=new um(e,t,n);this.setItem(r,i.tr())}Pr(e){let t=JSON.stringify(Array.from(e));this.setItem(this.mr,t)}vr(e){let t=this.lr.exec(e);return t?t[1]:null}Sr(e,t){let n=this.vr(e);return ug.Zi(n,t)}Dr(e,t){let n=this.dr.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return up.Zi(new nB(i),r,t)}Nr(e,t){let n=this._r.exec(e),r=Number(n[1]);return um.Zi(r,t)}yr(e){return uy.Zi(e)}Or(e){return JSON.parse(e)}async Cr(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Fr(e.batchId,e.state,e.error);nz("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}kr(e){return this.syncEngine.$r(e.targetId,e.state,e.error)}Vr(e,t){let n=t?this.ur.insert(e,t):this.ur.remove(e),r=this.Ir(this.ur),i=this.Ir(n),s=[],a=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.Br(s,a).then(()=>{this.ur=n})}pr(e){this.ur.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Ir(e){let t=sj;return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class uw{constructor(){this.Lr=new uv,this.Ur={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Lr.er(e),this.Ur[e]||"not-current"}updateQueryState(e,t,n){this.Ur[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.Ur[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new uv,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uI{qr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ub{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}qr(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){for(let e of(nz("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.Wr))e(0)}jr(){for(let e of(nz("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.Wr))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let u8={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uT{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uE extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,n,r,i){let s=this.ho(e,t);nz("RestConnection","Sending: ",s,n);let a={};return this.lo(a,r,i),this.fo(e,s,a,n).then(e=>(nz("RestConnection","Received: ",e),e),t=>{throw nK("RestConnection",`${e} failed with error: `,t,"url: ",s,"request:",n),t})}_o(e,t,n,r,i,s){return this.ao(e,t,n,r,i)}lo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+n0,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}ho(e,t){let n=u8[e];return`${this.oo}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,n,r){return new Promise((i,s)=>{let a=new nV;a.setWithCredentials(!0),a.listenOnce(nL.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case nR.NO_ERROR:let t=a.getResponseJson();nz("Connection","XHR received:",JSON.stringify(t)),i(t);break;case nR.TIMEOUT:nz("Connection",'RPC "'+e+'" timed out'),s(new n3(n7.DEADLINE_EXCEEDED,"Request time out"));break;case nR.HTTP_ERROR:let n=a.getStatus();if(nz("Connection",'RPC "'+e+'" failed with status:',n,"response text:",a.getResponseText()),n>0){let r=a.getResponseJson().error;if(r&&r.status&&r.message){let o=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(n7).indexOf(t)>=0?t:n7.UNKNOWN}(r.status);s(new n3(o,r.message))}else s(new n3(n7.UNKNOWN,"Server responded with status "+a.getStatus()))}else s(new n3(n7.UNAVAILABLE,"Connection failed."));break;default:nH()}}finally{nz("Connection",'RPC "'+e+'" completed.')}});let o=JSON.stringify(r);a.send(t,"POST",o,n,15)})}wo(e,t,n){let r=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=nD(),s=nN(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new nM({})),this.lo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;let o=r.join("");nz("Connection","Creating WebChannel: "+o,a);let u=i.createWebChannel(o,a),c=!1,h=!1,d=new uT({Hr(e){h?nz("Connection","Not sending because WebChannel is closed:",e):(c||(nz("Connection","Opening WebChannel transport."),u.open(),c=!0),nz("Connection","WebChannel sending:",e),u.send(e))},Jr:()=>u.close()}),f=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};return f(u,nF.EventType.OPEN,()=>{h||nz("Connection","WebChannel transport opened.")}),f(u,nF.EventType.CLOSE,()=>{h||(h=!0,nz("Connection","WebChannel transport closed"),d.io())}),f(u,nF.EventType.ERROR,e=>{h||(h=!0,nK("Connection","WebChannel transport errored:",e),d.io(new n3(n7.UNAVAILABLE,"The operation could not be completed")))}),f(u,nF.EventType.MESSAGE,e=>{var t,n;if(!h){let r=e.data[0];(n=!!r)||nH();let i=r,s=i.error||(null===(t=i[0])||void 0===t?void 0:t.error);if(s){nz("Connection","WebChannel received error:",s);let a=s.status,o=function(e){let t=l[e];if(void 0!==t)return sR(t)}(a),c=s.message;void 0===o&&(o=n7.INTERNAL,c="Unknown error status: "+a+" with message "+s.message),h=!0,d.io(new n3(o,c)),u.close()}else nz("Connection","WebChannel received:",r),d.ro(r)}}),f(s,nO.STAT_EVENT,e=>{e.stat===nP.PROXY?nz("Connection","Detected buffering proxy"):e.stat===nP.NOPROXY&&nz("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.so()},0),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function uk(){return"undefined"!=typeof window?window:null}function uS(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ux(e){return new s6(e,!0)}class u_{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Hs=e,this.timerId=t,this.mo=n,this.yo=r,this.po=i,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();let t=Math.floor(this.Io+this.bo()),n=Math.max(0,Date.now()-this.Eo),r=Math.max(0,t-n);r>0&&nz("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,r,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uC{constructor(e,t,n,r,i,s,a,o){this.Hs=e,this.vo=n,this.Vo=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new u_(e,t)}No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.$o()))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}Uo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.Uo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===n7.RESOURCE_EXHAUSTED?(n2(t.toString()),n2("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===n7.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}qo(){}auth(){this.state=1;let e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.So===t&&this.Go(e,n)},t=>{e(()=>{let e=new n3(n7.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)})})}Go(e,t){let n=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr(()=>{n(()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.ko()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(e=>{n(()=>this.Qo(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}Oo(){this.state=5,this.xo.Ro(async()=>{this.state=0,this.start()})}Qo(e){return nz("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget(()=>this.So===e?t():(nz("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class uA extends uC{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.It=i}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i,s,a;t.targetChange;let o="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:nH(),u=t.targetChange.targetIds||[],l=(i=e,s=t.targetChange.resumeToken,i.gt?(void 0===s||"string"==typeof s||nH(),rH.fromBase64String(s||"")):(void 0===s||s instanceof Uint8Array||nH(),rH.fromUint8Array(s||new Uint8Array))),c=t.targetChange.cause,h=c&&function(e){let t=void 0===e.code?n7.UNKNOWN:sR(e.code);return new n3(t,e.message||"")}(c);n=new s1(o,u,l,h||null)}else if("documentChange"in t){t.documentChange;let d=t.documentChange;d.document,d.document.name,d.document.updateTime;let f=at(e,d.document.name),p=sY(d.document.updateTime),m=new ib({mapValue:{fields:d.document.fields}}),g=iT.newFoundDocument(f,p,m),y=d.targetIds||[],v=d.removedTargetIds||[];n=new s2(y,v,g.key,g)}else if("documentDelete"in t){t.documentDelete;let $=t.documentDelete;$.document;let w=at(e,$.document),I=$.readTime?sY($.readTime):ru.min(),b=iT.newNoDocument(w,I),T=$.removedTargetIds||[];n=new s2([],T,b.key,b)}else if("documentRemove"in t){t.documentRemove;let E=t.documentRemove;E.document;let k=at(e,E.document),S=E.removedTargetIds||[];n=new s2([],S,k,null)}else{if(!("filter"in t))return nH();{t.filter;let x=t.filter;x.targetId;let _=x.count||0,C=new sD(_),A=x.targetId;n=new sK(A,C)}}return n}(this.It,e),n=function(e){if(!("targetChange"in e))return ru.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?ru.min():t.readTime?sY(t.readTime):ru.min()}(e);return this.listener.Wo(t,n)}zo(e){let t={};t.database=ai(this.It),t.addTarget=function(e,t){let n,r=t.target;return(n=i_(r)?{documents:ac(e,r)}:{query:ah(e,r)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=sX(e,t.resumeToken):t.snapshotVersion.compareTo(ru.min())>0&&(n.readTime=sZ(e,t.snapshotVersion.toTimestamp())),n}(this.It,e);let n=function(e,t){let n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return nH()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.It,e);n&&(t.labels=n),this.Bo(t)}Ho(e){let t={};t.database=ai(this.It),t.removeTarget=e,this.Bo(t)}}class uD extends uC{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.It=i,this.Jo=!1}get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}qo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){var t,n,r,i;if(!e.streamToken&&nH(),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();let s=(n=e.writeResults,r=e.commitTime,n&&n.length>0?(void 0!==r||nH(),n.map(e=>{var t,n;let i;return t=e,n=r,(i=t.updateTime?sY(t.updateTime):sY(n)).isEqual(ru.min())&&(i=sY(n)),new sg(i,t.transformResults||[])})):[]),a=sY(e.commitTime);return this.listener.Zo(a,s)}return e.writeResults&&0!==e.writeResults.length&&nH(),this.Jo=!0,this.listener.tu()}eu(){let e={};e.database=ai(this.It),this.Bo(e)}Xo(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>au(this.It,e))};this.Bo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uN extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.It=r,this.nu=!1}su(){if(this.nu)throw new n3(n7.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.ao(e,t,n,r,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===n7.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new n3(n7.UNKNOWN,e.toString())})}_o(e,t,n,r){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection._o(e,t,n,i,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===n7.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new n3(n7.UNKNOWN,e.toString())})}terminate(){this.nu=!0}}async function uR(e,t){var n;let r=n=e,i=function(e,t){let n=ah(e,t);return{structuredAggregationQuery:{aggregations:[{count:{},alias:"count_alias"}],structuredQuery:n.structuredQuery},parent:n.parent}}(r.It,i3(t)),s=i.parent;return r.connection.co||delete i.parent,(await r._o("RunAggregationQuery",s,i,1)).filter(e=>!!e.result).map(e=>e.result.aggregateFields)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uL{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=i,this.mu.qr(e=>{n.enqueueAndForget(async()=>{u0(this)&&(nz("RemoteStore","Restarting streams for network reachability change."),await async function(e){var t;let n=t=e;n._u.add(4),await uP(n),n.gu.set("Unknown"),n._u.delete(4),await uO(n)}(this))})}),this.gu=new class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve())))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(n2(t),this.ou=!1):nz("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}}(n,r)}}async function uO(e){if(u0(e))for(let t of e.wu)await t(!0)}async function uP(e){for(let t of e.wu)await t(!1)}function uM(e,t){var n;let r=n=e;r.du.has(t.targetId)||(r.du.set(t.targetId,t),uB(r)?uq(r):u5(r).ko()&&uV(r,t))}function uF(e,t){var n;let r=n=e,i=u5(r);r.du.delete(t),i.ko()&&uU(r,t),0===r.du.size&&(i.ko()?i.Fo():u0(r)&&r.gu.set("Unknown"))}function uV(e,t){e.yu.Mt(t.targetId),u5(e).zo(t)}function uU(e,t){e.yu.Mt(t),u5(e).Ho(t)}function uq(e){e.yu=new sW({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),se:t=>e.du.get(t)||null}),u5(e).start(),e.gu.uu()}function uB(e){return u0(e)&&!u5(e).No()&&e.du.size>0}function u0(e){var t;return 0===(t=e)._u.size}function u9(e){e.yu=void 0}async function uj(e){e.du.forEach((t,n)=>{uV(e,t)})}async function uG(e,t){u9(e),uB(e)?(e.gu.hu(t),uq(e)):e.gu.set("Unknown")}async function uz(e,t,n){if(e.gu.set("Online"),t instanceof s1&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.du.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.du.delete(r),e.yu.removeTarget(r))}(e,t)}catch(r){nz("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await u2(e,r)}else if(t instanceof s2?e.yu.Gt(t):t instanceof sK?e.yu.Yt(t):e.yu.Wt(t),!n.isEqual(ru.min()))try{let i=await ue(e.localStore);n.compareTo(i)>=0&&await function(e,t){let n=e.yu.te(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.du.get(r);i&&e.du.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach(t=>{let n=e.du.get(t);if(!n)return;e.du.set(t,n.withResumeToken(rH.EMPTY_BYTE_STRING,n.snapshotVersion)),uU(e,t);let r=new az(n.target,t,1,n.sequenceNumber);uV(e,r)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(s){nz("RemoteStore","Failed to raise snapshot:",s),await u2(e,s)}}async function u2(e,t,n){if(!rN(t))throw t;e._u.add(1),await uP(e),e.gu.set("Offline"),n||(n=()=>ue(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{nz("RemoteStore","Retrying IndexedDB access"),await n(),e._u.delete(1),await uO(e)})}function uK(e,t){return t().catch(n=>u2(e,n,t))}async function u1(e){var t;let n=t=e,r=uJ(n),i=n.fu.length>0?n.fu[n.fu.length-1].batchId:-1;for(;uH(n);)try{let s=await un(n.localStore,i);if(null===s){0===n.fu.length&&r.Fo();break}i=s.batchId,uW(n,s)}catch(a){await u2(n,a)}u7(n)&&u3(n)}function uH(e){return u0(e)&&e.fu.length<10}function uW(e,t){e.fu.push(t);let n=uJ(e);n.ko()&&n.Yo&&n.Xo(t.mutations)}function u7(e){return u0(e)&&!uJ(e).No()&&e.fu.length>0}function u3(e){uJ(e).start()}async function uQ(e){uJ(e).eu()}async function u4(e){let t=uJ(e);for(let n of e.fu)t.Xo(n.mutations)}async function u6(e,t,n){let r=e.fu.shift(),i=aj.from(r,t,n);await uK(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await u1(e)}async function uZ(e,t){t&&uJ(e).Yo&&await async function(e,t){var n;if(sN(n=t.code)&&n!==n7.ABORTED){let r=e.fu.shift();uJ(e).Mo(),await uK(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await u1(e)}}(e,t),u7(e)&&u3(e)}async function uX(e,t){var n;let r=n=e;r.asyncQueue.verifyOperationInProgress(),nz("RemoteStore","RemoteStore received new credentials");let i=u0(r);r._u.add(3),await uP(r),i&&r.gu.set("Unknown"),await r.remoteSyncer.handleCredentialChange(t),r._u.delete(3),await uO(r)}async function uY(e,t){var n;let r=n=e;t?(r._u.delete(2),await uO(r)):t||(r._u.add(2),await uP(r),r.gu.set("Unknown"))}function u5(e){return e.pu||(e.pu=function(e,t,n){var r;let i=r=e;return i.su(),new uA(t,i.connection,i.authCredentials,i.appCheckCredentials,i.It,n)}(e.datastore,e.asyncQueue,{Yr:uj.bind(null,e),Zr:uG.bind(null,e),Wo:uz.bind(null,e)}),e.wu.push(async t=>{t?(e.pu.Mo(),uB(e)?uq(e):e.gu.set("Unknown")):(await e.pu.stop(),u9(e))})),e.pu}function uJ(e){return e.Iu||(e.Iu=function(e,t,n){var r;let i=r=e;return i.su(),new uD(t,i.connection,i.authCredentials,i.appCheckCredentials,i.It,n)}(e.datastore,e.asyncQueue,{Yr:uQ.bind(null,e),Zr:uZ.bind(null,e),tu:u4.bind(null,e),Zo:u6.bind(null,e)}),e.wu.push(async t=>{t?(e.Iu.Mo(),await u1(e)):(await e.Iu.stop(),e.fu.length>0&&(nz("RemoteStore",`Stopping write stream with ${e.fu.length} pending writes`),e.fu=[]))})),e.Iu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class le{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new nQ,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,r,i){let s=Date.now()+n,a=new le(e,t,s,r,i);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new n3(n7.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lt(e,t){if(n2("AsyncQueue",`${t}: ${e}`),rN(e))return new n3(n7.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ln{constructor(e){this.comparator=e?(t,n)=>e(t,n)||rf.comparator(t.key,n.key):(e,t)=>rf.comparator(e.key,t.key),this.keyedMap=sM(),this.sortedSet=new r0(this.comparator)}static emptySet(e){return new ln(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ln)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let r=t.getNext().key,i=n.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new ln;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lr{constructor(){this.Tu=new r0(rf.comparator)}track(e){let t=e.doc.key,n=this.Tu.get(t);n?0!==e.type&&3===n.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==n.type?this.Tu=this.Tu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Tu=this.Tu.remove(t):1===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):nH():this.Tu=this.Tu.insert(t,e)}Eu(){let e=[];return this.Tu.inorderTraversal((t,n)=>{e.push(n)}),e}}class li{constructor(e,t,n,r,i,s,a,o,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new li(e,t,ln.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&i4(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ls{constructor(){this.Au=void 0,this.listeners=[]}}class la{constructor(){this.queries=new sL(e=>i6(e),i4),this.onlineState="Unknown",this.Ru=new Set}}async function lo(e,t){var n;let r=n=e,i=t.query,s=!1,a=r.queries.get(i);if(a||(s=!0,a=new ls),s)try{a.Au=await r.onListen(i)}catch(o){let u=lt(o,`Initialization of query '${iZ(t.query)}' failed`);return void t.onError(u)}r.queries.set(i,a),a.listeners.push(t),t.bu(r.onlineState),a.Au&&t.Pu(a.Au)&&lh(r)}async function lu(e,t){var n;let r=n=e,i=t.query,s=!1,a=r.queries.get(i);if(a){let o=a.listeners.indexOf(t);o>=0&&(a.listeners.splice(o,1),s=0===a.listeners.length)}if(s)return r.queries.delete(i),r.onUnlisten(i)}function ll(e,t){var n;let r=n=e,i=!1;for(let s of t){let a=s.query,o=r.queries.get(a);if(o){for(let u of o.listeners)u.Pu(s)&&(i=!0);o.Au=s}}i&&lh(r)}function lc(e,t,n){var r;let i=r=e,s=i.queries.get(t);if(s)for(let a of s.listeners)a.onError(n);i.queries.delete(t)}function lh(e){e.Ru.forEach(e=>{e.next()})}class ld{constructor(e,t,n){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=n||{}}Pu(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new li(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let r=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),r=!0):this.Cu(e,this.onlineState)&&(this.xu(e),r=!0),this.Su=e,r}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){return!e.fromCache||(!this.options.Nu||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;let t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=li.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lf{constructor(e,t){this.ku=e,this.byteLength=t}Ou(){return"metadata"in this.ku}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class lp{constructor(e){this.It=e}Ji(e){return at(this.It,e)}Yi(e){return e.metadata.exists?ao(this.It,e.document,!1):iT.newNoDocument(this.Ji(e.metadata.name),this.Xi(e.metadata.readTime))}Xi(e){return sY(e)}}class lm{constructor(e,t,n){this.Mu=e,this.localStore=t,this.It=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=lg(e)}Fu(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.ku.namedQuery)this.queries.push(e.ku.namedQuery);else if(e.ku.documentMetadata){this.documents.push({metadata:e.ku.documentMetadata}),e.ku.documentMetadata.exists||++t;let n=rc.fromString(e.ku.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.ku.document&&(this.documents[this.documents.length-1].document=e.ku.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}$u(e){let t=new Map,n=new lp(this.It);for(let r of e)if(r.metadata.queries){let i=n.Ji(r.metadata.name);for(let s of r.metadata.queries){let a=(t.get(s)||s9()).add(i);t.set(s,a)}}return t}async complete(){let e=await ul(this.localStore,new lp(this.It),this.documents,this.Mu.id),t=this.$u(this.documents);for(let n of this.queries)await uc(this.localStore,n,t.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Bu:this.collectionGroups,Lu:e}}}function lg(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ly{constructor(e){this.key=e}}class lv{constructor(e){this.key=e}}class l${constructor(e,t){this.query=e,this.Uu=t,this.qu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=s9(),this.mutatedKeys=s9(),this.Gu=i5(e),this.Qu=new ln(this.Gu)}get ju(){return this.Uu}Wu(e,t){let n=t?t.zu:new lr,r=t?t.Qu:this.Qu,i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1,o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,u="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let l=r.get(e),c=iX(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!c&&(c.hasLocalMutations||this.mutatedKeys.has(c.key)&&c.hasCommittedMutations),f=!1;l&&c?l.data.isEqual(c.data)?h!==d&&(n.track({type:3,doc:c}),f=!0):this.Hu(l,c)||(n.track({type:2,doc:c}),f=!0,(o&&this.Gu(c,o)>0||u&&0>this.Gu(c,u))&&(a=!0)):!l&&c?(n.track({type:0,doc:c}),f=!0):l&&!c&&(n.track({type:1,doc:l}),f=!0,(o||u)&&(a=!0)),f&&(c?(s=s.add(c),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let l="F"===this.query.limitType?s.last():s.first();s=s.delete(l.key),i=i.delete(l.key),n.track({type:1,doc:l})}return{Qu:s,zu:n,$i:a,mutatedKeys:i}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){let r=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;let i=e.zu.Eu();i.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return nH()}};return n(e)-n(t)})(e.type,t.type)||this.Gu(e.doc,t.doc)),this.Ju(n);let s=t?this.Yu():[],a=0===this.Ku.size&&this.current?1:0,o=a!==this.qu;return(this.qu=a,0!==i.length||o)?{snapshot:new li(this.query,e.Qu,r,i,e.mutatedKeys,0===a,o,!1,!!n&&n.resumeToken.approximateByteSize()>0),Xu:s}:{Xu:s}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new lr,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.Uu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(e=>this.Uu=this.Uu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Uu=this.Uu.delete(e)),this.current=e.current)}Yu(){if(!this.current)return[];let e=this.Ku;this.Ku=s9(),this.Qu.forEach(e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))});let t=[];return e.forEach(e=>{this.Ku.has(e)||t.push(new lv(e))}),this.Ku.forEach(n=>{e.has(n)||t.push(new ly(n))}),t}tc(e){this.Uu=e.Hi,this.Ku=s9();let t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return li.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.qu,this.hasCachedResults)}}class lw{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class lI{constructor(e){this.key=e,this.nc=!1}}class lb{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.sc={},this.ic=new sL(e=>i6(e),i4),this.rc=new Map,this.oc=new Set,this.uc=new r0(rf.comparator),this.cc=new Map,this.ac=new oj,this.hc={},this.lc=new Map,this.fc=ok.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return!0===this.dc}}async function l8(e,t){let n=lH(e),r,i,s=n.ic.get(t);if(s)r=s.targetId,n.sharedClientState.addLocalQueryTarget(r),i=s.view.ec();else{let a=await ur(n.localStore,i3(t));n.isPrimaryClient&&uM(n.remoteStore,a);let o=n.sharedClientState.addLocalQueryTarget(a.targetId);i=await lT(n,t,r=a.targetId,"current"===o,a.resumeToken)}return i}async function lT(e,t,n,r,i){e._c=(t,n,r)=>(async function(e,t,n,r){let i=t.view.Wu(n);i.$i&&(i=await us(e.localStore,t.query,!1).then(({documents:e})=>t.view.Wu(e,i)));let s=r&&r.targetChanges.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s);return lP(e,t.targetId,a.Xu),a.snapshot})(e,t,n,r);let s=await us(e.localStore,t,!0),a=new l$(t,s.Hi),o=a.Wu(s.documents),u=sz.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),l=a.applyChanges(o,e.isPrimaryClient,u);lP(e,n,l.Xu);let c=new lw(t,n,a);return e.ic.set(t,c),e.rc.has(n)?e.rc.get(n).push(t):e.rc.set(n,[t]),l.snapshot}async function lE(e,t){var n;let r=n=e,i=r.ic.get(t),s=r.rc.get(i.targetId);if(s.length>1)return r.rc.set(i.targetId,s.filter(e=>!i4(e,t))),void r.ic.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ui(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),uF(r.remoteStore,i.targetId),lL(r,i.targetId)}).catch(rS)):(lL(r,i.targetId),await ui(r.localStore,i.targetId,!0))}async function lk(e,t,n){let r=lW(e);try{var i,s,a;let o=await function(e,t){var n;let r=n=e,i=ro.now(),s=t.reduce((e,t)=>e.add(t.key),s9()),a,o;return r.persistence.runTransaction("Locally write mutations","readwrite",e=>{let n=sO,u=s9();return r.Gi.getEntries(e,s).next(e=>{(n=e).forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>r.localDocuments.getOverlayedDocuments(e,n)).next(n=>{a=n;let s=[];for(let o of t){let u=s8(o,a.get(o.key).overlayedDocument);null!=u&&s.push(new sk(o.key,u,i8(u.value.mapValue),sy.exists(!0)))}return r.mutationQueue.addMutationBatch(e,i,s,t)}).next(t=>{o=t;let n=t.applyToLocalDocumentSet(a,u);return r.documentOverlayCache.saveOverlays(e,t.batchId,n)})}).then(()=>({batchId:o.batchId,changes:sF(a)}))}(r.localStore,t),u;r.sharedClientState.addPendingMutation(o.batchId),i=r,s=o.batchId,a=n,(u=i.hc[i.currentUser.toKey()])||(u=new r0(ri)),u=u.insert(s,a),i.hc[i.currentUser.toKey()]=u,await lV(r,o.changes),await u1(r.remoteStore)}catch(l){let c=lt(l,"Failed to persist write");n.reject(c)}}async function lS(e,t){var n;let r=n=e;try{let i=await function(e,t){var n;let r=n=e,i=t.snapshotVersion,s=r.Ui;return r.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{let n=r.Gi.newChangeBuffer({trackRemovals:!0});s=r.Ui;let a=[];t.targetChanges.forEach((n,o)=>{var u,l,c;let h=s.get(o);if(!h)return;a.push(r.Cs.removeMatchingKeys(e,n.removedDocuments,o).next(()=>r.Cs.addMatchingKeys(e,n.addedDocuments,o)));let d=h.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(o)?d=d.withResumeToken(rH.EMPTY_BYTE_STRING,ru.min()).withLastLimboFreeSnapshotVersion(ru.min()):n.resumeToken.approximateByteSize()>0&&(d=d.withResumeToken(n.resumeToken,i)),s=s.insert(o,d),u=h,l=d,c=n,(0===u.resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-u.snapshotVersion.toMicroseconds()>=3e8||c.addedDocuments.size+c.modifiedDocuments.size+c.removedDocuments.size>0)&&a.push(r.Cs.updateTargetData(e,d))});let o=sO,u=s9();if(t.documentUpdates.forEach(n=>{t.resolvedLimboDocuments.has(n)&&a.push(r.persistence.referenceDelegate.updateLimboDocument(e,n))}),a.push(ut(e,n,t.documentUpdates).next(e=>{o=e.Wi,u=e.zi})),!i.isEqual(ru.min())){let l=r.Cs.getLastRemoteSnapshotVersion(e).next(t=>r.Cs.setTargetsMetadata(e,e.currentSequenceNumber,i));a.push(l)}return rx.waitFor(a).next(()=>n.apply(e)).next(()=>r.localDocuments.getLocalViewOfDocuments(e,o,u)).next(()=>o)}).then(e=>(r.Ui=s,e))}(r.localStore,t);t.targetChanges.forEach((e,t)=>{var n,i,s;let a=r.cc.get(t);a&&(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1||nH(),e.addedDocuments.size>0?a.nc=!0:e.modifiedDocuments.size>0?(i=a.nc)||nH():e.removedDocuments.size>0&&(a.nc||nH(),a.nc=!1))}),await lV(r,i,t)}catch(s){await rS(s)}}function lx(e,t,n){var r;let i=r=e;if(i.isPrimaryClient&&0===n||!i.isPrimaryClient&&1===n){let s=[];i.ic.forEach((e,n)=>{let r=n.view.bu(t);r.snapshot&&s.push(r.snapshot)}),function(e,t){var n;let r=n=e;r.onlineState=t;let i=!1;r.queries.forEach((e,n)=>{for(let r of n.listeners)r.bu(t)&&(i=!0)}),i&&lh(r)}(i.eventManager,t),s.length&&i.sc.Wo(s),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function l_(e,t,n){var r;let i=r=e;i.sharedClientState.updateQueryState(t,"rejected",n);let s=i.cc.get(t),a=s&&s.key;if(a){let o=new r0(rf.comparator);o=o.insert(a,iT.newNoDocument(a,ru.min()));let u=s9().add(a),l=new sG(ru.min(),new Map,new rG(ri),o,u);await lS(i,l),i.uc=i.uc.remove(a),i.cc.delete(t),lF(i)}else await ui(i.localStore,t,!1).then(()=>lL(i,t,n)).catch(rS)}async function lC(e,t){var n;let r=n=e,i=t.batch.batchId;try{let s=await function(e,t){var n;let r=n=e;return r.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.Gi.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){let i=n.batch,s=i.keys(),a=rx.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{let s=n.docVersions.get(e);null!==s||nH(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=s9();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))})}(r.localStore,t);lR(r,i,null),lN(r,i),r.sharedClientState.updateMutationState(i,"acknowledged"),await lV(r,s)}catch(a){await rS(a)}}async function lA(e,t,n){var r;let i=r=e;try{let s=await function(e,t){var n;let r=n=e;return r.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||nH(),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))})}(i.localStore,t);lR(i,t,n),lN(i,t),i.sharedClientState.updateMutationState(t,"rejected",n),await lV(i,s)}catch(a){await rS(a)}}async function lD(e,t){var n;let r=n=e;u0(r.remoteStore)||nz("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{let i=await function(e){var t;let n=t=e;return n.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>n.mutationQueue.getHighestUnacknowledgedBatchId(e))}(r.localStore);if(-1===i)return void t.resolve();let s=r.lc.get(i)||[];s.push(t),r.lc.set(i,s)}catch(a){let o=lt(a,"Initialization of waitForPendingWrites() operation failed");t.reject(o)}}function lN(e,t){(e.lc.get(t)||[]).forEach(e=>{e.resolve()}),e.lc.delete(t)}function lR(e,t,n){var r;let i=r=e,s=i.hc[i.currentUser.toKey()];if(s){let a=s.get(t);a&&(n?a.reject(n):a.resolve(),s=s.remove(t)),i.hc[i.currentUser.toKey()]=s}}function lL(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e.rc.get(t)))e.ic.delete(r),n&&e.sc.wc(r,n);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach(t=>{e.ac.containsKey(t)||lO(e,t)})}function lO(e,t){e.oc.delete(t.path.canonicalString());let n=e.uc.get(t);null!==n&&(uF(e.remoteStore,n),e.uc=e.uc.remove(t),e.cc.delete(n),lF(e))}function lP(e,t,n){for(let r of n)r instanceof ly?(e.ac.addReference(r.key,t),lM(e,r)):r instanceof lv?(nz("SyncEngine","Document no longer in limbo: "+r.key),e.ac.removeReference(r.key,t),e.ac.containsKey(r.key)||lO(e,r.key)):nH()}function lM(e,t){let n=t.key,r=n.path.canonicalString();e.uc.get(n)||e.oc.has(r)||(nz("SyncEngine","New document in limbo: "+n),e.oc.add(r),lF(e))}function lF(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){let t=e.oc.values().next().value;e.oc.delete(t);let n=new rf(rc.fromString(t)),r=e.fc.next();e.cc.set(r,new lI(n)),e.uc=e.uc.insert(n,r),uM(e.remoteStore,new az(i3(i2(n.path)),r,2,rV.at))}}async function lV(e,t,n){var r;let i=r=e,s=[],a=[],o=[];i.ic.isEmpty()||(i.ic.forEach((e,r)=>{o.push(i._c(r,t,n).then(e=>{if((e||n)&&i.isPrimaryClient&&i.sharedClientState.updateQueryState(r.targetId,(null==e?void 0:e.fromCache)?"not-current":"current"),e){s.push(e);let t=oZ.Ci(r.targetId,e);a.push(t)}}))}),await Promise.all(o),i.sc.Wo(s),await async function(e,t){var n;let r=n=e;try{await r.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>rx.forEach(t,t=>rx.forEach(t.Si,n=>r.persistence.referenceDelegate.addReference(e,t.targetId,n)).next(()=>rx.forEach(t.Di,n=>r.persistence.referenceDelegate.removeReference(e,t.targetId,n)))))}catch(i){if(!rN(i))throw i;nz("LocalStore","Failed to update sequence numbers: "+i)}for(let s of t){let a=s.targetId;if(!s.fromCache){let o=r.Ui.get(a),u=o.snapshotVersion,l=o.withLastLimboFreeSnapshotVersion(u);r.Ui=r.Ui.insert(a,l)}}}(i.localStore,a))}async function lU(e,t){var n,r;let i=n=e;if(!i.currentUser.isEqual(t)){nz("SyncEngine","User change. New user:",t.toKey());let s=await oJ(i.localStore,t);i.currentUser=t,(r=i).lc.forEach(e=>{e.forEach(e=>{e.reject(new n3(n7.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),r.lc.clear(),i.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),await lV(i,s.ji)}}function lq(e,t){var n;let r=n=e,i=r.cc.get(t);if(i&&i.nc)return s9().add(i.key);{let s=s9(),a=r.rc.get(t);if(!a)return s;for(let o of a){let u=r.ic.get(o);s=s.unionWith(u.view.ju)}return s}}async function lB(e,t){var n;let r=n=e,i=await us(r.localStore,t.query,!0),s=t.view.tc(i);return r.isPrimaryClient&&lP(r,t.targetId,s.Xu),s}async function l0(e,t){var n;let r=n=e;return uo(r.localStore,t).then(e=>lV(r,e))}async function l9(e,t,n,r){var i;let s=i=e,a=await function(e,t){var n,r;let i=n=e,s=r=i.mutationQueue;return i.persistence.runTransaction("Lookup mutation documents","readonly",e=>s.Tn(e,t).next(t=>t?i.localDocuments.getDocuments(e,t):rx.resolve(null)))}(s.localStore,t);null!==a?("pending"===n?await u1(s.remoteStore):"acknowledged"===n||"rejected"===n?(lR(s,t,r||null),lN(s,t),function(e,t){var n,r;(r=(n=e).mutationQueue).An(t)}(s.localStore,t)):nH(),await lV(s,a)):nz("SyncEngine","Cannot apply mutation batch with id: "+t)}async function lj(e,t){var n;let r=n=e;if(lH(r),lW(r),!0===t&&!0!==r.dc){let i=r.sharedClientState.getAllActiveQueryTargets(),s=await lG(r,i.toArray());for(let a of(r.dc=!0,await uY(r.remoteStore,!0),s))uM(r.remoteStore,a)}else if(!1===t&&!1!==r.dc){let o=[],u=Promise.resolve();r.rc.forEach((e,t)=>{r.sharedClientState.isLocalQueryTarget(t)?o.push(t):u=u.then(()=>(lL(r,t),ui(r.localStore,t,!0))),uF(r.remoteStore,t)}),await u,await lG(r,o),function(e){var t;let n=t=e;n.cc.forEach((e,t)=>{uF(n.remoteStore,t)}),n.ac.fs(),n.cc=new Map,n.uc=new r0(rf.comparator)}(r),r.dc=!1,await uY(r.remoteStore,!1)}}async function lG(e,t,n){var r;let i=r=e,s=[],a=[];for(let o of t){let u,l=i.rc.get(o);if(l&&0!==l.length)for(let c of(u=await ur(i.localStore,i3(l[0])),l)){let h=i.ic.get(c),d=await lB(i,h);d.snapshot&&a.push(d.snapshot)}else{let f=await ua(i.localStore,o);await lT(i,lz(f),o,!1,(u=await ur(i.localStore,f)).resumeToken)}s.push(u)}return i.sc.Wo(a),s}function lz(e){return iz(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function l2(e){var t,n,r;let i=t=e;return(r=(n=i.localStore).persistence).vi()}async function lK(e,t,n,r){var i;let s=i=e;if(s.dc)return void nz("SyncEngine","Ignoring unexpected query state notification.");let a=s.rc.get(t);if(a&&a.length>0)switch(n){case"current":case"not-current":{let o=await uo(s.localStore,iY(a[0])),u=sG.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,rH.EMPTY_BYTE_STRING);await lV(s,o,u);break}case"rejected":await ui(s.localStore,t,!0),lL(s,t,r);break;default:nH()}}async function l1(e,t,n){let r=lH(e);if(r.dc){for(let i of t){if(r.rc.has(i)){nz("SyncEngine","Adding an already active target "+i);continue}let s=await ua(r.localStore,i),a=await ur(r.localStore,s);await lT(r,lz(s),a.targetId,!1,a.resumeToken),uM(r.remoteStore,a)}for(let o of n)r.rc.has(o)&&await ui(r.localStore,o,!1).then(()=>{uF(r.remoteStore,o),lL(r,o)}).catch(rS)}}function lH(e){var t;let n=t=e;return n.remoteStore.remoteSyncer.applyRemoteEvent=lS.bind(null,n),n.remoteStore.remoteSyncer.getRemoteKeysForTarget=lq.bind(null,n),n.remoteStore.remoteSyncer.rejectListen=l_.bind(null,n),n.sc.Wo=ll.bind(null,n.eventManager),n.sc.wc=lc.bind(null,n.eventManager),n}function lW(e){var t;let n=t=e;return n.remoteStore.remoteSyncer.applySuccessfulWrite=lC.bind(null,n),n.remoteStore.remoteSyncer.rejectFailedWrite=lA.bind(null,n),n}class l7{constructor(){this.synchronizeTabs=!1}async initialize(e){this.It=ux(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){return o5(this.persistence,new oX,e.initialUser,this.It)}yc(e){return new oK(oH.Bs,this.It)}gc(e){return new uw}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class l3 extends l7{constructor(e,t,n){super(),this.Ac=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ac.initialize(this,e),await lW(this.Ac.syncEngine),await u1(this.Ac.remoteStore),await this.persistence.li(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ic(e){return o5(this.persistence,new oX,e.initialUser,this.It)}Tc(e,t){let n=this.persistence.referenceDelegate.garbageCollector;return new oD(n,e.asyncQueue,t)}Ec(e,t){let n=new rF(t,this.persistence);return new rM(e.asyncQueue,n)}yc(e){let t=o6(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?ov.withCacheSize(this.cacheSizeBytes):ov.DEFAULT;return new o3(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,uk(),uS(),this.It,this.sharedClientState,!!this.forceOwnership)}gc(e){return new uw}}class lQ extends l3{constructor(e,t){super(e,t,!1),this.Ac=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Ac.syncEngine;this.sharedClientState instanceof u$&&(this.sharedClientState.syncEngine={Fr:l9.bind(null,t),$r:lK.bind(null,t),Br:l1.bind(null,t),vi:l2.bind(null,t),Mr:l0.bind(null,t)},await this.sharedClientState.start()),await this.persistence.li(async e=>{await lj(this.Ac.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}gc(e){let t=uk();if(!u$.C(t))throw new n3(n7.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=o6(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new u$(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class l4{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>lx(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=lU.bind(null,this.syncEngine),await uY(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new la}createDatastore(e){var t,n,r,i,s;let a=ux(e.databaseInfo.databaseId),o=(t=e.databaseInfo,new uE(t));return n=e.authCredentials,r=e.appCheckCredentials,i=o,s=a,new uN(n,r,i,s)}createRemoteStore(e){var t,n,r,i,s;return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>lx(this.syncEngine,e,0),s=ub.C()?new ub:new uI,new uL(t,n,r,i,s)}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){let o=new lb(e,t,n,r,i,s);return a&&(o.dc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){var t;let n=t=e;nz("RemoteStore","RemoteStore shutting down."),n._u.add(5),await uP(n),n.mu.shutdown(),n.gu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function l6(e,t,n){if(!n)throw new n3(n7.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function lZ(e,t,n,r){if(!0===t&&!0===r)throw new n3(n7.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function lX(e){if(!rf.isDocumentKey(e))throw new n3(n7.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function lY(e){if(rf.isDocumentKey(e))throw new n3(n7.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function l5(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":nH()}function lJ(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new n3(n7.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=l5(e);throw new n3(n7.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function ce(e,t){if(t<=0)throw new n3(n7.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let ct=new Map;class cn{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new n3(n7.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new n3(n7.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,lZ("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cr{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new cn({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new n3(n7.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new n3(n7.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new cn(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new n6;switch(e.type){case"gapi":let t=e.client;return new n5(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new n3(n7.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=ct.get(e);t&&(nz("ComponentProvider","Removing Datastore"),ct.delete(e),t.terminate())}(this),Promise.resolve()}}function ci(e,t,n,r={}){var i;let s=(e=lJ(e,cr))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==t&&nK("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},s),{host:`${t}:${n}`,ssl:!1})),r.mockUserToken){let a,o;if("string"==typeof r.mockUserToken)a=r.mockUserToken,o=nB.MOCK_USER;else{a=(0,m.Sg)(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new n3(n7.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");o=new nB(u)}e._authCredentials=new nZ(new n4(a,o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cs{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new co(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new cs(this.firestore,e,this._key)}}class ca{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ca(this.firestore,e,this._query)}}class co extends ca{constructor(e,t,n){super(e,t,i2(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new cs(this.firestore,null,new rf(e))}withConverter(e){return new co(this.firestore,e,this._path)}}function cu(e,t,...n){if(e=(0,m.m9)(e),l6("collection","path",t),e instanceof cr){let r=rc.fromString(t,...n);return lY(r),new co(e,null,r)}{if(!(e instanceof cs||e instanceof co))throw new n3(n7.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=e._path.child(rc.fromString(t,...n));return lY(i),new co(e.firestore,null,i)}}function cl(e,t){var n;if(e=lJ(e,cr),l6("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new n3(n7.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ca(e,null,(n=t,new iG(rc.emptyPath(),n)))}function cc(e,t,...n){if(e=(0,m.m9)(e),1===arguments.length&&(t=rr.R()),l6("doc","path",t),e instanceof cr){let r=rc.fromString(t,...n);return lX(r),new cs(e,null,new rf(r))}{if(!(e instanceof cs||e instanceof co))throw new n3(n7.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=e._path.child(rc.fromString(t,...n));return lX(i),new cs(e.firestore,e instanceof co?e.converter:null,new rf(i))}}function ch(e,t){return e=(0,m.m9)(e),t=(0,m.m9)(t),(e instanceof cs||e instanceof co)&&(t instanceof cs||t instanceof co)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function cd(e,t){return e=(0,m.m9)(e),t=(0,m.m9)(t),e instanceof ca&&t instanceof ca&&e.firestore===t.firestore&&i4(e._query,t._query)&&e.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function cf(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){let r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cp{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):n2("Uncaught Error in snapshot listener:",e)}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cm{constructor(e,t){this.Pc=e,this.It=t,this.metadata=new nQ,this.buffer=new Uint8Array,this.vc=new TextDecoder("utf-8"),this.Vc().then(e=>{e&&e.Ou()?this.metadata.resolve(e.ku.metadata):this.metadata.reject(Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(null==e?void 0:e.ku)}`))},e=>this.metadata.reject(e))}close(){return this.Pc.cancel()}async getMetadata(){return this.metadata.promise}async mc(){return await this.getMetadata(),this.Vc()}async Vc(){let e=await this.Sc();if(null===e)return null;let t=this.vc.decode(e),n=Number(t);isNaN(n)&&this.Dc(`length string (${t}) is not valid number`);let r=await this.Cc(n);return new lf(JSON.parse(r),e.length+n)}xc(){return this.buffer.findIndex(e=>123===e)}async Sc(){for(;0>this.xc()&&!await this.Nc(););if(0===this.buffer.length)return null;let e=this.xc();e<0&&this.Dc("Reached the end of bundle when a length string is expected.");let t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Cc(e){for(;this.buffer.length<e;)await this.Nc()&&this.Dc("Reached the end of bundle when more is expected.");let t=this.vc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Dc(e){throw this.Pc.cancel(),Error(`Invalid bundle format: ${e}`)}async Nc(){let e=await this.Pc.read();if(!e.done){let t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cg{constructor(){this.type="AggregateField"}}class cy{constructor(e,t){this._data=t,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._data}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cv{constructor(e,t,n){this.query=e,this.datastore=t,this.userDataWriter=n}run(){return uR(this.datastore,this.query._query).then(e=>{var t;(t=void 0!==e[0])||nH();let n=Object.entries(e[0]).filter(([e,t])=>"count_alias"===e).map(([e,t])=>this.userDataWriter.convertValue(t))[0];return"number"==typeof n||nH(),Promise.resolve(new cy(this.query,{count:n}))})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class c${constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new n3(n7.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");let t=await async function(e,t){var n;let r=n=e,i=ai(r.It)+"/documents",s={documents:t.map(e=>ae(r.It,e))},a=await r._o("BatchGetDocuments",i,s,t.length),o=new Map;a.forEach(e=>{var t,n;let i=(t=r.It,"found"in(n=e)?function(e,t){var n;t.found||nH(),t.found.name,t.found.updateTime;let r=at(e,t.found.name),i=sY(t.found.updateTime),s=new ib({mapValue:{fields:t.found.fields}});return iT.newFoundDocument(r,i,s)}(t,n):"missing"in n?function(e,t){var n,r;t.missing||nH(),!t.readTime&&nH();let i=at(e,t.missing),s=sY(t.readTime);return iT.newNoDocument(i,s)}(t,n):nH());o.set(i.key.toString(),i)});let u=[];return t.forEach(e=>{let t=o.get(e.toString());t||nH(),u.push(t)}),u}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastWriteError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new sC(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{let n=rf.fromPath(t);this.mutations.push(new sA(n,this.precondition(n)))}),await async function(e,t){var n;let r=n=e,i=ai(r.It)+"/documents",s={writes:t.map(e=>au(r.It,e))};await r.ao("Commit",i,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw nH();t=ru.min()}let n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new n3(n7.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ru.min())?sy.exists(!1):sy.updateTime(t):sy.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ru.min()))throw new n3(n7.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return sy.updateTime(t)}return sy.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cw{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.kc=n.maxAttempts,this.xo=new u_(this.asyncQueue,"transaction_retry")}run(){this.kc-=1,this.Oc()}Oc(){this.xo.Ro(async()=>{let e=new c$(this.datastore),t=this.Mc(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Fc(e)}))}).catch(e=>{this.Fc(e)})})}Mc(e){try{let t=this.updateFunction(e);return!rY(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}Fc(e){this.kc>0&&this.$c(e)?(this.kc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Oc(),Promise.resolve()))):this.deferred.reject(e)}$c(e){if("FirebaseError"===e.name){let t=e.code;return"aborted"===t||"failed-precondition"===t||!sN(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cI{constructor(e,t,n,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=nB.UNAUTHENTICATED,this.clientId=rr.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{nz("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(nz("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new n3(n7.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new nQ;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let n=lt(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function cb(e,t){e.asyncQueue.verifyOperationInProgress(),nz("FirestoreClient","Initializing OfflineComponentProvider");let n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await oJ(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function c8(e,t){e.asyncQueue.verifyOperationInProgress();let n=await cT(e);nz("FirestoreClient","Initializing OnlineComponentProvider");let r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(e=>uX(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>uX(t.remoteStore,n)),e.onlineComponents=t}async function cT(e){return e.offlineComponents||(nz("FirestoreClient","Using default OfflineComponentProvider"),await cb(e,new l7)),e.offlineComponents}async function cE(e){return e.onlineComponents||(nz("FirestoreClient","Using default OnlineComponentProvider"),await c8(e,new l4)),e.onlineComponents}function ck(e){return cT(e).then(e=>e.persistence)}function cS(e){return cT(e).then(e=>e.localStore)}function cx(e){return cE(e).then(e=>e.remoteStore)}function c_(e){return cE(e).then(e=>e.syncEngine)}function cC(e){return cE(e).then(e=>e.datastore)}async function cA(e){let t=await cE(e),n=t.eventManager;return n.onListen=l8.bind(null,t.syncEngine),n.onUnlisten=lE.bind(null,t.syncEngine),n}function cD(e,t,n={}){let r=new nQ;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new cp({next(s){t.enqueueAndForget(()=>lu(e,a));let o=s.docs.has(n);!o&&s.fromCache?i.reject(new n3(n7.UNAVAILABLE,"Failed to get document because the client is offline.")):o&&s.fromCache&&r&&"server"===r.source?i.reject(new n3(n7.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),a=new ld(i2(n.path),s,{includeMetadataChanges:!0,Nu:!0});return lo(e,a)})(await cA(e),e.asyncQueue,t,n,r)),r.promise}function cN(e,t,n={}){let r=new nQ;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new cp({next(n){t.enqueueAndForget(()=>lu(e,a)),n.fromCache&&"server"===r.source?i.reject(new n3(n7.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),a=new ld(n,s,{includeMetadataChanges:!0,Nu:!0});return lo(e,a)})(await cA(e),e.asyncQueue,t,n,r)),r.promise}function cR(e){return function(e,t){if("object"!=typeof e||null===e)return!1;let n=e;for(let r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}(e,["next","error","complete"])}class cL{constructor(){this._progressObserver={},this._taskCompletionResolver=new nQ,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let cO=-1;class cP extends cr{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new class{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.Uc=!1,this.qc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new u_(this,"async_queue_retry"),this.Wc=()=>{let e=uS();e&&nz("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};let e=uS();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.Uc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.Uc){this.Uc=!0,this.Qc=e||!1;let t=uS();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.Uc)return new Promise(()=>{});let t=new nQ;return this.Hc(()=>this.Uc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!rN(e))throw e;nz("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro(()=>this.Jc())}}Hc(e){let t=this.Bc.then(()=>(this.Gc=!0,e().catch(e=>{var t;this.Kc=e,this.Gc=!1;let n,r=(n=(t=e).message||"",t.stack&&(n=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),n);throw n2("INTERNAL UNHANDLED ERROR: ",r),e}).then(e=>(this.Gc=!1,e))));return this.Bc=t,t}enqueueAfterDelay(e,t,n){this.zc(),this.jc.indexOf(e)>-1&&(t=0);let r=le.createAndSchedule(this,e,t,n,e=>this.Yc(e));return this.qc.push(r),r}zc(){this.Kc&&nH()}verifyOperationInProgress(){}async Xc(){let e;do await (e=this.Bc);while(e!==this.Bc)}Zc(e){for(let t of this.qc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{for(let t of(this.qc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.qc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){let t=this.qc.indexOf(e);this.qc.splice(t,1)}},this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||cU(this),this._firestoreClient.terminate()}}function cM(e,t,n){n||(n="(default)");let r=(0,d.qX)(e,"firestore");if(r.isInitialized(n)){let i=r.getImmediate({identifier:n}),s=r.getOptions(n);if((0,m.vZ)(s,t))return i;throw new n3(n7.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new n3(n7.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:t,instanceIdentifier:n})}function cF(e,t){let n="object"==typeof e?e:(0,d.Mq)(),r=(0,d.qX)(n,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!r._initialized){let i=(0,m.P0)("firestore");i&&ci(r,...i)}return r}function cV(e){return e._firestoreClient||cU(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function cU(e){var t,n,r,i,s;let a=e._freezeSettings(),o=(n=e._databaseId,r=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",i=e._persistenceKey,s=a,new rZ(n,r,i,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,s.useFetchStreams));e._firestoreClient=new cI(e._authCredentials,e._appCheckCredentials,e._queue,o)}function cq(e,t){cH(e=lJ(e,cP));let n=cV(e),r=e._freezeSettings(),i=new l4;return c0(n,i,new l3(i,r.cacheSizeBytes,null==t?void 0:t.forceOwnership))}function cB(e){cH(e=lJ(e,cP));let t=cV(e),n=e._freezeSettings(),r=new l4;return c0(t,r,new lQ(r,n.cacheSizeBytes))}function c0(e,t,n){let r=new nQ;return e.asyncQueue.enqueue(async()=>{try{await cb(e,n),await c8(e,t),r.resolve()}catch(i){var s;let a=i;if("FirebaseError"===(s=a).name?s.code!==n7.FAILED_PRECONDITION&&s.code!==n7.UNIMPLEMENTED:!!("undefined"!=typeof DOMException&&s instanceof DOMException)&&22!==s.code&&20!==s.code&&11!==s.code)throw a;nK("Error enabling offline persistence. Falling back to persistence disabled: "+a),r.reject(a)}}).then(()=>r.promise)}function c9(e){if(e._initialized&&!e._terminated)throw new n3(n7.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let t=new nQ;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!rC.C())return Promise.resolve();await rC.delete(e+"main")}(o6(e._databaseId,e._persistenceKey)),t.resolve()}catch(n){t.reject(n)}}),t.promise}function cj(e){return function(e){let t=new nQ;return e.asyncQueue.enqueueAndForget(async()=>lD(await c_(e),t)),t.promise}(cV(e=lJ(e,cP)))}function cG(e){var t;return(t=cV(e=lJ(e,cP))).asyncQueue.enqueue(async()=>{let e=await ck(t),n=await cx(t);return e.setNetworkEnabled(!0),function(e){var t;let n=t=e;return n._u.delete(0),uO(n)}(n)})}function cz(e){var t;return(t=cV(e=lJ(e,cP))).asyncQueue.enqueue(async()=>{let e=await ck(t),n=await cx(t);return e.setNetworkEnabled(!1),async function(e){var t;let n=t=e;n._u.add(0),await uP(n),n.gu.set("Offline")}(n)})}function c2(e){return(0,d.wN)(e.app,"firestore",e._databaseId.database),e._delete()}function cK(e,t){let n=cV(e=lJ(e,cP)),r=new cL;return function(e,t,n,r){var i,s,a,o;let u,l=(i=n,s=ux(t),a=function(e,t){if(e instanceof Uint8Array)return cf(e,t);if(e instanceof ArrayBuffer)return cf(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}("string"==typeof i?(new TextEncoder).encode(i):i),o=s,new cm(a,o));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){var r;let i=r=e;(async function(e,t,n){try{let r=await t.getMetadata();if(await function(e,t){var n;let r=n=e,i=sY(t.createTime);return r.persistence.runTransaction("hasNewerBundle","readonly",e=>r.Ns.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(i)>=0)}(e.localStore,r)){var i;return await t.close(),n._completeWith((i=r,{taskState:"Success",documentsLoaded:i.totalDocuments,bytesLoaded:i.totalBytes,totalDocuments:i.totalDocuments,totalBytes:i.totalBytes})),Promise.resolve(new Set)}n._updateProgress(lg(r));let s=new lm(r,e.localStore,t.It),a=await t.mc();for(;a;){let o=await s.Fu(a);o&&n._updateProgress(o),a=await t.mc()}let u=await s.complete();return await lV(e,u.Lu,void 0),await function(e,t){var n;let r=n=e;return r.persistence.runTransaction("Save bundle","readwrite",e=>r.Ns.saveBundleMetadata(e,t))}(e.localStore,r),n._completeWith(u.progress),Promise.resolve(u.Bu)}catch(l){return nK("SyncEngine",`Loading bundle failed with ${l}`),n._failWith(l),Promise.resolve(new Set)}})(i,t,n).then(e=>{i.sharedClientState.notifyBundleLoaded(e)})}(await c_(e),l,r)})}(n,e._databaseId,t,r),r}function c1(e,t){var n,r;return(n=cV(e=lJ(e,cP)),r=t,n.asyncQueue.enqueue(async()=>(function(e,t){var n;let r=n=e;return r.persistence.runTransaction("Get named query","readonly",e=>r.Ns.getNamedQuery(e,t))})(await cS(n),r))).then(t=>t?new ca(e,null,t.query):null)}function cH(e){if(e._initialized||e._terminated)throw new n3(n7.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cW{constructor(e){this._byteString=e}static fromBase64String(e){try{return new cW(rH.fromBase64String(e))}catch(t){throw new n3(n7.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new cW(rH.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class c7{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new n3(n7.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new rd(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function c3(){return new c7("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cQ{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class c4{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new n3(n7.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new n3(n7.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ri(this._lat,e._lat)||ri(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let c6=/^__.*__$/;class cZ{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new sk(e,this.data,this.fieldMask,t,this.fieldTransforms):new sE(e,this.data,t,this.fieldTransforms)}}class cX{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new sk(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function cY(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw nH()}}class c5{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.It=n,this.ignoreUndefinedProperties=r,void 0===i&&this.na(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new c5(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.It,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ia({path:n,oa:!1});return r.ua(e),r}ca(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.ia({path:n,oa:!1});return r.na(),r}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return hv(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(0===e.length)throw this.ha("Document fields must not be empty");if(cY(this.sa)&&c6.test(e))throw this.ha('Document fields cannot begin and end with "__"')}}class cJ{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.It=n||ux(e)}da(e,t,n,r=!1){return new c5({sa:e,methodName:t,fa:n,path:rd.emptyPath(),oa:!1,la:r},this.databaseId,this.It,this.ignoreUndefinedProperties)}}function he(e){let t=e._freezeSettings(),n=ux(e._databaseId);return new cJ(e._databaseId,!!t.ignoreUndefinedProperties,n)}function ht(e,t,n,r,i,s={}){let a=e.da(s.merge||s.mergeFields?2:0,t,n,i);hp("Data must be an object, but it was:",a,r);let o=hd(r,a),u,l;if(s.merge)u=new rK(a.fieldMask),l=a.fieldTransforms;else if(s.mergeFields){let c=[];for(let h of s.mergeFields){let d=hm(t,h,n);if(!a.contains(d))throw new n3(n7.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);h$(c,d)||c.push(d)}u=new rK(c),l=a.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,l=a.fieldTransforms;return new cZ(new ib(o),u,l)}class hn extends cQ{_toFieldTransform(e){if(2!==e.sa)throw 1===e.sa?e.ha(`${this._methodName}() can only appear at the top level of your update data`):e.ha(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof hn}}function hr(e,t,n){return new c5({sa:3,fa:t.settings.fa,methodName:e._methodName,oa:n},t.databaseId,t.It,t.ignoreUndefinedProperties)}class hi extends cQ{_toFieldTransform(e){return new sm(e.path,new so)}isEqual(e){return e instanceof hi}}class hs extends cQ{constructor(e,t){super(e),this._a=t}_toFieldTransform(e){let t=hr(this,e,!0),n=this._a.map(e=>hh(e,t)),r=new su(n);return new sm(e.path,r)}isEqual(e){return this===e}}class ha extends cQ{constructor(e,t){super(e),this._a=t}_toFieldTransform(e){let t=hr(this,e,!0),n=this._a.map(e=>hh(e,t)),r=new sc(n);return new sm(e.path,r)}isEqual(e){return this===e}}class ho extends cQ{constructor(e,t){super(e),this.wa=t}_toFieldTransform(e){let t=new sd(e.It,sn(e.It,this.wa));return new sm(e.path,t)}isEqual(e){return this===e}}function hu(e,t,n,r){let i=e.da(1,t,n);hp("Data must be an object, but it was:",i,r);let s=[],a=ib.empty();rq(r,(e,r)=>{let o=hy(t,e,n);r=(0,m.m9)(r);let u=i.ca(o);if(r instanceof hn)s.push(o);else{let l=hh(r,u);null!=l&&(s.push(o),a.set(o,l))}});let o=new rK(s);return new cX(a,o,i.fieldTransforms)}function hl(e,t,n,r,i,s){let a=e.da(1,t,n),o=[hm(t,r,n)],u=[i];if(s.length%2!=0)throw new n3(n7.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let l=0;l<s.length;l+=2)o.push(hm(t,s[l])),u.push(s[l+1]);let c=[],h=ib.empty();for(let d=o.length-1;d>=0;--d)if(!h$(c,o[d])){let f=o[d],p=u[d];p=(0,m.m9)(p);let g=a.ca(f);if(p instanceof hn)c.push(f);else{let y=hh(p,g);null!=y&&(c.push(f),h.set(f,y))}}let v=new rK(c);return new cX(h,v,a.fieldTransforms)}function hc(e,t,n,r=!1){return hh(n,e.da(r?4:3,t))}function hh(e,t){if(hf(e=(0,m.m9)(e)))return hp("Unsupported field value:",t,e),hd(e,t);if(e instanceof cQ)return function(e,t){if(!cY(t.sa))throw t.ha(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.ha(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.oa&&4!==t.sa)throw t.ha("Nested arrays are not supported");return function(e,t){let n=[],r=0;for(let i of e){let s=hh(i,t.aa(r));null==s&&(s={nullValue:"NULL_VALUE"}),n.push(s),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,m.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return sn(t.It,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=ro.fromDate(e);return{timestampValue:sZ(t.It,n)}}if(e instanceof ro){let r=new ro(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:sZ(t.It,r)}}if(e instanceof c4)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof cW)return{bytesValue:sX(t.It,e._byteString)};if(e instanceof cs){let i=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(i))throw t.ha(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:s5(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.ha(`Unsupported field value: ${l5(e)}`)}(e,t)}function hd(e,t){let n={};return rB(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):rq(e,(e,r)=>{let i=hh(r,t.ra(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function hf(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ro||e instanceof c4||e instanceof cW||e instanceof cs||e instanceof cQ)}function hp(e,t,n){var r;if(!hf(n)||"object"!=typeof(r=n)||null===r||Object.getPrototypeOf(r)!==Object.prototype&&null!==Object.getPrototypeOf(r)){let i=l5(n);throw"an object"===i?t.ha(e+" a custom object"):t.ha(e+" "+i)}}function hm(e,t,n){if((t=(0,m.m9)(t))instanceof c7)return t._internalPath;if("string"==typeof t)return hy(e,t);throw hv("Field path arguments must be of type string or ",e,!1,void 0,n)}let hg=RegExp("[~\\*/\\[\\]]");function hy(e,t,n){if(t.search(hg)>=0)throw hv(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new c7(...t.split("."))._internalPath}catch(r){throw hv(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function hv(e,t,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new n3(n7.INVALID_ARGUMENT,o+e+u)}function h$(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hw{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new cs(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new hI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(hb("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class hI extends hw{data(){return super.data()}}function hb(e,t){return"string"==typeof t?hy(e,t):t instanceof c7?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function h8(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new n3(n7.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class hT{}function hE(e,...t){for(let n of t)e=n._apply(e);return e}class hk extends hT{constructor(e,t,n){super(),this.ma=e,this.ga=t,this.ya=n,this.type="where"}_apply(e){let t=he(e.firestore),n=function(e,t,n,r,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new n3(n7.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){hU(a,s);let u=[];for(let l of a)u.push(hV(r,e,l));o={arrayValue:{values:u}}}else o=hV(r,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||hU(a,s),o=hc(n,t,a,"in"===s||"not-in"===s);let c=iN.create(i,s,o);return function(e,t){if(t.dt()){let n=iH(e);if(null!==n&&!n.isEqual(t.field))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${t.field.toString()}'`);let r=i1(e);null!==r&&hq(e,t.field,r)}let i=function(e,t){for(let n of e.filters)if(t.indexOf(n.op)>=0)return n.op;return null}(e,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==i)throw i===t.op?new n3(n7.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new n3(n7.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${i.toString()}' filters.`)}(e,c),c}(e._query,"where",t,e.firestore._databaseId,this.ma,this.ga,this.ya);return new ca(e.firestore,e.converter,function(e,t){let n=e.filters.concat([t]);return new iG(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}(e._query,n))}}function hS(e,t,n){let r=hb("where",e);return new hk(r,t,n)}class hx extends hT{constructor(e,t){super(),this.ma=e,this.pa=t,this.type="orderBy"}_apply(e){let t=function(e,t,n){if(null!==e.startAt)throw new n3(n7.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new n3(n7.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");let r=new iB(t,n);return function(e,t){if(null===i1(e)){let n=iH(e);null!==n&&hq(e,n,t.field)}}(e,r),r}(e._query,this.ma,this.pa);return new ca(e.firestore,e.converter,function(e,t){let n=e.explicitOrderBy.concat([t]);return new iG(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function h_(e,t="asc"){let n=hb("orderBy",e);return new hx(n,t)}class hC extends hT{constructor(e,t,n){super(),this.type=e,this.Ia=t,this.Ta=n}_apply(e){return new ca(e.firestore,e.converter,iQ(e._query,this.Ia,this.Ta))}}function hA(e){return ce("limit",e),new hC("limit",e,"F")}function hD(e){return ce("limitToLast",e),new hC("limitToLast",e,"L")}class hN extends hT{constructor(e,t,n){super(),this.type=e,this.Ea=t,this.Aa=n}_apply(e){var t,n;let r=hF(e,this.type,this.Ea,this.Aa);return new ca(e.firestore,e.converter,(t=e._query,n=r,new iG(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,n,t.endAt)))}}function hR(...e){return new hN("startAt",e,!0)}function hL(...e){return new hN("startAfter",e,!1)}class hO extends hT{constructor(e,t,n){super(),this.type=e,this.Ea=t,this.Aa=n}_apply(e){var t,n;let r=hF(e,this.type,this.Ea,this.Aa);return new ca(e.firestore,e.converter,(t=e._query,n=r,new iG(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,n)))}}function hP(...e){return new hO("endBefore",e,!1)}function hM(...e){return new hO("endAt",e,!0)}function hF(e,t,n,r){if(n[0]=(0,m.m9)(n[0]),n[0]instanceof hw)return function(e,t,n,r,i){if(!r)throw new n3(n7.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);let s=[];for(let a of i7(e))if(a.field.isKeyField())s.push(il(t,r.key));else{let o=r.data.field(a.field);if(r4(o))throw new n3(n7.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+a.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===o){let u=a.field.canonicalString();throw new n3(n7.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${u}' (used as the orderBy) does not exist.`)}s.push(o)}return new iq(s,i)}(e._query,e.firestore._databaseId,t,n[0]._document,r);{let i=he(e.firestore);return function(e,t,n,r,i,s){let a=e.explicitOrderBy;if(i.length>a.length)throw new n3(n7.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);let o=[];for(let u=0;u<i.length;u++){let l=i[u];if(a[u].field.isKeyField()){if("string"!=typeof l)throw new n3(n7.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof l}`);if(!iW(e)&&-1!==l.indexOf("/"))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${l}' contains a slash.`);let c=e.path.child(rc.fromString(l));if(!rf.isDocumentKey(c))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${c}' is not because it contains an odd number of segments.`);let h=new rf(c);o.push(il(t,h))}else{let d=hc(n,r,l);o.push(d)}}return new iq(o,s)}(e._query,e.firestore._databaseId,i,t,n,r)}}function hV(e,t,n){if("string"==typeof(n=(0,m.m9)(n))){if(""===n)throw new n3(n7.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!iW(t)&&-1!==n.indexOf("/"))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=t.path.child(rc.fromString(n));if(!rf.isDocumentKey(r))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return il(e,new rf(r))}if(n instanceof cs)return il(e,n._key);throw new n3(n7.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${l5(n)}.`)}function hU(e,t){if(!Array.isArray(e)||0===e.length)throw new n3(n7.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`);if(e.length>10)throw new n3(n7.INVALID_ARGUMENT,`Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`)}function hq(e,t,n){if(!n.isEqual(t))throw new n3(n7.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hB{convertValue(e,t="none"){switch(ir(e)){case 0:return null;case 1:return e.booleanValue;case 2:return r3(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(rQ(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw nH()}}convertObject(e,t){let n={};return rq(e.fields,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertGeoPoint(e){return new c4(r3(e.latitude),r3(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=function e(t){let n=t.mapValue.fields.__previous_value__;return r4(n)?e(n):n}(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(r6(e));default:return null}}convertTimestamp(e){let t=r7(e);return new ro(t.seconds,t.nanos)}convertDocumentKey(e,t){var n;let r=rc.fromString(e);(n=am(r))||nH();let i=new rX(r.get(1),r.get(3)),s=new rf(r.popFirst(5));return i.isEqual(t)||n2(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function h0(e,t,n){return e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t}class h9 extends hB{constructor(e){super(),this.firestore=e}convertBytes(e){return new cW(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new cs(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class hj{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hG extends hw{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new hz(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(hb("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class hz extends hG{data(e={}){return super.data(e)}}class h2{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new hj(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new hz(this._firestore,this._userDataWriter,n.key,n,new hj(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new n3(n7.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let n=0;return e._snapshot.docChanges.map(t=>{let r=new hz(e._firestore,e._userDataWriter,t.doc.key,t.doc,new hj(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);return t.doc,{type:"added",doc:r,oldIndex:-1,newIndex:n++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new hz(e._firestore,e._userDataWriter,t.doc.key,t.doc,new hj(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return nH()}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function hK(e,t){return e instanceof hG&&t instanceof hG?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof h2&&t instanceof h2&&e._firestore===t._firestore&&cd(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function h1(e){e=lJ(e,cs);let t=lJ(e.firestore,cP);return cD(cV(t),e._key).then(n=>dt(t,e,n))}class hH extends hB{constructor(e){super(),this.firestore=e}convertBytes(e){return new cW(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new cs(this.firestore,null,t)}}function hW(e){e=lJ(e,cs);let t=lJ(e.firestore,cP),n=cV(t),r=new hH(t);return(function(e,t){let n=new nQ;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await function(e,t){var n;let r=n=e;return r.persistence.runTransaction("read document","readonly",e=>r.localDocuments.getDocument(e,t))}(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new n3(n7.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(i){let s=lt(i,`Failed to get document '${t} from cache`);n.reject(s)}})(await cS(e),t,n)),n.promise})(n,e._key).then(n=>new hG(t,r,e._key,n,new hj(null!==n&&n.hasLocalMutations,!0),e.converter))}function h7(e){e=lJ(e,cs);let t=lJ(e.firestore,cP);return cD(cV(t),e._key,{source:"server"}).then(n=>dt(t,e,n))}function h3(e){e=lJ(e,ca);let t=lJ(e.firestore,cP),n=cV(t),r=new hH(t);return h8(e._query),cN(n,e._query).then(n=>new h2(t,r,e,n))}function hQ(e){e=lJ(e,ca);let t=lJ(e.firestore,cP),n=cV(t),r=new hH(t);return(function(e,t){let n=new nQ;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await us(e,t,!0),i=new l$(t,r.Hi),s=i.Wu(r.documents),a=i.applyChanges(s,!1);n.resolve(a.snapshot)}catch(o){let u=lt(o,`Failed to execute query '${t} against cache`);n.reject(u)}})(await cS(e),t,n)),n.promise})(n,e._query).then(n=>new h2(t,r,e,n))}function h4(e){e=lJ(e,ca);let t=lJ(e.firestore,cP),n=cV(t),r=new hH(t);return cN(n,e._query,{source:"server"}).then(n=>new h2(t,r,e,n))}function h6(e,t,n){e=lJ(e,cs);let r=lJ(e.firestore,cP),i=h0(e.converter,t,n);return de(r,[ht(he(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,sy.none())])}function hZ(e,t,n,...r){e=lJ(e,cs);let i=lJ(e.firestore,cP),s=he(i),a;return a="string"==typeof(t=(0,m.m9)(t))||t instanceof c7?hl(s,"updateDoc",e._key,t,n,r):hu(s,"updateDoc",e._key,t),de(i,[a.toMutation(e._key,sy.exists(!0))])}function hX(e){return de(lJ(e.firestore,cP),[new sC(e._key,sy.none())])}function hY(e,t){let n=lJ(e.firestore,cP),r=cc(e),i=h0(e.converter,t);return de(n,[ht(he(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,sy.exists(!1))]).then(()=>r)}function h5(e,...t){var n,r,i;e=(0,m.m9)(e);let s={includeMetadataChanges:!1},a=0;"object"!=typeof t[a]||cR(t[a])||(s=t[a],a++);let o={includeMetadataChanges:s.includeMetadataChanges};if(cR(t[a])){let u=t[a];t[a]=null===(n=u.next)||void 0===n?void 0:n.bind(u),t[a+1]=null===(r=u.error)||void 0===r?void 0:r.bind(u),t[a+2]=null===(i=u.complete)||void 0===i?void 0:i.bind(u)}let l,c,h;if(e instanceof cs)c=lJ(e.firestore,cP),h=i2(e._key.path),l={next(n){t[a]&&t[a](dt(c,e,n))},error:t[a+1],complete:t[a+2]};else{let d=lJ(e,ca);c=lJ(d.firestore,cP),h=d._query;let f=new hH(c);l={next(e){t[a]&&t[a](new h2(c,f,d,e))},error:t[a+1],complete:t[a+2]},h8(e._query)}return function(e,t,n,r){let i=new cp(r),s=new ld(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>lo(await cA(e),s)),()=>{i.bc(),e.asyncQueue.enqueueAndForget(async()=>lu(await cA(e),s))}}(cV(c),h,o,l)}function hJ(e,t){return function(e,t){let n=new cp(t);return e.asyncQueue.enqueueAndForget(async()=>{var t,r,i;return t=await cA(e),r=n,void((i=t).Ru.add(r),r.next())}),()=>{n.bc(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){var n;(n=e).Ru.delete(t)})(await cA(e),n))}}(cV(e=lJ(e,cP)),cR(t)?t:{next:t})}function de(e,t){return function(e,t){let n=new nQ;return e.asyncQueue.enqueueAndForget(async()=>lk(await c_(e),t,n)),n.promise}(cV(e),t)}function dt(e,t,n){let r=n.docs.get(t._key),i=new hH(e);return new hG(e,i,t._key,r,new hj(n.hasPendingWrites,n.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dn(e,t){return cd(e.query,t.query)&&(0,m.vZ)(e.data(),t.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dr(e){let t=lJ(e.firestore,cP);return function(e,t,n){let r=new nQ;return e.asyncQueue.enqueueAndForget(async()=>{try{if(u0(await cx(e))){let i=await cC(e),s=new cv(t,i,n).run();r.resolve(s)}else r.reject(new n3(n7.UNAVAILABLE,"Failed to get count result because the client is offline."))}catch(a){r.reject(a)}}),r.promise}(cV(t),e,new hH(t))}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let di={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ds{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=he(e)}set(e,t,n){this._verifyNotCommitted();let r=da(e,this._firestore),i=h0(r.converter,t,n),s=ht(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,sy.none())),this}update(e,t,n,...r){this._verifyNotCommitted();let i=da(e,this._firestore),s;return s="string"==typeof(t=(0,m.m9)(t))||t instanceof c7?hl(this._dataReader,"WriteBatch.update",i._key,t,n,r):hu(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,sy.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=da(e,this._firestore);return this._mutations=this._mutations.concat(new sC(t._key,sy.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new n3(n7.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function da(e,t){if((e=(0,m.m9)(e)).firestore!==t)throw new n3(n7.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class du extends class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=he(e)}get(e){let t=da(e,this._firestore),n=new h9(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return nH();let r=e[0];if(r.isFoundDocument())return new hw(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new hw(this._firestore,n,t._key,null,t.converter);throw nH()})}set(e,t,n){let r=da(e,this._firestore),i=h0(r.converter,t,n),s=ht(this._dataReader,"Transaction.set",r._key,i,null!==r.converter,n);return this._transaction.set(r._key,s),this}update(e,t,n,...r){let i=da(e,this._firestore),s;return s="string"==typeof(t=(0,m.m9)(t))||t instanceof c7?hl(this._dataReader,"Transaction.update",i._key,t,n,r):hu(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,s),this}delete(e){let t=da(e,this._firestore);return this._transaction.delete(t._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=da(e,this._firestore),n=new hH(this._firestore);return super.get(e).then(e=>new hG(this._firestore,n,t._key,e._document,new hj(!1,!1),t.converter))}}function dl(e,t,n){e=lJ(e,cP);let r=Object.assign(Object.assign({},di),n);return!function(e){if(e.maxAttempts<1)throw new n3(n7.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(e,t,n){let r=new nQ;return e.asyncQueue.enqueueAndForget(async()=>{let i=await cC(e);new cw(e.asyncQueue,i,n,t,r).run()}),r.promise}(cV(e),n=>t(new du(e,n)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dc(){return new hn("deleteField")}function dh(){return new hi("serverTimestamp")}function dd(...e){return new hs("arrayUnion",e)}function df(...e){return new ha("arrayRemove",e)}function dp(e){return new ho("increment",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dm(e){return cV(e=lJ(e,cP)),new ds(e,t=>de(e,t))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function dg(e,t){var n;let r=cV(e=lJ(e,cP));if(!(null===(n=r.offlineComponents)||void 0===n?void 0:n.indexBackfillerScheduler))return nK("Cannot enable indexes when persistence is disabled"),Promise.resolve();let i=function(e){let t="string"==typeof e?function(e){var t;try{return JSON.parse(e)}catch(n){throw new n3(n7.INVALID_ARGUMENT,"Failed to parse JSON: "+(null===(t=n)||void 0===t?void 0:t.message))}}(e):e,n=[];if(Array.isArray(t.indexes))for(let r of t.indexes){let i=dy(r,"collectionGroup"),s=[];if(Array.isArray(r.fields))for(let a of r.fields){let o=hy("setIndexConfiguration",dy(a,"fieldPath"));"CONTAINS"===a.arrayConfig?s.push(new rv(o,2)):"ASCENDING"===a.order?s.push(new rv(o,0)):"DESCENDING"===a.order&&s.push(new rv(o,1))}n.push(new rp(rp.UNKNOWN_ID,i,s,rw.empty()))}return n}(t);return cS(r).then(e=>(async function(e,t){var n;let r=n=e,i=r.indexManager,s=[];return r.persistence.runTransaction("Configure indexes","readwrite",e=>i.getFieldIndexes(e).next(n=>(function(e,t,n,r,i){t=[...t],(e=[...e]).sort(n),t.sort(n);let s=e.length,a=t.length,o=0,u=0;for(;o<a&&u<s;){let l=n(e[u],t[o]);l<0?i(e[u++]):l>0?r(t[o++]):(o++,u++)}for(;o<a;)r(t[o++]);for(;u<s;)i(e[u++])})(n,t,ry,t=>{s.push(i.addFieldIndex(e,t))},t=>{s.push(i.deleteFieldIndex(e,t))})).next(()=>rx.waitFor(s)))})(e,i))}function dy(e,t){if("string"!=typeof e[t])throw new n3(n7.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}!function(e,t=!0){var n;n0=d.Jn,(0,d.Xd)(new f.wA("firestore",(e,{instanceIdentifier:n,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new cP(new nX(e.getProvider("auth-internal")),new re(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new n3(n7.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rX(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:t},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,d.KN)(nq,"3.7.2",void 0),(0,d.KN)(nq,"3.7.2","esm2017")}()},1153:function(e,t,n){"use strict";n.d(t,{a1:function(){return k},cF:function(){return E}});var r,i,s=n(5816),a=n(4444),o=n(8463);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let u="firebasestorage.googleapis.com";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class l extends a.ZR{constructor(e,t,n=0){super(c(e),`Firebase Storage: ${t} (${c(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,l.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return c(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function c(e){return"storage/"+e}function h(e){return new l("invalid-argument",e)}function d(){return new l("app-deleted","The Firebase app was deleted.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class f{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){var n;let r;try{r=f.makeFromUrl(e,t)}catch(i){return new f(e,"")}if(""===r.path)return r;throw n=e,new l("invalid-default-bucket","Invalid default bucket '"+n+"'.")}static makeFromUrl(e,t){let n=null,r="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),o=RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),c=RegExp(`^https?://${t===u?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),h=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:o,indices:{bucket:1,path:3},postModify:s},{regex:c,indices:{bucket:1,path:2},postModify:s}];for(let d=0;d<h.length;d++){let p=h[d],m=p.regex.exec(e);if(m){let g=m[p.indices.bucket],y=m[p.indices.path];y||(y=""),n=new f(g,y),p.postModify(n);break}}if(null==n){var v;throw v=e,new l("invalid-url","Invalid URL '"+v+"'.")}return n}}class p{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function m(e,t,n,r){if(r<t)throw h(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw h(`Invalid value for '${e}'. Expected ${n} or less.`)}(r=i||(i={}))[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class g{constructor(e,t,n,r,i,s,a,o,u,l,c,h=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=a,this.errorCallback_=o,this.timeout_=u,this.progressCallback_=l,this.connectionFactory_=c,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{if(t){e(!1,new y(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===i.NO_ERROR,s=n.getStatus();if((!t||/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e,t){let n=-1!==[408,429].indexOf(e),r=-1!==t.indexOf(e);return e>=500&&e<600||n||r}(s,this.additionalRetryCodes_))&&this.retry){let a=n.getErrorCode()===i.ABORT;e(!1,new y(!1,null,a));return}let o=-1!==this.successCodes_.indexOf(s);e(!0,new y(o,n))})},t=(e,t)=>{let n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{var s;let a=this.callback_(i,i.getResponse());(s=a,void 0!==s)?n(a):n()}catch(o){r(o)}else if(null!==i){let u=new l("unknown","An unknown error occurred, please check the error payload for server response.");u.serverResponse=i.getErrorText(),r(this.errorCallback_?this.errorCallback_(i,u):u)}else if(t.canceled){let c=this.appDelete_?d():new l("canceled","User canceled the upload/download.");r(c)}else{let h=new l("retry-limit-exceeded","Max retry time for operation exceeded, please try again.");r(h)}};this.canceled_?t(!1,new y(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e,t,n){let r=1,i=null,s=null,a=!1,o=0;function u(){return 2===o}let l=!1;function c(...e){l||(l=!0,t.apply(null,e))}function h(t){i=setTimeout(()=>{i=null,e(f,u())},t)}function d(){s&&clearTimeout(s)}function f(e,...t){if(l){d();return}if(e){d(),c.call(null,e,...t);return}let n=u()||a;if(n){d(),c.call(null,e,...t);return}r<64&&(r*=2);let i;1===o?(o=2,i=0):i=(r+Math.random())*1e3,h(i)}let p=!1;function m(e){if(!p)p=!0,d(),!l&&(null!==i?(e||(o=2),clearTimeout(i),h(0)):e||(o=1))}return h(0),s=setTimeout(()=>{a=!0,m(!0)},n),m}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){if(this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_){var t;(t=this.backoffId_)(!1)}null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class y{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class v{constructor(e,t){this._service=e,t instanceof f?this._location=t:this._location=f.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new v(e,t)}get root(){let e=new f(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");if(-1===t)return"";let n=e.slice(0,t);return n}(this._location.path);if(null===e)return null;let t=new f(this._location.bucket,e);return new v(this._service,t)}_throwIfRoot(e){if(""===this._location.path){var t;throw t=e,new l("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}}function $(e,t){let n=null==t?void 0:t.storageBucket;return null==n?null:f.makeFromBucketSpec(n,e)}class w{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=u,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=f.makeFromBucketSpec(r,this._host):this._bucket=$(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=f.makeFromBucketSpec(this._url,e):this._bucket=$(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){m("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){m("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new v(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new p(d());{let s=function(e,t,n,r,i,s,a=!0){var o,u,l,c,h,d,f,p;let m=function(e){let t=encodeURIComponent,n="?";for(let r in e)if(e.hasOwnProperty(r)){let i=t(r)+"="+t(e[r]);n=n+i+"&"}return n.slice(0,-1)}(e.urlParams),y=e.url+m,v=Object.assign({},e.headers);return o=v,(u=t)&&(o["X-Firebase-GMPID"]=u),l=v,null!==(c=n)&&c.length>0&&(l.Authorization="Firebase "+c),h=v,d=s,h["X-Firebase-Storage-Version"]="webjs/"+(null!=d?d:"AppManager"),f=v,null!==(p=r)&&(f["X-Firebase-AppCheck"]=p),new g(y,e.method,v,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}let I="@firebase/storage",b="0.9.13",T="storage";function E(e=(0,s.Mq)(),t){e=(0,a.m9)(e);let n=(0,s.qX)(e,T),r=n.getImmediate({identifier:t}),i=(0,a.P0)("storage");return i&&k(r,...i),r}function k(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:(0,a.Sg)(i,e.app.options.projectId))}(e,t,n,r)}(0,s.Xd)(new o.wA(T,function e(t,{instanceIdentifier:n}){let r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),a=t.getProvider("app-check-internal");return new w(r,i,a,n,s.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,s.KN)(I,b,""),(0,s.KN)(I,b,"esm2017")},3454:function(e,t,n){"use strict";var r,i;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(i=n.g.process)?void 0:i.env)?n.g.process:n(7663)},6840:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(9944)}])},8829:function(e,t,n){"use strict";n.d(t,{_M:function(){return l},eA:function(){return s},iU:function(){return h},ln:function(){return d},nI:function(){return c},qm:function(){return a},yV:function(){return i}});var r=n(828),i=[["circle","Rond"],["squircle","Squircle"],["heart","Cœur"],["diamond","Losange"],["hexagon","Hexagone"]],s={circle:"Rond",square:"Carr\xe9",squircle:"Squircle",heart:"Cœur",diamond:"Losange",hexagon:"Hexagone"},a=[["none","Aucun"],["clown","Clown"],["warp_helmet","Casque spatial"],["mokoko","Mokoko"],["sakura_gyoiko","Sakura"],["victory_crown","Couronne de vainqueur"],["freezer_bunny_lovebug","Lapin des neiges"],["tga_controller","Manette TGA"],["shield_potion","Bouclier potion"],["fuchsia_agent","Agent fuchsia"],["wingmans_got_it","Wingman"],["heart_to_heart","Cœur \xe0 cœur"],["los_santos","Los Santos"],["shadow","Ombre"],["rec_room_lightning","\xc9clair Rec Room"],["new_year_2025","Nouvel an 2025"],["bush_camper","Buisson campeur"],["hailey","Hailey"]],o={clown:"https://img.avatardecoration.com/decorations/im_a_clown.png",warp_helmet:"https://img.avatardecoration.com/decorations/warp_helmet.png",mokoko:"https://img.avatardecoration.com/decorations/mokoko.png",sakura_gyoiko:"https://img.avatardecoration.com/decorations/sakura_gyoiko.png",victory_crown:"https://img.avatardecoration.com/decorations/victory_crown.png",freezer_bunny_lovebug:"https://img.avatardecoration.com/decorations/freezer_bunny_lovebug.png",tga_controller:"https://img.avatardecoration.com/decorations/tga_controller.png",shield_potion:"https://img.avatardecoration.com/decorations/shield_potion.png",fuchsia_agent:"https://img.avatardecoration.com/decorations/fuchsia_agent.png",wingmans_got_it:"https://img.avatardecoration.com/decorations/wingmans_got_it.png",heart_to_heart:"https://img.avatardecoration.com/decorations/heart_to_heart.png",los_santos:"https://img.avatardecoration.com/decorations/los_santos.png",shadow:"https://img.avatardecoration.com/decorations/shadow.png",rec_room_lightning:"https://img.avatardecoration.com/decorations/rec_room_lightning.png",new_year_2025:"https://img.avatardecoration.com/decorations/new_year_2025.png",bush_camper:"https://img.avatardecoration.com/decorations/bush_camper.png",hailey:"https://img.avatardecoration.com/decorations/hailey.png"},u={square:"dy-mask dy-mask-square",squircle:"avatar-squircle",heart:"dy-mask dy-mask-heart",diamond:"dy-mask dy-mask-diamond",hexagon:"dy-mask dy-mask-hexagon-2"};function l(e){var t;return e&&"circle"!==e?null!==(t=u[e])&&void 0!==t?t:"dy-mask dy-mask-square":"avatar-circle"}function c(e){return e?o[e]:void 0}function h(e){var t,n;return null!==(n=null===(t=a.find(function(t){return(0,r.Z)(t,1)[0]===e}))||void 0===t?void 0:t[1])&&void 0!==n?n:"Aucun"}function d(e){return"avatar-circle"!==l(e)}},2108:function(e,t,n){"use strict";n.d(t,{HD:function(){return y},aC:function(){return v}});var r=n(7568),i=n(6042),s=n(9396),a=n(655),o=n(5893),u=n(7294),l=n(8006),c=n(5321),h=n(9774),d=n(7422),f=n(5195),p=n(7359),m=n(8540),g=(0,u.createContext)(null);function y(e){var t,n,y,v,$,w,I,b,T,E,k,S,x,_,C,A,D,N=e.children,R=(0,u.useState)(null),L=R[0],O=R[1],P=(0,u.useState)(null),M=P[0],F=P[1],V=(0,u.useState)(null),U=V[0],q=V[1],B=(0,u.useState)(!0),j=B[0],G=B[1],z=(0,u.useRef)(null),K=function(e){return(0,s.Z)((0,i.Z)({},e),{id:null!==(t=e.id)&&void 0!==t?t:"",name:null!==(n=e.name)&&void 0!==n?n:"Utilisateur",username:null!==(y=e.username)&&void 0!==y?y:"user",bio:null!==(v=e.bio)&&void 0!==v?v:null,theme:null!==($=e.theme)&&void 0!==$?$:null,accent:null!==(w=e.accent)&&void 0!==w?w:null,website:null!==(I=e.website)&&void 0!==I?I:null,phoneNumber:null!==(b=e.phoneNumber)&&void 0!==b?b:null,location:null!==(T=e.location)&&void 0!==T?T:null,birthDate:null!==(E=e.birthDate)&&void 0!==E?E:null,photoURL:(0,m.SJ)(e.photoURL,e.gender),gender:null!==(k=e.gender)&&void 0!==k?k:"homme",coverPhotoURL:(0,m.Xj)(e.coverPhotoURL),verified:null!==(S=e.verified)&&void 0!==S&&S,following:Array.isArray(e.following)?e.following:[],followers:Array.isArray(e.followers)?e.followers:[],totalTweets:null!==(x=e.totalTweets)&&void 0!==x?x:0,totalPhotos:null!==(_=e.totalPhotos)&&void 0!==_?_:0,pinnedTweet:null!==(C=e.pinnedTweet)&&void 0!==C?C:null,createdAt:e.createdAt,updatedAt:null!==(A=e.updatedAt)&&void 0!==A?A:null})};(0,u.useEffect)(function(){var e,t=!1,n=(e=(0,r.Z)(function(e){var t,n,r,i,s,o,u,h,m,g,y,v,$,w,I,b,T,E,k,S,x,_,C,A;return(0,a.__generator)(this,function(a){switch(a.label){case 0:return a.trys.push([0,15,16,17]),t=e.uid,n=e.displayName,r=e.photoURL,[4,(0,c.getDoc)((0,c.doc)(d.W$,t))];case 1:if((i=a.sent()).exists())return[3,13];if(u=z.current,h=!1,m="",y=(null!==(g=null!=n?n:null===(s=e.email)||void 0===s?void 0:s.split("@")[0])&&void 0!==g?g:"user").replace(/\s/g,"").toLowerCase(),!u)return[3,8];a.label=2;case 2:return a.trys.push([2,4,,5]),[4,(0,p.EJ)(u.username)];case 3:return h=a.sent(),[3,5];case 4:return v=a.sent(),z.current=null,q(Error("Impossible de v\xe9rifier le nom d’utilisateur. R\xe9essayez.")),[2];case 5:if(h)return[3,7];return z.current=null,q(Error("Ce nom d’utilisateur est d\xe9j\xe0 pris.")),[4,(0,l.h8)(e)];case 6:return a.sent(),[2];case 7:return m=u.username,[3,10];case 8:if(h)return[3,10];return $=(0,f.X)(1,1e4),m="".concat(y).concat($),[4,(0,p.EJ)(m)];case 9:return h=a.sent(),[3,8];case 10:return E=((k={}).id=t,k.bio=null,k.name=null!==(b=null!==(I=null!==(w=null==u?void 0:u.name)&&void 0!==w?w:n)&&void 0!==I?I:null===(o=e.email)||void 0===o?void 0:o.split("@")[0])&&void 0!==b?b:"Utilisateur",k.theme=null,k.accent=null,k.website=null,k.phoneNumber=null,k.location=null,k.birthDate=null,k.photoURL=null!=r?r:(null==u?void 0:u.gender)==="femme"?"/Avatar femme.png":"/Avatar homme.png",k.gender=null!==(T=null==u?void 0:u.gender)&&void 0!==T?T:"homme",k.username=m,k.verified=!1,k.following=[],k.followers=[],k.createdAt=(0,c.serverTimestamp)(),k.updatedAt=u?(0,c.serverTimestamp)():null,k.totalTweets=0,k.totalPhotos=0,k.pinnedTweet=null,k.coverPhotoURL=null,k),S=((x={}).likes=[],x.tweets=[],x.updatedAt=null,x),[4,Promise.all([(0,c.setDoc)((0,c.doc)(d.W$,t),E),(0,c.setDoc)((0,c.doc)((0,d.bR)(t),"stats"),S)])];case 11:return a.sent(),[4,(0,c.getDoc)((0,c.doc)(d.W$,t))];case 12:return O(K(_=a.sent().data())),z.current=null,[3,14];case 13:O(K(C=i.data())),a.label=14;case 14:return[3,17];case 15:return q(A=a.sent()),[3,17];case 16:return G(!1),[7];case 17:return[2]}})}),function(t){return e.apply(this,arguments)}),i=function(e){G(!0),e?n(e):t&&(O(null),G(!1))},s=(0,l.Aj)(h.I8,i);return(0,l.cx)(h.I8).then(function(){t=!0,h.I8.currentUser||G(!1)}).catch(function(e){t=!0,q(e),G(!1)}),s},[]),(0,u.useEffect)(function(){if(L){var e=L.id,t=(0,c.onSnapshot)((0,c.doc)(d.W$,e),function(e){var t=e.data();t&&O(K(t))}),n=(0,c.onSnapshot)((0,d.we)(e),function(e){F(e.docs.map(function(e){return e.data()}))});return function(){t(),n()}}},[null==L?void 0:L.id]);var H,W,Q,Z=(D=(0,r.Z)(function(){var e,t;return(0,a.__generator)(this,function(n){switch(n.label){case 0:q(null),n.label=1;case 1:return n.trys.push([1,3,,4]),e=new l.hJ,[4,(0,l.F6)(h.I8,e)];case 2:return n.sent(),[3,4];case 3:return q(t=n.sent()),[3,4];case 4:return[2]}})}),function(){return D.apply(this,arguments)}),X=(H=(0,r.Z)(function(e,t){var n;return(0,a.__generator)(this,function(r){switch(r.label){case 0:q(null),r.label=1;case 1:return r.trys.push([1,3,,4]),[4,(0,l.e5)(h.I8,e,t)];case 2:return r.sent(),[3,4];case 3:return q(n=r.sent()),[3,4];case 4:return[2]}})}),function(e,t){return H.apply(this,arguments)}),Y=(W=(0,r.Z)(function(e,t,n,r,i){var s,o,u;return(0,a.__generator)(this,function(a){switch(a.label){case 0:q(null),a.label=1;case 1:return a.trys.push([1,4,,5]),z.current={name:e,username:t,gender:n},[4,(0,l.Xb)(h.I8,r,i)];case 2:return s=a.sent(),o={},[4,(0,l.ck)(s.user,(o.displayName=e,o))];case 3:return a.sent(),[3,5];case 4:return u=a.sent(),z.current=null,q(u),[3,5];case 5:return[2]}})}),function(e,t,n,r,i){return W.apply(this,arguments)}),J=(Q=(0,r.Z)(function(){var e;return(0,a.__generator)(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,(0,l.w7)(h.I8)];case 1:return t.sent(),[3,3];case 2:return q(e=t.sent()),[3,3];case 3:return[2]}})}),function(){return Q.apply(this,arguments)});(0,u.useEffect)(function(){if(L){var e,t=L.id,n=L.createdAt,i="welcome";(e=(0,r.Z)(function(){var e,r,s,o;return(0,a.__generator)(this,function(a){switch(a.label){case 0:return e=(0,c.doc)((0,d.CC)(t),i),[4,(0,c.getDoc)(e)];case 1:if((r=a.sent()).exists())return[2];return s="number"==typeof n?n:n&&"function"==typeof n.toMillis?n.toMillis():Date.now(),o={},[4,(0,c.setDoc)(e,(o.id=i,o.title="Bienvenue sur Inspiration",o.body="Merci d’avoir cr\xe9\xe9 votre compte sur Inspiration.\n\nInspiration est un r\xe9seau social pens\xe9 pour partager vos id\xe9es, vos passions et vos moments dans un espace simple, rapide et respectueux. Vous pouvez publier du texte, des photos, des GIFs, des sondages et des vid\xe9os, programmer vos publications, ajouter un lieu, et \xe9changer en messages priv\xe9s ou en groupes.\n\nPour bien d\xe9marrer : compl\xe9tez votre profil (photo, bio, lieu, th\xe8me), publiez votre premier message, explorez la page \xab D\xe9couvrir \xbb pour trouver des comptes \xe0 suivre, cr\xe9ez un statut \xe9ph\xe9m\xe8re (24 h), lancez une cha\xeene pour diffuser du contenu dont vous \xeates le seul auteur, et personnalisez vos pr\xe9f\xe9rences dans les param\xe8tres.\n\nVos donn\xe9es restent les v\xf4tres. Nous ne vendons jamais vos informations personnelles. Vous gardez le contr\xf4le total de votre contenu et de votre exp\xe9rience.\n\nBesoin d’aide ? Consultez les param\xe8tres ou contactez-nous. Bonne exploration sur Inspiration !",o.type="welcome",o.createdAt=s,o.read=!1,o))];case 2:return a.sent(),[2]}})}),function(){return e.apply(this,arguments)})().catch(function(){})}},[null==L?void 0:L.id]);var ee=(0,u.useMemo)(f.w,[null==L?void 0:L.id]),et=!!L&&"ccrsxx"===L.username;return(0,o.jsx)(g.Provider,{value:{user:L,error:U,loading:j,isAdmin:et,randomSeed:ee,userBookmarks:M,signOut:J,signInWithGoogle:Z,signInWithEmail:X,signUpWithEmail:Y},children:N})}function v(){var e=(0,u.useContext)(g);if(!e)throw Error("useAuth must be used within an AuthContextProvider");return e}},5655:function(e,t,n){"use strict";n.d(t,{Fg:function(){return _},ze:function(){return x}});var r=n(828),i=n(5893),s=n(7294),a=n(7359),o=n(8829),u=n(9449),l=n(2108),c=(0,s.createContext)(null),h="(prefers-color-scheme: dark)",d=["auto","light","dim","dark"];function f(e){return d.includes(e)?e:"auto"}function p(){return f(localStorage.getItem("theme"))}function m(e){if("undefined"!=typeof document){var t,n=document.documentElement,r=(t=e,"auto"!==t?t:window.matchMedia(h).matches?"dim":"light"),i="dim"===r?"dark":r;n.setAttribute("data-theme",r),n.style.colorScheme="dark"===i?"dark":"light",n.classList.toggle("dark","dark"===i),n.style.setProperty("--main-background","var(--".concat(r,"-background)")),n.style.setProperty("--main-search-background","var(--".concat(r,"-search-background)")),n.style.setProperty("--main-sidebar-background","var(--".concat(r,"-sidebar-background)")),localStorage.setItem("theme",e)}}function g(e){"undefined"!=typeof document&&(document.documentElement.style.setProperty("--main-accent","var(--accent-".concat(e,")")),localStorage.setItem("accent",e))}function y(e){if("undefined"!=typeof document){var t=document.documentElement,n=u.SA[e];t.style.setProperty("--font-main",n),t.style.setProperty("--font-title",n),localStorage.setItem("font",e)}}var v=["blue","indigo","pink","purple","red","green"];function $(e){return v.includes(e)?e:"yellow"===e||"cyan"===e?"indigo":"orange"===e?"red":"blue"}function w(){return $(localStorage.getItem("accent"))}function I(){return(0,u.kG)(localStorage.getItem("font"))}var b=["circle","square","squircle","heart","diamond","hexagon"];function T(e){return e?b.includes(e)?e:"square":"circle"}function E(){return T(localStorage.getItem("avatarShape"))}function k(e){return o.qm.some(function(t){return(0,r.Z)(t,1)[0]===e})?e:"none"}function S(){return k(localStorage.getItem("avatarFrame"))}function x(e){var t=e.children,n=(0,s.useState)(p),r=n[0],o=n[1],d=(0,s.useState)(w),v=d[0],b=d[1],x=(0,s.useState)(I),_=x[0],C=x[1],A=(0,s.useState)(E),D=A[0],N=A[1],R=(0,s.useState)(S),L=R[0],O=R[1],P=(0,l.aC)().user,M=null!=P?P:{},F=M.id,V=M.theme,U=M.accent,q=M.avatarShape,B=M.avatarFrame,j=M.customFont;(0,s.useEffect)(function(){P&&V&&o(f(V))},[F,V]),(0,s.useEffect)(function(){P&&U&&b($(U))},[F,U]),(0,s.useEffect)(function(){P&&q&&N(T(q))},[F,q]),(0,s.useEffect)(function(){P&&B&&O(k(B))},[F,B]),(0,s.useEffect)(function(){P&&j&&C((0,u.kG)(j))},[F,j]),(0,s.useEffect)(function(){m(r)},[r]),(0,s.useEffect)(function(){if("auto"===r){var e=window.matchMedia(h),t=function(){return m("auto")};return e.addEventListener("change",t),function(){return e.removeEventListener("change",t)}}},[r]),(0,s.useEffect)(function(){if(P){var e=setTimeout(function(){(0,a.Zs)(P.id,{theme:r})},400);return function(){return clearTimeout(e)}}},[F,r]),(0,s.useEffect)(function(){g(v)},[v]),(0,s.useEffect)(function(){if(P){var e=setTimeout(function(){(0,a.Zs)(P.id,{accent:v})},400);return function(){return clearTimeout(e)}}},[F,v]),(0,s.useEffect)(function(){y(_)},[_]),(0,s.useEffect)(function(){document.documentElement.setAttribute("data-avatar-shape",D),localStorage.setItem("avatarShape",D),(null==P?void 0:P.id)&&(0,a.Al)(P.id,{avatarShape:D}).catch(function(){})},[F,D]),(0,s.useEffect)(function(){document.documentElement.setAttribute("data-avatar-frame",L),localStorage.setItem("avatarFrame",L),(null==P?void 0:P.id)&&(0,a.Al)(P.id,{avatarFrame:L}).catch(function(){})},[F,L]);var G=function(e){m(e),o(e)},z=function(e){g(e),b(e)},K=function(e){return G(e.target.value)},H=function(e){return z(e.target.value)},W=function(e){y(e),C(e),(null==P?void 0:P.id)&&(0,a.Al)(P.id,{customFont:e}).catch(function(){})};return(0,i.jsx)(c.Provider,{value:{theme:r,accent:v,font:_,avatarShape:D,avatarFrame:L,changeTheme:K,changeAccent:H,setTheme:G,setAccent:z,setFont:W,setAvatarShape:N,setAvatarFrame:O},children:t})}function _(){var e=(0,s.useContext)(c);if(!e)throw Error("useTheme must be used within an ThemeContextProvider");return e}},1923:function(e,t,n){"use strict";n.d(t,{f7:function(){return i},nc:function(){return r}});var r=!1,i="https://mont2-tweet.vercel.app"},9774:function(e,t,n){"use strict";n.d(t,{I8:function(){return D},db:function(){return A}});var r,i,s,a,o,u,l,c,h,d,f,p,m=n(5816);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (0,m.KN)("firebase","9.13.0","app");var g=n(8006),y=n(5321),v=n(1153),$=n(4444),w=n(8463);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let I="functions",b="us-central1";class T{constructor(e,t,n,r,i=b,s){this.app=e,this.fetchImpl=s,this.emulatorOrigin=null,this.contextProvider=new /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(t){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(){if(this.appCheck){let e=await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(){let e=await this.getAuthToken(),t=await this.getMessagingToken(),n=await this.getAppCheckToken();return{authToken:e,messagingToken:t,appCheckToken:n}}}(t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{let a=new URL(i);this.customDomain=a.origin,this.region=b}catch(o){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){let t=this.app.options.projectId;if(null!==this.emulatorOrigin){let n=this.emulatorOrigin;return`${n}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}let E="@firebase/functions",k="0.8.8";function S(e,t,n){var r,i,s;r=(0,$.m9)(e),i=t,s=n,r.emulatorOrigin=`http://${i}:${s}`}!function(e,t){let n=(t,{instanceIdentifier:n})=>{let r=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("messaging-internal"),a=t.getProvider("app-check-internal");return new T(r,i,s,a,n,e)};(0,m.Xd)(new w.wA(I,n,"PUBLIC").setMultipleInstances(!0)),(0,m.KN)(E,k,void 0),(0,m.KN)(E,k,"esm2017")}(fetch.bind(self));var x=n(1923),_={apiKey:"AIzaSyD7ybB8jjqNyV4SQ38hEVK71AuJUuf1h8E",authDomain:"mont2-tweet.firebaseapp.com",projectId:"mont2-tweet",storageBucket:"mont2-tweet.firebasestorage.app",messagingSenderId:"261870386503",appId:"1:261870386503:web:63092e30b24fb6b88b6062",measurementId:"G-23TKH2B6S8"},C=(p=(l=(0,m.C6)().length?(0,m.Mq)():(0,m.ZF)(function(){if(Object.values(_).some(function(e){return!e}))throw Error("Firebase config is not set or incomplete");return _}()),c=(0,g.v0)(l),h=(0,v.cF)(l),d=(0,y.getFirestore)(l),f=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function(e=(0,m.Mq)(),t=b){let n=(0,m.qX)((0,$.m9)(e),I),r=n.getImmediate({identifier:t}),i=(0,$.P0)("functions");return i&&S(r,...i),r}(l),{firebaseApp:l,auth:c,firestore:d,storage:h,functions:f}),x.nc?(i=(r=p).auth,s=r.storage,a=r.firestore,o=r.functions,u=r.firebaseApp,(0,g.S$)(i,"http://localhost:9099",{disableWarnings:!0}),(0,v.a1)(s,"localhost",9199),(0,y.connectFirestoreEmulator)(a,"localhost",8080),S(o,"localhost",5001),{firebaseApp:u,auth:i,firestore:a,storage:s,functions:o}):p),A=C.firestore,D=C.auth;C.storage},7422:function(e,t,n){"use strict";n.d(t,{tn:function(){return v},WN:function(){return S},lV:function(){return y},VV:function(){return g},we:function(){return w},mk:function(){return T},HA:function(){return k},CC:function(){return b},qx:function(){return $},rN:function(){return I},bR:function(){return E},W$:function(){return m}});var r=n(5321),i=n(6042),s={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.id;return(0,i.Z)({id:n},e.data(t))}},a={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}},o={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}},u={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}},l={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}},c={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}},h={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.id,r=e.data(t);return(0,i.Z)({id:n},r)}},d={toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.id,r=e.data(t);return(0,i.Z)({id:n},r)}},f=n(102),p=n(9774),m=(0,r.collection)(p.db,"users").withConverter({toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.data(t);return(0,i.Z)({},n)}}),g=(0,r.collection)(p.db,"tweets").withConverter({toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.id,r=e.data(t);return(0,i.Z)({id:n},r)}}),y=(0,r.collection)(p.db,"statuses").withConverter(f.H),v=(0,r.collection)(p.db,"channels").withConverter({toFirestore:function(e){return(0,i.Z)({},e)},fromFirestore:function(e,t){var n=e.id,r=e.data(t);return(0,i.Z)({id:n},r)}});function $(e){return(0,r.collection)(p.db,"users/".concat(e,"/reports")).withConverter(d)}function w(e){return(0,r.collection)(p.db,"users/".concat(e,"/bookmarks")).withConverter(a)}function I(e){return(0,r.collection)(p.db,"users/".concat(e,"/scheduledTweets")).withConverter(s)}function b(e){return(0,r.collection)(p.db,"users/".concat(e,"/notifications")).withConverter(h)}function T(e){return(0,r.collection)(p.db,"users/".concat(e,"/contacts")).withConverter(o)}function E(e){return(0,r.collection)(p.db,"users/".concat(e,"/stats")).withConverter(u)}function k(e){return(0,r.collection)(p.db,"users/".concat(e,"/conversations")).withConverter(c)}function S(e,t){return(0,r.collection)(p.db,"users/".concat(e,"/conversations/").concat(t,"/messages")).withConverter(l)}},9802:function(e,t,n){"use strict";n.d(t,{Pp:function(){return u},R2:function(){return d},TS:function(){return o},Xl:function(){return I},dI:function(){return v},i:function(){return f},le:function(){return l},mk:function(){return p},o9:function(){return c},vr:function(){return h},y6:function(){return g}});var r=n(7568),i=n(655),s=n(5321),a=n(7422),o="#000000",u="#1d9bf0",l="#ffffff",c=7e3,h=[{name:"Noir",value:"#000000"},{name:"Encre",value:"#15202b"},{name:"Bleu",value:"#1d9bf0"},{name:"Violet",value:"#7856ff"},{name:"Rose",value:"#f91880"},{name:"Rouge",value:"#f4212e"},{name:"Orange",value:"#ff7a00"},{name:"Vert",value:"#00ba7c"},{name:"Gris",value:"#536471"},{name:"Blanc",value:"#ffffff"}],d=[{name:"Blanc",value:"#ffffff"},{name:"Noir",value:"#000000"},{name:"Encre",value:"#15202b"},{name:"Bleu",value:"#1d9bf0"},{name:"Violet",value:"#7856ff"},{name:"Rose",value:"#f91880"},{name:"Rouge",value:"#f4212e"},{name:"Orange",value:"#ff7a00"},{name:"Vert",value:"#00ba7c"},{name:"Jaune",value:"#ffd400"}],f=[{name:"3 secondes",value:"3000"},{name:"5 secondes",value:"5000"},{name:"7 secondes",value:"7000"},{name:"10 secondes",value:"10000"},{name:"15 secondes",value:"15000"}];function p(e,t){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(function(e,t){var n,r,h,d,f,p,m,g,y,v,$,w;return(0,i.__generator)(this,function(i){switch(i.label){case 0:return n=t.kind,r=t.media,h=t.text,d=t.link,f=t.backgroundColor,p=t.barColor,m=t.textColor,g=t.duration,y=t.scheduledFor,v=(($={}).createdBy=e,$.createdAt=(0,s.serverTimestamp)(),$.updatedAt=null,$.kind=n,$.media=r,$.text=h,$.link=d,$.backgroundColor=f||o,$.barColor=p||u,$.textColor=m||l,$.duration=g||c,$.scheduledFor=y?s.Timestamp.fromDate(y):null,$.viewedBy=[e],$.expiresAt=s.Timestamp.fromMillis((y?y.getTime():Date.now())+864e5),$),[4,(0,s.addDoc)(a.lV,v)];case 1:return[2,w=i.sent().id]}})})).apply(this,arguments)}function g(e){return y.apply(this,arguments)}function y(){return(y=(0,r.Z)(function(e){var t,n,r,o,u,l,c,h,d,f,p,m,g,y,v,$;return(0,i.__generator)(this,function(i){switch(i.label){case 0:if(!e)return[2,0];return[4,(0,s.getDocs)((0,s.query)(a.lV,(0,s.where)("createdBy","==",e),(0,s.limit)(50)))];case 1:t=i.sent(),n=Date.now(),r=0,o=!0,u=!1,l=void 0,i.label=2;case 2:i.trys.push([2,7,8,9]),c=t.docs[Symbol.iterator](),i.label=3;case 3:if(o=(h=c.next()).done)return[3,6];if(!(y=null!==(g=null===(f=(m=(d=h.value).data()).scheduledFor)||void 0===f?void 0:null===(p=f.toMillis)||void 0===p?void 0:p.call(f))&&void 0!==g?g:null)||y>n)return[3,5];return v={},[4,(0,s.updateDoc)(d.ref,(v.scheduledFor=null,v.createdAt=(0,s.serverTimestamp)(),v.updatedAt=(0,s.serverTimestamp)(),v))];case 4:i.sent(),r+=1,i.label=5;case 5:return o=!0,[3,3];case 6:return[3,9];case 7:return $=i.sent(),u=!0,l=$,[3,9];case 8:try{o||null==c.return||c.return()}finally{if(u)throw l}return[7];case 9:return[2,r]}})})).apply(this,arguments)}function v(e){return $.apply(this,arguments)}function $(){return($=(0,r.Z)(function(e){return(0,i.__generator)(this,function(t){switch(t.label){case 0:return[4,(0,s.deleteDoc)((0,s.doc)(a.lV,e))];case 1:return t.sent(),[2]}})})).apply(this,arguments)}var w=new Set;function I(e,t){return b.apply(this,arguments)}function b(){return(b=(0,r.Z)(function(e,t){var n,r;return(0,i.__generator)(this,function(i){switch(i.label){case 0:if(!e||w.has(e))return[2];w.add(e),i.label=1;case 1:return i.trys.push([1,3,,4]),n={},[4,(0,s.updateDoc)((0,s.doc)(a.lV,e),(n.viewedBy=(0,s.arrayUnion)(t),n.updatedAt=(0,s.serverTimestamp)(),n))];case 2:return i.sent(),[3,4];case 3:return r=i.sent(),[3,4];case 4:return[2]}})})).apply(this,arguments)}},7359:function(e,t,n){"use strict";n.d(t,{$1:function(){return N},Al:function(){return p},EJ:function(){return d},MT:function(){return U},Mq:function(){return A},R1:function(){return M},SZ:function(){return _},X_:function(){return w},Zs:function(){return g},_A:function(){return E},_D:function(){return Z},_S:function(){return v},aE:function(){return P},as:function(){return G},f$:function(){return B},gL:function(){return b},iq:function(){return L},mN:function(){return F},yg:function(){return K}});var r=n(7568),i=n(4924),s=n(6042),a=n(9396),o=n(828),u=n(655),l=n(5321);n(1153);var c=n(9774),h=n(7422);function d(e){return f.apply(this,arguments)}function f(){return(f=(0,r.Z)(function(e){var t;return(0,u.__generator)(this,function(n){switch(n.label){case 0:return[4,(0,l.getDocs)((0,l.query)(h.W$,(0,l.where)("username","==",e),(0,l.limit)(1)))];case 1:return[2,t=n.sent().empty]}})})).apply(this,arguments)}function p(e,t){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(function(e,t){var n,r,i;return(0,u.__generator)(this,function(o){switch(o.label){case 0:return n=(0,l.doc)(h.W$,e),r={},i={},[4,(0,l.updateDoc)(n,(0,a.Z)((0,s.Z)(r,t),(i.updatedAt=(0,l.serverTimestamp)(),i)))];case 1:return o.sent(),[2]}})})).apply(this,arguments)}function g(e,t){return y.apply(this,arguments)}function y(){return(y=(0,r.Z)(function(e,t){var n,r;return(0,u.__generator)(this,function(i){switch(i.label){case 0:return n=(0,l.doc)(h.W$,e),r={},[4,(0,l.updateDoc)(n,(0,s.Z)(r,t))];case 1:return i.sent(),[2]}})})).apply(this,arguments)}function v(e,t){return $.apply(this,arguments)}function $(){return($=(0,r.Z)(function(e,t){var n,r,i,o;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return n=(0,l.doc)(h.W$,e),r={},i={},o={},[4,(0,l.updateDoc)(n,(0,a.Z)((0,s.Z)(r,t&&(i.username=t,i)),(o.updatedAt=(0,l.serverTimestamp)(),o)))];case 1:return u.sent(),[2]}})})).apply(this,arguments)}function w(e,t,n){return I.apply(this,arguments)}function I(){return(I=(0,r.Z)(function(e,t,n){var r,i;return(0,u.__generator)(this,function(s){switch(s.label){case 0:return r=(0,l.doc)(h.W$,t),i={},[4,(0,l.updateDoc)(r,(i.updatedAt=(0,l.serverTimestamp)(),i.pinnedTweet="pin"===e?n:null,i))];case 1:return s.sent(),[2]}})})).apply(this,arguments)}function b(e,t,n){return T.apply(this,arguments)}function T(){return(T=(0,r.Z)(function(e,t,n){var r,i,s,a,o,d,f;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return r=(0,l.writeBatch)(c.db),i=(0,l.doc)(h.W$,t),s=(0,l.doc)(h.W$,n),a={},o={},d={},f={},"follow"===e?(r.update(i,(a.following=(0,l.arrayUnion)(n),a.updatedAt=(0,l.serverTimestamp)(),a)),r.update(s,(o.followers=(0,l.arrayUnion)(t),o.updatedAt=(0,l.serverTimestamp)(),o))):(r.update(i,(d.following=(0,l.arrayRemove)(n),d.updatedAt=(0,l.serverTimestamp)(),d)),r.update(s,(f.followers=(0,l.arrayRemove)(t),f.updatedAt=(0,l.serverTimestamp)(),f))),[4,r.commit()];case 1:return u.sent(),[2]}})})).apply(this,arguments)}function E(e){return k.apply(this,arguments)}function k(){return(k=(0,r.Z)(function(e){var t;return(0,u.__generator)(this,function(n){switch(n.label){case 0:return t=(0,l.doc)(h.VV,e),[4,(0,l.deleteDoc)(t)];case 1:return n.sent(),[2]}})})).apply(this,arguments)}var S=new Set,x="inspiration:view:";function _(e){return C.apply(this,arguments)}function C(){return(C=(0,r.Z)(function(e){var t,n,r;return(0,u.__generator)(this,function(s){switch(s.label){case 0:if(!e||function(e){if(S.has(e))return!0;try{return"1"===sessionStorage.getItem(x+e)}catch(t){return!1}}(e))return[2];!function(e){S.add(e);try{sessionStorage.setItem(x+e,"1")}catch(t){}}(e),t=new Date().toISOString().slice(0,10),s.label=1;case 1:return s.trys.push([1,3,,4]),n={},[4,(0,l.updateDoc)((0,l.doc)(h.VV,e),(0,i.Z)((n.views=(0,l.increment)(1),n),"viewsByDay.".concat(t),(0,l.increment)(1)))];case 2:return s.sent(),[3,4];case 3:return r=s.sent(),[3,4];case 4:return[2]}})})).apply(this,arguments)}function A(e,t){return D.apply(this,arguments)}function D(){return(D=(0,r.Z)(function(e,t){var n,r,i;return(0,u.__generator)(this,function(s){switch(s.label){case 0:n=(0,l.doc)(h.VV,t),s.label=1;case 1:return s.trys.push([1,3,,4]),r={},[4,(0,l.updateDoc)(n,(r.userReplies=(0,l.increment)("increment"===e?1:-1),r.updatedAt=(0,l.serverTimestamp)(),r))];case 2:return s.sent(),[3,4];case 3:return i=s.sent(),[3,4];case 4:return[2]}})})).apply(this,arguments)}function N(e,t){return R.apply(this,arguments)}function R(){return(R=(0,r.Z)(function(e,t){var n,r;return(0,u.__generator)(this,function(i){switch(i.label){case 0:return n=(0,l.doc)(h.W$,t),r={},[4,(0,l.updateDoc)(n,(r.totalTweets=(0,l.increment)("increment"===e?1:-1),r.updatedAt=(0,l.serverTimestamp)(),r))];case 1:return i.sent(),[2]}})})).apply(this,arguments)}function L(e,t){return O.apply(this,arguments)}function O(){return(O=(0,r.Z)(function(e,t){var n,r;return(0,u.__generator)(this,function(i){switch(i.label){case 0:return n=(0,l.doc)(h.W$,t),r={},[4,(0,l.updateDoc)(n,(r.totalPhotos=(0,l.increment)("increment"===e?1:-1),r.updatedAt=(0,l.serverTimestamp)(),r))];case 1:return i.sent(),[2]}})})).apply(this,arguments)}function P(e,t,n){return(0,r.Z)(function(){var r,i,s,a,o,d,f;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return r=(0,l.writeBatch)(c.db),i=(0,l.doc)(h.VV,n),s=(0,l.doc)((0,h.bR)(t),"stats"),a={},o={},d={},f={},"retweet"===e?(r.update(i,(a.userRetweets=(0,l.arrayUnion)(t),a.updatedAt=(0,l.serverTimestamp)(),a)),r.update(s,(o.tweets=(0,l.arrayUnion)(n),o.updatedAt=(0,l.serverTimestamp)(),o))):(r.update(i,(d.userRetweets=(0,l.arrayRemove)(t),d.updatedAt=(0,l.serverTimestamp)(),d)),r.update(s,(f.tweets=(0,l.arrayRemove)(n),f.updatedAt=(0,l.serverTimestamp)(),f))),[4,r.commit()];case 1:return u.sent(),[2]}})})}function M(e,t,n){return(0,r.Z)(function(){var r,i,s,a,o,d,f;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return r=(0,l.writeBatch)(c.db),i=(0,l.doc)((0,h.bR)(t),"stats"),s=(0,l.doc)(h.VV,n),a={},o={},d={},f={},"like"===e?(r.update(s,(a.userLikes=(0,l.arrayUnion)(t),a.updatedAt=(0,l.serverTimestamp)(),a)),r.update(i,(o.likes=(0,l.arrayUnion)(n),o.updatedAt=(0,l.serverTimestamp)(),o))):(r.update(s,(d.userLikes=(0,l.arrayRemove)(t),d.updatedAt=(0,l.serverTimestamp)(),d)),r.update(i,(f.likes=(0,l.arrayRemove)(n),f.updatedAt=(0,l.serverTimestamp)(),f))),[4,r.commit()];case 1:return u.sent(),[2]}})})}function F(e,t,n){return V.apply(this,arguments)}function V(){return(V=(0,r.Z)(function(e,t,n){var r,i,s;return(0,u.__generator)(this,function(a){switch(a.label){case 0:if(r=(0,l.doc)((0,h.we)(t),n),"bookmark"!==e)return[3,2];return i=((s={}).id=n,s.createdAt=(0,l.serverTimestamp)(),s),[4,(0,l.setDoc)(r,i)];case 1:return a.sent(),[3,4];case 2:return[4,(0,l.deleteDoc)(r)];case 3:a.sent(),a.label=4;case 4:return[2]}})})).apply(this,arguments)}function U(e,t,n){return q.apply(this,arguments)}function q(){return(q=(0,r.Z)(function(e,t,n){return(0,u.__generator)(this,function(r){switch(r.label){case 0:var i;return[4,(0,l.updateDoc)((0,l.doc)(h.VV,e),"pollVotes.".concat(t),Object.fromEntries(Object.entries(i=n).filter(function(e){return void 0!==(0,o.Z)(e,2)[1]})))];case 1:return r.sent(),[2]}})})).apply(this,arguments)}function B(e,t){return j.apply(this,arguments)}function j(){return(j=(0,r.Z)(function(e,t){var n;return(0,u.__generator)(this,function(r){switch(r.label){case 0:return n={},[4,(0,l.updateDoc)((0,l.doc)(h.VV,e),(0,i.Z)(n,"pollVotes.".concat(t),(0,l.deleteField)()))];case 1:return r.sent(),[2]}})})).apply(this,arguments)}function G(e){return z.apply(this,arguments)}function z(){return(z=(0,r.Z)(function(e){var t,n,r;return(0,u.__generator)(this,function(i){switch(i.label){case 0:return t=(0,h.we)(e),[4,(0,l.getDocs)(t)];case 1:return n=i.sent(),r=(0,l.writeBatch)(c.db),n.forEach(function(e){var t=e.ref;return r.delete(t)}),[4,r.commit()];case 2:return i.sent(),[2]}})})).apply(this,arguments)}function K(e){return H.apply(this,arguments)}function H(){return(H=(0,r.Z)(function(e){var t,n,r,i;return(0,u.__generator)(this,function(s){switch(s.label){case 0:return n=((r={}).text=e.text,r.images=e.images,r.parent=e.parent,r.poll=e.poll,r.createdBy=e.createdBy,r.scheduledAt=l.Timestamp.fromDate(e.scheduledAt),r.status="pending",r.createdAt=(0,l.serverTimestamp)(),r.location=null!==(t=e.location)&&void 0!==t?t:null,r),[4,(0,l.addDoc)((0,h.rN)(e.createdBy),n)];case 1:return[2,(i=s.sent()).id]}})})).apply(this,arguments)}function W(){return(W=(0,r.Z)(function(e){var t;return(0,u.__generator)(this,function(n){switch(n.label){case 0:return[4,(0,l.getDocs)((0,h.rN)(e))];case 1:return[2,(t=n.sent()).docs.map(function(e){return e.data()}).filter(function(e){return"pending"===e.status})]}})})).apply(this,arguments)}function Q(){return(Q=(0,r.Z)(function(e){var t,n,r,i,s,a,o,c;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return t=e.text,n=e.images,r=e.parent,i=e.poll,s=e.createdBy,o=((c={}).text=t,c.parent=r,c.images=n,c.poll=null!=i?i:null,c.pollVotes=i?{}:null,c.location=null!==(a=e.location)&&void 0!==a?a:null,c.userLikes=[],c.createdBy=s,c.createdAt=(0,l.serverTimestamp)(),c.updatedAt=null,c.userReplies=0,c.userRetweets=[],c),[4,Promise.all([(0,l.addDoc)(h.VV,o),N("increment",s),o.images?L("increment",s):null,(null==r?void 0:r.id)?A("increment",r.id):null])];case 1:return u.sent(),[4,(0,l.deleteDoc)((0,l.doc)((0,h.rN)(s),e.id))];case 2:return u.sent(),[2]}})})).apply(this,arguments)}function Z(e){return X.apply(this,arguments)}function X(){return(X=(0,r.Z)(function(e){var t,n,r,i,s,a,o,l,c,h,d,f;return(0,u.__generator)(this,function(u){switch(u.label){case 0:return[4,function(e){return W.apply(this,arguments)}(e)];case 1:t=u.sent(),n=Date.now(),r=t.filter(function(e){var t,r,i=e.scheduledAt,s=null!==(r=null==i?void 0:null===(t=i.toDate)||void 0===t?void 0:t.call(i))&&void 0!==r?r:null;return null!==s&&s.getTime()<=n}),i=0,s=!0,a=!1,o=void 0,u.label=2;case 2:u.trys.push([2,9,10,11]),l=r[Symbol.iterator](),u.label=3;case 3:if(s=(c=l.next()).done)return[3,8];h=c.value,u.label=4;case 4:return u.trys.push([4,6,,7]),[4,function(e){return Q.apply(this,arguments)}(h)];case 5:return u.sent(),i+=1,[3,7];case 6:return d=u.sent(),[3,7];case 7:return s=!0,[3,3];case 8:return[3,11];case 9:return f=u.sent(),a=!0,o=f,[3,11];case 10:try{s||null==l.return||l.return()}finally{if(a)throw o}return[7];case 11:return[2,i]}})})).apply(this,arguments)}},9449:function(e,t,n){"use strict";n.d(t,{SA:function(){return i},Uo:function(){return r},kG:function(){return o},yf:function(){return s}});var r="inter",i={inter:"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",manrope:"'Manrope', 'Inter', system-ui, sans-serif",jakarta:"'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",plex:"'IBM Plex Sans', 'Inter', system-ui, sans-serif"},s=[{key:"inter",label:"Inter",description:"Neutre et pr\xe9cise, la r\xe9f\xe9rence des interfaces modernes."},{key:"manrope",label:"Manrope",description:"G\xe9om\xe9trique et contemporaine, avec beaucoup de caract\xe8re."},{key:"jakarta",label:"Plus Jakarta Sans",description:"Chaleureuse et \xe9ditoriale, agr\xe9able \xe0 lire au quotidien."},{key:"plex",label:"IBM Plex Sans",description:"Technique et soign\xe9e, pens\xe9e pour les longs contenus."}],a=s.map(function(e){return e.key});function o(e){return a.includes(e)?e:"outfit"===e?"manrope":"chirp"===e?"inter":r}},8540:function(e,t,n){"use strict";n.d(t,{SJ:function(){return s},Xj:function(){return a},z3:function(){return o}});var r="/Avatar homme.png",i="/Banniere.png";function s(e,t){var n,i="femme"===t?"/Avatar femme.png":r;if(!e)return i;var s=e.trim();if(!s||function(e,t){if(!e)return!0;var n=e.toLowerCase();return n.includes(t)||n.includes("firebasestorage.googleapis.com")}(s,"twitter-avatar")||"user.jpg"===(null===(n=s.split(/[?#]/,1)[0].split("/").pop())||void 0===n?void 0:n.toLowerCase()))return i;var a=/^(https?:)?\/\//i.test(s),o=s.startsWith("/")||s.startsWith("data:")||s.startsWith("blob:");return a||o?s:i}function a(e){if(!e||function(e){if(!e)return!1;var t,n=null===(t=e.split(/[?#]/,1)[0].split("/").pop())||void 0===t?void 0:t.toLowerCase();return"banniere.avif"===n||"banniere.png"===n}(e))return i;var t=e.toLowerCase();return t.includes("twitter-banner")||t.includes("firebasestorage.googleapis.com")||t.endsWith("/banniere2.png")?i:e}var o=[{name:"Avatar homme",src:r},{name:"Avatar femme",src:"/Avatar femme.png"},{name:"Froge",src:"https://img.avatardecoration.com/avatars/froge_8.png"},{name:"Grimma",src:"https://img.avatardecoration.com/avatars/grimma_1.png"},{name:"Klayden",src:"https://img.avatardecoration.com/avatars/klayden_1.png"},{name:"Scena",src:"https://img.avatardecoration.com/avatars/scena_1.png"},{name:"Megatron",src:"https://img.avatardecoration.com/avatars/megatron_1.png"},{name:"House",src:"https://img.avatardecoration.com/avatars/house_1.png"},{name:"L\xe9on",src:"https://img.avatardecoration.com/avatars/leon_2.png"}]},5195:function(e,t,n){"use strict";n.d(t,{X:function(){return s},w:function(){return i}});var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";function i(){return Array.from({length:20}).reduce(function(e){return e+r[~~(Math.random()*r.length)]},"")}function s(e,t){return Math.floor(Math.random()*(t-e+1))+e}},102:function(e,t,n){"use strict";n.d(t,{H:function(){return s},q:function(){return i}});var r=n(6042);function i(e){var t;return"video"===e.kind||(null===(t=e.type)||void 0===t?void 0:t.includes("video"))===!0}var s={toFirestore:function(e){return(0,r.Z)({},e)},fromFirestore:function(e,t){var n=e.id,i=e.data(t);return(0,r.Z)({id:n},i)}}},9944:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(6042),i=n(5893);n(1720),n(7604),n(5922);var s=n(2108),a=n(5655),o=n(7568),u=n(655),l=n(7294),c=n(6501),h=n(7359),d=n(9802);function f(){var e=(0,s.aC)().user,t=null==e?void 0:e.id;return(0,l.useEffect)(function(){if(t){var e,n=!1,r=!1,i=(e=(0,o.Z)(function(){var e,i,s;return(0,u.__generator)(this,function(a){switch(a.label){case 0:if(n||r)return[2];r=!0,a.label=1;case 1:return a.trys.push([1,4,5,6]),[4,(0,h._D)(t)];case 2:return e=a.sent(),[4,(0,d.y6)(t)];case 3:return(i=a.sent())>0&&!n&&c.Am.success(i>1?"".concat(i," statuts programm\xe9s ont \xe9t\xe9 publi\xe9s"):"Votre statut programm\xe9 a \xe9t\xe9 publi\xe9"),e>0&&!n&&c.Am.success(e>1?"".concat(e," publications programm\xe9es ont \xe9t\xe9 envoy\xe9es"):"Votre publication programm\xe9e a \xe9t\xe9 envoy\xe9e"),[3,6];case 4:return s=a.sent(),[3,6];case 5:return r=!1,[7];case 6:return[2]}})}),function(){return e.apply(this,arguments)});i();var s=window.setInterval(function(){i()},3e4),a=function(){"visible"===document.visibilityState&&i()};return document.addEventListener("visibilitychange",a),function(){n=!0,window.clearInterval(s),document.removeEventListener("visibilitychange",a)}}},[t]),null}var p=n(9008),m=n.n(p),g=n(1923),y="Inspiration — Des id\xe9es et des rencontres qui rapprochent",v="D\xe9couvrez Inspiration : partagez vos id\xe9es, \xe9changez autour de vos centres d’int\xe9r\xeat et rapprochez-vous des autres.",$=(g.f7||"").replace(/\/+$/,""),w="".concat($,"/Discussion.jpg");function I(){return(0,i.jsxs)(m(),{children:[(0,i.jsx)("title",{children:y}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),(0,i.jsx)("meta",{name:"description",content:v},"description"),(0,i.jsx)("meta",{property:"og:type",content:"website"},"og:type"),(0,i.jsx)("meta",{property:"og:site_name",content:"Inspiration"},"og:site_name"),(0,i.jsx)("meta",{property:"og:title",content:y},"og:title"),(0,i.jsx)("meta",{property:"og:description",content:v},"og:description"),(0,i.jsx)("meta",{property:"og:image",content:w},"og:image"),(0,i.jsx)("meta",{property:"og:image:width",content:"612"},"og:image:width"),(0,i.jsx)("meta",{property:"og:image:height",content:"436"},"og:image:height"),(0,i.jsx)("meta",{property:"og:image:alt",content:"Illustration de personnes qui \xe9changent sur Inspiration"},"og:image:alt"),(0,i.jsx)("meta",{name:"twitter:card",content:"summary_large_image"},"twitter:card"),(0,i.jsx)("meta",{name:"twitter:title",content:y},"twitter:title"),(0,i.jsx)("meta",{name:"twitter:description",content:v},"twitter:description"),(0,i.jsx)("meta",{name:"twitter:image",content:w},"twitter:image"),(0,i.jsx)("meta",{name:"twitter:image:alt",content:"Illustration de personnes qui \xe9changent sur Inspiration"},"twitter:image:alt"),(0,i.jsx)("link",{rel:"icon",type:"image/png",href:"/LogoSite.png"}),(0,i.jsx)("link",{rel:"manifest",href:"/site.webmanifest"},"site-manifest")]})}function b(e){var t,n=e.Component,o=e.pageProps,u=null!==(t=n.getLayout)&&void 0!==t?t:function(e){return e};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(I,{}),(0,i.jsx)(s.HD,{children:(0,i.jsxs)(a.ze,{children:[(0,i.jsx)(f,{}),u((0,i.jsx)(n,(0,r.Z)({},o)))]})})]})}},7604:function(){},5922:function(){},1720:function(){},7663:function(e){!function(){var t={229:function(e){var t,n,r,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(r){n=a}}();var u=[],l=!1,c=-1;function h(){l&&r&&(l=!1,r.length?u=r.concat(u):c=-1,u.length&&d())}function d(){if(!l){var e=o(h);l=!0;for(var t=u.length;t;){for(r=u,u=[];++c<t;)r&&r[c].run();c=-1,t=u.length}r=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(r){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new f(e,t)),1!==u.length||l||o(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var s=n[e]={exports:{}},a=!0;try{t[e](s,s.exports,r),a=!1}finally{a&&delete n[e]}return s.exports}r.ab="//";var i=r(229);e.exports=i}()},9008:function(e,t,n){e.exports=n(5443)},5816:function(e,t,n){"use strict";n.d(t,{Jn:function(){return P},qX:function(){return N},Xd:function(){return D},wN:function(){return R},Mq:function(){return F},C6:function(){return V},ZF:function(){return M},KN:function(){return U}});var r,i=n(8463),s=n(3333),a=n(4444);let o=(e,t)=>t.some(t=>e instanceof t),u,l,c=new WeakMap,h=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,m={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return h.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return g(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function g(e){if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(g(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&c.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let t=function(e){if("function"==typeof e){var t;return(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(l||(l=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey,])).includes(t)?function(...e){return t.apply(y(this),e),g(c.get(this))}:function(...e){return g(t.apply(y(this),e))}:function(e,...n){let r=t.call(y(this),e,...n);return d.set(r,e.sort?e.sort():[e]),g(r)}}return(e instanceof IDBTransaction&&function(e){if(h.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});h.set(e,t)}(e),o(e,u||(u=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction,])))?new Proxy(e,m):e}(e);return t!==e&&(f.set(e,t),p.set(t,e)),t}let y=e=>p.get(e),v=["get","getKey","getAll","getAllKeys","count"],$=["put","add","delete","clear"],w=new Map;function I(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(w.get(t))return w.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=$.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||v.includes(n)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),i&&s.done,]))[0]};return w.set(t,s),s}m=(r=e=>({...e,get:(t,n,r)=>I(t,n)||e.get(t,n,r),has:(t,n)=>!!I(t,n)||e.has(t,n)}))(m);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class b{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let T="@firebase/app",E="0.8.3",k=new s.Yd("@firebase/app"),S="[DEFAULT]",x={[T]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},_=new Map,C=new Map;function A(e,t){try{e.container.addComponent(t)}catch(n){k.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function D(e){let t=e.name;if(C.has(t))return k.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(C.set(t,e),_.values()))A(n,e);return!0}function N(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function R(e,t,n=S){N(e,t).clearInstance(n)}let L=new a.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class O{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new i.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw L.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let P="9.13.0";function M(e,t={}){let n=e;if("object"!=typeof t){let r=t;t={name:r}}let s=Object.assign({name:S,automaticDataCollectionEnabled:!1},t),o=s.name;if("string"!=typeof o||!o)throw L.create("bad-app-name",{appName:String(o)});if(n||(n=(0,a.aH)()),!n)throw L.create("no-options");let u=_.get(o);if(u){if((0,a.vZ)(n,u.options)&&(0,a.vZ)(s,u.config))return u;throw L.create("duplicate-app",{appName:o})}let l=new i.H0(o);for(let c of C.values())l.addComponent(c);let h=new O(n,s,l);return _.set(o,h),h}function F(e=S){let t=_.get(e);if(!t&&e===S)return M();if(!t)throw L.create("no-app",{appName:e});return t}function V(){return Array.from(_.values())}function U(e,t,n){var r;let s=null!==(r=x[e])&&void 0!==r?r:e;n&&(s+=`-${n}`);let a=s.match(/\s|\//),o=t.match(/\s|\//);if(a||o){let u=[`Unable to register library "${s}" with version "${t}":`];a&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&o&&u.push("and"),o&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),k.warn(u.join(" "));return}D(new i.wA(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}let q="firebase-heartbeat-store",B=null;function j(){return B||(B=(function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(e,1),o=g(a);return r&&a.addEventListener("upgradeneeded",e=>{r(g(a.result),e.oldVersion,e.newVersion,g(a.transaction))}),n&&a.addEventListener("blocked",()=>n()),o.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",()=>i())}).catch(()=>{}),o})("firebase-heartbeat-database",1,{upgrade(e,t){0===t&&e.createObjectStore(q)}}).catch(e=>{throw L.create("idb-open",{originalErrorMessage:e.message})})),B}async function G(e){var t;try{let n=await j();return n.transaction(q).objectStore(q).get(K(e))}catch(r){if(r instanceof a.ZR)k.warn(r.message);else{let i=L.create("idb-get",{originalErrorMessage:null===(t=r)||void 0===t?void 0:t.message});k.warn(i.message)}}}async function z(e,t){var n;try{let r=await j(),i=r.transaction(q,"readwrite"),s=i.objectStore(q);return await s.put(t,K(e)),i.done}catch(o){if(o instanceof a.ZR)k.warn(o.message);else{let u=L.create("idb-set",{originalErrorMessage:null===(n=o)||void 0===n?void 0:n.message});k.warn(u.message)}}}function K(e){return`${e.name}!${e.options.appId}`}class H{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Q(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=W();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n))?void 0:(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),n=Date.now();return n-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=W(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){let n=[],r=e.slice();for(let i of e){let s=n.find(e=>e.agent===i.agent);if(s){if(s.dates.push(i.date),Z(n)>t){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Z(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=(0,a.L)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function W(){let e=new Date;return e.toISOString().substring(0,10)}class Q{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,a.hl)()&&(0,a.eu)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let t=await G(this.app);return t||{heartbeats:[]}}}async overwrite(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let r=await this.read();return z(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let n=await this._canUseIndexedDBPromise;if(n){let r=await this.read();return z(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}}function Z(e){return(0,a.L)(JSON.stringify({version:2,heartbeats:e})).length}D(new i.wA("platform-logger",e=>new b(e),"PRIVATE")),D(new i.wA("heartbeat",e=>new H(e),"PRIVATE")),U(T,E,""),U(T,E,"esm2017"),U("fire-js","")},8463:function(e,t,n){"use strict";n.d(t,{H0:function(){return o},wA:function(){return i}});var r=n(4444);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class a{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let n=new r.BH;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch(s){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){var t;if(t=e,"EAGER"===t.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(n){}for(let[r,i]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(r);try{let o=this.getOrInitializeService({instanceIdentifier:a});i.resolve(o)}catch(u){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[i,s]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(i);n===a&&s.resolve(r)}return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(i){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){var n;let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:(n=e,n===s?void 0:n),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(i){}return r||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){let t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new a(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},3333:function(e,t,n){"use strict";var r,i;n.d(t,{Yd:function(){return l},in:function(){return r}}),(i=r||(r={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let s={debug:r.DEBUG,verbose:r.VERBOSE,info:r.INFO,warn:r.WARN,error:r.ERROR,silent:r.SILENT},a=r.INFO,o={[r.DEBUG]:"log",[r.VERBOSE]:"log",[r.INFO]:"info",[r.WARN]:"warn",[r.ERROR]:"error"},u=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=o[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class l{constructor(e){this.name=e,this._logLevel=a,this._logHandler=u,this._userLogHandler=null,[].push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in r))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,r.DEBUG,...e),this._logHandler(this,r.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,r.VERBOSE,...e),this._logHandler(this,r.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,r.INFO,...e),this._logHandler(this,r.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,r.WARN,...e),this._logHandler(this,r.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,r.ERROR,...e),this._logHandler(this,r.ERROR,...e)}}},943:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,{Z:function(){return r}})},7568:function(e,t,n){"use strict";function r(e,t,n,r,i,s,a){try{var o=e[s](a),u=o.value}catch(l){n(l);return}o.done?t(u):Promise.resolve(u).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(i,s){var a=e.apply(t,n);function o(e){r(a,i,s,o,u,"next",e)}function u(e){r(a,i,s,o,u,"throw",e)}o(void 0)})}}n.d(t,{Z:function(){return i}})},4924:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},3375:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,{Z:function(){return r}})},6042:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(4924);function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){(0,r.Z)(e,t,n[t])})}return e}},9396:function(e,t,n){"use strict";function r(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}n.d(t,{Z:function(){return r}})},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(3375),i=n(1566);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,r.Z)(e,t)||(0,i.Z)(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1566:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(943);function i(e,t){if(e){if("string"==typeof e)return(0,r.Z)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return(0,r.Z)(e,t)}}},6501:function(e,t,n){"use strict";n.d(t,{x7:function(){return eo},Am:function(){return M}});var r=n(7294);let i={data:""},s=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,l=(e,t)=>{let n="",r="",i="";for(let s in e){let a=e[s];"@"==s[0]?"i"==s[1]?n=s+" "+a+";":r+="f"==s[1]?l(a,s):s+"{"+l(a,"k"==s[1]?"":t)+"}":"object"==typeof a?r+=l(a,t?t.replace(/([^,])+/g,e=>s.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=a&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=l.p?l.p(s,a):s+":"+a+";")}return n+(t&&i?t+"{"+i+"}":i)+r},c={},h=e=>{if("object"==typeof e){let t="";for(let n in e)t+=n+h(e[n]);return t}return e},d=(e,t,n,r,i)=>{var s,d,f,p;let m=h(e),g=c[m]||(c[m]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(m));if(!c[g]){let y=m!==e?e:(e=>{let t,n,r=[{}];for(;t=a.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(n=t[3].replace(u," ").trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);c[g]=l(i?{["@keyframes "+g]:y}:y,n?"":"."+g)}let v=n&&c.g?c.g:null;return n&&(c.g=c[g]),s=c[g],d=t,f=r,(p=v)?d.data=d.data.replace(p,s):-1===d.data.indexOf(s)&&(d.data=f?s+d.data:d.data+s),g},f=(e,t,n)=>e.reduce((e,r,i)=>{let s=t[i];if(s&&s.call){let a=s(n),o=a&&a.props&&a.props.className||/^go/.test(a)&&a;s=o?"."+o:a&&"object"==typeof a?a.props?"":l(a,""):!1===a?"":a}return e+r+(null==s?"":s)},"");function p(e){let t=this||{},n=e.call?e(t.p):e;return d(n.unshift?n.raw?f(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,s(t.target),t.g,t.o,t.k)}p.bind({g:1});let m,g,y,v=p.bind({k:1});function $(e,t){let n=this||{};return function(){let r=arguments;function i(s,a){let o=Object.assign({},s),u=o.className||i.className;n.p=Object.assign({theme:g&&g()},o),n.o=/ *go\d+/.test(u),o.className=p.apply(n,r)+(u?" "+u:""),t&&(o.ref=a);let l=e;return e[0]&&(l=o.as||e,delete o.as),y&&l[0]&&y(o),m(l,o)}return t?t(i):i}}var w=e=>"function"==typeof e,I=(e,t)=>w(e)?e(t):e;let b,T;var E=(b=0,()=>(++b).toString()),k=()=>{if(void 0===T&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");T=!e||e.matches}return T},S=new Map,x=e=>{if(S.has(e))return;let t=setTimeout(()=>{S.delete(e),N({type:4,toastId:e})},1e3);S.set(e,t)},_=e=>{let t=S.get(e);t&&clearTimeout(t)},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&_(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return e.toasts.find(e=>e.id===n.id)?C(e,{type:1,toast:n}):C(e,{type:0,toast:n});case 3:let{toastId:r}=t;return r?x(r):e.toasts.forEach(e=>{x(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},A=[],D={toasts:[],pausedAt:void 0},N=e=>{D=C(D,e),A.forEach(e=>{e(D)})},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={})=>{let[t,n]=(0,r.useState)(D);(0,r.useEffect)(()=>(A.push(n),()=>{let e=A.indexOf(n);e>-1&&A.splice(e,1)}),[t]);let i=t.toasts.map(t=>{var n,r;return{...e,...e[t.type],...t,duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:i}},O=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||E()}),P=e=>(t,n)=>{let r=O(t,e,n);return N({type:2,toast:r}),r.id},M=(e,t)=>P("blank")(e,t);M.error=P("error"),M.success=P("success"),M.loading=P("loading"),M.custom=P("custom"),M.dismiss=e=>{N({type:3,toastId:e})},M.remove=e=>N({type:4,toastId:e}),M.promise=(e,t,n)=>{let r=M.loading(t.loading,{...n,...null==n?void 0:n.loading});return e.then(e=>(M.success(I(t.success,e),{id:r,...n,...null==n?void 0:n.success}),e)).catch(e=>{M.error(I(t.error,e),{id:r,...n,...null==n?void 0:n.error})}),e};var F,V,U,q=(e,t)=>{N({type:1,toast:{id:e,height:t}})},B=()=>{N({type:5,time:Date.now()})},j=e=>{let{toasts:t,pausedAt:n}=L(e);(0,r.useEffect)(()=>{if(n)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let n=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(n<0){t.visible&&M.dismiss(t.id);return}return setTimeout(()=>M.dismiss(t.id),n)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,n]);let i=(0,r.useCallback)(()=>{n&&N({type:6,time:Date.now()})},[n]),s=(0,r.useCallback)((e,n)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:s}=n||{},a=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),o=a.findIndex(t=>t.id===e.id),u=a.filter((e,t)=>t<o&&e.visible).length;return a.filter(e=>e.visible).slice(...r?[u+1]:[0,u]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return{toasts:t,handlers:{updateHeight:q,startPause:B,endPause:i,calculateOffset:s}}},G=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,K=$("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,H=$("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,W=$("div")`
  position: absolute;
`,Q=$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Z=$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,X=({toast:e})=>{let{icon:t,type:n,iconTheme:i}=e;return void 0!==t?"string"==typeof t?r.createElement(Z,null,t):t:"blank"===n?null:r.createElement(Q,null,r.createElement(K,{...i}),"loading"!==n&&r.createElement(W,null,"error"===n?r.createElement(z,{...i}):r.createElement(H,{...i})))},Y=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,J=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ee=$("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,et=$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let n=e.includes("top")?1:-1,[r,i]=k()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(n),J(n)];return{animation:t?`${v(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},er=r.memo(({toast:e,position:t,style:n,children:i})=>{let s=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},a=r.createElement(X,{toast:e}),o=r.createElement(et,{...e.ariaProps},I(e.message,e));return r.createElement(ee,{className:e.className,style:{...s,...n,...e.style}},"function"==typeof i?i({icon:a,message:o}):r.createElement(r.Fragment,null,a,o))});F=r.createElement,l.p=void 0,m=F,g=void 0,y=void 0;var ei=({id:e,className:t,style:n,onHeightUpdate:i,children:s})=>{let a=r.useCallback(t=>{if(t){let n=()=>{i(e,t.getBoundingClientRect().height)};n(),new MutationObserver(n).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return r.createElement("div",{ref:a,className:t,style:n},s)},es=(e,t)=>{let n=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:k()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...r}},ea=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eo=({reverseOrder:e,position:t="top-center",toastOptions:n,gutter:i,children:s,containerStyle:a,containerClassName:o})=>{let{toasts:u,handlers:l}=j(n);return r.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:o,onMouseEnter:l.startPause,onMouseLeave:l.endPause},u.map(n=>{let a=n.position||t,o=l.calculateOffset(n,{reverseOrder:e,gutter:i,defaultPosition:t}),u=es(a,o);return r.createElement(ei,{id:n.id,key:n.id,onHeightUpdate:l.updateHeight,className:n.visible?ea:"",style:u},"custom"===n.type?I(n.message,n):s?s(n):r.createElement(er,{toast:n,position:a}))}))}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(6840),t(387)}),_N_E=e.O()}]);