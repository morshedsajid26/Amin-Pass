"use client";
import Container from "@/src/components/Container";
import ToggleButton from "@/src/components/ToggleButton";
import React, { useState } from "react";

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


const plans = [
  {
    name: "Starter",
    monthly: 20,
    yearly: 99,
    features: [
      { name: "1 active card", active: true },
      { name: "Wallet Integration", active: true },
      { name: "Real-time Analytics", active: true },
      { name: "500 Customer Count", active: false },
      { name: "Unlimited free push message", active: false },
      { name: "Customer field names on the card", active: false },
      { name: "Advance Reports", active: false },
      { name: "Dedicated Support", active: false },
    ],
    buttonText: "Upgrade Plan",
  },
  {
    name: "Grow",
    monthly: 40,
    yearly: 199,
    features: [
      { name: "5 active cards", active: true },
      { name: "Priority Support", active: true },
      { name: "Custom Branding", active: true },
      { name: "Team Access", active: true },
      { name: "Real-time Analytics", active: false },
      { name: "Advanced Reports", active: false },
      { name: "Unlimited free push message", active: false },
    ],
    buttonText: "Choose Plan",
  },
  {
    name: "Business",
    monthly: 60,
    yearly: 299,
    features: [
      { name: "Unlimited cards", active: true },
      { name: "Custom Integrations", active: true },
      { name: "Dedicated Account Manager", active: true },
      { name: "Team Access", active: true },
      { name: "Priority Support", active: true },
      { name: "Advanced Analytics", active: true },
      { name: "On-site Training", active: true },
    ],
    buttonText: "Contact Sales",
  },
];

const Plan = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="pb-25">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 mt-10">
          {plans.map((plan, i) => (
            <Card
              key={i}
              name={plan.name}
              price={isAnnual ? plan.yearly : plan.monthly}
              isAnnual={isAnnual}
              features={plan.features}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Plan;
