const C="georgia-v5",A=["./","index.html","style.css","app.js","manifest.json","icon-192.png","icon-512.png"];
const NET=/(\/|index\.html|\.js|\.css|manifest\.json)$/;
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:"reload"})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request,u=new URL(q.url);if(q.method!="GET"||u.origin!=location.origin)return;
if(q.mode=="navigate"||NET.test(u.pathname)){e.respondWith(fetch(q,{cache:"no-cache"}).then(n=>{if(n.ok){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n}).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q)))});
