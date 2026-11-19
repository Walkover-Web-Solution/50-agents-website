/**
 * Postbuild: lightweight HTML for agent probes (Axien read.page-structure).
 * Strips scripts/styles/SVG from fetched pages; integrations uses a compact app list.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
const EXCLUDED = new Set(['50agents']);
const ALIASES = { 'you-need-a-budget': 'ynab', 'more-good-reviews': 'moregoodreviews' };
const canon = (raw) => {
  const l = raw.toLowerCase();
  return ALIASES[l] ?? l;
};
const dropped = (raw) => EXCLUDED.has(raw.toLowerCase()) || raw.toLowerCase() in ALIASES;

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public/agent-snapshots');
const PORT = Number(process.env.AGENT_SNAPSHOT_PORT || 3765);
const BASE = `http://127.0.0.1:${PORT}`;
const UA = 'Axien/0.1.0 (agent-readiness scanner; https://axien.embarko.app)';

const PATHS = [
  '/pricing',
  '/use-cases',
  '/guides',
  '/about',
  '/contact',
  '/support',
  '/ai-agents',
  '/automations',
  '/browser-agents',
  '/apps',
];

function stripAgentHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gis, '')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gis, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gis, '')
    .replace(/\s{2,}/g, ' ');
}

function outFile(pathname) {
  const slug = pathname.slice(1).replace(/\//g, '_');
  return path.join(OUT, `${slug}.html`);
}

function buildIntegrationsCompact() {
  const index = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/content/integrations/catalog/index.json'), 'utf8'),
  );
  const apps = index.apps
    .filter((a) => !dropped(a.s))
    .map((a) => ({ s: canon(a.s), n: a.n }))
    .sort((a, b) => a.n.localeCompare(b.n));
  const lines = apps.map((a) => `<li><a href="/integrations/${a.s}">${a.n}</a></li>`);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Integrations | 50agents</title></head><body>
<h1>Every app 50agents works with</h1>
<p>50agents works with 2,300+ apps through viaSocket. Each link goes to that app&rsquo;s triggers, actions and templates.</p>
<h2>All apps</h2>
<h3>Browse by name</h3>
<ul>${lines.join('')}</ul>
</body></html>`;
}

async function waitReady(child, ms = 180000) {
  const t0 = Date.now();
  let sawReady = false;
  child.stdout?.on('data', (buf) => {
    if (String(buf).includes('Ready')) sawReady = true;
  });
  child.stderr?.on('data', (buf) => {
    if (String(buf).includes('Ready')) sawReady = true;
  });
  while (Date.now() - t0 < ms) {
    if (child.exitCode !== null) break;
    try {
      const r = await fetch(`${BASE}/pricing`, { signal: AbortSignal.timeout(5000) });
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (child.exitCode !== null) {
    throw new Error(`build-agent-snapshots: next start exited ${child.exitCode}`);
  }
  throw new Error(
    `build-agent-snapshots: next start did not become ready (sawReady=${sawReady})`,
  );
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const nextBin = path.join(ROOT, 'node_modules/next/dist/bin/next');
  const child = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'production' },
  });
  try {
    await waitReady(child);
    for (const p of PATHS) {
      const res = await fetch(`${BASE}${p}`, {
        headers: { Accept: 'text/html', 'User-Agent': '50agents-snapshot-build/1.0' },
      });
      if (!res.ok) throw new Error(`${p} answered ${res.status}`);
      let html = stripAgentHtml(await res.text());
      fs.writeFileSync(outFile(p), html, 'utf8');
      console.log('build-agent-snapshots:', p, '→', Buffer.byteLength(html, 'utf8'), 'bytes');
    }
    const ig = buildIntegrationsCompact();
    fs.writeFileSync(outFile('/integrations'), ig, 'utf8');
    console.log('build-agent-snapshots: /integrations (compact)', Buffer.byteLength(ig, 'utf8'), 'bytes');
  } finally {
    child.kill('SIGTERM');
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});