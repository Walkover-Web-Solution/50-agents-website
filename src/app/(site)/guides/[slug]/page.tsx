// A guide (pages-brief B5): a method that works with any tool, with 50agents as one worked example. Static HTML from its
// content file: the short answer under the H1, sticky contents on desktop, numbered steps, product views, what can go wrong.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/content/guides';
import { Crumbs, Cta, Face, KINDS, MaybeLink } from '@/site/parts';
import { Blocks } from '@/site/guides/blocks';
import { plain, rich } from '@/site/guides/rich';
import '@/site/css/guides.css';

const BASE = 'https://50agents.com';
export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find(x => x.slug === slug);
  if (!g) return {};
  const url = `${BASE}/guides/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: g.h1, description: g.description, url, siteName: '50agents', type: 'article', publishedTime: g.published, modifiedTime: g.updated },
    twitter: { card: 'summary_large_image', title: g.h1, description: g.description },
  };
}

const longDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find(x => x.slug === slug);
  if (!g) notFound();
  const url = `${BASE}/guides/${g.slug}`;
  const k = KINDS[g.kind];
  // The worked example's ask: the sign-up puts it in Captain's box (D5 draft).
  const ask = g.sections.flatMap(x => x.body).map(b => ('ask' in b ? b.ask : '')).find(Boolean) || undefined;
  const words = JSON.stringify(g).split(/\s+/).length;
  const minutes = Math.max(4, Math.round(words / 230));
  const toc = [
    ...g.sections.map(s => ({ id: s.id, label: s.h2 })),
    { id: 'what-can-go-wrong', label: 'What can go wrong' },
    ...(g.faqs.length ? [{ id: 'questions', label: 'Questions people ask' }] : []),
    { id: 'sources', label: 'Sources' },
  ];
  const related = g.related.map(s => GUIDES.find(x => x.slug === s)).filter(Boolean) as typeof GUIDES;
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guides` },
        { '@type': 'ListItem', position: 3, name: g.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.h1,
      description: g.description,
      abstract: plain(g.short),
      url,
      mainEntityOfPage: url,
      datePublished: g.published,
      dateModified: g.updated,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: '50agents', url: BASE },
      publisher: { '@type': 'Organization', name: '50agents', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/landing/favicon.svg` } },
      citation: g.sources.map(s => s.href),
    },
  ];

  return (
    <div className="page gd" style={{ ['--k' as string]: k.tint }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap">
        <Crumbs trail={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: g.h1 }]} />
      </div>

      <header className="wrap gd-hero">
        <div>
          <p className="gd-eyebrow"><span className="kind" style={{ ['--k' as string]: k.tint }}><Face id={k.face} size={22} />Guide · {g.group}</span></p>
          <h1>{g.h1}</h1>
          <p className="gd-by">By the 50agents team · Last updated {longDate(g.updated)} · {minutes} min read</p>
          <aside className="gd-short" aria-label="The short answer">
            <b className="gd-sh">The short answer</b>
            <p>{rich(g.short)}</p>
          </aside>
        </div>
      </header>

      <div className="wrap gd-body">
        <nav className="gd-toc" aria-label="Contents">
          <p>Contents</p>
          <ol>{toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ol>
          <div className="gd-toc-cta"><span>Or tell Captain the job and it builds it with you.</span><Cta page={g.slug} place="inline" campaign="seo-guide" ask={ask}>Try it free</Cta></div>
        </nav>

        <article className="gd-col">
          {g.sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2>{s.h2}</h2>
              <Blocks body={s.body} />
            </section>
          ))}

          {g.pair && (
            <section id="ready-to-build" aria-label="The ready-to-build version">
              <MaybeLink href={g.pair.href} className="gd-pair">
                <Face id={k.face} size={30} />
                <div><b>{g.pair.label}</b><span>{g.pair.line}</span></div>
                <span className="arr" aria-hidden="true">→</span>
              </MaybeLink>
            </section>
          )}

          <section id="what-can-go-wrong">
            <h2>What can go wrong</h2>
            <div className="gd-wrong">
              {g.wrong.map(w => <div key={w.title}><span><h3>{w.title}</h3><p>{rich(w.body)}</p></span></div>)}
            </div>
          </section>

          {g.faqs.length > 0 && (
            <section id="questions" className="narrow">
              <h2>Questions people ask</h2>
              <div className="faqs">
                {g.faqs.map(f => (
                  <details key={f.q} open>
                    <summary><h3>{f.q}</h3></summary>
                    <p>{rich(f.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section id="sources">
            <h2>Sources</h2>
            <ol className="gd-src">
              {g.sources.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noopener">{s.label}</a>, read {s.read ?? '19 Nov 2026'}</li>)}
            </ol>
          </section>
        </article>
      </div>

      <section className="wrap band" id="related">
        <h2>More guides</h2>
        <div className="gd-more">
          {related.map(r => (
            <MaybeLink key={r.slug} href={`/guides/${r.slug}`} className="rel">
              <span className="rel-k"><Face id={KINDS[r.kind].face} size={18} />{r.group}</span>
              <b>{r.h1}</b>
              <span>{plain(r.short).split('. ')[0]}.</span>
            </MaybeLink>
          ))}
        </div>
        <p className="also">Also: <MaybeLink href="/guides">All guides</MaybeLink> · <MaybeLink href={k.hub}>{k.label === 'App' ? 'Apps' : k.label + 's'} you can build</MaybeLink> · <MaybeLink href="/use-cases">Use cases</MaybeLink></p>
      </section>

      <section className="wrap">
        <div className="final">
          <h2>Or let Captain build it</h2>
          <p>Tell Captain the job in plain words. It asks what it needs, shows you the plan, and builds it when you say so. Every workspace starts free with 2,000 credits.</p>
          <Cta page={g.slug} place="final" campaign="seo-guide" ask={ask}>{ask ? 'Build the example with Captain' : 'Try it free'}</Cta>
          <span className="peek l" aria-hidden="true"><Face id="lead" size={50} /><Face id={k.face} size={44} /></span>
          <span className="peek r" aria-hidden="true"><Face id="sorter" size={46} /><Face id="writer" size={48} /></span>
        </div>
        <p className="byline">By the 50agents team · Published {longDate(g.published)} · Last updated {longDate(g.updated)} · The 50agents views above are drawn from the app&rsquo;s own screens and filled with example data.</p>
      </section>

      <div className="sticky"><span>{g.h1}</span><Cta page={g.slug} place="sticky" campaign="seo-guide" ask={ask}>Try it free</Cta></div>
    </div>
  );
}
