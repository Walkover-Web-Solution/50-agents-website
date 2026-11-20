/**
 * Write one SVG per crew face under public/crew/ so the server HTML does not repeat inline SVG (Axien read.page-structure).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const facesPath = path.join(root, 'src/site/faces.ts');
const outDir = path.join(root, 'public/crew');
const src = fs.readFileSync(facesPath, 'utf8');
const re = /"([a-z]+)":\s*"((?:\\.|[^"\\])*)"/g;
const faces = {};
let m;
while ((m = re.exec(src))) {
  faces[m[1]] = m[2].replace(/\\"/g, '"');
}
if (!Object.keys(faces).length) {
  console.error('sync-crew-svgs: no faces found in src/site/faces.ts');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
for (const [id, svg] of Object.entries(faces)) {
  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg);
}
console.log(`sync-crew-svgs: wrote ${Object.keys(faces).length} files to public/crew/`);