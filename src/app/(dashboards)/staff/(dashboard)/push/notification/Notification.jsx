"use client";

import Bredcumb from "@/src/components/Bredcumb";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Notification = () => {
  /* ================= DATE ================= */
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");

  /* ================= STATE ================= */
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= SEND NOTIFICATION ================= */
  const handleSend = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");

      if (!token || !branchId) {
        setError("Unauthorized");
        return;
      }

      const res = await fetch(`${BASE_URL}/staff/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          branchId,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Notification sent successfully");
      setMessage("");
      fetchHistory(); // 🔄 refresh history
    } catch (err) {
      setError(err.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GET HISTORY ================= */
  const fetchHistory = async () => {
    try {
      const token = Cookies.get("token");
      const branchId = localStorage.getItem("branchId");

      if (!token || !branchId) return;

      const res = await fetch(
        `${BASE_URL}/staff/notifications/history?branchId=${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setHistory(data.data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ================= UI ================= */
  return (
    <div>
      <Bredcumb />

      {/* ===== SEND NOTIFICATION ===== */}
      <div className="bg-white rounded-3xl p-5">
        <div className="md:w-[60%] w-full">
          <div className="flex gap-2 md:gap-11 border-b border-black/20 pb-4">
            <button className="font-inter font-medium text-2xl py-3 px-9 bg-[#F6F6F6] rounded-lg border border-[#D4AF37]">
              For All Customer
            </button>
            <p className="font-inter font-medium text-2xl py-3 px-9 bg-[#F6F6F6] rounded-lg">
              {formattedDate}
            </p>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#EEEEEE] resize-none w-full font-inter outline-0 p-4 mt-4 rounded-2xl h-[160px]"
            placeholder="Write the message"
          />

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}

          <div className="flex justify-end">
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl px-9 font-inter py-3 rounded-lg cursor-pointer mt-12 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== HISTORY ===== */}
      <div className="bg-white rounded-3xl p-5 mt-14">
        <div className="md:w-[60%] w-full">
          <div className="border-b border-black/20 pb-4">
            <h3 className="font-inter font-medium text-2xl">History</h3>
          </div>

          <div className="mt-4 space-y-4">
            {history.length === 0 && (
              <p className="font-inter text-gray-500">
                No notifications yet
              </p>
            )}

            {history.map((item) => (
              <div
                key={item.id}
                className="bg-[#EEEEEE] p-4 rounded-2xl font-inter"
              >
                <p className="mb-2">{item.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
