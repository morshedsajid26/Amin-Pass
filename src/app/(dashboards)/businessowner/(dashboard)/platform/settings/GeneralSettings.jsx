"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Avatar from "@/public/Avatar.png";
import QR from "@/public/QR.png";
import { LuImport } from "react-icons/lu";
import Link from "next/link";

const GeneralSettings = () => {
  return (
    <div className="w-[530px] gap-8 mt-10">
      <div>
        <p className="font-inter text-xl mb-2 dark:text-white">Cafe Logo</p>
        <Image src={Avatar} alt="profile" />
      </div>

      <div className="font-inter text-xl dark:text-white text-[#000000] mt-10">
        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Shop Name:</span>
          <span className="font-normal">Arabic Cafe</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Shop Address:</span>
          <span className="font-normal">Dhaka,Gazipur</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Name:</span>
          <span className="font-normal">Dhaka, Bangladesh</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Email:</span>
          <span className="font-normal">example@gmail.com</span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Number:</span>
          <span className="font-normal">01896064584</span>
        </div>
        <div className="flex justify-between  py-4">
          <span className="font-medium">Qr Code:</span>
          <Image src={QR} alt="QR" />
        </div>
      </div>

      <div className="flex items-center gap-10 justify-center">
       

         <Link href='/businessowner/platform/settings/qR/code' className="">
        <button className="border-[#7AA3CC] border text-[#000000] dark:text-white px-10 font-bold font-inter py-3 mt-14 rounded-lg cursor-pointer flex items-center gap-2 justify-center">
          <LuImport className="w-6 h-6 " />
          QR Code
        </button>
        </Link>

        <Link href='/businessowner/platform/settings/edit/settings' className="">
        <button className="bg-[#7AA3CC] text-[#000000]  font-bold font-inter py-3 px-10 mt-14 rounded-lg cursor-pointer">
          Edit Profile
        </button>
        </Link>
      </div>
    </div>
  );
};

export default GeneralSettings;
