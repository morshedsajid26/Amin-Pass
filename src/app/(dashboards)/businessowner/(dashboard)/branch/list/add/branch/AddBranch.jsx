"use client";

import Bredcumb from "@/src/components/Bredcumb";
import InputField from "@/src/components/InputField";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddBranch = ({ branchId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    branchName: "",
    branchLocation: "",
    staffCount: "",
    managerName: "",
    branchImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!branchId);

  /* ---------------- FETCH BRANCH DATA ---------------- */
  useEffect(() => {
    if (branchId) {
      const fetchBranch = async () => {
        try {
          const accessToken = Cookies.get("accessToken");
          const res = await axios.get(`${BASE_URL}/business-owner/branchs/all`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.data.success) {
            const branch = res.data.data.find((b) => b.id === branchId);
            if (branch) {
              setFormData({
                branchName: branch.name || "",
                branchLocation: branch.address || "",
                staffCount: branch.staffCount || "",
                managerName: branch.managerName || "",
                branchImage: null, // Keep null as we don't fetch the file object
              });
            } else {
              toast.error("Branch not found");
            }
          }
        } catch (error) {
          console.error("Failed to fetch branch data", error);
          toast.error("Failed to fetch branch data");
        } finally {
          setFetching(false);
        }
      };
      fetchBranch();
    }
  }, [branchId]);

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
        payload.append("branchImage", formData.branchImage);
      }

      const url = branchId 
        ? `${BASE_URL}/business-owner/branchs/${branchId}`
        : `${BASE_URL}/business-owner/branchs/create`;
      
      const method = branchId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Failed to ${branchId ? 'update' : 'create'} branch`);
      }

      toast.success(branchId ? "Branch updated successfully" : "Branch created successfully");

      if (!branchId) {
        setFormData({
          branchName: "",
          branchLocation: "",
          staffCount: "",
          managerName: "",
          branchImage: null,
        });
      } else {
        router.push("/businessowner/branch/list");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || `Failed to ${branchId ? 'update' : 'create'} branch`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-2xl font-inter">Loading branch data...</p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div>
      <Bredcumb customLabels={branchId ? { [branchId]: formData.branchName } : {}} />

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
          className="col-span-12"
          inputClass="w-full border border-[#000000] p-4 rounded-2xl font-inter-inter"
        />
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000] cursor-pointer mt-20 disabled:opacity-50"
        >
          {loading ? (branchId ? "Updating..." : "Creating...") : (branchId ? "Update" : "Create")}
        </button>
      </div>
    </div>
  );
};

export default AddBranch;
