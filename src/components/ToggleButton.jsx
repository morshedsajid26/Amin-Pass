"use client";
import React from "react";

export default function ToggleButton({ isAnnual, setIsAnnual }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Monthly Label */}
      <span
        className={`font-inter font-semibold text-2xl ${
          !isAnnual ? "text-gray-900" : "text-gray-500"
        }`}
      >
        Monthly
      </span>

      {/* Toggle Switch */}
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className={`relative w-20 h-6 flex items-center rounded-full transition-colors duration-300 ${
          isAnnual ? "bg-[#015093]" : "bg-gray-800"
        }`}
      >
        <span
          className={`absolute w-9 h-9 bg-black border-[#7AA3CC] border-7 rounded-full transition-transform duration-300 ${
            isAnnual ? "translate-x-11" : "translate-x-0"
          }`}
        ></span>
      </button>

      {/* Yearly Label */}
      <span
        className={`font-inter font-semibold text-2xl ${
          isAnnual ? "text-gray-900" : "text-gray-500"
        }`}
      >
        Yearly
      </span>
    </div>
  );
}
