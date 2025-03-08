var se=Object.defineProperty;var ie=(e,t,r)=>t in e?se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var i=(e,t,r)=>ie(e,typeof t!="symbol"?t+"":t,r);const y=new TextEncoder,_=new TextDecoder;function L(...e){const t=e.reduce((n,{length:o})=>n+o,0),r=new Uint8Array(t);let a=0;for(const n of e)r.set(n,a),a+=n.length;return r}function ce(e){if(Uint8Array.prototype.toBase64)return e.toBase64();const t=32768,r=[];for(let a=0;a<e.length;a+=t)r.push(String.fromCharCode.apply(null,e.subarray(a,a+t)));return btoa(r.join(""))}function de(e){if(Uint8Array.fromBase64)return Uint8Array.fromBase64(e);const t=atob(e),r=new Uint8Array(t.length);for(let a=0;a<t.length;a++)r[a]=t.charCodeAt(a);return r}function W(e){if(Uint8Array.fromBase64)return Uint8Array.fromBase64(typeof e=="string"?e:_.decode(e),{alphabet:"base64url"});let t=e;t instanceof Uint8Array&&(t=_.decode(t)),t=t.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return de(t)}catch{throw new TypeError("The input to be decoded is not correctly encoded.")}}function D(e){let t=e;return typeof t=="string"&&(t=y.encode(t)),Uint8Array.prototype.toBase64?t.toBase64({alphabet:"base64url",omitPadding:!0}):ce(t).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}class E extends Error{constructor(r,a){var n;super(r,a);i(this,"code","ERR_JOSE_GENERIC");this.name=this.constructor.name,(n=Error.captureStackTrace)==null||n.call(Error,this,this.constructor)}}i(E,"code","ERR_JOSE_GENERIC");class p extends E{constructor(r,a,n="unspecified",o="unspecified"){super(r,{cause:{claim:n,reason:o,payload:a}});i(this,"code","ERR_JWT_CLAIM_VALIDATION_FAILED");i(this,"claim");i(this,"reason");i(this,"payload");this.claim=n,this.reason=o,this.payload=a}}i(p,"code","ERR_JWT_CLAIM_VALIDATION_FAILED");class x extends E{constructor(r,a,n="unspecified",o="unspecified"){super(r,{cause:{claim:n,reason:o,payload:a}});i(this,"code","ERR_JWT_EXPIRED");i(this,"claim");i(this,"reason");i(this,"payload");this.claim=n,this.reason=o,this.payload=a}}i(x,"code","ERR_JWT_EXPIRED");class B extends E{constructor(){super(...arguments);i(this,"code","ERR_JOSE_ALG_NOT_ALLOWED")}}i(B,"code","ERR_JOSE_ALG_NOT_ALLOWED");class g extends E{constructor(){super(...arguments);i(this,"code","ERR_JOSE_NOT_SUPPORTED")}}i(g,"code","ERR_JOSE_NOT_SUPPORTED");class f extends E{constructor(){super(...arguments);i(this,"code","ERR_JWS_INVALID")}}i(f,"code","ERR_JWS_INVALID");class J extends E{constructor(){super(...arguments);i(this,"code","ERR_JWT_INVALID")}}i(J,"code","ERR_JWT_INVALID");class V extends E{constructor(r="signature verification failed",a){super(r,a);i(this,"code","ERR_JWS_SIGNATURE_VERIFICATION_FAILED")}}i(V,"code","ERR_JWS_SIGNATURE_VERIFICATION_FAILED");function S(e,t="algorithm.name"){return new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`)}function C(e,t){return e.name===t}function I(e){return parseInt(e.name.slice(4),10)}function fe(e){switch(e){case"ES256":return"P-256";case"ES384":return"P-384";case"ES512":return"P-521";default:throw new Error("unreachable")}}function he(e,t){if(t&&!e.usages.includes(t))throw new TypeError(`CryptoKey does not support this operation, its usages must include ${t}.`)}function ue(e,t,r){switch(t){case"HS256":case"HS384":case"HS512":{if(!C(e.algorithm,"HMAC"))throw S("HMAC");const a=parseInt(t.slice(2),10);if(I(e.algorithm.hash)!==a)throw S(`SHA-${a}`,"algorithm.hash");break}case"RS256":case"RS384":case"RS512":{if(!C(e.algorithm,"RSASSA-PKCS1-v1_5"))throw S("RSASSA-PKCS1-v1_5");const a=parseInt(t.slice(2),10);if(I(e.algorithm.hash)!==a)throw S(`SHA-${a}`,"algorithm.hash");break}case"PS256":case"PS384":case"PS512":{if(!C(e.algorithm,"RSA-PSS"))throw S("RSA-PSS");const a=parseInt(t.slice(2),10);if(I(e.algorithm.hash)!==a)throw S(`SHA-${a}`,"algorithm.hash");break}case"Ed25519":case"EdDSA":{if(!C(e.algorithm,"Ed25519"))throw S("Ed25519");break}case"ES256":case"ES384":case"ES512":{if(!C(e.algorithm,"ECDSA"))throw S("ECDSA");const a=fe(t);if(e.algorithm.namedCurve!==a)throw S(a,"algorithm.namedCurve");break}default:throw new TypeError("CryptoKey does not support this operation")}he(e,r)}function F(e,t,...r){var a;if(r=r.filter(Boolean),r.length>2){const n=r.pop();e+=`one of type ${r.join(", ")}, or ${n}.`}else r.length===2?e+=`one of type ${r[0]} or ${r[1]}.`:e+=`of type ${r[0]}.`;return t==null?e+=` Received ${t}`:typeof t=="function"&&t.name?e+=` Received function ${t.name}`:typeof t=="object"&&t!=null&&(a=t.constructor)!=null&&a.name&&(e+=` Received an instance of ${t.constructor.name}`),e}const le=(e,...t)=>F("Key must be ",e,...t);function G(e,t,...r){return F(`Key for the ${e} algorithm must be `,t,...r)}function q(e){return(e==null?void 0:e[Symbol.toStringTag])==="CryptoKey"}function z(e){return(e==null?void 0:e[Symbol.toStringTag])==="KeyObject"}const X=e=>q(e)||z(e),Z=(...e)=>{const t=e.filter(Boolean);if(t.length===0||t.length===1)return!0;let r;for(const a of t){const n=Object.keys(a);if(!r||r.size===0){r=new Set(n);continue}for(const o of n){if(r.has(o))return!1;r.add(o)}}return!0};function pe(e){return typeof e=="object"&&e!==null}const P=e=>{if(!pe(e)||Object.prototype.toString.call(e)!=="[object Object]")return!1;if(Object.getPrototypeOf(e)===null)return!0;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t},Q=(e,t)=>{if(e.startsWith("RS")||e.startsWith("PS")){const{modulusLength:r}=t.algorithm;if(typeof r!="number"||r<2048)throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`)}};function ye(e){let t,r;switch(e.kty){case"RSA":{switch(e.alg){case"PS256":case"PS384":case"PS512":t={name:"RSA-PSS",hash:`SHA-${e.alg.slice(-3)}`},r=e.d?["sign"]:["verify"];break;case"RS256":case"RS384":case"RS512":t={name:"RSASSA-PKCS1-v1_5",hash:`SHA-${e.alg.slice(-3)}`},r=e.d?["sign"]:["verify"];break;case"RSA-OAEP":case"RSA-OAEP-256":case"RSA-OAEP-384":case"RSA-OAEP-512":t={name:"RSA-OAEP",hash:`SHA-${parseInt(e.alg.slice(-3),10)||1}`},r=e.d?["decrypt","unwrapKey"]:["encrypt","wrapKey"];break;default:throw new g('Invalid or unsupported JWK "alg" (Algorithm) Parameter value')}break}case"EC":{switch(e.alg){case"ES256":t={name:"ECDSA",namedCurve:"P-256"},r=e.d?["sign"]:["verify"];break;case"ES384":t={name:"ECDSA",namedCurve:"P-384"},r=e.d?["sign"]:["verify"];break;case"ES512":t={name:"ECDSA",namedCurve:"P-521"},r=e.d?["sign"]:["verify"];break;case"ECDH-ES":case"ECDH-ES+A128KW":case"ECDH-ES+A192KW":case"ECDH-ES+A256KW":t={name:"ECDH",namedCurve:e.crv},r=e.d?["deriveBits"]:[];break;default:throw new g('Invalid or unsupported JWK "alg" (Algorithm) Parameter value')}break}case"OKP":{switch(e.alg){case"Ed25519":case"EdDSA":t={name:"Ed25519"},r=e.d?["sign"]:["verify"];break;case"ECDH-ES":case"ECDH-ES+A128KW":case"ECDH-ES+A192KW":case"ECDH-ES+A256KW":t={name:e.crv},r=e.d?["deriveBits"]:[];break;default:throw new g('Invalid or unsupported JWK "alg" (Algorithm) Parameter value')}break}default:throw new g('Invalid or unsupported JWK "kty" (Key Type) Parameter value')}return{algorithm:t,keyUsages:r}}const me=async e=>{if(!e.alg)throw new TypeError('"alg" argument is required when "jwk.alg" is not present');const{algorithm:t,keyUsages:r}=ye(e),a={...e};return delete a.alg,delete a.use,crypto.subtle.importKey("jwk",a,t,e.ext??!e.d,e.key_ops??r)},Y=(e,t,r,a,n)=>{if(n.crit!==void 0&&(a==null?void 0:a.crit)===void 0)throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');if(!a||a.crit===void 0)return new Set;if(!Array.isArray(a.crit)||a.crit.length===0||a.crit.some(s=>typeof s!="string"||s.length===0))throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');let o;r!==void 0?o=new Map([...Object.entries(r),...t.entries()]):o=t;for(const s of a.crit){if(!o.has(s))throw new g(`Extension Header Parameter "${s}" is not recognized`);if(n[s]===void 0)throw new e(`Extension Header Parameter "${s}" is missing`);if(o.get(s)&&a[s]===void 0)throw new e(`Extension Header Parameter "${s}" MUST be integrity protected`)}return new Set(a.crit)},be=(e,t)=>{if(t!==void 0&&(!Array.isArray(t)||t.some(r=>typeof r!="string")))throw new TypeError(`"${e}" option must be an array of strings`);if(t)return new Set(t)};function $(e){return P(e)&&typeof e.kty=="string"}function Se(e){return e.kty!=="oct"&&typeof e.d=="string"}function we(e){return e.kty!=="oct"&&typeof e.d>"u"}function Ee(e){return e.kty==="oct"&&typeof e.k=="string"}let K;const N=async(e,t,r,a=!1)=>{K||(K=new WeakMap);let n=K.get(e);if(n!=null&&n[r])return n[r];const o=await me({...t,alg:r});return a&&Object.freeze(e),n?n[r]=o:K.set(e,{[r]:o}),o},Ae=(e,t)=>{var s;K||(K=new WeakMap);let r=K.get(e);if(r!=null&&r[t])return r[t];const a=e.type==="public",n=!!a;let o;if(e.asymmetricKeyType==="x25519"){switch(t){case"ECDH-ES":case"ECDH-ES+A128KW":case"ECDH-ES+A192KW":case"ECDH-ES+A256KW":break;default:throw new TypeError("given KeyObject instance cannot be used for this algorithm")}o=e.toCryptoKey(e.asymmetricKeyType,n,a?[]:["deriveBits"])}if(e.asymmetricKeyType==="ed25519"){if(t!=="EdDSA"&&t!=="Ed25519")throw new TypeError("given KeyObject instance cannot be used for this algorithm");o=e.toCryptoKey(e.asymmetricKeyType,n,[a?"verify":"sign"])}if(e.asymmetricKeyType==="rsa"){let c;switch(t){case"RSA-OAEP":c="SHA-1";break;case"RS256":case"PS256":case"RSA-OAEP-256":c="SHA-256";break;case"RS384":case"PS384":case"RSA-OAEP-384":c="SHA-384";break;case"RS512":case"PS512":case"RSA-OAEP-512":c="SHA-512";break;default:throw new TypeError("given KeyObject instance cannot be used for this algorithm")}if(t.startsWith("RSA-OAEP"))return e.toCryptoKey({name:"RSA-OAEP",hash:c},n,a?["encrypt"]:["decrypt"]);o=e.toCryptoKey({name:t.startsWith("PS")?"RSA-PSS":"RSASSA-PKCS1-v1_5",hash:c},n,[a?"verify":"sign"])}if(e.asymmetricKeyType==="ec"){const d=new Map([["prime256v1","P-256"],["secp384r1","P-384"],["secp521r1","P-521"]]).get((s=e.asymmetricKeyDetails)==null?void 0:s.namedCurve);if(!d)throw new TypeError("given KeyObject instance cannot be used for this algorithm");t==="ES256"&&d==="P-256"&&(o=e.toCryptoKey({name:"ECDSA",namedCurve:d},n,[a?"verify":"sign"])),t==="ES384"&&d==="P-384"&&(o=e.toCryptoKey({name:"ECDSA",namedCurve:d},n,[a?"verify":"sign"])),t==="ES512"&&d==="P-521"&&(o=e.toCryptoKey({name:"ECDSA",namedCurve:d},n,[a?"verify":"sign"])),t.startsWith("ECDH-ES")&&(o=e.toCryptoKey({name:"ECDH",namedCurve:d},n,a?[]:["deriveBits"]))}if(!o)throw new TypeError("given KeyObject instance cannot be used for this algorithm");return r?r[t]=o:K.set(e,{[t]:o}),o},k=async(e,t)=>{if(e instanceof Uint8Array||q(e))return e;if(z(e)){if(e.type==="secret")return e.export();if("toCryptoKey"in e&&typeof e.toCryptoKey=="function")try{return Ae(e,t)}catch(a){if(a instanceof TypeError)throw a}let r=e.export({format:"jwk"});return N(e,r,t)}if($(e))return e.k?W(e.k):N(e,e,t,!0);throw new Error("unreachable")},v=e=>e==null?void 0:e[Symbol.toStringTag],O=(e,t,r)=>{var a,n;if(t.use!==void 0){let o;switch(r){case"sign":case"verify":o="sig";break;case"encrypt":case"decrypt":o="enc";break}if(t.use!==o)throw new TypeError(`Invalid key for this operation, its "use" must be "${o}" when present`)}if(t.alg!==void 0&&t.alg!==e)throw new TypeError(`Invalid key for this operation, its "alg" must be "${e}" when present`);if(Array.isArray(t.key_ops)){let o;switch(!0){case(r==="sign"||r==="verify"):case e==="dir":case e.includes("CBC-HS"):o=r;break;case e.startsWith("PBES2"):o="deriveBits";break;case/^A\d{3}(?:GCM)?(?:KW)?$/.test(e):!e.includes("GCM")&&e.endsWith("KW")?o=r==="encrypt"?"wrapKey":"unwrapKey":o=r;break;case(r==="encrypt"&&e.startsWith("RSA")):o="wrapKey";break;case r==="decrypt":o=e.startsWith("RSA")?"unwrapKey":"deriveBits";break}if(o&&((n=(a=t.key_ops)==null?void 0:a.includes)==null?void 0:n.call(a,o))===!1)throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${o}" when present`)}return!0},ge=(e,t,r)=>{if(!(t instanceof Uint8Array)){if($(t)){if(Ee(t)&&O(e,t,r))return;throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present')}if(!X(t))throw new TypeError(G(e,t,"CryptoKey","KeyObject","JSON Web Key","Uint8Array"));if(t.type!=="secret")throw new TypeError(`${v(t)} instances for symmetric algorithms must be of type "secret"`)}},_e=(e,t,r)=>{if($(t))switch(r){case"decrypt":case"sign":if(Se(t)&&O(e,t,r))return;throw new TypeError("JSON Web Key for this operation be a private JWK");case"encrypt":case"verify":if(we(t)&&O(e,t,r))return;throw new TypeError("JSON Web Key for this operation be a public JWK")}if(!X(t))throw new TypeError(G(e,t,"CryptoKey","KeyObject","JSON Web Key"));if(t.type==="secret")throw new TypeError(`${v(t)} instances for asymmetric algorithms must not be of type "secret"`);if(t.type==="public")switch(r){case"sign":throw new TypeError(`${v(t)} instances for asymmetric algorithm signing must be of type "private"`);case"decrypt":throw new TypeError(`${v(t)} instances for asymmetric algorithm decryption must be of type "private"`)}if(t.type==="private")switch(r){case"verify":throw new TypeError(`${v(t)} instances for asymmetric algorithm verifying must be of type "public"`);case"encrypt":throw new TypeError(`${v(t)} instances for asymmetric algorithm encryption must be of type "public"`)}},j=(e,t,r)=>{e.startsWith("HS")||e==="dir"||e.startsWith("PBES2")||/^A(?:128|192|256)(?:GCM)?(?:KW)?$/.test(e)||/^A(?:128|192|256)CBC-HS(?:256|384|512)$/.test(e)?ge(e,t,r):_e(e,t,r)},ee=(e,t)=>{const r=`SHA-${e.slice(-3)}`;switch(e){case"HS256":case"HS384":case"HS512":return{hash:r,name:"HMAC"};case"PS256":case"PS384":case"PS512":return{hash:r,name:"RSA-PSS",saltLength:parseInt(e.slice(-3),10)>>3};case"RS256":case"RS384":case"RS512":return{hash:r,name:"RSASSA-PKCS1-v1_5"};case"ES256":case"ES384":case"ES512":return{hash:r,name:"ECDSA",namedCurve:t.namedCurve};case"Ed25519":case"EdDSA":return{name:"Ed25519"};default:throw new g(`alg ${e} is not supported either by JOSE or your javascript runtime`)}},te=async(e,t,r)=>{if(t instanceof Uint8Array){if(!e.startsWith("HS"))throw new TypeError(le(t,"CryptoKey","KeyObject","JSON Web Key"));return crypto.subtle.importKey("raw",t,{hash:`SHA-${e.slice(-3)}`,name:"HMAC"},!1,[r])}return ue(t,e,r),t},Te=async(e,t,r,a)=>{const n=await te(e,t,"verify");Q(e,n);const o=ee(e,n.algorithm);try{return await crypto.subtle.verify(o,n,r,a)}catch{return!1}};async function ve(e,t,r){if(!P(e))throw new f("Flattened JWS must be an object");if(e.protected===void 0&&e.header===void 0)throw new f('Flattened JWS must have either of the "protected" or "header" members');if(e.protected!==void 0&&typeof e.protected!="string")throw new f("JWS Protected Header incorrect type");if(e.payload===void 0)throw new f("JWS Payload missing");if(typeof e.signature!="string")throw new f("JWS Signature missing or incorrect type");if(e.header!==void 0&&!P(e.header))throw new f("JWS Unprotected Header incorrect type");let a={};if(e.protected)try{const oe=W(e.protected);a=JSON.parse(_.decode(oe))}catch{throw new f("JWS Protected Header is invalid")}if(!Z(a,e.header))throw new f("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");const n={...a,...e.header},o=Y(f,new Map([["b64",!0]]),r==null?void 0:r.crit,a,n);let s=!0;if(o.has("b64")&&(s=a.b64,typeof s!="boolean"))throw new f('The "b64" (base64url-encode payload) Header Parameter must be a boolean');const{alg:c}=n;if(typeof c!="string"||!c)throw new f('JWS "alg" (Algorithm) Header Parameter missing or invalid');const d=r&&be("algorithms",r.algorithms);if(d&&!d.has(c))throw new B('"alg" (Algorithm) Header Parameter value not allowed');if(s){if(typeof e.payload!="string")throw new f("JWS Payload must be a string")}else if(typeof e.payload!="string"&&!(e.payload instanceof Uint8Array))throw new f("JWS Payload must be a string or an Uint8Array instance");let u=!1;typeof t=="function"&&(t=await t(a,e),u=!0),j(c,t,"verify");const m=L(y.encode(e.protected??""),y.encode("."),typeof e.payload=="string"?y.encode(e.payload):e.payload);let h;try{h=W(e.signature)}catch{throw new f("Failed to base64url decode the signature")}const b=await k(t,c);if(!await Te(c,b,h,m))throw new V;let l;if(s)try{l=W(e.payload)}catch{throw new f("Failed to base64url decode the payload")}else typeof e.payload=="string"?l=y.encode(e.payload):l=e.payload;const T={payload:l};return e.protected!==void 0&&(T.protectedHeader=a),e.header!==void 0&&(T.unprotectedHeader=e.header),u?{...T,key:b}:T}async function Ke(e,t,r){if(e instanceof Uint8Array&&(e=_.decode(e)),typeof e!="string")throw new f("Compact JWS must be a string or Uint8Array");const{0:a,1:n,2:o,length:s}=e.split(".");if(s!==3)throw new f("Invalid Compact JWS");const c=await ve({payload:n,protected:a,signature:o},t,r),d={payload:c.payload,protectedHeader:c.protectedHeader};return typeof t=="function"?{...d,key:c.key}:d}const w=e=>Math.floor(e.getTime()/1e3),re=60,ae=re*60,U=ae*24,Ce=U*7,He=U*365.25,Pe=/^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i,H=e=>{const t=Pe.exec(e);if(!t||t[4]&&t[1])throw new TypeError("Invalid time period format");const r=parseFloat(t[2]),a=t[3].toLowerCase();let n;switch(a){case"sec":case"secs":case"second":case"seconds":case"s":n=Math.round(r);break;case"minute":case"minutes":case"min":case"mins":case"m":n=Math.round(r*re);break;case"hour":case"hours":case"hr":case"hrs":case"h":n=Math.round(r*ae);break;case"day":case"days":case"d":n=Math.round(r*U);break;case"week":case"weeks":case"w":n=Math.round(r*Ce);break;default:n=Math.round(r*He);break}return t[1]==="-"||t[4]==="ago"?-n:n},M=e=>e.toLowerCase().replace(/^application\//,""),Re=(e,t)=>typeof e=="string"?t.includes(e):Array.isArray(e)?t.some(Set.prototype.has.bind(new Set(e))):!1,We=(e,t,r={})=>{let a;try{a=JSON.parse(_.decode(t))}catch{}if(!P(a))throw new J("JWT Claims Set must be a top-level JSON object");const{typ:n}=r;if(n&&(typeof e.typ!="string"||M(e.typ)!==M(n)))throw new p('unexpected "typ" JWT header value',a,"typ","check_failed");const{requiredClaims:o=[],issuer:s,subject:c,audience:d,maxTokenAge:u}=r,m=[...o];u!==void 0&&m.push("iat"),d!==void 0&&m.push("aud"),c!==void 0&&m.push("sub"),s!==void 0&&m.push("iss");for(const l of new Set(m.reverse()))if(!(l in a))throw new p(`missing required "${l}" claim`,a,l,"missing");if(s&&!(Array.isArray(s)?s:[s]).includes(a.iss))throw new p('unexpected "iss" claim value',a,"iss","check_failed");if(c&&a.sub!==c)throw new p('unexpected "sub" claim value',a,"sub","check_failed");if(d&&!Re(a.aud,typeof d=="string"?[d]:d))throw new p('unexpected "aud" claim value',a,"aud","check_failed");let h;switch(typeof r.clockTolerance){case"string":h=H(r.clockTolerance);break;case"number":h=r.clockTolerance;break;case"undefined":h=0;break;default:throw new TypeError("Invalid clockTolerance option type")}const{currentDate:b}=r,R=w(b||new Date);if((a.iat!==void 0||u)&&typeof a.iat!="number")throw new p('"iat" claim must be a number',a,"iat","invalid");if(a.nbf!==void 0){if(typeof a.nbf!="number")throw new p('"nbf" claim must be a number',a,"nbf","invalid");if(a.nbf>R+h)throw new p('"nbf" claim timestamp check failed',a,"nbf","check_failed")}if(a.exp!==void 0){if(typeof a.exp!="number")throw new p('"exp" claim must be a number',a,"exp","invalid");if(a.exp<=R-h)throw new x('"exp" claim timestamp check failed',a,"exp","check_failed")}if(u){const l=R-a.iat,T=typeof u=="number"?u:H(u);if(l-h>T)throw new x('"iat" claim timestamp check failed (too far in the past)',a,"iat","check_failed");if(l<0-h)throw new p('"iat" claim timestamp check failed (it should be in the past)',a,"iat","check_failed")}return a};async function Je(e,t,r){var s;const a=await Ke(e,t,r);if((s=a.protectedHeader.crit)!=null&&s.includes("b64")&&a.protectedHeader.b64===!1)throw new J("JWTs MUST NOT use unencoded payload");const o={payload:We(a.protectedHeader,a.payload,r),protectedHeader:a.protectedHeader};return typeof t=="function"?{...o,key:a.key}:o}const De=async(e,t,r)=>{const a=await te(e,t,"sign");Q(e,a);const n=await crypto.subtle.sign(ee(e,a.algorithm),a,r);return new Uint8Array(n)};class Ie{constructor(t){i(this,"_payload");i(this,"_protectedHeader");i(this,"_unprotectedHeader");if(!(t instanceof Uint8Array))throw new TypeError("payload must be an instance of Uint8Array");this._payload=t}setProtectedHeader(t){if(this._protectedHeader)throw new TypeError("setProtectedHeader can only be called once");return this._protectedHeader=t,this}setUnprotectedHeader(t){if(this._unprotectedHeader)throw new TypeError("setUnprotectedHeader can only be called once");return this._unprotectedHeader=t,this}async sign(t,r){if(!this._protectedHeader&&!this._unprotectedHeader)throw new f("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");if(!Z(this._protectedHeader,this._unprotectedHeader))throw new f("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");const a={...this._protectedHeader,...this._unprotectedHeader},n=Y(f,new Map([["b64",!0]]),r==null?void 0:r.crit,this._protectedHeader,a);let o=!0;if(n.has("b64")&&(o=this._protectedHeader.b64,typeof o!="boolean"))throw new f('The "b64" (base64url-encode payload) Header Parameter must be a boolean');const{alg:s}=a;if(typeof s!="string"||!s)throw new f('JWS "alg" (Algorithm) Header Parameter missing or invalid');j(s,t,"sign");let c=this._payload;o&&(c=y.encode(D(c)));let d;this._protectedHeader?d=y.encode(D(JSON.stringify(this._protectedHeader))):d=y.encode("");const u=L(d,y.encode("."),c),m=await k(t,s),h=await De(s,m,u),b={signature:D(h),payload:""};return o&&(b.payload=_.decode(c)),this._unprotectedHeader&&(b.header=this._unprotectedHeader),this._protectedHeader&&(b.protected=_.decode(d)),b}}class xe{constructor(t){i(this,"_flattened");this._flattened=new Ie(t)}setProtectedHeader(t){return this._flattened.setProtectedHeader(t),this}async sign(t,r){const a=await this._flattened.sign(t,r);if(a.payload===void 0)throw new TypeError("use the flattened module for creating JWS with b64: false");return`${a.protected}.${a.payload}.${a.signature}`}}function A(e,t){if(!Number.isFinite(t))throw new TypeError(`Invalid ${e} input`);return t}class Oe{constructor(t={}){i(this,"_payload");if(!P(t))throw new TypeError("JWT Claims Set MUST be an object");this._payload=t}setIssuer(t){return this._payload={...this._payload,iss:t},this}setSubject(t){return this._payload={...this._payload,sub:t},this}setAudience(t){return this._payload={...this._payload,aud:t},this}setJti(t){return this._payload={...this._payload,jti:t},this}setNotBefore(t){return typeof t=="number"?this._payload={...this._payload,nbf:A("setNotBefore",t)}:t instanceof Date?this._payload={...this._payload,nbf:A("setNotBefore",w(t))}:this._payload={...this._payload,nbf:w(new Date)+H(t)},this}setExpirationTime(t){return typeof t=="number"?this._payload={...this._payload,exp:A("setExpirationTime",t)}:t instanceof Date?this._payload={...this._payload,exp:A("setExpirationTime",w(t))}:this._payload={...this._payload,exp:w(new Date)+H(t)},this}setIssuedAt(t){return typeof t>"u"?this._payload={...this._payload,iat:w(new Date)}:t instanceof Date?this._payload={...this._payload,iat:A("setIssuedAt",w(t))}:typeof t=="string"?this._payload={...this._payload,iat:A("setIssuedAt",w(new Date)+H(t))}:this._payload={...this._payload,iat:A("setIssuedAt",t)},this}}class $e extends Oe{constructor(){super(...arguments);i(this,"_protectedHeader")}setProtectedHeader(r){return this._protectedHeader=r,this}async sign(r,a){var o;const n=new xe(y.encode(JSON.stringify(this._payload)));if(n.setProtectedHeader(this._protectedHeader),Array.isArray((o=this._protectedHeader)==null?void 0:o.crit)&&this._protectedHeader.crit.includes("b64")&&this._protectedHeader.b64===!1)throw new J("JWTs MUST NOT use unencoded payload");return n.sign(r,a)}}const ne=new TextEncoder().encode("5bfe5cf48c8fa710120b76584988a4dffab02c1b685e0fd627ac6df9ba1693942c457f3e6abde9216deb4e2b8cef1dff4fdff1f335c536fb2fd13be49f701599e912d6585cc100fa03082bc82bc1a9d23bafd598ee1676af81076164dbec4e3e6af54b4f79f9281355e755d44b53113292281c4850f251fabd3d32ef631d8022a563670b74beb367752f1cfabdef41dfc4b74b30f1052f1c736ed90632d2ae95b84592d513dfb02278520d54b3edcd24c12c01d63760d85283dc0347b2f837406cea9fd0953bbf4dce290626a836f1c712dc2c7292941654985445649939e81a3da092d219688b5f908eed89d043440ba2e752bd9e540667d85bf37f172912db81a8aff730ff7637e0d933606050da5bd72670aa4319e910b3f0e94082319371338132f6f667f0c8a7ea95ae01ab9e905a8c5fd5a67b60447f282a9dd12e903c8f79b135e58ee5a3c40613200276695caa38ca263cbef7429d23cc77723be7d7581a5b5f2b7d55a6e73f79394a95ce03f584b4c62f4a311c5b0442600efd2251285d8045d0e4fbabd413a2f4c3106e3a50813b023b4825d859b115b9019ed4c8100658e64f1a009d2d711d5d71c138dd2826928816581ca5d3f5975497a0434cb3cdb4c328bb7254706ba55f85fc6b3c3e5e103fa922fc538ed5239af9cb26f3fa48782eef931d0540d16c0b15a8360532e177cfd6b19cf35e941f1dd042348d");async function Ne(e){const t=Math.floor(Date.now()/1e3)+259200;return await new $e({sub:e,exp:t}).setProtectedHeader({alg:"HS256"}).sign(ne)}async function Me(e){try{const{payload:t}=await Je(e,ne,{algorithms:["HS256"]}),r=Math.floor(Date.now()/1e3);return!(t.exp&&t.exp<r)}catch(t){return console.error("Token verification failed:",t),!1}}function Le(e){try{const t=JSON.parse(atob(e.split(".")[1])),r=Math.floor(Date.now()/1e3);return t.exp<r}catch(t){return console.error("Invalid token format:",t),!0}}function Be(e){try{return JSON.parse(atob(e.split(".")[1])).sub||null}catch(t){return console.error("Invalid token format:",t),null}}export{Ne as C,Be as G,Le as I,Me as V};
