from playwright.sync_api import sync_playwright
import pathlib, json
U=pathlib.Path('/home/claude/hkmo/app/preview.html').as_uri()
MEM='/tmp/claude-0/-home-claude/af54681e-6c78-5673-bb70-dabf7106ff42/scratchpad/mem/'
def ok(n,c): print(('OK ' if c else 'FAIL ')+n)
MOCK='''
(()=>{ const P=new URLSearchParams(location.hash.slice(1));
const store=new Map(), subs={}; window.__db=store; window.__prompts=[]; window.__saved=null; window.__up=0;
function notify(col){ (subs[col]||[]).forEach(cb=>{ const docs=[...store.entries()].filter(([k])=>k.startsWith(col+"/")).map(([k,v])=>({id:k.slice(col.length+1),exists:true,data:()=>JSON.parse(JSON.stringify(v))})); cb({docs}) }) }
const db={ doc(p){ const col=p.split("/")[0]; return { async set(v){ store.set(p,JSON.parse(JSON.stringify(v))); setTimeout(()=>notify(col),0) }, async delete(){ store.delete(p); setTimeout(()=>notify(col),0) }, async get(){ return {exists:store.has(p),data:()=>store.get(p)} } } },
  collection(col){ return { onSnapshot(cb){ (subs[col]=subs[col]||[]).push(cb); setTimeout(()=>notify(col),0) } } } };
const assets={ async upload(b){ window.__up++; const id=(Math.random().toString(16).slice(2)+"0".repeat(32)).slice(0,32); return {id,url:"/_blob/"+id,sizeBytes:b.size,contentType:b.type} }, async list(){ return {assets:[],usage:{files:window.__up,bytes:window.__up*200000,maxFiles:500,maxBytes:524288000}} }, async delete(){ return {deleted:true} } };
const sample=async(prompt,o)=>{ window.__prompts.push(prompt); const t="กาลครั้งหนึ่ง มีมี่กับมีก้าไปเที่ยวฮ่องกง"; o&&o.onText&&o.onText({text:t,delta:t}); return {text:t+" ฝันดีนะ",truncated:false} };
const downloads={ async save(r){ window.__saved={filename:r.filename,html:r.data}; return {status:"saved"} } };
const user={ can:async()=>P.get("ro")?false:true, isOwner:()=>true, id:async()=>"u1" };
window.claude={ async use(n){ if(n==="db") return db; if(n==="user") return user; if(n==="assets") return P.get("noassets")?null:assets; if(n==="sample") return sample; if(n==="downloads") return downloads; return null } };
})();
'''
with sync_playwright() as p:
  b=p.chromium.launch()
  for sc in ('light','dark'):
    c=b.new_context(viewport={'width':375,'height':812},color_scheme=sc); 
    c.route('**/_blob/**',lambda r:r.fulfill(path=MEM+'p1.jpg',content_type='image/jpeg'))
    pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' and 'Failed to load resource' not in m.text else None)
    pg.add_init_script(MOCK); pg.clock.set_fixed_time('2026-12-06T13:00:00Z')  # Day 2 evening HK
    pg.goto(U); pg.wait_for_timeout(700)
    ok('5 tabs, 4th = Memories', len(pg.query_selector_all('nav.tabs button'))==5 and 'ความทรงจำ' in pg.inner_text('nav.tabs'))
    ok('today has memory CTA', pg.query_selector('.memcta[data-gomem="1"]') is not None)
    # taxi lives in Info now
    pg.click('[data-tab="4"]'); ok('info has taxi tile', pg.query_selector('.itiles [data-gosec="taxi"]') is not None)
    pg.click('[data-gosec="taxi"]'); pg.wait_for_timeout(150); ok('taxi section opens', len(pg.query_selector_all('[data-taxi]'))==10 and 'แท็กซี่' in pg.inner_text('#ttl'))
    pg.click('#back'); ok('back → info home', pg.query_selector('.itiles') is not None)
    pg.click('[data-tab="0"]'); pg.click('[data-gosec="taxi"]') if pg.query_selector('[data-gosec="taxi"]') else None
    pg.wait_for_timeout(100); ok('quick4 taxi works', pg.evaluate('[tab,sec]')==[4,'taxi']); pg.click('#back'); ok('back to Today from taxi', pg.evaluate('tab')==0)
    # CTA → memories day 2
    pg.click('.memcta[data-gomem="1"]'); pg.wait_for_timeout(200); ok('CTA → memories on day 2', pg.evaluate('[tab,mDay()]')==[3,1])
    # quote
    pg.fill('#mq','ปลาอยู่ในน้ำเหมือนหนูเลย'); pg.click('[data-mwho="mika"]'); ok('draft kept on who toggle', pg.input_value('#mq')=='ปลาอยู่ในน้ำเหมือนหนูเลย')
    pg.click('[data-mquote]'); pg.wait_for_timeout(250)
    ok('quote saved + shown', 'ปลาอยู่ในน้ำ' in pg.inner_text('.mquote') and any(k.startswith('moments/q') for k in pg.evaluate('[...window.__db.keys()]')))
    ok('quote stored with trip+who', pg.evaluate('Object.values(Object.fromEntries(window.__db)).some(v=>v.k=="quote"&&v.who=="mika"&&v.trip=="hk2026"&&v.d==1)'))
    # mood toggle
    pg.click('[data-mmood="mimi:🤩"]'); pg.wait_for_timeout(150); ok('mood set', pg.get_attribute('[data-mmood="mimi:🤩"]','aria-pressed')=='true')
    pg.click('[data-mmood="mimi:🤩"]'); pg.wait_for_timeout(150); ok('mood toggles off', pg.get_attribute('[data-mmood="mimi:🤩"]','aria-pressed')=='false')
    pg.click('[data-mmood="mimi:😄"]'); pg.click('[data-mmood="mika:😴"]'); pg.wait_for_timeout(150)
    # fav & note
    pg.fill('[data-mfav]','ติ่มซำกุ้ง'); pg.fill('[data-mnote]','มีก้าหลับบนรถเข็น'); pg.click('.memday'); pg.wait_for_timeout(300)
    ok('fav+note saved', pg.evaluate('window.__db.has("moments/fav_d1")&&window.__db.has("moments/note_d1")'))
    # firsts
    pg.click('[data-mfirst="mickey:mimi"]'); pg.wait_for_timeout(150); ok('first toggled', pg.get_attribute('[data-mfirst="mickey:mimi"]','aria-pressed')=='true')
    pg.fill('#mfirstin','ใส่รองเท้าเองครั้งแรก'); pg.click('[data-mfirstadd]'); pg.wait_for_timeout(200); ok('custom first', 'ใส่รองเท้าเอง' in pg.inner_text('.mfirsts'))
    # photos
    
    with pg.expect_file_chooser() as fc: pg.click('label.mph.add')
    fc.value.set_files([MEM+'p0.jpg',MEM+'p1.jpg',MEM+'p2.jpg']); pg.wait_for_timeout(1500)
    ok('3 photos uploaded', len(pg.query_selector_all('.mph[data-mph]'))==3 and pg.evaluate('window.__up')==3)
    ok('photo records have asset ids', pg.evaluate('[...window.__db.values()].filter(v=>v.k=="photo").every(v=>/^[0-9a-f]{32}$/.test(v.img))'))
    ok('usage meter', pg.query_selector('.mfine') is not None and 'MB' in pg.inner_text('#main'))
    pg.click('.mph[data-mph] >> nth=0'); pg.wait_for_timeout(200); ok('viewer open', not pg.query_selector('#ov').is_hidden() and pg.query_selector('.mvbody img') is not None)
    pg.fill('#mcap','ที่ท่าเรือ'); pg.click('.mvcnt'); pg.wait_for_timeout(300)
    ok('caption saved', pg.evaluate('[...window.__db.values()].some(v=>v.k=="photo"&&v.text=="ที่ท่าเรือ")'))
    pg.click('.mvact [data-mhi]'); pg.wait_for_timeout(250); ok('highlight on', pg.get_attribute('.mvact [data-mhi]','aria-pressed')=='true')
    pg.click('[data-mnav="1"]'); pg.wait_for_timeout(150); ok('next photo', '2 / 3' in pg.inner_text('.mvcnt'))
    pg.screenshot(path=f'mem/viewer_{sc}.png')
    pg.click('.mvact [data-mdel]'); pg.wait_for_timeout(150); ok('delete needs 2nd tap', pg.evaluate('[...window.__db.values()].filter(v=>v.k=="photo").length')==3)
    pg.click('.mvact [data-mdel]'); pg.wait_for_timeout(300); ok('photo deleted', pg.evaluate('[...window.__db.values()].filter(v=>v.k=="photo").length')==2 and pg.query_selector('#ov').is_hidden())
    # story
    pg.click('.mstory [data-mstory]'); pg.wait_for_timeout(500)
    ok('story shown + saved', 'มีมี่กับมีก้า' in pg.inner_text('#mstory-out') and pg.evaluate('window.__db.has("moments/story_d1")'))
    ok('story prompt carries the quote but not invented data', 'ปลาอยู่ในน้ำ' in pg.evaluate('window.__prompts[0]') and 'ติ่มซำกุ้ง' in pg.evaluate('window.__prompts[0]'))
    pg.screenshot(path=f'mem/day_{sc}.png',full_page=True)
    # day strip
    pg.click('[data-mday="3"]'); pg.wait_for_timeout(150); ok('switch day', pg.evaluate('mDay()')==3 and len(pg.query_selector_all('.mquote'))==0)
    pg.click('[data-mday="1"]')
    # book
    pg.click('[data-mbook]'); pg.wait_for_timeout(250); ok('book opens', pg.query_selector('.bcover') is not None and 'สมุดทริป' in pg.inner_text('#ttl'))
    ok('book stats', pg.inner_text('.bcover .memstats').split()[0]=='2')
    ok('highlight listed', len(pg.query_selector_all('.mgrid.b .bph'))>=1)
    ok('day block with quote+note', 'ปลาอยู่ในน้ำ' in pg.inner_text('.bday') and 'มีก้าหลับ' in pg.inner_text('.bday'))
    ok('stamp off before trip ends', 'ตราประทับจะได้เมื่อ' in pg.inner_text('.stampcard'))
    pg.screenshot(path=f'mem/book_{sc}.png',full_page=True)
    pg.click('[data-mdl]'); pg.wait_for_timeout(2500)
    sv=pg.evaluate('window.__saved'); ok('download offered', bool(sv) and sv['filename'].endswith('.html') and 'ปลาอยู่ในน้ำ' in sv['html'] and 'The Harbour Hop' in sv['html'])
    if sv: pathlib.Path(MEM+f'book_{sc}.html').write_text(sv['html'],encoding='utf-8'); print('   html size',len(sv['html'])//1024,'KB; embedded images:',sv['html'].count('data:image/jpeg'))
    pg.click('#back'); ok('book back → memories', pg.query_selector('.memhero') is not None and pg.query_selector('.bcover') is None)
    pg.click('[data-mbook]'); pg.click('[data-tab="3"]'); ok('tab tap leaves book', pg.query_selector('.bcover') is None)
    # reload persists (db mock is per-page, so check local state only for no-crash) / overflow
    for w in (320,375):
      pg.set_viewport_size({'width':w,'height':800})
      pg.click('[data-tab="3"]'); pg.wait_for_timeout(120)
      if pg.evaluate('document.documentElement.scrollWidth')>w: print('FAIL overflow memories',w)
      pg.click('[data-mbook]'); pg.wait_for_timeout(120)
      if pg.evaluate('document.documentElement.scrollWidth')>w: print('FAIL overflow book',w)
      pg.click('[data-tab="3"]')
    ok('no JS errors '+str(errs[:3]), not errs); c.close()
  # variants: no assets / read-only / english / after trip stamp
  c=b.new_context(viewport={'width':375,'height':812}); c.route('**/_blob/**',lambda r:r.fulfill(path=MEM+'p1.jpg',content_type='image/jpeg')); pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.add_init_script(MOCK); pg.clock.set_fixed_time('2026-12-06T13:00:00Z'); pg.goto(U+'#noassets=1'); pg.wait_for_timeout(600); pg.click('[data-tab="3"]'); pg.wait_for_timeout(200)
  ok('no-assets: no add tile, explanation shown', pg.query_selector('[data-mfile]') is None and 'Editor' in pg.inner_text('#main'))
  c.close()
  c=b.new_context(viewport={'width':375,'height':812}); pg=c.new_page(); pg.add_init_script(MOCK); pg.clock.set_fixed_time('2026-12-06T13:00:00Z'); pg.goto(U+'#ro=1'); pg.wait_for_timeout(700); pg.click('[data-tab="3"]'); pg.wait_for_timeout(200)
  ok('read-only: no composer, notice shown', pg.query_selector('[data-mquote]') is None and pg.query_selector('[data-mfile]') is None and 'ดูได้อย่างเดียว' in pg.inner_text('#main'))
  c.close()
  c=b.new_context(viewport={'width':375,'height':812}); pg=c.new_page(); pg.add_init_script(MOCK); pg.clock.set_fixed_time('2026-12-12T05:00:00Z'); pg.goto(U); pg.wait_for_timeout(600)
  ok('after trip: today shows book CTA', pg.query_selector('.memcta[data-gomem="book"]') is not None)
  pg.click('.memcta[data-gomem="book"]'); pg.wait_for_timeout(200); ok('stamp earned after trip', 'ได้ตราประทับแล้ว' in pg.inner_text('.stampcard') and pg.query_selector('.stamp.on') is not None)
  pg.click('#l-en'); pg.wait_for_timeout(150); ok('english book', 'Passport stamp' in pg.inner_text('.stampcard'))
  pg.click('[data-tab="3"]'); pg.wait_for_timeout(150); ok('english memories', 'Memory book' in pg.inner_text('.memhero'))
  c.close()
  # no claude at all (local fallback)
  c=b.new_context(viewport={'width':375,'height':812}); pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.clock.set_fixed_time('2026-12-06T13:00:00Z'); pg.goto(U); pg.wait_for_timeout(600)
  pg.click('[data-tab="3"]'); pg.fill('#mq','คำแรก'); pg.click('[data-mquote]'); pg.wait_for_timeout(200)
  ok('local fallback saves quote, no photo UI', 'คำแรก' in pg.inner_text('.mquote') and pg.query_selector('[data-mfile]') is None and 'เฉพาะเครื่องนี้' in pg.inner_text('#main'))
  pg.reload(); pg.wait_for_timeout(500); pg.click('[data-tab="3"]'); ok('local fallback persists', 'คำแรก' in pg.inner_text('.mquote'))
  ok('no JS errors local '+str(errs[:2]), not errs)
  b.close()
