"use client";

import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/src/config/api";

const LogIn = () => {
  const router = useRouter();
  const inputs = useRef([]);

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

  const getPin = () =>
    inputs.current.map((input) => input?.value || "").join("");

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    const pin = getPin();
    const branchId = localStorage.getItem("branchId"); //    FROM LOCAL

    if (pin.length !== 6) {
      setError("PIN must be 6 digits");
      return;
    }

    if (!branchId) {
      setError("Branch not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/staff/auth/pin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin,
          branchId, //    LOCAL STORAGE VALUE
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) throw new Error(data.message || "Login failed");

      //    SAVE TOKEN + FLAGS
      Cookies.set("token", data.data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      // localStorage.setItem("requirePinSetup", data.requirePinSetup);

      router.push("/staff/customer/platform");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <main className="bg-white grid justify-center items-center py-30 px-11 rounded-3xl">
      <div className="gap-5 flex flex-col items-center w-[480px]">
        <h3 className="font-inter font-medium text-[32px] text-[#333333]">
          Login to Account
        </h3>

        <p className="font-inter text-[#333333]">
          Please enter your PIN to continue
        </p>

        {/* 🔢 PIN INPUT */}
        <div className="flex gap-4 justify-center mt-10">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-[47px] h-[49px] border border-[#7AA3CC]
              rounded-[10px] text-center outline-none text-xl
              font-inter font-bold text-[#005FA8]"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold
          text-xl w-[50%] font-inter py-3 rounded-lg mt-10 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <a href="/staff/forgotpin" className="font-inter mt-3">
          Forgot Pin?
        </a>
      </div>
    </main>
  );
};

export default LogIn;
