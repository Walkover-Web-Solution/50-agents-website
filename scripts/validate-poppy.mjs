/**
 * Axien find.poppy checks for /.well-known/poppy.json (Personal Agent Protocol 1.0).
 */
import fs from 'node:fs';
import path from 'node:path';

const poppyPath = path.join(process.cwd(), 'public/.well-known/poppy.json');
let doc;
try {
  doc = JSON.parse(fs.readFileSync(poppyPath, 'utf8'));
} catch (e) {
  console.error('validate-poppy: invalid or missing poppy.json:', e.message);
  process.exit(1);
}

if (doc.protocol_version !== '1.0') {
  console.error('validate-poppy: protocol_version must be "1.0"');
  process.exit(1);
}

const org = doc.organization;
if (!org?.name || org.domain !== '50agents.com') {
  console.error('validate-poppy: organization needs name and domain 50agents.com');
  process.exit(1);
}

const hasChannel =
  (Array.isArray(doc.apis) && doc.apis.length > 0) ||
  doc.web ||
  doc.agent?.protocols?.length;
if (!hasChannel) {
  console.error('validate-poppy: need agent, apis, or web channel');
  process.exit(1);
}

if (Array.isArray(doc.apis)) {
  for (const api of doc.apis) {
    if (!api.type || !api.url?.startsWith('https://50agents.com') || !api.description) {
      console.error('validate-poppy: each api needs type, HTTPS url on domain, description');
      process.exit(1);
    }
  }
}

if (org.logo_uri && !org.logo_uri.startsWith('https://50agents.com')) {
  console.error('validate-poppy: logo_uri must be HTTPS on domain');
  process.exit(1);
}

console.log('validate-poppy: OK (Poppy 1.0)');