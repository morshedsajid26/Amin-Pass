"use client";

import Container from "@/src/components/Container";
import React, { useState } from "react";
import AuthLogo from "@/public/AuthLogo.png";
import Image from "next/image";
import Password from "@/src/components/Password";
import InputField from "@/src/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogIn = () => {
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

        // Save token
        if (data.token) {
          Cookies.set("token", data.token);
        }

        // Redirect after 1.5s
        setTimeout(() => {
          router.push("/businessowner/home"); // Change redirect route if needed
        }, 500);
      } else {
        // Backend error (422/401)
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
    <div className="bg-gradient-to-t from-[#F4F1EC] to-[#B3CBDB] min-h-screen">
      <Container className="flex flex-col items-center py-20 px-11 h-screen overflow-y-auto hide-scrollbar">
        <Image src={AuthLogo} alt="logo" width={230} height={230} />

        <form
          onSubmit={handleLogin}
          className="gap-5 flex flex-col w-[550px] p-10 bg-white rounded-3xl mt-12 shadow-md"
        >
          <h3 className="font-inter font-medium text-[32px] text-[#333333]">
            Login Your Business Account
          </h3>

          <p className="font-inter text-[#333333]">
            Start boosting loyalty and return visits today.
          </p>

          <InputField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelClass="text-[#333333] text-[16px]"
            inputClass="border-[#005FA8] rounded-[4px] text-[#5C5C5C] py-3"
          />

          <Password
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
            className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-20 rounded-2xl cursor-pointer mt-6"
          >
            {loading ? "Processing..." : "Log In"}
          </button>

          <p className="text-center mt-5 font-inter">
            Don't have an Account?{" "}
            <a href="/signup" className="text-[#7AA3CC]">
              SignUp
            </a>
          </p>
        </form>
      </Container>
    </div>
  );
};

export default LogIn;
