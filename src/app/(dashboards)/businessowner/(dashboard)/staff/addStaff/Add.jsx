"use client";

import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import Dropdown from "@/src/components/Dropdown";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "@/src/config/api";

const Add = () => {
  const router = useRouter();

  // 🔹 FORM STATE
  const [formData, setFormData] = useState({
    staffName: "",
    role: "",
    email: "",
    password: "",
  });

  // 🔹 BRANCH STATE
  const [branches, setBranches] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔹 INPUT HANDLER
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 FETCH BRANCHES (Dropdown data)
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

    fetchBranches();
  }, []);

  // 🔹 SUBMIT STAFF CREATE
  const handleSubmit = async () => {
    setLoading(true);

    const accessToken = Cookies.get("accessToken");

    if (!selectedBranchId) {
      toast.error("  Please select a branch");
      setLoading(false);
      return;
    }
    const payload = {
      name: formData.staffName,
      email: formData.email,
      password: formData.password,
      role: "STAFF",
      branchId: selectedBranchId,
    };

    try {
      const res = await fetch(
        `${BASE_URL}/business-owner/manage-staff/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "  Staff create failed");
        setLoading(false);
        return;
      }

      toast.success("   Staff created successfully");
      router.back();
    } catch {
      toast.error(" Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="grid grid-cols-12 gap-5 md:gap-15 mt-10">
        <InputField
          label="Staff Name"
          value={formData.staffName}
          onChange={(e) => handleChange("staffName", e.target.value)}
          inputClass="font-inter text-xl"
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Role"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          inputClass="font-inter text-xl"
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Staff Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          inputClass="font-inter text-xl"
          className="col-span-12 md:col-span-6"
        />

        
        <Dropdown
          label="Branch"
          labelClass={`text-xl mb-2`}
          options={branches.map((b) => b.name)}
          onSelect={(name) => {
            const branch = branches.find((b) => b.name === name);
            setSelectedBranchId(branch?.id || "");
          }}
          className="col-span-12 md:col-span-6"
          inputClass="rounded-2xl border p-4 font-inter text-xl"
        />
        <Password
          label="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          labelClass="font-inter text-xl text-black"
          inputClass="border-black py-4 rounded-2xl text-xl text-black"
          icon="text-black"
          className="col-span-12 "
        />
      </form>

      {/* BUTTONS */}
      <div className="flex justify-center items-center gap-2 md:gap-12 mt-10 md:mt-15">
        <button
          onClick={() => router.back()}
          className="border border-[#7AA3CC] font-semibold text-xl py-3 px-20 rounded-lg"
        >
          Close
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] font-semibold text-xl py-3 px-20 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Add;
