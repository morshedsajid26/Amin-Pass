"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Dropdown = ({
  label = "",
  placeholder = "",
  options = [],
  value,              // ✅ NEW (optional)
  onSelect,
  className,
  inputClass,
  spanClass,
  optionClass,
  labelClass,
  icon,
}) => {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  /* 🔥 SYNC WITH PARENT VALUE */
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (item) => {
    setSelected(item);
    setShow(false);
    onSelect?.(item);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`flex flex-col relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          className={`font-inter text-[#000000] dark:text-white ${labelClass}`}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <div className="relative">
        <div onClick={() => setShow((p) => !p)}>
          <input
            readOnly
            value={selected}
            placeholder={placeholder}
            className={`w-full bg-transparent outline-none cursor-pointer 
              text-[#000000] dark:text-white 
              placeholder:text-[#000000] dark:placeholder:text-white
              ${inputClass}`}
          />

          {/* Arrow */}
          <div
            className={`w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6 
              flex items-center justify-center text-[#000000] dark:text-white ${icon}`}
          >
            {show ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>

        {/* Options */}
        <div
          className={`absolute left-0 top-[105%] w-full bg-white border 
            border-[#CED2E5] rounded-md shadow-md z-30 text-center
            transition-all duration-300 hide-scrollbar
            ${optionClass}
            ${
              show
                ? "opacity-100 visible max-h-40 overflow-auto"
                : "opacity-0 invisible max-h-0 overflow-hidden"
            }`}
        >
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="py-2 cursor-pointer hover:bg-[#7AA3CC] hover:text-white"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
