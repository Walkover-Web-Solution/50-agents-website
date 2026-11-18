/**
 * Inlines public/landing/sections.html into index.html so agents see answers
 * in the first HTML response (read.answers-in-html). Run via prebuild.
 */
import fs from 'node:fs';
import path from 'node:path';

const landingDir = path.join(process.cwd(), 'public/landing');
const indexPath = path.join(landingDir, 'index.html');
const sectionsPath = path.join(landingDir, 'sections.html');

const OPEN = '<div id="sections">';
const CLOSE = '</div>';

const index = fs.readFileSync(indexPath, 'utf8');
const sections = fs.readFileSync(sectionsPath, 'utf8').trim();

const start = index.indexOf(OPEN);
if (start === -1) {
  console.error('sync-landing-sections: missing #sections host in index.html');
  process.exit(1);
}
const afterOpen = start + OPEN.length;
const closeAt = index.indexOf(CLOSE, afterOpen);
if (closeAt === -1) {
  console.error('sync-landing-sections: missing closing #sections div');
  process.exit(1);
}

const embedded = `${index.slice(0, afterOpen)}\n${sections}\n${index.slice(closeAt)}`;
fs.writeFileSync(indexPath, embedded);
console.log('sync-landing-sections: inlined sections into public/landing/index.html');