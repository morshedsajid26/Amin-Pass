"use client";
import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import impact1 from '@/public/impact1.png'
import impact2 from '@/public/impact2.png'
import impact3 from '@/public/impact3.png'

const ReaLImpact = () => {
  return (
    <div className='pb-20 overflow-hidden'>
      <Container>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='font-inter font-bold text-2xl md:text-[32px] text-center'
        >
          See the Real Impact Every Month
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='font-inter text-center mt-2'
        >
          Loyalty programs that keep customers coming back — and boost your monthly revenue
        </motion.p>

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
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={impact1} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> Over 2,300 rewards redeemed monthly keeping customers</p>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl px-10 py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={impact2} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> Generates €12,500 in recurring customer value every month</p>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className='bg-[#E9F0F5] hover:shadow-lg transition-shadow duration-300 col-span-4 rounded-2xl px-4 py-7 flex flex-col items-center text-center gap-4'
          >
            <Image src={impact3} alt='works1' />
            <p className='font-inter font-medium text-xl md:text-2xl'> 38% increase in repeat visits through automated rewards</p>
          </motion.div>

        </motion.div>
      </Container>
    </div>
  )
}

export default ReaLImpact;
