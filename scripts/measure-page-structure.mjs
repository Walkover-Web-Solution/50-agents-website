/**
 * Approximate Axien read.page-structure: H1, H1–H3 count >= 3, visible text / HTML >= 5%.
 * Strips script, style, noscript, svg before text extraction.
 */
function stripForText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gis, '')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gis, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gis, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function measure(html, path) {
  const total = Buffer.byteLength(html, 'utf8');
  const text = stripForText(html);
  const textLen = Buffer.byteLength(text, 'utf8');
  const ratio = total ? (textLen / total) * 100 : 0;
  const noScript = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gis, '');
  const h1 = (noScript.match(/<h1\b/gi) ?? []).length;
  const h13 = (noScript.match(/<h[1-3]\b/gi) ?? []).length;
  const pass = h1 >= 1 && h13 >= 3 && ratio >= 5;
  return { path, h1, h13, ratio: +ratio.toFixed(2), textLen, total, pass };
}

const UA = process.env.AXIEN_UA ?? 'Axien/0.1.0 (agent-readiness scanner; https://axien.embarko.app)';

async function fetchHtml(base, path) {
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: 'text/html', 'User-Agent': UA },
    redirect: 'follow',
  });
  return res.text();
}

const base = process.argv[2] ?? 'http://127.0.0.1:3000';
const paths = process.argv.slice(3).length ? process.argv.slice(3) : [
  '/',
  '/pricing',
  '/use-cases',
  '/guides',
  '/about',
  '/contact',
  '/support',
  '/integrations',
  '/ai-agents',
];

let fail = 0;
for (const path of paths) {
  const html = await fetchHtml(base, path);
  const m = measure(html, path);
  if (!m.pass) {
    fail++;
    console.log('FAIL', JSON.stringify(m));
  } else console.log('PASS', path, `h1=${m.h1} h13=${m.h13} ratio=${m.ratio}%`);
}
console.log(`\n${fail} of ${paths.length} failed`);