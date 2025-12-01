"use client";
import Image from "next/image";
import React, { useState } from "react";

import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


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

      const res = await fetch("http://127.0.0.1:8000/api/login", {
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

        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push("/systemowner/home");
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
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form
        onSubmit={handleLogin}
        className="gap-5 flex flex-col items-center w-[480px] "
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333] mb-6 mt-">
          Login to Account
        </h3>

        <p className="font-inter  text-[#333333]">
          Please enter your email and password to continue
        </p>

        <InputField
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelClass={`text-[#333333] text-[16px]`}
          placeholder=""
          inputClass={`border-[#005FA8] rounded-[4px]  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
        />
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          // placeholder="Enter your password"
        />

        <div className="flex justify-between items-center  w-full ">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" className=" accent-[#005FA8]" />
            <p className="text-[#333333] font-inter ">Remember Password</p>
          </div>
          <a
            href="/systemowner/forgotpassword"
            className="text-[#333333] hover:text-[#005FA8] font-inter hover:underline"
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
      </form>
    </main>
  );
};

export default SignIn;
