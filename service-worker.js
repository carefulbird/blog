if(!self.define){const s=s=>{"require"!==s&&(s+=".js");let e=Promise.resolve();return a[s]||(e=new Promise((async e=>{if("document"in self){const a=document.createElement("script");a.src=s,document.head.appendChild(a),a.onload=e}else importScripts(s),e()}))),e.then((()=>{if(!a[s])throw new Error(`Module ${s} didn’t register its module`);return a[s]}))},e=(e,a)=>{Promise.all(e.map(s)).then((s=>a(1===s.length?s[0]:s)))},a={require:Promise.resolve(e)};self.define=(e,d,i)=>{a[e]||(a[e]=Promise.resolve().then((()=>{let a={};const r={uri:location.origin+e.slice(1)};return Promise.all(d.map((e=>{switch(e){case"exports":return a;case"module":return r;default:return s(e)}}))).then((s=>{const e=i(...s);return a.default||(a.default=e),a}))})))}}define("./service-worker.js",["./workbox-282d8a9c"],(function(s){"use strict";s.setCacheNameDetails({prefix:"mr-hope"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"assets/css/0.styles.fdb7cbd9.css",revision:"610fa1087e017d8b4c80d6a59886449c"},{url:"assets/img/danger-dark.7b1d6aa1.svg",revision:"7b1d6aa1bdcf013d0edfe316ab770f8e"},{url:"assets/img/danger.b143eda2.svg",revision:"b143eda243548a9982491dca4c81eed5"},{url:"assets/img/default-skin.b257fa9c.svg",revision:"b257fa9c5ac8c515ac4d77a667ce2943"},{url:"assets/img/info-dark.f8a43cf6.svg",revision:"f8a43cf67fa96a27a078530a3a43253c"},{url:"assets/img/info.88826912.svg",revision:"88826912d81d91c9e2d03164cd1481a1"},{url:"assets/img/search.83621669.svg",revision:"83621669651b9a3d4bf64d1a670ad856"},{url:"assets/img/tip-dark.075a244c.svg",revision:"075a244c83d1403c167defe81b4d7fe7"},{url:"assets/img/tip.a2b80aa5.svg",revision:"a2b80aa50b769a26da12fe352322a657"},{url:"assets/img/warning-dark.aac7e30c.svg",revision:"aac7e30c5fafc6748e21f7a9ef546698"},{url:"assets/img/warning.ec428b6d.svg",revision:"ec428b6d6d45ac5d0c610f08d757f40f"},{url:"assets/js/16.9290addc.js",revision:"0d6be56069bd8c7af320b2748c9b2ac2"},{url:"assets/js/17.506b35cf.js",revision:"d191b11e75e965f3d2909f1951501966"},{url:"assets/js/18.d664c0c4.js",revision:"df71999423116cd7ff6fcd36957bd9a8"},{url:"assets/js/19.056d39b3.js",revision:"242f65d9a5e91e5c2e7c7f6443e39817"},{url:"assets/js/20.2fa30061.js",revision:"3c99b8b9bb0e1321695dc7ea64badefa"},{url:"assets/js/21.0e1c3449.js",revision:"23faa9cc587c2a47a41bea18f93687a0"},{url:"assets/js/22.b412fa8a.js",revision:"1b35ed0c80133bd1a805dd8f2b60c0a3"},{url:"assets/js/23.5a0597bb.js",revision:"049f95be9171a20bc6138309a55a4d0c"},{url:"assets/js/24.97dea411.js",revision:"37aa88d7e2ac2c7cc3179f58ab14fe11"},{url:"assets/js/25.229b2ce2.js",revision:"132e91827d33e821743b9862a0dbb2b1"},{url:"assets/js/26.4b1f36ab.js",revision:"ab9c711e690ebd8ab94e88782ccc6222"},{url:"assets/js/27.ab49aa00.js",revision:"c1654a80df3e01a3c658753819f6860d"},{url:"assets/js/28.d32b9696.js",revision:"4713578f4f954482ac88b90c9181181a"},{url:"assets/js/29.286a594e.js",revision:"ac82714b4dbacd1eafd76c2c51bc2bb0"},{url:"assets/js/30.ae09d987.js",revision:"032da055089cc818c29afb927ab45cd4"},{url:"assets/js/31.23fb7825.js",revision:"5622d3769c0bfa67962433ea09f08962"},{url:"assets/js/32.e83c95f1.js",revision:"cca9e64e6906c06cb3d3bdd57df71f1e"},{url:"assets/js/33.99d16f05.js",revision:"cd1e43982791deeb40fa4ab5c84ac9ed"},{url:"assets/js/34.f61786c1.js",revision:"6d5a8f27ab1b7d6df800a25a91342bf2"},{url:"assets/js/35.0d750c11.js",revision:"da6e2cdbae6ddfeeed46d9bf49329964"},{url:"assets/js/36.b20398c6.js",revision:"57eab3c7ffb9c8b49470a26b92454098"},{url:"assets/js/37.8f3fbef5.js",revision:"085a3555aa485f2330a41bb20fe84723"},{url:"assets/js/38.8ba581a8.js",revision:"7616a03cf618a0fbb0b326d3d4b06fd6"},{url:"assets/js/39.1fde6ba9.js",revision:"f5c88e09ae7d99247dc169719bef74c0"},{url:"assets/js/40.b30bcc71.js",revision:"53d951b95aeb6cf702dfd6c988ec8aec"},{url:"assets/js/41.2e14dd95.js",revision:"3fb65f157b3b9f687a8528ee7ae6b57d"},{url:"assets/js/42.73ee54e6.js",revision:"208d8de8b1aba38521a11b2788c5c388"},{url:"assets/js/43.3703aea6.js",revision:"cc23668773ab30b9452cde0581f023e1"},{url:"assets/js/44.1525a303.js",revision:"80d30eb710b455b4d6e54bfb51b242fc"},{url:"assets/js/45.5cd3a375.js",revision:"b217413a46b9e244d792530e75f35537"},{url:"assets/js/46.2d8158e6.js",revision:"3a1503fbf3c337ee5ba87e9eb14b82fb"},{url:"assets/js/47.2721d6d1.js",revision:"0426e61a8290c826c2a370f666c70e53"},{url:"assets/js/48.347928a4.js",revision:"36e4562c6bf7d8535fa9bd16c21eeec0"},{url:"assets/js/49.789c6010.js",revision:"290dcdf09f1fa492134f6c7ea8a3967e"},{url:"assets/js/app.ae2d76ca.js",revision:"ada2dd7b7b0da4e497e2cac54154467c"},{url:"assets/js/layout-Blog.a439bebd.js",revision:"02d64a1a04be41887dfbd97ec0545d7f"},{url:"assets/js/layout-Layout.9c2c084f.js",revision:"959c56e00bab3039fbfc9ca0c94a6225"},{url:"assets/js/layout-NotFound.3014de88.js",revision:"3810db63a1b758a98b1b8bcd00b94dd8"},{url:"assets/js/layout-Slide.2f38bd31.js",revision:"f8d2405dac4d5d5d7e9e05fdc193ea7d"},{url:"assets/js/mermaid.3ab31ceb.js",revision:"2a35a6df6e695b7a1230a823ab77db58"},{url:"assets/js/page-Home.0eb5d59a.js",revision:"7c2f85f3b2a0a2cb247c817fc795123e"},{url:"assets/js/page-Javascrit.4b29b0f6.js",revision:"d206a095b55e1e3d23e4ea6336ae99c9"},{url:"assets/js/page-非严格等和加法的'潜规则'.c3acfd97.js",revision:"7f827778caf2b0fee84db5f7526a762d"},{url:"assets/js/vendors~flowchart.f6885c5b.js",revision:"1968e3803408d5923a752ff79b5ca25c"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound.f39ab126.js",revision:"e57e7298c20c71e29f8f3ffe2a5d26c8"},{url:"assets/js/vendors~layout-Blog~layout-Layout~layout-NotFound~layout-Slide.778738f3.js",revision:"fc7f56e93ab254bb37d03d598d4431fa"},{url:"assets/js/vendors~layout-Layout.8e38df49.js",revision:"1ad733e8f20b8bcbe2869c765e44d37c"},{url:"assets/js/vendors~mermaid.4e0b3ba0.js",revision:"0b96f9d9b0908e609e49de3723908230"},{url:"assets/js/vendors~photo-swipe.a225a2b8.js",revision:"e10a4a1a9f3978f6ba4edb7fbd231d27"},{url:"logo.svg",revision:"5992f0e40451b1d3335cf9477f7e1779"},{url:"assets/fonts/element-icons.535877f5.woff",revision:"535877f50039c0cb49a6196a5b7517cd"},{url:"assets/fonts/element-icons.732389de.ttf",revision:"732389ded34cb9c52dd88271f1345af9"},{url:"404.html",revision:"a0ddc0c6d7cb83020672cb16ca6b3ad5"},{url:"article/index.html",revision:"86997208813cd507041b8e4b42733310"},{url:"category/index.html",revision:"b498d5a86f05c166bb82073977e3c930"},{url:"encrypt/index.html",revision:"0bd72dc17002853b17065f66249325ba"},{url:"index.html",revision:"38cfa5d583c59db1f216608ea48a20e6"},{url:"JavaScript/index.html",revision:"9298be190378ba7f40a126d0fb74e3b7"},{url:"JavaScript/JS类型转换/index.html",revision:"e624bad4e0ffed30f188d9d0f791d776"},{url:"slide/index.html",revision:"060d3a2cc7a8045da599dd8289b85f4c"},{url:"star/index.html",revision:"71745b2c2455e11c609ae33d3d702235"},{url:"tag/index.html",revision:"5b86caecccfc665511e238861b34a3cf"},{url:"timeline/index.html",revision:"2ba72529969dfea27481c1dfb44fcd9e"}],{}),s.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map
addEventListener("message", (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === "skip-waiting")
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        (error) => replyPort.postMessage({ error })
      )
    );
});
