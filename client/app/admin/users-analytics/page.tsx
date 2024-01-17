'use client'
import React, {FC } from 'react'
import Heading from '../../utils/Heading'
import DashboardHeader from '../../components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import UsersAnalytics from '@/app/components/Admin/Users/UsersAnalytics'


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
            <UsersAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page