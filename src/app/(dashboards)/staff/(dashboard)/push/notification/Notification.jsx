import Bredcumb from "@/src/components/Bredcumb";
import React from "react";

const Notification = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div>
      <Bredcumb />

      <div className="bg-white rounded-3xl p-5">
        <div className="md:w-[60%] w-full">
          <div className="flex gap-2  md:gap-11 border-b border-black/20 pb-4">
            <button className="font-inter font-medium text-2xl py-3 px-9 bg-[#F6F6F6] rounded-lg border border-[#D4AF37]">
              For All Customer
            </button>
            <p className="font-inter font-medium text-2xl py-3 px-9 bg-[#F6F6F6] rounded-lg ">
              {formattedDate}
            </p>
          </div>

          <textarea
            name=""
            id=""
            className="bg-[#EEEEEE] resize-none w-full font-inter outline-0 p-4 mt-4 rounded-2xl h-[160px]"
            placeholder="Write the messege"
          >
           
          </textarea>

          <div className="flex justify-end">
            <button className="bg-[#7AA3CC] text-[#010101] font-semibold text-xl px-9 font-inter py-3 rounded-lg cursor-pointer mt-12">
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 mt-14">
        <div className="md:w-[60%] w-full">
          <div className="   border-b border-black/20 pb-4">
            <h3 className="font-inter font-medium text-2xl">History</h3>
          </div>

          <textarea
            name=""
            id=""
            className="bg-[#EEEEEE] resize-none w-full font-inter outline-0 p-4 mt-4 rounded-2xl h-[160px]"
            placeholder=""
            readOnly
          >
            
          </textarea> 
        </div>
      </div>
    </div>
  );
};

export default Notification;
