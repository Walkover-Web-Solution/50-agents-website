'use client';

import { useEffect, useState } from 'react';
import { APP_LOGIN, signupUrl } from '@/lib/app';

// A Get started link to the new app, tagged with the button's UTMs once the page knows the visitor's version.
export default function SignupLink({ button, cta, className, style, children }: { button: string; cta?: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const [href, setHref] = useState(APP_LOGIN);
  useEffect(() => { setHref(signupUrl(button)); }, [button]);
  return <a href={href} className={className} style={style} data-cta={cta}>{children}</a>;
}
