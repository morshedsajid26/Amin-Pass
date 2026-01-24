"use client";
import Bredcumb from "@/src/components/Bredcumb";
import Dropdown from "@/src/components/Dropdown";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";

import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Image from "next/image";
import Avatar from "@/public/Avatar.png";
import { BiExport } from "react-icons/bi";


const Logs = () => {
  const [baseOnTitle, setBaseOnTitle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  

  const TableHeads = [
    { Title: "Business Name", key: "name", width: "20%" },
    { Title: "Date", key: "date", width: "15%" },
    { Title: "Time", key: "time", width: "15%" },
    { Title: "Action", key: "action", width: "25%" },
    { Title: "Details", key: "details", width: "25%" },
   
  ];

  const TableRows = [
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      time: "10:45 AM",
      action:"Created new offer",
      details: "Buy 1 Get 1 Free",
      
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      time: "10:45 AM",
      action:"Created new offer",
      details: "Buy 1 Get 1 Free",
      
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      time: "10:45 AM",
      action:"Created new offer",
      details: "Buy 1 Get 1 Free",
      
    },
    {
      name: "James Carter",
      id: "#1245",
      date: "10/08/2025",
      time: "10:45 AM",
      action:"Created new offer",
      details: "Buy 1 Get 1 Free",
      
    },
   
  ];

  useEffect(() => {
    setBaseOnTitle(TableRows);
  }, []);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(baseOnTitle.length / itemsPerPage);
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
    <div>
      <Bredcumb />

      <div className="flex flex-col md:flex-row  md:justify-between items-end md:gap-16 gap-5 ">

        <div className="relative  ">
          <input
            type="text"
            className="border outline-none border-[#000000] py-3.5 px-12 w-[462px] rounded-[15px] text-[#000000] placeholder:text-[#000000] font-inter"
            placeholder="Search"
          />
          <FaSearch className=" absolute top-1/2 left-6 -translate-y-1/2 text-[#7AA3CC]" />
        </div>

        <div className='relative'>
            <button 
            onClick={handleExportCSV}
            className='font-inter font-medium text-[#000000] py-3.5 pl-15 pr-7 border-2 border-[#7AA3CC] rounded-lg'>Export to CSV</button>
            <BiExport className='w-6 h-6 top-1/2 left-7 -translate-y-1/2 absolute' />
          </div>
      </div>

      <div className="overflow-auto">
        <Table TableHeads={TableHeads} TableRows={currentItems} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      
    </div>
  );
};

export default Logs;
