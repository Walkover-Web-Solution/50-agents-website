// The Cloudflare Pages build (pnpm build:pages): next-on-pages, with one step between Vercel's build and the conversion.
//
// Next 16 writes, for every pre-rendered page, the HTML plus an .rsc payload and about seven per-segment prefetch files
// (.segments/). The site has no client-side navigation (no next/link, no router pushes: every link is a full page load),
// so browsers never ask for them. Left in, they make about 22,000 pre-rendered routes for 2,257 pages, over Cloudflare
// Pages' 20,000-file cap, and next-on-pages runs out of memory converting them. So they are removed before conversion.
//
// 1. .vercel/project.json, as next-on-pages writes it when missing;
// 2. vercel build (the pinned devDependency, the version next-on-pages supports);
// 3. remove the .rsc payloads and .segments of pre-rendered pages from .vercel/output/functions;
// 4. drop the traced file list (filePathMap) from Node functions' .vc-config.json. Only Vercel deploys those files;
//    on Cloudflare a Node function is only the container of its pre-rendered pages. next-on-pages copies the config into
//    every pre-rendered route's entry of its build log, and 2,182 copies of a 250 KB list overflow a string;
// 5. next-on-pages --skip-build converts the rest into .vercel/output/static.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
const VERCEL = '.vercel';
if (!fs.existsSync(path.join(VERCEL, 'project.json'))) {
  fs.mkdirSync(VERCEL, { recursive: true });
  fs.writeFileSync(path.join(VERCEL, 'project.json'), JSON.stringify({ projectId: '_', orgId: '_', settings: { framework: 'nextjs' } }));
}

run('pnpm exec vercel build');

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
console.log(`build-pages: removed ${removed} RSC and segment prefetch entries of pre-rendered pages`);

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
console.log(`build-pages: dropped the traced file list from ${slimmed} Node functions`);

run('pnpm exec next-on-pages --skip-build');
