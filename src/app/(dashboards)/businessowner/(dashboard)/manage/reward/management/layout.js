"use client"
import Bredcumb from '@/src/components/Bredcumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const layout = ({children}) => {
    const pathname = usePathname();

    const nav = [
      { name: "Reward", link: "/businessowner/manage/reward/management" },
       { name: "Cards", link: "/businessowner/manage/reward/management/loyalty/programme" },
       { name: "Loyalty Cards", link: "" },
     
    ];
  return (
    <div>
        <Bredcumb/>

        <ul className="flex  gap-6 border-b border-black/20 dark:border-white/20 ">
          {nav.map((item, index) => {
             let isActive = false;

        // 🎯 Logic: Loyalty active for any deeper nested route
        if (item.link.includes("/loyalty/")) {
          isActive = pathname.startsWith("/businessowner/manage/reward/management/loyalty/");
        } else {
          // Reward tab only for exact match or management root
          isActive =
            pathname === item.link ||
            (pathname.startsWith(item.link) &&
              !pathname.includes("/loyalty/"));
        }
            return (
              <Link
                href={item.link}
                key={index}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={`py-2 px-2 font-inter  flex items-center gap-4 cursor-pointer dark:text-white  transition-all duration-200 text-xl ${
                  isActive
                    ? "border-b-2 "
                    : "text-[#000000] dark:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>
        

      
        
   

      {children}
    </div>
  )
}

export default layout
