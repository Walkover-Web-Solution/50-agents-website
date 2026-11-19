# Write one 50agents integration page as JSON

You write the content of one integration page on 50agents.com: the page for one app in viaSocket's catalog. The page
template is fixed; you only fill its fields. Return one JSON object matching `IntegrationPage` in
src/site/integrations/types.ts. No prose outside the JSON.

The same prompt writes the six flagship pages (rows in scripts/pages/rows-integrations.json) and, later, the page of any
other app in the catalog (a row made from the app's catalog data: its slug, "<App> integrations" as the query, and its top
recipe as the ask). Write every page from its own input; never carry a fact from one app to another.

## Input you get
- `row`: slug, the search query it answers, the exact hero ask, the real recipe behind it, the use case pages that exist
  for this app (may be empty), the app's own AI pages to read (may be empty), and what makes it its own page.
- `app`: the app's name, its domain, and every trigger and action viaSocket's catalog lists for it (name, trigger or
  action, the catalog's description). Use only these names.
- `recipes`: the app's top recipes from the catalog (trigger app and event, action app and event).
- `partners`: the apps it has the most recipes with, by name.
- `facts`: scripts/pages/product-facts.md, what 50agents can do today. Every product claim must follow from it.
- `example`: a finished page (src/content/integrations/pages/hubspot.json). Match its shape, length and tone; never reuse
  its sentences.

## Research first (web search)
Search the row's query. Read the top 3 to 5 results and the "People also ask" questions. Note what searchers want to do
with this app (sync records, get alerts, follow up, report) and what the app's own AI does today, from the pages in
`row.native` when given. If the app has no AI of its own, or you can't read a primary page for it, leave that out.

## Fields
- `slug`, `query`: from the row.
- `title` under 60 characters, ends " | 50agents". `description` 120 to 160 characters, answer first.
- `h1`: "AI agents and automations for <App>" unless the query reads better.
- `answer`: two sentences, 40 words at most in total (D254). The first starts with "Connect <App> and tell Captain the
  job, such as" and quotes the ask's job in plain words. The second, short, says what Captain builds.
- `ask`: exactly the row's ask. `recipe`: exactly the row's recipe.
- `build`: Captain's plan for the ask: name (2 or 3 words), line (under 10 words), when (the recipe's trigger in plain
  words), does (1 to 3 lines, under 9 words each), apps (the recipe's two apps), asksFirst (under 8 words, true to the
  facts file: an email or a message to someone outside waits; a post to a Slack channel waits today).
- `kinds`: exactly four, in this order: `auto`, `ai`, `browser`, `app`. Each has a `title` (under 8 words, the job, not
  the kind), a `body` (40 words at most, specific to this app), an `ask` (the words that build it), `uses` (the app's
  trigger and action names this kind would use, exact, may be empty) and `useCase` (only a slug from `row.useCases`).
  The `auto` ask is the row's ask. Be honest about the browser agent: when the app connects through viaSocket, say it is
  for the websites around the app, not the app itself.
- `groups`: every trigger and action in `app`, each in exactly one group, by its exact name. 3 to 9 groups named by what
  they act on ("Deals", "Orders", "Messages coming in"), each with a `line` in plain words (under 30 words) that says
  what starts the work and what can be done.
- `faqs`: 4 to 6 questions from People also ask and your research, each answered in 2 or 3 sentences, from the facts
  file and the catalog only. Name a trigger or action in curly quotes, exactly as the catalog writes it: “Send Message”.
  If the app has its own AI, one question compares it fairly and says where the app's own AI is better.
- `sources`: the app's own AI pages you read for that answer, as label and URL, kept in the data for checking; the page
  shows no source line (D254). Leave it out if you read none.
- `updated`: today's date, ISO.

## Rules (from the brief, Part A5, word for word where quoted)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you". Show, don't claim.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge, game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a ... or a ...", "look no further", "say goodbye to", "take it to the next level", "imagine a world".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans or fake urgency.
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is written 2,300+.
- No dates in the text, no credits, no prices for 50agents ("free to start" at most).
- "Use only the triggers, actions and apps in the input. If the data doesn't answer a question, leave the question out."
- Numbers: no stats and no counts of triggers, actions or templates; only numbers that are in the row or the catalog, and times of day in asks.
- Ready-made starting points are "templates" in every word the visitor reads ("Templates for <App>", "<App> and <Other>
  templates"), the word the 50agents app uses; never "recipes". The input keeps the catalog's field name, `recipes`.
- No dates anywhere in the words, and no source lines (D254).
