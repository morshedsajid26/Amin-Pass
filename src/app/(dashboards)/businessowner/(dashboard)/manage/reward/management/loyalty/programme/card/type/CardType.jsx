"use client";
import React, { useState } from "react";
import { FaGift, FaStamp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CardType = () => {
  const [selected, setSelected] = useState("stamp");
  const router = useRouter();

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

  /* ================= CONTINUE ================= */
  const handleContinue = () => {
    //    only save card type
    const cardTypeValue = selected === "stamp" ? "stamp_card" : "reward_card";
    localStorage.setItem(
      "cardSetup",
      JSON.stringify({
        cardType: cardTypeValue,
      })
    );

    toast.success(`${selected === "stamp" ? "Stamp" : "Reward"} card selected!`);

    //    go to next step
    setTimeout(() => {
      router.push(
        "/businessowner/manage/reward/management/loyalty/programme/card/details"
      );
    }, 500);
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-5 md:gap-0 mt-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={`md:w-[310px] py-8 cursor-pointer rounded-2xl flex flex-col justify-center items-center border transition-all duration-300 col-span-12 md:col-span-6
              ${
                selected === card.id
                  ? "bg-black dark:bg-white dark:text-black text-white border-white dark:border-black"
                  : "bg-white dark:bg-black dark:text-white text-black border-gray-300 hover:shadow-md"
              }`}
          >
            {card.icon}
            <p className="font-inter text-2xl font-medium mt-4">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-25">
        <button
          onClick={handleContinue}
          className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-25 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CardType;
