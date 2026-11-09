// ---------- איפה כולם: family location sharing ----------
// Backend: ntfy.sh (free pub/sub, no account). Room topic is random; every position is AES-GCM encrypted
// in the browser with a family key that only travels inside the join link's #fragment (never sent to any server).
const FAM={people:[["ויטאלי","👨","#1a73e8"],["יוליה","👩","#d6336c"],["אדם","👦","#2f9e44"],["טום","🧒","#f08c00"]],
  api:"https://ntfy.sh/",staleMin:15,sendEvery:60e3};
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
function famJoinFromHash(){const m=location.hash.match(/^#fam=([\w-]{16,})~([\w-]{40,})$/);if(!m)return false;
  if(fs.room!=m[1]){localStorage.famRoom=m[1];localStorage.famKey=m[2];fs.ck=null;fs.pos={}}history.replaceState(null,"",location.pathname+"#fam");return true}
function famCreate(){localStorage.famRoom="gj"+rnd(18);localStorage.famKey=rnd(32);fs.ck=null;fs.pos={};famStart();go("fam")}
// --- who are you ---
function famPicker(){if($("#who"))return;const d=document.createElement("div");d.id="who";d.innerHTML=`<div class="whoin"><h2>מי אתה? 👋</h2><p class="sub">כדי שהמשפחה תראה מי איפה</p>
<div class="whog">${FAM.people.map(([n,e,c])=>`<button data-n="${n}" style="--c:${c}"><span>${e}</span>${n}</button>`).join("")}</div></div>`;
  document.body.appendChild(d);d.querySelectorAll("button").forEach(b=>b.onclick=()=>{localStorage.famMe=b.dataset.n;d.remove();famPill();famStart();if(location.hash=="#fam")go("fam")})}
// --- status pill ---
function famPill(){let p=$("#fampill");if(!p){p=document.createElement("button");p.id="fampill";document.querySelector("header").appendChild(p);p.onclick=()=>go("fam")}
  const on=fs.status=="on";p.className=on?"on":"";p.textContent=on?"📍 משתף מיקום":"מיקום כבוי"}
// --- sharing ---
function famStart(){if(!fs.me||!fs.room||document.hidden){famStop();return}
  famListen();if(fs.paused||!navigator.geolocation){fs.status="off";famPill();return}
  if(fs.watch==null)fs.watch=navigator.geolocation.watchPosition(famOnPos,e=>{fs.status="off";fs.err=e.code==1?"הגישה למיקום נחסמה – אפשר לאשר בהגדרות הדפדפן":"המיקום לא זמין כרגע";famPill();famRender()},{enableHighAccuracy:true,maximumAge:30e3,timeout:30e3})}
function famStop(){if(fs.watch!=null){navigator.geolocation.clearWatch(fs.watch);fs.watch=null}if(fs.es){fs.es.close();fs.es=null}clearInterval(fs.poll);fs.poll=null;fs.status="off";famPill()}
async function famOnPos(p){fs.err="";fs.status="on";famPill();const c=p.coords,o={n:fs.me,la:+c.latitude.toFixed(5),lo:+c.longitude.toFixed(5),a:Math.round(c.accuracy),t:Date.now()};
  fs.mine=o;fs.pos[fs.me]=o;famRender();
  const moved=fs.lastSentPos?hav(fs.lastSentPos.la,fs.lastSentPos.lo,o.la,o.lo)*1000:1e9,age=Date.now()-fs.lastSent;
  if(age<FAM.sendEvery||(moved<15&&age<5*60e3))return;
  fs.lastSent=Date.now();fs.lastSentPos=o;
  try{await fetch(FAM.api+fs.room,{method:"POST",body:await famEnc(o),cache:"no-store"})}catch(e){fs.lastSent=0}}
async function famIngest(msg){const o=await famDec(msg);if(!o||!o.n||!isFinite(o.la))return;const cur=fs.pos[o.n];if(!cur||o.t>cur.t){fs.pos[o.n]=o;famRender()}}
async function famPollOnce(since){try{const r=await fetch(FAM.api+fs.room+"/json?poll=1&since="+(since||"12h"),{cache:"no-store"});const t=await r.text();
  for(const l of t.split("\n")){if(!l.trim())continue;try{const m=JSON.parse(l);if(m.event=="message")await famIngest(m.message)}catch(e){}}}catch(e){}}
function famListen(){if(fs.es||!fs.room)return;famPollOnce("12h");
  if("EventSource"in window){fs.es=new EventSource(FAM.api+fs.room+"/sse");fs.es.onmessage=e=>{try{const m=JSON.parse(e.data);if(m.event=="message")famIngest(m.message)}catch(_){}}}
  fs.poll=setInterval(()=>famPollOnce("3m"),60e3)}
document.addEventListener("visibilitychange",()=>{if(document.hidden)famStop();else{famStart();if(location.hash=="#fam")famRender()}});
// --- view ---
const ago=t=>{const m=Math.round((Date.now()-t)/60e3);return m<1?"עכשיו":m<60?`לפני ${m} דק׳`:m<1440?`לפני ${Math.floor(m/60)} שע׳`:"לפני יותר מיום"};
const kmTxt=k=>k<1?Math.round(k*1000)+" מ׳":k.toFixed(1)+" ק״מ";
function famView(){
  if(!fs.room)return `<div class="box fam"><h2>👨‍👩‍👦‍👦 איפה כולם</h2><p>כדי לראות אחד את השני, כולם צריכים להיות באותה קבוצה משפחתית.</p>
<p class="sub">אחד יוצר קבוצה ושולח קישור בוואטסאפ. כל השאר פשוט פותחים את הקישור.</p><button class="btn" id="fcreate">➕ יצירת קבוצה משפחתית</button></div>`;
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
  fs.map=null;fs.mk={};famLeaflet().then(()=>{if(!$("#fmap"))return;fs.map=L.map("fmap",{zoomControl:false,attributionControl:true}).setView([HOTEL.lat,HOTEL.lng],14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(fs.map);
    L.marker([HOTEL.lat,HOTEL.lng],{icon:L.divIcon({className:"",html:`<div class="fmk" style="--c:#7a2e1d">🏨</div>`,iconSize:[36,36],iconAnchor:[18,18]})}).addTo(fs.map).bindTooltip("המלון");
    fs.fit=true;famRender()}).catch(()=>{$("#fmap").innerHTML=`<p class="sub" style="padding:20px;text-align:center">המפה לא נטענה (אין אינטרנט?)</p>`});
  famRender()}
function famLeaflet(){if(window.L)return Promise.resolve();return new Promise((ok,no)=>{const c=document.createElement("link");c.rel="stylesheet";c.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(c);
  const s=document.createElement("script");s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function famRender(){const el=$("#flist");if(!el)return;$("#ferr").innerHTML=fs.err?`<p class="warn">${fs.err}</p>`:"";
  const me=fs.mine;const rows=FAM.people.map(([n,e,c])=>{const o=fs.pos[n];
    if(!o)return `<div class="frow none"><span class="fav" style="--c:#bbb">${e}</span><div class="fi"><b>${n}</b><span class="sub">עוד לא שיתף מיקום</span></div></div>`;
    const stale=Date.now()-o.t>FAM.staleMin*60e3,isMe=n==fs.me,dh=hav(HOTEL.lat,HOTEL.lng,o.la,o.lo);
    const dm=me&&!isMe?" · ממני "+kmTxt(hav(me.la,me.lo,o.la,o.lo)):"";
    return `<div class="frow${stale?" stale":""}"><span class="fav" style="--c:${stale?"#aaa":c}">${e}</span><div class="fi"><b>${n}${isMe?" (אני)":""}</b><span class="sub">${ago(o.t)}${dm} · מהמלון ${kmTxt(dh)}</span></div>${isMe?"":`<a class="ib" href="https://www.google.com/maps/dir/?api=1&destination=${o.la},${o.lo}&travelmode=walking" target="_blank" rel="noopener" aria-label="נווט אליו">🧭</a>`}</div>`}).join("");
  el.innerHTML=`<div class="flist">${rows}</div>`;
  if(fs.map){const pts=[[HOTEL.lat,HOTEL.lng]];for(const[n,e,c]of FAM.people){const o=fs.pos[n];if(!o)continue;const stale=Date.now()-o.t>FAM.staleMin*60e3;
      const ic=L.divIcon({className:"",html:`<div class="fmk${stale?" stale":""}" style="--c:${c}">${e}</div>`,iconSize:[38,38],iconAnchor:[19,19]});
      if(fs.mk[n])fs.mk[n].setLatLng([o.la,o.lo]).setIcon(ic);else fs.mk[n]=L.marker([o.la,o.lo],{icon:ic}).addTo(fs.map).bindTooltip(n);pts.push([o.la,o.lo])}
    if(fs.fit&&pts.length>1){fs.map.fitBounds(pts,{padding:[40,40],maxZoom:16});fs.fit=false}}}
setInterval(()=>{if(location.hash=="#fam"&&!document.hidden)famRender()},30e3);
