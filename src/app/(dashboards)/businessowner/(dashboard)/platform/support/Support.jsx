import Bredcumb from '@/src/components/Bredcumb'
import Dropdown from '@/src/components/Dropdown'
import InputField from '@/src/components/InputField'
import React from 'react'

const Support = () => {
  return (
    <div>
     <Bredcumb/>

     <div className='grid grid-cols-2 gap-10'>


        
        <InputField
        label={`Business Name`}
        />

        <InputField
        label={`Issue`}
        />

        <InputField
        label={`Date`}
        />

       <Dropdown
        label='Priority'
        className={`gap-2`}
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='Normal'
        options={["Normal","Medium", "High"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />
     </div>


      <div className="mt-22 flex items-center gap-8 justify-center">
              <button 
              
              className="border border-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000]  cursor-pointer ">
                Close
              </button>

              <button 
              
              className="bg-[#7AA3CC] font-bold font-inter px-20 py-3  rounded-md text-[#000000] cursor-pointer ">
                Send
              </button>
            </div>
    


    </div>
  )
}

export default Support
