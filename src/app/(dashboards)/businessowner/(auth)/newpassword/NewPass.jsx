import React from "react";
import Link from "next/link";
import Password from "@/src/components/Password";

const NewPass = () => {
  return (
    <main className="bg-white  dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-18 rounded-3xl  ">
      <form className=" flex flex-col items-center text-cente gap-7 w-[480px]">
        <h3 className="font-inter font-medium text-[32px] text-[#333333] dark:text-white ">
          Set a new password
        </h3>

        <p className="font-inter  text-[#333333] dark:text-white mb-5 text-center">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <Password
          label="Password"
          labelClass={`dark:text-white`}
          placeholder="Enter your password"
          inputClass={`dark:text-white`}
        />

        <Password
          label="Confirm Password"
          labelClass={`dark:text-white`}
          placeholder="Enter your password again"
          inputClass={`dark:text-white`}
        />

        <Link href="/businessowner/success" className="w-full ">
          <button className="bg-[#7AA3CC] text-[#000000] w-full font-semibold font-inter  py-3 rounded-lg mt-5 cursor-pointer">
            Update Password
          </button>
        </Link>
      </form>
    </main>
  );
};

export default NewPass;
