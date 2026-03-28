"use client";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdQrCodeScanner } from "react-icons/md";

const Redeem = () => {
  const scanInputRef = useRef(null);
  const inputs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [scanValue, setScanValue] = useState("");
  const [scanMode, setScanMode] = useState(false);

  /* ----------- Auto-focus scan input when scan mode is on ----------- */
  useEffect(() => {
    if (scanMode && scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [scanMode]);

  /* ----------- Fill individual OTP boxes from a full code ----------- */
  const fillBoxes = (code) => {
    const digits = code.slice(0, 6).split("");
    inputs.current.forEach((input, i) => {
      if (input) input.value = digits[i] || "";
    });
  };

  /* ----------- OTP manual input handling ----------- */
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

  /* ----------- Scanner input change ----------- */
  const handleScanChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setScanValue(val);
    // Auto-search as soon as 6 digits received (scanner sends all at once)
    if (val.length === 6) {
      fillBoxes(val);
      searchByCode(val);
      setScanValue("");
    }
  };

  /* ----------- Scanner Enter key trigger ----------- */
  const handleScanKeyDown = (e) => {
    if (e.key === "Enter" && scanValue.length === 6) {
      fillBoxes(scanValue);
      searchByCode(scanValue);
      setScanValue("");
    }
  };

  /* ----------- Core search function ----------- */
  const searchByCode = async (code) => {
    const token = Cookies.get("accessToken");
    if (!token) { toast.error("Unauthorized: access token missing"); return; }

    setLoading(true);
    setCustomerData(null);
    setSelectedBranch(null);

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/add-redeem/find-customer/${code}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Customer not found");
      }
      setCustomerData(data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ----------- Manual search button ----------- */
  const handleSearch = async () => {
    const qrCode = getCode();
    if (qrCode.length !== 6) { alert("Please enter 6 digit code"); return; }
    await searchByCode(qrCode);
  };

  /* ----------- Save to localStorage ----------- */
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

      {/* ===== SCAN MODE TOGGLE ===== */}
      <div className="mt-6 flex items-center gap-4 flex-wrap">

        {/* Scan Mode Input (hidden when not active) */}
        {scanMode ? (
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <MdQrCodeScanner className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#005FA8]" />
              <input
                ref={scanInputRef}
                type="text"
                inputMode="numeric"
                value={scanValue}
                onChange={handleScanChange}
                onKeyDown={handleScanKeyDown}
                placeholder="Scan with Scanner"
                className="pl-12 pr-4 py-4 border-2 border-[#7AA3CC] rounded-xl
                  outline-none text-xl font-bold text-[#005FA8]
                  w-[340px] tracking-widest font-inter
                  focus:border-[#005FA8] transition-colors"
              />
              {loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-inter">
                  Searching...
                </span>
              )}
            </div>

            <button
              onClick={() => { setScanMode(false); setScanValue(""); }}
              className="border border-red-400 text-red-500 dark:text-red-400
                font-semibold font-inter py-3 px-6 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Manual OTP Boxes */}
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

            {/* QR Scanner Button */}
            <button
              onClick={() => setScanMode(true)}
              className="flex items-center gap-2 border border-[#7AA3CC]
                text-[#005FA8] dark:text-[#7AA3CC]
                font-semibold text-xl font-inter py-3 px-6 rounded-lg"
            >
              <MdQrCodeScanner className="w-6 h-6" />
              Scan QR
            </button>
          </>
        )}
      </div>

      {/* Scan mode hint */}
      {scanMode && (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-inter">
          Scan using the customer's phone QR code scanner — the code will be detected automatically.
        </p>
      )}

      {/* CUSTOMER + BRANCH LIST */}
      {customerData && (
        <div className="mt-10 max-w-xl space-y-5">
          <h2 className="text-xl font-bold dark:text-white">
            Customer: {customerData.customer.name}
          </h2>

          <div className="space-y-3">
            {customerData.rewardHistories.map((item, idx) => (
              <label
                key={item.id ?? idx}
                className={`flex items-center gap-3 border p-3 rounded cursor-pointer
                  dark:text-white text-[#010101] font-inter
                  ${selectedBranch?.rewardHistoryId === item.id ? "border-[#005FA8]" : ""}`}
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
                  {item.branch.name} — Total Points: {item.rewardPoints}
                </span>
              </label>
            ))}
          </div>

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
