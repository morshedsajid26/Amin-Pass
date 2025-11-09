import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import impact1 from '@/public/impact1.png'
import impact2 from '@/public/impact2.png'
import impact3 from '@/public/impact3.png'

const ReaLImpact = () => {
  return (
    <div className='pb-20'>
      <Container>
        <h3 className=' font-inter font-bold text-[32px] text-center '>See the Real Impact Every Month</h3>
        <p className=' font-inter text-center mt-2 '>Loyalty programs that keep customers coming back — and boost your monthly revenue</p>

      <div className='grid grid-cols-12 gap-10 mt-6'>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={impact1} alt='works1'/>
            <p className='font-inter font-medium text-[24px]'> Over 2,300 rewards redeemed monthly keeping customers</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={impact2} alt='works1'/>
            <p className='font-inter font-medium text-[24px]'> Generates €12,500 in recurring customer value every month</p>
        </div>
        <div className='bg-[#E9F0F5] col-span-4 rounded-2xl px-4 py-7 flex flex-col items-center text-center gap-4'>
            <Image src={impact3} alt='works1'/>
            <p className='font-inter font-medium text-[24px]'> 38% increase in repeat visits through automated rewards</p>
        </div>

      </div>
        </Container>
    </div>
  )
}

export default ReaLImpact
