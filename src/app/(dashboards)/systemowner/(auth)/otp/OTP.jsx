"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";

const OTP = () => {
  const router = useRouter();
  const inputs = useRef([]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ===============================
  // GET EMAIL
  // ===============================
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/businessowner/forgotpassword");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  // ===============================
  // HANDLE BACKSPACE (FULL FIX)
  // ===============================
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1].focus();
      }
    }
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/customer/auth/verify-forgot-password-otp`,
        {
          email: email,
          otp: finalOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          router.push("/businessowner/newpassword");
        }, 800);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#141414] grid place-items-center py-20 px-10 font-inter  rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center w-[480px]"
      >
        <h1 className="text-[32px] font-medium dark:text-white">
          Check your email
        </h1>

        <p className="dark:text-white mt-6">
          We sent a 6 digit code to your email address
        </p>

        <div className="flex gap-4 justify-center my-[82px]">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-[47px] h-[49px] border border-[#7AA3CC]
                         rounded-[10px] text-center text-xl font-bold
                         outline-none text-[#005FA8] dark:text-white"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#7AA3CC] font-semibold
                     disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="mt-[92px] dark:text-white">
          Didn’t receive the email?
          <a
            href="/businessowner/forgotpassword"
            className="text-[#005FA8] underline ml-2"
          >
            Resend
          </a>
        </p>
      </form>
    </div>
  );
};

export default OTP;
