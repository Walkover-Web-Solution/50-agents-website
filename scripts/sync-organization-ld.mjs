/**
 * Keeps homepage Organization JSON-LD in public/landing/index.html aligned with
 * src/content/site/organization-ld.json (read.json-ld-quality). Run via prebuild.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const orgPath = path.join(root, 'src/content/site/organization-ld.json');
const indexPath = path.join(root, 'public/landing/index.html');

const org = JSON.parse(fs.readFileSync(orgPath, 'utf8'));
const index = fs.readFileSync(indexPath, 'utf8');

const marker = 'type="application/ld+json">';
const start = index.indexOf(marker);
if (start === -1) {
  console.error('sync-organization-ld: missing JSON-LD script in index.html');
  process.exit(1);
}
const jsonStart = start + marker.length;
const jsonEnd = index.indexOf('</script>', jsonStart);
if (jsonEnd === -1) {
  console.error('sync-organization-ld: unclosed JSON-LD script');
  process.exit(1);
}

let graph;
try {
  const block = JSON.parse(index.slice(jsonStart, jsonEnd));
  graph = block['@graph'];
  if (!Array.isArray(graph) || graph[0]?.['@type'] !== 'Organization') {
    throw new Error('expected @graph[0] Organization');
  }
} catch (e) {
  console.error('sync-organization-ld: cannot parse homepage JSON-LD:', e.message);
  process.exit(1);
}

graph[0] = { ...org };
const next = {
  '@context': 'https://schema.org',
  '@graph': graph,
};
const embedded = `${index.slice(0, jsonStart)}${JSON.stringify(next)}${index.slice(jsonEnd)}`;
fs.writeFileSync(indexPath, embedded);
console.log('sync-organization-ld: updated Organization in public/landing/index.html');