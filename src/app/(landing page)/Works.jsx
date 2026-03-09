"use client";
import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import works1 from '@/public/works1.png'
import works2 from '@/public/works2.png'
import works3 from '@/public/works3.png'

const Works = () => {
  return (
    <div className='py-20 overflow-hidden'>
      <Container>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='font-inter font-bold text-2xl md:text-[32px] text-center'
        >
          How It Works
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className='grid md:grid-cols-12 gap-5 md:gap-10 mt-6'
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={works1} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> Instantly design your loyalty card with your brand colors</p>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={works2} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> Watch How it works</p>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl md:px-10 px-7 py-5 md:py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={works3} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> Rewards unlock automatically once customers reach their goal</p>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  )
}

export default Works;
