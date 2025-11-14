"use client";
import Bredcumb from '@/src/components/Bredcumb'
import React, { useState } from 'react'
import Avatar from '@/public/Avatar.png'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa'

const AddPoint = () => {
    const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

 const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(100);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleClick = () => {
    if (count === 0) return;
    setTotal((prev) => prev + count);
    setMessage(`✅  ${count} Point${count !== 1 ? "s" : ""} added successfully!`);
    setTimeout(() => setMessage(""), 1500); 
  };

  return (
    <div>
      <Bredcumb/>

      <div className='flex items-center gap-25'>
      <div className='bg-white dark:bg-transparent  w-[50%] rounded-2xl py-2 px-6 '>
<div className="flex items-center gap-6 ">
            <Image
              src={Avatar}
              alt="User"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="font-inter text-2xl font-medium text-[#000000] dark:text-white">
                Jane D.
              </h2>
              <p className="font-inter font-medium text-[#000000] dark:text-white">example@gmail.com</p>
            </div>
          </div>
      </div>

      <div className='bg-white dark:bg-transparent w-[20%] rounded-2xl py-3 px-10'>
        <p className='font-inter font-medium text-2xl dark:text-white'>{formattedDate}</p>
        <p className='font-inter font-medium  mt-3 dark:text-white'>Visit Date</p>
      </div>

      </div>

      <div className='flex flex-col items-center justify-center mt-17 gap-8'>
        <div className='bg-[#E1E1E1] dark:bg-[#141414] rounded-2xl w-[30%] flex items-center justify-between py-5 px-10'>
            <FaMinus 
            onClick={handleDecrease}
            className='w-12 h-12 cursor-pointer dark:text-white'/>
<p className='font-inter font-bold text-[40px] dark:text-white'>{count}</p>
            <FaPlus 
             onClick={handleIncrease}
            className='w-12 h-12 cursor-pointer dark:text-white'/>

        </div>

        <div>
            <button 
             onClick={handleClick}
            className='font-inter font-bold text-2xl bg-[#7AA3CC] py-3 px-43 rounded-lg cursor-pointer'>Add Points</button>

            
        </div>
        <div className=' h-5'>

         {message && (
        <p className=" font-inter font-medium bg-[#6AC70D] px-4 py-2 rounded-lg ">
          {message}
        </p>
      )}
        </div>


      </div>


       <div className="bg-white dark:bg-[#141414] rounded-4xl py-14 px-14 mt-">
        <div className=" font-inter text-2xl text-[#000000]  dark:text-white">
          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Active Reward:</span>
            <span className="font-normal">2</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Available Reward:</span>
            <span className="font-normal">5</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Last Reward Received:</span>
            <span className="font-normal">14/05/2025</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Reward Points:</span>
            <span className="font-normal">{total}</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Card Expire Date:</span>
            <span className="">14/05/2025</span>
          </div>

          <div className="flex justify-between border-b border-[#000000]/10 py-4">
            <span className="font-medium">Earning Rule:</span>
            <span className=" ">Per Spend</span>
          </div>
          <div className="flex justify-between  py-4">
            <span className="font-medium">App:</span>
            <span className=" ">Google Wallet</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPoint
