"use client";
import React from "react";

const ProgressBar = ({ data }) => {
  // max value বের করে, progress bar এর width হিসাব করবে
  const maxValue = Math.max(...data.map((item) => item.claims));

  return (
    <div className="bg-[#F9F9F9]  p-6 rounded-2xl ">
      

      <div className="flex flex-col gap-7">
        {data.map((item, i) => (
          <div key={i} className="f items-center justify-between gap-4">
            {/* Label */}
            <p className="font-semibold  w-24 font-inter">{item.title}</p>
<div className="flex items-center gap-20 mt-2">

            <div className="flex-1 bg-blue-100 rounded-full h-3 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-[#2F8CEA] to-[#53A8DD] transition-all duration-700"
                style={{
                  width: `${(item.claims / maxValue) * 100}%`,
                }}
              ></div>
            </div>

            {/* Value */}
            <span className="text-sm font-semibold font-inter w-20 text-righ">
              {item.claims}{" "}
              {item.unit && <span>{item.unit}</span>}
            </span>
</div>
            {/* Progress Bar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
