"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import Link from "next/link";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      const msg = "Email and password are required";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/staff/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      /* ===== SAVE TOKEN ===== */
      Cookies.set("token", data?.data?.token, {
        secure: true,
        sameSite: "Lax",
      });

      /* ===== SAVE BRANCH ID ===== */
      if (data?.data?.branchId) {
        localStorage.setItem("branchId", data.data.branchId);
      }

      router.push("/staff/customer/platform");
    } catch (err) {
      const msg = err.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white grid justify-center items-center py-20 px-11 rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className="gap-5 flex flex-col items-center w-[480px]"
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333] mb-4">
          Signin to Account
        </h3>

        <p className="font-inter text-[#333333] mb-4">
          Please enter your email and password to continue
        </p>

        <InputField
          label="Email Address"
          type="email"
          labelClass="text-[#333333] text-[16px]"
          inputClass="border-[#005FA8] rounded-[4px] text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Password
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* notifications shown via toast */}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full py-3 rounded-lg mt-8 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="font-inter mt-3">
          Don’t have an account?
          <Link href="/staff/signup" className="font-bold ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
