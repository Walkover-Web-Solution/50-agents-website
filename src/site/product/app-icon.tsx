// An app's icon and name from viaSocket's catalog snapshot (content/use-cases/catalog.ts), as the app draws them.
import { AppLogo } from '../parts';
import { CATALOG, type CatalogApp } from '@/content/use-cases/catalog';

export const appName = (slug: string) => CATALOG[slug as CatalogApp]?.name ?? slug;
export function AppIcon({ app, size = 16 }: { app: string; size?: number }) {
  const c = CATALOG[app as CatalogApp];
  return <AppLogo app={app} icon={c?.icon} size={size} />;
}
export function AppChip({ app }: { app: string }) {
  return <span className="uc-appchip"><AppIcon app={app} size={14} />{appName(app)}</span>;
}
