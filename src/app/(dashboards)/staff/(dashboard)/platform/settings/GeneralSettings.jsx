"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Avatar from "@/public/Avatar.png";
import { FiX } from "react-icons/fi";

const GeneralSettings = () => {
  const [viewOpen, setViewOpen] = useState(false);

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
  };

  return (
    <div className="md:w-[530px] w-full gap-8 mt-10">
      <div>
        <p className="font-inter text-xl mb-2">Profile Image</p>
        <Image src={Avatar} alt="profile" />
      </div>

      <div className="font-inter text-xl text-[#000000] mt-10">
        <div className="flex justify-between border-b border-[#000000]/10 py-4">
          <span className="font-medium">My Name:</span>
          <span className="font-normal">#1252</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 py-4">
          <span className="font-medium">Role:</span>
          <span className="font-normal">Manager</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 py-4">
          <span className="font-medium">Assigned Location:</span>
          <span className="font-normal">Dhaka, Bangladesh</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 py-4">
          <span className="font-medium">Email:</span>
          <span className="font-normal">example@gmail.com</span>
        </div>

        <div className="flex justify-between py-4">
          <span className="font-medium">Phone Number:</span>
          <span className="font-normal">01896064584</span>
        </div>
      </div>

      <button
        onClick={() => setViewOpen(true)}
        className="bg-[#7AA3CC] text-[#000000] w-[30%] font-bold font-inter py-3 mt-14 rounded-lg cursor-pointer"
      >
        Set Your PIN
      </button>

      {viewOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-[#EFEFEF] rounded-3xl p-5 md:p-10">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 mb-5 cursor-pointer"
              />
            </div>
            <h3 className="font-inter font-medium text-2xl text-center mb-12">
              Set a new PIN
            </h3>

            {/* New PIN */}
            <div className="flex flex-col gap-6">
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
            <div className="mt-6 flex flex-col gap-6">
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

            <div className="text-center">
              <button
                onClick={() => setViewOpen(false)}
                className="bg-[#7AA3CC] text-[#000000] w-[30%] font-bold font-inter py-3 mt-5  md:mt-14 rounded-lg cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
