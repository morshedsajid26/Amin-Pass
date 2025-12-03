import Container from '@/src/components/Container'
import React from 'react'
import Slider from 'react-slick'

const SliderCard = () => {
  return (
    <div className='bg-[#E9F0F5]   rounded-2xl border border-[#000000]/10'>
      
        
        <p className=' font-inter font-medium md:text-2xl text-center mt-2 p-5 md:p-15 '>{`“Coming soon: Real stories from our early users.”`}</p>
      
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
      breakpoint: 768, // 768px নিচে গেলে
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // 480px নিচেও একই — 2 slides
      settings: {
        slidesToShow: 2,
      },
    },
  ],
  };
  return (
    <div className='pb-18'>
      <Container>
        <h3 className=' font-inter font-bold text-2xl md:text-[32px] text-center '>Testimonial</h3>
        <p className=' font-inter text-center mt-2 mb-8 '>From cafes to retail brands — everyone’s using our loyalty platform to keep customers coming back</p>


              
          <Slider {...settings}>
          {[...Array(9)].map((_, i) => (
            <div key={i} className="px-2 md:px-10"> 
              <SliderCard />
            </div>
          ))}
        </Slider>
        


      </Container>
    </div>
  )
}

export default Testimonial
