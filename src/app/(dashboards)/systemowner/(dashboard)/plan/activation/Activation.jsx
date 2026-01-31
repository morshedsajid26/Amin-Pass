"use client";

import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import InputField from "@/src/components/InputField";
import Table from "@/src/components/Table";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Activation = () => {
  const token = Cookies.get("accessToken");

  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    location: "",
    card: "",
    status: "",
    cardTypes: [],
  });

  /* ================= FETCH ALL PLANS ================= */
  useEffect(() => {
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

      if (res.ok && json.data) {
        const p = json.data;

        setFormData({
          planName: p.name || "",
          price: p.price || "",
          location: p.locationCount || "",
          card: p.cardCount || "",
          status: p.status || "",
          cardTypes: p.cardTypes || [],
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
        price: Number(formData.price),
        locationCount: Number(formData.location),
        cardCount: Number(formData.card),
        status: formData.status,
        cardTypes: formData.cardTypes,
      };

      const res = await fetch(
        `${BASE_URL}/system-owner/plans/${selectedPlanId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setViewOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= TABLE ================= */
  const TableHeads = [
    { Title: "Plan Name", key: "name" },
    { Title: "Price", key: "price" },
    { Title: "Feature", key: "feature" },
    { Title: "Location", key: "location" },
    { Title: "Action", key: "action" },
  ];

  const TableRows = plans.map((p) => ({
    name: p.name,
    price: p.price,
    feature: `${p.cardCount} Cards`,
    location: `${p.locationCount} Location`,
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
              <Dropdown
                label="Select Plan"
                labelClass={`text-xl mb-2 font-inter `}
                placeholder={formData.planName}
                options={["Starter", "Grow", "Business"]}
                inputClass={`border p-4 rounded-xl`}
              />

              <InputField
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <InputField
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <InputField
                label="Card"
                value={formData.card}
                onChange={(e) =>
                  setFormData({ ...formData, card: e.target.value })
                }
              />

              <Dropdown
                label="Plan Status"
                placeholder={formData.status}
                labelClass={`text-xl mb-2 font-inter `}
                options={["Active", "Inactive"]}
                inputClass={`border p-4 rounded-xl`}
                onSelect={(v) =>
                  setFormData({ ...formData, status: v })
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
