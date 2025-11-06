import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import bannerPhone from '@/public/bannerPhone.png'

const Banner = () => {
  return (
    <div>
     <Container className='border border-black/20 bg-linear-to-r from-[#A8C4D8]/20 to-[#F4F1EC]/20 rounded-2xl flex items-center justify-between p-6 mt-6'>
        <div className='w-[50%]'>
            <h3 className='font-inter font-semibold text-[40px]'>Stop Losing Customers. Start Growing Loyalty with Digital Cards.</h3>
            <p className='font-inter  text-[20px] text-[#262626] mb-8 mt-4'>Create your free loyalty card in 2 minutes. No hardware. No hassle</p>
            <div className='flex gap-8'>
                <button className="bg-[#7AA3CC] text-[#010101] font-bold px-15 font-inter py-3 rounded-2xl cursor-pointer ">
           Get Started
          </button>
          <button className="border border-[#7AA3CC] text-[#010101] font-bold  px-15 font-inter py-3 rounded-2xl cursor-pointer ">
            Join Now
          </button>
            </div>

        </div>

        <div>
            <Image src={bannerPhone} alt='banner'/>
        </div>
     </Container>
    </div>
  )
}

export default Banner
