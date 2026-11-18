const $=s=>document.querySelector(s),T="<span class='todo'>למלא</span>";
const TABS=[["info","🇬🇪","גאורגיה"],["trip","🧳","טיול"],["fam","👨‍👩‍👦‍👦","איפה כולם"],["fly","✈️","טיסות"],["routes","🗺️","מסלול"]];
const tel=(n,l)=>`<a class="btn" href="tel:${n.replace(/[^+\d*]/g,'')}">📞 ${l||n}</a>`;
const V={
trip:()=>`<div class="box"><h2>הטיול</h2><p>✈️ <b>16.11.2026</b> → 🏠 <b>22.11.2026</b> (7 ימים)</p><p>👨‍👩‍👦‍👦 ויטאלי, יעל (יוליה), אדם (2014), טום (2015)</p><p>🥋 מחנה אימונים בג'ודו – Judo Club Georgia</p><p id="cd"></p></div>
<div class="box"><h2>✅ רשימת ציוד</h2><button class="btn" onclick="go('pack')">לרשימה</button></div>
<div class="box hotel"><h2>🏨 מלון · Hotel Residence Plaza</h2><p>כתובת: 19 Gujareti St, Tbilisi 0144, Georgia<br>📍 טביליסי · לינה לכל המשפחה</p>
<a class="btn" href="https://share.google/c8NfljzoHhfhLHZFu" target="_blank" rel="noopener">🗺️ Google Maps</a>
<a class="btn alt" href="https://residenceplaza.ge/" target="_blank" rel="noopener">🌐 אתר המלון</a></div>`+wantedBox()+clinicBox(),
fly:()=>V.flySec()+V.ppSec(),
flySec:()=>`<div class="box bpbox"><button type="button" class="btn bpbtn" id="bpopen">🎫 כרטיסי עלייה – ברקודים</button><p class="sub">לחצו כאן, הזינו את קוד הכספת, והברקודים יופיעו מיד</p></div>
<div class="box"><h2>✈️ אל על · קוד הזמנה <span class="code">Y8YTF9</span></h2><p>מחלקה: Economy Lite · כל הארבעה באותה הזמנה</p><a class="btn alt" href="https://booking.elal.com/manage/login?lang=he">ניהול הזמנה / צ'ק-אין</a></div>
<div class="box"><h2>הלוך – ב' 16.11.2026</h2><p><b>LY5107</b> · מופעל ע"י אל על עבור סאן דור<br>🛫 05:15 נתב"ג, <b>טרמינל 1</b><br>🛬 09:50 טביליסי (TBS) – שעון מקומי<br>⏱️ 2:35 שעות<br>💺 ויטאלי 47K · אדם 47J · יעל (יוליה) 48K · טום 48J</p>
<div class="ok">✅ צ'ק-אין בוצע<br>🚪 פתיחת שער 04:25 · סגירת שער 05:00 · מספר השער טרם פורסם<br>🚕 מונית ב-1:50, הגעה משוערת ~2:20<br>כרטיסי העלייה בכפתור למעלה, עם אותו קוד כמו הדרכונים.</div></div>
<div class="box"><h2>חזור – א' 22.11.2026</h2><p><b>LY5118</b> · מופעל ע"י KlasJet עבור סאן דור<br>🛫 12:05 טביליסי (TBS)<br>🛬 12:45 נתב"ג, <b>טרמינל 3</b> – שעון ישראל<br>⏱️ 2:40 שעות<br>💺 ויטאלי 10F · אדם 10E · יעל (יוליה) 09F · טום 09E</p></div>
<div class="box"><h2>🧳 כבודה (Lite)</h2><p>לכל נוסע: תיק אישי מתחת למושב + טרולי עד 8 ק"ג (נשלח לבטן המטוס ללא עלות). <b>מזוודה לבטן לא כלולה (0PC)</b> – אם צריך לציוד ג'ודו, להוסיף מראש באתר (זול יותר מבשדה).</p><p class="sub">מקור: אישורי הזמנה של אל על, 29.9.2026. ההלוך יוצא מטרמינל 1 והחזרה נוחתת בטרמינל 3.</p></div>`,
judoSec:()=>`<div class="box"><h2>🥋 מחנה האימונים</h2><p>שם: <b>Judo Club Georgia</b> (ძიუდოს კლუბი „ჯორჯია“)<br>עיר ומקום לינה: טביליסי · <b>Hotel Residence Plaza</b><br>כתובת האולם: 144a Monk Gabriel Salos Ave, Tbilisi 0144<br><span class="sub" dir="ltr" style="text-align:right">ბერი გაბრიელ სალოსის გამზირი 144ა</span><br>🚕 ~${CAMP.km} ק"מ · ~${CAMP.min} דק׳ מונית מהמלון<br>איש קשר: ${T}<br>לוח אימונים: ${T}<br>הסעה משדה התעופה: ${T}</p>
<a class="btn" href="${nav(CAMP,"driving")}" target="_blank" rel="noopener">🧭 ניווט למחנה</a>
<a class="btn alt" href="tel:${CAMP.tel.replace(/[^+\d]/g,"")}">📞 ${CAMP.tel}</a></div>`,
ins:()=>`<div class="box"><h2>🛡️ ביטוח נסיעות – הפניקס SMART TRAVEL</h2><p>פוליסה: <span class="code">26/096/667/8762601</span><br>תקופה: 16/11/2026–22/11/2026 · יעד: גאורגיה<br>מחיר כולל: 150$ (תשלום אחד)<br>מבוטחים: ויטאלי, יעל, אדם, טום בוצ'אצקי</p>
<p><b>לכל הארבעה:</b> פוליסת בסיס, חבות כלפי צד ג', איתור וחילוץ, ביטול וקיצור נסיעה, מגן קורונה, כבודה, הוצאות רפואיות בישראל לאחר תאונה בחו"ל.<br>💻 ויטאלי: גניבת מחשב נייד (Lenovo Legion 5 16IRX9, 83DG).<br>🥋 אדם וטום: <b>ספורט תחרותי</b> 16–22/11 – כולל במפורש ג'ודו ומחנה אימונים בחו"ל (הגדרה 1.43).</p></div>
<div class="box" style="background:#e8f6ea"><h2>✈️ ביטול נסיעה (פרק 10)</h2><p>סעיף משפחה גרעינית: אם אחד זכאי לביטול – כולם זכאים.<br><b>אירועים בתוך 7 ימים לפני היציאה:</b><br>• אשפוז של 24 שעות לפחות<br>• ביקור במיון/מוקד דחוף + אבחנת רופא למנוחה בבית שכוללת את יום הטיסה<br>• ניתוח או מצב חמור אחר שהתגלה לראשונה<br>• פטירה של מבוטח או קרוב משפחה<br>• נזק לבית או פריצה – בתוך 14 יום<br>פציעה נחשבת מחלה (הגדרה 1.14).<br>💲 עד 6,000$ לאדם, כרטיסי טיסה עד 2,000$, ללא השתתפות עצמית.</p>
<p><b>איך מבטלים:</b><br>1. מבטלים מול אל על <b>מיד</b>.<br>2. אוספים אישור ביטול, קבלות ומסמכים רפואיים מלאים.<br>3. מגישים תביעה ב-fnx.co.il, במייל Traveld@fnx.co.il או בוואטסאפ 054-9893455.</p></div>
<div class="box">${tel("03-7141000","שירות לקוחות 03-7141000")}<a class="btn alt" href="https://wa.me/972549893455">💬 תביעות בוואטסאפ 054-9893455</a><a class="btn alt" href="mailto:Traveld@fnx.co.il">✉️ Traveld@fnx.co.il</a>${tel("+972-3-7331177","🚑 חירום בחו\"ל 24/7 (MEDASSIS) +972-3-7331177")}<a class="btn alt" href="https://wa.me/972502241953">💬 MEDASSIS וואטסאפ 050-2241953</a><a class="btn alt" href="mailto:info@medassis.org">✉️ info@medassis.org</a>
<a class="btn alt" href="https://www.fnx.co.il">אתר הפניקס</a><a class="btn alt" href="https://digital-content.fnx.co.il/sites/docs/polarchive/TravelInsurance/300304230_0724.pdf">📄 תנאי הפוליסה המלאים</a></div>`,
routes:()=>routesView(),
fam:()=>famView(),
info:()=>`<div class="box"><h2>🚨 חירום</h2><p>מספר חירום אחיד: <b>112</b> (משטרה, אמבולנס, כבאות)</p>${tel("112")}</div>
<div class="box"><h2>🌤️ מזג אוויר – טביליסי</h2><div id="wx">טוען…</div></div>
<div class="box"><h2>🇮🇱 שגרירות ישראל בטביליסי</h2><a class="btn alt" href="https://embassies.gov.il/tbilisi">אתר השגרירות</a><p class="sub">טלפון חירום כללי של משרד החוץ: <a href="tel:+97225303155">+972-2-5303155</a></p></div>`,
ppSec:()=>`<div class="box"><h2>🔐 כרטיסי עלייה ודרכונים (מוצפנים)</h2><div id="vault"></div></div>`};
const enc=new TextEncoder(),dec=new TextDecoder();
// ---------- encrypted vault ----------
let VK=null;const b64=x=>Uint8Array.from(atob(x),c=>c.charCodeAt(0));
async function vdec(k,id){const u=new Uint8Array(await (await fetch("sec/"+id+".bin")).arrayBuffer());return crypto.subtle.decrypt({name:"AES-GCM",iv:u.slice(0,12)},k,u.slice(12))}
async function vUnlock(pin){const m=await (await fetch("sec/meta.json")).json();const b=await crypto.subtle.importKey("raw",enc.encode(pin),"PBKDF2",false,["deriveKey"]);const k=await crypto.subtle.deriveKey({name:"PBKDF2",salt:b64(m.salt),iterations:m.iter,hash:"SHA-256"},b,{name:"AES-GCM",length:256},false,["decrypt"]);await vdec(k,"info");VK=k}
function bpZoom(root){(root||document).querySelectorAll(".bp img").forEach(img=>img.onclick=()=>{const z=document.createElement("div");z.id="bpz";z.innerHTML=`<img src="${img.src}" alt="">`;z.onclick=()=>z.remove();document.body.appendChild(z)})}
function bpCardsHtml(info,pref){return (info.boarding||[]).map(p=>`<div class="pp bp"><h3>🎫 ${p.n}${p.seat?" · "+p.seat:""}</h3><img id="${pref}${p.f}" alt="כרטיס עלייה"></div>`).join("")}
async function vault(){const el=$("#vault");if(!el)return;if(!VK){el.innerHTML=`<p class="sub">אותו קוד של הדרכונים. אפשר גם ללחוץ על הכפתור האדום למעלה.</p><input id="vpw" type="password" inputmode="numeric" placeholder="סיסמה" autocomplete="off"><button class="btn" id="vgo">🔓 פתיחה</button><p class="sub" id="vmsg"></p>`;
const go=async()=>{$("#vmsg").textContent="מפענח… (כמה שניות)";try{await vUnlock($("#vpw").value);vault();bpShow()}catch(e){$("#vmsg").textContent="סיסמה שגויה"}};
$("#vgo").onclick=go;$("#vpw").onkeydown=e=>{if(e.key=="Enter")go()};return}
const info=JSON.parse(dec.decode(await vdec(VK,"info")));
const people=info.people.map(p=>`<div class="pp"><h3>${p.n}</h3>${p.exp?`<p>תוקף: <b>${p.exp.split("-").reverse().join("/")}</b></p>${new Date(p.exp)<new Date("2027-05-22")?'<div class="warn">⚠️ הדרכון בתוקף פחות מ-6 חודשים מיום החזרה (22.11.2026) – לבדוק מול דרישות הכניסה לגאורגיה ואל על, ולשקול חידוש.</div>':""}`:""}<img id="im-${p.f}" alt=""></div>`).join("");
const bps=bpCardsHtml(info,"im-");
el.innerHTML=(bps?`<h2>כרטיסי עלייה · LY5107</h2><p class="sub">לחצו על כרטיס כדי להגדיל את הברקוד לסריקה</p>`+bps:"")+people+`<button class="btn alt" id="vlock">🔒 נעילה</button>`;
$("#vlock").onclick=()=>{VK=null;vault()};
for(const p of (info.boarding||[]).concat(info.people)){const d=await vdec(VK,p.f);const im=$("#im-"+p.f);if(im)im.src=URL.createObjectURL(new Blob([d],{type:"image/jpeg"}))}
bpZoom(el)}
function bpOpen(){if(VK){bpShow();return}let d=$("#bpmodal");if(d)d.remove();d=document.createElement("div");d.id="bpmodal";
d.innerHTML=`<div class="bpm"><h2>🎫 כרטיסי עלייה</h2><p class="sub">הזינו את הקוד של הכספת (אותו קוד של הדרכונים)</p><input id="bppin" type="password" inputmode="numeric" placeholder="סיסמה" autocomplete="off"><button class="btn" id="bpgo">🔓 פתיחה</button><p class="sub" id="bpmsg"></p><button type="button" class="btn alt" id="bpcx">סגירה</button></div>`;
document.body.appendChild(d);const go=async()=>{$("#bpmsg").textContent="מפענח… (כמה שניות)";try{await vUnlock($("#bppin").value);d.remove();vault();bpShow()}catch(e){$("#bpmsg").textContent="סיסמה שגויה"}};
$("#bpgo").onclick=go;$("#bppin").onkeydown=e=>{if(e.key=="Enter")go()};$("#bpcx").onclick=()=>d.remove();d.addEventListener("click",e=>{if(e.target===d)d.remove()});$("#bppin").focus()}
async function bpShow(){if(!VK){bpOpen();return}let d=$("#bpmodal");if(d)d.remove();d=document.createElement("div");d.id="bpmodal";
d.innerHTML=`<div class="bpm"><h2>🎫 כרטיסי עלייה · LY5107</h2><p class="sub">לחצו על כרטיס כדי להגדיל את הברקוד לסריקה</p><div id="bpards">טוען…</div><button type="button" class="btn alt" id="bpcx">סגירה</button></div>`;
document.body.appendChild(d);const info=JSON.parse(dec.decode(await vdec(VK,"info")));const el=$("#bpards");
el.innerHTML=bpCardsHtml(info,"bm-")||"<p>אין כרטיסי עלייה בכספת</p>";
for(const p of info.boarding||[]){const data=await vdec(VK,p.f);const im=$("#bm-"+p.f);if(im)im.src=URL.createObjectURL(new Blob([data],{type:"image/jpeg"}))}
bpZoom(el);$("#bpcx").onclick=()=>d.remove();d.addEventListener("click",e=>{if(e.target===d)d.remove()})}

// ---------- weather ----------
const WI=c=>c==0?"☀️":c<3?"🌤️":c<4?"☁️":c<50?"🌫️":c<70?"🌧️":c<80?"🌨️":"⛈️";
const WXURL="https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,weather_code,precipitation_probability&timezone=Asia%2FTbilisi&forecast_days=16";
async function wx(){const el=$("#wx");if(!el)return;try{const r=await fetch(WXURL);const d=await r.json();localStorage.wx=JSON.stringify(d);showWx(d)}catch(e){if(localStorage.wx)showWx(JSON.parse(localStorage.wx),1);else el.textContent="אין חיבור"}}
function showWx(d,off,sel){
  const el=$("#wx");if(!el||!d||!d.daily)return;
  const days=d.daily.time,today=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Tbilisi"});
  if(!sel)sel=days.includes(today)?today:(days.find(t=>t>="2026-11-16"&&t<="2026-11-22")||days[0]);
  const chips=days.map((t,i)=>`<button type="button" class="wxc${t>="2026-11-16"&&t<="2026-11-22"?" trip":""}${t===sel?" on":""}" data-day="${t}">${t.slice(8)}/${t.slice(5,7)}<br>${WI(d.daily.weather_code[i])}<br>${Math.round(d.daily.temperature_2m_max[i])}°/${Math.round(d.daily.temperature_2m_min[i])}°<br><small>💧${d.daily.precipitation_probability_max[i]}%</small></button>`).join("");
  const h=d.hourly,idx=[];
  if(h&&h.time)for(let i=0;i<h.time.length;i++)if(h.time[i].startsWith(sel))idx.push(i);
  let hourly=`<p class="sub">אין תחזית שעתית ליום הזה</p>`;
  if(idx.length){
    const temps=idx.map(i=>h.temperature_2m[i]),min=Math.min(...temps),max=Math.max(...temps),span=Math.max(1,max-min);
    const bars=idx.map(i=>{
      const t=h.temperature_2m[i],pct=18+Math.round(((t-min)/span)*72),rain=h.precipitation_probability?h.precipitation_probability[i]:null;
      return `<div class="wxh"><span class="wxbar" style="height:${pct}px"></span><b>${Math.round(t)}°</b><span>${WI(h.weather_code[i])}</span><span class="wh">${h.time[i].slice(11,13)}:00</span>${rain!=null?`<small>💧${rain}%</small>`:""}</div>`;
    }).join("");
    hourly=`<p class="wxdayt">לפי שעה · ${sel.slice(8)}/${sel.slice(5,7)}</p><div class="wxrow">${bars}</div>`;
  }
  el.innerHTML=`<p>עכשיו: ${WI(d.current.weather_code)} <b>${Math.round(d.current.temperature_2m)}°</b>${off?" (נתון שמור)":""}</p><div class="wxchips">${chips}</div>`+hourly;
  el.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>showWx(d,off,b.dataset.day));
}

// ---------- currency calculator ----------
// Fallback rates verified from open.er-api.com on 15.11.2026 (1 USD = 3.21 ILS, 2.59 GEL, 0.906 EUR)
const FX_CUR=[["USD","$","דולר"],["EUR","€","יורו"],["GEL","₾","לארי"],["ILS","₪","שקל"]];
const FX_FALLBACK={USD:1,EUR:0.906,GEL:2.59,ILS:3.21};
const FXURL="https://open.er-api.com/v6/latest/USD";
let FX=null,fxLock=0;
const fxFmt=n=>{if(!isFinite(n))return"";const r=Math.round(n*100)/100;return Math.abs(r-Math.round(r))<1e-9?String(Math.round(r)):r.toFixed(2)};
const fxWhen=d=>d.toLocaleDateString("he-IL",{timeZone:"Asia/Jerusalem",day:"2-digit",month:"2-digit",year:"numeric"});
function fxView(){return `<div class="box" id="fxbox"><h2>💱 מחשבון מטבע</h2>
<div class="fxrows">${FX_CUR.map(([c,s,n])=>`<label class="fxrow"><span class="fxn">${n} <small>${s}</small></span><input id="fx-${c}" type="text" inputmode="decimal" enterkeyhint="done" dir="ltr" placeholder="0" autocomplete="off"></label>`).join("")}</div>
<p class="sub" id="fxmeta">טוען שערים…</p></div>`}
function fxApply(rates,when,src){
  FX={USD:1,EUR:+rates.EUR,GEL:+rates.GEL,ILS:+rates.ILS};
  const el=$("#fxmeta");if(!el)return;
  const note=src=="live"?"":src=="cache"?" (שמורים)":" (שערים שמורים מראש)";
  el.textContent=`שערים מעודכנים ל-${when}${note} · 1 $ = ${fxFmt(FX.ILS)} ₪ = ${fxFmt(FX.GEL)} ₾`;
}
function fxRecalc(from){
  if(!FX||fxLock)return;
  const inp=$(`#fx-${from}`);if(!inp)return;
  const raw=String(inp.value).replace(/,/g,".").replace(/[^\d.]/g,"");
  if(raw===""||raw==="."){fxLock=1;FX_CUR.forEach(([c])=>{if(c!=from){const i=$(`#fx-${c}`);if(i)i.value=""}});fxLock=0;return}
  const v=parseFloat(raw);if(!isFinite(v))return;
  const usd=v/FX[from];
  fxLock=1;
  FX_CUR.forEach(([c])=>{if(c==from)return;const i=$(`#fx-${c}`);if(i)i.value=fxFmt(usd*FX[c])});
  fxLock=0;
}
async function fxInit(){
  if(!$("#fxbox"))return;
  let cached=null;try{cached=JSON.parse(localStorage["georgia-fx"]||"null")}catch(e){}
  if(cached&&cached.rates&&cached.rates.GEL&&cached.rates.ILS)fxApply(cached.rates,cached.when,"cache");
  else fxApply(FX_FALLBACK,"15.11.2026","fallback");
  FX_CUR.forEach(([c])=>{const i=$(`#fx-${c}`);if(!i)return;i.oninput=()=>fxRecalc(c);i.onfocus=()=>i.select()});
  try{
    const d=await(await fetch(FXURL,{cache:"no-store"})).json();
    if(d&&d.result=="success"&&d.rates&&d.rates.GEL&&d.rates.ILS&&d.rates.EUR){
      const rates={USD:1,EUR:d.rates.EUR,GEL:d.rates.GEL,ILS:d.rates.ILS};
      const when=fxWhen(new Date((d.time_last_update_unix||0)*1000));
      localStorage["georgia-fx"]=JSON.stringify({rates,when});
      fxApply(rates,when,"live");
      const filled=FX_CUR.find(([c])=>{const i=$(`#fx-${c}`);return i&&i.value});
      if(filled)fxRecalc(filled[0]);
    }
  }catch(e){}
}
// ---------- router ----------
const ALIAS={judo:"info",go:"info",pp:"fly"},TABK=["info","trip","fam","fly","routes","ins","pack"];
function go(t){t=ALIAS[t]||t;if(!TABK.includes(t))t="info";if(typeof fsearchClose==="function")fsearchClose(true);if(typeof famToggleFull==="function")famToggleFull(false);document.body.classList.remove("fmap-on");location.hash=t;$("#main").innerHTML=V[t]();$("#tabs").innerHTML=TABS.map(([k,i,l])=>`<button class="${k==t?'on':''}" data-t="${k}">${i}<br>${l}</button>`).join("");$("#tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.t));scrollTo(0,0);
if(t=="info"){wx();fxInit()}
if(t=="trip"){const n=Math.ceil((new Date("2026-11-16")-new Date())/864e5);$("#cd").textContent=n>0?`⏳ עוד ${n} ימים לטיסה`:""}
if(t=="fly"){vault();const b=$("#bpopen");if(b)b.onclick=bpOpen}
if(t=="routes")routesInit()
if(t=="fam")famInit()
if(t=="pack")packInit()}
const _info=V.info;V.hotelNav=()=>`<div class="box hotel"><h2>🏨 Hotel Residence Plaza</h2><p>19 Gujareti St, Tbilisi 0144</p><a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=41.692288,44.833153" target="_blank" rel="noopener">🧭 ניווט למלון</a></div>`;V.info=()=>V.hotelNav()+fxView()+_info()+V.judoSec()+`<div class="box"><h2>🛡️ ביטוח נסיעות</h2><button class="btn alt" onclick="go('ins')">פרטי הביטוח – הפניקס</button></div>`;
V.pack=packView;
const JOINED=famJoinFromHash();
go(JOINED?"fam":location.hash.slice(1)||"info");
famPill();if(!fs.me)famPicker();famStart();
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>r.update());
