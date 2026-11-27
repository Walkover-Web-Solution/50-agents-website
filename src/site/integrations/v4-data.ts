import fs from 'node:fs';
import path from 'node:path';
import type { IntegrationV4 } from './v4-types';

const DIR = path.join(process.cwd(), 'src/content/integrations/v4');

/** The upgraded page for an app, when one is written. */
export function loadV4(slug: string): IntegrationV4 | null {
  const f = path.join(DIR, `${slug}.json`);
  return fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, 'utf8')) as IntegrationV4) : null;
}

/** Every app with an upgraded page, for the markdown twins and llms.txt. */
export function v4Slugs(): string[] {
  return fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')).sort() : [];
}
