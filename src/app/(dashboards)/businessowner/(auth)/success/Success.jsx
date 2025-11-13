import Image from 'next/image'
import React from 'react'

import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';


const Success = () => {
  return (
     <main className="bg-white  dark:bg-[#141414] grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#333333] dark:text-white text-center '>Password Updated Successfully!</h3>

      <p className='font-inter  text-[#333333] dark:text-white mb-5 text-center'>Your new password has been saved. You can now continue securely.</p>

     
      


     <Link href='/businessowner/signin' className='w-full'>
     
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-5'>
        Sign In
      </button>
     </Link> 

     
      
      </form>

    </main>
  )
}

export default Success