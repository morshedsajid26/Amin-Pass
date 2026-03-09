"use client";
import Container from '@/src/components/Container'
import React from 'react'
import Product_Show from '@/public/Product_Show.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ProductShow = () => {
  return (
    <div className="overflow-hidden">
      <Container className={`md:bg-[#F6F6F6] rounded-2xl p-4 overflow-hidden`}>
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='font-inter font-bold text-2xl md:text-[32px] text-center'
        >
          Product Showcase
        </motion.h3>

        <div className='md:flex items-center justify-between mt-6'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='md:w-[35%] text-center md:text-left mb-6 md:mb-0'
          >
            <h3 className='font-inter font-semibold text-2xl md:text-[40px]'>One Platform,All Loyalty</h3>
            <p className='font-inter md:text-xl text-[#262626] mt-4'>From rewards to personalized offers- everything happens automatically. No more paper stamp cards, just smart, seamless technology that connects.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='flex justify-center'
          >
            <Image src={Product_Show} alt='banner' />
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

export default ProductShow;
