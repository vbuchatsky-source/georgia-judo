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
const CLINIC={n:"Akhali Khedva · מדרסים",e:"Tsereteli Ave 2, Dinamo Arena gate 5",lat:41.7230,lng:44.7898,d:"אבחון מתוכנן 16–17.11, איסוף 20–21.11. זו משימה נפרדת, לא מסלול טיול.",kmCar:6.8,minCar:10};
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
function routesView(){
  return `<div class="box"><h2>🗺️ מסלולים מהמלון</h2>
<p class="sub">כל מסלול מתחיל ונגמר ב־Hotel Residence Plaza. המרחקים והזמנים מבוססים על ניתוב הליכה/נסיעה אמיתי (OSRM). זמן ביקור בכל אתר לא כלול – הוסיפו לפי הקצב שלכם.</p>
<p class="note">📅 16–22.11.2026 · מחנה ג'ודו – שלבו מסלול בין האימונים. ב־22.11 הטיסה ב־12:05, אז ביום האחרון רק משהו קצר בבוקר.</p></div>
<div class="box" style="background:#eef6ff"><h2>🩺 משימה · מדרסים (לא מסלול)</h2>
<p><b>${CLINIC.n}</b><br>${CLINIC.e}<br>${CLINIC.d}</p>
<p>🚕 מהמלון: ~${CLINIC.kmCar} ק"מ · ~${CLINIC.minCar} דק׳ נסיעה (ברגל ~6 ק"מ / ~80 דק׳ – לא מומלץ).</p>
<a class="btn" href="https://www.google.com/maps/dir/?api=1&origin=${HOTEL.lat},${HOTEL.lng}&destination=${CLINIC.lat},${CLINIC.lng}&travelmode=driving" target="_blank" rel="noopener">🧭 ניווט למרפאה</a></div>
`+ROUTES.map(r=>`<div class="box route"><h2>${r.icon} ${r.n}</h2>
<p><b>${r.modeHe}</b> · ~${r.km} ק"מ · נסיעה/הליכה ~${fmtDur(r.min)} · יציאה מומלצת <b>${r.start}</b></p>
<p class="sub">${r.tip}</p>
<ol class="rstops">${r.stops.map((s,idx)=>{const p=PLACES[s.i];return `<li><b>${idx+1}. ${p.k=="r"?"🍽️":"📍"} ${p.n}</b><br><span class="sub" dir="ltr" style="text-align:right">${p.e}</span><br>${s.note}${s.nx?`<br><span class="nx">↳ הלאה: ${s.nx}</span>`:""}<div class="srcs">${(p.s||[]).map((u,i)=>`<a class="btn alt" href="${u}" target="_blank" rel="noopener">🎬 מקור${p.s.length>1?" "+(i+1):""}</a>`).join("")}</div></li>`}).join("")}</ol>
<p class="sub">↩ חזרה למלון בסוף המסלול.</p>
<a class="btn" href="${routeMaps(r)}" target="_blank" rel="noopener">🧭 נווט במסלול</a>
</div>`).join("")}
function routesInit(){}
