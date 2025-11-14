"use client"
import React, { useEffect, useState } from 'react'
import tenants from "@/public/TenantIcon.png";
import visit from "@/public/VisitIcon.png";
import reward from "@/public/reward.png";
import Image from 'next/image';
import { BiExport } from 'react-icons/bi';
import Table from '@/src/components/Table';
import Dropdown from '@/src/components/Dropdown';

const Dashboard = () => {
    const [baseOnTitle, setBaseOnTitle] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);

 const TableHeads = [
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Transaction", key: "transaction", width: "20%" },
    { Title: "Reward Redeemed", key: "reward", width: "20%" },
    { Title: "Net Program Cost", key: "cost", width: "20%" },
   
  ];

  const TableRows = [
    {
      date: "25/08/2025",
      transaction: "1500",
      reward: "50",
      cost: "$1450",
     
  
    },
  ];

  useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = baseOnTitle.slice(startIndex, startIndex + itemsPerPage);


    const handleExportCSV = () => {
    const headers = TableHeads.map((h) => h.Title);
    const rows = TableRows.map((row) =>
      TableHeads.map((h) => row[h.key]).join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className='grid grid-cols-3 gap-10'>
      <div className='bg-[#F9F9F9] dark:bg-transparent rounded-2xl  p-5 flex flex-col items-center gap-2 dark:border dark:border-white'>
         
            <Image src={tenants} alt='user' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Total Customers
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>

      <div className='bg-[#F9F9F9] dark:bg-transparent  rounded-2xl  p-5 flex flex-col items-center gap-2 dark:border dark:border-white'>
         <Image src={reward} alt='ticket' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Reward Redeem
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white">
            324
          </p>
      </div>
      <div className='bg-[#F9F9F9] dark:bg-transparent rounded-2xl  p-5 flex flex-col items-center gap-2 dark:border dark:border-white'>
        <Image src={visit} alt='bill' className='dark:invert'/>
          <p className="font-inter text-[#121212] dark:text-white">
            Total visit this month
          </p>
          <p className="font-inter font-semibold text-[#121212] dark:text-white ">
            324
          </p>
      </div>


      <div className='col-span-3' >

<div className='flex items-center justify-between'>

    <Dropdown
    placeholder='Location Filter'
    className={` bg-[#7AA3CC] dark:bg-transparent dark:border dark:border-[#7AA3CC] rounded-xl p-2.5 font-inter font-medium `}
    options={["1","2"]}
    inputClass={``}
    />
    <div className='relative'>
            <button 
            onClick={handleExportCSV}
            className='font-inter font-medium text-[#000000] py-3.5 pl-15 pr-7  bg-[#7AA3CC] rounded-lg'>Export to CSV</button>
            <BiExport className='w-6 h-6 top-1/2 left-7 -translate-y-1/2 absolute' />
          </div>
</div>
        <div className='w-full'>

            <Table TableHeads={TableHeads} TableRows={currentItems} />

        </div>
      </div>
    </div>
  )
}

export default Dashboard
