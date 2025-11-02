import React from 'react'

const InputField = ({label,className,placeholder}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
        <label className='font-inter text-xl   text-[#000000]'>{label}</label>

        <input type="text" placeholder={placeholder} className='border border-[#000000] outline-none  p-4 text-[#121212] placeholder:text-[#121212] font-inter rounded-2xl' />
      
    </div>
  )
}

export default InputField