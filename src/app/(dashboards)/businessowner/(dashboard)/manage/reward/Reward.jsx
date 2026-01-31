"use client";

import Bredcumb from "@/src/components/Bredcumb";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

const Reward = () => {
  const [rewards, setRewards] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB");

  // 🔹 Fetch rewards
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const accessToken = Cookies.get("accessToken");

        const res = await fetch(
          `${BASE_URL}/business-owner/earn-reward/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();

        setRewards(Array.isArray(json?.data) ? json.data : []);
      } catch (err) {
        console.error("Reward fetch error:", err);
        setRewards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  // 🔍 Search (FIXED)
  const filteredRewards = rewards.filter((item) =>
    item.rewardName?.toLowerCase().includes(search.toLowerCase())
  );

  // 🗑 Open delete modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // ❌ Close delete modal
  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  // ✅ Confirm delete
  const confirmDelete = async () => {
    try {
      const token = Cookies.get("accessToken");

      await fetch(
        `${BASE_URL}/business-owner/earn-reward/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRewards((prev) =>
        prev.filter((item) => item.id !== deleteId)
      );

      closeDeleteModal();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <Bredcumb />

      {/* 🔍 Search + Add */}
      <div className="flex flex-col md:flex-row md:items-center justify-center md:gap-20 gap-5 my-10">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border outline-none border-[#000000] dark:border-[#CDCDCD] py-[14px] px-12 w-full md:w-[462px] rounded-[15px] dark:text-white text-[#000000] placeholder:text-[#000000] dark:placeholder:text-white font-inter"
            placeholder="Search"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        <Link href="/businessowner/manage/reward/management">
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-5 rounded-lg cursor-pointer flex items-center gap-2">
            <FaPlus />
            Add New Reward
          </button>
        </Link>
      </div>

      {/* 📦 Reward List */}
      {loading ? (
        <p className="text-center text-xl font-inter">Loading...</p>
      ) : filteredRewards.length === 0 ? (
        <p className="text-center text-xl font-inter">No reward found</p>
      ) : (
        filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14 mb-10 overflow-auto"
          >
            <div className="font-inter text-2xl text-[#000000] dark:text-white">
              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Created Date:</span>
                <span className="font-normal">
                  {formatDate(reward.createdAt)}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Reward Name:</span>
                <span className="font-normal">{reward.rewardName}</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Threshold:</span>
                <span className="font-normal">{reward.earnPoint}</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Reward Type:</span>
                <span className="font-normal">{reward.rewardType}</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Expiry Days:</span>
                <span className="font-normal">
                  {reward.expiryDays} Days
                </span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Earning Rule:</span>
                <span className="font-normal">{reward.earningRule}</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 dark:border-white py-4">
                <span className="font-medium">Reward Status:</span>
                <span
                  className={
                    reward.rewardStatus === "ACTIVE"
                      ? "text-[#009006]"
                      : "text-red-500"
                  }
                >
                  {reward.rewardStatus === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>

            {/* 🛠 Actions */}
            <div className="flex justify-center items-center gap-12 mt-15">
              <button
                onClick={() => openDeleteModal(reward.id)}
                className="border border-[#7AA3CC] text-[#010101] dark:text-white font-semibold text-xl font-inter py-3 px-20 rounded-lg cursor-pointer mt-12"
              >
                Delete
              </button>

              <Link
                href={`/businessowner/manage/reward/management/${reward.id}`}
              >
                <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))
      )}

      {/* 🔴 Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#141414] rounded-4xl py-10 px-20 w-[520px] font-inter">
            <p className="text-2xl font-semibold text-[#000000] dark:text-white mb-6 text-center">
              Are you sure?
            </p>

            <p className="text-center text-[#000000]/70 dark:text-white/70 mb-10">
              Do you really want to delete this reward?
            </p>

            <div className="flex justify-center gap-8">
              <button
                onClick={closeDeleteModal}
                className="border border-[#7AA3CC] text-[#010101] dark:text-white font-semibold text-xl py-3 px-16 rounded-lg cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl py-3 px-16 rounded-lg cursor-pointer"
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

export default Reward;
