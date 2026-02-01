"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";

const Redeem = () => {
  const inputs = useRef([]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PIN INPUT ================= */

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

  /* ================= SEARCH API ================= */

  const handleSearch = async () => {
    const code = getCode();

    if (code.length !== 6) {
      setError("Please enter 6 digit code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");

      if (!token || !branchId) {
        throw new Error("Unauthorized");
      }

      const res = await fetch(`${BASE_URL}/staff/redeem/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          branchId,
        }),
      });

      const result = await res.json();
      console.log("REDEEM SEARCH RESPONSE:", result);

      if (
        !res.ok ||
        !result?.success ||
        !result?.data?.customer ||
        !result?.data?.reward
      ) {
        throw new Error(result?.message || "Invalid redeem response");
      }

      /* ---------- SAFE STORE ---------- */
      localStorage.setItem(
        "redeemData",
        JSON.stringify({
          customer: result.data.customer,
          reward: result.data.reward,
        })
      );

      router.push("/staff/redeem/add/redeem");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div>
      <Bredcumb />

      <div className="flex flex-col md:flex-row items-center gap-14">
        <div className="flex gap-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              inputMode="numeric"
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                md:w-[77px] w-15
                md:h-[77px] h-15
                border border-[#7AA3CC]
                rounded-[10px]
                text-center
                outline-none
                text-2xl
                font-inter
                font-bold
                text-[#005FA8]
              "
            />
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="
            bg-[#7AA3CC]
            text-[#010101]
            font-semibold
            text-xl
            font-inter
            py-3 px-10
            rounded-lg
            disabled:opacity-60
          "
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 mt-6 font-inter">
          {error}
        </p>
      )}
    </div>
  );
};

export default Redeem;
