"use client";
import Bredcumb from '@/src/components/Bredcumb';
import Dropdown from '@/src/components/Dropdown';
import Pagination from '@/src/components/Pagination';
import Table from '@/src/components/Table'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const Management = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

   let ActionButton = () => {
    return (
      <div>
        <button
          // onClick={() => setViewOpen(true)}
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
    </div>
  )
}

export default Management
