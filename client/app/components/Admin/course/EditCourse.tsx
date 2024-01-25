'use client';
import React, { useEffect, useState, FC } from 'react';
import {  useEditCourseMutation, useGetALLCoursesQuery } from '@/redux/features/courses/courseApis';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import CourseInformation from './CourseInformation';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import CourseOptions from './CourseOptions';

type Props = {
    id: string;
};

const EditCourse:FC<Props> = ({id}) => {

    const [editCourse, {isSuccess, error}] = useEditCourseMutation()
  
    const {data, refetch} = useGetALLCoursesQuery({},{refetchOnMountOrArgChange:true})
  
    const editCourseData = data && data.courses.find((i:any) => i._id === id)
    console.log(editCourseData);

    useEffect(() => {
        if(isSuccess) {
            toast.success("Course Updated Successfully")
            redirect('/admin/courses');
        }
        if(error) {
            if("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [error, isSuccess])

    const [active, setActive] = useState(0);

    useEffect(() => {
        if(editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData.thumbnail.url,
            })

            setBenefits(editCourseData.benefits)
            setPrerequisites(editCourseData.prerequisites)
            setCourseContentData(editCourseData.courseData)
        }
    },[editCourseData])

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });
  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
    },
  ]);
  const [courseData, setCourseData] = useState({});
console.log(courseData)

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    //formet benefits array
    const formatedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //formet prerequisites array
    const formatedPrerequsites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    //formet course content data

    const formatedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );
    //prepare our data object,
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formatedBenefits,
      prerequisites: formatedPrerequsites,
      courseData: formatedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:editCourseData?._id, data})
   
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%] ml-10">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            setPrerequisites={setPrerequisites}
            prerequisites={prerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive}/>
      </div>
    </div>
  );
};

export default EditCourse