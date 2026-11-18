// Places saved from the TikTok videos vitaly sent. Coordinates are from OpenStreetMap/Nominatim or the venue's listings; distances are approximate.
const S1="https://vt.tiktok.com/ZSphKBBVd/",S2="https://vt.tiktok.com/ZSphKn6TE/",S3="https://vt.tiktok.com/ZSphK3yQa/";
const HOTEL={n:"Hotel Residence Plaza",lat:41.692288,lng:44.833153};
const CAMP={n:"מחנה האימונים",e:'Judo Club Georgia · 144a Monk Gabriel Salos Ave',ge:'ძიუდოს კლუბი „ჯორჯია“ · ბერი გაბრიელ სალოსის გამზირი 144ა',q:"Judo Club Georgia, 144a Monk Gabriel Salos Avenue, Tbilisi",lat:41.671948,lng:44.871286,km:5.9,min:10,tel:"+995 599 93 38 97"};
const PLACES=[
{n:"גשר השלום",e:"Bridge of Peace",k:"a",d:"גשר הולכי רגל מזכוכית ופלדה מעל נהר המטקווארי, בין העיר העתיקה לפארק ריקה.",lat:41.69298,lng:44.80806,q:"Bridge of Peace, Tbilisi",s:[S1]},
{n:"פארק ריקה",e:"Rike Park",k:"a",d:"פארק על גדת הנהר, בצמוד לגשר השלום ולתחנת הרכבל.",lat:41.69320,lng:44.80999,q:"Rike Park, Tbilisi",s:[S1]},
{n:"רכבל ריקה–נריקלה (תחנה תחתונה)",e:"Rike–Narikala Cable Car",k:"a",d:"עולים ממנו למבצר נריקלה ולפסל אם גאורגיה. הנקודה היא התחנה התחתונה בפארק ריקה.",lat:41.69194,lng:44.81066,q:"Rike-Narikala cable car lower station, Rike Park, Tbilisi",s:[S1],w:1},
{n:"פסל אם גאורגיה",e:"Kartlis Deda – Mother of Georgia",k:"a",d:"פסל על הרכס מעל העיר העתיקה, עם תצפית לעיר.",lat:41.68812,lng:44.80460,q:"Mother of Georgia, Tbilisi",s:[S1]},
{n:"SEE360",e:"See360 Restaurant · 24 Betlemi St",k:"r",d:"מסעדת גג במלון TbiliSee עם תצפית על העיר העתיקה.",lat:41.689454,lng:44.806679,q:"See360 Restaurant, 24 Betlemi St, Tbilisi",s:[S1],w:1},
{n:"מרחצאות הגופרית – אבנוטובני",e:"Abanotubani · Orbeliani (Chreli) Bath",k:"a",d:"רובע המרחצאות. בסרטון מוצגת חזית מרחץ אורבליאני (המרחץ הצבעוני).",lat:41.68745,lng:44.81077,q:"Orbeliani Bath, 2 Abano St, Tbilisi",s:[S1]},
{n:"מפל לגבטחבי (ערוץ התאנים)",e:"Leghvtakhevi Waterfall",k:"a",d:"מפל קטן בערוץ, הליכה קצרה מהמרחצאות.",lat:41.68681,lng:44.80900,q:"Leghvtakhevi Waterfall, Tbilisi",s:[S1]},
{n:"בזאר מיידן (תת־קרקעי)",e:"Meidan Bazaar · Gorgasali Sq",k:"a",d:"מתחם קניות תת־קרקעי מתחת לכיכר גורגסלי.",lat:41.68981,lng:44.80887,q:"Meidan Bazaar, Tbilisi",s:[S1]},
{n:"כיכר החירות",e:"Freedom Square",k:"a",d:"הכיכר המרכזית, עם עמוד פסל גאורגי הקדוש.",lat:41.69365,lng:44.80115,q:"Freedom Square, Tbilisi",s:[S1]},
{n:"Georgian House",e:"Georgian House · Avlabari (מלון באותו שם)",k:"r",d:"⚠️ זה מלון באבלבארי באותו שם, בדרך לעיר העתיקה – לא המסעדה הידועה מהסרטון. המסעדה עם המופעים היא בכתובת 2 Tsabadze St בדידובי (מופיעה בנפרד ברשימת רוצים לבקר).",lat:41.69494,lng:44.81555,q:"Georgian House, Avlabari, Tbilisi",s:[S1],w:1},
{n:"Ribs Beer & Wine",e:"Ribs Tbilisi · 3 Galaktion Tabidze St",k:"r",d:"בסרטון: צלעות חזיר, עוף ברוטב שמנת ושום, חצ'פורי, ומנות חציל וסלק.",lat:41.69270,lng:44.80101,q:"Ribs Beer & Wine, 3 Galaktion Tabidze St, Tbilisi",s:[S2]},
{n:"Zodiaqo (ZODIACO)",e:"6 Gia Chanturia St",k:"r",d:"בסרטון לא מצוין הסניף. הכתובת היא של הסניף הידוע ליד כיכר החירות. הנקודה מסומנת ברמת הרחוב.",lat:41.69902,lng:44.79887,q:"Zodiaqo, 6 Gia Chanturia St, Tbilisi",s:[S3],w:1},
{n:"שוק הפשפשים בגשר היבש",e:"Dry Bridge Market",k:"a",d:"שוק עתיקות, אומנות ומזכרות סביב הגשר היבש.",lat:41.70050,lng:44.80259,q:"Dry Bridge Market, Tbilisi",s:[S3]},
{n:"כרוניקת גאורגיה + תצפית לים טביליסי",e:"Chronicle of Georgia",k:"a",d:"אנדרטת עמודים ענקית מעל ים טביליסי, שנראה מהאתר. נמצאת מחוץ למרכז העיר.",lat:41.77067,lng:44.81040,q:"Chronicle of Georgia, Tbilisi",s:[S3]},
{n:"Gardenia Shevardnadze",e:"138 Old Nadzaladevi",k:"a",d:"משתלה וגן עם בית קפה (זה לא הגן הבוטני הלאומי).",lat:41.73112,lng:44.83074,q:"Gardenia Shevardnadze, Tbilisi",s:[S3]},
{n:"מצחטה – קתדרלת סבטיצחובלי ושוק המזכרות",e:"Mtskheta · Svetitskhoveli",k:"a",d:"עיירה כ-20 ק\"מ מטביליסי. הקתדרלה ושוק המזכרות נמצאים בסביבתה. בסרטון מופיע גם דוכן גלידת יין בלי שם; אחוז האלכוהול לא ידוע, ולכן לא לילדים.",lat:41.84227,lng:44.72099,q:"Svetitskhoveli Cathedral, Mtskheta",s:[S3]},
{n:"Ethnographer",e:"105 Akaki Beliashvili St (דיגומי)",k:"r",d:"מסעדה גאורגית. בסרטון מוצג מופע ריקודים מסורתי; לוח המופעים העדכני לא נבדק.",lat:41.773268,lng:44.780228,q:"Ethnographer restaurant, 105 Akaki Beliashvili St, Tbilisi",s:[S3]},
{n:"מסעדת אורטצ'לה",e:"Restaurant Ortachala · 2a Tsolikauri St (Kheivani)",k:"r",d:"מסעדה גאורגית ברובע אורטצ'לה, עם טרסה ומוזיקה חיה. פתוחה כל יום 10:00–00:00.",lat:41.682217,lng:44.826947,q:"Restaurant Ortachala, 2a Tsolikauri Street, Tbilisi",s:[],want:1,tel:"+995 555 66 44 00"},
{n:"מסעדת לומוס תאי",e:"Lumos Thai Restaurant · 3 Gia Abesadze St",k:"r",d:"מסעדה תאית בעיר העתיקה, עם עיצוב בהשראת הארי פוטר. פתוחה כל יום 11:30–23:30.",lat:41.69283,lng:44.80316,q:"Lumos Thai Restaurant, 3 Gia Abesadze Street, Tbilisi",s:[],tel:"+995 598 59 93 69"},
{n:"חנות אוליוונדרס",e:"Ollivander's Shop · 5 Kekelidze St, Vake",k:"a",d:"חנות נושא של הארי פוטר: שרביטים, גלימות, צעיפים ומזכרות. פתוחה כל יום בערך 10:00–21:00.",lat:41.70801,lng:44.77828,q:"Ollivander's Shop, 5 Kekelidze Street, Tbilisi",s:[],tel:"+995 322 11 04 50"},
{n:"מסעדת Georgian House (דידובי)",e:"Georgian House restaurant · 2 Giorgi Tsabadze St",k:"r",d:"המסעדה הגאורגית הידועה, עם מופעים חיים. לא לבלבל עם המלון באותו שם באבלבארי.",lat:41.72050,lng:44.78587,q:"Georgian House restaurant, 2 Giorgi Tsabadze Street, Tbilisi",s:[S1],want:1},
{n:"מסעדת פוניקולר",e:"Funicular Restaurant · Mtatsminda plateau",k:"r",d:"מתחם היסטורי בראש הר מתצמינדה, עם תצפית על העיר. ידוע בפונצ'יקי (סופגניות קרם) בבית הקפה. עולים ברכבל הרים מהתחנה התחתונה ברחוב דניאל צ'ונקדזה, או במונית ישר למעלה (~11 ק\"מ · ~23 דק׳ מהמלון). בית הקפה פתוח כל יום 12:00–23:00.",lat:41.69466,lng:44.78667,q:"Funicular Restaurant, Mtatsminda plateau, Tbilisi",s:[],want:1,tel:"+995 577 74 44 00"},
{n:"תחנת הפוניקולר התחתונה",e:"Tbilisi Funicular lower station · 22 Daniel Chonkadze St",k:"a",d:"התחנה התחתונה של רכבל ההרים למתצמינדה ולמסעדת פוניקולר. לא לבלבל עם המסעדה בראש ההר. כ-5 ק\"מ · ~9 דק׳ במונית מהמלון (העלייה ברגל תלולה, כשעה).",lat:41.69534,lng:44.79185,q:"Tbilisi Funicular lower station, 22 Daniel Chonkadze Street, Tbilisi",s:[],w:1},
{n:"מכון מדרסים · דינמו",e:"Akhali Khedva · 2 Tsereteli Ave, Dinamo Arena",k:"s",d:"מכון המדרסים אחלי חדבה, בסניף דינמו. נכנסים בשער 5 של אצטדיון דינמו, סקטורים 1–2. פתוח כל יום 10:00–19:00. בהזמנת 3 זוגות יש 20% הנחה.",lat:41.723029,lng:44.789794,q:"Dinamo Arena, 2 Akaki Tsereteli Avenue, Tbilisi",s:[],w:1,tel:"+995 558 98 10 98",wa:"https://wa.me/995558981098"},
{n:"מכון מדרסים · ליובליאנה",e:"Akhali Khedva · 60 Ljubljana St",k:"s",d:"סניף מכון המדרסים ברחוב ליובליאנה 60, דיגומי. פתוח כל יום 10:00–19:00. בהזמנת 3 זוגות יש 20% הנחה.",lat:41.777042,lng:44.774644,q:"Akhali Khedva, 60 Ljubljana Street, Tbilisi",s:[],w:1,tel:"+995 558 98 10 98",wa:"https://wa.me/995558981098"},
{n:"מסעדת פסנאורי",e:"Pasanauri · 1 Vakhtang Gorgasali St",k:"r",ico:"🍴",d:"מסעדה גאורגית ידועה ליד כיכר מיידן, ברחוב וכטנג גורגסלי 1. ידועה בחינкали. פתוחה כל יום 10:00–01:00. מהמלון כ-2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית.",lat:41.689684,lng:44.809689,q:"Pasanauri, 1 Vakhtang Gorgasali Street, Tbilisi",s:[],want:1,tel:"+995 595 54 77 55"},
{n:"מבצר נריקלה",e:"Narikala Fortress",k:"a",ico:"🏰",d:"מבצר עתיק על הרכס מעל העיר העתיקה. אפשר לעלות ברגל מהמפל או לרדת ברכבל לפארק ריקה.",lat:41.687729,lng:44.809111,q:"Narikala Fortress, Tbilisi",s:[]},
{n:"כנסיית מטכי",e:"Metekhi Church",k:"a",ico:"⛪",d:"כנסייה על צוק מעל הנהר, עם תצפית לעיר העתיקה ולמבצר נריקלה.",lat:41.690152,lng:44.811248,q:"Metekhi Church, Tbilisi",s:[]},
{n:"קתדרלת סיוני",e:"Sioni Cathedral",k:"a",ico:"⛪",d:"הקתדרלה ההיסטורית של טביליסי, ברחוב סיוני בעיר העתיקה.",lat:41.691314,lng:44.807525,q:"Sioni Cathedral, Tbilisi",s:[]},
{n:"כנסיית אנצ'יסחטי",e:"Anchiskhati Basilica",k:"a",ico:"⛪",d:"הכנסייה העתיקה ביותר בטביליסי ששרדה, ברחוב שבתלי ליד מגדל השעון.",lat:41.695502,lng:44.806873,q:"Anchiskhati Basilica, Tbilisi",s:[]},
{n:"רחוב שרדני",e:"Shardeni Street · Jean Chardin St",k:"a",ico:"🛍️",d:"סימטה להולכי רגל בין כיכר מיידן לקתדרלת סיוני, עם בתי קפה ומסעדות.",lat:41.690520,lng:44.808408,q:"Jean Chardin Street, Tbilisi",s:[]},
{n:"מגדל השעון של גבריאדזה",e:"Gabriadze Clock Tower · Shavteli St",k:"a",ico:"🕰️",d:"מגדל שעון צבעוני ליד תיאטרון הבובות של רזו גבריאדזה, ברחוב שבתלי.",lat:41.695806,lng:44.806514,q:"Gabriadze Clock Tower, Tbilisi",s:[]},
{n:"כיכר אירופה",e:"Europe Square",k:"a",ico:"🟦",d:"כיכר על הגדה השמאלית של הנהר, בין כנסיית מטכי לפארק ריקה.",lat:41.691127,lng:44.811265,q:"Europe Square, Tbilisi",s:[]},
{n:"כיכר ארקלה השני",e:"Erekle II Square",k:"a",ico:"🏛️",d:"כיכר קטנה בעיר העתיקה, בין גשר השלום לרחוב שבתלי.",lat:41.694288,lng:44.806413,q:"Erekle II Square, Tbilisi",s:[]},
{n:"הכניסה לגן הבוטני",e:"National Botanical Garden · Botanikuri St",k:"a",ico:"🌿",d:"הכניסה התחתונה לגן הבוטני הלאומי, ברחוב בוטניקורי ליד מפל לגבטחבי.",lat:41.687142,lng:44.809861,q:"Tbilisi Botanical Garden, Botanikuri Street, Tbilisi",s:[]},
{n:"סולולאקי · רחוב לדו אסתיאני",e:"Sololaki · Lado Asatiani St",k:"a",ico:"🎨",d:"רחוב ברובע סולולאקי, עם בתים בסגנון אר נובו.",lat:41.689544,lng:44.798085,q:"Lado Asatiani Street, Sololaki, Tbilisi",s:[]},
{n:"רחוב קוטה אפחזי (לסלידזה)",e:"Kote Abkhazi St · formerly Leselidze",k:"a",ico:"🛍️",d:"הרחוב המסחרי של העיר העתיקה, לשעבר לסלידזה, מהמיידן לכיוון כיכר החירות.",lat:41.692810,lng:44.805616,q:"Kote Abkhazi Street, Tbilisi",s:[]},
{n:"קניון גלריה",e:"Galleria Tbilisi · 2/4 Shota Rustaveli Ave",k:"a",ico:"🛍️",d:"קניון בכיכר החירות, בדרך רוסתוולי 2/4. פתוח כל יום 10:00–22:00. מהמלון כ-3.5 ק\"מ · 47 דק׳ הליכה, או כ-8 דק׳ במונית. מפסנאורי כ-1.4 ק\"מ · 19 דק׳ הליכה.",lat:41.694443,lng:44.799823,q:"Galleria Tbilisi, 2/4 Shota Rustaveli Avenue, Tbilisi",s:[],want:1,tel:"+995 32 250 00 40"}

];
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,x=Math.sin(r(c-a)/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
function navMode(p){const i=PLACES.indexOf(p);let drive=0,walk=0;
  if(typeof ROUTES!=="undefined")for(const r of ROUTES){if(r.stops.some(s=>s.i===i)){if(r.mode==="driving")drive=1;else walk=1}}
  if(drive&&!walk)return"driving";
  if(isFinite(p.lat)&&hav(HOTEL.lat,HOTEL.lng,p.lat,p.lng)>3)return"driving";
  return"walking"}
const nav=(p,mode)=>"https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(p.q)+"&travelmode="+(mode||navMode(p));

function wantedBox(){
  const L=PLACES.filter(p=>p.want).map(p=>({...p,km:hav(HOTEL.lat,HOTEL.lng,p.lat,p.lng)}));
  if(!L.length)return"";
  return `<div class="box"><h2>🍽️ רוצים לבקר</h2>`+L.map(p=>`<h3>${p.ico?p.ico+" ":""}${p.n}</h3><p class="sub" dir="ltr" style="text-align:right">${p.e}</p><p>${p.d}</p><p class="sub">כ-${p.km<1?Math.round(p.km*1000)+" מ'":p.km.toFixed(1)+' ק"מ'} מהמלון</p>
<a class="btn" href="${nav(p)}" target="_blank" rel="noopener">🧭 ניווט ב-Google Maps</a>${p.tel?`<a class="btn alt" href="tel:${p.tel.replace(/[^\d+]/g,"")}">📞 ${p.tel}</a>`:""}`).join("")+`</div>`;
}
// --- day routes (OSRM routed-foot / routed-car, Nov 2026) ---
const CLINIC={
  n:"Akhali Khedva · ახალი ხედვა · מדרסים",
  status:"⏳ עדיין מחליטים",
  hours:"כל יום 10:00–19:00 · מומלץ לקבוע תור מראש",
  wa:"+995 558 98 10 98",walink:"https://wa.me/995558981098",
  email:"info@akhalikhedva.ge",
  price:"אבחון 70 ₾ (≈₪86) + 240 ₾ (≈₪295) למדרס. 3 מדרסים עם אבחון: 790 ₾ (≈₪972). הנחה 20% בהזמנת 3 זוגות.",
  tech:"אבחון על מסלול חיישנים איטלקי DIASU (עמידה והליכה), 20–30 דק׳. מדרסים מקצף אנטי־אלרגני PEDSAN, מחזיקים 8–12 חודשים.",
  timing:"אבחון ב־16–17.11 → מוכן ב־20–21.11.",
  shoes:"להביא נעלי ספורט גדולות בחצי עד מספר אחד. המידה שלך: 42.5–43.",
  branches:[
    {id:"dinamo",rec:1,n:"סניף דינמו (מומלץ – יש מפעל ותיקונים במקום)",e:"Tsereteli Ave 2 · אצטדיון דינמו, שער 5, סקטורים 1–2",lat:41.723029,lng:44.789794,km:6.8,min:10},
    {id:"ljub",rec:0,n:"סניף ליובליאנה",e:"Ljubljana (Lyublyana) St 60, דיגומי",lat:41.777042,lng:44.774644,km:13.8,min:18}
  ]
};
const ROUTES=[
{id:"old",n:"עיר עתיקה · סיבוב מפסנאורי",icon:"🚶",mode:"walking",modeHe:"הליכה",start:"10:00",km:5.8,min:78,loop:1,fromH:"2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית",tip:"סיבוב רגלי בעיר העתיקה, מתחיל ונגמר במסעדת פסנאורי (פתוחה כל יום 10:00–01:00). כ-5.8 ק\"מ · כשעה ורבע הליכה, ובסך הכל כשעתיים–שלוש עם עצירות. מפסל אם גאורגיה אפשר לרדת ברכבל לפארק ריקה במקום ברגל (בחורף הרכבל 10:00–22:00).",stops:[
{i:25,note:"מסעדה גאורגית ידועה בחינкали. כאן מתחילים וחוזרים. פתוחה כל יום 10:00–01:00.",nx:"0.5 ק\"מ · 6 דק׳"},
{i:27,note:"כנסייה על צוק מעל הנהר, עם תצפית לעיר העתיקה ולנריקלה.",nx:"0.5 ק\"מ · 6 דק׳"},
{i:7,note:"שוק תת־קרקעי מתחת לכיכר גורגסלי.",nx:"0.4 ק\"מ · 6 דק׳",skipMaps:1},
{i:5,note:"חזית המרחץ הצבעוני באבנוטובני.",nx:"0.2 ק\"מ · 3 דק׳"},
{i:6,note:"מפל קטן בערוץ התאנים. מכאן עולים למבצר.",nx:"0.4 ק\"מ · 6 דק׳"},
{i:26,note:"מבצר על הרכס – תצפית על העיר. ממשיכים מערבה לפסל אם גאורגיה.",nx:"0.9 ק\"מ · 12 דק׳"},
{i:3,note:"פסל ונקודת תצפית. אפשר לרדת ברכבל לפארק ריקה במקום ברגל.",nx:"1.3 ק\"מ · 18 דק׳ / או רכבל"},
{i:1,note:"פארק על גדת הנהר, ליד התחנה התחתונה של הרכבל.",nx:"0.3 ק\"מ · 4 דק׳"},
{i:0,note:"גשר הולכי רגל מזכוכית ופלדה מעל המטקווארי.",nx:"0.4 ק\"מ · 6 דק׳"},
{i:31,note:"מגדל שעון צבעוני ליד תיאטרון הבובות של רזו גבריאדזה.",nx:"0.1 ק\"מ · 1 דק׳"},
{i:29,note:"הכנסייה העתיקה ביותר בטביליסי ששרדה.",nx:"0.5 ק\"מ · 7 דק׳",skipMaps:1},
{i:28,note:"הקתדרלה ההיסטורית של טביליסי.",nx:"0.1 ק\"מ · 2 דק׳"},
{i:30,note:"סימטה להולכי רגל עם בתי קפה ומסעדות – ואז חזרה לפסנאורי.",nx:"0.2 ק\"מ · 3 דק׳",skipMaps:1}
]},
{id:"ctr",n:"מרכז · כיכר החירות וגשר יבש",icon:"🚶",mode:"walking",modeHe:"הליכה (+Bolt אופציונלי)",start:"10:30",km:8.1,min:108,fromH:"2.9 ק\"מ · 39 דק׳",tip:"הקטע מהמלון ללומוס ולכיכר ארוך (כ-2.9 ק\"מ, כ-40 דק׳ הליכה). אפשר Bolt עד לומוס או הכיכר ואז להמשיך ברגל.",stops:[
{i:18,note:"מסעדה תאית עם עיצוב בהשראת הארי פוטר. פתוחה 11:30–23:30.",nx:"0.3 ק\"מ · 4 דק׳"},
{i:8,note:"כיכר מרכזית עם עמוד גאורגי הקדוש",nx:"0.1 ק\"מ · 2 דק׳"},
{i:10,note:"צהריים/ערב – צלעות, חצ'פורי ויין",nx:"0.9 ק\"מ · 11 דק׳"},
{i:11,note:"קפה/קינוח ליד הכיכר (בדקו סניף)",nx:"0.4 ק\"מ · 6 דק׳"},
{i:12,note:"שוק עתיקות ומזכרות – עדיף עד שעות אחר־הצהריים",nx:"3.4 ק\"מ · 45 דק׳ / או Bolt למלון"}
]},
{id:"north",n:"כרוניקה · גארדניה ואתנוגרפר",icon:"🚕",mode:"driving",modeHe:"מונית / Bolt",start:"14:00",km:36.7,min:58,fromH:"5.9 ק\"מ · 12 דק׳ נסיעה",tip:"מסלול צפון העיר ברכב. אתנוגרפר בסוף – מתאים לארוחת ערב עם מופע (בדקו לוח).",stops:[
{i:14,note:"גן ומשתלה עם בית קפה",nx:"7.8 ק\"מ · 14 דק׳ נסיעה"},
{i:13,note:"אנדרטה + תצפית לים טביליסי",nx:"8.6 ק\"מ · 13 דק׳ נסיעה"},
{i:16,note:"מסעדה גאורגית – ערב עם ריקודים (אם יש מופע)",nx:"14.4 ק\"מ · 19 דק׳ חזרה למלון"}
]},
{id:"mtsk",n:"חצי יום במצחטה",icon:"🚕",mode:"driving",modeHe:"מונית / Bolt",start:"09:00",km:58.6,min:73,fromH:"27.5 ק\"מ · 33 דק׳ נסיעה",tip:"נסיעה הלוך־חזור כשעה ו־15 דק׳, כולל עצירה קצרה בחנות אוליוונדרס בדרך חזרה (פתוחה 10:00–21:00). השאירו 2–3 שעות באתר עצמו.",stops:[
{i:15,note:"קתדרלת סבטיצחובלי ושוק מזכרות. גלידת יין בסרטון – לא לילדים.",nx:"22.6 ק\"מ · 27 דק׳ נסיעה"},
{i:19,note:"חנות מזכרות בהשראת הארי פוטר – שרביטים, גלימות וצעיפים.",nx:"8.3 ק\"מ · 12 דק׳ חזרה למלון"}
]},
{id:"fort",n:"מבצר ונוף",icon:"🏰",mode:"walking",modeHe:"הליכה",start:"10:00",km:2.7,min:36,loop:1,short:1,fromH:"2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית",tip:"עלייה למבצר נריקלה ולפסל אם גאורגיה, עם המפל והכניסה לגן הבוטני. כ-2.7 ק\"מ · 36 דק׳ הליכה, ובגלל העלייה כ-45–60 דק׳ בפועל. אפשר גם לעלות או לרדת ברכבל מפארק ריקה (בחורף 10:00–22:00).",stops:[
{i:25,note:"כאן מתחילים וחוזרים.",nx:"0.3 ק\"מ · 5 דק׳"},
{i:34,note:"הכניסה התחתונה לגן הבוטני, ליד המפל.",nx:"0.2 ק\"מ · 3 דק׳"},
{i:6,note:"מפל קטן בערוץ התאנים. מכאן עולים במדרגות למבצר.",nx:"0.4 ק\"מ · 6 דק׳"},
{i:26,note:"מבצר על הרכס – תצפית על העיר.",nx:"0.9 ק\"מ · 12 דק׳"},
{i:3,note:"פסל ונקודת תצפית. אפשר לרדת ברכבל במקום במדרגות, ואז לחזור לפסנאורי.",nx:"0.8 ק\"מ · 11 דק׳"}
]},
{id:"river",n:"נהר וגשרים",icon:"🌉",mode:"walking",modeHe:"הליכה",start:"10:00",km:3.4,min:45,loop:1,short:1,fromH:"2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית",tip:"סיבוב לאורך הנהר והגשרים: מטכי, כיכר אירופה, פארק ריקה וגשר השלום. כ-3.4 ק\"מ · 45 דק׳ הליכה.",stops:[
{i:25,note:"כאן מתחילים וחוזרים.",nx:"0.5 ק\"מ · 6 דק׳"},
{i:27,note:"כנסייה על צוק מעל הנהר, עם תצפית לעיר העתיקה.",nx:"0.8 ק\"מ · 11 דק׳"},
{i:32,note:"כיכר על הגדה השמאלית, בדרך לפארק ריקה.",nx:"0.7 ק\"מ · 10 דק׳"},
{i:1,note:"פארק על גדת הנהר, ליד הרכבל וגשר השלום.",nx:"0.3 ק\"מ · 4 דק׳"},
{i:0,note:"גשר הולכי רגל מזכוכית ופלדה מעל המטקווארי.",nx:"0.3 ק\"מ · 5 דק׳"},
{i:33,note:"כיכר קטנה בעיר העתיקה – ואז חזרה לפסנאורי.",nx:"0.8 ק\"מ · 10 דק׳"}
]},
{id:"lanes",n:"סמטאות ומרחצאות",icon:"♨️",mode:"walking",modeHe:"הליכה",start:"10:00",km:2.5,min:33,loop:1,short:1,fromH:"2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית",tip:"סמטאות העיר העתיקה ורובע המרחצאות. כ-2.5 ק\"מ · 33 דק׳ הליכה, ועם עצירות לקפה או למרחץ כ-45–60 דק׳.",stops:[
{i:25,note:"כאן מתחילים וחוזרים.",nx:"0.3 ק\"מ · 4 דק׳"},
{i:5,note:"חזית המרחץ הצבעוני באבנוטובני.",nx:"0.4 ק\"מ · 6 דק׳"},
{i:7,note:"שוק תת־קרקעי מתחת לכיכר גורגסלי.",nx:"0.1 ק\"מ · 1 דק׳"},
{i:30,note:"סימטה להולכי רגל עם בתי קפה ומסעדות.",nx:"0.1 ק\"מ · 2 דק׳"},
{i:28,note:"הקתדרלה ההיסטורית של טביליסי.",nx:"0.5 ק\"מ · 7 דק׳"},
{i:29,note:"הכנסייה העתיקה ביותר בטביליסי ששרדה.",nx:"0.1 ק\"מ · 1 דק׳"},
{i:31,note:"מגדל שעון צבעוני ליד תיאטרון הבובות – ואז חזרה לפסנאורי.",nx:"0.9 ק\"מ · 11 דק׳"}
]},
{id:"solo",n:"סולולאקי וחירות",icon:"🎨",mode:"walking",modeHe:"הליכה",start:"10:00",km:3.2,min:43,loop:1,short:1,fromH:"2.4 ק\"מ · 32 דק׳ הליכה, או כ-6 דק׳ במונית",tip:"לכיוון כיכר החירות ורובע סולולאקי, כולל קניון גלריה (פתוח כל יום 10:00–22:00). כ-3.2 ק\"מ · 43 דק׳ הליכה.",stops:[
{i:25,note:"כאן מתחילים וחוזרים.",nx:"0.6 ק\"מ · 8 דק׳"},
{i:36,note:"הרחוב המסחרי של העיר העתיקה, לשעבר לסלידזה.",nx:"0.5 ק\"מ · 7 דק׳"},
{i:8,note:"הכיכר המרכזית, עם עמוד פסל גאורגי הקדוש. מכאן מתחיל גם שדרת רוסתוולי.",nx:"0.3 ק\"מ · 4 דק׳"},
{i:37,note:"קניון בכיכר החירות. פתוח כל יום 10:00–22:00.",nx:"0.8 ק\"מ · 10 דק׳"},
{i:35,note:"רחוב ברובע סולולאקי עם בתי אר נובו – ואז חזרה לפסנאורי.",nx:"1.0 ק\"מ · 14 דק׳"}
]}
];
function routeMaps(r){
  if(r.loop){
    const o=PLACES[r.stops[0].i].lat+","+PLACES[r.stops[0].i].lng;
    const w=r.stops.slice(1).filter(s=>!s.skipMaps).map(s=>PLACES[s.i].lat+","+PLACES[s.i].lng);
    return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(o)+"&destination="+encodeURIComponent(o)+"&waypoints="+encodeURIComponent(w.join("|"))+"&travelmode="+r.mode;
  }
  const o=HOTEL.lat+","+HOTEL.lng;
  const w=r.stops.map(s=>PLACES[s.i].lat+","+PLACES[s.i].lng).join("|");
  return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(o)+"&destination="+encodeURIComponent(o)+"&waypoints="+encodeURIComponent(w)+"&travelmode="+r.mode;
}
function fmtDur(m){const h=Math.floor(m/60),x=m%60;return h?h+" שע׳ "+x+" דק׳":x+" דק׳"}
let RT=+(localStorage.getItem("rt")||0);
const RSHORT=["עיר עתיקה","מרכז","כרוניקה","מצחטה","מבצר ונוף","נהר וגשרים","סמטאות ומרחצאות","סולולאקי וחירות"];
function clinicBox(){return `<div class="box"><h2>👟 מכון מדרסים</h2>
<p><b>${CLINIC.n}</b></p><p>🕐 ${CLINIC.hours}</p><p>💰 ${CLINIC.price}</p><p>🔬 ${CLINIC.tech}</p><p>📅 ${CLINIC.timing}</p><p>👟 ${CLINIC.shoes}</p>
<p class="sub">${CLINIC.status}</p>
<a class="btn" href="${CLINIC.walink}" target="_blank" rel="noopener">💬 WhatsApp ${CLINIC.wa}</a>
<a class="btn alt" href="mailto:${CLINIC.email}">✉️ ${CLINIC.email}</a>
${CLINIC.branches.map(b=>`<div class="br"><b>${b.rec?"⭐ ":""}${b.n}</b><br><span class="sub">${b.e}</span><br>🚕 ~${b.km} ק"מ · ~${b.min} דק׳ מונית מהמלון<a class="btn alt" href="https://www.google.com/maps/dir/?api=1&origin=${HOTEL.lat},${HOTEL.lng}&destination=${b.lat},${b.lng}&travelmode=driving" target="_blank" rel="noopener">🧭 ניווט ל${b.rec?"דינמו":"ליובליאנה"}</a></div>`).join("")}</div>`}
function rtChip(i){const x=ROUTES[i],col=typeof RTCOL!=="undefined"&&RTCOL[x.id];
  return `<button data-r="${i}" class="${i==RT?"on":""}">${col?`<i class="rcdot" style="background:${col}"></i>`:""}${RSHORT[i]||x.n}</button>`}
function routesView(){const r=ROUTES[RT]||ROUTES[0],loop=!!r.loop,p0=loop?PLACES[r.stops[0].i]:null,ico=p0&&(p0.ico||"🍴");
  const lead=loop&&r.fromH?`<p class="sub">מהמלון עד ${p0.n}: ${r.fromH}</p>`:"";
  const head=loop?"":`<li class="tlend">🏨 יציאה מהמלון</li>${r.fromH?`<li class="leg">↓ ${legTxt(r.fromH)}</li>`:""}`;
  const foot=loop?`<li class="tlend">${ico} חזרה ל${p0.n}</li>`:`<li class="tlend">🏨 חזרה למלון</li>`;
  const days=ROUTES.map((x,i)=>i).filter(i=>!ROUTES[i].short),shorts=ROUTES.map((x,i)=>i).filter(i=>ROUTES[i].short);
  const col=typeof RTCOL!=="undefined"&&RTCOL[r.id];
  return `<div class="rchips">${days.map(rtChip).join("")}</div>
<div class="box shortsbox"><h2>🍴 טיולים קצרים מפסנאורי</h2>
<p class="sub">ארבע יציאות קצרות מהמסעדה, כל אחת בצבע אחר על המפה.</p>
<div class="rchips">${shorts.map(rtChip).join("")}</div></div>
<section class="rhead"><h2>${col?`<i class="rcdot" style="background:${col}"></i>`:""}${r.n}</h2>
<p class="rmeta">${r.icon} ${r.modeHe} · ${r.km} ק"מ · ${fmtDur(r.min)}${r.short?"":" · יציאה "+r.start}</p>
<p class="rtip">${r.tip}</p>${lead}
<a class="btn" href="${routeMaps(r)}" target="_blank" rel="noopener">🧭 נווט במסלול</a></section>
<ol class="tl">${head}
${r.stops.map((s,idx)=>stopCard(r,s,idx)).join("")}
${foot}</ol>
<details class="more"><summary>ℹ️ על המסלולים</summary><p>מסלול העיר העתיקה הארוך וארבעת הטיולים הקצרים מתחילים ונגמרים במסעדת פסנאורי. שאר המסלולים מתחילים ונגמרים במלון Residence Plaza. המרחקים והזמנים לפי ניתוב הליכה/נסיעה אמיתי (OSRM), בלי זמן הביקור עצמו.</p><p>📅 16–22.11 · שלבו מסלול בין האימונים. ב־22.11 הטיסה ב־12:05 – רק משהו קצר בבוקר.</p></details>
${clinicBox()}`}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const STOPEMO=["🌉","🌳","🚡","🗽","🍷","♨️","💦","🛍️","🏛️","🍲","🍖","🍰","🖼️","🗿","🌷","⛪","💃","🍽️","🍜","🪄","🍲","🍩","🚡","👟","👟","🍴","🏰","⛪","⛪","⛪","🛍️","🕰️","🟦","🏛️","🌿","🎨","🛍️","🛍️"];
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
