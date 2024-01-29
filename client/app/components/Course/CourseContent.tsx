import { useGetCourseContentQuery } from '@/redux/features/courses/courseApis';
import React, { useState } from 'react';
import Loader from '../Loader';
import Header from '../Header';
import Heading from '@/app/utils/Heading';
import CourseContentList from './CourseContentList';
import CourseContentMedia from './CourseContentMedia'

type Props = {
  id: any;
  user?: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading } = useGetCourseContentQuery(id);

  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);

  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-full grid 800px:grid-cols-10 overflow-hidden mr-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
            {/* <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
              /> */}
            </div>
            <div className="hidden 800px:block 800px:col-span-2">
              <CourseContentList
                data={data}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
