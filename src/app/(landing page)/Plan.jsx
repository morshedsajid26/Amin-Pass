"use client";
import Container from "@/src/components/Container";
import ToggleButton from "@/src/components/ToggleButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const Card = ({ name, price, isAnnual, features, buttonText, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      whileHover={{ y: -10 }}
      className="bg-[#F7F9FB] rounded-3xl py-8 px-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 h-full border border-transparent hover:border-[#7AA3CC]/30"
    >
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
      <ul className="space-y-4 mb-14 mt-8 flex-1">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start font-inter text-lg font-semibold"
          >
            {feature.active ? (
              <span className="text-purple-600 text-lg mr-2">✔</span>
            ) : (
              <span className="text-transparent text-lg mr-2">✔</span>
            )}
            <span className={feature.active ? "text-gray-800" : "text-gray-400 line-through"}>{feature.name}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="flex justify-center mt-auto">
        <button className="border border-[#7AA3CC] cursor-pointer hover:bg-[#7AA3CC] hover:text-white text-gray-800 font-inter font-bold rounded-xl py-5 px-10 w-full transition-all duration-300">
          {buttonText || "Upgrade Plan"}
        </button>
      </div>
    </motion.div>
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

        const response = await axios.get(`${BASE_URL}/business-owner/buy-subscription/get-available-plans`, {
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
    ];
  };

  const currentPlans = apiPlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    monthly: plan.monthlyPrice,
    yearly: plan.yearlyPrice,
    features: formatFeatures(plan),
    buttonText: plan.price === 0 ? "Start for Free" : "Upgrade Plan",
  }));

  return (
    <div className="pb-25 overflow-hidden" id="offer">
      <Container>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-inter font-bold text-2xl md:text-[32px] text-center"
        >
          Our Pricing Plan
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-center mt-2 mb-5 md:mb-9 text-gray-600"
        >
          Pick an account plan that fits your workflow
        </motion.p>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ToggleButton isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        </motion.div>

        {/* Cards */}
        {loading ? (
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 mt-10">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-[#F7F9FB] w-full md:max-w-sm rounded-3xl py-8 px-6 flex flex-col h-[580px] justify-between animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3 mt-2 mb-4"></div>
                <div className="space-y-6 mb-14 mt-8 flex-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-6 bg-gray-200 rounded w-[85%]"></div>
                  ))}
                </div>
                <div className="h-16 bg-gray-200 rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : currentPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center w-full max-w-6xl mx-auto">
            {currentPlans.map((plan, i) => (
              <div key={plan.id || i} className="w-full">
                <Card
                  name={plan.name}
                  price={isAnnual ? plan.yearly : plan.monthly}
                  isAnnual={isAnnual}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  idx={i}
                />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10 font-inter text-gray-500 text-lg"
          >
            No plans available at the moment.
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Plan;
