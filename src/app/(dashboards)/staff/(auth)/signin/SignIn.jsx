import Image from 'next/image'
import React from 'react'

import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';


const SignIn = () => {
  return (
     <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#333333] mb-6 mt-'>Signin to Account</h3>

      <p className='font-inter  text-[#333333]'>Please enter your email and password to continue</p>

      <InputField
      label='Email Address'
      labelClass={`text-[#333333] text-[16px]`}
      placeholder=''
      inputClass={`border-[#005FA8] rounded-[4px]  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
      
      />
      <Password
      label='Password'
      // placeholder="Enter your password"
      />

      <div className="flex justify-between items-center  w-full ">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" className="w-4 h-4 accent-[#005FA8]" />
            <p className="text-[#333333] font-inter ">Remember Password</p>
          </div>
        
        </div>



      <Link className='w-full' href=''>
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-[20px] w-full font-inter py-3 rounded-[8px] cursor-pointer mt-12'>
        Sign In
      </button>
      
      </Link>

      <p className='font-inter '>
        Don’t have an account? 
        
        <a href="/staff/signup"
        className='font-bold'
        >
         Sign up
        </a>
      </p>

     
      
      </form>

    </main>
  )
}

export default SignIn