"use client";
import Container from '@/src/components/Container'
import React from 'react'
import Slider from 'react-slick'
import { motion } from 'framer-motion'

const SliderCard = () => {
  return (
    <div className='bg-[#E9F0F5] rounded-2xl border border-[#000000]/10'>
      <p className='font-inter font-medium md:text-2xl text-center mt-2 p-5 md:p-15'>{`“Coming soon: Real stories from our early users.”`}</p>
    </div>
  )
}

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className='pb-18 overflow-hidden'>
      <Container>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className='font-inter font-bold text-2xl md:text-[32px] text-center'
        >
          Testimonial
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='font-inter text-center mt-2 mb-8 max-w-2xl mx-auto'
        >
          From cafes to retail brands — everyone’s using our loyalty platform to keep customers coming back
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Slider {...settings}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="px-2 md:px-10">
                <SliderCard />
              </div>
            ))}
          </Slider>
        </motion.div>

      </Container>
    </div>
  )
}

export default Testimonial;
