import Image from 'next/image';
import React from 'react';
import coffee from '@/public/coffeeIcon.png'
import loyalty from '@/public/loyalty.png'
import qrCode from '@/public/qrCode.png'
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const LoyaltyCard = () => {
  return (
    <div className='md:w-[410px] w-full'>

    <div className="bg-[#7AA3CC] rounded-2xl w-full  p-4 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className=" flex items-center justify-center">
            <Image
             src={coffee} 
              alt="Coffee Icon"
              
            />
          </div>
          <span className="font-bold font-inter  text-black">Coffee Shop</span>
        </div>
        <div className="text-right font-inter">
          <p className="">Points</p>
          <p className="font-bold text-black">250</p>
        </div>
      </div>

      {/* Banner Image */}
      <div className="rounded-md overflow-hidden mb-4">
        <Image
          src={loyalty} 
          alt="Loyalty Banner"
          width={400}
          height={100}
          className="w-full object-cover"
        />
      </div>

      {/* Reward Info */}
      <div className="flex justify-between items-center mb-4 font-inter font-medium text-black">
        <p>Reward Name</p>
        <p>Status</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <Image
          src={qrCode}
          alt="QR Code"
          width={120}
          height={120}
          className="rounded-md border border-gray-200"
        />
      </div>

      {/* Buttons */}
    </div>
      <div className="flex justify-center gap-8 mt-6">
        <button className="border border-[#7AA3CC] dark:text-white  font-inter font-medium  py-2.5 px-15 rounded-md">
          Edit
        </button>
        <button className="bg-[#ED4539] border border-[#7AA3CC]  font-inter font-medium  py-2.5 px-14 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

const Loyalty = () => {
  return (
    <div className='py-10'>
        <Link href='/businessowner/manage/reward/management/loyalty/programme/card/type' className="flex justify-end mb-10">
      <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-5 rounded-lg cursor-pointer flex items-center mb-8 gap-2">
        <FaPlus/>
           Create New Card
          </button>
          </Link>

      <LoyaltyCard/>
    </div>
  )
}

export default Loyalty
