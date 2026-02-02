"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/public/Avatar.png";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const GeneralSettings = () => {
  const [viewOpen, setViewOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const newPinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  /* ================= PIN INPUT HELPERS ================= */
  const handleChange = (e, index, refs) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, refs) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const getPinValue = (refs) =>
    refs.current.map((el) => el?.value || "").join("");

  /* ================= FETCH STAFF PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/staff/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        setProfile(json.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  /* ================= SET PIN ================= */
  const handleSavePin = async () => {
    const pin = getPinValue(newPinRefs);
    const confirmPin = getPinValue(confirmPinRefs);

    if (pin.length !== 6 || confirmPin.length !== 6) {
      setError("PIN must be exactly 6 digits");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN and Confirm PIN do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = Cookies.get("token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const res = await fetch(`${BASE_URL}/staff/auth/set-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pin,
          confirmPin, //    REQUIRED BY BACKEND
        }),
      });

      const data = await res.json();
      console.log("SET PIN RESPONSE:", data);

      if (!res.ok) throw new Error(data.message || "Failed to set PIN");

      //    SUCCESS
      setViewOpen(false);
      newPinRefs.current.forEach((i) => i && (i.value = ""));
      confirmPinRefs.current.forEach((i) => i && (i.value = ""));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="md:w-[530px] w-full mt-10">
      {/* PROFILE */}
      <div>
        <p className="font-inter text-xl mb-2">Profile Image</p>
        <Image src={Avatar} alt="profile" />
      </div>

      {/* INFO */}
      <div className="font-inter text-xl text-[#000000] mt-10">
        <Info label="My Name" value={profile?.name} />
        <Info label="Role" value={profile?.role} />
        <Info label="Assigned Location" value={profile?.branchName} />
        <Info label="Email" value={profile?.email} />
        <Info label="Phone Number" value={profile?.phone} last />
      </div>

      <button
        onClick={() => setViewOpen(true)}
        className="bg-[#7AA3CC] text-[#000000] w-[40%] font-bold font-inter py-3 mt-14 rounded-lg"
      >
        Set Your PIN
      </button>

      {/* ================= MODAL ================= */}
      {viewOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
          <div className="bg-[#EFEFEF] rounded-3xl p-6 md:p-10">
            <div className="flex justify-end">
              <FiX
                onClick={() => setViewOpen(false)}
                className="w-7 h-7 cursor-pointer"
              />
            </div>

            <h3 className="font-inter font-medium text-2xl text-center mb-10">
              Set a new PIN
            </h3>

            <PinInput
              label="New PIN"
              refs={newPinRefs}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <PinInput
              label="Confirm PIN"
              refs={confirmPinRefs}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}

            <div className="text-center">
              <button
                onClick={handleSavePin}
                disabled={loading}
                className="bg-[#7AA3CC] text-[#000000] w-[40%] font-bold font-inter py-3 mt-10 rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;

/* ================= SMALL COMPONENTS ================= */

const Info = ({ label, value, last }) => (
  <div
    className={`flex justify-between py-4 ${
      !last && "border-b border-[#000000]/10"
    }`}
  >
    <span className="font-medium">{label}:</span>
    <span>{value || "-"}</span>
  </div>
);

const PinInput = ({ label, refs, onChange, onKeyDown }) => (
  <div className="flex flex-col gap-5 mb-6">
    <label className="font-inter text-xl">{label}</label>
    <div className="flex gap-4 justify-center">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => (refs.current[i] = el)}
          onChange={(e) => onChange(e, i, refs)}
          onKeyDown={(e) => onKeyDown(e, i, refs)}
          className="w-[47px] h-[49px] border border-[#7AA3CC]
                     rounded-[10px] text-center outline-none text-xl
                     font-inter font-bold text-[#005FA8]"
        />
      ))}
    </div>
  </div>
);
