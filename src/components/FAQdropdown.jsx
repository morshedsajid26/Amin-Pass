"use client";
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';


const FAQdropdown = ({question,answer,className}) => {
    const [dropdown,setDropdown]=useState(false);
  return (
    <div className={`w-[80%] ${className}`}>
      <div  onClick={()=>setDropdown(!dropdown)}  className="one    bg-white cursor-pointer px-8 rounded-2xl">
                      <div  className="up flex items-center justify-between py-[25.5px]">
                          <h4 className='text-[#000000] text-2xl font-bold font-inter'>{question}</h4>
                          {dropdown? <MdArrowDropUp className='w-8 h-8 text-[#000000] ' />: <MdArrowDropDown className='w-8 h-8 text-[#000000] ' />}
                          
                      </div>
                      <p className={`text-[#000000]  text-xl  font-inter  ${dropdown? "opacity-100 h-auto visible overflow-auto pb-4" : "opacity-0 h-0 invisible overflow-hidden"}`}>{answer}</p>
                      
                  </div>
    </div>
  )
}

export default FAQdropdown