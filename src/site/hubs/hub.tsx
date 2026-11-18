// A kind hub (pages-brief B2): the kind in two sentences, its crew member large on its tint, the product view, the
// "which kind" table, what it can and can't do today, its use cases, its apps, other tools, questions, related.
import type { Hub } from '@/content/hubs/types';
import { HUBS } from '@/content/hubs';
import { USE_CASE_LIST } from '@/content/pages/catalog';
import { AppLogo, Crumbs, Cta, Face, KINDS, KindBadge, MaybeLink } from '../parts';
import { CopyAsk } from '../copy';
import { KindView } from './views';
import { KindTable } from './kind-table';
import { appLd, crumbsLd, Ld, longDate } from './meta';
import '../css/hubs.css';

const slug = (h: Hub) => h.path.slice(1);
const ONE = { ai: 'an AI agent', auto: 'an automation', browser: 'a browser agent', app: 'an app' } as const;
const LINE = {
  ai: 'Judgement on each run, in your apps, on a schedule.',
  auto: 'The same steps every time something happens.',
  browser: 'Work on websites that have no app to connect.',
  app: 'Your own screens and records, with a crew of AI agents.',
} as const;

export function HubPage({ hub: h }: { hub: Hub }) {
  const k = KINDS[h.kind];
  const ucs = USE_CASE_LIST.filter(u => u.kind === h.kind);
  const page = `hub-${slug(h)}`;
  return (
    <div className="page hub" style={{ ['--k' as string]: k.tint }}>
      <Ld data={[crumbsLd([{ name: 'Home' }, { name: h.crumb, path: h.path }]), appLd({ name: `50agents: ${h.crumb}`, path: h.path, description: h.answer.join(' '), updated: h.updated })]} />
      <div className="wrap"><Crumbs trail={[{ label: 'Home', href: '/' }, { label: h.crumb }]} /></div>

      <section className="wrap hero">
        <div className="hero-copy">
          <KindBadge kind={h.kind} />
          <h1>{h.h1}</h1>
          <p className="answer">{h.answer[0]} {h.answer[1]}</p>
          <div className="hero-cta">
            <Cta campaign="seo-hub" page={page} place="hero">{h.final.cta}</Cta>
            <span className="hero-note">Free to start with 2,000 credits</span>
          </div>
          <ul className="promises">{h.promises.map(p => <li key={p}><Check />{p}</li>)}</ul>
        </div>
        <div className="hero-side hub-stage">
          <div className="hub-crew" aria-hidden="true">
            <Face id={k.face} size={168} className="hub-big" />
            <Face id="lead" size={58} className="hub-cap" />
          </div>
          <div className="cb hub-ask">
            <div className="cb-hd"><Face id="lead" size={20} /><b>Captain</b></div>
            <div className="cb-chat">
              <p className="cb-me">{h.hero.ask}</p>
              <div className="cb-plan">
                <div className="cb-plan-h"><Face id={k.face} size={30} /><div><b>The plan</b><span>Build it when it looks right</span></div></div>
                <ul>{h.hero.plan.map(p => <li key={p.label}><b>{p.label}</b><span>{p.value}</span></li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap band" id="see-it">
        <div className="sec-head"><h2>{h.view.h2}</h2><p>{h.view.p}</p></div>
        <KindView kind={h.kind} />
      </section>

      <section className="wrap band" id="which-kind">
        <div className="sec-head"><h2>Which kind do I need?</h2><p>50agents builds four kinds of thing. The same table is on every kind&rsquo;s page; this one is highlighted.</p></div>
        <KindTable current={h.kind} />
      </section>

      <section className="wrap band" id="today">
        <div className="sec-head"><h2>What {ONE[h.kind]} can and can&rsquo;t do today</h2></div>
        <div className="cando">
          <div className="cando-yes"><h3>It can</h3><ul>{h.can.map(c => <li key={c}><Check />{c}</li>)}</ul></div>
          <div className="cando-no"><h3>It can&rsquo;t, yet</h3><ul>{h.cant.map(c => <li key={c}><Cross />{c}</li>)}</ul></div>
        </div>
        <p className="src">{h.limitsNote}</p>
      </section>

      <section className="wrap band" id="use-cases">
        <div className="sec-head"><h2>Ready-made {h.crumb.startsWith('AI ') ? h.crumb : h.crumb.toLowerCase()} to start from</h2><p>{h.ucIntro}</p></div>
        <div className="uc-grid">
          {ucs.map(u => (
            <div key={u.slug} className="uc">
              <MaybeLink href={`/use-cases/${u.slug}`} className="uc-t">{u.title}</MaybeLink>
              <p>{u.line}</p>
              <p className="uc-apps">{u.apps.length ? u.apps.join(' · ') : 'No app: websites'}</p>
              <CopyAsk text={u.ask} small />
            </div>
          ))}
          {h.extraJobs?.map(j => (
            <div key={j.title} className="uc uc-x">
              <b className="uc-t">{j.title}</b>
              <p>{j.body}</p>
              {j.ask && <CopyAsk text={j.ask} small />}
            </div>
          ))}
        </div>
        <p className="also">All twelve: <MaybeLink href="/use-cases">use cases</MaybeLink></p>
      </section>

      <section className="wrap band split" id="apps">
        <div>
          <h2>The apps it is most used with</h2>
          <p className="hub-intro">{h.apps.intro}</p>
          {h.apps.list.length > 0 && (
            <div className="uses">
              {h.apps.list.map(a => (
                <div key={a.name} className="use">
                  <span className="use-logo"><AppLogo app={a.logo ?? a.name.toLowerCase()} icon={a.icon} size={28} /></span>
                  <div><h3>{a.name}</h3><p>{a.why}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="asks">
          <h2>What asks you first</h2>
          <p>Anything that spends money, reaches people outside your workspace or changes who has access waits in Needs you for one tap: on its own screen, on Home and in the chat it came from. Reading never waits.</p>
        </div>
      </section>

      <section className="wrap band" id="other-tools">
        <div className="sec-head"><h2>Other tools for this</h2><p>{h.others.intro}</p></div>
        <div className="ways">
          {h.others.list.map(o => (
            <div key={o.name} className="way">
              <h3>{o.name}</h3>
              <p><b>Price:</b> {o.plan}</p>
              <p><b>Where it is better:</b> {o.better}</p>
              <p>{o.note}</p>
              <p className="src"><a href={o.href} target="_blank" rel="noopener">{o.href.replace(/^https?:\/\/(www\.)?/, '')}</a> · read 19 Nov 2026</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap band narrow" id="questions">
        <h2>Questions people ask</h2>
        <div className="faqs">
          {h.faqs.map(f => (
            <details key={f.q} open><summary><h3>{f.q}</h3></summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      <section className="wrap band" id="related">
        <h2>Related</h2>
        <div className="related">
          {HUBS.filter(o => o.kind !== h.kind).map(o => (
            <MaybeLink key={o.path} href={o.path} className="rel">
              <span className="rel-k"><Face id={KINDS[o.kind].face} size={18} />{KINDS[o.kind].label}</span>
              <b>{o.h1}</b>
              <span>{LINE[o.kind]}</span>
            </MaybeLink>
          ))}
        </div>
        <p className="also">Read next: {h.related.map((l, i) => <span key={l.href}>{i ? ' · ' : ''}<MaybeLink href={l.href}>{l.label}</MaybeLink></span>)}</p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>{h.final.h2}</h2>
          <p>{h.final.p}</p>
          <Cta campaign="seo-hub" page={page} place="final">{h.final.cta}</Cta>
          <span className="peek l" aria-hidden="true"><Face id={k.face} size={52} /><Face id="keeper" size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="lead" size={50} /><Face id="rosa" size={46} /></span>
        </div>
        <p className="byline">By the 50agents team · Last updated {longDate(h.updated)} · What it can and can&rsquo;t do is read from the 50agents app&rsquo;s source; the views are drawn from the app&rsquo;s screens with example data.</p>
      </section>

      <div className="sticky"><span>{h.crumb}</span><Cta campaign="seo-hub" page={page} place="sticky">Start free</Cta></div>
    </div>
  );
}

function Check() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}
function Cross() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>;
}
