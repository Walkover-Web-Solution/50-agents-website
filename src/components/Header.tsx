'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import SignupLink from './SignupLink';

// Same as the home page's header (D167): the wordmark and one button. Get started opens the new app's login, which serves new and returning people.
const Header = () => {
  // inner pages name the page, e.g. header-pricing; the home page's own header is plain 'header'
  const page = (usePathname() || '/').split('/')[1] || 'home';
  return (
  <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'color-mix(in srgb, var(--page) 86%, transparent)', backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)', borderBottom: '1px solid var(--line)' }}>
    <div className="container flex items-center justify-between gap-6" style={{ height: 64 }}>
      <Link href="/" className="no-underline" aria-label="50agents home"><Logo size={22} /></Link>
      <SignupLink button={`header-${page}`} className="btn btn-primary whitespace-nowrap no-underline">Get started</SignupLink>
    </div>
  </header>
  );
};

export default Header;
