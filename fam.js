// ---------- איפה כולם: family location sharing ----------
// Backend: ntfy.sh. All family phones share one baked-in room + AES-GCM key (see FAM.room / FAM.key).
// Positions are encrypted in the browser before upload. Old per-device rooms are migrated by famEnsure().
const FAM={people:[["ויטאלי","👨","#1a73e8"],["יוליה","👩","#d6336c"],["אדם","👦","#2f9e44"],["טום","🧒","#f08c00"]],
  api:"https://ntfy.sh/",room:"gjU8LEabl79NoGEQZdyw_a09vj",key:"nRHdjXXiqD_weab92eg6ZuoW0RoKp7xM48-DhsoFjbg",staleMin:15,sendEvery:60e3};
const fs={get me(){return localStorage.famMe||""},get room(){return localStorage.famRoom||""},get key(){return localStorage.famKey||""},get paused(){return localStorage.famPause=="1"},
  pos:{},mine:null,lastSent:0,lastSentPos:null,watch:null,es:null,poll:null,ck:null,map:null,mk:{},status:"off"};
const b64u=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const ub64=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
const rnd=n=>b64u(crypto.getRandomValues(new Uint8Array(n)));
async function famKey(){if(!fs.ck)fs.ck=await crypto.subtle.importKey("raw",ub64(fs.key),"AES-GCM",false,["encrypt","decrypt"]);return fs.ck}
async function famEnc(o){const iv=crypto.getRandomValues(new Uint8Array(12)),ct=await crypto.subtle.encrypt({name:"AES-GCM",iv},await famKey(),new TextEncoder().encode(JSON.stringify(o)));return "v1."+b64u(iv)+"."+b64u(ct)}
async function famDec(s){const[v,iv,ct]=String(s).split(".");if(v!="v1")return null;try{return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:ub64(iv)},await famKey(),ub64(ct))))}catch(e){return null}}
const famLink=()=>location.origin+location.pathname+"#fam="+fs.room+"~"+fs.key;
const pOf=n=>FAM.people.find(p=>p[0]==n)||[n,"🙂","#666"];
function famEnsure(){if(fs.room==FAM.room&&fs.key==FAM.key)return;localStorage.famRoom=FAM.room;localStorage.famKey=FAM.key;fs.ck=null;fs.pos={}}
function famJoinFromHash(){famEnsure();if(!/^#fam([=]|$)/.test(location.hash))return false;history.replaceState(null,"",location.pathname+"#fam");return true}
function famCreate(){famEnsure();famStart();go("fam")}
// --- who are you ---
function famPicker(){if($("#who"))return;const d=document.createElement("div");d.id="who";d.innerHTML=`<div class="whoin"><h2>מי אתה? 👋</h2><p class="sub">כדי שהמשפחה תראה מי איפה</p>
<div class="whog">${FAM.people.map(([n,e,c])=>`<button data-n="${n}" style="--c:${c}"><span>${e}</span>${n}</button>`).join("")}</div></div>`;
  document.body.appendChild(d);d.querySelectorAll("button").forEach(b=>b.onclick=()=>{localStorage.famMe=b.dataset.n;d.remove();famPill();famStart();if(location.hash=="#fam")go("fam")})}
// --- status pill ---
function famPill(){let p=$("#fampill");if(!p){p=document.createElement("button");p.id="fampill";document.querySelector("header").appendChild(p);p.onclick=()=>go("fam")}
  const on=fs.status=="on";p.className=on?"on":"";p.textContent=on?"📍 משתף מיקום":"מיקום כבוי"}
// --- sharing ---
function famStart(){famEnsure();if(!fs.me||!fs.room||document.hidden){famStop();return}
  famListen();if(fs.paused||!navigator.geolocation){fs.status="off";famPill();return}
  if(fs.watch==null)fs.watch=navigator.geolocation.watchPosition(famOnPos,e=>{fs.status="off";fs.err=e.code==1?"הגישה למיקום נחסמה – אפשר לאשר בהגדרות הדפדפן":"המיקום לא זמין כרגע";famPill();famRender()},{enableHighAccuracy:true,maximumAge:30e3,timeout:30e3})}
function famStop(){if(fs.watch!=null){navigator.geolocation.clearWatch(fs.watch);fs.watch=null}if(fs.es){fs.es.close();fs.es=null}clearInterval(fs.poll);fs.poll=null;fs.status="off";famPill()}
async function famOnPos(p){fs.err="";fs.status="on";famPill();const c=p.coords,o={n:fs.me,la:+c.latitude.toFixed(5),lo:+c.longitude.toFixed(5),a:Math.round(c.accuracy),t:Date.now()};
  fs.mine=o;fs.pos[fs.me]=o;famRender();
  const moved=fs.lastSentPos?hav(fs.lastSentPos.la,fs.lastSentPos.lo,o.la,o.lo)*1000:1e9,age=Date.now()-fs.lastSent;
  if(Date.now()<fs.nextSend||age<FAM.sendEvery||(moved<15&&age<5*60e3))return;
  fs.lastSent=Date.now();fs.lastSentPos=o;fs.nextSend=0;
  try{const r=await fetch(FAM.api+encodeURIComponent(fs.room),{method:"POST",body:await famEnc(o),cache:"no-store"});
    if(!r.ok){fs.err=r.status==429?"השרת עמוס כרגע, מנסה שוב בעוד כמה דקות":"לא הצלחתי לשלוח את המיקום (קוד "+r.status+")";fs.nextSend=Date.now()+(r.status==429?5*60e3:30e3);famRender()}}
  catch(e){fs.nextSend=Date.now()+15e3}}
async function famIngest(msg){const o=await famDec(msg);if(!o||!o.n||!isFinite(o.la))return;const cur=fs.pos[o.n];if(!cur||o.t>cur.t){fs.pos[o.n]=o;famRender()}}
async function famPollOnce(){try{const r=await fetch(FAM.api+encodeURIComponent(fs.room)+"/json?poll=1&since=all&limit=50",{cache:"no-store"});if(!r.ok)return;const t=await r.text();
  for(const l of t.split("\n")){if(!l.trim())continue;try{const m=JSON.parse(l);if(m.event=="message")await famIngest(m.message)}catch(e){}}}catch(e){}}
function famListen(){if(!fs.room)return;
  if(!fs.es&&"EventSource"in window){fs.es=new EventSource(FAM.api+encodeURIComponent(fs.room)+"/sse?since=all");
    fs.es.onmessage=e=>{try{const m=JSON.parse(e.data);if(m.event=="message")famIngest(m.message)}catch(_){}};
    fs.es.onerror=()=>{if(fs.es&&fs.es.readyState==EventSource.CLOSED){fs.es=null}}}
  if(!fs.poll){famPollOnce();fs.poll=setInterval(famPollOnce,120e3)}}
document.addEventListener("visibilitychange",()=>{if(document.hidden)famStop();else{famStart();if(location.hash=="#fam")famRender()}});
// --- view ---
const ago=t=>{const m=Math.round((Date.now()-t)/60e3);return m<1?"עכשיו":m<60?`לפני ${m} דק׳`:m<1440?`לפני ${Math.floor(m/60)} שע׳`:"לפני יותר מיום"};
const kmTxt=k=>k<1?Math.round(k*1000)+" מ׳":k.toFixed(1)+" ק״מ";
function famView(){
  famEnsure();
  if(!fs.room)return `<div class="box fam"><h2>👨‍👩‍👦‍👦 איפה כולם</h2><p>טוען את קבוצת המשפחה…</p><button class="btn" id="fcreate">המשך</button></div>`;
  return `<div class="famtop"><div><b>👨‍👩‍👦‍👦 איפה כולם</b><span class="sub"> · אני: ${pOf(fs.me)[1]} ${fs.me||"?"}</span></div>
<label class="tgl"><input type="checkbox" id="fshare" ${fs.paused?"":"checked"}><span></span> שיתוף</label></div>
<div id="fmap"></div><div id="ferr"></div><div id="flist"></div>
<div class="fbtns"><button class="btn alt" id="finv">📨 הזמנת המשפחה</button><button class="btn alt" id="fwho">🔄 החלפת משתמש</button></div>
<details class="more"><summary>ℹ️ מעקב גם כשהאפליקציה סגורה</summary><p>האפליקציה משתפת מיקום רק כשהיא פתוחה על המסך (מתעדכן בערך כל דקה). למעקב ברקע לאורך כל היום – שתפו מיקום ב־Google Maps (או ב־Find My באייפון).</p>
<a class="btn alt" href="https://www.google.com/maps/@?share" target="_blank" rel="noopener">🗺️ שיתוף מיקום ב־Google Maps</a>
<a class="btn alt" href="https://support.google.com/maps/answer/7326816?hl=iw" target="_blank" rel="noopener">❓ איך משתפים מיקום ב־Google Maps</a>
<p class="sub">🔒 המיקומים מוצפנים בטלפון עם מפתח שנמצא רק בקישור ההזמנה, ונשמרים בשרת (ntfy.sh) עד 12 שעות. אל תשתפו את הקישור מחוץ למשפחה.</p></details>`}
function famInit(){if(!fs.room){$("#fcreate").onclick=famCreate;return}
  $("#fshare").onchange=e=>{localStorage.famPause=e.target.checked?"0":"1";if(fs.paused){if(fs.watch!=null){navigator.geolocation.clearWatch(fs.watch);fs.watch=null}fs.status="off";famPill()}else famStart();famRender()};
  $("#fwho").onclick=famPicker;
  $("#finv").onclick=async()=>{const u=famLink(),t="איפה כולם – פתחו את הקישור כדי לראות אחד את השני בטביליסי 🇬🇪\n"+u;
    if(navigator.share)try{await navigator.share({title:"איפה כולם",text:t});return}catch(e){if(e.name=="AbortError")return}
    location.href="https://wa.me/?text="+encodeURIComponent(t)};
  fs.map=null;fs.mk={};fs.pin={};fs.ln={};fs.pm=null;fs.spreadHooked=0;fs.leg=null;fs.xctl=null;fs.rt=null;fs.popHooked=0;
  famLeaflet().then(()=>{if(!$("#fmap"))return;fs.map=L.map("fmap",{zoomControl:false,attributionControl:true}).setView([HOTEL.lat,HOTEL.lng],14);
    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png",{maxZoom:21,maxNativeZoom:19,attribution:"© OpenStreetMap"}).addTo(fs.map);
    if(!fs.map.getPane("routes")){const pn=fs.map.createPane("routes");pn.style.zIndex=350;pn.style.pointerEvents="none"}
    L.marker([HOTEL.lat,HOTEL.lng],{icon:L.divIcon({className:"",html:`<div class="fmk" style="--c:#7a2e1d">🏨</div>`,iconSize:[36,36],iconAnchor:[18,18]}),zIndexOffset:50}).addTo(fs.map).bindTooltip("המלון");
    famRouteLines();famPlaceMarkers();famAddExpand();famHookPopups();
    fs.map.invalidateSize();fs.fit=true;famHookSpread();famRender()}).catch(()=>{$("#fmap").innerHTML=`<p class="sub" style="padding:20px;text-align:center">המפה לא נטענה (אין אינטרנט?)</p>`});
  famRender()}
function famLeaflet(){if(window.L)return Promise.resolve();return new Promise((ok,no)=>{const c=document.createElement("link");c.rel="stylesheet";c.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(c);
  const s=document.createElement("script");s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";s.onload=ok;s.onerror=no;document.head.appendChild(s)})}

const FAM_MINPX=44; // 38px avatar + 6px gap, center-to-center
function famSpreadPts(items,minD){
  const n=items.length,p=items.map((_,i)=>i);
  const f=i=>p[i]==i?i:p[i]=f(p[i]);
  const u=(a,b)=>{a=f(a);b=f(b);if(a!=b)p[a]=b};
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
    const dx=items[i].x-items[j].x,dy=items[i].y-items[j].y;
    if(dx*dx+dy*dy<minD*minD)u(i,j);
  }
  const g={};items.forEach((it,i)=>(g[f(i)]||=[]).push(it));
  const out={};
  for(const c of Object.values(g)){
    if(c.length==1){out[c[0].n]={x:c[0].x,y:c[0].y};continue}
    const cx=c.reduce((s,q)=>s+q.x,0)/c.length,cy=c.reduce((s,q)=>s+q.y,0)/c.length;
    const arr=c.map((q,i)=>{const d=Math.hypot(q.x-cx,q.y-cy);return{q,i,ang:d<1e-3?NaN:Math.atan2(q.y-cy,q.x-cx)}});
    const base=arr.find(a=>!isNaN(a.ang));
    if(base){arr.forEach(a=>{if(isNaN(a.ang))a.ang=base.ang});arr.sort((a,b)=>a.ang-b.ang||a.i-b.i)}
    const r=minD/(2*Math.sin(Math.PI/c.length)),a0=!isNaN(arr[0].ang)?arr[0].ang:0;
    arr.forEach((a,i)=>{const th=a0+i*2*Math.PI/c.length;out[a.q.n]={x:cx+Math.cos(th)*r,y:cy+Math.sin(th)*r}});
  }
  return out;
}
function famHookSpread(){
  if(!fs.map||fs.spreadHooked)return;fs.spreadHooked=1;
  const tick=()=>{if(fs._spRaf)return;fs._spRaf=requestAnimationFrame(()=>{fs._spRaf=0;famSpreadMarkers()})};
  fs.map.on("zoomend moveend zoom move",tick);
}
function famSpreadMarkers(){
  if(!fs.map)return;
  const items=[];
  for(const[n,e,c]of FAM.people){const o=fs.pos[n];if(!o)continue;const pt=fs.map.latLngToLayerPoint(L.latLng(o.la,o.lo));items.push({n,c,la:o.la,lo:o.lo,x:pt.x,y:pt.y})}
  const pos=famSpreadPts(items,FAM_MINPX);
  if(!fs.pin)fs.pin={};if(!fs.ln)fs.ln={};
  for(const it of items){
    const d=pos[it.n],disp=fs.map.layerPointToLatLng(L.point(d.x,d.y));
    if(fs.mk[it.n])fs.mk[it.n].setLatLng(disp);
    const moved=(d.x-it.x)**2+(d.y-it.y)**2>9;
    if(moved){
      const tru=L.latLng(it.la,it.lo);
      if(!fs.pin[it.n])fs.pin[it.n]=L.circleMarker(tru,{radius:3,weight:1,color:"#fff",fillColor:it.c,fillOpacity:1,interactive:false}).addTo(fs.map);
      else fs.pin[it.n].setLatLng(tru).setStyle({fillColor:it.c});
      if(!fs.ln[it.n])fs.ln[it.n]=L.polyline([tru,disp],{weight:2,color:it.c,opacity:.45,interactive:false}).addTo(fs.map);
      else fs.ln[it.n].setLatLngs([tru,disp]);
    }else{
      if(fs.pin[it.n]){fs.pin[it.n].remove();delete fs.pin[it.n]}
      if(fs.ln[it.n]){fs.ln[it.n].remove();delete fs.ln[it.n]}
    }
  }
}

function famVisitPlaces(){
  const seen=new Set(),out=[];
  const add=(p,i)=>{if(!p||!isFinite(p.lat)||!isFinite(p.lng)||seen.has(i))return;seen.add(i);out.push({p,i})};
  if(typeof ROUTES!=="undefined")for(const r of ROUTES)for(const s of r.stops||[])add(PLACES[s.i],s.i);
  if(typeof PLACES!=="undefined")PLACES.forEach((p,i)=>{if(p.want||p.w)add(p,i)});
  return out;
}
function famPlacePopup(p,i){
  const ph=typeof photosOf=="function"?photosOf(i):[];
  const name=typeof esc=="function"?esc(p.n):p.n;
  let gal="";
  if(ph.length){
    const imgs=ph.map(x=>`<img src="${x[0]}" alt="" draggable="false">`).join("");
    const dots=ph.length>1?`<div class="pgdots">${ph.map((_,k)=>`<i class="${k?"":"on"}"></i>`).join("")}</div>`:"";
    gal=`<div class="pgal" dir="ltr" data-n="${ph.length}"><div class="pgtrack">${imgs}</div>${dots}</div>`;
  }
  const href=typeof nav=="function"?nav(p):"https://www.google.com/maps/dir/?api=1&destination="+p.lat+","+p.lng;
  return `<div class="ppop">${gal}<b>${name}</b><a class="btn" href="${href}" target="_blank" rel="noopener">🧭 ניווט</a></div>`;
}
function famHookPopups(){
  if(!fs.map||fs.popHooked)return;fs.popHooked=1;
  fs.map.on("popupopen",e=>{
    const g=e.popup.getElement()&&e.popup.getElement().querySelector(".pgal");
    if(!g)return;
    const track=g.querySelector(".pgtrack"),dots=[...g.querySelectorAll(".pgdots i")];
    const sync=()=>{const w=track.clientWidth||1,k=Math.round(track.scrollLeft/w);dots.forEach((d,i)=>d.classList.toggle("on",i===k))};
    track.addEventListener("scroll",sync,{passive:true});
    L.DomEvent.disableClickPropagation(g);
    L.DomEvent.on(g,"touchstart",L.DomEvent.stopPropagation);
    L.DomEvent.on(g,"touchmove",L.DomEvent.stopPropagation);
    L.DomEvent.on(g,"wheel",L.DomEvent.stopPropagation);
    [...track.querySelectorAll("img")].forEach(im=>im.onload=()=>e.popup.update());
    setTimeout(()=>e.popup.update(),50);
  });
}
function famPlaceMarkers(){
  if(!fs.map||fs.pm)return;
  fs.pm=[];
  const setLabs=()=>{const on=fs.map.getZoom()>=15;const el=$("#fmap");if(el)el.classList.toggle("hi-z",on)};
  for(const{p,i}of famVisitPlaces()){
    const ph=typeof photosOf=="function"?photosOf(i):[];
    const src=ph[0]&&ph[0][0],ico=p.k=="r"?"🍽️":"📍";
    const html=src?`<div class="pmk"><img src="${src}" alt=""></div>`:`<div class="pmk fb">${ico}</div>`;
    const mk=L.marker([p.lat,p.lng],{icon:L.divIcon({className:"pmid",html,iconSize:[32,32],iconAnchor:[16,16]}),zIndexOffset:-100,riseOnHover:true}).addTo(fs.map);
    mk.bindTooltip(p.n,{permanent:true,direction:"bottom",offset:[0,6],className:"plab-tip",opacity:1});
    mk.bindPopup(famPlacePopup(p,i),{className:"fam-pop",closeButton:true,autoPan:true,maxWidth:240,minWidth:220,autoPanPadding:[16,56]});
    fs.pm.push(mk);
  }
  fs.map.on("zoomend",setLabs);setLabs();
}
function famRender(){const el=$("#flist");if(!el)return;$("#ferr").innerHTML=fs.err?`<p class="warn">${fs.err}</p>`:"";
  const me=fs.mine;const rows=FAM.people.map(([n,e,c])=>{const o=fs.pos[n];
    if(!o)return `<div class="frow none"><span class="fav" style="--c:#bbb">${e}</span><div class="fi"><b>${n}</b><span class="sub">עוד לא שיתף מיקום</span></div></div>`;
    const stale=Date.now()-o.t>FAM.staleMin*60e3,isMe=n==fs.me,dh=hav(HOTEL.lat,HOTEL.lng,o.la,o.lo);
    const dm=me&&!isMe?" · ממני "+kmTxt(hav(me.la,me.lo,o.la,o.lo)):"";
    return `<div class="frow${stale?" stale":""}"><span class="fav" style="--c:${stale?"#aaa":c}">${e}</span><div class="fi"><b>${n}${isMe?" (אני)":""}</b><span class="sub">${ago(o.t)}${dm} · מהמלון ${kmTxt(dh)}</span></div>${isMe?"":`<a class="ib" href="https://www.google.com/maps/dir/?api=1&destination=${o.la},${o.lo}&travelmode=walking" target="_blank" rel="noopener" aria-label="נווט אליו">🧭</a>`}</div>`}).join("");
  el.innerHTML=`<div class="flist">${rows}</div>`;
  if(fs.map){const pts=[[HOTEL.lat,HOTEL.lng]];for(const[n,e,c]of FAM.people){const o=fs.pos[n];if(!o)continue;const stale=Date.now()-o.t>FAM.staleMin*60e3;
      const ic=L.divIcon({className:"",html:`<div class="fmk${stale?" stale":""}" style="--c:${c}">${e}</div>`,iconSize:[38,38],iconAnchor:[19,19]});
      if(fs.mk[n])fs.mk[n].setIcon(ic);else fs.mk[n]=L.marker([o.la,o.lo],{icon:ic,zIndexOffset:200}).addTo(fs.map).bindTooltip(n);pts.push([o.la,o.lo])}
    if(fs.fit&&pts.length>1){fs.map.fitBounds(pts,{padding:[40,40],maxZoom:16});fs.fit=false}
    famSpreadMarkers()}}
setInterval(()=>{if(location.hash=="#fam"&&!document.hidden)famRender()},30e3);
const RTCOL={old:"#1a73e8",ctr:"#c62828",north:"#2f9e44",mtsk:"#8e24aa"};
const RTLBL={old:"עיר עתיקה",ctr:"מרכז",north:"כרוניקה",mtsk:"מצחטה"};
function famRtLoad(){try{return JSON.parse(localStorage.georgiaRt||"")}catch(e){return null}}
function famRtSave(st){try{localStorage.georgiaRt=JSON.stringify(st)}catch(e){}}
function famRtState(){const d={old:1,ctr:1,north:1,mtsk:1},s=famRtLoad();if(s&&typeof s=="object")for(const k of Object.keys(d))if(k in s)d[k]=s[k]?1:0;return d}
function famRoutePts(r){return[[HOTEL.lat,HOTEL.lng],...r.stops.map(s=>[PLACES[s.i].lat,PLACES[s.i].lng]),[HOTEL.lat,HOTEL.lng]]}
function famRouteLines(){
  if(!fs.map)return;fs.rt={};
  const st=famRtState();
  for(const r of (typeof ROUTES!=="undefined"?ROUTES:[])){
    const geo=typeof ROUTEGEO!=="undefined"&&ROUTEGEO[r.id],latlngs=geo&&geo.length?geo:famRoutePts(r);
    const line=L.polyline(latlngs,{color:RTCOL[r.id]||"#555",weight:4,opacity:.8,pane:"routes",interactive:false,lineJoin:"round",lineCap:"round"});
    fs.rt[r.id]=line;if(st[r.id])line.addTo(fs.map);
  }
  famRtLegend();
}
function famRtApply(st){
  st=st||famRtState();famRtSave(st);
  for(const[id,line]of Object.entries(fs.rt||{})){if(st[id]){if(!fs.map.hasLayer(line))line.addTo(fs.map)}else if(fs.map.hasLayer(line))fs.map.removeLayer(line)}
  document.querySelectorAll(".rtleg input[data-rt]").forEach(i=>{i.checked=!!st[i.dataset.rt]});
}
function famRtLegend(){
  if(!fs.map||fs.leg)return;
  const C=L.Control.extend({options:{position:"bottomleft"},onAdd(){
    const d=L.DomUtil.create("div","rtleg");
    L.DomEvent.disableClickPropagation(d);L.DomEvent.disableScrollPropagation(d);
    const st=famRtState();
    d.innerHTML=`<div class="rtleg-h">מסלולים <button type="button" class="rtall">הכול</button> <button type="button" class="rtnone">הסתר</button></div>`+
      (typeof ROUTES!=="undefined"?ROUTES:[]).map(r=>`<label><input type="checkbox" data-rt="${r.id}" ${st[r.id]?"checked":""}><i style="background:${RTCOL[r.id]}"></i>${RTLBL[r.id]||r.n}</label>`).join("");
    d.querySelectorAll("input").forEach(inp=>{inp.onchange=()=>{const s=famRtState();s[inp.dataset.rt]=inp.checked?1:0;famRtApply(s)}});
    d.querySelector(".rtall").onclick=()=>famRtApply({old:1,ctr:1,north:1,mtsk:1});
    d.querySelector(".rtnone").onclick=()=>famRtApply({old:0,ctr:0,north:0,mtsk:0});
    return d;
  }});
  fs.leg=new C();fs.map.addControl(fs.leg);
}
function famToggleFull(on){
  const el=$("#fmap");if(!el||!fs.map){document.body.classList.remove("fmap-on");return}
  if(on==null)on=!el.classList.contains("fmap-full");
  el.classList.toggle("fmap-full",on);document.body.classList.toggle("fmap-on",on);
  const b=el.querySelector(".fmap-xbtn");
  if(b){b.textContent=on?"✕":"⛶";b.title=on?"חזרה לגודל רגיל":"מסך מלא";b.setAttribute("aria-label",b.title)}
  const tick=()=>{if(fs.map){fs.map.invalidateSize();famSpreadMarkers()}};
  setTimeout(tick,80);setTimeout(tick,320);
}
function famAddExpand(){
  if(!fs.map||fs.xctl)return;
  const C=L.Control.extend({options:{position:"topright"},onAdd(){
    const d=L.DomUtil.create("div","leaflet-bar fmap-x");
    d.innerHTML=`<a class="fmap-xbtn" href="#" role="button" title="מסך מלא" aria-label="מסך מלא">⛶</a>`;
    L.DomEvent.disableClickPropagation(d);
    d.querySelector("a").onclick=e=>{e.preventDefault();famToggleFull()};
    return d;
  }});
  fs.xctl=new C();fs.map.addControl(fs.xctl);
  if(!fs.xesc){fs.xesc=e=>{if(e.key=="Escape")famToggleFull(false)};document.addEventListener("keydown",fs.xesc)}
}
