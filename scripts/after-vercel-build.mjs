// The step between Vercel's build and next-on-pages' conversion, for the Cloudflare Pages build.
//
// next-on-pages runs it itself, through a pnpm patch (patches/@cloudflare__next-on-pages.patch): right after its
// `vercel build`, it runs this file. So the Pages build command can be `pnpm build:pages` or the preset
// `npx @cloudflare/next-on-pages@1`; both use the installed, patched next-on-pages and both get this step.
//
// Next 16 writes, for every pre-rendered page, the HTML plus an .rsc payload and about seven per-segment prefetch files
// (.segments/). The site has no client-side navigation (no next/link, no router pushes: every link is a full page load),
// so browsers never ask for them. Left in, they make about 22,000 pre-rendered routes for 2,257 pages, over Cloudflare
// Pages' 20,000-file cap, and next-on-pages runs out of memory converting them. So they are removed before conversion.
//
// 1. remove the .rsc payloads and .segments of pre-rendered pages from .vercel/output/functions;
// 2. drop the traced file list (filePathMap) from Node functions' .vc-config.json. Only Vercel deploys those files;
//    on Cloudflare a Node function is only the container of its pre-rendered pages. next-on-pages copies the config into
//    every pre-rendered route's entry of its build log, and 2,182 copies of a 250 KB list overflow a string;
// 3. take out the pre-rendered route handlers (sitemaps, index.md: a .prerender-fallback.body, not .html), which
//    next-on-pages silently drops (they 404), and write each body as a static file at its path, so the conversion
//    lists it among the static assets the worker serves.
import fs from 'node:fs';
import path from 'node:path';

const VERCEL = '.vercel';

const FUNCS = path.join(VERCEL, 'output', 'functions');
let removed = 0;
function prune(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    // A pre-rendered page's segments directory, or its .rsc entry (the .func link, config and fallback payload).
    // Only pre-rendered ones: an .rsc entry is removed only when its page has a pre-rendered fallback.
    if (e.isDirectory() && !e.isSymbolicLink() && e.name.endsWith('.segments')) {
      fs.rmSync(p, { recursive: true, force: true }); removed++; continue;
    }
    const m = e.name.match(/^(.*)\.rsc\.(func|prerender-config\.json|prerender-fallback\.rsc)$/);
    if (m && fs.existsSync(path.join(dir, `${m[1]}.prerender-config.json`))) { fs.rmSync(p, { recursive: true, force: true }); removed++; continue; }
    if (e.isDirectory() && !e.isSymbolicLink() && !e.name.endsWith('.func')) prune(p);
  }
}
prune(FUNCS);
console.log(`after-vercel-build: removed ${removed} RSC and segment prefetch entries of pre-rendered pages`);

let slimmed = 0;
(function slim(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isSymbolicLink()) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name.endsWith('.func')) {
      const f = path.join(p, '.vc-config.json');
      if (!fs.existsSync(f)) continue;
      const c = JSON.parse(fs.readFileSync(f, 'utf8'));
      if (c.runtime !== 'edge' && c.filePathMap) { delete c.filePathMap; fs.writeFileSync(f, JSON.stringify(c, null, 2)); slimmed++; }
    } else if (e.isDirectory()) slim(p);
  }
})(FUNCS);
console.log(`after-vercel-build: dropped the traced file list from ${slimmed} Node functions`);

const bodies = [];
(function collect(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !e.isSymbolicLink() && !e.name.endsWith('.func')) { collect(p); continue; }
    const m = e.name.match(/^(.*)\.prerender-config\.json$/);
    if (!m) continue;
    const c = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!c.fallback?.fsPath?.endsWith('.prerender-fallback.body')) continue;
    const route = path.relative(FUNCS, path.join(dir, m[1]));
    const out = path.join(VERCEL, 'output', 'static', route);
    if (fs.existsSync(out)) throw new Error(`after-vercel-build: ${route} already exists in the static output`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.copyFileSync(path.join(dir, c.fallback.fsPath), out);
    bodies.push(route);
    for (const x of [`${m[1]}.func`, `${m[1]}.rsc.func`, e.name, c.fallback.fsPath]) fs.rmSync(path.join(dir, x), { recursive: true, force: true });
  }
})(FUNCS);


console.log(`after-vercel-build: wrote ${bodies.length} pre-rendered route handlers as static files: ${bodies.map(b => '/' + b).join(', ')}`);
