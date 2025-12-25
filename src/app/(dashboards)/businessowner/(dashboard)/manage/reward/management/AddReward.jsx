"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/rewardLogo.png";
import InputField from "@/src/components/InputField";
import Cookies from "js-cookie";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const AddReward = () => {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    start_date: "",
    expire_date: "",
    name: "",
    reward_type: "",
    earning_rule: "",
    threshold: "",
  });

  // 🔹 input handler
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 submit
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const payload = {
      name: formData.name,
      reward_type: formData.reward_type,
      earning_rule: formData.earning_rule,
      threshold: Number(formData.threshold),
      start_date: formData.start_date,
      expire_date: formData.expire_date,
      is_active: active, // ✅ Active / Inactive নিশ্চিত
    };

    console.log("Submitting payload:", payload); // 🔍 debug

    try {
      const token = Cookies.get("token");

      const res = await fetch(
        `${BUSINESSOWNER_BASE_URL}/api/owner/rewards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setMessage("❌ Reward create failed");
        return;
      }

      setMessage("✅ Reward created successfully");

      // reset
      setFormData({
        start_date: "",
        expire_date: "",
        name: "",
        reward_type: "",
        earning_rule: "",
        threshold: "",
      });
      setActive(true);
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      {/* Logo */}
      <p className="font-inter text-xl dark:text-white">Reward Logo</p>
      <div className="relative w-[7.6%] mt-4">
        <Image src={logo} alt="logo" />
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-20 mt-7">
        <InputField
          label="Created Date"
          type="date"
          value={formData.start_date}
          onChange={(e) => handleChange("start_date", e.target.value)}
        />
        <InputField
          label="Expire Date"
          type="date"
          value={formData.expire_date}
          onChange={(e) => handleChange("expire_date", e.target.value)}
        />
        <InputField
          label="Reward Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <InputField
          label="Reward Type"
          value={formData.reward_type}
          onChange={(e) => handleChange("reward_type", e.target.value)}
        />
        <InputField
          label="Earning Rule"
          value={formData.earning_rule}
          onChange={(e) => handleChange("earning_rule", e.target.value)}
        />
        <InputField
          label="Threshold"
          type="number"
          value={formData.threshold}
          onChange={(e) => handleChange("threshold", e.target.value)}
        />
      </div>

      {/* Active / Inactive Toggle */}
      <div className="mt-10">
        <p className="font-inter text-xl mb-4">Reward Status</p>

        <div
          className="flex items-center gap-3 bg-[#CECECE] dark:bg-[#0F0F0F] px-3 py-2 rounded-2xl cursor-pointer w-[160px]"
          onClick={() => setActive((prev) => !prev)}
        >
          <div
            className={`w-12 h-6 rounded-full relative transition-all ${
              active ? "bg-black dark:bg-white" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-black rounded-full transition-all ${
                active ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>

          <span
            className={`font-inter text-[18px] ${
              active ? "text-green-700" : "text-red-500"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-10 rounded-lg mt-12 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Reward"}
        </button>
      </div>

      {message && (
        <p className="text-center mt-6 font-inter">{message}</p>
      )}
    </div>
  );
};

export default AddReward;
