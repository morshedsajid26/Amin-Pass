"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import homeIcon from "@/public/homeIcon.png";
import UserIcon from "@/public/UserIcon.png";
import VisibilityIcon from "@/public/VisibilityIcon.png";
import SupportIcon from "@/public/SupportIcon.png";
import SettingsIcon from "@/public/SettingsIcon.png";
import GeolocationIcon from "@/public/GeolocationIcon.png";
import AuditIcon from "@/public/AuditIcon.png";
import ActivationIcon from "@/public/ActivationIcon.png";
import LogoutIcon from "@/public/LogoutIcon.png";
import logo from "@/public/Aminpass.png";

const navitems = [
  { name: "Overview", link: "/systemowner/home", icon: homeIcon },
  { name: "Tenant Permission", link: "/systemowner/permission/control", icon: VisibilityIcon },
  { name: "Tenants", link: "/systemowner/tenante/management", icon: UserIcon },
  { name: "Plan Activation", link: "/systemowner/plan/activation", icon: ActivationIcon },
  { name: "Audit Logs", link: "/systemowner/audit/logs", icon: AuditIcon },
  { name: "Support & SLA", link: "/systemowner/support/management", icon: SupportIcon },
  { name: "Geolocation", link: "/systemowner/geo/location", icon: GeolocationIcon },
  { name: "Settings", link: "/systemowner/platform/settings", icon: SettingsIcon },
];

const SystemSidebar = () => {
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
        className={`fixed 2xl:static top-0 left-0 z-40 max-h-screen w-[241px] shrink-0 flex flex-col pl-2.5 pr-5 py-7 bg-[#F1F1F1] rounded-r-3xl 2xl:rounded-3xl shadow-lg
        transition-transform  duration-300 ease-in-out overflow-scroll hide-scrollbar
        ${isOpen ? "translate-x-0 " : "-translate-x-full 2xl:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex justify-center ">
          <Image src={logo} alt="logo" />
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-6 mt-[90px] ">
          {navitems.map((item, index) => {
            const isActive =
            pathname === item.link || pathname.startsWith(item.link + "/");
            return (
              <Link
                href={item.link}
                key={index}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={`py-2 px-2 font-inter font-medium flex items-center gap-4 cursor-pointer rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#7AA3CC]"
                    : "text-[#000000] hover:bg-[#7AA3CC]"
                }`}
              >
                <Image src={item.icon} alt={item.name} className="w-6 h-6" />
                {item.name}
              </Link>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="mt-25 pb-11 ">
          <button className="flex items-center gap-4 py-2 px-2 w-full text-[#FF1100] hover:bg-[#7AA3CC] font-inter font-medium cursor-pointer rounded-lg transition-all duration-200">
            <Image src={LogoutIcon} alt="log out" className="w-6 h-6" />
            Log Out
          </button>
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

export default SystemSidebar;
