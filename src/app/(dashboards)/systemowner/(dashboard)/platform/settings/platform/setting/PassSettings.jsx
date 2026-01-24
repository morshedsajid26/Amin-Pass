import Password from '@/src/components/Password'
import React from 'react'

const PassSettings = () => {
  return (
    <div className='w-full md:w-[480px] flex flex-col items-center mx-auto gap-8 mt-10 '>

      <Password
      label={`New Password`}
      labelClass={`text-[#000000] text-xl`}
      icon='text-[#000000]'
      />
      <Password
      label={`Confirm Password`}
      labelClass={`text-[#000000] text-xl`}
      icon='text-[#000000]'
      />

      <button className="bg-[#7AA3CC] text-[#000000] w-[50%]  font-semibold font-inter  py-3 rounded-lg mt-5 cursor-pointer">
            Update Password
          </button>
      
    </div>
  )
}

export default PassSettings
