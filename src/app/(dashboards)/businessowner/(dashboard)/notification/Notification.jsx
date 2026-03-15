"use client";
import Pagination from "@/src/components/Pagination";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popOpen, setPopOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const pathParts = (pathname || "/").split("/").filter(Boolean);

  // fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await axios.get(
          `${BASE_URL}/business-owner/notifications/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(res?.data?.data || []);
      } catch (error) {
        console.error("Notification fetch error:", error);
        toast.error("Error loading notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // time ago function
  function timeAgo(timestamp) {
    if (!timestamp) return "";

    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    return `${diffDay} days ago`;
  }

  // pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full p-7 bg-white dark:bg-[#141414] overflow-x-auto rounded-[10px]">
      {/* Header */}
      <div className="flex items-center gap-[14px]">
        <h3 className="text-[#333333] dark:text-white text-xl font-inter font-semibold capitalize">
          {pathParts[1] || "Notifications"}
        </h3>
      </div>

      {/* Total */}
      <div>
        <p className="text-[#333333] dark:text-white text-[16px] font-inter font-semibold mt-[21px]">
          Total {notifications.length} Notifications
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading notifications...</p>
      )}

      {/* Notification List */}
      {!loading && (
        <div className="mt-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="w-full hover:bg-[#CCDCE9] dark:hover:bg-[#212121] transition-all duration-300 py-3 md:px-[25px]"
            >
              <div
                onClick={() => {
                  setSelectedNotification(item);
                  setPopOpen(true);
                }}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <p className="md:w-[80%] text-[#333333] dark:text-white text-[16px] font-inter font-semibold">
                  {item?.message}
                </p>

                <p className="md:w-[10%] flex justify-end text-[#5C5C5C] dark:text-white text-[16px] font-inter whitespace-nowrap">
                  {timeAgo(item?.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
     
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
     

     
    </div>
  );
};

export default Notification;