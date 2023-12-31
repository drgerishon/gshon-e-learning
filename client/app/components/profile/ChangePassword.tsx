import { styles } from '@/app/styles/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword, { isSuccess, error}] = useUpdatePasswordMutation()

  const passwordChangeHandler = async(e:any) => {
    e.preventDefault()
    if(newPassword !== confirmPassword) {
        toast.error("password do not match")
    }else {
        await updatePassword({oldPassword, newPassword})
    }
  };

  useEffect(() => {
    if(isSuccess) {
        toast.success("password changed succesfully")
    }
    if(error) {
        if("data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message)
        }
    }
  },[error, isSuccess])
  return (
    <div className="w-full pl-7 px-2 800px:pl-10">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>

      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5 text-black dark:text-[#fff]">
            <label className="block pb-2 font-semibold text-black dark:text-[#fff]">
              Enter your old password
            </label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2 text-black dark:text-[#fff]">
            <label className="block pb-2 font-semibold text-black dark:text-[#fff]">
              Enter your new Password
            </label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-2 text-black dark:text-[#fff]">
            <label className="block pb-2 font-semibold text-black dark:text-[#fff]">
              Enter your confirm Password
            </label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <input
              className={`w-full 800px:w-[250px] h-[40px] rounded-full border border-[#37a39a text-center dark:text-[#fff] text-black hover:border-indigo-950 mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
