"use client";

import Image from "next/image";
import React, { useState } from "react";
import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("http://sajid23s-business.127.0.0.1.nip.io:8000/api/owner/login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (res.ok) {
        setMessage("Login successful!");
        setIsSuccess(true);

        // Save JWT Token
        if (data.token) {
          Cookies.set("token", data.token);
        }

        
        setTimeout(() => {
          router.push("/businessowner/home");
        }, 500);
      } else {
        setMessage(JSON.stringify(data));
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Something went wrong!");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  return (
    <main className="bg-white dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl">
      <form
        onSubmit={handleLogin}
        className="gap-5 flex flex-col items-center w-[480px]"
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333] dark:text-white mb-6">
          Login to Account
        </h3>

        <p className="font-inter text-[#333333] dark:text-white">
          Please enter your email and password to continue
        </p>

        <InputField
          label="Email Address"
          
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelClass="text-[#333333] dark:text-white text-[16px]"
          inputClass="border-[#005FA8] dark:bg-[#151212] rounded-[4px] text-[#5C5C5C] dark:text-white py-3"
        />

        <Password
          label="Password"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          labelClass="dark:text-white"
          inputClass="dark:text-white dark:bg-[#151212]"
        />

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" className="accent-[#005FA8]" />
            <p className="text-[#333333] dark:text-white font-inter">
              Remember Password
            </p>
          </div>
          <a
            href="/businessowner/forgotpassword"
            className="text-[#333333] dark:text-white hover:text-[#005FA8] font-inter hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {message && (
          <p
            className={`text-center mt-2 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-12"
        >
          {loading ? "Processing..." : "Log In"}
        </button>

        <p className="text-center mt-5 font-inter dark:text-white">
          Don't have an Account?{" "}
          <a href="/signup" className="text-[#7AA3CC]">
            SignUp
          </a>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
