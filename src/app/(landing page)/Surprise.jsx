"use client";
import Container from "@/src/components/Container";
import React from "react";
import { motion } from "framer-motion";

const Surprise = () => {
  return (
    <div className="overflow-hidden mb-12">
      <Container className={`md:border border-[#979797]/30 py-8 px-2 flex flex-col gap-4 items-center rounded-2xl`}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-inter font-medium text-2xl md:text-[32px] text-center"
        >
          Ready to surprise your customers?
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-inter text-center mb-4"
        >
          Start your digital loyalty journey today.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-inter font-bold py-3 px-7 bg-[#7AA3CC] rounded-2xl mb-4 hover:shadow-lg transition-transform"
        >
          Get Started
        </motion.button>
      </Container>
    </div>
  );
};

export default Surprise;
