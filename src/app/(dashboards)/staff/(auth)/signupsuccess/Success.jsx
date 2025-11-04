import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import success from '@/public/success.png'


const Success = () => {
  return (
     <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-30 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

<Image src={success} alt='success'/>
      <h3 className='font-inter font-semibold text-[32px] text-[#333333] text-center '>Your Request Has Been Received!</h3>

      

     
      


     <Link href='/staff/signin' className='w-full'>
     
      <button className='bg-[#7AA3CC] text-[#010101] font-semibold text-[20px] w-full font-inter py-3 rounded-[8px] cursor-pointer mt-5'>
        Sign In
      </button>
     </Link> 

     
      
      </form>

    </main>
  )
}

export default Success