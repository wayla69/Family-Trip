/* ===== v2 memories: kids' memory book =====
   moments/{id} (db, shared)  ·  photos in assets (writers only)  ·  stories via sample  ·  book download via downloads
   Every record carries trip:"hk2026" so the same store can hold many trips later. */
const TRIP_ID = "hk2026";
const KIDS = [{id:"mimi",th:"มีมี่",en:"Mimi",e:"👧",age:{th:"3 ขวบ",en:"3"}},{id:"mika",th:"มีก้า",en:"Mika",e:"👶",age:{th:"1 ขวบครึ่ง",en:"1½"}}];
const MOODS = ["😄","🥰","🤩","😋","😴","😢"];
const FIRSTS = [["plane","✈️","นั่งเครื่องบินข้ามประเทศ","A flight to another country"],["bridge","🌉","ข้ามสะพานทะเลยาว ฮ่องกง–มาเก๊า","Crossing the long sea bridge"],["ferry","🚢","นั่งเรือข้ามทะเล","A ferry across the sea"],
  ["train","🚆","นั่ง Airport Express / MTR","Airport Express / MTR"],["mickey","🐭","เจอมิกกี้เมาส์ตัวจริง","Meeting Mickey Mouse"],["sponge","🧽","เจอสพันจ์บ็อบที่ Nickelodeon","SpongeBob at Nickelodeon Town"],
  ["water","🌊","เล่นสวนน้ำ","The water park"],["teamlab","✨","ห้องศิลปะแสงสี teamLab","The teamLab light art room"],["dimsum","🥟","กินติ่มซำ","Dim sum"],["lights","🎄","ดูไฟประดับคริสต์มาส","Christmas lights"]];
const MM = {
  th:{tab:"ความทรงจำ", heroT:"สมุดความทรงจำ", heroS:"ของมีมี่และมีก้า", openBook:"เปิดสมุดทริปนี้ →", photos:"รูป", quotes:"คำพูด", firsts:"ครั้งแรก", places:"ที่ไป",
      placesT:"วันนี้ไปไหนมา", noPlaces:"ยังไม่มีเช็กอินของวันนี้", goCk:"ไปเช็กอิน →", photosT:"รูปของวัน", addPh:"เพิ่มรูป", upl:(i,n)=>`กำลังอัปโหลด ${i}/${n}…`, noUp:"การลงรูปต้องมีสิทธิ์ Editor — ขอให้เจ้าของแชร์แบบ Editor ให้ หรือให้เจ้าของลงรูปให้", usage:(a,b)=>`พื้นที่เก็บรูปใช้ไปแล้ว ${a} จาก ${b} MB`,
      quoteT:"คำพูดน่ารักวันนี้ 💬", quoteH:"เช่น “มีมี่บอกว่า ปลาอยู่ในน้ำเหมือนหนูเลย”", save:"บันทึก", both:"ทั้งคู่", moodT:"วันนี้รู้สึกยังไง", favT:"จดไว้", favH:"ของโปรดวันนี้ (อาหาร เครื่องเล่น ที่เที่ยว)", noteH:"บันทึกของพ่อแม่ — อะไรที่อยากจำไว้",
      firstsT:"ครั้งแรกของหนู 🌟", firstsS:"แตะรูปเด็กที่เป็นครั้งแรกของเขา", firstAdd:"ครั้งแรกอื่น ๆ…", storyT:"นิทานของวันนี้ ✨", storyBtn:"ให้ Claude แต่งนิทานจากบันทึกวันนี้", storyAgain:"แต่งใหม่", storyStop:"หยุด", storyThink:"กำลังแต่งนิทาน…", storyNeed:"เพิ่มรูปคำบรรยาย คำพูด หรือเช็กอินอย่างน้อยหนึ่งอย่างก่อน",
      del:"ลบ", delSure:"แตะอีกครั้งเพื่อลบ", hi:"ไฮไลต์", close:"ปิด", capH:"เขียนคำอธิบายรูป (ไม่บังคับ)", viewOnly:"ดูได้อย่างเดียว — สิทธิ์ของคุณแก้ไขไม่ได้", local:"บันทึกเฉพาะเครื่องนี้",
      ctaToday:"บันทึกความทรงจำวันนี้", ctaSub:"รูป · คำพูดน่ารัก · อารมณ์ของมีมี่และมีก้า", ctaBook:"เปิดสมุดความทรงจำ", ctaBookSub:"รวมรูป คำพูด และตราประทับของทริปนี้",
      bookT:"สมุดทริป", bookCover:"ทริปแรกในสมุด", stampT:"ตราประทับ", stampOn:"ได้ตราประทับแล้ว!", stampOff:"ตราประทับจะได้เมื่อกดจบครบ 6 วัน", hlT:"ช่วงเวลาที่ชอบที่สุด ⭐", hlEmpty:"แตะ ⭐ ที่รูปหรือคำพูด เพื่อเก็บไว้ที่นี่",
      allStoryT:"นิทานของทั้งทริป", allStoryBtn:"ให้ Claude แต่งนิทานทั้งทริป", empty:"ยังไม่มีบันทึก — เริ่มจากแท็บวัน แล้วลงรูปหรือจดคำพูดแรกได้เลย", dl:"⬇ ดาวน์โหลดสมุด (เปิดแล้วพิมพ์เป็น PDF ได้)", dlBusy:"กำลังเตรียมไฟล์…", dlFail:"บันทึกไฟล์ไม่สำเร็จ", copy:"📋 คัดลอกเป็นข้อความ",
      pre:"ทริปยังไม่เริ่ม — ลงรูปที่สนามบินหรือคำพูดก่อนออกเดินทางได้เลย", errQuota:"พื้นที่เก็บรูปเต็มแล้ว", errRate:"ช้าลงหน่อย ลองใหม่อีกครั้ง", errGen:"ทำไม่สำเร็จ ลองใหม่", ageLn:"มีมี่ 3 ขวบ · มีก้า 1 ขวบครึ่ง", day:"วันที่", quoteBy:"พูดโดย"},
  en:{tab:"Memories", heroT:"Memory book", heroS:"for Mimi and Mika", openBook:"Open this trip's book →", photos:"Photos", quotes:"Quotes", firsts:"Firsts", places:"Places",
      placesT:"Where we went today", noPlaces:"No check-ins for this day yet", goCk:"Go check in →", photosT:"Photos of the day", addPh:"Add photos", upl:(i,n)=>`Uploading ${i}/${n}…`, noUp:"Adding photos needs Editor access — ask the owner to share as Editor, or ask them to add the photos", usage:(a,b)=>`Photo storage used: ${a} of ${b} MB`,
      quoteT:"Cute things they said 💬", quoteH:"e.g. “Mimi said: the fish live in water like me”", save:"Save", both:"Both", moodT:"How did they feel", favT:"Notes", favH:"Favourite today (food, ride, place)", noteH:"A note from the grown-ups — what you want to remember",
      firstsT:"Firsts 🌟", firstsS:"Tap the child it was a first for", firstAdd:"Another first…", storyT:"Today's story ✨", storyBtn:"Ask Claude for a story from today's notes", storyAgain:"Write again", storyStop:"Stop", storyThink:"Writing the story…", storyNeed:"Add a photo caption, a quote or a check-in first",
      del:"Delete", delSure:"Tap again to delete", hi:"Highlight", close:"Close", capH:"Write a caption (optional)", viewOnly:"View only — your access can't edit", local:"Saved on this device only",
      ctaToday:"Save today's memories", ctaSub:"Photos · cute quotes · how Mimi and Mika felt", ctaBook:"Open the memory book", ctaBookSub:"Photos, quotes and the stamp from this trip",
      bookT:"Trip book", bookCover:"First trip in the book", stampT:"Passport stamp", stampOn:"Stamp earned!", stampOff:"The stamp arrives when all 6 days are done", hlT:"Favourite moments ⭐", hlEmpty:"Tap ⭐ on a photo or quote to keep it here",
      allStoryT:"Story of the whole trip", allStoryBtn:"Ask Claude for a story of the whole trip", empty:"Nothing yet — open a day tab and add the first photo or quote", dl:"⬇ Download the book (open it, then print to PDF)", dlBusy:"Preparing the file…", dlFail:"Couldn't save the file", copy:"📋 Copy as text",
      pre:"The trip hasn't started — add airport photos or quotes before you leave", errQuota:"Photo storage is full", errRate:"Slow down — try again shortly", errGen:"That didn't work — try again", ageLn:"Mimi 3 · Mika 1½", day:"Day", quoteBy:"said by"}
};
ICON.mem = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/></svg>';

let moments = store.get("moments",{}), mday = store.get("mday",null), msec = null, mSync = "local", mAssets = null, mSample = null, mDl = null, mUsage = null,
    mdraft = {who:"mimi", q:"", fav:undefined, note:undefined, first:""}, mUp = null, mconf = null, mopen = null, mpend = false, mstoryBusy = null, mctl = null;

const mm = () => MM[lang];
const mid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
const kid = id => KIDS.find(k=>k.id===id);
const whoLn = w => w==="both" ? "👧👶 "+mm().both : (kid(w) ? kid(w).e+" "+kid(w)[lang] : "");
function mDay(){ if(mday===null){ const t=tripDay(); mday = t>=0&&t<=5 ? t : 0 } return Math.min(Math.max(mday,0),5) }
function mOf(d,k){ return Object.entries(moments).filter(([id,r])=>r.d===d&&r.k===k).map(([id,r])=>({...r,id})).sort((a,b)=>a.at-b.at) }
function mAll(k){ return Object.entries(moments).filter(([id,r])=>r.k===k).map(([id,r])=>({...r,id})).sort((a,b)=>a.at-b.at) }
function mCount(d){ return Object.values(moments).filter(r=>r.d===d&&["photo","quote","note","fav","story"].includes(r.k)).length }
function softRender(){ const a=document.activeElement; if(tab===3&&a&&/^(INPUT|TEXTAREA)$/.test(a.tagName)&&a.closest("#main")){mpend=true;return} render() }
document.addEventListener("focusout",()=>{ if(mpend) setTimeout(()=>{ const a=document.activeElement; if(mpend&&!(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName))){mpend=false;render()} },400) });

async function mPut(id,rec){
  rec = {trip:TRIP_ID, at:Date.now(), ...rec};
  moments = {...moments, [id]:rec};
  if(mSync==="db"&&db){ try{ await db.doc("moments/"+id).set(rec) }catch(e){ toast(UI[lang].readonly) } } else store.set("moments",moments);
  if(mopen) openPhoto(mopen,true);
  softRender();
}
async function mDelRec(id){
  const r=moments[id]; moments={...moments}; delete moments[id];
  if(mSync==="db"&&db){ try{ await db.doc("moments/"+id).delete() }catch(e){ toast(UI[lang].readonly) } } else store.set("moments",moments);
  if(r&&r.k==="photo"&&r.img&&mAssets){ try{ await mAssets.delete(r.img); refreshUsage() }catch(e){} }
  softRender();
}
async function refreshUsage(){ try{ const r=await mAssets.list(); mUsage=r.usage; if(tab===3)softRender() }catch(e){} }

(async()=>{ try{
  const d=await claude.use("db");
  if(d){
    mSync="db"; moments={};
    d.collection("moments").onSnapshot(sn=>{ const n={}; sn.docs.forEach(x=>{ if(x.exists) n[x.id]=x.data() }); moments=n; if(mopen&&!moments[mopen]){mopen=null;closeBig()} softRender() },()=>{});
  }
}catch(e){}
try{ mAssets=await claude.use("assets"); if(mAssets) refreshUsage() }catch(e){}
try{ mSample=await claude.use("sample") }catch(e){}
try{ mDl=await claude.use("downloads") }catch(e){}
if(tab===3) softRender();
})();

/* ---------- photos ---------- */
async function shrink(f,max=1600,q=.8){
  let bmp;
  try{ bmp=await createImageBitmap(f,{imageOrientation:"from-image"}) }
  catch(_){ bmp=await new Promise((res,rej)=>{ const im=new Image(); im.onload=()=>res(im); im.onerror=rej; im.src=URL.createObjectURL(f) }) }
  const w=bmp.width||bmp.naturalWidth, h=bmp.height||bmp.naturalHeight, s=Math.min(1,max/Math.max(w,h));
  const c=document.createElement("canvas"); c.width=Math.max(1,Math.round(w*s)); c.height=Math.max(1,Math.round(h*s));
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return await new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error("encode")),"image/jpeg",q));
}
async function mUpload(files){
  if(!mAssets||!files.length) return;
  const d=mDay(), list=[...files]; let fail=null;
  mUp={i:0,n:list.length}; render();
  for(const f of list){
    try{ const blob=await shrink(f); const r=await mAssets.upload(blob,{type:"image/jpeg"}); await mPut(mid("ph"),{k:"photo",d,img:r.id,text:"",hi:false}) }
    catch(e){ fail=e }
    mUp.i++; render();
  }
  mUp=null; render(); refreshUsage();
  if(fail){ const c=fail&&fail.code; toast(c==="quota_or_state"?mm().errQuota:c==="rate_limited"?mm().errRate:mm().errGen) }
}
function openPhoto(id,refreshOnly){
  const r=moments[id]; if(!r){ mopen=null; closeBig(); return }
  const V=mm(), ov=document.getElementById("ov"), list=mOf(r.d,"photo"), i=list.findIndex(x=>x.id===id);
  mopen=id; ov.className="overlay mview"; ov.hidden=false;
  ov.innerHTML=`<button class="x" id="ovx">${V.close}</button><div class="mvbody"><img src="/_blob/${esc(r.img)}" alt="">
    <input id="mcap" class="minput" data-mcap="${id}" value="${esc(r.text||"")}" placeholder="${esc(V.capH)}" ${canWrite?"":"disabled"}>
    <div class="mvact">${list.length>1?`<button data-mnav="-1" aria-label="prev">‹</button>`:""}<button data-mhi="${id}" aria-pressed="${!!r.hi}">⭐ ${V.hi}</button>${canWrite?`<button data-mdel="${id}" class="${mconf===id?"sure":""}">${mconf===id?V.delSure:"🗑 "+V.del}</button>`:""}${list.length>1?`<button data-mnav="1" aria-label="next">›</button>`:""}</div>
    <div class="mvcnt">${i+1} / ${list.length}</div></div>`;
  if(!refreshOnly) document.getElementById("ovx").focus();
}

/* ---------- CTA used on Today / Trip ---------- */
function memCta(d){
  const V=mm();
  if(d<0) return `<button class="memcta" data-gomem="book"><span class="ce">📖</span><span class="ct"><b>${V.ctaBook}</b><small>${V.ctaBookSub}</small></span></button>`;
  const n=mCount(d);
  return `<button class="memcta" style="${accStyle(d)}" data-gomem="${d}"><span class="ce">📸</span><span class="ct"><b>${V.ctaToday}</b><small>${V.ctaSub}</small></span>${n?`<span class="cn">${n}</span>`:""}</button>`;
}

/* ---------- MEMORIES tab ---------- */
function viewMemory(){
  if(msec==="book") return viewBook();
  const V=mm(),U=UI[lang],L=DATA[lang],td=tripDay(),d=mDay(),w=canWrite;
  const nPh=mAll("photo").length, nQ=mAll("quote").length, nF=mAll("first").length, nV=Object.keys(visits).length;
  const strip=`<div class="daystrip" role="group">${L.days.map((x,i)=>{const n=mCount(i);return `<button class="${isDayDone(i)?"dd":""}" style="${accStyle(i)}" aria-pressed="${i===d}" data-mday="${i}"><i class="emo" aria-hidden="true">${DAYC[i][2]}</i>${i===td?`<span class="tdy">${U.today}</span>`:n?`<span class="tdy">${n}</span>`:""}<b>${U.day} ${x.n}</b><span>${esc(x.date)}</span></button>`}).join("")}</div>`;
  /* places */
  const vs=Object.entries(visits).filter(([id,v])=>v.d===d).sort((a,b)=>a[1].at-b[1].at);
  const places=vs.length?`<div class="mchips">${vs.map(([id,v])=>`<span class="mchip">${v.kind==="p"?"📍":"🍽"} ${esc(lang==="th"?v.th:v.en)}</span>`).join("")}</div>`:`<p class="sub">${V.noPlaces}</p><div class="xrow"><button class="xlink" data-goday="${d}">${V.goCk}</button></div>`;
  /* photos */
  const ph=mOf(d,"photo");
  const tiles=ph.map(r=>`<button class="mph" data-mph="${r.id}" aria-label="photo"><img src="/_blob/${esc(r.img)}" loading="lazy" alt="">${r.hi?"<i>⭐</i>":""}${r.text?`<em>${esc(r.text)}</em>`:""}</button>`).join("");
  const add=mAssets&&w?(mUp?`<div class="mph add busy"><span>⏳</span><small>${V.upl(mUp.i,mUp.n)}</small></div>`:`<label class="mph add"><input type="file" accept="image/*" multiple hidden data-mfile><span>＋</span><small>${V.addPh}</small></label>`):"";
  const usage=mAssets&&mUsage?`<p class="mfine">${V.usage((mUsage.bytes/1048576).toFixed(0),(mUsage.maxBytes/1048576).toFixed(0))}</p>`:"";
  const noUp=!mAssets&&mSync==="db"?`<p class="mfine">${V.noUp}</p>`:"";
  /* quotes */
  const qs=mOf(d,"quote");
  const quotes=qs.map(r=>`<div class="mquote w-${r.who}"><div class="mw">${whoLn(r.who)}</div><q>${esc(r.text)}</q><div class="mact"><button data-mhi="${r.id}" aria-pressed="${!!r.hi}" aria-label="${V.hi}">⭐</button>${w?`<button data-mdel="${r.id}" class="${mconf===r.id?"sure":""}">${mconf===r.id?V.delSure:"✕"}</button>`:""}</div></div>`).join("");
  const qform=w?`<div class="mform"><div class="mwho" role="group">${[...KIDS.map(k=>k.id),"both"].map(x=>`<button data-mwho="${x}" aria-pressed="${mdraft.who===x}">${whoLn(x)}</button>`).join("")}</div>
    <textarea id="mq" class="minput" rows="2" data-mdraft="q" placeholder="${esc(V.quoteH)}">${esc(mdraft.q)}</textarea><button class="xlink solid" data-mquote>${V.save}</button></div>`:"";
  /* mood */
  const mood=KIDS.map(k=>{const cur=moments["mood_d"+d+"_"+k.id];return `<div class="mood"><span class="mw">${k.e} ${k[lang]}</span>${MOODS.map(e=>`<button data-mmood="${k.id}:${e}" aria-pressed="${!!cur&&cur.e===e}" ${w?"":"disabled"}>${e}</button>`).join("")}</div>`}).join("");
  /* fav + note */
  const fav=moments["fav_d"+d], note=moments["note_d"+d];
  const favV=mdraft.fav!==undefined?mdraft.fav:(fav?fav.text:""), noteV=mdraft.note!==undefined?mdraft.note:(note?note.text:"");
  const notes=`<input class="minput" data-mfav="${d}" value="${esc(favV)}" placeholder="${esc(V.favH)}" ${w?"":"disabled"}><textarea class="minput" rows="3" data-mnote="${d}" placeholder="${esc(V.noteH)}" ${w?"":"disabled"}>${esc(noteV)}</textarea>`;
  /* story */
  const st=moments["story_d"+d];
  const story=mSample?`<div class="mstory"><div class="sb" id="mstory-out">${st?esc(st.text):""}</div>${mstoryBusy==="d"+d?`<button class="xlink" data-mstop>${V.storyStop}</button>`:`<button class="xlink solid" data-mstory="${d}">✨ ${st?V.storyAgain:V.storyBtn}</button>${st&&w?`<button class="xlink${mconf==="story_d"+d?" sure":""}" data-mdel="story_d${d}">${mconf==="story_d"+d?V.delSure:V.del}</button>`:""}`}</div>`:"";
  /* firsts */
  const fset=new Set(mAll("first").filter(r=>r.key!=="custom").map(r=>r.key+":"+r.who));
  const firsts=FIRSTS.map(f=>`<div class="mfirst"><span class="fe">${f[1]}</span><b>${esc(lang==="th"?f[2]:f[3])}</b><span class="fk">${KIDS.map(k=>`<button data-mfirst="${f[0]}:${k.id}" aria-pressed="${fset.has(f[0]+":"+k.id)}" aria-label="${k[lang]}" ${w?"":"disabled"}>${k.e}</button>`).join("")}</span></div>`).join("");
  const cust=mAll("first").filter(r=>r.key==="custom").map(r=>`<div class="mfirst"><span class="fe">🌟</span><b>${esc(r.text)}</b><span class="fk"><span class="mfine">${whoLn(r.who)}</span>${w?`<button data-mdel="${r.id}" class="${mconf===r.id?"sure":""}">${mconf===r.id?V.delSure:"✕"}</button>`:""}</span></div>`).join("");
  const custForm=w?`<div class="mform row"><input class="minput" id="mfirstin" data-mdraft="first" value="${esc(mdraft.first)}" placeholder="${esc(V.firstAdd)}"><button class="xlink solid" data-mfirstadd>＋</button></div>`:"";
  return `<section class="memhero"><div class="eyebrow">The Harbour Hop · 5–10 Dec 2026</div><h1>${V.heroT}</h1><p class="sub">${V.heroS} · ${V.ageLn}</p>
    <div class="memstats"><div><b>${nPh}</b><span>${V.photos}</span></div><div><b>${nQ}</b><span>${V.quotes}</span></div><div><b>${nF}</b><span>${V.firsts}</span></div><div><b>${nV}</b><span>${V.places}</span></div></div>
    <button class="memopen" data-mbook>${V.openBook}</button></section>
    ${td<0?`<p class="mfine">${V.pre}</p>`:""}
    ${mSync==="local"?`<p class="mfine">${V.local}</p>`:(!w?`<p class="mfine">${V.viewOnly}</p>`:"")}
    ${strip}
    <div style="${accStyle(d)}"><div class="memday"><span class="emo">${DAYC[d][2]}</span><div><div class="eyebrow">${U.day} ${d+1} · ${esc(L.days[d].date)}</div><b>${esc(L.days[d].title)}</b></div></div></div>
    <h2 class="h2">${V.placesT}</h2>${places}
    <h2 class="h2">${V.photosT}</h2><div class="mgrid">${tiles}${add}</div>${usage}${noUp}
    <h2 class="h2">${V.quoteT}</h2>${quotes}${qform}
    <h2 class="h2">${V.moodT}</h2><div class="card mmoods">${mood}</div>
    <h2 class="h2">${V.favT}</h2><div class="mnotes">${notes}</div>
    ${mSample?`<h2 class="h2">${V.storyT}</h2>${story}`:""}
    <h2 class="h2">${V.firstsT}</h2><p class="sub">${V.firstsS}</p><div class="mfirsts">${firsts}${cust}</div>${custForm}`;
}

/* ---------- BOOK ---------- */
function stampSVG(on){
  const c=on?"#E11D48":"currentColor";
  return `<svg class="stamp${on?" on":""}" viewBox="0 0 140 140" aria-hidden="true"><g transform="rotate(-10 70 70)" fill="none" stroke="${c}" stroke-width="3.2"><circle cx="70" cy="70" r="62" ${on?"":'stroke-dasharray="5 6"'}/><circle cx="70" cy="70" r="52" stroke-width="1.4"/><path d="M26 70h88" stroke-width="1.4"/></g>
  <g transform="rotate(-10 70 70)" fill="${c}" font-family="KIRA UI, sans-serif" text-anchor="middle"><text x="70" y="50" font-size="11" font-weight="700" letter-spacing="1.5">HONG KONG</text><text x="70" y="67" font-size="12" font-weight="800">✈ · ⛴ · 🏰</text><text x="70" y="92" font-size="11" font-weight="700" letter-spacing="1.5">MACAU</text><text x="70" y="108" font-size="8.5" font-weight="600">5–10 DEC 2026</text></g></svg>`;
}
function bookDays(){ return [0,1,2,3,4,5].filter(d=>mCount(d)||mAll("mood").some(r=>r.d===d)||Object.values(visits).some(v=>v.d===d)) }
function dayBlock(d,mode){ /* mode "app" → html for the app; "file" handled by bookHTML */
  const V=mm(),U=UI[lang],L=DATA[lang];
  const vs=Object.values(visits).filter(v=>v.d===d).sort((a,b)=>a.at-b.at);
  const moods=KIDS.map(k=>{const r=moments["mood_d"+d+"_"+k.id];return r?`${k.e} ${r.e}`:""}).filter(Boolean).join("  ");
  const ph=mOf(d,"photo"), qs=mOf(d,"quote"), fav=moments["fav_d"+d], note=moments["note_d"+d], st=moments["story_d"+d];
  return `<div class="bday" style="${accStyle(d)}"><div class="bh"><span class="emo">${DAYC[d][2]}</span><div><div class="eyebrow">${U.day} ${d+1} · ${esc(L.days[d].date)}</div><b>${esc(L.days[d].title)}</b></div>${moods?`<span class="bm">${moods}</span>`:""}</div>
    ${vs.length?`<div class="mchips">${vs.map(v=>`<span class="mchip">${v.kind==="p"?"📍":"🍽"} ${esc(lang==="th"?v.th:v.en)}</span>`).join("")}</div>`:""}
    ${ph.length?`<div class="mgrid b">${ph.map(r=>`<figure class="bph"><img src="/_blob/${esc(r.img)}" loading="lazy" alt="">${r.hi?"<i>⭐</i>":""}${r.text?`<figcaption>${esc(r.text)}</figcaption>`:""}</figure>`).join("")}</div>`:""}
    ${qs.map(r=>`<div class="mquote w-${r.who}"><div class="mw">${whoLn(r.who)}</div><q>${esc(r.text)}</q></div>`).join("")}
    ${fav&&fav.text?`<p class="bfav">🍽 ${esc(fav.text)}</p>`:""}${note&&note.text?`<p class="bnote">${esc(note.text)}</p>`:""}
    ${st?`<div class="mstory"><div class="sb">${esc(st.text)}</div></div>`:""}</div>`;
}
function viewBook(){
  const V=mm(),U=UI[lang],L=DATA[lang],on=tripOver();
  const nPh=mAll("photo").length, nQ=mAll("quote").length, nF=mAll("first").length, nV=Object.keys(visits).length;
  const hl=Object.entries(moments).map(([id,r])=>({...r,id})).filter(r=>r.hi&&(r.k==="photo"||r.k==="quote")).sort((a,b)=>a.at-b.at);
  const days=bookDays(), all=moments["story_all"];
  const fl=mAll("first"), firstsLn=fl.length?`<div class="mchips">${[...new Set(fl.map(r=>{const f=FIRSTS.find(x=>x[0]===r.key);return (f?f[1]+" "+(lang==="th"?f[2]:f[3]):"🌟 "+r.text)+" · "+whoLn(r.who)}))].map(t=>`<span class="mchip">${esc(t)}</span>`).join("")}</div>`:"";
  return `<section class="bcover"><div class="eyebrow">${V.bookCover}</div><h1>The Harbour Hop</h1><p>${esc(L.days[0].date)} – ${esc(L.days[5].date)}</p><p class="agln">${V.ageLn}</p>
    <div class="memstats"><div><b>${nPh}</b><span>${V.photos}</span></div><div><b>${nQ}</b><span>${V.quotes}</span></div><div><b>${nF}</b><span>${V.firsts}</span></div><div><b>${nV}</b><span>${V.places}</span></div></div></section>
    <div class="stampcard">${stampSVG(on)}<div><b>${V.stampT}</b><span>${on?V.stampOn:V.stampOff}</span></div></div>
    <h2 class="h2">${V.hlT}</h2>${hl.length?`<div class="mgrid b">${hl.map(r=>r.k==="photo"?`<figure class="bph"><img src="/_blob/${esc(r.img)}" loading="lazy" alt=""><i>⭐</i>${r.text?`<figcaption>${esc(r.text)}</figcaption>`:""}</figure>`:`<div class="mquote w-${r.who}" style="grid-column:1/-1"><div class="mw">${whoLn(r.who)}</div><q>${esc(r.text)}</q></div>`).join("")}</div>`:`<p class="sub">${V.hlEmpty}</p>`}
    ${firstsLn?`<h2 class="h2">${V.firstsT}</h2>${firstsLn}`:""}
    ${mSample?`<h2 class="h2">${V.allStoryT}</h2><div class="mstory"><div class="sb" id="mstory-out">${all?esc(all.text):""}</div>${mstoryBusy==="all"?`<button class="xlink" data-mstop>${V.storyStop}</button>`:`<button class="xlink solid" data-mstory="all">✨ ${all?V.storyAgain:V.allStoryBtn}</button>`}</div>`:""}
    ${days.length?days.map(d=>dayBlock(d)).join(""):`<p class="empty">${V.empty}</p>`}
    <div class="xrow bdl">${mDl&&days.length?`<button class="xlink solid" data-mdl>${V.dl}</button>`:""}<button class="xlink" data-mcopy>${V.copy}</button></div>`;
}
function bookText(){
  const V=mm(),U=UI[lang],L=DATA[lang]; let t="The Harbour Hop — "+V.bookT+"\n"+V.ageLn+"\n";
  bookDays().forEach(d=>{
    t+=`\n${U.day} ${d+1} · ${L.days[d].date} · ${L.days[d].title}\n`;
    Object.values(visits).filter(v=>v.d===d).sort((a,b)=>a.at-b.at).forEach(v=>{t+=`  ${v.kind==="p"?"📍":"🍽"} ${lang==="th"?v.th:v.en}\n`});
    KIDS.forEach(k=>{const r=moments["mood_d"+d+"_"+k.id];if(r)t+=`  ${k.e} ${k[lang]} ${r.e}\n`});
    mOf(d,"quote").forEach(r=>{t+=`  💬 ${whoLn(r.who)}: "${r.text}"\n`});
    mOf(d,"photo").forEach(r=>{if(r.text)t+=`  📸 ${r.text}\n`});
    const f=moments["fav_d"+d],n=moments["note_d"+d];if(f&&f.text)t+=`  🍽 ${f.text}\n`;if(n&&n.text)t+=`  ✍ ${n.text}\n`;
  });
  const fl=mAll("first");if(fl.length){t+="\n"+V.firstsT+"\n";fl.forEach(r=>{const f=FIRSTS.find(x=>x[0]===r.key);t+=`  ${f?f[1]+" "+(lang==="th"?f[2]:f[3]):"🌟 "+r.text} · ${whoLn(r.who)}\n`})}
  return t;
}

/* ---------- stories (Claude via `sample`) ---------- */
function dayFacts(d){
  const L=DATA[lang],U=UI[lang]; let t=`${U.day} ${d+1} · ${L.days[d].date} · ${L.days[d].title}\n`;
  const vs=Object.values(visits).filter(v=>v.d===d).sort((a,b)=>a.at-b.at).map(v=>lang==="th"?v.th:v.en);
  t+=(lang==="th"?"ไปที่: ":"Went to: ")+(vs.length?vs.join(", "):(lang==="th"?"(ไม่มีเช็กอิน)":"(no check-ins)"))+"\n";
  KIDS.forEach(k=>{const r=moments["mood_d"+d+"_"+k.id];if(r)t+=`${k[lang]}: ${r.e}\n`});
  mOf(d,"quote").forEach(r=>{t+=`${lang==="th"?"คำพูด":"Said"} (${r.who==="both"?"both":kid(r.who)[lang]}): ${r.text}\n`});
  mOf(d,"photo").forEach(r=>{if(r.text)t+=`${lang==="th"?"รูป":"Photo"}: ${r.text}\n`});
  const f=moments["fav_d"+d],n=moments["note_d"+d];if(f&&f.text)t+=`${lang==="th"?"ของโปรด":"Favourite"}: ${f.text}\n`;if(n&&n.text)t+=`${lang==="th"?"พ่อแม่จด":"Note"}: ${n.text}\n`;
  mAll("first").filter(r=>r.d===d).forEach(r=>{const x=FIRSTS.find(y=>y[0]===r.key);t+=`${lang==="th"?"ครั้งแรกของ":"First time for"} ${whoLn(r.who)}: ${x?(lang==="th"?x[2]:x[3]):r.text}\n`});
  return t;
}
function hasFacts(d){ return mCount(d)>0||Object.values(visits).some(v=>v.d===d)||mAll("mood").some(r=>r.d===d) }
async function mStory(scope){
  if(!mSample||mstoryBusy) return;
  const days=scope==="all"?bookDays():[+scope];
  if(!days.length||(scope!=="all"&&!hasFacts(+scope))){ toast(mm().storyNeed); return }
  const data=days.map(dayFacts).join("\n");
  const TH=lang==="th", words=scope==="all"?"250–350":"120–180";
  const prompt=TH
   ?`เขียนนิทานก่อนนอนเป็นภาษาไทย ความยาว ${words} คำ สำหรับเด็กเล็ก ตัวเอกคือ "มีมี่" (เด็กหญิง 3 ขวบ) และ "มีก้า" (น้องชาย 1 ขวบครึ่ง) ที่ไปเที่ยวฮ่องกงและมาเก๊ากับพ่อแม่\nกติกา: ใช้เฉพาะข้อมูลด้านล่าง ห้ามแต่งสถานที่ เหตุการณ์ หรือคำพูดที่ไม่มีในข้อมูล ถ้าข้อมูลน้อยให้เล่าสั้นลง ใช้คำง่าย ประโยคสั้น อบอุ่น มีจังหวะซ้ำน่ารักได้ ถ้ามีคำพูดของเด็กให้ใส่ไว้ในเรื่อง ปิดท้ายด้วยประโยคฝันดี ตอบเฉพาะตัวนิทาน ไม่ต้องมีหัวข้อหรือสัญลักษณ์ markdown\n\nข้อมูล:\n${data}`
   :`Write a short bedtime story in English, ${scope==="all"?"250–350":"120–180"} words, for a small child. The heroes are "Mimi" (a girl, 3) and "Mika" (her little brother, 1½) on a family trip to Hong Kong and Macau.\nRules: use only the facts below — do not invent places, events or quotes; if there is little data, tell a shorter story. Simple words, short sentences, warm, a cosy repeating rhythm is welcome. Work in anything the children said. End with a goodnight line. Reply with the story only — no title, no markdown.\n\nFacts:\n${data}`;
  mstoryBusy=scope==="all"?"all":"d"+scope; mctl=new AbortController(); render();
  const out=()=>document.getElementById("mstory-out"); if(out()) out().textContent=mm().storyThink;
  try{
    const r=await mSample(prompt,{signal:mctl.signal,cache:false,onText:({text})=>{const o=out();if(o)o.textContent=text}});
    const txt=r.text.replace(/[*#_`]/g,"").trim();
    mstoryBusy=null; await mPut(scope==="all"?"story_all":"story_d"+scope,{k:"story",d:scope==="all"?-1:+scope,text:txt,lang});
  }catch(e){
    mstoryBusy=null; const c=e&&e.code;
    if(c!=="cancelled") toast(c==="rate_limited"?mm().errRate:mm().errGen);
    render();
  }
}

/* ---------- downloadable book (self-contained HTML, photos embedded) ---------- */
function imgData(id){
  return new Promise(res=>{ const im=new Image(); im.onload=()=>{ try{ const s=Math.min(1,1200/Math.max(im.naturalWidth,im.naturalHeight)),c=document.createElement("canvas"); c.width=Math.round(im.naturalWidth*s); c.height=Math.round(im.naturalHeight*s); c.getContext("2d").drawImage(im,0,0,c.width,c.height); res(c.toDataURL("image/jpeg",.78)) }catch(e){res("")} }; im.onerror=()=>res(""); im.src="/_blob/"+id });
}
async function bookHTML(){
  const V=mm(),U=UI[lang],L=DATA[lang],on=tripOver();
  const ids=[...new Set(Object.values(moments).filter(r=>r.k==="photo").map(r=>r.img))], img={};
  for(const id of ids) img[id]=await imgData(id);
  const quote=r=>`<div class="q"><small>${esc(whoLn(r.who))}</small>“${esc(r.text)}”</div>`;
  const photo=r=>img[r.img]?`<figure><img src="${img[r.img]}" alt="">${r.hi?'<i>⭐</i>':''}${r.text?`<figcaption>${esc(r.text)}</figcaption>`:""}</figure>`:"";
  const hl=Object.values(moments).filter(r=>r.hi&&(r.k==="photo"||r.k==="quote")).sort((a,b)=>a.at-b.at);
  const days=bookDays().map(d=>{
    const vs=Object.values(visits).filter(v=>v.d===d).sort((a,b)=>a.at-b.at), ph=mOf(d,"photo"), qs=mOf(d,"quote"), f=moments["fav_d"+d], n=moments["note_d"+d], st=moments["story_d"+d];
    const moods=KIDS.map(k=>{const r=moments["mood_d"+d+"_"+k.id];return r?`${k.e} ${r.e}`:""}).filter(Boolean).join("  ");
    return `<section class="day"><h2>${DAYC[d][2]} ${U.day} ${d+1} · ${esc(L.days[d].date)}<small>${esc(L.days[d].title)}</small></h2>${moods?`<p class="m">${moods}</p>`:""}
      ${vs.length?`<p class="pl">${vs.map(v=>(v.kind==="p"?"📍 ":"🍽 ")+esc(lang==="th"?v.th:v.en)).join(" &nbsp;·&nbsp; ")}</p>`:""}
      ${ph.length?`<div class="g">${ph.map(photo).join("")}</div>`:""}${qs.map(quote).join("")}${f&&f.text?`<p class="fv">🍽 ${esc(f.text)}</p>`:""}${n&&n.text?`<p class="nt">${esc(n.text)}</p>`:""}${st?`<div class="story">${esc(st.text).replace(/\n/g,"<br>")}</div>`:""}</section>`}).join("");
  const fl=mAll("first"), firsts=fl.map(r=>{const f=FIRSTS.find(x=>x[0]===r.key);return `<span>${f?f[1]+" "+esc(lang==="th"?f[2]:f[3]):"🌟 "+esc(r.text)} · ${esc(whoLn(r.who))}</span>`}).join("");
  const all=moments["story_all"];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Harbour Hop — ${V.bookT}</title><style>
  *{box-sizing:border-box}body{margin:0;font:16px/1.55 "KIRA UI","Noto Sans Thai","Sarabun",system-ui,sans-serif;color:#1f2540;background:#fff7f0}
  .w{max-width:760px;margin:0 auto;padding:20px}
  .cover{background:linear-gradient(135deg,#FF5F45,#FF2E7E 52%,#8B3DFF);color:#fff;border-radius:24px;padding:36px 24px;text-align:center;margin-bottom:20px}
  .cover h1{margin:6px 0;font-size:34px}.cover p{margin:4px 0;opacity:.95}
  h2{font-size:20px;margin:28px 0 8px;color:#CF2E6B}h2 small{display:block;color:#6b7390;font-size:14px;font-weight:500}
  .day{break-inside:avoid-page;margin-bottom:12px;padding-bottom:12px;border-bottom:1px dashed #e4d6cc}
  .g{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}figure{margin:0;position:relative}figure img{width:100%;border-radius:14px;display:block}figure i{position:absolute;top:6px;right:8px;font-style:normal}figcaption{font-size:13px;color:#6b7390;margin-top:3px}
  .q{background:#fff;border-left:5px solid #FF2E7E;border-radius:10px;padding:8px 12px;margin:8px 0}.q small{display:block;color:#6b7390;font-size:12px}
  .m{font-size:22px;margin:4px 0}.pl,.fv,.nt{margin:6px 0;color:#41486a}.nt{font-style:italic}.story{background:#fff;border-radius:14px;padding:12px 16px;margin:10px 0;line-height:1.8}
  .firsts span{display:inline-block;background:#fff;border-radius:99px;padding:4px 12px;margin:3px;font-size:14px}
  .stamp{display:inline-block;border:3px solid ${on?"#E11D48":"#c9c2bb"};color:${on?"#E11D48":"#c9c2bb"};border-radius:50%;padding:18px 14px;transform:rotate(-8deg);font-weight:800;line-height:1.2;text-align:center;margin:8px}
  @media print{body{background:#fff}.day{page-break-inside:avoid}.cover{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style></head><body><div class="w"><div class="cover"><div>${V.bookCover}</div><h1>The Harbour Hop</h1><p>${esc(L.days[0].date)} – ${esc(L.days[5].date)}</p><p>${V.ageLn}</p><div class="stamp">HONG KONG · MACAU<br>5–10 DEC 2026</div></div>
  ${hl.length?`<h2>${V.hlT}</h2><div class="g">${hl.map(r=>r.k==="photo"?photo(r):quote(r)).join("")}</div>`:""}
  ${firsts?`<h2>${V.firstsT}</h2><div class="firsts">${firsts}</div>`:""}
  ${all?`<h2>${V.allStoryT}</h2><div class="story">${esc(all.text).replace(/\n/g,"<br>")}</div>`:""}${days}</div></body></html>`;
}
async function mDownload(){
  if(!mDl) return; toast(mm().dlBusy);
  try{ const html=await bookHTML(); await mDl.save({filename:"The_Harbour_Hop_memory_book.html",data:html}) }
  catch(e){ if(!e||e.code!=="declined") toast(mm().dlFail) }
}

/* ---------- events ---------- */
document.addEventListener("input",e=>{ const t=e.target; if(t.dataset&&t.dataset.mdraft){ mdraft[t.dataset.mdraft]=t.value } });
document.addEventListener("change",async e=>{
  const t=e.target, D=t.dataset||{};
  if("mfile" in D){ const f=[...t.files]; t.value=""; mUpload(f); return }
  if(D.mcap){ const r=moments[D.mcap]; if(r) await mPut(D.mcap,{...r,text:t.value.trim()}); return }
  if(D.mfav!==undefined){ const d=+D.mfav, v=t.value.trim(), id="fav_d"+d; mdraft.fav=undefined; if(v) await mPut(id,{k:"fav",d,text:v}); else if(moments[id]) await mDelRec(id); return }
  if(D.mnote!==undefined){ const d=+D.mnote, v=t.value.trim(), id="note_d"+d; mdraft.note=undefined; if(v) await mPut(id,{k:"note",d,text:v}); else if(moments[id]) await mDelRec(id); return }
});
document.addEventListener("click",async e=>{
  const t=e.target.closest("button"); if(!t) return;
  const D=t.dataset, V=mm();
  if(t.id==="ovx"){ mopen=null; return }
  if(D.gomem!==undefined){ if(D.gomem==="book"){ msec="book" } else { msec=null; mday=+D.gomem; store.set("mday",mday) } ret=null; go(3); return }
  if("mbook" in D){ msec="book"; go(3); return }
  if(D.mday!==undefined){ mday=+D.mday; store.set("mday",mday); mdraft.fav=undefined; mdraft.note=undefined; render(); return }
  if(D.mwho){ mdraft.who=D.mwho; const q=document.getElementById("mq"); if(q) mdraft.q=q.value; render(); return }
  if("mquote" in D){ const q=document.getElementById("mq"), v=(q?q.value:mdraft.q).trim(); if(!v){ if(q) q.focus(); return }
    mdraft.q=""; await mPut(mid("q"),{k:"quote",d:mDay(),who:mdraft.who,text:v,hi:false}); return }
  if(D.mmood){ const [k,em]=D.mmood.split(":"), d=mDay(), id="mood_d"+d+"_"+k, cur=moments[id]; if(cur&&cur.e===em) await mDelRec(id); else await mPut(id,{k:"mood",d,who:k,e:em}); return }
  if(D.mfirst){ const [key,k]=D.mfirst.split(":"), id="first_"+key+"_"+k; if(moments[id]) await mDelRec(id); else await mPut(id,{k:"first",key,who:k,d:mDay()}); return }
  if("mfirstadd" in D){ const inp=document.getElementById("mfirstin"), v=(inp?inp.value:mdraft.first).trim(); if(!v) return; mdraft.first=""; await mPut(mid("first_c"),{k:"first",key:"custom",text:v,who:mdraft.who==="both"?"mimi":mdraft.who,d:mDay()}); return }
  if(D.mph){ openPhoto(D.mph); return }
  if(D.mnav){ const r=moments[mopen]; if(!r) return; const l=mOf(r.d,"photo"), i=l.findIndex(x=>x.id===mopen), n=l[(i+ +D.mnav+l.length)%l.length]; openPhoto(n.id,true); return }
  if(D.mhi){ const r=moments[D.mhi]; if(r) await mPut(D.mhi,{...r,hi:!r.hi}); return }
  if(D.mdel){ const id=D.mdel; if(mconf===id){ mconf=null; if(mopen===id){ mopen=null; closeBig() } await mDelRec(id) } else { mconf=id; if(mopen) openPhoto(mopen,true); else render(); setTimeout(()=>{ if(mconf===id){ mconf=null; if(mopen===id) openPhoto(mopen,true); else if(tab===3) softRender() } },3000) } return }
  if(D.mstory!==undefined){ mStory(D.mstory); return }
  if("mstop" in D){ try{ mctl&&mctl.abort() }catch(_){} return }
  if("mdl" in D){ mDownload(); return }
  if("mcopy" in D){ try{ await navigator.clipboard.writeText(bookText()) }catch(_){} toast(UI[lang].copied); return }
});
