"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Support = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    branchName: "",
    issue: "",
    date: "",
    priority: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const businessId = Cookies.get("businessId");
    const token = Cookies.get("accessToken");

    if (!businessId) {
      setMessage("❌ Business ID not found");
      return;
    }

    if (!formData.issue || !formData.date) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    if (!["NORMAL", "MEDIUM", "HIGH"].includes(formData.priority)) {
      setMessage("❌ Invalid priority selected");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        businessId,
        branchName: formData.branchName || null,
        issue: formData.issue,
        priority: formData.priority,
        date: new Date(formData.date).toISOString(),
      };

      console.log("SUPPORT PAYLOAD 👉", payload);

      const res = await fetch(
        `${BASE_URL}/business-owner/support/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "❌ Failed to create support ticket");
        return;
      }

      setMessage("✅ Support ticket created successfully");
      router.back();
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Bredcumb />

      <div className="grid grid-cols-2 gap-10">
        <InputField
          label="Business Name"
          value={formData.branchName}
          onChange={(e) => handleChange("branchName", e.target.value)}
        />

        <InputField
          label="Issue"
          value={formData.issue}
          onChange={(e) => handleChange("issue", e.target.value)}
        />

        <InputField
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />

        <Dropdown
          label="Priority"
          labelClass={`text-xl mb-2`}
          placeholder="Select Priority"
          options={["LOW", "MEDIUM", "HIGH"]}
          inputClass="border p-4 rounded-2xl"
          onSelect={(val) => handleChange("priority", val)}
          
        />
      </div>

      <div className="mt-22 flex justify-center gap-8">
        <button
          onClick={() => router.back()}
          className="border border-[#7AA3CC] px-20 py-3 rounded-md text-black dark:text-white font-semibold"
        >
          Close
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] px-20 py-3 rounded-md disabled:opacity-50 text-black dark:text-white font-semibold"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {message && <p className="text-center mt-6">{message}</p>}
    </div>
  );
};

export default Support;
