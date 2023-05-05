#!/usr/bin/env node
(()=>{var e={530:e=>{"use strict";const cmd=(e,t)=>{if(!e.length){return'""'}let r;if(!/[ \t\n\v"]/.test(e)){r=e}else{r='"';for(let t=0;t<=e.length;++t){let n=0;while(e[t]==="\\"){++t;++n}if(t===e.length){r+="\\".repeat(n*2);break}if(e[t]==='"'){r+="\\".repeat(n*2+1);r+=e[t]}else{r+="\\".repeat(n);r+=e[t]}}r+='"'}r=r.replace(/[ !%^&()<>|"]/g,"^$&");if(t){r=r.replace(/[ !%^&()<>|"]/g,"^$&")}return r};const sh=e=>{if(!e.length){return`''`}if(!/[\t\n\r "#$&'()*;<>?\\`|~]/.test(e)){return e}const t=`'${e.replace(/'/g,`'\\''`)}'`.replace(/^(?:'')+(?!$)/,"").replace(/\\'''/g,`\\'`);return t};e.exports={cmd:cmd,sh:sh}},316:(e,t,r)=>{"use strict";const{spawn:n}=r(81);const s=r(37);const o=r(979);const i=r(530);const promiseSpawn=(e,t,r={},s={})=>{if(r.shell){return spawnWithShell(e,t,r,s)}let o;const i=new Promise(((i,c)=>{o=n(e,t,r);const a=[];const l=[];const reject=n=>c(Object.assign(n,{cmd:e,args:t,...stdioResult(a,l,r),...s}));o.on("error",reject);if(o.stdout){o.stdout.on("data",(e=>a.push(e))).on("error",reject);o.stdout.on("error",(e=>reject(e)))}if(o.stderr){o.stderr.on("data",(e=>l.push(e))).on("error",reject);o.stderr.on("error",(e=>reject(e)))}o.on("close",((n,o)=>{const u={cmd:e,args:t,code:n,signal:o,...stdioResult(a,l,r),...s};if(n||o){c(Object.assign(new Error("command failed"),u))}else{i(u)}}))}));i.stdin=o.stdin;i.process=o;return i};const spawnWithShell=(e,t,r,n)=>{let s=r.shell;if(s===true){s=process.platform==="win32"?process.env.ComSpec:"sh"}const c={...r,shell:false};const a=[];let l=e;const u=/(?:^|\\)cmd(?:\.exe)?$/i.test(s);if(u){let r=false;let n="";let s=false;for(let t=0;t<e.length;++t){const r=e.charAt(t);if(r===" "&&!s){break}n+=r;if(r==='"'||r==="'"){s=!s}}let u;try{u=o.sync(n,{path:c.env&&c.env.PATH||process.env.PATH,pathext:c.env&&c.env.PATHEXT||process.env.PATHEXT}).toLowerCase()}catch(e){u=n.toLowerCase()}r=u.endsWith(".cmd")||u.endsWith(".bat");for(const e of t){l+=` ${i.cmd(e,r)}`}a.push("/d","/s","/c",l);c.windowsVerbatimArguments=true}else{for(const e of t){l+=` ${i.sh(e)}`}a.push("-c",l)}return promiseSpawn(s,a,c,n)};const open=(e,t={},r={})=>{const n={...t,shell:true};const o=[].concat(e);let i=process.platform;if(i==="linux"&&s.release().toLowerCase().includes("microsoft")){i="win32"}let c=n.command;if(!c){if(i==="win32"){n.shell=process.env.ComSpec;c='start ""'}else if(i==="darwin"){c="open"}else{c="xdg-open"}}return spawnWithShell(c,o,n,r)};promiseSpawn.open=open;const isPipe=(e="pipe",t)=>{if(e==="pipe"||e===null){return true}if(Array.isArray(e)){return isPipe(e[t],t)}return false};const stdioResult=(e,t,{stdioString:r=true,stdio:n})=>{const s={stdout:null,stderr:null};if(isPipe(n,1)){s.stdout=Buffer.concat(e);if(r){s.stdout=s.stdout.toString().trim()}}if(isPipe(n,2)){s.stderr=Buffer.concat(t);if(r){s.stderr=s.stderr.toString().trim()}}return s};e.exports=promiseSpawn},555:(e,t,r)=>{var n=r(147);var s;if(process.platform==="win32"||global.TESTING_WINDOWS){s=r(367)}else{s=r(10)}e.exports=isexe;isexe.sync=sync;function isexe(e,t,r){if(typeof t==="function"){r=t;t={}}if(!r){if(typeof Promise!=="function"){throw new TypeError("callback not provided")}return new Promise((function(r,n){isexe(e,t||{},(function(e,t){if(e){n(e)}else{r(t)}}))}))}s(e,t||{},(function(e,n){if(e){if(e.code==="EACCES"||t&&t.ignoreErrors){e=null;n=false}}r(e,n)}))}function sync(e,t){try{return s.sync(e,t||{})}catch(e){if(t&&t.ignoreErrors||e.code==="EACCES"){return false}else{throw e}}}},10:(e,t,r)=>{e.exports=isexe;isexe.sync=sync;var n=r(147);function isexe(e,t,r){n.stat(e,(function(e,n){r(e,e?false:checkStat(n,t))}))}function sync(e,t){return checkStat(n.statSync(e),t)}function checkStat(e,t){return e.isFile()&&checkMode(e,t)}function checkMode(e,t){var r=e.mode;var n=e.uid;var s=e.gid;var o=t.uid!==undefined?t.uid:process.getuid&&process.getuid();var i=t.gid!==undefined?t.gid:process.getgid&&process.getgid();var c=parseInt("100",8);var a=parseInt("010",8);var l=parseInt("001",8);var u=c|a;var f=r&l||r&a&&s===i||r&c&&n===o||r&u&&o===0;return f}},367:(e,t,r)=>{e.exports=isexe;isexe.sync=sync;var n=r(147);function checkPathExt(e,t){var r=t.pathExt!==undefined?t.pathExt:process.env.PATHEXT;if(!r){return true}r=r.split(";");if(r.indexOf("")!==-1){return true}for(var n=0;n<r.length;n++){var s=r[n].toLowerCase();if(s&&e.substr(-s.length).toLowerCase()===s){return true}}return false}function checkStat(e,t,r){if(!e.isSymbolicLink()&&!e.isFile()){return false}return checkPathExt(t,r)}function isexe(e,t,r){n.stat(e,(function(n,s){r(n,n?false:checkStat(s,e,t))}))}function sync(e,t){return checkStat(n.statSync(e),e,t)}},979:(e,t,r)=>{const n=r(555);const{join:s,delimiter:o,sep:i,posix:c}=r(17);const a=process.platform==="win32";const l=new RegExp(`[${c.sep}${i===c.sep?"":i}]`.replace(/(\\)/g,"\\$1"));const u=new RegExp(`^\\.${l.source}`);const getNotFoundError=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"});const getPathInfo=(e,{path:t=process.env.PATH,pathExt:r=process.env.PATHEXT,delimiter:n=o})=>{const s=e.match(l)?[""]:[...a?[process.cwd()]:[],...(t||"").split(n)];if(a){const t=r||[".EXE",".CMD",".BAT",".COM"].join(n);const o=t.split(n).reduce(((e,t)=>{e.push(t);e.push(t.toLowerCase());return e}),[]);if(e.includes(".")&&o[0]!==""){o.unshift("")}return{pathEnv:s,pathExt:o,pathExtExe:t}}return{pathEnv:s,pathExt:[""]}};const getPathPart=(e,t)=>{const r=/^".*"$/.test(e)?e.slice(1,-1):e;const n=!r&&u.test(t)?t.slice(0,2):"";return n+s(r,t)};const which=async(e,t={})=>{const{pathEnv:r,pathExt:s,pathExtExe:o}=getPathInfo(e,t);const i=[];for(const c of r){const r=getPathPart(c,e);for(const e of s){const s=r+e;const c=await n(s,{pathExt:o,ignoreErrors:true});if(c){if(!t.all){return s}i.push(s)}}}if(t.all&&i.length){return i}if(t.nothrow){return null}throw getNotFoundError(e)};const whichSync=(e,t={})=>{const{pathEnv:r,pathExt:s,pathExtExe:o}=getPathInfo(e,t);const i=[];for(const c of r){const r=getPathPart(c,e);for(const e of s){const s=r+e;const c=n.sync(s,{pathExt:o,ignoreErrors:true});if(c){if(!t.all){return s}i.push(s)}}}if(t.all&&i.length){return i}if(t.nothrow){return null}throw getNotFoundError(e)};e.exports=which;which.sync=whichSync},81:e=>{"use strict";e.exports=require("child_process")},147:e=>{"use strict";e.exports=require("fs")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var s=t[r]={exports:{}};var o=true;try{e[r](s,s.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return s.exports}(()=>{__nccwpck_require__.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;__nccwpck_require__.d(t,{a:t});return t}})();(()=>{__nccwpck_require__.d=(e,t)=>{for(var r in t){if(__nccwpck_require__.o(t,r)&&!__nccwpck_require__.o(e,r)){Object.defineProperty(e,r,{enumerable:true,get:t[r]})}}}})();(()=>{__nccwpck_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})();(()=>{__nccwpck_require__.r=e=>{if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})}})();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{"use strict";__nccwpck_require__.r(r);var e=__nccwpck_require__(316);var t=__nccwpck_require__.n(e);const n=10;const wrapAnsi16=(e=0)=>t=>`[${t+e}m`;const wrapAnsi256=(e=0)=>t=>`[${38+e};5;${t}m`;const wrapAnsi16m=(e=0)=>(t,r,n)=>`[${38+e};2;${t};${r};${n}m`;const s={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};const o=Object.keys(s.modifier);const i=Object.keys(s.color);const c=Object.keys(s.bgColor);const a=[...i,...c];function assembleStyles(){const e=new Map;for(const[t,r]of Object.entries(s)){for(const[t,n]of Object.entries(r)){s[t]={open:`[${n[0]}m`,close:`[${n[1]}m`};r[t]=s[t];e.set(n[0],n[1])}Object.defineProperty(s,t,{value:r,enumerable:false})}Object.defineProperty(s,"codes",{value:e,enumerable:false});s.color.close="[39m";s.bgColor.close="[49m";s.color.ansi=wrapAnsi16();s.color.ansi256=wrapAnsi256();s.color.ansi16m=wrapAnsi16m();s.bgColor.ansi=wrapAnsi16(n);s.bgColor.ansi256=wrapAnsi256(n);s.bgColor.ansi16m=wrapAnsi16m(n);Object.defineProperties(s,{rgbToAnsi256:{value(e,t,r){if(e===t&&t===r){if(e<8){return 16}if(e>248){return 231}return Math.round((e-8)/247*24)+232}return 16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)},enumerable:false},hexToRgb:{value(e){const t=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!t){return[0,0,0]}let[r]=t;if(r.length===3){r=[...r].map((e=>e+e)).join("")}const n=Number.parseInt(r,16);return[n>>16&255,n>>8&255,n&255]},enumerable:false},hexToAnsi256:{value:e=>s.rgbToAnsi256(...s.hexToRgb(e)),enumerable:false},ansi256ToAnsi:{value(e){if(e<8){return 30+e}if(e<16){return 90+(e-8)}let t;let r;let n;if(e>=232){t=((e-232)*10+8)/255;r=t;n=t}else{e-=16;const s=e%36;t=Math.floor(e/36)/5;r=Math.floor(s/6)/5;n=s%6/5}const s=Math.max(t,r,n)*2;if(s===0){return 30}let o=30+(Math.round(n)<<2|Math.round(r)<<1|Math.round(t));if(s===2){o+=60}return o},enumerable:false},rgbToAnsi:{value:(e,t,r)=>s.ansi256ToAnsi(s.rgbToAnsi256(e,t,r)),enumerable:false},hexToAnsi:{value:e=>s.ansi256ToAnsi(s.hexToAnsi256(e)),enumerable:false}});return s}const l=assembleStyles();const u=l;const f=require("node:process");const p=require("node:os");const g=require("node:tty");function hasFlag(e,t=(globalThis.Deno?globalThis.Deno.args:f.argv)){const r=e.startsWith("-")?"":e.length===1?"-":"--";const n=t.indexOf(r+e);const s=t.indexOf("--");return n!==-1&&(s===-1||n<s)}const{env:h}=f;let d;if(hasFlag("no-color")||hasFlag("no-colors")||hasFlag("color=false")||hasFlag("color=never")){d=0}else if(hasFlag("color")||hasFlag("colors")||hasFlag("color=true")||hasFlag("color=always")){d=1}function envForceColor(){if("FORCE_COLOR"in h){if(h.FORCE_COLOR==="true"){return 1}if(h.FORCE_COLOR==="false"){return 0}return h.FORCE_COLOR.length===0?1:Math.min(Number.parseInt(h.FORCE_COLOR,10),3)}}function translateLevel(e){if(e===0){return false}return{level:e,hasBasic:true,has256:e>=2,has16m:e>=3}}function _supportsColor(e,{streamIsTTY:t,sniffFlags:r=true}={}){const n=envForceColor();if(n!==undefined){d=n}const s=r?d:n;if(s===0){return 0}if(r){if(hasFlag("color=16m")||hasFlag("color=full")||hasFlag("color=truecolor")){return 3}if(hasFlag("color=256")){return 2}}if("TF_BUILD"in h&&"AGENT_NAME"in h){return 1}if(e&&!t&&s===undefined){return 0}const o=s||0;if(h.TERM==="dumb"){return o}if(f.platform==="win32"){const e=p.release().split(".");if(Number(e[0])>=10&&Number(e[2])>=10586){return Number(e[2])>=14931?3:2}return 1}if("CI"in h){if("GITHUB_ACTIONS"in h){return 3}if(["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","BUILDKITE","DRONE"].some((e=>e in h))||h.CI_NAME==="codeship"){return 1}return o}if("TEAMCITY_VERSION"in h){return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(h.TEAMCITY_VERSION)?1:0}if(h.COLORTERM==="truecolor"){return 3}if(h.TERM==="xterm-kitty"){return 3}if("TERM_PROGRAM"in h){const e=Number.parseInt((h.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(h.TERM_PROGRAM){case"iTerm.app":{return e>=3?3:2}case"Apple_Terminal":{return 2}}}if(/-256(color)?$/i.test(h.TERM)){return 2}if(/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(h.TERM)){return 1}if("COLORTERM"in h){return 1}return o}function createSupportsColor(e,t={}){const r=_supportsColor(e,{streamIsTTY:e&&e.isTTY,...t});return translateLevel(r)}const b={stdout:createSupportsColor({isTTY:g.isatty(1)}),stderr:createSupportsColor({isTTY:g.isatty(2)})};const m=b;function stringReplaceAll(e,t,r){let n=e.indexOf(t);if(n===-1){return e}const s=t.length;let o=0;let i="";do{i+=e.slice(o,n)+t+r;o=n+s;n=e.indexOf(t,o)}while(n!==-1);i+=e.slice(o);return i}function stringEncaseCRLFWithFirstIndex(e,t,r,n){let s=0;let o="";do{const i=e[n-1]==="\r";o+=e.slice(s,i?n-1:n)+t+(i?"\r\n":"\n")+r;s=n+1;n=e.indexOf("\n",s)}while(n!==-1);o+=e.slice(s);return o}const{stdout:_,stderr:v}=m;const x=Symbol("GENERATOR");const E=Symbol("STYLER");const T=Symbol("IS_EMPTY");const y=["ansi","ansi","ansi256","ansi16m"];const w=Object.create(null);const applyOptions=(e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3)){throw new Error("The `level` option should be an integer from 0 to 3")}const r=_?_.level:0;e.level=t.level===undefined?r:t.level};class Chalk{constructor(e){return chalkFactory(e)}}const chalkFactory=e=>{const chalk=(...e)=>e.join(" ");applyOptions(chalk,e);Object.setPrototypeOf(chalk,createChalk.prototype);return chalk};function createChalk(e){return chalkFactory(e)}Object.setPrototypeOf(createChalk.prototype,Function.prototype);for(const[e,t]of Object.entries(u)){w[e]={get(){const r=createBuilder(this,createStyler(t.open,t.close,this[E]),this[T]);Object.defineProperty(this,e,{value:r});return r}}}w.visible={get(){const e=createBuilder(this,this[E],true);Object.defineProperty(this,"visible",{value:e});return e}};const getModelAnsi=(e,t,r,...n)=>{if(e==="rgb"){if(t==="ansi16m"){return u[r].ansi16m(...n)}if(t==="ansi256"){return u[r].ansi256(u.rgbToAnsi256(...n))}return u[r].ansi(u.rgbToAnsi(...n))}if(e==="hex"){return getModelAnsi("rgb",t,r,...u.hexToRgb(...n))}return u[r][e](...n)};const O=["rgb","hex","ansi256"];for(const e of O){w[e]={get(){const{level:t}=this;return function(...r){const n=createStyler(getModelAnsi(e,y[t],"color",...r),u.color.close,this[E]);return createBuilder(this,n,this[T])}}};const t="bg"+e[0].toUpperCase()+e.slice(1);w[t]={get(){const{level:t}=this;return function(...r){const n=createStyler(getModelAnsi(e,y[t],"bgColor",...r),u.bgColor.close,this[E]);return createBuilder(this,n,this[T])}}}}const C=Object.defineProperties((()=>{}),{...w,level:{enumerable:true,get(){return this[x].level},set(e){this[x].level=e}}});const createStyler=(e,t,r)=>{let n;let s;if(r===undefined){n=e;s=t}else{n=r.openAll+e;s=t+r.closeAll}return{open:e,close:t,openAll:n,closeAll:s,parent:r}};const createBuilder=(e,t,r)=>{const builder=(...e)=>applyStyle(builder,e.length===1?""+e[0]:e.join(" "));Object.setPrototypeOf(builder,C);builder[x]=e;builder[E]=t;builder[T]=r;return builder};const applyStyle=(e,t)=>{if(e.level<=0||!t){return e[T]?"":t}let r=e[E];if(r===undefined){return t}const{openAll:n,closeAll:s}=r;if(t.includes("")){while(r!==undefined){t=stringReplaceAll(t,r.close,r.open);r=r.parent}}const o=t.indexOf("\n");if(o!==-1){t=stringEncaseCRLFWithFirstIndex(t,s,n,o)}return n+t+s};Object.defineProperties(createChalk.prototype,w);const k=createChalk();const A=createChalk({level:v?v.level:0});const R=k;function logger(){return{log(e,t=false){if(t){e="initializing "+e;e+="..."}console.log(`${R.bgBlue("[ CREATE-NEXT-BOILERPLATE ]")} ${e}`)},error(e){console.error(R.bgRed("[ CREATE-NEXT-BOILERPLATE ]")+" "+e)}}}function createNextAppCommand(e){const removeOption=(e,t)=>e.filter((e=>e!==t));const t="create-next-app";let r=["--typescript","--tailwind","--eslint","--no-app","--src-dir","--import-alias @/*"];if(e!==undefined){if(e.javascript===true){r.push("--javascript");r=removeOption(r,"--typescript")}if(e.tailwind===false){r.push("--no-tailwind");r=removeOption(r,"--tailwind")}if(e.eslint===false){r.push("--no-eslint");r=removeOption(r,"--eslint")}if(e.app===true){r.push("--app");r=removeOption(r,"--no-app")}if(e.srcDir===false){r.push("--no-src-dir");r=removeOption(r,"--src-dir")}if(e.npm===true){r.push("--use-npm")}if(e.pnpm===true){r.push("--use-pnpm")}}return`${t} ${r.join(" ")}`}const{log:M}=logger();class Tasks{pkgManager="npm";pkgManagerPrefix="";appName="";constructor({pkgManager:e,appName:t}){this.pkgManager=e;this.pkgManagerPrefix=this.getPkgManagerPefix();this.appName=t}getPkgManagerPefix(){const e={npm:"npx",pnpm:"pnpx",yarn:"npx"};return e.hasOwnProperty(this.pkgManager)?e[this.pkgManager]:"npx"}async createNextApp(){M("running create-next-app...");const[e,...r]=`${this.pkgManagerPrefix} ${createNextAppCommand()}`.split(" ");await t()(e,[...r,this.appName],{stdio:"inherit"})}}function getPkgManager(){const e=process.env.npm_config_user_agent;if(e){if(e.startsWith("yarn")){return"yarn"}else if(e.startsWith("pnpm")){return"pnpm"}else{return"npm"}}else{return"npm"}}const P=process.argv[2]??"";const S=new Tasks({pkgManager:getPkgManager(),appName:P});const{log:I,error:j}=logger();I("initializing...");if(!P){j("ERROR: no app name provided");process.exit(1)}S.createNextApp().catch((e=>{console.log("Something went wrong");console.log(e)}))})();module.exports=r})();