// The template words of an app or pair page, built only from that page's catalog data (pages-brief B8, D7): real app,
// trigger and action names. Used for every app the page pipeline hasn't written yet (src/content/integrations/pages has
// the ones it has). Same house rules as the pipeline: no dates, no credits, no stats, "AI agent" or "browser agent".
import { actionPhrase, catalog, inSentence, nameOf, partnersOf, recipeAsk, recipeClause, topRecipes, triggerPhrase, groupEvents, type AppFile, type Event, type Recipe } from './data';
import type { IntegrationPage } from './types';

const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const q = (s: string) => `“${plainEvent(s)}”`;
const READ_ORDER = /^(search|find|get|list|lookup|retrieve|fetch)/i;
const KEEP = ['Google', 'Slack', 'HubSpot', 'Stripe', 'Shopify', 'Gmail'];

/** An event name in plain words, sentence case: "Search_Email_Messages" -> "Search email messages". */
export function plainEvent(name: string, app = ''): string {
  return cap(inSentence(name, [app, ...KEEP]).replace(/\s+/g, ' ').trim());
}

/** Captain's plan for one recipe, as the plan card under the hero's prompt shows it. */
export function recipeBuild(r: Recipe): IntegrationPage['build'] {
  const A = nameOf(r.ta), B = nameOf(r.aa);
  const slackPost = r.aa === 'slack' || r.aa === 'microsftteams';
  return {
    name: A === B ? `${A} steps` : `${A} to ${B}`,
    line: A === B ? `Runs in ${A}` : `${A} starts it, ${B} does it`,
    when: `When ${triggerPhrase(r.te, A)} in ${A}`,
    does: [`${cap(actionPhrase(r.ae, B))} in ${B}`],
    apps: [...new Set([r.ta, r.aa])],
    asksFirst: slackPost ? 'Each post to your channel' : 'Anything sent outside your business',
  };
}

export function templatePage(app: AppFile): IntegrationPage {
  const N = app.name;
  const triggers = app.events.filter(e => e.t === 'trigger');
  const actions = app.events.filter(e => e.t === 'action');
  const recipes = topRecipes(app);
  const partners = partnersOf(app);
  const r0 = recipes[0];
  const tools = [...actions].sort((x, y) => Number(READ_ORDER.test(y.n)) - Number(READ_ORDER.test(x.n))).slice(0, 3);

  // The hero's ask and plan: the best real recipe, else the app's first trigger or action.
  let ask: string, build: IntegrationPage['build'];
  if (r0) {
    ask = recipeAsk(r0, nameOf);
    build = recipeBuild(r0);
  } else if (triggers[0]) {
    ask = `Set up an automation: when ${triggerPhrase(triggers[0].n, N)} in ${N}, send me an email with the details`;
    build = { name: `${N} alerts`, line: 'The same steps on every event', when: `When ${triggerPhrase(triggers[0].n, N)} in ${N}`, does: ['Email you the details'], apps: [app.slug], asksFirst: 'Anything sent outside your business' };
  } else if (actions[0]) {
    ask = `Set up an automation: every Monday at 9:00, ${actionPhrase(actions[0].n, N)} in ${N} and email me the result`;
    build = { name: `${N} on Mondays`, line: 'The same steps on a schedule', when: 'Every Monday at 9:00', does: [`${plainEvent(actions[0].n, N)} in ${N}`, 'Email you the result'], apps: [app.slug], asksFirst: 'Anything sent outside your business' };
  } else {
    ask = `Tell me what you can build with ${N}`;
    build = { name: `${N} plan`, line: 'Captain plans it with you', when: 'When you ask', does: ['A plan for you to approve'], apps: [app.slug], asksFirst: 'Before it builds anything' };
  }

  const answer: [string, string] = [
    r0
      ? `In 50agents you connect ${N} once and tell Captain the job in plain words, such as: ${recipeClause(r0, nameOf)}.`
      : `In 50agents you connect ${N} once and tell Captain the job in plain words, and it plans the steps for you to approve.`,
    triggers.length && actions.length
      ? partners.length
        ? `Captain builds it on ${N}’s own triggers and actions, alongside apps such as ${list(partners.slice(0, 3).map(x => nameOf(x.slug)))}, and anything that reaches people outside your business asks you first.`
        : `Captain builds an automation, an AI agent or an app on ${N}’s own triggers and actions, and anything that reaches people outside your business asks you first.`
      : triggers.length
        ? `${N} starts the work with its triggers, the steps run in your other apps, and anything that reaches people outside your business asks you first.`
        : actions.length
          ? `${N} works as a step: another app’s event or a schedule starts it.`
          : `viaSocket’s catalog lists ${N} without triggers or actions yet, so tell Captain the job and it says what it can do.`,
  ];

  const kinds: IntegrationPage['kinds'] = [];
  const kindUses = (xs: Event[]) => xs.map(e => e.n);
  // Automation
  if (r0) {
    kinds.push({ kind: 'auto', title: `${nameOf(r0.ta)} to ${nameOf(r0.aa)}, every time`, body: `${cap(recipeClause(r0, nameOf))}, the same way every time.`, ask, uses: [r0.ta === app.slug ? r0.te : r0.ae] });
  } else if (triggers[0]) {
    kinds.push({ kind: 'auto', title: `Act on every ${N} event`, body: `Each time ${q(triggers[0].n)} happens in ${N}, the steps you name run in your other apps.`, ask, uses: [triggers[0].n] });
  } else if (actions[0]) {
    kinds.push({ kind: 'auto', title: `${N} as a step`, body: `An event in another app or a schedule starts the work, then ${q(actions[0].n)} runs in ${N}.`, ask, uses: [actions[0].n] });
  }
  // AI agent
  if (actions.length) {
    kinds.push({
      kind: 'ai',
      title: `An AI agent that works in ${N}`,
      body: `It uses ${list(tools.map(e => q(e.n)))} in ${N} when your instructions call for it.`,
      ask: `Set up an AI agent with ${N} connected that can ${list(tools.map(e => actionPhrase(e.n, N)))} when I ask in its chat`,
      uses: kindUses(tools),
    });
  }
  // Browser agent
  kinds.push({
    kind: 'browser',
    title: app.domain ? `Pages on ${app.domain}` : `Websites around ${N}`,
    body: `For ${N}’s public pages${app.domain ? ` on ${app.domain}` : ''}${app.events.length ? ' that its triggers and actions don’t reach' : ''}: it reads them on a schedule and reports what changed.`,
    ask: `Set up a browser agent that checks the public pages on ${app.domain || N} that I name every Monday at 9:00 and tells me what changed`,
    uses: [],
  });
  // App
  const thing = biggestThing(app.events);
  kinds.push({
    kind: 'app',
    title: `Your own ${thing} app`,
    body: `Your ${N} ${thing} as records, with a board and a table${actions[0] ? `, kept current with ${q(actions[0].n)}` : ''}.`,
    ask: `Build me an app that keeps track of my ${N} ${thing}, with a board, a table and the numbers I check`,
    uses: actions[0] ? [actions[0].n] : [],
  });

  const hooks = triggers.filter(e => e.k === 'hook').length;
  const faqs: IntegrationPage['faqs'] = [];
  const tq = triggers.length
    ? { q: `What can start the work in ${N}?`, a: `Its triggers: ${list(triggers.slice(0, 6).map(e => q(e.n)))}${triggers.length > 6 ? ', and the rest listed above' : ''}.${hooks === triggers.length ? ' They are webhooks, so they fire as the event happens.' : hooks ? ' Some are webhooks that fire as the event happens; the others are checked on a schedule.' : ' They are checked on a schedule, not pushed as they happen.'}` }
    : null;
  if (tq) faqs.push(tq);
  if (actions.length) faqs.push({ q: `What can 50agents do in ${N}?`, a: `Its actions: ${list(actions.slice(0, 8).map(e => q(e.n)))}${actions.length > 8 ? ', and the rest listed above' : ''}. Anything that reaches people outside asks you first.` });
  if (partners.length) faqs.push({ q: `Which apps is ${N} most often paired with?`, a: `${list(partners.slice(0, 5).map(p => nameOf(p.slug)))}, in viaSocket’s recipes.` });

  const t = triggers.length, a = actions.length;
  const title = `AI agents, automations and apps for ${N}`.length <= 48 ? `AI agents, automations and apps for ${N} | 50agents` : `${N} automations and AI agents | 50agents`;
  return {
    slug: app.slug,
    query: `${N} integrations`,
    title: title.length <= 60 ? title : `${N} integrations | 50agents`,
    description: `Connect ${N} in 50agents and tell Captain the job: ${t || a ? `its real ${t ? 'triggers' : ''}${t && a ? ' and ' : ''}${a ? 'actions' : ''}` : 'what it can do'}${r0 ? ', and ready recipes you can build in one click' : ''}, from viaSocket’s catalog.`,
    h1: `AI agents, automations and apps for ${N}`,
    answer,
    ask,
    recipe: r0,
    build,
    kinds,
    groups: groupEvents(app.events).map(g => ({ label: g.label, events: [...g.triggers, ...g.actions].map(e => e.n) })),
    faqs,
    updated: catalog().read,
  };
}

/** The thing an app holds most, from its event names ("contacts", "orders"), for the app ask. */
function biggestThing(events: Event[]): string {
  const freq = new Map<string, number>();
  const STOP = /^(new|create|update|delete|get|find|search|list|add|send|when|the|and|for|with|from|all|by|in|on|of|to|a|an|is|id|or|updated|created|deleted|details|data|using|watch|trigger|ai)$/i;
  for (const e of events) for (const w of e.n.replace(/[_/]/g, ' ').toLowerCase().match(/[a-z]+/g) ?? []) if (w.length > 2 && !STOP.test(w)) freq.set(w, (freq.get(w) ?? 0) + 1);
  const w = [...freq.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  if (!w) return 'records';
  return w.endsWith('s') ? w : w.endsWith('y') && !/[aeiou]y$/.test(w) ? w.slice(0, -1) + 'ies' : w + 's';
}

/** A pair page's words: the h1, the two-sentence answer and the questions. */
export function pairWords(a: AppFile, b: AppFile, recipes: Recipe[]) {
  const A = a.name, B = b.name;
  const fromA = recipes.filter(r => r.ta === a.slug), fromB = recipes.filter(r => r.ta === b.slug);
  const r0 = recipes[0];
  const starts = [...new Set(recipes.map(r => r.te))];
  const answer: [string, string] = [
    `To connect ${A} and ${B}, say the recipe to Captain in plain words: ${recipeClause(r0, nameOf)}.`,
    `${A} and ${B} recipes start from ${list(starts.slice(0, 3).map(q))}${fromA.length && fromB.length ? `, in both apps` : ` in ${nameOf(r0.ta)}`}, and each one is an automation you approve.`,
  ];
  const faqs: { q: string; a: string }[] = [
    { q: `What can start a ${A} and ${B} automation?`, a: `${list(starts.slice(0, 5).map(q))}${starts.length > 5 ? ', and the others in the recipes above' : ''}.` },
  ];
  const common = partnersOf(a).filter(x => x.slug !== b.slug && partnersOf(b).some(y => y.slug === x.slug)).slice(0, 5).map(x => nameOf(x.slug));
  if (common.length) faqs.push({ q: `Which other apps work with both ${A} and ${B}?`, a: `${list(common)}. Each one has recipes with ${A} and with ${B}, so a third app can join the same job.` });
  return { h1: `${A} and ${B} automations`, answer, faqs };
}
