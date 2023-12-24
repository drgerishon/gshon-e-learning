'use client'
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/profile/Profile';
import { useSelector } from 'react-redux';

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');
  const {user} =useSelector((state:any) => state.auth)
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile`}
          keywords="Elearning"
          description="MERN, REACT, NEXT, NODE"
        />
        <Header
          open={open}
          activeItem={activeItem}
          setOpen={setOpen}
          setRoute={setRoute}
          route={route}
        />

        <Profile />
      </Protected>
    </div>
  );
};

export default Page;
