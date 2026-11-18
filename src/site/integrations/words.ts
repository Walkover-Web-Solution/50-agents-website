// The words of a generated integration or pair page, built only from that page's catalog data (pages-brief B8, D7):
// real app, trigger and action names, real counts. Nothing here describes an app beyond what its own data says.
import type { Kind } from '@/site/types';
import { actionPhrase, catalog, nameOf, partnersOf, readDate, recipeAsk, recipeClause, topRecipes, triggerPhrase, type AppFile, type Event, type Recipe } from './data';

const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const q = (s: string) => `“${s.replace(/_/g, ' ')}”`;
const READ_ORDER = /^(search|find|get|list|lookup|retrieve|fetch)/i;

export function appWords(app: AppFile) {
  const N = app.name;
  const triggers = app.events.filter(e => e.t === 'trigger');
  const actions = app.events.filter(e => e.t === 'action');
  const recipes = topRecipes(app);
  const partners = partnersOf(app);
  const first = recipes[0];
  const withTop = partners[0] ? recipes.find(r => r.ta === partners[0].slug || r.aa === partners[0].slug) : undefined;
  const read = readDate(catalog().read);

  const answer: [string, string] = [
    triggers.length && actions.length
      ? `In 50agents you connect ${N} and tell Captain the job: it can start work when ${triggerPhrase(triggers[0].n, N)} in ${N}${triggers[1] ? ` or when ${triggerPhrase(triggers[1].n, N)}` : ''}, and act with ${N}’s ${actions.length} action${actions.length > 1 ? 's' : ''}, such as ${q(actions[0].n)}.`
      : triggers.length
        ? `In 50agents you connect ${N} and tell Captain the job: ${N} starts work when ${triggerPhrase(triggers[0].n, N)}${triggers[1] ? ` or when ${triggerPhrase(triggers[1].n, N)}` : ''}, and the steps run in your other apps.`
        : actions.length
          ? `In 50agents you connect ${N} and tell Captain the job: ${N} has no triggers in viaSocket’s catalog, so it runs as a step, with actions such as ${list(actions.slice(0, 2).map(e => q(e.n)))}.`
          : `${N} is in viaSocket’s catalog, but no triggers or actions were listed for it when we read it on ${read}.`,
    first
      ? `In the catalog’s recipes it pairs with apps such as ${list(partners.slice(0, 3).map(p => nameOf(p.slug)))}, for example: ${recipeClause(withTop ?? first, nameOf)}.`
      : `No ready-made recipes list ${N} yet, so describe the job to Captain in your own words and it plans the steps for you to approve.`,
  ];

  const kinds: { kind: Kind; does: string; ask: string }[] = [];
  // Automation: the top recipe, or the app's first trigger or action.
  if (first) {
    kinds.push({ kind: 'auto', does: `Fixed steps on every event. For example, when ${triggerPhrase(first.te, nameOf(first.ta))} in ${nameOf(first.ta)}, it runs ${q(first.ae)} in ${nameOf(first.aa)}, the same way every time.`, ask: recipeAsk(first, nameOf) });
  } else if (triggers[0]) {
    kinds.push({ kind: 'auto', does: `Fixed steps each time ${q(triggers[0].n)} happens in ${N}: Captain plans the steps in your other apps for you to approve.`, ask: `Set up an automation: when ${triggerPhrase(triggers[0].n, N)} in ${N}, send me an email with the details` });
  } else if (actions[0]) {
    kinds.push({ kind: 'auto', does: `${N} has no triggers in the catalog, so an automation uses it as a step: an event in another app or a schedule starts it, then it runs ${q(actions[0].n)} in ${N}.`, ask: `Set up an automation: every Monday at 9:00, ${actionPhrase(actions[0].n, N)} in ${N} and email me the result` });
  }
  // AI agent: the app's actions as its tools, reading ones first.
  if (actions.length) {
    const tools = [...actions].sort((x, y) => Number(READ_ORDER.test(y.n)) - Number(READ_ORDER.test(x.n))).slice(0, 3);
    kinds.push({
      kind: 'ai',
      does: `An AI agent gets ${N}’s actions as its tools (${actions.length > 3 ? `${tools.map(e => q(e.n)).join(', ')} and ${actions.length - 3} more` : list(tools.map(e => q(e.n)))}) and decides on each run which to call, from the instructions you give it. Anything it sends to people outside waits for your yes.`,
      ask: `Set up an AI agent with ${N} connected that can ${list(tools.map(e => actionPhrase(e.n, N)))} when I ask in its chat`,
    });
  }
  // Browser agent: honest about when it is needed.
  kinds.push({
    kind: 'browser',
    does: actions.length + triggers.length
      ? `A browser agent is for websites with no app to connect. ${N} is connected through viaSocket with ${triggers.length + actions.length} triggers and actions, so you need one only for what those don’t reach${app.domain ? `, such as public pages on ${app.domain}` : ''}.`
      : `A browser agent works on websites with no app to connect, so it can read ${N}’s public pages${app.domain ? ` on ${app.domain}` : ''} while the catalog lists no actions for it.`,
    ask: `Set up a browser agent that checks the public pages on ${app.domain || N} that I name every Monday at 9:00 and tells me what changed`,
  });
  // App: your own records, with a crew that can use the app.
  const thing = biggestThing(app.events);
  kinds.push({
    kind: 'app',
    does: `An app gives you your own records and screens, a board, a table and numbers, with a crew of AI agents. A crew member can use ${N}${actions[0] ? `’s actions, such as ${q(actions[0].n)},` : ''} to bring records in or act on them.`,
    ask: `Build me an app that keeps track of my ${N} ${thing}, with a board, a table and the numbers I check`,
  });

  const hooks = triggers.filter(e => e.k === 'hook').length;
  const faqs: { q: string; a: string }[] = [];
  faqs.push(triggers.length
    ? { q: `What can start an automation or AI agent in ${N}?`, a: `${triggers.length} trigger${triggers.length > 1 ? 's' : ''}: ${list(triggers.slice(0, 6).map(e => q(e.n)))}${triggers.length > 6 ? `, and ${triggers.length - 6} more listed above` : ''}.${hooks === triggers.length ? ' All of them are webhooks, so they fire as the event happens.' : hooks ? ` ${hooks} of them are webhooks that fire as the event happens; the others are checked by polling.` : ' They are checked by polling, not pushed by webhook.'}` }
    : { q: `Can something in ${N} start an automation?`, a: `Not today. viaSocket’s catalog lists no triggers for ${N} (read ${read}), so ${N} works as a step that another app’s event, a schedule or your request starts.` });
  if (actions.length) faqs.push({ q: `What can 50agents do in ${N}?`, a: `${actions.length} action${actions.length > 1 ? 's' : ''}: ${list(actions.slice(0, 8).map(e => q(e.n)))}${actions.length > 8 ? `, and ${actions.length - 8} more listed above` : ''}. Captain uses only these, and anything that reaches people outside asks you first.` });
  if (partners.length) faqs.push({ q: `Which apps is ${N} most often paired with?`, a: `In the recipes we read on ${read}: ${list(partners.slice(0, 5).map(p => `${nameOf(p.slug)} (${p.n})`))}. Each pairing has its own page with every recipe.` });
  faqs.push({ q: `What does it cost to use ${N} with 50agents?`, a: 'Every workspace starts free with 2,000 credits, and $1 buys 1,000 more.' });

  return { answer, kinds, faqs };
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

export function pairWords(a: AppFile, b: AppFile, recipes: Recipe[]) {
  const A = a.name, B = b.name;
  const read = readDate(catalog().read);
  const fromA = recipes.filter(r => r.ta === a.slug), fromB = recipes.filter(r => r.ta === b.slug);
  const r0 = recipes[0];
  const answer: [string, string] = [
    `To connect ${A} and ${B} in 50agents, tell Captain the recipe in plain words, such as: ${recipeClause(r0, nameOf)}.`,
    `viaSocket’s catalog lists ${recipes.length} recipe${recipes.length > 1 ? 's' : ''} between them (read ${read})${fromB.length && fromA.length ? `, ${fromA.length} starting in ${A} and ${fromB.length} starting in ${B}` : `, all starting in ${nameOf(r0.ta)}`}, and Captain builds each as an automation you approve.`,
  ];
  const aActs = a.events.filter(e => e.t === 'action'), bActs = b.events.filter(e => e.t === 'action');
  const pick = (xs: Event[]) => [...xs].sort((x, y) => Number(READ_ORDER.test(y.n)) - Number(READ_ORDER.test(x.n)))[0];
  const ra = pick(aActs), rb = pick(bActs);
  const agent = ra && rb
    ? { does: `An AI agent can hold both connections at once and decide on each run what to do: ${q(ra.n)} in ${A}, then ${q(rb.n)} in ${B}, or the other way round, from the instructions you give it.`, ask: `Set up an AI agent with ${A} and ${B} connected that can ${actionPhrase(ra.n, A)} in ${A} and ${actionPhrase(rb.n, B)} in ${B} when I ask in its chat` }
    : null;
  const teA = [...new Set(recipes.map(r => r.te))];
  const faqs = [
    { q: `What can start a ${A} and ${B} automation?`, a: `${list(teA.slice(0, 5).map(q))}${teA.length > 5 ? `, and ${teA.length - 5} more` : ''}, as listed in the recipes above.` },
    { q: `Can it run both ways between ${A} and ${B}?`, a: fromA.length && fromB.length ? `Yes. ${fromA.length} recipe${fromA.length > 1 ? 's start' : ' starts'} in ${A} and ${fromB.length} in ${B}.` : `The catalog’s recipes run one way, from ${nameOf(r0.ta)} to ${nameOf(r0.aa)}. ${nameOf(r0.aa)}’s own triggers are on its page if you need the reverse.` },
    { q: `Does anything go out without my approval?`, a: 'No. Captain shows the plan before it builds, and anything that sends to people outside your workspace, spends money or changes access asks you first in Needs you.' },
  ];
  return { answer, agent, faqs };
}
