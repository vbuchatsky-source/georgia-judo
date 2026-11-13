const PACK_KEY="georgia-pack";
const PACK_DEF=[
  {id:"home",title:"לא לשכוח לפני היציאה",items:[
    {id:"home-palm",t:"לחבר את הדקל להשקיה"}
  ]},
  {id:"docs",title:"📄 מסמכים",items:[
    {id:"docs-pp",t:"דרכונים ×4"},
    {id:"docs-ins",t:"אישור ביטוח באנגלית (PDF)"},
    {id:"docs-fly",t:"כרטיסי טיסה LY5107 / LY5118"},
    {id:"docs-hotel",t:"פרטי המלון Residence Plaza"},
    {id:"docs-card",t:"כרטיס אשראי + מעט מזומן"}
  ]},
  {id:"judo",title:"🥋 ג'ודו",items:[
    {id:"judo-gi",t:"ג'ודוגי לאדם ולטום"},
    {id:"judo-belt",t:"חגורות"},
    {id:"judo-flip",t:"כפכפים לאולם"},
    {id:"judo-tape",t:"טייפ"},
    {id:"judo-bottle",t:"בקבוק מים"}
  ]},
  {id:"clothes",title:"🧥 בגדים",items:[
    {id:"cl-rain",t:"מעיל גשם"},
    {id:"cl-warm",t:"שכבות חמות"},
    {id:"cl-umb",t:"מטריה"},
    {id:"cl-socks",t:"גרביים ותחתונים"},
    {id:"cl-change",t:"בגדים להחלפה אחרי אימון"}
  ]},
  {id:"elec",title:"🔌 אלקטרוניקה",items:[
    {id:"el-hp",t:"אוזניות של ויטאלי"},
    {id:"el-laptop",t:"לפטופ + מטען (Lenovo Legion)"},
    {id:"el-chg",t:"מטעני טלפון"},
    {id:"el-pb",t:"מטען נייד"},
    {id:"el-plug",t:"מתאם שקע אירופאי C/F"}
  ]},
  {id:"health",title:"🧴 טואלטיקה ותרופות",items:[
    {id:"hl-pad",t:"מטלית נגד השתנה לטום"},
    {id:"hl-med",t:"תרופות קבועות"},
    {id:"hl-pain",t:"משכך כאבים"},
    {id:"hl-brush",t:"מברשות שיניים ומשחה"},
    {id:"hl-plaster",t:"פלסטרים"}
  ]}
];
const packEsc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function packLoad(){try{const s=JSON.parse(localStorage.getItem(PACK_KEY)||"{}");return{done:s.done||{},hide:s.hide||[],extra:s.extra||{}}}catch(e){return{done:{},hide:[],extra:{}}}}
function packSave(s){localStorage.setItem(PACK_KEY,JSON.stringify(s))}
function packItems(g,s){return g.items.filter(i=>!s.hide.includes(i.id)).concat(s.extra[g.id]||[])}
function packView(){
  const s=packLoad();
  let total=0,done=0;
  const groups=PACK_DEF.map(g=>{
    const items=packItems(g,s);
    total+=items.length;
    done+=items.filter(i=>s.done[i.id]).length;
    const rows=items.map(i=>`<div class="chk ${s.done[i.id]?"done":""}"><label><input type="checkbox" data-pack="toggle" data-id="${packEsc(i.id)}" ${s.done[i.id]?"checked":""}>${packEsc(i.t)}</label><button type="button" class="del" data-pack="del" data-g="${g.id}" data-id="${packEsc(i.id)}" aria-label="מחיקה">×</button></div>`).join("");
    return `<div class="box${g.id==="home"?" leave":""}" data-g="${g.id}"><h2>${g.title}</h2>${rows}<div class="padd"><input data-pack="add" data-g="${g.id}" placeholder="פריט נוסף…" maxlength="80"><button type="button" data-pack="addbtn" data-g="${g.id}">הוספה</button></div></div>`;
  }).join("");
  return `<div class="box"><h2>✅ רשימת ציוד</h2><p class="pksum">סומן <b>${done}</b> מתוך <b>${total}</b></p><p class="sub">סימונים נשמרים בטלפון הזה. אפשר להוסיף ולמחוק פריטים.</p></div>`+groups;
}
function packAdd(g,text){
  text=(text||"").trim();if(!text)return;
  const s=packLoad();
  const all=packItems(PACK_DEF.find(x=>x.id===g),s);
  if(all.some(i=>i.t===text))return;
  (s.extra[g]=s.extra[g]||[]).push({id:"c-"+Date.now(),t:text});
  packSave(s);packRedraw();
}

function packRedraw(){
  const y=scrollY;
  $("#main").innerHTML=packView();
  packInit();
  scrollTo(0,y);
}
function packInit(){
  $("#main").onclick=e=>{
    const b=e.target.closest("[data-pack]");if(!b)return;
    const act=b.dataset.pack,s=packLoad();
    if(act==="toggle"){s.done[b.dataset.id]=b.checked;packSave(s);b.closest(".chk").classList.toggle("done",b.checked);
      const all=PACK_DEF.flatMap(g=>packItems(g,s));const d=all.filter(i=>s.done[i.id]).length;const el=$(".pksum");if(el)el.innerHTML=`סומן <b>${d}</b> מתוך <b>${all.length}</b>`}
    if(act==="del"){e.preventDefault();e.stopPropagation();const id=b.dataset.id,g=b.dataset.g;if(PACK_DEF.some(x=>x.items.some(i=>i.id===id))){if(!s.hide.includes(id))s.hide.push(id)}else{s.extra[g]=(s.extra[g]||[]).filter(i=>i.id!==id)}delete s.done[id];packSave(s);packRedraw()}
    if(act==="addbtn"){const inp=$(`input[data-pack="add"][data-g="${b.dataset.g}"]`);packAdd(b.dataset.g,inp&&inp.value)}
  };
  $("#main").onkeydown=e=>{
    if(e.key!=="Enter")return;
    const inp=e.target.closest('input[data-pack="add"]');if(!inp)return;
    e.preventDefault();packAdd(inp.dataset.g,inp.value);
  };
}
