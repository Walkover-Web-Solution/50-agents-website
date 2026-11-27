// The upgraded app page's pieces (Search S52): the hero scene, the jobs grouped by chore, how it works, the fair comparison
// and sourced questions. Every scene is drawn from the page's JSON, so no app page is designed by hand. Scenes show example
// data and say so once per page. Taste (design/taste.md): hairlines over boxes, one accent, the crew carries the colour.
import { Face, KINDS } from '@/site/parts';
import { BuildLink } from './build-link';
import { Logo, type Campaign } from './parts';
import { nameOf } from './data';
import type { IntegrationV4, SceneSide, V4Job } from './v4-types';

const C: Campaign = 'seo-integration';

function Side({ s, dir }: { s: SceneSide; dir: 'in' | 'out' }) {
  return (
    <div className={`v4-side ${dir}`}>
      <span className="v4-side-h"><Logo slug={s.app} size={18} /><span>{s.label}</span></span>
      <p>{s.text}</p>
    </div>
  );
}

/** A job as a tiny scene: what starts it, the crew member doing it, what you get. */
export function Scene({ kind, in: a, out: b, steps }: { kind: V4Job['kind']; in: SceneSide; out: SceneSide; steps?: string[] }) {
  const K = KINDS[kind];
  return (
    <div className="v4-scene" style={{ ['--k' as string]: K.tint }}>
      <Side s={a} dir="in" />
      <div className="v4-mid" aria-hidden="true">
        <i className="v4-wire" />
        <span className="v4-crew"><Face id={K.face} size={30} /></span>
        <i className="v4-wire" />
      </div>
      {steps && steps.length > 0 && (
        <ol className="v4-steps">{steps.map(s => <li key={s}>{s}</li>)}</ol>
      )}
      <Side s={b} dir="out" />
    </div>
  );
}

/** The hero's right side: the page's main job as a short story, top to bottom: what starts it, the crew member working
 *  through the steps, and the result as it lands in the app. */
export function HeroScene({ p }: { p: IntegrationV4 }) {
  const K = KINDS[p.hero.kind];
  const { in: a, out: b } = p.hero;
  return (
    <figure className="v4-story" style={{ ['--k' as string]: K.tint }} aria-label={`${K.label}: ${p.hero.title}`}>
      <div className="v4-story-in">
        <span className="v4-side-h"><Logo slug={a.app} size={20} /><span>{a.label}</span></span>
        <p>{a.text}</p>
      </div>
      <div className="v4-story-work">
        <span className="v4-story-crew"><Face id={K.face} size={44} /></span>
        <div>
          <b>{K.label}: {p.hero.title}</b>
          <ol>{p.hero.steps.map(s => <li key={s}>{s}</li>)}</ol>
        </div>
      </div>
      <div className="v4-story-out">
        <span className="v4-story-app"><Logo slug={b.app} size={20} /><span>{b.label}</span></span>
        <div className="v4-post">
          <span className="v4-post-av"><Face id={K.face} size={28} /></span>
          <div><b>50agents</b><span className="v4-post-t">now</span><p>{b.text}</p></div>
        </div>
      </div>
      <figcaption className="v4-story-cap">Example</figcaption>
    </figure>
  );
}

function JobCard({ j, page, n }: { j: V4Job; page: string; n: string }) {
  const K = KINDS[j.kind];
  return (
    <article className="v4-job" style={{ ['--k' as string]: K.tint }}>
      <Scene kind={j.kind} in={j.in} out={j.out} />
      <div className="v4-job-b">
        <span className="v4-job-k">{K.label}</span>
        <h4>{j.title}</h4>
        <p>{j.body}</p>
        <p className="v4-ask">“{j.ask}”</p>
        <BuildLink page={page} place={`job-${n}`} campaign={C} ask={j.ask} className="btn sm ghost">Build this</BuildLink>
      </div>
    </article>
  );
}

/** Every job on this app, grouped by chore, with a quiet row of chore links on top. */
export function Chores({ p }: { p: IntegrationV4 }) {
  const id = (s: string) => 'do-' + s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return (
    <>
      <nav className="v4-chore-nav" aria-label="Jobs by chore">
        {p.chores.map(c => <a key={c.label} href={`#${id(c.label)}`}>{c.label}<span>{c.jobs.length}</span></a>)}
      </nav>
      {p.chores.map((c, ci) => (
        <div key={c.label} className="v4-chore" id={id(c.label)}>
          <div className="v4-chore-h"><h3>{c.label}</h3><p>{c.line}</p></div>
          <div className="v4-jobs">{c.jobs.map((j, ji) => <JobCard key={j.title} j={j} page={p.slug} n={`${ci + 1}-${ji + 1}`} />)}</div>
        </div>
      ))}
      <p className="v4-example">Names and numbers in the scenes are examples.</p>
    </>
  );
}

/** How it works, as one strip: your words, Captain's plan, the work running. Drawn from the hero job. */
export function How({ p }: { p: IntegrationV4 }) {
  const apps = Array.from(new Set([p.hero.in.app, p.hero.out.app]));
  return (
    <div className="v4-how">
      <div className="v4-how-col">
        <h3>You say it</h3>
        <div className="v4-bubble you">{p.asks[0]}</div>
        <p>In your own words, like a message to a colleague. No flowchart.</p>
      </div>
      <div className="v4-how-col">
        <h3>Captain shows the plan</h3>
        <div className="v4-plan">
          <span className="v4-plan-h"><Face id="lead" size={22} />{p.hero.title}</span>
          <ul>{p.hero.steps.map(s => <li key={s}>{s}</li>)}</ul>
          <span className="v4-plan-apps">{apps.map(a => <span key={a}><Logo slug={a} size={16} />{nameOf(a)}</span>)}</span>
        </div>
        <p>It asks before anything it shouldn’t do alone, and you can change any step.</p>
      </div>
      <div className="v4-how-col">
        <h3>It runs</h3>
        <div className="v4-run">
          <span className="ok">Running</span>
          <p>{p.hero.out.text}</p>
        </div>
        <p>It keeps running on its own. You see each run and can pause it.</p>
      </div>
      {p.film && (
        <figure className="v4-film">
          <video src={p.film.src} poster={p.film.poster} controls muted playsInline preload="none" />
          <figcaption>{p.film.caption}</figcaption>
        </figure>
      )}
    </div>
  );
}

/** A fair comparison: three tools, the questions people ask, and where the others are the better pick. */
export function Compare({ p }: { p: IntegrationV4 }) {
  if (!p.compare) return null;
  return (
    <div className="v4-cmp">
      <p className="v4-cmp-intro">{p.compare.intro}</p>
      <div className="v4-cmp-scroll">
        <table>
          <thead><tr><th scope="col"><span className="sr">Question</span></th><th scope="col">50agents</th><th scope="col">Zapier</th><th scope="col">Make</th></tr></thead>
          <tbody>{p.compare.rows.map(r => <tr key={r.q}><th scope="row">{r.q}</th><td>{r.us}</td><td>{r.zapier}</td><td>{r.make}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="v4-cmp-fair">{p.compare.fair}</p>
    </div>
  );
}

/** Questions people ask, each answer with its source when one was read. */
export function SourcedQuestions({ faqs }: { faqs: IntegrationV4['faqs'] }) {
  return (
    <div className="qa uc3-qa">
      {faqs.map((f, n) => (
        <details key={f.q} open={n === 0}>
          <summary><h3>{f.q}</h3><i aria-hidden="true" /></summary>
          <p>{f.a}{f.source && <> <a className="v4-src" href={f.source.href} rel="nofollow noopener" target="_blank">{f.source.label}</a></>}</p>
        </details>
      ))}
    </div>
  );
}

/** The page in markdown, for AI agents and answer engines (/integrations/<app>.md). Same facts as the HTML. */
export function v4Markdown(p: IntegrationV4, base: string, draftUrl: (ask: string) => string): string {
  const L: string[] = [];
  L.push(`# ${p.h1}`, '', `> ${p.answer.join(' ')}`, '', `Page: ${base}/integrations/${p.slug}`, '');
  L.push('## Ask Captain', '', 'Each link opens 50agents with the ask typed in; the person signs in and taps Build it.', '');
  p.asks.forEach(a => L.push(`- [${a}](${draftUrl(a)})`));
  L.push('', `## Everything you can do with ${nameOf(p.slug)}`, '');
  for (const c of p.chores) {
    L.push(`### ${c.label}`, '', c.line, '');
    for (const j of c.jobs) {
      L.push(`- **${j.title}** (${KINDS[j.kind].label}): ${j.body} Starts from: ${nameOf(j.in.app)}, ${j.in.label}. Result: ${nameOf(j.out.app)}, ${j.out.label}. Ask: [${j.ask}](${draftUrl(j.ask)})`);
    }
    L.push('');
  }
  L.push('## How it works', '', `1. Say the job to Captain in plain words.`, `2. Captain shows the plan: ${p.hero.steps.join('; ')}.`, '3. It runs on its own; you see every run and can pause it.', '');
  if (p.compare) {
    L.push('## 50agents, Zapier and Make', '', p.compare.intro, '', '| Question | 50agents | Zapier | Make |', '|---|---|---|---|');
    p.compare.rows.forEach(r => L.push(`| ${r.q} | ${r.us} | ${r.zapier} | ${r.make} |`));
    L.push('', p.compare.fair, '');
  }
  L.push('## Questions', '');
  p.faqs.forEach(f => L.push(`### ${f.q}`, '', f.a + (f.source ? ` Source: ${f.source.href}` : ''), ''));
  L.push('---', '', '50agents is a product from viaSocket. Free to start with 2,000 credits. 2,300+ apps.');
  return L.join('\n') + '\n';
}
