"use client";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import Password from "@/src/components/Password";

const AddTenant = () => {
  const router = useRouter();

  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    managerName: "",
    password: "",
    phone: "",
    address: "",

    businessName: "",
    industry: "",
    country: "",

    branchAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= HANDLER ================= */
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = Cookies.get("accessToken");

      const payload = {
        owner: {
          name: formData.ownerName,
          email: formData.ownerEmail,
          managerName: formData.managerName,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
        },
        business: {
          name: formData.businessName,
          industry: formData.industry,
          country: formData.country,
        },
        branch: {
          address: formData.branchAddress,
        },
      };

      console.log("TENANT PAYLOAD 👉", payload);

      const res = await fetch(`${BASE_URL}/system-owner/tenants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "❌ Tenant create failed");
        return;
      }

      setMessage("✅ Tenant created successfully");
      router.back();
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* OWNER */}
      <div>
        <h3 className="font-inter font-medium text-2xl underline text-[#000000]">
          Marchent Add to the Platform
        </h3>

        <div className="grid grid-cols-12 md:gap-x-16 gap-x-5 gap-y-5 mt-4">
          <InputField
            label="Owner Name"
            placeholder="Enter your Owner name"
            className="col-span-12 md:col-span-6"
            value={formData.ownerName}
            onChange={(e) => handleChange("ownerName", e.target.value)}
          />

          <InputField
            label="Address"
            placeholder="Enter your address"
            className=" col-span-12 md:col-span-6"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <InputField
            type="email"
            label="Owner Email"
            placeholder="Enter your email"
            className="col-span-12  md:col-span-6"
            value={formData.ownerEmail}
            onChange={(e) => handleChange("ownerEmail", e.target.value)}
          />

          <InputField
            type="number"
            label="Phone Number"
            placeholder="Enter your phone number"
            className="col-span-12 md:col-span-6"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          {/* hidden but REQUIRED */}
          <InputField
            label="Manager Name"
            placeholder="Manager name"
            className="col-span-12  md:col-span-6"
            value={formData.managerName}
            onChange={(e) => handleChange("managerName", e.target.value)}
          />

          {/* <InputField
            label="Password"
            placeholder="Password"
            type="password"
            className="col-span-12  md:col-span-6"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          /> */}

          <Password
            label="Password"
            labelClass="text-xl font-inter text-black"
            placeholder="Password"
            className="col-span-12  md:col-span-6"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            inputClass={`border-black py-4 rounded-2xl text-xl text-black `}
            icon="text-black"
          />
        </div>
      </div>

      {/* BUSINESS */}
      <div>
        <h3 className="font-inter font-medium text-2xl underline text-[#000000] mt-10">
          Business Information
        </h3>

        <div className="grid grid-cols-12 md:gap-x-16 gap-x-5 gap-y-5 mt-4">
          <InputField
            label="Business Name"
            placeholder="Enter your Business name"
            className="col-span-12"
            value={formData.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
          />

          <InputField
            label="Industry Type"
            placeholder="Enter your industry"
            className="col-span-12  md:col-span-6"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
          />

          <InputField
            label="Country"
            placeholder="Enter your Country"
            className="col-span-12  md:col-span-6"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
      </div>

      {/* BRANCH */}
      <div>
        <h3 className="font-inter font-medium text-2xl underline text-[#000000] mt-10">
          Branch Information
        </h3>

        <div className="grid grid-cols-12 md:gap-x-16 gap-x-5 gap-y-5 mt-4">
          <InputField
            label="Branch Address"
            placeholder="Branch address"
            className="col-span-12"
            value={formData.branchAddress}
            onChange={(e) => handleChange("branchAddress", e.target.value)}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-30 flex items-center gap-5 justify-center">
        <button
          onClick={() => router.back()}
          className="border border-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000]"
        >
          Close
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {message && (
        <p className="text-center mt-6 font-inter text-lg">{message}</p>
      )}
    </>
  );
};

export default AddTenant;
