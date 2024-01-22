import React from 'react';
import heroImg from '../../assets/banner-img-1.png';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import photo1 from '../../assets/photo1.jpg';
import photo2 from '../../assets/photo2.jpg';
import photo3 from '../../assets/photo3.jpg';
import photo4 from '../../assets/photo4.jpg';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {};

const Hero = (props: Props) => {
  const { data } = useGetHeroDataQuery('Banner');
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={data?.layout?.banner?.image?.url}
          width={400}
          height={400}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
      </div>
      <div className="1000px:w-[40%] ml-40  flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] 1000px:text-[50px] font-[400]">
          {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Poppins font-[600] text-[18px] 1500px:!w-[75%] 1100px: !w-[78%] bg-transparent">
         {data?.layout?.banner?.subTitle}
        </p>

        <br />
        <br />
        <div className=" relative 1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent">
          <input
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500]"
            placeholder="search courses..."
            type="search"
          />
          <div className="absolute flex items-center  justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch size={30} className="text-white" height="30" width="30" />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={photo1}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />

          <Image
            src={photo2}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />

          <Image
            src={photo3}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />

          <Image
            src={photo4}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />

          <p className="dark:text-[#edfff4] text-[#000000b3]">
            500k + people already trusted us,{' '}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              view Courses
            </Link>
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Hero;
