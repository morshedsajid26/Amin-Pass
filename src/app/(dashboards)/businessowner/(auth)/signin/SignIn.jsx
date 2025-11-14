import Image from 'next/image'
import React from 'react'

import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';


const SignIn = () => {
  return (
     <main className="bg-white dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#333333] dark:text-white mb-6 mt-'>Login to Account</h3>

      <p className='font-inter  text-[#333333] dark:text-white'>Please enter your email and password to continue</p>

      <InputField
      label='Email Address'
      labelClass={`text-[#333333] dark:text-white text-[16px]`}
      placeholder=''
      inputClass={`border-[#005FA8] dark:bg-[#151212] rounded-[4px]  text-[#5C5C5C] dark:text-white py-3 `}
      
      />
      <Password
      label='Password'
      labelClass={`dark:text-white`}
      inputClass={`dark:text-white dark:bg-[#151212]`}
      // placeholder="Enter your password"
      />

      <div className="flex justify-between items-center  w-full ">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" className=" accent-[#005FA8]" />
            <p className="text-[#333333] dark:text-white font-inter ">Remember Password</p>
          </div>
          <a href="/businessowner/forgotpassword" className="text-[#333333] dark:text-white hover:text-[#005FA8] font-inter hover:underline">Forgot Password?</a>
        </div>



      <Link href='/businessowner/home' className='w-full'>
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-12'>
        Log In
      </button>
 
          </Link>

     
      
      </form>

    </main>
  )
}

export default SignIn