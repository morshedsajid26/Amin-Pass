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
    name: "",
    address: "",
    staffCount: "",
    managerName: "",
    longitude: "",
    latitude: "",
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
          const res = await axios.get(
            `${BASE_URL}/business-owner/branchs/all`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (res.data.success) {
            const branch = res.data.data.find((b) => b.id === branchId);
            if (branch) {
              setFormData({
                name: branch.name || "",
                address: branch.address || "",
                staffCount: branch.staffCount || "",
                managerName: branch.managerName || "",
                longitude: branch.longitude || "",
                latitude: branch.latitude || "",
                branchImage: null,
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
      const businessId = Cookies.get("businessId");

      if (!businessId) {
        throw new Error("Business ID not found. Please log in again.");
      }

      const url = branchId
        ? `${BASE_URL}/business-owner/branchs/${branchId}`
        : `${BASE_URL}/business-owner/branchs/create`;

      let method = branchId ? "put" : "post";

      const useFormData = formData.branchImage instanceof File;

      let body;
      let headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      if (!useFormData) {
        headers["Content-Type"] = "application/json";
        const baseData = {
          staffCount: parseInt(formData.staffCount) || 0,
          managerName: formData.managerName,
          longitude: parseFloat(formData.longitude) || 0,
          latitude: parseFloat(formData.latitude) || 0,
          businessId: businessId,
          city: "",
          country: "",
        };

        if (branchId) {
          // UPDATE: Prisma expects 'name' and 'address'
          body = {
            ...baseData,
            name: formData.name,
            address: formData.address,
          };
        } else {
          // CREATE: Backend expects 'branchName' and 'branchLocation' for mapping
          body = {
            ...baseData,
            branchName: formData.name,
            branchLocation: formData.address,
          };
        }
      } else {
        const payload = new FormData();
        payload.append("staffCount", parseInt(formData.staffCount) || 0);
        payload.append("managerName", formData.managerName);
        payload.append("longitude", parseFloat(formData.longitude) || 0);
        payload.append("latitude", parseFloat(formData.latitude) || 0);
        payload.append("businessId", businessId);
        payload.append("city", "");
        payload.append("country", "");

        if (branchId) {
          // UPDATE
          payload.append("name", formData.name);
          payload.append("address", formData.address);
        } else {
          // CREATE
          payload.append("branchName", formData.name);
          payload.append("branchLocation", formData.address);
        }

        if (formData.branchImage instanceof File) {
          payload.append("branchImage", formData.branchImage);
        }
        body = payload;
      }

      const res = await axios({
        method: method,
        url: url,
        data: body,
        headers: headers,
      });

      if (res.data.success || res.status === 200 || res.status === 201) {
        toast.success(
          branchId
            ? "Branch updated successfully"
            : "Branch created successfully",
        );
        setTimeout(() => {
          router.push("/businessowner/branch/list");
        }, 1500);
      } else {
        throw new Error(
          res.data.message ||
            `Failed to ${branchId ? "update" : "create"} branch`,
        );
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        `Failed to ${branchId ? "update" : "create"} branch`;
      toast.error(errorMsg);
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
      <Bredcumb
        customLabels={branchId ? { [branchId]: formData.name } : {}}
      />

      <div className="grid grid-cols-12 gap-10">
        <InputField
          label="Branch Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Branch Location"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Number of Staff"
          type="number"
          value={formData.staffCount}
          onChange={(e) => handleChange("staffCount", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Manager Name"
          value={formData.managerName}
          onChange={(e) => handleChange("managerName", e.target.value)}
          className="col-span-12 md:col-span-6"
        />

        <InputField
          label="Latitude"
          type="number"
          value={formData.latitude}
          onChange={(e) => handleChange("latitude", e.target.value)}
          className="col-span-12 md:col-span-6"
        />
        <InputField
          label="Longitude"
          type="number"
          value={formData.longitude}
          onChange={(e) => handleChange("longitude", e.target.value)}
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
          {loading
            ? branchId
              ? "Updating..."
              : "Creating..."
            : branchId
              ? "Update"
              : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddBranch;
