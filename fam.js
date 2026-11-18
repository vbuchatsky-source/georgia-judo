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
function hereStart(){
  if(!navigator.geolocation){fs.hereErr="המיקום לא זמין במכשיר הזה";famHereDraw();famRender();return}
  if(fs.watch==null){
    fs.watch=navigator.geolocation.watchPosition(famOnPos,e=>{
      fs.hereErr=e.code==1?"הגישה למיקום נחסמה – אפשר לאשר בהגדרות הדפדפן":"המיקום לא זמין כרגע";
      if(!fs.paused)fs.status="off";
      famPill();famHereDraw();famRender();
    },{enableHighAccuracy:true,maximumAge:1e3,timeout:20e3});
  }
  compassStart();
}
function hereStop(){if(fs.watch!=null){navigator.geolocation.clearWatch(fs.watch);fs.watch=null}compassStop()}
function headingDelta(a,b){let d=b-a;while(d>180)d-=360;while(d<-180)d+=360;return d}
function headingSmooth(prev,next){
  if(!isFinite(next))return prev;if(!isFinite(prev))return next;
  const d=headingDelta(prev,next),ad=Math.abs(d);
  if(ad<2)return prev;
  if(ad>=12)return(prev+d+360)%360;
  return(prev+.75*d+360)%360;
}
function headingFromOri(e){
  if(e&&typeof e.webkitCompassHeading=="number"&&isFinite(e.webkitCompassHeading))return(e.webkitCompassHeading+360)%360;
  if(e&&isFinite(e.alpha)){let h=360-e.alpha;const ang=(screen.orientation&&isFinite(screen.orientation.angle)?screen.orientation.angle:(typeof window.orientation=="number"?window.orientation:0));return(h+ang+360)%360}
  return NaN;
}
function compassNeedsAsk(){return typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function"&&!fs.compassGranted}
function compassOnOri(e){
  if(e.type=="deviceorientationabsolute")fs.gotAbs=1;
  else if(fs.gotAbs&&!(typeof e.webkitCompassHeading=="number"&&isFinite(e.webkitCompassHeading)))return;
  const h=headingFromOri(e);if(!isFinite(h))return;
  fs._rawH=h;fs.compassAt=Date.now();
  if(!fs._hRaf)fs._hRaf=requestAnimationFrame(headingPaint);
}
function headingPaint(){
  fs._hRaf=0;const raw=fs._rawH;if(!isFinite(raw))return;
  fs.heading=headingSmooth(fs.heading,raw);headingApply();
}
function headingApply(){
  if(!isFinite(fs.heading))return;
  if(!fs.hereBeam&&fs.hereMk){const root=fs.hereMk.getElement();if(root){fs.hereWrap=root.querySelector(".here-wrap");fs.hereBeam=root.querySelector(".here-beam")}}
  if(!fs.hereBeam)return;
  if(fs.hereWrap)fs.hereWrap.classList.add("has-h");
  fs.hereBeam.style.transform="rotate("+fs.heading.toFixed(1)+"deg)";
}
function compassBind(){
  if(fs.compassOn||typeof window.DeviceOrientationEvent=="undefined")return;
  fs.compassOn=1;fs.gotAbs=0;
  fs._onAbs=e=>compassOnOri(e);fs._onOri=e=>compassOnOri(e);
  window.addEventListener("deviceorientationabsolute",fs._onAbs,true);
  window.addEventListener("deviceorientation",fs._onOri,true);
}
function compassStop(){
  if(fs._hRaf){cancelAnimationFrame(fs._hRaf);fs._hRaf=0}
  if(!fs.compassOn)return;fs.compassOn=0;
  if(fs._onAbs)window.removeEventListener("deviceorientationabsolute",fs._onAbs,true);
  if(fs._onOri)window.removeEventListener("deviceorientation",fs._onOri,true);
  fs._onAbs=fs._onOri=null;
}
function compassStart(){
  if(document.hidden)return;
  if(compassNeedsAsk()){if($("#fmap"))famCompassPrompt(true);return}
  famCompassPrompt(false);compassBind();
}
async function compassAsk(){
  try{const r=await DeviceOrientationEvent.requestPermission();if(r=="granted"){fs.compassGranted=1;famCompassPrompt(false);compassBind()}else{fs.compassDenied=1;famCompassPrompt(false)}}
  catch(e){fs.compassDenied=1;famCompassPrompt(false)}
}
function famCompassPrompt(show){
  const map=$("#fmap");let b=$("#compassask");
  if(!show||!map){if(b)b.remove();return}
  if(b)return;
  b=document.createElement("button");b.id="compassask";b.type="button";b.className="compass-ask";b.textContent="הפעל מצפן 🧭";
  b.onclick=e=>{e.preventDefault();e.stopPropagation();compassAsk()};
  map.appendChild(b);
}
function famStart(){famEnsure();if(document.hidden){famStop();return}
  if(fs.me&&fs.room)famListen();
  hereStart();
  if(!fs.me||!fs.room||fs.paused){fs.status="off";famPill()}}
function famStop(){hereStop();if(fs.es){fs.es.close();fs.es=null}clearInterval(fs.poll);fs.poll=null;fs.status="off";famPill()}
async function famOnPos(p){
  const c=p.coords;
  fs.hereErr="";fs.here={la:c.latitude,lo:c.longitude,a:c.accuracy,t:Date.now(),spd:c.speed,gpsH:c.heading};
  const fresh=fs.compassAt&&Date.now()-fs.compassAt<1500;
  if(!fresh){const gh=c.heading,spd=c.speed;if(isFinite(gh)&&gh>=0&&isFinite(spd)&&spd>0.6)fs.heading=headingSmooth(fs.heading,gh)}
  famHereDraw();
  trkAdd(c.latitude,c.longitude,c.accuracy,Date.now());
  if(fs.follow)famFollowPan();
  if(fs.herePendingCenter){fs.herePendingCenter=0;famCenterMe()}
  if(fs.me&&!fs.paused){
    fs.err="";fs.status="on";famPill();
    const o={n:fs.me,la:+c.latitude.toFixed(5),lo:+c.longitude.toFixed(5),a:Math.round(c.accuracy),t:Date.now()};
    fs.mine=o;fs.pos[fs.me]=o;
    const moved=fs.lastSentPos?hav(fs.lastSentPos.la,fs.lastSentPos.lo,o.la,o.lo)*1000:1e9,age=Date.now()-fs.lastSent;
    if(!(Date.now()<fs.nextSend||age<FAM.sendEvery||(moved<15&&age<5*60e3))){
      fs.lastSent=Date.now();fs.lastSentPos=o;fs.nextSend=0;
      try{const r=await fetch(FAM.api+encodeURIComponent(fs.room),{method:"POST",body:await famEnc(o),cache:"no-store"});
        if(!r.ok){fs.err=r.status==429?"השרת עמוס כרגע, מנסה שוב בעוד כמה דקות":"לא הצלחתי לשלוח את המיקום (קוד "+r.status+")";fs.nextSend=Date.now()+(r.status==429?5*60e3:30e3)}}
      catch(e){fs.nextSend=Date.now()+15e3}}
  }
  famRender();
}
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
<div id="fmap"></div><div id="ferr"></div><div id="flist"></div><div id="slist"></div>
<div class="fbtns"><button class="btn alt" id="finv">📨 הזמנת המשפחה</button><button class="btn alt" id="fwho">🔄 החלפת משתמש</button></div>
<details class="more"><summary>ℹ️ מעקב גם כשהאפליקציה סגורה</summary><p>הקו האדום המקווקו במפה מראה איפה כבר הלכת, ונשמר בטלפון. הוא מתעדכן רק כשהאפליקציה פתוחה על המסך.</p><p>שיתוף המיקום עם המשפחה גם הוא רק כשהאפליקציה פתוחה (מתעדכן בערך כל דקה). למעקב ברקע לאורך כל היום – שתפו מיקום ב־Google Maps (או ב־Find My באייפון).</p>
<a class="btn alt" href="https://www.google.com/maps/@?share" target="_blank" rel="noopener">🗺️ שיתוף מיקום ב־Google Maps</a>
<a class="btn alt" href="https://support.google.com/maps/answer/7326816?hl=iw" target="_blank" rel="noopener">❓ איך משתפים מיקום ב־Google Maps</a>
<p class="sub">🔒 המיקומים מוצפנים בטלפון עם מפתח שנמצא רק בקישור ההזמנה, ונשמרים בשרת (ntfy.sh) עד 12 שעות. אל תשתפו את הקישור מחוץ למשפחה.</p></details>`}
function famInit(){if(!fs.room){$("#fcreate").onclick=famCreate;return}
  $("#fshare").onchange=e=>{localStorage.famPause=e.target.checked?"0":"1";if(fs.paused){fs.status="off";famPill()}else famStart();famRender()};
  $("#fwho").onclick=famPicker;
  $("#finv").onclick=async()=>{const u=famLink(),t="איפה כולם – פתחו את הקישור כדי לראות אחד את השני בטביליסי 🇬🇪\n"+u;
    if(navigator.share)try{await navigator.share({title:"איפה כולם",text:t});return}catch(e){if(e.name=="AbortError")return}
    location.href="https://wa.me/?text="+encodeURIComponent(t)};
  fs.map=null;fs.mk={};fs.pin={};fs.ln={};fs.pm=null;fs.spreadHooked=0;fs.leg=null;fs.xctl=null;fs.hctl=null;fs.sctl=null;fs.rt=null;fs.popHooked=0;fs.hereMk=null;fs.hereAcc=null;fs.hereBeam=null;fs.hereWrap=null;fs.sm=null;fs.so=null;fs.saveHooked=0;fs.followHooked=0;fs.trkLines=null;
  famLeaflet().then(()=>{if(!$("#fmap"))return;fs.map=L.map("fmap",{zoomControl:false,attributionControl:true}).setView([HOTEL.lat,HOTEL.lng],14);
    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png",{maxZoom:21,maxNativeZoom:19,attribution:"© OpenStreetMap"}).addTo(fs.map);
    if(!fs.map.getPane("routes")){const pn=fs.map.createPane("routes");pn.style.zIndex=350;pn.style.pointerEvents="none"}
    if(!fs.map.getPane("track")){const tn=fs.map.createPane("track");tn.style.zIndex=380;tn.style.pointerEvents="none"}
    L.marker([HOTEL.lat,HOTEL.lng],{icon:L.divIcon({className:"",html:`<div class="fmk" style="--c:#7a2e1d">🏨</div>`,iconSize:[36,36],iconAnchor:[18,18]}),zIndexOffset:50}).addTo(fs.map).bindTooltip("המלון");
    const cpop=`<div class="ppop"><b>🥋 מחנה האימונים</b><p class="sub" dir="ltr" style="text-align:right">${CAMP.e}</p><a class="btn" href="${typeof nav==="function"?nav(CAMP,"driving"):"https://www.google.com/maps/dir/?api=1&destination="+CAMP.lat+","+CAMP.lng+"&travelmode=driving"}" target="_blank" rel="noopener">🧭 ניווט</a></div>`;
    L.marker([CAMP.lat,CAMP.lng],{icon:L.divIcon({className:"",html:`<div class="fmk" style="--c:#1a5c3a">🥋</div>`,iconSize:[36,36],iconAnchor:[18,18]}),zIndexOffset:60}).addTo(fs.map).bindTooltip("🥋 מחנה האימונים",{permanent:true,direction:"bottom",offset:[0,16],className:"camp-tip",opacity:1}).bindPopup(cpop,{className:"fam-pop",closeButton:true,autoPan:true,maxWidth:240,minWidth:220,autoPanPadding:[16,56]});
    famRouteLines();trkDraw();famPlaceMarkers();famAddExpand();famAddHereCtl();famHookFollow();famFollowSet(true);famHookPopups();famHookSaveMap();savMarkers();
    if(fs.here){fs.herePendingCenter=0;fs.map.setView([fs.here.la,fs.here.lo],17)}else fs.herePendingCenter=1;
    famHereDraw();compassStart();if(navigator.onLine!==false)savFillMissing();
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
  for(const[n,e,c]of FAM.people){if(n==fs.me&&fs.here)continue;const o=fs.pos[n];if(!o)continue;const pt=fs.map.latLngToLayerPoint(L.latLng(o.la,o.lo));items.push({n,c,la:o.la,lo:o.lo,x:pt.x,y:pt.y})}
  const pos=famSpreadPts(items,FAM_MINPX);
  if(fs.here){
    const hp=fs.map.latLngToLayerPoint(L.latLng(fs.here.la,fs.here.lo)),minD=FAM_MINPX;
    for(const it of items){const d=pos[it.n];if(!d)continue;const dx=d.x-hp.x,dy=d.y-hp.y,dist=Math.hypot(dx,dy)||0.01;if(dist<minD){const s=minD/dist;d.x=hp.x+dx*s;d.y=hp.y+dy*s}}
  }
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
  }else if(p.ico){gal=`<div class="popico">${p.ico}</div>`}
  const href=typeof nav=="function"?nav(p):"https://www.google.com/maps/dir/?api=1&destination="+p.lat+","+p.lng+"&travelmode=driving";
  const wa=p.wa?`<a class="btn alt" href="${p.wa}" target="_blank" rel="noopener">💬 WhatsApp</a>`:"";
  return `<div class="ppop">${gal}<b>${name}</b><a class="btn" href="${href}" target="_blank" rel="noopener">🧭 ניווט</a>${wa}</div>`;
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
    const src=ph[0]&&ph[0][0],ico=p.ico||(p.k=="r"?"🍽️":p.k=="s"?"👟":"📍");
    const html=src?`<div class="pmk"><img src="${src}" alt=""></div>`:`<div class="pmk fb">${ico}</div>`;
    const mk=L.marker([p.lat,p.lng],{icon:L.divIcon({className:"pmid",html,iconSize:[32,32],iconAnchor:[16,16]}),zIndexOffset:-100,riseOnHover:true}).addTo(fs.map);
    mk.bindTooltip(p.n,{permanent:true,direction:"bottom",offset:[0,6],className:"plab-tip",opacity:1});
    mk.bindPopup(famPlacePopup(p,i),{className:"fam-pop",closeButton:true,autoPan:true,maxWidth:240,minWidth:220,autoPanPadding:[16,56]});
    fs.pm.push(mk);
  }
  fs.map.on("zoomend",setLabs);setLabs();
}
function famRender(){const el=$("#flist");if(!el)return;
  const errs=[fs.hereErr,fs.err].filter(Boolean);
  $("#ferr").innerHTML=errs.map(x=>`<p class="warn">${x}</p>`).join("");
  const me=fs.here||fs.mine;const rows=FAM.people.map(([n,e,c])=>{const o=n==fs.me&&fs.here?{la:fs.here.la,lo:fs.here.lo,t:fs.here.t}:fs.pos[n];
    if(!o)return `<div class="frow none"><span class="fav" style="--c:#bbb">${e}</span><div class="fi"><b>${n}</b><span class="sub">עוד לא שיתף מיקום</span></div></div>`;
    const stale=Date.now()-o.t>FAM.staleMin*60e3,isMe=n==fs.me,dh=hav(HOTEL.lat,HOTEL.lng,o.la,o.lo);
    const dm=me&&!isMe?" · ממני "+kmTxt(hav(me.la,me.lo,o.la,o.lo)):"";
    return `<div class="frow${stale?" stale":""}"><span class="fav" style="--c:${stale?"#aaa":c}">${e}</span><div class="fi"><b>${n}${isMe?" (אני)":""}</b><span class="sub">${ago(o.t)}${dm} · מהמלון ${kmTxt(dh)}</span></div>${isMe?"":`<a class="ib" href="https://www.google.com/maps/dir/?api=1&destination=${o.la},${o.lo}&travelmode=walking" target="_blank" rel="noopener" aria-label="נווט אליו">🧭</a>`}</div>`}).join("");
  el.innerHTML=`<div class="flist">${rows}</div>`;
  if(fs.map){const pts=[[HOTEL.lat,HOTEL.lng],[CAMP.lat,CAMP.lng]];for(const[n,e,c]of FAM.people){const o=fs.pos[n];if(!o)continue;
      if(n==fs.me&&fs.here){if(fs.mk[n]){fs.mk[n].remove();delete fs.mk[n]}if(fs.pin[n]){fs.pin[n].remove();delete fs.pin[n]}if(fs.ln[n]){fs.ln[n].remove();delete fs.ln[n]}continue}
      const stale=Date.now()-o.t>FAM.staleMin*60e3;
      const ic=L.divIcon({className:"",html:`<div class="fmk${stale?" stale":""}" style="--c:${c}">${e}</div>`,iconSize:[38,38],iconAnchor:[19,19]});
      if(fs.mk[n])fs.mk[n].setIcon(ic);else fs.mk[n]=L.marker([o.la,o.lo],{icon:ic,zIndexOffset:200}).addTo(fs.map).bindTooltip(n);pts.push([o.la,o.lo])}
    if(fs.here)pts.push([fs.here.la,fs.here.lo]);
    if(fs.fit&&pts.length>1){if(!(fs.follow&&fs.here))fs.map.fitBounds(pts,{padding:[40,40],maxZoom:16});fs.fit=false}
    famHereDraw();famSpreadMarkers()}
  savRender()}
setInterval(()=>{if(location.hash=="#fam"&&!document.hidden)famRender()},30e3);
const RTCOL={old:"#6d4c41",ctr:"#c62828",north:"#2f9e44",mtsk:"#8e24aa",fort:"#e53935",river:"#1e88e5",lanes:"#43a047",solo:"#fb8c00"};
const RTLBL={old:"עיר עתיקה",ctr:"מרכז",north:"כרוניקה",mtsk:"מצחטה",fort:"מבצר ונוף",river:"נהר וגשרים",lanes:"סמטאות ומרחצאות",solo:"סולולאקי וחירות"};
function famRtIds(){return(typeof ROUTES!=="undefined"?ROUTES:[]).map(r=>r.id)}
function famRtLoad(){try{return JSON.parse(localStorage.georgiaRt||"")}catch(e){return null}}
function famRtSave(st){try{localStorage.georgiaRt=JSON.stringify(st)}catch(e){}}
function famRtState(){const ids=famRtIds(),d={};for(const id of ids)d[id]=1;d.old=0;
  const s=famRtLoad();
  if(s&&typeof s=="object"){const has=["fort","river","lanes","solo"].some(k=>k in s);for(const k of ids)if(k in s)d[k]=s[k]?1:0;if(!has){d.old=0;d.fort=1;d.river=1;d.lanes=1;d.solo=1}}
  return d}
function famRoutePts(r){const pts=r.stops.map(s=>[PLACES[s.i].lat,PLACES[s.i].lng]);
  if(r.loop){const a=pts[0];if(a&&(pts[pts.length-1][0]!==a[0]||pts[pts.length-1][1]!==a[1]))pts.push(a);return pts}
  return[[HOTEL.lat,HOTEL.lng],...pts,[HOTEL.lat,HOTEL.lng]]}
function trkLoad(){try{const o=JSON.parse(localStorage.georgiaTrack||"");if(o&&Array.isArray(o.segs))return o}catch(e){}return{v:1,segs:[]}}
function trkSave(data){try{localStorage.georgiaTrack=JSON.stringify(data)}catch(e){try{trkPrune(data,2500);localStorage.georgiaTrack=JSON.stringify(data)}catch(e2){}}}
function trkOn(){try{return localStorage.georgiaTrackOn!="0"}catch(e){return true}}
function trkOnSet(on){try{localStorage.georgiaTrackOn=on?"1":"0"}catch(e){}}
function trkPrune(data,cap){
  cap=cap||5000;const cut=Date.now()-7*864e5;
  data.segs=(data.segs||[]).map(seg=>seg.filter(p=>p&&isFinite(p[0])&&isFinite(p[1])&&p[2]>=cut)).filter(seg=>seg.length);
  let n=data.segs.reduce((s,seg)=>s+seg.length,0);
  while(n>cap&&data.segs.length){const need=n-cap,drop=Math.min(data.segs[0].length,need);data.segs[0].splice(0,drop);n-=drop;if(!data.segs[0].length)data.segs.shift()}
}
function trkAdd(la,lo,acc,t){
  t=t||Date.now();
  if(!isFinite(la)||!isFinite(lo))return;
  if(!(acc>0)||acc>40)return;
  const data=trkLoad(),segs=data.segs,pt=[+la.toFixed(6),+lo.toFixed(6),t];
  let mode="new";
  if(segs.length){const last=segs[segs.length-1],prev=last[last.length-1],dt=t-prev[2],dist=hav(prev[0],prev[1],pt[0],pt[1])*1000;
    if(dt>10*60e3||dist>300)segs.push([pt]);
    else if(dist<8)return;
    else{last.push(pt);mode="append"}}
  else segs.push([pt]);
  trkPrune(data);trkSave(data);trkTouch(mode);
}
function trkClear(){trkSave({v:1,segs:[]});trkDraw()}
function trkLineStyle(){return{color:"#e53935",weight:4,opacity:.9,dashArray:"6 8",pane:"track",interactive:false,lineJoin:"round",lineCap:"round"}}
function trkDraw(){
  if(!fs.map)return;
  (fs.trkLines||[]).forEach(l=>l.remove());fs.trkLines=[];
  if(!trkOn())return;
  for(const seg of trkLoad().segs){
    if(!seg||seg.length<2)continue;
    const line=L.polyline(seg.map(p=>[p[0],p[1]]),trkLineStyle());
    line.addTo(fs.map);fs.trkLines.push(line);
  }
}
function trkTouch(mode){
  if(!fs.map||!trkOn())return;
  const segs=trkLoad().segs,last=segs[segs.length-1];
  if(mode=="append"&&fs.trkLines&&fs.trkLines.length&&last&&last.length>=2){
    const line=fs.trkLines[fs.trkLines.length-1];
    if(fs.trkLines.length===segs.filter(s=>s.length>=2).length){line.setLatLngs(last.map(p=>[p[0],p[1]]));return}
  }
  trkDraw();
}
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
function famRtOpen(){try{return localStorage.georgiaRtOpen!="0"}catch(e){return true}}
function famRtOpenSet(on){try{localStorage.georgiaRtOpen=on?"1":"0"}catch(e){}}
function famRtLegend(){
  if(!fs.map||fs.leg)return;
  const C=L.Control.extend({options:{position:"bottomleft"},onAdd(){
    const d=L.DomUtil.create("div","rtleg");
    d.setAttribute("dir","rtl");
    L.DomEvent.disableClickPropagation(d);L.DomEvent.disableScrollPropagation(d);
    const st=famRtState(),open=famRtOpen();
    d.classList.toggle("closed",!open);
    d.innerHTML=`<div class="rtleg-h"><button type="button" class="rtleg-tog" aria-expanded="${open?"true":"false"}" aria-label="מסלולים">מסלולים <span class="chev">${open?"▴":"▾"}</span></button>`+
      `<button type="button" class="rtall">הכול</button><button type="button" class="rtnone">הסתר</button></div>`+
      `<div class="rtleg-b">`+
      (typeof ROUTES!=="undefined"?ROUTES:[]).map(r=>`<label><input type="checkbox" data-rt="${r.id}" ${st[r.id]?"checked":""}><i style="background:${RTCOL[r.id]}"></i>${RTLBL[r.id]||r.n}</label>`).join("")+
      `<div class="trkrow"><label><input type="checkbox" data-trk ${trkOn()?"checked":""}><i class="trkdash"></i>המסלול שלי</label><button type="button" class="trkclr">נקה מסלול</button></div></div>`;
    d.querySelectorAll("input[data-rt]").forEach(inp=>{inp.onchange=()=>{const s=famRtState();s[inp.dataset.rt]=inp.checked?1:0;famRtApply(s)}});
    const trk=d.querySelector("input[data-trk]");
    if(trk)trk.onchange=()=>{trkOnSet(trk.checked);trkDraw()};
    const clr=d.querySelector(".trkclr");
    if(clr)clr.onclick=()=>{if(confirm("למחוק את הקו האדום של המסלול שעברת?"))trkClear()};
    d.querySelector(".rtall").onclick=()=>famRtApply(Object.fromEntries(famRtIds().map(id=>[id,1])));
    d.querySelector(".rtnone").onclick=()=>famRtApply(Object.fromEntries(famRtIds().map(id=>[id,0])));
    const tog=d.querySelector(".rtleg-tog");
    tog.onclick=()=>{const on=d.classList.contains("closed");d.classList.toggle("closed",!on);tog.setAttribute("aria-expanded",on?"true":"false");tog.querySelector(".chev").textContent=on?"▴":"▾";famRtOpenSet(on)};
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

function famHereDraw(){
  if(!fs.map)return;
  const h=fs.here;
  if(!h||!isFinite(h.la)){
    if(fs.hereMk){fs.hereMk.remove();fs.hereMk=null}fs.hereBeam=fs.hereWrap=null;
    if(fs.hereAcc){fs.hereAcc.remove();fs.hereAcc=null}
    return;
  }
  const ll=L.latLng(h.la,h.lo),acc=Math.max(h.a||0,8);
  if(!fs.hereAcc)fs.hereAcc=L.circle(ll,{radius:acc,weight:1,color:"#1a73e8",opacity:.35,fillColor:"#1a73e8",fillOpacity:.14,interactive:false}).addTo(fs.map);
  else fs.hereAcc.setLatLng(ll).setRadius(acc);
  const hasH=isFinite(fs.heading),deg=hasH?fs.heading.toFixed(1):0;
  const html=`<div class="here-wrap${hasH?" has-h":""}"><div class="here-beam" style="transform:rotate(${deg}deg)"></div><div class="here-dot"><i></i></div></div>`;
  if(!fs.hereMk){fs.hereBeam=fs.hereWrap=null;fs.hereMk=L.marker(ll,{icon:L.divIcon({className:"here-ico",html,iconSize:[88,88],iconAnchor:[44,44]}),zIndexOffset:400,interactive:false,keyboard:false}).addTo(fs.map)}
  else fs.hereMk.setLatLng(ll);
  headingApply();
}
function famFollowSet(on){
  fs.follow=!!on;
  const b=document.querySelector(".fmap-herebtn");
  if(b){b.classList.toggle("on",fs.follow);b.title=fs.follow?"עוקב אחריך":"הצג אותי";b.setAttribute("aria-label",b.title)}
}
function famFollowPan(){
  if(!fs.follow||!fs.map||!fs.here)return;
  const c=fs.map.getCenter(),d=hav(c.lat,c.lng,fs.here.la,fs.here.lo)*1000;
  if(d>3)fs.map.panTo([fs.here.la,fs.here.lo],{animate:d>20,duration:.3});
}
function famHookFollow(){
  if(!fs.map||fs.followHooked)return;fs.followHooked=1;
  fs.map.on("dragstart",()=>famFollowSet(false));
}
function famCenterMe(){
  hereStart();
  famFollowSet(true);
  if(fs.here&&fs.map){fs.herePendingCenter=0;fs.map.setView([fs.here.la,fs.here.lo],Math.max(fs.map.getZoom(),17));return}
  fs.herePendingCenter=1;
  if(fs.hereErr)famRender();
}
function famAddHereCtl(){
  if(!fs.map||fs.hctl)return;
  const C=L.Control.extend({options:{position:"topright"},onAdd(){
    const d=L.DomUtil.create("div","leaflet-bar fmap-here");
    d.innerHTML=`<a class="fmap-herebtn" href="#" role="button" title="הצג אותי" aria-label="הצג אותי">📍</a>`;
    L.DomEvent.disableClickPropagation(d);
    d.querySelector("a").onclick=e=>{e.preventDefault();famCenterMe()};
    return d;
  }});
  fs.hctl=new C();fs.map.addControl(fs.hctl);
  if(fs.sctl)return;
  const S=L.Control.extend({options:{position:"topright"},onAdd(){
    const d=L.DomUtil.create("div","leaflet-bar fmap-sav");
    d.innerHTML=`<a class="fmap-savbtn" href="#" role="button" title="סמן מקום" aria-label="סמן מקום">⭐</a>`;
    L.DomEvent.disableClickPropagation(d);
    d.querySelector("a").onclick=e=>{e.preventDefault();savFromHere()};
    return d;
  }});
  fs.sctl=new S();fs.map.addControl(fs.sctl);
}

function savLoad(){try{const a=JSON.parse(localStorage.georgiaSaved||"[]");return Array.isArray(a)?a.filter(s=>s&&isFinite(s.la)&&isFinite(s.lo)):[]}catch(e){return[]}}
function savStore(a){try{localStorage.georgiaSaved=JSON.stringify(a)}catch(e){}}
function savNameDefault(prefix){
  const d=new Date(),pad=n=>String(n).padStart(2,"0");
  return `${prefix||"מקום"} ${d.getDate()}.${d.getMonth()+1} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function savWhen(t){const d=new Date(t),pad=n=>String(n).padStart(2,"0");return `${d.getDate()}.${d.getMonth()+1} · ${pad(d.getHours())}:${pad(d.getMinutes())}`}
function savDist(s){const h=fs.here||fs.mine;return h?"ממני "+kmTxt(hav(h.la,h.lo,s.la,s.lo)):"מחכה למיקום"}
function savMode(s){const h=fs.here||fs.mine;return h&&hav(h.la,h.lo,s.la,s.lo)<=3?"walking":"driving"}
function savNav(s){return "https://www.google.com/maps/dir/?api=1&destination="+s.la+","+s.lo+"&travelmode="+savMode(s)}
function savIsDefaultName(n){return /^(מקום|נקודה)\s+\d/.test(n||"")}
function savDlg(title,val){
  return new Promise(ok=>{
    const prev=$("#savdlg");if(prev)prev.remove();
    const d=document.createElement("div");d.id="savdlg";
    d.innerHTML=`<div class="savin"><h2>${esc(title)}</h2><input id="savname" maxlength="80" dir="rtl" value="${esc(val)}"><div class="fbtns"><button type="button" class="btn" id="savok">שמירה</button><button type="button" class="btn alt" id="savcx">ביטול</button></div></div>`;
    document.body.appendChild(d);
    const inp=$("#savname");inp.focus();inp.select();
    const done=v=>{d.remove();ok(v)};
    $("#savok").onclick=()=>done(inp.value.trim());
    $("#savcx").onclick=()=>done(null);
    d.addEventListener("click",e=>{if(e.target===d)done(null)});
    inp.onkeydown=e=>{if(e.key=="Enter"){e.preventDefault();done(inp.value.trim())}if(e.key=="Escape")done(null)};
  });
}

function savFetch(url,opts,ms){
  const ac=new AbortController(),t=setTimeout(()=>ac.abort(),ms||6500);
  return fetch(url,Object.assign({signal:ac.signal},opts||{})).finally(()=>clearTimeout(t));
}
function savOvQuery(la,lo){
  const a=`(around:500,${la},${lo})`;
  return `[out:json][timeout:6];(
  nwr["name"]["shop"~"^(mall|department_store|supermarket)$"]${a};
  nwr["name"]["tourism"~"^(attraction|museum|hotel|gallery|theme_park|zoo|castle)$"]${a};
  nwr["name"]["historic"]${a};
  nwr["name"]["amenity"~"^(place_of_worship|cinema|theatre|marketplace|university|college|hospital|townhall|bus_station)$"]${a};
  nwr["name"]["railway"~"^(station|halt|subway_entrance)$"]${a};
  nwr["name"]["station"="subway"]${a};
  nwr["name"]["public_transport"="station"]${a};
  nwr["name"]["leisure"~"^(park|garden|stadium|sports_centre)$"]${a};
  nwr["name"]["place"="square"]${a};
);out center tags;`;
}
function savLmName(t){
  const n=t["name:he"]||t["name:en"]||t.int_name||t.name||t.brand||"";
  return String(n).trim();
}
function savLmKind(t){
  if(t.shop==="mall"||t.shop==="department_store")return"mall";
  if(/^(attraction|museum|gallery|theme_park|zoo|castle)$/.test(t.tourism||""))return"sight";
  if(t.historic)return"historic";
  if(t.railway==="station"||t.railway==="halt"||t.station==="subway"||t.public_transport==="station")return"station";
  if(t.railway==="subway_entrance")return"metro";
  if(t.place==="square")return"square";
  if(t.amenity==="place_of_worship")return"church";
  if(t.tourism==="hotel")return"hotel";
  if(t.leisure==="park"||t.leisure==="garden")return"park";
  if(t.leisure==="stadium"||t.leisure==="sports_centre")return"sport";
  if(t.shop==="supermarket")return"shop";
  if(t.amenity)return t.amenity;
  return"place";
}
function savLmCat(t){
  const shop=t.shop,tour=t.tourism,am=t.amenity,rw=t.railway,lei=t.leisure;
  if(shop==="mall"||shop==="department_store")return 100;
  if(/^(attraction|museum|gallery|theme_park|zoo|castle)$/.test(tour||""))return 95;
  if(rw==="station"||rw==="halt"||t.station==="subway"||t.public_transport==="station")return 88;
  if(t.historic)return 85;
  if(t.place==="square")return 82;
  if(am==="place_of_worship")return 80;
  if(tour==="hotel")return 75;
  if(lei==="stadium")return 74;
  if(lei==="park"||lei==="garden")return 72;
  if(/^(cinema|theatre|marketplace|university|college|hospital|townhall|bus_station)$/.test(am||""))return 70;
  if(lei==="sports_centre")return 68;
  if(shop==="supermarket")return 65;
  if(rw==="subway_entrance")return 60;
  return 0;
}
function savLmScore(t,distM){
  const cat=savLmCat(t);if(!cat)return -1;
  let s=cat;
  if(t.wikidata||t.wikipedia||t["wikipedia:en"]||t["wikipedia:ka"]||t["wikipedia:he"])s+=40;
  if(t.brand||t["brand:wikidata"])s+=10;
  if(t.wikimedia_commons&&!/^Category:/i.test(t.wikimedia_commons))s+=25;
  else if(t.image)s+=20;
  return s-distM/20;
}
function savLmPhotoHints(t){
  const commons=t.wikimedia_commons||"",img=t.image||"";
  return{
    wd:t.wikidata||"",
    wp:t["wikipedia:en"]||t["wikipedia:he"]||t.wikipedia||t["wikipedia:ka"]||"",
    commons:/^Category:/i.test(commons)?"":commons,
    img:img
  };
}
function savLmFromOverpass(data,la,lo){
  const out=[],seen=new Set();
  for(const e of data.elements||[]){
    const t=e.tags||{},c=e.center||{},lat=c.lat??e.lat,lon=c.lon??e.lon;
    if(!isFinite(lat)||!isFinite(lon))continue;
    const n=savLmName(t);if(!n||n.length<2)continue;
    const d=hav(la,lo,lat,lon),distM=d*1000;
    if(distM>520)continue;
    const score=savLmScore(t,distM);if(score<0)continue;
    const key=n.toLowerCase()+"|"+Number(lat).toFixed(4)+"|"+Number(lon).toFixed(4);
    if(seen.has(key))continue;seen.add(key);
    out.push(Object.assign({n,la:+lat,lo:+lon,d,kind:savLmKind(t),score},savLmPhotoHints(t)));
  }
  const byName=new Map();
  for(const x of out){
    const k=x.n.toLowerCase(),prev=byName.get(k);
    if(!prev){byName.set(k,x);continue}
    const prevP=prev.score+(prev.d*1000)/20,p=x.score+(x.d*1000)/20,best=Math.max(prevP,p);
    const closer=x.d<prev.d?x:prev;
    closer.score=best-(closer.d*1000)/20;
    closer.kind=prev.score>x.score?prev.kind:x.kind;
    byName.set(k,closer);
  }
  return [...byName.values()].sort((a,b)=>b.score-a.score||a.d-b.d).slice(0,8);
}
function savLmFromNominatim(data,la,lo){
  if(!data)return[];
  const addr=data.address||{},nd=data.namedetails||{};
  let n=(nd["name:he"]||nd["name:en"]||nd.int_name||data.name||nd.name||"").trim();
  let kind="place",plat=isFinite(+data.lat)?+data.lat:la,plon=isFinite(+data.lon)?+data.lon:lo;
  let d=hav(la,lo,plat,plon);
  if(!n){
    const road=addr.road||addr.pedestrian||addr.footway||addr.square,house=addr.house_number;
    if(road){n=house?house+" "+road:road;kind="street";d=0}
    else{n=addr.neighbourhood||addr.suburb||"";kind="area";d=0}
  }
  if(!n)return[];
  return[{n,la:plat,lo:plon,d,kind,score:1}];
}
async function savLookup(la,lo){
  const body="data="+encodeURIComponent(savOvQuery(la,lo));
  const urls=["https://overpass-api.de/api/interpreter","https://overpass.kumi.systems/api/interpreter"];
  for(const url of urls){
    try{
      const r=await savFetch(url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body},6500);
      if(!r.ok)continue;
      const cands=savLmFromOverpass(await r.json(),la,lo);
      if(cands.length)return cands;
    }catch(e){}
  }
  try{
    const u="https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+la+"&lon="+lo+"&zoom=18&addressdetails=1&namedetails=1&accept-language=en";
    const r=await savFetch(u,{headers:{Accept:"application/json"}},5000);
    if(!r.ok)return[];
    return savLmFromNominatim(await r.json(),la,lo);
  }catch(e){return[]}
}
function savLmLabel(lm,snapped){
  if(!lm||!lm.n)return"";
  if(lm.kind==="street"||lm.kind==="area")return lm.n;
  if(snapped||!(lm.d>=0.04))return lm.n;
  return "ליד "+lm.n+" · "+kmTxt(lm.d);
}
function savLmSlim(x){return{n:x.n,la:x.la,lo:x.lo,d:x.d,kind:x.kind,wd:x.wd||"",wp:x.wp||"",commons:x.commons||"",img:x.img||"",ph:x.ph||""}}
function savCanSnap(lm){return !!(lm&&lm.kind!=="street"&&lm.kind!=="area"&&isFinite(lm.la)&&isFinite(lm.lo)&&lm.d<=0.2)}
function savApplyLm(id,cands){
  const a=savLoad(),s=a.find(x=>x.id===id);if(!s)return;
  if(!isFinite(s.ola)||!isFinite(s.olo)){s.ola=s.la;s.olo=s.lo}
  s.lmPending=0;s.lmTried=1;
  if(cands&&cands.length){
    s.lms=cands.slice(0,3).map(savLmSlim);
    s.lm=s.lms[0];
    if(s.auto!==0){s.n=savLmLabel(s.lm,!s.pinned&&savCanSnap(s.lm));s.auto=1}
    if(!s.pinned&&savCanSnap(s.lm)){s.la=s.lm.la;s.lo=s.lm.lo}
    s.ph=s.lm.ph||"";
  }
  savStore(a);savMarkers();savRender(true);
  if(s.lm&&!s.ph)savAttachPhoto(id);
}
async function savResolve(id,la,lo){
  const cands=await savLookup(la,lo);
  savApplyLm(id,cands);
}
function savFilePath(file){
  let f=String(file||"").trim();if(!f)return"";
  if(/^https:\/\/upload\.wikimedia\.org\//i.test(f))return f;
  if(/^https:\/\//i.test(f)&&/\.(jpe?g|png|gif|webp|svg)(\?|$)/i.test(f))return f.replace(/^http:\/\//i,"https://");
  f=f.replace(/^https?:\/\/commons\.wikimedia\.org\/wiki\/(Special:FilePath\/|File:)/i,"");
  f=f.replace(/^File:/i,"").replace(/_/g," ");
  if(!f||/^Category:/i.test(f)||/^https?:\/\//i.test(f))return"";
  return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(f.trim())+"?width=400";
}
function savSafePh(u){return /^https:\/\//i.test(u||"")?u:""}
async function savResolvePhoto(lm){
  if(!lm)return"";
  if(savSafePh(lm.ph))return lm.ph;
  const direct=savFilePath(lm.img)||savFilePath(lm.commons);
  if(direct){lm.ph=direct;return direct}
  const wd=String(lm.wd||"").split(/[/#]/).pop();
  if(/^Q\d+$/i.test(wd)){
    try{
      const r=await savFetch("https://www.wikidata.org/w/api.php?action=wbgetentities&ids="+encodeURIComponent(wd)+"&props=claims&format=json&origin=*",{headers:{Accept:"application/json"}},5000);
      if(r.ok){
        const d=await r.json(),file=((((d.entities||{})[wd]||{}).claims||{}).P18||[])[0];
        const name=file&&file.mainsnak&&file.mainsnak.datavalue&&file.mainsnak.datavalue.value;
        const u=savFilePath(name);if(u){lm.ph=u;return u}
      }
    }catch(e){}
  }
  let wp=lm.wp||"";
  if(wp){
    try{
      let lang="en",title=wp;
      const m=/^([a-z]{2,3}):(.+)$/i.exec(wp);
      if(m){lang=m[1].toLowerCase();title=m[2]}
      title=title.replace(/ /g,"_");
      const r=await savFetch("https://"+lang+".wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(title),{headers:{Accept:"application/json"}},5000);
      if(r.ok){
        const d=await r.json(),u=(d.thumbnail&&d.thumbnail.source)||(d.originalimage&&d.originalimage.source);
        if(savSafePh(u)){lm.ph=u;return u}
      }
    }catch(e){}
  }
  return"";
}
async function savAttachPhoto(id){
  const a=savLoad(),s=a.find(x=>x.id===id);if(!s||!s.lm||s.ph)return;
  const ph=await savResolvePhoto(s.lm);
  const b=savLoad(),x=b.find(z=>z.id===id);if(!x)return;
  x.phTried=1;
  if(ph){x.ph=ph;if(x.lm)x.lm.ph=ph;if(x.lms){const same=x.lms.find(m=>m.n===x.lm.n);if(same)same.ph=ph}}
  savStore(b);if(ph){savMarkers();savRender(true)}
}
function savFillMissing(){
  if(fs.savFilling||(typeof navigator!=="undefined"&&navigator.onLine===false))return;
  const all=savLoad();
  const pending=all.filter(s=>!s.lmTried&&!s.lmPending&&!s.lm);
  const needPh=all.filter(s=>s.lm&&!s.ph&&!s.phTried);
  if(!pending.length&&!needPh.length){
    let ch=0;for(const s of all){if(savMaybeSnap(s))ch=1}if(ch){savStore(all);savMarkers();savRender(true)}
    return;
  }
  fs.savFilling=1;
  (async()=>{
    for(const s of pending){
      const a=savLoad(),x=a.find(z=>z.id==s.id);if(!x||x.lmTried||x.lm)continue;
      x.lmPending=1;savStore(a);savRender(true);
      const from=isFinite(x.ola)?x.ola:x.la,fo=isFinite(x.olo)?x.olo:x.lo;
      await savResolve(s.id,from,fo);
    }
    for(const s of savLoad().filter(z=>z.lm&&!z.ph&&!z.phTried)){
      const a=savLoad(),x=a.find(z=>z.id==s.id);if(!x)continue;
      x.phTried=1;savStore(a);
      await savAttachPhoto(x.id);
    }
    const b=savLoad();let ch=0;for(const s of b){if(savMaybeSnap(s))ch=1}
    if(ch){savStore(b);savMarkers();savRender(true)}
    fs.savFilling=0;
  })();
}
function savMaybeSnap(s){
  if(s.pinned||!s.lm||!savCanSnap(s.lm))return false;
  if(!isFinite(s.ola)||!isFinite(s.olo)){s.ola=s.la;s.olo=s.lo}
  if(s.la===s.lm.la&&s.lo===s.lm.lo)return false;
  s.la=s.lm.la;s.lo=s.lm.lo;return true;
}

let savLast=0;
function savAskAt(la,lo,prefix){
  if(Date.now()-savLast<800)return;savLast=Date.now();
  const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const a=savLoad();
  a.unshift({id,n:savNameDefault(prefix),la:+la,lo:+lo,ola:+la,olo:+lo,t:Date.now(),auto:1,lmPending:1});
  savStore(a);savMarkers();savRender(true);
  savResolve(id,+la,+lo);
}
function savFromHere(){
  hereStart();
  if(fs.here){savAskAt(fs.here.la,fs.here.lo,"מקום");return}
  if(fs.hereErr){famRender();return}
  if(fs.savWait)clearInterval(fs.savWait);
  const started=Date.now();
  fs.savWait=setInterval(()=>{
    if(fs.here){clearInterval(fs.savWait);fs.savWait=null;savAskAt(fs.here.la,fs.here.lo,"מקום")}
    else if(Date.now()-started>12e3){clearInterval(fs.savWait);fs.savWait=null;if(!fs.hereErr)fs.hereErr="לא הצלחתי לקבל מיקום. אפשר ללחוץ לחיצה ארוכה על המפה.";famRender()}
  },300);
}
async function savRename(id){
  const a=savLoad(),s=a.find(x=>x.id==id);if(!s)return;
  const name=await savDlg("שם חדש",s.n);if(name==null||!name)return;
  s.n=name;s.auto=0;savStore(a);savMarkers();savRender(true);
}
function savDelete(id){
  const a=savLoad(),s=a.find(x=>x.id==id);if(!s)return;
  if(!confirm("למחוק את «"+s.n+"»?"))return;
  savStore(a.filter(x=>x.id!=id));savMarkers();savRender(true);
}
function savPick(id){
  const a=savLoad(),s=a.find(x=>x.id==id);if(!s)return;
  const go=()=>{
    const cur=savLoad().find(x=>x.id==id);
    if(!cur||!cur.lms||!cur.lms.length){if(!cur||cur.lmTried)alert("לא מצאתי מקום מוכר באזור");return}
    const prev=$("#savdlg");if(prev)prev.remove();
    const d=document.createElement("div");d.id="savdlg";
    d.innerHTML=`<div class="savin"><h2>מקום מוכר באזור</h2><p class="sub">בחרו את השם שיופיע על הסימון.</p>`+
      cur.lms.map((lm,i)=>`<button type="button" class="btn alt savpick" data-i="${i}">${esc(savLmLabel(lm))}</button>`).join("")+
      `<div class="fbtns"><button type="button" class="btn alt" id="savcx">ביטול</button></div></div>`;
    document.body.appendChild(d);
    d.querySelectorAll(".savpick").forEach(b=>b.onclick=()=>{
      const i=+b.dataset.i,all=savLoad(),x=all.find(z=>z.id==id);
      d.remove();if(!x||!x.lms||!x.lms[i])return;
      x.lm=x.lms[i];x.pinned=0;x.ph=x.lm.ph||"";
      if(savCanSnap(Object.assign({},x.lm,{d:0}))||(x.lm.kind!=="street"&&x.lm.kind!=="area"&&isFinite(x.lm.la))){x.la=x.lm.la;x.lo=x.lm.lo}
      x.n=savLmLabel(x.lm,true);x.auto=0;
      savStore(all);savMarkers();savRender(true);
      if(x.lm&&!x.ph)savAttachPhoto(id);
    });
    $("#savcx").onclick=()=>d.remove();
    d.addEventListener("click",e=>{if(e.target===d)d.remove()});
  };
  if(s.lms&&s.lms.length){go();return}
  s.lmPending=1;savStore(a);savRender(true);
  savResolve(s.id,s.la,s.lo).then(go);
}
function savLmSub(s){
  if(s.lmPending)return `<span class="sub lmwip">מחפש מקום מוכר באזור…</span>`;
  if(!s.lm)return"";
  if(s.n&&s.n.indexOf(s.lm.n)>=0)return"";
  const dist=s.lm.d>=0.04?" · "+kmTxt(s.lm.d):"";
  return `<span class="sub lmline">ליד ${esc(s.lm.n)}${dist}</span>`;
}
function savPhImg(s,cls){
  const u=savSafePh(s.ph||(s.lm&&s.lm.ph));if(!u)return"";
  return `<img class="${cls}" src="${esc(u)}" alt="" referrerpolicy="no-referrer" onerror="this.onerror=null;const p=this.parentNode;this.remove();if(p&&p.classList&&p.classList.contains('savico')&&!p.querySelector('img'))p.textContent='⭐'">`;
}
function savPopup(s){
  const ph=savPhImg(s,"savph");
  const lm=s.lm?`<p class="sub">${s.n&&s.n.indexOf(s.lm.n)>=0?esc(s.lm.n)+(s.lm.d>=0.04?" · "+kmTxt(s.lm.d):""):"ליד "+esc(s.lm.n)+(s.lm.d>=0.04?" · "+kmTxt(s.lm.d):"")}</p>`:s.lmPending?`<p class="sub lmwip">מחפש מקום מוכר באזור…</p>`:"";
  const pick=s.lms&&s.lms.length>1?`<button type="button" class="btn alt" onclick="savPick('${s.id}')">בחירה אחרת</button>`:"";
  return `<div class="ppop">${ph}<b>⭐ ${esc(s.n)}</b><p class="sub">${savWhen(s.t)}</p>${lm}<a class="btn" href="${savNav(s)}" target="_blank" rel="noopener">🧭 ניווט</a>${pick}<button type="button" class="btn alt savdel" onclick="savDelete('${s.id}')">🗑 מחיקה</button></div>`;
}
function savDragEnd(id,la,lo){
  const a=savLoad(),s=a.find(x=>x.id==id);if(!s)return;
  if(!isFinite(s.ola)||!isFinite(s.olo)){s.ola=s.la;s.olo=s.lo}
  s.la=+la;s.lo=+lo;s.pinned=1;s.lmPending=1;s.lmTried=0;s.ph="";s.phTried=0;
  savStore(a);savMarkers();savRender(true);
  savResolve(id,+la,+lo);
}
function savMarkers(){
  if(!fs.map)return;
  (fs.sm||[]).forEach(m=>m.remove());fs.sm=[];
  (fs.so||[]).forEach(m=>m.remove());fs.so=[];
  for(const s of savLoad()){
    if(isFinite(s.ola)&&isFinite(s.olo)&&hav(s.la,s.lo,s.ola,s.olo)>0.015){
      const dot=L.circleMarker([s.ola,s.olo],{radius:5,weight:1,color:"#fff",fillColor:"#b8860b",fillOpacity:.4,opacity:.55,interactive:false}).addTo(fs.map);
      fs.so.push(dot);
    }
    const mk=L.marker([s.la,s.lo],{icon:L.divIcon({className:"pmid",html:`<div class="pmk fb savmk">⭐</div>`,iconSize:[32,32],iconAnchor:[16,16]}),draggable:true,autoPan:true,zIndexOffset:80,riseOnHover:true}).addTo(fs.map);
    mk.bindTooltip(s.n,{permanent:true,direction:"bottom",offset:[0,6],className:"plab-tip",opacity:1});
    mk.bindPopup(savPopup(s),{className:"fam-pop",closeButton:true,autoPan:true,maxWidth:240,minWidth:180,autoPanPadding:[16,56]});
    mk.on("dragstart",()=>{mk.closePopup()});
    mk.on("dragend",e=>{const ll=e.target.getLatLng();savDragEnd(s.id,ll.lat,ll.lng)});
    fs.sm.push(mk);
  }
}
function savRender(force){
  const el=$("#slist");if(!el)return;
  const a=savLoad(),ids=a.map(s=>s.id).join(",");
  if(!force&&el.dataset.ids===ids&&el.querySelector(".slist")){
    a.forEach(s=>{const d=el.querySelector(`[data-sid="${s.id}"] .sdist`);if(d)d.textContent=savDist(s)});
    return;
  }
  el.dataset.ids=ids;
  const rows=a.length?a.map(s=>`<div class="frow savrow" data-sid="${s.id}">
    <span class="fav savico">${savPhImg(s,"savthumb")||"⭐"}</span>
    <div class="fi"><b>${esc(s.n)}</b><span class="sub">${savWhen(s.t)} · <span class="sdist">${savDist(s)}</span></span>${savLmSub(s)}${s.lms&&s.lms.length>1?`<button type="button" class="savelink" data-act="pick" data-id="${s.id}">בחירה אחרת</button>`:""}</div>
    <a class="ib" href="${savNav(s)}" target="_blank" rel="noopener" aria-label="ניווט">🧭</a>
    <button type="button" class="ib" data-act="ren" data-id="${s.id}" aria-label="שינוי שם">✏️</button>
    <button type="button" class="ib" data-act="del" data-id="${s.id}" aria-label="מחיקה">🗑️</button>
  </div>`).join(""):`<p class="sub savempty">עדיין אין מקומות שמורים. שמרו את המיקום הנוכחי, או לחצו לחיצה ארוכה על המפה.</p>`;
  el.innerHTML=`<div class="slist"><h2>המקומות שלי</h2>
    <button type="button" class="btn" data-act="here" id="savhere">⭐ סמן מקום</button>
    ${rows}</div>`;
  if(!el.dataset.bound){
    el.dataset.bound="1";
    el.addEventListener("click",e=>{
      const b=e.target.closest("[data-act]");if(!b)return;
      const act=b.dataset.act;
      if(act=="here")savFromHere();
      else if(act=="ren")savRename(b.dataset.id);
      else if(act=="del")savDelete(b.dataset.id);
      else if(act=="pick")savPick(b.dataset.id);
    });
  }
}
function famHookSaveMap(){
  if(!fs.map||fs.saveHooked)return;fs.saveHooked=1;
  fs.map.on("contextmenu",e=>{
    if(e.originalEvent)e.originalEvent.preventDefault();
    const t=e.originalEvent&&e.originalEvent.target;
    if(t&&t.closest&&t.closest(".leaflet-control,.leaflet-popup,.rtleg,.leaflet-marker-icon,.pmid,.savmk,.here-ico"))return;
    savAskAt(e.latlng.lat,e.latlng.lng,"נקודה");
  });
  const el=fs.map.getContainer();
  let timer=null,start=null;
  const clear=()=>{if(timer){clearTimeout(timer);timer=null}start=null};
  el.addEventListener("touchstart",e=>{
    if(e.touches.length!==1){clear();return}
    const t=e.target;
    if(t&&t.closest&&t.closest(".leaflet-control,.leaflet-popup,.rtleg,.leaflet-marker-icon,.pmid,.savmk,.here-ico"))return;
    const p=e.touches[0];start={x:p.clientX,y:p.clientY};
    timer=setTimeout(()=>{timer=null;if(!start||!fs.map)return;
      const ll=fs.map.containerPointToLatLng(fs.map.mouseEventToContainerPoint({clientX:start.x,clientY:start.y}));
      try{if(navigator.vibrate)navigator.vibrate(15)}catch(_){}
      savAskAt(ll.lat,ll.lng,"נקודה");
    },600);
  },{passive:true});
  el.addEventListener("touchmove",e=>{if(!start)return;const p=e.touches[0];if(Math.hypot(p.clientX-start.x,p.clientY-start.y)>14)clear()},{passive:true});
  el.addEventListener("touchend",clear,{passive:true});
  el.addEventListener("touchcancel",clear,{passive:true});
}
