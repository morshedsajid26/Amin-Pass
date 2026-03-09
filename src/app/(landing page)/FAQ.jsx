"use client";
import Container from '@/src/components/Container'
import FAQdropdown from '@/src/components/FAQdropdown'
import React from 'react'
import { motion } from 'framer-motion'

const faqs = [
  { question: "Is Aminpass really free to start?", answer: "Yes/No" },
  { question: "Do I need to sign a long-term", answer: "No. All our paid plans are month-to-month or year-to-year. You can cancel or change your plan anytime without any penalty." },
  { question: "How long does it take to launch the loyalty program?", answer: "Dont know" },
  { question: "Do my customer need to download an app to use the card?", answer: "Yes" },
  { question: "Is my customer data secure with Aminpass?", answer: "Yes" },
];

const FAQ = () => {
  return (
    <div className='pb-16 overflow-hidden'>
      <Container >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='font-inter font-bold text-2xl md:text-[32px] text-center mb-8'
        >
          FAQ
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className={`flex flex-col justify-center items-center gap-4`}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-full flex justify-center">
              <FAQdropdown
                className=''
                question={faq.question}
                answer={faq.answer}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  )
}

export default FAQ;
