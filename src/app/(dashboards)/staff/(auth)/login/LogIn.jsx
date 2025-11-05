"use client"
import Link from 'next/link'
import React, { useRef } from 'react'

const LogIn = () => {
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
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#333333] '>Login to Account</h3>

      <p className='font-inter  text-[#333333]'>Please enter your Pin to continue</p>


      <div className="flex gap-4 justify-center mt-10 " >
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
        
   

        <a href="/staff/forgotpin" className='font-inter'>Forgot Pin?</a>
       


      <Link className="w-[50%] " href='' >
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-12'>
        Log In
      </button>
      
      </Link>

     

     
      
      </form>

    </main>
  )
}

export default LogIn
