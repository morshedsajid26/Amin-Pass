"use client";
import { usePathname } from 'next/navigation';
import React from 'react'

const Bredcumb = () => {
    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
     const visible = pathParts.slice(-2);
    // const headerText = pathParts.join(" ");
  return (
    <div className='flex items-center'>
      {visible.map((item, index) => 
        ( <h3 
        key={index}
        className="capitalize font-inter text-[#000000]  text-2xl mb-8 px-1">
        {item}
          {index < visible.length - 1 && "  "}
      </h3>))}
    </div>
  )
}

export default Bredcumb
