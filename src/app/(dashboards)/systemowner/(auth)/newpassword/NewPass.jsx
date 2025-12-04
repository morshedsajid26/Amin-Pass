"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Password from "@/src/components/Password";
import { useRouter } from "next/navigation";


const NewPass = () => {
   const router = useRouter();

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/businessowner/forgotpassword");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/password/reset",
        {
          email: email, 
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        // setSuccess("Password updated successfully!");

        setTimeout(() => {
          router.push("/businessowner/success");
        });
      }
    } catch (err) {
      console.error("Reset Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-white  dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-18 rounded-3xl  ">
      <form 
      onClick={handleSubmit}
      className=" flex flex-col items-center text-cente gap-7 w-[480px]">
        <h3 className="font-inter font-medium text-[32px] text-[#333333] dark:text-white ">
          Set a new password
        </h3>

        <p className="font-inter  text-[#333333] dark:text-white mb-5 text-center">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <Password
          label="Password"
          labelClass={`dark:text-white`}
          placeholder="Enter your password"
          inputClass={`dark:text-white`}
          name={`password`}
          value={formData.password}
          onChange={handleChange}
        />

        <Password
          label="Confirm Password"
          labelClass={`dark:text-white`}
          placeholder="Enter your password again"
          inputClass={`dark:text-white`}
          name={`confirmPassword`}
           value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        
          <button 
            type="submit"
          disabled={loading}
          className="bg-[#7AA3CC] text-[#000000] w-full font-semibold font-inter  py-3 rounded-lg mt-5 cursor-pointer">
            {loading ? "Updating..." : "Update Password"}
          </button>
      
      </form>
    </main>
  );
};

export default NewPass;
