"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Password from "@/src/components/Password";
import { BASE_URL } from "@/src/config/api";

const NewPass = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/businessowner/forgotpassword");
    }
  }, [router]);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
          newPassword: password, //    ONLY FIELD API NEEDS
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        router.push("/businessowner/success");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white dark:bg-[#141414] grid place-items-center py-30 px-10 rounded-3xl font-inter">
      <form
        onSubmit={handleSubmit} //    FIXED
        className="flex flex-col items-center gap-7 w-[480px]"
      >
        <h3 className="text-[32px] font-medium dark:text-white">
          Set a new password
        </h3>

        <p className="dark:text-white text-center">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <Password
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Password
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] w-full py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
};

export default NewPass;
