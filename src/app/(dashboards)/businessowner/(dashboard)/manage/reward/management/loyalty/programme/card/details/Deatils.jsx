"use client";
import InputField from "@/src/components/InputField";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Deatils = () => {
  const router = useRouter();

  // ===== TEXT FIELDS =====
  const [cardDesc, setCardDesc] = useState("");
  const [earnRule, setEarnRule] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [earnedRewardMessage, setEarnedRewardMessage] = useState("");

  // ===== OPTIONS =====
  const [barcodeType, setBarcodeType] = useState("qr_code"); // qr_code | bar
  const [rewardType, setRewardType] = useState("spend"); // spend | visit

  // ===== EARN RULE =====
  const [spendAmount, setSpendAmount] = useState("1.00");
  const [stampValue, setStampValue] = useState("1");

  /* ================= NEXT ================= */
  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem("cardSetup")) || {};

    localStorage.setItem(
      "cardSetup",
      JSON.stringify({
        ...prev, // 🔒 preserve cardType
        cardDesc,
        earnRule,
        companyName,
        earnedRewardMessage,
        barcodeType,
        rewardProgram: rewardType,
        earnValue: spendAmount,
        earnUnit: stampValue,
      })
    );

    router.push(
      "/businessowner/manage/reward/management/loyalty/programme/card/create"
    );
  };

  return (
    <div>
      {/* ================= BASIC INFO ================= */}
      <div className="grid grid-cols-12 gap-y-10 gap-5 md:gap-20 mt-7">
        <InputField
          label="Card Description"
          value={cardDesc}
          onChange={(e) => setCardDesc(e.target.value)}
          inputClass="font-inter"
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="How to earn a stamp"
          value={earnRule}
          onChange={(e) => setEarnRule(e.target.value)}
          inputClass="font-inter"
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          inputClass="font-inter"
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Earned Reward Message"
          value={earnedRewardMessage}
          onChange={(e) => setEarnedRewardMessage(e.target.value)}
          inputClass="font-inter"
          className="col-span-12 md:col-span-6"
        />
      </div>

      {/* ================= CARD DESIGN ================= */}
      <div className="mt-10">
        <h3 className="font-inter text-2xl font-medium p-1 border-b-2 w-[10%] dark:text-white">
          Card Design
        </h3>

        <div className="grid grid-cols-12 gap-10 mt-6">
          {/* Barcode Type */}
          <div className="col-span-12 md:col-span-6">
            <h4 className="font-inter text-2xl font-medium mb-4 dark:text-white">
              Barcode Type
            </h4>

            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input
                type="radio"
                name="barcode"
                checked={barcodeType === "qr_code"}
                onChange={() => setBarcodeType("qr_code")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">
                QR Code
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="barcode"
                checked={barcodeType === "bar"}
                onChange={() => setBarcodeType("bar")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">
                Bar Code
              </span>
            </label>
          </div>

          {/* Reward Program */}
          <div className="col-span-12 md:col-span-6">
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
              <span className="text-lg font-inter dark:text-white">
                Spend
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="reward"
                checked={rewardType === "visit"}
                onChange={() => setRewardType("visit")}
                className="w-10 h-10 accent-black"
              />
              <span className="text-lg font-inter dark:text-white">
                Visit
              </span>
            </label>
          </div>
        </div>

        {/* ================= EARN RULE ================= */}
        <div className="mt-10">
          <h4 className="font-inter text-lg font-semibold mb-4 dark:text-white">
            How do your customers earn stamps?
          </h4>

          <div className="flex items-center gap-10">
            <div className="w-[50%]">
              <div className="flex items-center border border-black dark:border-white rounded-xl px-4 py-3.5">
                {rewardType === "spend" && (
                  <span className="font-inter text-2xl mr-1 dark:text-white">
                    $
                  </span>
                )}
                <input
                  type="number"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  className="w-full outline-none bg-transparent font-inter text-2xl dark:text-white"
                />
              </div>
            </div>

            <span className="text-xl font-bold dark:text-white">=</span>

            <div className="flex items-center w-[50%] border border-black dark:border-white rounded-xl">
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

      {/* ================= NEXT ================= */}
      <div className="flex justify-center mt-25">
        <button
          onClick={handleNext}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-25 rounded-lg cursor-pointer flex items-center gap-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Deatils;
