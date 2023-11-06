'use client';
import { useTheme } from 'next-themes';
import React, { FC, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { RiSunLine, RiMoonFill } from 'react-icons/ri';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';

const NavItems = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Courses',
    url: '/courses',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'FAQ',
    url: '/faq',
  },
];
type Props = {};

const Navbar: FC<Props> = (props) => {

    
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme === 'system' ? 'light' : resolvedTheme;
  const [navbar, setNavbar] = useState(false);
  return (
    <header className="w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow bg-white dark:bg-stone-900 dark:border-b dark:border-stone-600">
    <div className="justify-between md:items-center md:flex">
      <div>
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <ScrollLink to="home">
            <div className="container cursor-pointer flex items-center space-x-2">
            <h2 className={`text-2xl font-bold dark:text-neutral-100 text-neutral-900}`}>Gshon E-Learning</h2>
            </div>
          </ScrollLink>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
          </div>
        </div>
      </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {NavItems.map((item, index) => (
                <ScrollLink key={index} to={item.url}
                className={
                  "block cursor-pointer lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-neutral-100"
                }   activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => setNavbar(!navbar)}>{item.name}</ScrollLink>
              ))}
              <ThemeSwitcher/>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
