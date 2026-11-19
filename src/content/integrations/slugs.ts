// Slug hygiene for the catalog snapshot (Search review 01, section 2): every slug lowercase, one page per app, and the
// old 50agents plugin left out everywhere. Pure (no fs), so paths.ts and the pages share it.
// A raw slug that differs from its canonical one (mixed case, or a duplicate app) answers with a permanent redirect.

/** Left out of every list, page and pair. */
export const EXCLUDED = new Set(['50agents']);
/** The same app listed twice: the duplicate's slug -> the one kept (the more popular). */
export const ALIASES: Record<string, string> = { 'you-need-a-budget': 'ynab', 'more-good-reviews': 'moregoodreviews' };

export const canon = (raw: string) => { const l = raw.toLowerCase(); return ALIASES[l] ?? l; };
/** A raw catalog slug that gets no page of its own (excluded, or a duplicate of another app). */
export const dropped = (raw: string) => EXCLUDED.has(raw.toLowerCase()) || raw.toLowerCase() in ALIASES;
