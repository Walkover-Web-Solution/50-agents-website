import Logo from './Logo';

// The landing's footer (D152, D166): every old page, pricing included, is linked from here only.
const COLS = [
  { title: 'Product', links: [
    { label: 'AI Meeting Recorder', href: '/ai-note-taker' },
    { label: 'Work Management', href: '/work-management' },
    { label: 'Agent Templates', href: '/templates' },
    { label: 'AI Agents', href: '/ai-agents' },
    { label: 'Pricing', href: '/pricing' },
  ] },
  { title: 'Resources', links: [
    { label: 'Chrome Extension', href: 'https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio', out: true },
    { label: 'Help Center', href: 'https://50agents.com/help', out: true },
    { label: 'Getting Started Guide', href: 'https://50agents.com/help/meeting-agent', out: true },
  ] },
  { title: 'Company', links: [
    { label: 'Privacy Policy', href: 'https://50agents.com/help/privacy-policy', out: true },
    { label: 'Careers', href: 'https://walkover.in/careers', out: true },
    { label: 'viaSocket', href: 'https://viasocket.com', out: true },
    { label: 'MSG91', href: 'https://msg91.com', out: true },
  ] },
];

const Footer = () => (
  <footer className="w-full" style={{ borderTop: '1px solid var(--line)', marginTop: 96 }}>
    <div className="container grid gap-10 md:grid-cols-[1fr_2fr] py-16">
      <div className="flex flex-col gap-3">
        <a href="/" className="no-underline" aria-label="50agents home"><Logo size={30} /></a>
        <a href="https://walkover.in" target="_blank" rel="noopener" className="no-underline mt-2" style={{ fontSize: 14.5, color: 'var(--mute)' }}>A product by <b style={{ color: 'var(--ink)' }}>Walkover</b></a>
        <p style={{ fontSize: 14, color: 'var(--mute)', margin: 0 }}>© {new Date().getFullYear()} 50agents. All rights reserved.</p>
      </div>
      <nav className="grid grid-cols-2 sm:grid-cols-3 gap-8" aria-label="Footer">
        {COLS.map((c) => (
          <div key={c.title} className="flex flex-col gap-3">
            <b style={{ fontSize: 14, color: 'var(--ink)' }}>{c.title}</b>
            {c.links.map((l: any) => (
              <a key={l.label} href={l.href} {...(l.out ? { target: '_blank', rel: 'noopener' } : {})} className="no-underline hover:underline" style={{ fontSize: 14.5, color: 'var(--mute)' }}>{l.label}</a>
            ))}
          </div>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
