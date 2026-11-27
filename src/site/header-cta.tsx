import { headers } from 'next/headers';
import { headerLoginUrl } from '@/lib/build-login-url';

export async function HeaderCta() {
  const h = await headers();
  const path = h.get('x-pathname') || '/';
  return (
    <a href={headerLoginUrl(path)} className="btn sm" data-cta="site:header" data-50a-cta="" rel="nofollow">
      Get started
    </a>
  );
}