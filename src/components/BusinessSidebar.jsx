"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import homeIcon from "@/public/homeIcon.png";
import StaffIcon from "@/public/StaffIcon.png";
import support from "@/public/support.png";
import SettingsIcon from "@/public/SettingsIcon.png";
import analytics from "@/public/analytics.png";
import branch from "@/public/branch.png";
import subscription from "@/public/Subscription.png";
import UserIcon from "@/public/UserIcon.png";
import RewardIcon from "@/public/RewardIcon.png";
import AddIcon from "@/public/AddIcon.png";
import LogoutIcon from "@/public/LogoutIcon.png";
import logo from "@/public/Aminpass.png";

const navitems = [
  { name: "Overview", link: "/businessowner/home", icon: homeIcon },
  { name: "Rewards", link: "/businessowner/manage/reward", icon: RewardIcon },
  { name: "Staff", link: "/businessowner/staff", icon: StaffIcon },
  { name: "Add Redeem", link: "/businessowner/redeem/add", icon: AddIcon },
  { name: "Analytics", link: "/businessowner/analytics/dashboard", icon: analytics },
  { name: "Branch", link: "/businessowner/branch/list", icon: branch },
  { name: "Customer", link: "/businessowner/customer/platform", icon: UserIcon },
   { name: "Subscription", link: "/businessowner/billing/subscription", icon: subscription },
   { name: "Support", link: "/businessowner/platform/support", icon: support },
  { name: "Settings", link: "/businessowner/platform/settings", icon: SettingsIcon },
];

const BusinessSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Toggle Button (visible on small screens) */}
      <button
        className="2xl:hidden fixed top-5 left-5 z-50 p-2 bg-[#7AA3CC] text-white rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed 2xl:static top-0 left-0 z-40 h-screen w-[241px] shrink-0 flex flex-col justify-between pl-2.5 pr-5 py-7 bg-[#F1F1F1] dark:bg-[#141414]  rounded-r-3xl  shadow-lg
        transition-transform  duration-300 ease-in-out
        ${isOpen ? "translate-x-0 " : "-translate-x-full 2xl:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex justify-center  ">
          <Image src={logo} alt="logo" className="dark:invert" />
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-6    overflow-scroll hide-scrollbar">
          {navitems.map((item, index) => {
           const isActive =
            pathname === item.link || pathname.startsWith(item.link + "/");
            return (
              <Link
        href={item.link}
        key={index}
        onClick={() => setIsOpen(false)} // auto close on mobile
        className={`py-2 px-2 font-inter font-medium flex items-center gap-4 rounded-lg cursor-pointer transition-all duration-200 group
          ${
            isActive
              ? "bg-[#7AA3CC] text-black dark:text-black"
              : "text-[#000000] dark:text-white hover:bg-[#7AA3CC] hover:text-black dark:hover:text-black"
          }`}
      >
        <Image
          src={item.icon}
          alt={item.name}
          className={`w-6 h-6 filter transition-all duration-200
            ${
              isActive
                ? ""
                : "dark:invert dark:brightness-200  dark:group-hover:invert-0 dark:group-hover:brightness-0"
            }`}
        />
        {item.name}
      </Link>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="">
          <Link href='/businessowner/signin'>
          <button className="flex items-center gap-4 py-2 px-2 w-full text-[#FF1100] hover:bg-[#7AA3CC] font-inter font-medium cursor-pointer rounded-lg transition-all duration-200">
            <Image src={LogoutIcon} alt="log out" className="w-6 h-6 dark:invert" />
            Log Out
          </button>

          </Link>
        </div>
      </div>

      {/* 🔹 Overlay for mobile (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40  z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default BusinessSidebar;
