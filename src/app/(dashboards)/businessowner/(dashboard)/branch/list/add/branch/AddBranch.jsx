"use client";

import Bredcumb from "@/src/components/Bredcumb";
import InputField from "@/src/components/InputField";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import toast from "react-hot-toast";

const AddBranch = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    branchLocation: "",
    staffCount: "",
    managerName: "",
    branchImage: null, //    new
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      branchImage: e.target.files[0],
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const accessToken = Cookies.get("accessToken");

      const payload = new FormData();
      payload.append("branchName", formData.branchName);
      payload.append("branchLocation", formData.branchLocation);
      payload.append("staffCount", formData.staffCount);
      payload.append("managerName", formData.managerName);

      if (formData.branchImage) {
        payload.append("branchImage", formData.branchImage); //    image
      }

      const res = await fetch(
        `${BASE_URL}/business-owner/branchs/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            
          },
          body: payload,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Failed");
      }

      toast.success("   Branch created successfully");

      setFormData({
        branchName: "",
        branchLocation: "",
        staffCount: "",
        managerName: "",
        branchImage: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("  Failed to create branch");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
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
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Branch Location"
          value={formData.branchLocation}
          onChange={(e) =>
            handleChange("branchLocation", e.target.value)
          }
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Number of Staff"
          type="number"
          value={formData.staffCount}
          onChange={(e) =>
            handleChange("staffCount", e.target.value)
          }
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Manager Name"
          value={formData.managerName}
          onChange={(e) =>
            handleChange("managerName", e.target.value)
          }
          className="col-span-12 md:col-span-6"
        />


         <InputField
          label="Branch Image"
          type={`file`}
          accept="image/*"
          onChange={handleImageChange}
          className="col-span-12  "
          inputClass="w-full border border-[#000000] p-4 rounded-2xl font-inter-inter"
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

        {/* {message && (
          <p className="mt-4 font-inter text-sm">{message}</p>
        )} */}
      </div>
    </div>
  );
};

export default AddBranch;
