"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGift, FaStamp } from "react-icons/fa";

const CardType = ({ onSelect }) => {
  const [selected, setSelected] = useState("stamp");

  const handleSelect = (type) => {
    setSelected(type);
    if (onSelect) onSelect(type);
  };

  const cards = [
    {
      id: "stamp",
      label: "Stamp Card",
      icon: <FaStamp className="w-12 h-12" />,
    },
    {
      id: "reward",
      label: "Reward Card",
      icon: <FaGift className="w-12 h-12" />,
    },
    
  ];

  return (

    <div>
    <div className="grid grid-cols-3  mt-8">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleSelect(card.id)}
          className={`w-[310px] py-8 cursor-pointer rounded-2xl flex flex-col justify-center items-center border transition-all duration-300 
            ${
              selected === card.id
                ? "bg-black dark:bg-white dark:text-black text-white border-white dark:border-black"
                : "bg-white dark:bg-black dark:text-white  text-black border-gray-300 hover:shadow-md"
            }`}
        >
          {card.icon}
          <p className="font-inter text-2xl font-medium mt-4">{card.label}</p>
        </div>
      ))}
    </div>

    <div>
      <Link href='/businessowner/manage/reward/management/loyalty/programme/card/details' className="flex justify-center mt-25">
      <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-25 rounded-lg cursor-pointer flex items-center gap-2">
      
           Continue
          </button>
          </Link>
    </div>
      
    </div>
  );
};

export default CardType;
