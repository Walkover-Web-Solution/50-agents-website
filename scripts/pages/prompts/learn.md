# Write one 50agents glossary page as JSON

You write the content of one glossary page on 50agents.com (/learn/<term>). The template is fixed (src/site/learn/term.tsx);
you only fill its fields. Return one JSON object matching `TermPage` in src/site/learn/types.ts. No prose outside the JSON.
The page is short on purpose: a definition, one example, one small comparison, three links.

## Input you get
- `row`: slug, the term, the search it answers, its group on /learn, the exact ask of its example, and the term people confuse it with.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `useCase`: the use case page whose ask is the row's ask. Copy its `kind` and `build` exactly into `example`.
- `example`: a finished term (src/content/learn/pages/ai-agent.json). Match its shape, length and tone; never reuse its sentences.

## Research first (web search)
Search the row's query. Read the top 3 to 5 definitions, including a primary source where one exists (a standard, a spec, the
company that named it). Note where they disagree and what the term is most often mixed up with.

## Fields
- `title` under 60 characters, ends " | 50agents". `description` 120 to 160 characters, the definition first.
- `h1`: "What is <term>?". `definition`: two sentences a reader could quote. The first, 40 words at most, says what it is; the second says what it is for or how it differs.
- `example`: `ask` exactly the row's ask; `kind` and `build` copied from the use case page; `why`: 40 words at most on why this ask shows the term.
- `vs`: `term` the row's confused term, `href` its glossary page if it has one, and 3 rows (label, a = this term, b = that term), each cell 12 words at most. Be exact, not flattering.
- `sources`: only for facts about the outside world, primary pages you read today. Leave it out otherwise.
- `links`: 3 reads that exist: a hub, a guide and a related term. `updated`: today's date, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only the stat above, and numbers that are in the row or the catalog.
