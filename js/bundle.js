!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){"serviceWorker"in navigator&&navigator.serviceWorker.register("./js/sw.js").then(()=>{console.log("Service Worker Registered")});const n=function(){const e="selected",t={selected:"."+e,icon:"."+"icon",loadingContainer:".loadingContainer",today:"."+"today"},n={},o={new:"./api/new.php"};function r(e){!0===e?n.loadingContainer.removeAttribute("hidden"):n.loadingContainer.setAttribute("hidden","true")}function i(n){n.preventDefault(),r(!0),function(){const n=document.querySelector(t.selected);n&&n.classList.remove(e)}(),function(e={}){return fetch(o.new,{method:"POST",mode:"no-cors",cache:"no-cache",headers:{"Content-Type":"application/json"},redirect:"follow",body:JSON.stringify(e)}).then(e=>e.json())}({type:n.target.dataset.type}).then(e=>{r(!1),console.log(e)}),n.target.classList.add(e)}return{init:function(){n.loadingContainer=document.querySelector(t.loadingContainer),n.icons=document.querySelectorAll(t.icon),n.today=document.querySelector(t.today),n.icons.forEach(e=>{e.addEventListener("click",i)}),function(){const e=new Date;n.today.innerText=new Intl.DateTimeFormat("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(e)}()}}}();document.querySelector(".app")&&n.init()}]);