# Write the lines of one 50agents pair page as JSON

You write three short pieces for one pair page on 50agents.com (for example HubSpot and Slack): what the pair is used for,
its most useful template and why, and what to watch out for between these two apps. The page template is fixed. Return one
JSON object matching `PairLines` in src/site/integrations/types.ts, saved as
`src/content/integrations/pairs/<a>__<b>.json` (the slugs in canonical order, as the input's `pair` field has them):

    { "usedFor": "...", "bestTemplate": { "name": "...", "why": "..." }, "watchOut": "..." }

No prose outside the JSON. Write every pair from its own input; never carry a sentence, an example or a fact from one pair
to another. If the input does not support an honest line for a field, do not invent one: leave the pair's file out and
list the slugs and the reason in your report.

## Input (scripts/pages/inputs/pairs/<a>__<b>.json, built by build-inputs-pairs.mjs)
- `apps`: the two apps' names, labels and a line from the catalog about each.
- `templates`: the real templates between the two apps, grouped by action. Each is "<trigger> in one app, then <action> in
  the other"; keys read `slug:Event Name`. Lookup-only actions (find, search, get, list) are already left out.
- `details`: every trigger and action those templates use, with the catalog's description and `delivery` (`hook` is
  pushed by the app when something happens; `polling` is checked on a schedule, so a short delay is normal).
- The product facts: scripts/pages/product-facts.md. A product claim must follow from it.

## The three fields (each one short sentence, 20 words at most per field: the gate holds D260 round 5)
- `usedFor`: the job this pair does for a team, in plain words, from what the two apps are and which direction the
  templates run (which app starts the work and which one receives it). Name at least one real trigger or action in
  curly quotes. It must read wrong if the two app names were swapped, so say which app is the source and which is the
  destination, and what each one holds.
- `bestTemplate`: `name` is one real template, written as the trigger and the action with the catalog's exact names, for
  example `“New Deal” in HubSpot, then “Send Message” in Slack` (only names that appear in `templates`; the trigger's app
  first). `why` is one or two sentences: why this one is the most useful of the pair's templates, from what the trigger
  carries and what the action does (use the descriptions). Pick the template that does the most real work, not the first
  one; skip templates whose action only reads or deletes unless nothing else exists.
- `watchOut`: one real thing to check between these two apps, taken from the input: a trigger that is `polling` (it
  checks on a schedule), an action whose description says it needs an ID or a required field, one that returns a message
  when nothing is found, one that deletes, a trigger that fires on updates as well as new records (so the same record can
  run twice), or the product facts (a message that reaches someone outside waits for approval, AI agents run on a
  schedule). Name the trigger or action it is about. Never invent a limit, rate limit, field name or behaviour.

## Rules (house rules, as in prompts/integration.md)
- "Write like a sharp operator explaining something to a peer." Short sentences, plain verbs, "you".
- No em dashes. No exclamation marks. No emojis. No "It's not X, it's Y". No slogans.
- Banned words: unlock, unleash, seamless(ly), effortless(ly), leverage, robust, elevate, empower, supercharge,
  game-changer, revolutionize, cutting-edge, delve, harness, streamline, synergy, journey, landscape, realm, tapestry,
  navigate (figurative).
- "AI agent" or "browser agent", never a bare "agent". Captain is Captain. viaSocket with a lowercase v. The app count is
  written 2,300+ (and only needed if it helps).
- No dates or years, no credits, no prices. No counts of triggers, actions or templates.
- The word is "template", never "recipe".
- Name only the two apps of the pair and only their real triggers and actions, in curly quotes exactly as the catalog
  writes them (“Create Deal”). Do not name a third app.
- Both app names appear in the text of `usedFor` and, between them, across the three fields.
- Do not reuse an opening across pairs ("Use X and Y to ..."). The first words of each field should come from the pair's
  own facts.

## Round 5 (D260)
- Each line is one short sentence: used for, best template, watch out. They show as three compact cards.
- Keep each pair unique: the uniqueness gate (under 0.5 shared 5-word shingles, shared lists skipped) must pass.

## Tier 2 lessons (pairs tier 2, batch 1)
- 20 words per field is the gate's limit; count them.
- Never name a third app, even one a trigger mentions (WhatsApp, YouTube); keep it inside the curly-quoted event name or describe it.
- Vary openings: "It fires when" was reused across many pairs and had to be rewritten.
- A pair whose only templates delete something is left out.
- Same pattern (Search): when 5 or more pairs with the same app would share the same best action, prefer a different action
  in `templates` where one does real work; the website session keeps out the rest of such a cluster unless the use is clearly
  real for that trigger app (index-gate.json samePattern).
