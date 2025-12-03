import Container from '@/src/components/Container'
import React from 'react'
import Product_Show from  '@/public/Product_Show.png'
import Image from 'next/image'

const ProductShow = () => {
  return (
    <div>
    <Container className={`md:bg-[#F6F6F6] rounded-2xl p-4`}>
       <h3 className=' font-inter font-bold text-2xl md:text-[32px] text-center '>Product Showcase</h3>
      
       <div className='md:flex items-center  justify-between mt-6'>
         <div className='md:w-[35%] text-center md:text-left mb-6 md:mb-0'>
                    <h3 className='font-inter font-semibold text-2xl md:text-[40px]'>One Platform,All Loyalty</h3>
                    <p className='font-inter  md:text-xl text-[#262626] mt-4'>From rewards to personalized offers- everything happens automatically. No more paper stamp cards, just smart, seamless technology that connects.</p>
                    
        
                </div>
        
                <div className='flex justify-center'>
                    <Image src={Product_Show} alt='banner'/>
                </div>
       </div>
    </Container>
    </div>
  )
}

export default ProductShow
