import { useGetSingleCourseQuery } from '@/redux/features/courses/courseApis';
import React, { useState } from 'react';
import Loader from '../Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer/Footer';
import CourseDetails from './CourseDetails'

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleCourseQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course.name + ' - ELearning'}
            description={
              'Elearning is a programming community which is developed by Gerishon fro helping programmers with excellent coding resourses and lessons'
            }
            keywords={data?.course?.tags}
          />
          <Header 
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={1}
          
          />
          <CourseDetails 
          data={data.course}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
