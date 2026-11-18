// A glossary page (pages-brief B6, Part C: short and editorial, the definition in large type, one example in a panel).
import type { Term } from '@/content/learn/types';
import { TERMS } from '@/content/learn';
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '../parts';
import { CopyAsk } from '../copy';
import { BASE, crumbsLd, Ld, longDate } from '../hubs/meta';
import '../css/learn.css';

export const h1Of = (t: Term) => t.title.split(' | ')[0].replace(/\?.*$/, '?');

export function TermPage({ t }: { t: Term }) {
  const k = t.example.kind === 'captain' ? null : KINDS[t.example.kind];
  const tint = k?.tint ?? '#FFF4D6';
  const page = `learn-${t.slug}`;
  const i = TERMS.findIndex(x => x.slug === t.slug);
  const prev = TERMS[(i + TERMS.length - 1) % TERMS.length];
  const next = TERMS[(i + 1) % TERMS.length];
  const isUrl = t.example.ask.startsWith('http');
  return (
    <div className="page lt" style={{ ['--k' as string]: tint }}>
      <Ld
        data={[
          crumbsLd([{ name: 'Home' }, { name: 'Learn', path: '/learn' }, { name: t.term, path: `/learn/${t.slug}` }]),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition.join(' '),
            url: `${BASE}/learn/${t.slug}`,
            inDefinedTermSet: { '@type': 'DefinedTermSet', name: '50agents glossary', url: `${BASE}/learn` },
          },
        ]}
      />
      <div className="wrap lt-col">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Learn', href: '/learn' }, { label: t.term }]} />
        <p className="lt-eyebrow">Glossary</p>
        <h1>{h1Of(t)}</h1>
        <p className="lt-def">{t.definition[0]} <span>{t.definition[1]}</span></p>
        <p className="lt-by">By the 50agents team · Last updated {longDate(t.updated)}</p>

        <section className="lt-ex" aria-labelledby="ex-h">
          <div className="lt-ex-hd">
            {k ? <Face id={k.face} size={34} /> : <Face id="lead" size={34} />}
            <div>
              <p className="lt-ex-k">{k ? `An example built in 50agents · ${k.label}` : 'An example from 50agents'}</p>
              <h2 id="ex-h">{t.example.name}</h2>
            </div>
          </div>
          {isUrl ? <p className="lt-url"><code>{t.example.ask}</code></p> : <CopyAsk text={t.example.ask} />}
          {t.example.body.map(p => <p key={p} className="lt-p">{p}</p>)}
          {k && <div className="lt-ex-cta"><MaybeLink href={k.hub} className="lt-hub">More about {k.label === 'App' ? 'apps' : (k.label.startsWith('AI ') ? `${k.label}s` : `${k.label.toLowerCase()}s`)}</MaybeLink><Cta campaign="seo-learn" page={page} place="inline" /></div>}
        </section>

        <section className="lt-sec" aria-labelledby="vs-h">
          <h2 id="vs-h">{t.term} vs {t.confused.href ? <MaybeLink href={t.confused.href}>{t.confused.with}</MaybeLink> : t.confused.with}</h2>
          {t.confused.body.map(p => <p key={p} className="lt-p">{p}</p>)}
        </section>

        {t.more && (
          <section className="lt-sec" aria-labelledby="more-h">
            <h2 id="more-h">{t.more.h2}</h2>
            {t.more.body.map(p => <p key={p} className="lt-p">{p}</p>)}
          </section>
        )}

        {t.sources && (
          <p className="src">Sources: {t.sources.map((s, n) => <span key={s.href}>{n ? ' · ' : ''}<a href={s.href} target="_blank" rel="noopener">{s.label}</a>, read {s.read}</span>)}</p>
        )}

        <section className="lt-sec" aria-labelledby="next-h">
          <h2 id="next-h">Read next</h2>
          <ul className="lt-links">{t.links.map(l => <li key={l.href}><MaybeLink href={l.href}>{l.label}</MaybeLink></li>)}</ul>
          <nav className="lt-pn" aria-label="Glossary">
            <a href={`/learn/${prev.slug}`}><span>Previous term</span>{prev.term}</a>
            <a href={`/learn/${next.slug}`}><span>Next term</span>{next.term}</a>
          </nav>
          <p className="lt-all"><a href="/learn">All 20 terms</a>: {TERMS.filter(x => x.slug !== t.slug).map((x, n) => <span key={x.slug}>{n ? ', ' : ''}<a href={`/learn/${x.slug}`}>{x.term}</a></span>)}</p>
        </section>
      </div>
      <div className="sticky"><span>{t.term}</span><Cta campaign="seo-learn" page={page} place="sticky">Start free</Cta></div>
    </div>
  );
}
