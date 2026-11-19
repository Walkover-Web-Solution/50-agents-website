# Write one 50agents role page as JSON

You write the content of one role page on 50agents.com (/for/<role>): the jobs that role hands off first, built in
50agents. The page template is fixed (src/app/(site)/for/[role]/page.tsx); you only fill its fields.
Return one JSON object matching `RolePage` in src/site/for/types.ts. No prose outside the JSON.

## Input you get
- `row`: slug, the search query, the role as it reads mid-sentence, kind, category, apps, the worked example's exact ask
  (and `useCase` when that ask is a use case page's), and the jobs that make it its own page (`own`).
- `useCases`: every use case page (slug, kind, h1, ask). A job that is one of them takes its slug and its exact ask.
- `catalog`: for each app in the row, its real triggers and actions. Use only these names.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `example`: a finished role page (src/content/for/pages/sales.json). Match its shape, length and tone; never reuse its
  sentences.

## Research first (web search)
Search the row's query and "<role> automation ideas". Read the top 3 to 5 results and the "People also ask" questions.
Note which jobs that role repeats every week and which apps it already pays for.

## Fields
- `title` under 60 characters, ends " | 50agents". `description` 120 to 155 characters, answer first.
- `h1`, `role` (mid-sentence, "sales teams"), `label` (for links, "Sales").
- `answer`: two sentences. The first names the jobs this role hands off first; the second says how 50agents builds them
  and what asks first.
- `example`: `kind`, `ask` (exactly the row's ask), `build` (as in src/site/usecase/types.ts), `useCase` when the row
  has one (then copy that page's build). The hero types the ask into Captain and shows the plan under it.
- `jobs`: exactly 5, the most common first: title under 7 words, body 30 words at most, kind, the exact ask, and
  `useCase` when a use case page does that job.
- `category` and `apps` (6 to 8 catalog slugs): from the row.
- `faqs`: 4 or 5, each answered in 2 or 3 sentences; one is "What does it not do yet?", answered honestly from the facts.
- `sources` (optional): pages you used for a fact, labels without dates. `guides`: 3 guide slugs. `updated`: today, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only the stat above, and numbers that are in the row or the catalog.
- No stats blocks: at most one sourced number, as a sentence.
