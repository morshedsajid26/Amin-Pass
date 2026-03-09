"use client";
import Container from '@/src/components/Container'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import one from '@/public/featured1.png'
import two from '@/public/featured2.png'
import three from '@/public/featured3.png'
import four from '@/public/featured4.png'

const featuredData = [
    { img: one, title: "Design Your Own Loyalty Card", text: "Design a branded loyalty card yourself in just a few minutes." },
    { img: two, title: "Work in apple/Google Wallet", text: "Customers instantly add cards to Apple/Google Wallet, no app download required" },
    { img: three, title: "Real-time Updates", text: "Points and offers update instantly, ensuring your data is always accurate." },
    { img: four, title: "Easy Setup,no hardware", text: "Launch your loyalty program with a simple online setup, no extra hardware needed." },
];

const FeaturedItem = () => {
    return (
        <div className='py-17 overflow-hidden' id='featuredItem'>
            <Container>
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className='font-inter font-bold text-2xl md:text-[32px] text-center'
                >
                    Featured Items
                </motion.h3>

                <div className='grid md:grid-cols-2 gap-8 mt-8'>
                    {featuredData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className='bg-[#E9F0F5] hover:shadow-xl transition-shadow duration-300 rounded-2xl flex flex-col justify-center text-center items-center md:py-15 px-3 py-3 md:px-12'
                        >
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Image src={item.img} alt='featured' />
                            </motion.div>
                            <p className='font-inter font-medium text-2xl md:text-[36px] my-6'>{item.title}</p>
                            <p className='font-inter font-medium'>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default FeaturedItem
