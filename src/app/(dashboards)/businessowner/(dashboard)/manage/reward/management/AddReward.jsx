"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputField from "@/src/components/InputField";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import Dropdown from "@/src/components/Dropdown";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddReward = () => {
  // 🔹 ENUM SAFE STATUS
  const [rewardStatus, setRewardStatus] = useState("ACTIVE");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Branches
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");

  // 🔹 Logo State
  const [rewardImage, setRewardImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔹 Form Data
  const [formData, setFormData] = useState({
    rewardName: "",
    rewardType: "",
    earningRule: "",
    earnPoint: "",
    expiryDays: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 Fetch Branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        const res = await fetch(
          `${BASE_URL}/business-owner/branchs/my-branches`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const json = await res.json();

        if (res.ok && Array.isArray(json.data)) {
          setBranches(json.data);
        } else {
          setBranches([]);
        }
      } catch {
        setBranches([]);
      }
    };

    fetchBranches();
  }, []);

  // 🔹 Submit
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const accessToken = Cookies.get("accessToken");
    const businessId = Cookies.get("businessId");

    if (!businessId) {
      setMessage("Business not found");
      setLoading(false);
      return;
    }

    if (!selectedBranchId) {
      setMessage("Please select a branch");
      setLoading(false);
      return;
    }

    if (!formData.rewardType) {
      setMessage("Please select reward type");
      setLoading(false);
      return;
    }

    const form = new FormData();

    form.append("rewardName", formData.rewardName);
    form.append("reward", formData.rewardName);
    form.append("rewardType", formData.rewardType);
    form.append("earningRule", formData.earningRule);
    form.append("earnPoint", Number(formData.earnPoint));
    form.append("expiryDays", Number(formData.expiryDays));
    form.append("rewardStatus", rewardStatus);
    form.append("isActive", rewardStatus === "ACTIVE");
    form.append("branchId", selectedBranchId);
    form.append("businessId", businessId);

    if (rewardImage) {
      form.append("rewardImage", rewardImage); // backend field name must match
    }

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/earn-reward/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "Reward create failed");
        return;
      }

      toast.success("Reward created successfully");
      router.push("/businessowner/manage/reward");
      

      // Reset
      setFormData({
        rewardImage: null,
        rewardName: "",
        rewardType: "",
        earningRule: "",
        earnPoint: "",
        expiryDays: "",
      });
      setSelectedBranchId("");
      setRewardStatus("ACTIVE");
      setRewardImage(null);
      setPreview(null);
    } catch {
      toast.err("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      {/* Logo Upload */}
      <p className="font-inter text-xl dark:text-white">Reward Logo</p>

      <div className="relative md:w-[7.6%] mt-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setRewardImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          <Image
            src={preview }
            alt="Logo"
            width={120}
            height={120}
            className="rounded-xl object-cover bg-white border border-gray-300 "
          />
        </label>
      </div>

      {/* Form */}
      <div className="grid grid-cols-12 gap-5 md:gap-20 mt-7">
        <InputField
          label="Reward Name"
          value={formData.rewardName}
          onChange={(e) => handleChange("rewardName", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Expire Days"
          type="number"
          value={formData.expiryDays}
          onChange={(e) => handleChange("expiryDays", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <Dropdown
          label="Reward Type"
          labelClass="text-xl mb-2"
          options={["EARN", "REDEEM", "FREE_ITEM"]}
          onSelect={(value) => handleChange("rewardType", value)}
          className="col-span-12 md:col-span-6"
          inputClass="rounded-2xl border p-4"
        />

        <InputField
          label="Earning Rule"
          value={formData.earningRule}
          onChange={(e) => handleChange("earningRule", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Earn Point"
          type="number"
          value={formData.earnPoint}
          onChange={(e) => handleChange("earnPoint", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <Dropdown
          label="Branch"
          labelClass="text-xl mb-2"
          options={branches.map((b) => b.name)}
          onSelect={(name) => {
            const branch = branches.find((b) => b.name === name);
            setSelectedBranchId(branch?.id || "");
          }}
          className="col-span-12 md:col-span-6"
          inputClass="rounded-2xl border p-4"
        />
      </div>

      {/* Reward Status */}
      <div className="mt-10">
        <p className="font-inter text-xl mb-4">Reward Status</p>

        <div
          className="flex items-center gap-3 bg-[#CECECE] px-3 py-2 rounded-2xl cursor-pointer w-[160px]"
          onClick={() =>
            setRewardStatus((prev) =>
              prev === "ACTIVE" ? "INACTIVE" : "ACTIVE"
            )
          }
        >
          <div
            className={`w-12 h-6 rounded-full relative ${
              rewardStatus === "ACTIVE" ? "bg-black" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                rewardStatus === "ACTIVE"
                  ? "translate-x-6"
                  : "translate-x-0"
              }`}
            />
          </div>

          <span
            className={
              rewardStatus === "ACTIVE"
                ? "text-green-700"
                : "text-red-500"
            }
          >
            {rewardStatus}
          </span>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] text-black font-semibold text-xl py-3 px-10 rounded-lg mt-12 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Reward"}
        </button>
      </div>

      {message && <p className="text-center mt-6">{message}</p>}
    </div>
  );
};

export default AddReward;
