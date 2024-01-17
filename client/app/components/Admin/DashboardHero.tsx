'use client';
import React, { FC, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import { AiFillAlipaySquare } from 'react-icons/ai';
import DashboardWidgets from './Widget/DashboardWidgets';

type Props = {
  isDashboard?:boolean
};

const DashboardHero: FC<Props> = ({isDashboard}:Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen}/>
      {isDashboard && (
        <DashboardWidgets open={open} />
      )}
    </div>
  );
};

export default DashboardHero;
