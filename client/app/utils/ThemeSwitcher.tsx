'use client';
import React, { useState, useEffect, FC } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useTheme } from 'next-themes';

type Props = {};

const ThemeSwitcher: FC<Props> = (props) => {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme}= useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === 'light' ? (
        <BiMoon
          size={25}
          className="cursor-pointer"
          fill="black"
          onClick={() => setTheme('dark')}
        />
      ) : (
        <BiSun 
        size={25}
        className="cursor-pointer"
        onClick={() => setTheme('light')}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
