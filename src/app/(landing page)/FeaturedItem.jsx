import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import one from '@/public/featured1.png'
import two from '@/public/featured2.png'
import three from '@/public/featured3.png'
import four from '@/public/featured4.png'

const FeaturedItem = () => {
  return (
    <div className='py-17'>
        <Container>
            <h3 className=' font-inter font-bold text-2xl md:text-[32px] text-center '>Featured Items</h3>

        <div className='grid md:grid-cols-2 gap-8 mt-8'>

            <div className='bg-[#E9F0F5] rounded-2xl  flex flex-col justify-center  text-center items-center md:py-15 px-3 py-3 md:px-12'>
                <Image src={one} alt='featured'/>
                <p className=' font-inter font-medium text-2xl md:text-[36px] my-6'>Design Your Own Loyalty Card</p>
                <p className=' font-inter font-medium '>Design a branded loyalty card yourself in just a few minutes.</p>
            </div>
             <div className='bg-[#E9F0F5] rounded-2xl  flex flex-col justify-center items-center md:py-15 px-3 py-3 md:px-12 text-center'>
                <Image src={two} alt='featured'/>
                <p className=' font-inter font-medium text-2xl md:text-[36px] my-6'>Work in apple/Google Wallet</p>
                <p className=' font-inter font-medium '>Customers instantly add cards to Apple/Google Wallet, no app download required</p>
            </div>
             <div className='bg-[#E9F0F5] rounded-2xl  flex flex-col justify-center items-center md:py-15 px-3 py-3 md:px-12 text-center'>
                <Image src={three} alt='featured'/>
                <p className=' font-inter font-medium text-2xl md:text-[36px] my-6'>Real-time Updates</p>
                <p className=' font-inter font-medium '>Points and offers update instantly, ensuring your data is always accurate.</p>
            </div>
             <div className='bg-[#E9F0F5] rounded-2xl  flex flex-col justify-center items-center md:py-15 px-3 py-3 md:px-12 text-center'>
                <Image src={four} alt='featured'/>
                <p className=' font-inter font-medium text-2xl md:text-[36px] my-6'>Easy Setup,no hardware</p>
                <p className=' font-inter font-medium '>Launch your loyalty program with a simple online setup, no extra hardware needed.</p>
            </div>
        </div>
        </Container>


      
    </div>
  )
}

export default FeaturedItem
