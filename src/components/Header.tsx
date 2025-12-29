'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const navItems = [
    { label: 'Templates', path: '/templates' },
    { label: 'AI agents', path: '/ai-agents' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-xl border-b border-light z-50 transition-all duration-300">
      <div className="container">
        <div className="flex items-center justify-between h-16 py-2 px-8">
          {/* Logo/Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <Image src="/50_agents_logo.png" alt="50Agents" className="h-10 w-auto mr-3" width={40} height={40} />
          </div>

          {/* Right Side - Navigation + Login Button */}

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${pathname.startsWith(item.path) ? 'text-black font-semibold bg-gray-300/80 scale-105' : 'text-gray-dark hover:!text-black hover:!bg-gray-300/80 hover:backdrop-blur-md hover:scale-105'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.open("https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio?hl=en-GB&utm_source=meeting-configure", "_blank")}
              className="btn btn-outline">
              <Image src="/assets/img/chrome-icon.png" alt="Chrome Icon" className="mr-2" width={24} height={24} />
              Chrome Extension
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleDashboardClick}
                className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-3">Go to Dashboard</span>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
