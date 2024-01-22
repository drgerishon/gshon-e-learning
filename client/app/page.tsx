'use client';
import React, { useState, FC } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Route/Hero';
import Courses from './components/Route/Courses';
import Reviews from './components/Route/Reviews';
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login")

  return (
    <div>
      <Heading
        title="Gshon E-Learning"
        keywords="Elearning"
        description="MERN, REACT, NEXT, NODE"
      />
      <Header open={open} 
      activeItem={activeItem} 
      setOpen={setOpen} 
      setRoute={setRoute}
      route={route}
      
      />

      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
