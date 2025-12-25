"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/public/Avatar.png";
import QR from "@/public/QR.png";
import { LuImport } from "react-icons/lu";
import Link from "next/link";
import Cookies from "js-cookie";
import { BUSINESSOWNER_BASE_URL } from "@/src/config/api";

const GeneralSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        const res = await fetch(
          `${BUSINESSOWNER_BASE_URL}/api/owner/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();

        // ✅ FIX: user object
        setProfile(json?.user || null);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <p className="font-inter text-xl mt-10 dark:text-white">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="w-[530px] gap-8 mt-10">
      {/* Logo */}
      <div>
        <p className="font-inter text-xl mb-2 dark:text-white">
          Cafe Logo
        </p>
        <Image src={Avatar} alt="profile" />
      </div>

      {/* Info */}
      <div className="font-inter text-xl dark:text-white text-[#000000] mt-10">
        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Shop Name:</span>
          <span className="font-normal">
            {profile?.shop_name || "-"}
          </span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Shop Address:</span>
          <span className="font-normal">
            {profile?.address || "-"}
          </span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Name:</span>
          <span className="font-normal">
            {profile?.name || "-"}
          </span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Email:</span>
          <span className="font-normal">
            {profile?.email || "-"}
          </span>
        </div>

        <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
          <span className="font-medium">Owner Number:</span>
          <span className="font-normal">
            {profile?.phone || "-"}
          </span>
        </div>

        <div className="flex justify-between py-4">
          <span className="font-medium">Qr Code:</span>
          <Image src={QR} alt="QR" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-10 justify-center">
        <Link href="/businessowner/platform/settings/qR/code">
          <button className="border-[#7AA3CC] border text-[#000000] dark:text-white px-10 font-bold font-inter py-3 mt-14 rounded-lg cursor-pointer flex items-center gap-2 justify-center">
            <LuImport className="w-6 h-6" />
            QR Code
          </button>
        </Link>

        <Link href="/businessowner/platform/settings/edit/settings">
          <button className="bg-[#7AA3CC] text-[#000000] font-bold font-inter py-3 px-10 mt-14 rounded-lg cursor-pointer">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GeneralSettings;
