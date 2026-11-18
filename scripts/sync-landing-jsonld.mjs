/**
 * Writes public/landing/home-jsonld.json into public/landing/index.html.
 */
import fs from 'node:fs';
import path from 'node:path';

const landingDir = path.join(process.cwd(), 'public/landing');
const graphPath = path.join(landingDir, 'home-jsonld.json');
const indexPath = path.join(landingDir, 'index.html');

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const payload = JSON.stringify(graph);

let index = fs.readFileSync(indexPath, 'utf8');
const open = '<script data-cfasync="false" type="application/ld+json">';
const close = '</script>';
const start = index.indexOf(open);
if (start === -1) {
  console.error('sync-landing-jsonld: missing JSON-LD script opener in index.html');
  process.exit(1);
}
const contentStart = start + open.length;
const end = index.indexOf(close, contentStart);
if (end === -1) {
  console.error('sync-landing-jsonld: missing JSON-LD script close in index.html');
  process.exit(1);
}

index = `${index.slice(0, contentStart)}${payload}${index.slice(end)}`;
fs.writeFileSync(indexPath, index);
console.log('sync-landing-jsonld: updated public/landing/index.html from home-jsonld.json');