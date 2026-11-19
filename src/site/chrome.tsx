// The header and footer of every search page. The header is the homepage's: the wordmark and one button.
// The footer links the families, so every page is a click or two from every other (pages-brief D2, internal links).
import { Face, Wordmark } from './parts';
import { HeaderCta } from './header-cta';

export function Header() {
  return (
    <header className="hd">
      <div className="hd-in">
        <Wordmark face="keeper" size={30} />
        <HeaderCta />
      </div>
    </header>
  );
}

// The homepage's footer, exactly (landing/index.html): the same columns, links and crowd.
const COLS: { head: string; links: { label: string; href: string }[] }[] = [
  { head: 'Product', links: [{ label: 'AI Meeting Recorder', href: '/ai-note-taker' }, { label: 'Work Management', href: '/work-management' }, { label: 'Agent Templates', href: '/templates' }, { label: 'AI Agents', href: '/ai-agents' }, { label: 'Pricing', href: '/pricing' }] },
  { head: 'Resources', links: [{ label: 'MCP for AI agents', href: '/mcp' }, { label: 'Agent guide (llms.txt)', href: '/llms.txt' }, { label: 'Chrome Extension', href: 'https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio' }, { label: 'Help Center', href: 'https://50agents.com/help' }, { label: 'Getting Started Guide', href: 'https://50agents.com/help/meeting-agent' }] },
  { head: 'Company', links: [{ label: 'Privacy Policy', href: 'https://50agents.com/help/privacy-policy' }, { label: 'Careers', href: 'https://walkover.in/careers' }, { label: 'viaSocket', href: 'https://viasocket.com' }, { label: 'MSG91', href: 'https://msg91.com' }] },
];
const CROWD = ['keeper', 'writer', 'scout', 'chaser', 'booker', 'closer', 'ledger', 'sorter', 'sprout', 'pilot', 'rosa', 'sunny'];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <Wordmark face="rosa" size={28} />
          <p className="foot-co"><a href="https://walkover.in" target="_blank" rel="noopener">A product by <b>Walkover</b></a></p>
          <p className="foot-copy">© 2026 50agents. All rights reserved.</p>
        </div>
        <nav className="foot-cols" aria-label="Footer">
          {COLS.map(c => (
            <div key={c.head}>
              <b>{c.head}</b>
              {c.links.map(l => <a key={l.label} href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{l.label}</a>)}
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
