"use client";
import InputField from "@/src/components/InputField";
import Link from "next/link";
import React, { useState } from "react";

const Deatils = () => {
  const [barcodeType, setBarcodeType] = useState("qr"); // qr | bar
  const [rewardType, setRewardType] = useState("spend"); // spend | visit

  const [spendAmount, setSpendAmount] = useState("1.00");
  const [stampValue, setStampValue] = useState("1");
  return (
    <div>
      <div className="grid grid-cols-2 gap-y-10   gap-x-20 mt-7">
        <InputField
          label={`Card Description`}
          // placeholder={`Collect stamps to get reward`}
          inputClass={`font-inter  `}
        />
        <InputField
          label={`How to earn a stamp`}
          // placeholder={`Buy anything to get a stamp`}
          inputClass={`font-inter `}
        />
        <InputField
          label={`Company Name`}
          // placeholder={`Company Name`}
          inputClass={`font-inter `}
        />
        <InputField
          label={`Earned Reward Message`}
          // placeholder={`Reward is earned and waiting for you!`}
          inputClass={`font-inter `}
        />
      </div>

      <div className="mt-10">
        {/* Title */}
        <h3 className="font-inter text-2xl font-medium p-1 border-b-2 w-[10%] dark:text-white">
          Card Design
        </h3>

        {/* Radio Groups */}
        <div className="grid grid-cols-2 gap-10 mt-6">
          {/* Barcode Type */}
          <div>
            <h4 className="font-inter text-2xl font-medium mb-4 dark:text-white">
              Barcode Type
            </h4>

            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input
                type="radio"
                name="barcode"
                checked={barcodeType === "qr"}
                onChange={() => setBarcodeType("qr")}
                className="w-10 h-10 accent-black "
              />
              <span className="text-lg font-inter dark:text-white">QR Code </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="barcode"
                checked={barcodeType === "bar"}
                onChange={() => setBarcodeType("bar")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">Bar Code</span>
            </label>
          </div>

          {/* Reward Program */}
          <div>
            <h4 className="font-inter text-2xl font-medium mb-4 dark:text-white">
              Reward Program
            </h4>

            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input
                type="radio"
                name="reward"
                checked={rewardType === "spend"}
                onChange={() => setRewardType("spend")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">Spend</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="reward"
                checked={rewardType === "visit"}
                onChange={() => setRewardType("visit")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">Visit</span>
            </label>
          </div>
        </div>

        {/* Dynamic Earn Section */}
        <div className="mt-10">
          <h4 className="font-inter text-lg font-semibold mb-4 dark:text-white">
            How do your customers earn stamps?
          </h4>

          <div className="flex items-center gap-10">
            {/* LEFT INPUT — Spend / Visit */}
            <div className="w-[50%]">
              {rewardType === "spend" ? (
                <div className="flex items-center border border-black dark:border-white rounded-xl px-4 py-3.5">
                  <span className="font-inter text-2xl mr-1 dark:text-white">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(e.target.value)}
                    className="w-full outline-none bg-transparent font-inter text-2xl dark:text-white"
                  />
                </div>
              ) : (
                <div className="flex items-center border border-black dark:border-white rounded-xl px-4 py-3.5">
                  <input
                    type="number"
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(e.target.value)}
                    className="w-full outline-none bg-transparent font-inter text-2xl dark:text-white"
                  />
                </div>
              )}
            </div>

            <span className="text-xl font-bold dark:text-white">=</span>

            {/* RIGHT INPUT — Stamps */}
            <div className="flex items-center w-[50%] border border-black  dark:border-white rounded-xl">
              <input
                type="number"
                value={stampValue}
                onChange={(e) => setStampValue(e.target.value)}
                className="w-full outline-none bg-transparent font-inter text-2xl px-4 py-3.5 dark:text-white"
              />
              <div className="bg-[#919191] text-white px-4 py-4 rounded-r-xl font-inter">
                Stamps
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
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Deatils;
