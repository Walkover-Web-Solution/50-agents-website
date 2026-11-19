// A guide's cover, v7 (D260, Jii's round 5: "all guide previews and these images should be according to the guide or
// else they look the same"). Each guide's JSON carries a typed `cover` (./types.ts GuideCover) saying what to draw: its
// real apps (catalog logos), its key object (an overdue invoice row, a Stripe payment going into a sheet, a Shopify order,
// a calendar day, a pricing page whose price changed, an inbox with a draft) and its few words. A small set of scene
// components draws it in ink and hairlines with one soft accent (the kind's tint). Captain's blob only where the cover
// says so. Server HTML, sized in container units so a card, the featured guide and a phone read the same.
// Before that, v6 (D258): the scene came from the category, so covers of one category looked alike.
import { AppLogo, Face, KINDS } from '../parts';
import { appIcon, appName } from '../usecase/apps-data';
import type { CoverPanel, CoverRow, GuideCover as Cover, GuidePage } from './types';

const Logo = ({ app }: { app: string }) => <span className="cv-lg"><AppLogo app={app} icon={appIcon(app)} size={24} /></span>;
const Tick = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 10.4l3 3L14.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Captain = () => <span className="cv-cap"><Face id="lead" size={40} /></span>;
const Tag = ({ t }: { t?: string }) => (t ? <span className="cv-tag">{t}</span> : null);
const Arrow = ({ down }: { down?: boolean }) => (
  <svg className="cv-arr" viewBox={down ? '0 0 12 28' : '0 0 28 12'} aria-hidden="true">
    {down ? <path d="M6 1v25M1.5 21.5 6 26l4.5-4.5" /> : <path d="M1 6h25M21.5 1.5 26 6l-4.5 4.5" />}
  </svg>
);
const Mark = ({ m }: { m?: 'yes' | 'no' }) => (m ? <span className={`cv-mk ${m}`}>{m === 'yes' ? <Tick /> : <i />}</span> : null);

function Row({ r, look }: { r: CoverRow; look: NonNullable<CoverPanel['look']> }) {
  if (look === 'doc') return <div className={r.tag || r.on ? 'on' : undefined}><span className="l">{r.cells[0]}</span><span className="v">{r.cells[1]}</span><Tag t={r.tag} /></div>;
  return (
    <div className={r.tag || r.on ? 'on' : undefined}>
      {r.app && <Logo app={r.app} />}
      {r.cells.map((c, i) => <span key={i} className={i === 0 ? 'c f' : 'c'}>{c}</span>)}
      {r.bar !== undefined && <span className="cv-bar"><i style={{ width: `${Math.round(r.bar * 100)}%` }} /></span>}
      <Mark m={r.mark} />
      <Tag t={r.tag} />
    </div>
  );
}

/** The shared panel: an app's logo and a label over its rows. */
function Panel({ p, small }: { p: CoverPanel; small?: boolean }) {
  const look = p.look ?? 'list';
  const cols = Math.max(...p.rows.map(r => r.cells.length), p.head?.length ?? 0);
  return (
    <div className={`cv-card cv-pnl cv-${look}${small ? ' sm' : ''}`} style={{ ['--cols' as string]: cols }}>
      <div className="cv-hd">{p.app && <Logo app={p.app} />}<b>{p.label}</b></div>
      {look === 'sheet' && <div className="cl">{Array.from({ length: cols }, (_, i) => <span key={i}>{String.fromCharCode(65 + i)}</span>)}</div>}
      {look === 'compare' && p.head && <div className="th">{p.head.map((h, i) => <span key={i}>{h}</span>)}</div>}
      <div className="rs">{p.rows.map((r, i) => <Row key={i} r={r} look={look} />)}</div>
    </div>
  );
}

function Pipe({ c }: { c: Extract<Cover, { scene: 'pipe' }> }) {
  return (
    <div className={`cv-pipe${c.down ? ' down' : ''}`}>
      <Panel p={c.from} small />
      <span className="mid"><Arrow down={c.down} />{c.via && <em>{c.via}</em>}</span>
      <Panel p={c.to} small />
    </div>
  );
}

function Message({ c }: { c: Extract<Cover, { scene: 'message' }> }) {
  return (
    <div className="cv-card cv-msg">
      <div className="cv-hd"><Logo app={c.app} /><span>{c.where}</span><Tag t={c.tag} /></div>
      <b>{c.subject}</b>
      <div className="ls">{c.lines.map(l => <p key={l}>{l}</p>)}</div>
      {c.buttons && <span className="cv-btns"><span className="on">{c.buttons[0]}</span><span>{c.buttons[1]}</span></span>}
      {c.captain && <Captain />}
    </div>
  );
}

function Calendar({ c }: { c: Extract<Cover, { scene: 'calendar' }> }) {
  return (
    <div className="cv-cal">
      <div className="cv-card day">
        <div className="cv-hd"><Logo app={c.app} /><b>{c.day}</b></div>
        <ol>{c.events.map(e => <li key={e.time}><span className="t">{e.time}</span><span className="e">{e.title}</span></li>)}</ol>
      </div>
      <Arrow />
      <div className="cv-card post">
        <div className="cv-hd"><Logo app={c.to.app} /><b>{appName(c.to.app)}</b></div>
        <p>{c.to.text}</p>
      </div>
    </div>
  );
}

function Page({ c }: { c: Extract<Cover, { scene: 'page' }> }) {
  return (
    <div className={`cv-card cv-page ${c.look}`}>
      <div className="bar"><i /><i /><i /><span>{c.url}</span></div>
      <div className="bd">
        <b className="ti">{c.title}</b>
        {c.look === 'price' ? (
          <div className="pr"><s>{c.was}</s><span className="now">{c.now}</span><Tag t={c.tag} /></div>
        ) : c.look === 'form' ? (
          <div className="fm">{c.rows.map((r, i) => <span key={i} className={r.tag || r.on ? 'on' : undefined}><em>{r.cells[0]}</em><span>{r.cells[1]}</span></span>)}</div>
        ) : (
          <div className="ls">{c.rows.map((r, i) => <Row key={i} r={r} look="list" />)}</div>
        )}
        {c.button && <span className="go">{c.button}</span>}
      </div>
      {c.look !== 'list' && <svg className="ptr" viewBox="0 0 16 22" aria-hidden="true"><path d="M1 1v17l4.5-4.5 3.5 7 3-1.5-3.5-7H15z" /></svg>}
    </div>
  );
}

function Chat({ c }: { c: Extract<Cover, { scene: 'chat' }> }) {
  return (
    <div className="cv-chat">
      <p className="cv-me"><span>{c.ask}</span></p>
      <div className="cv-ai">
        <Captain />
        <div className="cv-reply"><span className="aps">{c.apps.map(a => <Logo key={a} app={a} />)}</span><span>{c.reply}</span></div>
      </div>
    </div>
  );
}

function Fork({ c }: { c: Extract<Cover, { scene: 'fork' }> }) {
  return (
    <div className="cv-fork">
      <p className="q">{c.q}</p>
      <ul>{c.options.map((o, i) => <li key={o} className={i === c.pick ? 'on' : undefined}>{i === c.pick && <Tick />}<span className="t">{o}</span></li>)}</ul>
    </div>
  );
}

function Access({ c }: { c: Extract<Cover, { scene: 'access' }> }) {
  return (
    <div className="cv-card cv-acc">
      <div className="cv-hd"><b>{c.label}</b></div>
      {c.apps.map(a => (
        <div key={a.app} className={a.on ? 'on' : undefined}>
          <Logo app={a.app} /><span className="n">{appName(a.app)}</span><span className="a">{a.access}</span><i className="sw" />
        </div>
      ))}
    </div>
  );
}

function Board({ c }: { c: Extract<Cover, { scene: 'board' }> }) {
  return (
    <div className="cv-board">
      <div className="cv-hd">{c.app && <Logo app={c.app} />}<b>{c.label}</b></div>
      <div className="cs" style={{ ['--cols' as string]: c.columns.length }}>
        {c.columns.map(col => (
          <div key={col.name} className="col">
            <span className="nm">{col.name}</span>
            {col.cards.map(k => <span key={k.title} className={`cd${k.tag ? ' on' : ''}`}><span>{k.title}</span><Tag t={k.tag} /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Scene({ c }: { c: Cover }) {
  switch (c.scene) {
    case 'panel': return <Panel p={c.panel} />;
    case 'pipe': return <Pipe c={c} />;
    case 'message': return <Message c={c} />;
    case 'calendar': return <Calendar c={c} />;
    case 'page': return <Page c={c} />;
    case 'chat': return <Chat c={c} />;
    case 'fork': return <Fork c={c} />;
    case 'access': return <Access c={c} />;
    case 'board': return <Board c={c} />;
  }
}

export function GuideCover({ g, size = 'card' }: { g: GuidePage; size?: 'card' | 'feature' }) {
  return (
    <div className={`gcv gcv-${size} cv-${g.cover.scene}-s`} style={{ ['--k' as string]: KINDS[g.kind].tint }} aria-hidden="true">
      <div className="gcv-in"><Scene c={g.cover} /></div>
    </div>
  );
}
