// A guide's cover, v6 (D258, Jii's round 4: "too much blob usage"). One small, calm visual element built from the guide's
// own data, drawn in ink and hairlines with one soft accent (the kind's tint): a mini flow of the apps it connects, a mini
// table from its first table, a chat bubble with its ask, an approval card, an inbox row, a browser frame, a chooser fork
// or its first steps. No crowds of faces: at most a few guides carry one small blob, Captain (the yellow lead), where
// Captain is the point. Server HTML, sized by container units so a card, the featured guide and a phone all read the same.
import { Face, KINDS } from '../parts';
import { findUseCase } from './parts';
import { plain } from './rich';
import type { GuidePage } from './types';

type Scene = 'chat' | 'approve' | 'flow' | 'table' | 'list' | 'inbox' | 'browser' | 'fork';

// The guide picks its scene from its category; a few pick another one that shows their own data better.
const PICK: Record<string, Scene> = {
  'ai-agent-vs-automation-which-one-you-need': 'fork',
  'how-to-make-an-ai-agent-ask-before-it-acts': 'approve',
  'how-to-draft-email-replies-with-ai-and-still-check-them': 'approve',
  'how-to-give-an-ai-agent-access-to-your-apps-safely': 'list',
  'how-to-automate-invoice-reminders': 'inbox',
  'how-to-automate-lead-follow-up-from-gmail': 'list',
  'how-to-build-a-customer-requests-desk-from-your-inbox': 'inbox',
  'internal-tools-without-code-what-to-build-first': 'fork',
  'how-to-choose-an-ai-agent-builder': 'list',
  'how-much-automation-costs-credits-tasks-and-runs-compared': 'table',
  'zapier-vs-make-vs-n8n-for-a-small-team': 'table',
};
// Where Captain is the point: the only covers with a blob.
const CAPTAIN = new Set(['how-to-build-an-ai-agent-without-code', 'how-to-write-instructions-for-an-ai-agent', 'how-to-make-an-ai-agent-ask-before-it-acts']);

const APP: Record<string, string> = { gmail: 'Gmail', 'google-sheets': 'Google Sheets', hubspot: 'HubSpot', slack: 'Slack', stripe: 'Stripe', shopify: 'Shopify', 'google-calendar': 'Google Calendar' };
const appName = (s: string) => APP[s] ?? s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const firstTable = (g: GuidePage) => g.sections.flatMap(s => s.body).find((b): b is { table: { head: string[]; rows: string[][] } } => 'table' in b)?.table;

function sceneOf(g: GuidePage): Scene {
  if (PICK[g.slug]) return PICK[g.slug];
  const apps = findUseCase(g.captain.useCase)?.build.apps ?? [];
  switch (g.group) {
    case 'AI agents': return 'chat';
    case 'Automations': return apps.length > 1 ? 'flow' : firstTable(g) ? 'table' : 'list';
    case 'Browser agents': return 'browser';
    case 'Apps': return firstTable(g) ? 'table' : 'list';
    case 'Email and calendar': return apps.length > 1 ? 'flow' : 'inbox';
    case 'Choosing tools': return g.chooser ? 'fork' : firstTable(g) ? 'table' : 'list';
  }
}

const Tick = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 10.4l3 3L14.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Bars = ({ n = 3 }: { n?: number }) => <span className="cv-bars">{Array.from({ length: n }, (_, i) => <i key={i} />)}</span>;
const Captain = () => <span className="cv-cap"><Face id="lead" size={40} /></span>;

function Chat({ g }: { g: GuidePage }) {
  const ask = findUseCase(g.captain.useCase)?.ask ?? g.captain.ask ?? g.h1;
  return (
    <div className="cv-chat">
      <p className="cv-me"><span>{ask}</span></p>
      <div className="cv-ai">{CAPTAIN.has(g.slug) && <Captain />}<span className="cv-reply"><Bars /></span></div>
    </div>
  );
}

function Approve({ g }: { g: GuidePage }) {
  const a = findUseCase(g.captain.useCase)?.approval;
  return (
    <div className="cv-card cv-approve">
      <span className="cv-k">Waiting for your OK</span>
      <b>{a?.title ?? 'Send the draft reply'}</b>
      {a?.lines[0] ? <p>{a.lines[0]}</p> : <Bars n={2} />}
      <span className="cv-btns"><span className="on">{a?.button ?? 'Approve'}</span><span>Edit</span></span>
      {CAPTAIN.has(g.slug) && <Captain />}
    </div>
  );
}

function Flow({ g }: { g: GuidePage }) {
  const uc = findUseCase(g.captain.useCase);
  const apps = (uc?.build.apps ?? []).slice(0, 3);
  return (
    <div className="cv-flow">
      {uc && <span className="cv-k">{uc.build.when}</span>}
      <ol>{apps.map((a, i) => <li key={a} className={i === apps.length - 1 ? 'on' : undefined}>{appName(a)}</li>)}</ol>
    </div>
  );
}

function Table({ g }: { g: GuidePage }) {
  const t = firstTable(g)!;
  const cols = Math.min(3, t.head.length);
  return (
    <div className="cv-card cv-table" style={{ ['--cols' as string]: cols }}>
      <div className="h">{t.head.slice(0, cols).map((h, i) => <span key={i}>{h}</span>)}</div>
      {t.rows.slice(0, 3).map((r, j) => <div key={j} className={j === 0 ? 'on' : undefined}>{r.slice(0, cols).map((c, i) => <span key={i}>{plain(c)}</span>)}</div>)}
    </div>
  );
}

function List({ g }: { g: GuidePage }) {
  return (
    <ol className="cv-card cv-list">
      {g.method.steps.slice(0, 3).map((s, i) => <li key={s.title} className={i === 0 ? 'on' : undefined}><span className="n">{i === 0 ? <Tick /> : i + 1}</span><span className="t">{s.title}</span></li>)}
    </ol>
  );
}

function Inbox({ g }: { g: GuidePage }) {
  const label = findUseCase(g.captain.useCase)?.build.name ?? 'Needs a reply';
  return (
    <div className="cv-card cv-inbox">
      {[0, 1, 2].map(i => (
        <div key={i} className={i === 1 ? 'on' : undefined}>
          <i className="dot" /><Bars n={2} />{i === 1 && <span className="cv-tag">{label}</span>}
        </div>
      ))}
    </div>
  );
}

function Browser({ g }: { g: GuidePage }) {
  const form = /form/.test(g.slug);
  return (
    <div className="cv-card cv-browser">
      <div className="bar"><i /><i /><i /><span /></div>
      {form ? (
        <div className="form">{[0, 1, 2].map(i => <span key={i} className={i === 1 ? 'on' : undefined}><b /><em /></span>)}</div>
      ) : (
        <div className="tiles">{[0, 1, 2].map(i => <span key={i} className={i === 1 ? 'on' : undefined}><b /><Bars n={2} /></span>)}</div>
      )}
      <svg className="ptr" viewBox="0 0 16 22" aria-hidden="true"><path d="M1 1v17l4.5-4.5 3.5 7 3-1.5-3.5-7H15z" /></svg>
    </div>
  );
}

function Fork({ g }: { g: GuidePage }) {
  const c = g.chooser!.root;
  const opts = c.options.slice(0, 3);
  return (
    <div className="cv-fork">
      <p className="q">{c.q}</p>
      <ul>{opts.map((o, i) => <li key={o.label} className={i === opts.length - 1 ? 'on' : undefined}>{i === opts.length - 1 && <Tick />}<span className="t">{o.label}</span></li>)}</ul>
    </div>
  );
}

const DRAW: Record<Scene, (p: { g: GuidePage }) => React.ReactNode> = { chat: Chat, approve: Approve, flow: Flow, table: Table, list: List, inbox: Inbox, browser: Browser, fork: Fork };

export function GuideCover({ g, size = 'card' }: { g: GuidePage; size?: 'card' | 'feature' }) {
  let s = sceneOf(g);
  if ((s === 'fork' && !g.chooser) || (s === 'table' && !firstTable(g))) s = 'list';
  const Draw = DRAW[s];
  return (
    <div className={`gcv gcv-${size} cv-${s}-s`} style={{ ['--k' as string]: KINDS[g.kind].tint }} aria-hidden="true">
      <div className="gcv-in"><Draw g={g} /></div>
    </div>
  );
}
