(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var Y,Be;class dt extends Error{}dt.prototype.name="InvalidTokenError";function di(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function pi(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return di(t)}catch{return atob(t)}}function _s(r,t){if(typeof r!="string")throw new dt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new dt(`Invalid token specified: missing part #${e+1}`);let i;try{i=pi(s)}catch(n){throw new dt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new dt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const fi="mu:context",ce=`${fi}:change`;class mi{constructor(t,e){this._proxy=gi(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class ge extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new mi(t,this),this.style.display="contents"}attach(t){return this.addEventListener(ce,t),t}detach(t){this.removeEventListener(ce,t)}}function gi(r,t){return new Proxy(r,{get:(s,i,n)=>i==="then"?void 0:Reflect.get(s,i,n),set:(s,i,n,o)=>{const l=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let d=new CustomEvent(ce,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(d,{property:i,oldValue:l,value:n}),t.dispatchEvent(d)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function yi(r,t){const e=$s(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function $s(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return $s(r,i.host)}class vi extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function bs(r="mu:message"){return(t,...e)=>t.dispatchEvent(new vi(e,r))}class ye{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${t[0]} message`,t);const e=this._update(t,this._context.value);if(console.log(`Next[${t[0]}] => `,e),!Array.isArray(e))this._context.value=e;else{const[s,...i]=e;this._context.value=s,i.forEach(n=>n.then(o=>{o.length&&this.consume(o)}))}}}const he="mu:auth:jwt",ws=class As extends ye{constructor(t,e){super((s,i)=>this.update(s,i),t,As.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":{const{token:i,redirect:n}=t[1];return[$i(i),ie(n)]}case"auth/signout":return[bi(e.user),ie(this._redirectForLogin)];case"auth/redirect":return[e,ie(this._redirectForLogin,{next:window.location.href})];default:const s=t[0];throw new Error(`Unhandled Auth message "${s}"`)}}};ws.EVENT_TYPE="auth:message";let Es=ws;const Ss=bs(Es.EVENT_TYPE);function ie(r,t){return new Promise((e,s)=>{if(r){const i=window.location.href,n=new URL(r,i);t&&Object.entries(t).forEach(([o,l])=>n.searchParams.set(o,l)),console.log("Redirecting to ",r),window.location.assign(n)}e([])})}class _i extends ge{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=tt.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new Es(this.context,this.redirect).attach(this)}}class X{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(he),t}}class tt extends X{constructor(t){super();const e=_s(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new tt(t);return localStorage.setItem(he,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(he);return t?tt.authenticate(t):new X}}function $i(r){return{user:tt.authenticate(r),token:r}}function bi(r){return{user:r&&r.authenticated?X.deauthenticate(r):r,token:""}}function wi(r){return r&&r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function Ai(r){return r.authenticated?_s(r.token||""):{}}const Et=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:tt,Provider:_i,User:X,dispatch:Ss,headers:wi,payload:Ai},Symbol.toStringTag,{value:"Module"}));function xs(r,t,e){const s=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});r.dispatchEvent(s)}function Rt(r,t,e){const s=r.target;xs(s,t,e)}function ue(r,t="*"){return r.composedPath().find(i=>{const n=i;return n.tagName&&n.matches(t)})||void 0}const Ei=Object.freeze(Object.defineProperty({__proto__:null,dispatchCustom:xs,originalTarget:ue,relay:Rt},Symbol.toStringTag,{value:"Module"}));function ve(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const Si=new DOMParser;function I(r,...t){const e=t.map(l),s=r.map((a,d)=>{if(d===0)return[a];const f=e[d-1];return f instanceof Node?[`<ins id="mu-html-${d-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Si.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,d)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${d}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${d}`)}}),o;function l(a,d){if(a===null)return"";switch(typeof a){case"string":return Ve(a);case"bigint":case"boolean":case"number":case"symbol":return Ve(a.toString());case"object":if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(l);return f.replaceChildren(...u),f}return a instanceof Node?a:new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function Ve(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Yt(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const l=o.firstElementChild,a=l&&l.tagName==="TEMPLATE"?l:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}let xi=(Y=class extends HTMLElement{constructor(){super(),this._state={},Yt(this).template(Y.template).styles(Y.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Rt(r,"mu-form:submit",this._state)}),this.submitSlot&&this.submitSlot.addEventListener("slotchange",()=>{var r,t;for(const e of((r=this.submitSlot)==null?void 0:r.assignedNodes())||[])(t=this.form)==null||t.insertBefore(e,this.submitSlot)})}set init(r){this._state=r||{},Pi(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}get submitSlot(){var r;const t=(r=this.shadowRoot)==null?void 0:r.querySelector('slot[name="submit"]');return t||null}},Y.template=I`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,Y.styles=ve`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `,Y);function Pi(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;case"date":i instanceof Date?o.value=i.toISOString().substr(0,10):o.value=i;break;default:o.value=i;break}}}return r}const ki=Object.freeze(Object.defineProperty({__proto__:null,Element:xi},Symbol.toStringTag,{value:"Module"})),Ps=class ks extends ye{constructor(t){super((e,s)=>this.update(e,s),t,ks.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];return Ci(s,i)}case"history/redirect":{const{href:s,state:i}=t[1];return Ti(s,i)}}}};Ps.EVENT_TYPE="history:message";let _e=Ps;class We extends ge{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=Oi(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(!this._root||s.pathname.startsWith(this._root))&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),$e(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new _e(this.context).attach(this),this._root=this.getAttribute("root")||void 0}}function Oi(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function Ci(r,t={}){return history.pushState(t,"",r),{location:document.location,state:history.state}}function Ti(r,t={}){return history.replaceState(t,"",r),{location:document.location,state:history.state}}const $e=bs(_e.EVENT_TYPE),Os=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:We,Provider:We,Service:_e,dispatch:$e},Symbol.toStringTag,{value:"Module"}));class z{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new Ye(this._provider,t);this._effects.push(i),e(i)}else yi(this._target,this._contextLabel).then(i=>{const n=new Ye(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel} failed to locate a provider`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class Ye{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const Cs=class Ts extends HTMLElement{constructor(){super(),this._state={},this._user=new X,this._authObserver=new z(this,"blazing:auth"),Yt(this).template(Ts.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;Ri(i,this._state,e,this.authorization).then(n=>lt(n,this)).then(n=>{const o=`mu-rest-form:${s}`,l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(l)}).catch(n=>{const o="mu-rest-form:error",l=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(l)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},lt(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&Je(this.src,this.authorization).then(e=>{this._state=e,lt(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&Je(this.src,this.authorization).then(i=>{this._state=i,lt(i,this)});break;case"new":s&&(this._state={},lt({},this));break}}};Cs.observedAttributes=["src","new","action"];Cs.template=I`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function Je(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function lt(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const l=o;l.checked=!!i;break;default:o.value=i;break}}}return r}function Ri(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const Rs=class js extends ye{constructor(t,e){super(e,t,js.EVENT_TYPE,!1)}};Rs.EVENT_TYPE="mu:message";let Ns=Rs;class ji extends ge{constructor(t,e,s){super(e),this._user=new X,this._updateFn=t,this._authObserver=new z(this,s)}connectedCallback(){const t=new Ns(this.context,(e,s)=>this._updateFn(e,s,this._user));t.attach(this),this._authObserver.observe(({user:e})=>{console.log("Store got auth",e),e&&(this._user=e),t.start()})}}const Ni=Object.freeze(Object.defineProperty({__proto__:null,Provider:ji,Service:Ns},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct=globalThis,be=Ct.ShadowRoot&&(Ct.ShadyCSS===void 0||Ct.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),Ke=new WeakMap;let Us=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(be&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ke.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ke.set(e,t))}return t}toString(){return this.cssText}};const Ui=r=>new Us(typeof r=="string"?r:r+"",void 0,we),Mi=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new Us(e,r,we)},Li=(r,t)=>{if(be)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Ct.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Ge=be?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Ui(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Hi,defineProperty:Ii,getOwnPropertyDescriptor:Di,getOwnPropertyNames:zi,getOwnPropertySymbols:Fi,getPrototypeOf:qi}=Object,et=globalThis,Qe=et.trustedTypes,Bi=Qe?Qe.emptyScript:"",Ze=et.reactiveElementPolyfillSupport,pt=(r,t)=>r,jt={toAttribute(r,t){switch(t){case Boolean:r=r?Bi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Ae=(r,t)=>!Hi(r,t),Xe={attribute:!0,type:String,converter:jt,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),et.litPropertyMetadata??(et.litPropertyMetadata=new WeakMap);let K=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ii(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Di(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xe}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;const t=qi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){const e=this.properties,s=[...zi(e),...Fi(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ge(i))}else t!==void 0&&e.push(Ge(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Li(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:jt).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s,i;const n=this.constructor,o=n._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const l=n.getPropertyOptions(o),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:jt;this._$Em=o,this[o]=a.fromAttribute(e,l.type)??((i=this._$Ej)==null?void 0:i.get(o))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??Ae)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[pt("elementProperties")]=new Map,K[pt("finalized")]=new Map,Ze==null||Ze({ReactiveElement:K}),(et.reactiveElementVersions??(et.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=globalThis,Ut=Nt.trustedTypes,ts=Ut?Ut.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ms="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ls="?"+O,Vi=`<${Ls}>`,F=document,gt=()=>F.createComment(""),yt=r=>r===null||typeof r!="object"&&typeof r!="function",Ee=Array.isArray,Wi=r=>Ee(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",re=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,es=/-->/g,ss=/>/g,U=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),is=/'/g,rs=/"/g,Hs=/^(?:script|style|textarea|title)$/i,Yi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ht=Yi(1),st=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),ns=new WeakMap,L=F.createTreeWalker(F,129);function Is(r,t){if(!Ee(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ts!==void 0?ts.createHTML(t):t}const Ji=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=ct;for(let l=0;l<e;l++){const a=r[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ct?f[1]==="!--"?o=es:f[1]!==void 0?o=ss:f[2]!==void 0?(Hs.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=U):f[3]!==void 0&&(o=U):o===U?f[0]===">"?(o=i??ct,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?U:f[3]==='"'?rs:is):o===rs||o===is?o=U:o===es||o===ss?o=ct:(o=U,i=void 0);const h=o===U&&r[l+1].startsWith("/>")?" ":"";n+=o===ct?a+Vi:u>=0?(s.push(d),a.slice(0,u)+Ms+a.slice(u)+O+h):a+O+(u===-2?l:h)}return[Is(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let de=class Ds{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Ji(t,e);if(this.el=Ds.createElement(d,s),L.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=L.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ms)){const c=f[o++],h=i.getAttribute(u).split(O),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Gi:p[1]==="?"?Qi:p[1]==="@"?Zi:Jt}),i.removeAttribute(u)}else u.startsWith(O)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Hs.test(i.tagName)){const u=i.textContent.split(O),c=u.length-1;if(c>0){i.textContent=Ut?Ut.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],gt()),L.nextNode(),a.push({type:2,index:++n});i.append(u[c],gt())}}}else if(i.nodeType===8)if(i.data===Ls)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(O,u+1))!==-1;)a.push({type:7,index:n}),u+=O.length-1}n++}}static createElement(t,e){const s=F.createElement("template");return s.innerHTML=t,s}};function it(r,t,e=r,s){var i,n;if(t===st)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const l=yt(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==l&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),l===void 0?o=void 0:(o=new l(r),o._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=it(r,o._$AS(r,t.values),o,s)),t}let Ki=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??F).importNode(e,!0);L.currentNode=i;let n=L.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Se(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Xi(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=L.nextNode(),o++)}return L.currentNode=F,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},Se=class zs{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=it(this,t,e),yt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==st&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Wi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=de.createElement(Is(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new Ki(n,this),l=o.u(this.options);o.p(s),this.T(l),this._$AH=o}}_$AC(t){let e=ns.get(t.strings);return e===void 0&&ns.set(t.strings,e=new de(t)),e}k(t){Ee(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new zs(this.O(gt()),this.O(gt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Jt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=it(this,t,e,0),o=!yt(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=it(this,l[s+a],e,a),d===st&&(d=this._$AH[a]),o||(o=!yt(d)||d!==this._$AH[a]),d===$?t=$:t!==$&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Gi=class extends Jt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Qi=class extends Jt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Zi=class extends Jt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=it(this,t,e,0)??$)===st)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},Xi=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){it(this,t)}};const os=Nt.litHtmlPolyfillSupport;os==null||os(de,Se),(Nt.litHtmlVersions??(Nt.litHtmlVersions=[])).push("3.3.0");const tr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new Se(t.insertBefore(gt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=globalThis;let Q=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=tr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return st}};Q._$litElement$=!0,Q.finalized=!0,(Be=vt.litElementHydrateSupport)==null||Be.call(vt,{LitElement:Q});const as=vt.litElementPolyfillSupport;as==null||as({LitElement:Q});(vt.litElementVersions??(vt.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const er={attribute:!0,type:String,converter:jt,reflect:!1,hasChanged:Ae},sr=(r=er,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Fs(r){return(t,e)=>typeof e=="object"?sr(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function qs(r){return Fs({...r,state:!0,attribute:!1})}function ir(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function rr(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Bs={};(function(r){var t=function(){var e=function(u,c,h,p){for(h=h||{},p=u.length;p--;h[u[p]]=c);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],l=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(c,h,p,g,m,v,Zt){var E=v.length-1;switch(m){case 1:return new g.Root({},[v[E-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[v[E-1],v[E]]);break;case 4:case 5:this.$=v[E];break;case 6:this.$=new g.Literal({value:v[E]});break;case 7:this.$=new g.Splat({name:v[E]});break;case 8:this.$=new g.Param({name:v[E]});break;case 9:this.$=new g.Optional({},[v[E-1]]);break;case 10:this.$=c;break;case 11:case 12:this.$=c.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(l,[2,4]),e(l,[2,5]),e(l,[2,6]),e(l,[2,7]),e(l,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(l,[2,10]),e(l,[2,11]),e(l,[2,12]),{1:[2,1]},e(l,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(l,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(c,h){if(h.recoverable)this.trace(c);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(c,h)}},parse:function(c){var h=this,p=[0],g=[null],m=[],v=this.table,Zt="",E=0,ze=0,li=2,Fe=1,ci=m.slice.call(arguments,1),_=Object.create(this.lexer),j={yy:{}};for(var Xt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Xt)&&(j.yy[Xt]=this.yy[Xt]);_.setInput(c,j.yy),j.yy.lexer=_,j.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var te=_.yylloc;m.push(te);var hi=_.options&&_.options.ranges;typeof j.yy.parseError=="function"?this.parseError=j.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var ui=function(){var W;return W=_.lex()||Fe,typeof W!="number"&&(W=h.symbols_[W]||W),W},A,N,S,ee,V={},kt,P,qe,Ot;;){if(N=p[p.length-1],this.defaultActions[N]?S=this.defaultActions[N]:((A===null||typeof A>"u")&&(A=ui()),S=v[N]&&v[N][A]),typeof S>"u"||!S.length||!S[0]){var se="";Ot=[];for(kt in v[N])this.terminals_[kt]&&kt>li&&Ot.push("'"+this.terminals_[kt]+"'");_.showPosition?se="Parse error on line "+(E+1)+`:
`+_.showPosition()+`
Expecting `+Ot.join(", ")+", got '"+(this.terminals_[A]||A)+"'":se="Parse error on line "+(E+1)+": Unexpected "+(A==Fe?"end of input":"'"+(this.terminals_[A]||A)+"'"),this.parseError(se,{text:_.match,token:this.terminals_[A]||A,line:_.yylineno,loc:te,expected:Ot})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+N+", token: "+A);switch(S[0]){case 1:p.push(A),g.push(_.yytext),m.push(_.yylloc),p.push(S[1]),A=null,ze=_.yyleng,Zt=_.yytext,E=_.yylineno,te=_.yylloc;break;case 2:if(P=this.productions_[S[1]][1],V.$=g[g.length-P],V._$={first_line:m[m.length-(P||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(P||1)].first_column,last_column:m[m.length-1].last_column},hi&&(V._$.range=[m[m.length-(P||1)].range[0],m[m.length-1].range[1]]),ee=this.performAction.apply(V,[Zt,ze,E,j.yy,S[1],g,m].concat(ci)),typeof ee<"u")return ee;P&&(p=p.slice(0,-1*P*2),g=g.slice(0,-1*P),m=m.slice(0,-1*P)),p.push(this.productions_[S[1]][0]),g.push(V.$),m.push(V._$),qe=v[p[p.length-2]][p[p.length-1]],p.push(qe);break;case 3:return!0}}return!0}},d=function(){var u={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(c,h){return this.yy=h||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var h=c.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},unput:function(c){var h=c.length,p=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(c){this.unput(this.match.slice(c))},pastInput:function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var c=this.pastInput(),h=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+h+"^"},test_match:function(c,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=c[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var v in m)this[v]=m[v];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),v=0;v<m.length;v++)if(p=this._input.match(this.rules[m[v]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=v,this.options.backtrack_lexer){if(c=this.test_match(p,m[v]),c!==!1)return c;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(c=this.test_match(h,m[g]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=d;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof rr<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(Bs);function J(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var Vs={Root:J("Root"),Concat:J("Concat"),Literal:J("Literal"),Splat:J("Splat"),Param:J("Param"),Optional:J("Optional")},Ws=Bs.parser;Ws.yy=Vs;var nr=Ws,or=Object.keys(Vs);function ar(r){return or.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var Ys=ar,lr=Ys,cr=/[\-{}\[\]+?.,\\\^$|#\s]/g;function Js(r){this.captures=r.captures,this.re=r.re}Js.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var hr=lr({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(cr,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new Js({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),ur=hr,dr=Ys,pr=dr({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),fr=pr,mr=nr,gr=ur,yr=fr;St.prototype=Object.create(null);St.prototype.match=function(r){var t=gr.visit(this.ast),e=t.match(r);return e||!1};St.prototype.reverse=function(r){return yr.visit(this.ast,r)};function St(r){var t;if(this?t=this:t=Object.create(St.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=mr.parse(r),t}var vr=St,_r=vr,$r=_r;const br=ir($r);var wr=Object.defineProperty,Ks=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&wr(t,e,i),i};const Gs=class extends Q{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>ht` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new br(i.path)})),this._historyObserver=new z(this,e),this._authObserver=new z(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),ht` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(Ss(this,"auth/redirect"),ht` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):ht` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),ht` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const l=o.route.match(n);if(l)return{...o,path:s,params:l,query:i}}}redirect(t){$e(this,"history/redirect",{href:t})}};Gs.styles=Mi`
    :host,
    main {
      display: contents;
    }
  `;let Mt=Gs;Ks([qs()],Mt.prototype,"_user");Ks([qs()],Mt.prototype,"_match");const Ar=Object.freeze(Object.defineProperty({__proto__:null,Element:Mt,Switch:Mt},Symbol.toStringTag,{value:"Module"})),Qs=class pe extends HTMLElement{constructor(){if(super(),Yt(this).template(pe.template).styles(pe.styles),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Qs.template=I` <template>
    <slot name="actuator"><button>Menu</button></slot>
    <div id="panel">
      <slot></slot>
    </div>
  </template>`;Qs.styles=ve`
    :host {
      position: relative;
    }
    #is-shown {
      display: none;
    }
    #panel {
      display: none;

      position: absolute;
      right: 0;
      margin-top: var(--size-spacing-small);
      width: max-content;
      padding: var(--size-spacing-small);
      border-radius: var(--size-radius-small);
      background: var(--color-background-card);
      color: var(--color-text);
      box-shadow: var(--shadow-popover);
    }
    :host([open]) #panel {
      display: block;
    }
  `;const Zs=class fe extends HTMLElement{constructor(){super(),this._array=[],Yt(this).template(fe.template).styles(fe.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Xs("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ue(t,"button.add")?Rt(t,"input-array:add"):ue(t,"button.remove")&&Rt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Er(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};Zs.template=I`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;Zs.styles=ve`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function Er(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(Xs(e)))}function Xs(r,t){const e=r===void 0?I`<input />`:I`<input value="${r}" />`;return I`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function xt(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Sr=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,Pr=(r,t,e,s)=>{for(var i=xr(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Sr(t,e,i),i};class R extends Q{constructor(t){super(),this._pending=[],this._observer=new z(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate(),this._lastModel=this._context.value;else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Pr([Fs()],R.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=globalThis,xe=Tt.ShadowRoot&&(Tt.ShadyCSS===void 0||Tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pe=Symbol(),ls=new WeakMap;let ti=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Pe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(xe&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=ls.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ls.set(e,t))}return t}toString(){return this.cssText}};const kr=r=>new ti(typeof r=="string"?r:r+"",void 0,Pe),w=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ti(e,r,Pe)},Or=(r,t)=>{if(xe)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=Tt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},cs=xe?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return kr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Cr,defineProperty:Tr,getOwnPropertyDescriptor:Rr,getOwnPropertyNames:jr,getOwnPropertySymbols:Nr,getPrototypeOf:Ur}=Object,T=globalThis,hs=T.trustedTypes,Mr=hs?hs.emptyScript:"",ne=T.reactiveElementPolyfillSupport,ft=(r,t)=>r,Lt={toAttribute(r,t){switch(t){case Boolean:r=r?Mr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ke=(r,t)=>!Cr(r,t),us={attribute:!0,type:String,converter:Lt,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=us){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Tr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Rr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??us}static _$Ei(){if(this.hasOwnProperty(ft("elementProperties")))return;const t=Ur(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ft("properties"))){const e=this.properties,s=[...jr(e),...Nr(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(cs(i))}else t!==void 0&&e.push(cs(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Or(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Lt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Lt;this._$Em=i;const d=a.fromAttribute(e,l.type);this[i]=d??((o=this._$Ej)==null?void 0:o.get(i))??d,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??ke)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[ft("elementProperties")]=new Map,G[ft("finalized")]=new Map,ne==null||ne({ReactiveElement:G}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=globalThis,Ht=mt.trustedTypes,ds=Ht?Ht.createPolicy("lit-html",{createHTML:r=>r}):void 0,ei="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,si="?"+C,Lr=`<${si}>`,q=document,_t=()=>q.createComment(""),$t=r=>r===null||typeof r!="object"&&typeof r!="function",Oe=Array.isArray,Hr=r=>Oe(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",oe=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ps=/-->/g,fs=/>/g,M=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ms=/'/g,gs=/"/g,ii=/^(?:script|style|textarea|title)$/i,Ir=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=Ir(1),rt=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ys=new WeakMap,H=q.createTreeWalker(q,129);function ri(r,t){if(!Oe(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ds!==void 0?ds.createHTML(t):t}const Dr=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=ut;for(let l=0;l<e;l++){const a=r[l];let d,f,u=-1,c=0;for(;c<a.length&&(o.lastIndex=c,f=o.exec(a),f!==null);)c=o.lastIndex,o===ut?f[1]==="!--"?o=ps:f[1]!==void 0?o=fs:f[2]!==void 0?(ii.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=M):f[3]!==void 0&&(o=M):o===M?f[0]===">"?(o=i??ut,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?M:f[3]==='"'?gs:ms):o===gs||o===ms?o=M:o===ps||o===fs?o=ut:(o=M,i=void 0);const h=o===M&&r[l+1].startsWith("/>")?" ":"";n+=o===ut?a+Lr:u>=0?(s.push(d),a.slice(0,u)+ei+a.slice(u)+C+h):a+C+(u===-2?l:h)}return[ri(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class bt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,f]=Dr(t,e);if(this.el=bt.createElement(d,s),H.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=H.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(ei)){const c=f[o++],h=i.getAttribute(u).split(C),p=/([.?@])?(.*)/.exec(c);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?Fr:p[1]==="?"?qr:p[1]==="@"?Br:Kt}),i.removeAttribute(u)}else u.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(ii.test(i.tagName)){const u=i.textContent.split(C),c=u.length-1;if(c>0){i.textContent=Ht?Ht.emptyScript:"";for(let h=0;h<c;h++)i.append(u[h],_t()),H.nextNode(),a.push({type:2,index:++n});i.append(u[c],_t())}}}else if(i.nodeType===8)if(i.data===si)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(C,u+1))!==-1;)a.push({type:7,index:n}),u+=C.length-1}n++}}static createElement(t,e){const s=q.createElement("template");return s.innerHTML=t,s}}function nt(r,t,e=r,s){var o,l;if(t===rt)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=$t(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=nt(r,i._$AS(r,t.values),i,s)),t}class zr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??q).importNode(e,!0);H.currentNode=i;let n=H.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Pt(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Vr(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=H.nextNode(),o++)}return H.currentNode=q,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),$t(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==rt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Hr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&$t(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=bt.createElement(ri(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new zr(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=ys.get(t.strings);return e===void 0&&ys.set(t.strings,e=new bt(t)),e}k(t){Oe(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Pt(this.O(_t()),this.O(_t()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Kt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=nt(this,t,e,0),o=!$t(t)||t!==this._$AH&&t!==rt,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=nt(this,l[s+a],e,a),d===rt&&(d=this._$AH[a]),o||(o=!$t(d)||d!==this._$AH[a]),d===b?t=b:t!==b&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Fr extends Kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}}class qr extends Kt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}}class Br extends Kt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??b)===rt)return;const s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Vr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const ae=mt.litHtmlPolyfillSupport;ae==null||ae(bt,Pt),(mt.litHtmlVersions??(mt.litHtmlVersions=[])).push("3.3.1");const Wr=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new Pt(t.insertBefore(_t(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis;class x extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wr(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return rt}}var vs;x._$litElement$=!0,x.finalized=!0,(vs=D.litElementHydrateSupport)==null||vs.call(D,{LitElement:x});const le=D.litElementPolyfillSupport;le==null||le({LitElement:x});(D.litElementVersions??(D.litElementVersions=[])).push("4.2.1");const Yr={};function Jr(r,t,e){const[s,i,n]=r;switch(s){case"profile/save":{const{userid:o}=i;return[t,Qr(i,e,n||{}).then(l=>["profile/load",{userid:o,profile:l}])]}case"profile/request":{const{userid:o}=i;return[{...t,profile:void 0},Kr(o,e).then(l=>["profile/load",{profile:l}])]}case"profile/load":return{...t,profile:i.profile};case"journey/request":{const{journeyid:o}=i;return[t,Gr(o,e).then(l=>["journey/load",{journey:l}])]}case"journey/load":return{...t,journey:i.journey};default:return t}}function Kr(r,t){return fetch(`/api/travelers${r}`,{headers:Et.headers(t)}).then(e=>e.json()).then(e=>e)}function Gr(r,t){return fetch(`/api/journey/${r}`,{headers:Et.headers(t)}).then(e=>e.json()).then(e=>e)}function Qr(r,t,e){return fetch(`/api/travelers/${r.userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...Et.headers(t)},body:JSON.stringify(r.profile)}).then(s=>{if(s.status===200)return s.json();throw new Error(`Failed to save profile for ${r.userid}`)}).then(s=>{if(s)return e.onSuccess&&e.onSuccess(),s;throw new Error("No JSON in API response")}).catch(s=>{throw e.onFailure&&e.onFailure(s),s})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xr={attribute:!0,type:String,converter:Lt,reflect:!1,hasChanged:ke},tn=(r=Xr,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function k(r){return(t,e)=>typeof e=="object"?tn(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(r){return k({...r,state:!0,attribute:!1})}var en=Object.defineProperty,Ce=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&en(t,e,i),i},Z;let Gt=(Z=class extends x{constructor(){super(...arguments),this._authObserver=new z(this,"miniature:auth"),this.sections=[]}get authorization(){var t;return((t=this._user)==null?void 0:t.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}render(){return y`${this.sections.map(t=>y`
        <trip-section section-class="${t.sectionClass}">
          <svg class="icon" slot="icon">
            <use href="${t.icon}" />
          </svg>
          <span slot="title" class="section-title">${t.title}</span>
          <ul slot="links">
            ${t.links.map(e=>y`
                <li><a href="${e.href}">${e.text} &rarr;</a></li>
              `)}
          </ul>
        </trip-section>
      `)}`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{var e;this._user=t.user,(e=this._user)!=null&&e.authenticated?this.userid?this.hydrate(`/api/travelers/${this.userid}`):this.src&&this.hydrate(this.src):this.src&&this.hydrate(this.src)})}hydrate(t){const s=t.startsWith("/api/")&&this.authorization?{headers:this.authorization}:{};fetch(t,s).then(i=>{if(i.status===401)throw new Error("Unauthorized - please log in");if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return i.json()}).then(i=>{if(i){const n=i;this.sections=n.sections}}).catch(i=>{console.error("Error loading data:",i)})}},Z.styles=w`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2em;
      padding: 2em;
    }
  `,Z);Ce([k()],Gt.prototype,"src");Ce([k()],Gt.prototype,"userid");Ce([at()],Gt.prototype,"sections");const sn=w`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,rn={styles:sn};var nn=Object.defineProperty,ni=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&nn(t,e,i),i};const Te=class Te extends x{render(){return y`<section class="${this["section-class"]}">
      <h2>
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </h2>
      <slot name="links"></slot>
    </section> `}};Te.styles=[rn.styles,w`
      svg.icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
        fill: currentColor;
      }
      section {
        order: 0;
        padding: 1.5em;
      }
      h2 {
        color: var(--color-main);
        padding: 1em;
        font-family: "Fjalla One", sans-serif;
        font-style: normal;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      ul {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
        padding-bottom: 2em;
      }
      a {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
      }
      ::slotted(span[slot="title"]) {
        color: var(--color-main) !important;
        font-family: "Fjalla One", sans-serif !important;
        font-style: normal !important;
        font-weight: 400 !important;
      }
      ::slotted(ul) {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
        padding-bottom: 2em;
      }
    `];let wt=Te;ni([k()],wt.prototype,"icon-href");ni([k()],wt.prototype,"section-class");const Wt=class Wt extends x{render(){return y`
      <article>
        <trip-element src="/journey.json">
          <trip-section section-class="itinerary">
            <svg class="icon" slot="icon">
              <use href="/icons/itinerary.svg#icon-map" />
            </svg>
            <span slot="title" class="section-title">Itinerary</span>
            <ul slot="links">
              <li>
                <a href="/app/transportation">Planes, Trains and Automobiles &rarr;</a>
              </li>
              <li><a href="/app/restaurants">Places to eat &rarr;</a></li>
              <li><a href="/app/sightseeing">Check out the view! &rarr;</a></li>
            </ul>
          </trip-section>

          <trip-section section-class="preparations">
            <svg class="icon" slot="icon">
              <use href="/icons/preparations.svg#icon-suitcase" />
            </svg>
            <span slot="title" class="section-title">Preparations</span>
            <ul slot="links">
              <li><a href="/app/packing">Packing list &rarr;</a></li>
              <li>
                <a href="https://www.united.com">Book flights &rarr;</a>
              </li>
            </ul>
          </trip-section>

          <trip-section section-class="budget">
            <svg class="icon" slot="icon">
              <use href="/icons/budget.svg#icon-money" />
            </svg>
            <span slot="title" class="section-title">Budget</span>
            <ul slot="links">
              <li><a href="/app/budget">Calculator &rarr;</a></li>
            </ul>
          </trip-section>
        </trip-element>

        <section class="traveler-intro">
          <h2>Meet the travelers</h2>
          <a href="/app/traveler/someuser" class="traveler-link">
            <img
              src="/france.jpeg"
              alt="Our group traveling"
              class="traveler-image"
            />
          </a>
        </section>
      </article>
    `}};Wt.uses=xt({"trip-element":Gt,"trip-section":wt}),Wt.styles=w`
    article {
      padding: 1rem;
    }

    .traveler-intro {
      margin-top: 2rem;
      text-align: center;
    }

    .traveler-intro h2 {
      font-family: "Fjalla One", sans-serif;
      margin-bottom: 1rem;
    }

    .traveler-link {
      display: inline-block;
    }

    .traveler-image {
      max-width: 600px;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;let me=Wt;var on=Object.defineProperty,oi=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&on(t,e,i),i};const Re=class Re extends x{constructor(){super(...arguments),this._authObserver=new z(this,"miniature:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:e}=t;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}render(){return y`
      <header>
        <h1>Miniature Journey</h1>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/transportation">Transportation</a>
          <a href="/app/restaurants">Restaurants</a>
          <a href="/app/sightseeing">Sightseeing</a>
          <a href="/app/activities">Activities</a>
          <a href="/app/packing">Packing</a>
          <a href="/app/budget">Budget</a>
          ${this.loggedIn?y`
                <span>Hello, ${this.userid}!</span>
                ${this.renderSignOutButton()}
              `:this.renderSignInButton()}
        </nav>
      </header>
    `}renderSignOutButton(){return y`
      <button
        @click=${t=>{Ei.relay(t,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return y`
      <a href="/login">Sign In</a>
    `}static initializeOnce(){}};Re.styles=w`
    :host {
      display: block;
    }
    
    header {
      padding: 1rem 2rem;
      background: #333;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-family: "Fjalla One", sans-serif;
    }
    
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      font-size: 0.95rem;
    }
    
    nav a:hover {
      text-decoration: underline;
    }
    
    span {
      color: #ddd;
      font-size: 0.9rem;
    }
    
    button {
      padding: 0.5rem 1rem;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    button:hover {
      background: #da190b;
    }
  `;let At=Re;oi([at()],At.prototype,"loggedIn");oi([at()],At.prototype,"userid");const je=class je extends R{constructor(){super("miniature:auth")}renderTicket(t,e,s,i){return y`
      <div class="ticket">
        <h3>${t}</h3>
        <div class="row"><strong>From:</strong> ${e}</div>
        <div class="row"><strong>To:</strong> ${s}</div>
        <div class="row"><strong>Date:</strong> ${i}</div>
      </div>
    `}render(){return y`
      <h2>Flight Tickets</h2>

      ${this.renderTicket("Flight to Seville","Paris (CDG)","Seville (SVQ)","2025-03-15")}
      ${this.renderTicket("Return Flight","Seville (SVQ)","Paris (CDG)","2025-03-31")}
    `}};je.styles=w`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
      font-family: "Fjalla One", sans-serif;
    }

    ul {
      padding-left: 1.2rem;
    }

    a {
      color: #0077cc;
      text-decoration: none;
      font-family: "Fjalla One", sans-serif;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Card-like containers (optional, but nice) */
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin: 1rem 0;
    }
    .ticket {
      display: flex;
      flex-direction: column;
      border: 2px dashed #333;
      padding: 16px;
      margin: 20px 0;
      border-radius: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
    }
    h2 {
      margin-bottom: 8px;
    }
  `;let It=je;customElements.define("transportation-view",It);const Ne=class Ne extends R{constructor(){super("miniature:auth")}renderList(t,e){return y`
      <h3>${t}</h3>
      <ul>
        ${e.map(s=>y`<li>${s}</li>`)}
      </ul>
    `}render(){return y`
      <h2>Restaurants</h2>

      ${this.renderList("Seville",["El Rinconcillo","La Azotea","Eslava","Becerrita"])}
      ${this.renderList("Paris",["Le Relais de l'Entrecôte","Bouillon Chartier","Le Comptoir du Relais","Septime"])}
    `}};Ne.styles=w`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
      font-family: "Fjalla One", sans-serif;
    }

    ul {
      padding-left: 1.2rem;
    }

    a {
      color: #0077cc;
      text-decoration: none;
      font-family: "Fjalla One", sans-serif;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Card-like containers (optional, but nice) */
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin: 1rem 0;
    }
  `;let Dt=Ne;customElements.define("restaurants-view",Dt);const Ue=class Ue extends R{constructor(){super("miniature:auth")}render(){return y`
      <h2>Sightseeing in Seville</h2>

      <h3>Top Attractions</h3>
      <ul>
        <li>Seville Cathedral & Giralda Tower</li>
        <li>Plaza de España</li>
        <li>Real Alcázar</li>
        <li>Metropol Parasol (Las Setas)</li>
        <li>Torre del Oro</li>
      </ul>

      <h3>Map of Seville</h3>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Sevilla_map.png"
        alt="Map of Seville"
      />
    `}};Ue.styles=w`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
      font-family: "Fjalla One", sans-serif;
    }

    ul {
      padding-left: 1.2rem;
    }

    a {
      color: #0077cc;
      text-decoration: none;
      font-family: "Fjalla One", sans-serif;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Card-like containers (optional, but nice) */
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin: 1rem 0;
    }
    img {
      max-width: 100%;
      border-radius: 12px;
      margin: 12px 0;
    }
  `;let zt=Ue;customElements.define("sightseeing-view",zt);const Me=class Me extends R{constructor(){super("miniature:auth"),this.items=["7 shirts","3 pairs of pants","7 sets of underwear","Sleepwear","Walking shoes","Toiletries","Travel adapter","Medication","Light jacket","Portable charger"].map(t=>({text:t,checked:!1}))}toggle(t){this.items[t].checked=!this.items[t].checked,this.requestUpdate()}render(){return y`
      <h2>Packing Checklist</h2>

      <ul>
        ${this.items.map((t,e)=>y`
            <li>
              <label>
                <input
                  type="checkbox"
                  .checked=${t.checked}
                  @change=${()=>this.toggle(e)}
                />
                ${t.text}
              </label>
            </li>
          `)}
      </ul>
    `}};Me.styles=w`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
      font-family: "Fjalla One", sans-serif;
    }

    ul {
      padding-left: 1.2rem;
    }

    a {
      color: #0077cc;
      text-decoration: none;
      font-family: "Fjalla One", sans-serif;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Card-like containers (optional, but nice) */
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin: 1rem 0;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 8px 0;
    }
  `;let Ft=Me;customElements.define("packing-view",Ft);const Le=class Le extends R{constructor(){super("miniature:auth"),this.euros=0,this.rate=1.08}setEuroValue(t){const e=t.target;this.euros=Number(e.value||0),this.requestUpdate()}render(){const t=(this.euros*this.rate).toFixed(2);return y`
      <h2>Euro → Dollar Converter</h2>

      <label>
        Euros:
        <input type="number" @input=${this.setEuroValue} placeholder="0" />
      </label>

      <p><strong>Dollars:</strong> $${t}</p>
      <p>Rate: €1 = $${this.rate}</p>
    `}};Le.styles=w`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
      font-family: "Fjalla One", sans-serif;
    }

    ul {
      padding-left: 1.2rem;
    }

    a {
      color: #0077cc;
      text-decoration: none;
      font-family: "Fjalla One", sans-serif;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Card-like containers (optional, but nice) */
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin: 1rem 0;
    }
  `;let qt=Le;customElements.define("budget-view",qt);var an=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,ai=(r,t,e,s)=>{for(var i=s>1?void 0:s?ln(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&an(t,e,i),i};const He=class He extends R{get profile(){return this.model.profile}constructor(){super("miniature:store")}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s),t==="userid"&&s&&s!==e&&this.dispatchMessage(["profile/request",{userid:s}])}render(){const t=this.profile;return t?y`
      <div class="card">
        <h2>${t.name}</h2>
        <p><strong>Home:</strong> ${t.home}</p>
        <p><strong>Planned Trips:</strong> ${t.plannedTrips}</p>
        ${t.bio?y`<p><strong>Bio:</strong> ${t.bio}</p>`:""}
      </div>
    `:y`
        <div class="card">
          <h2>Loading traveler…</h2>
        </div>
      `}};He.styles=w`
  :host {
    display: block;
    padding: 1rem;
    font-family: "Fjalla One", sans-serif;
  }

  h2, h3 {
    font-family: "Fjalla One", sans-serif;
    margin: 0.5rem 0 1rem;
    letter-spacing: 0.5px;
  }

  p, li, label {
    font-family: "Fjalla One", sans-serif;
  }

  ul {
    padding-left: 1.2rem;
  }

  a {
    color: #0077cc;
    text-decoration: none;
    font-family: "Fjalla One", sans-serif;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Card-like containers (optional, but nice) */
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 1rem 0;
}
`;let ot=He;ai([k({attribute:"userid"})],ot.prototype,"userid",2);ai([at()],ot.prototype,"profile",1);xt({"traveler-view":ot});const cn=w`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,hn={styles:cn},un=w`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }
`,dn={styles:un};var pn=Object.defineProperty,Qt=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&pn(t,e,i),i};const Ie=class Ie extends x{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return y`
      <form
        @change=${t=>this.handleChange(t)}
        @submit=${t=>this.handleSubmit(t)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(t){const e=t.target,s=e==null?void 0:e.name,i=e==null?void 0:e.value;switch(s){case"username":this.formData={...this.formData,username:i};break;case"password":this.formData={...this.formData,password:i};break}console.log("Form data updated:",this.formData),console.log("Can submit:",this.canSubmit)}handleSubmit(t){t.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(e=>{if(e.status!==200)throw"Login failed";return e.json()}).then(e=>{const{token:s}=e,i=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});console.log("dispatching message",i),this.dispatchEvent(i)}).catch(e=>{console.log(e),this.error=e.toString()})}};Ie.styles=[hn.styles,dn.styles,w`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
    `];let B=Ie;Qt([at()],B.prototype,"formData");Qt([k()],B.prototype,"api");Qt([k()],B.prototype,"redirect");Qt([at()],B.prototype,"error");var fn=Object.getOwnPropertyDescriptor,mn=(r,t,e,s)=>{for(var i=s>1?void 0:s?fn(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(i)||i);return i};let Bt=class extends x{render(){return y`
      <section class="login-page">
        <h2>Sign In</h2>

        <login-form
          api="/auth/login"
          redirect="/app"
        >
          <label>
            Username
            <input name="username" type="text" />
          </label>

          <label>
            Password
            <input name="password" type="password" />
          </label>
        </login-form>
      </section>
    `}};Bt.styles=w`
    .login-page {
      max-width: 400px;
      margin: 5rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
  `;Bt=mn([Zr("login-page")],Bt);xt({"mu-auth":Et.Provider,"login-form":B});var gn=Object.defineProperty,yn=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&gn(t,e,i),i};const De=class De extends R{get profile(){return this.model.profile}render(){return y`
      <main class="page">
        <mu-form
          .init=${this.profile}
          @mu-form:submit=${this.handleSubmit}>
          <!-- Your form fields here -->
          <label>
            <span>Name:</span>
            <input name="name" />
          </label>
          <!-- More fields... -->
          <button type="submit">Save</button>
        </mu-form>
      </main>
    `}handleSubmit(t){if(!this.userid){console.error("No userid available");return}this.dispatchMessage(["profile/save",{userid:this.userid,profile:t.detail},{onSuccess:()=>Os.dispatch(this,"history/navigate",{href:`/app/traveler/${this.userid}`}),onFailure:e=>console.log("ERROR:",e)}])}};De.uses=xt({"mu-form":ki.Element});let Vt=De;yn([k()],Vt.prototype,"userid");const vn=[{path:"/app/transportation",view:()=>y` <transportation-view></transportation-view> `},{path:"/app/restaurants",view:()=>y` <restaurants-view></restaurants-view> `},{path:"/app/sightseeing",view:()=>y` <sightseeing-view></sightseeing-view> `},{path:"/app/packing",view:()=>y` <packing-view></packing-view> `},{path:"/app/budget",view:()=>y` <budget-view></budget-view> `},{path:"/app/traveler/:userid/edit",view:r=>y`
      <traveler-edit userid=${r.userid}></traveler-edit>
    `},{path:"/app/traveler/:userid",view:r=>y`
      <traveler-view userid=${r.userid}></traveler-view>
    `},{path:"/login",view:()=>y`<login-page></login-page>`},{path:"/app",view:()=>y` <landing-view></landing-view> `},{path:"/",redirect:"/app"}];xt({"traveler-edit":Vt,"login-page":Bt,"landing-view":me,"mu-auth":Et.Provider,"mu-history":Os.Provider,"mu-store":class extends Ni.Provider{constructor(){super(Jr,Yr,"miniature:auth")}},"mu-switch":class extends Ar.Element{constructor(){super(vn,"miniature:history","miniature:auth")}},"app-header":At,"transportation-view":It,"restaurants-view":Dt,"sightseeing-view":zt,"packing-view":Ft,"budget-view":qt,"traveler-view":ot});document.body.addEventListener("dark-mode:toggle",r=>{const t=r.currentTarget,e=r.detail.checked;t.classList.toggle("dark-mode",e)});window.toggleDarkMode=function(r,t){const e=new CustomEvent("dark-mode:toggle",{bubbles:!0,detail:{checked:t}});r.dispatchEvent(e)};
