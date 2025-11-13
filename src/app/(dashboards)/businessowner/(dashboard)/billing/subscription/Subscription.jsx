"use client"
import Dropdown from '@/src/components/Dropdown';
import PaymentCard from '@/src/components/PaymentCard';
import React, { useState } from 'react'

const Subscription = () => {
     const [viewOpen, setViewOpen] = useState(false);
  return (
    <div>
     <div className="bg-white rounded-4xl py-14 px-14 mt-10">
            <h3 className="font-inter text-[32px] border-b-2 border-black/70 pb-2 w-[26%] mb-6">Subscription Information</h3>
            <div className=" font-inter text-2xl text-[#000000]  ">
              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Current plan:</span>
                <span className="font-normal">Monthly</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Price:</span>
                <span className="font-normal">$25</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Renewal Date:</span>
                <span className="font-normal">30/05/2025</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Usage:</span>
                <span className="font-normal">3 of 5 location usage</span>
              </div>

              <div className="flex justify-between border-b border-[#000000]/10 py-4">
                <span className="font-medium">Status:</span>
                <span>Active</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-12 mt-15">
              
              <button 
              onClick={() => setViewOpen(true)}
              className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
               Upgrade plan
              </button>
            </div>
          </div>

          {viewOpen && (
        <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-4xl py-14 px-14 w-[80%] overflow-scroll hide-scrollbar  ">
           
            <div className=" grid grid-cols-2 font-inter gap-20 text-[#000000]  ">
              <Dropdown
        label='Current Plan'
        className={`gap-2`}
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='Monthly'
        options={["Monthly","Yearly"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />

        <Dropdown
        label='Priority'
        className={`gap-2`}
        labelClass={`font-inter text-xl text-[#000000]`}
        placeholder='$25'
        options={["$25","$2500"]}
        optionClass={`font-inter `}
        inputClass={`border p-4 font-inter rounded-2xl`}
        />

              

             
            </div>


            <div>
                <PaymentCard/>
            </div>

            <div className="flex justify-center items-center gap-12 mt-15">
              <button 
            onClick={() => setViewOpen(false)}
              className="border border-[#7AA3CC] text-[#010101] font-semibold text-xl font-inter py-3  px-20 rounded-lg cursor-pointer mt-12">
              Cancel
              </button>
              <button 
              onClick={() => setViewOpen(false)}
              className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl  font-inter py-3 px-20 rounded-lg cursor-pointer mt-12">
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Subscription
