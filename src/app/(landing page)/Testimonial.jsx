import Container from '@/src/components/Container'
import React from 'react'
import Slider from 'react-slick'

const SliderCard = () => {
  return (
    <div className='bg-[#E9F0F5] p-15 rounded-2xl border border-[#000000]/10'>
      
        
        <p className=' font-inter font-medium text-[24px] text-center mt-2 '>“Coming soon: Real stories from our early users.”</p>
      
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
  };
  return (
    <div className='pb-18'>
      <Container>
        <h3 className=' font-inter font-bold text-[32px] text-center '>Testimonial</h3>
        <p className=' font-inter text-center mt-2 mb-8 '>From cafes to retail brands — everyone’s using our loyalty platform to keep customers coming back</p>


              
          <Slider {...settings}>
          {[...Array(9)].map((_, i) => (
            <div key={i} className="px-10"> 
              <SliderCard />
            </div>
          ))}
        </Slider>
        


      </Container>
    </div>
  )
}

export default Testimonial
