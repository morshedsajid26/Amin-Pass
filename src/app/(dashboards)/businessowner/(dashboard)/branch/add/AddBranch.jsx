"use client";

import Bredcumb from "@/src/components/Bredcumb";
import InputField from "@/src/components/InputField";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const AddBranch = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    staffs: "",
    manager_name: "",
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
    const token = Cookies.get("token"); // 🔴 exact cookie name

    const res = await fetch(
      `${BUSINESSOWNER_BASE_URL}/api/owner/branches`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.location,   // 🔴 backend expects "address"
          staffs: Number(formData.staffs),
          manager_name: formData.manager_name,
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
      name: "",
      location: "",
      staffs: "",
      manager_name: "",
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

      <div className="grid grid-cols-2 gap-10">
        <InputField
          label="Business Name"
          value={formData.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />

        <InputField
          label="Branch Location"
          value={formData.location}
          onChange={(e) =>
            handleChange("location", e.target.value)
          }
        />

        <InputField
          label="Number of Staff"
          type="number"
          value={formData.staffs}
          onChange={(e) =>
            handleChange("staffs", e.target.value)
          }
        />

        <InputField
          label="Manager Name"
          value={formData.manager_name}
          onChange={(e) =>
            handleChange("manager_name", e.target.value)
          }
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
