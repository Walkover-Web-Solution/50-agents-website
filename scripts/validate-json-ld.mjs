/**
 * Axien read.json-ld-quality: Organization on / needs name, url, logo, 2+ sameAs, contactPoint.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const orgPath = path.join(root, 'src/content/site/organization-ld.json');
const indexPath = path.join(root, 'public/landing/index.html');

const expected = JSON.parse(fs.readFileSync(orgPath, 'utf8'));
const index = fs.readFileSync(indexPath, 'utf8');
const marker = 'type="application/ld+json">';
const jsonStart = index.indexOf(marker) + marker.length;
const jsonEnd = index.indexOf('</script>', jsonStart);
const block = JSON.parse(index.slice(jsonStart, jsonEnd));
const org = block['@graph']?.[0];

function fail(msg) {
  console.error(`validate-json-ld: ${msg}`);
  process.exit(1);
}

if (!org || org['@type'] !== 'Organization') fail('homepage @graph[0] must be Organization');
for (const key of ['name', 'url', 'logo']) {
  if (!org[key]) fail(`Organization missing ${key}`);
}
// sameAs is left out until 50agents has profiles of its own (Search, S15); the parents are in parentOrganization.
if (org.sameAs) fail('Organization sameAs must be 50agents\'s own profiles; it has none yet (S15)');
if (org.parentOrganization?.name !== 'viaSocket') fail('Organization needs parentOrganization viaSocket');
const cp = org.contactPoint;
const hasContact =
  (Array.isArray(cp) && cp.some(p => p?.email || p?.telephone)) ||
  org.email ||
  org.telephone;
if (!hasContact) fail('Organization needs contactPoint or email/telephone');

if (JSON.stringify(org) !== JSON.stringify(expected)) {
  fail('homepage Organization does not match src/content/site/organization-ld.json (run prebuild)');
}

console.log('validate-json-ld: OK');