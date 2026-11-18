// One product view per kind, drawn in HTML from the 50agents app's own screens and labels (D252), with example data.
// AI agent: the agent page (agents/CLAUDE.md: Overview with Waits on you, Latest work, How it works; Run now, Pause).
// Automation: the track (automations/CLAUDE.md: a card per start and step, data as chips, Today in numbers).
// Browser agent: the live window (browser/CLAUDE.md: Live, the page, "Reading", pages so far, sites as bookmarks; Pages it visited).
// App: the leads recipe (apps/recipes.ts: Overview numbers, Pipeline board by Stage with totals, the crew Closer and Scout).
import { AppLogo, Face } from '../parts';
import { ICONS } from '@/content/hubs/apps-icons';
import type { Kind } from '../types';

function Bar({ title }: { title: string }) {
  return <div className="pv-bar"><i /><i /><i /><span>{title}</span><em>Example data</em></div>;
}
function Rail({ items, on }: { items: string[]; on: string }) {
  return (
    <aside className="pv-rail hv-rail">
      {items.map((i, n) => (i === '-' ? <hr key={n} /> : <span key={i} className={i === on ? 'on' : undefined}>{i}</span>))}
    </aside>
  );
}

function AgentView() {
  return (
    <div className="pv" role="img" aria-label="An AI agent's page in the 50agents app: a follow-up email waiting for approval, its latest work and how it works. Example data.">
      <Bar title="50agents · Follow up quiet deals" />
      <div className="pv-app hv-app">
        <Rail items={['Overview', 'Work', 'Setup', 'Memory', 'Chat']} on="Overview" />
        <div className="pv-main">
          <div className="pv-head">
            <Face id="writer" size={34} />
            <div><b>Follow up quiet deals</b><span><i className="ok" /> Live · next run tomorrow at 9:00</span></div>
            <div className="pv-acts"><span className="pv-b o sm">Pause</span><span className="pv-b sm">Run now</span></div>
          </div>
          <p className="pv-sub">Waits on you <span className="pv-wait"><i />1</span></p>
          <article className="pv-need" aria-label="A follow-up waiting for approval">
            <header>
              <Face id="writer" size={26} />
              <div><b>Follow up quiet deals</b> <span className="mute">· 9:02</span><p className="pv-need-t">Email Dana at Brightline Physio</p></div>
            </header>
            <dl className="pv-mail">
              <div><dt>To</dt><dd>dana@brightline.example</dd></div>
              <div><dt>Subject</dt><dd>Re: Clinic booking setup</dd></div>
            </dl>
            <div className="pv-body"><p>Hi Dana, picking this up from last week. Would Thursday suit for a 20-minute call to go through the setup and price?</p></div>
            <footer><span className="pv-b">Approve and send</span><span className="pv-b o">Change</span><span className="pv-b o">Decline</span></footer>
          </article>
          <p className="pv-sub">Latest work</p>
          <div className="hv-work">
            <b>3 deals quiet for 5 days or more</b>
            <p>Brightline Physio, Oakridge Builders and Lumen Dental had no reply since 13 Nov. I drafted a follow-up for each; they wait for your OK. Two deals I left alone: their last email was from you yesterday.</p>
          </div>
          <p className="pv-sub">How it works</p>
          <dl className="hv-facts">
            <div><dt>Runs</dt><dd>Weekdays at 9:00</dd></div>
            <div><dt>Apps</dt><dd><span className="hv-apps"><AppLogo app="hubspot" icon={ICONS.HubSpot} size={16} /> HubSpot <AppLogo app="gmail" icon={ICONS.Gmail} size={16} /> Gmail</span></dd></div>
            <div><dt>Does alone</dt><dd>Reads deals and email</dd></div>
            <div><dt>Asks first</dt><dd>Sending any email</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function AutomationView() {
  return (
    <div className="pv" role="img" aria-label="An automation's track in the 50agents app: a new Stripe payment starts it, and a row is added to Google Sheets with the customer, amount and date. Example data.">
      <Bar title="50agents · Log every payment" />
      <div className="pv-app hv-app">
        <Rail items={['Overview', 'Runs', 'Steps', 'Setup']} on="Overview" />
        <div className="pv-main">
          <div className="pv-head">
            <Face id="keeper" size={34} />
            <div><b>Log every payment</b><span><i className="ok" /> Live · starts on a new payment in Stripe</span></div>
            <div className="pv-acts"><span className="pv-b o sm">Pause</span><span className="pv-b sm">Run now</span></div>
          </div>
          <p className="pv-sub">Today</p>
          <div className="pv-nums hv-nums4">
            <div><span>Runs</span><b>7</b></div>
            <div><span>Did something</span><b>7</b></div>
            <div><span>Did not work</span><b>0</b></div>
          </div>
          <p className="pv-sub">How it works</p>
          <ol className="hv-track">
            <li>
              <div className="hv-st"><AppLogo app="stripe" icon={ICONS.Stripe} size={28} /><div><em>Starts</em><b>New payment</b><span>Stripe</span></div><i>7 today</i></div>
              <p className="hv-chips"><span>customer</span><span>email</span><span>amount</span><span>currency</span><span>created</span></p>
            </li>
            <li>
              <div className="hv-st"><AppLogo app="googlesheets" icon={ICONS['Google Sheets']} size={28} /><div><em>Step 1</em><b>Add a row</b><span>Google Sheets · Payments 2026 · Sheet1</span></div><i>7 today</i></div>
              <p className="hv-chips"><span>Customer = customer</span><span>Amount = $240.00</span><span>Date = 19 Nov 2026</span></p>
            </li>
          </ol>
          <p className="hv-own"><b>On its own</b> Adds a row to your sheet (in your own tools) · <b>Asks you first</b> Nothing</p>
        </div>
      </div>
    </div>
  );
}

function BrowserView() {
  return (
    <div className="pv" role="img" aria-label="A browser agent at work in the 50agents app: its live browser reading a competitor's pricing page, with its sites as bookmarks, and the pages it visited. Example data.">
      <Bar title="50agents · Watch competitor prices" />
      <div className="pv-main hv-solo">
        <div className="pv-head">
          <Face id="scout" size={34} />
          <div><b>Watch competitor prices</b><span><i className="ok" /> Working now · started 9:00</span></div>
          <div className="pv-acts"><span className="pv-b o sm">Stop</span></div>
        </div>
        <div className="hv-win">
          <div className="hv-win-top">
            <span className="hv-live"><i />Live</span>
            <span className="hv-url">Pricing · Rival Two</span>
            <span className="pv-b o sm">Open full size</span>
          </div>
          <div className="hv-marks"><span>rival-one.example/pricing</span><span className="on">rival-two.example/pricing</span><span>rival-three.example/pricing</span></div>
          <div className="hv-page" aria-hidden="true">
            <p className="hv-page-h">Simple pricing</p>
            <div className="hv-tiers">
              <div><b>Starter</b><span>$19/mo</span></div>
              <div className="hv-chg"><b>Team</b><span>$59/mo</span><em>was $49</em></div>
              <div><b>Business</b><span>$129/mo</span></div>
            </div>
          </div>
          <p className="hv-reading">Reading rival-two.example/pricing · 2 pages so far · 0:41</p>
        </div>
        <p className="pv-sub">Latest work</p>
        <div className="hv-work">
          <b>1 price changed: Rival Two&rsquo;s Team plan</b>
          <p>Team went from $49 to $59 a month since yesterday&rsquo;s check. Starter and Business are unchanged, and the other two sites show the same prices as yesterday.</p>
          <p className="hv-pages"><b>Pages it visited</b> rival-one.example/pricing · rival-two.example/pricing · rival-three.example/pricing</p>
        </div>
      </div>
    </div>
  );
}

const STAGES: { name: string; dot: string; tone: string; total: string; cards: [string, string, string, string][] }[] = [
  { name: 'New', dot: '#3355CC', tone: '#EEF3FF', total: '$7,400', cards: [['Maya Chen', 'Harbor Yoga', '$2,400', 'Nov 21'], ['Leo Park', 'Pinecone Coffee', '$5,000', 'Nov 20']] },
  { name: 'Contacted', dot: '#6C5CE7', tone: '#F1EEFF', total: '$12,900', cards: [['Sam Ortiz', 'Oakridge Builders', '$9,500', 'Today'], ['Priya Nair', 'Lumen Dental', '$3,400', 'Nov 22']] },
  { name: 'Replied', dot: '#B4410B', tone: '#FFF1EC', total: '$6,200', cards: [['Dana Reyes', 'Brightline Physio', '$6,200', 'Nov 24']] },
  { name: 'Won', dot: '#17703F', tone: '#EDF7F1', total: '$4,800', cards: [['Tom Fisher', 'Cobalt Fitness', '$4,800', '']] },
];

function AppView() {
  return (
    <div className="pv" role="img" aria-label="A leads app in the 50agents app: its Overview numbers, the Pipeline board by stage with totals, and its crew. Example data.">
      <Bar title="50agents · Leads" />
      <div className="pv-app hv-app">
        <Rail items={['Overview', 'Pipeline', 'Follow up', 'All leads', '-', 'Crew', 'Review', 'Data', 'Setup']} on="Pipeline" />
        <div className="pv-main">
          <div className="pv-head">
            <span className="pv-logo"><Face id="closer" size={30} /><Face id="scout" size={30} /></span>
            <div><b>Leads</b><span><i className="ok" /> Live · crew of 2</span></div>
            <div className="pv-acts"><span className="pv-b o sm">Change it</span><span className="pv-b sm">Add lead</span></div>
          </div>
          <div className="pv-nums hv-nums4">
            <div><span>New this week</span><b>4</b></div>
            <div><span>Follow up today</span><b className="warn">2</b></div>
            <div><span>Open deals</span><b>$26,500</b></div>
            <div><span>Won</span><b>1</b></div>
          </div>
          <p className="pv-sub">Pipeline</p>
          <div className="pv-board">
            {STAGES.map(s => (
              <div key={s.name} className="pv-col" style={{ background: s.tone }}>
                <p><i style={{ background: s.dot }} />{s.name}<span>{s.total}</span></p>
                {s.cards.map(c => (
                  <div key={c[0]} className="pv-card"><b>{c[0]}</b><span>{c[1]} · {c[2]}</span>{c[3] && <span className="mute">Next follow-up {c[3]}</span>}</div>
                ))}
              </div>
            ))}
          </div>
          <p className="pv-sub">The crew</p>
          <div className="hv-crew">
            <div><Face id="closer" size={28} /><p><b>Closer</b> · AI agent<span>Brings in new leads from your email · Notices replies · Follows up quiet leads (asks first)</span></p></div>
            <div><Face id="scout" size={28} /><p><b>Scout</b> · browser agent<span>Looks up each new lead&rsquo;s company</span></p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KindView({ kind }: { kind: Kind }) {
  if (kind === 'ai') return <AgentView />;
  if (kind === 'auto') return <AutomationView />;
  if (kind === 'browser') return <BrowserView />;
  return <AppView />;
}
