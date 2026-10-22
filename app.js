const $=s=>document.querySelector(s),T="<span class='todo'>למלא</span>";
const TABS=[["trip","🧳","טיול"],["fly","✈️","טיסות"],["judo","🥋","מחנה"],["ins","🛡️","ביטוח"],["pack","✅","ציוד"],["info","ℹ️","גאורגיה"],["pp","🛂","דרכונים"]];
const tel=(n,l)=>`<a class="btn" href="tel:${n.replace(/[^+\d*]/g,'')}">📞 ${l||n}</a>`;
const V={
trip:()=>`<div class="box"><h2>הטיול</h2><p>✈️ <b>16.11.2026</b> → 🏠 <b>22.11.2026</b> (7 ימים)</p><p>👨‍👩‍👦‍👦 ויטאלי, יעל (יוליה), אדם (2014), טום (2015)</p><p>🥋 מחנה אימונים בג'ודו – ${T}</p><p id="cd"></p></div>
<div class="box"><h2>🌤️ מזג אוויר – טביליסי</h2><div id="wx">טוען…</div><p class="sub">אם המחנה בעיר אחרת – לעדכן מיקום.</p></div>`,
fly:()=>`<div class="box"><h2>✈️ אל על · קוד הזמנה <span class="code">Y8YTF9</span></h2><p>מחלקה: Economy Lite · כל הארבעה באותה הזמנה</p><a class="btn alt" href="https://booking.elal.com/manage/login?lang=he">ניהול הזמנה / צ'ק-אין</a></div>
<div class="box"><h2>הלוך – ב' 16.11.2026</h2><p><b>LY5107</b> · מופעל ע"י אל על עבור סאן דור<br>🛫 05:15 נתב"ג, <b>טרמינל 1</b><br>🛬 09:50 טביליסי (TBS) – שעון מקומי<br>⏱️ 2:35 שעות<br>💺 ויטאלי 47K · אדם 47J · יעל (יוליה) 48K · טום 48J</p></div>
<div class="box"><h2>חזור – א' 22.11.2026</h2><p><b>LY5118</b> · מופעל ע"י KlasJet עבור סאן דור<br>🛫 12:05 טביליסי (TBS)<br>🛬 12:45 נתב"ג, <b>טרמינל 3</b> – שעון ישראל<br>⏱️ 2:40 שעות<br>💺 ויטאלי 10F · אדם 10E · יעל (יוליה) 09F · טום 09E</p></div>
<div class="box"><h2>🧳 כבודה (Lite)</h2><p>לכל נוסע: תיק אישי מתחת למושב + טרולי עד 8 ק"ג (נשלח לבטן המטוס ללא עלות). <b>מזוודה לבטן לא כלולה (0PC)</b> – אם צריך לציוד ג'ודו, להוסיף מראש באתר (זול יותר מבשדה).</p><p class="sub">מקור: אישורי הזמנה של אל על, 29.9.2026. ההלוך יוצא מטרמינל 1 והחזרה נוחתת בטרמינל 3.</p></div>`,
judo:()=>`<div class="box"><h2>🥋 מחנה האימונים</h2><p>שם המחנה / מועדון: ${T}<br>עיר ומקום לינה: ${T}<br>כתובת: ${T}<br>איש קשר + טלפון: ${T}<br>לוח אימונים: ${T}<br>הסעה משדה התעופה: ${T}</p></div>`,
ins:()=>`<div class="box"><h2>🛡️ ביטוח נסיעות – כלל</h2><p>"מדיכלל עולמי – כללית"<br>פוליסה: <span class="code">123085565</span><br>תקופה: 16–22.11.2026<br>ביטול נסיעה: לכל הארבעה (עד 4,000$ למבוטח, עד 2,000$ לכרטיס)</p>
<div class="warn">⚠️ <b>כרגע אין כיסוי לפציעה באימון ג'ודו</b> – לא לטיפול רפואי בחו"ל ולא לביטול נסיעה.<br>• הרחבת "ספורט אתגרי חובבני" מכסה רק טיפול רפואי בחו"ל – לא ביטול, ולא תחרויות.<br>• בבירור מול כלל: הרחבת "ספורט תחרותי דרגה א'".</div>
<div class="box" style="background:#e8f6ea">✅ <b>מה כן מכוסה בביטול:</b> תאונה שאינה מספורט (למשל נפילה מקורקינט), בתנאי של אשפוז 24 שעות לפחות, או אישור רופא מומחה שניתן בשבוע שלפני הטיסה. אם אחד לא יכול לטוס – כל בני המשפחה שרכשו את הרחבת הביטול יכולים לבטל.</div>
${tel("*2700","שירות ביטוח נסיעות *2700")}${tel("03-9420630")}<a class="btn alt" href="https://wa.me/972544557755">💬 וואטסאפ 054-4557755</a>${tel("+972-3-5789010","🚑 חירום מחו\"ל +972-3-5789010")}
<a class="btn alt" href="https://www.clalbit.co.il/portfolio/changedigitaltravel/">שינויים בפוליסה (אתר כלל)</a></div>`,
pack:()=>{const L={"🥋 ג'ודו":["ג'ודוגי לבן ×2 לכל ילד","ג'ודוגי כחול (אם נדרש)","חגורות","כפכפים לאולם","בקבוק מים","תחבושות/טייפ","תעודת התאחדות / כרטיס ספורטאי","מגבת","בגדים להחלפה אחרי אימון"],"📄 מסמכים":["דרכונים ×4","פוליסת ביטוח","כרטיסי טיסה","כרטיס אשראי + מעט מזומן"],"🧥 בגדים (נובמבר קר)":["מעיל חם","כובע וכפפות","סוודרים","נעליים סגורות","פיג'מות","גרביים ותחתונים"],"💊 בריאות":["תרופות קבועות","משכך כאבים","פלסטרים","קרם שרירים / קרח"],"🔌 שונות":["מטענים","מתאם שקע (C/F – בדרך כלל לא צריך מישראל לתקע עגול)","מטען נייד","אוזניות"]};
const s=JSON.parse(localStorage.pk||"{}");return Object.entries(L).map(([h,a])=>`<div class="box"><h2>${h}</h2>${a.map(i=>`<label class="chk ${s[i]?'done':''}"><input type="checkbox" data-k="${i}" ${s[i]?'checked':''}>${i}</label>`).join("")}</div>`).join("")},
info:()=>`<div class="box"><h2>🚨 חירום</h2><p>מספר חירום אחיד: <b>112</b> (משטרה, אמבולנס, כבאות)</p>${tel("112")}</div>
<div class="box"><h2>ℹ️ מידע שימושי</h2><p>💱 מטבע: לארי גאורגי (GEL ₾). כרטיסי אשראי מקובלים ברוב המקומות.<br>🔌 חשמל: 220V, שקעים מסוג C/F (תקע ישראלי עגול בדרך כלל מתאים).<br>🕐 שעון: UTC+4 – שעתיים לפני ישראל בנובמבר.<br>🛂 ישראלים: כניסה ללא ויזה (עד שנה); דרכון בתוקף.<br>🗣️ שפה: גאורגית; רוסית ואנגלית מובנות לרוב.<br>🌡️ טביליסי בנובמבר: בערך 3–13°C.</p></div>
<div class="box"><h2>🇮🇱 שגרירות ישראל בטביליסי</h2><a class="btn alt" href="https://embassies.gov.il/tbilisi">אתר השגרירות</a><p class="sub">טלפון חירום כללי של משרד החוץ: <a href="tel:+97225303155">+972-2-5303155</a></p></div>`,
pp:()=>`<div class="box"><h2>🛂 דרכונים – רק במכשיר הזה</h2><p class="sub">הפרטים והתמונות נשמרים רק בדפדפן של הטלפון הזה (IndexedDB) ולא נשלחים לשום מקום. ניקוי נתוני הדפדפן ימחק אותם. מומלץ להגדיר PIN – אז הכל מוצפן (AES-GCM).</p><div id="ppb">טוען…</div></div>`};
// ---------- passports (local only) ----------
const PEOPLE=["ויטאלי","יעל (יוליה)","אדם","טום"];let KEY=null,PPD=null;
const db=()=>new Promise((r,j)=>{const q=indexedDB.open("georgia-pp",1);q.onupgradeneeded=()=>q.result.createObjectStore("s");q.onsuccess=()=>r(q.result);q.onerror=j});
const dget=async k=>{const d=await db();return new Promise(r=>{const q=d.transaction("s").objectStore("s").get(k);q.onsuccess=()=>r(q.result)})};
const dput=async(k,v)=>{const d=await db();return new Promise(r=>{const t=d.transaction("s","readwrite");t.objectStore("s").put(v,k);t.oncomplete=r})};
const enc=new TextEncoder(),dec=new TextDecoder();
async function derive(pin,salt){const b=await crypto.subtle.importKey("raw",enc.encode(pin),"PBKDF2",false,["deriveKey"]);return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:600000,hash:"SHA-256"},b,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])}
async function save(){const m=await dget("meta");if(m&&m.salt){const iv=crypto.getRandomValues(new Uint8Array(12));await dput("data",{iv,ct:await crypto.subtle.encrypt({name:"AES-GCM",iv},KEY,enc.encode(JSON.stringify(PPD)))})}else await dput("data",PPD)}
async function ppInit(){const b=$("#ppb"),m=await dget("meta");if(m&&m.salt&&!KEY){b.innerHTML=`<input id="pin" type="password" inputmode="numeric" placeholder="PIN"><button class="btn" id="un">🔓 פתיחה</button>`;
$("#un").onclick=async()=>{try{const k=await derive($("#pin").value,m.salt),d=await dget("data");PPD=JSON.parse(dec.decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:d.iv},k,d.ct)));KEY=k;ppInit()}catch(e){alert("PIN שגוי")}};return}
if(!PPD)PPD=(await dget("data"))||{};
b.innerHTML=PEOPLE.map((p,i)=>{const e=PPD[i]||{};return`<div class="box pp" style="background:#faf6f0"><h2>${p}</h2>
<label>שם כמו בדרכון (אנגלית)<input data-i="${i}" data-f="name" value="${e.name||""}" dir="ltr"></label>
<label>מס' דרכון<input data-i="${i}" data-f="no" value="${e.no||""}" dir="ltr"></label>
<label>תוקף<input data-i="${i}" data-f="exp" type="date" value="${e.exp||""}"></label>
<label>📷 צילום דרכון<input type="file" accept="image/*" data-ph="${i}"></label>${e.ph?`<img src="${e.ph}">`:""}${e.exp&&new Date(e.exp)<new Date("2027-05-22")?'<div class="warn">תוקף פחות מ-6 חודשים מהחזרה – לבדוק!</div>':""}</div>`}).join("")+
(m&&m.salt?`<button class="btn alt" id="lock">🔒 נעילה</button>`:`<label>הגדרת PIN (לא חובה)<input id="np" type="password" inputmode="numeric"></label><button class="btn alt" id="sp">הצפנה עם PIN</button>`)+`<button class="btn alt" id="wipe" style="background:#fdd">🗑️ מחיקת כל נתוני הדרכונים</button>`;
b.querySelectorAll("input[data-f]").forEach(x=>x.onchange=()=>{(PPD[x.dataset.i]=PPD[x.dataset.i]||{})[x.dataset.f]=x.value;save();if(x.dataset.f=="exp")ppInit()});
b.querySelectorAll("input[data-ph]").forEach(x=>x.onchange=()=>{const f=x.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=document.createElement("canvas"),s=Math.min(1,1600/im.width);c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);(PPD[x.dataset.ph]=PPD[x.dataset.ph]||{}).ph=c.toDataURL("image/jpeg",.85);save().then(ppInit)};im.src=URL.createObjectURL(f)});
if($("#sp"))$("#sp").onclick=async()=>{const p=$("#np").value;if(p.length<4)return alert("לפחות 4 ספרות");const salt=crypto.getRandomValues(new Uint8Array(16));KEY=await derive(p,salt);await dput("meta",{salt});await save();alert("מוצפן. אין דרך לשחזר PIN שנשכח.");ppInit()};
if($("#lock"))$("#lock").onclick=()=>{KEY=null;PPD=null;ppInit()};
$("#wipe").onclick=async()=>{if(!confirm("למחוק הכל?"))return;await dput("data",null);await dput("meta",null);KEY=null;PPD={};ppInit()}}
// ---------- weather ----------
const WI=c=>c==0?"☀️":c<3?"🌤️":c<4?"☁️":c<50?"🌫️":c<70?"🌧️":c<80?"🌨️":"⛈️";
async function wx(){const el=$("#wx");if(!el)return;try{const r=await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTbilisi&forecast_days=16");const d=await r.json();localStorage.wx=JSON.stringify(d);show(d)}catch(e){if(localStorage.wx)show(JSON.parse(localStorage.wx),1);else el.textContent="אין חיבור"}
function show(d,off){el.innerHTML=`<p>עכשיו: ${WI(d.current.weather_code)} <b>${Math.round(d.current.temperature_2m)}°</b>${off?" (נתון שמור)":""}</p><div style="display:flex;gap:8px;overflow-x:auto">`+d.daily.time.map((t,i)=>`<div style="min-width:70px;text-align:center;padding:6px;border-radius:10px;background:${t>="2026-11-16"&&t<="2026-11-22"?"#ffd9de":"#f3eee7"}">${t.slice(8)}/${t.slice(5,7)}<br>${WI(d.daily.weather_code[i])}<br>${Math.round(d.daily.temperature_2m_max[i])}°/${Math.round(d.daily.temperature_2m_min[i])}°<br><small>💧${d.daily.precipitation_probability_max[i]}%</small></div>`).join("")+"</div>"}}
// ---------- router ----------
function go(t){location.hash=t;$("#main").innerHTML=V[t]();$("#tabs").innerHTML=TABS.map(([k,i,l])=>`<button class="${k==t?'on':''}" data-t="${k}">${i}<br>${l}</button>`).join("");$("#tabs").querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.t));scrollTo(0,0);
if(t=="trip"){wx();const n=Math.ceil((new Date("2026-11-16")-new Date())/864e5);$("#cd").textContent=n>0?`⏳ עוד ${n} ימים לטיסה`:""}
if(t=="pack")document.querySelectorAll("[data-k]").forEach(x=>x.onchange=()=>{const s=JSON.parse(localStorage.pk||"{}");s[x.dataset.k]=x.checked;localStorage.pk=JSON.stringify(s);x.parentNode.classList.toggle("done",x.checked)});
if(t=="pp")ppInit()}
go((location.hash.slice(1) in V)?location.hash.slice(1):"trip");
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>r.update());
