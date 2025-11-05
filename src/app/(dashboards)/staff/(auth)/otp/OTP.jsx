"use client";
import Link from 'next/link';
import React, { useRef, useState } from 'react'

const OTP = () => {
    const [loading, setLoading] = useState(false);
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
    <div className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-20 px-15 rounded-3xl  ">
        <form
        
        className="flex flex-col items-center text-center w-[480px]"
      >
        <h1 className="text-[32px] text-[#333333] font-inter font-medium">Check your email</h1>
        <p className="font-inter text-[16px] text-[#333333] mt-6">
          We sent a code to your email address. Please check your email for the 6 digit code.
        </p>

        <div className="flex gap-4 justify-center my-[82px]" >
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
              className="appearance-none w-[47px] h-[49px] border border-[#7AA3CC] rounded-[10px] text-center outline-none text-xl font-inter font-bold text-[#005FA8]"
            />
          ))}
        </div>

        
        {/* {error && <p className="text-red-600 text-[14px] mb-4 font-inter">{error}</p>} */}

          <Link href='/staff/newpin' className="w-[50%] ">
          
        <button
          type="button"
          
          className="w-full font-inter font-semibold text-xl bg-[#7AA3CC] text-[#000000] rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
            
          {loading ? "Verifying..." : "Verify"}
        </button>
          </Link>

        <p className="font-inter text-[16px] text-[#333333] mt-[92px]">
          You have not received the email?
          <a href="/staff/forgotpin" className="text-[#005FA8] cursor-pointer underline m-2">Resend</a>
        </p>
      </form>
    </div>
  )
}

export default OTP
