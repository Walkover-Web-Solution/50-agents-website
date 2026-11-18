// The header and footer of every search page. The header is the homepage's: the wordmark and one button.
// The footer links the families, so every page is a click or two from every other (pages-brief D2, internal links).
import { Face, MaybeLink, Wordmark } from './parts';
import SignupLink from '@/components/SignupLink';

export function Header() {
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <Wordmark face="keeper" />
        <SignupLink button="site-header" cta="site:header" className="btn sm">Get started</SignupLink>
      </div>
    </header>
  );
}

const COLS: { head: string; links: { label: string; href: string; out?: boolean }[] }[] = [
  { head: 'Build', links: [{ label: 'AI agents', href: '/ai-agents' }, { label: 'Automations', href: '/automations' }, { label: 'Browser agents', href: '/browser-agents' }, { label: 'Apps', href: '/apps' }] },
  { head: 'Explore', links: [{ label: 'Use cases', href: '/use-cases' }, { label: 'Integrations', href: '/integrations' }, { label: 'Compare', href: '/compare' }, { label: 'Guides', href: '/guides' }] },
  { head: 'Resources', links: [{ label: 'Help Center', href: 'https://50agents.com/help', out: true }, { label: 'MCP for AI agents', href: '/mcp', out: true }] },
  { head: 'Company', links: [{ label: 'Privacy Policy', href: 'https://50agents.com/help/privacy-policy', out: true }, { label: 'Careers', href: 'https://walkover.in/careers', out: true }, { label: 'viaSocket', href: 'https://viasocket.com', out: true }, { label: 'MSG91', href: 'https://msg91.com', out: true }] },
];

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-in">
        <div>
          <Wordmark face="rosa" size={26} />
          <p className="ft-co"><a href="https://walkover.in" target="_blank" rel="noopener">A product by <b>Walkover</b></a></p>
          <p className="ft-copy">© 2026 50agents. All rights reserved.</p>
        </div>
        <nav className="ft-cols" aria-label="Footer">
          {COLS.map(c => (
            <div key={c.head}>
              <b>{c.head}</b>
              {c.links.map(l => (l.out ? <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener">{l.label}</a> : <MaybeLink key={l.label} href={l.href}>{l.label}</MaybeLink>))}
            </div>
          ))}
        </nav>
      </div>
      <div className="crowd" aria-hidden="true">
        {['writer', 'keeper', 'sorter', 'scout', 'rosa', 'closer', 'ledger', 'sprout', 'booker', 'pilot', 'chaser'].map(id => <Face key={id} id={id} size={30} />)}
      </div>
    </footer>
  );
}
