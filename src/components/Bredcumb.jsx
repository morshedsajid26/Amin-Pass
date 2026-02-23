"use client";
import { usePathname } from 'next/navigation';
import React from 'react'

const Bredcumb = ({ customLabels = {} }) => {
    const pathname = usePathname();
    const pathParts = pathname.split("/").filter(Boolean);
    const visible = pathParts.slice(-2);

    return (
        <div className='flex items-center'>
            {visible.map((item, index) => {
                const displayLabel = customLabels[item] || item;
                return (
                    <h3
                        key={index}
                        className="capitalize font-inter text-[#000000] dark:text-white text-2xl mb-8 px-1"
                    >
                        {displayLabel}
                        {index < visible.length - 1 && "  "}
                    </h3>
                );
            })}
        </div>
    )
}

export default Bredcumb
