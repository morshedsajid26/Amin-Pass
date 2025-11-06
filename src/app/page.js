import React from 'react'
import Navbar from '../components/Navbar'
import Banner from './(landing page)/Banner'
import FeaturedItem from './(landing page)/FeaturedItem'
import ProductShow from './(landing page)/ProductShow'

const page = () => {
  return (
    <div className='bg-linear-to-t from-[#F4F1EC] to-[#B3CBDB]  pt-5'>
      <Navbar/>
      <Banner/>
      <FeaturedItem/>
      <ProductShow/>
    </div>
  )
}

export default page

