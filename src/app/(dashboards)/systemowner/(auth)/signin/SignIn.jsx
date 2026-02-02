"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/src/config/api";


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

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log("data",data);

    if (res.ok) {
      toast.success("Login successful!");
      Cookies.set("accessToken", data.data.accessToken);
      router.push("/systemowner/home");
    } else {
      const msg = data.message || "Login failed";
      setMessage(msg);
      toast.error(msg);
    }
  } catch (err) {
    const msg = "Something went wrong!";
    setMessage(msg);
    toast.error(msg);
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
          type={`email`}
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

        {/* notifications shown via toast */}

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
