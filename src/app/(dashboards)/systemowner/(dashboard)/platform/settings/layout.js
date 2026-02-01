"use client"
import Bredcumb from '@/src/components/Bredcumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const layout = ({children}) => {
    const pathname = usePathname();

    const nav = [
      // { name: "Notification Setting", link: "/systemowner/platform/settings" },
       { name: "Password Setting", link: "/systemowner/platform/settings/platform/setting" },
     
    ];
  return (
    <div>
        <Bredcumb/>

        <ul className="flex  gap-6 border-b border-black/20 ">
          {nav.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                href={item.link}
                key={index}
                onClick={() => setIsOpen(false)} // auto close on mobile
                className={`py-2 px-2 font-inter  flex items-center gap-4 cursor-pointer  transition-all duration-200 text-xl ${
                  isActive
                    ? "border-b-2 "
                    : "text-[#000000]"
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
