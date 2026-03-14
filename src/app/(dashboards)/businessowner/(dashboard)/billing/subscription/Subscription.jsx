"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import { formatDate } from "@/src/utils/formatDate";
import toast from "react-hot-toast";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [billingCycle, setBillingCycle] = useState("MONTHLY");
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeError, setUpgradeError] = useState(null);

  // ── GET: Current active plan ──────────────────────────────────────────────
  useEffect(() => {
    const fetchCurrentPlan = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(
          `${BASE_URL}/business-owner/buy-subscription/current-plan`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        if (response.data?.success) setCurrentPlan(response.data.data);
        else setError("Could not load subscription information.");
      } catch (err) {
        console.error("Failed to fetch current plan:", err);
        setError("Failed to load subscription information.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPlan();
  }, []);

  // ── Open modal + fetch available plans ────────────────────────────────────
  const openUpgradeModal = async () => {
    setModalOpen(true);
    setUpgradeError(null);
    setPlansLoading(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.get(
        `${BASE_URL}/business-owner/buy-subscription/available-plans`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      console.log("Available Plans:", res.data.data);
      if (res.data?.success && Array.isArray(res.data.data)) {
        setAvailablePlans(res.data.data);
        const first = res.data.data[0];
        if (first) setSelectedPlanId(first.planId || first.id);
      }
    } catch (err) {
      console.error("Failed to fetch available plans:", err);
    } finally {
      setPlansLoading(false);
    }
  };

  // ── POST: Checkout → redirect ─────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!selectedPlanId) return;
    setUpgrading(true);
    setUpgradeError(null);
    try {
      const token = Cookies.get("accessToken");
      const res = await axios.post(
        `${BASE_URL}/payments/checkout`,
        { planId: selectedPlanId, billingCycle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const checkoutUrl = res.data?.data?.url || res.data?.url;
      if (checkoutUrl) {
        // window.location.href = checkoutUrl;
        window.open(checkoutUrl, "_blank");
      } else {
        toast.error("No checkout link returned. Please try again.");
        setUpgradeError("No checkout link returned. Please try again.");
        console.error("No checkout URL in response:", res.data);
      }
    } catch (err) {
      console.error("Checkout failed:", err?.response?.data || err);
      const msg =
        err?.response?.data?.message || "Checkout failed. Please try again.";
      toast.error(msg);
      setUpgradeError(msg);
    } finally {
      setUpgrading(false);
    }
  };

  const statusColor =
    currentPlan?.status === "ACTIVE"
      ? "text-green-600"
      : currentPlan?.status === "EXPIRED"
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <div>
      {/* ── Current Subscription Info ───────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14 mt-10">
        <h3 className="font-inter text-[32px] border-b-2 pb-2 w-[26%] mb-6 dark:text-white">
          Subscription Information
        </h3>

        {loading ? (
          <div className="font-inter text-xl dark:text-gray-400">
            Loading subscription details...
          </div>
        ) : error ? (
          <div className="font-inter text-xl text-red-500">{error}</div>
        ) : currentPlan ? (
          <div className="font-inter text-2xl text-[#000000] dark:text-white">
            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Current Plan:</span>
              <span className="font-normal">{currentPlan.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Billing Cycle:</span>
              <span className="font-normal">{currentPlan.planType}</span>
            </div>
            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Renewal Date:</span>
              <span className="font-normal">
                {formatDate(currentPlan.renewalDate)}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
              <span className="font-medium">Status:</span>
              <span className={`font-semibold capitalize ${statusColor}`}>
                {currentPlan.status.charAt(0) +
                  currentPlan.status.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        ) : (
          <div className="font-inter text-xl text-red-500">
            No active subscription found.
          </div>
        )}

        <div className="flex justify-center items-center gap-12 mt-15">
          <button
            onClick={openUpgradeModal}
            className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-20 rounded-lg cursor-pointer mt-12"
          >
            Upgrade plan
          </button>
        </div>
      </div>

      {/* ── Plan Selection Modal ────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-10 w-full max-w-md shadow-2xl">
            <h2 className="font-inter text-2xl font-semibold dark:text-white mb-6">
              Choose a Plan
            </h2>

            {/* Billing Cycle */}
            <div className="flex gap-3 mb-6">
              {["MONTHLY", "YEARLY"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`flex-1 py-2 rounded-lg font-inter font-semibold text-sm transition-all cursor-pointer ${
                    billingCycle === cycle
                      ? "bg-[#7AA3CC] text-[#010101]"
                      : "border border-[#7AA3CC] text-[#7AA3CC]"
                  }`}
                >
                  {cycle.charAt(0) + cycle.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Plans */}
            {plansLoading ? (
              <p className="font-inter text-center text-gray-500 dark:text-gray-400 py-6">
                Loading plans...
              </p>
            ) : (
              <div className="flex flex-col gap-3 mb-6">
                {availablePlans.map((plan, idx) => {
                  const id = plan.planId || plan.id;
                  return (
                    <button
                      key={id || idx}
                      onClick={() => setSelectedPlanId(id)}
                      className={`w-full text-left border rounded-xl px-5 py-4 font-inter transition-all cursor-pointer ${
                        selectedPlanId === id
                          ? "border-[#7AA3CC] bg-[#7AA3CC]/10"
                          : "border-gray-200 dark:border-white/10"
                      }`}
                    >
                      <p className="font-semibold text-lg dark:text-white">
                        {plan.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {billingCycle === "MONTHLY"
                          ? `$${plan.monthlyPrice} / month`
                          : `$${plan.yearlyPrice} / year`}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {upgradeError && (
              <p className="text-red-500 font-inter text-sm mb-4">
                {upgradeError}
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setUpgradeError(null);
                }}
                className="flex-1 border border-gray-300 dark:border-white/20 dark:text-white font-inter font-semibold py-3 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={upgrading || !selectedPlanId}
                className="flex-1 bg-[#7AA3CC] text-[#010101] font-inter font-semibold py-3 rounded-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {upgrading ? "Redirecting..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
