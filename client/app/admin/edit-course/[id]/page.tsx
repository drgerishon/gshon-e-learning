'use client'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import CreateCourse from '@/app/components/Admin/course/CreateCourse'
import EditCourse from '@/app/components/Admin/course/EditCourse'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import Heading from '@/app/utils/Heading'
import React, {FC } from 'react'


type Props = {}

const page:FC<Props> = ({params}:any) => {
  const id= params?.id
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
            <EditCourse id={id}/>
        </div>
      </div>
    </div>
  )
}

export default page