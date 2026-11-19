// The paths of this family's pages that exist (read by src/site/routes.ts). The family's builder owns this file.
import { TERMS } from './index';
export const PATHS: string[] = ['/learn', ...TERMS.map(t => `/learn/${t.slug}`)];
