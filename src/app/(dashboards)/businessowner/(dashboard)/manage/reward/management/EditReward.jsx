"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/rewardLogo.png";
import InputField from "@/src/components/InputField";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import Dropdown from "@/src/components/Dropdown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditReward = ({ id }) => {
  const router = useRouter();
  
  // 🔹 ENUM SAFE STATUS
  const [rewardStatus, setRewardStatus] = useState("ACTIVE");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  // 🔹 Branches
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");

  // 🔹 Form Data
  const [formData, setFormData] = useState({
    rewardName: "",
    rewardType: "",
    earningRule: "",
    earnPoint: "",
    expiryDays: "",
  });

  // 🔹 Input handler
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 Fetch Branches & Reward Details
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    const fetchBranches = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/business-owner/branchs/my-branches`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
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

    const fetchRewardDetails = async () => {
      if (!id) return;
      try {
        const res = await fetch(
          `${BASE_URL}/business-owner/earn-reward/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            },
        );
        const json = await res.json();
        
        if (res.ok && json.data) {
          const reward = json.data;
          setFormData({
            rewardName: reward.rewardName || "",
            rewardType: reward.rewardType || "",
            earningRule: reward.earningRule || "",
            earnPoint: reward.earnPoint || "",
            expiryDays: reward.expiryDays || "",
          });
          setRewardStatus(reward.rewardStatus || "ACTIVE");
          setSelectedBranchId(reward.branchId || "");
        } else {
          toast.error("Failed to fetch reward details");
        }
      } catch (error) {
        console.error("Error fetching reward:", error);
        toast.error("Something went wrong while fetching reward");
      } finally {
        setFetching(false);
      }
    };

    fetchBranches();
    fetchRewardDetails();
  }, [id]);

  // 🔹 Submit (Update)
  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    const accessToken = Cookies.get("accessToken");
    const businessId = Cookies.get("businessId");

    if (!businessId) {
      toast.error("Business not found");
      setLoading(false);
      return;
    }

    if (!selectedBranchId) {
      toast.error("Please select a branch");
      setLoading(false);
      return;
    }

    if (!formData.rewardType) {
      toast.error("Please select reward type");
      setLoading(false);
      return;
    }

    const payload = {
      reward: formData.rewardName, 
      rewardName: formData.rewardName,
      rewardType: formData.rewardType,
      earningRule: formData.earningRule,
      earnPoint: Number(formData.earnPoint),
      expiryDays: Number(formData.expiryDays),
      rewardStatus: rewardStatus, 
      isActive: rewardStatus === "ACTIVE", 
      branchId: selectedBranchId,
      businessId,
    };

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/earn-reward/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Reward update failed");
        setLoading(false);
        return;
      }

      toast.success("Reward updated successfully");
      router.push("/businessowner/manage/reward"); // Redirect after update
      
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="pt-8">
      {/* Logo */}
      <p className="font-inter text-xl dark:text-white">Reward Logo</p>
      <div className="relative md:w-[7.6%] mt-4">
        <Image src={logo} alt="logo" />
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

        {/* Reward Type */}
        <Dropdown
          label="Reward Type"
          labelClass={`text-xl mb-2`}
          options={["EARN", "REDEEM", "FREE_ITEM"]}
          defaultValue={formData.rewardType}
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

        {/* Branch Dropdown */}
        <Dropdown
          label="Branch"
          labelClass={`text-xl mb-2`}
          options={branches.map((b) => b.name)}
          defaultValue={branches.find(b => b.id === selectedBranchId)?.name || "Select Branch"}
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
              prev === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            )
          }
        >
          <div
            className={`w-12 h-6 rounded-full relative ${
              rewardStatus === "ACTIVE" ? "bg-black" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full ${
                rewardStatus === "ACTIVE" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>

          <span
            className={
              rewardStatus === "ACTIVE" ? "text-green-700" : "text-red-500"
            }
          >
            {rewardStatus}
          </span>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-[#7AA3CC] text-black font-semibold text-xl py-3 px-10 rounded-lg mt-12 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Reward"}
        </button>
      </div>
    </div>
  );
};

export default EditReward;
