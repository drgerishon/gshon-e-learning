'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiSunLine, RiMoonFill } from 'react-icons/ri';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="bg-slate-100 p-2 rounded-xl"
    >
      {theme && theme === 'dark' ? (
        <RiSunLine size={25} className="text-slate-900" />
      ) : (
        <RiMoonFill size={25} className="text-slate-900" />
      )}
    </button>
   
  );
};
