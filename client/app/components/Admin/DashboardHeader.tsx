'use client';
import React, { FC, useState } from 'react';
import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';

type Props = {
  open?:boolean;
  setOpen: (open:boolean) => void;
};

const DashboardHeader: FC<Props> = ({open, setOpen}) => {

  return (
    <>
      <div className="w-full flex items-center justify-end p-6 fixed right-0 dark:text-white text-black">
        <ThemeSwitcher />
        <div
          className="relative cursor-pointer m-2"
          onClick={() => setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center dark:text-white text-black">
            3
          </span>
        </div>
        {open && (
          <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white absolute top-16 z-10 rounded">
            <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
              Notifications
            </h5>
            <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Received
                </p>
                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="text-black dark:text-white">
                I have gone through some of the courses you are offering and i
                call tell, they are a real assets to student and developers.
                Thank you for all the support and for free coupon on every
                course
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 days to go
              </p>
            </div>

            <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Received
                </p>
                <p className=" text-black dark:text-white cursor-pointer">
                  mark as read
                </p>
              </div>
              <p className="text-black dark:text-white">
                i have purchased and the course on MERN stack and it is
                incredible. Keep it up
              </p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                5 days to go
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader;
