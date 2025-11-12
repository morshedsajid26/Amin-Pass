"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import avatar from '@/public/Avatar.png'

const TestimonialCard = ({ testimonial }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div
      className={`p-6 rounded-2xl shadow-md border border-black/10 transition-all duration-300 ${
        enabled ? "bg-[#E9F0F5]" : "bg-[#FBFBFB]/90 opacity-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <h3
            className={`font-inter text-[32px] font-medium ${
              enabled ? "text-[#000000]" : "text-[#A1A1A1]"
            }`}
          >
            {testimonial.name}
          </h3>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setEnabled((prev) => !prev)}
          className="flex items-center bg-[#21283F] rounded-full py-6 px-1 relative text-white font-inter"
        >
          <span
            className={`absolute left-1 top-1 w-13 h-10 flex items-center justify-center rounded-full bg-[#80B3FF] transition-all duration-300 ${
              enabled ? "translate-x-12" : "translate-x-0"
            }`}
          >
            {enabled ? "Hide" : "Show"}
          </span>
          <span className="w-25 text-cente relative z-10 ">
            {enabled ? "" : ""}
          </span>
        </button>
      </div>

      {/* Body */}
      <p
        className={`text-[16px] font-inter my-6 transition-all duration-300 ${
          enabled ? "text-[#000000]" : "text-[#9CA3AF]"
        }`}
      >
        {testimonial.text}
      </p>

      <p
        className={`font-inter font-semibold text-[16px] ${
          enabled ? "text-[#000000]" : "text-[#9CA3AF]"
        }`}
      >
        Business:{" "}
        <span className="font-normal">{testimonial.business}</span>{" "}
        <span className="inline-flex ml-2">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <FaStar key={i} className="text-[#FACC15]" />
          ))}
        </span>
      </p>
    </div>
  );
};

const Review = () => {
  const testimonials = [
    {
      name: "Jane D.",
      image: avatar,
      text: "Our repeat customer rate jumped by 40% after using the Aminpass loyalty system.",
      business: "Café Bloom",
      rating: 5,
    },
    {
      name: "David",
      image: avatar,
      text: "Apple Wallet integration made loyalty effortless for our shoppers.",
      business: "Urban Market",
      rating: 4,
    },
    {
      name: "Sophia",
      image: "/avatar3.png",
      text: "Aminpass helped us retain 3x more repeat buyers in just two months!",
      business: "Nova Tea House",
      rating: 5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {testimonials.map((item, idx) => (
        <TestimonialCard key={idx} testimonial={item} />
      ))}
    </div>
  );
};

export default Review;
