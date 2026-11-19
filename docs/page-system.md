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

## Round 2 (D254, Jii's review)
- **No dates at all** on the page: no byline date, no "Prices checked", no "read <date>". Dates live only in JSON-LD
  `dateModified`, the sitemap and the content files.
- **No source lines** ("From each tool's own pages", "Sources: ..."). Facts stay checked in the data files.
- **Subheaders are one short line** (under about 14 words), direct and concise. The hero's two-sentence answer is
  40 words at most in total.
- **Use the width:** heroes and content go wide (the hero film is 940px; tables use the full container).
- **The hero film** (`PromptFilm`) is Captain's yellow blob beside its chat box with the ask typing in. No plan card.
- **Apps sections** say "Works with <apps> and 2,300+ apps" and show two marquee rows of logos (see the use case page).
- **Tables** follow the use case comparison table: short cells (a mark plus at most 5 words), the 50agents column
  raised on the kind's tint, drawn tick, cross and partly icons. No prose in cells.
- **Headers** are the shared ones (68px, no border). Don't override them.
- **Captain is the yellow blob** (`Face id="lead"`); use the crew blobs where they help explain, never as decoration.
- **Guides v4** (`src/app/(site)/guides/[slug]/page.tsx`, `src/site/guides/*`): to the point (answer, then steps). Interactions
  are native inputs in the server HTML, so they work by keyboard and without JavaScript: a "which one do I need" chooser
  (radios, branches shown by `:has`, an answer within 3 taps, only where there is a real choice), steps the reader ticks
  off with progress in the sticky contents, and Captain's film inside the step 50agents does. Tips, warnings and "what
  can go wrong" items carry the blob of the kind they are about. Tabs ("any tool" vs "in 50agents") were left out: they
  would hide the steps or repeat them. Prompt `scripts/pages/prompts/guides.md`, gates `scripts/pages/gates-guides.mjs`.
