'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
    { label: 'AI agents', path: '/ai-agents' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-light backdrop-blur-xl border-b border-light z-50 transition-all duration-300 hover:bg-gray-100 hover:backdrop-blur-2xl">
      <div className="container">
        <div className="flex items-center justify-between h-16 py-2">
          {/* Logo/Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <img src="/50_agents_logo.png" alt="50Agents" className="h-10 w-auto mr-3" />
            <span className="text-xl font-medium text-black tracking-tight">50Agents</span>
          </div>

          {/* Right Side - Navigation + Login Button */}
          <div className="flex items-center space-x-4">
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

            {isLoggedIn ? (
              <button
                onClick={handleDashboardClick}
                className="btn btn-primary transition-all duration-300 hover:scale-105"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="btn btn-primary transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
