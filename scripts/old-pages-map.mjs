// Writes src/content/integrations/old-map.json: every catalog app's old slug (lowercased) -> its integration page slug.
// The middleware uses it to 308 old /ai-agents/<slug> and /services/<slug> pages in one hop (Jii, 19 Nov, S21 and S22).
// Rerun after each catalog snapshot.
import fs from 'node:fs';
const EXCLUDED = new Set(['50agents']);
const ALIASES = { 'you-need-a-budget': 'ynab', 'more-good-reviews': 'moregoodreviews' };
const canon = raw => { const l = raw.toLowerCase(); return ALIASES[l] ?? l; };
const { apps } = JSON.parse(fs.readFileSync('src/content/integrations/catalog/index.json', 'utf8'));
const map = {};
for (const a of apps) {
  const l = a.s.toLowerCase();
  if (EXCLUDED.has(l)) continue;
  map[l] = canon(a.s);
  map[l.replace(/_/g, '-')] ??= canon(a.s); // old URLs sometimes used hyphens for underscores
}
// Old slugs that named a catalog app (or its sub-product) differently. Without these they 301 to the /integrations hub.
// Found in Search Console, 27 Nov (seo/research/old-urls, S47): each target checked live, 200 and indexable.
const OLD_SLUGS = {
  'hubspot-chatbot-builder': 'hubspot',
  'linkedin-ads': 'linkedin-campaign-manager',
  'google-apps-script': 'google-appscript',
  'craft': 'craft-docs',
  'pushalert-web-push-notifications': 'pushalert',
  'd3-js': 'd3js',
  'sitespeak': 'sitespeakai',
  'quora-lead-gen-forms': 'quora-ads',
  'heystream-testing': 'heystream',
  'pinterest-lead-ads': 'pinterest',
  'doclift-pdf': 'docliftpdf',
};
for (const [from, to] of Object.entries(OLD_SLUGS)) {
  if (!Object.values(map).includes(to)) throw new Error(`OLD_SLUGS target not in catalog: ${to}`);
  map[from] ??= to;
}
fs.writeFileSync('src/content/integrations/old-map.json', JSON.stringify(map));
console.log(Object.keys(map).length, 'old slugs mapped');
