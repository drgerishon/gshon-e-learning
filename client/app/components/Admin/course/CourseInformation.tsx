import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React, { FC, useState } from 'react';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (acrive: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDradOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN Stack Elearning Platform with next js 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write course desctiption"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="" className={`${styles.label}`}>
                Course Price
              </label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="29"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label htmlFor="" className={`${styles.label} w-[50%]`}>
                Estimated Price (optional)
              </label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="79"
                className={`${styles.input}`}
              />
            </div>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="email" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="Mern, next 13, socket io, tailwind css"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Begginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({
                  ...courseInfo,
                  demoUrl: e.target.value,
                })
              }
              id="demoUrl"
              placeholder="eer3fr3"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`} 
            onDragOver={handleDradOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >{courseInfo.thumbnail ? (
            <img src={courseInfo.thumbnail} alt='' className='max-h-full w-full object-cover'/>
          ): (
            <span className='text-black dark:text-white cursor-pointer'>Drag and drop your thumbnail here or click to browse</span>
          )}</label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end'>
            <input type='submit' value="Next" className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'/>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
