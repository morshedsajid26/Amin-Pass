import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import success from '@/public/success.png'


const Success = () => {
  return (
     <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[450px] ">

        
      <h3 className='font-inter font-semibold text-[32px] text-[#333333] text-center '>Pin Updated Successfully!</h3>
      <p className='font-inter  text-[#333333] text-center '>Your new Pin has been saved. You can now continue securely.</p>

      

     
      


     <Link href='/staff/login' className='w-[50%]'>
     
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-5'>
        Log In
      </button>
     </Link> 

     
      
      </form>

    </main>
  )
}

export default Success