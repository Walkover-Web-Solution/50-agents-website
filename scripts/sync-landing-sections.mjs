/**
 * Inlines public/landing/sections.html into index.html so agents see answers
 * in the first HTML response (read.answers-in-html). Run via prebuild.
 *
 * Idempotent: it replaces everything inside the #sections host, found by matching
 * <div> depth, so running it on every build never stacks copies (18 Nov fix: the
 * first version stopped at the first inner </div> and added a copy per build).
 */
import fs from 'node:fs';
import path from 'node:path';

const landingDir = path.join(process.cwd(), 'public/landing');
const indexPath = path.join(landingDir, 'index.html');
const sectionsPath = path.join(landingDir, 'sections.html');

const OPEN = '<div id="sections">';

const index = fs.readFileSync(indexPath, 'utf8');
const sections = fs.readFileSync(sectionsPath, 'utf8').trim();

const start = index.indexOf(OPEN);
if (start === -1) {
  console.error('sync-landing-sections: missing #sections host in index.html');
  process.exit(1);
}
const afterOpen = start + OPEN.length;

// find the </div> that closes the host: count nested <div ...> and </div> from just inside it
const tag = /<div\b[^>]*>|<\/div>/g;
tag.lastIndex = afterOpen;
let depth = 1;
let closeAt = -1;
for (let m; (m = tag.exec(index)); ) {
  depth += m[0] === '</div>' ? -1 : 1;
  if (depth === 0) { closeAt = m.index; break; }
}
if (closeAt === -1) {
  console.error('sync-landing-sections: missing closing #sections div');
  process.exit(1);
}

const embedded = `${index.slice(0, afterOpen)}\n${sections}\n${index.slice(closeAt)}`;
fs.writeFileSync(indexPath, embedded);
const copies = (embedded.match(/id="instead"/g) || []).length;
if (copies !== 1) {
  console.error(`sync-landing-sections: expected one copy of the sections, found ${copies}`);
  process.exit(1);
}
console.log('sync-landing-sections: inlined sections into public/landing/index.html');
