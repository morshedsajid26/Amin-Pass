"use client";

import Bredcumb from "@/src/components/Bredcumb";
import React, { useEffect, useState } from "react";
import Avatar from "@/public/Avatar.png";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BASE_URL } from "@/src/config/api";
import { formatDate } from "@/src/utils/formatDate";

const AddPoint = () => {
  const router = useRouter();

  /* ================= DATE ================= */
  const today = new Date();
  const formattedDate = formatDate(today.toISOString());

  /* ================= STATE ================= */
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [redeemData, setRedeemData] = useState(null);
  const [loading, setLoading] = useState(false);
  

  /* ================= LOAD FROM localStorage ================= */
  useEffect(() => {
    const raw = localStorage.getItem("redeemData");
    if (!raw) {
      toast.error(" Redeem data missing");
      return;
    }

    const parsed = JSON.parse(raw);
    setRedeemData(parsed);
    setTotal(parsed.rewardPoints || 0);
  }, []);

  /* ================= COUNTER ================= */
  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  /* ================= API CALL ================= */
const handleClick = async () => {
  if (!count || !redeemData?.qrCode || !redeemData?.branchId) {
    toast.error(" Missing required data");
    return;
  }

  try {
    setLoading(true);

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error(" Unauthorized");
      return;
    }

    const payload = {
      qrCode: String(redeemData.qrCode),
      points: Number(count),
      rewardHistoryId: redeemData.rewardHistoryId || null,
    };

    console.log("📤 PAYLOAD:", payload);

    const res = await fetch(
      `${BASE_URL}/business-owner/add-redeem/increase-points/${redeemData.branchId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    console.log("📥 RESPONSE:", result);

    if (!res.ok || result?.success === false) {
      throw new Error(result?.message || "Failed to add points");
    }

    setTotal((prev) => prev + count);
    setCount(0);
    toast.success(` ${count} Point${count > 1 ? "s" : ""} added successfully!`);

    setTimeout(() => {
      router.back();
    }, 1500);
  } catch (err) {
    console.error(err);
    toast.error(` ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Bredcumb />

      {/* ================= USER CARD (UNCHANGED) ================= */}
      <div className="flex flex-col md:flex items-center gap-5 md:gap-25">
        <div className="bg-white dark:bg-transparent w-full md:w-[50%] rounded-2xl py-2 px-6">
          <div className="flex items-center gap-6">
            <Image
              src={Avatar}
              alt="User"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="font-inter text-2xl font-medium text-[#000000] dark:text-white">
                {redeemData?.customerName || "—"}
              </h2>
              <p className="font-inter font-medium text-[#000000] dark:text-white">
                {redeemData?.branchName || ""}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141414] md:w-[20%] w-full rounded-2xl py-3 px-10 flex flex-col items-center">
          <p className="font-inter font-medium text-xl dark:text-white">
            {formattedDate?.split(" ").slice(0, 1).join(" ")}
          </p>
          <p className="font-inter font-medium text-lg mt-2 dark:text-white">
            {formattedDate?.split(" ").slice(1).join(" ")}
          </p>
          <p className="font-inter font-medium mt-3 dark:text-white">
            Visit Date
          </p>
        </div>
      </div>

      {/* ================= COUNTER ================= */}
      <div className="flex flex-col items-center justify-center mt-5 md:mt-17 gap-8">
        <div className="bg-[#E1E1E1] dark:bg-[#141414] rounded-2xl w-full md:w-[30%] flex items-center justify-between py-5 px-10">
          <FaMinus
            onClick={handleDecrease}
            className="w-12 h-12 cursor-pointer dark:text-white"
          />
          <p className="font-inter font-bold text-[40px] dark:text-white">
            {count}
          </p>
          <FaPlus
            onClick={handleIncrease}
            className="w-12 h-12 cursor-pointer dark:text-white"
          />
        </div>

        <div>
          <button
            onClick={handleClick}
            disabled={loading}
            className="font-inter font-bold text-2xl bg-[#7AA3CC] py-3 px-43 rounded-lg cursor-pointer disabled:opacity-60"
          >
            {loading ? "Updating..." : "Add Points"}
          </button>
        </div>

        <div className="h-5">
        </div>
      </div>

      {/* ================= SUMMARY CARD (UNCHANGED) ================= */}
      <div className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14">
        <div className="font-inter text-2xl text-[#000000] dark:text-white">
          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50 py-4">
            <span className="font-medium">Active Reward:</span>
            <span className="font-normal">{redeemData?.activeRewards}</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50 py-4">
            <span className="font-medium">Available Reward:</span>
            <span className="font-normal">{redeemData?.availableRewards || 0}</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50   py-4">
            <span className="font-medium">Last Reward Received:</span>
            <span className="font-normal">{formatDate(redeemData?.lastRewardReceived) || "—"}</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50 py-4">
            <span className="font-medium">Reward Points:</span>
            <span className="font-normal">{redeemData?.points || 0}</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50 py-4">
            <span className="font-medium">Card Expire Date:</span>
            <span></span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/50 py-4">
            <span className="font-medium">Earning Rule:</span>
            <span></span>
          </div>

          <div className="flex justify-between py-4">
            <span className="font-medium">App:</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPoint;
