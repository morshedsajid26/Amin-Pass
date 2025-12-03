"use client";
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';


const FAQdropdown = ({question,answer,className}) => {
    const [dropdown,setDropdown]=useState(false);
  return (
    <div className={`md:w-[80%] w-full ${className}`}>
      <div  onClick={()=>setDropdown(!dropdown)}  className="one    bg-white cursor-pointer px-8 rounded-2xl">
                      <div  className="up flex items-center justify-between py-4 md:py-[25.5px]">
                          <h4 className='text-[#000000] text-lg md:text-2xl font-bold font-inter'>{question}</h4>
                          {dropdown? <MdArrowDropUp className='md:w-8 w-6 md:h-8 h-6 text-[#000000] ' />: <MdArrowDropDown className='md:w-8 w-6 h-6 md:h-8 text-[#000000] ' />}
                          
                      </div>
                      <p className={`text-[#000000]  md:text-xl  font-inter  ${dropdown? "opacity-100 h-auto visible overflow-auto pb-4" : "opacity-0 h-0 invisible overflow-hidden"}`}>{answer}</p>
                      
                  </div>
    </div>
  )
}

export default FAQdropdown