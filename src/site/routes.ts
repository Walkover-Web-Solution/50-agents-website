// Every new page that exists, so links only point at real pages (a link to one not built yet is drawn as text).
// Each family's content index exports PATHS; add a family here once, never edit another family's list.
import { PAGES as USE_CASES } from '@/content/use-cases/pages';
import { PATHS as HUBS } from '@/content/hubs/paths';
import { PATHS as INTEGRATIONS } from '@/content/integrations/paths';
import { PATHS as COMPARE } from '@/content/compare/paths';
import { PATHS as GUIDES } from '@/content/guides/paths';
import { PATHS as LEARN } from '@/content/learn/paths';
import { PATHS as FOR } from '@/content/for/paths';
import { PATHS as PAGES } from '@/content/pages/paths';

const PARKED = true;
export const LIVE = new Set<string>([
  ...USE_CASES.map(u => `/use-cases/${u.slug}`),
  // /learn and /for are parked (Jii, D255): their code stays in src/app/(site)/_parked, their links show as text.
  ...HUBS, ...INTEGRATIONS, ...COMPARE, ...GUIDES, ...PAGES,
  ...(PARKED ? [] : [...LEARN, ...FOR]),
]);
