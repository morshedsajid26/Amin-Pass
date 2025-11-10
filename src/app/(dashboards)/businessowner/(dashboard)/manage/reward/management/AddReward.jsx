import Image from "next/image";
import React from "react";
import logo from "@/public/rewardLogo.png";
import { RiImageEditFill } from "react-icons/ri";
import InputField from "@/src/components/InputField";

const AddReward = () => {
  return (
    <div className="pt-8">
      <div className="relative">
        <p className="font-inter text-xl">Reward Logo</p>
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

      <div>
        <p>Reward</p>
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
