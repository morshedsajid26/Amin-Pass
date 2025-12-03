"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const OTP = () => {
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); 
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/businessowner/forgotpassword");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const finalOtp = otp.join(""); 

    if (finalOtp.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/password/verify-otp",
        {
          email: email,
          otp: finalOtp, 
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 && res.data.status === "success") {
        setSuccess("OTP Verified Successfully!");
        setTimeout(() => {
          router.push("/businessowner/newpassword");
        }, 800);
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "OTP verification failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-20 px-15 rounded-3xl">
      <form className="flex flex-col items-center text-center w-[480px]" onSubmit={handleSubmit}>
        <h1 className="text-[32px] text-[#333333] dark:text-white font-inter font-medium">
          Check your email
        </h1>
        <p className="font-inter text-[16px] text-[#333333] dark:text-white mt-6">
          We sent a code to your email address. Please check your email for the
          4 digit code.
        </p>

        <div className="flex gap-4 justify-center my-[82px]">
          {[...Array(4)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              value={otp[i]} 
              className="appearance-none w-[47px] h-[49px] border border-[#7AA3CC] rounded-[10px] text-center outline-none text-xl font-inter font-bold text-[#005FA8] dark:text-white"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full font-inter font-semibold text-[16px] bg-[#7AA3CC] text-[#000000] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="font-inter text-[16px] text-[#333333] dark:text-white mt-[92px]">
          You have not received the email?
          <a
            href="/businessowner/forgotpassword"
            className="text-[#005FA8] cursor-pointer underline m-2"
          >
            Resend
          </a>
        </p>
      </form>
    </div>
  );
};

export default OTP;
