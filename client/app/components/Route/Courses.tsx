import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { useGetALLCoursesQuery } from '@/redux/features/courses/courseApis';
import CourseCard from '../Course/CourseCard';

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetALLCoursesQuery({});
  const [courses, setCourses] = useState<any>([]);

  console.log(courses)
  useEffect(() => {
    if (data) {
      setCourses(data?.courses);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-[90%] 800px:w-[80%] m-auto`}>
          <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
            Expand Your Career
          </h1>
          <span className="text-gradient dark:text-white text-black">
            Opportunity With our courses
          </span>
          <br />
          <br />
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
