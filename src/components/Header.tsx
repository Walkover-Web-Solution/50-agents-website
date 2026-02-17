'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavItem {
  label: string;
  path: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('proxy_auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
  };

  const handleDashboardClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/org`);
  };

  const navItems: NavItem[] = [
    { label: 'AI Note Taker', path: '/ai-note-taker' },
    { label: 'Work Management', path: '/work-management' },
    { label: 'Templates', path: '/templates' },
    { label: 'AI agents', path: '/ai-agents' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-xl border-b border-light z-50 transition-all duration-300">
        <div className="container">
          <div className="flex items-center justify-between h-16 py-2 lg:px-8">
            {/* Logo/Brand */}
            <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
              <Image src="/50_agents_logo.png" alt="50Agents" className="h-10 w-auto mr-3" width={40} height={40} />
            </div>

            {/* Right Side - Navigation + Login Button */}

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              {navItems.map(item => {
                const isAiNoteTaker = item.path === '/ai-note-taker';
                const isHomePage = pathname === '/';
                const shouldAnimate = isAiNoteTaker && isHomePage;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`mx-4 p-1 text-md font-lg cursor-pointer text-nowrap relative transition-colors duration-300 ${shouldAnimate
                      ? 'animate-gradient-text font-semibold'
                      : pathname.startsWith(item.path)
                        ? 'font-semibold text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[var(--primary-color)] after:scale-x-100 after:origin-left'
                        : 'hover:!text-[var(--primary-color)] text-black relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[var(--primary-color)] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100'
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open("https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio?hl=en-GB&utm_source=meeting-configure", "_blank")}
                className="btn btn-outline !hidden lg:!flex">
                <Image src="/assets/img/chrome-icon.png" alt="Chrome Icon" className="mr-2" width={24} height={24} />
                <span className="text-nowrap">Chrome Extension</span>
              </button>

              {isLoggedIn ? (
                <button
                  onClick={handleDashboardClick}
                  className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-3 text-nowrap">Go to Dashboard</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-3">Login</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
                </button>
              )}

              {!isMenuOpen && <MenuIcon className="lg:!hidden cursor-pointer" onClick={() => setIsMenuOpen(true)} />}
            </div>
          </div>
        </div>
      </header>
      <div className="lg:hidden">
        {isMenuOpen && (
          <div className="fixed top-0 w-full h-screen right-0 z-50 bg-white">
            <div className="flex items-center justify-end p-4">
              <button className="p-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col px-4">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => window.open("https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio?hl=en-GB&utm_source=meeting-configure", "_blank")}
                className="btn btn-outline w-full mt-4">
                <Image src="/assets/img/chrome-icon.png" alt="Chrome Icon" className="mr-2" width={24} height={24} />
                Chrome Extension
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
