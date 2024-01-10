'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import AllCourses from '@/app/components/Admin/course/AllCourses'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React, {FC} from 'react'

type Props = {}

const page:FC<Props> = (props) => {
  return (
    <div>
        <AdminProtected>
      <Heading
        title="Gshon E-Learning"
        keywords="Elearning"
        description="MERN, REACT, NEXT, NODE"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHero />
            <AllUsers />
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default page