"use client";
import Bredcumb from '@/src/components/Bredcumb';
import Dropdown from '@/src/components/Dropdown';
import Pagination from '@/src/components/Pagination';
import Table from '@/src/components/Table'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import Avatar from '@/public/Avatar.png'
import Image from 'next/image';



const Management = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
   const [viewOpen, setViewOpen] = useState(false);
   const [editOpen, setEditOpen] = useState(false);

   let ActionButton = () => {
    return (
      <div>
        <button
          onClick={() => setViewOpen(true)}
          className="bg-[#7AA3CC] font-inter font-medium py-2 px-11 rounded-full text-[#121212] cursor-pointer  hover:bg-[#7AA3CC]/80 transition-all duration-300"
        >
          View
        </button>
      </div>
    );
  };

    const TableHeads = [
    { Title: "Name", key: "name", width: "10%" },
    { Title: "Email", key: "email", width: "15%" },
    { Title: "Created On", key: "date", width: "10%" },
    { Title: "Subscription", key: "subscription", width: "15%" },
    { Title: "Location", key: "location", width: "10%" },
    { Title: "Action", key: "action", width: "10%" },
  ];

  const TableRows = [
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
   
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
    {
      name: "James Carter",
      email: "example@gmail.com",
      date: "10/08/2025",
      subscription: "Business",
      location: "2 Location",
      action: <ActionButton />,
      
    },
   
  ];

    useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);

  const Details = () => {
  const [enabled, setEnabled] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

    const handleToggle = () => {
    if (enabled) {
      
      setEditOpen(true);
    } else {
      // বর্তমানে OFF → enable করলেই কাজ করবে
      setEnabled(true);
    }
  };

   const confirmDisable = () => {
    setEnabled(false);
    setEditOpen(false);
  };


  const data = [
    ["Business Name:", "Raj Cafe"],
    ["Industry Type:", "Cafe"],
    ["Registration Date:", "05/04/2025"],
    ["Total Branch:", "3"], 
    ["Branch Location:", ""],
    ["Plan Type:", "Yearly"],
    ["Billing Status:", "Active"],
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-3xl p-4 font-inter text-2xl text-[#000000] space-y-4">
      {data.map(([label, value], index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-[#000000]/10 pb-4"
        >
          <span className="font-medium">{label}</span>

          
          {label === "Total Branch:" ? (
            <div className="flex items-center gap-3">
              <span className="font-normal">{value}</span>
              {/* Toggle Button */}
              <button
                onClick={handleToggle}
                className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${
                  enabled ? "bg-[#7F56D9]" : "bg-gray-400"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                    enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </button>
            </div>
          ) : (
            <span className="font-normal">{value}</span>
          )}
        </div>
      ))}

      {editOpen && (
  <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
    
    <div className='w-[20%] bg-black p-9 rounded-2xl'>
      <p className='font-inter font-bold text-white mb-4'>How many locations would you like to disable?</p>

      <Dropdown
      placeholder='1'
      options={["1","2","3","4","5","6"]}
      className={`text-white`}
      inputClass="font-inter text-white placeholder:text-white border border-white py-1.5 px-3.5 rounded-2xl"
      icon={`text-white`}
      />

     
        <div className="flex justify-center mt-8">
          <button 
            onClick={confirmDisable}
          className="bg-[#7AA3CC] font-bold font-inter px-5 py-2 rounded-md text-[#000000] cursor-pointer">
            Save
          </button>
        
      </div>
      </div>
  </div>
)}
    </div>
  );
};

  return (
    <div>
      <Bredcumb/>



      <div className='flex items-center justify-between'>
        <Dropdown
        
        placeholder='Active'
        className={`w-[10%] border border-[#D4AF37] rounded-xl p-2 font-inter font-medium`}
        inputClass="text-base"
        options={["Active", "Inacitve"]}
        optionClass={`text-base`}
        />


        <Link href='/systemowner/tenante/management/addtenant'>
        <button className='bg-[#7AA3CC] font-medium font-inter px-2 py-3 rounded-md text-[#000000] flex items-center gap-2 cursor-pointer '>
          <FaPlus className='w-6 h-6' />
          Add New Tenants
        </button>
        
        </Link>

      </div>
      

      <Table TableHeads={TableHeads} TableRows={currentItems}/>

      

       <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {viewOpen && (
  <div className="fixed inset-0 bg-[#D9D9D9]/80 flex items-center justify-center z-50">
    {/* Outer Box */}
    <div className="bg-gradient-to-b from-[#A8C4D8] to-[#E4DBC2] rounded-3xl w-[50%] max-h-[85vh] flex flex-col gap-y-10   overflow-hidden">

      {/* Inner Scrollable Content */}
      <div className="overflow-y-auto  hide-scrollbar flex flex-col gap-y-10">
        
        {/* Personal Info Section */}
        <div className="bg-[#FFFFFF] rounded-3xl p-4">
          <div className="flex justify-end">
            <FiX
              onClick={() => setViewOpen(false)}
              className="w-7 h-7 mb-5 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 pb-3 mb-3">
            <Image
              src={Avatar}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="font-inter text-2xl font-medium text-[#000000]">
                Jane D.
              </h2>
              <p className="text-xl text-[#000000]">example@gmail.com</p>
            </div>
          </div>

          <div className="font-inter text-2xl text-[#000000]">
            <div className="flex justify-between border-b border-[#000000]/10 py-4">
              <span className="font-medium">Address:</span>
              <span className="font-normal">Dhaka</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="font-medium">Phone Number:</span>
              <span className="font-normal">01777777777</span>
            </div>
          </div>
        </div>

        {/* Business Info Section */}
        <Details/>

        {/* Edit Button */}
        <div className="flex justify-center mt-10 pb-5">
          <Link href='/systemowner/tenante/management/addtenant'>
          <button 
           
          className="bg-[#7AA3CC] font-bold font-inter px-20 py-3 rounded-md text-[#000000] cursor-pointer">
            Edit
          </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)}




    </div>
  )
}

export default Management
