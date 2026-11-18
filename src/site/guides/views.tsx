// The product views on the guides and role pages: the 50agents app's own screens, drawn in HTML from its source
// (agents/parts.tsx PlanCard, automations/track.tsx, needs/card.tsx, agents/client.tsx, browser/agent-kind.tsx and the
// apps recipes, read 19 Nov 2026), filled with labelled example data (D252). Every label is the app's own words.
import { Face } from '../parts';
import type { AgentView, AppDeskView, AppRef, BrowserView, NeedView, PlanView, SheetView, SlackView, Station, TrackView, View } from '@/content/guides/types';

function Bar({ title, example = true }: { title: string; example?: boolean }) {
  return <div className="pv-bar"><i /><i /><i /><span>{title}</span>{example && <em>Example data</em>}</div>;
}

function Logo({ app, size = 16 }: { app: AppRef; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return app.icon ? <img src={app.icon} alt="" width={size} height={size} loading="lazy" className="gv-icon" /> : <span className="gv-icon gv-letter" style={{ width: size, height: size }}>{app.name.slice(0, 1)}</span>;
}

function Dot({ tone }: { tone: 'ok' | 'warn' | 'bad' | 'mute' }) {
  return <i className={`gv-dot ${tone}`} aria-hidden="true" />;
}
const toneOf = (s: string) => (s === 'Done' ? 'ok' : s === 'Waits on you' ? 'warn' : s === 'Did not work' ? 'bad' : 'mute');

function Plan({ v }: { v: PlanView }) {
  return (
    <div className="gv-chat">
      <p className="cb-me">{v.ask}</p>
      {v.question && (
        <div className="cb-q">
          <p>{v.question.q}</p>
          <div>{v.question.choices.map(c => <span key={c} className={c === v.question!.picked ? 'on' : ''}>{c}</span>)}</div>
        </div>
      )}
      <div className="gv-card">
        <div className="gv-card-h"><Face id={v.face} size={32} /><div><b>{v.name}</b><span>{v.job}</span></div></div>
        <ol className="gv-steps">{v.steps.map(s => <li key={s}>{s}</li>)}</ol>
        <dl className="gv-facts">
          <dt>When</dt><dd>{v.when}</dd>
          <dt>Uses</dt><dd className="gv-apps">{v.uses.length ? v.uses.map(a => <span key={a.name}><Logo app={a} />{a.name}</span>) : 'No apps'}</dd>
          <dt>Asks first</dt><dd>{v.asksFirst}</dd>
        </dl>
        <div className="cb-acts"><span className="pv-b sm">Build it</span><span className="pv-b o sm">Change something</span></div>
      </div>
    </div>
  );
}

const MARK: Record<Station['mark'], string> = { ai: 'AI', if: 'If', set: '=', clock: '◷', delay: '⏱', call: '↘', app: '' };
function Track({ v }: { v: TrackView }) {
  return (
    <div className="gv-pad">
      <div className="gv-head"><Face id="keeper" size={28} /><div><b>{v.name}</b><span><Dot tone="ok" />{v.status}</span></div></div>
      {v.today && <div className="gv-today">{v.today.map(([k, n]) => <div key={k}><span>{k}</span><b className={k === 'Did not work' && n !== '0' ? 'bad' : ''}>{n}</b></div>)}</div>}
      {v.sample && <div className="gv-sample"><p>Real, from your account</p><b>{v.sample.title}</b>{v.sample.sub && <span>{v.sample.sub}</span>}</div>}
      <ol className="gv-track">
        {v.stations.map((s, i) => (
          <li key={i}>
            <div className="gv-st">
              {s.mark === 'app' && s.app ? <span className="gv-st-i"><Logo app={s.app} size={18} /></span> : <span className={`gv-st-i m-${s.mark}`}>{MARK[s.mark]}</span>}
              <div>
                <p className="gv-st-t"><span>{s.say}</span>{s.did ? <em className={`did ${s.did === 'Ran' ? 'ok' : s.did === 'Did not work' ? 'bad' : s.did === 'Held, not sent' ? 'warn' : 'mute'}`}>{s.did}</em> : s.asks ? <em className="did warn">Asks you first</em> : null}</p>
                {s.values && <p className="gv-vals">{s.values.map(([k, x]) => <span key={k}><i>{k}:</i> {x}</span>)}</p>}
              </div>
            </div>
            {i < v.stations.length - 1 && <div className="gv-line">{s.passes?.map(p => <span key={p}>{p}</span>)}</div>}
          </li>
        ))}
      </ol>
      {v.tested && <p className="gv-muted">{v.tested}</p>}
    </div>
  );
}

export function Need({ v }: { v: NeedView }) {
  return (
    <article className="pv-need gv-need">
      <header>
        <Face id={v.face} size={26} />
        <div>
          <b>{v.who}</b> <span className="mute">· {v.from} · {v.when}</span>
          {v.label && <p className="gv-label">{v.app && <Logo app={v.app} size={14} />}{v.label}</p>}
          <p className="pv-need-t">{v.title}</p>
        </div>
        <span className="pv-wait"><i />Waiting</span>
      </header>
      {v.mail && (
        <>
          <dl className="pv-mail">
            <div><dt>To</dt><dd>{v.mail.to}</dd></div>
            <div><dt>Subject</dt><dd>{v.mail.subject}</dd></div>
          </dl>
          <div className="pv-body">{v.mail.body.map((l, i) => <p key={i}>{l}</p>)}</div>
        </>
      )}
      {v.facts && <dl className="gv-facts gv-nf">{v.facts.map(([k, x]) => <span key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{x}</dd></span>)}</dl>}
      {v.suggests && <p className="gv-suggest">Captain suggests: {v.suggests}</p>}
      <footer>{v.choices.map((c, i) => <span key={c} className={i ? 'pv-b o' : 'pv-b'}>{c}</span>)}</footer>
    </article>
  );
}

function Agent({ v }: { v: AgentView }) {
  return (
    <div className="gv-agent">
      <aside className="gv-rail">{['Overview', 'Work', 'Setup', 'Memory', 'Chat'].map((r, i) => <span key={r} className={i ? '' : 'on'}>{r}</span>)}</aside>
      <div className="gv-pad">
        <div className="gv-head">
          <Face id={v.face} size={30} />
          <div><b>{v.name}</b><span><Dot tone="ok" />{v.status}</span></div>
          <span className="gv-acts"><span className="pv-b o sm">Run now</span><span className="pv-b o sm">Pause</span></span>
        </div>
        {v.need && <><p className="pv-sub">Waits on you <span className="pv-wait"><i />1 waiting</span></p><Need v={v.need} /></>}
        <p className="pv-sub">Latest work</p>
        <article className="gv-item">
          <header><Face id={v.face} size={22} /><div><b>{v.latest.title}</b><span>{v.latest.when}</span></div><em><Dot tone={toneOf(v.latest.state)} />{v.latest.state}</em></header>
          <p>{v.latest.summary}</p>
          {v.latest.body && <ul>{v.latest.body.map(b => <li key={b}>{b}</li>)}</ul>}
        </article>
        <p className="pv-sub">Recent runs</p>
        <ul className="gv-runs">{v.runs.map(r => <li key={r.title + r.when}><span>{r.title}</span><span className="mute">{r.when}</span><em><Dot tone={toneOf(r.state)} />{r.state}</em></li>)}</ul>
        {v.setup && <><p className="pv-sub">Setup</p><dl className="gv-facts">{v.setup.map(([k, x]) => <span key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{x}</dd></span>)}</dl></>}
      </div>
    </div>
  );
}

function Browser({ v }: { v: BrowserView }) {
  return (
    <div className="gv-pad">
      <div className="gv-head"><Face id="scout" size={28} /><div><b>{v.name}</b><span><Dot tone="ok" />Working now</span></div></div>
      <div className="gv-win">
        <div className="gv-win-bar"><span className="gv-live">Live</span><span className="gv-win-t">{v.page.title}</span><span className="pv-b o sm">Open full size</span></div>
        <div className="gv-win-marks">{v.sites.map(s => <span key={s}>{s}</span>)}</div>
        <div className="gv-win-page"><span className="gv-url">{v.page.url}</span><i /><i /><i className="s" /><i /><i className="s" /></div>
        <p className="gv-win-foot">Reading {v.reading} · {v.progress}</p>
      </div>
      <p className="pv-sub">Latest work</p>
      <article className="gv-item">
        <header><Face id="scout" size={22} /><div><b>{v.item.title}</b><span>Today 9:04, on schedule</span></div><em><Dot tone="ok" />Done</em></header>
        <p>{v.item.summary}</p>
        {v.item.rows && <table className="pv-table gv-t"><thead><tr><th>Site</th><th>Plan</th><th>Price</th></tr></thead><tbody>{v.item.rows.map(r => <tr key={r.join()}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table>}
        <p className="gv-visited"><b>Pages it visited</b>{v.item.pages.map(p => <span key={p}>{p}</span>)}</p>
      </article>
    </div>
  );
}

function Desk({ v }: { v: AppDeskView }) {
  return (
    <div className="gv-agent">
      <aside className="gv-rail">
        {v.rail.map(r => <span key={r} className={r === v.on ? 'on' : ''}>{r}</span>)}
        <hr />
        {['Crew', 'Review', 'Data', 'Setup', 'Memory'].map(r => <span key={r}>{r}</span>)}
      </aside>
      <div className="gv-pad">
        <div className="gv-head">
          <span className="pv-logo">{v.face.map(f => <Face key={f} id={f} size={24} />)}</span>
          <div><b>{v.name}</b><span><Dot tone="ok" />{v.status}</span></div>
          <span className="gv-acts"><span className="pv-b o sm">Change it</span></span>
        </div>
        <div className="gv-pills">{v.rail.map(r => <span key={r} className={r === v.on ? 'on' : ''}>{r}</span>)}</div>
        {v.numbers && <div className="pv-nums gv-nums">{v.numbers.map(([k, n, w]) => <div key={k}><span>{k}</span><b className={w ? 'warn' : ''}>{n}</b></div>)}</div>}
        {v.board && (
          <div className="pv-board gv-board">
            {v.board.map(c => (
              <div key={c.name} className="pv-col" style={{ background: c.tone }}>
                <p><i style={{ background: c.dot }} /><b>{c.name}</b> {c.cards.length}{c.total && <span>{c.total}</span>}</p>
                {c.cards.map(x => <div key={x.title} className="pv-card"><b>{x.title}</b>{x.lines.map(l => <span key={l}>{l}</span>)}</div>)}
              </div>
            ))}
          </div>
        )}
        {v.table && (
          <div className="gv-scroll"><table className="pv-table"><thead><tr>{v.table.head.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{v.table.rows.map(r => <tr key={r.join()}>{r.map((c, i) => <td key={i}>{i ? c : <b>{c}</b>}</td>)}</tr>)}</tbody></table></div>
        )}
        {v.crew && <div className="pv-crew"><Face id={v.crew.face} size={30} /><div><b>{v.crew.name}</b> <span className="mute">{v.crew.word}</span><p>{v.crew.does}</p></div></div>}
      </div>
    </div>
  );
}

function Sheet({ v }: { v: SheetView }) {
  return (
    <div className="gv-sheet">
      <div className="gv-scroll">
        <table>
          <thead><tr><th className="n" />{v.head.map((_, i) => <th key={i}>{String.fromCharCode(65 + i)}</th>)}</tr></thead>
          <tbody>
            <tr className="hd"><td className="n">1</td>{v.head.map(h => <td key={h}>{h}</td>)}</tr>
            {v.rows.map((r, i) => <tr key={i} className={v.fresh && i >= v.rows.length - v.fresh ? 'fresh' : ''}><td className="n">{i + 2}</td>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <p className="gv-tab"><span>{v.tab}</span></p>
    </div>
  );
}

function Slack({ v }: { v: SlackView }) {
  return (
    <div className="gv-slack">
      <p className="gv-ch"># {v.channel}</p>
      <div className="gv-msg">
        <span className="gv-av">{v.from.slice(0, 1)}</span>
        <div><p><b>{v.from}</b> <span className="mute">APP {v.time}</span></p>{v.lines.map((l, i) => <p key={i}>{l}</p>)}</div>
      </div>
    </div>
  );
}

const TITLE: Record<View['type'], (v: View) => string> = {
  plan: v => `50agents · Captain · ${(v as PlanView).name}`,
  track: v => `50agents · ${(v as TrackView).name}`,
  need: () => '50agents · Needs you',
  agent: v => `50agents · ${(v as AgentView).name}`,
  browser: v => `50agents · ${(v as BrowserView).name}`,
  app: v => `50agents · ${(v as AppDeskView).name}`,
  sheet: v => `Google Sheets · ${(v as SheetView).file}`,
  slack: v => `Slack · #${(v as SlackView).channel}`,
};

/** One product view in the panel frame, with what it shows said in words for screen readers and crawlers. */
export function ProductView({ view, caption }: { view: View; caption: string }) {
  return (
    <figure className="gv">
      <div className={`pv gv-frame gv-${view.type}`} role="img" aria-label={caption}>
        <Bar title={TITLE[view.type](view)} />
        {view.type === 'plan' && <Plan v={view} />}
        {view.type === 'track' && <Track v={view} />}
        {view.type === 'need' && <div className="gv-pad gv-wash"><Need v={view} /></div>}
        {view.type === 'agent' && <Agent v={view} />}
        {view.type === 'browser' && <Browser v={view} />}
        {view.type === 'app' && <Desk v={view} />}
        {view.type === 'sheet' && <Sheet v={view} />}
        {view.type === 'slack' && <Slack v={view} />}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
