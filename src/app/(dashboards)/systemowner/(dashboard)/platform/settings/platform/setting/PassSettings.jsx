"use client";
import Password from "@/src/components/Password";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const PassSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= UPDATE PASSWORD ================= */
  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = Cookies.get("accessToken");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Password update failed");

      setSuccess("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="w-full md:w-[480px] flex flex-col items-center mx-auto gap-8 mt-10">
      <Password
        label="Old Password"
        labelClass="text-[#000000] text-xl"
        icon="text-[#000000]"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <Password
        label="New Password"
        labelClass="text-[#000000] text-xl"
        icon="text-[#000000]"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 font-inter text-sm">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-600 font-inter text-sm">
          {success}
        </p>
      )}

      <button
        onClick={handleUpdatePassword}
        disabled={loading}
        className="bg-[#7AA3CC] text-[#000000] w-[50%] font-semibold font-inter py-3 rounded-lg mt-5 cursor-pointer disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default PassSettings;
