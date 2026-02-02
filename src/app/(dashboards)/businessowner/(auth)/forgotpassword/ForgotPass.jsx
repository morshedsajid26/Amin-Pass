"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
      const msg = "Please enter your email address";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);

      // OTP send request to backend
      const res = await axios.post(
        `${BASE_URL}/auth/forgot-password`,
        { email: email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("OTP API RESPONSE:", res.data);

      if (res.status === 200 && res.data.status === "success") {
        const msg = "OTP sent successfully!";
        setSuccess(msg);
        toast.success(msg);
        sessionStorage.setItem("resetEmail", email);
        router.push("/businessowner/otp");
      } else {
        const msg = res.data.message || "Failed to send OTP";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      const msg = err.response?.data?.message || "Failed to send OTP";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white  dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl font-inter ">
      <form
        onSubmit={handleSubmit}
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
  {/* notifications shown via toast */}

        
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
