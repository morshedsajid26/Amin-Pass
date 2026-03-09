"use client";
import Container from "@/src/components/Container";
import ToggleButton from "@/src/components/ToggleButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";

const Card = ({ name, price, isAnnual, features, buttonText }) => {
  return (
    <div className="bg-[#F7F9FB] rounded-3xl py-8 px-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      {/* Plan Name */}
      <p className="font-inter text-2xl font-semibold text-gray-800">{name}</p>

      {/* Price */}
      <div className="flex items-end mt-2 mb-4">
        <p className="font-inter text-5xl font-bold text-gray-900">${price}</p>
        <span className="font-inter font-bold text-gray-600 ml-1">
          /{isAnnual ? "Yearly" : "Monthly"}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-14 mt-8">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start font-inter text-lg font-semibold"
          >
            {feature.active ? (
              <span className="text-purple-600 text-lg mr-2">✔</span>
            ) : (
              ""
            )}
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="flex justify-center">
        <button className="border border-[#7AA3CC] cursor-pointer hover:bg-[#7AA3CC] font-inter font-bold rounded-xl py-5 px-24 transition-all duration-300">
          {buttonText || "Upgrade Plan"}
        </button>
      </div>
    </div>
  );
};



const Plan = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [apiPlans, setApiPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = Cookies.get("accessToken");

        const response = await axios.get(`${BASE_URL}/business-owner/buy-subscription/available-plans`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data?.success && Array.isArray(response.data.data)) {
          setApiPlans(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch available plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const formatFeatures = (plan) => {
    const isFree = plan.price === 0;
    return [
      { name: plan.maxCards === -1 ? "Unlimited active cards" : `${plan.maxCards} active card${plan.maxCards > 1 ? 's' : ''}`, active: true },
      { name: plan.maxBranches === -1 ? "Unlimited branches" : `${plan.maxBranches} branches`, active: true },
      { name: plan.maxStaff === -1 ? "Unlimited team access" : `${plan.maxStaff} staff members`, active: true },
      // { name: "Wallet Integration", active: true },
      // { name: "Real-time Analytics", active: !isFree || plan.maxCards > 1 },
      // { name: "Advance Reports", active: plan.price > 10 },
      // { name: "Unlimited free push message", active: plan.price > 10 },
      // { name: "Dedicated Support", active: plan.price > 30 },
    ];
  };

  const currentPlans = apiPlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    monthly: plan.price,
    yearly: plan.price * 12, // fallback or use the API field if available
    features: formatFeatures(plan),
    buttonText: plan.price === 0 ? "Start for Free" : "Upgrade Plan",
  }));

  return (
    <div className="pb-25" id="offer">
      <Container>
        <h3 className="font-inter font-bold text-2xl md:text-[32px] text-center">
          Our Pricing Plan
        </h3>
        <p className="font-inter text-center mt-2 mb-5 md:mb-9 text-gray-600">
          Pick an account plan that fits your workflow
        </p>

        {/* Toggle */}
        <ToggleButton isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

        {/* Cards */}
        {loading ? (
          <div className=" flex items-center justify-center  mt-10">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-[#F7F9FB] rounded-3xl py-8 px-6 flex flex-col h-[580px] justify-between animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3 mt-2 mb-4"></div>
                <div className="space-y-6 mb-14 mt-8 flex-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div key={item} className="h-6 bg-gray-200 rounded w-[85%]"></div>
                  ))}
                </div>
                <div className="h-16 bg-gray-200 rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : currentPlans.length > 0 ? (
          <div className="flex items-center justify-center  mt-10">
            {currentPlans.map((plan, i) => (
              <Card
                key={plan.id || i}
                name={plan.name}
                price={isAnnual ? plan.yearly : plan.monthly}
                isAnnual={isAnnual}
                features={plan.features}
                buttonText={plan.buttonText}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 font-inter text-gray-500 text-lg">
            No plans available at the moment.
          </div>
        )}
      </Container>
    </div>
  );
};

export default Plan;
