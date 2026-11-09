// Places saved from the TikTok videos vitaly sent. Coordinates are from OpenStreetMap/Nominatim or the venue's listings; distances are approximate.
const S1="https://vt.tiktok.com/ZSphKBBVd/",S2="https://vt.tiktok.com/ZSphKn6TE/",S3="https://vt.tiktok.com/ZSphK3yQa/";
const HOTEL={n:"Hotel Residence Plaza",lat:41.692288,lng:44.833153};
const PLACES=[
{n:"גשר השלום",e:"Bridge of Peace",k:"a",d:"גשר הולכי רגל מזכוכית ופלדה מעל נהר המטקווארי, בין העיר העתיקה לפארק ריקה.",lat:41.69298,lng:44.80806,q:"Bridge of Peace, Tbilisi",s:[S1]},
{n:"פארק ריקה",e:"Rike Park",k:"a",d:"פארק על גדת הנהר, בצמוד לגשר השלום ולתחנת הרכבל.",lat:41.69320,lng:44.80999,q:"Rike Park, Tbilisi",s:[S1]},
{n:"רכבל ריקה–נריקלה (תחנה תחתונה)",e:"Rike–Narikala Cable Car",k:"a",d:"עולים ממנו למבצר נריקלה ולפסל אם גאורגיה.",lat:41.69002,lng:44.80900,q:"Rike-Narikala cable car, Tbilisi",s:[S1]},
{n:"פסל אם גאורגיה",e:"Kartlis Deda – Mother of Georgia",k:"a",d:"פסל על הרכס מעל העיר העתיקה, עם תצפית לעיר.",lat:41.68812,lng:44.80460,q:"Mother of Georgia, Tbilisi",s:[S1]},
{n:"SEE360",e:"See360 Restaurant · 24 Betlemi St",k:"r",d:"מסעדת גג במלון TbiliSee עם תצפית על העיר העתיקה.",lat:41.689454,lng:44.806679,q:"See360 Restaurant, 24 Betlemi St, Tbilisi",s:[S1]},
{n:"מרחצאות הגופרית – אבנוטובני",e:"Abanotubani · Orbeliani (Chreli) Bath",k:"a",d:"רובע המרחצאות. בסרטון מוצגת חזית מרחץ אורבליאני (המרחץ הצבעוני).",lat:41.68745,lng:44.81077,q:"Orbeliani Bath, 2 Abano St, Tbilisi",s:[S1]},
{n:"מפל לגבטחבי (ערוץ התאנים)",e:"Leghvtakhevi Waterfall",k:"a",d:"מפל קטן בערוץ, הליכה קצרה מהמרחצאות.",lat:41.68681,lng:44.80900,q:"Leghvtakhevi Waterfall, Tbilisi",s:[S1]},
{n:"בזאר מיידן (תת־קרקעי)",e:"Meidan Bazaar · Gorgasali Sq",k:"a",d:"מתחם קניות תת־קרקעי מתחת לכיכר גורגסלי.",lat:41.68981,lng:44.80887,q:"Meidan Bazaar, Tbilisi",s:[S1]},
{n:"כיכר החירות",e:"Freedom Square",k:"a",d:"הכיכר המרכזית, עם עמוד פסל גאורגי הקדוש.",lat:41.69365,lng:44.80115,q:"Freedom Square, Tbilisi",s:[S1]},
{n:"Georgian House",e:"Georgian House restaurant",k:"r",d:"מסעדה גאורגית. ⚠️ ב-OpenStreetMap יש שני מקומות בשם הזה (אבלבארי וצ'וגורתי) ולא ברור איזה מהם בסרטון. הנקודה כאן היא של אבלבארי – כדאי לבדוק במפה.",lat:41.69494,lng:44.81555,q:"Georgian House restaurant, Tbilisi",s:[S1],w:1},
{n:"Ribs Beer & Wine",e:"Ribs Tbilisi · 1 Galaktion Tabidze St",k:"r",d:"בסרטון: צלעות חזיר, עוף ברוטב שמנת ושום, חצ'פורי, ומנות חציל וסלק.",lat:41.69270,lng:44.80101,q:"Ribs, 1 Galaktion Tabidze St, Tbilisi",s:[S2]},
{n:"Zodiaqo (ZODIACO)",e:"6 Gia Chanturia St",k:"r",d:"בסרטון לא מצוין הסניף. הכתובת היא של הסניף הידוע ליד כיכר החירות. הנקודה מסומנת ברמת הרחוב.",lat:41.69902,lng:44.79887,q:"Zodiaqo, 6 Gia Chanturia St, Tbilisi",s:[S3],w:1},
{n:"שוק הפשפשים בגשר היבש",e:"Dry Bridge Market",k:"a",d:"שוק עתיקות, אומנות ומזכרות סביב הגשר היבש.",lat:41.70050,lng:44.80259,q:"Dry Bridge Market, Tbilisi",s:[S3]},
{n:"כרוניקת גאורגיה + תצפית לים טביליסי",e:"Chronicle of Georgia",k:"a",d:"אנדרטת עמודים ענקית מעל ים טביליסי, שנראה מהאתר. נמצאת מחוץ למרכז העיר.",lat:41.77067,lng:44.81040,q:"Chronicle of Georgia, Tbilisi",s:[S3]},
{n:"Gardenia Shevardnadze",e:"138 Old Nadzaladevi",k:"a",d:"משתלה וגן עם בית קפה (זה לא הגן הבוטני הלאומי).",lat:41.73112,lng:44.83074,q:"Gardenia Shevardnadze, Tbilisi",s:[S3]},
{n:"מצחטה – קתדרלת סבטיצחובלי ושוק המזכרות",e:"Mtskheta · Svetitskhoveli",k:"a",d:"עיירה כ-20 ק\"מ מטביליסי. הקתדרלה ושוק המזכרות נמצאים בסביבתה. בסרטון מופיע גם דוכן גלידת יין בלי שם; אחוז האלכוהול לא ידוע, ולכן לא לילדים.",lat:41.84227,lng:44.72099,q:"Svetitskhoveli Cathedral, Mtskheta",s:[S3]},
{n:"Ethnographer",e:"105 Akaki Beliashvili St (דיגומי)",k:"r",d:"מסעדה גאורגית. בסרטון מוצג מופע ריקודים מסורתי; לוח המופעים העדכני לא נבדק.",lat:41.773268,lng:44.780228,q:"Ethnographer restaurant, 105 Akaki Beliashvili St, Tbilisi",s:[S3]}
];
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,x=Math.sin(r(c-a)/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
const nav=p=>"https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(p.q)+"&travelmode=walking";
let GO={o:null,on:"",f:"all",msg:""};
function goView(){return`<div class="box"><h2>📍 רוצים לבקר</h2><p class="sub">מקומות מ-3 סרטוני הטיקטוק. המרחק הוא בקו אוויר (ולא מסלול הליכה). המיקום שלך משמש רק לחישוב בטלפון – הוא לא נשלח ולא נשמר בשום שרת.</p>
<button class="btn" id="near">📡 מה קרוב אליי</button><button class="btn alt" id="fromh">🏨 מרחק מהמלון (Hotel Residence Plaza)</button>
<div id="gomsg">${GO.msg}</div><div class="flt">${[["all","הכל"],["a","אטרקציות"],["r","מסעדות"]].map(([k,l])=>`<button data-f="${k}" class="${GO.f==k?'on':''}">${l}</button>`).join("")}</div></div><div id="plist"></div>`}
function plist(){let L=PLACES.filter(p=>GO.f=="all"||p.k==GO.f).map(p=>({...p,km:GO.o?hav(GO.o.lat,GO.o.lng,p.lat,p.lng):null}));if(GO.o)L.sort((a,b)=>a.km-b.km);
$("#plist").innerHTML=L.map(p=>`<div class="box pl"><h2>${p.k=="r"?"🍽️":"📍"} ${p.n}${p.km!=null?`<span class="dist">${p.km<1?Math.round(p.km*1000)+" מ'":p.km.toFixed(1)+' ק"מ'}</span>`:""}</h2><p class="sub" dir="ltr" style="text-align:right">${p.e}</p><p>${p.k=="r"?"מסעדה":"אטרקציה"} · ${p.d}</p><a class="btn" href="${nav(p)}" target="_blank" rel="noopener">🧭 ניווט ב-Google Maps</a><div class="srcs">${p.s.map((u,i)=>`<a class="btn alt" href="${u}" target="_blank" rel="noopener">🎬 מקור${p.s.length>1?" "+(i+1):""}</a>`).join("")}</div></div>`).join("")}
function goInit(){$("#gomsg").innerHTML=GO.msg;plist();
document.querySelectorAll(".flt button").forEach(b=>b.onclick=()=>{GO.f=b.dataset.f;document.querySelectorAll(".flt button").forEach(x=>x.classList.toggle("on",x==b));plist()});
$("#fromh").onclick=()=>{GO.o=HOTEL;GO.msg=`<p class="note">📏 ממוין לפי מרחק מ<b>המלון</b> (לא מהמיקום הנוכחי שלך).</p>`;goInit()};
$("#near").onclick=()=>{if(!navigator.geolocation){GO.msg=`<div class="warn">המכשיר לא תומך באיתור מיקום. אפשר למיין לפי המרחק מהמלון.</div>`;return goInit()}
$("#gomsg").innerHTML=`<p class="note">⏳ מאתר מיקום…</p>`;
navigator.geolocation.getCurrentPosition(p=>{GO.o={lat:p.coords.latitude,lng:p.coords.longitude};GO.msg=`<p class="note">📡 ממוין לפי <b>המיקום הנוכחי שלך</b> (עודכן ב-${new Date().toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"})}, דיוק בערך ${Math.round(p.coords.accuracy)} מ').</p>`;goInit()},
e=>{GO.msg=`<div class="warn">${e.code==1?"הגישה למיקום נחסמה. אפשר לאשר אותה בהגדרות הדפדפן או הטלפון.":e.code==3?"איתור המיקום לקח יותר מדי זמן. כדאי לנסות שוב בחוץ.":"המיקום לא זמין כרגע."}<br>בינתיים אפשר ללחוץ על „מרחק מהמלון“.</div>`;goInit()},{enableHighAccuracy:true,timeout:15000,maximumAge:60000})}}
// --- day routes (OSRM routed-foot / routed-car, Nov 2026) ---
const CLINIC={
  n:"Akhali Khedva · ახალი ხედვა · מדרסים",
  status:"⏳ עדיין מחליטים",
  hours:"ב׳–א׳ 10:00–19:00 · מומלץ לקבוע תור מראש",
  wa:"+995 558 98 10 98",walink:"https://wa.me/995558981098",
  email:"info@akhalikhedva.ge",
  price:"אבחון 70 ₾ (≈₪86) + 240 ₾ (≈₪295) למדרס. 3 מדרסים עם אבחון: 790 ₾ (≈₪972).",
  tech:"אבחון על מסלול חיישנים איטלקי DIASU (עמידה והליכה), 20–30 דק׳. מדרסים מקצף אנטי־אלרגני PEDSAN, מחזיקים 8–12 חודשים.",
  timing:"אבחון ב־16–17.11 → מוכן ב־20–21.11.",
  shoes:"להביא נעלי ספורט גדולות בחצי עד מספר אחד. המידה שלך: 42.5–43.",
  branches:[
    {id:"dinamo",rec:1,n:"סניף דינמו (מומלץ – יש מפעל ותיקונים במקום)",e:"Tsereteli Ave 2 · Dinamo Arena, שער 5, סקטורים 1–2",lat:41.7230285,lng:44.7897943,km:6.8,min:10},
    {id:"ljub",rec:0,n:"סניף ליובליאנה",e:"Ljubljana St 60, Tbilisi",lat:41.7771655,lng:44.7746264,km:13.8,min:18}
  ]
};
const ROUTES=[
{id:"old",n:"עיר עתיקה · ריקה ונריקלה",icon:"🚶",mode:"walking",modeHe:"הליכה",start:"09:00",km:8.7,min:116,tip:"יום מלא. אפשר Bolt בחזרה מהמיידן אם עייפים (~10 דק׳ / ~2.5 ק\"מ).",stops:[
{i:9,note:"ארוחת בוקר/צהריים גאורגית (בדקו איזה סניף)",nx:"1.7 ק\"מ · 23 דק׳"},
{i:0,note:"גשר הולכי רגל מעל המטקווארי",nx:"0.3 ק\"מ · 4 דק׳"},
{i:1,note:"פארק ליד תחנת הרכבל",nx:"0.7 ק\"מ · 9 דק׳"},
{i:2,note:"עלייה ברכבל לנריקלה (כרטיס בנפרד)",nx:"0.7 ק\"מ · 9 דק׳ / או רכבל"},
{i:3,note:"תצפית על העיר העתיקה",nx:"0.5 ק\"מ · 6 דק׳"},
{i:4,note:"מסעדת גג עם נוף – הפסקת קפה/צהריים",nx:"0.6 ק\"מ · 8 דק׳"},
{i:5,note:"חזית המרחץ הצבעוני באבנוטובני",nx:"0.2 ק\"מ · 3 דק׳"},
{i:6,note:"מפל קטן בערוץ התאנים",nx:"0.6 ק\"מ · 7 דק׳"},
{i:7,note:"שוק תת־קרקעי – ואז חזרה למלון",nx:"2.5 ק\"מ · 33 דק׳ / או Bolt"}
]},
{id:"ctr",n:"מרכז · כיכר החירות וגשר יבש",icon:"🚶",mode:"walking",modeHe:"הליכה (+Bolt אופציונלי)",start:"10:30",km:8.0,min:106,tip:"הקטע מהמלון לכיכר ארוך (~3 ק\"מ). אפשר Bolt לכיכר החירות ואז להמשיך ברגל.",stops:[
{i:8,note:"כיכר מרכזית עם עמוד גאורגי הקדוש",nx:"0.1 ק\"מ · 2 דק׳"},
{i:10,note:"צהריים/ערב – צלעות, חצ'פורי ויין",nx:"0.8 ק\"מ · 11 דק׳"},
{i:11,note:"קפה/קינוח ליד הכיכר (בדקו סניף)",nx:"0.4 ק\"מ · 6 דק׳"},
{i:12,note:"שוק עתיקות ומזכרות – עדיף עד שעות אחר־הצהריים",nx:"3.4 ק\"מ · 45 דק׳ / או Bolt למלון"}
]},
{id:"north",n:"כרוניקה · גארדניה ואתנוגרפר",icon:"🚕",mode:"driving",modeHe:"מונית / Bolt",start:"14:00",km:36.3,min:58,tip:"מסלול צפון העיר ברכב. אתנוגרפר בסוף – מתאים לארוחת ערב עם מופע (בדקו לוח).",stops:[
{i:14,note:"גן ומשתלה עם בית קפה",nx:"7.8 ק\"מ · 14 דק׳ נסיעה"},
{i:13,note:"אנדרטה + תצפית לים טביליסי",nx:"8.2 ק\"מ · 13 דק׳ נסיעה"},
{i:16,note:"מסעדה גאורגית – ערב עם ריקודים (אם יש מופע)",nx:"14.4 ק\"מ · 19 דק׳ חזרה למלון"}
]},
{id:"mtsk",n:"חצי יום במצחטה",icon:"🚕",mode:"driving",modeHe:"מונית / Bolt",start:"09:00",km:56.4,min:68,tip:"נסיעה הלוך־חזור ~שעה ו־10 דק׳. השאירו 2–3 שעות באתר עצמו. חזרה עד הצהריים/אחה״צ.",stops:[
{i:15,note:"קתדרלת סבטיצחובלי ושוק מזכרות. גלידת יין בסרטון – לא לילדים.",nx:"28.9 ק\"מ · 36 דק׳ חזרה למלון"}
]}
];
function routeMaps(r){
  const o=HOTEL.lat+","+HOTEL.lng;
  const w=r.stops.map(s=>PLACES[s.i].lat+","+PLACES[s.i].lng).join("|");
  return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(o)+"&destination="+encodeURIComponent(o)+"&waypoints="+encodeURIComponent(w)+"&travelmode="+r.mode;
}
function fmtDur(m){const h=Math.floor(m/60),x=m%60;return h?h+" שע׳ "+x+" דק׳":x+" דק׳"}
let RT=+(localStorage.getItem("rt")||0);
const RSHORT=["עיר עתיקה","מרכז","כרוניקה","מצחטה"];
function clinicBox(){return `<details class="more"><summary>🩺 מדרסים · ${CLINIC.status}</summary>
<p><b>${CLINIC.n}</b></p><p>🕐 ${CLINIC.hours}</p><p>💰 ${CLINIC.price}</p><p>🔬 ${CLINIC.tech}</p><p>📅 ${CLINIC.timing}</p><p>👟 ${CLINIC.shoes}</p>
<p>📞 <a href="${CLINIC.walink}" target="_blank" rel="noopener">WhatsApp ${CLINIC.wa}</a> · <a href="mailto:${CLINIC.email}">${CLINIC.email}</a></p>
${CLINIC.branches.map(b=>`<div class="br"><b>${b.rec?"⭐ ":""}${b.n}</b><br><span class="sub">${b.e}</span><br>🚕 ~${b.km} ק"מ · ~${b.min} דק׳ מהמלון<a class="btn alt" href="https://www.google.com/maps/dir/?api=1&origin=${HOTEL.lat},${HOTEL.lng}&destination=${b.lat},${b.lng}&travelmode=driving" target="_blank" rel="noopener">🧭 ניווט ל${b.rec?"דינמו":"ליובליאנה"}</a></div>`).join("")}</details>`}
function routesView(){const r=ROUTES[RT]||ROUTES[0];
  return `<div class="rchips">${ROUTES.map((x,i)=>`<button data-r="${i}" class="${i==RT?"on":""}">${RSHORT[i]||x.n}</button>`).join("")}</div>
<section class="rhead"><h2>${r.n}</h2>
<p class="rmeta">${r.icon} ${r.modeHe} · ${r.km} ק"מ · ${fmtDur(r.min)} · יציאה ${r.start}</p>
<p class="rtip">${r.tip}</p>
<a class="btn" href="${routeMaps(r)}" target="_blank" rel="noopener">🧭 נווט במסלול</a></section>
<ol class="tl"><li class="tlend">🏨 יציאה מהמלון</li>
${r.stops.map((s,idx)=>stopCard(r,s,idx)).join("")}
<li class="tlend">🏨 חזרה למלון</li></ol>
<details class="more"><summary>ℹ️ על המסלולים</summary><p>כל מסלול מתחיל ונגמר ב־Hotel Residence Plaza. המרחקים והזמנים לפי ניתוב הליכה/נסיעה אמיתי (OSRM), בלי זמן הביקור עצמו.</p><p>📅 16–22.11 · שלבו מסלול בין האימונים. ב־22.11 הטיסה ב־12:05 – רק משהו קצר בבוקר.</p></details>
${clinicBox()}`}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const STOPEMO=["🌉","🌳","🚡","🗽","🍷","♨️","💦","🛍️","🏛️","🍲","🍖","🍰","🖼️","🗿","🌷","⛪","💃"];
function gallery(i){const L=photosOf(i);
  if(!L.length)return `<div class="gal none">${STOPEMO[i]||"📍"} <span>אין תמונות</span></div>`;
  return `<div class="gal" data-p="${i}"><div class="gtrack">${L.map((p,k)=>`<img src="${p[0]}" ${k?'loading="lazy"':''} decoding="async" alt="${esc(PLACES[i].n)} ${k+1}" data-k="${k}">`).join("")}</div>${L.length>1?`<div class="dots">${L.map((_,k)=>`<i class="${k?"":"on"}"></i>`).join("")}</div>`:""}</div>`}
function legTxt(nx){const m=nx.match(/^([\d.]+) ק"מ · (\d+) דק׳(.*)$/);return m?`${m[2]} דק׳ · ${m[1]} ק"מ${m[3]}`:nx}
function stopCard(r,s,idx){const p=PLACES[s.i],last=idx==r.stops.length-1;
  return `<li class="tls">${gallery(s.i)}<div class="srow"><span class="num">${idx+1}</span><h3>${p.n}</h3>
<a class="ib" href="${nav(p).replace("walking",r.mode)}" target="_blank" rel="noopener" aria-label="נווט">🧭</a>${(p.s||[]).map(u=>`<a class="ib" href="${u}" target="_blank" rel="noopener" aria-label="מקור">🎬</a>`).join("")}</div>
<p class="snote">${s.note}</p></li>${s.nx?`<li class="leg">↓ ${legTxt(s.nx)}${last?" (חזרה)":""}</li>`:""}`}
function routesInit(){
  document.querySelectorAll(".rchips button").forEach(b=>b.onclick=()=>{RT=+b.dataset.r;localStorage.setItem("rt",RT);$("#main").innerHTML=routesView();routesInit();scrollTo(0,0)});
  document.querySelectorAll(".gal[data-p]").forEach(g=>{const tr=g.querySelector(".gtrack"),dots=[...g.querySelectorAll(".dots i")],imgs=[...tr.children];
    if(dots.length&&"IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.intersectionRatio>.6){const k=+e.target.dataset.k;dots.forEach((d,j)=>d.classList.toggle("on",j==k))}}),{root:tr,threshold:[.6]});imgs.forEach(im=>io.observe(im))}
    imgs.forEach(im=>{im.onclick=()=>openLB(+g.dataset.p,+im.dataset.k);im.onerror=()=>{im.remove()}})})}
function openLB(i,k){const L=photosOf(i),p=PLACES[i];let cur=k;
  const lb=document.createElement("div");lb.id="lb";lb.innerHTML=`<div class="lbtop"><button class="lbx" aria-label="סגירה">✕</button><b>${p.n}</b><span class="lbc"></span></div>
<div class="lbtrack">${L.map((ph,j)=>`<figure data-k="${j}"><img src="${ph[0]}" alt="" decoding="async"></figure>`).join("")}</div>
<button class="lbn lbprev" dir="ltr" aria-label="הקודם">›</button><button class="lbn lbnext" dir="ltr" aria-label="הבא">‹</button>
<div class="lbcap"></div>`;document.body.appendChild(lb);document.body.style.overflow="hidden";
  const tr=lb.querySelector(".lbtrack"),figs=[...tr.children];
  const upd=()=>{lb.querySelector(".lbc").textContent=(cur+1)+" / "+L.length;const ph=L[cur];lb.querySelector(".lbcap").innerHTML=`צילום: <a href="${ph[2]}" target="_blank" rel="noopener">${esc(ph[1])}</a>`;lb.querySelector(".lbprev").style.visibility=cur?"visible":"hidden";lb.querySelector(".lbnext").style.visibility=cur<L.length-1?"visible":"hidden"};
  const to=(j,sm)=>{cur=Math.max(0,Math.min(L.length-1,j));figs[cur].scrollIntoView({behavior:sm?"smooth":"auto",inline:"center",block:"nearest"});upd()};
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.intersectionRatio>.6){cur=+e.target.dataset.k;upd()}}),{root:tr,threshold:[.6]});figs.forEach(f=>io.observe(f));
  const close=()=>{io.disconnect();lb.remove();document.body.style.overflow="";document.removeEventListener("keydown",key)};
  const key=e=>{if(e.key=="Escape")close();if(e.key=="ArrowLeft")to(cur+1,1);if(e.key=="ArrowRight")to(cur-1,1)};document.addEventListener("keydown",key);
  lb.querySelector(".lbx").onclick=close;lb.querySelector(".lbprev").onclick=()=>to(cur-1,1);lb.querySelector(".lbnext").onclick=()=>to(cur+1,1);
  requestAnimationFrame(()=>to(k,0))}
