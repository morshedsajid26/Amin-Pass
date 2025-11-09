import React from 'react'
import Navbar from '../components/Navbar'
import Banner from './(landing page)/Banner'
import FeaturedItem from './(landing page)/FeaturedItem'
import ProductShow from './(landing page)/ProductShow'
import Works from './(landing page)/Works'
import ReaLImpact from './(landing page)/ReaLImpact'
import RealConnection from './(landing page)/RealConnection'
import Footer from '../components/Footer'
import FAQ from './(landing page)/FAQ'
import Surprise from './(landing page)/Surprise'
import Plan from './(landing page)/Plan'

const page = () => {
  return (
    <div className='bg-linear-to-t from-[#F4F1EC] to-[#B3CBDB]  pt-5'>
      <Navbar/>
      <Banner/>
      <FeaturedItem/>
      <ProductShow/>
      <Works/>
      <Plan/>
      <ReaLImpact/>
      <RealConnection/>
      <FAQ/>
      <Surprise/>
      <Footer/>
    </div>
  )
}

export default page

