# The 50agents.com page system (v3, 19 Nov 2026, D253)

The use case page is the reference: http://localhost:3050/use-cases/chase-unpaid-invoices.
Code: `src/app/(site)/use-cases/[slug]/page.tsx`, `src/site/usecase/*`, `src/site/css/usecase.css`. The pipeline: `scripts/pages/*`.
Every family follows it. Jii's words: not context-heavy, no small elements flying here and there, clear hierarchy, layout,
typography and spacing, visuals that support the text (or no visual), better than the competitors' pages.

## Rules for every page
- **Frame:** the homepage's header edges and footer (`src/site/chrome.tsx`). Don't change them.
- **Section heads are centred** over full-width content (`.sec-h.c`). Never a heading on the left with an empty right.
- **One rhythm:** sections are `.sec` (144px apart, 88px on a phone). More space above a heading than below it.
- **Visuals support the text or don't exist.** Every visual is drawn from the page's data with a shared component, never
  designed per page: `PromptFilm` (the page's ask typed into Captain, then a plan card), `ScrollStepper` (steps that move
  with the scroll, one picture each), the apps wall (`appsIn(category)` logos), the comparison table, `cards3` (link
  cards), the `qa` accordion. If nothing honest fits, use text.
- **No stats blocks.** At most one sourced number per page, as a sentence (it helps AI engines cite the page).
- **No dates in the text.** One "Updated <Month Year>" in the byline. Comparison pages may keep one line, "Prices
  checked <Month Year>", under their table, because those facts go stale; never a date on each fact.
- **No credits, no prices for 50agents.** "Free to start" at most.
- **Every button pastes the page's ask into Captain** (`Cta` with `ask`, which the app keeps through sign-in).
- **No small floating things:** no chips rows, no copy buttons in tables, no badges beyond the one kind badge, no
  small grey source lines in every section (sources gather in one line where the facts are).
- **Phone:** one column, left-aligned hero, the sticky button only after the hero's button scrolls away (`StickyBar`).
- House rules still hold: viaSocket lowercase v, no em dashes, 2,300+, "AI agent" or "browser agent", Captain.

## Every page is data, written by the pipeline
- One JSON per page, typed (`src/site/<family>/types.ts`). The template renders every visual from it.
- `scripts/pages/rows-<family>.json`: one row per page (slug, query, the facts that make it its own page).
- `scripts/pages/prompts/<family>.md`: the writer prompt (house rules word for word, the fields, the research step).
- `scripts/pages/gates-<family>.mjs` (or one shared gates script): shape, style, facts against the catalog and
  `scripts/pages/product-facts.md`, uniqueness (5-word shingles under 0.5), length; writes `report-<family>.md`.
- `scripts/pages/generate.mjs` runs the prompt with Claude when ANTHROPIC_API_KEY is set; until then a Claude Code
  session runs the same prompt on the same inputs.
- A new page is a new row. A design change is a component change, and every page follows.
