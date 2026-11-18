// The invoices desk as the 50agents app draws it (captured from the app on 19 Nov 2026: the recipe "invoices",
// its Overview numbers, the To collect board, the Late table, the Collector and a Needs you card), with example data.
// Drawn in HTML so it is crisp, light and readable by crawlers; every label is the app's own (D252).
import { Face } from '../parts';

const fmt = (n: number) => '$' + n.toLocaleString('en-US');
type Inv = { no: string; client: string; amount: number; due: string; late?: number; status: 'Draft' | 'Sent' | 'Reminded' | 'Paid' };
const LATE: Inv[] = [
  { no: 'INV-1041', client: 'Northwind Studio', amount: 2400, due: 'Oct 22', late: 28, status: 'Reminded' },
  { no: 'INV-1046', client: 'Maple & Co. Bakery', amount: 860, due: 'Oct 31', late: 19, status: 'Sent' },
  { no: 'INV-1049', client: 'Brightline Physio', amount: 1250, due: 'Nov 7', late: 12, status: 'Sent' },
  { no: 'INV-1052', client: 'Oakridge Builders', amount: 4700, due: 'Nov 14', late: 5, status: 'Sent' },
];
const BOARD: { name: Inv['status']; tone: string; dot: string; cards: Inv[] }[] = [
  { name: 'Draft', tone: '#EEF3FF', dot: '#3355CC', cards: [{ no: 'INV-1062', client: 'Riverside Clinic', amount: 2100, due: 'Dec 17', status: 'Draft' }] },
  { name: 'Sent', tone: '#F1EEFF', dot: '#6C5CE7', cards: [{ no: 'INV-1060', client: 'Pinecone Coffee', amount: 320, due: 'Dec 10', status: 'Sent' }, { no: 'INV-1058', client: 'Harbor Yoga', amount: 540, due: 'Dec 3', status: 'Sent' }, { no: 'INV-1055', client: 'Lumen Dental', amount: 980, due: 'Nov 19', status: 'Sent' }] },
  { name: 'Reminded', tone: '#FFF1EC', dot: '#B4410B', cards: [{ no: 'INV-1041', client: 'Northwind Studio', amount: 2400, due: 'Oct 22', status: 'Reminded' }] },
  { name: 'Paid', tone: '#EDF7F1', dot: '#17703F', cards: [{ no: 'INV-1044', client: 'Cobalt Fitness', amount: 1150, due: 'Oct 28', status: 'Paid' }, { no: 'INV-1038', client: 'Fieldnote Media', amount: 1800, due: 'Oct 10', status: 'Paid' }] },
];
const TOTAL: Record<string, number> = { Draft: 2100, Sent: 8650, Reminded: 2400, Paid: 2950 };
const COUNT: Record<string, number> = { Draft: 1, Sent: 6, Reminded: 1, Paid: 2 };

function Pill({ s }: { s: Inv['status'] }) {
  return <span className={`pill pill-${s.toLowerCase()}`}>{s}</span>;
}

function Numbers() {
  return (
    <div className="pv-nums">
      <div><span>Still to collect</span><b>{fmt(11050)}</b></div>
      <div><span>Late</span><b className="warn">{fmt(9210)}</b></div>
      <div><span>Paid this month</span><b>{fmt(2950)}</b></div>
    </div>
  );
}

function Reminder({ compact = false }: { compact?: boolean }) {
  return (
    <article className="pv-need" aria-label="A reminder waiting for approval">
      <header>
        <Face id="closer" size={26} />
        <div>
          <b>Collector</b> <span className="mute">· Invoices desk · 2 min ago</span>
          <p className="pv-need-t">Email Maple &amp; Co. Bakery</p>
        </div>
        </header>
      <dl className="pv-mail">
        <div><dt>To</dt><dd>accounts@maple.example</dd></div>
        <div><dt>Subject</dt><dd>Invoice INV-1046 for $860, due 31 Oct</dd></div>
      </dl>
      <div className="pv-body">
        <p>Hi there,</p>
        <p>A quick reminder that invoice INV-1046 for $860 was due on 31 October and is still open. Could you let me know when we can expect payment?</p>
        {!compact && <p>If it is already on its way, thank you, and please ignore this.</p>}
        <p>Best,<br />Sam</p>
      </div>
      <footer>
        <span className="pv-b">Approve and send</span>
        <span className="pv-b o">Change</span>
        <span className="pv-b o">Decline</span>
      </footer>
    </article>
  );
}

export function InvoicesDesk() {
  return (
    <div className="pv" role="img" aria-label="The Invoices desk in the 50agents app: what is still to collect, a reminder waiting for approval, the To collect board and late invoices oldest first. Example data.">
      <div className="pv-bar"><i /><i /><i /><span>50agents · Invoices desk</span><em>Example data</em></div>
      <div className="pv-app">
        {/* CSS-only tabs: every view is in the HTML, one shows at a time; the rail items are the app's own */}
        <input type="radio" name="pv" id="pv-o" defaultChecked aria-label="Overview" />
        <input type="radio" name="pv" id="pv-c" aria-label="To collect" />
        <input type="radio" name="pv" id="pv-l" aria-label="Late" />
        <aside className="pv-rail">
          <label htmlFor="pv-o">Overview</label>
          <label htmlFor="pv-c">To collect</label>
          <label htmlFor="pv-l">Late</label>
          <span>All invoices</span>
          <hr />
          <span>Crew <em>1</em></span>
          <span>Review</span>
          <span>Data <em>10</em></span>
          <span>Setup</span>
          <span>Memory</span>
        </aside>
        <div className="pv-main">
          <div className="pv-head">
            <span className="pv-logo"><Face id="closer" size={22} /><Face id="keeper" size={22} /></span>
            <div><b>Invoices desk</b><span><i className="ok" />Live · 10 invoices</span></div>
            <span className="pv-acts"><span className="pv-b o sm">Change it</span><span className="pv-b sm">+ Add invoice</span></span>
          </div>
          <div className="pv-pills" aria-hidden="true">
            <label htmlFor="pv-o">Overview</label><label htmlFor="pv-c">To collect</label><label htmlFor="pv-l">Late</label>
          </div>

          <section className="pv-view pv-o">
            <Numbers />
            <p className="pv-sub">Collector asks you <span className="pv-wait"><i />3 waiting</span></p>
            <Reminder />
            <div className="pv-crew">
              <Face id="closer" size={30} />
              <div><b>Collector</b> <span className="mute">AI agent</span><p>Reminds clients of late invoices. When a Sent invoice is 1 day past due, it asks you before emailing.</p></div>
            </div>
          </section>

          <section className="pv-view pv-c">
            <div className="pv-board">
              {BOARD.map(c => (
                <div key={c.name} className="pv-col" style={{ background: c.tone }}>
                  <p><i style={{ background: c.dot }} /><b>{c.name}</b> {COUNT[c.name]}<span>{fmt(TOTAL[c.name])}</span></p>
                  {c.cards.slice(0, 3).map(x => (
                    <div key={x.no} className="pv-card"><b>{x.no}</b><span>{x.client}</span><span>{fmt(x.amount)}</span><span className="mute">Due: {x.due}</span></div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="pv-view pv-l">
            <div className="pv-search"><span>Search invoices</span><em>4 of 10</em></div>
            <table className="pv-table">
              <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Due ↑</th><th>Status</th></tr></thead>
              <tbody>
                {LATE.map(r => (
                  <tr key={r.no}><td><b>{r.no}</b></td><td>{r.client}</td><td>{fmt(r.amount)}</td><td>{r.due}<span className="late">{r.late} days late</span></td><td><Pill s={r.status} /></td></tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}

// Captain's side of the build, as the chat shows it: the ask, one of its questions, and the plan card with Build it.
export function CaptainBuild({ ask, q }: { ask: string; q: { q: string; choices: string[]; picked: string } }) {
  return (
    <div className="cb" aria-label={`Captain building from "${ask}"`}>
      <div className="cb-hd"><Face id="lead" size={24} /><b>Captain</b><span className="mute">· building an app</span></div>
      <div className="cb-chat">
        <p className="cb-me">{ask}</p>
        <div className="cb-q">
          <p>{q.q}</p>
          <div>{q.choices.map(c => <span key={c} className={c === q.picked ? 'on' : ''}>{c}</span>)}</div>
        </div>
        <div className="cb-plan">
          <div className="cb-plan-h"><span className="pv-logo"><Face id="closer" size={20} /><Face id="keeper" size={20} /></span><div><b>Invoices desk</b><span>What is owed to you, the late ones first</span></div></div>
          <ul>
            <li><b>Views</b><span>To collect · Late · All invoices</span></li>
            <li><b>Numbers</b><span>Still to collect · Late · Paid this month</span></li>
            <li><b>Crew</b><span><Face id="closer" size={16} /> Collector, an AI agent: reminds clients of late invoices, asks before sending any email</span></li>
          </ul>
          <div className="cb-acts"><span className="pv-b sm">Build it</span><span className="pv-b o sm">Change something</span></div>
        </div>
      </div>
    </div>
  );
}

export { Reminder };
