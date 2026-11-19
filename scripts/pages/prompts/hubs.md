# Write one 50agents kind hub as JSON

You write the content of one kind hub on 50agents.com (/ai-agents, /automations, /browser-agents, /apps). The template is
fixed (src/site/hubs/hub.tsx); you only fill its fields. Return one JSON object matching `HubPage` in src/site/hubs/types.ts.
No prose outside the JSON.

## Input you get
- `row`: slug, the searches it answers, kind, the exact ask of its example, the apps it leans on, and what makes it its own page.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `useCase`: the use case page whose ask is the row's ask. Copy its `build` exactly into `example.build`.
- `example`: a finished hub (src/content/hubs/pages/ai-agents.json). Match its shape, length and tone; never reuse its sentences.

## Research first (web search)
Search the row's queries. Read the top 3 to 5 results and the "People also ask" questions. Note which tools searchers compare
(Zapier, Make, n8n, Lindy, Glide and others) and what they still don't get answered.

## Fields
- `title` under 60 characters, ends " | 50agents". `description` 120 to 155 characters. **Lead with the query and the answer** (SEO pass 01): the first words are the search the page answers, then the answer in the same sentence, product second. Never open with "Tell Captain". Check the length (155 characters at most) before you return it.
- `crumb`: the kind, plural ("AI agents"). `h1`: what you can do, in plain words, led by the query ("AI agent builder: describe the job, Captain builds it"). `line`: under 12 words, for link cards elsewhere.
- `answer`: the kind in two sentences, 40 words at most in total. The first says what it is in 50agents with one concrete example; the second says how you get one from Captain and what asks first.
- `example`: `ask` exactly the row's ask; `build` copied from the use case page (kept as a fact; the hero shows no plan card).
- `useCases`: the subheader over the use case cards, one short line of 14 words at most.
- `apps`: the row's apps, as a list of catalog slugs, most-used first. The template writes the heading itself: "Works with <the first three> and 2,300+ apps" over two marquee rows.
- `faqs`: 5 to 7 questions from People also ask, each answered in 2 or 3 sentences (70 words at most), from the facts file only. Include one on what it can't do yet, and one comparing it with the tools searchers name, fairly: say where they are better. No prices. Put `[label](/path)` links to the matching guides and comparison pages inside the answers (70 visible words at most), only to pages that exist. "Free to start" is the only thing to say about cost.
- `links`: 3 reads that exist: a guide, a glossary term, a comparison.
- `final`: the closing heading, an invitation in under 8 words. `updated`: today's date, ISO.

## Round 2 rules (D254, Jii's review)
- The hero answer is 40 words at most in total (both sentences together). Every subheader the page shows is one short
  line, 14 words at most, direct and concise.
- No dates anywhere on the page: no byline date, no "Updated", no "Prices checked", no "read <date>". `updated` is used
  only for JSON-LD `dateModified` and the sitemap.
- No source lines on the page. `sources` (where the type has it) stays in the data so the facts can be checked; it is
  never shown.
- The hero film shows the ask typing into Captain, with no plan card. `build` is kept in the data as a fact.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: only the stat above, and numbers that are in the row or the catalog.
