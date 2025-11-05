"use client"
import React, { useRef } from "react";
import Link from "next/link";
import Password from "@/src/components/Password";

const NewPin = () => {
  const newPinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  const handleChange = (e, index, refs) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index, refs) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      refs.current[index - 1].focus();
    }
  }
  return (
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-18 rounded-3xl  ">
      <form className=" flex flex-col items-center text-cente gap-6 w-[480px]">
        <h3 className="font-inter font-medium text-[32px] text-[#333333] ">
          Set a new password
        </h3>

        <p className="font-inter  text-[#333333] mb-3 text-center">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

       {/* New PIN */}
            <div className="flex flex-col gap-6 ">
              <label className="font-inter text-xl text-[#333333]">New PIN</label>
              <div className="flex gap-4 justify-center">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    ref={(el) => (newPinRefs.current[i] = el)}
                    onChange={(e) => handleChange(e, i, newPinRefs)}
                    onKeyDown={(e) => handleKeyDown(e, i, newPinRefs)}
                    className="appearance-none w-[47px] h-[49px] border border-[#7AA3CC] rounded-[10px] text-center outline-none text-xl font-inter font-bold text-[#005FA8]"
                  />
                ))}
              </div>
            </div>

            {/* Confirm PIN */}
            <div className=" flex flex-col gap-6">
              <label className="font-inter text-xl text-[#333333]">
                Confirm PIN
              </label>
              <div className="flex gap-4 justify-center">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    ref={(el) => (confirmPinRefs.current[i] = el)}
                    onChange={(e) => handleChange(e, i, confirmPinRefs)}
                    onKeyDown={(e) => handleKeyDown(e, i, confirmPinRefs)}
                    className="appearance-none w-[47px] h-[49px] border border-[#7AA3CC] rounded-[10px] text-center outline-none text-xl font-inter font-bold text-[#005FA8]"
                  />
                ))}
              </div>
            </div>

        <Link href="/staff/pinsuccess" className="w-[50%] ">
          <button className="bg-[#7AA3CC] text-[#000000] w-full font-semibold font-inter  py-3 rounded-lg mt-5 cursor-pointer">
            Update Password
          </button>
        </Link>
      </form>
    </main>
  );
};

export default NewPin;
