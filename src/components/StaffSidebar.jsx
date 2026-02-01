"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Cookies from "js-cookie";

import UserIcon from "@/public/UserIcon.png";
import RewardIcon from "@/public/RewardIcon.png";
import AddIcon from "@/public/AddIcon.png";
import SettingsIcon from "@/public/SettingsIcon.png";
import NotificationIcon from "@/public/NotificationIcon.png";
import TransactionIcon from "@/public/TransactionIcon.png";
import LogoutIcon from "@/public/LogoutIcon.png";
import logo from "@/public/Aminpass.png";

const navitems = [
  { name: "Customer", link: "/staff/customer/platform", icon: UserIcon },
  { name: "Add Redeem", link: "/staff/redeem/add", icon: AddIcon },
  { name: "Reward", link: "/staff/manage/reward", icon: RewardIcon },
  { name: "Transaction", link: "/staff/transaction", icon: TransactionIcon },
  { name: "Push Notification", link: "/staff/push/notification", icon: NotificationIcon },
  { name: "Settings", link: "/staff/platform/settings", icon: SettingsIcon },
];

const StaffSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  
  
  const handleLogout = () => {
    Cookies.remove("token");       

    router.replace("/staff/signin");
  };

  return (
    <>
      {/* 🔹 Mobile Toggle */}
      <button
        className="2xl:hidden fixed top-5 left-5 z-50 p-2 bg-[#7AA3CC] text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* 🔹 Sidebar */}
      <div
        className={`fixed 2xl:static top-0 left-0 z-40 h-screen w-[241px]
        flex flex-col justify-between pl-2.5 pr-5 py-7 bg-[#F1F1F1]
        rounded-r-3xl shadow-lg transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full 2xl:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image src={logo} alt="logo" />
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-6 overflow-y-auto hide-scrollbar">
          {navitems.map((item, index) => {
            const isActive =
              pathname === item.link ||
              pathname.startsWith(item.link + "/");

            return (
              <Link
                key={index}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={`py-2 px-2 flex items-center gap-4 rounded-lg
                transition-all font-inter font-medium
                ${isActive ? "bg-[#7AA3CC]" : "hover:bg-[#7AA3CC]"}`}
              >
                <Image src={item.icon} alt={item.name} className="w-6 h-6" />
                {item.name}
              </Link>
            );
          })}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 py-2 px-2 text-[#FF1100]
          hover:bg-[#7AA3CC] rounded-lg font-inter font-medium"
        >
          <Image src={LogoutIcon} alt="log out" className="w-6 h-6" />
          Log Out
        </button>
      </div>

      {/* 🔹 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 2xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default StaffSidebar;
