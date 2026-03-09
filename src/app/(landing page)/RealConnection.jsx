"use client";
import Container from "@/src/components/Container";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import connection1 from "@/public/connection1.png";
import connection2 from "@/public/connection2.png";
import connection3 from "@/public/connection3.png";
import connection4 from "@/public/connection4.png";

const RealConnection = () => {
  return (
    <div className="pb-20 overflow-hidden">
      <Container>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-inter font-bold text-2xl md:text-[32px] text-center"
        >
          Meaningful rewards. Real connection
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-center mt-2 max-w-2xl mx-auto"
        >
          Create offers and discounts that customers feel - not forget. Every
          reward instantly appears on their digital card.
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
          className="flex justify-between mt-14"
        >
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
            <Image className="md:w-auto md:h-auto h-65 w-31" src={connection1} alt="layout" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
            <Image className="md:w-auto md:h-auto h-65 w-31" src={connection2} alt="layout" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
            <Image className="md:w-auto md:h-auto h-65 w-31" src={connection3} alt="layout" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="md:block hidden">
            <Image src={connection4} alt="layout" />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RealConnection;
