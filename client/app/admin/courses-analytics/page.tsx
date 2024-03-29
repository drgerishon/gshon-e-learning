'use client';
import React, { FC, useState } from 'react';
import Heading from '../../../app/utils/Heading';
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import CourseAnalytics from '@/app/components/Admin/course/CourseAnalytics';


type Props = {
  setOpen:any;
}

const page:FC<Props>= ({setOpen}) => {
  return (
    <div>setOpen
      <Heading
        title="Gshon E-Learning"
        keywords="Elearning"
        description="MERN, REACT, NEXT, NODE"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-[1/5]">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader setOpen={setOpen} />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
}

export default page