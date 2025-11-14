"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { LuImport } from "react-icons/lu";
import QR from "@/public/QR.png";
import logo from "@/public/rewardLogo.png";
import * as htmlToImage from "html-to-image";

const QRCode = () => {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
      });

      const link = document.createElement("a");
      link.download = "qr-code-card.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div>
      {/* Downloadable Card */}
      <div
        ref={cardRef}
        className="bg-white dark:bg-[#141414] w-[35%] p-10 mx-auto flex flex-col justify-center items-center gap-5 rounded-3xl mt-10"
      >
        <Image src={logo} alt="qr" height={171} width={167} />

        <h3 className="font-inter font-medium text-[32px] dark:text-white">
          Collect stamps to get rewards
        </h3>

        <Image src={QR} alt="qr" height={171} width={167} />

        <p className="font-inter font-medium text-xl text-center dark:text-white">
          With your phone camera and scan the QR code
        </p>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="bg-[#7AA3CC] text-[#000000] px-10 font-bold font-inter py-3 mt-14 rounded-lg cursor-pointer flex items-center gap-2 justify-center"
        >
          <LuImport className="w-6 h-6" />
          QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCode;
