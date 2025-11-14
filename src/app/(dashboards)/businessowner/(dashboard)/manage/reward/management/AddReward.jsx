"use client"
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/rewardLogo.png";
import { RiImageEditFill } from "react-icons/ri";
import InputField from "@/src/components/InputField";

const AddReward = () => {
   const [active, setActive] = useState(true);
  return (
    <div className="pt-8">
      <div className="relative">
        <p className="font-inter text-xl dark:text-white">Reward Logo</p>
        <div className="relative w-[7.6%] mt-4">
          <Image src={logo} alt="logo" />

          {/* <div className='absolute -right-5 -bottom-5'>

            <RiImageEditFill
              className="w-10 h-10 rounded-md p-1.5 bg-[#7AA3CC] text-[#000000] cursor-pointer "
              
            />
            </div> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-7">
        <InputField label={`Created Date`} inputClass={`font-inter text-xl`} />
        <InputField label={`Expire Date`} inputClass={`font-inter text-xl`} />
        <InputField label={`Reward Name`} inputClass={`font-inter text-xl`} />
        <InputField label={`Reward Type`} inputClass={`font-inter text-xl`} />
        <InputField label={`Earning Rule`} inputClass={`font-inter text-xl`} />
        <InputField label={`Threshold`} inputClass={`font-inter text-xl`} />
      </div>

      <div className="mt-10">
        <p className="font-inter text-xl mb-4">Reward</p>
         <div
      className="flex items-center gap-3 bg-[#CECECE] dark:bg-[#0F0F0F] px-3 py-2 rounded-2xl cursor-pointer select-none w-[150px]"
      onClick={() => setActive(!active)}
    >
      {/* Toggle Button */}
      <div
        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
          active ? "bg-black dark:bg-[#F8F8F8]" : "bg-gray-400 "
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-black rounded-full transition-all duration-300 ${
            active ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>

      {/* Text */}
      <span
        className={`font-inter text-[18px] transition-all duration-300 ${
          active ? "text-green-700" :  "text-red-500"
        }`}
      >
        {active ? "Active" : "Inactive"}
      </span>
    </div>
      </div>
      <div className="flex justify-center">
      <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-5 rounded-lg cursor-pointer mt-12 flex items-center gap-2">
       Create Reward
      </button>

      </div>
    </div>
  );
};

export default AddReward;
