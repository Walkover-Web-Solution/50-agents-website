// The trust pages (pages-brief B11): /about and /contact.
// Facts: pages-brief A1, app/PRODUCT.md and the site's footer, read 19 Nov 2026.
// Not confirmed yet (questions for Jii): the contact email and the social profiles for sameAs, so neither is invented here.
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '../parts';
import { BASE, crumbsLd, Ld, longDate } from '../hubs/meta';
import type { Kind } from '../types';
import '../css/pages.css';

const UPDATED = '2026-11-19';
// Placeholder until Jii confirms the address (B11). Rendered visibly marked; no mailto link is made from it.
export const CONTACT_EMAIL: string | null = null;

function Email() {
  return CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <span className="ab-ph" title="Placeholder: the address is not confirmed yet">[email address to be confirmed]</span>;
}

const KIND_LINES: { kind: Kind; line: string }[] = [
  { kind: 'ai', line: 'Uses judgement on each run in your apps, on a schedule: follow-ups, summaries, drafted replies.' },
  { kind: 'auto', line: 'The same steps every time something happens: a payment logged, a contact posted.' },
  { kind: 'browser', line: 'Works on websites with no app to connect, such as competitors\' pricing pages.' },
  { kind: 'app', line: 'Your own screens and records, such as a leads pipeline, run by a crew of AI agents.' },
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
    <div className="page" style={{ ['--k' as string]: '#FFF4D6' }}>
      <Ld data={ld} />
      <div className="wrap ab">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <header className="ix-head">
          <h1>About 50agents</h1>
          <p>50agents is a product of viaSocket, made by Walkover. You tell Captain, its AI, what you need in plain words, and it builds the thing that does the work in your real apps, 2,300+ of them through viaSocket.</p>
          <p>It is for small businesses that have more repeated work than people to do it, and no wish to learn an automation builder.</p>
        </header>

        <section className="ab-sec" aria-labelledby="who">
          <h2 id="who">Who makes it</h2>
          <p className="lt-p">viaSocket is the automation platform 50agents runs on: it provides the AI, every action in 2,300+ apps, the app connections and the automations underneath. viaSocket is made by <a href="https://walkover.in" target="_blank" rel="noopener">Walkover</a>. The 50agents team builds the parts on top: Captain, Needs you, Activity, the app builder and Care.</p>
        </section>

        <section className="ab-sec" aria-labelledby="what">
          <h2 id="what">What it does today</h2>
          <p className="lt-p">Captain builds one of four kinds of thing, picks which from what you say, and tells you which in one line.</p>
          <div className="ab-kinds">
            {KIND_LINES.map(({ kind, line }) => (
              <div key={kind} style={{ ['--k' as string]: KINDS[kind].tint }}>
                <MaybeLink href={KINDS[kind].hub} className="ab-kind">
                  <Face id={KINDS[kind].face} size={30} />
                  <span><b>{KINDS[kind].label}</b>{line}</span>
                </MaybeLink>
              </div>
            ))}
          </div>
          <ul>
            <li>Anything that spends money, reaches people outside your workspace or changes who has access waits for your yes in Needs you.</li>
            <li>Activity records everything done: by whom, from where to where.</li>
            <li>Care watches every AI agent and automation, fixes failed runs and expired connections, or asks you.</li>
            <li>Every workspace starts free with 2,000 credits; $1 buys 1,000 more.</li>
          </ul>
        </section>

        <section className="ab-sec" aria-labelledby="not">
          <h2 id="not">What it does not do yet</h2>
          <ul>
            <li>An AI agent has no email address of its own; it sends from the apps you connect.</li>
            <li>Undo covers 50agents&rsquo; own records and versions, not changes made in your outside apps; those are logged in Activity.</li>
            <li>No notifications by email or WhatsApp; what needs you shows in the app.</li>
            <li>50agents holds no security certification such as SOC 2 or ISO 27001 today, and makes no such claim.</li>
          </ul>
        </section>

        <section className="ab-sec" aria-labelledby="reach">
          <h2 id="reach">How to reach the team</h2>
          <div className="ab-contact">
            <dl>
              <div><dt>Email</dt><dd><Email /></dd></div>
              <div><dt>Help Center</dt><dd><a href="https://50agents.com/help" target="_blank" rel="noopener">50agents.com/help</a></dd></div>
              <div><dt>More ways</dt><dd><MaybeLink href="/contact">Contact page</MaybeLink></dd></div>
            </dl>
          </div>
        </section>

        <div className="final" style={{ marginTop: 64 }}>
          <h2>Try it on one job</h2>
          <p>Tell Captain what you need. Every workspace starts free with 2,000 credits.</p>
          <Cta campaign="seo-page" page="about" place="final">Get started free</Cta>
          <span className="peek l" aria-hidden="true"><Face id="writer" size={50} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="scout" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {longDate(UPDATED)}</p>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="page">
      <Ld data={crumbsLd([{ name: 'Home' }, { name: 'Contact', path: '/contact' }])} />
      <div className="wrap ab">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <header className="ix-head">
          <h1>Contact the 50agents team</h1>
          <p>Write to the team by email for questions about 50agents, your workspace, credits or a partnership. For how-to questions, the Help Center has guides.</p>
          <p>50agents is a product of viaSocket, made by Walkover.</p>
        </header>
        <section className="ab-sec" aria-labelledby="ways">
          <h2 id="ways">Ways to reach us</h2>
          <div className="ab-contact">
            <dl>
              <div><dt>Email</dt><dd><Email /></dd></div>
              <div><dt>Help Center</dt><dd><a href="https://50agents.com/help" target="_blank" rel="noopener">50agents.com/help</a>: guides to Captain, connections and credits.</dd></div>
              <div><dt>Privacy</dt><dd><a href="https://50agents.com/help/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></dd></div>
              <div><dt>Jobs</dt><dd><a href="https://walkover.in/careers" target="_blank" rel="noopener">Careers at Walkover</a></dd></div>
            </dl>
          </div>
          <p className="lt-p">When you write about something that went wrong, say which AI agent, automation or app it was and roughly when.</p>
        </section>
        <section className="ab-sec" aria-labelledby="more">
          <h2 id="more">More about 50agents</h2>
          <p className="lt-p"><MaybeLink href="/about">About 50agents</MaybeLink> · <MaybeLink href="/use-cases">Use cases</MaybeLink> · <MaybeLink href="/learn">Learn</MaybeLink></p>
        </section>
        <p className="byline">By the 50agents team · Last updated {longDate(UPDATED)}</p>
      </div>
    </div>
  );
}
