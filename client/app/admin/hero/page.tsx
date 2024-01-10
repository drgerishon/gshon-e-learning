'use client';
import EditHero from '@/app/components/Admin/Cutomization/EditHero';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
      <Heading
        title="Gshon E-Learning"
        keywords="Elearning"
        description="MERN, REACT, NEXT, NODE"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHero />
            <EditHero />
        </div>
      </div>
      </AdminProtected>
    </div>
  );
};

export default page;
