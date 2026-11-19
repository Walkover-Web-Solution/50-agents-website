// postinstall: makes next-on-pages run scripts/after-vercel-build.mjs right after its own `vercel build`, so the
// Cloudflare Pages build strips the pre-rendered pages' extra files whichever command it runs: `pnpm build:pages` or
// the Next.js preset `npx @cloudflare/next-on-pages@1` (both use this installed copy). A plain string edit rather than
// a pnpm patch, so it works with every pnpm and npm version (a pnpm patch changes the lockfile, which pnpm 9 rejects).
// Idempotent; fails the install loudly if next-on-pages changes and the anchor is gone.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const MARK = '50agents: after-vercel-build';
let file;
try {
  file = path.join(path.dirname(createRequire(import.meta.url).resolve('@cloudflare/next-on-pages/package.json')), 'dist', 'index.js');
} catch {
  file = path.join('node_modules', '@cloudflare', 'next-on-pages', 'dist', 'index.js');
}
if (!fs.existsSync(file)) { console.log('patch-next-on-pages: next-on-pages not installed, skipped'); process.exit(0); }
const src = fs.readFileSync(file, 'utf8');
if (src.includes(MARK)) { console.log('patch-next-on-pages: already patched'); process.exit(0); }
const anchor = '  await runVercelBuild(pm, tempVercelConfig?.additionalArgs);\n';
if (src.split(anchor).length !== 2) throw new Error(`patch-next-on-pages: anchor not found in ${file}`);
const hook = `  // ${MARK}
  if (await validateFile("scripts/after-vercel-build.mjs")) {
    cliLog("Running scripts/after-vercel-build.mjs...");
    (0, import_child_process2.execFileSync)(process.execPath, ["scripts/after-vercel-build.mjs"], { stdio: "inherit" });
  }
`;
fs.writeFileSync(file, src.replace(anchor, anchor + hook));
console.log('patch-next-on-pages: patched', file);
