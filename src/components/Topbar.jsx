"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/public/Avatar.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import { TfiReload } from "react-icons/tfi";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Topbar = () => {
  const pathname = usePathname();
  const isBusinessOwner = pathname.startsWith("/businessowner");
  const isStaff = pathname.startsWith("/staff");
  const isSystemOwner = pathname.startsWith("/systemowner");

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        let endpoint = "";

        if (isBusinessOwner) {
          endpoint = "/business-owner/profile";
        } else if (isStaff) {
          endpoint = "/staff/profile";
        } else if (isSystemOwner) {
          endpoint = "/system-owner/profile";
        }

        if (!endpoint) return;

        const res = await fetch(`${BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        // Adjust based on your API response structure
        setProfileImage(json?.data?.profileImageUrl || json?.data?.businessLogoUrl);
      } catch (error) {
        console.error("Topbar profile fetch error:", error);
      }
    };

    fetchProfile();
  }, [pathname]);

  return (
    <div className="flex items-center justify-between  py-4">
      
      {/* Left Section */}
      {pathname === "/systemowner/home" ? (
        <div className="relative md:block hidden ml-[10%]">
          <input
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px]"
            placeholder="Search"
          />
          <FaSearch className="absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
      ) : (
        <div className="h-[60px]" />
      )}

      {/* Staff Mode */}
      {isStaff ? (
        <div className="flex items-center gap-2">
          <p className="font-inter text-[#656565]">
            Offline Mode (save locally)
          </p>
          <TfiReload />
        </div>
      ) : (
        <div className="h-[60px]" />
      )}

      {/* Right Section */}
      <div className="flex items-center gap-10">

        {isBusinessOwner && <ThemeToggle />}

        {isBusinessOwner && (
          <Link href="/businessowner/notification">
            <IoMdNotificationsOutline className="h-8 w-8 dark:text-white cursor-pointer" />
          </Link>
        )}

        {/*  Dynamic Profile Image */}
        <Image
          src={profileImage || Avatar}
          alt="profile"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
