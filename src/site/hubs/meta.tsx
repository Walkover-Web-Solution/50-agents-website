// Shared bits for this builder's pages (hubs, index pages, glossary, about, contact): metadata and JSON-LD.
import type { Metadata } from 'next';

export const BASE = 'https://50agents.com';

export const longDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function pageMeta({ path, title, description, ogTitle, index = true }: { path: string; title: string; description: string; ogTitle?: string; index?: boolean }): Metadata {
  const url = `${BASE}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { title: ogTitle ?? title, description, url, siteName: '50agents', type: 'website' },
    twitter: { card: 'summary_large_image', title: ogTitle ?? title, description },
  };
}

export function crumbsLd(trail: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${BASE}${t.path ?? ''}` })),
  };
}

export function appLd({ name, path, description, updated }: { name: string; path: string; description: string; updated: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${BASE}${path}`,
    description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Every workspace starts free with 2,000 credits.' },
    publisher: { '@type': 'Organization', name: '50agents', url: BASE },
    dateModified: updated,
  };
}

export function Ld({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
