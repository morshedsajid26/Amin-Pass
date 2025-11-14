"use client";
import React, { useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';

const Password = ({label,placeholder,className,labelClass,icon,inputClass}) => {

     const [showPass, setShowPass] = useState(false);
  return (
     <div className={`flex flex-col gap-2  w-full ${className}`}>
            <label className={`font-inter text-[#333333] dark:text-white ${labelClass}`}>
              {label}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className={`w-full outline-none py-3 px-4 text-[#5C5C5C] dark:text-white font-inter text-[16px] placeholder-[#5C5C5C] border border-[#005FA8] dark:border-white rounded ${inputClass}`}
                placeholder={placeholder}
              />
              <div
                onClick={() => setShowPass(!showPass)}
                className={`w-6 h-6  flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 text-[#005FA8] dark:text-white ${icon}`}>
                {showPass ? (
                  <IoEyeOutline className=" w-6 h-6 " />
                ) : (
                  <FaRegEyeSlash className=" w-6 h-6 " />
                )}
              </div>
            </div>
          </div>
  )
}

export default Password