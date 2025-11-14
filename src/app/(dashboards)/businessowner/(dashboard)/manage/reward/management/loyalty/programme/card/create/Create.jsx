"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import QR from "@/public/QR.png"
import Link from "next/link";

export default function Create() {
  const [stampCount, setStampCount] = useState(6);

  const [logo, setLogo] = useState(null);
  const [stampBg, setStampBg] = useState(null);

  const [colors, setColors] = useState({
    cardBg: "#FFFFFF",
    text: "#100F10",
    active: "#1C1919",
    inactive: "#626262",
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleStampBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setStampBg(URL.createObjectURL(file));
  };

  return (
    <div>
    <div className="flex gap-14 w-full mt-10">
      {/* LEFT SIDE SETTINGS */}
      <div className="w-1/2 space-y-8">

        {/* Stamp Count */}
        <div>
          <h3 className="font-inter font-semibold text-xl mb-3">Stamps Count</h3>

          <div className="flex gap-3 flex-wrap">
            {[...Array(12)].map((_, i) => {
              const num = i + 1;
              return (
                <button
                  key={num}
                  onClick={() => setStampCount(num)}
                  className={`w-10 h-10 rounded-full border transition font-inter 
                    ${stampCount === num
                      ? "bg-black dark:bg-[#373737] text-white"
                      : "bg-white border-black text-black"
                    }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <h3 className="font-inter font-semibold text-xl mb-2 dark:text-white">Logo</h3>

          <div className="border dark:border-white rounded-xl px-4 py-3 flex justify-between items-center ">
            <div className="flex items-center gap-2">
               <BsImages className="w-9 h-9 dark:text-white"/>
            </div>
            <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-md font-inter">
              Select File
              <input type="file" className="hidden" onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Background under stamps */}
        <div>
          <h3 className="font-inter font-semibold text-xl mb-2 dark:text-white">
            Background under stamps
          </h3>

          <div className="border dark:border-white rounded-xl px-4 py-3 flex justify-between items-center ">
           <BsImages className="w-9 h-9 dark:text-white"/>
            <label className="cursor-pointer bg-black dark:bg-white dark:text-black text-white px-5 py-2 rounded-md font-inter">
              Select File
              <input type="file" className="hidden" onChange={handleStampBgUpload} />
            </label>
          </div>
        </div>

        {/* COLORS */}
        <div>
          <h3 className="font-inter font-semibold text-xl mb-3 dark:text-white">Colors</h3>

          {/* Card BG */}
          <div>
            <label className="font-inter text-sm dark:text-white">Card Background</label>
            <input
              type="color"
              value={colors.cardBg}
              onChange={(e) => setColors({ ...colors, cardBg: e.target.value })}
              className="w-full h-12 rounded-lg border mt-1"
            />
          </div>

          {/* Text */}
          <div className="mt-4">
            <label className="font-inter text-sm dark:text-white">Text Color</label>
            <input
              type="color"
              value={colors.text}
              onChange={(e) => setColors({ ...colors, text: e.target.value })}
              className="w-full h-12 rounded-lg border mt-1"
            />
          </div>

          {/* Active Stamp */}
          <div className="mt-4">
            <label className="font-inter text-sm dark:text-white">Active Stamp</label>
            <input
              type="color"
              value={colors.active}
              onChange={(e) =>
                setColors({ ...colors, active: e.target.value })
              }
              className="w-full h-12 rounded-lg border mt-1"
            />
          </div>

          {/* Inactive Stamp */}
          <div className="mt-4">
            <label className="font-inter text-sm dark:text-white">Inactive Stamp</label>
            <input
              type="color"
              value={colors.inactive}
              onChange={(e) =>
                setColors({ ...colors, inactive: e.target.value })
              }
              className="w-full h-12 rounded-lg border mt-1"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE PREVIEW */}
      <div className="w-1/2 flex justify-center">
        <div className="border-4 dark:border-[#141414] rounded-3xl w-[280px] h-[540px] bg-white shadow-xl px-1 py-5 relative">

          {/* Top Back Button */}
          <span className="text-xl absolute left-4 top-4">←</span>

          {/* Title */}
          <h3 className="text-center font-inter text-lg mb-4">Wallet</h3>

          {/* Card Preview */}
          <div
            className="rounded-xl p-4 mt-5"
            style={{ backgroundColor: colors.cardBg }}
          >
            {/* Logo */}
            <div className="h-12 flex justify-center mb-3">
              {logo ? (
                <Image
                  src={logo}
                  width={60}
                  height={60}
                  alt="Logo"
                  className="object-contain"
                />
              ) : (
                <p className="text-center text-sm text-gray-400">Company Logo</p>
              )}
            </div>
            

            {/* Stamp Background */}
            {stampBg && (
              <Image
                src={stampBg}
                width={300}
                height={80}
                alt="Stamp BG"
                className="rounded-lg mb-3 object-cover"
              />
            )}

            {/* Stamps */}
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(stampCount)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: i < 2 ? colors.active : colors.inactive,
                  }}
                ></div>
              ))}
            </div>

            {/* Reward Text */}
            <p
              className="text-center font-inter text-lg font-semibold"
              style={{ color: colors.text }}
            >
              6th ☕ on us
            </p>


            <div className="flex justify-between items-center w-full mb-3 px-1 mt-2">
        <div className="text-center">
          <p
            className="text-[16px] font-inter"
            style={{ color: colors.text }}
          >
            Stamps
          </p>
          <p
            className="text-[16px] font-inter font-semibold"
            style={{ color: colors.text }}
          >
            2
          </p>
        </div>

        <div className="text-center">
          <p
            className="text-[16px] font-inter"
            style={{ color: colors.text }}
          >
            Available Rewards
          </p>
          <p
            className="text-[16px] font-inter font-semibold"
            style={{ color: colors.text }}
          >
            0 rewards
          </p>
        </div>
      </div>

            {/* QR Code */}
            <div className="mt-4 flex justify-center">
              <div className=" rounded-md flex items-center justify-center">
                {/* <span className="text-gray-700">QR</span> */}
                <Image src={QR} alt="QR"/>
              </div>
            </div>

          </div>
        </div>
      </div>

      

    </div>

    <div>
        <Link
          href="/businessowner/manage/reward/management/loyalty/programme/card/create"
          className="flex justify-center mt-25"
        >
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-25 rounded-lg cursor-pointer flex items-center gap-2">
           Create
          </button>
        </Link>
      </div>

    </div>
  );
}
