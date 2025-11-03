import Image from 'next/image'
import React from 'react'

import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import { FcGoogle } from "react-icons/fc";


const ForgotPass = () => {
  return (
     <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#000000] '>Forget Password?</h3>

      <p className='font-inter  text-[#333333] mb-5'>Please enter your email to get verification code</p>

      <InputField
      label='Email Address'
      labelClass={`text-[#333333] text-[16px]`}
      placeholder='example@gmail.com'
      inputClass={`border-[#005FA8] rounded-[4px]  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
      />
      



      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-[20px] w-full font-inter py-3 rounded-[8px] cursor-pointer mt-5'>
        Continue
      </button>

     
      
      </form>

    </main>
  )
}

export default ForgotPass