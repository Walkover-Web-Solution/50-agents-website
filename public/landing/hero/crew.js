/* The crew: the only colour and the only fun on the page (D64).
   Same drawing as the product and landing/motion-study.html; four heroes share it. */
const LOOK={
  lead:['flip','oval','#2546FF'],     // the 0 in the wordmark
  keeper:['block','dot','#2FA36B'],   // automation: files, syncs, chases on a rule
  writer:['flip','tall','#FF7A4D'],   // normal agent: reads and writes
  scout:['screen','oval','#8A6CFF'],  // browser agent: works websites and portals
  chaser:['wideblock','dot','#F2A516'],
  booker:['block','oval','#12B5C9'],
  closer:['flip','dot','#F0559A'],
  // more crew for the sections below the hero (Jii, 6 Nov: use more blob types and colours)
  ledger:['pill','dot','#0E9F8E'],     // automation
  sorter:['tallblock','oval','#6C5CE7'], // normal agent
  sprout:['round','tall','#7CB342'],   // normal agent
  pilot:['screen','dot','#3BA7F0'],    // browser agent
  rosa:['pill','oval','#E85D75'],      // normal agent
  sunny:['round','dot','#F5B800'],     // automation
};
const KIND={lead:'ai',keeper:'flow',writer:'ai',scout:'browser',chaser:'flow',booker:'flow',closer:'ai',ledger:'flow',sorter:'ai',sprout:'ai',pilot:'browser',rosa:'ai',sunny:'flow'};
const KIND_LABEL={flow:'automation',ai:'normal agent',browser:'browser agent'};
const SHAPE={block:[40,36,[9,9,9,9]],wideblock:[50,32,[9,9,9,9]],screen:[44,40,[7,7,7,7]],flip:[40,36,[13,13,5,13]],pill:[52,30,[15,15,15,15]],tallblock:[34,40,[10,10,10,10]],round:[40,38,[19,19,19,19]]};
const EYES={oval:[3.2,4.6,5.8],dot:[3.3,3.3,5.6],tall:[2.7,5.2,5.4]};
const tint=(hex,a)=>'#'+[1,3,5].map(i=>{const v=parseInt(hex.slice(i,i+2),16);return Math.round(v+(255-v)*a).toString(16).padStart(2,'0');}).join('');
const shade=(hex,a)=>'#'+[1,3,5].map(i=>Math.round(parseInt(hex.slice(i,i+2),16)*(1-a)).toString(16).padStart(2,'0')).join('');

function face(id,s,cls=''){
  const L=LOOK[id], k=KIND[id], c=L[2];
  const [w,h0,[tl,tr,br,bl]]=SHAPE[L[0]], [rx,ry,gap]=EYES[L[1]];
  const scr=k==='browser', h=scr?28:h0, x=1.5, y=scr?3:(40-h)/2+.5, W=w-3, H=h-1;
  const d=`M${x+tl} ${y}H${x+W-tr}A${tr} ${tr} 0 0 1 ${x+W} ${y+tr}V${y+H-br}A${br} ${br} 0 0 1 ${x+W-br} ${y+H}H${x+bl}A${bl} ${bl} 0 0 1 ${x} ${y+H-bl}V${y+tl}A${tl} ${tl} 0 0 1 ${x+tl} ${y}Z`;
  const flow=k==='flow', line=flow?shade(c,.32):'#16171A', ey=flow?shade(c,.58):shade(c,.58); // D102: automations in full colour; told apart by their own-colour outline
  const cx=w/2, cy=scr?y+17:y+H/2-1, my=cy+ry+(scr?2.4:3);
  const extra=scr?`<path d="M${x+tl} ${y}H${x+W-tr}A${tr} ${tr} 0 0 1 ${x+W} ${y+tr}V${y+8}H${x}V${y+tl}A${tl} ${tl} 0 0 1 ${x+tl} ${y}Z" fill="${shade(c,.3)}"/><circle cx="${x+6}" cy="${y+4.3}" r="1.2" fill="#fff"/><circle cx="${x+10}" cy="${y+4.3}" r="1.2" fill="#fff"/><rect x="${cx-3.5}" y="${y+H+.8}" width="7" height="4" fill="#16171A"/><rect x="${cx-9}" y="${y+H+4.4}" width="18" height="3" rx="1.5" fill="#16171A"/>`:'';
  return `<svg class="face ${cls}" viewBox="0 0 ${w} 40" width="${s*w/40}" height="${s}" aria-hidden="true" style="--bl:${(4+Math.random()*2.4).toFixed(1)}s">`+
    `<path d="${d}" fill="${flow?tint(c,.22):c}"/>${extra}<path d="${d}" fill="none" stroke="${line}" stroke-width="${flow?2.2:1.6}"/>`+
    `<g class="ey" fill="${ey}"><ellipse cx="${cx-gap}" cy="${cy}" rx="${rx}" ry="${ry}"/><ellipse cx="${cx+gap}" cy="${cy}" rx="${rx}" ry="${ry}"/></g>`+
    `<path d="M${cx-2.3} ${my}q2.3 1.6 4.6 0" fill="none" stroke="${ey}" stroke-width="1.4" stroke-linecap="round"/></svg>`;
}

/* real app logos, drawn as a mask so each takes its brand colour */
const APP={google:'#4285F4',instagram:'#E4405F',docusign:'#4C00FF',hubspot:'#FF7A59',gmail:'#EA4335',shopify:'#7AB55C',quickbooks:'#2CA01C',googlecalendar:'#4285F4',googlesheets:'#34A853',zendesk:'#03363D',slack:'#4A154B',stripe:'#635BFF',linkedin:'#0A66C2',notion:'#000000',airtable:'#18BFFF',trello:'#0052CC',asana:'#F06A6A',mailchimp:'#FFE01B',zoom:'#0B5CFF',whatsapp:'#25D366',xero:'#13B5EA',intercom:'#6AFDEF',calendly:'#006BFF',typeform:'#262627',clickup:'#7B68EE',jira:'#0052CC',dropbox:'#0061FF',googledrive:'#4285F4',salesforce:'#00A1E0',wix:'#0C6EFC',wordpress:'#21759B',woocommerce:'#96588A',zoho:'#E42527',razorpay:'#0C2451',paypal:'#002991',googlemeet:'#00897B'};
const logo=(slug,s=14)=>`<i class="logo" style="width:${s}px;height:${s}px;background:${APP[slug]};-webkit-mask:url(https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${slug}.svg) center/contain no-repeat;mask:url(https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${slug}.svg) center/contain no-repeat"></i>`;

/* life: the crew only blinks; bodies stay still (Jii, D79 no jumping, D84 no breathing) */
document.head.insertAdjacentHTML('beforeend',`<style>
.logo{display:inline-block;flex:none;vertical-align:-2px}
.face{display:block;overflow:visible}
.face .ey{transform-box:fill-box;transform-origin:center;animation:blink var(--bl,5s) infinite}
.face.l .ey{translate:-2px 0}.face.r .ey{translate:2px 0}.face.u .ey{translate:0 -1.5px}
@keyframes blink{0%,95%,100%{scale:1 1}97%{scale:1 .12}}
.idle,.busy,.hop{transform-origin:50% 100%} /* kept as hooks; no body motion */
@media (prefers-reduced-motion:reduce){.face .ey{animation:none}}
</style>`);

/* the 50agents logo (D93): one font and one structure everywhere. "50agents" in Schibsted Grotesk 800, lowercase,
   tight; the 0 is a crew member that changes on every load and every placement (D69), never a browser agent (the
   screen shape reads as a monitor, not a 0); "from viaSocket" sits beneath it (D77). */
if(!document.querySelector('link[data-logo-font]'))document.head.insertAdjacentHTML('beforeend','<link data-logo-font rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;800&display=swap">');
document.head.insertAdjacentHTML('beforeend',`<style>
.logo50{display:inline-flex;flex-direction:column;align-items:flex-start;line-height:1;text-decoration:none;color:inherit}
.logo50 .w{display:inline-flex;align-items:center;font-family:'Schibsted Grotesk',system-ui,sans-serif;font-weight:800;letter-spacing:-.045em;white-space:nowrap}
.logo50 .o{display:inline-block;margin:0 .03em 0 .01em;line-height:0}
.logo50 .by{font-family:'Schibsted Grotesk',system-ui,sans-serif;font-weight:500;font-size:max(12px,.36em);letter-spacing:0;opacity:.62;margin-top:.32em}
</style>`);
const LOGO_POOL=Object.keys(LOOK).filter(id=>KIND[id]!=='browser');
let logoUsed=[];
function wordmark(el,opts={}){
  const byline=opts.byline!==false;
  let pool=LOGO_POOL.filter(id=>!logoUsed.includes(id)); if(!pool.length){logoUsed=[];pool=LOGO_POOL;}
  const id=pool[Math.floor(Math.random()*pool.length)]; logoUsed.push(id);
  const fs=parseFloat(getComputedStyle(el).fontSize);
  el.innerHTML=`<span class="logo50" aria-label="50agents, from viaSocket"><span class="w">5<span class="o">${face(id,fs*.92)}</span>agents</span>${byline?'<span class="by">from viaSocket</span>':''}</span>`;
}

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* a crew is drawn as a huddle, never side by side (Jii, D90): overlapping, the middle one raised */
function huddle(ids,s=22){const n=ids.length,mid=(n-1)/2;return `<span class="crew-huddle" style="display:inline-flex;align-items:flex-end">${ids.map((id,i)=>`<span style="margin-left:${i?-s*.32:0}px;position:relative;z-index:${n-Math.abs(i-mid)*2|0};transform:translateY(${Math.abs(i-mid)<.6&&n>1?-s*.18:0}px)">${face(id,s)}</span>`).join('')}</span>`;}
