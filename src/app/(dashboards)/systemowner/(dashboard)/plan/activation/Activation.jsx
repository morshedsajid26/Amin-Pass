"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "@/src/config/api";

const Activation = () => {
  const token = Cookies.get("accessToken");

  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [formData, setFormData] = useState({
    planName: "",
    monthlyPrice: "",
    yearlyPrice: "",
    location: "",
    card: "",
    maxStaff: "",
    status: "",
  });

  /* ================= FETCH ALL PLANS ================= */
  const fetchPlans = async () => {
    try {
      const res = await fetch(`${BASE_URL}/system-owner/plans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        setPlans(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= FETCH SINGLE PLAN ================= */
  const openEdit = async (id) => {
    setSelectedPlanId(id);
    setViewOpen(true);

    try {
      const res = await fetch(`${BASE_URL}/system-owner/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      console.log("Single Plan Data:", json);

      if (res.ok && json.data) {
        const p = json.data;

        setFormData({
          planName: p.name || "",
          monthlyPrice: p.monthlyPrice || "",
          yearlyPrice: p.yearlyPrice || "",
          location: p.maxBranches || p.features?.maxBranches || "",
          maxStaff: p.maxStaff || p.features?.maxStaff || "",
          card: p.maxCards || p.features?.maxCards || "",
          status: p.status || "",
        });

      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      const payload = {
        name: formData.planName,
        monthlyPrice: Number(formData.monthlyPrice),
        yearlyPrice: Number(formData.yearlyPrice),
        maxBranches: Number(formData.location),
        maxStaff: Number(formData.maxStaff),
        maxCards: Number(formData.card),
      };

      const res = await fetch(`${BASE_URL}/system-owner/plans/${selectedPlanId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Plan updated successfully");
        setViewOpen(false);
        fetchPlans();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update plan");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the plan");
    }
  };

  /* ================= TABLE ================= */
  const TableHeads = [
    { Title: "Plan Name", key: "name" },
    { Title: "Monthly Price", key: "monthlyPrice" },
    { Title: "Yearly Price", key: "yearlyPrice" },
    { Title: "Feature", key: "feature" },
    { Title: "Location", key: "location" },
    { Title: "Action", key: "action" },
  ];

 const TableRows = plans.map((p) => ({
  name: p.name,
  monthlyPrice: p.monthlyPrice,
  yearlyPrice: p.yearlyPrice,
  feature: `${p.features?.maxCards ?? 0} Cards`,
  location: `${p.features?.maxBranches ?? 0} Location`,
  action: (
    <button
      onClick={() => openEdit(p.id)}
      className="bg-[#7AA3CC] py-2 px-11 rounded-full"
    >
      Edit
    </button>
  ),
}));


  return (
    <div>
      <Bredcumb />

      <div className="overflow-x-auto">
        <Table TableHeads={TableHeads} TableRows={TableRows} />
      </div>

      {/* ================= MODAL ================= */}
      {viewOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex justify-center items-center z-50">
          <div className="bg-linear-to-b from-[#A8C4D8] to-[#E4DBC2] rounded-3xl p-12 md:w-[50%] w-full h-[80%] overflow-y-auto">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <InputField
                label="Plan Name"
                value={formData.planName}
                onChange={(e) =>
                  setFormData({ ...formData, planName: e.target.value })
                }
              />

              <InputField
                label="Monthly Price"
                type="number"
                value={formData.monthlyPrice}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyPrice: e.target.value })
                }
              />

              <InputField
                label="Yearly Price"
                type="number"
                value={formData.yearlyPrice}
                onChange={(e) =>
                  setFormData({ ...formData, yearlyPrice: e.target.value })
                }
              />

              <InputField
                label="Max Branches"
                type="number"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <InputField
                label="Max Staff"
                type="number"
                value={formData.maxStaff}
                onChange={(e) =>
                  setFormData({ ...formData, maxStaff: e.target.value })
                }
              />

              <InputField
                label="Max Cards"
                type="number"
                value={formData.card}
                onChange={(e) =>
                  setFormData({ ...formData, card: e.target.value })
                }
              />
            </div>

            <div className="mt-20 flex justify-center gap-8">
              <button
                onClick={() => setViewOpen(false)}
                className="border border-[#7AA3CC] px-20 py-3 rounded-md font-inter font-bold text-[#000000]"
              >
                Close
              </button>

              <button
                onClick={handleSave}
                className="bg-[#7AA3CC] px-20 py-3 rounded-md font-inter font-bold text-[#000000]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activation;
