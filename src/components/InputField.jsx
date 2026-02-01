import React from "react";

const InputField = ({
  label,
  name,          // ✅ ADD
  value,         // ✅ ADD
  onChange,      // ✅ REQUIRED
  type = "text",
  placeholder,
  className = "",
  inputClass = "",
  labelClass = "",
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      {label && (
        <label
          className={`font-inter text-xl text-[#000000] dark:text-white ${labelClass}`}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}              // ✅ MUST
        value={value ?? ""}      // ✅ MUST (avoid undefined)
        onChange={onChange}      // ✅ MUST
        placeholder={placeholder}
        className={`border border-[#000000] dark:border-white outline-none p-4 
          text-[#121212] dark:text-white placeholder:text-[#121212] 
          dark:placeholder:text-white font-inter rounded-2xl ${inputClass}`}
      />
    </div>
  );
};

export default InputField;
