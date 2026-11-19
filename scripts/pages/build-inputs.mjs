// Builds the input bundle for each row (row + catalog events for its apps + product facts), one file per page in inputs/.
// The generator sends a bundle to Claude; without an API key, a Claude Code session can run the same prompt on it.
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('scripts/pages/rows-use-cases.json', 'utf8'));
const facts = fs.readFileSync('scripts/pages/product-facts.md', 'utf8');
const only = process.argv[2];
for (const row of rows) {
  if (only && row.slug !== only) continue;
  const catalog = row.apps.map(s => {
    const a = JSON.parse(fs.readFileSync(`src/content/integrations/catalog/apps/${s}.json`, 'utf8'));
    return { slug: a.slug, name: a.name, events: a.events.map(e => ({ name: e.n, type: e.t, about: e.d })) };
  });
  fs.writeFileSync(`scripts/pages/inputs/${row.slug}.json`, JSON.stringify({ row, catalog, facts }, null, 1));
}
console.log('inputs written');
