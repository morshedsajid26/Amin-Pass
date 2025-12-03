import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import works1 from '@/public/works1.png'
import works2 from '@/public/works2.png'
import works3 from '@/public/works3.png'

const Works = () => {
  return (
    <div className='py-20'>
      <Container>
        <h3 className=' font-inter font-bold text-2xl md:text-[32px] text-center '>How It Works</h3>

      <div className='grid md:grid-cols-12 gap-5 md:gap-10 mt-6'>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works1} alt='works1'/>
            <p className='font-inter font-medium text-xl md:text-2xl'> Instantly design your loyalty card with your brand colors</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works2} alt='works1'/>
            <p className='font-inter font-medium text-xl md:text-2xl'> Watch How it works</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works3} alt='works1'/>
            <p className='font-inter font-medium text-xl md:text-2xl'> Rewards unlock automatically once customers reach their goal</p>
        </div>

      </div>
        </Container>
    </div>
  )
}

export default Works
