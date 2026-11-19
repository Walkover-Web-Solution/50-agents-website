// Module hooks so a build script can import the site's TypeScript data modules (src/site/integrations/data.ts) with
// Node's own type stripping: '@/...' resolves to src/, extensionless paths try .ts, and JSON imports load as modules.
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SRC = new URL('../../src/', import.meta.url);

export async function resolve(specifier, context, next) {
  let spec = specifier;
  if (spec.startsWith('@/')) spec = new URL(spec.slice(2), SRC).href;
  if ((spec.startsWith('file:') || spec.startsWith('.')) && !/\.[a-z]+$/i.test(spec)) {
    const base = new URL(spec, context.parentURL);
    for (const ext of ['.ts', '.tsx', '/index.ts']) {
      const f = fileURLToPath(base) + ext;
      if (fs.existsSync(f)) return next(pathToFileURL(f).href, context);
    }
  }
  return next(spec, context);
}

export async function load(url, context, next) {
  if (url.endsWith('.json')) {
    return { format: 'module', source: `export default ${fs.readFileSync(fileURLToPath(url), 'utf8')};`, shortCircuit: true };
  }
  if (url.endsWith('.ts') || url.endsWith('.tsx')) return next(url, { ...context, format: 'module-typescript' });
  return next(url, context);
}
