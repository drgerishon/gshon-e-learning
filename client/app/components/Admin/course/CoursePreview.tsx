import React, { FC } from 'react';
import CoursePlayer from '../../../utils/CoursePlayer';
import { styles } from '@/app/styles/style';
import Ratings from '../../../utils/Ratings';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  handleCourseCreate,
  courseData,
  setActive,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountedPercenatgePrice = discountPercentage.toFixed(0);

  const createCourse = () => {
    handleCourseCreate();
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] dark:text-white text-black">
            {courseData?.price === 0
              ? 'free'
              : courseData?.estimatedPrice + 'ksh'}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 dark:text-white text-black">
            {courseData?.estimatedPrice}Ksh
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] dark:text-white text-black">
            {discountedPercenatgePrice}% OFF
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price} ksh
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Dicount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1 dark:text-white text-black">Source code included</p>
        <p className="pb-1 dark:text-white text-black">Full lifetime access</p>
        <p className="pb-1 dark:text-white text-black">
          Certificate of completion
        </p>
        <p className="pb-3 dark:text-white text-black 800px:pb-1">
          Premium support
        </p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1>{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3 ">
            <div className="flex items-center dark:text-white text-black">
              <Ratings rating={0} />
              <h5 className="dark:text-white text-black">0 reviews</h5>
            </div>
            <h5 className="dark:text-white text-black">0 students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
            What you will learn from this course
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div key={index} className="w-full flex 800px:items-center py-2">
            <div className="w-[15px] mr-1">
              <IoMdCheckmarkCircleOutline
                size={30}
                className="dark:text-white text-black"
              />
            </div>
            <p className="pl-2 dark:text-white text-black">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* course prerequisite */}

        <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
          What are the prerequisites for starting this course
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmarkCircleOutline
                size={30}
                className="dark:text-white text-black"
              />
            </div>
            <p className="pl-2 dark:text-white text-black">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* course description */}
        <div className="w-full dark:text-white text-black">
          <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
        <div className="w-full flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[
                #fff] roundedmt-8 cursor-pointer"
            onClick={() => prevButton()}
          >
            Prev
          </div>
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[
                #fff] roundedmt-8 cursor-pointer"
            onClick={() => createCourse()}
          >
          { isEdit ? "Edit"  : "Create"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
