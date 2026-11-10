'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

// Same as the home page's header (D167): the wordmark and one button. No page links; the home page is the site.
// Signed-in visitors (proxy_auth_token, set by the app) get their dashboard instead of the sign-up.
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { setLoggedIn(!!localStorage.getItem('proxy_auth_token')); }, []);
  const app = process.env.NEXT_PUBLIC_INTERNAL_URL || '';
  const cta = loggedIn ? { label: 'Go to dashboard', href: `${app}/org` } : { label: 'Get started', href: `${app}/login` };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'color-mix(in srgb, var(--page) 86%, transparent)', backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)', borderBottom: '1px solid var(--line)' }}>
      <div className="container flex items-center justify-between gap-6" style={{ height: 64 }}>
        <Link href="/" className="no-underline" aria-label="50agents home"><Logo size={22} /></Link>
        <a href={cta.href} className="btn btn-primary whitespace-nowrap no-underline">{cta.label}</a>
      </div>
    </header>
  );
};

export default Header;
