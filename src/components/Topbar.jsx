"use client";
import Image from "next/image";
import React from "react";
import Avatar from "@/public/Avatar.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Dropdown from "./Dropdown";
import { TfiReload } from "react-icons/tfi";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
  const pathname = usePathname();
  const isBusinessOwner = pathname.startsWith("/businessowner");
  const isStaff = pathname.startsWith("/staff");

  return (
    <div className=" flex items-center justify-between ">
      {pathname === "/systemowner/home"  ? (
        <div className="relative ml-[10%]">
          <input
            type="text"
            className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
            placeholder="Search"
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>
      ) : (
        <div className="h-[60px]" />
      )}

      {isStaff ? (
        <div className="flex items-center gap-2">
          <p className="font-inter text-[#656565]">Offline Mode (save locally)</p>
          <TfiReload />
        </div>
      ) : (
        <div className="h-[60px]" />
      )}
      
      
      
      <div className="flex items-center justify-between  ">

      {pathname === "/systemowner/home" ? (
        <Dropdown
          className="w-[20%] font-inter font-medium text-2xl  "
          options={["EN", "NL", "FR", "BN"]}
          placeholder="EN"
        />
      ) : (
        <div className="h-[60px]" />
      )}
      



 


      <div className="flex items-center gap-10  ">
        {/* Theme chnage icon */}
          {isBusinessOwner && (
          <ThemeToggle />
        )}
        {/* Notification Icon */}
          {isBusinessOwner ? (
            // ACTIVE LINK: Works only for BusinessOwner
            <Link href="/businessowner/notification">
              <IoMdNotificationsOutline className="h-8 w-8 text-[#020202] dark:text-white cursor-pointer" />
            </Link>
          ) : (
            // DISABLED ICON: Other dashboards
            <IoMdNotificationsOutline className="h-8 w-8 text-[#020202]" />
          )}

        <Image src={Avatar} alt="profile" />
      </div>
      </div>
    </div>
  );
};

export default Topbar;
