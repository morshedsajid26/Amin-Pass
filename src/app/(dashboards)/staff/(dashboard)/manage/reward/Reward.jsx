"use client";

import Bredcumb from "@/src/components/Bredcumb";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH REWARDS ================= */
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const branchId = localStorage.getItem("branchId");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/staff/rewards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        setRewards(json.data || []);
        setSelectedReward(json.data?.[0] || null); // ✅ first select
      } catch (err) {
        console.error("Rewards error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  return (
    <div>
      <Bredcumb />

      {loading && (
        <p className="font-inter text-xl mt-10">Loading rewards...</p>
      )}

      
        
        

        {/* ================= RIGHT: REWARD DETAILS ================= */}
        <div className="col-span-12 md:col-span-8">
          {selectedReward ? (
            <RewardDetails reward={selectedReward} />
          ) : (
            <p className="font-inter text-xl">
              Select a reward to view details
            </p>
          )}
       
      </div>
    </div>
  );
};

export default Rewards;

/* ================= DETAILS CARD ================= */

const RewardDetails = ({ reward }) => {
  return (
    <div className="bg-white rounded-4xl py-14 px-14">
      <div className="font-inter text-2xl text-[#000000]">
        <Info
          label="Created Date"
          value={new Date(reward.createdDate).toLocaleDateString()}
        />
        <Info label="Reward Name" value={reward.rewardName} />
        <Info label="Reward Points" value={reward.rewardPoints} />
        <Info label="Reward Type" value={reward.rewardType} />
        <Info label="Expiry Days" value={`${reward.expiryDays} days`} />
        <Info label="Earning Rule" value={reward.earningRule} />
        <Info
          label="Reward"
          value={reward.status}
          valueClass={
            reward.status === "ACTIVE"
              ? "text-[#009006]"
              : "text-red-500"
          }
          last
        />
      </div>

      {/* <div className="flex justify-center items-center gap-5 md:gap-12 mt-15">
        <button className="border border-[#7AA3CC] text-[#010101]
        font-semibold text-xl font-inter py-3 px-15 md:px-20 rounded-lg">
          Delete
        </button>

        <button className="bg-[#7AA3CC] text-[#010101]
        font-semibold text-xl font-inter py-3 px-15 md:px-20 rounded-lg">
          Edit
        </button>
      </div> */}
    </div>
  );
};

/* ================= SMALL INFO ================= */

const Info = ({ label, value, valueClass = "", last }) => (
  <div
    className={`flex justify-between py-4 ${
      !last && "border-b border-[#000000]/10"
    }`}
  >
    <span className="font-medium">{label}:</span>
    <span className={`font-normal ${valueClass}`}>
      {value || "-"}
    </span>
  </div>
);
