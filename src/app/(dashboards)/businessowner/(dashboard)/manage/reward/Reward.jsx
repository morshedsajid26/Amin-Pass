import Bredcumb from "@/src/components/Bredcumb";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

const Reward = () => {
  return (
    <div>
      <Bredcumb />

      <div>
        <div className="relative ml-[10%]">
                  <input
                    type="text"
                    className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
                    placeholder="Search"
                  />
                  <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
                </div>
      <Link href='/businessowner/manage/reward/management' className="flex justify-end mb-10">
      <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-5 rounded-lg cursor-pointer mt-12 flex items-center gap-2">
        <FaPlus/>
           Add New Reward
          </button>
          </Link>
      </div>


      <div className="bg-white rounded-4xl py-14 px-14">
        <div className=" font-inter text-2xl text-[#000000]  ">
          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Created Date:</span>
            <span className="font-normal">04/05/2025</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Reward Name:</span>
            <span className="font-normal">Free Coffee</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Reward Points:</span>
            <span className="font-normal">100</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Reward Type:</span>
            <span className="font-normal">Free Item</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Expiry Days:</span>
            <span className="text-[#000000] ">14/05/2025</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Earning Rule:</span>
            <span className="text-[#000000] ">Per Spend</span>
          </div>
          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Reward:</span>
            <span className="text-[#009006] ">Active</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-12 mt-15">
          <button className="border border-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3  px-20 rounded-lg cursor-pointer mt-12">
            Delete
          </button>
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reward;
