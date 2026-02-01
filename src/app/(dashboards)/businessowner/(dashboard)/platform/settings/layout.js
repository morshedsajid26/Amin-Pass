"use client"
import Bredcumb from '@/src/components/Bredcumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const layout = ({ children }) => {
  const pathname = usePathname();

  const nav = [
    { name: "General", link: "/businessowner/platform/settings" },
    // { name: "Notification", link: "/businessowner/platform/settings/notification/settings" },
  ];

  return (
    <div>
      <Bredcumb />

      <ul className="flex gap-6 border-b border-black/20 dark:border-white/20">
        {nav.map((item, index) => {

          let isActive = false;

          // 👉 GENERAL TAB ACTIVE ONLY IF EXACTLY THE ROOT
          if (item.name === "General") {
            isActive =
              pathname === item.link ||
              (pathname.startsWith(item.link) &&
               !pathname.includes("/notification/"));
          }

          // 👉 NOTIFICATION TAB ACTIVE ONLY IF INSIDE /notification/
          if (item.name === "Notification") {
            isActive = pathname.includes("/notification/");
          }

          return (
            <Link
              href={item.link}
              key={index}
              className={`py-2 px-2 font-inter text-xl cursor-pointer transition-all ${
                isActive ? "border-b-2 dark:text-white" : "text-[#000000] dark:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </ul>

      {children}
    </div>
  );
};

export default layout;
