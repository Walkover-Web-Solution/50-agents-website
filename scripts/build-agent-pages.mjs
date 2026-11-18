#!/usr/bin/env node
/**
 * Lean static HTML for footer Product URLs (Axien read.page-structure).
 * Embedded in App Router route handlers (force-static) — no Next.js RSC payload.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'public/agent-pages');
const tsOutDir = path.join(root, 'src/lib/agent-page-html');

const SITE = 'https://50agents.com';
const SIGNUP = 'https://50agents-app.embarko.app/login?utm_source=50agents.com&utm_medium=website';

const PAGES = [
  {
    file: 'pricing.html',
    path: '/pricing',
    title: 'Pricing — 50agents',
    h1: 'Affordable pricing for agents and automations',
    lede:
      'Simple, usage-based credits. Every workspace starts free so you can run real automations before you commit.',
    sections: [
      {
        h2: 'Plans and usage-based credits',
        ps: [
          'Meeting recording is billed by the hour. Agent calls and automations draw from the same credit balance after the included starter allowance.',
          'There are no hidden platform fees for connecting apps through viaSocket. You approve anything that spends money or reaches customers.',
        ],
        subs: [
          {
            h3: 'AI Note Taker',
            p: 'Pay per recorded hour with no monthly minimum. Structured notes and follow-ups sync to the tools you already use.',
          },
          {
            h3: 'Internal application agents',
            p: 'The first thousand agent calls each month are included for testing internal workflows. Standard metering applies beyond that.',
          },
          {
            h3: 'Starter credits',
            p: 'New workspaces receive free credits to connect apps, deploy templates, and tune approval rules before scaling.',
          },
        ],
      },
      {
        h2: 'How Captain fits pricing',
        ps: [
          'Captain builds automations, AI agents, browser agents and apps in one workspace. You describe outcomes in plain language; usage meters only what actually runs.',
          'Visit the home page for the current product story, or create a workspace and see live credit use in the dashboard.',
        ],
      },
    ],
  },
  {
    file: 'templates.html',
    path: '/templates',
    title: 'Agent templates — 50agents',
    h1: 'Agent templates',
    lede: 'Ready-made automations and AI agents you can deploy, then adapt with Captain.',
    sections: [
      {
        h2: 'Example templates',
        ps: ['Each template lists connected apps, triggers and actions so you know the shape of the work before you deploy it.'],
        subs: [
          { h3: 'Lead follow-up', p: 'Captures leads, scores them with AI and schedules CRM outreach.' },
          { h3: 'Invoice reminder', p: 'Watches accounting for overdue invoices and nudges customers on email or chat.' },
          { h3: 'Meeting notes', p: 'Joins calls, writes structured notes and posts action items to Slack.' },
          { h3: 'Order sync', p: 'Moves orders from messaging apps into your ledger and confirms stock.' },
          { h3: 'Support triage', p: 'Drafts replies from help docs and escalates exceptions to a human.' },
          { h3: 'Weekly digest', p: 'Pulls metrics from dashboards and emails a Monday summary.' },
        ],
      },
      {
        h2: 'Using templates in your workspace',
        ps: [
          'When you pick a template, Captain copies the structure into your org, swaps in your connections and asks approval on outbound messages.',
          'If nothing matches, describe the job on the home page and Captain can combine automations, custom apps and browser agents in one flow.',
        ],
      },
    ],
  },
  {
    file: 'ai-agents.html',
    path: '/ai-agents',
    title: 'AI agents by app — 50agents',
    h1: 'AI agents for thousands of connected apps',
    lede: 'Browse public agent templates grouped by the apps they connect to through viaSocket.',
    sections: [
      {
        h2: 'Browse by integration',
        ps: [
          'Each card is a starting point: triggers, steps and optional AI judgement you can deploy in your workspace.',
          'Search and category filters help you find the right app quickly when the live catalog is open in your browser.',
        ],
        subs: [
          { h3: 'Gmail', p: 'Triage inboxes, draft replies and route exceptions for human approval.' },
          { h3: 'Slack', p: 'Post updates, summarize threads and run slash-command workflows.' },
          { h3: 'Shopify', p: 'Sync orders, flag inventory issues and notify fulfilment channels.' },
          { h3: 'QuickBooks', p: 'Match payments, chase overdue invoices and export weekly summaries.' },
          { h3: 'Google Sheets', p: 'Append rows, reconcile imports and share dashboards with stakeholders.' },
          { h3: 'WhatsApp', p: 'Confirm orders, send status updates and collect structured replies.' },
        ],
      },
      {
        h2: 'Deploying an agent',
        ps: [
          'After sign-in, Captain connects your accounts, logs each run and respects the approval rules you set for spending and customer contact.',
          'Agents complement automations for repeat work and browser agents for sites without APIs.',
        ],
      },
    ],
  },
  {
    file: 'work-management.html',
    path: '/work-management',
    title: 'Work management — 50agents',
    h1: 'Work management for modern teams',
    lede: 'Plan, track and finish projects with AI that handles routine execution steps.',
    sections: [
      {
        h2: 'One home for plans and execution',
        ps: [
          'Teams map how work should flow, then let agents and automations handle recurring steps while people approve exceptions.',
          'Custom views and categories keep everyone aligned without copying updates between tools.',
        ],
        subs: [
          { h3: 'Plans and boards', p: 'Organize work by initiative, owner and deadline with filters everyone shares.' },
          { h3: 'AI execution', p: 'Agents draft status updates, move cards and remind owners when dates slip.' },
          { h3: 'Connected stack', p: 'Triggers in Slack, email, accounting or CRM fire from the same workspace.' },
        ],
      },
      {
        h2: 'Work.50agents.com',
        ps: [
          'The dedicated work product extends this overview with boards, views and automations tuned for daily operations.',
          'Sign in with the same account you use for automations and meeting agents.',
        ],
      },
    ],
  },
  {
    file: 'ai-note-taker.html',
    path: '/ai-note-taker',
    title: 'AI meeting recorder — 50agents',
    h1: 'AI meeting recorder and note taker',
    lede: 'Capture decisions and follow-ups without retyping notes into every tool.',
    sections: [
      {
        h2: 'What it does',
        ps: [
          'The AI Note Taker joins meetings you choose, writes structured notes and surfaces action items for your team.',
          'It is one capability inside 50agents alongside order-to-cash flows, browser agents and custom apps.',
        ],
        subs: [
          { h3: 'Structured output', p: 'Summaries include decisions, owners and due dates formatted for Slack, email or CRM.' },
          { h3: 'Privacy and control', p: 'You choose which calendars are in scope. Outbound messages can wait for approval.' },
          { h3: 'Pricing', p: 'Recording is metered by the hour with no long-term commitment.' },
        ],
      },
      {
        h2: 'Getting started',
        ps: [
          'Connect your calendar after sign-in, select the meetings to record and route notes to the channels your team already monitors.',
        ],
      },
    ],
  },
];

function renderPage(page) {
  const sectionHtml = page.sections
    .map((sec) => {
      const subs = (sec.subs || [])
        .map((s) => `      <h3>${s.h3}</h3>\n      <p>${s.p}</p>`)
        .join('\n');
      const ps = sec.ps.map((p) => `      <p>${p}</p>`).join('\n');
      return `    <section>
      <h2>${sec.h2}</h2>
${ps}
${subs}
    </section>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.lede}">
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${SITE}${page.path}">
<link rel="stylesheet" href="/agent-pages.css">
</head>
<body>
<header>
  <a href="/">50agents</a>
</header>
<main>
  <h1>${page.h1}</h1>
  <p class="lede">${page.lede}</p>
${sectionHtml}
  <a class="cta" href="${SIGNUP}">Get started free</a>
</main>
<footer>
  <p>50agents — apps, AI agents and automations from viaSocket.</p>
  <nav>
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
    <a href="/templates">Templates</a>
    <a href="/ai-agents">AI Agents</a>
    <a href="/work-management">Work management</a>
    <a href="/ai-note-taker">AI meeting recorder</a>
  </nav>
</footer>
</body>
</html>`;
}

function textRatio(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return (text.length / html.length) * 100;
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tsOutDir, { recursive: true });
const cssSrc = path.join(root, 'public/agent-pages/agent-pages.css');
const cssDst = path.join(root, 'public/agent-pages.css');
if (fs.existsSync(cssSrc)) fs.copyFileSync(cssSrc, cssDst);

for (const page of PAGES) {
  const html = renderPage(page);
  const outPath = path.join(outDir, page.file);
  fs.writeFileSync(outPath, html, 'utf8');
  const tsName = page.file.replace('.html', '.ts');
  const escaped = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  fs.writeFileSync(
    path.join(tsOutDir, tsName),
    `// Generated by scripts/build-agent-pages.mjs — do not edit.\nexport const html = \`${escaped}\`;\n`,
    'utf8'
  );
  const h1 = (html.match(/<h1\b/gi) || []).length;
  const h2 = (html.match(/<h2\b/gi) || []).length;
  const h3 = (html.match(/<h3\b/gi) || []).length;
  const ratio = textRatio(html);
  if (h1 < 1 || h2 < 1 || h3 < 1 || ratio < 10) {
    console.error(`build-agent-pages: ${page.file} failed structure h1=${h1} h2=${h2} h3=${h3} ratio=${ratio.toFixed(1)}%`);
    process.exit(1);
  }
  console.log(`build-agent-pages: ${page.file} (${html.length} bytes, ~${ratio.toFixed(1)}% text)`);
}