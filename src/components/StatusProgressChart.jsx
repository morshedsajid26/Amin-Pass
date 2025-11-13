"use client";
import React from "react";

const StatusProgressChart = ({ data }) => {
  return (
    <div className="bg-[#F9F9F9] dark:bg-transparent dark:border dark:border-white rounded-2xl p-6  ">
      <div className="flex flex-col gap-5">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold font-inter dark:text-white">{item.title}</p>
            </div>
            <div className=" flex items-center gap-10">
              <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden  ">
                <div
                  className="h-3 rounded-full  bg-gradient-to-r from-[#2F8CEA] to-[#53A8DD] transition-all duration-700"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="text-gray-800 dark:text-white font-semibold">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusProgressChart;
