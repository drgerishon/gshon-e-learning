'use client'
import React, {FC } from 'react'
import Heading from '../../utils/Heading'
import DashboardHeader from '../../components/Admin/DashboardHeader'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import UsersAnalytics from '@/app/components/Admin/Users/UsersAnalytics'


type Props = {
  setOpen:any;
}

const page:FC<Props> = ({setOpen}) => {
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
            <DashboardHeader setOpen={setOpen}/>
            <UsersAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page