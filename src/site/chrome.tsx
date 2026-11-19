// The header and footer of every page (D257, Search's launch spec): real links in the server HTML so every page passes
// authority to the families. Menus are CSS only (hover and keyboard focus), so their links are in the HTML when closed.
// The homepage (static, public/landing) carries the same header and footer, built from agentic-apps/landing.
import { Face, KINDS, Wordmark, KindFace } from './parts';
import { HeaderCta } from './header-cta';
import type { Kind } from './types';

const BUILD: { kind: Kind; href: string; line: string }[] = [
  { kind: 'ai', href: '/ai-agents', line: 'Decides what to do on each run' },
  { kind: 'auto', href: '/automations', line: 'The same steps, every time' },
  { kind: 'browser', href: '/browser-agents', line: 'Works websites with no app' },
  { kind: 'app', href: '/apps', line: 'Your own lists and screens' },
];
const COMPARE = [
  { label: 'Zapier alternatives', href: '/compare/zapier-alternatives' },
  { label: 'n8n alternatives', href: '/compare/n8n-alternatives' },
  { label: 'Make alternatives', href: '/compare/make-alternatives' },
  { label: 'Lindy alternatives', href: '/compare/lindy-alternatives' },
  { label: '50agents vs Zapier', href: '/compare/50agents-vs-zapier' },
];
const KIND_NAME: Record<Kind, string> = { ai: 'AI agents', auto: 'Automations', browser: 'Browser agents', app: 'Apps' };

function Caret() {
  return <svg className="nv-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Header() {
  return (
    <header className="hd">
      <div className="hd-in">
        <Wordmark face="writer" size={24} />
        <input type="checkbox" id="nv-open" className="nv-toggle" aria-hidden="true" tabIndex={-1} />
        <nav className="nv" aria-label="Main">
          <a className="nv-a" href="/use-cases">Use cases</a>
          <div className="nv-menu">
            <button type="button" className="nv-a nv-btn" aria-haspopup="true">Build <Caret /></button>
            <div className="nv-panel nv-build">
              {BUILD.map(b => (
                <a key={b.href} href={b.href} className="nv-kind">
                  <span className="nv-face" style={{ background: KINDS[b.kind].tint }}><KindFace kind={b.kind} size={24} /></span>
                  <span><b>{KIND_NAME[b.kind]}</b><span>{b.line}</span></span>
                </a>
              ))}
            </div>
          </div>
          <a className="nv-a" href="/integrations">Integrations</a>
          <a className="nv-a" href="/pricing">Pricing</a>
        </nav>
        <div className="hd-end">
          <HeaderCta />
          <label htmlFor="nv-open" className="nv-burger" aria-label="Menu"><i /><i /></label>
        </div>
      </div>
    </header>
  );
}

// The footer: five columns of real links (Search's launch spec, section 3), the brand line and the crowd.
const COLS: { head: string; links: { label: string; href: string; out?: boolean }[] }[] = [
  { head: 'Build', links: [{ label: 'AI agents', href: '/ai-agents' }, { label: 'Automations', href: '/automations' }, { label: 'Browser agents', href: '/browser-agents' }, { label: 'Apps', href: '/apps' }, { label: 'Use cases', href: '/use-cases' }] },
  { head: 'Popular integrations', links: [{ label: 'Gmail', href: '/integrations/gmail' }, { label: 'Google Sheets', href: '/integrations/google-sheets' }, { label: 'Slack', href: '/integrations/slack' }, { label: 'HubSpot', href: '/integrations/hubspot' }, { label: 'Shopify', href: '/integrations/shopify' }, { label: 'Stripe', href: '/integrations/stripe' }, { label: 'All integrations', href: '/integrations' }] },
  { head: 'Compare', links: COMPARE },
  { head: 'Guides', links: [{ label: 'Build an AI agent without code', href: '/guides/how-to-build-an-ai-agent-without-code' }, { label: 'Build an app from Google Sheets', href: '/guides/how-to-build-an-app-from-google-sheets' }, { label: 'Automate invoice reminders', href: '/guides/how-to-automate-invoice-reminders' }, { label: 'All guides', href: '/guides' }] },
  { head: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Pricing', href: '/pricing' }, { label: 'Contact', href: '/contact' }, { label: 'Support', href: '/support' }, { label: 'Privacy policy', href: 'https://50agents.com/help/privacy-policy', out: true }, { label: 'viaSocket', href: 'https://viasocket.com', out: true }, { label: 'Careers at Walkover', href: 'https://walkover.in/careers', out: true }] },
];
const CROWD = ['keeper', 'writer', 'scout', 'chaser', 'booker', 'closer', 'ledger', 'sorter', 'sprout', 'pilot', 'rosa', 'sunny'];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <Wordmark face="rosa" size={28} />
          <p className="foot-co"><a href="https://walkover.in" target="_blank" rel="noopener">A product by <b>Walkover</b></a></p>
          <p className="foot-copy">© 2026 50agents</p>
        </div>
        <nav className="foot-cols" aria-label="Footer">
          {COLS.map(c => (
            <div key={c.head}>
              <b>{c.head}</b>
              {c.links.map(l => <a key={l.label} href={l.href} {...('out' in l && l.out ? { target: '_blank', rel: 'noopener' } : {})}>{l.label}</a>)}
            </div>
          ))}
        </nav>
      </div>
      <div className="crowd" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => CROWD[(i * 5) % CROWD.length]).map((id, i) => <span key={i}><Face id={id} size={[30, 34, 28, 32, 30, 36, 28, 32, 30, 34][i % 10]} /></span>)}
      </div>
    </footer>
  );
}
