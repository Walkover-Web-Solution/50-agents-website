// The trust pages (pages-brief B11), v3 (D253): /about and /contact, hand-written, in the page system's rhythm.
// Facts: pages-brief A1, app/PRODUCT.md, scripts/pages/product-facts.md and the site's footer.
// Not confirmed yet (questions for Jii): the contact email and the social profiles for sameAs, so neither is invented here.
import { HUBS } from '@/content/hubs';
import { INDEX_ASK } from '@/content/pages/indexes';
import { Crumbs, Cta, Face, MaybeLink } from '../parts';
import { ReadCard } from '../hubs/cards';
import { BASE, crumbsLd, Ld, month } from '../hubs/meta';
import '../css/usecase.css';
import '../css/hubs.css';
import '../css/pages.css';

const UPDATED = '2026-11-19';
// Placeholder until Jii confirms the address (B11). No mailto link is made from it.
export const CONTACT_EMAIL: string | null = null;

function Email() {
  return CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <span>To be confirmed. Until then, use the Help Center.</span>;
}

function Final({ page, h2 }: { page: string; h2: string }) {
  return (
    <section className="wrap sec">
      <div className="final" style={{ ['--k' as string]: '#FFF4D6' }}>
        <h2>{h2}</h2>
        <p>Tell Captain &ldquo;{INDEX_ASK}&rdquo;. Free to start.</p>
        <Cta campaign="seo-page" page={page} place="final" ask={INDEX_ASK}>Ask Captain</Cta>
        <span className="peek l" aria-hidden="true"><Face id="writer" size={50} /><Face id="keeper" size={44} /></span>
        <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="scout" size={46} /></span>
      </div>
      <p className="byline">By the 50agents team · Updated {month(UPDATED)}</p>
    </section>
  );
}

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
    <div className="page uc3 ix3">
      <Ld data={ld} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'About' }]} /></div>
      <section className="wrap ix3-hero">
        <h1>About 50agents</h1>
        <p>50agents is a product of viaSocket, made by Walkover. You tell Captain, its AI, what you need in plain words, and it builds the thing that does the work in your real apps, 2,300+ of them through viaSocket.</p>
      </section>

      <section className="wrap sec ix3-first" id="kinds">
        <div className="sec-h c"><h2>What Captain builds</h2><p>One of four kinds, picked from what you say. Captain tells you which in one line.</p></div>
        <div className="cards3 ix3-two">{HUBS.map(h => <ReadCard key={h.slug} href={`/${h.slug}`} label={h.h1} />)}</div>
      </section>

      <section className="wrap sec" id="who">
        <div className="sec-h c"><h2>Who makes it</h2></div>
        <div className="ix3-text">
          <p>viaSocket is the automation platform 50agents runs on: it provides the AI, every action in 2,300+ apps, the app connections and the automations underneath. viaSocket is made by <a href="https://walkover.in" target="_blank" rel="noopener">Walkover</a>.</p>
          <p>The 50agents team builds the parts on top: Captain, Needs you, Activity, the app builder and Care, which watches every AI agent and automation and fixes failed runs or asks you.</p>
        </div>
      </section>

      <section className="wrap sec" id="limits">
        <div className="sec-h c"><h2>What it asks first, and what it does not do yet</h2></div>
        <div className="ix3-text">
          <p>Anything that reaches someone outside your business, such as an email to a client, waits in Needs you for your yes. Activity records everything done: by whom, from where to where.</p>
          <ul>
            <li>An AI agent has no email address of its own; it sends from the apps you connect.</li>
            <li>Undo covers 50agents&rsquo; own records and versions, not changes made in your outside apps.</li>
            <li>No notifications by email or WhatsApp; what needs you shows in the app.</li>
            <li>50agents holds no security certification such as SOC 2 or ISO 27001, and makes no such claim.</li>
          </ul>
          <p>Questions or problems: <MaybeLink href="/contact">contact the team</MaybeLink>.</p>
        </div>
      </section>

      <Final page="about" h2="Try it on one job" />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="page uc3 ix3">
      <Ld data={crumbsLd([{ name: 'Home' }, { name: 'Contact', path: '/contact' }])} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} /></div>
      <section className="wrap ix3-hero">
        <h1>Contact the 50agents team</h1>
        <p>Write to the team about 50agents, your workspace or a partnership. For how-to questions, the Help Center has guides. 50agents is a product of viaSocket, made by Walkover.</p>
      </section>
      <section className="wrap sec ix3-first" id="ways">
        <div className="sec-h c"><h2>Ways to reach us</h2></div>
        <div className="ix3-text">
          <dl className="ix3-dl">
            <div><dt>Email</dt><dd><Email /></dd></div>
            <div><dt>Help Center</dt><dd><a href="https://50agents.com/help" target="_blank" rel="noopener">50agents.com/help</a>: guides to Captain and connections.</dd></div>
            <div><dt>Privacy</dt><dd><a href="https://50agents.com/help/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></dd></div>
            <div><dt>Jobs</dt><dd><a href="https://walkover.in/careers" target="_blank" rel="noopener">Careers at Walkover</a></dd></div>
          </dl>
          <p>When you write about something that went wrong, say which AI agent, automation or app it was and roughly when.</p>
        </div>
      </section>
      <Final page="contact" h2="Or ask Captain now" />
    </div>
  );
}
