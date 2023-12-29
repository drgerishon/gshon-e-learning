import { styles } from '@/app/styles/style';
import { AddCircle } from '@mui/icons-material';
import React, { FC } from 'react';
import toast from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: '' }]);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };

  const handleOptions = () => {
    if(benefits[benefits.length -1]?.title !== "" && prerequisites[prerequisites.length -1]?.title !== "") {
        setActive(active + 1)
    }
    else {
        toast.error("Please fill the fields for go to next")
    }
  };

  const prevButton = () => {
    setActive(active -1 )
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack Gshon platform..."
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircle
          className="dark:text-white"
          style={{ margin: '10px 0px', cursor: 'poniter', width: '30px' }}
          onClick={handleAddBenefits}
        />
      </div>

      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the Prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisite"
            placeholder="You will be able to build a full stack Gshon platform..."
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircle
          className="dark:text-white"
          style={{ margin: '10px 0px', cursor: 'poniter', width: '30px' }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
