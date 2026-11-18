// Facts gate for the flagship integration pages: every event name they cite exists in that app's catalog snapshot.
// Run: node scripts/check-integrations.mjs
import fs from 'node:fs';
import path from 'node:path';
const dir = path.join(process.cwd(), 'src/content/integrations');
let bad = 0;
for (const f of fs.readdirSync(path.join(dir, 'flagships')).filter(f => f.endsWith('.ts') && f !== 'index.ts')) {
  const src = fs.readFileSync(path.join(dir, 'flagships', f), 'utf8');
  const slug = src.match(/slug: '([^']+)'/)[1];
  const app = JSON.parse(fs.readFileSync(path.join(dir, 'catalog/apps', `${slug}.json`), 'utf8'));
  const names = new Set(app.events.map(e => e.n));
  const cited = [...src.matchAll(/(?:events|uses): \[([^\]]*)\]/g)].flatMap(m => [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'|"([^"]*)"/g)].map(x => (x[1] ?? x[2]).replace(/\\'/g, "'")));
  const missing = cited.filter(n => !names.has(n));
  const grouped = new Set([...src.matchAll(/events: \[([^\]]*)\]/g)].flatMap(m => [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'|"([^"]*)"/g)].map(x => (x[1] ?? x[2]).replace(/\\'/g, "'"))));
  const ungrouped = [...names].filter(n => !grouped.has(n));
  const banned = src.match(/—|–|\b(unlock|unleash|seamless|effortless|leverage|robust|elevate|empower|supercharge|game-changer|revolutioni[sz]e|cutting-edge|delve|harness|streamline|synergy|journey|landscape|realm|tapestry)\w*/gi) ?? [];
  console.log(`${slug}: ${cited.length} cited, ${missing.length} missing ${missing.join(' | ')}; not in a group: ${ungrouped.join(' | ') || 'none'}; banned: ${banned.join(', ') || 'none'}`);
  bad += missing.length + banned.length;
}
process.exit(bad ? 1 : 0);
