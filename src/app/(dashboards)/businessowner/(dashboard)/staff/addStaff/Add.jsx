"use client";
import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import { useRouter } from "next/navigation";
import React from "react";

const Add = () => {
  const router = useRouter();
  return (
    <div>
      <form className="grid grid-cols-12 gap-5 md:gap-15 mt-10">
        <InputField
          label={`Staff Name`}
          inputClass={`font-inter text-xl`}
          className={`col-span-12 md:col-span-6`}
        />
        <InputField
          label={`Role`}
          inputClass={`font-inter text-xl`}
          className={`col-span-12 md:col-span-6`}
        />
        <InputField
          label={`Staff Email`}
          inputClass={`font-inter text-xl`}
          className={`col-span-12 md:col-span-6`}
        />

        <Password
          label="Password"
          labelClass={`font-inter text-xl   text-black`}
          inputClass={`border-black py-4 rounded-2xl text-xl text-black `}
          icon={`text-black `}
           className={`col-span-12 md:col-span-6`}
        />
      </form>

      <div className="flex justify-center items-center gap-2 md:gap-12 mt-10 md:mt-15">
        <button
          onClick={() => router.back()}
          className="border border-[#7AA3CC] dark:text-white text-[#010101] font-semibold text-xl font-inter py-3  px-15 md:px-20 rounded-lg cursor-pointer mt-12"
        >
          Close
        </button>
        <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-15 md:px-20 rounded-lg cursor-pointer mt-12">
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
