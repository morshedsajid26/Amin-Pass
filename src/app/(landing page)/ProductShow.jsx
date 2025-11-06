import Container from '@/src/components/Container'
import React from 'react'
import Product_Show from  '@/public/Product_Show.png'
import Image from 'next/image'

const ProductShow = () => {
  return (
    <div>
    <Container className={`bg-[#F6F6F6] rounded-2xl p-4`}>
       <h3 className=' font-inter font-bold text-[32px] text-center '>Product Showcase</h3>
      
       <div className='flex items-center  justify-between mt-6'>
         <div className='w-[35%]'>
                    <h3 className='font-inter font-semibold text-[40px]'>One Platform,All Loyalty</h3>
                    <p className='font-inter  text-[20px] text-[#262626] mt-4'>From rewards to personalized offers- everything happens automatically. No more paper stamp cards, just smart, seamless technology that connects.</p>
                    
        
                </div>
        
                <div>
                    <Image src={Product_Show} alt='banner'/>
                </div>
       </div>
    </Container>
    </div>
  )
}

export default ProductShow
