// The apps section of this builder's pages (hubs, role pages), the use case page's pattern (D254): "Works with <apps> and
// 2,300+ apps" over two marquee rows of logos, the page's own apps first, then its category (or the best-connected apps).
import { AppLogo } from '../parts';
import { appIcon, appName, appsIn, topApps } from '../usecase/apps-data';

export function AppsWall({ apps, category, named = 3 }: { apps: string[]; category?: string; named?: number }) {
  const own = apps.map(a => ({ s: a, n: appName(a), i: appIcon(a) ?? '' }));
  const cat = category ? appsIn(category, 24, apps) : [];
  const fill = topApps(40, [...apps, ...cat.map(a => a.s)]);
  const rest = [...cat, ...fill];
  const rowA = [...own, ...rest.slice(0, Math.max(0, 18 - own.length))];
  const rowB = rest.slice(Math.max(0, 18 - own.length), Math.max(0, 18 - own.length) + 18);
  const names = apps.slice(0, named).map(appName);
  return (
    <section className="sec" id="apps">
      <div className="wrap sec-h c"><h2>Works with {names.length ? names.join(', ') + ' and ' : ''}2,300+ apps</h2></div>
      <div className="uc3-wall" aria-label="Apps 50agents works with">
        {[rowA, rowB].map((row, n) => (
          <div key={n} className={n ? 'uc3-wall-row rev' : 'uc3-wall-row'}>
            {[...row, ...row].map((a, i) => (
              <span key={a.s + i} className="uc3-tile" title={a.n} aria-hidden={i >= row.length ? 'true' : undefined}><AppLogo app={a.s} icon={a.i} size={34} eager /><span className="sr">{a.n}</span></span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
