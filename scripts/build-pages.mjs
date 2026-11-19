// pnpm build:pages: the Cloudflare Pages build with the pinned vercel (47.0.4). next-on-pages run under pnpm fetches the
// latest vercel instead, so this runs the steps itself: vercel build, scripts/after-vercel-build.mjs, then the
// conversion. The preset `npx @cloudflare/next-on-pages@1` gets the same steps through scripts/patch-next-on-pages.mjs.
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
if (!fs.existsSync('.vercel/project.json')) {
  fs.mkdirSync('.vercel', { recursive: true });
  fs.writeFileSync('.vercel/project.json', JSON.stringify({ projectId: '_', orgId: '_', settings: { framework: 'nextjs' } }));
}
run('pnpm exec vercel build');
run('node scripts/after-vercel-build.mjs');
run('pnpm exec next-on-pages --skip-build');
