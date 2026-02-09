'use client';

import { useTheme, type ThemeMode } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
    }
  };

  const themes: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border-medium)] bg-[var(--background)] hover:bg-[var(--background-gray-light)] transition-colors"
        aria-label="Toggle theme"
      >
        {getIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg border border-[var(--border-medium)] bg-[var(--background)] shadow-lg overflow-hidden z-50">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                theme === themeOption.value
                  ? 'bg-[var(--primary-color)] text-white'
                  : 'text-[var(--foreground)] hover:bg-[var(--background-gray-light)]'
              }`}
            >
              {themeOption.icon}
              <span>{themeOption.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
