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
        <h3 className=' font-inter font-bold text-[32px] text-center '>How It Works</h3>

      <div className='grid grid-cols-12 gap-10 mt-6'>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works1} alt='works1'/>
            <p className='font-inter font-medium text-2xl'> Instantly design your loyalty card with your brand colors</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works2} alt='works1'/>
            <p className='font-inter font-medium text-2xl'> Watch How it works</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-4 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={works3} alt='works1'/>
            <p className='font-inter font-medium text-2xl'> Rewards unlock automatically once customers reach their goal</p>
        </div>

      </div>
        </Container>
    </div>
  )
}

export default Works
