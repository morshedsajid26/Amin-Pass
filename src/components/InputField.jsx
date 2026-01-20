import React from 'react'

const InputField = ({
  label,
  className,
  placeholder,
  inputClass,
  labelClass,
  value,
  onChange,
  type
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <label className={`font-inter text-xl text-[#000000] dark:text-white ${labelClass}`}>
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}           
        onChange={onChange}     
        className={`border border-[#000000] dark:border-white outline-none p-4 text-[#121212] dark:text-white placeholder:text-[#121212] dark:placeholder:text-white font-inter rounded-2xl ${inputClass}`}
      />
    </div>
  );
}

export default InputField;
