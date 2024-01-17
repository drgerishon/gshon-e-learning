'use client'
import React, {FC } from 'react'
import Heading from '../../../app/utils/Heading'
import DashboardHeader from '../../../app/components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import CourseAnalytics from '@/app/components/Admin/course/CourseAnalytics'
import OrdersAnalytics from '@/app/components/Admin/orders/OrdersAnalytics'


type Props = {}

const page:FC<Props> = (props) => {
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
            <DashboardHeader />
            <OrdersAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page