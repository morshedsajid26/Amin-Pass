"use client";
import React, { useState } from "react";

import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";

const ForgotPass = () => {
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

      //    OTP send request to backend
      const res = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email: email,
      });
      console.log("OTP API RESPONSE:", res.data);

      if (res.status === 200 && res.data.status === "success") {
        setSuccess("OTP sent successfully!");
        sessionStorage.setItem("resetEmail", email);
        router.push("/businessowner/otp");
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white  dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl font-inter ">
      <form
        onClick={handleSubmit}
        className="gap-5 flex flex-col items-center w-[480px] "
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333] dark:text-white">
          Forget Password?
        </h3>

        <p className="font-inter  text-[#333333] dark:text-white mb-5">
          Please enter your email to get verification code
        </p>

        <InputField
          label="Email Address"
          labelClass={`text-[#333333] dark:text-white text-[16px]`}
          inputClass={`border-[#005FA8] rounded-[4px]  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C] dark:text-white`}
          name="email"
          type={`email`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

        
          <button 
          type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-5">
           {loading ? "Sending OTP..." : "Continue"}
          </button>
       
      </form>
    </main>
  );
};

export default ForgotPass;
