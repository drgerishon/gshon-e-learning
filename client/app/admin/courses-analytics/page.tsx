'use client'
import React, {FC, useState } from 'react'
import Heading from '../../../app/utils/Heading'
import DashboardHeader from '../../../app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import CourseAnalytics from '@/app/components/Admin/course/CourseAnalytics'


type Props = {}

const Page:FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
       <Heading
        title="Gshon E-Learning"
        keywords="Elearning"
        description="MERN, REACT, NEXT, NODE"
      />
      <div className='flex'>
        <div className='1500px:w-[16%] w-[1/5]'>
            <AdminSidebar />
        </div>
        <div className='w-[85%]'>
            <DashboardHeader open={open} setOpen={setOpen} />
            <CourseAnalytics />
        </div>
      </div>
    </div>
  )
}

export default Page