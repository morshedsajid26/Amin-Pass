"use client"
import Bredcumb from '@/src/components/Bredcumb'
import Link from 'next/link';
import React, { useRef } from 'react'

const Redeem = () => {

       const inputs = useRef([]);

 const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };


  return (
    <div>
      <Bredcumb/>

      <div className='flex flex-col md:flex-row items-center gap-14'>
      <div className="flex gap-4" >
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="appearance-none  md:w-[77px] w-15 h-15 md:h-[77px] border border-[#7AA3CC] rounded-[10px] text-center outline-none text-2xl font-inter font-bold text-[#005FA8]"
            />
          ))}
        </div>

      <Link className='' href= '/staff/redeem/add/redeem'>
        <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3 px-10 rounded-lg cursor-pointer gap-10'>
        Search
      </button>
      
      </Link>

      </div>




    </div>
  )
}

export default Redeem
