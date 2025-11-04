import Bredcumb from '@/src/components/Bredcumb'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Location = () => {
  return (
    <div>
        <Bredcumb/>

        <div className='flex justify-center gap-10'>

        <div className="relative  ">
                  <input
                    type="text"
                    className="border outline-none border-[#000000] py-[14px] px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
                    placeholder="Search"
                  />
                  <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
                </div>

                 <button 
          
              className="bg-[#7AA3CC] font-bold font-inter px-10 py-3  rounded-2xl text-[#000000] cursor-pointer ">
              Search
              </button>

        </div>

      
    </div>
  )
}

export default Location
