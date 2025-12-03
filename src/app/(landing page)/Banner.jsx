import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import bannerPhone from '@/public/bannerPhone.png'

const Banner = () => {
  return (
    <div>
     <Container className='md:border border-black/20 md:bg-linear-to-r from-[#A8C4D8]/20 to-[#F4F1EC]/20 rounded-2xl md:flex items-center justify-between  px-1 py-3 md:p-6 mt-6'>
        <div className='md:w-[50%]'>
            <h3 className='font-inter font-semibold text-2xl md:text-[40px] text-center md:text-left'>Stop Losing Customers. Start Growing Loyalty with Digital Cards.</h3>
            <p className='font-inter   md:text-xl text-[#262626] mb-8 mt-4 text-center md:text-left'>Create your free loyalty card in 2 minutes. No hardware. No hassle</p>
            <div className='flex items-center justify-center md:justify-start md:gap-8 gap-2'>
                <button className="bg-[#7AA3CC] text-[#010101] font-bold px-12 md:px-15 font-inter py-3 rounded-2xl cursor-pointer ">
           Get Started
          </button>
          <button className="border border-[#7AA3CC] text-[#010101] font-bold px-12 md:px-15 font-inter py-3 rounded-2xl cursor-pointer ">
            Join Now
          </button>
            </div>

        </div>

        <div className='flex justify-center mt-5 md:mt-0 '>
            <Image src={bannerPhone} alt='banner'/>
        </div>
     </Container>
    </div>
  )
}

export default Banner
