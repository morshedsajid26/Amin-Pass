"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/public/Avatar.png";
import QR from "@/public/QR.png";
import { LuImport } from "react-icons/lu";
import Link from "next/link";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const GeneralSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("accessToken"); //    FIXED

        if (!token) return;

        const res = await fetch(
          `${BASE_URL}/business-owner/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        //    FIXED: correct data mapping
        setProfile(json.data);
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
    <div className="md:w-[530px] w-full gap-8 mt-10">
      {/* ===== LOGO ===== */}
      <div>
        {/* <p className="font-inter text-xl mb-2 dark:text-white">
          {profile?.name}
        </p> */}
        <Image
          src={profile?.businessLogoUrl || Avatar}
          alt="profile"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      {/* ===== INFO ===== */}
      <div className="font-inter text-xl dark:text-white text-[#000000] mt-10">
        <Info label="Shop Name" value={profile?.name} />
        <Info label="Shop Address" value={profile?.owner?.address} />
        <Info label="Owner Name" value={profile?.owner?.name} />
        <Info label="Owner Email" value={profile?.owner?.email} />
        <Info label="Owner Number" value={profile?.owner?.phone} />

        {/* <div className="flex justify-between py-4">
          <span className="font-medium">Qr Code:</span>
          <Image src={QR} alt="QR" width={80} height={80} />
        </div> */}
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="flex items-center gap-10 justify-center">
        {/* <Link href="/businessowner/platform/settings/qR/code">
          <button className="border-[#7AA3CC] border text-[#000000] dark:text-white px-10 font-bold font-inter py-3 mt-14 rounded-lg flex items-center gap-2">
            <LuImport className="w-6 h-6" />
            QR Code
          </button>
        </Link> */}

        <Link href="/businessowner/platform/settings/edit/settings">
          <button className="bg-[#7AA3CC] text-[#000000] font-bold font-inter py-3 px-10 mt-14 rounded-lg">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GeneralSettings;

/* ================= SMALL COMPONENT ================= */
const Info = ({ label, value }) => (
  <div className="flex justify-between border-b border-[#000000]/10 dark:border-white/10 py-4">
    <span className="font-medium">{label}:</span>
    <span className="font-normal">{value || "-"}</span>
  </div>
);
