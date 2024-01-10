import { styles } from '@/app/styles/style';
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

type Props = {};

const EditHero: FC<Props> = (props) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const { data, refetch } = useGetHeroDataQuery('Banner', {refetchOnMountOrArgChange:true});
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation({});

  useEffect(() => {
    if (data) {
      setTitle(data?.layout.title);
      setSubTitle(data?.layout.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
        refetch();
      toast.success('hero updated successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [data, error, isSuccess, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({ type: 'Banner', image, title, subTitle });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center ml-12">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-18 1500px:left-21"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />

            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            value={title}
            placeholder="Improve your online learning experience better Instantly"
            rows={4}
            onChange={(e) => setTitle(e.target.value)}
            className="dark:text-[#edfff4] text-[#000000ac] resize-none text-[30px] px-3 1000px:text-[40px] font-[600] bg-transparent"
          ></textarea>

          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="we have over 40k + 500k registred students"
            className="dark:text-[#edfff4] text-[#000000ac] font-Poppins  font-[600] text-[18px] 1500px:!w-[55%] 1100px: !w-[78%] bg-transparent"
          ></textarea>
          <br />
          <br />

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[3cccccc34] 
          ${
            data?.layout.banner?.title !== title ||
            data?.layout.banner?.subTitle !== subTitle ||
            data?.layout.banner?.image?.url !== image
              ? '!cursor-pointer !bg-[#42d383]'
              : '!cursor-not-allowed'
          } !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
