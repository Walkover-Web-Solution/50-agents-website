/* The landing, v2 (REBUILD-PLAN.md, D99): puts the sections under the hero and brings them to life.
   Each landing page includes crew.js first, then this file. Needs http (it fetches sections.html). v1 is site-v1.js. */
(async function(){
  /* the hero: live from its builder's file, its own header hidden (the page carries one), its CTAs scroll to #join */
  /* Sign-up links carry UTMs (Jii, 12 Nov): source 50agents.com, medium website, campaign = this visitor's version,
     content = which button. utm_* the visitor arrived with win, and are kept for the visit so later pages carry them too. */
  const V=window.VARIANT||(document.title.match(/Orbit|Stage|Strip/)||[''])[0].toLowerCase()||'unknown';
  const ARRIVED=(()=>{const o={};new URLSearchParams(location.search).forEach((v,k)=>{if(k.startsWith('utm_'))o[k]=v;});
    try{if(Object.keys(o).length)sessionStorage.setItem('50a-utm',JSON.stringify(o));else return JSON.parse(sessionStorage.getItem('50a-utm')||'{}');}catch(e){}return o;})();
  const signup=btn=>{const u=new URL(window.JOIN_URL||'https://50agents-app.embarko.app/login',location.href);
    Object.entries({utm_source:'50agents.com',utm_medium:'website',utm_campaign:V,utm_content:btn,...ARRIVED,lv:V}).forEach(([k,v])=>u.searchParams.set(k,v));return u.href;}; // lv: the version, always (ads may override utm_campaign)
  let heroCta=null;
  const frame=document.querySelector('.hero-frame');
  if(frame){
    const fit=()=>{try{const d=frame.contentDocument;
      if(!d.getElementById('embedded'))d.head.insertAdjacentHTML('beforeend','<style id="embedded">nav:first-of-type,.hero-head,.hero-head *{visibility:hidden!important}.hero-head,.bar:has(nav){background:transparent!important;border-color:transparent!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}</style>');
      frame.style.height=Math.max(d.documentElement.scrollHeight,innerHeight*.8)+'px';
      /* line the header up with the hero's own left edge, and close the empty space under the hero's content */
      const hl=d.querySelector('.logo50'); // the hero's own (hidden) logo marks where ours sits
      if(hl)document.documentElement.style.setProperty('--hero-x',Math.max(16,Math.round(hl.getBoundingClientRect().left))+'px');
      setTimeout(()=>document.getElementById('sitehead')?.classList.add('ready'),100);
      /* the hero's real content ends at its lowest visible card or line, not at a full-height wrapper */
      /* the host's badge shows once, on the page, not again inside the hero (it re-adds itself, so watch; capped so it can never loop) */
      if(!d.__badgeWatch){let n=0;const drop=()=>d.querySelectorAll('embarko-badge').forEach(b=>{if(n++<30)b.remove();});drop();
        d.__badgeWatch=new frame.contentWindow.MutationObserver(drop);d.__badgeWatch.observe(d.documentElement,{childList:true,subtree:true});}
      const fixed=[...d.body.querySelectorAll('*')].filter(e=>getComputedStyle(e).position==='fixed'); // floating bits are not content
      const fh=frame.offsetHeight;let bottom=0;d.body.querySelectorAll('*').forEach(e=>{if(fixed.some(x=>x.contains(e)))return;const r=e.getBoundingClientRect(),cs=getComputedStyle(e);
        if(!(r.height>0&&r.width>0&&r.height<fh*.6&&r.bottom>bottom&&cs.visibility!=='hidden'&&cs.opacity!=='0')||e.closest('.hero-head,nav:first-of-type'))return;
        const boxy=!e.firstElementChild||/^(svg|img|canvas|video)$/i.test(e.tagName)||cs.boxShadow!=='none'||!/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor);
        if(boxy)bottom=r.bottom;});
      /* close the gap, but never so far that the tools row climbs above the fold: it starts just below the first screen at the earliest */
      if(bottom)document.documentElement.style.setProperty('--hero-blank',Math.max(0,Math.round(Math.min(frame.offsetHeight-bottom,frame.offsetHeight-innerHeight+88)))+'px');
      d.querySelectorAll('a[href="#join"]').forEach(a=>{const to=signup(a.classList.contains('t')?'hero-tile':'hero');a.onclick=e=>{e.preventDefault();location.href=to;};if(/join early access/i.test(a.textContent))a.textContent='Get started';});
      heroCta=[...d.querySelectorAll('a[href="#join"]')].find(a=>a.offsetParent&&getComputedStyle(a).visibility!=='hidden')||null;
    }catch(e){}};
    frame.addEventListener('load',()=>{fit();setTimeout(fit,800);});addEventListener('resize',fit);
    try{if(frame.contentWindow.location.href!=='about:blank'&&frame.contentDocument.readyState==='complete')fit();}catch(e){} // the hero may load before this script
  }

  /* the header: the logo and the CTA glide to the corners once you scroll (D98) */
  const sh=document.getElementById('sitehead');
  if(sh){const on=()=>{sh.classList.toggle('scrolled',scrollY>8);
      const f=frame&&frame.getBoundingClientRect(), gone=!frame||(heroCta?f.top+heroCta.getBoundingClientRect().bottom<0:f.bottom<innerHeight*.4);
      sh.classList.toggle('past',gone);};
    addEventListener('scroll',on,{passive:true});on();if(frame)frame.addEventListener('load',()=>setTimeout(on,50));}

  const host=document.getElementById('sections');
  host.innerHTML=await (await fetch('sections.html?'+Date.now())).text();

  document.querySelectorAll('a[href="/join"],a[href="#join"]').forEach(a=>a.href=signup(a.closest('#sitehead')?'header':a.closest('#join')?'signup-box':'page'));

  document.querySelectorAll('[data-logo-mini]').forEach(e=>wordmark(e,{byline:false}));

  /* custom apps wear their own glyph (D86) */
  const G={calendar:['#3B6CF6','M5 7h12v10H5zM5 10.5h12M8.5 5v3.5M13.5 5v3.5'],order:['#0E9F8E','M5 7h12l-1.4 8H6.4zM8 7V5.5a3 3 0 0 1 6 0V7'],
    returns:['#E85D75','M5 8h8a4 4 0 0 1 0 8H9M5 8l3-3M5 8l3 3'],
    money:['#E39B12','M11 4v14M14.5 7.5c-.6-1.2-1.9-2-3.5-2-2 0-3.5 1.1-3.5 2.6 0 3.6 7 1.8 7 5.3 0 1.5-1.5 2.6-3.5 2.6-1.7 0-3.1-.8-3.7-2.1']};
  window.glyph=(k,z=26)=>{const [c,d]=G[k];return `<svg viewBox="0 0 22 22" width="${z}" height="${z}" style="flex:none"><rect width="22" height="22" rx="6" fill="${c}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;};

  /* the crew, icons, glyphs and logos everywhere */
  document.querySelectorAll('[data-logo]').forEach(e=>wordmark(e));
  document.querySelectorAll('[data-g]').forEach(e=>e.innerHTML=glyph(e.dataset.g,+(e.dataset.s||26)));
  document.querySelectorAll('[data-l]').forEach(e=>{e.classList.add('logos');e.innerHTML=e.dataset.l.split(',').map(s=>logo(s,+(e.dataset.s||18))).join('');});
  document.querySelectorAll('[data-h]').forEach(e=>e.innerHTML=huddle(e.dataset.h.split(','),+(e.dataset.s||24)));
  document.querySelectorAll('[data-w]').forEach(e=>{e.style.display='inline-flex';e.innerHTML=face(e.dataset.w,+(e.dataset.s||24),'l');});

  /* Instead: five painful tasks; a crew member lands on each and works it; then they line up, done, inside the app */
  const sec=document.getElementById('instead'), scene=document.getElementById('scene'), tasksEl=document.getElementById('tasks');
  if(sec&&scene&&tasksEl){
    /* only work no single tool does on its own (Jii, 10 Nov): each task crosses from one app into another */
    const TASKS=[
      {task:'Retype every WhatsApp order into Xero',apps:[['whatsapp'],['xero']],pain:'By hand, every single order',who:'writer',kind:'AI agent',doing:'Reading the PDF order',did:'reads each PDF and enters it',stage:'New order',x:'1%',y:'22px',r:'-2.5deg'},
      {task:'Confirm each order with the customer',apps:[['xero'],['whatsapp']],pain:'Copied over by hand, often late',who:'keeper',kind:'Automation',doing:'Confirming on WhatsApp',did:'confirms on WhatsApp once it is in Xero',stage:'Confirmed',x:'55%',y:'0px',r:'2deg'},
      {task:'Chase late payers on WhatsApp',apps:[['xero'],['whatsapp']],pain:'3 invoices already overdue',who:'rosa',kind:'AI agent',doing:'Nudging 3 late payers',did:'nudges each one, asks you before any exception',stage:'Awaiting payment',x:'5%',y:'232px',r:'1.5deg'},
      {task:'Update the payments sheet',apps:[['xero'],['googlesheets']],pain:'Fridays, if you remember',who:'ledger',kind:'Automation',doing:'Logging today\'s payments',did:'logs every payment as it lands',stage:'Paid',x:'56%',y:'214px',r:'-2deg'},
      {task:'Book the delivery once it is paid',apps:[['xero'],['googlecalendar']],pain:'Waits until you check',who:'booker',kind:'Automation',doing:'Booking Thursday 9 to 11',did:'books the slot and tells the driver',stage:'Delivery booked',x:'29%',y:'418px',r:'-1deg'}];
    const NAME=id=>id[0].toUpperCase()+id.slice(1);
    const YOU='<span class="you-ic"><svg viewBox="0 0 16 16" width="14" height="14"><circle cx="8" cy="5.5" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 14c.8-2.8 3-4.2 5.5-4.2s4.7 1.4 5.5 4.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>';
    tasksEl.innerHTML=TASKS.map((t,i)=>`<div class="tk" style="--i:${i};--x0:${t.x};--y0:${t.y};--r0:${t.r}">
      <div class="tk-top">${t.apps.map(([a])=>`<span class="ic-b">${logo(a,22)}</span>`).join('<span class="arr" aria-hidden="true">→</span>')}<span class="tag">Order to cash</span></div>
      <div class="tk-task">${t.task}</div><span class="chk" aria-hidden="true"></span>
      <div class="tk-foot"><span class="pain">⚠ ${t.pain}</span><span class="you">${YOU}You</span>
        <span class="pick">${face(t.who,24,'l')}${NAME(t.who)} picked this up</span><span class="work"><span>${face(t.who,24,'l')}${NAME(t.who)}: ${t.doing}</span></span>
        <span class="took">${face(t.who,28,'l')}<span><b>${NAME(t.who)}</b> <small>${t.kind}, ${t.did}</small></span></span><span class="done">✓ Done</span></div>
      <span class="fly" aria-hidden="true">${face(t.who,44,'l')}</span></div>`).join('');
    const waiting=document.getElementById('waiting'), waitingL=document.getElementById('waiting-l');
    const btns=[...sec.querySelectorAll('.switch button')];
    const kb=document.getElementById('kb');
    kb.innerHTML=TASKS.map(t=>`<div class="kcol"><span class="kc-l">${t.stage}</span><div class="kc-cards"></div></div>`).join('');
    const cols=[...kb.querySelectorAll('.kc-cards')];
    /* each stage has its order; the stage's crew member works it right there, then it ticks done in place (Jii, 10 Nov) */
    const ORDERS=[['Brightside','PO-4471 · $1,012'],['Maya\'s Café','PO-4480 · $380'],['Lumen','INV-2240 · $4,100'],['Harbor Co','INV-2231 · $1,650'],['Fieldnote','PO-4462 · $640']];
    const DOING=['Entering it','Confirming','Nudging them','Logging it','Booking it'];
    const DONE=['In Xero','Confirmed','Paid','Logged','Thu 9 to 11'];
    const EARLIER=[['Oakleaf','Entered in Xero'],['Tidewater','Confirmed'],['Copper & Co','Paid'],['Greenway','Logged'],['Millstone','Delivered Mon']]; // finished earlier today, so each stage reads like a real board
    EARLIER.forEach(([n,d],i)=>cols[i].insertAdjacentHTML('beforeend',`<div class="oc old"><b>${n}</b><span class="oc-n">✓ ${d}</span></div>`));
    const oc=ORDERS.map(([n,m],i)=>{const e=document.createElement('div');e.className='oc';e.style.order=-1;
      e.innerHTML=`<span class="oc-w">${face(TASKS[i].who,22,'l')}</span><span class="oc-ok" aria-hidden="true">✓</span><b>${n}</b><small>${m}</small><span class="oc-n"></span>`;cols[i].appendChild(e);return e;});
    const board=k=>oc.forEach((e,i)=>{const d=i<k;if(e.classList.contains('shipped')!==d){e.classList.toggle('shipped',d);if(d&&!reduced){e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop');}}
      e.querySelector('.oc-n').textContent=d?'✓ '+DONE[i]:DOING[i];});
    board(0);
    const rows=[...tasksEl.children], N=rows.length;
    /* one state for the whole scene: the stage, how many tasks the crew has picked up, how many are done */
    const apply=(st,picked,done)=>{if(scene.dataset.stage!==String(st))scene.dataset.stage=st;
      rows.forEach((r,i)=>{r.classList.toggle('picked',st>0&&i<picked);r.classList.toggle('fin',st===2&&i<done);});
      board(st===2?done:0);
      const left=st===0?N:st===1?N-picked:0;waiting.textContent=left;
      waitingL.textContent=st===0?'tasks waiting on you':st===1?(left?'still waiting on you':'waiting on you. Your crew picked them all up'):(done<N?'waiting on you. Your crew is working':'waiting on you. All done');
      btns.forEach(b=>{const on=(b.dataset.state==='with')===(st>0);b.classList.toggle('on',on);b.setAttribute('aria-selected',on);});};
    const pin=sec.querySelector('.pin');
    /* the whole scene (board included) always fits one screen: on shorter screens it scales down instead of running past the fold */
    const fitPin=()=>{pin.style.zoom='';const h0=pin.offsetHeight,z=innerWidth>980?Math.min(1,(innerHeight-88)/h0):1;pin.style.zoom=z<1?z:'';
      const h=h0*z;sec.style.setProperty('--ph',h+'px');sec.style.setProperty('--pin-top',Math.max(72,(innerHeight-h)/2)+'px');};
    /* scroll drives every step (Jii, 10 Nov): quick where there is little to see, slower where the crew picks up and finishes
       each task. t = screens scrolled while pinned (0 to 1.7) */
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    let manual=0,seq=0;
    const onScroll=()=>{if(Date.now()<manual||innerWidth<=980)return;
      const t=(pin.getBoundingClientRect().top-sec.getBoundingClientRect().top-parseFloat(getComputedStyle(sec).paddingTop))/innerHeight;
      if(t<.12)apply(0,0,0);
      else if(t<.55)apply(1,clamp(Math.floor((t-.12)/.07)+1,0,N),0);
      else apply(2,N,t<.68?0:clamp(Math.floor((t-.68)/.14)+1,0,N));};
    /* the switch (and phones) play the same steps on a timer */
    const play=async to=>{const me=++seq,w=ms=>new Promise(r=>setTimeout(r,reduced?0:ms));
      if(to==='today'){apply(0,0,0);return;}
      for(let p=1;p<=N;p++){if(me!==seq)return;apply(1,p,0);await w(260);}await w(900);
      for(let d=0;d<=N;d++){if(me!==seq)return;apply(2,N,d);await w(d?450:1100);}};
    btns.forEach(b=>b.onclick=()=>{manual=Date.now()+7000;play(b.dataset.state);});
    addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',fitPin);
    apply(0,0,0);fitPin();onScroll();
    if(innerWidth<=980&&!reduced){let on=false; // phones: no pinning, so it plays on its own once on screen
      const loop=async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));for(;;){play('today');await w(3500);play('with');await w(9000);}};
      const chk=()=>{if(on||scene.getBoundingClientRect().top>innerHeight*.7)return;on=true;removeEventListener('scroll',chk);loop();};
      addEventListener('scroll',chk,{passive:true});chk();}
  }

  /* Use cases: a wall of jobs, each a small preview of the work, the request in the visitor's words, and who does it */
  const wall=document.getElementById('uses-wall');
  if(wall){
    const L=(s,z=16)=>logo(s,z), F=(id,z=22)=>face(id,z,'l');
    const row=(a,b,c,ok)=>`<div class="u-row"><span>${a}</span><small>${b}</small><em class="${ok?'ok':''}">${c}</em></div>`;
    /* each card: who does it, a preview of the work, what it is in a few words, and how it does it in one line */
    const USES=[
      {t:'Win back customers who stopped ordering',kind:'AI agent',who:['closer'],bg:'#2D4FA8',
        ui:`<div class="u-h">${L('shopify')}Quiet for 60+ days</div>${row('Priya S.','64 days','✓ Sent',1)}${row('Tom H.','71 days','✓ Sent',1)}${row('Ana R.','90 days','Sending…')}`},
      {t:'Order from the cheapest supplier each week',kind:'Browser agent',who:['scout'],bg:'#C65A3A',
        ui:`<div class="u-h u-url">dailydairy.example/wholesale</div>${row('Daily Dairy','$38.90','✓ Ordered',1)}${row('MilkCo','$40.10','')}${row('Farm Fresh','$41.20','')}`},
      {t:'Reply to every Google review',kind:'AI agent',who:['writer'],bg:'#4F7F64',
        ui:`<div class="u-h">${L('google')}New review · ★★★★☆</div><div class="u-q">“Loved the croissants, but delivery was late.”</div><div class="u-b">Thanks, Sam! Your next delivery is on us.</div>`},
      {t:'Book calls with good-fit leads',kind:'App',who:['lead','booker'],bg:'#6E4A8E',
        ui:`<div class="u-h">${L('typeform')}New lead · Harbor Co</div>${row('Fit score','82 / 100','Good fit',1)}${row('Call booked','Thu 3:00 pm','✓',1)}`},
      {t:'Match Stripe payments to Xero every month',kind:'App',who:['ledger','writer'],bg:'#B7862A',
        ui:`<div class="u-h">${L('xero')}${L('stripe')}October</div>${row('Revenue','','$48,210')}${row('Unpaid','4 invoices','$6,120')}${row('Matched','212 of 212','✓',1)}`},
      {t:'Answer “where’s my order?” on WhatsApp and Instagram',kind:'Automation',who:['keeper'],bg:'#3B4A5C',
        ui:`<div class="u-h">${L('instagram')}${L('whatsapp')}Inbox</div><div class="u-q">Where’s my order #1047?</div><div class="u-b">Arrives Thursday. Track it here.</div>`},
      {t:'Track competitors’ price changes',kind:'Browser agent',who:['pilot'],bg:'#2A7F86',
        ui:`<div class="u-h">${L('slack')}#pricing-watch</div>${row('Rival Co, Pro','$49 → $59','▲ 20%')}${row('BrightBake','New bundle','Spotted')}${row('3 others','','No change')}`},
      {t:'Set up new hires before day one',kind:'App',who:['sprout','keeper','booker'],bg:'#B8506A',
        ui:`<div class="u-h">${L('docusign')}Offer signed · Leo P.</div>${row('Google account','','✓',1)}${row('Added to Slack','','✓',1)}${row('First week booked','','✓',1)}`},
      {t:'Reorder stock before it runs out',kind:'App',who:['keeper','scout'],bg:'#5B6B2E',
        ui:`<div class="u-h">${L('shopify')}Low stock</div>${row('Oat milk','4 left','Reordering…')}${row('Flour, 25kg','2 left','✓ Ordered',1)}`},
      {t:'Turn quote requests into priced quotes',kind:'AI agent',who:['writer'],bg:'#8A4B2F',
        ui:`<div class="u-h">${L('gmail')}Quote request · Lumen</div>${row('Quote Q-118','12 items','$2,340')}<div class="u-b">Quote attached. Valid for 14 days.</div>`},
      {t:'Send the weekly sales report to Slack',kind:'Automation',who:['ledger'],bg:'#34508C',
        ui:`<div class="u-h">${L('slack')}#numbers</div>${row('Sales','this week','$12,480')}${row('Orders','','184')}${row('Ad spend','','$1,920')}`},
      {t:'Collect client documents into Drive',kind:'AI agent',who:['rosa'],bg:'#7A3E5C',
        ui:`<div class="u-h">${L('googledrive')}Year-end files</div>${row('Bank statements','Harbor Co','✓ In Drive',1)}${row('Receipts','Lumen','Reminded')}`},
      {t:'Warn customers about late parcels',kind:'Browser agent',who:['scout'],bg:'#3F6F5A',
        ui:`<div class="u-h u-url">carrier.example/track</div>${row('#1047','In transit','✓',1)}${row('#1052','Stuck 3 days','Customer told')}`},
      {t:'Log sales calls and draft the follow-ups',kind:'AI agent',who:['writer'],bg:'#4A4A8A',
        ui:`<div class="u-h">${L('zoom')}Call with Maya · 30 min</div>${row('Notes','in HubSpot','✓',1)}<div class="u-b">Great talking today! Here’s the plan we agreed.</div>`},
      {t:'Enter supplier bills in Xero',kind:'App',who:['writer','ledger'],bg:'#7D6A2B',
        ui:`<div class="u-h">${L('gmail')}${L('xero')}Bills this week</div>${row('Daily Dairy','$778','✓ Entered',1)}${row('PackRight','$214','Needs your yes')}`},
      {t:'Keep marketplace listings in sync with Shopify',kind:'Browser agent',who:['pilot'],bg:'#2E5E7E',
        ui:`<div class="u-h">${L('shopify')}Sync to marketplace</div>${row('Oat milk 1L','$4.20','✓ Updated',1)}${row('Sourdough','Out of stock','✓ Hidden',1)}`},
      {t:'Thank your top customers every month',kind:'AI agent',who:['closer'],bg:'#9A4A6B',
        ui:`<div class="u-h">${L('shopify')}Top customers · October</div>${row('Brightside','$4,120','✓ Thanked',1)}${row('Harbor Co','$3,880','✓ Thanked',1)}`},
      {t:'Book the delivery when an order is paid',kind:'Automation',who:['booker'],bg:'#3D6B4A',
        ui:`<div class="u-h">${L('googlecalendar')}Deliveries</div>${row('Brightside','Thu 9–11','✓ Booked',1)}${row('Driver told','WhatsApp','✓',1)}`},
      {t:'Handle refund and exchange requests',kind:'App',who:['keeper','writer'],bg:'#5A4E8C',
        ui:`<div class="u-h">${L('gmail')}Support inbox</div>${row('Refund · #1031','$38','✓ Done',1)}${row('Exchange · #1044','Size M','✓ Done',1)}`},
      {t:'Get a brief before every customer meeting',kind:'AI agent',who:['lead'],bg:'#6B5B3E',
        ui:`<div class="u-h">${L('googlecalendar')}10:00 · Lumen</div>${row('Last order','Oct 2','$4,100')}${row('Open invoice','INV-2240','$2,050')}`}];
    const card=u=>`<div class="uc">
      <div class="uc-prev" style="--ub:${u.bg}"><span class="uc-kind">${u.who.length>1?huddle(u.who,20):F(u.who[0],20)}${u.kind}</span><div class="uc-win">${u.ui}</div></div>
      <div class="uc-body"><h3>${u.t}</h3></div></div>`; // one line: what happens. The preview shows it (Jii, 10 Nov)
    /* two rows, each scrolled on its own (trackpad or swipe); not links, since early access has nothing to open yet */
    const half=Math.ceil(USES.length/2);
    wall.innerHTML=[USES.slice(0,half),USES.slice(half)].map(r=>`<div class="urow" tabindex="0" aria-label="Use cases, scroll sideways">${r.map(card).join('')}</div>`).join('');
  }

  /* Human in the loop, as a film: a camera over the app and the team's Slack (in the Stage builder's manner) */
  const hf=document.getElementById('hfilm');
  if(hf){const stage=document.getElementById('f-stage'), world=document.getElementById('f-world'), K=n=>world.querySelector(`[data-k="${n}"]`);
    const steps=[...hf.querySelectorAll('.f-steps li')];
    const wr=e=>{let x=0,y=0,n=e;while(n&&n!==world){x+=n.offsetLeft;y+=n.offsetTop;n=n.offsetParent;}return [x,y,x+e.offsetWidth,y+e.offsetHeight];};
    const shot=(rect,pad=.9,cap=1.5)=>{const [x,y,r,b]=rect,SW=stage.clientWidth,SH=stage.clientHeight,s=Math.min(SW/(r-x),SH/(b-y),cap/pad)*pad;
      world.style.transform=`translate(${SW/2-(x+(r-x)/2)*s}px,${SH/2-(y+(b-y)/2)*s}px) scale(${s})`;};
    const at=(el,e,fx=.5,fy=.5)=>{const [x,y,r,b]=wr(e);el.style.transform=`translate(${x+(r-x)*fx}px,${y+(b-y)*fy}px) translate(-50%,-50%)`;};
    const WIDE=[20,20,1380,620], row=K('row'), bot=K('bot'), tok=K('tok'), cur=K('cur'), ok=K('approve');
    const step=n=>steps.forEach((li,i)=>{li.classList.toggle('on',i===n-1);li.classList.toggle('past',i<n-1);});
    const reset=()=>{['m1','m2','m3'].forEach(m=>K(m).classList.remove('show'));K('typing').classList.remove('show');ok.classList.remove('done','press');ok.textContent='Approve 2 months';
      row.classList.remove('flag','ok');K('rowchk').classList.remove('on');K('rowst').textContent='Rosa is on it';K('rowwho').innerHTML='';bot.style.opacity=1;at(bot,row,.93,.5);
      tok.style.opacity=0;cur.style.opacity=0;shot(WIDE);step(0);};
    const end=()=>{['m1','m2','m3'].forEach(m=>K(m).classList.add('show'));ok.classList.add('done');ok.textContent='✓ Approved by Priya';
      row.classList.add('ok');K('rowchk').classList.add('on');K('rowst').textContent='Done. Priya decided, Rosa finished it';shot(WIDE);at(bot,row,.93,.5);step(4);};
    const W=ms=>new Promise(r=>setTimeout(r,ms));
    const run=async()=>{for(;;){reset();await W(1600);
      /* 1: Rosa spots a task past the rule */
      shot(wr(K('app')),.92);await W(500);row.classList.add('flag');K('rowst').textContent='Past your 2-week rule. Needs a person';step(1);await W(2200);
      /* 2: carries it to #finance and asks Priya */
      shot(WIDE);at(tok,row,.4,.5);tok.style.opacity=1;await W(700);at(tok,K('msgs'),.4,.3);at(bot,K('msgs'),.08,.3);step(2);await W(1200);
      shot(wr(K('slack')),.94);tok.style.opacity=0;bot.style.opacity=0;K('m1').classList.add('show'); // in the chat Rosa is her message's avatar, not a second blob
      K('rowwho').innerHTML='<img class="pic xs" src="https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=e8e0ff" alt="">';K('rowst').textContent='With Priya in #finance';await W(2600);
      /* 3: Priya decides */
      at(cur,K('slack'),.15,.95);cur.style.opacity=1;K('typing').classList.add('show');step(3);await W(400);at(cur,ok,.5,.6);await W(1100);
      ok.classList.add('press');await W(180);ok.classList.remove('press');ok.classList.add('done');ok.textContent='✓ Approved by Priya';
      K('typing').classList.remove('show');K('m2').classList.add('show');cur.style.opacity=0;await W(2000);
      /* 4: Rosa finishes the job */
      K('m3').classList.add('show');step(4);await W(1800);
      at(bot,K('msgs'),.08,.85);bot.style.opacity=1;shot(WIDE);await W(500);at(bot,row,.93,.5);await W(900);shot(wr(K('app')),.92);await W(500);row.classList.remove('flag');row.classList.add('ok');K('rowchk').classList.add('on');
      K('rowwho').innerHTML='';K('rowst').textContent='Done. Priya decided, Rosa finished it';await W(3200);
      shot(WIDE);await W(1800);}};
    const fit=()=>{if(hf.dataset.on)return;world.style.transition='none';shot(WIDE);void world.offsetWidth;world.style.transition='';at(bot,row,.93,.5);}; // first frame placed without a glide
    addEventListener('resize',()=>shot(WIDE));
    if(reduced)end();else{fit();const chk=()=>{if(hf.dataset.on||stage.getBoundingClientRect().top>innerHeight*.75)return;hf.dataset.on=1;removeEventListener('scroll',chk);run();};
      addEventListener('scroll',chk,{passive:true});chk();}
  }

  /* What it builds: the browser agent places a real order on a site with no connector (Scout rides the cursor) */
  const site=document.getElementById('site');
  if(site){
    const qty=document.getElementById('qty'), place=document.getElementById('place'), placed=document.getElementById('placed');
    const ptr=document.createElement('div');ptr.className='ptr';ptr.style.cssText='position:absolute;z-index:3;pointer-events:none;transition:left .9s cubic-bezier(.3,.7,.2,1),top .9s cubic-bezier(.3,.7,.2,1)';
    ptr.innerHTML='<svg viewBox="0 0 14 14" width="16" height="16"><path d="M1 1l11 5-5 1.5L5 13z" fill="#141518" stroke="#fff" stroke-width="1"/></svg><span style="position:absolute;left:12px;top:12px">'+face('scout',24)+'</span>';
    site.appendChild(ptr);
    const at=el=>{const a=site.getBoundingClientRect(),b=el.getBoundingClientRect();return [b.left-a.left+b.width*.6,b.top-a.top+b.height*.55];};
    const go=el=>{const [x,y]=at(el);ptr.style.left=x+'px';ptr.style.top=y+'px';};
    const wait=ms=>new Promise(r=>setTimeout(r,ms));
    const final=()=>{qty.textContent='20';placed.classList.add('on');go(place);};
    if(reduced)final();
    else{let live=false;
      new IntersectionObserver(es=>{live=es[0].isIntersecting;},{threshold:.3}).observe(site);
      (async()=>{ptr.style.left='88%';ptr.style.top='20%';
        for(;;){
          if(!live){await wait(400);continue;}
          qty.textContent='';placed.classList.remove('on');ptr.style.left='88%';ptr.style.top='20%';await wait(900);
          go(qty);await wait(1000);qty.classList.add('focus');
          for(const c of '20'){qty.textContent+=c;await wait(260);}
          await wait(400);qty.classList.remove('focus');go(place);await wait(1000);
          place.classList.add('press');await wait(220);place.classList.remove('press');placed.classList.add('on');
          await wait(3200);
        }})();
    }
  }

  /* It asks, and it remembers: a real chat. Rosa asks; you type an answer in your own words; it is saved; next week Rosa uses it */
  const learn=document.getElementById('learn');
  if(learn){
    const body=document.getElementById('chat-body'), ct=document.getElementById('ct'), send=document.getElementById('send'),
      comp=learn.querySelector('.chat-compose'), memNew=document.getElementById('mem-new'), used=document.getElementById('mem-used');
    const wait=ms=>new Promise(r=>setTimeout(r,reduced?0:ms));
    const add=html=>{body.insertAdjacentHTML('beforeend',html);const e=body.lastElementChild;if(!reduced)e.classList.add('pop');return e;};
    const rosa=t=>add(`<div class="msg in"><span>${face('rosa',28,'l')}</span><div class="bubble in">${t}</div></div>`);
    const REPLY='Yes. Regular customers can always split a payment in two.';
    const run=async()=>{
      body.innerHTML='';memNew.classList.remove('on');used.classList.remove('on');body.classList.remove('fade');
      add('<div class="day">Monday</div>');await wait(500);
      rosa('Lumen wants to pay their $4,100 invoice in two parts, a month apart. Should I agree?');await wait(1300);
      comp.classList.add('typing');ct.innerHTML='';ct.classList.add('caret');
      for(let i=1;i<=REPLY.length&&!reduced;i++){ct.textContent=REPLY.slice(0,i);await wait(32);}
      ct.textContent=REPLY;send.classList.add('on');await wait(350);send.classList.add('press');await wait(160);
      send.className='send';ct.classList.remove('caret');comp.classList.remove('typing');ct.innerHTML='<span class="ph">Reply to Rosa</span>';
      add(`<div class="msg out"><div class="bubble you">${REPLY}</div></div>`);await wait(700);
      add('<div class="saved">✓ Saved to Rosa\'s memory</div>');memNew.classList.add('on');await wait(1400);
      rosa('Done. Two invoices sent to Lumen.');await wait(1800);
      add('<div class="day">Next Monday</div>');await wait(600);
      rosa('Brightside asked to split $2,600. They\'re regular customers, so I said yes and sent two invoices.<span class="recall"><b>From memory:</b> regular customers can split a payment in two</span>');
      used.classList.add('on');
    };
    if(reduced)run();
    else{let started=false;
      const loop=async()=>{for(;;){await run();await wait(5500);body.classList.add('fade');await wait(500);}};
      const check=()=>{if(started||learn.getBoundingClientRect().top>innerHeight*.75)return;started=true;removeEventListener('scroll',check);loop();};
      addEventListener('scroll',check,{passive:true});check();}
  }

  /* Join: example jobs typed into the ask box, one after another */
  const job=document.getElementById('jb-job');
  if(job&&!reduced){const JOBS=['chasing late invoices','answering order emails','booking deliveries','the weekly sales report','updating the stock sheet'];
    (async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));for(let k=1;;k=(k+1)%JOBS.length){await w(2600);
      for(let t=job.textContent;t.length;t=t.slice(0,-1)){job.textContent=t;await w(22);}job.textContent='';
      for(const ch of JOBS[k]){job.textContent+=ch;await w(45);}}})();}

  /* Footer: the crew peeking up from the bottom edge, small and still (they only blink) */
  const crowd=document.getElementById('crowd');
  if(crowd){const ids=Object.keys(LOOK), sz=[30,34,28,32,30,36,28,32,30,34];
    crowd.innerHTML=Array.from({length:40},(_,i)=>`<span>${face(ids[(i*5)%ids.length],sz[i%sz.length],'l')}</span>`).join('');
    while(crowd.scrollWidth>crowd.clientWidth&&crowd.children.length>4)crowd.lastElementChild.remove();}
})();
