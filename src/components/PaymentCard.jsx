"use client";
import { useState } from "react";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import Image from "next/image";
import visa from "@/public/Visa.png";
import mastercard from "@/public/mastercard.png";
import troy from "@/public/Troy.png";

const PaymentCard = () => {
  const [saveCard, setSaveCard] = useState(false);

  return (

        <div className="  ">
            <h3 className="font-inter text-[32px] mt-20">Payment Method</h3>
    <div className="bg-[#AFC5D3] rounded-2xl p-8 w-[50%] shadow-md mt-10 mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600 w-6 h-6" />
          <h2 className="text-xl font-inter font-semibold text-[#000]">
            Add new card
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Image src={mastercard} alt="mastercard" width={40} height={40} />
          <Image src={visa} alt="visa" width={40} height={40} />
          <Image src={troy} alt="troy" width={40} height={40} />
        </div>
      </div>

      {/* Card Number */}
      <div className="mb-5 grid grid-cols-7 items-center gap-4 ">
        <div className="col-span-3">
            <label className="font-inter text-[#000] font-medium ">
          Card number
        </label>
        <p className="text-sm text-[#333] mb-2">
          Enter the 16-digit card number on the card
        </p>
        </div>
        <div className="relative col-span-4 ">
          <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder=""
            className="w-full px-10 py-2 rounded-lg bg-[#FFFFFF] outline-none text-[#000000]"
          />
          <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
        </div>
      </div>

      {/* Card Owner */}
      <div className="mb-5  grid grid-cols-7 items-center gap-4">
        <div className="col-span-3">
            <label className="font-inter text-[#000000] font-medium ">
          Card owner
        </label>
        <p className="text-sm text-[#333] mb-2">Enter the name on the card</p>
        </div>
        <input
          type="text"
          placeholder=""
          className="col-span-4 py-2 px-3.5 rounded-lg bg-white outline-none text-[#000000]"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-7 items-center gap-5 mb-5">
        <div className="col-span-5 grid grid-cols-5 gap-4">
          <div className="col-span-3" >
            <label className="font-inter text-[#000000] font-medium block">
            Expiry date
          </label>
          <p className="text-sm text-[#333] mb-2 w-full">
            Enter the expiration date of the card
          </p>
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="MM"
              className="w-20 py-2 px-3 rounded-lg bg-white outline-none text-[#000] text-center"
            />
            <span className="text-lg font-bold text-[#000]">/</span>
            <input
              type="text"
              placeholder="YY"
              className="w-20 py-2 px-3 rounded-lg bg-white outline-none text-[#000] text-center"
            />
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-3 items-center">
        <div className="col-span-2">
              <label className="font-inter text-[#000] font-medium block">
            CVV2
          </label>
          <p className="text-sm text-[#333] mb-2">Security code</p>
        </div>
          <input
            type="password"
            placeholder="012"
            className="w-15 py-2 px-0 rounded-lg bg-white outline-none text-[#000] text-center"
          />
        </div>
      </div>

      
    </div>
{/* Save for next payment */}
      <div className="flex items-center justify-center gap-3 mt-5 ">
        <input
          type="checkbox"
          checked={saveCard}
          onChange={() => setSaveCard(!saveCard)}
          className="w-5 h-5 accent-[#000]"
        />
        <label className="text-[#000] font-inter text-[16px]">
          Save for the next payment
        </label>
      </div>
        </div>
  );
};

export default PaymentCard;
