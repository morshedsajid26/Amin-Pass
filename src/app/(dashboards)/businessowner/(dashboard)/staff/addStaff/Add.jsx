import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import React from 'react'

const Add = () => {
  return (
    <div>     
      <form className='grid grid-cols-2 gap-15 mt-10'>

         <InputField label={`Staff Name`} inputClass={`font-inter text-xl`} />
        <InputField label={`Role`} inputClass={`font-inter text-xl`} />
        <InputField label={`Staff Email`} inputClass={`font-inter text-xl`} />

        <Password
        label='Password'
        labelClass={`font-inter text-xl   text-black`}
        inputClass={`border-black py-4 rounded-2xl text-[20px] text-black `}
        icon={`text-black `}
        
        />


      </form>

       <div className="flex justify-center items-center gap-12 mt-15">
          <button className="border border-[#7AA3CC] dark:text-white text-[#010101] font-semibold text-xl font-inter py-3  px-20 rounded-lg cursor-pointer mt-12">
            Close
          </button>
          <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
            Create
          </button>
        </div>
    </div>
  )
}

export default Add
