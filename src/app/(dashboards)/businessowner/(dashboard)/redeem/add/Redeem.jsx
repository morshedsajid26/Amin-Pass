"use client";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { act, useRef, useState } from "react";

const Redeem = () => {
  const inputs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  /* ---------------- OTP HANDLING ---------------- */

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const getCode = () =>
    inputs.current.map((input) => input?.value || "").join("");

  /* ---------------- SEARCH CUSTOMER ---------------- */

  const handleSearch = async () => {
    const qrCode = getCode();

    if (qrCode.length !== 6) {
      alert("Please enter 6 digit code");
      return;
    }

    const token = Cookies.get("accessToken");
    if (!token) {
      alert("Unauthorized: access token missing");
      return;
    }

    setLoading(true);
    setCustomerData(null);
    setSelectedBranch(null);

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/add-redeem/find-customer/${qrCode}`,
        {
          method: "GET", //    FIXED
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Customer not found");
      }

      setCustomerData(data.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SAVE TO localStorage ---------------- */

  const handleNext = () => {
    if (!selectedBranch || !customerData) return;

    const payload = {
      customerId: customerData.customer.id,
      customerName: customerData.customer.name,
      customerEmail: customerData.customer.email,
      rewardHistoryId: selectedBranch.rewardHistoryId,
      branchId: selectedBranch.branchId,
      branchName: selectedBranch.branchName,
      availableRewards: selectedBranch.availableRewards,
      points: selectedBranch.rewardPoints,
      qrCode: getCode(),
      lastRewardReceived: selectedBranch.lastRewardReceived,
      activeRewards: selectedBranch.activeRewards,
    };

    localStorage.setItem("redeemData", JSON.stringify(payload));
  };

  return (
    <div>
      <Bredcumb />

      {/* OTP INPUT */}
      <div className="flex flex-col md:flex-row items-center gap-10 mt-6">
        <div className="flex gap-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="appearance-none md:w-[77px] w-12 h-12 md:h-[77px]
                border border-[#7AA3CC] rounded-[10px]
                text-center outline-none text-2xl
                font-bold text-[#005FA8]"
            />
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#7AA3CC] dark:text-white text-[#010101]
          font-semibold text-xl font-inter py-3 px-10 rounded-lg
          disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* CUSTOMER + BRANCH LIST */}
      {customerData && (
        <div className="mt-10 max-w-xl space-y-5">
          <h2 className="text-xl font-bold">
            Customer: {customerData.customer.name}
          </h2>

          <div className="space-y-3">
            {customerData.rewardHistories.map((item) => (
              <label
                key={item.id}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer dark:text-white text-[#010101]
           font-inter
                  ${
                    selectedBranch?.rewardHistoryId === item.id
                      ? "border-[#005FA8]"
                      : ""
                  }`}
              >
                <input
                  type="radio"
                  name="branch"
                  onChange={() =>
                    setSelectedBranch({
                      rewardHistoryId: item.id,
                      branchId: item.branchId,
                      branchName: item.branch.name,
                      rewardPoints: item.rewardPoints,
                      availableRewards: item.availableRewards,
                      lastRewardReceived: item.lastRewardReceived,
                      activeRewards: item.activeRewards,
                    })
                  }
                />
                <span className="font-medium">
                  {item.branch.name} — Total Points:{" "}
                  {item.rewardPoints}
                </span>
              </label>
            ))}
          </div>

          {/* NEXT BUTTON */}
          <Link href="/businessowner/redeem/add/redeem">
            <button
              onClick={handleNext}
              disabled={!selectedBranch}
              className="bg-[#7AA3CC] dark:text-white text-[#010101]
          font-semibold text-xl font-inter py-3 px-10 rounded-lg
              disabled:opacity-50"
            >
              Next
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Redeem;
