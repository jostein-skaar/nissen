if(!self.define){let e,s={};const r=(r,n)=>(r=new URL(r+".js",n).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const o=e=>r(e,a),d={module:{uri:a},exports:t,require:o};s[a]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-6cd28afd"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.2073df4a.js",revision:null},{url:"assets/index.a05359e6.css",revision:null},{url:"assets/vendor.65781a6a.js",revision:null},{url:"index.html",revision:"b1b3bb92f59635a8ffc6a3a4bf8e7c05"},{url:"assets/background-mountains@1.png",revision:"926d15de61130c7860f87b14d8c6decc"},{url:"assets/background-mountains@2.png",revision:"c4d4d922f8cb92c19ed7a5c53f9fec13"},{url:"assets/background-mountains@3.png",revision:"3d2e685cbaa262a784e1157147e1dee3"},{url:"assets/background-snow@1.png",revision:"42f1f08cf67a900f5c2b49a76afbcb7e"},{url:"assets/background-snow@2.png",revision:"6cef48be742e85218727646e68879c21"},{url:"assets/background-snow@3.png",revision:"e7a566cad0457f12f6aa361f4b1cebbe"},{url:"assets/background-sprite@1.png",revision:"03eb055081d795856231e7448ee19762"},{url:"assets/background-sprite@2.png",revision:"8649a205977d7883fbe526071b1793c2"},{url:"assets/background-sprite@3.png",revision:"9268617dc798fa16f26f842eaf1087c0"},{url:"assets/helt-sprite@1.png",revision:"e89aae1b909180e338a120b5d8ce92a4"},{url:"assets/helt-sprite@2.png",revision:"fb283b55652d4f526b8ed16ec05a1cfa"},{url:"assets/helt-sprite@3.png",revision:"2835cb447a5f27c39fb08c76409594fe"},{url:"assets/korona-sprite@1.png",revision:"568c3ab0269e01f65e894e4e307d92ff"},{url:"assets/korona-sprite@2.png",revision:"f10dda5ab667cbd0b922651d7d0e79c7"},{url:"assets/korona-sprite@3.png",revision:"5c210bb74d73a16665dd2745519740b5"},{url:"assets/levels@1.json",revision:"aa25ef804674d59a784428e449e8911e"},{url:"assets/levels@2.json",revision:"543f2df1382141db2a65082b0bdcdc47"},{url:"assets/levels@3.json",revision:"5f83b4c0b7be2a1bc644d1108c4aced1"},{url:"assets/presents-sprite@1.png",revision:"1327b71f1d29ebe416c551bb3bb7a788"},{url:"assets/presents-sprite@2.png",revision:"8a188bf50104d5a06e3a5b6c04d26176"},{url:"assets/presents-sprite@3.png",revision:"1449c48d63bac365f8d0c1319812ad7c"},{url:"assets/snow-sprite@1.png",revision:"5e47a95b5f6714d690b14aa6381aba34"},{url:"assets/snow-sprite@2.png",revision:"31ee02184d975633548a2a7609360587"},{url:"assets/snow-sprite@3.png",revision:"89655d9d158b54cb036f6bed6fa4ba98"},{url:"assets/tiles-sprite@1.png",revision:"49f46f40d3c603c53b54c27976fefbe7"},{url:"assets/tiles-sprite@2.png",revision:"93dddb120e557f7226afd54e1134f912"},{url:"assets/tiles-sprite@3.png",revision:"25c59d713af0865eb7514c1dd9d45a99"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
