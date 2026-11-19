/**
 * Axien act.mcp-current-protocol: public /mcp must advertise 2026-07-28 via server/discover.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const httpPath = path.join(root, 'src/lib/mcp-http.ts');
const cardPath = path.join(root, 'src/lib/mcp-server-card.ts');

const REQUIRED = '2026-07-28';

function assertIncludes(file, text, label) {
  if (!text.includes(REQUIRED)) {
    console.error(`validate-mcp-protocol: ${label} must include ${REQUIRED}`);
    process.exit(1);
  }
}

let httpSrc;
let cardSrc;
try {
  httpSrc = fs.readFileSync(httpPath, 'utf8');
  cardSrc = fs.readFileSync(cardPath, 'utf8');
} catch (e) {
  console.error('validate-mcp-protocol: cannot read MCP sources:', e.message);
  process.exit(1);
}

if (!httpSrc.includes("case 'server/discover'")) {
  console.error('validate-mcp-protocol: mcp-http.ts must handle server/discover');
  process.exit(1);
}

assertIncludes(httpPath, httpSrc, 'mcp-http.ts');
assertIncludes(cardPath, cardSrc, 'mcp-server-card.ts');

console.log('validate-mcp-protocol: OK');