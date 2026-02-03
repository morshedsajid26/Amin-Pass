"use client";
import React, { useState } from "react";
import InputField from "@/src/components/InputField";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";

const ForgotPin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/staff/auth/forgot-pin`,
        { email },
        { withCredentials: false } 
      );

      if (res.status === 200 && res.data.status === "success") {
        
        sessionStorage.setItem("staffResetEmail", email);

        setSuccess("OTP sent successfully!");
        router.push("/staff/otp");
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className="gap-5 flex flex-col items-center w-[480px]"
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333]">
          Forget Pin?
        </h3>

        <p className="font-inter text-[#333333] mb-5">
          Please enter your email to get verification code
        </p>

        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelClass="text-[#333333] text-[16px]"
          inputClass="border-[#005FA8] rounded-[4px] text-[#5C5C5C] py-3"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg mt-5"
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>
      </form>
    </main>
  );
};

export default ForgotPin;
