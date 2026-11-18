/**
 * Validates homepage JSON-LD (Axien read.json-ld-quality). Run in prebuild / CI.
 */
import fs from 'node:fs';
import path from 'node:path';

const graphPath = path.join(process.cwd(), 'public/landing/home-jsonld.json');
const raw = fs.readFileSync(graphPath, 'utf8');
let doc;
try {
  doc = JSON.parse(raw);
} catch (e) {
  console.error('validate-landing-jsonld: invalid JSON:', e.message);
  process.exit(1);
}

if (doc['@context'] !== 'https://schema.org') {
  console.error('validate-landing-jsonld: @context must be https://schema.org');
  process.exit(1);
}

const graph = doc['@graph'];
if (!Array.isArray(graph)) {
  console.error('validate-landing-jsonld: missing @graph array');
  process.exit(1);
}

const org = graph.find((n) => n && n['@type'] === 'Organization');
if (!org) {
  console.error('validate-landing-jsonld: no Organization node');
  process.exit(1);
}

for (const field of ['name', 'url', 'logo']) {
  if (typeof org[field] !== 'string' || !org[field].trim()) {
    console.error(`validate-landing-jsonld: Organization missing ${field}`);
    process.exit(1);
  }
}

if (!Array.isArray(org.sameAs) || org.sameAs.length < 2) {
  console.error('validate-landing-jsonld: Organization needs 2+ sameAs links');
  process.exit(1);
}

const cp = org.contactPoint;
if (!cp || typeof cp !== 'object') {
  console.error('validate-landing-jsonld: Organization missing contactPoint');
  process.exit(1);
}
if (!cp.email && !cp.telephone) {
  console.error('validate-landing-jsonld: contactPoint needs email or telephone');
  process.exit(1);
}

const landingPath = path.join(process.cwd(), 'public/landing/index.html');
const landing = fs.readFileSync(landingPath, 'utf8');
const marker = 'type="application/ld+json">';
const start = landing.indexOf(marker);
if (start === -1) {
  console.error('validate-landing-jsonld: index.html missing JSON-LD script');
  process.exit(1);
}
const jsonStart = start + marker.length;
const jsonEnd = landing.indexOf('</script>', jsonStart);
const embedded = landing.slice(jsonStart, jsonEnd).trim();
let live;
try {
  live = JSON.parse(embedded);
} catch {
  console.error('validate-landing-jsonld: index.html JSON-LD does not parse');
  process.exit(1);
}

if (JSON.stringify(live) !== JSON.stringify(doc)) {
  console.error(
    'validate-landing-jsonld: index.html JSON-LD is out of sync with home-jsonld.json (run sync-landing-jsonld.mjs)'
  );
  process.exit(1);
}

console.log('validate-landing-jsonld: OK (Organization + SoftwareApplication)');
