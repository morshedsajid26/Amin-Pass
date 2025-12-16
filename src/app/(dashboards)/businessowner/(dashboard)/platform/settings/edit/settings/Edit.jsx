"use client";
import InputField from "@/src/components/InputField";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Avatar from "@/public/Avatar.png";
import QR from "@/public/QR.png";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const Edit = () => {
  // States & refs (logo & QR)
  const logoRef = useRef(null);
  const qrRef = useRef(null);

  const [logoPreview, setLogoPreview] = useState(Avatar);
  const [qrPreview, setQrPreview] = useState(QR);

  // Handle file input
  const handleFileSelect = (e, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div>
      {/* Café Logo Section */}
      <div className="mt-10 w-[120px] relative">
        <p className="font-inter text-xl mb-2 dark:text-white">Cafe Logo</p>

        {/* Logo Preview */}
        <Image src={logoPreview} alt="cafe logo" className="rounded-lg" />

        {/* Edit Icon */}
        <button
          onClick={() => logoRef.current.click()}
          className="w-11 h-11 bg-[#7AA3CC] flex items-center justify-center 
                     rounded-lg absolute right-0 bottom-0 cursor-pointer"
        >
          <FiEdit className="w-8 h-8 " />
        </button>

        {/* Hidden Input */}
        <input
          type="file"
          ref={logoRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, setLogoPreview)}
        />
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-7">
        <InputField label="Shop Name" placeholder="" inputClass="font-inter" />
        <InputField label="Address" placeholder="" inputClass="font-inter" />
        <InputField label="Owner Name" placeholder="" inputClass="font-inter" />
        <InputField
          label="Owner Gmail"
          placeholder=""
          inputClass="font-inter"
        />
        <InputField
          label="Owner Number"
          placeholder=""
          inputClass="font-inter"
        />

        {/* QR Code Section */}
        <div>
          <p className="font-inter text-xl mb-2 dark:text-white">QR Code</p>

          <div className="relative w-[95px] ">
            {/* QR Preview */}
            <Image src={qrPreview} alt="qr-code" className="rounded-lg" />

            {/* Edit Icon */}
            <button
              onClick={() => qrRef.current.click()}
              className="w-11 h-11 bg-[#7AA3CC] flex items-center justify-center 
                         rounded-lg absolute left-full bottom-full cursor-pointer"
            >
              <FiEdit className="w-8 h-8 " />
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={qrRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileSelect(e, setQrPreview)}
            />
          </div>
        </div>
      </div>

      <Link
        href="/businessowner/platform/settings"
        className=" flex justify-center "
      >
        <button className="bg-[#7AA3CC] text-[#000000]  font-bold font-inter py-3 px-15 mt-20 rounded-lg cursor-pointer">
          Save
        </button>
      </Link>
    </div>
  );
};

export default Edit;
