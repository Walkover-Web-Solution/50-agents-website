/**
 * Builds public/help/index.html with full text in the first HTML response (read.answers-in-html).
 * Serves at /help via next.config beforeFiles rewrite when the request reaches this app.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentPath = path.join(root, 'src/content/help-hub.json');
const outDir = path.join(root, 'public/help');
const outPath = path.join(outDir, 'index.html');

const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const signup =
  'https://50agents-app.embarko.app/login?utm_source=50agents.com&utm_medium=website&utm_campaign=help&utm_content=help-hub';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const faqHtml = content.faqs
  .map(
    (f) =>
      `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
  )
  .join('\n');

const articlesHtml = content.articles
  .map(
    (a) =>
      `<li><a href="${esc(a.href)}"><strong>${esc(a.title)}</strong></a><p>${esc(a.summary)}</p></li>`
  )
  .join('\n');

const agentHtml = content.agentLinks
  .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
  .join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(content.title)}</title>
<meta name="description" content="${esc(content.intro)}">
<link rel="canonical" href="https://50agents.com/help">
<meta name="robots" content="noindex, follow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<style>
body{margin:0;background:#fff;color:#111214;font:17px/1.55 "Schibsted Grotesk",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding:48px 24px 80px}
h1{font-size:clamp(32px,5vw,44px);font-weight:500;letter-spacing:-.025em;margin:0 0 12px;line-height:1.08}
.lede{color:#4F535B;margin:0 0 32px;font-size:19px;line-height:1.5}
h2{font-size:22px;font-weight:600;margin:40px 0 16px}
.faq details{border-top:1px solid #E7E8EB;padding:14px 0}
.faq details:last-child{border-bottom:1px solid #E7E8EB}
.faq summary{cursor:pointer;font-weight:600}
.faq p{margin:10px 0 0;color:#4F535B}
ul.articles,ul.agent{list-style:none;margin:0;padding:0}
ul.articles li{padding:16px 0;border-top:1px solid #E7E8EB}
ul.articles p{margin:6px 0 0;color:#4F535B;font-size:15px}
ul.agent li{margin:8px 0}
a{color:#111214}
.cta{display:inline-block;margin-top:32px;background:#111214;color:#fff;font-weight:600;padding:14px 22px;border-radius:10px;text-decoration:none}
.nav{margin-bottom:24px;font-size:15px}
.nav a{color:#4F535B}
</style>
</head>
<body>
<main class="wrap">
<p class="nav"><a href="/">← 50agents home</a></p>
<h1>${esc(content.title)}</h1>
<p class="lede">${esc(content.intro)}</p>
<section class="faq" aria-labelledby="faq-h">
<h2 id="faq-h">Common questions</h2>
${faqHtml}
</section>
<section aria-labelledby="guides-h">
<h2 id="guides-h">Guides and policies</h2>
<ul class="articles">${articlesHtml}</ul>
</section>
<section aria-labelledby="agents-h">
<h2 id="agents-h">For AI agents</h2>
<ul class="agent">${agentHtml}</ul>
</section>
<p><a class="cta" href="${signup}">Get started free</a></p>
</main>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);

const textLen = html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ').trim().length;

if (textLen < 800) {
  console.error(`sync-help-hub: expected substantial visible text, got ${textLen} chars`);
  process.exit(1);
}
console.log(`sync-help-hub: wrote public/help/index.html (${textLen} visible text chars)`);