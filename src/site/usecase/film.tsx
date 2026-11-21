import { Face } from '../parts';
import { buildLoginUrl } from '@/lib/build-login-url';

type Link = { page: string; place: string; campaign: string };

// Captain's chat box: the ask is in the server HTML (sr + film-live) so crawlers read it; public/site/film.js runs the typing animation.
export function PromptFilm({ ask, asks, button, link }: { ask: string; asks?: string[]; button?: React.ReactNode; link?: Link; children?: React.ReactNode }) {
  const list = asks && asks.length > 1 ? asks : [ask];
  const longest = list.reduce((a, b) => (b.length > a.length ? b : a), '');
  const btn = list.length > 1 && link
    ? (
      <a
        className="btn"
        href={buildLoginUrl(link.page, link.place, link.campaign, list[0])}
        data-cta={`${link.page}:${link.place}`}
        data-film-ask=""
        data-50a-cta=""
        rel="nofollow"
      >
        Build it
      </a>
    )
    : button;
  return (
    <div className="film is-idle" data-film data-asks={JSON.stringify(list)}>
      <span className="film-captain" aria-hidden="true"><Face id="lead" size={44} /></span>
      <div className="film-box">
        <p className="film-text">
          <span className="sr">{list.join(' · ')}</span>
          <span className="film-size" aria-hidden="true">{longest}</span>
          <span className="film-live" aria-hidden="true">{list[0]}<i className="caret" /></span>
        </p>
        {btn}
      </div>
    </div>
  );
}