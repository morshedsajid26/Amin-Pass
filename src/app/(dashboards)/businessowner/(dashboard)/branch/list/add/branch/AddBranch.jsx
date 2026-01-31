"use client";

import Bredcumb from "@/src/components/Bredcumb";
import InputField from "@/src/components/InputField";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const AddBranch = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    branchLocation: "",
    staffCount: "",
    managerName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 input change handler
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 submit handler
 const handleSubmit = async () => {
  setLoading(true);
  setMessage("");

  try {
    const accessToken = Cookies.get("accessToken"); 

    const res = await fetch(
      `${BUSINESSOWNER_BASE_URL}/business-owner/branchs/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          branchName: formData.branchName,
          branchLocation: formData.branchLocation,  
          staffCount: formData.staffCount,
          managerName: formData.managerName,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data); // 🔥 validation error দেখাবে
      throw new Error(data.message || "Failed");
    }

    setMessage("✅ Branch created successfully");

    setFormData({
      branchName: "",
      branchLocation: "",
      staffCount: "",
      managerName: "",
    });
  } catch (error) {
    console.error(error);
    setMessage("❌ Failed to create branch");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Bredcumb />

      <div className="grid grid-cols-12 gap-10">
        <InputField
          label="Business Name"
          value={formData.branchName}
          onChange={(e) =>
            handleChange("branchName", e.target.value)
          }
          className={`col-span-12 md:col-span-6`}
        />

        <InputField
          label="Branch Location"
          value={formData.branchLocation}
          onChange={(e) =>
            handleChange("branchLocation", e.target.value)
          }
          className={`col-span-12 md:col-span-6`}
        />

        <InputField
          label="Number of Staff"
          type="number"
          value={formData.staffCount}
          onChange={(e) =>
            handleChange("staffCount", e.target.value)
          }
          className={`col-span-12 md:col-span-6`}
        />

        <InputField
          label="Manager Name"
          value={formData.managerName}
          onChange={(e) =>
            handleChange("managerName", e.target.value)
          }
          className={`col-span-12 md:col-span-6`}
        />
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000] cursor-pointer mt-20 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {message && (
          <p className="mt-4 font-inter text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddBranch;
