// The trust pages (pages-brief B11), round 3 (D255): /about, /contact and /support, hand-written, in the page system's
// rhythm (every section a .sec, no margins of their own). Facts: scripts/pages/product-facts.md, the homepage and the
// site's footer. No security claims, no customer counts. Channels: src/content/pages/support.ts, carried over from
// viasocket.com/support; a channel not confirmed for 50agents is a placeholder, drawn only in development.
import { KIND_CARDS, KIND_ORDER } from '@/content/hubs/kinds';
import { INDEX_ASK } from '@/content/pages/indexes';
import { CONTACT_EMAIL, LINKS, SUPPORT, type Channel } from '@/content/pages/support';
import { Crumbs, Cta, Face, KINDS, LIVE, MaybeLink, KindFace } from '../parts';
import { BASE, crumbsLd, Ld } from '../hubs/meta';
import '../css/usecase.css';
import '../css/hubs.css';
import '../css/pages.css';

// Placeholders show in development only, so Jii can review the structure; the live site never draws one.
const DEV = process.env.NODE_ENV === 'development';

const ext = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});

function Final({ page, h2 }: { page: string; h2: string }) {
  return (
    <section className="wrap sec">
      <div className="final">
        <h2>{h2}</h2>
        <p>One sentence to Captain. Free to start.</p>
        <Cta campaign="seo-page" page={page} place="final" ask={INDEX_ASK}>Ask Captain</Cta>
        <span className="peek l" aria-hidden="true"><Face id="writer" size={50} /><Face id="keeper" size={44} /></span>
        <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="scout" size={46} /></span>
      </div>
    </section>
  );
}

/** A channel as a link card; a placeholder (no confirmed address) as a dashed card in development, nothing live. */
function ChannelCard({ c }: { c: Channel }) {
  if (!c.href)
    return DEV ? (
      <div className="ch ch-ph" data-placeholder={c.id}>
        <span className="ch-tag">Placeholder for Jii</span>
        <b>{c.label}</b>
        <span>{c.line}</span>
        <span className="ch-was">viaSocket has: {c.was}</span>
      </div>
    ) : null;
  return (
    <a className="ch" href={c.href} {...ext(c.href)}>
      <b>{c.label}</b>
      <span>{c.line}</span>
      <span className="ch-go">{c.cta}<i aria-hidden="true">{c.href.startsWith('http') ? ' ↗' : ' →'}</i></span>
    </a>
  );
}

function Channels({ list }: { list: Channel[] }) {
  const shown = list.filter(c => c.href || DEV);
  return <div className="chs">{shown.map(c => <ChannelCard key={c.id} c={c} />)}</div>;
}

// ---------------------------------------------------------------------------------------------------------------- about

const HOW = [
  { n: '1', h: 'You say what you need', p: 'One sentence to Captain, in plain words.' },
  { n: '2', h: 'Captain asks, then plans', p: 'A few short questions, then a plan you can read.' },
  { n: '3', h: 'You tap Build it', p: 'Captain builds it, and it does the work in your apps.' },
];

const TODAY = [
  { h: 'Remembers your business', p: 'Your workspace keeps your hours, prices, policies, people and tone, and the documents and links you give it. Each AI agent learns from your corrections, and you can see, correct or forget any of it.' },
  { h: 'Asks before anything leaves', p: 'An email to a client or a reply to a customer waits in Needs you: approve and send, change, or decline. AI agents ask before sending, even to you, until you allow it.' },
  { h: 'Runs when it should', p: 'Automations start on an app event, like a new payment, or on a schedule. AI agents run on a schedule or when you ask in their chat; browser agents run on a schedule and leave a report.' },
  { h: 'Works in 2,300+ apps', p: 'Through viaSocket, 50agents works in the apps you already use. Bring your data in by hand, as a pasted table, or from a CSV or Excel file.' },
];

export function AboutPage() {
  const ld = [
    crumbsLd([{ name: 'Home' }, { name: 'About', path: '/about' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '50agents',
      url: BASE,
      logo: `${BASE}/landing/favicon.svg`,
      description: '50agents builds AI agents, automations, browser agents and apps from a plain-words request, working in 2,300+ apps through viaSocket.',
      brand: { '@type': 'Brand', name: '50agents' },
      parentOrganization: {
        '@type': 'Organization',
        name: 'viaSocket',
        url: 'https://viasocket.com',
        parentOrganization: { '@type': 'Organization', name: 'Walkover', url: 'https://walkover.in' },
      },
    },
  ];
  return (
    <div className="page uc3 ix3 ab">
      <Ld data={ld} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'About' }]} /></div>

      {/* Hero: the crew, what 50agents is, who makes it */}
      <section className="wrap ix3-hero ab-hero">
        <span className="ab-crew" aria-hidden="true">
          <Face id="writer" size={40} /><Face id="keeper" size={46} /><Face id="lead" size={60} /><Face id="scout" size={46} /><Face id="sorter" size={40} />
        </span>
        <span className="ab-eye">About 50agents</span>
        <h1>A crew that does the work between your tools</h1>
        <p>50agents builds the AI agents, automations, browser agents and apps that do a business&rsquo;s everyday work, from one sentence to Captain. It is a product of viaSocket, made by Walkover.</p>
      </section>

      {/* How it works, in three lines */}
      <section className="wrap sec" id="how">
        <div className="sec-h c"><h2>One sentence in, the work done</h2><p>Captain is the AI you talk to. It builds the rest.</p></div>
        <ol className="ab-how">
          {HOW.map(s => (
            <li key={s.n}><span className="ab-n">{s.n}</span><h3>{s.h}</h3><p>{s.p}</p></li>
          ))}
        </ol>
      </section>

      {/* The four kinds, as a short strip */}
      <section className="wrap sec" id="kinds">
        <div className="sec-h c"><h2>Four kinds of help</h2><p>Captain picks the kind from what you say.</p></div>
        <div className="ab-kinds">
          {KIND_ORDER.map(kind => {
            const k = KINDS[kind];
            const inner = (<><KindFace kind={kind} size={40} /><b>{k.label}</b><span>{KIND_CARDS[kind].short}</span></>);
            return LIVE.has(k.hub)
              ? <a key={kind} href={k.hub} style={{ ['--kc' as string]: k.tint }}>{inner}</a>
              : <div key={kind} style={{ ['--kc' as string]: k.tint }}>{inner}</div>;
          })}
        </div>
      </section>

      {/* What it does today: product-facts.md, and what it does not do yet */}
      <section className="wrap sec" id="today">
        <div className="sec-h c"><h2>What it does today</h2></div>
        <div className="ab-today">
          {TODAY.map(t => <div key={t.h}><h3>{t.h}</h3><p>{t.p}</p></div>)}
        </div>
        <p className="ab-not">Not yet: an email address for each AI agent, notifications by email or WhatsApp, or undo for changes made in your other apps.</p>
      </section>

      {/* Who makes it */}
      <section className="wrap sec" id="who">
        <div className="sec-h c"><h2>Who makes it</h2><p>The team behind viaSocket, at Walkover.</p></div>
        <div className="ab-cos">
          <a className="ab-co dark" href="https://viasocket.com" target="_blank" rel="noopener">
            <b>viaSocket</b>
            <span>The automation platform under 50agents. It connects 2,300+ apps and runs the AI, the app actions and the automations 50agents builds.</span>
            <em>viasocket.com <i aria-hidden="true">&#8599;</i></em>
          </a>
          <a className="ab-co" href="https://walkover.in" target="_blank" rel="noopener">
            <b>Walkover</b>
            <span>The company that makes viaSocket and MSG91, which sends businesses&rsquo; SMS, WhatsApp and email.</span>
            <em>walkover.in <i aria-hidden="true">&#8599;</i></em>
          </a>
        </div>
      </section>

      {/* How to reach the team */}
      <section className="wrap sec" id="reach">
        <div className="sec-h c"><h2>Reach the team</h2></div>
        <div className="chs">
          <a className="ch" href="/support"><b>Support</b><span>Help with your workspace, starting with the Help Center.</span><span className="ch-go">Get help<i aria-hidden="true"> &rarr;</i></span></a>
          <a className="ch" href="/contact"><b>Contact</b><span>Privacy, jobs, and anything that is not support.</span><span className="ch-go">Contact us<i aria-hidden="true"> &rarr;</i></span></a>
          <a className="ch" href={LINKS.careers} target="_blank" rel="noopener"><b>Careers</b><span>Work on 50agents and viaSocket at Walkover.</span><span className="ch-go">See open roles<i aria-hidden="true"> &#8599;</i></span></a>
        </div>
      </section>

      <Final page="about" h2="Try it on one job" />
    </div>
  );
}

// -------------------------------------------------------------------------------------------------------------- contact

export function ContactPage() {
  const email: Channel = { id: 'email', label: 'Email the team', line: 'About 50agents, a partnership or the press.', href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : null, cta: CONTACT_EMAIL ?? 'Email us', was: 'support@viasocket.com' };
  const ways: Channel[] = [
    { id: 'support', label: 'Get support', line: 'Help with your workspace, starting with the Help Center.', href: '/support', cta: 'Go to Support', was: '' },
    email,
    { id: 'privacy', label: 'Privacy', line: 'How 50agents handles your data.', href: LINKS.privacy, cta: 'Read the Privacy Policy', was: '' },
    { id: 'careers', label: 'Careers', line: 'Work on 50agents and viaSocket at Walkover.', href: LINKS.careers, cta: 'See open roles', was: '' },
    { id: 'viasocket', label: 'viaSocket', line: 'Questions about viaSocket itself, the platform under 50agents.', href: LINKS.viasocketSupport, cta: 'viaSocket support', was: '' },
  ];
  return (
    <div className="page uc3 ix3">
      <Ld data={crumbsLd([{ name: 'Home' }, { name: 'Contact', path: '/contact' }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /></div>
      <section className="wrap ix3-hero">
        <h1>Contact the 50agents team</h1>
        <p>For help with your workspace, go to <MaybeLink href="/support">Support</MaybeLink>. For anything else, start here.</p>
      </section>
      <section className="wrap sec" id="ways">
        <div className="sec-h c"><h2>Ways to reach us</h2></div>
        <Channels list={ways} />
      </section>
      <Final page="contact" h2="Or ask Captain now" />
    </div>
  );
}

// -------------------------------------------------------------------------------------------------------------- support

export function SupportPage() {
  const groups = SUPPORT.filter(g => DEV || g.channels.some(c => c.href));
  const person = SUPPORT.some(g => g.id === 'person' && g.channels.some(c => c.href));
  return (
    <div className="page uc3 ix3">
      <Ld data={crumbsLd([{ name: 'Home' }, { name: 'Support', path: '/support' }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Support' }]} /></div>
      <section className="wrap ix3-hero">
        <h1>50agents support</h1>
        <p>{person ? 'Find the answer in the Help Center, or reach the team.' : 'Find the answer in the Help Center.'}</p>
      </section>
      {groups.map(g => (
        <section key={g.id} className="wrap sec" id={g.id}>
          <div className="sec-h c"><h2>{g.h2}</h2><p>{g.p}</p></div>
          <Channels list={g.channels} />
        </section>
      ))}
      <Final page="support" h2="Or ask Captain now" />
    </div>
  );
}
