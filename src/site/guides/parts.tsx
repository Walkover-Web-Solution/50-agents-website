// Pieces the guide and role pages share: the month line, a plan card from a page's own `build`, and the link card to a
// use case page (a guide that overlaps one links to it and never repeats it).
import { PAGES } from '@/content/use-cases/pages';
import { Face, KINDS, KindFace } from '../parts';
import { PlanCard } from '../usecase/plan-card';
import type { Kind } from '../types';
import type { UseCasePage } from '../usecase/types';

export const month = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
export const findUseCase = (slug?: string) => (slug ? PAGES.find(u => u.slug === slug) : undefined);

/** Captain's plan for an ask, drawn by the use case pages' PlanCard from a kind and a build. */
export function Plan({ kind, build }: { kind: Kind; build: UseCasePage['build'] }) {
  return <PlanCard u={{ kind, build } as UseCasePage} />;
}

/** The ready-made page for this job: one wide card on the kind's tint, the whole card a link. */
export function UseCaseCard({ u, lead = 'The ready-made version' }: { u: UseCasePage; lead?: string }) {
  const k = KINDS[u.kind];
  return (
    <a className="ucard" href={`/use-cases/${u.slug}`} style={{ ['--k' as string]: k.tint }}>
      <span className="ucard-face" aria-hidden="true"><KindFace kind={u.kind} size={34} /></span>
      <span className="ucard-t">
        <span className="ucard-k">{lead} · {k.label}</span>
        <b>{u.h1}</b>
        <span>{u.build.name}: {u.build.line}</span>
      </span>
      <span className="ucard-go" aria-hidden="true">→</span>
    </a>
  );
}
