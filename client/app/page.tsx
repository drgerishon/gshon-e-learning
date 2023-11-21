'use client';
import React, { useState, FC } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Hero';

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <>
      <div>
        <Heading
          title="Gshon E-Learning"
          keywords="Elearning"
          description="MERN, REACT, NEXT, NODE"
        />
        <Header open={open} activeItem={activeItem} setOpen={setOpen} />
      <Hero />
      </div>
    </>
  );
};

export default Page;
