"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { FaMinus, FaPlus } from "react-icons/fa";

import Bredcumb from "@/src/components/Bredcumb";
import Avatar from "@/public/Avatar.png";
import { BASE_URL } from "@/src/config/api";

const AddPoint = () => {
  /* ================= DATE ================= */
  const formattedDate = new Date().toLocaleDateString("en-GB");

  /* ================= STATE ================= */
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [reward, setReward] = useState(null);

  /* ================= LOAD LOCAL DATA ================= */
  useEffect(() => {
    const stored = localStorage.getItem("redeemData");
    if (!stored || stored === "undefined") return;

    try {
      const parsed = JSON.parse(stored);
      if (parsed?.customer && parsed?.reward) {
        setCustomer(parsed.customer);
        setReward(parsed.reward);
      }
    } catch (err) {
      console.error("Invalid redeemData", err);
      localStorage.removeItem("redeemData");
    }
  }, []);

  /* ================= SAFE DEFAULTS ================= */
  const safeCustomer = customer || {
    name: "—",
    email: "—",
  };

  const safeReward = reward || {
    activeRewards: 0,
    availableRewards: 0,
    lastRewardReceived: "-",
    rewardPoints: 0,
    cardExpireDate: "-",
    earningRule: "-",
    walletApp: "-",
  };

  /* ================= COUNTER ================= */
  const handleIncrease = () => setCount((prev) => prev + 1);

  const handleDecrease = () =>
    setCount((prev) => (prev > 0 ? prev - 1 : 0));

  /* ================= ADD POINT API ================= */
  const handleAddPoint = async () => {
    if (count === 0 || !customer) return;

    try {
      setLoading(true);

      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");

      if (!token || !branchId) {
        throw new Error("Unauthorized");
      }

      const res = await fetch(
        `${BASE_URL}/staff/redeem/add-point`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customerId: customer.id,
            branchId,
            points: count,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to add points");
      }

      /* ---------- UI UPDATE ---------- */
      setReward((prev) => ({
        ...prev,
        rewardPoints: prev.rewardPoints + count,
      }));

      setMessage(
        `   ${count} Point${count > 1 ? "s" : ""} added successfully`
      );
      setCount(0);

      setTimeout(() => setMessage(""), 1500);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div>
      <Bredcumb />

      {/* ---------- TOP SECTION ---------- */}
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-25">
        {/* CUSTOMER INFO */}
        <div className="bg-white w-full md:w-[50%] rounded-2xl py-2 px-6">
          <div className="flex items-center gap-6">
            <Image
              src={Avatar}
              alt="User"
              width={80}
              height={80}
              className="rounded-full"
            />

            <div>
              <h2 className="font-inter text-2xl font-medium text-black">
                {safeCustomer.name}
              </h2>
              <p className="font-inter font-medium text-black">
                {safeCustomer.email}
              </p>
            </div>
          </div>
        </div>

        {/* DATE */}
        <div className="bg-white w-full md:w-[20%] rounded-2xl py-3 px-10">
          <p className="font-inter font-medium text-2xl">
            {formattedDate}
          </p>
          <p className="font-inter font-medium mt-3">
            Visit Date
          </p>
        </div>
      </div>

      {/* ---------- COUNTER ---------- */}
      <div className="flex flex-col items-center justify-center mt-5 md:mt-17 gap-8">
        <div className="bg-[#E1E1E1] rounded-2xl w-full md:w-[30%] flex items-center justify-between py-5 px-10">
          <FaMinus
            onClick={handleDecrease}
            className="w-12 h-12 cursor-pointer"
          />

          <p className="font-inter font-bold text-[40px]">
            {count}
          </p>

          <FaPlus
            onClick={handleIncrease}
            className="w-12 h-12 cursor-pointer"
          />
        </div>

        <button
          onClick={handleAddPoint}
          disabled={loading}
          className="
            font-inter font-bold text-2xl
            bg-[#7AA3CC]
            py-3 px-10 md:px-12
            rounded-lg
            cursor-pointer
            disabled:opacity-60
          "
        >
          {loading ? "Adding..." : "Add Points"}
        </button>

        {message && (
          <p className="font-inter font-medium bg-[#6AC70D] px-4 py-2 rounded-lg">
            {message}
          </p>
        )}
      </div>

      {/* ---------- REWARD INFO ---------- */}
      <div className="bg-white rounded-4xl py-14 px-14 mt-10">
        <Info label="Active Reward" value={safeReward.activeRewards} />
        <Info label="Available Reward" value={safeReward.availableRewards} />
        <Info
          label="Last Reward Received"
          value={safeReward.lastRewardReceived}
        />
        <Info label="Reward Points" value={safeReward.rewardPoints} />
        <Info label="Card Expire Date" value={safeReward.cardExpireDate} />
        <Info label="Earning Rule" value={safeReward.earningRule} />
        <Info label="App" value={safeReward.walletApp} last />
      </div>
    </div>
  );
};

export default AddPoint;

/* ================= SMALL COMPONENT ================= */
const Info = ({ label, value, last }) => (
  <div
    className={`
      flex justify-between py-4
      font-inter text-2xl
      ${!last ? "border-b border-black/10" : ""}
    `}
  >
    <span className="font-medium">{label}:</span>
    <span className="font-normal">{value}</span>
  </div>
);
