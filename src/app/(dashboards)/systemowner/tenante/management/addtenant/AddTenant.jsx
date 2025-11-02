import Dropdown from '@/src/components/Dropdown'
import InputField from '@/src/components/InputField'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddTenant = () => {
  return (
    <>
    <div>
        <h3 className='font-inter font-medium text-2xl underline text-[#000000]'>Marchent Add to the Platform</h3>

    <div className='grid grid-cols-2 gap-x-16 gap-y-5 mt-4'>
        <InputField
        label="Owner Name"
        placeholder="Enter your Owner name"
        />
        <InputField
        label="Address"
        placeholder="Enter your address"
        />
        <InputField
        label="Owner Email"
        placeholder="Enter your email"
        />
        <InputField
        label="Phone Number"
        placeholder="Enter your phone number"
        />
    </div>
      
    </div>

     <div>
        <h3 className='font-inter font-medium text-2xl underline   text-[#000000] mt-10'>Business Information</h3>

    <div className='grid grid-cols-2 gap-x-16 gap-y-5 mt-4'>
        <InputField
        label="Business Name"
        placeholder="Enter your Business name"
        />
        <InputField
        label="Industry Type"
        placeholder="Enter your industry"
        />
        <InputField
        label="Country"
        placeholder="Enter your Country"
        />
        <InputField
        label="Registration Date"
        placeholder="Enter your date"
        />

        <Dropdown
        label='Branch'
        className={`gap-2`}
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='1'
        options={["1","2", "3" ,"4", "5"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />

        <Dropdown
        className={`gap-2`}
        label='Subscription'
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='1'
        options={["1","2", "3" ,"4", "5"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />
    </div>
    
      
    </div>


    <div>
        <h3 className='font-inter font-medium text-2xl underline   text-[#000000] mt-10'>Billing Info</h3>

    <div className='grid grid-cols-2 gap-x-16 gap-y-5 mt-4'>

        <Dropdown
        label='Plan Type'
        className={`gap-2`}
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='Weekly'
        options={["Weekly","Monthly", "Yearly"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />

        <Dropdown
        className={`gap-2`}
        label='Billing Status'
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='Active'
        options={["1","2", "3" ,"4", "5"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />
    </div>
    
      
    </div>


    <div className='mt-30 flex items-center gap-5 justify-center'>
        <button className='border border-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000]  cursor-pointer '>
             
              Close
            </button>

     <button className='bg-[#7AA3CC] font-bold font-inter px-20 py-3  rounded-md text-[#000000] cursor-pointer '>
              
             Save
            </button>
    </div>
    </>
  )
}

export default AddTenant
