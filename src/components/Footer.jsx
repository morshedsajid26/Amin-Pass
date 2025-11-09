import React from 'react'
import Container from './Container'
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io5';


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='pb-5 pt-16' >
        <Container className={`bg-linear-to-l from-[#F4F1EC] to-[#B3CBDB] p-4 rounded-3xl `}>
            <div className='flex justify-end gap-10'>
                <input type="text" placeholder='Enter your mail'  className='font-inter font-medium outline-none border rounded-2xl py-2.5 px-4 w-[30%]'/>
                <button className='font-inter font-medium bg-[#7AA3CC] py-4 px-10 rounded-2xl'>Subscribe</button>
            </div>
           
            <div className='border-b border-t border-[#A6A6A6]/30 py-6 grid grid-cols-3 gap-20 justify-between mt-4'>
            <div>
                <h3 className='font-inter font-medium text-[48px] text-[#7AA3CC]'>Aminpass</h3>
                <p  className='font-inter text-[24px] text-[#1B1B1B] mt-4' >Rewarding loyalty,instantly and effortlessly.</p>
            </div>

            <div className=' text-center'>
                <p className='font-inter font-medium text-[20px] text-[#505050]'>
                    <a href="/privacy">Privacy Policy</a>
                    </p>

                    <p className='font-inter font-medium text-[20px] text-[#505050] mt-4'>
                    <a href="/termsCondition">Terms & Condition</a>
                    </p>
                

            </div>
            <div >
                <p className='flex items-center gap-4 font-inter font-medium text-[20px] text-[#505050]' >
                    <FaLocationDot className='h-6 w-6' />
                    One lake ST Rino, Nv8505
                </p>
                <p className='flex items-center gap-4 font-inter font-medium text-[20px] text-[#505050] my-5' >
                    <IoLogoWhatsapp className='h-6 w-6' />
                    +8801960678545
                </p>
                <p className='flex items-center gap-4 font-inter font-medium text-[20px] text-[#505050]' >
                    <MdEmail className='h-6 w-6' />
                    example@gmail.com
                </p>
            </div>

            </div>
            <p className='font-inter text-center mt-6'>@ {currentYear} Your Loyalty Platform</p>

        </Container>
      
    </div>
  )
}

export default Footer
