"use client";
import Dropdown from "@/src/components/Dropdown";
import PaymentCard from "@/src/components/PaymentCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const Subscription = () => {
  const [viewOpen, setViewOpen] = useState(false);
  const [apiPlans, setApiPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("Monthly");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("accessToken");
        const response = await axios.get(`${BASE_URL}/business-owner/buy-subscription/available-plans`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data?.success && Array.isArray(response.data.data)) {
          setApiPlans(response.data.data);

          const current = response.data.data.find(plan => plan.isActive === true);
          setActivePlan(current || null);

          if (response.data.data.length > 0) {
            setSelectedPlan(response.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch available plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    return billingCycle === "Yearly" ? selectedPlan.price * 12 : selectedPlan.price;
  };

  return (
    <div>
      <div className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14 mt-10">
        <h3 className="font-inter text-[32px] border-b-2   pb-2 w-[26%] mb-6 dark:text-white">
          Subscription Information
        </h3>

        {loading ? (
          <div className="font-inter text-xl dark:text-gray-400">Loading subscription details...</div>
        ) : activePlan ? (
          <div className=" font-inter text-2xl text-[#000000] dark:text-white  ">
            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Current plan:</span>
              <span className="font-normal">{activePlan.name}</span>
            </div>

            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Price:</span>
              <span className="font-normal">${activePlan.price}</span>
            </div>

            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Renewal Date:</span>
              <span className="font-normal">N/A</span>
            </div>

            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Usage:</span>
              <span className="font-normal">{activePlan.maxBranches} locations</span>
            </div>

            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Status:</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        ) : (
          <div className="font-inter text-xl text-red-500">
            No active subscription found.
          </div>
        )}

        <div className="flex justify-center items-center gap-12 mt-15">
          <button
            onClick={() => setViewOpen(true)}
            className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12"
          >
            Upgrade plan
          </button>
        </div>
      </div>


    </div>
  );
};

export default Subscription;
