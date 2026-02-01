"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import coffee from "@/public/coffeeIcon.png";
import loyalty from "@/public/loyalty.png";
import qrCode from "@/public/qrCode.png";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

/* ---------------- CARD COMPONENT ---------------- */
const LoyaltyCard = ({ card, onDeleteClick }) => {
  return (
    <div className="md:w-[410px] w-full">
      <div
        className="rounded-2xl w-full p-4 shadow-md"
        style={{ backgroundColor: card.cardBackground || "#7AA3CC" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {card.logo ? (
              <Image
                src={card.logo}
                alt="Company Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              <Image src={coffee} alt="Default Logo" />
            )}

            <span
              className="font-bold font-inter"
              style={{ color: card.textColor || "#000" }}
            >
              {card.companyName}
            </span>
          </div>

          <div className="text-right font-inter">
            <p style={{ color: card.textColor || "#000" }}>Stamps</p>
            <p className="font-bold" style={{ color: card.textColor || "#000" }}>
              {card.stampsCount}
            </p>
          </div>
        </div>

        {/* Stamp Background */}
        <div className="rounded-md overflow-hidden mb-4 flex justify-center">
          {card.stampBackground ? (
            <Image
              src={card.stampBackground}
              alt="Stamp Background"
              width={400}
      height={120}
      quality={100}
              className="w-[200px] h-full object-cover"
            />
          ) : (
            <Image
              src={loyalty}
              alt="Default Banner"
              width={400}
              height={100}
              className="w-full object-cover"
            />
          )}
        </div>

        {/* Reward Info */}
        <div
          className="flex justify-between items-center mb-4 font-inter font-medium"
          style={{ color: card.textColor || "#000" }}
        >
          <p>{card.cardDesc}</p>
          <p className="capitalize">{card.cardType.replace("_", " ")}</p>
        </div>

        {/* QR */}
        <div className="flex justify-center mb-4">
          <Image src={qrCode} alt="QR Code" width={120} height={120} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-8 mt-6">
        <button className="border border-[#7AA3CC] py-2.5 px-15 rounded-md font-semibold text-black dark:text-white">
          Edit
        </button>

        <button
          onClick={() => onDeleteClick(card.id)}
          className="bg-[#ED4539] py-2.5 px-14 rounded-md text-black dark:text-white font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


/* ---------------- MAIN PAGE ---------------- */
const Loyalty = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔴 DELETE MODAL STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(null);

  // 🔹 GET CARDS
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        const res = await fetch(
          `${BASE_URL}/business-owner/cards/business`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const json = await res.json();

        if (res.ok && Array.isArray(json.data)) {
          setCards(json.data);
        } else {
          setCards([]);
        }
      } catch {
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // 🔹 OPEN MODAL
  const openDeleteModal = (cardId) => {
    setDeleteCardId(cardId);
    setShowDeleteModal(true);
  };

  // 🔹 CLOSE MODAL
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteCardId(null);
  };

  // 🔴 CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      const res = await fetch(
        `${BASE_URL}/business-owner/cards/${deleteCardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json?.message || "Delete failed");
        return;
      }

      // ✅ UPDATE UI
      setCards((prev) => prev.filter((c) => c.id !== deleteCardId));
      closeDeleteModal();
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="py-10">
      {/* Create Button */}
      <Link
        href="/businessowner/manage/reward/management/loyalty/programme/card/type"
        className="flex justify-end mb-10"
      >
        <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-5 rounded-lg flex items-center gap-2">
          <FaPlus />
          Create New Card
        </button>
      </Link>

      {/* Cards */}
      {loading ? (
        <p className="text-center font-inter">Loading cards...</p>
      ) : cards.length === 0 ? (
        <p className="text-center font-inter">No cards found</p>
      ) : (
        <div className="flex flex-wrap gap-8">
          {cards.map((card) => (
            <LoyaltyCard
              key={card.id}
              card={card}
              onDeleteClick={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* 🔴 DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#141414] rounded-4xl py-10 px-20 w-[520px] font-inter">
            <p className="text-2xl font-semibold text-center mb-6">
              Are you sure?
            </p>

            <p className="text-center opacity-70 mb-10">
              Do you really want to delete this card?
            </p>

            <div className="flex justify-center gap-8">
              <button
                onClick={closeDeleteModal}
                className="border border-[#7AA3CC] font-semibold text-xl py-3 px-16 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-[#ED4539] font-semibold text-xl py-3 px-16 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loyalty;
